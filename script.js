/* =========================================================
   ظلال المجهول
   SCRIPT.JS — STORY ENGINE ULTRA
   Compatible with data.js
   ========================================================= */

"use strict";


/* =========================================================
   SAVE
========================================================= */

const SAVE_KEY = "shadows_unknown_v4";


/* =========================================================
   DEFAULT STATE
========================================================= */

const DEFAULT_STATE = {

    chapter: 1,
    scene: "c1_start",

    health: 100,
    coins: 25,

    courage: 0,
    curiosity: 0,
    morality: 0,

    inventory: [],
    achievements: [],

    decisions: [],

    flags: {},

    relationships: {
        lian: 0,
        youssef: 0,
        stranger: 0
    },

    evidence: 0,
    memories: 0,
    secrets: 0,

    endingsSeen: [],

    started: false,
    muted: false,

    completed: false,

    startedAt: null,
    lastPlayed: null
};


/* =========================================================
   CURRENT STATE
========================================================= */

let state = clone(DEFAULT_STATE);


/* =========================================================
   DOM SHORTCUT
========================================================= */

const $ = id => document.getElementById(id);


/* =========================================================
   CLONE
========================================================= */

function clone(object) {

    return JSON.parse(
        JSON.stringify(object)
    );

}


/* =========================================================
   NUMBER HELPERS
========================================================= */

function clamp(value, min, max) {

    return Math.max(
        min,
        Math.min(max, value)
    );

}


/* =========================================================
   GAME SETTINGS
========================================================= */

function getMaxHealth() {

    return Number(
        GAME_DATA?.game?.maxHealth || 100
    );

}


function getStartingHealth() {

    return Number(
        GAME_DATA?.game?.startingHealth || 100
    );

}


function getStartingCoins() {

    return Number(
        GAME_DATA?.game?.startingCoins || 25
    );

}


/* =========================================================
   CHAPTER FINDER
========================================================= */

function getChapter(chapterId = state.chapter) {

    if (!GAME_DATA || !Array.isArray(GAME_DATA.chapters)) {
        return null;
    }

    return GAME_DATA.chapters.find(
        chapter =>
            Number(chapter.id) === Number(chapterId)
    ) || null;

}


/* =========================================================
   SCENE FINDER
========================================================= */

function getScene(
    chapterId = state.chapter,
    sceneId = state.scene
) {

    const chapter = getChapter(chapterId);

    if (!chapter || !Array.isArray(chapter.scenes)) {
        return null;
    }

    return chapter.scenes.find(
        scene =>
            scene.id === sceneId
    ) || null;

}


/* =========================================================
   GLOBAL SCENE FINDER
   يسمح بالانتقال بين الفصول باستخدام next
========================================================= */

function findSceneEverywhere(sceneId) {

    if (!GAME_DATA?.chapters) {
        return null;
    }

    for (const chapter of GAME_DATA.chapters) {

        if (!Array.isArray(chapter.scenes)) {
            continue;
        }

        const scene =
            chapter.scenes.find(
                item => item.id === sceneId
            );

        if (scene) {

            return {
                chapter,
                scene
            };

        }

    }

    return null;

}


/* =========================================================
   ITEM FINDER
========================================================= */

function getItem(itemId) {

    if (!GAME_DATA?.items) {
        return null;
    }

    return GAME_DATA.items[itemId] || null;

}


/* =========================================================
   ACHIEVEMENT FINDER
========================================================= */

function getAchievement(id) {

    if (!Array.isArray(GAME_DATA?.achievements)) {
        return null;
    }

    return GAME_DATA.achievements.find(
        achievement =>
            achievement.id === id
    ) || null;

}


/* =========================================================
   ENDING FINDER
========================================================= */

function getEnding(id) {

    if (!GAME_DATA?.endings) {
        return null;
    }

    return GAME_DATA.endings[id] || null;

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        normalizeState();

        setupEvents();

        loadGame();

        updateContinueButton();

    }
);


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {

    $("newGameBtn")?.addEventListener(
        "click",
        startNewGame
    );


    $("continueBtn")?.addEventListener(
        "click",
        continueGame
    );


    $("menuBtn")?.addEventListener(
        "click",
        () => showOverlay("menuOverlay")
    );


    $("closeMenu")?.addEventListener(
        "click",
        () => hideOverlay("menuOverlay")
    );


    $("saveBtn")?.addEventListener(
        "click",
        () => {

            saveGame();

            hideOverlay("menuOverlay");

            toast(
                "تم حفظ اللعبة ✓"
            );

        }
    );


    $("restartBtn")?.addEventListener(
        "click",
        restartGame
    );


    $("backHomeBtn")?.addEventListener(
        "click",
        goHome
    );


    $("inventoryBtn")?.addEventListener(
        "click",
        () => {

            renderInventory();

            showOverlay(
                "inventoryOverlay"
            );

        }
    );


    $("achievementsBtn")?.addEventListener(
        "click",
        () => {

            renderAchievements();

            showOverlay(
                "achievementsOverlay"
            );

        }
    );


    $("restartFromEnd")?.addEventListener(
        "click",
        startNewGame
    );


    document
        .querySelectorAll("[data-close]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        button.dataset.close;

                    hideOverlay(target);

                }
            );

        });


    document
        .querySelectorAll(".overlay")
        .forEach(overlay => {

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target === overlay
                    ) {

                        hideOverlay(
                            overlay.id
                        );

                    }

                }
            );

        });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                document
                    .querySelectorAll(".overlay.show")
                    .forEach(overlay => {

                        hideOverlay(
                            overlay.id
                        );

                    });

            }

        }
    );

}


/* =========================================================
   NEW GAME
========================================================= */

function startNewGame() {

    state = clone(DEFAULT_STATE);

    state.health =
        getStartingHealth();

    state.coins =
        getStartingCoins();

    state.started = true;

    state.startedAt =
        Date.now();

    state.lastPlayed =
        Date.now();

    state.chapter = 1;

    state.scene = "c1_start";

    saveGame();

    showScreen("gameScreen");

    renderScene();

}


/* =========================================================
   CONTINUE
========================================================= */

function continueGame() {

    const loaded =
        loadGame();

    if (!loaded) {

        startNewGame();

        return;

    }

    state.started = true;

    state.lastPlayed =
        Date.now();

    saveGame();

    showScreen("gameScreen");

    renderScene();

}


/* =========================================================
   SCREEN CONTROL
========================================================= */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active"
            );

        });


    const screen = $(id);

    if (screen) {

        screen.classList.add(
            "active"
        );

    }

}


/* =========================================================
   OVERLAY
========================================================= */

function showOverlay(id) {

    const overlay = $(id);

    if (!overlay) return;

    overlay.classList.add("show");

}


function hideOverlay(id) {

    const overlay = $(id);

    if (!overlay) return;

    overlay.classList.remove("show");

}


/* =========================================================
   RENDER SCENE
========================================================= */

function renderScene() {

    normalizeState();


    const result =
        getSceneWithRecovery();


    if (!result) {

        console.error(
            "Unable to find scene:",
            state
        );

        return;

    }


    const chapter =
        result.chapter;

    const scene =
        result.scene;


    /* -----------------------------------------
       CHAPTER
    ----------------------------------------- */

    if ($("chapterLabel")) {

        $("chapterLabel").textContent =
            chapter.title ||
            chapter.name ||
            `الفصل ${chapter.id}`;

    }


    if ($("chapter")) {

        $("chapter").textContent =
            chapter.id;

    }


    /* -----------------------------------------
       TITLE
    ----------------------------------------- */

    if ($("sceneTitle")) {

        $("sceneTitle").textContent =
            scene.title || "";

    }


    /* -----------------------------------------
       TEXT
    ----------------------------------------- */

    if ($("storyText")) {

        $("storyText").textContent =
            scene.text || "";

    }


    updateStats();

    updateProgress();

    renderChoices();

    animateStory();

    checkAutomaticAchievements();

    checkSecrets();

    saveGame();

}


/* =========================================================
   SCENE RECOVERY
========================================================= */

function getSceneWithRecovery() {

    let chapter =
        getChapter();

    let scene =
        getScene();


    if (chapter && scene) {

        return {
            chapter,
            scene
        };

    }


    /* البحث في كل الفصول */

    const found =
        findSceneEverywhere(
            state.scene
        );


    if (found) {

        state.chapter =
            Number(found.chapter.id);

        return found;

    }


    return null;

}


/* =========================================================
   RENDER CHOICES
========================================================= */

function renderChoices() {

    const container =
        $("choices");

    if (!container) return;

    container.innerHTML = "";


    const result =
        getSceneWithRecovery();


    if (!result) return;


    const scene =
        result.scene;


    if (
        !Array.isArray(
            scene.choices
        ) ||
        scene.choices.length === 0
    ) {

        return;

    }


    scene.choices.forEach(
        (choice, index) => {

            if (
                !checkConditions(
                    choice.conditions
                )
            ) {

                return;

            }


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "story-choice";


            button.innerHTML = `

                <span class="choice-number">
                    ${index + 1}
                </span>

                <span class="choice-text">
                    ${escapeHTML(
                        choice.text || ""
                    )}
                </span>

            `;


            button.addEventListener(
                "click",
                () => choose(choice)
            );


            container.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   CONDITIONS
========================================================= */

function checkConditions(
    conditions
) {

    if (!conditions) {
        return true;
    }


    /* عنصر مطلوب */

    if (conditions.item) {

        if (
            !hasItem(
                conditions.item
            )
        ) {

            return false;

        }

    }


    /* Flag مطلوب */

    if (conditions.flag) {

        if (
            !state.flags[
                conditions.flag
            ]
        ) {

            return false;

        }

    }


    /* Flag يجب ألا يكون موجودًا */

    if (conditions.notFlag) {

        if (
            state.flags[
                conditions.notFlag
            ]
        ) {

            return false;

        }

    }


    /* صحة */

    if (
        typeof conditions.minHealth ===
        "number"
    ) {

        if (
            state.health <
            conditions.minHealth
        ) {

            return false;

        }

    }


    /* عملات */

    if (
        typeof conditions.minCoins ===
        "number"
    ) {

        if (
            state.coins <
            conditions.minCoins
        ) {

            return false;

        }

    }


    /* مستوى الفضول */

    if (
        typeof conditions.minCuriosity ===
        "number"
    ) {

        if (
            state.curiosity <
            conditions.minCuriosity
        ) {

            return false;

        }

    }


    /* مستوى الشجاعة */

    if (
        typeof conditions.minCourage ===
        "number"
    ) {

        if (
            state.courage <
            conditions.minCourage
        ) {

            return false;

        }

    }


    return true;

}


/* =========================================================
   CHOOSE
========================================================= */

function choose(choice) {

    if (!choice) return;


    /* منع الضغط المكرر */

    if (
        document.body.dataset.choiceLocked ===
        "true"
    ) {

        return;

    }


    document.body.dataset.choiceLocked =
        "true";


    setTimeout(() => {

        document.body.dataset.choiceLocked =
            "false";

    }, 350);


    /* تسجيل القرار */

    state.decisions.push({

        chapter:
            state.chapter,

        scene:
            state.scene,

        choice:
            choice.text || "",

        timestamp:
            Date.now()

    });


    /* تطبيق التأثيرات */

    applyEffects(
        choice.effects || {}
    );


    /* خسارة الصحة */

    if (state.health <= 0) {

        state.health = 0;

        saveGame();

        gameOver();

        return;

    }


    /* لا يوجد انتقال */

    if (!choice.next) {

        saveGame();

        renderScene();

        return;

    }


    /* -----------------------------------------
       ENDING
    ----------------------------------------- */

    if (
        typeof choice.next ===
        "string" &&
        choice.next.startsWith(
            "ending_"
        )
    ) {

        showEnding(
            choice.next
        );

        return;

    }


    /* -----------------------------------------
       الانتقال إلى مشهد
    ----------------------------------------- */

    const target =
        findSceneEverywhere(
            choice.next
        );


    if (!target) {

        console.error(
            "Target scene not found:",
            choice.next
        );

        toast(
            "حدث خطأ في انتقال القصة."
        );

        return;

    }


    const oldChapter =
        state.chapter;


    state.chapter =
        Number(target.chapter.id);


    state.scene =
        target.scene.id;


    state.lastPlayed =
        Date.now();


    /* تغيير الفصل */

    if (
        Number(oldChapter) !==
        Number(state.chapter)
    ) {

        onChapterChanged(
            oldChapter,
            state.chapter
        );

    }


    saveGame();

    renderScene();

}


/* =========================================================
   EFFECTS ENGINE
========================================================= */

function applyEffects(
    effects = {}
) {

    if (!effects) return;


    /* -----------------------------------------
       HEALTH
    ----------------------------------------- */

    if (
        typeof effects.health ===
        "number"
    ) {

        state.health =
            clamp(
                state.health +
                effects.health,
                0,
                getMaxHealth()
            );

    }


    /* -----------------------------------------
       COINS
    ----------------------------------------- */

    if (
        typeof effects.coins ===
        "number"
    ) {

        state.coins =
            Math.max(
                0,
                state.coins +
                effects.coins
            );

    }


    /* -----------------------------------------
       COURAGE
    ----------------------------------------- */

    if (
        typeof effects.courage ===
        "number"
    ) {

        state.courage +=
            effects.courage;

    }


    /* -----------------------------------------
       CURIOSITY
    ----------------------------------------- */

    if (
        typeof effects.curiosity ===
        "number"
    ) {

        state.curiosity +=
            effects.curiosity;

    }


    /* -----------------------------------------
       MORALITY
    ----------------------------------------- */

    if (
        typeof effects.morality ===
        "number"
    ) {

        state.morality +=
            effects.morality;

    }


    /* -----------------------------------------
       ITEM
    ----------------------------------------- */

    if (effects.item) {

        addItem(
            effects.item
        );

    }


    /* دعم addItem الموجود في data.js
    ----------------------------------------- */

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


    if (effects.addItem3) {

        addItem(
            effects.addItem3
        );

    }


    /* -----------------------------------------
       REMOVE ITEM
    ----------------------------------------- */

    if (effects.removeItem) {

        removeItem(
            effects.removeItem
        );

    }


    /* -----------------------------------------
       FLAG
    ----------------------------------------- */

    if (effects.flag) {

        setFlag(
            effects.flag,
            true
        );

    }


    if (effects.flag2) {

        setFlag(
            effects.flag2,
            true
        );

    }


    if (effects.flag3) {

        setFlag(
            effects.flag3,
            true
        );

    }


    /* -----------------------------------------
       SET FLAG
    ----------------------------------------- */

    if (
        effects.setFlag &&
        typeof effects.setFlag ===
        "object"
    ) {

        Object.entries(
            effects.setFlag
        ).forEach(
            ([key, value]) => {

                state.flags[key] =
                    value;

            }
        );

    }


    /* -----------------------------------------
       ACHIEVEMENT
    ----------------------------------------- */

    if (effects.achievement) {

        unlockAchievement(
            effects.achievement
        );

    }


    /* -----------------------------------------
       RELATIONSHIP
    ----------------------------------------- */

    if (
        effects.relationship &&
        typeof effects.relationship ===
        "object"
    ) {

        Object.entries(
            effects.relationship
        ).forEach(
            ([person, amount]) => {

                if (
                    typeof amount !==
                    "number"
                ) {

                    return;

                }


                if (
                    typeof state.relationships[
                        person
                    ] !== "number"
                ) {

                    state.relationships[
                        person
                    ] = 0;

                }


                state.relationships[
                    person
                ] += amount;

            }
        );

    }


    /* -----------------------------------------
       EVIDENCE
    ----------------------------------------- */

    if (
        typeof effects.evidence ===
        "number"
    ) {

        state.evidence =
            Math.max(
                0,
                state.evidence +
                effects.evidence
            );

    }


    /* -----------------------------------------
       MEMORIES
    ----------------------------------------- */

    if (
        typeof effects.memory ===
        "number"
    ) {

        state.memories =
            Math.max(
                0,
                state.memories +
                effects.memory
            );

    }


    updateStats();

}


/* =========================================================
   FLAGS
========================================================= */

function setFlag(
    flag,
    value = true
) {

    if (!flag) return;

    state.flags[flag] =
        value;

}


/* =========================================================
   ITEM MANAGEMENT
========================================================= */

function addItem(itemId) {

    if (!itemId) return;


    if (
        !Array.isArray(
            state.inventory
        )
    ) {

        state.inventory = [];

    }


    if (
        state.inventory.includes(
            itemId
        )
    ) {

        return;

    }


    state.inventory.push(
        itemId
    );


    const item =
        getItem(itemId);


    if (item) {

        toast(
            `حصلت على: ${item.name}`
        );

    }

}


function removeItem(itemId) {

    if (
        !Array.isArray(
            state.inventory
        )
    ) {

        return;

    }


    state.inventory =
        state.inventory.filter(
            id => id !== itemId
        );

}


function hasItem(itemId) {

    return Array.isArray(
        state.inventory
    ) &&
    state.inventory.includes(
        itemId
    );

}


/* =========================================================
   INVENTORY
========================================================= */

function renderInventory() {

    const container =
        $("inventoryList");

    if (!container) return;

    container.innerHTML = "";


    if (
        !Array.isArray(
            state.inventory
        ) ||
        state.inventory.length === 0
    ) {

        container.innerHTML = `

            <div class="inventory-empty">

                <div style="font-size:38px;">
                    🎒
                </div>

                <p>
                    الحقيبة فارغة حاليًا.
                </p>

            </div>

        `;

        return;

    }


    state.inventory.forEach(
        itemId => {

            const item =
                getItem(itemId);


            if (!item) return;


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "inventory-item";


            element.innerHTML = `

                <div class="inventory-icon">
                    ${item.icon || "◆"}
                </div>

                <div>

                    <strong>
                        ${escapeHTML(
                            item.name
                        )}
                    </strong>

                    <div>
                        ${escapeHTML(
                            item.description ||
                            ""
                        )}
                    </div>

                </div>

            `;


            container.appendChild(
                element
            );

        }
    );

}


/* =========================================================
   ACHIEVEMENTS
========================================================= */

function unlockAchievement(id) {

    if (!id) return;


    if (
        !Array.isArray(
            state.achievements
        )
    ) {

        state.achievements = [];

    }


    if (
        state.achievements.includes(
            id
        )
    ) {

        return;

    }


    const achievement =
        getAchievement(id);


    if (!achievement) {

        return;

    }


    state.achievements.push(
        id
    );


    showAchievementNotification(
        achievement
    );


    saveGame();

}


function showAchievementNotification(
    achievement
) {

    document
        .querySelectorAll(
            ".achievement-notification"
        )
        .forEach(
            element =>
                element.remove()
        );


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "achievement-notification";


    notification.innerHTML = `

        <div class="notification-icon">

            ${achievement.icon || "🏆"}

        </div>

        <div>

            <small>
                إنجاز جديد
            </small>

            <strong>
                ${escapeHTML(
                    achievement.title
                )}
            </strong>

        </div>

    `;


    document.body.appendChild(
        notification
    );


    setTimeout(
        () => {

            notification.classList.add(
                "hide"
            );


            setTimeout(
                () => {

                    notification.remove();

                },
                450
            );

        },
        2800
    );

}


/* =========================================================
   ACHIEVEMENT RENDER
========================================================= */

function renderAchievements() {

    const container =
        $("achievementsList");

    if (!container) return;

    container.innerHTML = "";


    if (
        !Array.isArray(
            GAME_DATA.achievements
        )
    ) {

        return;

    }


    GAME_DATA.achievements.forEach(
        achievement => {

            const unlocked =
                state.achievements.includes(
                    achievement.id
                );


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                unlocked
                    ? "achievement"
                    : "achievement locked";


            element.innerHTML = `

                <div class="achievement-icon">

                    ${
                        unlocked
                            ? achievement.icon || "🏆"
                            : "?"
                    }

                </div>

                <div>

                    <strong>

                        ${
                            unlocked
                                ? escapeHTML(
                                    achievement.title
                                )
                                : "إنجاز مخفي"
                        }

                    </strong>

                    <div>

                        ${
                            unlocked
                                ? escapeHTML(
                                    achievement.description
                                )
                                : "واصل اللعب لاكتشافه."
                        }

                    </div>

                </div>

            `;


            container.appendChild(
                element
            );

        }
    );

}


/* =========================================================
   AUTOMATIC ACHIEVEMENTS
========================================================= */

function checkAutomaticAchievements() {

    if (
        state.chapter >= 1
    ) {

        unlockAchievement(
            "first_step"
        );

    }


    if (
        state.evidence >= 1 ||
        state.inventory.length >= 1
    ) {

        unlockAchievement(
            "detective"
        );

    }


    if (
        hasItem("photograph")
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
        state.flags.discoveredFile ||
        state.flags.knowsAboutExperiment
    ) {

        unlockAchievement(
            "truth_seeker"
        );

    }


    if (
        state.flags.trustedLian ||
        state.flags.trustedYoussef ||
        state.flags.trustedStranger
    ) {

        unlockAchievement(
            "trust"
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
        state.inventory.length >= 5
    ) {

        unlockAchievement(
            "collector"
        );

    }

}


/* =========================================================
   SECRETS
========================================================= */

function checkSecrets() {

    if (
        !Array.isArray(
            GAME_DATA.secrets
        )
    ) {

        return;

    }


    GAME_DATA.secrets.forEach(
        secret => {

            if (
                state.flags[
                    `secret_${secret.id}`
                ]
            ) {

                return;

            }


            if (
                !checkSecretRequirement(
                    secret.requirement
                )
            ) {

                return;

            }


            revealSecret(
                secret
            );

        }
    );

}


/* =========================================================
   SECRET REQUIREMENTS
========================================================= */

function checkSecretRequirement(
    requirement
) {

    if (!requirement) {
        return false;
    }


    if (requirement.item) {

        return hasItem(
            requirement.item
        );

    }


    if (requirement.flag) {

        return !!state.flags[
            requirement.flag
        ];

    }


    return false;

}


/* =========================================================
   REVEAL SECRET
========================================================= */

function revealSecret(secret) {

    if (!secret) return;


    state.flags[
        `secret_${secret.id}`
    ] = true;


    state.secrets += 1;


    if (
        secret.id ===
        "secret_17"
    ) {

        state.flags.openedSecretRoom =
            true;

    }


    unlockAchievement(
        "secret_room"
    );


    saveGame();


    showSecretNotification(
        secret
    );

}


/* =========================================================
   SECRET NOTIFICATION
========================================================= */

function showSecretNotification(
    secret
) {

    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "achievement-notification";


    notification.innerHTML = `

        <div class="notification-icon">
            🔐
        </div>

        <div>

            <small>
                سر مكتشف
            </small>

            <strong>
                ${escapeHTML(
                    secret.title
                )}
            </strong>

        </div>

    `;


    document.body.appendChild(
        notification
    );


    setTimeout(
        () => {

            notification.classList.add(
                "hide"
            );

            setTimeout(
                () => notification.remove(),
                450
            );

        },
        3000
    );

}


/* =========================================================
   STATS
========================================================= */

function updateStats() {

    if ($("health")) {

        $("health").textContent =
            Math.round(
                state.health
            );

    }


    if ($("coins")) {

        $("coins").textContent =
            Math.round(
                state.coins
            );

    }


    if ($("chapter")) {

        $("chapter").textContent =
            state.chapter;

    }

}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {

    const chapter =
        getChapter();


    const bar =
        $("progressBar");


    if (!chapter || !bar) {
        return;
    }


    const scenes =
        Array.isArray(
            chapter.scenes
        )
            ? chapter.scenes
            : [];


    if (
        scenes.length <= 1
    ) {

        bar.style.width =
            "100%";

        return;

    }


    const index =
        scenes.findIndex(
            scene =>
                scene.id ===
                state.scene
        );


    const safeIndex =
        index < 0
            ? 0
            : index;


    const progress =
        (
            (safeIndex + 1) /
            scenes.length
        ) * 100;


    bar.style.width =
        `${clamp(
            progress,
            0,
            100
        )}%`;

}


/* =========================================================
   CHAPTER CHANGE
========================================================= */

function onChapterChanged(
    oldChapter,
    newChapter
) {

    toast(
        `الفصل ${newChapter}`
    );


    /* -----------------------------------------
       مكافأة بسيطة
    ----------------------------------------- */

    if (
        Number(newChapter) >
        Number(oldChapter)
    ) {

        state.coins += 10;

    }


    /* -----------------------------------------
       حفظ
    ----------------------------------------- */

    saveGame();

}


/* =========================================================
   RANDOM EVENTS
========================================================= */

function triggerRandomEvent() {

    if (
        !GAME_DATA?.randomEvents
    ) {

        return;

    }


    if (
        !Array.isArray(
            GAME_DATA.randomEvents
        )
    ) {

        return;

    }


    const roll =
        Math.random() * 100;


    let accumulated =
        0;


    for (
        const event
        of GAME_DATA.randomEvents
    ) {

        accumulated +=
            Number(event.chance || 0);


        if (
            roll <= accumulated
        ) {

            showRandomEvent(
                event
            );

            return;

        }

    }

}


/* =========================================================
   RANDOM EVENT DISPLAY
========================================================= */

function showRandomEvent(event) {

    if (!event) return;


    const box =
        document.createElement(
            "div"
        );


    box.className =
        "achievement-notification";


    box.innerHTML = `

        <div class="notification-icon">
            ◈
        </div>

        <div>

            <small>
                حدث غامض
            </small>

            <strong>
                ${escapeHTML(
                    event.text
                )}
            </strong>

        </div>

    `;


    document.body.appendChild(
        box
    );


    setTimeout(
        () => {

            box.classList.add(
                "hide"
            );

            setTimeout(
                () => box.remove(),
                450
            );

        },
        4000
    );

}


/* =========================================================
   STORY ANIMATION
========================================================= */

function animateStory() {

    const title =
        $("sceneTitle");


    const text =
        $("storyText");


    if (title) {

        title.classList.remove(
            "fade"
        );

        void title.offsetWidth;

        title.classList.add(
            "fade"
        );

    }


    if (text) {

        text.classList.remove(
            "fade"
        );

        void text.offsetWidth;

        text.classList.add(
            "fade"
        );

    }


    const choices =
        $("choices");


    if (choices) {

        choices.classList.remove(
            "fade"
        );

        void choices.offsetWidth;

        choices.classList.add(
            "fade"
        );

    }

}


/* =========================================================
   ENDINGS
========================================================= */

function showEnding(
    endingId
) {

    const ending =
        getEnding(
            endingId
        );


    if (!ending) {

        console.error(
            "Ending not found:",
            endingId
        );

        return;

    }


    /* تسجيل النهاية */

    if (
        !Array.isArray(
            state.endingsSeen
        )
    ) {

        state.endingsSeen = [];

    }


    if (
        !state.endingsSeen.includes(
            endingId
        )
    ) {

        state.endingsSeen.push(
            endingId
        );

    }


    state.completed = true;


    /* إنجاز النهاية */

    if (
        ending.achievement
    ) {

        unlockAchievement(
            ending.achievement
        );

    }


    if (
        endingId ===
        "ending_true"
    ) {

        unlockAchievement(
            "true_ending"
        );

    }


    state.lastPlayed =
        Date.now();


    saveGame();


    /* -----------------------------------------
       END SCREEN
    ----------------------------------------- */

    if ($("endIcon")) {

        $("endIcon").textContent =
            ending.icon ||
            "✦";

    }


    if ($("endTitle")) {

        $("endTitle").textContent =
            ending.title ||
            "النهاية";

    }


    if ($("endText")) {

        $("endText").textContent =
            ending.text ||
            "";

    }


    updateFinalStats();


    showScreen(
        "endScreen"
    );

}


/* =========================================================
   FINAL STATS
========================================================= */

function updateFinalStats() {

    if ($("finalChapter")) {

        $("finalChapter").textContent =
            state.chapter;

    }


    if ($("finalCoins")) {

        $("finalCoins").textContent =
            state.coins;

    }


    if ($("finalAchievements")) {

        $("finalAchievements").textContent =
            state.achievements.length;

    }

}


/* =========================================================
   GAME OVER
========================================================= */

function gameOver() {

    const container =
        $("choices");


    if (container) {

        container.innerHTML = `

            <button
                class="story-choice"
                onclick="restartAfterGameOver()"
            >

                <span class="choice-number">
                    ↻
                </span>

                <span class="choice-text">
                    حاول مرة أخرى
                </span>

            </button>

        `;

    }


    if ($("sceneTitle")) {

        $("sceneTitle").textContent =
            "انتهت الرحلة";

    }


    if ($("storyText")) {

        $("storyText").textContent =
            "لقد استنفدت قدرتك على الاستمرار... لكن القصة لم تنتهِ.";

    }

}


function restartAfterGameOver() {

    startNewGame();

}


/* =========================================================
   SAVE GAME
========================================================= */

function saveGame() {

    try {

        state.lastPlayed =
            Date.now();


        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(state)
        );


        updateContinueButton();


        return true;

    } catch (error) {

        console.error(
            "Save failed:",
            error
        );

        return false;

    }

}


/* =========================================================
   LOAD GAME
========================================================= */

function loadGame() {

    try {

        const saved =
            localStorage.getItem(
                SAVE_KEY
            );


        if (!saved) {

            return false;

        }


        const parsed =
            JSON.parse(saved);


        if (
            !parsed ||
            typeof parsed !== "object"
        ) {

            return false;

        }


        state = mergeState(
            DEFAULT_STATE,
            parsed
        );


        normalizeState();


        return true;

    } catch (error) {

        console.error(
            "Load failed:",
            error
        );

        return false;

    }

}


/* =========================================================
   MERGE STATE
========================================================= */

function mergeState(
    defaults,
    saved
) {

    const result = {
        ...clone(defaults),
        ...saved
    };


    result.relationships = {

        ...clone(
            defaults.relationships
        ),

        ...(saved.relationships || {})

    };


    result.flags = {

        ...(saved.flags || {})

    };


    result.inventory =
        Array.isArray(
            saved.inventory
        )
            ? saved.inventory
            : [];


    result.achievements =
        Array.isArray(
            saved.achievements
        )
            ? saved.achievements
            : [];


    result.decisions =
        Array.isArray(
            saved.decisions
        )
            ? saved.decisions
            : [];


    result.endingsSeen =
        Array.isArray(
            saved.endingsSeen
        )
            ? saved.endingsSeen
            : [];


    return result;

}


/* =========================================================
   NORMALIZE STATE
========================================================= */

function normalizeState() {

    if (
        typeof state.health !==
        "number"
    ) {

        state.health =
            getStartingHealth();

    }


    state.health =
        clamp(
            state.health,
            0,
            getMaxHealth()
        );


    if (
        typeof state.coins !==
        "number"
    ) {

        state.coins =
            getStartingCoins();

    }


    state.coins =
        Math.max(
            0,
            state.coins
        );


    if (
        !Number.isFinite(
            Number(state.chapter)
        )
    ) {

        state.chapter = 1;

    }


    state.chapter =
        Number(state.chapter);


    if (!state.scene) {

        state.scene =
            "c1_start";

    }


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
        !Array.isArray(
            state.decisions
        )
    ) {

        state.decisions = [];

    }


    if (
        !state.flags ||
        typeof state.flags !==
        "object"
    ) {

        state.flags = {};

    }


    if (
        !state.relationships ||
        typeof state.relationships !==
        "object"
    ) {

        state.relationships = {

            lian: 0,
            youssef: 0,
            stranger: 0

        };

    }


    if (
        !Array.isArray(
            state.endingsSeen
        )
    ) {

        state.endingsSeen = [];

    }


    if (
        typeof state.evidence !==
        "number"
    ) {

        state.evidence = 0;

    }


    if (
        typeof state.memories !==
        "number"
    ) {

        state.memories = 0;

    }


    if (
        typeof state.secrets !==
        "number"
    ) {

        state.secrets = 0;

    }

}


/* =========================================================
   HAS SAVE
========================================================= */

function hasSave() {

    try {

        return !!localStorage.getItem(
            SAVE_KEY
        );

    } catch {

        return false;

    }

}


/* =========================================================
   CLEAR SAVE
========================================================= */

function clearSave() {

    try {

        localStorage.removeItem(
            SAVE_KEY
        );

    } catch (error) {

        console.error(
            "Clear save failed:",
            error
        );

    }


    updateContinueButton();

}


/* =========================================================
   CONTINUE BUTTON
========================================================= */

function updateContinueButton() {

    const button =
        $("continueBtn");


    if (!button) return;


    button.style.display =
        hasSave()
            ? "block"
            : "none";

}


/* =========================================================
   RESTART
========================================================= */

function restartGame() {

    hideOverlay(
        "menuOverlay"
    );


    clearSave();


    startNewGame();

}


/* =========================================================
   HOME
========================================================= */

function goHome() {

    hideOverlay(
        "menuOverlay"
    );


    saveGame();


    showScreen(
        "startScreen"
    );


    updateContinueButton();

}


/* =========================================================
   TOAST
========================================================= */

function toast(message) {

    if (!message) return;


    const old =
        document.querySelector(
            ".game-toast"
        );


    if (old) {

        old.remove();

    }


    const element =
        document.createElement(
            "div"
        );


    element.className =
        "game-toast";


    element.textContent =
        message;


    document.body.appendChild(
        element
    );


    setTimeout(
        () => {

            element.classList.add(
                "hide"
            );


            setTimeout(
                () => {

                    element.remove();

                },
                350
            );

        },
        1800
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
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

}


/* =========================================================
   DEBUG API
   مفيد أثناء تطوير اللعبة
========================================================= */

window.ShadowsGame = {

    getState() {

        return state;

    },


    save() {

        return saveGame();

    },


    load() {

        return loadGame();

    },


    reset() {

        clearSave();

        startNewGame();

    },


    addItem(item) {

        addItem(item);

        saveGame();

    },


    unlock(id) {

        unlockAchievement(id);

        saveGame();

    },


    setFlag(flag, value = true) {

        state.flags[flag] =
            value;

        saveGame();

    },


    go(chapter, scene) {

        state.chapter =
            Number(chapter);

        state.scene =
            scene;

        saveGame();

        showScreen(
            "gameScreen"
        );

        renderScene();

    }

};


/* =========================================================
   STARTUP LOG
========================================================= */

console.log(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
);

console.log(
    "ظلال المجهول — Story Engine"
);

console.log(
    "✓ Data loaded"
);

console.log(
    `✓ Chapters: ${
        GAME_DATA?.chapters?.length || 0
    }`
);

console.log(
    `✓ Achievements: ${
        GAME_DATA?.achievements?.length || 0
    }`
);

console.log(
    `✓ Items: ${
        GAME_DATA?.items
            ? Object.keys(
                GAME_DATA.items
            ).length
            : 0
    }`
);

console.log(
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
);