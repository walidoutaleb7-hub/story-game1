
/* =========================================================
   ظلال المجهول — SHADOWS OF THE UNKNOWN
   effects.js — CINEMATIC EFFECTS ENGINE ULTRA
   ========================================================= */

(() => {
  "use strict";

  const $ = id => document.getElementById(id);

  const wait = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

  const clamp = (n, min, max) =>
    Math.max(min, Math.min(max, n));

  let initialized = false;
  let motionEnabled = true;
  let effectCounter = 0;

  /* =======================================================
     HELPERS
     ======================================================= */

  function getSceneArea() {
    return $("sceneArea");
  }

  function getLayer(id, className = "") {
    let el = $(id);

    if (!el && className) {
      el = document.createElement("div");
      el.id = id;
      el.className = className;

      const parent =
        $("sceneArea") ||
        $("gameScreen") ||
        document.body;

      parent.appendChild(el);
    }

    return el;
  }

  function addClass(el, className) {
    if (!el || !className) return;
    el.classList.add(className);
  }

  function removeClass(el, className) {
    if (!el || !className) return;
    el.classList.remove(className);
  }

  function setCSS(el, property, value) {
    if (!el) return;
    el.style[property] = value;
  }

  function createFlash() {
    let flash = $("effectFlash");

    if (!flash) {
      flash = document.createElement("div");
      flash.id = "effectFlash";

      Object.assign(flash.style, {
        position: "fixed",
        inset: "0",
        zIndex: "9998",
        pointerEvents: "none",
        opacity: "0",
        background: "#ffffff",
        transition: "opacity .18s ease"
      });

      document.body.appendChild(flash);
    }

    return flash;
  }

  function flash(
    opacity = 0.35,
    duration = 180
  ) {
    const el = createFlash();

    if (!el) return;

    el.style.transition =
      `opacity ${Math.max(40, duration / 2)}ms ease`;

    el.style.opacity =
      String(clamp(opacity, 0, 1));

    setTimeout(() => {
      el.style.opacity = "0";
    }, Math.max(40, duration / 2));
  }

  /* =======================================================
     SHAKE
     ======================================================= */

  function shake(options = {}) {
    const target =
      options.target ||
      getSceneArea() ||
      $("gameScreen");

    if (!target) return;

    const duration =
      Number(options.duration) || 400;

    if (!motionEnabled) return;

    const animationName =
      `shadowShake_${++effectCounter}`;

    const style =
      document.createElement("style");

    style.dataset.effect =
      animationName;

    style.textContent = `
      @keyframes ${animationName}{
        0%{
          transform:translate3d(0,0,0);
        }
        15%{
          transform:translate3d(-8px,2px,0);
        }
        30%{
          transform:translate3d(8px,-2px,0);
        }
        45%{
          transform:translate3d(-6px,1px,0);
        }
        60%{
          transform:translate3d(6px,-1px,0);
        }
        75%{
          transform:translate3d(-3px,0,0);
        }
        100%{
          transform:translate3d(0,0,0);
        }
      }
    `;

    document.head.appendChild(style);

    target.style.animation =
      `${animationName} ${duration}ms cubic-bezier(.36,.07,.19,.97)`;

    setTimeout(() => {
      target.style.animation = "";
      style.remove();
    }, duration + 50);
  }

  /* =======================================================
     DANGER
     ======================================================= */

  function danger(options = {}) {
    const scene = getSceneArea();

    if (scene) {
      addClass(scene, "danger-mode");

      setTimeout(() => {
        removeClass(scene, "danger-mode");
      }, Number(options.duration) || 700);
    }

    flash(
      options.flashOpacity ?? 0.18,
      180
    );

    if (motionEnabled) {
      shake({
        duration:
          Math.min(
            Number(options.duration) || 500,
            550
          )
      });
    }
  }

  /* =======================================================
     DARKNESS
     ======================================================= */

  function darkness(options = {}) {
    const layer =
      getLayer(
        "effectDarkness",
        "effect-darkness"
      );

    if (!layer) return;

    const duration =
      Number(options.duration) || 900;

    Object.assign(layer.style, {
      position: "fixed",
      inset: "0",
      zIndex: "9990",
      pointerEvents: "none",
      background:
        "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,.88) 100%)",
      opacity: "0",
      transition:
        `opacity ${duration / 2}ms ease`
    });

    requestAnimationFrame(() => {
      layer.style.opacity = "1";
    });

    setTimeout(() => {
      layer.style.opacity = "0";
    }, duration / 2);
  }

  /* =======================================================
     LIGHT
     ======================================================= */

  function light(options = {}) {
    const layer =
      getLayer(
        "effectLight",
        "effect-light"
      );

    if (!layer) return;

    const duration =
      Number(options.duration) || 900;

    Object.assign(layer.style, {
      position: "fixed",
      inset: "0",
      zIndex: "9988",
      pointerEvents: "none",
      background:
        "radial-gradient(circle at 50% 45%, rgba(255,240,185,.42), rgba(255,220,120,.08) 35%, transparent 72%)",
      opacity: "0",
      transition:
        `opacity ${duration / 2}ms ease`
    });

    requestAnimationFrame(() => {
      layer.style.opacity = "1";
    });

    setTimeout(() => {
      layer.style.opacity = "0";
    }, duration / 2);
  }

  /* =======================================================
     FOG
     ======================================================= */

  function fog(options = {}) {
    const layer =
      getLayer(
        "effectFog",
        "effect-fog"
      );

    if (!layer) return;

    const duration =
      Number(options.duration) || 1200;

    Object.assign(layer.style, {
      position: "fixed",
      inset: "0",
      zIndex: "9985",
      pointerEvents: "none",
      background:
        "linear-gradient(90deg, rgba(210,220,235,.16), rgba(255,255,255,.04), rgba(210,220,235,.16))",
      filter: "blur(18px)",
      opacity: "0",
      transform: "scale(1.08)",
      transition:
        `opacity ${duration / 2}ms ease, transform ${duration}ms ease`
    });

    requestAnimationFrame(() => {
      layer.style.opacity = ".8";
      layer.style.transform = "scale(1)";
    });

    setTimeout(() => {
      layer.style.opacity = "0";
    }, duration);
  }

  /* =======================================================
     WIND
     ======================================================= */

  function wind(options = {}) {
    const scene =
      getSceneArea();

    if (!scene || !motionEnabled) return;

    const duration =
      Number(options.duration) || 900;

    addClass(scene, "wind-event");

    setTimeout(() => {
      removeClass(scene, "wind-event");
    }, duration);
  }

  /* =======================================================
     RAIN
     ======================================================= */

  function rain(options = {}) {
    const layer =
      getLayer(
        "effectRain",
        "effect-rain"
      );

    if (!layer) return;

    const duration =
      Number(options.duration) || 1800;

    Object.assign(layer.style, {
      position: "fixed",
      inset: "0",
      zIndex: "9982",
      pointerEvents: "none",
      opacity: "0",
      backgroundImage:
        "repeating-linear-gradient(105deg, transparent 0 18px, rgba(180,210,255,.16) 19px, transparent 20px 34px)",
      backgroundSize: "55px 55px",
      animation:
        motionEnabled
          ? "shadowRainMove .55s linear infinite"
          : "none",
      transition:
        "opacity .35s ease"
    });

    requestAnimationFrame(() => {
      layer.style.opacity = ".8";
    });

    setTimeout(() => {
      layer.style.opacity = "0";

      setTimeout(() => {
        layer.style.animation = "none";
      }, 400);
    }, duration);
  }

  /* =======================================================
     SHADOW
     ======================================================= */

  function shadow(options = {}) {
    const layer =
      getLayer(
        "effectShadow",
        "effect-shadow"
      );

    if (!layer) return;

    const duration =
      Number(options.duration) || 1200;

    Object.assign(layer.style, {
      position: "fixed",
      inset: "0",
      zIndex: "9987",
      pointerEvents: "none",
      background:
        "radial-gradient(ellipse at 50% 50%, transparent 15%, rgba(0,0,0,.45) 70%, rgba(0,0,0,.82) 100%)",
      opacity: "0",
      transition:
        `opacity ${duration / 2}ms ease`
    });

    requestAnimationFrame(() => {
      layer.style.opacity = "1";
    });

    setTimeout(() => {
      layer.style.opacity = "0";
    }, duration / 2);
  }

  /* =======================================================
     FADE
     ======================================================= */

  function fade(options = {}) {
    const duration =
      Number(options.duration) || 700;

    const transition =
      $("sceneTransition");

    if (transition) {
      transition.classList.add("active");

      setTimeout(() => {
        transition.classList.remove("active");
      }, duration);

      return;
    }

    const overlay =
      document.createElement("div");

    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "9999";
    overlay.style.pointerEvents = "none";
    overlay.style.background = "#020308";
    overlay.style.opacity = "0";
    overlay.style.transition =
      `opacity ${duration / 2}ms ease`;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
    });

    setTimeout(() => {
      overlay.style.opacity = "0";

      setTimeout(() => {
        overlay.remove();
      }, duration / 2 + 50);
    }, duration / 2);
  }

  /* =======================================================
     SUPERNATURAL
     ======================================================= */

  function supernatural(options = {}) {
    const duration =
      Number(options.duration) || 1200;

    light({
      duration
    });

    shadow({
      duration
    });

    if (motionEnabled) {
      shake({
        duration:
          Math.min(duration, 500)
      });
    }

    flash(
      0.12,
      220
    );
  }

  /* =======================================================
     GENERIC PLAY
     ======================================================= */

  async function play(
    type,
    options = {}
  ) {
    type =
      String(
        type ||
        "fade"
      ).toLowerCase();

    switch (type) {
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

      case "fade":
        return fade(options);

      case "supernatural":
      case "supernatural-event":
        return supernatural(options);

      case "flash":
        return flash(
          options.opacity ?? 0.3,
          options.duration ?? 180
        );

      default:
        return fade(options);
    }
  }

  /* =======================================================
     STORY EVENT
     ======================================================= */

  function storyEvent(
    event,
    options = {}
  ) {
    if (!event) return;

    if (Array.isArray(event)) {
      event.forEach(item => {
        if (typeof item === "string") {
          play(item, options);
        } else if (
          item &&
          typeof item === "object"
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

    if (typeof event === "string") {
      play(
        event,
        options
      );

      return;
    }

    if (
      typeof event === "object"
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

  /* =======================================================
     MOTION
     ======================================================= */

  function setMotion(enabled) {
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
            *::after{
              animation-duration:.001ms!important;
              animation-iteration-count:1!important;
              transition-duration:.001ms!important;
              scroll-behavior:auto!important;
            }
          `;
    }
  }

  /* =======================================================
     INIT
     ======================================================= */

  function init() {
    if (initialized) {
      return;
    }

    initialized = true;

    if (!$("effectsMotionStyle")) {
      const style =
        document.createElement("style");

      style.id =
        "effectsMotionStyle";

      document.head.appendChild(style);
    }

    if (!$("effectRain")) {
      getLayer(
        "effectRain",
        "effect-rain"
      );
    }

    if (!$("effectFog")) {
      getLayer(
        "effectFog",
        "effect-fog"
      );
    }

    if (!$("effectShadow")) {
      getLayer(
        "effectShadow",
        "effect-shadow"
      );
    }

    if (!$("effectLight")) {
      getLayer(
        "effectLight",
        "effect-light"
      );
    }

    if (!$("effectDarkness")) {
      getLayer(
        "effectDarkness",
        "effect-darkness"
      );
    }

    setMotion(
      motionEnabled
    );
  }

  /* =======================================================
     PUBLIC API
     ======================================================= */

  window.Effects = {
    init,
    play,
    storyEvent,
    setMotion,

    shake,
    danger,
    darkness,
    light,
    fog,
    wind,
    rain,
    shadow,
    fade,
    supernatural,

    get motionEnabled() {
      return motionEnabled;
    }
  };

  /* =======================================================
     GLOBAL EFFECT ANIMATION
     ======================================================= */

  const style =
    document.createElement("style");

  style.id =
    "shadowEffectsKeyframes";

  style.textContent = `
    @keyframes shadowRainMove{
      from{
        background-position:0 0;
      }
      to{
        background-position:-40px 90px;
      }
    }

    @keyframes shadowPulse{
      0%,100%{
        opacity:.2;
      }
      50%{
        opacity:.8;
      }
    }

    .reduced-motion *,
    .reduced-motion *::before,
    .reduced-motion *::after{
      animation-duration:.001ms!important;
      animation-iteration-count:1!important;
      transition-duration:.001ms!important;
    }
  `;

  if (!document.getElementById(style.id)) {
    document.head.appendChild(style);
  }

})();