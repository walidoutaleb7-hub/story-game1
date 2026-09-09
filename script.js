/* =========================================================
   ظلال المجهول — SHADOWS OF THE UNKNOWN
   script.js — Game Engine
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     CONFIG
     ========================================================= */

  const SAVE_KEY = "shadows_unknown_v4";
  const SETTINGS_KEY = "shadows_unknown_settings_v4";

  const $ = (id) => document.getElementById(id);

  const GAME = (
    typeof GAME_DATA !== "undefined" &&
    GAME_DATA &&
    GAME_DATA.game
  ) ? GAME_DATA.game : {
    title: "ظلال المجهول",
    version: "1.0.0",
    protagonist: "آدم",
    startingHealth: 100,
    maxHealth: 100,
    startingCoins: 25,
    chaptersCount: 12
  };

  /* =========================================================
     DOM
     ========================================================= */

  const DOM = {
    loadingScreen: $("loadingScreen"),
    loadingProgress: $("loadingProgress"),
    loadingStatus: $("loadingStatus"),

    startScreen: $("startScreen"),
    gameLogo: $("gameLogo"),
    gameSubtitle: $("gameSubtitle"),
    continueBtn: $("continueBtn"),
    newGameBtn: $("newGameBtn"),
    howToPlayBtn: $("howToPlayBtn"),
    versionText: $("versionText"),

    howToPlayOverlay: $("howToPlayOverlay"),
    closeHowToPlayBtn: $("closeHowToPlayBtn"),
    tutorialOkBtn: $("tutorialOkBtn"),

    gameScreen: $("gameScreen"),

    menuBtn: $("menuBtn"),
    closeMenuBtn: $("closeMenuBtn"),

    chapterLabel: $("chapterLabel"),
    chapterTitleTop: $("chapterTitleTop"),
    soundBtn: $("soundBtn"),
    soundIcon: $("soundIcon"),

    progressBar: $("progressBar"),
    progressText: $("progressText"),

    health: $("health"),
    coins: $("coins"),
    chapter: $("chapter"),

    sceneArea: $("sceneArea"),
    sceneVisual: $("sceneVisual"),
    sceneImage: $("sceneImage"),
    sceneWeather: $("sceneWeather"),
    sceneParticles: $("sceneParticles"),
    sceneTime: $("sceneTime"),

    storyPanel: $("storyPanel"),
    sceneChapterTag: $("sceneChapterTag"),
    sceneLocation: $("sceneLocation"),
    sceneTitle: $("sceneTitle"),
    storyText: $("storyText"),
    skipTextBtn: $("skipTextBtn"),

    choicesArea: $("choicesArea"),
    choices: $("choices"),

    inventoryBtn: $("inventoryBtn"),
    inventoryCount: $("inventoryCount"),

    achievementsBtn: $("achievementsBtn"),
    achievementCount: $("achievementCount"),

    journalBtn: $("journalBtn"),

    menuOverlay: $("menuOverlay"),
    menuInventoryBtn: $("menuInventoryBtn"),
    menuAchievementsBtn: $("menuAchievementsBtn"),
    menuJournalBtn: $("menuJournalBtn"),
    menuSettingsBtn: $("menuSettingsBtn"),

    inventoryOverlay: $("inventoryOverlay"),
    inventoryContent: $("inventoryContent"),
    closeInventoryBtn: $("closeInventoryBtn"),

    achievementsOverlay: $("achievementsOverlay"),
    achievementUnlocked: $("achievementUnlocked"),
    achievementTotal: $("achievementTotal"),
    achievementsContent: $("achievementsContent"),
    closeAchievementsBtn: $("closeAchievementsBtn"),

    journalOverlay: $("journalOverlay"),
    journalContent: $("journalContent"),
    closeJournalBtn: $("closeJournalBtn"),

    settingsOverlay: $("settingsOverlay"),
    sfxToggle: $("sfxToggle"),
    musicToggle: $("musicToggle"),
    motionToggle: $("motionToggle"),
    closeSettingsBtn: $("closeSettingsBtn"),
    settingsDoneBtn: $("settingsDoneBtn"),

    /* أسماء HTML الحقيقية + توافق مع الأسماء القديمة */
    saveBtn:
      $("saveGameBtn") ||
      $("saveBtn"),

    exitBtn:
      $("exitToTitleBtn") ||
      $("exitBtn"),

    sceneTransition: $("sceneTransition"),
    transitionChapter: $("transitionChapter"),
    transitionTitle: $("transitionTitle"),

    cinematicOverlay: $("cinematicOverlay"),
    cinematicLabel: $("cinematicLabel"),
    cinematicTitle: $("cinematicTitle"),
    cinematicText: $("cinematicText"),
    cinematicContinueBtn: $("cinematicContinueBtn"),

    itemToast: $("itemToast"),
    itemToastIcon: $("itemToastIcon"),
    itemToastName: $("itemToastName"),

    achievementToast: $("achievementToast"),
    achievementToastIcon: $("achievementToastIcon"),
    achievementToastTitle: $("achievementToastTitle"),

    notification: $("notification"),
    notificationIcon: $("notificationIcon"),
    notificationText: $("notificationText"),

    endScreen: $("endScreen"),
    endIcon: $("endIcon"),
    endTitle: $("endTitle"),
    endText: $("endText"),

    finalStats: $("finalStats"),
    finalChoices: $("finalChoices"),
    finalEvidence: $("finalEvidence"),
    finalMemories: $("finalMemories"),

    /* أسماء HTML الحقيقية */
    restartBtn:
      $("restartFromEnd") ||
      $("restartBtn"),

    titleBtn:
      $("endToTitleBtn") ||
      $("titleBtn"),

    bgMusic: $("bgMusic"),
    sfxAudio: $("sfxAudio"),

    screenFlash: $("screenFlash")
  };

  /* =========================================================
     HELPERS
     ========================================================= */

  function clone(value) {
    try {
      return JSON.parse(
        JSON.stringify(value)
      );
    } catch (_) {
      return value;
    }
  }

  function clamp(value, min, max) {
    return Math.max(
      min,
      Math.min(max, value)
    );
  }

  function safeNumber(
    value,
    fallback = 0
  ) {
    const n = Number(value);

    return Number.isFinite(n)
      ? n
      : fallback;
  }

  /* =========================================================
     FLAGS
     ========================================================= */

  const defaultFlags = clone(
    (
      typeof GAME_DATA !== "undefined" &&
      GAME_DATA &&
      GAME_DATA.flags
    ) || {}
  );

  const EXTRA_FLAGS = {
    metStranger: false,
    discoveredLab: false,
    discoveredFile: false,
    knowsTruth: false,
    knowsWhoIsLian: false,
    knowsWhoIsAdam: false,
    openedFinalDoor: false,
    refusedExperiment: false,
    acceptedTruth: false,
    completedArchive: false,
    foundFinalMessage: false,
    openedSecretRoom: false,
    foundBasement: false,
    enteredForbiddenArea: false,
    escapedVillage: false,
    finalTruth: false,
    metLian: false,
    trustedLian: false,
    trustedYoussef: false,
    trustedDoctor: false,
    trustedStranger: false,
    foundPhotograph: false,
    foundDiary: false,
    heardTape: false,
    liedToLian: false,
    liedToYoussef: false,
    helpedLian: false,
    abandonedLian: false,
    sawMemory1: false,
    sawMemory2: false,
    sawMemory3: false,
    knowsNumber0317: false,
    knowsAboutExperiment: false,
    knowsAboutAdam: false,
    collectedEvidence1: false,
    collectedEvidence2: false,
    collectedEvidence3: false,
    collectedEvidence4: false,
    collectedEvidence5: false
  };

  Object.assign(
    defaultFlags,
    EXTRA_FLAGS
  );

  /* =========================================================
     STATE
     ========================================================= */

  function createInitialState() {
    return {
      version: 4,
      started: false,
      chapter: 1,
      scene: "c1_start",

      health: safeNumber(
        GAME.startingHealth,
        GAME.maxHealth || 100
      ),

      coins: safeNumber(
        GAME.startingCoins,
        25
      ),

      inventory: [],

      flags: clone(
        defaultFlags
      ),

      achievements: [],

      stats: {
        choices: 0,
        scenes: 0,
        evidence: 0,
        memories: 0,
        startTime: Date.now()
      },

      history: [],

      settings: {
        sfx: true,
        music: true,
        motion: true
      }
    };
  }

  let state =
    createInitialState();

  let typingTimer = null;
  let currentTypingText = "";
  let typingFinished = false;

  let transitionBusy = false;
  let cinematicNext = null;

  /* =========================================================
     SETTINGS
     ========================================================= */

  function loadSettings() {
    try {
      const saved =
        JSON.parse(
          localStorage.getItem(
            SETTINGS_KEY
          )
        );

      if (
        saved &&
        typeof saved === "object"
      ) {
        state.settings.sfx =
          saved.sfx !== false;

        state.settings.music =
          saved.music !== false;

        state.settings.motion =
          saved.motion !== false;
      }
    } catch (_) {}

    updateSettingsUI();
  }

  function saveSettings() {
    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(
          state.settings
        )
      );
    } catch (_) {}
  }

  function updateSettingsUI() {
    /*
      toggle-btn في HTML ليس checkbox.
      لذلك نستعمل class active بدل checked.
    */

    if (DOM.sfxToggle) {
      DOM.sfxToggle.classList.toggle(
        "active",
        !!state.settings.sfx
      );

      DOM.sfxToggle.setAttribute(
        "aria-pressed",
        String(
          !!state.settings.sfx
        )
      );
    }

    if (DOM.musicToggle) {
      DOM.musicToggle.classList.toggle(
        "active",
        !!state.settings.music
      );

      DOM.musicToggle.setAttribute(
        "aria-pressed",
        String(
          !!state.settings.music
        )
      );
    }

    if (DOM.motionToggle) {
      DOM.motionToggle.classList.toggle(
        "active",
        !!state.settings.motion
      );

      DOM.motionToggle.setAttribute(
        "aria-pressed",
        String(
          !!state.settings.motion
        )
      );
    }

    updateSoundIcon();
  }

  /* =========================================================
     SAVE / LOAD
     ========================================================= */

  function saveGame(
    showMessage = true
  ) {
    try {
      state.started = true;

      localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(state)
      );

      if (showMessage) {
        notify(
          "تم حفظ تقدمك بنجاح."
        );
      }

      updateContinueButton();

      return true;

    } catch (error) {
      console.error(error);

      notify(
        "تعذر حفظ اللعبة على هذا الجهاز."
      );

      return false;
    }
  }

  function loadGame() {
    try {
      const raw =
        localStorage.getItem(
          SAVE_KEY
        );

      if (!raw) {
        return false;
      }

      const saved =
        JSON.parse(raw);

      if (
        !saved ||
        typeof saved !== "object"
      ) {
        return false;
      }

      const fresh =
        createInitialState();

      state = {
        ...fresh,
        ...saved,

        flags: {
          ...fresh.flags,
          ...(saved.flags || {})
        },

        settings: {
          ...fresh.settings,
          ...(saved.settings || {})
        },

        stats: {
          ...fresh.stats,
          ...(saved.stats || {})
        },

        inventory:
          Array.isArray(
            saved.inventory
          )
            ? saved.inventory
            : [],

        achievements:
          Array.isArray(
            saved.achievements
          )
            ? saved.achievements
            : [],

        history:
          Array.isArray(
            saved.history
          )
            ? saved.history
            : []
      };

      normalizeState();
      updateSettingsUI();

      return true;

    } catch (error) {
      console.error(error);
      return false;
    }
  }

  function deleteSave() {
    try {
      localStorage.removeItem(
        SAVE_KEY
      );
    } catch (_) {}

    updateContinueButton();
  }

  function hasSave() {
    try {
      return !!localStorage.getItem(
        SAVE_KEY
      );
    } catch (_) {
      return false;
    }
  }

  function updateContinueButton() {
    if (!DOM.continueBtn) {
      return;
    }

    DOM.continueBtn.style.display =
      hasSave()
        ? ""
        : "none";
  }

  /* =========================================================
     NORMALIZE
     ========================================================= */

  function normalizeState() {
    state.health =
      clamp(
        safeNumber(
          state.health,
          GAME.startingHealth
        ),
        0,
        safeNumber(
          GAME.maxHealth,
          100
        )
      );

    state.coins =
      Math.max(
        0,
        safeNumber(
          state.coins,
          GAME.startingCoins
        )
      );

    if (
      !Array.isArray(
        state.inventory
      )
    ) {
      state.inventory = [];
    }

    if (
      !Array.isArray(
        state.achievements
      )
    ) {
      state.achievements = [];
    }

    if (
      !state.flags ||
      typeof state.flags !==
        "object"
    ) {
      state.flags = {};
    }

    Object.keys(
      defaultFlags
    ).forEach(flag => {
      if (
        !(flag in state.flags)
      ) {
        state.flags[flag] =
          defaultFlags[flag];
      }
    });
  }

  /* =========================================================
     DATA SEARCH
     ========================================================= */

  function allChapters() {
    return (
      typeof GAME_DATA !==
        "undefined" &&
      Array.isArray(
        GAME_DATA.chapters
      )
    )
      ? GAME_DATA.chapters
      : [];
  }

  function findChapterByNumber(
    number
  ) {
    return allChapters().find(
      chapter =>
        Number(
          chapter.number ||
          chapter.id
        ) ===
        Number(number)
    );
  }

  function findScene(
    sceneId
  ) {
    for (
      const chapter of
        allChapters()
    ) {
      if (
        !Array.isArray(
          chapter.scenes
        )
      ) {
        continue;
      }

      const scene =
        chapter.scenes.find(
          s =>
            s &&
            s.id === sceneId
        );

      if (scene) {
        return {
          scene,
          chapter
        };
      }
    }

    return null;
  }

  function currentSceneData() {
    return findScene(
      state.scene
    );
  }

  /* =========================================================
     REQUIREMENTS
     ========================================================= */

  function checkRequirement(
    requirement
  ) {
    if (!requirement) {
      return true;
    }

    if (
      typeof requirement ===
      "boolean"
    ) {
      return requirement;
    }

    if (
      typeof requirement !==
      "object"
    ) {
      return true;
    }

    if (requirement.flags) {
      for (
        const [
          key,
          expected
        ] of Object.entries(
          requirement.flags
        )
      ) {
        if (
          Boolean(
            state.flags[key]
          ) !==
          Boolean(expected)
        ) {
          return false;
        }
      }
    }

    if (
      Array.isArray(
        requirement.items
      )
    ) {
      for (
        const item of
          requirement.items
      ) {
        if (
          !state.inventory.includes(
            item
          )
        ) {
          return false;
        }
      }
    }

    if (
      Array.isArray(
        requirement.notItems
      )
    ) {
      for (
        const item of
          requirement.notItems
      ) {
        if (
          state.inventory.includes(
            item
          )
        ) {
          return false;
        }
      }
    }

    if (
      Array.isArray(
        requirement.notFlags
      )
    ) {
      for (
        const flag of
          requirement.notFlags
      ) {
        if (
          state.flags[flag]
        ) {
          return false;
        }
      }
    }

    if (
      requirement.minHealth !=
      null &&
      state.health <
        safeNumber(
          requirement.minHealth
        )
    ) {
      return false;
    }

    if (
      requirement.minCoins !=
      null &&
      state.coins <
        safeNumber(
          requirement.minCoins
        )
    ) {
      return false;
    }

    if (
      requirement.minChapter !=
      null &&
      state.chapter <
        safeNumber(
          requirement.minChapter
        )
    ) {
      return false;
    }

    return true;
  }

  function choiceAvailable(
    choice
  ) {
    if (!choice) {
      return false;
    }

    if (choice.requires) {
      return checkRequirement(
        choice.requires
      );
    }

    if (choice.condition) {
      if (
        typeof choice.condition ===
        "function"
      ) {
        try {
          return !!choice.condition(
            state
          );
        } catch (_) {
          return false;
        }
      }

      if (
        typeof choice.condition ===
        "object"
      ) {
        return checkRequirement(
          choice.condition
        );
      }
    }

    return true;
  }

  /* =========================================================
     ITEMS
     ========================================================= */

  function itemData(id) {
    return (
      (
        typeof GAME_DATA !==
          "undefined" &&
        GAME_DATA &&
        GAME_DATA.items
      )?.[id]
    ) || {
      id,
      name: id,
      description:
        "غرض غامض لا تعرف حقيقته بعد.",
      icon: "◈"
    };
  }

  function addItem(id) {
    if (!id) {
      return false;
    }

    if (
      state.inventory.includes(id)
    ) {
      return false;
    }

    state.inventory.push(id);

    showItemToast(id);

    updateHUD();

    return true;
  }

  function removeItem(id) {
    const index =
      state.inventory.indexOf(
        id
      );

    if (index === -1) {
      return false;
    }

    state.inventory.splice(
      index,
      1
    );

    updateHUD();

    return true;
  }

  function addItems(items) {
    if (!Array.isArray(items)) {
      return;
    }

    items.forEach(addItem);
  }

  function removeItems(items) {
    if (!Array.isArray(items)) {
      return;
    }

    items.forEach(removeItem);
  }

  /* =========================================================
     EFFECTS
     ========================================================= */

  function applyEffects(
    effects = {}
  ) {
    if (
      !effects ||
      typeof effects !==
        "object"
    ) {
      return;
    }

    if (effects.health != null) {
      state.health +=
        safeNumber(
          effects.health
        );
    }

    if (effects.coins != null) {
      state.coins +=
        safeNumber(
          effects.coins
        );
    }

    if (effects.addItem) {
      addItem(
        effects.addItem
      );
    }

    if (effects.addItem2) {
      addItem(
        effects.addItem2
      );
    }

    if (effects.item) {
      addItem(
        effects.item
      );
    }

    if (effects.addItems) {
      addItems(
        effects.addItems
      );
    }

    if (effects.removeItems) {
      removeItems(
        effects.removeItems
      );
    }

    if (effects.setFlags) {
      Object.entries(
        effects.setFlags
      ).forEach(
        ([flag, value]) => {
          state.flags[flag] =
            !!value;
        }
      );
    }

    [
      "flag",
      "flag2",
      "flag3",
      "flag4"
    ].forEach(key => {
      if (
        typeof effects[key] ===
        "string"
      ) {
        state.flags[
          effects[key]
        ] = true;
      }
    });

    if (effects.evidence) {
      const evidenceList =
        Array.isArray(
          effects.evidence
        )
          ? effects.evidence
          : [effects.evidence];

      evidenceList.forEach(
        id => {
          state.flags[id] =
            true;
        }
      );
    }

    if (effects.memory) {
      const memoryList =
        Array.isArray(
          effects.memory
        )
          ? effects.memory
          : [effects.memory];

      memoryList.forEach(
        id => {
          state.flags[id] =
            true;
        }
      );
    }

    if (effects.achievement) {
      const list =
        Array.isArray(
          effects.achievement
        )
          ? effects.achievement
          : [effects.achievement];

      list.forEach(
        unlockAchievement
      );
    }

    if (
      effects.unlockAchievement
    ) {
      const list =
        Array.isArray(
          effects.unlockAchievement
        )
          ? effects.unlockAchievement
          : [effects.unlockAchievement];

      list.forEach(
        unlockAchievement
      );
    }

    state.health =
      clamp(
        state.health,
        0,
        safeNumber(
          GAME.maxHealth,
          100
        )
      );

    state.coins =
      Math.max(
        0,
        state.coins
      );

    calculateStats();
    updateHUD();
  }

  /* =========================================================
     STATS
     ========================================================= */

  function calculateStats() {
    let evidence = 0;

    for (
      let i = 1;
      i <= 5;
      i++
    ) {
      if (
        state.flags[
          `collectedEvidence${i}`
        ]
      ) {
        evidence++;
      }
    }

    let memories = 0;

    for (
      let i = 1;
      i <= 3;
      i++
    ) {
      if (
        state.flags[
          `sawMemory${i}`
        ]
      ) {
        memories++;
      }
    }

    state.stats.evidence =
      evidence;

    state.stats.memories =
      memories;
  }

  /* =========================================================
     ACHIEVEMENTS
     ========================================================= */

  function getAchievements() {
    return (
      typeof GAME_DATA !==
        "undefined" &&
      Array.isArray(
        GAME_DATA.achievements
      )
    )
      ? GAME_DATA.achievements
      : [];
  }

  function getAchievement(id) {
    return getAchievements().find(
      achievement =>
        achievement.id === id
    );
  }

  function unlockAchievement(id) {
    if (!id) {
      return;
    }

    if (
      state.achievements.includes(
        id
      )
    ) {
      return;
    }

    state.achievements.push(id);

    const achievement =
      getAchievement(id);

    if (achievement) {
      showAchievementToast(
        achievement
      );
    }

    updateHUD();
  }

  function checkAchievements() {
    calculateStats();

    if (
      state.stats.scenes >= 1
    ) {
      unlockAchievement(
        "first_step"
      );
    }

    if (
      state.stats.evidence >= 1
    ) {
      unlockAchievement(
        "detective"
      );
    }

    if (
      state.flags.foundPhotograph
    ) {
      unlockAchievement(
        "photographer"
      );
    }

    if (
      state.flags.foundBasement
    ) {
      unlockAchievement(
        "basement"
      );
    }

    if (
      state.flags.heardTape
    ) {
      unlockAchievement(
        "listener"
      );
    }

    if (
      state.flags.knowsTruth ||
      state.flags.knowsAboutExperiment
    ) {
      unlockAchievement(
        "truth_seeker"
      );
    }

    if (
      state.flags.openedSecretRoom
    ) {
      unlockAchievement(
        "secret_room"
      );
    }

    if (
      state.flags.sawMemory1 &&
      state.flags.sawMemory2 &&
      state.flags.sawMemory3
    ) {
      unlockAchievement(
        "complete_memory"
      );
    }

    if (
      state.stats.evidence >= 5
    ) {
      unlockAchievement(
        "collector"
      );
    }

    if (
      state.flags.trustedLian ||
      state.flags.trustedYoussef ||
      state.flags.trustedDoctor ||
      state.flags.trustedStranger
    ) {
      unlockAchievement(
        "trust"
      );
    }
  }

  /* =========================================================
     HUD
     ========================================================= */

  function updateHUD() {
    const result =
      currentSceneData();

    const chapter =
      result?.chapter;

    if (DOM.health) {
      DOM.health.textContent =
        Math.round(
          state.health
        );
    }

    if (DOM.coins) {
      DOM.coins.textContent =
        Math.round(
          state.coins
        );
    }

    if (DOM.chapter) {
      DOM.chapter.textContent =
        state.chapter;
    }

    if (DOM.inventoryCount) {
      DOM.inventoryCount.textContent =
        state.inventory.length;
    }

    if (DOM.achievementCount) {
      DOM.achievementCount.textContent =
        state.achievements.length;
    }

    if (DOM.chapterLabel) {
      DOM.chapterLabel.textContent =
        chapter?.number
          ? `الفصل ${chapter.number}`
          : `الفصل ${state.chapter}`;
    }

    if (DOM.chapterTitleTop) {
      DOM.chapterTitleTop.textContent =
        chapter?.title || "";
    }

    updateProgress();
  }

  function updateProgress() {
    const chapters =
      allChapters();

    const total =
      chapters.length ||
      safeNumber(
        GAME.chaptersCount,
        12
      );

    const current =
      clamp(
        safeNumber(
          state.chapter,
          1
        ),
        1,
        total
      );

    const percent =
      ((current - 1) /
        Math.max(
          1,
          total - 1
        )) *
      100;

    if (DOM.progressBar) {
      DOM.progressBar.style.width =
        `${percent}%`;
    }

    if (DOM.progressText) {
      DOM.progressText.textContent =
        `${current} / ${total}`;
    }
  }

  /* =========================================================
     SOUND
     ========================================================= */

  function updateSoundIcon() {
    if (!DOM.soundIcon) {
      return;
    }

    DOM.soundIcon.textContent =
      state.settings.sfx ||
      state.settings.music
        ? "🔊"
        : "🔇";
  }

  function playSfx(
    type = "click"
  ) {
    if (
      !state.settings.sfx
    ) {
      return;
    }

    const sources = {
      click:
        "assets/audio/click.mp3",

      choice:
        "assets/audio/choice.mp3",

      item:
        "assets/audio/item.mp3",

      achievement:
        "assets/audio/achievement.mp3",

      transition:
        "assets/audio/transition.mp3",

      ending:
        "assets/audio/ending.mp3"
    };

    const src =
      sources[type];

    if (
      !src ||
      !DOM.sfxAudio
    ) {
      return;
    }

    try {
      DOM.sfxAudio.src =
        src;

      DOM.sfxAudio.currentTime =
        0;

      const promise =
        DOM.sfxAudio.play();

      if (
        promise &&
        typeof promise.catch ===
          "function"
      ) {
        promise.catch(
          () => {}
        );
      }
    } catch (_) {}
  }

  function toggleSound() {
    const currentlyOn =
      state.settings.sfx ||
      state.settings.music;

    state.settings.sfx =
      !currentlyOn;

    state.settings.music =
      !currentlyOn;

    updateSettingsUI();
    saveSettings();

    if (
      state.settings.music
    ) {
      startMusic();
    } else {
      stopMusic();
    }
  }

  function startMusic() {
    if (
      !state.settings.music ||
      !DOM.bgMusic
    ) {
      return;
    }

    try {
      if (!DOM.bgMusic.src) {
        return;
      }

      DOM.bgMusic.loop =
        true;

      const promise =
        DOM.bgMusic.play();

      if (
        promise &&
        typeof promise.catch ===
          "function"
      ) {
        promise.catch(
          () => {}
        );
      }
    } catch (_) {}
  }

  function stopMusic() {
    if (!DOM.bgMusic) {
      return;
    }

    try {
      DOM.bgMusic.pause();
    } catch (_) {}
  }

  /* =========================================================
     TOASTS
     ========================================================= */

  function notify(
    message,
    duration = 2400
  ) {
    if (!DOM.notification) {
      return;
    }

    if (DOM.notificationText) {
      DOM.notificationText.textContent =
        message;
    } else {
      DOM.notification.textContent =
        message;
    }

    DOM.notification.classList.add(
      "show"
    );

    clearTimeout(
      notify.timer
    );

    notify.timer =
      setTimeout(
        () => {
          DOM.notification.classList.remove(
            "show"
          );
        },
        duration
      );
  }

  function showItemToast(id) {
    if (!DOM.itemToast) {
      return;
    }

    const item =
      itemData(id);

    if (DOM.itemToastIcon) {
      DOM.itemToastIcon.textContent =
        item.icon || "◈";
    }

    if (DOM.itemToastName) {
      DOM.itemToastName.textContent =
        item.name || id;
    }

    if (
      !DOM.itemToastName &&
      !DOM.itemToastIcon
    ) {
      DOM.itemToast.textContent =
        `تم العثور على: ${
          item.name || id
        }`;
    }

    DOM.itemToast.classList.add(
      "show"
    );

    playSfx("item");

    clearTimeout(
      showItemToast.timer
    );

    showItemToast.timer =
      setTimeout(
        () => {
          DOM.itemToast.classList.remove(
            "show"
          );
        },
        2800
      );
  }

  function showAchievementToast(
    achievement
  ) {
    if (
      !DOM.achievementToast
    ) {
      return;
    }

    const name =
      achievement.name ||
      achievement.title ||
      "إنجاز جديد";

    if (
      DOM.achievementToastIcon
    ) {
      DOM.achievementToastIcon.textContent =
        achievement.icon ||
        "🏆";
    }

    if (
      DOM.achievementToastTitle
    ) {
      DOM.achievementToastTitle.textContent =
        name;
    }

    if (
      !DOM.achievementToastTitle &&
      !DOM.achievementToastIcon
    ) {
      DOM.achievementToast.textContent =
        `🏆 إنجاز جديد: ${name}`;
    }

    DOM.achievementToast.classList.add(
      "show"
    );

    playSfx(
      "achievement"
    );

    clearTimeout(
      showAchievementToast.timer
    );

    showAchievementToast.timer =
      setTimeout(
        () => {
          DOM.achievementToast.classList.remove(
            "show"
          );
        },
        3500
      );
  }

  /* =========================================================
     TYPING
     ========================================================= */

  function stopTyping() {
    clearInterval(
      typingTimer
    );

    typingTimer = null;

    if (DOM.storyText) {
      DOM.storyText.textContent =
        currentTypingText;
    }

    typingFinished =
      true;

    if (DOM.skipTextBtn) {
      DOM.skipTextBtn.style.display =
        "none";
    }
  }

  function typeText(text) {
    clearInterval(
      typingTimer
    );

    currentTypingText =
      String(text || "");

    typingFinished =
      false;

    if (!DOM.storyText) {
      return;
    }

    DOM.storyText.textContent =
      "";

    if (
      !currentTypingText.length
    ) {
      typingFinished =
        true;

      if (DOM.skipTextBtn) {
        DOM.skipTextBtn.style.display =
          "none";
      }

      return;
    }

    if (
      DOM.skipTextBtn
    ) {
      DOM.skipTextBtn.style.display =
        "";
    }

    let index = 0;

    const speed =
      state.settings.motion
        ? 18
        : 1;

    typingTimer =
      setInterval(
        () => {
          if (
            index >=
            currentTypingText.length
          ) {
            stopTyping();
            return;
          }

          DOM.storyText.textContent +=
            currentTypingText[index];

          index++;
        },
        speed
      );
  }

  /* =========================================================
     VISUAL SCENE
     ========================================================= */

  function updateSceneVisual(
    scene
  ) {
    if (!scene) {
      return;
    }

    if (DOM.sceneImage) {
      const image =
        scene.image ||
        scene.background ||
        "";

      /*
        sceneImage في HTML عبارة عن div.
        لذلك لا نستعمل src عليه.
      */

      if (
        DOM.sceneImage.tagName
          ?.toLowerCase() ===
        "img"
      ) {
        if (image) {
          DOM.sceneImage.src =
            image;

          DOM.sceneImage.style.display =
            "";
        } else {
          DOM.sceneImage.removeAttribute(
            "src"
          );

          DOM.sceneImage.style.display =
            "none";
        }

      } else {
        if (image) {
          DOM.sceneImage.style.backgroundImage =
            `url("${String(image)
              .replace(/"/g, '\\"')}")`;

          DOM.sceneImage.style.backgroundSize =
            "cover";

          DOM.sceneImage.style.backgroundPosition =
            "center";

          DOM.sceneImage.style.backgroundRepeat =
            "no-repeat";

          DOM.sceneImage.style.display =
            "";
        } else {
          /*
            إزالة أي صورة قديمة بالكامل.
          */
          DOM.sceneImage.style.backgroundImage =
            "none";

          DOM.sceneImage.style.display =
            "none";
        }
      }
    }

    if (DOM.sceneWeather) {
      DOM.sceneWeather.textContent =
        scene.weather || "";
    }

    if (DOM.sceneTime) {
      DOM.sceneTime.textContent =
        scene.time || "";
    }

    if (DOM.sceneVisual) {
      DOM.sceneVisual.dataset.scene =
        scene.id || "";

      DOM.sceneVisual.dataset.time =
        scene.time || "";

      DOM.sceneVisual.dataset.weather =
        scene.weather || "";
    }

    if (
      DOM.sceneParticles
    ) {
      DOM.sceneParticles.innerHTML =
        "";

      if (
        state.settings.motion
      ) {
        createParticles(
          scene
        );
      }
    }
  }

  function createParticles(
    scene
  ) {
    const weather =
      String(
        scene.weather || ""
      ).toLowerCase();

    let count = 0;
    let symbol = "·";

    if (
      weather.includes("مطر")
    ) {
      count = 25;
      symbol = "│";
    } else if (
      weather.includes("ضباب")
    ) {
      count = 15;
      symbol = "•";
    } else if (
      weather.includes("ثلج")
    ) {
      count = 22;
      symbol = "❄";
    } else {
      count = 8;
      symbol = "·";
    }

    for (
      let i = 0;
      i < count;
      i++
    ) {
      const particle =
        document.createElement(
          "span"
        );

      particle.textContent =
        symbol;

      particle.className =
        "scene-particle";

      particle.style.left =
        `${Math.random() * 100}%`;

      particle.style.animationDelay =
        `${Math.random() * 4}s`;

      particle.style.animationDuration =
        `${3 + Math.random() * 5}s`;

      DOM.sceneParticles.appendChild(
        particle
      );
    }
  }

  /* =========================================================
     SCENE TRANSITION
     ========================================================= */

  function transitionToScene(
    nextScene,
    callback
  ) {
    if (
      transitionBusy ||
      !nextScene
    ) {
      callback?.();
      return;
    }

    if (
      !DOM.sceneTransition ||
      !state.settings.motion
    ) {
      callback?.();
      return;
    }

    transitionBusy = true;

    const target =
      findScene(
        nextScene
      );

    if (
      DOM.transitionChapter
    ) {
      DOM.transitionChapter.textContent =
        target?.chapter?.number
          ? `الفصل ${target.chapter.number}`
          : "";
    }

    if (
      DOM.transitionTitle
    ) {
      DOM.transitionTitle.textContent =
        target?.chapter?.title ||
        "";
    }

    DOM.sceneTransition.classList.add(
      "active"
    );

    playSfx(
      "transition"
    );

    setTimeout(
      () => {
        callback?.();

        setTimeout(
          () => {
            DOM.sceneTransition.classList.remove(
              "active"
            );

            transitionBusy =
              false;
          },
          450
        );
      },
      550
    );
  }

  /* =========================================================
     CINEMATIC
     ========================================================= */

  function showCinematic(
    chapter,
    callback
  ) {
    if (
      !DOM.cinematicOverlay
    ) {
      callback?.();
      return;
    }

    const title =
      chapter?.title ||
      `الفصل ${chapter?.number || ""}`;

    if (
      DOM.cinematicLabel
    ) {
      DOM.cinematicLabel.textContent =
        `الفصل ${
          chapter?.number || ""
        }`;
    }

    if (
      DOM.cinematicTitle
    ) {
      DOM.cinematicTitle.textContent =
        title;
    }

    if (
      DOM.cinematicText
    ) {
      DOM.cinematicText.textContent =
        chapter?.intro ||
        chapter?.description ||
        "";
    }

    cinematicNext =
      callback;

    DOM.cinematicOverlay.classList.add(
      "active"
    );

    DOM.cinematicOverlay.setAttribute(
      "aria-hidden",
      "false"
    );
  }

  function closeCinematic() {
    if (
      DOM.cinematicOverlay
    ) {
      DOM.cinematicOverlay.classList.remove(
        "active"
      );

      DOM.cinematicOverlay.setAttribute(
        "aria-hidden",
        "true"
      );
    }

    const callback =
      cinematicNext;

    cinematicNext =
      null;

    callback?.();
  }

  /* =========================================================
     SCENE RENDER
     ========================================================= */

  function renderScene(
    useTransition = false
  ) {
    const result =
      currentSceneData();

    if (!result) {
      console.error(
        "Scene not found:",
        state.scene
      );

      notify(
        "حدث خطأ في تحميل المشهد."
      );

      return;
    }

    const {
      scene,
      chapter
    } = result;

    state.chapter =
      safeNumber(
        chapter.number ||
        chapter.id ||
        state.chapter,
        state.chapter
      );

    updateHUD();

    const render = () => {

      if (
        DOM.chapterLabel
      ) {
        DOM.chapterLabel.textContent =
          `الفصل ${
            chapter.number ||
            state.chapter
          }`;
      }

      if (
        DOM.chapterTitleTop
      ) {
        DOM.chapterTitleTop.textContent =
          chapter.title || "";
      }

      if (
        DOM.sceneChapterTag
      ) {
        DOM.sceneChapterTag.textContent =
          `الفصل ${
            chapter.number ||
            state.chapter
          }`;
      }

      if (
        DOM.sceneLocation
      ) {
        DOM.sceneLocation.textContent =
          scene.location ||
          chapter.location ||
          "";
      }

      if (
        DOM.sceneTitle
      ) {
        DOM.sceneTitle.textContent =
          scene.title ||
          "";
      }

      if (
        DOM.sceneTime
      ) {
        DOM.sceneTime.textContent =
          scene.time ||
          "";
      }

      updateSceneVisual(
        scene
      );

      typeText(
        scene.text ||
        scene.story ||
        scene.description ||
        ""
      );

      renderChoices(
        scene
      );

      updateHUD();

      checkAchievements();

      saveGame(false);
    };

    if (useTransition) {
      transitionToScene(
        state.scene,
        render
      );
    } else {
      render();
    }
  }

  /* =========================================================
     SECRET ENDING
     ========================================================= */

  function canUnlockSecretEnding() {
    const f =
      state.flags;

    return (
      !!f.finalTruth &&
      !!f.sawMemory1 &&
      !!f.sawMemory2 &&
      !!f.sawMemory3 &&
      !!f.discoveredFile &&
      !!f.completedArchive &&
      !!f.foundFinalMessage &&
      state.inventory.includes(
        "blackFile"
      ) &&
      state.inventory.includes(
        "letter"
      )
    );
  }

  function getSceneChoices(
    scene
  ) {
    const original =
      Array.isArray(
        scene?.choices
      )
        ? scene.choices
        : [];

    const choices =
      original.filter(
        choice =>
          choiceAvailable(
            choice
          )
      );

    if (
      scene?.id ===
        "c12_final" &&
      canUnlockSecretEnding()
    ) {
      choices.push({
        id:
          "secret_ending",

        text:
          "تقرأ الحقيقة الأخيرة المخفية خلف الملف الأسود.",

        next:
          "ending_secret",

        effects: {
          setFlags: {
            finalTruth:
              true
          }
        }
      });
    }

    return choices;
  }

  /* =========================================================
     CHOICES
     ========================================================= */

  function renderChoices(
    scene
  ) {
    if (!DOM.choices) {
      return;
    }

    DOM.choices.innerHTML =
      "";

    const choices =
      getSceneChoices(
        scene
      );

    if (!choices.length) {
      const empty =
        document.createElement(
          "div"
        );

      empty.className =
        "choices-empty";

      empty.textContent =
        "لا يوجد قرار متاح الآن...";

      DOM.choices.appendChild(
        empty
      );

      return;
    }

    choices.forEach(
      (choice, index) => {

        const button =
          document.createElement(
            "button"
          );

        button.type =
          "button";

        button.className =
          "choice-btn";

        button.dataset.index =
          index + 1;

        const number =
          document.createElement(
            "span"
          );

        number.className =
          "choice-number";

        number.textContent =
          index + 1;

        const text =
          document.createElement(
            "span"
          );

        text.className =
          "choice-text";

        text.textContent =
          choice.text ||
          `الخيار ${
            index + 1
          }`;

        button.appendChild(
          number
        );

        button.appendChild(
          text
        );

        /*
          منع الضغط المزدوج السريع
          أثناء الانتقال.
        */
        button.addEventListener(
          "click",
          () => {
            if (
              transitionBusy
            ) {
              return;
            }

            choose(
              choice
            );
          }
        );

        DOM.choices.appendChild(
          button
        );
      }
    );
  }

  function choose(
    choice
  ) {
    if (
      !choice ||
      transitionBusy
    ) {
      return;
    }

    stopTyping();

    playSfx(
      "choice"
    );

    state.stats.choices++;

    state.history.push({
      scene:
        state.scene,

      choice:
        choice.id ||
        choice.text ||
        "",

      time:
        Date.now()
    });

    if (choice.effects) {
      applyEffects(
        choice.effects
      );
    }

    if (choice.addItem) {
      addItem(
        choice.addItem
      );
    }

    if (choice.addItems) {
      addItems(
        choice.addItems
      );
    }

    if (choice.setFlags) {
      Object.entries(
        choice.setFlags
      ).forEach(
        ([flag, value]) => {
          state.flags[flag] =
            !!value;
        }
      );
    }

    const next =
      choice.next ||
      choice.scene ||
      choice.goto;

    calculateStats();

    checkAchievements();

    saveGame(false);

    if (!next) {
      notify(
        "توقفت القصة هنا مؤقتًا."
      );

      return;
    }

    handleNext(
      next
    );
  }

  /* =========================================================
     NEXT SCENE / ENDINGS
     ========================================================= */

  function handleNext(
    next
  ) {
    if (
      typeof next !==
      "string"
    ) {
      return;
    }

    if (
      next.startsWith(
        "END_"
      )
    ) {
      finishGame(
        next
      );

      return;
    }

    if (
      next ===
      "GAME_OVER"
    ) {
      gameOver();

      return;
    }

    const target =
      findScene(
        next
      );

    if (!target) {
      console.error(
        "Next scene not found:",
        next
      );

      notify(
        "تعذر الانتقال إلى المشهد التالي."
      );

      return;
    }

    const previousChapter =
      state.chapter;

    state.scene =
      next;

    state.chapter =
      safeNumber(
        target.chapter.number ||
        target.chapter.id,
        state.chapter
      );

    state.stats.scenes++;

    const changedChapter =
      previousChapter !==
      state.chapter;

    if (
      changedChapter
    ) {
      showCinematic(
        target.chapter,
        () => {
          renderScene(
            true
          );
        }
      );

      return;
    }

    renderScene(
      true
    );
  }

  /* =========================================================
     GAME OVER
     ========================================================= */

  function gameOver() {
    closeAllOverlays();
    closeCinematic();

    if (
      DOM.gameScreen
    ) {
      DOM.gameScreen.classList.add(
        "hidden"
      );

      DOM.gameScreen.classList.remove(
        "active"
      );
    }

    if (
      DOM.endScreen
    ) {
      DOM.endScreen.classList.remove(
        "hidden"
      );

      DOM.endScreen.classList.add(
        "active"
      );
    }

    if (DOM.endIcon) {
      DOM.endIcon.textContent =
        "◌";
    }

    if (DOM.endTitle) {
      DOM.endTitle.textContent =
        "انتهت رحلتك";
    }

    if (DOM.endText) {
      DOM.endText.textContent =
        "لم تعد تملك القدرة على متابعة الطريق. لكن الحقيقة ما زالت هناك... تنتظر من يعود إليها.";
    }

    updateFinalStats();

    saveGame(false);
  }

  /* =========================================================
     ENDINGS
     ========================================================= */

  function finishGame(
    type
  ) {
    stopTyping();

    closeAllOverlays();
    closeCinematic();

    state.flags.escapedVillage =
      type ===
      "END_ESCAPE";

    if (
      type === "END_TRUE"
    ) {
      state.flags.finalTruth =
        true;

      unlockAchievement(
        "true_ending"
      );
    }

    unlockAchievement(
      "survivor"
    );

    saveGame(false);

    playSfx(
      "ending"
    );

    if (
      DOM.gameScreen
    ) {
      DOM.gameScreen.classList.add(
        "hidden"
      );

      DOM.gameScreen.classList.remove(
        "active"
      );
    }

    if (
      DOM.endScreen
    ) {
      DOM.endScreen.classList.remove(
        "hidden"
      );

      DOM.endScreen.classList.add(
        "active"
      );
    }

    const endings = {
      END_TRUE: {
        icon:
          "◈",

        title:
          "الحقيقة التي لم يكن يجب أن تُعرف",

        text:
          "الآن فهمت لماذا بدأت كل هذه الأحداث. لم تكن تبحث عن الحقيقة فقط... كانت الحقيقة تبحث عنك منذ البداية."
      },

      END_ESCAPE: {
        icon:
          "↗",

        title:
          "الخروج من الظلال",

        text:
          "غادرت المكان، لكن الصمت الذي حملته معك لم يكن طبيعيًا. بعض الأبواب تُغلق، وبعض الأسرار تبقى مفتوحة."
      },

      END_DESTROY: {
        icon:
          "✦",

        title:
          "نهاية التجربة",

        text:
          "اتخذت قرارًا لا رجعة فيه. انتهت التجربة، لكن السؤال الأهم بقي بلا جواب: من كان يراقب من؟"
      },

      END_SECRET: {
        icon:
          "◇",

        title:
          "الحقيقة الأخيرة",

        text:
          "كل الأدلة كانت تقود إلى شيء واحد. لم تكن هذه القصة مجرد تجربة... لقد كانت نسخة من قصة بدأت قبل أن تتذكرها."
      }
    };

    const ending =
      endings[type] ||
      endings.END_ESCAPE;

    if (DOM.endIcon) {
      DOM.endIcon.textContent =
        ending.icon;
    }

    if (DOM.endTitle) {
      DOM.endTitle.textContent =
        ending.title;
    }

    if (DOM.endText) {
      DOM.endText.textContent =
        ending.text;
    }

    updateFinalStats();

    checkAchievements();
  }

  function updateFinalStats() {
    calculateStats();

    if (
      DOM.finalChoices
    ) {
      DOM.finalChoices.textContent =
        state.stats.choices;
    }

    if (
      DOM.finalEvidence
    ) {
      DOM.finalEvidence.textContent =
        state.stats.evidence;
    }

    if (
      DOM.finalMemories
    ) {
      DOM.finalMemories.textContent =
        state.stats.memories;
    }

    /*
      في HTML الحالي finalStats نفسه
      هو الحاوية، لذلك نستعمله فقط
      إذا لم تكن العناصر الداخلية موجودة.
    */
    if (
      DOM.finalStats &&
      !DOM.finalChoices &&
      !DOM.finalEvidence &&
      !DOM.finalMemories
    ) {
      DOM.finalStats.textContent =
        `${state.stats.choices} قرارًا • ${state.stats.evidence} أدلة • ${state.stats.memories} ذكريات`;
    }
  }

  /* =========================================================
     SCREEN HELPERS
     ========================================================= */

  function showGameScreen() {
    if (
      DOM.loadingScreen
    ) {
      DOM.loadingScreen.classList.add(
        "hidden"
      );

      DOM.loadingScreen.classList.remove(
        "active"
      );
    }

    if (
      DOM.startScreen
    ) {
      DOM.startScreen.classList.add(
        "hidden"
      );

      DOM.startScreen.classList.remove(
        "active"
      );
    }

    if (
      DOM.endScreen
    ) {
      DOM.endScreen.classList.add(
        "hidden"
      );

      DOM.endScreen.classList.remove(
        "active"
      );
    }

    if (
      DOM.gameScreen
    ) {
      DOM.gameScreen.classList.remove(
        "hidden"
      );

      DOM.gameScreen.classList.add(
        "active"
      );
    }
  }

  /* =========================================================
     NEW GAME
     ========================================================= */

  function startNewGame() {
    const confirmed =
      !hasSave() ||
      confirm(
        "هل تريد بدء قصة جديدة؟ سيتم استبدال التقدم الحالي."
      );

    if (!confirmed) {
      return;
    }

    const oldSettings =
      state.settings;

    state =
      createInitialState();

    state.settings =
      oldSettings;

    state.started =
      true;

    deleteSave();

    closeAllOverlays();
    closeCinematic();

    showGameScreen();

    state.scene =
      "c1_start";

    state.chapter =
      1;

    state.stats.scenes =
      1;

    updateHUD();

    showCinematic(
      findChapterByNumber(
        1
      ),
      () => {
        renderScene();
      }
    );

    saveGame(false);

    startMusic();
  }

  /* =========================================================
     CONTINUE GAME
     ========================================================= */

  function continueGame() {
    if (!loadGame()) {
      notify(
        "لا يوجد حفظ سابق."
      );

      return;
    }

    state.started =
      true;

    closeAllOverlays();
    closeCinematic();

    showGameScreen();

    updateHUD();

    renderScene();

    startMusic();
  }

  /* =========================================================
     RETURN TO TITLE
     ========================================================= */

  function returnToTitle() {
    saveGame(false);

    stopMusic();

    closeAllOverlays();
    closeCinematic();

    if (
      DOM.gameScreen
    ) {
      DOM.gameScreen.classList.add(
        "hidden"
      );

      DOM.gameScreen.classList.remove(
        "active"
      );
    }

    if (
      DOM.endScreen
    ) {
      DOM.endScreen.classList.add(
        "hidden"
      );

      DOM.endScreen.classList.remove(
        "active"
      );
    }

    if (
      DOM.startScreen
    ) {
      DOM.startScreen.classList.remove(
        "hidden"
      );

      DOM.startScreen.classList.add(
        "active"
      );

      DOM.startScreen.style.display =
        "flex";
    }

    updateContinueButton();
  }

  function restartAfterEnding() {
    startNewGame();
  }

  /* =========================================================
     INVENTORY
     ========================================================= */

  function renderInventory() {
    if (
      !DOM.inventoryContent
    ) {
      return;
    }

    DOM.inventoryContent.innerHTML =
      "";

    if (
      !state.inventory.length
    ) {
      const empty =
        document.createElement(
          "div"
        );

      empty.className =
        "empty-state";

      empty.textContent =
        "لا تحمل أي أدلة حتى الآن.";

      DOM.inventoryContent.appendChild(
        empty
      );

      return;
    }

    state.inventory.forEach(
      id => {
        const item =
          itemData(id);

        const card =
          document.createElement(
            "div"
          );

        card.className =
          "inventory-item";

        const icon =
          document.createElement(
            "div"
          );

        icon.className =
          "inventory-icon";

        icon.textContent =
          item.icon ||
          "◈";

        const body =
          document.createElement(
            "div"
          );

        body.className =
          "inventory-body";

        const name =
          document.createElement(
            "div"
          );

        name.className =
          "inventory-name";

        name.textContent =
          item.name ||
          id;

        const description =
          document.createElement(
            "div"
          );

        description.className =
          "inventory-description";

        description.textContent =
          item.description ||
          "دليل غامض.";

        body.appendChild(
          name
        );

        body.appendChild(
          description
        );

        card.appendChild(
          icon
        );

        card.appendChild(
          body
        );

        DOM.inventoryContent.appendChild(
          card
        );
      }
    );
  }

  /* =========================================================
     ACHIEVEMENTS UI
     ========================================================= */

  function renderAchievements() {
    if (
      !DOM.achievementsContent
    ) {
      return;
    }

    const achievements =
      getAchievements();

    DOM.achievementsContent.innerHTML =
      "";

    if (
      DOM.achievementUnlocked
    ) {
      DOM.achievementUnlocked.textContent =
        state.achievements.length;
    }

    if (
      DOM.achievementTotal
    ) {
      DOM.achievementTotal.textContent =
        achievements.length;
    }

    achievements.forEach(
      achievement => {
        const unlocked =
          state.achievements.includes(
            achievement.id
          );

        const card =
          document.createElement(
            "div"
          );

        card.className =
          "achievement-item";

        if (unlocked) {
          card.classList.add(
            "unlocked"
          );
        }

        const icon =
          document.createElement(
            "div"
          );

        icon.className =
          "achievement-icon";

        icon.textContent =
          unlocked
            ? (
                achievement.icon ||
                "🏆"
              )
            : "🔒";

        const body =
          document.createElement(
            "div"
          );

        body.className =
          "achievement-body";

        const title =
          document.createElement(
            "div"
          );

        title.className =
          "achievement-title";

        title.textContent =
          achievement.name ||
          achievement.title ||
          "إنجاز";

        const description =
          document.createElement(
            "div"
          );

        description.className =
          "achievement-description";

        description.textContent =
          unlocked
            ? (
                achievement.description ||
                "إنجاز مكتمل."
              )
            : (
                achievement.hiddenDescription ||
                "إنجاز مخفي."
              );

        body.appendChild(
          title
        );

        body.appendChild(
          description
        );

        card.appendChild(
          icon
        );

        card.appendChild(
          body
        );

        DOM.achievementsContent.appendChild(
          card
        );
      }
    );
  }

  /* =========================================================
     JOURNAL
     ========================================================= */

  function journalEntries() {
    const entries = [];

    const f =
      state.flags;

    entries.push({
      title:
        "البداية",

      text:
        "استيقظ آدم في مكان لا يتذكر كيف وصل إليه. كان هناك شيء واحد واضح: المكان يعرفه أكثر مما يعرف نفسه."
    });

    if (
      f.foundPhotograph
    ) {
      entries.push({
        title:
          "الصورة",

        text:
          "ظهرت صورة قديمة تحمل تفصيلًا لم يكن من المفترض أن يكون موجودًا."
      });
    }

    if (
      f.foundDiary
    ) {
      entries.push({
        title:
          "المذكرات",

        text:
          "كلمات مجهولة كشفت أن ما يحدث ليس وليد هذه الليلة."
      });
    }

    if (
      f.foundBasement
    ) {
      entries.push({
        title:
          "القبو",

        text:
          "وجد آدم طريقًا إلى مكان أخفي عن الجميع."
      });
    }

    if (
      f.discoveredFile
    ) {
      entries.push({
        title:
          "الملف الأسود",

        text:
          "الملف يحمل معلومات لا تتعلق بشخص غريب... بل بآدم نفسه."
      });
    }

    if (
      f.sawMemory1
    ) {
      entries.push({
        title:
          "الذكرى الأولى",

        text:
          "بدأت أجزاء من الماضي بالعودة، لكن كل إجابة جلبت سؤالًا جديدًا."
      });
    }

    if (
      f.sawMemory2
    ) {
      entries.push({
        title:
          "الذكرى الثانية",

        text:
          "هناك أحداث في الماضي تم إخفاؤها عمدًا."
      });
    }

    if (
      f.sawMemory3
    ) {
      entries.push({
        title:
          "الذكرى الثالثة",

        text:
          "الحقيقة أصبحت قريبة جدًا... وربما أخطر مما توقع."
      });
    }

    if (
      f.knowsWhoIsAdam
    ) {
      entries.push({
        title:
          "من هو آدم؟",

        text:
          "السؤال الذي بدأ القصة تغيّر معناه بالكامل."
      });
    }

    if (
      f.finalTruth
    ) {
      entries.push({
        title:
          "الحقيقة",

        text:
          "لم تكن الأحداث مصادفة. كل خطوة قادت إلى الخطوة التالية."
      });
    }

    return entries;
  }

  function renderJournal() {
    if (
      !DOM.journalContent
    ) {
      return;
    }

    DOM.journalContent.innerHTML =
      "";

    const entries =
      journalEntries();

    entries.forEach(
      entry => {
        const card =
          document.createElement(
            "article"
          );

        card.className =
          "journal-entry";

        const title =
          document.createElement(
            "h3"
          );

        title.textContent =
          entry.title;

        const text =
          document.createElement(
            "p"
          );

        text.textContent =
          entry.text;

        card.appendChild(
          title
        );

        card.appendChild(
          text
        );

        DOM.journalContent.appendChild(
          card
        );
      }
    );
  }

  /* =========================================================
     OVERLAYS
     ========================================================= */

  function openOverlay(
    overlay
  ) {
    if (!overlay) {
      return;
    }

    overlay.classList.add(
      "active"
    );

    overlay.setAttribute(
      "aria-hidden",
      "false"
    );
  }

  function closeOverlay(
    overlay
  ) {
    if (!overlay) {
      return;
    }

    overlay.classList.remove(
      "active"
    );

    overlay.setAttribute(
      "aria-hidden",
      "true"
    );
  }

  function closeAllOverlays() {
    [
      DOM.howToPlayOverlay,
      DOM.menuOverlay,
      DOM.inventoryOverlay,
      DOM.achievementsOverlay,
      DOM.journalOverlay,
      DOM.settingsOverlay
    ].forEach(
      closeOverlay
    );
  }

  /* =========================================================
     MENU HELPERS
     ========================================================= */

  function openMenu() {
    openOverlay(
      DOM.menuOverlay
    );

    playSfx(
      "click"
    );
  }

  function closeMenu() {
    closeOverlay(
      DOM.menuOverlay
    );
  }

  function openInventory() {
    renderInventory();

    closeOverlay(
      DOM.menuOverlay
    );

    openOverlay(
      DOM.inventoryOverlay
    );

    playSfx(
      "click"
    );
  }

  function openAchievements() {
    renderAchievements();

    closeOverlay(
      DOM.menuOverlay
    );

    openOverlay(
      DOM.achievementsOverlay
    );

    playSfx(
      "click"
    );
  }

  function openJournal() {
    renderJournal();

    closeOverlay(
      DOM.menuOverlay
    );

    openOverlay(
      DOM.journalOverlay
    );

    playSfx(
      "click"
    );
  }

  function openSettings() {
    updateSettingsUI();

    closeOverlay(
      DOM.menuOverlay
    );

    openOverlay(
      DOM.settingsOverlay
    );

    playSfx(
      "click"
    );
  }

  /* =========================================================
     EVENT BINDING
     ========================================================= */

  function bindEvents() {

    /* =====================================================
       START SCREEN
       ===================================================== */

    DOM.newGameBtn?.addEventListener(
      "click",
      startNewGame
    );

    DOM.continueBtn?.addEventListener(
      "click",
      continueGame
    );

    DOM.howToPlayBtn?.addEventListener(
      "click",
      () => {
        openOverlay(
          DOM.howToPlayOverlay
        );

        playSfx(
          "click"
        );
      }
    );

    /* =====================================================
       HOW TO PLAY
       ===================================================== */

    DOM.closeHowToPlayBtn?.addEventListener(
      "click",
      () => {
        closeOverlay(
          DOM.howToPlayOverlay
        );
      }
    );

    DOM.tutorialOkBtn?.addEventListener(
      "click",
      () => {
        closeOverlay(
          DOM.howToPlayOverlay
        );
      }
    );

    /* =====================================================
       GAME MENU
       ===================================================== */

    DOM.menuBtn?.addEventListener(
      "click",
      openMenu
    );

    DOM.closeMenuBtn?.addEventListener(
      "click",
      closeMenu
    );

    /*
      هذه كانت من أهم المشاكل:
      أزرار القائمة موجودة في HTML
      لكن لم تكن مربوطة بالـJS.
    */

    DOM.menuInventoryBtn?.addEventListener(
      "click",
      openInventory
    );

    DOM.menuAchievementsBtn?.addEventListener(
      "click",
      openAchievements
    );

    DOM.menuJournalBtn?.addEventListener(
      "click",
      openJournal
    );

    DOM.menuSettingsBtn?.addEventListener(
      "click",
      openSettings
    );

    /* =====================================================
       QUICK INVENTORY
       ===================================================== */

    DOM.inventoryBtn?.addEventListener(
      "click",
      openInventory
    );

    /* =====================================================
       QUICK ACHIEVEMENTS
       ===================================================== */

    DOM.achievementsBtn?.addEventListener(
      "click",
      openAchievements
    );

    /* =====================================================
       QUICK JOURNAL
       ===================================================== */

    DOM.journalBtn?.addEventListener(
      "click",
      openJournal
    );

    /* =====================================================
       CLOSE BUTTONS
       ===================================================== */

    DOM.closeInventoryBtn?.addEventListener(
      "click",
      () => {
        closeOverlay(
          DOM.inventoryOverlay
        );
      }
    );

    DOM.closeAchievementsBtn?.addEventListener(
      "click",
      () => {
        closeOverlay(
          DOM.achievementsOverlay
        );
      }
    );

    DOM.closeJournalBtn?.addEventListener(
      "click",
      () => {
        closeOverlay(
          DOM.journalOverlay
        );
      }
    );

    DOM.closeSettingsBtn?.addEventListener(
      "click",
      () => {
        closeOverlay(
          DOM.settingsOverlay
        );
      }
    );

    DOM.settingsDoneBtn?.addEventListener(
      "click",
      () => {
        saveSettings();

        closeOverlay(
          DOM.settingsOverlay
        );

        notify(
          "تم حفظ الإعدادات."
        );
      }
    );

    /* =====================================================
       SETTINGS — BUTTON TOGGLES
       ===================================================== */

    DOM.sfxToggle?.addEventListener(
      "click",
      () => {
        state.settings.sfx =
          !state.settings.sfx;

        updateSettingsUI();
        saveSettings();

        playSfx(
          "click"
        );
      }
    );

    DOM.musicToggle?.addEventListener(
      "click",
      () => {
        state.settings.music =
          !state.settings.music;

        updateSettingsUI();
        saveSettings();

        if (
          state.settings.music
        ) {
          startMusic();
        } else {
          stopMusic();
        }

        playSfx(
          "click"
        );
      }
    );

    DOM.motionToggle?.addEventListener(
      "click",
      () => {
        state.settings.motion =
          !state.settings.motion;

        updateSettingsUI();
        saveSettings();

        renderScene();

        playSfx(
          "click"
        );
      }
    );

    /* =====================================================
       SOUND
       ===================================================== */

    DOM.soundBtn?.addEventListener(
      "click",
      toggleSound
    );

    /* =====================================================
       SKIP TEXT
       ===================================================== */

    DOM.skipTextBtn?.addEventListener(
      "click",
      () => {
        stopTyping();

        playSfx(
          "click"
        );
      }
    );

    /* =====================================================
       CINEMATIC
       ===================================================== */

    DOM.cinematicContinueBtn?.addEventListener(
      "click",
      () => {
        playSfx(
          "click"
        );

        closeCinematic();
      }
    );

    /* =====================================================
       SAVE
       ===================================================== */

    DOM.saveBtn?.addEventListener(
      "click",
      () => {
        saveGame(true);

        closeOverlay(
          DOM.menuOverlay
        );
      }
    );

    /* =====================================================
       EXIT TO TITLE
       ===================================================== */

    DOM.exitBtn?.addEventListener(
      "click",
      () => {
        closeOverlay(
          DOM.menuOverlay
        );

        returnToTitle();
      }
    );

    /* =====================================================
       END SCREEN
       ===================================================== */

    DOM.restartBtn?.addEventListener(
      "click",
      restartAfterEnding
    );

    DOM.titleBtn?.addEventListener(
      "click",
      returnToTitle
    );

    /* =====================================================
       CLOSE OVERLAY BY BACKDROP
       ===================================================== */

    document
      .querySelectorAll(
        ".overlay"
      )
      .forEach(
        overlay => {
          overlay.addEventListener(
            "click",
            event => {
              if (
                event.target ===
                overlay
              ) {
                closeOverlay(
                  overlay
                );
              }
            }
          );
        }
      );

    /* =====================================================
       GENERIC DATA CLOSE
       ===================================================== */

    document
      .querySelectorAll(
        "[data-close-overlay]"
      )
      .forEach(
        button => {
          button.addEventListener(
            "click",
            () => {
              const target =
                button.dataset
                  .closeOverlay;

              closeOverlay(
                $(target)
              );
            }
          );
        }
      );

    /* =====================================================
       KEYBOARD
       ===================================================== */

    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key ===
          "Escape"
        ) {
          if (
            DOM.cinematicOverlay?.classList.contains(
              "active"
            )
          ) {
            closeCinematic();
          } else {
            closeAllOverlays();
          }

          return;
        }

        if (
          event.key ===
            " " &&
          !typingFinished
        ) {
          event.preventDefault();

          stopTyping();

          return;
        }

        const number =
          Number(
            event.key
          );

        if (
          number >= 1 &&
          number <= 9 &&
          DOM.choices
        ) {
          const button =
            DOM.choices.querySelector(
              `.choice-btn[data-index="${number}"]`
            );

          button?.click();
        }
      }
    );
  }

  /* =========================================================
     LOADING
     ========================================================= */

  function runLoading() {
    if (
      !DOM.loadingScreen
    ) {
      showTitleScreen();

      return;
    }

    let progress = 0;

    const messages = [
      "تهيئة الذاكرة...",
      "جمع شظايا القصة...",
      "فتح الملفات القديمة...",
      "إخفاء الحقيقة...",
      "إعداد الظلال...",
      "اكتمل التحميل."
    ];

    const interval =
      setInterval(
        () => {

          progress +=
            Math.random() *
              16 +
            7;

          if (
            progress >=
            100
          ) {
            progress = 100;
          }

          if (
            DOM.loadingProgress
          ) {
            DOM.loadingProgress.style.width =
              `${progress}%`;
          }

          const index =
            Math.min(
              messages.length -
                1,

              Math.floor(
                (progress /
                  100) *
                  messages.length
              )
            );

          if (
            DOM.loadingStatus
          ) {
            DOM.loadingStatus.textContent =
              messages[index];
          }

          if (
            progress >=
            100
          ) {
            clearInterval(
              interval
            );

            setTimeout(
              showTitleScreen,
              450
            );
          }

        },
        180
      );

    /*
      حماية إضافية حتى لا تبقى اللعبة
      عالقة في شاشة التحميل.
    */

    setTimeout(
      () => {
        clearInterval(
          interval
        );

        if (
          DOM.loadingScreen &&
          !DOM.loadingScreen.classList.contains(
            "hidden"
          )
        ) {
          if (
            DOM.loadingProgress
          ) {
            DOM.loadingProgress.style.width =
              "100%";
          }

          if (
            DOM.loadingStatus
          ) {
            DOM.loadingStatus.textContent =
              "تم تجهيز اللعبة";
          }

          showTitleScreen();
        }
      },
      5000
    );
  }

  function showTitleScreen() {

    if (
      DOM.loadingScreen
    ) {
      DOM.loadingScreen.classList.add(
        "hidden"
      );

      DOM.loadingScreen.classList.remove(
        "active"
      );

      DOM.loadingScreen.style.display =
        "none";
    }

    if (
      DOM.startScreen
    ) {
      DOM.startScreen.classList.remove(
        "hidden"
      );

      DOM.startScreen.classList.add(
        "active"
      );

      DOM.startScreen.style.display =
        "flex";
    }

    if (
      DOM.gameScreen
    ) {
      DOM.gameScreen.classList.add(
        "hidden"
      );

      DOM.gameScreen.classList.remove(
        "active"
      );
    }

    if (
      DOM.endScreen
    ) {
      DOM.endScreen.classList.add(
        "hidden"
      );

      DOM.endScreen.classList.remove(
        "active"
      );
    }

    if (
      DOM.versionText
    ) {
      DOM.versionText.textContent =
        GAME.version ||
        "1.0.0";
    }

    if (
      DOM.gameLogo
    ) {
      /*
        لا نستبدل محتوى الشعار كله
        لأن HTML يحتوي على عناصر التصميم.
      */
      DOM.gameLogo.setAttribute(
        "aria-label",
        GAME.title ||
        "ظلال المجهول"
      );
    }

    if (
      DOM.gameSubtitle
    ) {
      DOM.gameSubtitle.textContent =
        GAME.intro?.subtitle ||
        "كل اختيار له أثر... وكل باب يخفي قصة.";
    }

    updateContinueButton();
  }

  /* =========================================================
     AUTO SAVE
     ========================================================= */

  setInterval(
    () => {
      if (
        state.started &&
        DOM.gameScreen &&
        !DOM.gameScreen.classList.contains(
          "hidden"
        )
      ) {
        saveGame(false);
      }
    },
    20000
  );

  /* =========================================================
     VISIBILITY SAVE
     ========================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {
      if (
        document.hidden &&
        state.started
      ) {
        saveGame(false);
      }
    }
  );

  window.addEventListener(
    "beforeunload",
    () => {
      if (
        state.started
      ) {
        saveGame(false);
      }
    }
  );

  /* =========================================================
     DEBUG API
     ========================================================= */

  window.ShadowsGame = {

    getState() {
      return clone(
        state
      );
    },

    getScene() {
      return currentSceneData();
    },

    save() {
      return saveGame(
        true
      );
    },

    reset() {
      deleteSave();

      state =
        createInitialState();

      showTitleScreen();
    },

    addItem,

    setFlag(
      flag,
      value = true
    ) {
      state.flags[flag] =
        !!value;

      checkAchievements();
      saveGame(false);
      updateHUD();
    },

    go(sceneId) {
      if (
        findScene(
          sceneId
        )
      ) {
        state.scene =
          sceneId;

        const result =
          findScene(
            sceneId
          );

        state.chapter =
          safeNumber(
            result.chapter.number ||
            result.chapter.id,
            state.chapter
          );

        renderScene();
      }
    },

    ending(type) {
      finishGame(
        type
      );
    }
  };

  /* =========================================================
     INIT
     ========================================================= */

  function init() {

    try {
      normalizeState();
    } catch (error) {
      console.error(
        "normalizeState error:",
        error
      );
    }

    try {
      loadSettings();
    } catch (error) {
      console.error(
        "loadSettings error:",
        error
      );
    }

    try {
      bindEvents();
    } catch (error) {
      console.error(
        "bindEvents error:",
        error
      );
    }

    try {
      updateContinueButton();
    } catch (error) {
      console.error(
        "updateContinueButton error:",
        error
      );
    }

    try {
      calculateStats();
    } catch (error) {
      console.error(
        "calculateStats error:",
        error
      );
    }

    runLoading();
  }

  init();

})();