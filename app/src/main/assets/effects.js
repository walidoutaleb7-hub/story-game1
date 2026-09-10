/* =========================================================
   ظلال المجهول — SHADOWS OF THE UNKNOWN
   effects.js — CINEMATIC EFFECTS ENGINE
   ULTRA EDITION
   ========================================================= */

(() => {
    "use strict";

    /* =====================================================
       CORE
    ===================================================== */

    const Effects = {

        activeEffects: new Set(),

        timers: new Map(),

        motionEnabled: true,

        initialized: false,


        /* =================================================
           INITIALIZE
        ================================================= */

        init() {

            if (this.initialized) return;

            this.initialized = true;

            this.cache();

            this.readSettings();

            this.prepareParticles();

            this.bindVisibility();

        },


        /* =================================================
           CACHE DOM
        ================================================= */

        cache() {

            this.el = {

                body:
                    document.body,

                app:
                    document.getElementById("app"),

                sceneArea:
                    document.getElementById("sceneArea"),

                sceneVisual:
                    document.getElementById("sceneVisual"),

                sceneImage:
                    document.getElementById("sceneImage"),

                sceneFog:
                    document.getElementById("sceneFog"),

                sceneWind:
                    document.getElementById("sceneWind"),

                sceneLight:
                    document.getElementById("sceneLight"),

                effectFlash:
                    document.getElementById("effectFlash"),

                effectFog:
                    document.getElementById("effectFog"),

                effectShadow:
                    document.getElementById("effectShadow"),

                effectLight:
                    document.getElementById("effectLight"),

                effectRain:
                    document.getElementById("effectRain"),

                effectDarkness:
                    document.getElementById("effectDarkness"),

                screenFlash:
                    document.getElementById("screenFlash"),

                particles:
                    document.getElementById("particles"),

                sceneParticles:
                    document.getElementById("sceneParticles")

            };

        },


        /* =================================================
           SETTINGS
        ================================================= */

        readSettings() {

            try {

                const saved =
                    JSON.parse(
                        localStorage.getItem(
                            "shadow_unknown_settings"
                        ) || "{}"
                    );

                if (
                    saved.motion === false
                ) {

                    this.setMotion(false);

                }

            } catch (error) {

                console.warn(
                    "Effects settings error:",
                    error
                );

            }

        },


        setMotion(enabled) {

            this.motionEnabled =
                enabled !== false;

            if (!this.motionEnabled) {

                this.el.body
                    ?.classList
                    .add("motion-disabled");

            } else {

                this.el.body
                    ?.classList
                    .remove("motion-disabled");

            }

        },


        /* =================================================
           VISIBILITY
        ================================================= */

        bindVisibility() {

            document.addEventListener(
                "visibilitychange",
                () => {

                    if (
                        document.hidden
                    ) {

                        this.pause();

                    } else {

                        this.resume();

                    }

                }
            );

        },


        pause() {

            this.el.body
                ?.classList
                .add("effects-paused");

        },


        resume() {

            this.el.body
                ?.classList
                .remove("effects-paused");

        },


        /* =================================================
           GENERIC TIMER
        ================================================= */

        later(
            id,
            callback,
            delay
        ) {

            this.clearTimer(id);

            const timer =
                setTimeout(
                    () => {

                        this.timers.delete(id);

                        callback();

                    },
                    delay
                );

            this.timers.set(
                id,
                timer
            );

        },


        clearTimer(id) {

            const timer =
                this.timers.get(id);

            if (timer) {

                clearTimeout(timer);

                this.timers.delete(id);

            }

        },


        /* =================================================
           CLASS HELPERS
        ================================================= */

        addClass(
            element,
            className
        ) {

            if (!element) return;

            element.classList.add(
                className
            );

        },


        removeClass(
            element,
            className
        ) {

            if (!element) return;

            element.classList.remove(
                className
            );

        },


        toggleClass(
            element,
            className,
            state
        ) {

            if (!element) return;

            element.classList.toggle(
                className,
                !!state
            );

        },


        /* =================================================
           FOG
        ================================================= */

        fog(
            options = {}
        ) {

            const duration =
                Number(
                    options.duration ?? 3500
                );

            const intensity =
                Number(
                    options.intensity ?? 1
                );

            if (
                this.el.sceneFog
            ) {

                this.el.sceneFog.style.opacity =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            .55 * intensity
                        )
                    );

            }

            if (
                this.el.effectFog
            ) {

                this.el.effectFog.style.opacity =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            .45 * intensity
                        )
                    );

            }

            this.activeEffects.add(
                "fog"
            );

            this.addClass(
                this.el.body,
                "fog-event"
            );

            if (duration > 0) {

                this.later(
                    "fog",
                    () => {

                        if (
                            this.el.sceneFog
                        ) {

                            this.el.sceneFog.style.opacity =
                                "0";

                        }

                        if (
                            this.el.effectFog
                        ) {

                            this.el.effectFog.style.opacity =
                                "0";

                        }

                        this.removeClass(
                            this.el.body,
                            "fog-event"
                        );

                        this.activeEffects.delete(
                            "fog"
                        );

                    },
                    duration
                );

            }

        },


        /* =================================================
           WIND
        ================================================= */

        wind(
            options = {}
        ) {

            const duration =
                Number(
                    options.duration ?? 4000
                );

            const intensity =
                Number(
                    options.intensity ?? 1
                );

            if (
                this.el.sceneWind
            ) {

                this.el.sceneWind.style.opacity =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            .75 * intensity
                        )
                    );

            }

            this.activeEffects.add(
                "wind"
            );

            this.addClass(
                this.el.body,
                "wind-event"
            );

            if (duration > 0) {

                this.later(
                    "wind",
                    () => {

                        if (
                            this.el.sceneWind
                        ) {

                            this.el.sceneWind.style.opacity =
                                "0";

                        }

                        this.removeClass(
                            this.el.body,
                            "wind-event"
                        );

                        this.activeEffects.delete(
                            "wind"
                        );

                    },
                    duration
                );

            }

        },


        /* =================================================
           LIGHT
        ================================================= */

        light(
            options = {}
        ) {

            const duration =
                Number(
                    options.duration ?? 3000
                );

            const intensity =
                Number(
                    options.intensity ?? 1
                );

            if (
                this.el.sceneLight
            ) {

                this.el.sceneLight.style.opacity =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            intensity
                        )
                    );

            }

            if (
                this.el.effectLight
            ) {

                this.el.effectLight.style.opacity =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            intensity
                        )
                    );

            }

            this.activeEffects.add(
                "light"
            );

            this.addClass(
                this.el.body,
                "light-event"
            );

            if (duration > 0) {

                this.later(
                    "light",
                    () => {

                        if (
                            this.el.sceneLight
                        ) {

                            this.el.sceneLight.style.opacity =
                                "0";

                        }

                        if (
                            this.el.effectLight
                        ) {

                            this.el.effectLight.style.opacity =
                                "0";

                        }

                        this.removeClass(
                            this.el.body,
                            "light-event"
                        );

                        this.activeEffects.delete(
                            "light"
                        );

                    },
                    duration
                );

            }

        },


        /* =================================================
           FLASH
        ================================================= */

        flash(
            options = {}
        ) {

            if (!this.motionEnabled) {
                return;
            }

            const duration =
                Number(
                    options.duration ?? 220
                );

            const strength =
                Number(
                    options.strength ?? 1
                );

            const element =
                this.el.effectFlash ||
                this.el.screenFlash;

            if (!element) return;

            element.style.opacity =
                String(
                    Math.min(
                        1,
                        strength
                    )
                );

            element.style.transition =
                "opacity " +
                Math.max(
                    80,
                    duration
                ) +
                "ms ease";

            requestAnimationFrame(
                () => {

                    element.style.opacity =
                        "0";

                }
            );

            this.activeEffects.add(
                "flash"
            );

            this.later(
                "flash-clean",
                () => {

                    element.style.opacity =
                        "0";

                    this.activeEffects.delete(
                        "flash"
                    );

                },
                duration + 80
            );

        },


        /* =================================================
           LIGHTNING
        ================================================= */

        lightning(
            options = {}
        ) {

            if (!this.motionEnabled) {
                return;
            }

            const flashes =
                Math.max(
                    1,
                    Number(
                        options.flashes ?? 3
                    )
                );

            const gap =
                Number(
                    options.gap ?? 130
                );

            const strength =
                Number(
                    options.strength ?? .85
                );

            for (
                let i = 0;
                i < flashes;
                i++
            ) {

                this.later(
                    "lightning-" + i,
                    () => {

                        this.flash({
                            duration:110,
                            strength
                        });

                    },
                    i * gap
                );

            }

            this.later(
                "lightning-light",
                () => {

                    this.light({
                        duration:850,
                        intensity:.55
                    });

                },
                20
            );

        },


        /* =================================================
           DARKNESS
        ================================================= */

        darkness(
            options = {}
        ) {

            const duration =
                Number(
                    options.duration ?? 2500
                );

            const intensity =
                Number(
                    options.intensity ?? .82
                );

            if (
                this.el.effectDarkness
            ) {

                this.el.effectDarkness.style.opacity =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            intensity
                        )
                    );

            }

            this.activeEffects.add(
                "darkness"
            );

            this.addClass(
                this.el.body,
                "dark-mode"
            );

            if (duration > 0) {

                this.later(
                    "darkness",
                    () => {

                        if (
                            this.el.effectDarkness
                        ) {

                            this.el.effectDarkness.style.opacity =
                                "0";

                        }

                        this.removeClass(
                            this.el.body,
                            "dark-mode"
                        );

                        this.activeEffects.delete(
                            "darkness"
                        );

                    },
                    duration
                );

            }

        },


        /* =================================================
           SHADOW PASS
        ================================================= */

        shadow(
            options = {}
        ) {

            const duration =
                Number(
                    options.duration ?? 1300
                );

            const element =
                this.el.effectShadow;

            if (!element) return;

            this.activeEffects.add(
                "shadow"
            );

            this.addClass(
                this.el.body,
                "shadow-event"
            );

            element.style.opacity =
                String(
                    options.opacity ?? 1
                );

            element.style.transform =
                "translateX(0)";

            this.later(
                "shadow-pass",
                () => {

                    element.style.transform =
                        "translateX(110%)";

                },
                100
            );

            this.later(
                "shadow-clean",
                () => {

                    element.style.opacity =
                        "0";

                    element.style.transform =
                        "translateX(-100%)";

                    this.removeClass(
                        this.el.body,
                        "shadow-event"
                    );

                    this.activeEffects.delete(
                        "shadow"
                    );

                },
                duration
            );

        },


        /* =================================================
           RAIN
        ================================================= */

        rain(
            options = {}
        ) {

            const duration =
                Number(
                    options.duration ?? 5000
                );

            const intensity =
                Number(
                    options.intensity ?? .7
                );

            if (
                this.el.effectRain
            ) {

                this.el.effectRain.style.opacity =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            intensity
                        )
                    );

            }

            this.activeEffects.add(
                "rain"
            );

            this.addClass(
                this.el.body,
                "rain-event"
            );

            if (duration > 0) {

                this.later(
                    "rain",
                    () => {

                        if (
                            this.el.effectRain
                        ) {

                            this.el.effectRain.style.opacity =
                                "0";

                        }

                        this.removeClass(
                            this.el.body,
                            "rain-event"
                        );

                        this.activeEffects.delete(
                            "rain"
                        );

                    },
                    duration
                );

            }

        },


        /* =================================================
           SHAKE
        ================================================= */

        shake(
            options = {}
        ) {

            if (!this.motionEnabled) {
                return;
            }

            const duration =
                Number(
                    options.duration ?? 500
                );

            const intensity =
                Number(
                    options.intensity ?? 5
                );

            const target =
                this.el.sceneArea ||
                this.el.app;

            if (!target) return;

            const animationName =
                "effectsShake_" +
                Date.now();

            const style =
                document.createElement(
                    "style"
                );

            style.dataset.effect =
                "shake";

            style.textContent = `

                @keyframes ${animationName}{

                    0%{
                        transform:translate3d(0,0,0);
                    }

                    20%{
                        transform:translate3d(
                            ${-intensity}px,
                            ${intensity / 2}px,
                            0
                        );
                    }

                    40%{
                        transform:translate3d(
                            ${intensity}px,
                            ${-intensity / 2}px,
                            0
                        );
                    }

                    60%{
                        transform:translate3d(
                            ${-intensity / 1.5}px,
                            ${intensity / 2}px,
                            0
                        );
                    }

                    80%{
                        transform:translate3d(
                            ${intensity / 1.5}px,
                            0,
                            0
                        );
                    }

                    100%{
                        transform:translate3d(0,0,0);
                    }

                }

            `;

            document.head.appendChild(
                style
            );

            target.style.animation =
                `${animationName} ${duration}ms ease`;

            this.later(
                "shake",
                () => {

                    target.style.animation =
                        "";

                    style.remove();

                },
                duration + 50
            );

        },


        /* =================================================
           PULSE
        ================================================= */

        pulse(
            options = {}
        ) {

            if (!this.motionEnabled) {
                return;
            }

            const duration =
                Number(
                    options.duration ?? 900
                );

            const target =
                options.target ||
                this.el.sceneArea;

            if (!target) return;

            const oldTransform =
                target.style.transform;

            target.style.transition =
                `transform ${duration / 2}ms ease`;

            target.style.transform =
                "scale(1.025)";

            this.later(
                "pulse",
                () => {

                    target.style.transform =
                        oldTransform || "";

                },
                duration / 2
            );

            this.later(
                "pulse-clean",
                () => {

                    target.style.transition =
                        "";

                },
                duration + 50
            );

        },


        /* =================================================
           ZOOM
        ================================================= */

        zoom(
            options = {}
        ) {

            if (!this.motionEnabled) {
                return;
            }

            const target =
                this.el.sceneImage ||
                this.el.sceneVisual;

            if (!target) return;

            const scale =
                Number(
                    options.scale ?? 1.15
                );

            const duration =
                Number(
                    options.duration ?? 3500
                );

            target.style.transition =
                `transform ${duration}ms cubic-bezier(.2,.7,.2,1)`;

            target.style.transform =
                `scale(${scale})`;

            this.later(
                "zoom-clean",
                () => {

                    target.style.transform =
                        "";

                    target.style.transition =
                        "";

                },
                duration
            );

        },


        /* =================================================
           FADE
        ================================================= */

        fade(
            options = {}
        ) {

            const duration =
                Number(
                    options.duration ?? 700
                );

            const direction =
                options.direction ||
                "out";

            const target =
                options.target ||
                this.el.sceneVisual;

            if (!target) return;

            target.style.transition =
                `opacity ${duration}ms ease`;

            if (
                direction === "in"
            ) {

                target.style.opacity =
                    "0";

                requestAnimationFrame(
                    () => {

                        target.style.opacity =
                            "1";

                    }
                );

            } else {

                target.style.opacity =
                    "0";

                this.later(
                    "fade-in",
                    () => {

                        target.style.opacity =
                            "1";

                    },
                    duration
                );

            }

            this.later(
                "fade-clean",
                () => {

                    target.style.transition =
                        "";

                },
                duration + 100
            );

        },


        /* =================================================
           DANGER
        ================================================= */

        danger(
            options = {}
        ) {

            const duration =
                Number(
                    options.duration ?? 1800
                );

            const strength =
                Number(
                    options.strength ?? 1
                );

            this.addClass(
                this.el.body,
                "danger-mode"
            );

            if (
                this.el.sceneArea
            ) {

                this.el.sceneArea.style.filter =
                    `drop-shadow(
                        0 0 ${8 * strength}px
                        rgba(185,74,74,.22)
                    )`;

            }

            this.flash({
                duration:150,
                strength:.12 * strength
            });

            this.shake({
                duration:350,
                intensity:2.5 * strength
            });

            this.later(
                "danger",
                () => {

                    this.removeClass(
                        this.el.body,
                        "danger-mode"
                    );

                    if (
                        this.el.sceneArea
                    ) {

                        this.el.sceneArea.style.filter =
                            "";

                    }

                },
                duration
            );

        },


        /* =================================================
           FLICKER
        ================================================= */

        flicker(
            options = {}
        ) {

            if (!this.motionEnabled) {
                return;
            }

            const target =
                options.target ||
                this.el.sceneVisual;

            if (!target) return;

            const duration =
                Number(
                    options.duration ?? 1300
                );

            const count =
                Number(
                    options.count ?? 6
                );

            const original =
                target.style.opacity ||
                "1";

            let step = 0;

            const interval =
                Math.max(
                    50,
                    duration / count
                );

            const id =
                setInterval(
                    () => {

                        step++;

                        target.style.opacity =
                            step % 2 === 0
                                ? "1"
                                : ".45";

                        if (
                            step >= count
                        ) {

                            clearInterval(
                                id
                            );

                            target.style.opacity =
                                original;

                        }

                    },
                    interval
                );

            this.timers.set(
                "flicker",
                id
            );

        },


        /* =================================================
           HIDE / SHOW EFFECT
        ================================================= */

        clear(
            effect = null
        ) {

            if (
                !effect
            ) {

                this.clearAll();

                return;

            }

            switch (
                effect
            ) {

                case "fog":

                    if (
                        this.el.sceneFog
                    )
                        this.el.sceneFog.style.opacity =
                            "0";

                    if (
                        this.el.effectFog
                    )
                        this.el.effectFog.style.opacity =
                            "0";

                    this.removeClass(
                        this.el.body,
                        "fog-event"
                    );

                    break;


                case "wind":

                    if (
                        this.el.sceneWind
                    )
                        this.el.sceneWind.style.opacity =
                            "0";

                    this.removeClass(
                        this.el.body,
                        "wind-event"
                    );

                    break;


                case "light":

                    if (
                        this.el.sceneLight
                    )
                        this.el.sceneLight.style.opacity =
                            "0";

                    if (
                        this.el.effectLight
                    )
                        this.el.effectLight.style.opacity =
                            "0";

                    this.removeClass(
                        this.el.body,
                        "light-event"
                    );

                    break;


                case "rain":

                    if (
                        this.el.effectRain
                    )
                        this.el.effectRain.style.opacity =
                            "0";

                    this.removeClass(
                        this.el.body,
                        "rain-event"
                    );

                    break;


                case "darkness":

                    if (
                        this.el.effectDarkness
                    )
                        this.el.effectDarkness.style.opacity =
                            "0";

                    this.removeClass(
                        this.el.body,
                        "dark-mode"
                    );

                    break;


                case "shadow":

                    if (
                        this.el.effectShadow
                    ) {

                        this.el.effectShadow.style.opacity =
                            "0";

                        this.el.effectShadow.style.transform =
                            "translateX(-100%)";

                    }

                    this.removeClass(
                        this.el.body,
                        "shadow-event"
                    );

                    break;

            }

            this.activeEffects.delete(
                effect
            );

        },


        /* =================================================
           CLEAR EVERYTHING
        ================================================= */

        clearAll() {

            for (
                const id of this.timers.keys()
            ) {

                this.clearTimer(id);

            }

            const elements = [

                this.el.sceneFog,
                this.el.sceneWind,
                this.el.sceneLight,
                this.el.effectFlash,
                this.el.effectFog,
                this.el.effectShadow,
                this.el.effectLight,
                this.el.effectRain,
                this.el.effectDarkness,
                this.el.screenFlash

            ];

            elements.forEach(
                element => {

                    if (!element) return;

                    element.style.opacity =
                        "0";

                }
            );

            if (
                this.el.effectShadow
            ) {

                this.el.effectShadow.style.transform =
                    "translateX(-100%)";

            }

            this.el.body
                ?.classList
                .remove(
                    "fog-event",
                    "wind-event",
                    "light-event",
                    "rain-event",
                    "dark-mode",
                    "shadow-event",
                    "danger-mode"
                );

            if (
                this.el.sceneArea
            ) {

                this.el.sceneArea.style.transform =
                    "";

                this.el.sceneArea.style.filter =
                    "";

                this.el.sceneArea.style.animation =
                    "";

            }

            if (
                this.el.sceneImage
            ) {

                this.el.sceneImage.style.transition =
                    "";

            }

            this.activeEffects.clear();

        },


        /* =================================================
           PARTICLE PREPARATION
        ================================================= */

        prepareParticles() {

            const containers = [

                this.el.particles,
                this.el.sceneParticles

            ];

            containers.forEach(
                container => {

                    if (!container)
                        return;

                    if (
                        container.dataset.effectsReady
                    )
                        return;

                    container.dataset.effectsReady =
                        "true";

                }
            );

        },


        /* =================================================
           PARTICLE BURST
        ================================================= */

        particleBurst(
            options = {}
        ) {

            if (!this.motionEnabled)
                return;

            const container =
                options.container ||
                this.el.sceneParticles ||
                this.el.particles;

            if (!container)
                return;

            const amount =
                Math.max(
                    4,
                    Math.min(
                        40,
                        Number(
                            options.amount ?? 12
                        )
                    )
                );

            const lifetime =
                Number(
                    options.lifetime ?? 1100
                );

            for (
                let i = 0;
                i < amount;
                i++
            ) {

                const particle =
                    document.createElement(
                        "span"
                    );

                particle.style.position =
                    "absolute";

                particle.style.left =
                    (35 + Math.random() * 30) +
                    "%";

                particle.style.top =
                    (40 + Math.random() * 20) +
                    "%";

                particle.style.width =
                    (2 + Math.random() * 3) +
                    "px";

                particle.style.height =
                    particle.style.width;

                particle.style.borderRadius =
                    "50%";

                particle.style.background =
                    "rgba(242,211,139,.8)";

                particle.style.boxShadow =
                    "0 0 10px rgba(242,211,139,.35)";

                particle.style.pointerEvents =
                    "none";

                particle.style.zIndex =
                    "20";

                container.appendChild(
                    particle
                );

                const x =
                    (Math.random() - .5) *
                    260;

                const y =
                    (Math.random() - .5) *
                    220;

                particle.animate(
                    [
                        {
                            transform:
                                "translate(0,0) scale(1)",
                            opacity:0
                        },
                        {
                            transform:
                                "translate(0,0) scale(1.4)",
                            opacity:1
                        },
                        {
                            transform:
                                `translate(${x}px,${y}px) scale(.1)`,
                            opacity:0
                        }
                    ],
                    {
                        duration:
                            lifetime +
                            Math.random() * 500,

                        easing:
                            "cubic-bezier(.2,.7,.2,1)"
                    }
                ).finished
                .then(
                    () => {

                        particle.remove();

                    }
                )
                .catch(
                    () => {

                        particle.remove();

                    }
                );

            }

        },


        /* =================================================
           STORY EVENT ENGINE
        ================================================= */

        storyEvent(
            event,
            options = {}
        ) {

            if (!event)
                return;

            const type =
                typeof event === "string"
                    ? event
                    : event.type;

            const settings =
                typeof event === "object"
                    ? {
                        ...event,
                        ...options
                    }
                    : options;

            switch (
                String(type).toLowerCase()
            ) {

                case "fog":
                    this.fog(settings);
                    break;

                case "wind":
                    this.wind(settings);
                    break;

                case "light":
                case "glow":
                    this.light(settings);
                    break;

                case "flash":
                    this.flash(settings);
                    break;

                case "lightning":
                case "thunder":
                    this.lightning(settings);
                    break;

                case "dark":
                case "darkness":
                    this.darkness(settings);
                    break;

                case "shadow":
                case "shadow_pass":
                    this.shadow(settings);
                    break;

                case "rain":
                    this.rain(settings);
                    break;

                case "shake":
                case "quake":
                    this.shake(settings);
                    break;

                case "pulse":
                    this.pulse(settings);
                    break;

                case "zoom":
                    this.zoom(settings);
                    break;

                case "fade":
                    this.fade(settings);
                    break;

                case "danger":
                    this.danger(settings);
                    break;

                case "flicker":
                    this.flicker(settings);
                    break;

                case "particles":
                case "particle_burst":
                    this.particleBurst(settings);
                    break;

                case "clear":
                    this.clear(
                        settings.effect
                    );
                    break;

                case "clear_all":
                    this.clearAll();
                    break;

                default:

                    console.warn(
                        "Unknown story effect:",
                        type
                    );

            }

        },


        /* =================================================
           COMBO EFFECTS
        ================================================= */

        supernatural(
            options = {}
        ) {

            this.fog({
                duration:
                    options.duration ?? 5000,
                intensity:
                    options.fogIntensity ?? .8
            });

            this.light({
                duration:
                    options.duration ?? 5000,
                intensity:
                    options.lightIntensity ?? .55
            });

            this.particleBurst({
                amount:
                    options.particles ?? 14,
                lifetime:1300
            });

            this.zoom({
                scale:
                    options.zoom ?? 1.08,
                duration:
                    options.zoomDuration ?? 3500
            });

        },


        dangerSequence(
            options = {}
        ) {

            this.danger({
                duration:
                    options.duration ?? 2200,
                strength:
                    options.strength ?? 1
            });

            this.shadow({
                duration:1400,
                opacity:.85
            });

            this.shake({
                duration:450,
                intensity:3
            });

        },


        storm(
            options = {}
        ) {

            this.darkness({
                duration:
                    options.duration ?? 6000,
                intensity:.34
            });

            this.wind({
                duration:
                    options.duration ?? 6000,
                intensity:.9
            });

            this.rain({
                duration:
                    options.duration ?? 6000,
                intensity:.65
            });

            this.lightning({
                flashes:
                    options.flashes ?? 4,
                gap:
                    options.gap ?? 280,
                strength:.75
            });

        },


        mysteriousArrival(
            options = {}
        ) {

            this.darkness({
                duration:1400,
                intensity:.45
            });

            this.fog({
                duration:4500,
                intensity:.75
            });

            this.light({
                duration:3200,
                intensity:.70
            });

            this.particleBurst({
                amount:18,
                lifetime:1500
            });

            this.zoom({
                scale:1.10,
                duration:2800
            });

        },


        /* =================================================
           PUBLIC PLAY API
        ================================================= */

        play(
            type,
            options = {}
        ) {

            if (
                typeof type === "object"
            ) {

                return this.storyEvent(
                    type,
                    options
                );

            }

            const normalized =
                String(type)
                    .toLowerCase()
                    .trim();

            switch (
                normalized
            ) {

                case "supernatural":

                    return this.supernatural(
                        options
                    );

                case "danger_sequence":

                    return this.dangerSequence(
                        options
                    );

                case "storm":

                    return this.storm(
                        options
                    );

                case "mysterious_arrival":

                    return this.mysteriousArrival(
                        options
                    );

                default:

                    return this.storyEvent(
                        normalized,
                        options
                    );

            }

        }

    };


    /* =====================================================
       GLOBAL EXPORT
    ===================================================== */

    window.Effects =
        Effects;

    window.CinematicEffects =
        Effects;


    /* =====================================================
       AUTO INIT
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            () => Effects.init(),
            {
                once:true
            }
        );

    } else {

        Effects.init();

    }

})();