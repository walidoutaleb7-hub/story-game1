const SAVE_KEY = "shadows_unknown_v2";

const state = {
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


/* ==============================
   HELPERS
============================== */

const $ = id => document.getElementById(id);

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function getChapter() {
    return GAME_DATA.chapters[state.chapter];
}

function getScene() {
    const chapter = getChapter();

    if (!chapter) return null;

    return chapter.scenes[state.scene] || null;
}


/* ==============================
   STARTUP
============================== */

document.addEventListener("DOMContentLoaded", () => {

    setupEvents();

    const saved = loadGame();

    if (saved) {
        $("continueBtn").style.display = "block";
    } else {
        $("continueBtn").style.display = "none";
    }

});


/* ==============================
   EVENTS
============================== */

function setupEvents() {

    $("continueBtn").addEventListener("click", () => {

        if (!loadGame()) return;

        state.started = true;

        showScreen("gameScreen");

        renderScene();

    });


    $("newGameBtn").addEventListener("click", () => {

        if (hasSave()) {

            const confirmed = confirm(
                "لديك لعبة محفوظة. هل تريد بدء لعبة جديدة؟"
            );

            if (!confirmed) return;

        }

        startNewGame();

    });


    $("menuBtn").addEventListener("click", () => {

        $("menuOverlay").classList.add("show");

    });


    $("closeMenu").addEventListener("click", closeMenu);


    $("saveBtn").addEventListener("click", () => {

        saveGame();

        closeMenu();

    });


    $("restartBtn").addEventListener("click", () => {

        const confirmed = confirm(
            "هل تريد حذف تقدمك وبدء القصة من البداية؟"
        );

        if (!confirmed) return;

        clearSave();

        closeMenu();

        startNewGame();

    });


    $("backHomeBtn").addEventListener("click", () => {

        closeMenu();

        showScreen("startScreen");

    });


    $("inventoryBtn").addEventListener("click", () => {

        renderInventory();

        $("inventoryOverlay").classList.add("show");

    });


    $("achievementsBtn").addEventListener("click", () => {

        renderAchievements();

        $("achievementsOverlay").classList.add("show");

    });


    document
        .querySelectorAll("[data-close]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const overlay =
                    $(button.dataset.close);

                if (overlay) {
                    overlay.classList.remove("show");
                }

            });

        });


    $("restartFromEnd").addEventListener(
        "click",
        startNewGame
    );

}


/* ==============================
   NEW GAME
============================== */

function startNewGame() {

    state.chapter = 1;
    state.scene = "start";

    state.health =
        GAME_DATA.settings.startingHealth;

    state.coins =
        GAME_DATA.settings.startingCoins;

    state.courage = 0;
    state.curiosity = 0;
    state.morality = 0;

    state.inventory = [];
    state.achievements = [];

    state.started = true;

    saveGame();

    showScreen("gameScreen");

    renderScene();

}


/* ==============================
   SCREEN
============================== */

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


/* ==============================
   RENDER SCENE
============================== */

function renderScene() {

    const scene = getScene();

    if (!scene) {

        console.error(
            "Scene not found:",
            state.chapter,
            state.scene
        );

        return;

    }


    $("chapterLabel").textContent =
        getChapter().name;


    $("chapter").textContent =
        state.chapter;


    $("sceneTitle").textContent =
        scene.title;


    $("storyText").textContent =
        scene.text;


    updateStats();

    updateProgress();

    renderChoices();

    animateStory();

}


/* ==============================
   CHOICES
============================== */

function renderChoices() {

    const scene = getScene();

    const container = $("choices");

    container.innerHTML = "";


    if (scene.ending) {

        finishChapter(scene);

        return;

    }


    if (!scene.choices) return;


    scene.choices.forEach((choice, index) => {

        const button =
            document.createElement("button");


        const number =
            String(index + 1).padStart(2, "0");


        button.innerHTML = `
            <span class="choice-number">
                ${number}
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


/* ==============================
   CHOICE LOGIC
============================== */

function choose(choice) {

    if (!choice) return;


    applyEffects(choice.effects);


    if (state.health <= 0) {

        saveGame();

        gameOver();

        return;

    }


    if (!choice.next) {

        saveGame();

        return;

    }


    state.scene = choice.next;


    saveGame();


    renderScene();

}


/* ==============================
   EFFECT SYSTEM
============================== */

function applyEffects(effects = {}) {

    if (
        typeof effects.health === "number"
    ) {

        state.health += effects.health;

    }


    if (
        typeof effects.coins === "number"
    ) {

        state.coins += effects.coins;

    }


    if (
        typeof effects.courage === "number"
    ) {

        state.courage += effects.courage;

    }


    if (
        typeof effects.curiosity === "number"
    ) {

        state.curiosity += effects.curiosity;

    }


    if (
        typeof effects.morality === "number"
    ) {

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


    state.health = clamp(
        state.health,
        0,
        GAME_DATA.settings.maxHealth
    );


    state.coins =
        Math.max(0, state.coins);

}


/* ==============================
   INVENTORY
============================== */

function addItem(item) {

    if (!item) return;


    if (!state.inventory.includes(item)) {

        state.inventory.push(item);

    }

}


/* ==============================
   ACHIEVEMENTS
============================== */

function unlockAchievement(id) {

    const achievement =
        GAME_DATA.achievements[id];


    if (!achievement) return;


    if (
        !state.achievements.includes(id)
    ) {

        state.achievements.push(id);

        showAchievementNotification(
            achievement
        );

    }

}


/* ==============================
   ACHIEVEMENT NOTIFICATION
============================== */

function showAchievementNotification(
    achievement
) {

    const notification =
        document.createElement("div");


    notification.className =
        "achievement-notification";


    notification.innerHTML = `
        <div class="notification-icon">
            ${achievement.icon}
        </div>

        <div>
            <small>إنجاز جديد</small>

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


    setTimeout(() => {

        notification.classList.add(
            "hide"
        );

        setTimeout(() => {
            notification.remove();
        }, 400);

    }, 2800);

}


/* ==============================
   INVENTORY UI
============================== */

function renderInventory() {

    const container =
        $("inventoryList");


    container.innerHTML = "";


    if (
        state.inventory.length === 0
    ) {

        container.innerHTML = `
            <div class="inventory-empty">
                🎒
                <p>الحقيبة فارغة</p>
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


/* ==============================
   ACHIEVEMENTS UI
============================== */

function renderAchievements() {

    const container =
        $("achievementsList");


    container.innerHTML = "";


    Object.entries(
        GAME_DATA.achievements
    ).forEach(
        ([id, achievement]) => {

            const unlocked =
                state.achievements
                    .includes(id);


            const element =
                document.createElement("div");


            element.className =
                "achievement" +
                (
                    unlocked
                        ? ""
                        : " locked"
                );


            element.innerHTML = `
                <div class="achievement-icon">
                    ${
                        unlocked
                            ? achievement.icon
                            : "🔒"
                    }
                </div>

                <div>
                    <strong>
                        ${escapeHTML(
                            achievement.title
                        )}
                    </strong>

                    <div>
                        ${
                            unlocked
                                ? escapeHTML(
                                    achievement.description
                                )
                                : "إنجاز مقفل"
                        }
                    </div>
                </div>
            `;


            container.appendChild(element);

        }
    );

}


/* ==============================
   PLAYER STATS
============================== */

function updateStats() {

    $("health").textContent =
        state.health;


    $("coins").textContent =
        state.coins;


    $("chapter").textContent =
        state.chapter;

}


/* ==============================
   PROGRESS BAR
============================== */

function updateProgress() {

    const chapter =
        getChapter();


    if (!chapter) return;


    const scenes =
        Object.keys(
            chapter.scenes
        );


    const currentIndex =
        scenes.indexOf(
            state.scene
        );


    if (currentIndex === -1) {

        $("progressBar").style.width =
            "0%";

        return;

    }


    const progress =
        (
            (currentIndex + 1) /
            scenes.length
        ) * 100;


    $("progressBar").style.width =
        `${Math.min(100, progress)}%`;

}


/* ==============================
   SAVE SYSTEM
============================== */

function saveGame() {

    try {

        const saveData = {

            version:
                GAME_DATA.version,

            chapter:
                state.chapter,

            scene:
                state.scene,

            health:
                state.health,

            coins:
                state.coins,

            courage:
                state.courage,

            curiosity:
                state.curiosity,

            morality:
                state.morality,

            inventory:
                state.inventory,

            achievements:
                state.achievements,

            started:
                state.started

        };


        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(saveData)
        );


        updateContinueButton();


    } catch (error) {

        console.error(
            "Save error:",
            error
        );

    }

}


/* ==============================
   LOAD SYSTEM
============================== */

function loadGame() {

    try {

        const raw =
            localStorage.getItem(
                SAVE_KEY
            );


        if (!raw) {

            return false;

        }


        const data =
            JSON.parse(raw);


        if (!data) return false;


        state.chapter =
            Number(data.chapter) || 1;


        state.scene =
            typeof data.scene === "string"
                ? data.scene
                : "start";


        state.health =
            typeof data.health === "number"
                ? clamp(data.health, 0, 100)
                : 100;


        state.coins =
            typeof data.coins === "number"
                ? Math.max(0, data.coins)
                : 25;


        state.courage =
            Number(data.courage) || 0;


        state.curiosity =
            Number(data.curiosity) || 0;


        state.morality =
            Number(data.morality) || 0;


        state.inventory =
            Array.isArray(data.inventory)
                ? data.inventory
                : [];


        state.achievements =
            Array.isArray(data.achievements)
                ? data.achievements
                : [];


        state.started =
            Boolean(data.started);


        return true;


    } catch (error) {

        console.error(
            "Load error:",
            error
        );


        return false;

    }

}


/* ==============================
   SAVE CHECK
============================== */

function hasSave() {

    return Boolean(
        localStorage.getItem(
            SAVE_KEY
        )
    );

}


/* ==============================
   CLEAR SAVE
============================== */

function clearSave() {

    localStorage.removeItem(
        SAVE_KEY
    );

}


/* ==============================
   GAME OVER
============================== */

function gameOver() {

    $("endIcon").textContent =
        "☁";


    $("endTitle").textContent =
        "انتهت الرحلة";


    $("endText").textContent =
        "لم تستطع مواصلة الطريق هذه المرة. لكن كل قرار يقربك من الحقيقة.";


    updateFinalStats();


    showScreen(
        "endScreen"
    );

}


/* ==============================
   CHAPTER END
============================== */

function finishChapter(scene) {

    if (scene.effects) {

        applyEffects(
            scene.effects
        );

    }


    saveGame();


    $("endIcon").textContent =
        "✦";


    $("endTitle").textContent =
        scene.endingTitle ||
        "انتهى الفصل";


    $("endText").textContent =
        scene.endingText ||
        "لقد وصلت إلى نهاية هذا الفصل.";


    updateFinalStats();


    showScreen(
        "endScreen"
    );

}


/* ==============================
   FINAL STATS
============================== */

function updateFinalStats() {

    $("finalChapter").textContent =
        state.chapter;


    $("finalCoins").textContent =
        state.coins;


    $("finalAchievements").textContent =
        state.achievements.length;

}


/* ==============================
   ANIMATION
============================== */

function animateStory() {

    const title =
        $("sceneTitle");


    const text =
        $("storyText");


    title.classList.remove("fade");

    text.classList.remove("fade");


    void title.offsetWidth;
    void text.offsetWidth;


    title.classList.add("fade");
    text.classList.add("fade");

}


/* ==============================
   CONTINUE BUTTON
============================== */

function updateContinueButton() {

    if (
        hasSave()
    ) {

        $("continueBtn").style.display =
            "block";

    } else {

        $("continueBtn").style.display =
            "none";

    }

}


/* ==============================
   BASIC HTML SANITIZATION
============================== */

function escapeHTML(value) {

    return String(value)

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