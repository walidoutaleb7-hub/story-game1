/* =========================================================
   ظلال المجهول — SHADOWS OF THE UNKNOWN
   script.js — GAME ENGINE
   ULTRA V5 — PART 1/2
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     1. GLOBAL HELPERS
     ========================================================= */

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

  const byId = id =>
    document.getElementById(id);

  const safeNumber = (value, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };

  const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max);

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const randomItem = array =>
    Array.isArray(array) && array.length
      ? array[Math.floor(Math.random() * array.length)]
      : null;

  const shuffle = array => {
    if (!Array.isArray(array)) return [];

    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  };

  const escapeHTML = value => {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const now = () => Date.now();

  const formatNumber = number =>
    safeNumber(number).toLocaleString("ar-DZ");

  const delay = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

  /* =========================================================
     2. STORAGE ENGINE
     ========================================================= */

  const STORAGE_KEY = "shadows_of_unknown_ultra_v5";

  const storage = {

    read() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) return null;

        const parsed = JSON.parse(raw);

        return parsed && typeof parsed === "object"
          ? parsed
          : null;

      } catch (error) {
        console.warn("Storage read error:", error);
        return null;
      }
    },

    write(data) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(data)
        );

        return true;

      } catch (error) {
        console.warn("Storage write error:", error);
        return false;
      }
    },

    remove() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.warn("Storage remove error:", error);
      }
    }
  };

  /* =========================================================
     3. DEFAULT PLAYER STATE
     ========================================================= */

  const DEFAULT_STATE = {

    version: 5,

    firstLaunch: true,

    player: {
      name: "المحقق",
      avatar: "🕵️",
      level: 1,
      xp: 0,
      coins: 250,
      gems: 5,
      score: 0,
      bestScore: 0,
      streak: 0,
      maxStreak: 0
    },

    settings: {
      sound: true,
      music: true,
      vibration: true,
      darkMode: true,
      language: "ar",
      difficulty: "normal"
    },

    game: {
      mode: "classic",
      round: 1,
      totalRounds: 10,
      currentQuestion: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hintsUsed: 0,
      timeLeft: 0,
      totalTime: 0,
      active: false,
      paused: false
    },

    statistics: {
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      perfectGames: 0,
      fastestAnswer: null,
      totalCoinsEarned: 0,
      totalXpEarned: 0
    },

    achievements: [],

    unlockedModes: [
      "classic"
    ],

    unlockedCases: [
      1
    ],

    inventory: {
      hints: 3,
      freezes: 1,
      reveals: 1,
      shields: 1
    },

    daily: {
      date: "",
      completed: false,
      rewardClaimed: false,
      score: 0
    },

    missions: {
      completed: [],
      progress: {}
    },

    history: [],

    premium: {
      active: false,
      purchases: []
    },

    tutorial: {
      completed: false,
      step: 0
    }
  };

  /* =========================================================
     4. DEEP CLONE
     ========================================================= */

  function deepClone(object) {

    try {
      return JSON.parse(
        JSON.stringify(object)
      );

    } catch (error) {
      return {};
    }
  }

  /* =========================================================
     5. MERGE STATE
     ========================================================= */

  function mergeObjects(base, saved) {

    if (
      !saved ||
      typeof saved !== "object"
    ) {
      return base;
    }

    Object.keys(saved).forEach(key => {

      if (
        saved[key] &&
        typeof saved[key] === "object" &&
        !Array.isArray(saved[key]) &&
        base[key] &&
        typeof base[key] === "object" &&
        !Array.isArray(base[key])
      ) {

        base[key] = mergeObjects(
          base[key],
          saved[key]
        );

      } else {

        base[key] = saved[key];

      }

    });

    return base;
  }

  /* =========================================================
     6. LOAD STATE
     ========================================================= */

  let state = (() => {

    const saved = storage.read();

    if (!saved) {
      return deepClone(DEFAULT_STATE);
    }

    return mergeObjects(
      deepClone(DEFAULT_STATE),
      saved
    );

  })();

  /* =========================================================
     7. SAVE GAME
     ========================================================= */

  function saveGame() {

    state.version = 5;

    storage.write(state);

    emitEvent(
      "stateSaved",
      state
    );
  }

  /* =========================================================
     8. RESET GAME
     ========================================================= */

  function resetGame() {

    state = deepClone(DEFAULT_STATE);

    saveGame();

    location.reload();
  }

  /* =========================================================
     9. EVENT SYSTEM
     ========================================================= */

  const events = {};

  function onEvent(name, callback) {

    if (!events[name]) {
      events[name] = [];
    }

    events[name].push(callback);
  }

  function emitEvent(name, data) {

    if (!events[name]) return;

    events[name].forEach(callback => {

      try {
        callback(data);
      } catch (error) {
        console.error(
          `Event error [${name}]`,
          error
        );
      }

    });
  }

  /* =========================================================
     10. AUDIO ENGINE
     ========================================================= */

  const AudioEngine = {

    context: null,

    init() {

      if (this.context) return;

      try {

        const AudioContext =
          window.AudioContext ||
          window.webkitAudioContext;

        if (AudioContext) {
          this.context =
            new AudioContext();
        }

      } catch (error) {
        console.warn(
          "Audio unavailable",
          error
        );
      }
    },

    beep(
      frequency = 440,
      duration = 100,
      type = "sine",
      volume = 0.04
    ) {

      if (!state.settings.sound) return;

      this.init();

      if (!this.context) return;

      try {

        if (
          this.context.state === "suspended"
        ) {
          this.context.resume();
        }

        const oscillator =
          this.context.createOscillator();

        const gain =
          this.context.createGain();

        oscillator.type = type;

        oscillator.frequency.value =
          frequency;

        gain.gain.value = volume;

        oscillator.connect(gain);
        gain.connect(
          this.context.destination
        );

        oscillator.start();

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          this.context.currentTime +
          duration / 1000
        );

        oscillator.stop(
          this.context.currentTime +
          duration / 1000
        );

      } catch (error) {
        console.warn(
          "Audio error:",
          error
        );
      }
    },

    correct() {
      this.beep(
        720,
        100,
        "sine",
        0.035
      );

      setTimeout(
        () =>
          this.beep(
            980,
            140,
            "sine",
            0.035
          ),
        90
      );
    },

    wrong() {
      this.beep(
        180,
        180,
        "sawtooth",
        0.025
      );
    },

    click() {
      this.beep(
        520,
        45,
        "square",
        0.018
      );
    },

    win() {

      [520, 660, 820, 1040]
        .forEach(
          (frequency, index) => {

            setTimeout(
              () =>
                this.beep(
                  frequency,
                  130,
                  "sine",
                  0.03
                ),
              index * 100
            );

          }
        );
    }
  };

  /* =========================================================
     11. VIBRATION ENGINE
     ========================================================= */

  const Vibration = {

    pulse(pattern = 30) {

      if (!state.settings.vibration) {
        return;
      }

      if (
        typeof navigator.vibrate !==
        "function"
      ) {
        return;
      }

      try {
        navigator.vibrate(pattern);
      } catch (error) {
        console.warn(
          "Vibration unavailable"
        );
      }
    },

    correct() {
      this.pulse([25, 35, 25]);
    },

    wrong() {
      this.pulse(100);
    },

    click() {
      this.pulse(15);
    },

    win() {
      this.pulse([
        30,
        50,
        30,
        50,
        70
      ]);
    }
  };

  /* =========================================================
     12. FX HELPERS
     ========================================================= */

  function notify(
    message,
    type = "info",
    duration = 2200
  ) {

    let container =
      byId("toast-container");

    if (!container) {

      container =
        document.createElement("div");

      container.id =
        "toast-container";

      container.style.position =
        "fixed";

      container.style.left = "50%";
      container.style.bottom = "25px";

      container.style.transform =
        "translateX(-50%)";

      container.style.zIndex =
        "99999";

      container.style.display =
        "flex";

      container.style.flexDirection =
        "column";

      container.style.gap =
        "10px";

      container.style.pointerEvents =
        "none";

      document.body.appendChild(
        container
      );
    }

    const toast =
      document.createElement("div");

    toast.textContent = message;

    toast.dataset.type = type;

    toast.style.padding =
      "12px 18px";

    toast.style.borderRadius =
      "14px";

    toast.style.background =
      "rgba(15,15,20,.94)";

    toast.style.color =
      "#fff";

    toast.style.fontSize =
      "14px";

    toast.style.fontWeight =
      "700";

    toast.style.boxShadow =
      "0 10px 30px rgba(0,0,0,.3)";

    toast.style.opacity = "0";

    toast.style.transform =
      "translateY(15px)";

    toast.style.transition =
      "all .25s ease";

    container.appendChild(
      toast
    );

    requestAnimationFrame(() => {

      toast.style.opacity = "1";

      toast.style.transform =
        "translateY(0)";
    });

    setTimeout(() => {

      toast.style.opacity = "0";

      toast.style.transform =
        "translateY(15px)";

      setTimeout(
        () => toast.remove(),
        300
      );

    }, duration);
  }

  function createConfetti(count = 30) {

    const fragment =
      document.createDocumentFragment();

    for (
      let i = 0;
      i < count;
      i++
    ) {

      const piece =
        document.createElement("div");

      piece.className =
        "confetti-piece";

      piece.textContent =
        randomItem([
          "✦",
          "◆",
          "★",
          "●",
          "✧"
        ]);

      piece.style.position =
        "fixed";

      piece.style.left =
        `${random(5, 95)}vw`;

      piece.style.top = "-20px";

      piece.style.fontSize =
        `${random(10, 22)}px`;

      piece.style.zIndex =
        "100000";

      piece.style.pointerEvents =
        "none";

      piece.style.animation =
        `confettiFall ${random(
          1600,
          3200
        )}ms linear forwards`;

      piece.style.setProperty(
        "--rotation",
        `${random(-720, 720)}deg`
      );

      fragment.appendChild(
        piece
      );
    }

    document.body.appendChild(
      fragment
    );

    setTimeout(() => {

      $$(".confetti-piece")
        .forEach(
          element =>
            element.remove()
        );

    }, 3500);
  }

  /* =========================================================
     13. XP / LEVEL SYSTEM
     ========================================================= */

  function xpRequired(level) {

    level = Math.max(
      1,
      safeNumber(level, 1)
    );

    return Math.floor(
      100 +
      (level - 1) * 75 +
      Math.pow(level - 1, 1.45) * 20
    );
  }

  function getLevelProgress() {

    const level =
      safeNumber(
        state.player.level,
        1
      );

    const required =
      xpRequired(level);

    const xp =
      safeNumber(
        state.player.xp,
        0
      );

    return {
      level,
      xp,
      required,
      percent: clamp(
        (xp / required) * 100,
        0,
        100
      )
    };
  }

  function addXP(amount) {

    amount = Math.max(
      0,
      safeNumber(amount)
    );

    if (!amount) return;

    state.player.xp += amount;

    state.statistics.totalXpEarned +=
      amount;

    let levelUps = 0;

    while (
      state.player.xp >=
      xpRequired(
        state.player.level
      )
    ) {

      state.player.xp -=
        xpRequired(
          state.player.level
        );

      state.player.level++;

      levelUps++;

      const rewardCoins =
        50 +
        state.player.level * 10;

      state.player.coins +=
        rewardCoins;

      notify(
        `🎉 وصلت للمستوى ${state.player.level}! +${rewardCoins} عملة`,
        "success",
        3200
      );

      AudioEngine.win();
      Vibration.win();

      emitEvent(
        "levelUp",
        {
          level:
            state.player.level,
          reward:
            rewardCoins
        }
      );
    }

    saveGame();

    emitEvent(
      "xpChanged",
      getLevelProgress()
    );

    return levelUps;
  }

  /* =========================================================
     14. COIN SYSTEM
     ========================================================= */

  function addCoins(amount, reason = "") {

    amount = safeNumber(
      amount,
      0
    );

    if (amount === 0) return;

    state.player.coins =
      Math.max(
        0,
        state.player.coins +
        amount
      );

    if (amount > 0) {

      state.statistics.totalCoinsEarned +=
        amount;
    }

    saveGame();

    emitEvent(
      "coinsChanged",
      {
        amount,
        reason,
        total:
          state.player.coins
      }
    );
  }

  function spendCoins(amount) {

    amount = Math.max(
      0,
      safeNumber(amount)
    );

    if (
      state.player.coins <
      amount
    ) {

      notify(
        "🪙 العملات غير كافية",
        "warning"
      );

      return false;
    }

    state.player.coins -=
      amount;

    saveGame();

    emitEvent(
      "coinsChanged",
      {
        amount: -amount,
        total:
          state.player.coins
      }
    );

    return true;
  }

  /* =========================================================
     15. DAILY SYSTEM
     ========================================================= */

  function getDateKey() {

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

  function updateDailyChallenge() {

    const today =
      getDateKey();

    if (
      state.daily.date !==
      today
    ) {

      state.daily = {
        date: today,
        completed: false,
        rewardClaimed: false,
        score: 0
      };

      saveGame();
    }

    return state.daily;
  }

  function completeDailyChallenge(score = 0) {

    updateDailyChallenge();

    if (
      state.daily.completed
    ) {
      return false;
    }

    state.daily.completed =
      true;

    state.daily.score =
      Math.max(
        0,
        safeNumber(score)
      );

    addCoins(100, "daily");

    addXP(75);

    notify(
      "🏆 أكملت التحدي اليومي! +100 🪙",
      "success",
      3500
    );

    createConfetti(20);

    emitEvent(
      "dailyCompleted",
      state.daily
    );

    saveGame();

    return true;
  }

  /* =========================================================
     16. STREAK SYSTEM
     ========================================================= */

  function increaseStreak() {

    state.player.streak++;

    if (
      state.player.streak >
      state.player.maxStreak
    ) {

      state.player.maxStreak =
        state.player.streak;
    }

    const bonus =
      Math.min(
        100,
        state.player.streak * 5
      );

    addCoins(
      bonus,
      "streak"
    );

    emitEvent(
      "streakChanged",
      state.player.streak
    );

    saveGame();
  }

  function resetStreak() {

    state.player.streak = 0;

    saveGame();

    emitEvent(
      "streakChanged",
      0
    );
  }

  /* =========================================================
     17. MODE DEFINITIONS
     ========================================================= */

  const GAME_MODES = {

    classic: {
      id: "classic",
      name: "القصة الكلاسيكية",
      icon: "🕵️",
      description:
        "حل القضية خطوة بخطوة واكتشف الحقيقة.",
      baseTime: 60,
      multiplier: 1
    },

    speed: {
      id: "speed",
      name: "سباق الزمن",
      icon: "⚡",
      description:
        "الوقت ضدك. اكتشف الحقيقة بأسرع ما يمكن.",
      baseTime: 30,
      multiplier: 1.35
    },

    detective: {
      id: "detective",
      name: "المحقق",
      icon: "🔎",
      description:
        "استعمل الأدلة والمنطق للوصول إلى الحل.",
      baseTime: 75,
      multiplier: 1.5
    },

    mystery: {
      id: "mystery",
      name: "الغموض",
      icon: "🌑",
      description:
        "معلومات أقل، غموض أكبر.",
      baseTime: 55,
      multiplier: 1.75
    },

    hardcore: {
      id: "hardcore",
      name: "الوضع القاسي",
      icon: "💀",
      description:
        "أخطاء أقل ووقت أقل ومكافآت أكبر.",
      baseTime: 40,
      multiplier: 2
    },

    boss: {
      id: "boss",
      name: "قضية الزعيم",
      icon: "👑",
      description:
        "قضية خاصة بمستوى صعوبة مرتفع.",
      baseTime: 90,
      multiplier: 2.5
    },

    daily: {
      id: "daily",
      name: "التحدي اليومي",
      icon: "📅",
      description:
        "قضية جديدة كل يوم.",
      baseTime: 60,
      multiplier: 2
    },

    premium: {
      id: "premium",
      name: "ملفات سرية",
      icon: "🔐",
      description:
        "قضايا خاصة ومحتوى متقدم.",
      baseTime: 90,
      multiplier: 3
    }
  };

  /* =========================================================
     18. MODE ACCESS
     ========================================================= */

  function isModeUnlocked(modeId) {

    if (
      state.premium.active &&
      modeId === "premium"
    ) {
      return true;
    }

    if (
      state.unlockedModes.includes(
        modeId
      )
    ) {
      return true;
    }

    if (
      modeId === "daily"
    ) {
      return true;
    }

    return false;
  }

  function unlockMode(
    modeId,
    price = 0
  ) {

    if (!GAME_MODES[modeId]) {
      return false;
    }

    if (
      isModeUnlocked(modeId)
    ) {
      return true;
    }

    if (
      price > 0 &&
      !spendCoins(price)
    ) {
      return false;
    }

    if (
      !state.unlockedModes.includes(
        modeId
      )
    ) {

      state.unlockedModes.push(
        modeId
      );
    }

    saveGame();

    notify(
      `🔓 تم فتح ${GAME_MODES[modeId].name}`,
      "success"
    );

    return true;
  }

  /* =========================================================
     19. DIFFICULTY ENGINE
     ========================================================= */

  const DIFFICULTIES = {

    easy: {
      id: "easy",
      name: "سهل",
      icon: "🟢",
      multiplier: 0.8,
      timeMultiplier: 1.3,
      mistakes: 5
    },

    normal: {
      id: "normal",
      name: "متوسط",
      icon: "🟡",
      multiplier: 1,
      timeMultiplier: 1,
      mistakes: 3
    },

    hard: {
      id: "hard",
      name: "صعب",
      icon: "🟠",
      multiplier: 1.5,
      timeMultiplier: 0.8,
      mistakes: 2
    },

    expert: {
      id: "expert",
      name: "خبير",
      icon: "🔴",
      multiplier: 2,
      timeMultiplier: 0.65,
      mistakes: 1
    },

    nightmare: {
      id: "nightmare",
      name: "كابوس",
      icon: "☠️",
      multiplier: 3,
      timeMultiplier: 0.5,
      mistakes: 1
    }
  };

  function getDifficulty() {

    return (
      DIFFICULTIES[
        state.settings.difficulty
      ] ||
      DIFFICULTIES.normal
    );
  }

  /* =========================================================
     20. QUESTION ENGINE
     ========================================================= */

  let currentQuestion = null;

  let questionPool = [];

  let usedQuestions = [];

  function buildQuestionPool() {

    const source =
      window.GAME_DATA ||
      window.DATA ||
      window.QUESTIONS ||
      [];

    if (Array.isArray(source)) {

      questionPool = [
        ...source
      ];

    } else if (
      source &&
      Array.isArray(
        source.questions
      )
    ) {

      questionPool = [
        ...source.questions
      ];

    } else if (
      source &&
      Array.isArray(
        source.cases
      )
    ) {

      questionPool = [
        ...source.cases
      ];

    } else {

      questionPool = [];
    }

    return questionPool;
  }

  function getQuestionPool() {

    if (
      !questionPool.length
    ) {
      buildQuestionPool();
    }

    return questionPool;
  }

  function getUnusedQuestions() {

    const pool =
      getQuestionPool();

    if (!pool.length) {
      return [];
    }

    let available =
      pool.filter(
        question =>
          !usedQuestions.includes(
            question.id
          )
      );

    if (!available.length) {

      usedQuestions = [];

      available = [
        ...pool
      ];
    }

    return available;
  }

  function getNextQuestion() {

    const available =
      getUnusedQuestions();

    if (!available.length) {
      return null;
    }

    const selected =
      randomItem(
        available
      );

    if (
      selected &&
      selected.id !== undefined
    ) {

      usedQuestions.push(
        selected.id
      );
    }

    currentQuestion =
      selected;

    return selected;
  }

  /* =========================================================
     21. ANSWER VALIDATION
     ========================================================= */

  function normalizeAnswer(value) {

    return String(
      value ?? ""
    )
      .trim()
      .toLowerCase();
  }

  function isCorrectAnswer(
    question,
    answer
  ) {

    if (!question) {
      return false;
    }

    const given =
      normalizeAnswer(answer);

    const correctValues = [];

    if (
      question.answer !==
      undefined
    ) {
      correctValues.push(
        question.answer
      );
    }

    if (
      question.correct !==
      undefined
    ) {
      correctValues.push(
        question.correct
      );
    }

    if (
      Array.isArray(
        question.answers
      )
    ) {

      correctValues.push(
        ...question.answers
          .filter(
            item =>
              item &&
              (
                item.correct === true ||
                item.isCorrect === true
              )
          )
          .map(
            item =>
              item.id ??
              item.value ??
              item.text ??
              item.answer
          )
      );
    }

    return correctValues.some(
      correct =>
        normalizeAnswer(
          correct
        ) === given
    );
  }

  /* =========================================================
     22. SCORE ENGINE
     ========================================================= */

  function calculateScore({
    correct = true,
    timeLeft = 0,
    difficultyMultiplier = 1,
    modeMultiplier = 1,
    streak = 0
  } = {}) {

    if (!correct) {
      return 0;
    }

    const base = 100;

    const timeBonus =
      Math.max(
        0,
        safeNumber(timeLeft)
      ) * 2;

    const streakBonus =
      Math.min(
        100,
        safeNumber(streak) * 10
      );

    return Math.floor(
      (
        base +
        timeBonus +
        streakBonus
      ) *
      difficultyMultiplier *
      modeMultiplier
    );
  }

  /* =========================================================
     23. REWARD ENGINE
     ========================================================= */

  function calculateReward(score) {

    score =
      Math.max(
        0,
        safeNumber(score)
      );

    const coins =
      Math.max(
        5,
        Math.floor(score / 10)
      );

    const xp =
      Math.max(
        10,
        Math.floor(score / 6)
      );

    return {
      coins,
      xp
    };
  }

  function giveReward(
    score,
    reason = "game"
  ) {

    const reward =
      calculateReward(score);

    addCoins(
      reward.coins,
      reason
    );

    addXP(
      reward.xp
    );

    return reward;
  }

  /* =========================================================
     24. GAME SESSION
     ========================================================= */

  const GameSession = {

    questions: [],

    index: 0,

    score: 0,

    startedAt: 0,

    ended: false,

    timer: null,

    init(mode = "classic") {

      if (
        !GAME_MODES[mode]
      ) {
        mode = "classic";
      }

      if (
        !isModeUnlocked(mode)
      ) {

        notify(
          "🔒 هذا الوضع غير مفتوح بعد",
          "warning"
        );

        return false;
      }

      state.game = {
        ...state.game,

        mode,

        round: 1,

        currentQuestion: 0,

        correctAnswers: 0,

        wrongAnswers: 0,

        hintsUsed: 0,

        timeLeft:
          this.getInitialTime(mode),

        totalTime:
          this.getInitialTime(mode),

        active: true,

        paused: false
      };

      this.questions = [];

      this.index = 0;

      this.score = 0;

      this.startedAt =
        now();

      this.ended = false;

      usedQuestions = [];

      this.prepareQuestions();

      saveGame();

      emitEvent(
        "gameStarted",
        state.game
      );

      return true;
    },

    getInitialTime(mode) {

      const modeData =
        GAME_MODES[mode] ||
        GAME_MODES.classic;

      const difficulty =
        getDifficulty();

      return Math.floor(
        modeData.baseTime *
        difficulty.timeMultiplier
      );
    },

    prepareQuestions() {

      const total =
        state.game.totalRounds ||
        10;

      const result = [];

      for (
        let i = 0;
        i < total;
        i++
      ) {

        const question =
          getNextQuestion();

        if (question) {
          result.push(
            question
          );
        }
      }

      this.questions =
        result;

      return result;
    },

    current() {

      return (
        this.questions[
          this.index
        ] || null
      );
    },

    next() {

      if (this.ended) {
        return null;
      }

      this.index++;

      state.game.currentQuestion =
        this.index;

      if (
        this.index >=
        this.questions.length
      ) {

        this.finish(
          true
        );

        return null;
      }

      const question =
        this.current();

      currentQuestion =
        question;

      emitEvent(
        "questionChanged",
        {
          question,
          index:
            this.index,
          total:
            this.questions.length
        }
      );

      return question;
    },

    answer(answer) {

      if (
        this.ended ||
        state.game.paused
      ) {
        return null;
      }

      const question =
        this.current();

      if (!question) {
        return null;
      }

      const correct =
        isCorrectAnswer(
          question,
          answer
        );

      state.statistics.questionsAnswered++;

      if (correct) {

        state.game.correctAnswers++;

        state.statistics.correctAnswers++;

        increaseStreak();

        const score =
          calculateScore({
            correct: true,
            timeLeft:
              state.game.timeLeft,
            difficultyMultiplier:
              getDifficulty().multiplier,
            modeMultiplier:
              GAME_MODES[
                state.game.mode
              ].multiplier,
            streak:
              state.player.streak
          });

        this.score +=
          score;

        state.player.score +=
          score;

        state.player.bestScore =
          Math.max(
            state.player.bestScore,
            state.player.score
          );

        addXP(
          Math.max(
            5,
            Math.floor(score / 10)
          )
        );

        AudioEngine.correct();
        Vibration.correct();

        emitEvent(
          "answerCorrect",
          {
            question,
            answer,
            score,
            totalScore:
              this.score
          }
        );

      } else {

        state.game.wrongAnswers++;

        state.statistics.wrongAnswers++;

        resetStreak();

        AudioEngine.wrong();
        Vibration.wrong();

        emitEvent(
          "answerWrong",
          {
            question,
            answer
          }
        );
      }

      state.statistics.gamesPlayed =
        Math.max(
          0,
          state.statistics.gamesPlayed
        );

      saveGame();

      return {
        correct,
        question,
        answer,
        score: this.score
      };
    },

    pause() {

      if (
        this.ended
      ) return;

      state.game.paused =
        true;

      emitEvent(
        "gamePaused"
      );

      saveGame();
    },

    resume() {

      if (
        this.ended
      ) return;

      state.game.paused =
        false;

      emitEvent(
        "gameResumed"
      );

      saveGame();
    },

    finish(
      completed = false
    ) {

      if (this.ended) {
        return;
      }

      this.ended = true;

      this.stopTimer();

      state.game.active =
        false;

      state.game.paused =
        false;

      if (completed) {

        state.statistics.gamesWon++;

        if (
          state.game.wrongAnswers === 0
        ) {

          state.statistics.perfectGames++;

        }

        const reward =
          giveReward(
            this.score,
            "game"
          );

        createConfetti(25);

        AudioEngine.win();
        Vibration.win();

        emitEvent(
          "gameWon",
          {
            score:
              this.score,
            reward
          }
        );

      } else {

        state.statistics.gamesLost++;

        emitEvent(
          "gameLost",
          {
            score:
              this.score
          }
        );
      }

      state.history.unshift({
        id:
          `${now()}_${random(
            1000,
            9999
          )}`,

        mode:
          state.game.mode,

        score:
          this.score,

        correct:
          state.game.correctAnswers,

        wrong:
          state.game.wrongAnswers,

        date:
          new Date().toISOString()
      });

      state.history =
        state.history.slice(
          0,
          50
        );

      saveGame();

      emitEvent(
        "gameFinished",
        {
          completed,
          score:
            this.score,
          state:
            state.game
        }
      );
    },

    startTimer() {

      this.stopTimer();

      this.timer =
        setInterval(() => {

          if (
            this.ended ||
            state.game.paused
          ) {
            return;
          }

          state.game.timeLeft--;

          emitEvent(
            "timerTick",
            state.game.timeLeft
          );

          if (
            state.game.timeLeft <= 0
          ) {

            state.game.timeLeft =
              0;

            this.finish(
              false
            );
          }

        }, 1000);
    },

    stopTimer() {

      if (this.timer) {

        clearInterval(
          this.timer
        );

        this.timer = null;
      }
    },

    useHint(type = "normal") {

      if (this.ended) {
        return false;
      }

      const inventory =
        state.inventory;

      let item = null;

      if (
        type === "freeze"
      ) {

        item = "freezes";

      } else if (
        type === "reveal"
      ) {

        item = "reveals";

      } else if (
        type === "shield"
      ) {

        item = "shields";

      } else {

        item = "hints";
      }

      if (
        !safeNumber(
          inventory[item]
        )
      ) {

        notify(
          "❌ لا تملك هذه المساعدة",
          "warning"
        );

        return false;
      }

      inventory[item]--;

      state.game.hintsUsed++;

      saveGame();

      emitEvent(
        "hintUsed",
        {
          type,
          question:
            this.current()
        }
      );

      return true;
    }
  };

  /* =========================================================
     25. ACHIEVEMENTS
     ========================================================= */

  const ACHIEVEMENTS = [

    {
      id: "first_game",
      title: "البداية",
      description:
        "العب أول قضية.",
      rewardCoins: 50,
      rewardXP: 25
    },

    {
      id: "first_win",
      title: "أول انتصار",
      description:
        "أكمل أول قضية بنجاح.",
      rewardCoins: 75,
      rewardXP: 40
    },

    {
      id: "perfect",
      title: "المحقق المثالي",
      description:
        "أكمل قضية بدون أي خطأ.",
      rewardCoins: 150,
      rewardXP: 100
    },

    {
      id: "streak_5",
      title: "سلسلة نارية",
      description:
        "حقق سلسلة من 5 إجابات صحيحة.",
      rewardCoins: 100,
      rewardXP: 75
    },

    {
      id: "streak_10",
      title: "لا يخطئ",
      description:
        "حقق سلسلة من 10 إجابات صحيحة.",
      rewardCoins: 250,
      rewardXP: 150
    },

    {
      id: "level_5",
      title: "محقق متقدم",
      description:
        "الوصول إلى المستوى 5.",
      rewardCoins: 200,
      rewardXP: 100
    },

    {
      id: "level_10",
      title: "أسطورة التحقيق",
      description:
        "الوصول إلى المستوى 10.",
      rewardCoins: 500,
      rewardXP: 250
    },

    {
      id: "score_1000",
      title: "نقاط أولى",
      description:
        "الوصول إلى 1000 نقطة.",
      rewardCoins: 150,
      rewardXP: 100
    },

    {
      id: "score_10000",
      title: "عبقري",
      description:
        "الوصول إلى 10000 نقطة.",
      rewardCoins: 500,
      rewardXP: 300
    },

    {
      id: "daily",
      title: "ملتزم",
      description:
        "أكمل تحدياً يومياً.",
      rewardCoins: 100,
      rewardXP: 75
    },

    {
      id: "hardcore",
      title: "بلا خوف",
      description:
        "أكمل قضية في الوضع القاسي.",
      rewardCoins: 300,
      rewardXP: 200
    }
  ];

  function hasAchievement(id) {

    return state.achievements
      .includes(id);
  }

  function unlockAchievement(id) {

    if (
      hasAchievement(id)
    ) {
      return false;
    }

    const achievement =
      ACHIEVEMENTS.find(
        item =>
          item.id === id
      );

    if (!achievement) {
      return false;
    }

    state.achievements.push(
      id
    );

    addCoins(
      achievement.rewardCoins,
      "achievement"
    );

    addXP(
      achievement.rewardXP
    );

    notify(
      `🏆 إنجاز جديد: ${achievement.title}`,
      "success",
      3500
    );

    emitEvent(
      "achievementUnlocked",
      achievement
    );

    saveGame();

    return true;
  }

  function checkAchievements() {

    if (
      state.statistics.gamesPlayed >=
      1
    ) {
      unlockAchievement(
        "first_game"
      );
    }

    if (
      state.statistics.gamesWon >=
      1
    ) {
      unlockAchievement(
        "first_win"
      );
    }

    if (
      state.statistics.perfectGames >=
      1
    ) {
      unlockAchievement(
        "perfect"
      );
    }

    if (
      state.player.maxStreak >=
      5
    ) {
      unlockAchievement(
        "streak_5"
      );
    }

    if (
      state.player.maxStreak >=
      10
    ) {
      unlockAchievement(
        "streak_10"
      );
    }

    if (
      state.player.level >=
      5
    ) {
      unlockAchievement(
        "level_5"
      );
    }

    if (
      state.player.level >=
      10
    ) {
      unlockAchievement(
        "level_10"
      );
    }

    if (
      state.player.score >=
      1000
    ) {
      unlockAchievement(
        "score_1000"
      );
    }

    if (
      state.player.score >=
      10000
    ) {
      unlockAchievement(
        "score_10000"
      );
    }

    if (
      state.daily.completed
    ) {
      unlockAchievement(
        "daily"
      );
    }

    if (
      state.statistics.gamesWon > 0 &&
      state.history.some(
        game =>
          game.mode ===
          "hardcore"
      )
    ) {
      unlockAchievement(
        "hardcore"
      );
    }
  }

  /* =========================================================
     26. MISSION ENGINE
     ========================================================= */

  const MISSIONS = [

    {
      id: "play_3",
      title: "المبتدئ النشيط",
      description:
        "العب 3 قضايا.",
      target: 3,
      rewardCoins: 100,
      rewardXP: 50
    },

    {
      id: "win_5",
      title: "صياد القضايا",
      description:
        "اربح 5 قضايا.",
      target: 5,
      rewardCoins: 200,
      rewardXP: 100
    },

    {
      id: "correct_20",
      title: "عين الصقر",
      description:
        "أجب بشكل صحيح 20 مرة.",
      target: 20,
      rewardCoins: 250,
      rewardXP: 150
    },

    {
      id: "coins_1000",
      title: "جامع العملات",
      description:
        "اكسب 1000 عملة.",
      target: 1000,
      rewardCoins: 200,
      rewardXP: 100
    }
  ];

  function getMissionProgress(
    mission
  ) {

    switch (mission.id) {

      case "play_3":
        return Math.min(
          mission.target,
          state.statistics.gamesPlayed
        );

      case "win_5":
        return Math.min(
          mission.target,
          state.statistics.gamesWon
        );

      case "correct_20":
        return Math.min(
          mission.target,
          state.statistics.correctAnswers
        );

      case "coins_1000":
        return Math.min(
          mission.target,
          state.statistics.totalCoinsEarned
        );

      default:
        return 0;
    }
  }

  function checkMissions() {

    MISSIONS.forEach(
      mission => {

        if (
          state.missions.completed
            .includes(mission.id)
        ) {
          return;
        }

        const progress =
          getMissionProgress(
            mission
          );

        state.missions.progress[
          mission.id
        ] = progress;

        if (
          progress >=
          mission.target
        ) {

          state.missions.completed
            .push(
              mission.id
            );

          addCoins(
            mission.rewardCoins,
            "mission"
          );

          addXP(
            mission.rewardXP
          );

          notify(
            `🎯 مهمة مكتملة: ${mission.title}`,
            "success",
            3200
          );

          emitEvent(
            "missionCompleted",
            mission
          );
        }
      }
    );

    saveGame();
  }

  /* =========================================================
     27. UI UPDATE CORE
     ========================================================= */

  function updatePlayerUI() {

    const level =
      byId("player-level");

    if (level) {
      level.textContent =
        state.player.level;
    }

    const coins =
      byId("coins");

    if (coins) {
      coins.textContent =
        formatNumber(
          state.player.coins
        );
    }

    const gems =
      byId("gems");

    if (gems) {
      gems.textContent =
        formatNumber(
          state.player.gems
        );
    }

    const xp =
      byId("xp");

    if (xp) {
      xp.textContent =
        formatNumber(
          state.player.xp
        );
    }

    const score =
      byId("score");

    if (score) {
      score.textContent =
        formatNumber(
          state.player.score
        );
    }

    const streak =
      byId("streak");

    if (streak) {
      streak.textContent =
        formatNumber(
          state.player.streak
        );
    }

    const progress =
      getLevelProgress();

    $$(".xp-progress")
      .forEach(
        element => {

          element.style.width =
            `${progress.percent}%`;
        }
      );
  }

  function updateGameUI() {

    const time =
      byId("timer");

    if (time) {

      time.textContent =
        formatNumber(
          state.game.timeLeft
        );
    }

    const current =
      byId("question-number");

    if (current) {

      current.textContent =
        formatNumber(
          state.game.currentQuestion +
          1
        );
    }

    const correct =
      byId("correct-count");

    if (correct) {

      correct.textContent =
        formatNumber(
          state.game.correctAnswers
        );
    }

    const wrong =
      byId("wrong-count");

    if (wrong) {

      wrong.textContent =
        formatNumber(
          state.game.wrongAnswers
        );
    }

    const gameScore =
      byId("game-score");

    if (gameScore) {

      gameScore.textContent =
        formatNumber(
          GameSession.score
        );
    }
  }

  function updateAllUI() {

    updatePlayerUI();

    updateGameUI();

    updateDailyChallenge();

    checkAchievements();

    checkMissions();

    emitEvent(
      "uiUpdated",
      state
    );
  }

  /* =========================================================
     28. SETTINGS
     ========================================================= */

  function setSetting(
    key,
    value
  ) {

    if (
      !(key in state.settings)
    ) {
      return false;
    }

    state.settings[key] =
      value;

    if (
      key === "darkMode"
    ) {

      document.body.classList
        .toggle(
          "light-mode",
          !value
        );
    }

    saveGame();

    emitEvent(
      "settingChanged",
      {
        key,
        value
      }
    );

    return true;
  }

  /* =========================================================
     29. BOOTSTRAP
     ========================================================= */

  function bootstrap() {

    buildQuestionPool();

    updateDailyChallenge();

    updateAllUI();

    document.body.classList
      .toggle(
        "light-mode",
        !state.settings.darkMode
      );

    onEvent(
      "coinsChanged",
      updatePlayerUI
    );

    onEvent(
      "xpChanged",
      updatePlayerUI
    );

    onEvent(
      "timerTick",
      updateGameUI
    );

    onEvent(
      "answerCorrect",
      updateAllUI
    );

    onEvent(
      "answerWrong",
      updateAllUI
    );

    onEvent(
      "gameFinished",
      updateAllUI
    );

    emitEvent(
      "bootComplete",
      state
    );
  }

  /* =========================================================
     30. GLOBAL API
     ========================================================= */

  window.SHADOWS = {

    state,

    GAME_MODES,

    DIFFICULTIES,

    ACHIEVEMENTS,

    MISSIONS,

    GameSession,

    AudioEngine,

    Vibration,

    storage,

    saveGame,

    resetGame,

    notify,

    createConfetti,

    addXP,

    addCoins,

    spendCoins,

    unlockMode,

    isModeUnlocked,

    getDifficulty,

    getNextQuestion,

    calculateScore,

    calculateReward,

    giveReward,

    checkAchievements,

    checkMissions,

    updateAllUI,

    setSetting,

    onEvent,

    emitEvent
  };

  /* =========================================================
     31. DOM READY
     ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      bootstrap,
      {
        once: true
      }
    );

  } else {

    bootstrap();
  }

})();