/* =========================================================
   ظلال المجهول — SHADOWS OF THE UNKNOWN
   effects.js
   ULTRA V8 — CINEMATIC EFFECT ENGINE
   ========================================================= */

(() => {
    "use strict";

    /* =====================================================
       01 — CORE
       ===================================================== */

    const $ = id => document.getElementById(id);

    let initialized = false;
    let motionEnabled = true;
    let effectCounter = 0;

    const timers = new Set();

    function wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    function later(callback, ms) {
        const id = setTimeout(() => {
            timers.delete(id);

            try {
                callback();
            } catch (error) {
                console.warn(
                    "[Effects]",
                    error
                );
            }

        }, ms);

        timers.add(id);

        return id;
    }

    function clearTimers() {
        timers.forEach(clearTimeout);
        timers.clear();
    }

    function num(value, fallback = 0) {
        const n = Number(value);

        return Number.isFinite(n)
            ? n
            : fallback;
    }

    function clamp(
        value,
        min = 0,
        max = 1
    ) {
        return Math.max(
            min,
            Math.min(max, value)
        );
    }

    /* =====================================================
       02 — DOM
       ===================================================== */

    function sceneElement() {

        return (
            $("sceneArea") ||
            $("gameScreen") ||
            document.body
        );

    }

    function createLayer(
        id,
        className = ""
    ) {

        let element = $(id);

        if (element) {
            return element;
        }

        element =
            document.createElement("div");

        element.id = id;

        if (className) {
            element.className =
                className;
        }

        element.setAttribute(
            "aria-hidden",
            "true"
        );

        Object.assign(
            element.style,
            {
                position: "fixed",
                inset: "0",
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                userSelect: "none",
                WebkitUserSelect: "none",
                opacity: "0"
            }
        );

        document.body.appendChild(
            element
        );

        return element;
    }

    function setupLayers() {

        createLayer(
            "effectFlash",
            "effect-layer effect-flash"
        );

        createLayer(
            "effectDarkness",
            "effect-layer effect-darkness"
        );

        createLayer(
            "effectLight",
            "effect-layer effect-light"
        );

        createLayer(
            "effectFog",
            "effect-layer effect-fog"
        );

        createLayer(
            "effectShadow",
            "effect-layer effect-shadow"
        );

        createLayer(
            "effectRain",
            "effect-layer effect-rain"
        );

        createLayer(
            "effectParticles",
            "effect-layer effect-particles"
        );

        createLayer(
            "effectVignette",
            "effect-layer effect-vignette"
        );

    }

    function opacity(
        element,
        value
    ) {

        if (!element) return;

        element.style.opacity =
            String(
                clamp(
                    num(value, 0)
                )
            );

    }

    function resetLayer(
        element
    ) {

        if (!element) return;

        element.style.opacity = "0";

        element.style.transform =
            "";

        element.style.filter =
            "";

        element.style.animation =
            "";

    }

    /* =====================================================
       03 — FLASH
       ===================================================== */

    function flash(
        opacityValue = 0.3,
        duration = 180,
        color = "#ffffff"
    ) {

        const element =
            createLayer(
                "effectFlash",
                "effect-layer effect-flash"
            );

        const time =
            Math.max(
                50,
                num(duration, 180)
            );

        opacity(
            element,
            opacityValue
        );

        Object.assign(
            element.style,
            {
                zIndex: "99999",
                background: color,
                transition:
                    `opacity ${Math.max(
                        40,
                        time / 2
                    )}ms ease`
            }
        );

        later(() => {

            opacity(
                element,
                0
            );

        }, Math.max(
            30,
            time / 2
        ));

    }

    /* =====================================================
       04 — SHAKE
       ===================================================== */

    function shake(
        options = {}
    ) {

        if (!motionEnabled) {
            return;
        }

        const target =
            options.target ||
            sceneElement();

        if (!target) return;

        const duration =
            Math.max(
                100,
                num(
                    options.duration,
                    420
                )
            );

        const strength =
            Math.max(
                1,
                num(
                    options.strength,
                    8
                )
            );

        const id =
            ++effectCounter;

        const animation =
            `shadowShake_${id}`;

        const style =
            document.createElement(
                "style"
            );

        style.dataset.effects =
            animation;

        style.textContent = `

            @keyframes ${animation} {

                0% {
                    transform:
                        translate3d(0,0,0);
                }

                10% {
                    transform:
                        translate3d(
                            ${-strength}px,
                            ${strength * .25}px,
                            0
                        );
                }

                20% {
                    transform:
                        translate3d(
                            ${strength}px,
                            ${-strength * .25}px,
                            0
                        );
                }

                30% {
                    transform:
                        translate3d(
                            ${-strength * .8}px,
                            ${strength * .2}px,
                            0
                        );
                }

                40% {
                    transform:
                        translate3d(
                            ${strength * .7}px,
                            ${-strength * .2}px,
                            0
                        );
                }

                55% {
                    transform:
                        translate3d(
                            ${-strength * .45}px,
                            0,
                            0
                        );
                }

                70% {
                    transform:
                        translate3d(
                            ${strength * .3}px,
                            0,
                            0
                        );
                }

                85% {
                    transform:
                        translate3d(
                            ${-strength * .12}px,
                            0,
                            0
                        );
                }

                100% {
                    transform:
                        translate3d(0,0,0);
                }

            }

        `;

        document.head.appendChild(
            style
        );

        target.style.animation =
            `${animation} ${duration}ms cubic-bezier(.36,.07,.19,.97)`;

        later(() => {

            target.style.animation =
                "";

            style.remove();

        }, duration + 100);

    }

    /* =====================================================
       05 — DANGER
       ===================================================== */

    function danger(
        options = {}
    ) {

        const scene =
            $("sceneArea");

        const duration =
            num(
                options.duration,
                700
            );

        if (scene) {

            scene.classList.add(
                "danger-mode"
            );

            later(() => {

                scene.classList.remove(
                    "danger-mode"
                );

            }, duration);

        }

        flash(
            num(
                options.flashOpacity,
                0.16
            ),
            180,
            options.color ||
            "#ff304f"
        );

        shake({
            duration:
                Math.min(
                    duration,
                    550
                ),

            strength:
                num(
                    options.strength,
                    7
                )
        });

    }

    /* =====================================================
       06 — DARKNESS
       ===================================================== */

    function darkness(
        options = {}
    ) {

        const element =
            createLayer(
                "effectDarkness",
                "effect-layer effect-darkness"
            );

        const duration =
            Math.max(
                100,
                num(
                    options.duration,
                    900
                )
            );

        Object.assign(
            element.style,
            {
                zIndex: "9990",

                background:
                    options.color ||
                    "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,.92) 100%)",

                transition:
                    `opacity ${duration / 2}ms ease`
            }
        );

        opacity(
            element,
            0
        );

        requestAnimationFrame(() => {

            opacity(
                element,
                1
            );

        });

        later(() => {

            opacity(
                element,
                0
            );

        }, duration / 2);

    }

    /* =====================================================
       07 — LIGHT
       ===================================================== */

    function light(
        options = {}
    ) {

        const element =
            createLayer(
                "effectLight",
                "effect-layer effect-light"
            );

        const duration =
            Math.max(
                100,
                num(
                    options.duration,
                    900
                )
            );

        Object.assign(
            element.style,
            {
                zIndex: "9988",

                background:
                    options.color ||
                    "radial-gradient(circle at 50% 45%, rgba(255,245,200,.50), rgba(255,220,120,.12) 35%, transparent 72%)",

                transition:
                    `opacity ${duration / 2}ms ease`
            }
        );

        opacity(
            element,
            0
        );

        requestAnimationFrame(() => {

            opacity(
                element,
                num(
                    options.opacity,
                    .9
                )
            );

        });

        later(() => {

            opacity(
                element,
                0
            );

        }, duration / 2);

    }

    /* =====================================================
       08 — FOG
       ===================================================== */

    function fog(
        options = {}
    ) {

        const element =
            createLayer(
                "effectFog",
                "effect-layer effect-fog"
            );

        const duration =
            Math.max(
                100,
                num(
                    options.duration,
                    1400
                )
            );

        Object.assign(
            element.style,
            {
                zIndex: "9985",

                background:
                    options.color ||
                    "linear-gradient(90deg, rgba(190,205,225,.03), rgba(235,242,255,.20), rgba(190,205,225,.03))",

                filter:
                    "blur(16px)",

                transform:
                    "scale(1.08)",

                transition:
                    `opacity ${duration / 2}ms ease, transform ${duration}ms ease`
            }
        );

        opacity(
            element,
            0
        );

        requestAnimationFrame(() => {

            opacity(
                element,
                num(
                    options.opacity,
                    .75
                )
            );

            element.style.transform =
                "scale(1)";

        });

        later(() => {

            opacity(
                element,
                0
            );

        }, duration);

    }

    /* =====================================================
       09 — SHADOW
       ===================================================== */

    function shadow(
        options = {}
    ) {

        const element =
            createLayer(
                "effectShadow",
                "effect-layer effect-shadow"
            );

        const duration =
            Math.max(
                100,
                num(
                    options.duration,
                    1200
                )
            );

        Object.assign(
            element.style,
            {
                zIndex: "9987",

                background:
                    options.color ||
                    "radial-gradient(ellipse at center, transparent 8%, rgba(0,0,0,.34) 55%, rgba(0,0,0,.92) 100%)",

                transition:
                    `opacity ${duration / 2}ms ease`
            }
        );

        opacity(
            element,
            0
        );

        requestAnimationFrame(() => {

            opacity(
                element,
                num(
                    options.opacity,
                    .9
                )
            );

        });

        later(() => {

            opacity(
                element,
                0
            );

        }, duration / 2);

    }

    /* =====================================================
       10 — RAIN
       ===================================================== */

    function rain(
        options = {}
    ) {

        const element =
            createLayer(
                "effectRain",
                "effect-layer effect-rain"
            );

        const duration =
            Math.max(
                100,
                num(
                    options.duration,
                    2200
                )
            );

        const intensity =
            clamp(
                num(
                    options.intensity,
                    .75
                )
            );

        Object.assign(
            element.style,
            {
                zIndex: "9982",

                backgroundImage:
                    `
                    repeating-linear-gradient(
                        105deg,
                        transparent 0 18px,
                        rgba(190,220,255,.18) 19px,
                        transparent 20px 34px
                    )
                    `,

                backgroundSize:
                    "55px 55px",

                animation:
                    motionEnabled
                        ? "shadowRainMove .55s linear infinite"
                        : "none",

                transition:
                    "opacity .35s ease"
            }
        );

        opacity(
            element,
            intensity
        );

        later(() => {

            opacity(
                element,
                0
            );

            later(() => {

                element.style.animation =
                    "none";

            }, 400);

        }, duration);

    }

    /* =====================================================
       11 — WIND
       ===================================================== */

    function wind(
        options = {}
    ) {

        const scene =
            $("sceneArea");

        if (!scene) return;

        const duration =
            num(
                options.duration,
                900
            );

        scene.classList.add(
            "wind-event"
        );

        later(() => {

            scene.classList.remove(
                "wind-event"
            );

        }, duration);

    }

    /* =====================================================
       12 — PARTICLES
       ===================================================== */

    function particles(
        options = {}
    ) {

        const element =
            createLayer(
                "effectParticles",
                "effect-layer effect-particles"
            );

        const duration =
            Math.max(
                200,
                num(
                    options.duration,
                    1800
                )
            );

        const count =
            Math.max(
                6,
                Math.min(
                    70,
                    Math.floor(
                        num(
                            options.count,
                            24
                        )
                    )
                )
            );

        element.innerHTML = "";

        Object.assign(
            element.style,
            {
                zIndex: "9984",
                opacity: "1"
            }
        );

        for (
            let i = 0;
            i < count;
            i++
        ) {

            const particle =
                document.createElement(
                    "span"
                );

            const size =
                2 +
                Math.random() * 4;

            const x =
                Math.random() * 100;

            const y =
                Math.random() * 100;

            const delay =
                Math.random() * 600;

            Object.assign(
                particle.style,
                {
                    position:
                        "absolute",

                    left:
                        `${x}%`,

                    top:
                        `${y}%`,

                    width:
                        `${size}px`,

                    height:
                        `${size}px`,

                    borderRadius:
                        "50%",

                    background:
                        "rgba(255,255,255,.82)",

                    boxShadow:
                        "0 0 12px rgba(180,215,255,.8)",

                    opacity:
                        String(
                            .25 +
                            Math.random() * .7
                        ),

                    animation:
                        motionEnabled
                            ? `shadowParticle_${effectCounter}_${i} ${1.5 + Math.random() * 2}s ease-in-out ${delay}ms infinite alternate`
                            : "none"
                }
            );

            element.appendChild(
                particle
            );

            if (motionEnabled) {

                const style =
                    document.createElement(
                        "style"
                    );

                const name =
                    `shadowParticle_${effectCounter}_${i}`;

                style.textContent = `

                    @keyframes ${name} {

                        from {
                            transform:
                                translate3d(
                                    0,
                                    0,
                                    0
                                )
                                scale(.8);

                            opacity:.15;
                        }

                        to {
                            transform:
                                translate3d(
                                    ${-15 + Math.random() * 30}px,
                                    ${-20 + Math.random() * 40}px,
                                    0
                                )
                                scale(1.4);

                            opacity:.9;
                        }

                    }

                `;

                document.head.appendChild(
                    style
                );

                later(() => {

                    style.remove();

                }, duration + 1000);

            }

        }

        later(() => {

            opacity(
                element,
                0
            );

            element.innerHTML = "";

        }, duration);

    }

    /* =====================================================
       13 — VIGNETTE
       ===================================================== */

    function vignette(
        options = {}
    ) {

        const element =
            createLayer(
                "effectVignette",
                "effect-layer effect-vignette"
            );

        const duration =
            Math.max(
                100,
                num(
                    options.duration,
                    1200
                )
            );

        Object.assign(
            element.style,
            {
                zIndex: "9980",

                background:
                    options.color ||
                    "radial-gradient(circle, transparent 38%, rgba(0,0,0,.82) 100%)",

                transition:
                    `opacity ${duration / 2}ms ease`
            }
        );

        opacity(
            element,
            num(
                options.opacity,
                .65
            )
        );

        later(() => {

            opacity(
                element,
                0
            );

        }, duration);

    }

    /* =====================================================
       14 — FADE
       ===================================================== */

    function fade(
        options = {}
    ) {

        const duration =
            Math.max(
                100,
                num(
                    options.duration,
                    700
                )
            );

        const existing =
            $("sceneTransition");

        if (existing) {

            existing.classList.add(
                "active"
            );

            later(() => {

                existing.classList.remove(
                    "active"
                );

            }, duration);

            return;
        }

        const overlay =
            document.createElement(
                "div"
            );

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        Object.assign(
            overlay.style,
            {
                position: "fixed",

                inset: "0",

                zIndex: "99998",

                pointerEvents:
                    "none",

                background:
                    options.color ||
                    "#020308",

                opacity: "0",

                transition:
                    `opacity ${duration / 2}ms ease`
            }
        );

        document.body.appendChild(
            overlay
        );

        requestAnimationFrame(() => {

            opacity(
                overlay,
                1
            );

        });

        later(() => {

            opacity(
                overlay,
                0
            );

            later(() => {

                overlay.remove();

            }, duration / 2 + 80);

        }, duration / 2);

    }

    /* =====================================================
       15 — SUPERNATURAL
       ===================================================== */

    function supernatural(
        options = {}
    ) {

        const duration =
            num(
                options.duration,
                1200
            );

        light({
            duration,
            opacity: .8
        });

        shadow({
            duration,
            opacity: .75
        });

        vignette({
            duration,
            opacity: .55
        });

        shake({
            duration:
                Math.min(
                    duration,
                    520
                ),

            strength:
                num(
                    options.strength,
                    5
                )
        });

        flash(
            .10,
            220,
            "#dce8ff"
        );

    }

    /* =====================================================
       16 — HORROR EVENT
       ===================================================== */

    function horror(
        options = {}
    ) {

        const duration =
            num(
                options.duration,
                1100
            );

        darkness({
            duration:
                duration * .8
        });

        shadow({
            duration,
            opacity: .9
        });

        danger({
            duration:
                Math.min(
                    duration,
                    650
                ),

            strength: 5
        });

        flash(
            .08,
            160,
            "#8c1025"
        );

    }

    /* =====================================================
       17 — REVEAL
       ===================================================== */

    function reveal(
        options = {}
    ) {

        const duration =
            num(
                options.duration,
                1300
            );

        darkness({
            duration:
                duration
        });

        light({
            duration:
                duration,
            opacity:
                num(
                    options.opacity,
                    .7
                )
        });

        particles({
            duration:
                duration,
            count:
                num(
                    options.count,
                    18
                )
        });

    }

    /* =====================================================
       18 — CHAPTER TRANSITION
       ===================================================== */

    async function chapter(
        options = {}
    ) {

        const duration =
            num(
                options.duration,
                900
            );

        const overlay =
            $("sceneTransition");

        if (overlay) {

            overlay.classList.add(
                "active"
            );

        }

        darkness({
            duration:
                duration
        });

        await wait(
            Math.min(
                duration / 2,
                500
            )
        );

        if (options.title) {

            const title =
                $("transitionTitle") ||
                $("transitionChapter") ||
                $("chapterTitleTop");

            if (title) {

                title.textContent =
                    options.title;

            }

        }

        await wait(
            Math.min(
                duration / 2,
                500
            )
        );

        if (overlay) {

            overlay.classList.remove(
                "active"
            );

        }

    }

    /* =====================================================
       19 — STORY EVENT
       ===================================================== */

    function storyEvent(
        event,
        options = {}
    ) {

        if (!event) {
            return;
        }

        if (Array.isArray(event)) {

            event.forEach(item => {

                if (
                    typeof item ===
                    "string"
                ) {

                    play(
                        item,
                        options
                    );

                    return;
                }

                if (
                    item &&
                    typeof item ===
                    "object"
                ) {

                    play(
                        item.type ||
                        item.name ||
                        "fade",

                        {
                            ...options,
                            ...item
                        }
                    );

                }

            });

            return;
        }

        if (
            typeof event ===
            "string"
        ) {

            play(
                event,
                options
            );

            return;
        }

        if (
            typeof event ===
            "object"
        ) {

            play(
                event.type ||
                event.name ||
                "fade",

                {
                    ...options,
                    ...event
                }
            );

        }

    }

    /* =====================================================
       20 — MAIN PLAY ROUTER
       ===================================================== */

    function play(
        type,
        options = {}
    ) {

        const effect =
            String(
                type ||
                "fade"
            )
            .trim()
            .toLowerCase();

        switch (effect) {

            case "shake":
                return shake(options);

            case "danger":
                return danger(options);

            case "dark":
            case "darkness":
                return darkness(options);

            case "light":
                return light(options);

            case "fog":
                return fog(options);

            case "wind":
                return wind(options);

            case "rain":
                return rain(options);

            case "shadow":
                return shadow(options);

            case "particles":
            case "particle":
                return particles(options);

            case "vignette":
                return vignette(options);

            case "fade":
                return fade(options);

            case "supernatural":
            case "supernatural-event":
                return supernatural(
                    options
                );

            case "horror":
            case "scary":
                return horror(options);

            case "reveal":
                return reveal(options);

            case "chapter":
            case "chapter-transition":
                return chapter(options);

            case "flash":
                return flash(
                    options.opacity ??
                    .3,

                    options.duration ??
                    180,

                    options.color ||
                    "#ffffff"
                );

            default:
                return fade(options);

        }

    }

    /* =====================================================
       21 — MOTION
       ===================================================== */

    function setMotion(
        enabled
    ) {

        motionEnabled =
            !!enabled;

        document.documentElement
            .classList.toggle(
                "reduced-motion",
                !motionEnabled
            );

        const style =
            $("effectsMotionStyle");

        if (style) {

            style.textContent =
                motionEnabled
                    ? ""
                    : `

                        *,
                        *::before,
                        *::after {

                            animation-duration:
                                .001ms !important;

                            animation-iteration-count:
                                1 !important;

                            transition-duration:
                                .001ms !important;

                            scroll-behavior:
                                auto !important;

                        }

                    `;

        }

    }

    /* =====================================================
       22 — CLEANUP
       ===================================================== */

    function clear() {

        clearTimers();

        const scene =
            $("sceneArea");

        if (scene) {

            scene.classList.remove(
                "danger-mode",
                "wind-event"
            );

            scene.style.animation =
                "";

        }

        [
            "effectFlash",
            "effectDarkness",
            "effectLight",
            "effectFog",
            "effectShadow",
            "effectRain",
            "effectParticles",
            "effectVignette"
        ].forEach(id => {

            const element = $(id);

            if (!element) return;

            element.style.opacity =
                "0";

            element.style.animation =
                "";

            element.style.transform =
                "";

            element.style.filter =
                "";

            if (
                id ===
                "effectParticles"
            ) {

                element.innerHTML =
                    "";

            }

        });

        document
            .querySelectorAll(
                "style[data-effects]"
            )
            .forEach(
                style =>
                    style.remove()
            );

    }

    /* =====================================================
       23 — INITIALIZATION
       ===================================================== */

    function init() {

        if (initialized) {
            return;
        }

        initialized = true;

        setupLayers();

        if (!$("effectsMotionStyle")) {

            const style =
                document.createElement(
                    "style"
                );

            style.id =
                "effectsMotionStyle";

            document.head.appendChild(
                style
            );

        }

        if (!$("shadowEffectsKeyframes")) {

            const style =
                document.createElement(
                    "style"
                );

            style.id =
                "shadowEffectsKeyframes";

            style.textContent = `

                @keyframes shadowRainMove {

                    from {
                        background-position:
                            0 0;
                    }

                    to {
                        background-position:
                            -40px 90px;
                    }

                }

                @keyframes shadowAmbientPulse {

                    0%,
                    100% {
                        opacity:
                            .25;
                    }

                    50% {
                        opacity:
                            .85;
                    }

                }

            `;

            document.head.appendChild(
                style
            );

        }

        setMotion(
            motionEnabled
        );

    }

    /* =====================================================
       24 — PUBLIC API
       ===================================================== */

    window.Effects = {

        init,

        play,

        storyEvent,

        setMotion,

        clear,

        shake,

        danger,

        darkness,

        light,

        fog,

        wind,

        rain,

        particles,

        vignette,

        fade,

        supernatural,

        horror,

        reveal,

        chapter,

        get motionEnabled() {

            return motionEnabled;

        },

        get initialized() {

            return initialized;

        }

    };

    /* =====================================================
       25 — AUTO INIT
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init,
            {
                once: true
            }
        );

    } else {

        init();

    }

    /* =====================================================
       26 — PAGE CLEANUP
       ===================================================== */

    window.addEventListener(
        "beforeunload",
        clear
    );

})();