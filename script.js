const SAVE_KEY = "shadows_unknown_save";

const state = {
    chapter: 1,
    scene: "start",
    health: 100,
    coins: 0,
    inventory: [],
    achievements: [],
    started: false
};

const $ = id => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
    setupEvents();

    if (loadGame()) {
        $("continueBtn").style.display = "block";
    } else {
        $("continueBtn").style.display = "none";
    }
});

function setupEvents() {
    $("continueBtn").onclick = () => {
        if (loadGame()) {
            state.started = true;
            showScreen("gameScreen");
            renderScene();
        }
    };

    $("newGameBtn").onclick = startNewGame;

    $("menuBtn").onclick = () => {
        $("menuOverlay").classList.add("show");
    };

    $("closeMenu").onclick = closeMenu;

    $("saveBtn").onclick = () => {
        saveGame();
        closeMenu();
    };

    $("restartBtn").onclick = () => {
        if (confirm("هل تريد إعادة القصة من البداية؟")) {
            startNewGame();
        }
    };

    $("backHomeBtn").onclick = () => {
        closeMenu();
        showScreen("startScreen");
    };

    $("inventoryBtn").onclick = () => {
        renderInventory();
        $("inventoryOverlay").classList.add("show");
    };

    $("achievementsBtn").onclick = () => {
        renderAchievements();
        $("achievementsOverlay").classList.add("show");
    };

    document.querySelectorAll("[data-close]").forEach(button => {
        button.onclick = () => {
            const overlay = $(button.dataset.close);
            if (overlay) overlay.classList.remove("show");
        };
    });

    $("restartFromEnd").onclick = startNewGame;
}

function startNewGame() {
    state.chapter = 1;
    state.scene = "start";
    state.health = 100;
    state.coins = 0;
    state.inventory = [];
    state.achievements = [];
    state.started = true;

    saveGame();
    showScreen("gameScreen");
    renderScene();
}

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    $(id).classList.add("active");
}

function closeMenu() {
    $("menuOverlay").classList.remove("show");
}

function getScene() {
    const chapter = GAME_DATA.chapters[state.chapter];

    if (!chapter) return null;

    return chapter.scenes[state.scene] || null;
}

function renderScene() {
    const scene = getScene();

    if (!scene) {
        console.error("المشهد غير موجود:", state.scene);
        return;
    }

    $("chapterLabel").textContent =
        GAME_DATA.chapters[state.chapter].name;

    $("chapter").textContent = state.chapter;
    $("sceneTitle").textContent = scene.title;
    $("storyText").textContent = scene.text;

    updateStats();
    updateProgress();
    renderChoices();

    animateStory();
}

function renderChoices() {
    const scene = getScene();
    const container = $("choices");

    container.innerHTML = "";

    if (scene.ending) {
        finishChapter(scene);
        return;
    }

    if (!scene.choices || scene.choices.length === 0) {
        return;
    }

    scene.choices.forEach((choice, index) => {
        const button = document.createElement("button");

        button.innerHTML = `
            <span class="choice-number">
                ${String(index + 1).padStart(2, "0")}
            </span>
            ${escapeHTML(choice.text)}
        `;

        button.addEventListener("click", () => {
            choose(choice);
        });

        container.appendChild(button);
    });
}

function choose(choice) {
    if (!choice) return;

    if (typeof choice.health === "number") {
        state.health += choice.health;
    }

    if (typeof choice.coins === "number") {
        state.coins += choice.coins;
    }

    if (choice.item) {
        addItem(choice.item);
    }

    if (choice.achievement) {
        unlockAchievement(choice.achievement);
    }

    state.health = Math.max(
        0,
        Math.min(100, state.health)
    );

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

function addItem(item) {
    if (!item) return;

    if (!state.inventory.includes(item)) {
        state.inventory.push(item);
    }
}

function unlockAchievement(id) {
    if (!GAME_DATA.achievements[id]) {
        return;
    }

    if (!state.achievements.includes(id)) {
        state.achievements.push(id);
    }
}

function renderInventory() {
    const container = $("inventoryList");

    container.innerHTML = "";

    if (state.inventory.length === 0) {
        container.innerHTML = `
            <div class="inventory-item">
                <div class="inventory-icon">🎒</div>
                <div>الحقيبة فارغة.</div>
            </div>
        `;
        return;
    }

    state.inventory.forEach(item => {
        const element = document.createElement("div");

        element.className = "inventory-item";

        element.innerHTML = `
            <div class="inventory-icon">◆</div>
            <div>${escapeHTML(item)}</div>
        `;

        container.appendChild(element);
    });
}

function renderAchievements() {
    const container = $("achievementsList");

    container.innerHTML = "";

    Object.entries(GAME_DATA.achievements).forEach(
        ([id, achievement]) => {

            const unlocked =
                state.achievements.includes(id);

            const element = document.createElement("div");

            element.className =
                "achievement" +
                (unlocked ? "" : " locked");

            element.innerHTML = `
                <div class="achievement-icon">
                    ${unlocked ? achievement.icon : "🔒"}
                </div>

                <div>
                    <strong>
                        ${escapeHTML(achievement.title)}
                    </strong>

                    <div>
                        ${
                            unlocked
                                ? escapeHTML(achievement.description)
                                : "إنجاز مقفل"
                        }
                    </div>
                </div>
            `;

            container.appendChild(element);
        }
    );
}

function updateStats() {
    $("health").textContent = state.health;
    $("coins").textContent = state.coins;
    $("chapter").textContent = state.chapter;
}

function updateProgress() {
    const chapter = GAME_DATA.chapters[state.chapter];

    if (!chapter) return;

    const scenes = Object.keys(chapter.scenes);
    const index = scenes.indexOf(state.scene);

    if (index === -1) {
        $("progressBar").style.width = "0%";
        return;
    }

    const percentage =
        ((index + 1) / scenes.length) * 100;

    $("progressBar").style.width =
        Math.min(100, percentage) + "%";
}

function saveGame() {
    try {
        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify({
                chapter: state.chapter,
                scene: state.scene,
                health: state.health,
                coins: state.coins,
                inventory: state.inventory,
                achievements: state.achievements,
                started: state.started
            })
        );
    } catch (error) {
        console.error("تعذر حفظ اللعبة:", error);
    }
}

function loadGame() {
    try {
        const saved =
            localStorage.getItem(SAVE_KEY);

        if (!saved) {
            return false;
        }

        const data = JSON.parse(saved);

        if (!data || typeof data !== "object") {
            return false;
        }

        Object.assign(state, data);

        state.chapter =
            Number.isInteger(state.chapter)
                ? state.chapter
                : 1;

        state.scene =
            typeof state.scene === "string"
                ? state.scene
                : "start";

        state.health =
            typeof state.health === "number"
                ? Math.max(0, Math.min(100, state.health))
                : 100;

        state.coins =
            typeof state.coins === "number"
                ? Math.max(0, state.coins)
                : 0;

        state.inventory =
            Array.isArray(state.inventory)
                ? state.inventory
                : [];

        state.achievements =
            Array.isArray(state.achievements)
                ? state.achievements
                : [];

        return true;

    } catch (error) {
        console.error("تعذر تحميل اللعبة:", error);
        return false;
    }
}

function gameOver() {
    $("endIcon").textContent = "☁";

    $("endTitle").textContent =
        "انتهت رحلتك";

    $("endText").textContent =
        "لم تكن مستعدًا لما كان ينتظرك في الظلام. لكن القصة لا تنتهي هنا.";

    updateFinalStats();

    showScreen("endScreen");
}

function finishChapter(scene) {
    if (scene.achievement) {
        unlockAchievement(scene.achievement);
    }

    saveGame();

    $("endIcon").textContent = "✦";

    $("endTitle").textContent =
        scene.endingTitle || "انتهى الفصل";

    $("endText").textContent =
        scene.endingText || "انتهى هذا الفصل.";

    updateFinalStats();

    showScreen("endScreen");
}

function updateFinalStats() {
    $("finalChapter").textContent =
        state.chapter;

    $("finalCoins").textContent =
        state.coins;

    $("finalAchievements").textContent =
        state.achievements.length;
}

function animateStory() {
    const text = $("storyText");

    text.classList.remove("fade");

    void text.offsetWidth;

    text.classList.add("fade");
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}