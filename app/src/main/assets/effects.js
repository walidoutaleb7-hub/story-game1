/* =========================================================
   ظلال المجهول — EFFECTS ENGINE
   Lightweight fallback used by script.js
   ========================================================= */

(() => {
    "use strict";

    const app = () => document.getElementById("app");

    const aliases = {
        danger: "danger-mode",
        darkness: "dark-mode",
        light: "light-event",
        fog: "fog-event",
        wind: "wind-event",
        rain: "rain-event",
        shadow: "shadow-event"
    };

    const layers = {
        flash: "effectFlash",
        fog: "effectFog",
        shadow: "effectShadow",
        light: "effectLight",
        rain: "effectRain",
        darkness: "effectDarkness"
    };

    function clearEventClasses() {
        const root = app();
        if (!root) return;

        Object.values(aliases).forEach(
            cls => root.classList.remove(cls)
        );
    }

    function layerEffect(type, duration) {
        const id = layers[type];
        const element = id
            ? document.getElementById(id)
            : null;

        if (!element) return;

        element.style.opacity = "1";

        window.setTimeout(() => {
            element.style.opacity = "";
        }, Math.max(100, duration || 500));
    }

    function uiEffect(type, duration) {
        const root = app();
        if (!root) return;

        const target =
            document.querySelector(".scene-visual") ||
            document.querySelector(".story-panel") ||
            root;

        const animationTypes = {
            shake: "shake",
            glitch: "glitch",
            flicker: "glitch"
        };

        const cls = animationTypes[type];

        if (!cls) return;

        target.classList.remove(cls);
        void target.offsetWidth;
        target.classList.add(cls);

        window.setTimeout(
            () => target.classList.remove(cls),
            Math.max(250, duration || 500)
        );
    }

    const Effects = {

        motion: true,

        init() {
            clearEventClasses();
        },

        setMotion(value) {
            this.motion = !!value;
        },

        play(type, options = {}) {

            if (!type || !this.motion) {
                return null;
            }

            const name = String(type);
            const duration =
                Number(options.duration) || 500;

            const root = app();

            if (root && aliases[name]) {
                clearEventClasses();
                root.classList.add(aliases[name]);

                window.setTimeout(
                    () => root.classList.remove(aliases[name]),
                    duration
                );
            }

            if (layers[name]) {
                layerEffect(name, duration);
            }

            uiEffect(name, duration);

            if (name === "flash") {
                layerEffect("flash", duration);
            }

            if (name === "reveal") {
                layerEffect("light", duration);
            }

            if (name === "supernatural") {
                layerEffect("shadow", duration);
                uiEffect("glitch", Math.min(duration, 700));
            }

            return true;

        },

        storyEvent(type, options = {}) {

            if (type) {
                return this.play(type, options);
            }

            return null;

        }

    };

    window.Effects = Effects;

})();
