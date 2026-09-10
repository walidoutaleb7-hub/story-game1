/* =========================================================
   ظلال المجهول — SHADOWS OF THE UNKNOWN
   script.js
   ULTRA V8 — COMPLETE GAME ENGINE
   ========================================================= */

(() => {
    "use strict";

    /* =====================================================
       01 — DOM HELPERS
       ===================================================== */

    const $ = id =>
        document.getElementById(id);

    const $$ = selector =>
        Array.from(
            document.querySelectorAll(selector)
        );

    const clamp = (
        value,
        min,
        max
    ) => Math.max(
        min,
        Math.min(max, value)
    );

    const random = (
        min,
        max
    ) =>
        Math.floor(
            Math.random() *
            (max - min + 1)
        ) + min;

    const pick = array =>
        Array.isArray(array) &&
        array.length
            ? array[
                Math.floor(
                    Math.random() *
                    array.length
                )
            ]
            : null;

    const wait = ms =>
        new Promise(resolve =>
            setTimeout(resolve, ms)
        );

    const safeNumber = (
        value,
        fallback = 0
    ) => {

        const n =
            Number(value);

        return Number.isFinite(n)
            ? n
            : fallback;
    };

    const escapeHTML = value =>
        String(value ?? "")
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    const formatNumber = value =>
        safeNumber(
            value
        ).toLocaleString(
            "ar-DZ"
        );

    /* =====================================================
       02 — STORAGE
       ===================================================== */

    const STORAGE_KEY =
        "shadows_of_unknown_ultra_v8";

    const defaultState = {

        player: {
            name: "وليد",
            level: 1,
            xp: 0,
            coins: 100
        },

        health: 100,

        chapter: 1,

        scene: null,

        started: false,

        paused: false,

        sound: true,

        music: true,

        motion: true,

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
            reward: 0
        },

        statistics: {
            choices: 0,
            correctChoices: 0,
            wrongChoices: 0,
            scenes: 0,
            chapters: 0,
            items: 0,
            achievements: 0,
            deaths: 0,
            endings: 0
        }
    };

    function clone(value) {

        return JSON.parse(
            JSON.stringify(value)
        );

    }

    function loadState() {

        try {

            const raw =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if (!raw) {

                return clone(
                    defaultState
                );

            }

            const saved =
                JSON.parse(raw);

            return mergeState(
                clone(defaultState),
                saved
            );

        } catch (error) {

            console.warn(
                "[SHADOWS] Save load failed:",
                error
            );

            return clone(
                defaultState
            );

        }

    }

    function mergeState(
        base,
        saved
    ) {

        if (
            !saved ||
            typeof saved !==
            "object"
        ) {
            return base;
        }

        Object.keys(saved)
            .forEach(key => {

                if (
                    saved[key] &&
                    typeof saved[key] ===
                    "object" &&
                    !Array.isArray(
                        saved[key]
                    ) &&
                    base[key] &&
                    typeof base[key] ===
                    "object"
                ) {

                    base[key] =
                        mergeState(
                            base[key],
                            saved[key]
                        );

                } else {

                    base[key] =
                        saved[key];

                }

            });

        return base;
    }

    let state =
        loadState();

    function saveState() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state)
            );

        } catch (error) {

            console.warn(
                "[SHADOWS] Save failed:",
                error
            );

        }

    }

    function resetState() {

        state =
            clone(defaultState);

        saveState();

        return state;

    }

    /* =====================================================
       03 — DATA BRIDGE
       ===================================================== */

    function getGameData() {

        if (
            typeof window.GAME_DATA !==
            "undefined"
        ) {

            return window.GAME_DATA;

        }

        return {};

    }

    function getChapters() {

        const data =
            getGameData();

        if (
            Array.isArray(
                data.chapters
            )
        ) {

            return data.chapters;

        }

        if (
            Array.isArray(
                data.CHAPTERS
            )
        ) {

            return data.CHAPTERS;

        }

        return [];

    }

    function getChapter(
        chapterNumber
    ) {

        const chapters =
            getChapters();

        const number =
            safeNumber(
                chapterNumber,
                1
            );

        return chapters.find(
            chapter =>
                safeNumber(
                    chapter.id ??
                    chapter.chapter ??
                    chapter.number,
                    0
                ) === number
        ) || null;

    }

    function getScenes(
        chapter
    ) {

        if (!chapter) {
            return [];
        }

        if (
            Array.isArray(
                chapter.scenes
            )
        ) {

            return chapter.scenes;

        }

        if (
            Array.isArray(
                chapter.scene
            )
        ) {

            return chapter.scene;

        }

        return [];

    }

    function getScene(
        chapterNumber,
        sceneId
    ) {

        const chapter =
            getChapter(
                chapterNumber
            );

        if (!chapter) {
            return null;
        }

        const scenes =
            getScenes(chapter);

        return scenes.find(
            scene =>
                String(
                    scene.id ??
                    scene.scene ??
                    scene.key
                ) ===
                String(sceneId)
        ) || null;

    }

    function firstScene(
        chapterNumber
    ) {

        const chapter =
            getChapter(
                chapterNumber
            );

        const scenes =
            getScenes(chapter);

        return scenes[0] || null;
    }

    /* =====================================================
       04 — EVENTS
       ===================================================== */

    const listeners = {};

    function on(
        event,
        callback
    ) {

        if (
            typeof callback !==
            "function"
        ) {
            return () => {};
        }

        if (
            !listeners[event]
        ) {

            listeners[event] =
                [];

        }

        listeners[event]
            .push(callback);

        return () => {

            listeners[event] =
                listeners[event]
                    .filter(
                        fn =>
                            fn !==
                            callback
                    );

        };

    }

    function emit(
        event,
        data
    ) {

        (
            listeners[event] ||
            []
        ).forEach(
            callback => {

                try {

                    callback(data);

                } catch (error) {

                    console.warn(
                        "[SHADOWS EVENT]",
                        error
                    );

                }

            }
        );

    }

    /* =====================================================
       05 — AUDIO
       ===================================================== */

    const AudioEngine = {

        context: null,

        ensure() {

            if (
                this.context
            ) {
                return this.context;
            }

            try {

                const AudioContext =
                    window.AudioContext ||
                    window.webkitAudioContext;

                if (
                    !AudioContext
                ) {
                    return null;
                }

                this.context =
                    new AudioContext();

            } catch {

                return null;

            }

            return this.context;
        },

        tone(
            frequency = 440,
            duration = .08,
            type = "sine",
            volume = .035
        ) {

            if (
                !state.sound
            ) {
                return;
            }

            const ctx =
                this.ensure();

            if (!ctx) {
                return;
            }

            try {

                if (
                    ctx.state ===
                    "suspended"
                ) {

                    ctx.resume();

                }

                const oscillator =
                    ctx.createOscillator();

                const gain =
                    ctx.createGain();

                oscillator.type =
                    type;

                oscillator.frequency.value =
                    frequency;

                gain.gain.setValueAtTime(
                    0,
                    ctx.currentTime
                );

                gain.gain.linearRampToValueAtTime(
                    volume,
                    ctx.currentTime +
                    .01
                );

                gain.gain.exponentialRampToValueAtTime(
                    .001,
                    ctx.currentTime +
                    duration
                );

                oscillator.connect(
                    gain
                );

                gain.connect(
                    ctx.destination
                );

                oscillator.start();

                oscillator.stop(
                    ctx.currentTime +
                    duration
                );

            } catch {}

        },

        click() {

            this.tone(
                440,
                .055,
                "sine",
                .025
            );

        },

        choice() {

            this.tone(
                520,
                .08,
                "triangle",
                .035
            );

        },

        correct() {

            this.tone(
                740,
                .12,
                "sine",
                .04
            );

        },

        danger() {

            this.tone(
                100,
                .18,
                "sawtooth",
                .035
            );

        },

        success() {

            this.tone(
                880,
                .18,
                "sine",
                .045
            );

        }

    };

    function unlockAudio() {

        AudioEngine.ensure();

    }

    /* =====================================================
       06 — EFFECTS BRIDGE
       ===================================================== */

    function playEffect(
        type,
        options = {}
    ) {

        try {

            if (
                window.Effects &&
                typeof window.Effects.play ===
                "function"
            ) {

                return window.Effects.play(
                    type,
                    options
                );

            }

        } catch (error) {

            console.warn(
                "[SHADOWS EFFECT]",
                error
            );

        }

        return null;
    }

    function storyEffects(
        scene,
        extra = {}
    ) {

        if (!scene) {
            return;
        }

        const effects =
            scene.effects ??
            scene.effect ??
            scene.visualEffects;

        if (
            Array.isArray(
                effects
            )
        ) {

            effects.forEach(
                effect => {

                    if (
                        typeof effect ===
                        "string"
                    ) {

                        playEffect(
                            effect,
                            extra
                        );

                    } else if (
                        effect &&
                        typeof effect ===
                        "object"
                    ) {

                        playEffect(
                            effect.type ||
                            effect.name ||
                            "fade",

                            {
                                ...extra,
                                ...effect
                            }
                        );

                    }

                }
            );

        } else if (
            typeof effects ===
            "string"
        ) {

            playEffect(
                effects,
                extra
            );

        }

        if (
            window.Effects &&
            typeof window.Effects.storyEvent ===
            "function"
        ) {

            try {

                window.Effects.storyEvent(
                    scene.event ||
                    scene.specialEvent,
                    extra
                );

            } catch {}

        }

    }

    /* =====================================================
       07 — NOTIFICATIONS
       ===================================================== */

    function notify(
        message,
        icon = "✦"
    ) {

        const element =
            $("notification");

        if (!element) {
            return;
        }

        const iconElement =
            $("notificationIcon");

        const textElement =
            $("notificationText");

        if (iconElement) {

            iconElement.textContent =
                icon;

        }

        if (textElement) {

            textElement.textContent =
                message;

        }

        element.classList.remove(
            "show",
            "active"
        );

        void element.offsetWidth;

        element.classList.add(
            "show",
            "active"
        );

        setTimeout(() => {

            element.classList.remove(
                "show",
                "active"
            );

        }, 2600);

    }

    function toastItem(
        name,
        icon = "✦"
    ) {

        const toast =
            $("itemToast");

        if (!toast) {
            return;
        }

        const iconElement =
            $("itemToastIcon");

        const nameElement =
            $("itemToastName");

        if (iconElement) {

            iconElement.textContent =
                icon;

        }

        if (nameElement) {

            nameElement.textContent =
                name;

        }

        toast.classList.remove(
            "show",
            "active"
        );

        void toast.offsetWidth;

        toast.classList.add(
            "show",
            "active"
        );

        setTimeout(() => {

            toast.classList.remove(
                "show",
                "active"
            );

        }, 2600);

    }

    /* =====================================================
       08 — XP / LEVEL
       ===================================================== */

    function xpRequired(
        level = state.player.level
    ) {

        const current =
            Math.max(
                1,
                safeNumber(
                    level,
                    1
                )
            );

        return Math.floor(
            100 +
            (current - 1) *
            65 +
            Math.pow(
                current,
                1.35
            ) *
            12
        );

    }

    function addXP(
        amount
    ) {

        amount =
            Math.max(
                0,
                safeNumber(
                    amount,
                    0
                )
            );

        if (!amount) {
            return;
        }

        state.player.xp +=
            amount;

        let leveledUp =
            false;

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

            leveledUp =
                true;

            notify(
                `وصلت للمستوى ${state.player.level}`,
                "⬆"
            );

            AudioEngine.success();

        }

        saveState();

        emit(
            "xp",
            amount
        );

        if (leveledUp) {

            checkAchievements();

        }

    }

    /* =====================================================
       09 — COINS
       ===================================================== */

    function addCoins(
        amount
    ) {

        amount =
            safeNumber(
                amount,
                0
            );

        state.player.coins =
            Math.max(
                0,
                state.player.coins +
                amount
            );

        if (
            amount > 0
        ) {

            notify(
                `+${formatNumber(amount)} عملة`,
                "🪙"
            );

        }

        saveState();

    }

    function spendCoins(
        amount
    ) {

        amount =
            Math.max(
                0,
                safeNumber(
                    amount,
                    0
                )
            );

        if (
            state.player.coins <
            amount
        ) {

            notify(
                "ما عندكش عملات كافية",
                "🪙"
            );

            return false;
        }

        state.player.coins -=
            amount;

        saveState();

        return true;

    }

    /* =====================================================
       10 — FLAGS
       ===================================================== */

    function setFlag(
        key,
        value = true
    ) {

        state.flags[
            String(key)
        ] = value;

        saveState();

        emit(
            "flag",
            {
                key,
                value
            }
        );

    }

    function getFlag(
        key,
        fallback = false
    ) {

        return Object.prototype.hasOwnProperty
            .call(
                state.flags,
                String(key)
            )
            ? state.flags[
                String(key)
            ]
            : fallback;

    }

    /* =====================================================
       11 — INVENTORY
       ===================================================== */

    function itemId(
        item
    ) {

        if (
            typeof item ===
            "string"
        ) {
            return item;
        }

        return String(
            item?.id ??
            item?.key ??
            item?.name ??
            ""
        );

    }

    function hasItem(
        id
    ) {

        const target =
            String(id);

        return state.inventory
            .some(
                item =>
                    itemId(item) ===
                    target
            );

    }

    function addItem(
        item
    ) {

        if (!item) {
            return false;
        }

        const id =
            itemId(item);

        if (!id) {
            return false;
        }

        if (
            hasItem(id)
        ) {
            return false;
        }

        state.inventory.push(
            typeof item ===
            "string"
                ? {
                    id: item,
                    name: item,
                    icon: "✦"
                }
                : clone(item)
        );

        state.statistics.items++;

        saveState();

        toastItem(
            item.name ||
            item,
            item.icon ||
            "✦"
        );

        checkAchievements();

        return true;

    }

    function removeItem(
        id
    ) {

        const target =
            String(id);

        const index =
            state.inventory.findIndex(
                item =>
                    itemId(item) ===
                    target
            );

        if (
            index < 0
        ) {

            return false;

        }

        state.inventory.splice(
            index,
            1
        );

        saveState();

        return true;

    }

    /* =====================================================
       12 — JOURNAL
       ===================================================== */

    function addJournal(
        entry
    ) {

        if (!entry) {
            return;
        }

        const id =
            typeof entry ===
            "object"
                ? entry.id ||
                  entry.title ||
                  entry.text
                : entry;

        if (
            state.journal.some(
                item =>
                    String(
                        item.id ||
                        item.title ||
                        item.text
                    ) ===
                    String(id)
            )
        ) {

            return;

        }

        state.journal.push(
            typeof entry ===
            "string"
                ? {
                    id,
                    title:
                        "ملاحظة",
                    text:
                        entry
                }
                : clone(entry)
        );

        saveState();

    }

    /* =====================================================
       13 — HISTORY
       ===================================================== */

    function addHistory(
        scene,
        choice
    ) {

        state.history.push({

            chapter:
                state.chapter,

            scene:
                scene?.id ??
                state.scene,

            choice:
                choice?.id ??
                choice?.text ??
                null,

            time:
                Date.now()

        });

        if (
            state.history.length >
            100
        ) {

            state.history.shift();

        }

        saveState();

    }

    /* =====================================================
       14 — ACHIEVEMENTS
       ===================================================== */

    const DEFAULT_ACHIEVEMENTS = [

        {
            id: "first_step",
            title: "البداية",
            description:
                "ابدأ رحلتك الأولى",
            icon: "🚪"
        },

        {
            id: "first_choice",
            title: "أول قرار",
            description:
                "اتخذ أول اختيار",
            icon: "⚔"
        },

        {
            id: "explorer",
            title: "المستكشف",
            description:
                "شاهد 10 مشاهد",
            icon: "🧭"
        },

        {
            id: "survivor",
            title: "الناجي",
            description:
                "واصل القصة رغم الخطر",
            icon: "🛡"
        },

        {
            id: "collector",
            title: "جامع الأسرار",
            description:
                "اجمع 5 عناصر",
            icon: "🎒"
        },

        {
            id: "rich",
            title: "الثري",
            description:
                "امتلك 500 عملة",
            icon: "🪙"
        },

        {
            id: "chapter_two",
            title: "العبور",
            description:
                "افتح الفصل الثاني",
            icon: "📖"
        },

        {
            id: "master",
            title: "سيد الظلال",
            description:
                "أكمل عدة فصول",
            icon: "👑"
        }

    ];

    function getAchievements() {

        const data =
            getGameData();

        return (
            Array.isArray(
                data.achievements
            )
                ? data.achievements
                : DEFAULT_ACHIEVEMENTS
        );

    }

    function unlockAchievement(
        id
    ) {

        id =
            String(id);

        if (
            state.achievements.includes(
                id
            )
        ) {

            return false;

        }

        const achievement =
            getAchievements().find(
                item =>
                    String(
                        item.id
                    ) === id
            );

        if (!achievement) {
            return false;
        }

        state.achievements.push(
            id
        );

        state.statistics.achievements =
            state.achievements.length;

        saveState();

        const toast =
            $("achievementToast");

        if (toast) {

            const icon =
                $("achievementToastIcon");

            const title =
                $("achievementToastTitle");

            if (icon) {

                icon.textContent =
                    achievement.icon ||
                    "🏆";

            }

            if (title) {

                title.textContent =
                    achievement.title ||
                    "إنجاز جديد";

            }

            toast.classList.remove(
                "show",
                "active"
            );

            void toast.offsetWidth;

            toast.classList.add(
                "show",
                "active"
            );

            setTimeout(() => {

                toast.classList.remove(
                    "show",
                    "active"
                );

            }, 3000);

        }

        AudioEngine.success();

        return true;

    }

    function checkAchievements() {

        if (
            !state.started
        ) {
            return;
        }

        if (
            state.statistics.scenes >=
            1
        ) {

            unlockAchievement(
                "first_step"
            );

        }

        if (
            state.statistics.choices >=
            1
        ) {

            unlockAchievement(
                "first_choice"
            );

        }

        if (
            state.statistics.scenes >=
            10
        ) {

            unlockAchievement(
                "explorer"
            );

        }

        if (
            state.statistics.deaths ===
            0 &&
            state.statistics.scenes >=
            5
        ) {

            unlockAchievement(
                "survivor"
            );

        }

        if (
            state.inventory.length >=
            5
        ) {

            unlockAchievement(
                "collector"
            );

        }

        if (
            state.player.coins >=
            500
        ) {

            unlockAchievement(
                "rich"
            );

        }

        if (
            state.unlockedChapters
                .includes(2)
        ) {

            unlockAchievement(
                "chapter_two"
            );

        }

        if (
            state.completedChapters
                .length >= 5
        ) {

            unlockAchievement(
                "master"
            );

        }

    }

    /* =====================================================
       15 — NORMALIZATION
       ===================================================== */

    function normalizeScene(
        scene
    ) {

        if (!scene) {
            return null;
        }

        return {

            ...scene,

            id:
                scene.id ??
                scene.scene ??
                scene.key,

            title:
                scene.title ??
                scene.name ??
                "مجهول",

            location:
                scene.location ??
                scene.place ??
                "",

            text:
                scene.text ??
                scene.story ??
                scene.description ??
                "",

            image:
                scene.image ??
                scene.background ??
                scene.visual ??
                "",

            weather:
                scene.weather ??
                "",

            time:
                scene.time ??
                "",

            choices:
                Array.isArray(
                    scene.choices
                )
                    ? scene.choices
                    : [],

            effects:
                scene.effects ??
                scene.effect ??
                []

        };

    }

    function normalizeChoice(
        choice
    ) {

        if (!choice) {
            return null;
        }

        return {

            ...choice,

            id:
                choice.id ??
                choice.key ??
                choice.text,

            text:
                choice.text ??
                choice.label ??
                choice.title ??
                "اختيار",

            next:
                choice.next ??
                choice.scene ??
                choice.target ??
                null,

            reward:
                choice.reward ??
                null,

            effects:
                choice.effects ??
                choice.effect ??
                [],

            condition:
                choice.condition ??
                null

        };

    }

    /* =====================================================
       16 — CONDITIONS
       ===================================================== */

    function conditionMet(
        condition
    ) {

        if (
            condition == null
        ) {

            return true;

        }

        if (
            typeof condition ===
            "boolean"
        ) {

            return condition;

        }

        if (
            typeof condition ===
            "string"
        ) {

            return !!getFlag(
                condition
            );

        }

        if (
            Array.isArray(
                condition
            )
        ) {

            return condition.every(
                conditionMet
            );

        }

        if (
            typeof condition !==
            "object"
        ) {

            return true;

        }

        if (
            condition.flag
        ) {

            const actual =
                getFlag(
                    condition.flag
                );

            if (
                "equals" in
                condition
            ) {

                if (
                    actual !==
                    condition.equals
                ) {

                    return false;

                }

            } else if (
                condition.flag &&
                !actual
            ) {

                return false;

            }

        }

        if (
            condition.item &&
            !hasItem(
                condition.item
            )
        ) {

            return false;

        }

        if (
            condition.level
        ) {

            if (
                state.player.level <
                safeNumber(
                    condition.level
                )
            ) {

                return false;

            }

        }

        if (
            condition.coins
        ) {

            if (
                state.player.coins <
                safeNumber(
                    condition.coins
                )
            ) {

                return false;

            }

        }

        if (
            condition.health
        ) {

            if (
                state.health <
                safeNumber(
                    condition.health
                )
            ) {

                return false;

            }

        }

        return true;

    }

    /* =====================================================
       17 — REWARDS
       ===================================================== */

    function applyReward(
        reward
    ) {

        if (!reward) {
            return;
        }

        if (
            typeof reward ===
            "number"
        ) {

            addCoins(
                reward
            );

            return;

        }

        if (
            reward.coins
        ) {

            addCoins(
                reward.coins
            );

        }

        if (
            reward.xp
        ) {

            addXP(
                reward.xp
            );

        }

        if (
            reward.item
        ) {

            addItem(
                reward.item
            );

        }

        if (
            Array.isArray(
                reward.items
            )
        ) {

            reward.items.forEach(
                addItem
            );

        }

        if (
            reward.flag
        ) {

            if (
                typeof reward.flag ===
                "object"
            ) {

                Object.entries(
                    reward.flag
                ).forEach(
                    ([key, value]) =>
                        setFlag(
                            key,
                            value
                        )
                );

            } else {

                setFlag(
                    reward.flag,
                    true
                );

            }

        }

        if (
            reward.journal
        ) {

            addJournal(
                reward.journal
            );

        }

    }

    /* =====================================================
       18 — SCENE EFFECTS
       ===================================================== */

    function processSceneData(
        scene
    ) {

        if (!scene) {
            return;
        }

        if (
            scene.setFlags
        ) {

            Object.entries(
                scene.setFlags
            ).forEach(
                ([key, value]) =>
                    setFlag(
                        key,
                        value
                    )
            );

        }

        if (
            scene.flags
        ) {

            Object.entries(
                scene.flags
            ).forEach(
                ([key, value]) =>
                    setFlag(
                        key,
                        value
                    )
            );

        }

        if (
            scene.reward
        ) {

            applyReward(
                scene.reward
            );

        }

        if (
            scene.rewards
        ) {

            applyReward(
                scene.rewards
            );

        }

        if (
            scene.item
        ) {

            addItem(
                scene.item
            );

        }

        if (
            Array.isArray(
                scene.items
            )
        ) {

            scene.items.forEach(
                addItem
            );

        }

        if (
            scene.journal
        ) {

            addJournal(
                scene.journal
            );

        }

    }

    /* =====================================================
       19 — GAME OBJECT
       ===================================================== */

    const Game = {

        start(
            chapter = 1,
            sceneId = null
        ) {

            unlockAudio();

            state.started =
                true;

            state.paused =
                false;

            state.health =
                clamp(
                    state.health ||
                    100,
                    0,
                    100
                );

            state.chapter =
                safeNumber(
                    chapter,
                    1
                );

            let scene =
                sceneId
                    ? getScene(
                        state.chapter,
                        sceneId
                    )
                    : firstScene(
                        state.chapter
                    );

            if (!scene) {

                notify(
                    "لم يتم العثور على بداية الفصل",
                    "⚠"
                );

                return false;

            }

            state.scene =
                scene.id ??
                scene.scene ??
                scene.key;

            saveState();

            showScreen(
                "gameScreen"
            );

            renderScene(
                scene
            );

            checkAchievements();

            return true;

        },

        continueGame() {

            unlockAudio();

            if (
                !state.started ||
                !state.scene
            ) {

                return this.start(
                    state.chapter ||
                    1
                );

            }

            const scene =
                getScene(
                    state.chapter,
                    state.scene
                );

            if (!scene) {

                return this.start(
                    state.chapter ||
                    1
                );

            }

            showScreen(
                "gameScreen"
            );

            renderScene(
                scene
            );

            return true;

        },

        newGame() {

            resetState();

            state.started =
                true;

            saveState();

            return this.start(
                1
            );

        },

        current() {

            return normalizeScene(
                getScene(
                    state.chapter,
                    state.scene
                )
            );

        },

        choose(
            choice
        ) {

            if (
                !state.started
            ) {
                return;
            }

            const current =
                this.current();

            if (!current) {
                return;
            }

            const normalized =
                normalizeChoice(
                    choice
                );

            if (!normalized) {
                return;
            }

            if (
                !conditionMet(
                    normalized.condition
                )
            ) {

                notify(
                    normalized.lockedText ||
                    "هذا الاختيار غير متاح الآن",
                    "🔒"
                );

                AudioEngine.danger();

                return;

            }

            state.statistics.choices++;

            addHistory(
                current,
                normalized
            );

            processChoice(
                normalized
            );

            checkAchievements();

            saveState();

        },

        goTo(
            sceneId
        ) {

            const scene =
                getScene(
                    state.chapter,
                    sceneId
                );

            if (!scene) {

                notify(
                    "المشهد غير موجود",
                    "⚠"
                );

                return false;

            }

            transitionToScene(
                scene
            );

            return true;

        },

        next() {

            const current =
                this.current();

            if (!current) {
                return false;
            }

            const scenes =
                getScenes(
                    getChapter(
                        state.chapter
                    )
                );

            const index =
                scenes.findIndex(
                    scene =>
                        String(
                            scene.id ??
                            scene.scene ??
                            scene.key
                        ) ===
                        String(
                            current.id
                        )
                );

            if (
                index >= 0 &&
                index <
                scenes.length - 1
            ) {

                return this.goTo(
                    scenes[index + 1]
                        .id ??
                    scenes[index + 1]
                        .scene ??
                    scenes[index + 1]
                        .key
                );

            }

            return this.finishChapter();

        },

        pause() {

            state.paused =
                true;

            saveState();

        },

        resume() {

            state.paused =
                false;

            saveState();

        },

        finishChapter() {

            const chapter =
                state.chapter;

            if (
                !state.completedChapters
                    .includes(chapter)
            ) {

                state.completedChapters
                    .push(chapter);

                state.statistics.chapters++;

            }

            const nextChapter =
                chapter + 1;

            if (
                getChapter(
                    nextChapter
                )
            ) {

                if (
                    !state.unlockedChapters
                        .includes(
                            nextChapter
                        )
                ) {

                    state.unlockedChapters
                        .push(
                            nextChapter
                        );

                }

                state.chapter =
                    nextChapter;

                state.scene =
                    null;

                addXP(100);

                addCoins(50);

                saveState();

                cinematic(
                    "فصل جديد",
                    `الفصل ${nextChapter}`,
                    "رحلتك تستمر..."
                );

                setTimeout(() => {

                    this.start(
                        nextChapter
                    );

                }, 1000);

                return true;

            }

            state.statistics.endings++;

            saveState();

            renderEndScreen();

            return true;

        }

    };

    /* =====================================================
       20 — PROCESS CHOICE
       ===================================================== */

    function processChoice(
        choice
    ) {

        AudioEngine.choice();

        if (
            choice.flags
        ) {

            Object.entries(
                choice.flags
            ).forEach(
                ([key, value]) =>
                    setFlag(
                        key,
                        value
                    )
            );

        }

        if (
            choice.setFlags
        ) {

            Object.entries(
                choice.setFlags
            ).forEach(
                ([key, value]) =>
                    setFlag(
                        key,
                        value
                    )
            );

        }

        if (
            choice.reward
        ) {

            applyReward(
                choice.reward
            );

        }

        if (
            choice.rewards
        ) {

            applyReward(
                choice.rewards
            );

        }

        if (
            choice.damage
        ) {

            const damage =
                Math.max(
                    0,
                    safeNumber(
                        choice.damage,
                        0
                    )
                );

            state.health =
                clamp(
                    state.health -
                    damage,
                    0,
                    100
                );

            playEffect(
                "danger",
                {
                    duration:
                        550
                }
            );

            AudioEngine.danger();

            if (
                state.health <= 0
            ) {

                state.statistics.deaths++;

                state.health =
                    35;

                notify(
                    "نجوت بصعوبة...",
                    "🩸"
                );

            }

        }

        if (
            choice.heal
        ) {

            state.health =
                clamp(
                    state.health +
                    safeNumber(
                        choice.heal,
                        0
                    ),
                    0,
                    100
                );

        }

        if (
            choice.xp
        ) {

            addXP(
                choice.xp
            );

        }

        if (
            choice.coins
        ) {

            addCoins(
                choice.coins
            );

        }

        if (
            choice.item
        ) {

            addItem(
                choice.item
            );

        }

        if (
            choice.journal
        ) {

            addJournal(
                choice.journal
            );

        }

        if (
            choice.effect
        ) {

            playEffect(
                typeof choice.effect ===
                "string"
                    ? choice.effect
                    : choice.effect.type,
                typeof choice.effect ===
                "object"
                    ? choice.effect
                    : {}
            );

        }

        if (
            choice.effects
        ) {

            storyEffects(
                {
                    effects:
                        choice.effects
                }
            );

        }

        saveState();

        const next =
            choice.next ??
            choice.target ??
            choice.scene;

        if (
            next ===
            "end"
        ) {

            renderEndScreen();

            return;

        }

        if (
            next ===
            "next"
        ) {

            setTimeout(
                () => Game.next(),
                350
            );

            return;

        }

        if (
            next
        ) {

            setTimeout(
                () =>
                    Game.goTo(
                        next
                    ),
                300
            );

            return;

        }

        setTimeout(
            () => Game.next(),
            350
        );

    }

    /* =====================================================
       21 — SCENE RENDER
       ===================================================== */

    function renderScene(
        rawScene
    ) {

        const scene =
            normalizeScene(
                rawScene
            );

        if (!scene) {
            return;
        }

        state.scene =
            scene.id;

        state.statistics.scenes++;

        processSceneData(
            scene
        );

        saveState();

        renderHUD();

        renderSceneVisual(
            scene
        );

        renderStory(
            scene
        );

        renderChoices(
            scene
        );

        storyEffects(
            scene
        );

        checkAchievements();

        emit(
            "scene",
            scene
        );

    }

    /* =====================================================
       22 — HUD
       ===================================================== */

    function renderHUD() {

        const health =
            $("health");

        if (health) {

            health.textContent =
                `${state.health}%`;

        }

        const coins =
            $("coins");

        if (coins) {

            coins.textContent =
                formatNumber(
                    state.player.coins
                );

        }

        const chapter =
            $("chapter");

        if (chapter) {

            chapter.textContent =
                String(
                    state.chapter
                );

        }

        const progress =
            $("progressBar");

        const progressText =
            $("progressText");

        const chapters =
            getChapters();

        const total =
            Math.max(
                1,
                chapters.length
            );

        const percent =
            clamp(
                state.chapter /
                total *
                100,
                0,
                100
            );

        if (progress) {

            progress.style.width =
                `${percent}%`;

        }

        if (progressText) {

            progressText.textContent =
                `${Math.round(
                    percent
                )}%`;

        }

        const inventoryCount =
            $("inventoryCount");

        if (inventoryCount) {

            inventoryCount.textContent =
                state.inventory.length;

        }

        const achievementCount =
            $("achievementCount");

        if (achievementCount) {

            achievementCount.textContent =
                state.achievements.length;

        }

    }

    /* =====================================================
       23 — VISUAL SCENE
       ===================================================== */

    function renderSceneVisual(
        scene
    ) {

        const visual =
            $("sceneVisual");

        const image =
            $("sceneImage");

        const weather =
            $("sceneWeather");

        const time =
            $("sceneTime");

        if (visual) {

            visual.dataset.scene =
                String(
                    scene.id ||
                    ""
                );

            visual.className =
                "scene-visual";

            if (
                scene.visualClass
            ) {

                visual.classList.add(
                    scene.visualClass
                );

            }

        }

        if (image) {

            if (
                scene.image
            ) {

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

        if (weather) {

            weather.textContent =
                scene.weather ||
                "";

        }

        if (time) {

            time.textContent =
                scene.time ||
                "";

        }

    }

    /* =====================================================
       24 — STORY
       ===================================================== */

    function renderStory(
        scene
    ) {

        const chapterTag =
            $("sceneChapterTag");

        const location =
            $("sceneLocation");

        const title =
            $("sceneTitle");

        const text =
            $("storyText");

        const topChapter =
            $("chapterLabel");

        const topTitle =
            $("chapterTitleTop");

        if (chapterTag) {

            chapterTag.textContent =
                `الفصل ${state.chapter}`;

        }

        if (location) {

            location.textContent =
                scene.location ||
                "";

        }

        if (title) {

            title.textContent =
                scene.title ||
                "";

        }

        if (topChapter) {

            topChapter.textContent =
                `الفصل ${state.chapter}`;

        }

        if (topTitle) {

            topTitle.textContent =
                scene.title ||
                "";

        }

        if (text) {

            typeText(
                text,
                scene.text ||
                ""
            );

        }

    }

    let typingTimer = null;

    function typeText(
        element,
        content
    ) {

        if (!element) {
            return;
        }

        if (typingTimer) {

            clearInterval(
                typingTimer
            );

            typingTimer =
                null;

        }

        const text =
            String(
                content ??
                ""
            );

        element.textContent =
            "";

        const skipButton =
            $("skipTextBtn");

        let index = 0;

        const speed =
            state.motion
                ? 12
                : 0;

        if (
            speed <= 0
        ) {

            element.textContent =
                text;

            return;

        }

        typingTimer =
            setInterval(
                () => {

                    element.textContent =
                        text.slice(
                            0,
                            index
                        );

                    index++;

                    if (
                        index >
                        text.length
                    ) {

                        clearInterval(
                            typingTimer
                        );

                        typingTimer =
                            null;

                        if (
                            skipButton
                        ) {

                            skipButton.style
                                .display =
                                "none";

                        }

                    }

                },
                speed
            );

        if (
            skipButton
        ) {

            skipButton.style.display =
                "inline-flex";

            skipButton.onclick =
                () => {

                    if (
                        typingTimer
                    ) {

                        clearInterval(
                            typingTimer
                        );

                        typingTimer =
                            null;

                    }

                    element.textContent =
                        text;

                    skipButton.style
                        .display =
                        "none";

                };

        }

    }

    /* =====================================================
       25 — CHOICES
       ===================================================== */

    function renderChoices(
        scene
    ) {

        const container =
            $("choices");

        if (!container) {
            return;
        }

        container.innerHTML =
            "";

        const choices =
            Array.isArray(
                scene.choices
            )
                ? scene.choices
                : [];

        choices.forEach(
            (rawChoice, index) => {

                const choice =
                    normalizeChoice(
                        rawChoice
                    );

                if (!choice) {
                    return;
                }

                const button =
                    document.createElement(
                        "button"
                    );

                button.type =
                    "button";

                button.className =
                    "choice-button";

                button.dataset.choice =
                    String(
                        choice.id ??
                        index
                    );

                const available =
                    conditionMet(
                        choice.condition
                    );

                if (!available) {

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
                    String(
                        index + 1
                    );

                const label =
                    document.createElement(
                        "span"
                    );

                label.className =
                    "choice-text";

                label.textContent =
                    choice.text;

                button.appendChild(
                    number
                );

                button.appendChild(
                    label
                );

                if (
                    choice.icon
                ) {

                    const icon =
                        document.createElement(
                            "span"
                        );

                    icon.className =
                        "choice-icon";

                    icon.textContent =
                        choice.icon;

                    button.appendChild(
                        icon
                    );

                }

                button.addEventListener(
                    "click",
                    () => {

                        Game.choose(
                            choice
                        );

                    }
                );

                container.appendChild(
                    button
                );

            }
        );

    }

    /* =====================================================
       26 — TRANSITION
       ===================================================== */

    async function transitionToScene(
        scene
    ) {

        const transition =
            $("sceneTransition");

        if (transition) {

            transition.classList.add(
                "active"
            );

        }

        playEffect(
            "fade",
            {
                duration:
                    500
            }
        );

        await wait(
            220
        );

        renderScene(
            scene
        );

        await wait(
            280
        );

        if (transition) {

            transition.classList.remove(
                "active"
            );

        }

    }

    /* =====================================================
       27 — SCREENS
       ===================================================== */

    function showScreen(
        id
    ) {

        const screens = [
            "loadingScreen",
            "startScreen",
            "gameScreen",
            "endScreen"
        ];

        screens.forEach(
            screenId => {

                const element =
                    $(screenId);

                if (!element) {
                    return;
                }

                element.classList.toggle(
                    "hidden",
                    screenId !== id
                );

            }
        );

    }

    /* =====================================================
       28 — CINEMATIC
       ===================================================== */

    function cinematic(
        label = "",
        title = "",
        text = ""
    ) {

        const overlay =
            $("cinematicOverlay");

        if (!overlay) {
            return;
        }

        const labelElement =
            $("cinematicLabel");

        const titleElement =
            $("cinematicTitle");

        const textElement =
            $("cinematicText");

        const continueButton =
            $("cinematicContinueBtn");

        if (labelElement) {

            labelElement.textContent =
                label;

        }

        if (titleElement) {

            titleElement.textContent =
                title;

        }

        if (textElement) {

            textElement.textContent =
                text;

        }

        overlay.classList.remove(
            "hidden"
        );

        overlay.classList.add(
            "active"
        );

        playEffect(
            "darkness",
            {
                duration:
                    1000
            }
        );

        const close =
            () => {

                overlay.classList.remove(
                    "active"
                );

                setTimeout(
                    () =>
                        overlay.classList.add(
                            "hidden"
                        ),
                    350
                );

            };

        if (continueButton) {

            continueButton.onclick =
                close;

        }

        setTimeout(
            close,
            3500
        );

    }

    /* =====================================================
       29 — END SCREEN
       ===================================================== */

    function renderEndScreen() {

        showScreen(
            "endScreen"
        );

        const title =
            $("endTitle");

        const text =
            $("endText");

        const finalChapter =
            $("finalChapter");

        const finalCoins =
            $("finalCoins");

        const finalAchievements =
            $("finalAchievements");

        if (title) {

            title.textContent =
                "نهاية الرحلة";

        }

        if (text) {

            text.textContent =
                "لقد وصلت إلى نهاية الفصول المتاحة.";

        }

        if (finalChapter) {

            finalChapter.textContent =
                state.chapter;

        }

        if (finalCoins) {

            finalCoins.textContent =
                formatNumber(
                    state.player.coins
                );

        }

        if (finalAchievements) {

            finalAchievements.textContent =
                state.achievements.length;

        }

        playEffect(
            "reveal",
            {
                duration:
                    1300
            }
        );

    }

    /* =====================================================
       30 — INVENTORY
       ===================================================== */

    function renderInventory() {

        const container =
            $("inventoryContent");

        if (!container) {
            return;
        }

        container.innerHTML =
            "";

        if (
            !state.inventory.length
        ) {

            container.innerHTML =
                `
                <div class="empty-state">
                    🎒
                    <strong>الحقيبة فارغة</strong>
                    <span>لم تجمع أي عنصر بعد.</span>
                </div>
                `;

            return;

        }

        state.inventory.forEach(
            item => {

                const element =
                    document.createElement(
                        "div"
                    );

                element.className =
                    "inventory-item";

                element.innerHTML =
                    `
                    <div class="inventory-item-icon">
                        ${escapeHTML(
                            item.icon ||
                            "✦"
                        )}
                    </div>

                    <div class="inventory-item-info">

                        <strong>
                            ${escapeHTML(
                                item.name ||
                                item.id ||
                                "عنصر"
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                item.description ||
                                ""
                            )}
                        </span>

                    </div>
                    `;

                container.appendChild(
                    element
                );

            }
        );

    }

    /* =====================================================
       31 — ACHIEVEMENTS UI
       ===================================================== */

    function renderAchievements() {

        const container =
            $("achievementsContent");

        if (!container) {
            return;
        }

        container.innerHTML =
            "";

        const achievements =
            getAchievements();

        achievements.forEach(
            achievement => {

                const unlocked =
                    state.achievements
                        .includes(
                            String(
                                achievement.id
                            )
                        );

                const element =
                    document.createElement(
                        "div"
                    );

                element.className =
                    "achievement-item";

                if (unlocked) {

                    element.classList.add(
                        "unlocked"
                    );

                }

                element.innerHTML =
                    `
                    <div class="achievement-icon">
                        ${escapeHTML(
                            achievement.icon ||
                            "🏆"
                        )}
                    </div>

                    <div class="achievement-info">

                        <strong>
                            ${escapeHTML(
                                achievement.title ||
                                achievement.name ||
                                "إنجاز"
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                achievement.description ||
                                ""
                            )}
                        </span>

                    </div>
                    `;

                container.appendChild(
                    element
                );

            }
        );

        const total =
            $("achievementTotal");

        if (total) {

            total.textContent =
                `${state.achievements.length}/${achievements.length}`;

        }

    }

    /* =====================================================
       32 — JOURNAL UI
       ===================================================== */

    function renderJournal() {

        const container =
            $("journalContent");

        if (!container) {
            return;
        }

        container.innerHTML =
            "";

        if (
            !state.journal.length
        ) {

            container.innerHTML =
                `
                <div class="empty-state">
                    📖
                    <strong>لا توجد ملاحظات</strong>
                    <span>الأسرار التي تكتشفها ستظهر هنا.</span>
                </div>
                `;

            return;

        }

        state.journal
            .slice()
            .reverse()
            .forEach(
                entry => {

                    const element =
                        document.createElement(
                            "article"
                        );

                    element.className =
                        "journal-entry";

                    element.innerHTML =
                        `
                        <h3>
                            ${escapeHTML(
                                entry.title ||
                                "ملاحظة"
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                entry.text ||
                                entry.description ||
                                ""
                            )}
                        </p>
                        `;

                    container.appendChild(
                        element
                    );

                }
            );

    }

    /* =====================================================
       33 — PROFILE
       ===================================================== */

    function renderPlayerProfile() {

        const level =
            $("playerLevel");

        const xp =
            $("playerXP");

        const name =
            $("playerName");

        if (name) {

            name.textContent =
                state.player.name;

        }

        if (level) {

            level.textContent =
                state.player.level;

        }

        if (xp) {

            const required =
                xpRequired(
                    state.player.level
                );

            xp.textContent =
                `${state.player.xp}/${required}`;

        }

    }

    /* =====================================================
       34 — SETTINGS
       ===================================================== */

    function syncSettings() {

        const sound =
            $("sfxToggle");

        const music =
            $("musicToggle");

        const motion =
            $("motionToggle");

        if (sound) {

            sound.checked =
                !!state.sound;

        }

        if (music) {

            music.checked =
                !!state.music;

        }

        if (motion) {

            motion.checked =
                !!state.motion;

        }

        if (
            window.Effects &&
            typeof window.Effects.setMotion ===
            "function"
        ) {

            window.Effects.setMotion(
                state.motion
            );

        }

    }

    /* =====================================================
       35 — OVERLAYS
       ===================================================== */

    function openOverlay(
        id
    ) {

        const element =
            $(id);

        if (!element) {
            return;
        }

        element.classList.remove(
            "hidden"
        );

        element.classList.add(
            "active"
        );

    }

    function closeOverlay(
        id
    ) {

        const element =
            $(id);

        if (!element) {
            return;
        }

        element.classList.remove(
            "active"
        );

        setTimeout(
            () =>
                element.classList.add(
                    "hidden"
                ),
            200
        );

    }

    /* =====================================================
       36 — BUTTON BINDING
       ===================================================== */

    function bindClick(
        id,
        callback
    ) {

        const element =
            $(id);

        if (!element) {
            return;
        }

        element.addEventListener(
            "click",
            event => {

                unlockAudio();

                AudioEngine.click();

                callback(
                    event
                );

            }
        );

    }

    function bindUI() {

        bindClick(
            "continueBtn",
            () =>
                Game.continueGame()
        );

        bindClick(
            "newGameBtn",
            () =>
                Game.newGame()
        );

        bindClick(
            "howToPlayBtn",
            () =>
                openOverlay(
                    "howToPlayOverlay"
                )
        );

        bindClick(
            "closeHowToPlayBtn",
            () =>
                closeOverlay(
                    "howToPlayOverlay"
                )
        );

        bindClick(
            "tutorialOkBtn",
            () =>
                closeOverlay(
                    "howToPlayOverlay"
                )
        );

        bindClick(
            "menuBtn",
            () =>
                openOverlay(
                    "menuOverlay"
                )
        );

        bindClick(
            "closeMenuBtn",
            () =>
                closeOverlay(
                    "menuOverlay"
                )
        );

        bindClick(
            "inventoryBtn",
            () => {

                renderInventory();

                openOverlay(
                    "inventoryOverlay"
                );

            }
        );

        bindClick(
            "menuInventoryBtn",
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

        bindClick(
            "closeInventoryBtn",
            () =>
                closeOverlay(
                    "inventoryOverlay"
                )
        );

        bindClick(
            "achievementsBtn",
            () => {

                renderAchievements();

                openOverlay(
                    "achievementsOverlay"
                );

            }
        );

        bindClick(
            "menuAchievementsBtn",
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

        bindClick(
            "closeAchievementsBtn",
            () =>
                closeOverlay(
                    "achievementsOverlay"
                )
        );

        bindClick(
            "journalBtn",
            () => {

                renderJournal();

                openOverlay(
                    "journalOverlay"
                );

            }
        );

        bindClick(
            "menuJournalBtn",
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

        bindClick(
            "closeJournalBtn",
            () =>
                closeOverlay(
                    "journalOverlay"
                )
        );

        bindClick(
            "menuSettingsBtn",
            () => {

                closeOverlay(
                    "menuOverlay"
                );

                syncSettings();

                openOverlay(
                    "settingsOverlay"
                );

            }
        );

        bindClick(
            "closeSettingsBtn",
            () =>
                closeOverlay(
                    "settingsOverlay"
                )
        );

        bindClick(
            "settingsDoneBtn",
            () =>
                closeOverlay(
                    "settingsOverlay"
                )
        );

        bindClick(
            "soundBtn",
            () => {

                state.sound =
                    !state.sound;

                syncSettings();

                saveState();

                notify(
                    state.sound
                        ? "الصوت مفعل"
                        : "الصوت متوقف",
                    "🔊"
                );

            }
        );

        bindClick(
            "saveGameBtn",
            () => {

                saveState();

                notify(
                    "تم حفظ اللعبة",
                    "💾"
                );

            }
        );

        bindClick(
            "exitToTitleBtn",
            () => {

                saveState();

                showScreen(
                    "startScreen"
                );

            }
        );

        bindClick(
            "restartFromEnd",
            () =>
                Game.newGame()
        );

        bindClick(
            "endToTitleBtn",
            () =>
                showScreen(
                    "startScreen"
                )
        );

        const soundToggle =
            $("sfxToggle");

        if (soundToggle) {

            soundToggle.addEventListener(
                "change",
                () => {

                    state.sound =
                        soundToggle.checked;

                    saveState();

                }
            );

        }

        const musicToggle =
            $("musicToggle");

        if (musicToggle) {

            musicToggle.addEventListener(
                "change",
                () => {

                    state.music =
                        musicToggle.checked;

                    updateMusic();

                    saveState();

                }
            );

        }

        const motionToggle =
            $("motionToggle");

        if (motionToggle) {

            motionToggle.addEventListener(
                "change",
                () => {

                    state.motion =
                        motionToggle.checked;

                    if (
                        window.Effects &&
                        typeof window.Effects.setMotion ===
                        "function"
                    ) {

                        window.Effects.setMotion(
                            state.motion
                        );

                    }

                    saveState();

                }
            );

        }

    }

    /* =====================================================
       37 — MUSIC
       ===================================================== */

    function updateMusic() {

        const music =
            $("bgMusic");

        if (!music) {
            return;
        }

        music.loop =
            true;

        music.volume =
            .18;

        if (
            state.music
        ) {

            music.play()
                .catch(
                    () => {}
                );

        } else {

            music.pause();

        }

    }

    function setupMusic() {

        const music =
            $("bgMusic");

        if (!music) {
            return;
        }

        music.loop =
            true;

        music.volume =
            .18;

        document.addEventListener(
            "pointerdown",
            () => {

                if (
                    state.music
                ) {

                    music.play()
                        .catch(
                            () => {}
                        );

                }

            },
            {
                once: true
            }
        );

    }

    /* =====================================================
       38 — CONTINUE BUTTON
       ===================================================== */

    function updateContinueButton() {

        const button =
            $("continueBtn");

        if (!button) {
            return;
        }

        const hasSave =
            !!(
                state.started &&
                state.scene
            );

        button.classList.toggle(
            "hidden",
            !hasSave
        );

    }

    /* =====================================================
       39 — LOADING
       ===================================================== */

    async function loadingSequence() {

        const progress =
            $("loadingProgress");

        const status =
            $("loadingStatus");

        const messages = [

            "جاري استدعاء الظلال...",
            "تحميل عالم القصة...",
            "فتح الذكريات...",
            "تجهيز الأسرار...",
            "تهيئة المؤثرات...",
            "اكتمل الاستدعاء..."

        ];

        for (
            let i = 0;
            i < messages.length;
            i++
        ) {

            if (status) {

                status.textContent =
                    messages[i];

            }

            if (progress) {

                progress.style.width =
                    `${Math.round(
                        ((i + 1) /
                        messages.length) *
                        100
                    )}%`;

            }

            await wait(
                180
            );

        }

        await wait(
            250
        );

        showScreen(
            "startScreen"
        );

        updateContinueButton();

    }

    /* =====================================================
       40 — REFRESH
       ===================================================== */

    function refreshUI() {

        renderHUD();

        renderPlayerProfile();

        syncSettings();

        updateContinueButton();

    }

    /* =====================================================
       41 — KEYBOARD
       ===================================================== */

    function keyboardControls(
        event
    ) {

        if (
            event.key ===
            "Escape"
        ) {

            [
                "menuOverlay",
                "inventoryOverlay",
                "achievementsOverlay",
                "journalOverlay",
                "settingsOverlay",
                "howToPlayOverlay",
                "cinematicOverlay"
            ].forEach(
                id => {

                    const element =
                        $(id);

                    if (
                        element &&
                        !element.classList
                            .contains(
                                "hidden"
                            )
                    ) {

                        closeOverlay(
                            id
                        );

                    }

                }
            );

        }

        const number =
            Number(
                event.key
            );

        if (
            number >= 1 &&
            number <= 9
        ) {

            const buttons =
                $$("#choices button");

            const button =
                buttons[
                    number - 1
                ];

            if (button) {

                button.click();

            }

        }

    }

    /* =====================================================
       42 — VISIBILITY
       ===================================================== */

    function visibilityHandler() {

        if (
            document.hidden
        ) {

            Game.pause();

        } else {

            Game.resume();

        }

    }

    /* =====================================================
       43 — PUBLIC API
       ===================================================== */

    window.SHADOWS = {

        state,

        Game,

        saveState,

        resetState,

        addXP,

        addCoins,

        spendCoins,

        setFlag,

        getFlag,

        hasItem,

        addItem,

        removeItem,

        addJournal,

        unlockAchievement,

        checkAchievements,

        playEffect,

        notify,

        cinematic,

        renderScene,

        refreshUI

    };

    /* =====================================================
       44 — BOOT
       ===================================================== */

    function boot() {

        try {

            if (
                window.Effects &&
                typeof window.Effects.init ===
                "function"
            ) {

                window.Effects.init();

            }

        } catch (error) {

            console.warn(
                "[SHADOWS] Effects init failed:",
                error
            );

        }

        bindUI();

        setupMusic();

        document.addEventListener(
            "keydown",
            keyboardControls
        );

        document.addEventListener(
            "visibilitychange",
            visibilityHandler
        );

        window.addEventListener(
            "beforeunload",
            saveState
        );

        refreshUI();

        loadingSequence();

        console.log(
            "🌑 SHADOWS OF THE UNKNOWN — ULTRA V8 READY"
        );

    }

    /* =====================================================
       45 — START
       ===================================================== */

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