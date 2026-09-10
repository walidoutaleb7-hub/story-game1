/* =========================================================
   ظلال المجهول — SHADOWS OF THE UNKNOWN
   script.js — ULTRA V6
   PART 1 / 2
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     CORE
     ======================================================= */

  const $ = (id) => document.getElementById(id);

  const clamp = (n, min, max) =>
    Math.max(min, Math.min(max, n));

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const pick = (arr) =>
    Array.isArray(arr) && arr.length
      ? arr[Math.floor(Math.random() * arr.length)]
      : null;

  const shuffle = (arr) =>
    [...arr].sort(() => Math.random() - 0.5);

  const safeNumber = (value, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };

  const escapeHTML = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const formatNumber = (n) =>
    safeNumber(n).toLocaleString("ar-DZ");

  const wait = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));


  /* =======================================================
     STORAGE
     ======================================================= */

  const STORAGE_KEY = "shadows_of_unknown_ultra_v6";

  const defaultState = {
    version: 6,

    firstLaunch: true,

    player: {
      name: "المحقق",
      level: 1,
      xp: 0,
      coins: 250,
      score: 0,
      bestScore: 0,
      streak: 0,
      maxStreak: 0
    },

    game: {
      active: false,
      paused: false,

      chapter: 1,
      sceneIndex: 0,

      health: 100,
      maxHealth: 100,

      choicesMade: 0,
      correctChoices: 0,

      totalChoices: 0,
      totalDeaths: 0,

      startedAt: 0,
      elapsed: 0
    },

    settings: {
      sound: true,
      music: true,
      motion: true
    },

    inventory: [],

    achievements: [],

    journal: [],

    history: [],

    unlockedChapters: [1],

    completedChapters: [],

    flags: {},

    daily: {
      date: "",
      completed: false,
      rewardClaimed: false
    },

    statistics: {
      gamesPlayed: 0,
      endings: 0,
      choices: 0,
      correctChoices: 0,
      coinsEarned: 0,
      achievementsUnlocked: 0,
      longestStreak: 0
    }
  };


  const clone = (obj) =>
    JSON.parse(JSON.stringify(obj));


  function merge(base, saved) {
    if (!saved || typeof saved !== "object") {
      return clone(base);
    }

    const result = clone(base);

    Object.keys(saved).forEach(key => {
      if (
        saved[key] &&
        typeof saved[key] === "object" &&
        !Array.isArray(saved[key]) &&
        result[key] &&
        typeof result[key] === "object" &&
        !Array.isArray(result[key])
      ) {
        result[key] = merge(result[key], saved[key]);
      } else {
        result[key] = saved[key];
      }
    });

    return result;
  }


  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        return clone(defaultState);
      }

      return merge(
        defaultState,
        JSON.parse(raw)
      );
    } catch {
      return clone(defaultState);
    }
  }


  let state = loadState();


  function saveState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
      );
    } catch {}
  }


  function resetState() {
    state = clone(defaultState);
    saveState();
    return state;
  }


  /* =======================================================
     DATA BRIDGE
     ======================================================= */

  function getData() {
    return (
      window.GAME_DATA ||
      window.DATA ||
      window.SHADOWS_DATA ||
      {}
    );
  }


  function getChapters() {
    const data = getData();

    return (
      data.chapters ||
      data.CHAPTERS ||
      data.story?.chapters ||
      []
    );
  }


  function getChapter(id) {
    const chapters = getChapters();

    return chapters.find(ch =>
      Number(
        ch.id ??
        ch.chapter ??
        ch.number
      ) === Number(id)
    ) || null;
  }


  function getScenes(chapter) {
    if (!chapter) return [];

    return (
      chapter.scenes ||
      chapter.story ||
      chapter.events ||
      []
    );
  }


  function getScene(chapterId, sceneIndex) {
    const chapter = getChapter(chapterId);

    if (!chapter) return null;

    const scenes = getScenes(chapter);

    return scenes[sceneIndex] || null;
  }


  function getCurrentScene() {
    return getScene(
      state.game.chapter,
      state.game.sceneIndex
    );
  }


  /* =======================================================
     EVENTS
     ======================================================= */

  const listeners = {};

  function on(event, callback) {
    if (!listeners[event]) {
      listeners[event] = [];
    }

    listeners[event].push(callback);

    return () => {
      listeners[event] =
        listeners[event].filter(fn => fn !== callback);
    };
  }


  function emit(event, payload = {}) {
    (listeners[event] || []).forEach(fn => {
      try {
        fn(payload);
      } catch {}
    });
  }


  /* =======================================================
     AUDIO
     ======================================================= */

  const AudioEngine = {
    context: null,

    ensure() {
      if (!state.settings.sound) return null;

      if (!this.context) {
        try {
          this.context =
            new (window.AudioContext ||
              window.webkitAudioContext)();
        } catch {
          return null;
        }
      }

      if (this.context.state === "suspended") {
        this.context.resume().catch(() => {});
      }

      return this.context;
    },

    tone(
      frequency = 440,
      duration = 0.08,
      type = "sine",
      volume = 0.035
    ) {
      const ctx = this.ensure();

      if (!ctx) return;

      try {
        const oscillator =
          ctx.createOscillator();

        const gain =
          ctx.createGain();

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        gain.gain.setValueAtTime(
          0.0001,
          ctx.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
          volume,
          ctx.currentTime + 0.01
        );

        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          ctx.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(ctx.destination);

        oscillator.start();
        oscillator.stop(
          ctx.currentTime + duration + 0.02
        );
      } catch {}
    },

    click() {
      this.tone(520, 0.055, "sine", 0.025);
    },

    choice() {
      this.tone(390, 0.08, "triangle", 0.03);
    },

    correct() {
      this.tone(660, 0.08, "sine", 0.035);

      setTimeout(() => {
        this.tone(880, 0.12, "sine", 0.03);
      }, 70);
    },

    danger() {
      this.tone(130, 0.18, "sawtooth", 0.025);
    },

    success() {
      [523, 659, 784].forEach((f, i) => {
        setTimeout(() => {
          this.tone(f, 0.16, "sine", 0.035);
        }, i * 90);
      });
    }
  };


  /* =======================================================
     NOTIFICATIONS
     ======================================================= */

  function notify(
    text,
    icon = "icon-spark",
    duration = 2400
  ) {
    const box = $("notification");

    if (!box) return;

    const iconEl = $("notificationIcon");
    const textEl = $("notificationText");

    if (iconEl) {
      iconEl.className =
        `notification-icon ${icon}`;
    }

    if (textEl) {
      textEl.textContent = text;
    }

    box.classList.remove("show");

    requestAnimationFrame(() => {
      box.classList.add("show");
    });

    clearTimeout(notify.timer);

    notify.timer = setTimeout(() => {
      box.classList.remove("show");
    }, duration);
  }


  function toastItem(name, icon = "icon-item") {
    const toast = $("itemToast");

    if (!toast) return;

    const iconEl = $("itemToastIcon");
    const nameEl = $("itemToastName");

    if (iconEl) {
      iconEl.className =
        `toast-icon ${icon}`;
    }

    if (nameEl) {
      nameEl.textContent = name;
    }

    toast.classList.remove("show");

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });
  }


  /* =======================================================
     PROGRESSION
     ======================================================= */

  function xpRequired(level) {
    return 100 + (level - 1) * 60;
  }


  function addXP(amount) {
    amount = Math.max(0, safeNumber(amount));

    state.player.xp += amount;
    state.statistics.totalXpEarned =
      safeNumber(state.statistics.totalXpEarned) + amount;

    let leveledUp = false;

    while (
      state.player.xp >=
      xpRequired(state.player.level)
    ) {
      state.player.xp -=
        xpRequired(state.player.level);

      state.player.level++;

      leveledUp = true;

      notify(
        `وصلت إلى المستوى ${state.player.level}`,
        "icon-spark"
      );

      AudioEngine.success();
    }

    if (leveledUp) {
      emit("levelUp", {
        level: state.player.level
      });
    }

    saveState();

    return leveledUp;
  }


  function addCoins(amount) {
    amount = Math.max(0, safeNumber(amount));

    state.player.coins += amount;

    state.statistics.coinsEarned += amount;

    saveState();

    emit("coinsChanged", {
      amount,
      total: state.player.coins
    });
  }


  function spendCoins(amount) {
    amount = Math.max(0, safeNumber(amount));

    if (state.player.coins < amount) {
      notify("لا تملك ما يكفي من العملات", "icon-coin");
      return false;
    }

    state.player.coins -= amount;

    saveState();

    emit("coinsChanged", {
      amount: -amount,
      total: state.player.coins
    });

    return true;
  }


  /* =======================================================
     FLAGS
     ======================================================= */

  function setFlag(key, value = true) {
    state.flags[key] = value;
    saveState();
  }


  function getFlag(key, fallback = false) {
    return Object.prototype.hasOwnProperty.call(
      state.flags,
      key
    )
      ? state.flags[key]
      : fallback;
  }


  /* =======================================================
     INVENTORY
     ======================================================= */

  function hasItem(id) {
    return state.inventory.some(
      item =>
        typeof item === "string"
          ? item === id
          : item?.id === id
    );
  }


  function addItem(item) {
    if (!item) return false;

    const id =
      typeof item === "string"
        ? item
        : item.id;

    if (!id || hasItem(id)) {
      return false;
    }

    state.inventory.push(
      typeof item === "string"
        ? {
            id: item,
            name: item,
            icon: "icon-item"
          }
        : clone(item)
    );

    saveState();

    const name =
      typeof item === "string"
        ? item
        : item.name || item.id;

    toastItem(
      name,
      typeof item === "string"
        ? "icon-item"
        : item.icon || "icon-item"
    );

    emit("itemAdded", {
      item
    });

    return true;
  }


  function removeItem(id) {
    const index =
      state.inventory.findIndex(item =>
        typeof item === "string"
          ? item === id
          : item?.id === id
      );

    if (index === -1) {
      return false;
    }

    state.inventory.splice(index, 1);

    saveState();

    emit("itemRemoved", {
      id
    });

    return true;
  }


  /* =======================================================
     ACHIEVEMENTS
     ======================================================= */

  const ACHIEVEMENTS = [
    {
      id: "first_step",
      title: "البداية",
      description: "ابدأ رحلتك الأولى.",
      icon: "icon-spark",
      condition: () =>
        state.statistics.choices >= 1
    },

    {
      id: "first_choice",
      title: "القرار الأول",
      description: "اتخذ أول قرار في القصة.",
      icon: "icon-item",
      condition: () =>
        state.game.choicesMade >= 1
    },

    {
      id: "explorer",
      title: "المستكشف",
      description: "اكتشف عدة مواقع.",
      icon: "icon-chapter",
      condition: () =>
        state.history.length >= 5
    },

    {
      id: "survivor",
      title: "الناجي",
      description: "أكمل فصلاً دون فقدان كامل للصحة.",
      icon: "icon-heart",
      condition: () =>
        state.game.health > 0 &&
        state.completedChapters.length >= 1
    },

    {
      id: "collector",
      title: "جامع الأسرار",
      description: "اجمع 5 عناصر.",
      icon: "icon-bag",
      condition: () =>
        state.inventory.length >= 5
    },

    {
      id: "rich",
      title: "ثروة الظلال",
      description: "اجمع 1000 عملة.",
      icon: "icon-coin",
      condition: () =>
        state.player.coins >= 1000
    },

    {
      id: "chapter_two",
      title: "ما وراء الجبل",
      description: "افتح الفصل الثاني.",
      icon: "icon-chapter",
      condition: () =>
        state.unlockedChapters.includes(2)
    },

    {
      id: "master",
      title: "سيد المجهول",
      description: "أكمل عدة فصول.",
      icon: "icon-trophy",
      condition: () =>
        state.completedChapters.length >= 3
    }
  ];


  function unlockAchievement(id) {
    if (state.achievements.includes(id)) {
      return false;
    }

    const achievement =
      ACHIEVEMENTS.find(a => a.id === id);

    if (!achievement) {
      return false;
    }

    state.achievements.push(id);

    state.statistics.achievementsUnlocked++;

    addXP(35);

    const toast = $("achievementToast");

    if (toast) {
      const icon =
        $("achievementToastIcon");

      const title =
        $("achievementToastTitle");

      if (icon) {
        icon.className =
          `achievement-toast-icon ${achievement.icon}`;
      }

      if (title) {
        title.textContent =
          achievement.title;
      }

      toast.classList.remove("show");

      requestAnimationFrame(() => {
        toast.classList.add("show");
      });

      clearTimeout(unlockAchievement.timer);

      unlockAchievement.timer =
        setTimeout(() => {
          toast.classList.remove("show");
        }, 3200);
    }

    AudioEngine.success();

    emit("achievement", {
      achievement
    });

    saveState();

    return true;
  }


  function checkAchievements() {
    ACHIEVEMENTS.forEach(achievement => {
      try {
        if (achievement.condition()) {
          unlockAchievement(
            achievement.id
          );
        }
      } catch {}
    });
  }


  /* =======================================================
     JOURNAL
     ======================================================= */

  function addJournal(entry) {
    if (!entry) return;

    const id =
      typeof entry === "string"
        ? entry
        : entry.id || entry.title;

    if (
      id &&
      state.journal.some(item =>
        typeof item === "string"
          ? item === id
          : item?.id === id
      )
    ) {
      return;
    }

    state.journal.push(
      typeof entry === "string"
        ? {
            id,
            title: entry,
            text: "",
            time: Date.now()
          }
        : {
            ...clone(entry),
            time: Date.now()
          }
    );

    saveState();

    emit("journalAdded", {
      entry
    });
  }


  /* =======================================================
     HISTORY
     ======================================================= */

  function addHistory(scene, chapter) {
    if (!scene) return;

    state.history.push({
      chapter:
        chapter?.id ??
        state.game.chapter,

      scene:
        scene.id ??
        state.game.sceneIndex,

      title:
        scene.title ||
        scene.name ||
        "مشهد",

      location:
        scene.location ||
        "",

      time: Date.now()
    });

    if (state.history.length > 100) {
      state.history =
        state.history.slice(-100);
    }
  }


  /* =======================================================
     SCENE NORMALIZATION
     ======================================================= */

  function normalizeScene(scene) {
    if (!scene) return null;

    return {
      id:
        scene.id ??
        state.game.sceneIndex,

      title:
        scene.title ||
        scene.name ||
        "المجهول",

      text:
        scene.text ||
        scene.story ||
        scene.description ||
        "",

      location:
        scene.location ||
        scene.place ||
        "",

      weather:
        scene.weather ||
        "",

      time:
        scene.time ||
        "",

      image:
        scene.image ||
        scene.background ||
        "",

      chapterTag:
        scene.chapterTag ||
        "",

      choices:
        Array.isArray(scene.choices)
          ? scene.choices
          : Array.isArray(scene.options)
            ? scene.options
            : [],

      effects:
        scene.effects ||
        scene.effect ||
        [],

      item:
        scene.item ||
        scene.reward ||
        null,

      journal:
        scene.journal ||
        null,

      damage:
        safeNumber(
          scene.damage ||
          scene.healthLoss ||
          0
        ),

      coins:
        safeNumber(
          scene.coins ||
          scene.rewardCoins ||
          0
        ),

      xp:
        safeNumber(
          scene.xp ||
          scene.rewardXP ||
          0
        ),

      cinematic:
        scene.cinematic ||
        null,

      ending:
        !!scene.ending
    };
  }


  /* =======================================================
     CHOICE NORMALIZATION
     ======================================================= */

  function normalizeChoice(choice, index) {
    if (typeof choice === "string") {
      return {
        id: `choice_${index}`,
        text: choice,
        next: index + 1
      };
    }

    if (!choice || typeof choice !== "object") {
      return {
        id: `choice_${index}`,
        text: "متابعة",
        next: index + 1
      };
    }

    return {
      ...choice,

      id:
        choice.id ||
        `choice_${index}`,

      text:
        choice.text ||
        choice.label ||
        choice.title ||
        "اختيار",

      next:
        choice.next ??
        choice.nextScene ??
        choice.scene ??
        choice.target,

      effects:
        choice.effects ||
        choice.effect ||
        [],

      condition:
        choice.condition ||
        null,

      requires:
        choice.requires ||
        choice.requiredItem ||
        null,

      reward:
        choice.reward ||
        null,

      damage:
        safeNumber(
          choice.damage ||
          choice.healthLoss ||
          0
        ),

      coins:
        safeNumber(
          choice.coins ||
          choice.rewardCoins ||
          0
        ),

      xp:
        safeNumber(
          choice.xp ||
          choice.rewardXP ||
          0
        )
    };
  }


  /* =======================================================
     CONDITIONS
     ======================================================= */

  function conditionMet(condition) {
    if (!condition) return true;

    if (typeof condition === "function") {
      try {
        return !!condition(state);
      } catch {
        return false;
      }
    }

    if (typeof condition === "string") {
      return !!getFlag(condition);
    }

    if (Array.isArray(condition)) {
      return condition.every(
        conditionMet
      );
    }

    if (typeof condition === "object") {
      if (condition.flag) {
        return (
          getFlag(condition.flag) ===
          condition.value
        );
      }

      if (condition.item) {
        return hasItem(condition.item);
      }

      if (condition.chapter) {
        return (
          state.game.chapter >=
          safeNumber(condition.chapter)
        );
      }

      if (condition.level) {
        return (
          state.player.level >=
          safeNumber(condition.level)
        );
      }

      if (condition.coins) {
        return (
          state.player.coins >=
          safeNumber(condition.coins)
        );
      }
    }

    return true;
  }


  /* =======================================================
     EFFECTS BRIDGE
     ======================================================= */

  function playEffect(type, options = {}) {
    try {
      if (
        window.Effects &&
        typeof window.Effects.play === "function"
      ) {
        return window.Effects.play(
          type,
          options
        );
      }
    } catch {}

    return null;
  }


  function playStoryEffects(scene, extra = {}) {
    if (!scene) return;

    const effects = [];

    if (Array.isArray(scene.effects)) {
      effects.push(...scene.effects);
    } else if (scene.effects) {
      effects.push(scene.effects);
    }

    if (extra.effects) {
      if (Array.isArray(extra.effects)) {
        effects.push(...extra.effects);
      } else {
        effects.push(extra.effects);
      }
    }

    effects.forEach(effect => {
      if (typeof effect === "string") {
        playEffect(effect);
        return;
      }

      if (effect && typeof effect === "object") {
        playEffect(
          effect.type ||
          effect.name ||
          "fade",
          effect
        );
      }
    });

    try {
      if (
        window.Effects &&
        typeof window.Effects.storyEvent === "function"
      ) {
        window.Effects.storyEvent(
          scene.effect ||
          scene.storyEvent ||
          scene.event ||
          "",
          extra
        );
      }
    } catch {}
  }


  /* =======================================================
     GAME ENGINE
     ======================================================= */

  const Game = {

    start(chapter = 1, scene = 0) {
      chapter = safeNumber(chapter, 1);
      scene = safeNumber(scene, 0);

      if (
        !state.unlockedChapters.includes(chapter)
      ) {
        notify(
          "هذا الفصل لم يُفتح بعد",
          "icon-chapter"
        );
        return false;
      }

      state.game.active = true;
      state.game.paused = false;

      state.game.chapter = chapter;
      state.game.sceneIndex = scene;

      state.game.health =
        state.game.maxHealth;

      state.game.choicesMade = 0;
      state.game.correctChoices = 0;
      state.game.startedAt = Date.now();
      state.game.elapsed = 0;

      state.statistics.gamesPlayed++;

      state.firstLaunch = false;

      saveState();

      showScreen("gameScreen");

      renderScene();

      emit("gameStarted", {
        chapter,
        scene
      });

      return true;
    },


    continueGame() {
      if (!state.game.active) {
        return this.start(
          state.game.chapter || 1,
          state.game.sceneIndex || 0
        );
      }

      showScreen("gameScreen");

      renderScene();

      return true;
    },


    newGame() {
      state.game.active = false;
      state.game.paused = false;

      state.game.chapter = 1;
      state.game.sceneIndex = 0;

      state.game.health =
        state.game.maxHealth;

      state.game.choicesMade = 0;
      state.game.correctChoices = 0;

      saveState();

      return this.start(1, 0);
    },


    current() {
      return normalizeScene(
        getCurrentScene()
      );
    },


    choose(choice) {
      if (!state.game.active) {
        return false;
      }

      if (state.game.paused) {
        return false;
      }

      const scene = this.current();

      if (!scene) {
        return false;
      }

      const normalized =
        normalizeChoice(
          choice,
          0
        );

      if (
        normalized.requires &&
        !hasItem(normalized.requires)
      ) {
        notify(
          "تحتاج إلى عنصر معيّن أولاً",
          "icon-bag"
        );

        AudioEngine.danger();

        playEffect("shake", {
          duration: 350
        });

        return false;
      }

      if (
        normalized.condition &&
        !conditionMet(
          normalized.condition
        )
      ) {
        notify(
          "هذا القرار غير متاح الآن",
          "icon-settings"
        );

        return false;
      }

      state.game.choicesMade++;
      state.statistics.choices++;

      if (normalized.damage > 0) {
        damage(
          normalized.damage
        );
      }

      if (normalized.coins > 0) {
        addCoins(
          normalized.coins
        );
      }

      if (normalized.xp > 0) {
        addXP(
          normalized.xp
        );
      }

      if (normalized.reward) {
        applyReward(
          normalized.reward
        );
      }

      applyChoiceEffects(
        normalized
      );

      addHistory(
        scene,
        getChapter(
          state.game.chapter
        )
      );

      saveState();

      AudioEngine.choice();

      emit("choiceMade", {
        choice: normalized,
        scene
      });

      let next =
        normalized.next;

      if (
        next === undefined ||
        next === null ||
        next === ""
      ) {
        next =
          state.game.sceneIndex + 1;
      }

      if (
        typeof next === "string" &&
        next.startsWith("chapter:")
      ) {
        const parts =
          next.split(":");

        const chapter =
          safeNumber(parts[1], 1);

        const index =
          safeNumber(parts[2], 0);

        return this.goTo(
          chapter,
          index
        );
      }

      if (
        typeof next === "object" &&
        next
      ) {
        return this.goTo(
          safeNumber(
            next.chapter,
            state.game.chapter
          ),
          safeNumber(
            next.scene,
            0
          )
        );
      }

      return this.goTo(
        state.game.chapter,
        safeNumber(
          next,
          state.game.sceneIndex + 1
        )
      );
    },


    goTo(chapter, sceneIndex) {
      chapter =
        safeNumber(
          chapter,
          state.game.chapter
        );

      sceneIndex =
        safeNumber(
          sceneIndex,
          0
        );

      const target =
        getScene(
          chapter,
          sceneIndex
        );

      if (!target) {
        return this.finishChapter();
      }

      const oldScene =
        this.current();

      state.game.chapter = chapter;
      state.game.sceneIndex = sceneIndex;

      saveState();

      transitionToScene(
        () => renderScene(),
        chapter !==
          safeNumber(
            oldScene?.chapter,
            chapter
          )
      );

      return true;
    },


    next() {
      return this.goTo(
        state.game.chapter,
        state.game.sceneIndex + 1
      );
    },


    pause() {
      if (!state.game.active) return;

      state.game.paused = true;

      saveState();

      emit("paused");
    },


    resume() {
      if (!state.game.active) return;

      state.game.paused = false;

      emit("resumed");

      renderScene();
    },


    finishChapter() {
      const chapter =
        state.game.chapter;

      if (
        !state.completedChapters.includes(
          chapter
        )
      ) {
        state.completedChapters.push(
          chapter
        );
      }

      const reward =
        100 + chapter * 50;

      addCoins(reward);
      addXP(100 + chapter * 25);

      state.statistics.endings++;

      const nextChapter =
        chapter + 1;

      const exists =
        !!getChapter(nextChapter);

      if (
        exists &&
        !state.unlockedChapters.includes(
          nextChapter
        )
      ) {
        state.unlockedChapters.push(
          nextChapter
        );
      }

      state.game.active = false;
      state.game.paused = false;

      saveState();

      checkAchievements();

      renderEndScreen(
        chapter,
        reward,
        exists
      );

      emit("chapterFinished", {
        chapter,
        nextChapter:
          exists
            ? nextChapter
            : null
      });
    }
  };


  /* =======================================================
     DAMAGE / HEALTH
     ======================================================= */

  function damage(amount) {
    amount =
      Math.max(
        0,
        safeNumber(amount)
      );

    if (!amount) return;

    state.game.health =
      clamp(
        state.game.health - amount,
        0,
        state.game.maxHealth
      );

    playEffect(
      "danger",
      {
        duration: 700
      }
    );

    AudioEngine.danger();

    if (
      state.game.health <= 0
    ) {
      state.game.totalDeaths++;

      notify(
        "الظلام يقترب...",
        "icon-heart"
      );

      state.game.health =
        Math.max(
          1,
          Math.floor(
            state.game.maxHealth * 0.25
          )
        );
    }

    saveState();
  }


  /* =======================================================
     REWARDS
     ======================================================= */

  function applyReward(reward) {
    if (!reward) return;

    if (typeof reward === "string") {
      addItem(reward);
      return;
    }

    if (reward.item) {
      addItem(
        typeof reward.item === "object"
          ? reward.item
          : {
              id: reward.item,
              name:
                reward.itemName ||
                reward.item,
              icon:
                reward.icon ||
                "icon-item"
            }
      );
    }

    if (reward.coins) {
      addCoins(
        safeNumber(reward.coins)
      );
    }

    if (reward.xp) {
      addXP(
        safeNumber(reward.xp)
      );
    }

    if (reward.flag) {
      setFlag(
        reward.flag,
        reward.value ?? true
      );
    }

    if (reward.journal) {
      addJournal(
        reward.journal
      );
    }
  }


  function applyChoiceEffects(choice) {
    if (!choice) return;

    playStoryEffects(
      null,
      {
        effects:
          choice.effects
      }
    );

    if (choice.flag) {
      setFlag(
        choice.flag,
        choice.value ?? true
      );
    }

    if (choice.setFlag) {
      if (
        typeof choice.setFlag === "object"
      ) {
        Object.keys(
          choice.setFlag
        ).forEach(key => {
          setFlag(
            key,
            choice.setFlag[key]
          );
        });
      }
    }

    if (choice.item) {
      addItem(
        choice.item
      );
    }

    if (choice.journal) {
      addJournal(
        choice.journal
      );
    }
  }


  /* =======================================================
     UI HELPERS
     ======================================================= */

  function showScreen(id) {
    document
      .querySelectorAll(
        ".screen"
      )
      .forEach(screen => {
        screen.classList.remove(
          "active"
        );
      });

    const screen =
      $(id);

    if (screen) {
      screen.classList.add(
        "active"
      );
    }
  }


  function setText(id, value) {
    const el = $(id);

    if (el) {
      el.textContent =
        value ?? "";
    }
  }


  function setHTML(id, value) {
    const el = $(id);

    if (el) {
      el.innerHTML =
        value ?? "";
    }
  }


  /* =======================================================
     SCENE RENDER
     ======================================================= */

  function renderScene() {
    const scene =
      Game.current();

    if (!scene) {
      Game.finishChapter();
      return;
    }

    const chapter =
      getChapter(
        state.game.chapter
      );

    renderHUD(chapter, scene);

    renderSceneVisual(scene);

    renderStory(scene);

    renderChoices(scene);

    updateBottomUI();

    playStoryEffects(scene);

    checkAchievements();

    saveState();
  }


  function renderHUD(chapter, scene) {
    setText(
      "chapterLabel",
      chapter?.label ||
      `الفصل ${state.game.chapter}`
    );

    setText(
      "chapterTitleTop",
      chapter?.title ||
      `الفصل ${state.game.chapter}`
    );

    const total =
      Math.max(
        1,
        getScenes(chapter).length
      );

    const progress =
      clamp(
        ((state.game.sceneIndex + 1) /
          total) * 100,
        0,
        100
      );

    const bar =
      $("progressBar");

    if (bar) {
      bar.style.width =
        `${progress}%`;
    }

    setText(
      "progressText",
      `${Math.round(progress)}%`
    );

    setText(
      "health",
      formatNumber(
        state.game.health
      )
    );

    setText(
      "coins",
      formatNumber(
        state.player.coins
      )
    );

    setText(
      "chapter",
      formatNumber(
        state.game.chapter
      )
    );
  }


  function renderSceneVisual(scene) {
    const image =
      $("sceneImage");

    if (image) {
      if (scene.image) {
        image.src =
          scene.image;

        image.style.display =
          "block";
      } else {
        image.removeAttribute(
          "src"
        );

        image.style.display =
          "none";
      }
    }

    setText(
      "sceneWeather",
      scene.weather
    );

    setText(
      "sceneTime",
      scene.time
    );

    const location =
      $("sceneLocation");

    if (location) {
      location.textContent =
        scene.location;
    }
  }


  function renderStory(scene) {
    setText(
      "sceneChapterTag",
      scene.chapterTag ||
      `الفصل ${state.game.chapter}`
    );

    setText(
      "sceneTitle",
      scene.title
    );

    const story =
      $("storyText");

    if (!story) return;

    story.innerHTML = "";

    typeText(
      story,
      scene.text
    );
  }


  let typingToken = 0;

  async function typeText(
    element,
    text
  ) {
    const token =
      ++typingToken;

    text =
      String(text || "");

    element.textContent = "";

    for (
      let i = 0;
      i < text.length;
      i++
    ) {
      if (token !== typingToken) {
        return;
      }

      element.textContent +=
        text[i];

      if (
        text[i] !== " " &&
        i % 3 === 0
      ) {
        await wait(10);
      }
    }
  }


  /* =======================================================
     CHOICE RENDER
     ======================================================= */

  function renderChoices(scene) {
    const area =
      $("choices");

    if (!area) return;

    area.innerHTML = "";

    const choices =
      scene.choices.length
        ? scene.choices
        : [
            {
              id: "continue",
              text: "متابعة",
              next:
                state.game.sceneIndex + 1
            }
          ];

    choices
      .map(normalizeChoice)
      .forEach((choice, index) => {
        const button =
          document.createElement(
            "button"
          );

        button.type = "button";

        button.className =
          "choice-button";

        button.dataset.choice =
          choice.id;

        button.dataset.index =
          index;

        const locked =
          !conditionMet(
            choice.condition
          ) ||
          (
            choice.requires &&
            !hasItem(
              choice.requires
            )
          );

        if (locked) {
          button.classList.add(
            "locked"
          );
        }

        const number =
          document.createElement(
            "span"
          );

        number.className =
          "choice-number";

        number.textContent =
          String(index + 1);

        const text =
          document.createElement(
            "span"
          );

        text.className =
          "choice-text";

        text.textContent =
          choice.text;

        button.append(
          number,
          text
        );

        if (
          choice.requires &&
          !hasItem(
            choice.requires
          )
        ) {
          const lock =
            document.createElement(
              "span"
            );

          lock.className =
            "choice-lock";

          lock.textContent =
            "مغلق";

          button.append(lock);
        }

        area.appendChild(
          button
        );
      });
  }


  /* =======================================================
     SCENE TRANSITION
     ======================================================= */

  function transitionToScene(
    callback,
    chapterChange = false
  ) {
    const transition =
      $("sceneTransition");

    if (!transition) {
      callback();
      return;
    }

    transition.classList.add(
      "active"
    );

    if (chapterChange) {
      const chapter =
        getChapter(
          state.game.chapter
        );

      setText(
        "transitionChapter",
        chapter?.label ||
        `الفصل ${state.game.chapter}`
      );

      setText(
        "transitionTitle",
        chapter?.title ||
        "ظلال المجهول"
      );
    }

    setTimeout(() => {
      callback();

      setTimeout(() => {
        transition.classList.remove(
          "active"
        );
      }, 450);
    }, 450);
  }


  /* =======================================================
     END SCREEN
     ======================================================= */

  function renderEndScreen(
    chapter,
    reward,
    hasNext
  ) {
    showScreen(
      "endScreen"
    );

    setText(
      "finalChapter",
      formatNumber(chapter)
    );

    setText(
      "finalCoins",
      formatNumber(reward)
    );

    setText(
      "finalAchievements",
      formatNumber(
        state.achievements.length
      )
    );

    setText(
      "endTitle",
      hasNext
        ? "انتهى الفصل..."
        : "نهاية الرحلة"
    );

    setText(
      "endText",
      hasNext
        ? "لكن الحقيقة لم تظهر كاملة بعد."
        : "لقد وصلت إلى نهاية هذا الجزء من القصة."
    );

    const icon =
      $("endIcon");

    if (icon) {
      icon.className =
        hasNext
          ? "end-icon icon-spark"
          : "end-icon icon-trophy";
    }

    playEffect(
      hasNext
        ? "light"
        : "supernatural",
      {
        duration: 1200
      }
    );
  }


  /* =======================================================
     INVENTORY UI
     ======================================================= */

  function renderInventory() {
    const content =
      $("inventoryContent");

    if (!content) return;

    if (!state.inventory.length) {
      content.innerHTML = `
        <div class="empty-state">
          <span class="icon-bag"></span>
          <p>الحقيبة فارغة</p>
        </div>
      `;

      return;
    }

    content.innerHTML =
      state.inventory
        .map(item => {
          const id =
            typeof item === "string"
              ? item
              : item.id;

          const name =
            typeof item === "string"
              ? item
              : item.name || id;

          const icon =
            typeof item === "string"
              ? "icon-item"
              : item.icon || "icon-item";

          const description =
            typeof item === "string"
              ? ""
              : item.description || "";

          return `
            <div class="inventory-item">
              <span class="inventory-item-icon ${escapeHTML(icon)}"></span>
              <div class="inventory-item-info">
                <strong>${escapeHTML(name)}</strong>
                <small>${escapeHTML(description)}</small>
              </div>
            </div>
          `;
        })
        .join("");
  }


  /* =======================================================
     ACHIEVEMENTS UI
     ======================================================= */

  function renderAchievements() {
    setText(
      "achievementUnlocked",
      state.achievements.length
    );

    setText(
      "achievementTotal",
      ACHIEVEMENTS.length
    );

    const content =
      $("achievementsContent");

    if (!content) return;

    content.innerHTML =
      ACHIEVEMENTS
        .map(achievement => {
          const unlocked =
            state.achievements.includes(
              achievement.id
            );

          return `
            <div class="achievement-item ${unlocked ? "unlocked" : "locked"}">
              <span class="achievement-icon ${escapeHTML(achievement.icon)}"></span>

              <div class="achievement-info">
                <strong>
                  ${escapeHTML(achievement.title)}
                </strong>

                <small>
                  ${escapeHTML(achievement.description)}
                </small>
              </div>
            </div>
          `;
        })
        .join("");
  }


  /* =======================================================
     JOURNAL UI
     ======================================================= */

  function renderJournal() {
    const content =
      $("journalContent");

    if (!content) return;

    if (!state.journal.length) {
      content.innerHTML = `
        <div class="empty-state">
          <span class="icon-journal"></span>
          <p>دفترك مازال فارغاً.</p>
        </div>
      `;

      return;
    }

    content.innerHTML =
      [...state.journal]
        .reverse()
        .map(entry => `
          <article class="journal-entry">
            <h3>
              ${escapeHTML(
                entry.title ||
                "ملاحظة"
              )}
            </h3>

            <p>
              ${escapeHTML(
                entry.text ||
                ""
              )}
            </p>
          </article>
        `)
        .join("");
  }


  /* =======================================================
     UI STATE
     ======================================================= */

  function updateBottomUI() {
    setText(
      "inventoryCount",
      state.inventory.length
    );

    setText(
      "achievementCount",
      state.achievements.length
    );

    setText(
      "inventoryCount",
      state.inventory.length
    );
  }


  function updateSettingsUI() {
    const sound =
      $("sfxToggle");

    const music =
      $("musicToggle");

    const motion =
      $("motionToggle");

    if (sound) {
      sound.checked =
        !!state.settings.sound;
    }

    if (music) {
      music.checked =
        !!state.settings.music;
    }

    if (motion) {
      motion.checked =
        !!state.settings.motion;
    }
  }


  /* =======================================================
     CONTINUE BUTTON
     ======================================================= */

  function updateContinueButton() {
    const btn =
      $("continueBtn");

    if (!btn) return;

    if (
      state.game.active
    ) {
      btn.style.display =
        "flex";
    } else {
      btn.style.display =
        "none";
    }
  }


  /* =======================================================
     MODALS
     ======================================================= */

  function openOverlay(id) {
    const overlay =
      $(id);

    if (!overlay) return;

    overlay.classList.add(
      "active"
    );
  }


  function closeOverlay(id) {
    const overlay =
      $(id);

    if (!overlay) return;

    overlay.classList.remove(
      "active"
    );
  }


  function closeAllOverlays() {
    document
      .querySelectorAll(
        ".overlay.active"
      )
      .forEach(el =>
        el.classList.remove(
          "active"
        )
      );
  }


  /* =======================================================
     CINEMATIC EVENTS
     ======================================================= */

  function cinematic(
    title,
    text,
    label = "ظلال المجهول"
  ) {
    const overlay =
      $("cinematicOverlay");

    if (!overlay) return;

    setText(
      "cinematicLabel",
      label
    );

    setText(
      "cinematicTitle",
      title
    );

    setText(
      "cinematicText",
      text
    );

    overlay.classList.add(
      "active"
    );

    playEffect(
      "fade",
      {
        duration: 700
      }
    );
  }


  /* =======================================================
     INPUT HELPERS
     ======================================================= */

  function findChoiceFromButton(button) {
    const scene =
      Game.current();

    if (!scene) return null;

    const choices =
      scene.choices.length
        ? scene.choices
        : [
            {
              id: "continue",
              text: "متابعة",
              next:
                state.game.sceneIndex + 1
            }
          ];

    const index =
      safeNumber(
        button.dataset.index,
        0
      );

    return normalizeChoice(
      choices[index],
      index
    );
  }


  /* =======================================================
     INITIAL UI REFRESH
     ======================================================= */

  function refreshUI() {
    updateContinueButton();
    updateSettingsUI();
    updateBottomUI();

    if (
      state.game.active
    ) {
      renderScene();
    }
  }


  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.SHADOWS = {
    state,

    getState() {
      return state;
    },

    save: saveState,

    reset: resetState,

    on,

    emit,

    Game,

    Audio: AudioEngine,

    Effects: window.Effects || null,

    addXP,

    addCoins,

    spendCoins,

    addItem,

    removeItem,

    hasItem,

    addJournal,

    setFlag,

    getFlag,

    notify,

    cinematic,

    checkAchievements,

    renderScene,

    renderInventory,

    renderAchievements,

    renderJournal
  };


  /* =======================================================
     DOM EVENTS
     ======================================================= */

  function bindEvents() {

    $("continueBtn")?.addEventListener(
      "click",
      () => {
        AudioEngine.click();
        Game.continueGame();
      }
    );


    $("newGameBtn")?.addEventListener(
      "click",
      () => {
        AudioEngine.click();
        Game.newGame();
      }
    );


    $("howToPlayBtn")?.addEventListener(
      "click",
      () => {
        AudioEngine.click();
        openOverlay(
          "howToPlayOverlay"
        );
      }
    );


    $("closeHowToPlayBtn")?.addEventListener(
      "click",
      () => {
        closeOverlay(
          "howToPlayOverlay"
        );
      }
    );


    $("tutorialOkBtn")?.addEventListener(
      "click",
      () => {
        closeOverlay(
          "howToPlayOverlay"
        );
      }
    );


    $("menuBtn")?.addEventListener(
      "click",
      () => {
        AudioEngine.click();

        Game.pause();

        openOverlay(
          "menuOverlay"
        );
      }
    );


    $("closeMenuBtn")?.addEventListener(
      "click",
      () => {
        closeOverlay(
          "menuOverlay"
        );

        Game.resume();
      }
    );


    $("inventoryBtn")?.addEventListener(
      "click",
      () => {
        AudioEngine.click();
        renderInventory();
        openOverlay(
          "inventoryOverlay"
        );
      }
    );


    $("closeInventoryBtn")?.addEventListener(
      "click",
      () => {
        closeOverlay(
          "inventoryOverlay"
        );
      }
    );


    $("achievementsBtn")?.addEventListener(
      "click",
      () => {
        AudioEngine.click();
        renderAchievements();
        openOverlay(
          "achievementsOverlay"
        );
      }
    );


    $("closeAchievementsBtn")?.addEventListener(
      "click",
      () => {
        closeOverlay(
          "achievementsOverlay"
        );
      }
    );


    $("journalBtn")?.addEventListener(
      "click",
      () => {
        AudioEngine.click();
        renderJournal();
        openOverlay(
          "journalOverlay"
        );
      }
    );


    $("closeJournalBtn")?.addEventListener(
      "click",
      () => {
        closeOverlay(
          "journalOverlay"
        );
      }
    );


    $("menuInventoryBtn")?.addEventListener(
      "click",
      () => {
        closeOverlay(
          "menuOverlay"
        );

        renderInventory();

        openOverlay(
          "inventoryOverlay"
        );
      }
    );


    $("menuAchievementsBtn")?.addEventListener(
      "click",
      () => {
        closeOverlay(
          "menuOverlay"
        );

        renderAchievements();

        openOverlay(
          "achievementsOverlay"
        );
      }
    );


    $("menuJournalBtn")?.addEventListener(
      "click",
      () => {
        closeOverlay(
          "menuOverlay"
        );

        renderJournal();

        openOverlay(
          "journalOverlay"
        );
      }
    );


    $("menuSettingsBtn")?.addEventListener(
      "click",
      () => {
        closeOverlay(
          "menuOverlay"
        );

        updateSettingsUI();

        openOverlay(
          "settingsOverlay"
        );
      }
    );


    $("closeSettingsBtn")?.addEventListener(
      "click",
      () => {
        closeOverlay(
          "settingsOverlay"
        );
      }
    );


    $("settingsDoneBtn")?.addEventListener(
      "click",
      () => {
        closeOverlay(
          "settingsOverlay"
        );

        saveState();
      }
    );


    $("saveGameBtn")?.addEventListener(
      "click",
      () => {
        saveState();

        notify(
          "تم حفظ تقدمك",
          "icon-spark"
        );

        closeOverlay(
          "menuOverlay"
        );

        Game.resume();
      }
    );


    $("exitToTitleBtn")?.addEventListener(
      "click",
      () => {
        saveState();

        closeAllOverlays();

        state.game.paused = false;

        showScreen(
          "startScreen"
        );

        updateContinueButton();
      }
    );


    $("restartFromEnd")?.addEventListener(
      "click",
      () => {
        AudioEngine.click();

        Game.newGame();
      }
    );


    $("endToTitleBtn")?.addEventListener(
      "click",
      () => {
        showScreen(
          "startScreen"
        );

        updateContinueButton();
      }
    );


    $("soundBtn")?.addEventListener(
      "click",
      () => {
        state.settings.sound =
          !state.settings.sound;

        saveState();

        updateSettingsUI();

        const icon =
          $("soundIcon");

        if (icon) {
          icon.className =
            state.settings.sound
              ? "icon-volume"
              : "icon-volume-off";
        }

        if (state.settings.sound) {
          AudioEngine.click();
        }
      }
    );


    $("sfxToggle")?.addEventListener(
      "change",
      event => {
        state.settings.sound =
          !!event.target.checked;

        saveState();
      }
    );


    $("musicToggle")?.addEventListener(
      "change",
      event => {
        state.settings.music =
          !!event.target.checked;

        saveState();

        emit(
          "musicChanged",
          {
            enabled:
              state.settings.music
          }
        );
      }
    );


    $("motionToggle")?.addEventListener(
      "change",
      event => {
        state.settings.motion =
          !!event.target.checked;

        saveState();

        try {
          window.Effects?.setMotion?.(
            state.settings.motion
          );
        } catch {}
      }
    );


    $("cinematicContinueBtn")?.addEventListener(
      "click",
      () => {
        closeOverlay(
          "cinematicOverlay"
        );
      }
    );


    $("skipTextBtn")?.addEventListener(
      "click",
      () => {
        typingToken++;

        const scene =
          Game.current();

        if (scene) {
          setText(
            "storyText",
            scene.text
          );
        }
      }
    );


    $("choices")?.addEventListener(
      "click",
      event => {
        const button =
          event.target.closest(
            ".choice-button"
          );

        if (!button) return;

        if (
          button.classList.contains(
            "locked"
          )
        ) {
          AudioEngine.danger();

          playEffect(
            "shake",
            {
              duration: 350
            }
          );

          notify(
            "هذا الاختيار مغلق",
            "icon-settings"
          );

          return;
        }

        const choice =
          findChoiceFromButton(
            button
          );

        if (!choice) return;

        button.classList.add(
          "selected"
        );

        Game.choose(choice);
      });
  }


  /* =======================================================
     KEYBOARD
     ======================================================= */

  function bindKeyboard() {
    document.addEventListener(
      "keydown",
      event => {
        if (
          !state.game.active ||
          state.game.paused
        ) {
          return;
        }

        if (
          ["1", "2", "3", "4"].includes(
            event.key
          )
        ) {
          const index =
            Number(event.key) - 1;

          const button =
            document.querySelector(
              `.choice-button[data-index="${index}"]`
            );

          if (button) {
            button.click();
          }
        }

        if (
          event.key === "Escape"
        ) {
          openOverlay(
            "menuOverlay"
          );

          Game.pause();
        }
      }
    );
  }


  /* =======================================================
     VISIBILITY
     ======================================================= */

  function bindVisibility() {
    document.addEventListener(
      "visibilitychange",
      () => {
        if (
          document.hidden &&
          state.game.active
        ) {
          Game.pause();
          saveState();
        }
      }
    );
  }


  /* =======================================================
     BOOT
     ======================================================= */

  function boot() {
    bindEvents();
    bindKeyboard();
    bindVisibility();

    try {
      window.Effects?.init?.();
      window.Effects?.setMotion?.(
        state.settings.motion
      );
    } catch {}

    updateSettingsUI();
    updateContinueButton();

    if (
      state.game.active
    ) {
      showScreen(
        "startScreen"
      );
    } else {
      showScreen(
        "startScreen"
      );
    }

    checkAchievements();

    emit("ready");
  }


  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      boot,
      {
        once: true
      }
    );
  } else {
    boot();
  }

})();

/* =========================================================
   ظلال المجهول — SHADOWS OF THE UNKNOWN
   script.js — ULTRA V6
   PART 2 / 2
   تكملة مباشرة للجزء الأول
   ========================================================= */


/* =======================================================
   PLAYER PROFILE
   ======================================================= */

function renderPlayerProfile() {
  const player = state.player;

  const name =
    player.name ||
    "المحقق";

  const level =
    safeNumber(player.level, 1);

  const xp =
    safeNumber(player.xp, 0);

  const required =
    xpRequired(level);

  const percent =
    clamp(
      (xp / required) * 100,
      0,
      100
    );

  document
    .querySelectorAll(
      "[data-player-name]"
    )
    .forEach(el => {
      el.textContent = name;
    });

  document
    .querySelectorAll(
      "[data-player-level]"
    )
    .forEach(el => {
      el.textContent =
        formatNumber(level);
    });

  document
    .querySelectorAll(
      "[data-player-xp]"
    )
    .forEach(el => {
      el.textContent =
        `${formatNumber(xp)} / ${formatNumber(required)}`;
    });

  document
    .querySelectorAll(
      "[data-xp-progress]"
    )
    .forEach(el => {
      el.style.width =
        `${percent}%`;
    });
}


/* =======================================================
   SAVE / LOAD UI
   ======================================================= */

function hasSaveGame() {
  return !!(
    state.game.active ||
    state.history.length ||
    state.completedChapters.length
  );
}


function prepareContinue() {
  const btn =
    $("continueBtn");

  if (!btn) return;

  btn.style.display =
    hasSaveGame()
      ? "flex"
      : "none";
}


/* =======================================================
   DAILY SYSTEM
   ======================================================= */

function getTodayKey() {
  const date =
    new Date();

  return [
    date.getFullYear(),
    String(
      date.getMonth() + 1
    ).padStart(2, "0"),
    String(
      date.getDate()
    ).padStart(2, "0")
  ].join("-");
}


function updateDaily() {
  const today =
    getTodayKey();

  if (
    state.daily.date !== today
  ) {
    state.daily = {
      date: today,
      completed: false,
      rewardClaimed: false
    };

    saveState();
  }
}


function completeDaily() {
  updateDaily();

  if (
    state.daily.completed
  ) {
    return false;
  }

  state.daily.completed =
    true;

  if (
    !state.daily.rewardClaimed
  ) {
    state.daily.rewardClaimed =
      true;

    addCoins(75);
    addXP(50);

    notify(
      "أكملت تحدي اليوم",
      "icon-trophy"
    );
  }

  saveState();

  return true;
}


/* =======================================================
   CHAPTER UNLOCKING
   ======================================================= */

function unlockChapter(chapter) {
  chapter =
    safeNumber(
      chapter,
      1
    );

  if (
    state.unlockedChapters.includes(
      chapter
    )
  ) {
    return false;
  }

  state.unlockedChapters.push(
    chapter
  );

  state.unlockedChapters =
    [...new Set(
      state.unlockedChapters
    )].sort(
      (a, b) => a - b
    );

  saveState();

  notify(
    `تم فتح الفصل ${chapter}`,
    "icon-chapter",
    3000
  );

  emit(
    "chapterUnlocked",
    {
      chapter
    }
  );

  checkAchievements();

  return true;
}


/* =======================================================
   CHAPTER PROGRESS
   ======================================================= */

function getChapterProgress(
  chapterId = state.game.chapter
) {
  const chapter =
    getChapter(chapterId);

  if (!chapter) {
    return {
      current: 0,
      total: 0,
      percent: 0
    };
  }

  const total =
    getScenes(chapter).length;

  const current =
    clamp(
      state.game.chapter === chapterId
        ? state.game.sceneIndex + 1
        : 0,
      0,
      total
    );

  return {
    current,
    total,
    percent:
      total
        ? Math.round(
            (current / total) * 100
          )
        : 0
  };
}


/* =======================================================
   SCENE EVENTS
   ======================================================= */

function processSceneData(scene) {
  if (!scene) return;

  if (scene.flag) {
    setFlag(
      scene.flag,
      scene.flagValue ?? true
    );
  }

  if (
    scene.flags &&
    typeof scene.flags === "object"
  ) {
    Object.keys(
      scene.flags
    ).forEach(key => {
      setFlag(
        key,
        scene.flags[key]
      );
    });
  }

  if (scene.item) {
    addItem(
      scene.item
    );
  }

  if (scene.journal) {
    addJournal(
      scene.journal
    );
  }

  if (scene.reward) {
    applyReward(
      scene.reward
    );
  }

  if (scene.coins) {
    addCoins(
      safeNumber(scene.coins)
    );
  }

  if (scene.xp) {
    addXP(
      safeNumber(scene.xp)
    );
  }
}


/* =======================================================
   ENHANCED SCENE RENDER
   ======================================================= */

const originalRenderScene =
  renderScene;

renderScene = function () {
  const scene =
    Game.current();

  if (!scene) {
    Game.finishChapter();
    return;
  }

  processSceneData(
    scene
  );

  originalRenderScene();

  renderPlayerProfile();
  prepareContinue();
};


/* =======================================================
   SCENE VISUAL STATE
   ======================================================= */

function applySceneClasses(scene) {
  const area =
    $("sceneArea");

  if (!area) return;

  [
    "danger-mode",
    "dark-mode",
    "light-event",
    "fog-event",
    "wind-event",
    "rain-event",
    "shadow-event"
  ].forEach(cls => {
    area.classList.remove(
      cls
    );
  });

  const effects =
    Array.isArray(scene.effects)
      ? scene.effects
      : [scene.effects];

  effects
    .filter(Boolean)
    .forEach(effect => {
      const type =
        typeof effect === "string"
          ? effect
          : effect.type;

      if (!type) return;

      const cls =
        `${type}-event`;

      if (
        [
          "light",
          "fog",
          "wind",
          "rain",
          "shadow"
        ].includes(type)
      ) {
        area.classList.add(
          cls
        );
      }

      if (
        [
          "danger",
          "darkness"
        ].includes(type)
      ) {
        area.classList.add(
          type === "danger"
            ? "danger-mode"
            : "dark-mode"
        );
      }
    });
}


/* =======================================================
   EFFECT-AWARE RENDER PATCH
   ======================================================= */

const baseRenderVisual =
  renderSceneVisual;

renderSceneVisual =
  function (scene) {
    baseRenderVisual(scene);
    applySceneClasses(scene);
  };


/* =======================================================
   CINEMATIC STORY SUPPORT
   ======================================================= */

function runCinematic(scene) {
  if (!scene) return;

  const cinematicData =
    scene.cinematic;

  if (!cinematicData) {
    return;
  }

  if (
    typeof cinematicData === "string"
  ) {
    cinematic(
      "لحظة...",
      cinematicData
    );

    return;
  }

  cinematic(
    cinematicData.title ||
      "لحظة غامضة",

    cinematicData.text ||
      "",

    cinematicData.label ||
      "ظلال المجهول"
  );
}


/* =======================================================
   EFFECT EVENT SUPPORT
   ======================================================= */

function processSpecialEvent(scene) {
  if (!scene) return;

  const event =
    scene.event ||
    scene.storyEvent ||
    scene.specialEvent;

  if (!event) return;

  if (
    typeof event === "string"
  ) {
    playEffect(
      event
    );

    return;
  }

  if (
    typeof event === "object"
  ) {
    playEffect(
      event.type ||
        event.name ||
        "fade",
      event
    );
  }
}


/* =======================================================
   GAME START PATCH
   ======================================================= */

const originalStart =
  Game.start.bind(Game);

Game.start =
  function (
    chapter = 1,
    scene = 0
  ) {
    const result =
      originalStart(
        chapter,
        scene
      );

    if (result) {
      updateDaily();
      renderPlayerProfile();

      setTimeout(() => {
        const current =
          Game.current();

        if (current) {
          runCinematic(
            current
          );

          processSpecialEvent(
            current
          );
        }
      }, 300);
    }

    return result;
  };


/* =======================================================
   CHOICE FEEDBACK
   ======================================================= */

on(
  "choiceMade",
  ({ choice }) => {
    state.game.correctChoices++;

    if (choice.xp) {
      addXP(
        safeNumber(choice.xp)
      );
    }

    if (choice.coins) {
      addCoins(
        safeNumber(choice.coins)
      );
    }

    if (
      choice.effects?.length
    ) {
      choice.effects.forEach(
        effect => {
          if (
            typeof effect === "string"
          ) {
            playEffect(
              effect
            );
          } else if (
            effect &&
            typeof effect === "object"
          ) {
            playEffect(
              effect.type ||
                effect.name,
              effect
            );
          }
        }
      );
    }

    checkAchievements();
    saveState();
  }
);


/* =======================================================
   GAME START EVENT
   ======================================================= */

on(
  "gameStarted",
  () => {
    const scene =
      Game.current();

    if (!scene) return;

    updateBottomUI();
    renderPlayerProfile();

    setTimeout(() => {
      runCinematic(
        scene
      );

      processSpecialEvent(
        scene
      );
    }, 250);
  }
);


/* =======================================================
   CHAPTER EVENTS
   ======================================================= */

on(
  "chapterUnlocked",
  ({ chapter }) => {
    playEffect(
      "light",
      {
        duration: 1100
      }
    );

    notify(
      `الفصل ${chapter} أصبح متاحاً`,
      "icon-chapter",
      3200
    );
  }
);


on(
  "chapterFinished",
  ({ nextChapter }) => {
    if (nextChapter) {
      unlockChapter(
        nextChapter
      );
    }

    renderPlayerProfile();
  }
);


/* =======================================================
   LEVEL UP
   ======================================================= */

on(
  "levelUp",
  ({ level }) => {
    playEffect(
      "supernatural",
      {
        duration: 1200
      }
    );

    cinematic(
      `المستوى ${level}`,
      "أنت تقترب أكثر من الحقيقة...",
      "تطور المحقق"
    );
  }
);


/* =======================================================
   INVENTORY EVENTS
   ======================================================= */

on(
  "itemAdded",
  () => {
    renderInventory();
    updateBottomUI();
    checkAchievements();
  }
);


on(
  "itemRemoved",
  () => {
    renderInventory();
    updateBottomUI();
  }
);


/* =======================================================
   ACHIEVEMENT EVENTS
   ======================================================= */

on(
  "achievement",
  () => {
    renderAchievements();
    updateBottomUI();

    playEffect(
      "light",
      {
        duration: 800
      }
    );
  }
);


/* =======================================================
   SETTINGS
   ======================================================= */

function syncSettings() {
  updateSettingsUI();

  try {
    window.Effects?.setMotion?.(
      !!state.settings.motion
    );
  } catch {}

  const soundIcon =
    $("soundIcon");

  if (soundIcon) {
    soundIcon.className =
      state.settings.sound
        ? "icon-volume"
        : "icon-volume-off";
  }
}


/* =======================================================
   MUSIC
   ======================================================= */

function setupMusic() {
  const music =
    $("bgMusic");

  if (!music) return;

  music.loop = true;

  music.volume = 0.22;

  const updateMusic =
    () => {
      if (
        state.settings.music
      ) {
        music.play().catch(
          () => {}
        );
      } else {
        music.pause();
      }
    };

  document.addEventListener(
    "click",
    updateMusic,
    {
      once: true
    }
  );

  on(
    "musicChanged",
    updateMusic
  );
}


/* =======================================================
   AUDIO UNLOCK
   ======================================================= */

function unlockAudio() {
  try {
    AudioEngine.ensure();
  } catch {}

  const music =
    $("bgMusic");

  if (
    music &&
    state.settings.music
  ) {
    music.play().catch(
      () => {}
    );
  }
}


document.addEventListener(
  "pointerdown",
  unlockAudio,
  {
    once: true
  }
);


/* =======================================================
   LOADING SCREEN
   ======================================================= */

function finishLoading() {
  const loading =
    $("loadingScreen");

  if (!loading) return;

  const progress =
    $("loadingProgress");

  const status =
    $("loadingStatus");

  if (progress) {
    progress.style.width =
      "100%";
  }

  if (status) {
    status.textContent =
      "اكتمل التحميل";
  }

  setTimeout(() => {
    loading.classList.add(
      "hidden"
    );
  }, 450);
}


function animateLoading() {
  const progress =
    $("loadingProgress");

  const status =
    $("loadingStatus");

  if (!progress) {
    finishLoading();
    return;
  }

  const messages = [
    "إيقاظ الذاكرة...",
    "فتح بوابة المجهول...",
    "تجهيز الظلال...",
    "استدعاء القصة...",
    "تهيئة العالم...",
    "الاستعداد..."
  ];

  let value = 0;
  let index = 0;

  const timer =
    setInterval(() => {
      value += random(8, 17);

      value =
        Math.min(
          value,
          100
        );

      progress.style.width =
        `${value}%`;

      if (
        status &&
        value % 2 === 0
      ) {
        status.textContent =
          messages[
            Math.min(
              index++,
              messages.length - 1
            )
          ];
      }

      if (value >= 100) {
        clearInterval(timer);

        finishLoading();
      }
    }, 120);
}


/* =======================================================
   AUTO SAVE
   ======================================================= */

setInterval(
  () => {
    if (
      state.game.active
    ) {
      state.game.elapsed =
        Math.max(
          0,
          Math.floor(
            (
              Date.now() -
              state.game.startedAt
            ) / 1000
          )
        );
    }

    saveState();
  },
  15000
);


/* =======================================================
   BEFORE EXIT
   ======================================================= */

window.addEventListener(
  "beforeunload",
  () => {
    saveState();
  }
);


/* =======================================================
   STARTUP
   ======================================================= */

function finalBoot() {
  updateDaily();
  syncSettings();
  setupMusic();

  renderPlayerProfile();

  prepareContinue();

  animateLoading();

  if (
    !state.game.active
  ) {
    showScreen(
      "startScreen"
    );
  }

  emit(
    "engineReady",
    {
      version: 6
    }
  );
}


if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    finalBoot,
    {
      once: true
    }
  );
} else {
  finalBoot();
}


/* =======================================================
   FINAL GLOBAL API
   ======================================================= */

window.SHADOWS_ULTRA = {
  version: "ULTRA V6",

  state,

  Game,

  Audio: AudioEngine,

  Effects:
    window.Effects || null,

  achievements:
    ACHIEVEMENTS,

  save:
    saveState,

  reset:
    resetState,

  notify,

  cinematic,

  addXP,

  addCoins,

  spendCoins,

  addItem,

  removeItem,

  hasItem,

  addJournal,

  setFlag,

  getFlag,

  unlockChapter,

  getChapterProgress,

  completeDaily,

  renderScene,

  renderInventory,

  renderAchievements,

  renderJournal,

  renderPlayerProfile
};

})();