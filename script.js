const SAVE_KEY = "shadows_unknown_v3";

let state = {
    chapter: 1,
    scene: "start",

    health: 100,
    coins: 25,

    courage: 0,
    curiosity: 0,
    morality: 0,

    inventory: [],
    achievements: [],

    started: false,
    muted: false
};


/* =========================================
   HELPERS
========================================= */

const $ = (id) => document.getElementById(id);

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function getChapter() {
    return GAME_DATA.chapters[state.chapter];
}

function getScene() {
    const chapter = getChapter();

    if (!chapter || !chapter.scenes) {
        return null;
    }

    return chapter.scenes[state.scene];
}


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    setupEvents();

    loadGame();

    updateContinueButton();

});


/* =========================================
   EVENTS
========================================= */

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
            showOverlay("inventoryOverlay");
        }
    );

    $("achievementsBtn")?.addEventListener(
        "click",
        () => {
            renderAchievements();
            showOverlay("achievementsOverlay");
        }
    );

    $("restartFromEnd")?.addEventListener(
        "click",
        startNewGame
    );


    document
        .querySelectorAll("[data-close]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const target =
                    button.dataset.close;

                hideOverlay(target);

            });

        });


    document
        .querySelectorAll(".overlay")
        .forEach(overlay => {

            overlay.addEventListener("click", event => {

                if (event.target === overlay) {
                    hideOverlay(overlay.id);
                }

            });

        });

}


/* =========================================
   GAME START
========================================= */

function startNewGame() {

    state = {
        chapter: 1,
        scene: "start",

        health:
            GAME_DATA.settings.startingHealth,

        coins:
            GAME_DATA.settings.startingCoins,

        courage: 0,
        curiosity: 0,
        morality: 0,

        inventory: [],
        achievements: [],

        started: true,
        muted: false
    };

    saveGame();

    showScreen("gameScreen");

    renderScene();
}


function continueGame() {

    if (!loadGame()) {
        startNewGame();
        return;
    }

    state.started = true;

    showScreen("gameScreen");

    renderScene();
}


/* =========================================
   SCREEN CONTROL
========================================= */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });

    const screen = $(id);

    if (screen) {
        screen.classList.add("active");
    }

}


function showOverlay(id) {

    const overlay = $(id);

    if (overlay) {
        overlay.classList.add("show");
    }

}


function hideOverlay(id) {

    const overlay = $(id);

    if (overlay) {
        overlay.classList.remove("show");
    }

}


/* =========================================
   RENDER SCENE
========================================= */

function renderScene() {

    const chapter = getChapter();
    const scene = getScene();

    if (!chapter || !scene) {
        console.error("Scene not found:", state);
        return;
    }


    const chapterName =
        chapter.name || `الفصل ${state.chapter}`;


    $("chapterLabel").textContent =
        chapterName;


    if ($("chapter")) {
        $("chapter").textContent =
            state.chapter;
    }


    $("sceneTitle").textContent =
        scene.title || "";


    $("storyText").textContent =
        scene.text || "";


    updateStats();

    updateProgress();

    renderChoices();

    animateStory();

}


/* =========================================
   CHOICES
========================================= */

function renderChoices() {

    const container = $("choices");

    if (!container) return;

    container.innerHTML = "";

    const scene = getScene();

    if (!scene) return;


    if (!scene.choices || scene.choices.length === 0) {

        if (scene.ending) {
            finishChapter(scene);
        }

        return;
    }


    scene.choices.forEach((choice, index) => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.innerHTML = `
            <span class="choice-number">
                ${index + 1}
            </span>
            ${escapeHTML(choice.text)}
        `;


        button.addEventListener(
            "click",
            () => choose(choice)
        );


        container.appendChild(button);

    });

}


/* =========================================
   CHOOSE
========================================= */

function choose(choice) {

    if (!choice) return;


    applyEffects(choice.effects || {});


    if (state.health <= 0) {

        state.health = 0;

        saveGame();

        gameOver();

        return;
    }


    if (!choice.next) {

        saveGame();

        renderScene();

        return;
    }


    state.scene = choice.next;

    saveGame();

    renderScene();

}


/* =========================================
   EFFECTS
========================================= */

function applyEffects(effects) {

    if (!effects) return;


    if (typeof effects.health === "number") {

        state.health = clamp(
            state.health + effects.health,
            0,
            GAME_DATA.settings.maxHealth
        );

    }


    if (typeof effects.coins === "number") {

        state.coins = Math.max(
            0,
            state.coins + effects.coins
        );

    }


    if (typeof effects.courage === "number") {

        state.courage += effects.courage;

    }


    if (typeof effects.curiosity === "number") {

        state.curiosity += effects.curiosity;

    }


    if (typeof effects.morality === "number") {

        state.morality += effects.morality;

    }


    if (effects.item) {

        addItem(effects.item);

    }


    if (effects.achievement) {

        unlockAchievement(
            effects.achievement
        );

    }


    updateStats();

}


/* =========================================
   INVENTORY
========================================= */

function addItem(item) {

    if (!item) return;

    if (state.inventory.includes(item)) {
        return;
    }

    state.inventory.push(item);

}


/* =========================================
   ACHIEVEMENTS
========================================= */

function unlockAchievement(id) {

    if (!id) return;

    if (state.achievements.includes(id)) {
        return;
    }

    if (!GAME_DATA.achievements[id]) {
        return;
    }


    state.achievements.push(id);

    showAchievementNotification(
        GAME_DATA.achievements[id]
    );

}


function showAchievementNotification(achievement) {

    const old =
        document.querySelector(
            ".achievement-notification"
        );

    if (old) {
        old.remove();
    }


    const notification =
        document.createElement("div");

    notification.className =
        "achievement-notification";


    notification.innerHTML = `
        <div class="notification-icon">
            ${achievement.icon || "🏆"}
        </div>

        <div>
            <small>إنجاز جديد</small>
            <strong>
                ${escapeHTML(achievement.title)}
            </strong>
        </div>
    `;


    document.body.appendChild(notification);


    setTimeout(() => {

        notification.classList.add("hide");

        setTimeout(() => {
            notification.remove();
        }, 450);

    }, 2800);

}


/* =========================================
   INVENTORY RENDER
========================================= */

function renderInventory() {

    const container =
        $("inventoryList");

    if (!container) return;

    container.innerHTML = "";


    if (state.inventory.length === 0) {

        container.innerHTML = `
            <div class="inventory-empty">
                <div style="font-size:38px;">🎒</div>
                <p>الحقيبة فارغة حاليًا.</p>
            </div>
        `;

        return;
    }


    state.inventory.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "inventory-item";


        element.innerHTML = `
            <div class="inventory-icon">
                ◆
            </div>

            <div>
                ${escapeHTML(item)}
            </div>
        `;


        container.appendChild(element);

    });

}


/* =========================================
   ACHIEVEMENTS RENDER
========================================= */

function renderAchievements() {

    const container =
        $("achievementsList");

    if (!container) return;

    container.innerHTML = "";


    Object.entries(
        GAME_DATA.achievements
    ).forEach(([id, achievement]) => {

        const unlocked =
            state.achievements.includes(id);


        const element =
            document.createElement("div");


        element.className =
            `achievement ${
                unlocked ? "" : "locked"
            }`;


        element.innerHTML = `
            <div class="achievement-icon">
                ${unlocked
                    ? achievement.icon
                    : "?"}
            </div>

            <div>
                <strong>
                    ${unlocked
                        ? escapeHTML(achievement.title)
                        : "إنجاز مخفي"}
                </strong>

                <div>
                    ${unlocked
                        ? escapeHTML(
                            achievement.description
                          )
                        : "واصل اللعب لاكتشافه."}
                </div>
            </div>
        `;


        container.appendChild(element);

    });

}


/* =========================================
   STATS
========================================= */

function updateStats() {

    if ($("health")) {

        $("health").textContent =
            state.health;

    }


    if ($("coins")) {

        $("coins").textContent =
            state.coins;

    }


    if ($("chapter")) {

        $("chapter").textContent =
            state.chapter;

    }

}


/* =========================================
   PROGRESS
========================================= */

function updateProgress() {

    const chapter =
        getChapter();

    if (!chapter) return;


    const scenes =
        Object.keys(
            chapter.scenes || {}
        );


    const index =
        Math.max(
            0,
            scenes.indexOf(state.scene)
        );


    const progress =
        scenes.length <= 1
            ? 0
            : ((index + 1) / scenes.length) * 100;


    const bar =
        $("progressBar");


    if (bar) {

        bar.style.width =
            `${progress}%`;

    }

}


/* =========================================
   SAVE
========================================= */

function saveGame() {

    try {

        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(state)
        );

        updateContinueButton();

    } catch (error) {

        console.error(
            "Save failed:",
            error
        );

    }

}


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


        state = {
            ...state,
            ...parsed
        };


        return true;

    } catch (error) {

        console.error(
            "Load failed:",
            error
        );

        return false;

    }

}


function hasSave() {

    return !!localStorage.getItem(
        SAVE_KEY
    );

}


function clearSave() {

    localStorage.removeItem(
        SAVE_KEY
    );

    updateContinueButton();

}


/* =========================================
   CONTINUE BUTTON
========================================= */

function updateContinueButton() {

    const button =
        $("continueBtn");

    if (!button) return;


    button.style.display =
        hasSave()
            ? "block"
            : "none";

}


/* =========================================
   RESTART
========================================= */

function restartGame() {

    hideOverlay("menuOverlay");

    clearSave();

    startNewGame();

}


/* =========================================
   HOME
========================================= */

function goHome() {

    hideOverlay("menuOverlay");

    saveGame();

    showScreen("startScreen");

    updateContinueButton();

}


/* =========================================
   GAME OVER
========================================= */

function gameOver() {

    const container =
        $("choices");

    if (container) {

        container.innerHTML = "";

    }


    $("sceneTitle").textContent =
        "انتهت الرحلة";


    $("storyText").textContent =
        "لم تكن مستعدًا لما ينتظرك... لكن القصة لم تنتهِ.";

}


/* =========================================
   ENDING
========================================= */

function finishChapter(scene) {

    if (!scene) return;


    applyEffects(
        scene.effects || {}
    );


    saveGame();


    if ($("endIcon")) {
        $("endIcon").textContent =
            scene.endingIcon || "✦";
    }


    if ($("endTitle")) {
        $("endTitle").textContent =
            scene.endingTitle ||
            "البداية فقط";
    }


    if ($("endText")) {
        $("endText").textContent =
            scene.endingText ||
            "لقد أنهيت هذا الفصل.";
    }


    updateFinalStats();


    showScreen("endScreen");

}


/* =========================================
   FINAL STATS
========================================= */

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


/* =========================================
   STORY ANIMATION
========================================= */

function animateStory() {

    const title =
        $("sceneTitle");

    const text =
        $("storyText");


    if (title) {

        title.classList.remove("fade");

        void title.offsetWidth;

        title.classList.add("fade");

    }


    if (text) {

        text.classList.remove("fade");

        void text.offsetWidth;

        text.classList.add("fade");

    }

}


/* =========================================
   SECURITY
========================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}