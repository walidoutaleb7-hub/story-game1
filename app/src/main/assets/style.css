/* =========================================================
   ظلال المجهول — SHADOWS OF THE UNKNOWN
   STYLE ENGINE — ULTRA V3
   CINEMATIC ANIME / DARK MYSTERY / MOBILE FIRST
   ========================================================= */

@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap');

/* =========================================================
   ROOT
   ========================================================= */

:root{
    --bg:#02040a;
    --bg2:#060a14;
    --bg3:#0b1220;

    --panel:rgba(8,13,25,.88);
    --panel-strong:rgba(5,9,18,.97);
    --panel-soft:rgba(17,26,45,.72);

    --glass:rgba(255,255,255,.055);
    --glass-hover:rgba(255,255,255,.09);

    --line:rgba(255,255,255,.09);
    --line-light:rgba(255,255,255,.16);

    --text:#f7f8ff;
    --text-soft:#c2c9da;
    --text-muted:#788298;

    --gold:#e8bd67;
    --gold-light:#ffe8ae;
    --gold-dark:#9a702c;

    --blue:#6d9fff;
    --blue-light:#a9caff;

    --red:#e75e6c;
    --red-light:#ff8c98;

    --green:#68d5a2;

    --shadow:rgba(0,0,0,.65);

    --radius-sm:10px;
    --radius:18px;
    --radius-lg:27px;
    --radius-xl:36px;

    --safe-top:env(safe-area-inset-top,0px);
    --safe-bottom:env(safe-area-inset-bottom,0px);

    --ease:cubic-bezier(.22,.8,.25,1);
    --ease-soft:cubic-bezier(.16,1,.3,1);
}


/* =========================================================
   RESET
   ========================================================= */

*,
*::before,
*::after{
    box-sizing:border-box;
    margin:0;
    padding:0;
    -webkit-tap-highlight-color:transparent;
}

html{
    width:100%;
    height:100%;
    overflow:hidden;
    background:#02040a;
}

body{
    width:100%;
    height:100%;
    overflow:hidden;

    color:var(--text);

    font-family:"Cairo",sans-serif;
    direction:rtl;

    background:
        radial-gradient(
            circle at 50% 15%,
            rgba(65,91,145,.16),
            transparent 38%
        ),
        linear-gradient(
            180deg,
            #02040a 0%,
            #060b16 50%,
            #02040a 100%
        );

    -webkit-font-smoothing:antialiased;
    text-rendering:optimizeLegibility;
}

button,
input,
textarea,
select{
    font-family:inherit;
}

button{
    border:0;
    outline:0;
    cursor:pointer;
    color:inherit;
}

img{
    display:block;
    max-width:100%;
}

.hidden,
[hidden]{
    display:none!important;
}


/* =========================================================
   APP
   ========================================================= */

#app{
    position:relative;

    width:100%;
    height:100%;
    min-height:100%;

    overflow:hidden;
    isolation:isolate;

    background:#02040a;
}


/* =========================================================
   AMBIENT BACKGROUND
   ========================================================= */

#ambientBackground{
    position:fixed;
    inset:0;

    z-index:-20;

    overflow:hidden;
    pointer-events:none;

    background:
        radial-gradient(
            ellipse at 50% 12%,
            rgba(75,105,170,.24),
            rgba(32,49,82,.10) 30%,
            transparent 62%
        ),
        linear-gradient(
            180deg,
            #02040a 0%,
            #080f1d 40%,
            #111b2b 65%,
            #02040a 100%
        );
}


/* =========================================================
   SKY
   ========================================================= */

.mountain-sky{
    position:absolute;
    inset:0;

    background:
        radial-gradient(
            circle at 76% 18%,
            rgba(222,232,255,.19) 0,
            rgba(139,169,221,.08) 10%,
            transparent 27%
        ),
        radial-gradient(
            circle at 25% 30%,
            rgba(78,111,176,.12),
            transparent 31%
        ),
        linear-gradient(
            180deg,
            #02040a 0%,
            #091120 35%,
            #142238 60%,
            #080d17 100%
        );
}


/* =========================================================
   STARS
   ========================================================= */

.mountain-sky::before{
    content:"";

    position:absolute;
    inset:0;

    background-image:
        radial-gradient(circle,rgba(255,255,255,.85) 0 1px,transparent 1.5px),
        radial-gradient(circle,rgba(185,211,255,.55) 0 1px,transparent 1.5px),
        radial-gradient(circle,rgba(255,228,172,.45) 0 1px,transparent 1.5px);

    background-size:
        97px 113px,
        151px 137px,
        211px 191px;

    background-position:
        12px 28px,
        70px 80px,
        20px 10px;

    opacity:.52;

    animation:starsDrift 30s linear infinite;
}

@keyframes starsDrift{
    from{transform:translateY(0);}
    to{transform:translateY(30px);}
}


/* =========================================================
   MOON
   ========================================================= */

.moon-glow{
    position:absolute;

    width:175px;
    height:175px;

    top:8%;
    left:14%;

    border-radius:50%;

    background:
        radial-gradient(
            circle,
            rgba(248,250,255,.96) 0 7%,
            rgba(211,225,249,.82) 10%,
            rgba(164,191,231,.27) 32%,
            rgba(125,158,211,.09) 50%,
            transparent 72%
        );

    opacity:.75;

    animation:moonFloat 8s ease-in-out infinite;
}

@keyframes moonFloat{
    0%,100%{
        transform:translateY(0) scale(1);
    }

    50%{
        transform:translateY(-5px) scale(1.025);
    }
}


/* =========================================================
   ANIME MOUNTAINS
   ========================================================= */

.mountain-layer{
    position:absolute;

    left:-10%;
    right:-10%;
    bottom:-4%;

    pointer-events:none;

    transform-origin:center bottom;
    will-change:transform;
}


/* BACK MOUNTAIN */

.mountain-back{
    height:58%;
    opacity:.48;

    background:
        linear-gradient(
            155deg,
            transparent 0 28%,
            rgba(38,57,91,.75) 28.2% 36%,
            transparent 36.2%
        ),
        linear-gradient(
            205deg,
            transparent 0 31%,
            rgba(27,44,73,.92) 31.2% 43%,
            transparent 43.2%
        ),
        linear-gradient(
            166deg,
            transparent 0 42%,
            rgba(48,67,101,.62) 42.2% 54%,
            transparent 54.2%
        );

    clip-path:polygon(
        0 76%,
        8% 66%,
        16% 72%,
        25% 49%,
        34% 61%,
        44% 37%,
        52% 56%,
        62% 43%,
        70% 64%,
        80% 40%,
        88% 59%,
        96% 47%,
        100% 54%,
        100% 100%,
        0 100%
    );

    filter:blur(.35px);
}


/* MID MOUNTAIN */

.mountain-mid{
    height:48%;
    opacity:.7;

    background:
        linear-gradient(
            180deg,
            rgba(27,41,65,.05),
            rgba(4,8,16,.97)
        );

    clip-path:polygon(
        0 70%,
        7% 60%,
        15% 67%,
        24% 38%,
        31% 57%,
        40% 27%,
        48% 51%,
        56% 34%,
        66% 63%,
        75% 43%,
        84% 57%,
        93% 32%,
        100% 52%,
        100% 100%,
        0 100%
    );

    box-shadow:0 -20px 80px rgba(0,0,0,.25);
}


/* FRONT MOUNTAIN */

.mountain-front{
    height:39%;

    background:
        linear-gradient(
            180deg,
            rgba(3,6,12,.04),
            rgba(1,3,7,1)
        );

    clip-path:polygon(
        0 62%,
        11% 49%,
        18% 58%,
        29% 30%,
        36% 51%,
        46% 23%,
        53% 48%,
        63% 31%,
        72% 57%,
        81% 37%,
        90% 54%,
        100% 42%,
        100% 100%,
        0 100%
    );

    box-shadow:0 -25px 100px rgba(0,0,0,.72);
}


/* =========================================================
   HORIZON
   ========================================================= */

.golden-horizon{
    position:absolute;

    left:-20%;
    right:-20%;
    bottom:25%;

    height:18%;

    background:
        radial-gradient(
            ellipse at center,
            rgba(232,189,103,.22),
            rgba(190,146,61,.065) 34%,
            transparent 72%
        );

    filter:blur(18px);

    opacity:.65;

    animation:horizonPulse 9s ease-in-out infinite;
}

@keyframes horizonPulse{
    0%,100%{
        opacity:.42;
        transform:scaleX(1);
    }

    50%{
        opacity:.72;
        transform:scaleX(1.08);
    }
}


/* =========================================================
   AMBIENT GRADIENT
   ========================================================= */

.ambient-gradient{
    position:absolute;
    inset:0;

    background:
        linear-gradient(
            90deg,
            rgba(2,5,11,.65),
            transparent 25%,
            transparent 75%,
            rgba(2,5,11,.65)
        ),
        linear-gradient(
            180deg,
            transparent 48%,
            rgba(0,0,0,.58) 100%
        );
}


/* =========================================================
   FOG
   ========================================================= */

.fog-one,
.fog-two,
.fog-three,
.fog-four{
    position:absolute;

    width:78%;
    height:24%;

    border-radius:50%;

    background:
        radial-gradient(
            ellipse,
            rgba(194,210,235,.12),
            rgba(143,168,207,.045) 38%,
            transparent 72%
        );

    filter:blur(25px);
}

.fog-one{
    right:-16%;
    bottom:22%;

    animation:fogOne 18s ease-in-out infinite alternate;
}

.fog-two{
    left:-20%;
    bottom:34%;

    opacity:.66;

    animation:fogTwo 23s ease-in-out infinite alternate;
}

.fog-three{
    right:10%;
    bottom:48%;

    opacity:.32;

    transform:scale(1.2);

    animation:fogThree 27s ease-in-out infinite alternate;
}

.fog-four{
    left:15%;
    bottom:10%;

    opacity:.36;

    transform:scale(1.5);

    animation:fogFour 21s ease-in-out infinite alternate;
}

@keyframes fogOne{
    from{transform:translateX(0) scale(1);}
    to{transform:translateX(-13%) scale(1.15);}
}

@keyframes fogTwo{
    from{transform:translateX(0) scale(1);}
    to{transform:translateX(16%) scale(1.12);}
}

@keyframes fogThree{
    from{transform:translateX(0);}
    to{transform:translateX(-12%);}
}

@keyframes fogFour{
    from{transform:translateX(0);}
    to{transform:translateX(10%);}
}


/* =========================================================
   WIND
   ========================================================= */

#windLayer{
    position:absolute;
    inset:0;

    opacity:.17;

    background:
        repeating-linear-gradient(
            -15deg,
            transparent 0 80px,
            rgba(194,215,246,.05) 81px,
            transparent 83px 150px
        );

    transform:translateX(-20%);

    animation:windFlow 12s linear infinite;
}

@keyframes windFlow{
    from{transform:translateX(-20%);}
    to{transform:translateX(20%);}
}


/* =========================================================
   AMBIENT LIGHT
   ========================================================= */

.ambient-light{
    position:absolute;
    inset:0;

    background:
        radial-gradient(
            circle at 70% 35%,
            rgba(94,129,191,.10),
            transparent 32%
        ),
        radial-gradient(
            circle at 20% 70%,
            rgba(211,163,82,.055),
            transparent 28%
        );
}


/* =========================================================
   VIGNETTE
   ========================================================= */

.vignette{
    position:absolute;
    inset:0;

    background:
        radial-gradient(
            ellipse at center,
            transparent 32%,
            rgba(0,0,0,.18) 60%,
            rgba(0,0,0,.82) 100%
        );
}


/* =========================================================
   PARTICLES
   ========================================================= */

#particles{
    position:fixed;
    inset:0;

    z-index:-5;

    overflow:hidden;
    pointer-events:none;
}

#particles::before,
#particles::after{
    content:"";

    position:absolute;

    width:3px;
    height:3px;

    border-radius:50%;

    background:rgba(255,255,255,.7);

    box-shadow:
        13vw 11vh rgba(255,255,255,.4),
        29vw 23vh rgba(255,231,180,.35),
        46vw 8vh rgba(190,214,255,.42),
        61vw 31vh rgba(255,255,255,.35),
        78vw 16vh rgba(190,214,255,.4),
        91vw 44vh rgba(255,231,180,.3),
        19vw 58vh rgba(255,255,255,.3),
        39vw 72vh rgba(180,208,255,.32),
        67vw 67vh rgba(255,255,255,.35),
        83vw 82vh rgba(255,232,186,.3),
        8vw 88vh rgba(185,209,255,.28);

    animation:particleFloat 13s ease-in-out infinite alternate;
}

#particles::after{
    width:2px;
    height:2px;
    opacity:.55;

    animation-duration:19s;
    animation-delay:-7s;
}

@keyframes particleFloat{
    from{transform:translateY(14px);}
    to{transform:translateY(-22px);}
}


/* =========================================================
   SCREENS
   ========================================================= */

.screen{
    position:absolute;
    inset:0;

    width:100%;
    height:100%;

    overflow:hidden;

    transition:
        opacity .45s var(--ease),
        visibility .45s var(--ease),
        transform .45s var(--ease);
}


/* =========================================================
   LOADING
   ========================================================= */

.loading-screen{
    z-index:1000;

    display:flex;
    align-items:center;
    justify-content:center;

    background:
        radial-gradient(
            circle at center,
            rgba(30,48,81,.35),
            transparent 48%
        ),
        #02040a;
}

.loading-content{
    width:min(390px,88vw);

    display:flex;
    flex-direction:column;
    align-items:center;

    text-align:center;
}

.loading-symbol{
    width:78px;
    height:78px;

    display:flex;
    align-items:center;
    justify-content:center;

    margin-bottom:22px;

    border:1px solid rgba(232,189,103,.35);
    border-radius:24px;

    background:
        linear-gradient(
            145deg,
            rgba(232,189,103,.14),
            rgba(255,255,255,.025)
        );

    box-shadow:
        0 0 50px rgba(232,189,103,.09),
        inset 0 0 25px rgba(255,255,255,.025);

    animation:loadingPulse 2.4s ease-in-out infinite;
}

.loading-symbol span{
    color:var(--gold-light);

    font-size:35px;
    font-weight:800;

    text-shadow:
        0 0 25px rgba(232,189,103,.6);
}

@keyframes loadingPulse{
    0%,100%{
        transform:scale(1);
        box-shadow:0 0 45px rgba(232,189,103,.08);
    }

    50%{
        transform:scale(1.045);
        box-shadow:0 0 70px rgba(232,189,103,.16);
    }
}

.loading-title{
    font-size:29px;
    font-weight:900;
    letter-spacing:1px;
}

.loading-subtitle{
    margin-top:4px;

    color:var(--text-muted);

    font-size:10px;
    letter-spacing:4px;
    direction:ltr;
}

.loading-line{
    width:100%;
    height:4px;

    margin-top:35px;

    overflow:hidden;

    border-radius:99px;

    background:rgba(255,255,255,.07);
}

#loadingProgress{
    width:0;
    height:100%;

    border-radius:inherit;

    background:
        linear-gradient(
            90deg,
            var(--gold-dark),
            var(--gold-light)
        );

    box-shadow:
        0 0 18px rgba(232,189,103,.45);

    transition:width .35s ease;
}

#loadingStatus{
    margin-top:12px;

    color:var(--text-muted);

    font-size:12px;
}


/* =========================================================
   START SCREEN
   ========================================================= */

.start-screen{
    z-index:20;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:
        calc(24px + var(--safe-top))
        18px
        calc(24px + var(--safe-bottom));

    overflow-y:auto;
}

.start-content{
    position:relative;

    width:min(480px,100%);

    display:flex;
    flex-direction:column;
    align-items:center;

    text-align:center;

    padding:26px 0;
}


/* =========================================================
   LOGO
   ========================================================= */

.logo-wrapper{
    position:relative;

    margin-bottom:18px;
}

.logo-glow{
    position:absolute;

    width:210px;
    height:110px;

    top:50%;
    left:50%;

    transform:translate(-50%,-50%);

    background:
        radial-gradient(
            ellipse,
            rgba(232,189,103,.16),
            transparent 70%
        );

    filter:blur(18px);

    pointer-events:none;
}

.game-logo{
    position:relative;

    display:flex;
    flex-direction:column;
    align-items:center;

    filter:
        drop-shadow(0 12px 25px rgba(0,0,0,.55));
}

.logo-symbol{
    width:58px;
    height:58px;

    display:flex;
    align-items:center;
    justify-content:center;

    margin-bottom:9px;

    border:1px solid rgba(232,189,103,.38);
    border-radius:19px;

    color:var(--gold-light);

    font-size:25px;

    background:
        linear-gradient(
            145deg,
            rgba(232,189,103,.14),
            rgba(255,255,255,.025)
        );

    box-shadow:
        inset 0 0 20px rgba(255,255,255,.025),
        0 0 30px rgba(232,189,103,.08);
}

.logo-main{
    font-size:48px;
    line-height:1;

    font-weight:900;
    letter-spacing:-2px;

    color:#fff;

    text-shadow:
        0 2px 0 rgba(0,0,0,.5),
        0 0 35px rgba(255,255,255,.08);
}

.logo-secondary{
    margin-top:3px;

    color:var(--gold);

    font-size:27px;
    font-weight:800;

    letter-spacing:2px;

    text-shadow:
        0 0 25px rgba(232,189,103,.18);
}

#gameSubtitle{
    max-width:330px;

    color:var(--text-soft);

    font-size:14px;
    line-height:1.9;
}

.start-divider{
    width:min(330px,82vw);

    display:flex;
    align-items:center;
    gap:12px;

    margin:25px 0 23px;

    color:var(--gold);

    font-size:11px;
    letter-spacing:2px;
}

.start-divider span{
    flex:1;
    height:1px;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(232,189,103,.38)
        );
}

.start-divider span:last-child{
    background:
        linear-gradient(
            90deg,
            rgba(232,189,103,.38),
            transparent
        );
}

.start-divider i{
    font-style:normal;
    opacity:.75;
}


/* =========================================================
   BUTTON SYSTEM
   ========================================================= */

.start-buttons{
    width:min(370px,92vw);

    display:flex;
    flex-direction:column;
    gap:11px;
}

.main-button{
    position:relative;

    width:100%;
    min-height:58px;

    display:flex;
    align-items:center;
    justify-content:center;
    gap:11px;

    padding:14px 20px;

    border:1px solid var(--line-light);
    border-radius:17px;

    color:var(--text);

    background:
        linear-gradient(
            135deg,
            rgba(255,255,255,.075),
            rgba(255,255,255,.025)
        );

    box-shadow:
        0 10px 25px rgba(0,0,0,.25),
        inset 0 1px 0 rgba(255,255,255,.055);

    font-size:15px;
    font-weight:800;

    transition:
        transform .2s var(--ease),
        border-color .2s ease,
        background .2s ease,
        box-shadow .2s ease;

    overflow:hidden;
}

.main-button::before{
    content:"";

    position:absolute;

    top:0;
    bottom:0;
    right:-100%;

    width:80%;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.08),
            transparent
        );

    transform:skewX(-20deg);

    transition:right .65s ease;
}

.main-button:hover::before,
.main-button:active::before{
    right:120%;
}

.main-button:active{
    transform:scale(.975);
}

.primary-button{
    border-color:rgba(232,189,103,.45);

    color:#111;

    background:
        linear-gradient(
            135deg,
            #ffe4a0,
            #d9a94f
        );

    box-shadow:
        0 12px 30px rgba(232,189,103,.16),
        inset 0 1px 0 rgba(255,255,255,.6);
}

.primary-button:hover{
    box-shadow:
        0 15px 38px rgba(232,189,103,.24),
        inset 0 1px 0 rgba(255,255,255,.7);
}

.secondary-button{
    background:
        rgba(255,255,255,.045);
}

.continue-button{
    display:none;
}


/* =========================================================
   CSS ICONS
   ========================================================= */

.icon-play,
.icon-spark,
.icon-volume,
.icon-heart,
.icon-coin,
.icon-chapter,
.icon-bag,
.icon-trophy,
.icon-journal,
.icon-settings,
.icon-item{
    position:relative;

    width:20px;
    height:20px;

    display:inline-flex;
    align-items:center;
    justify-content:center;

    flex:none;
}

.icon-play::before{
    content:"";

    width:0;
    height:0;

    border-top:7px solid transparent;
    border-bottom:7px solid transparent;
    border-right:0;
    border-left:10px solid currentColor;

    margin-left:2px;
}

.icon-spark::before{
    content:"✦";
    font-size:21px;
    line-height:1;
}

.icon-volume::before{
    content:"◖";
    font-size:20px;
}

.icon-heart::before{
    content:"♥";
    font-size:18px;
}

.icon-coin::before{
    content:"●";
    font-size:18px;
}

.icon-chapter::before{
    content:"01";
    font-size:9px;
    font-weight:900;

    width:20px;
    height:20px;

    display:flex;
    align-items:center;
    justify-content:center;

    border:1px solid currentColor;
    border-radius:6px;
}

.icon-bag::before{
    content:"";
    width:16px;
    height:13px;

    border:2px solid currentColor;
    border-radius:4px;

    position:absolute;
    bottom:1px;
}

.icon-bag::after{
    content:"";
    position:absolute;

    width:8px;
    height:6px;

    top:1px;

    border:2px solid currentColor;
    border-bottom:0;

    border-radius:5px 5px 0 0;
}

.icon-trophy::before{
    content:"♛";
    font-size:19px;
}

.icon-journal::before{
    content:"";
    width:14px;
    height:17px;

    border:2px solid currentColor;
    border-radius:3px;
}

.icon-settings::before{
    content:"⚙";
    font-size:20px;
}

.icon-item::before{
    content:"◇";
    font-size:19px;
}


/* =========================================================
   START FOOTER
   ========================================================= */

.start-footer{
    display:flex;
    align-items:center;
    gap:9px;

    margin-top:24px;

    color:var(--text-muted);

    font-size:10px;
}

.footer-dot{
    color:var(--gold);
}


/* =========================================================
   GAME SCREEN
   ========================================================= */

.game-screen{
    z-index:10;

    display:flex;
    flex-direction:column;

    padding:
        calc(8px + var(--safe-top))
        12px
        calc(78px + var(--safe-bottom));

    overflow:hidden;
}


/* =========================================================
   GAME HEADER
   ========================================================= */

.game-header{
    position:relative;

    width:100%;
    min-height:52px;

    display:grid;
    grid-template-columns:48px 1fr 48px;
    align-items:center;

    flex:none;

    z-index:30;
}

.hud-button{
    width:44px;
    height:44px;

    display:flex;
    align-items:center;
    justify-content:center;

    border:1px solid var(--line);
    border-radius:14px;

    background:
        rgba(8,13,25,.74);

    box-shadow:
        0 8px 20px rgba(0,0,0,.24),
        inset 0 1px 0 rgba(255,255,255,.04);

    transition:
        transform .2s ease,
        background .2s ease,
        border-color .2s ease;
}

.hud-button:active{
    transform:scale(.93);
}

.hud-button:hover{
    border-color:rgba(232,189,103,.32);
    background:rgba(20,28,46,.88);
}

.hamburger-icon{
    width:19px;

    display:flex;
    flex-direction:column;
    gap:4px;
}

.hamburger-icon i{
    width:100%;
    height:2px;

    display:block;

    border-radius:10px;

    background:var(--text-soft);
}

.chapter-header{
    min-width:0;

    text-align:center;
}

.chapter-label{
    color:var(--gold);

    font-size:9px;
    font-weight:800;

    letter-spacing:2px;
}

.chapter-title-top{
    margin-top:1px;

    color:var(--text-soft);

    font-size:12px;
    font-weight:700;

    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}


/* =========================================================
   PROGRESS
   ========================================================= */

.progress-wrapper{
    width:100%;

    margin:4px 0 8px;

    flex:none;
}

.progress-info{
    display:flex;
    justify-content:space-between;
    align-items:center;

    margin-bottom:4px;

    color:var(--text-muted);

    font-size:8px;
}

.progress-track{
    width:100%;
    height:3px;

    overflow:hidden;

    border-radius:99px;

    background:rgba(255,255,255,.055);
}

.progress-fill{
    width:0;
    height:100%;

    border-radius:inherit;

    background:
        linear-gradient(
            90deg,
            var(--gold-dark),
            var(--gold-light)
        );

    box-shadow:
        0 0 12px rgba(232,189,103,.45);

    transition:width .5s var(--ease);
}


/* =========================================================
   PLAYER STATS
   ========================================================= */

.player-stats{
    width:100%;

    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:7px;

    margin-bottom:8px;

    flex:none;
}

.stat-card{
    min-height:39px;

    display:flex;
    align-items:center;
    justify-content:center;
    gap:7px;

    padding:5px 7px;

    border:1px solid var(--line);
    border-radius:12px;

    background:
        linear-gradient(
            145deg,
            rgba(255,255,255,.055),
            rgba(255,255,255,.018)
        );

    box-shadow:
        inset 0 1px 0 rgba(255,255,255,.035);
}

.stat-card .icon-heart{
    color:var(--red-light);
}

.stat-card .icon-coin{
    color:var(--gold);
}

.stat-card .icon-chapter{
    color:var(--blue-light);
}

.stat-info{
    display:flex;
    flex-direction:column;
    min-width:0;
}

.stat-label{
    color:var(--text-muted);

    font-size:7px;
    line-height:1;
}

.stat-value{
    margin-top:2px;

    font-size:11px;
    font-weight:900;
    line-height:1;
}


/* =========================================================
   SCENE AREA
   ========================================================= */

#sceneArea{
    position:relative;

    width:100%;
    min-height:0;

    flex:1;

    display:flex;
    flex-direction:column;

    overflow:hidden;

    border:1px solid rgba(255,255,255,.075);
    border-radius:22px;

    background:
        rgba(4,7,14,.74);

    box-shadow:
        0 25px 70px rgba(0,0,0,.45),
        inset 0 1px 0 rgba(255,255,255,.035);
}


/* =========================================================
   SCENE VISUAL
   ========================================================= */

.scene-visual{
    position:relative;

    width:100%;
    height:40%;

    min-height:145px;

    overflow:hidden;

    flex:none;

    background:
        radial-gradient(
            ellipse at 50% 30%,
            rgba(70,100,157,.25),
            transparent 55%
        ),
        linear-gradient(
            180deg,
            #07101e,
            #0b1423 52%,
            #03060d 100%
        );
}

.scene-visual::before{
    content:"";

    position:absolute;
    inset:0;

    z-index:4;

    background:
        linear-gradient(
            180deg,
            rgba(0,0,0,.04),
            transparent 45%,
            rgba(0,0,0,.58)
        );

    pointer-events:none;
}

.scene-visual::after{
    content:"";

    position:absolute;
    inset:0;

    z-index:6;

    box-shadow:
        inset 0 0 90px rgba(0,0,0,.7);

    pointer-events:none;
}


/* =========================================================
   SCENE DEPTH
   ========================================================= */

#sceneDepth{
    position:absolute;
    inset:0;

    z-index:1;

    background:
        radial-gradient(
            ellipse at 50% 45%,
            rgba(92,122,181,.16),
            transparent 50%
        );

    transform:scale(1.05);

    pointer-events:none;
}


/* =========================================================
   SCENE IMAGE
   ========================================================= */

#sceneImage{
    position:absolute;

    inset:0;

    width:100%;
    height:100%;

    z-index:2;

    object-fit:cover;

    opacity:0;

    filter:
        saturate(.84)
        contrast(1.06)
        brightness(.72);

    transform:scale(1.025);

    transition:
        opacity .65s var(--ease),
        transform 7s var(--ease-soft),
        filter .5s ease;

    background:
        linear-gradient(
            135deg,
            #0b1425,
            #050914
        );
}

#sceneImage[src]:not([src=""]){
    opacity:1;
    transform:scale(1.055);
}


/* =========================================================
   SCENE OVERLAYS
   ========================================================= */

.scene-overlay{
    position:absolute;
    inset:0;

    z-index:5;

    background:
        linear-gradient(
            90deg,
            rgba(0,0,0,.30),
            transparent 35%,
            transparent 65%,
            rgba(0,0,0,.34)
        ),
        linear-gradient(
            180deg,
            rgba(3,6,12,.12),
            transparent 40%,
            rgba(2,4,9,.68)
        );
}

.scene-vignette{
    position:absolute;
    inset:0;

    z-index:7;

    background:
        radial-gradient(
            ellipse at center,
            transparent 38%,
            rgba(0,0,0,.58) 100%
        );

    pointer-events:none;
}


/* =========================================================
   SCENE EFFECT LAYERS
   ========================================================= */

#sceneFog,
#sceneWind,
#sceneLight,
#sceneDepth{
    pointer-events:none;
}

#sceneFog{
    position:absolute;
    inset:-20%;

    z-index:8;

    opacity:.28;

    background:
        radial-gradient(
            ellipse at 30% 60%,
            rgba(220,230,245,.12),
            transparent 38%
        ),
        radial-gradient(
            ellipse at 75% 50%,
            rgba(181,204,235,.09),
            transparent 35%
        );

    filter:blur(18px);

    animation:sceneFogMove 18s ease-in-out infinite alternate;
}

@keyframes sceneFogMove{
    from{transform:translateX(-3%) scale(1);}
    to{transform:translateX(4%) scale(1.08);}
}

#sceneWind{
    position:absolute;
    inset:0;

    z-index:9;

    opacity:.12;

    background:
        repeating-linear-gradient(
            -18deg,
            transparent 0 45px,
            rgba(210,225,250,.08) 46px,
            transparent 48px 100px
        );

    animation:sceneWindMove 9s linear infinite;
}

@keyframes sceneWindMove{
    from{transform:translateX(-15%);}
    to{transform:translateX(15%);}
}

#sceneLight{
    position:absolute;
    inset:-20%;

    z-index:10;

    background:
        radial-gradient(
            circle at 70% 20%,
            rgba(255,235,180,.16),
            transparent 30%
        );

    mix-blend-mode:screen;

    opacity:.35;
}


/* =========================================================
   WEATHER / TIME
   ========================================================= */

.scene-weather{
    position:absolute;

    top:10px;
    right:12px;

    z-index:15;

    max-width:55%;

    padding:4px 8px;

    border:1px solid rgba(255,255,255,.09);
    border-radius:8px;

    color:rgba(255,255,255,.65);

    background:rgba(0,0,0,.24);
    backdrop-filter:blur(8px);
    -webkit-backdrop-filter:blur(8px);

    font-size:8px;
}

.scene-time{
    position:absolute;

    left:12px;
    bottom:10px;

    z-index:15;

    color:rgba(255,255,255,.62);

    font-size:9px;
    font-weight:700;

    letter-spacing:1px;
    direction:ltr;
}


/* =========================================================
   SCENE PARTICLES
   ========================================================= */

.scene-particles{
    position:absolute;
    inset:0;

    z-index:12;

    pointer-events:none;

    overflow:hidden;
}

.scene-particles::before,
.scene-particles::after{
    content:"";

    position:absolute;

    width:2px;
    height:2px;

    border-radius:50%;

    background:rgba(255,255,255,.7);

    box-shadow:
        12% 30% rgba(255,255,255,.35),
        24% 65% rgba(255,230,170,.3),
        39% 20% rgba(190,215,255,.4),
        57% 72% rgba(255,255,255,.28),
        71% 34% rgba(190,215,255,.34),
        88% 60% rgba(255,231,180,.32);

    animation:sceneParticles 12s ease-in-out infinite alternate;
}

.scene-particles::after{
    animation-duration:17s;
    animation-delay:-5s;
    opacity:.45;
}

@keyframes sceneParticles{
    from{
        transform:translateY(14px);
    }

    to{
        transform:translateY(-24px);
    }
}


/* =========================================================
   STORY PANEL
   ========================================================= */

.story-panel{
    position:relative;

    flex:1;
    min-height:0;

    display:flex;
    flex-direction:column;

    padding:14px 15px 9px;

    overflow:hidden;

    background:
        linear-gradient(
            180deg,
            rgba(8,13,24,.93),
            rgba(5,9,18,.98)
        );
}

.story-panel::before{
    content:"";

    position:absolute;

    top:0;
    right:15%;

    width:70%;
    height:1px;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(232,189,103,.28),
            transparent
        );
}


/* =========================================================
   STORY META
   ========================================================= */

.story-meta{
    width:100%;

    display:flex;
    align-items:center;
    justify-content:space-between;

    gap:10px;

    margin-bottom:6px;

    flex:none;
}

.scene-chapter-tag{
    color:var(--gold);

    font-size:8px;
    font-weight:800;

    letter-spacing:1px;
}

.scene-location{
    max-width:60%;

    color:var(--text-muted);

    font-size:8px;

    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}


/* =========================================================
   STORY TITLE
   ========================================================= */

.scene-title{
    flex:none;

    color:#fff;

    font-size:20px;
    font-weight:900;
    line-height:1.35;

    letter-spacing:-.3px;

    text-shadow:
        0 3px 20px rgba(0,0,0,.4);
}


/* =========================================================
   STORY TEXT
   ========================================================= */

#storyText{
    flex:1;
    min-height:0;

    margin-top:7px;

    overflow-y:auto;

    padding-left:3px;

    color:var(--text-soft);

    font-size:12px;
    line-height:2;

    scrollbar-width:thin;
    scrollbar-color:rgba(232,189,103,.3) transparent;
}

#storyText::-webkit-scrollbar{
    width:3px;
}

#storyText::-webkit-scrollbar-track{
    background:transparent;
}

#storyText::-webkit-scrollbar-thumb{
    background:rgba(232,189,103,.3);
    border-radius:99px;
}


/* =========================================================
   SKIP TEXT
   ========================================================= */

.skip-text-btn{
    align-self:flex-start;

    margin-top:5px;

    padding:3px 8px;

    color:var(--gold);

    background:transparent;

    font-size:8px;
    font-weight:700;

    opacity:.72;
}

.skip-text-btn:active{
    opacity:1;
}


/* =========================================================
   CHOICES
   ========================================================= */

.choices-area{
    flex:none;

    width:100%;

    padding:5px 14px 12px;

    background:
        linear-gradient(
            180deg,
            rgba(5,9,18,.98),
            rgba(4,7,14,1)
        );
}

.choices-heading{
    display:flex;
    align-items:center;
    gap:8px;

    margin-bottom:7px;

    color:var(--text-muted);

    font-size:8px;
    font-weight:700;

    white-space:nowrap;
}

.choices-line{
    flex:1;

    height:1px;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.09)
        );
}

.choices-line:last-child{
    background:
        linear-gradient(
            90deg,
            rgba(255,255,255,.09),
            transparent
        );
}

#choices{
    display:flex;
    flex-direction:column;
    gap:6px;

    max-height:27vh;

    overflow-y:auto;

    scrollbar-width:none;
}

#choices::-webkit-scrollbar{
    display:none;
}


/* =========================================================
   CHOICE BUTTONS
   ========================================================= */

.choice-button,
.choice,
.choices button{
    position:relative;

    width:100%;
    min-height:42px;

    display:flex;
    align-items:center;

    padding:9px 12px;

    border:1px solid rgba(255,255,255,.085);
    border-radius:13px;

    color:var(--text-soft);

    background:
        linear-gradient(
            135deg,
            rgba(255,255,255,.055),
            rgba(255,255,255,.018)
        );

    box-shadow:
        0 6px 16px rgba(0,0,0,.2),
        inset 0 1px 0 rgba(255,255,255,.03);

    text-align:right;

    font-size:10px;
    font-weight:700;

    transition:
        transform .18s var(--ease),
        border-color .18s ease,
        background .18s ease,
        color .18s ease;
}

.choice-button::after,
.choice::after,
.choices button::after{
    content:"›";

    margin-right:auto;
    margin-left:5px;

    color:var(--gold);

    font-size:17px;
    opacity:.55;

    transition:transform .2s ease,opacity .2s ease;
}

.choice-button:hover,
.choice:hover,
.choices button:hover{
    border-color:rgba(232,189,103,.35);

    color:#fff;

    background:
        linear-gradient(
            135deg,
            rgba(232,189,103,.10),
            rgba(255,255,255,.025)
        );
}

.choice-button:hover::after,
.choice:hover::after,
.choices button:hover::after{
    transform:translateX(-3px);
    opacity:1;
}

.choice-button:active,
.choice:active,
.choices button:active{
    transform:scale(.985);
}


/* =========================================================
   BOTTOM NAV
   ========================================================= */

.bottom-nav{
    position:absolute;

    right:10px;
    left:10px;
    bottom:calc(7px + var(--safe-bottom));

    z-index:50;

    height:61px;

    display:grid;
    grid-template-columns:repeat(3,1fr);

    border:1px solid rgba(255,255,255,.09);
    border-radius:20px;

    background:
        linear-gradient(
            145deg,
            rgba(11,17,31,.94),
            rgba(5,9,18,.97)
        );

    box-shadow:
        0 15px 40px rgba(0,0,0,.5),
        inset 0 1px 0 rgba(255,255,255,.04);

    backdrop-filter:blur(20px);
    -webkit-backdrop-filter:blur(20px);
}

.nav-button{
    position:relative;

    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    gap:2px;

    color:var(--text-muted);

    background:transparent;

    transition:
        color .2s ease,
        transform .2s ease;
}

.nav-button:active{
    transform:scale(.94);
}

.nav-button:hover{
    color:var(--gold-light);
}

.nav-icon{
    transform:scale(.82);
}

.nav-label{
    font-size:7px;
    font-weight:700;
}

.nav-badge{
    position:absolute;

    top:8px;
    right:calc(50% - 19px);

    min-width:15px;
    height:15px;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:0 4px;

    border:1px solid rgba(232,189,103,.28);
    border-radius:99px;

    color:#111;

    background:var(--gold);

    font-size:7px;
    font-weight:900;
}


/* =========================================================
   OVERLAYS
   ========================================================= */

.overlay{
    position:fixed;
    inset:0;

    z-index:200;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:
        calc(18px + var(--safe-top))
        14px
        calc(18px + var(--safe-bottom));

    background:
        rgba(1,3,8,.76);

    backdrop-filter:blur(14px);
    -webkit-backdrop-filter:blur(14px);

    opacity:0;
    visibility:hidden;
    pointer-events:none;

    transition:
        opacity .3s ease,
        visibility .3s ease;
}

.overlay.active,
.overlay.show,
.overlay.open{
    opacity:1;
    visibility:visible;
    pointer-events:auto;
}


/* =========================================================
   MODAL
   ========================================================= */

.modal{
    position:relative;

    width:min(470px,100%);
    max-height:90vh;

    overflow:hidden;
    overflow-y:auto;

    padding:23px 18px 18px;

    border:1px solid rgba(255,255,255,.11);
    border-radius:26px;

    background:
        linear-gradient(
            145deg,
            rgba(14,22,39,.98),
            rgba(5,9,18,.99)
        );

    box-shadow:
        0 35px 90px rgba(0,0,0,.68),
        inset 0 1px 0 rgba(255,255,255,.045);

    scrollbar-width:thin;
    scrollbar-color:rgba(232,189,103,.3) transparent;

    transform:translateY(18px) scale(.97);

    transition:transform .35s var(--ease);
}

.overlay.active .modal,
.overlay.show .modal,
.overlay.open .modal{
    transform:translateY(0) scale(1);
}

.modal::-webkit-scrollbar{
    width:3px;
}

.modal::-webkit-scrollbar-thumb{
    background:rgba(232,189,103,.3);
    border-radius:99px;
}

.modal-close{
    position:absolute;

    top:11px;
    left:11px;

    width:33px;
    height:33px;

    display:flex;
    align-items:center;
    justify-content:center;

    border:1px solid var(--line);
    border-radius:11px;

    color:var(--text-muted);

    background:rgba(255,255,255,.035);

    font-size:20px;

    z-index:5;
}

.modal-close:hover{
    color:#fff;
    border-color:rgba(232,189,103,.3);
}


/* =========================================================
   MODAL HEADER
   ========================================================= */

.modal-header{
    display:flex;
    align-items:center;
    gap:12px;

    padding-left:38px;

    margin-bottom:18px;
}

.modal-icon{
    width:48px;
    height:48px;

    flex:none;

    display:flex;
    align-items:center;
    justify-content:center;

    border:1px solid rgba(232,189,103,.28);
    border-radius:15px;

    color:var(--gold-light);

    background:
        linear-gradient(
            145deg,
            rgba(232,189,103,.12),
            rgba(255,255,255,.025)
        );

    box-shadow:
        0 0 25px rgba(232,189,103,.06);

    font-size:20px;
}

.modal-header h2{
    color:#fff;

    font-size:19px;
    font-weight:900;
}

.modal-header p{
    margin-top:1px;

    color:var(--text-muted);

    font-size:9px;
}


/* =========================================================
   TUTORIAL
   ========================================================= */

.tutorial-content{
    display:flex;
    flex-direction:column;
    gap:8px;
}

.tutorial-item{
    display:flex;
    align-items:flex-start;
    gap:10px;

    padding:11px;

    border:1px solid rgba(255,255,255,.06);
    border-radius:14px;

    background:rgba(255,255,255,.025);
}

.tutorial-number{
    width:29px;
    height:29px;

    flex:none;

    display:flex;
    align-items:center;
    justify-content:center;

    border-radius:9px;

    color:var(--gold);

    background:rgba(232,189,103,.08);

    font-size:8px;
    font-weight:900;
}

.tutorial-item h3{
    color:#fff;

    font-size:11px;
    font-weight:800;
}

.tutorial-item p{
    margin-top:2px;

    color:var(--text-muted);

    font-size:9px;
    line-height:1.7;
}


/* =========================================================
   MODAL ACTION
   ========================================================= */

.modal-action{
    width:100%;
    min-height:49px;

    margin-top:16px;

    border-radius:14px;

    color:#111;

    background:
        linear-gradient(
            135deg,
            #ffe6a4,
            #d5a54a
        );

    box-shadow:
        0 10px 25px rgba(232,189,103,.13);

    font-size:12px;
    font-weight:900;

    transition:transform .2s ease;
}

.modal-action:active{
    transform:scale(.98);
}


/* =========================================================
   MENU
   ========================================================= */

.menu-list{
    display:flex;
    flex-direction:column;
    gap:6px;
}

.menu-item{
    width:100%;
    min-height:49px;

    display:flex;
    align-items:center;
    gap:11px;

    padding:9px 12px;

    border:1px solid rgba(255,255,255,.06);
    border-radius:13px;

    color:var(--text-soft);

    background:rgba(255,255,255,.028);

    text-align:right;

    font-size:10px;
    font-weight:700;

    transition:
        background .2s ease,
        border-color .2s ease,
        transform .2s ease;
}

.menu-item > b{
    margin-right:auto;

    color:var(--text-muted);

    font-size:17px;
    font-weight:400;
}

.menu-item:hover{
    border-color:rgba(232,189,103,.25);
    background:rgba(232,189,103,.065);
}

.menu-item:active{
    transform:scale(.985);
}

.save-item{
    color:var(--green);
}

.danger-item{
    color:var(--red-light);
}

.menu-separator{
    height:1px;
    margin:6px 0;

    background:rgba(255,255,255,.07);
}


/* =========================================================
   INVENTORY
   ========================================================= */

.inventory-content{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:8px;
}

.inventory-item{
    min-height:105px;

    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    padding:10px;

    border:1px solid rgba(255,255,255,.07);
    border-radius:15px;

    background:
        linear-gradient(
            145deg,
            rgba(255,255,255,.045),
            rgba(255,255,255,.018)
        );

    text-align:center;
}

.inventory-item-icon{
    font-size:27px;

    margin-bottom:5px;
}

.inventory-item-name{
    color:#fff;

    font-size:10px;
    font-weight:800;
}

.inventory-item-description{
    margin-top:3px;

    color:var(--text-muted);

    font-size:7px;
    line-height:1.5;
}


/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

.achievement-summary{
    display:flex;
    align-items:center;
    gap:12px;

    margin-bottom:13px;

    padding:12px;

    border:1px solid rgba(232,189,103,.12);
    border-radius:15px;

    background:rgba(232,189,103,.045);
}

.achievement-progress-circle{
    width:57px;
    height:57px;

    flex:none;

    display:flex;
    align-items:center;
    justify-content:center;

    border:2px solid rgba(232,189,103,.35);
    border-radius:50%;

    color:var(--gold);

    font-size:11px;
    font-weight:900;
}

.achievement-progress-circle strong{
    font-size:16px;
}

.achievement-summary-text{
    display:flex;
    flex-direction:column;
}

.achievement-summary-text strong{
    color:#fff;
    font-size:11px;
}

.achievement-summary-text span{
    margin-top:2px;
    color:var(--text-muted);
    font-size:8px;
}

.achievements-content{
    display:flex;
    flex-direction:column;
    gap:6px;
}

.achievement-item{
    display:flex;
    align-items:center;
    gap:10px;

    padding:10px;

    border:1px solid rgba(255,255,255,.06);
    border-radius:13px;

    background:rgba(255,255,255,.025);
}

.achievement-item-icon{
    width:38px;
    height:38px;

    flex:none;

    display:flex;
    align-items:center;
    justify-content:center;

    border-radius:11px;

    background:rgba(232,189,103,.08);

    font-size:17px;
}

.achievement-item strong{
    color:#fff;
    font-size:10px;
}

.achievement-item p{
    margin-top:2px;

    color:var(--text-muted);

    font-size:8px;
    line-height:1.5;
}

.achievement-item.locked{
    opacity:.42;
}


/* =========================================================
   JOURNAL
   ========================================================= */

.journal-content{
    display:flex;
    flex-direction:column;
    gap:8px;
}

.journal-entry{
    padding:12px;

    border-right:2px solid rgba(232,189,103,.45);
    border-radius:0 12px 12px 0;

    background:rgba(255,255,255,.025);
}

.journal-entry-title{
    color:var(--gold-light);

    font-size:10px;
    font-weight:900;
}

.journal-entry-text{
    margin-top:5px;

    color:var(--text-soft);

    font-size:9px;
    line-height:1.9;
}


/* =========================================================
   SETTINGS
   ========================================================= */

.settings-list{
    display:flex;
    flex-direction:column;
    gap:6px;
}

.setting-row{
    position:relative;

    min-height:59px;

    display:flex;
    align-items:center;

    padding:10px 12px;

    border:1px solid rgba(255,255,255,.06);
    border-radius:14px;

    background:rgba(255,255,255,.025);

    cursor:pointer;
}

.setting-info{
    display:flex;
    flex-direction:column;

    padding-left:45px;
}

.setting-info strong{
    color:#fff;

    font-size:10px;
}

.setting-info span{
    margin-top:2px;

    color:var(--text-muted);

    font-size:7px;
}

.setting-row input{
    position:absolute;

    width:1px;
    height:1px;

    opacity:0;
}

.toggle-ui{
    position:absolute;

    left:12px;
    top:50%;

    width:39px;
    height:22px;

    transform:translateY(-50%);

    border-radius:99px;

    background:#252d3b;

    transition:.25s ease;
}

.toggle-ui::after{
    content:"";

    position:absolute;

    width:16px;
    height:16px;

    top:3px;
    left:3px;

    border-radius:50%;

    background:#9ba5b8;

    transition:.25s ease;
}

.setting-row input:checked + .toggle-ui{
    background:rgba(232,189,103,.35);
}

.setting-row input:checked + .toggle-ui::after{
    transform:translateX(17px);

    background:var(--gold-light);

    box-shadow:0 0 12px rgba(232,189,103,.4);
}


/* =========================================================
   SCENE TRANSITION
   ========================================================= */

.scene-transition{
    position:fixed;
    inset:0;

    z-index:500;

    display:flex;
    align-items:center;
    justify-content:center;

    background:#02040a;

    opacity:0;
    visibility:hidden;
    pointer-events:none;

    transition:
        opacity .45s ease,
        visibility .45s ease;
}

.scene-transition.active,
.scene-transition.show{
    opacity:1;
    visibility:visible;
}

.transition-content{
    text-align:center;

    transform:translateY(15px);

    animation:transitionContent 1.1s var(--ease) forwards;
}

@keyframes transitionContent{
    to{
        transform:translateY(0);
    }
}

.transition-chapter{
    color:var(--gold);

    font-size:10px;
    font-weight:800;

    letter-spacing:4px;
}

.transition-title{
    margin-top:8px;

    color:#fff;

    font-size:28px;
    font-weight:900;
}

.transition-line{
    width:130px;
    height:1px;

    margin:14px auto;

    background:
        linear-gradient(
            90deg,
            transparent,
            var(--gold),
            transparent
        );
}


/* =========================================================
   CINEMATIC OVERLAY
   ========================================================= */

.cinematic-overlay{
    position:fixed;
    inset:0;

    z-index:700;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:20px;

    background:
        radial-gradient(
            circle at center,
            rgba(25,38,63,.3),
            rgba(0,0,0,.9)
        );

    backdrop-filter:blur(7px);
    -webkit-backdrop-filter:blur(7px);

    opacity:0;
    visibility:hidden;
    pointer-events:none;

    transition:
        opacity .35s ease,
        visibility .35s ease;
}

.cinematic-overlay.active,
.cinematic-overlay.show{
    opacity:1;
    visibility:visible;
    pointer-events:auto;
}

.cinematic-content{
    width:min(500px,100%);

    padding:28px 20px;

    text-align:center;

    border-top:1px solid rgba(232,189,103,.25);
    border-bottom:1px solid rgba(232,189,103,.15);

    background:
        linear-gradient(
            180deg,
            rgba(8,12,23,.35),
            transparent
        );
}

.cinematic-label{
    color:var(--gold);

    font-size:9px;
    font-weight:800;

    letter-spacing:4px;
}

.cinematic-title{
    margin-top:10px;

    color:#fff;

    font-size:28px;
    font-weight:900;

    text-shadow:
        0 0 35px rgba(255,255,255,.1);
}

.cinematic-text{
    margin-top:10px;

    color:var(--text-soft);

    font-size:12px;
    line-height:2;
}

.cinematic-continue{
    min-width:150px;
    min-height:43px;

    margin-top:18px;

    padding:9px 18px;

    border:1px solid rgba(232,189,103,.3);
    border-radius:13px;

    color:var(--gold-light);

    background:rgba(232,189,103,.07);

    font-size:10px;
    font-weight:800;
}


/* =========================================================
   TOASTS
   ========================================================= */

.toast{
    position:fixed;

    top:
        calc(14px + var(--safe-top));

    right:14px;

    z-index:900;

    width:min(310px,calc(100vw - 28px));

    display:flex;
    align-items:center;
    gap:10px;

    padding:10px 12px;

    border:1px solid rgba(232,189,103,.22);
    border-radius:15px;

    background:
        linear-gradient(
            135deg,
            rgba(17,25,42,.97),
            rgba(5,9,18,.98)
        );

    box-shadow:
        0 15px 45px rgba(0,0,0,.5);

    opacity:0;
    visibility:hidden;

    transform:translateX(30px);

    transition:
        opacity .3s ease,
        visibility .3s ease,
        transform .35s var(--ease);

    pointer-events:none;
}

.toast.active,
.toast.show{
    opacity:1;
    visibility:visible;
    transform:translateX(0);
}

.toast-icon{
    width:38px;
    height:38px;

    flex:none;

    display:flex;
    align-items:center;
    justify-content:center;

    border-radius:11px;

    color:var(--gold-light);

    background:rgba(232,189,103,.09);

    font-size:18px;
}

.toast-content{
    min-width:0;

    display:flex;
    flex-direction:column;
}

.toast-label{
    color:var(--text-muted);

    font-size:7px;
}

.toast-content strong{
    margin-top:2px;

    color:#fff;

    font-size:10px;

    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}


/* =========================================================
   NOTIFICATION
   ========================================================= */

.notification{
    position:fixed;

    left:50%;
    bottom:calc(80px + var(--safe-bottom));

    z-index:950;

    max-width:calc(100vw - 30px);

    display:flex;
    align-items:center;
    gap:8px;

    padding:9px 13px;

    border:1px solid rgba(255,255,255,.1);
    border-radius:13px;

    background:rgba(7,12,22,.95);

    box-shadow:
        0 15px 40px rgba(0,0,0,.48);

    transform:
        translate(-50%,15px);

    opacity:0;
    visibility:hidden;

    transition:
        opacity .3s ease,
        visibility .3s ease,
        transform .3s var(--ease);

    pointer-events:none;
}

.notification.active,
.notification.show{
    opacity:1;
    visibility:visible;

    transform:translate(-50%,0);
}

.notification-icon{
    width:22px;
    height:22px;

    display:flex;
    align-items:center;
    justify-content:center;

    border-radius:7px;

    color:var(--gold);

    background:rgba(232,189,103,.09);

    font-size:10px;
    font-weight:900;
}

.notification-text{
    color:var(--text-soft);

    font-size:9px;
    font-weight:700;
}


/* =========================================================
   END SCREEN
   ========================================================= */

.end-screen{
    z-index:600;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:
        calc(25px + var(--safe-top))
        18px
        calc(25px + var(--safe-bottom));

    overflow-y:auto;

    background:
        radial-gradient(
            circle at 50% 35%,
            rgba(63,83,128,.16),
            transparent 42%
        ),
        rgba(2,4,9,.96);
}

.end-content{
    width:min(500px,100%);

    display:flex;
    flex-direction:column;
    align-items:center;

    text-align:center;
}

.end-icon{
    width:80px;
    height:80px;

    display:flex;
    align-items:center;
    justify-content:center;

    border:1px solid rgba(232,189,103,.35);
    border-radius:25px;

    color:var(--gold-light);

    background:
        linear-gradient(
            145deg,
            rgba(232,189,103,.13),
            rgba(255,255,255,.02)
        );

    box-shadow:
        0 0 55px rgba(232,189,103,.1);

    font-size:31px;

    animation:endIconFloat 4s ease-in-out infinite;
}

@keyframes endIconFloat{
    0%,100%{
        transform:translateY(0);
    }

    50%{
        transform:translateY(-5px);
    }
}

.end-label{
    margin-top:20px;

    color:var(--gold);

    font-size:9px;
    font-weight:800;

    letter-spacing:4px;
}

.end-title{
    margin-top:8px;

    color:#fff;

    font-size:32px;
    font-weight:900;
}

.end-text{
    max-width:390px;

    margin-top:10px;

    color:var(--text-soft);

    font-size:12px;
    line-height:2;
}

.end-divider{
    width:100%;

    display:flex;
    align-items:center;
    gap:10px;

    margin:22px 0;

    color:var(--text-muted);

    font-size:7px;
    letter-spacing:2px;
    direction:ltr;
}

.end-divider span{
    flex:1;
    height:1px;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(232,189,103,.2)
        );
}

.end-divider span:last-of-type{
    background:
        linear-gradient(
            90deg,
            rgba(232,189,103,.2),
            transparent
        );
}

.end-divider i{
    font-style:normal;
}

.end-stats{
    width:100%;

    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:7px;
}

.end-stat{
    padding:11px 6px;

    border:1px solid rgba(255,255,255,.07);
    border-radius:13px;

    background:rgba(255,255,255,.025);
}

.end-stat span{
    display:block;

    color:var(--text-muted);

    font-size:7px;
}

.end-stat strong{
    display:block;

    margin-top:3px;

    color:var(--gold-light);

    font-size:15px;
}

.end-actions{
    width:min(360px,100%);

    display:flex;
    flex-direction:column;
    gap:8px;

    margin-top:20px;
}


/* =========================================================
   EFFECT LAYERS
   ========================================================= */

.effect-layer{
    position:fixed;
    inset:0;

    z-index:1000;

    pointer-events:none;

    opacity:0;

    transition:opacity .25s ease;
}

.effect-flash{
    background:#fff;
    mix-blend-mode:screen;
}

.effect-fog{
    background:
        radial-gradient(
            ellipse at center,
            rgba(210,220,235,.22),
            transparent 68%
        );

    filter:blur(12px);
}

.effect-shadow{
    background:
        radial-gradient(
            ellipse at center,
            transparent 20%,
            rgba(0,0,0,.85) 100%
        );
}

.effect-light{
    background:
        radial-gradient(
            circle at center,
            rgba(255,238,187,.22),
            transparent 52%
        );

    mix-blend-mode:screen;
}

.effect-rain{
    opacity:0;

    background:
        repeating-linear-gradient(
            110deg,
            transparent 0 18px,
            rgba(180,210,245,.16) 19px,
            transparent 21px 38px
        );

    animation:rainMove .45s linear infinite;
}

@keyframes rainMove{
    from{transform:translateY(-35px);}
    to{transform:translateY(35px);}
}

.effect-darkness{
    background:#000;
}


/* =========================================================
   SCREEN FLASH
   ========================================================= */

#screenFlash{
    position:fixed;
    inset:0;

    z-index:1100;

    background:#fff;

    opacity:0;

    pointer-events:none;
}


/* =========================================================
   CINEMATIC STATES
   ========================================================= */

#app.danger-mode .scene-visual{
    box-shadow:
        inset 0 0 80px rgba(228,91,105,.14);
}

#app.dark-mode .scene-visual{
    filter:brightness(.55);
}

#app.light-event .scene-visual{
    box-shadow:
        inset 0 0 100px rgba(255,232,174,.16);
}

#app.fog-event .scene-visual{
    filter:saturate(.75);
}

#app.wind-event #sceneWind{
    opacity:.35;
}

#app.rain-event #effectRain{
    opacity:1;
}

#app.shadow-event #effectShadow{
    opacity:1;
}


/* =========================================================
   SPECIAL STATE HELPERS
   ========================================================= */

.pulse{
    animation:uiPulse 1s ease-in-out infinite;
}

@keyframes uiPulse{
    0%,100%{
        transform:scale(1);
    }

    50%{
        transform:scale(1.025);
    }
}

.shake{
    animation:uiShake .4s ease;
}

@keyframes uiShake{
    0%,100%{transform:translateX(0);}
    20%{transform:translateX(-5px);}
    40%{transform:translateX(5px);}
    60%{transform:translateX(-4px);}
    80%{transform:translateX(4px);}
}

.glitch{
    animation:glitchText .18s steps(2,end) infinite;
}

@keyframes glitchText{
    0%{
        transform:translate(0);
        filter:none;
    }

    50%{
        transform:translate(2px,-1px);
        filter:brightness(1.4);
    }

    100%{
        transform:translate(-2px,1px);
        filter:none;
    }
}


/* =========================================================
   RESPONSIVE — SMALL PHONES
   ========================================================= */

@media (max-height:700px){

    .game-screen{
        padding-bottom:calc(69px + var(--safe-bottom));
    }

    .game-header{
        min-height:46px;
    }

    .hud-button{
        width:39px;
        height:39px;
        border-radius:12px;
    }

    .player-stats{
        margin-bottom:5px;
    }

    .stat-card{
        min-height:34px;
    }

    .scene-visual{
        height:34%;
        min-height:120px;
    }

    .story-panel{
        padding-top:10px;
    }

    .scene-title{
        font-size:17px;
    }

    #storyText{
        font-size:11px;
        line-height:1.75;
    }

    .choices-area{
        padding-bottom:7px;
    }

    .choice-button,
    .choice,
    .choices button{
        min-height:37px;
        padding:7px 10px;
        font-size:9px;
    }

    .bottom-nav{
        height:55px;
    }
}


/* =========================================================
   RESPONSIVE — TALL PHONES
   ========================================================= */

@media (min-height:850px){

    .scene-visual{
        height:44%;
    }

    .story-title{
        font-size:22px;
    }

    #storyText{
        font-size:13px;
        line-height:2.05;
    }

    .choice-button,
    .choice,
    .choices button{
        min-height:45px;
        font-size:11px;
    }
}


/* =========================================================
   RESPONSIVE — TABLET
   ========================================================= */

@media (min-width:700px){

    .game-screen{
        padding-left:clamp(24px,8vw,100px);
        padding-right:clamp(24px,8vw,100px);
    }

    .bottom-nav{
        left:clamp(24px,8vw,100px);
        right:clamp(24px,8vw,100px);
    }

    .scene-visual{
        height:46%;
    }

    .scene-title{
        font-size:24px;
    }

    #storyText{
        font-size:14px;
    }

    .choice-button,
    .choice,
    .choices button{
        min-height:49px;
        font-size:12px;
    }
}


/* =========================================================
   LANDSCAPE MOBILE
   ========================================================= */

@media (orientation:landscape) and (max-height:520px){

    .start-screen{
        align-items:flex-start;
    }

    .start-content{
        padding-top:8px;
    }

    .logo-symbol{
        width:42px;
        height:42px;
        margin-bottom:4px;
    }

    .logo-main{
        font-size:32px;
    }

    .logo-secondary{
        font-size:19px;
    }

    #gameSubtitle{
        font-size:10px;
    }

    .start-divider{
        margin:10px 0;
    }

    .start-buttons{
        width:300px;

        display:grid;
        grid-template-columns:1fr 1fr;
    }

    .start-buttons .secondary-button{
        grid-column:1 / -1;
    }

    .main-button{
        min-height:42px;
        padding:9px;
        font-size:11px;
    }

    .start-footer{
        margin-top:10px;
    }

    .game-screen{
        padding-bottom:calc(66px + var(--safe-bottom));
    }

    .scene-visual{
        height:48%;
        min-height:100px;
    }

    .player-stats{
        margin-bottom:4px;
    }

    .story-panel{
        padding:7px 12px;
    }

    .scene-title{
        font-size:16px;
    }

    #storyText{
        font-size:10px;
        line-height:1.65;
    }

    .choices-area{
        padding:3px 10px 5px;
    }

    #choices{
        max-height:24vh;
        flex-direction:row;
        flex-wrap:wrap;
    }

    .choice-button,
    .choice,
    .choices button{
        width:calc(50% - 3px);
        min-height:35px;
        font-size:8px;
    }

    .bottom-nav{
        height:51px;
    }
}


/* =========================================================
   REDUCED MOTION
   ========================================================= */

@media (prefers-reduced-motion:reduce){

    *,
    *::before,
    *::after{
        animation-duration:.01ms!important;
        animation-iteration-count:1!important;
        scroll-behavior:auto!important;
        transition-duration:.01ms!important;
    }
}


/* =========================================================
   LIGHT EVENT OVERRIDE
   ========================================================= */

.light-event #sceneImage{
    filter:
        saturate(.95)
        contrast(1.02)
        brightness(.95);
}


/* =========================================================
   DANGER OVERRIDE
   ========================================================= */

.danger-mode .chapter-title-top{
    color:var(--red-light);
}

.danger-mode .progress-fill{
    background:
        linear-gradient(
            90deg,
            #7d2632,
            var(--red-light)
        );
}


/* =========================================================
   HEALTH STATES
   ========================================================= */

.health-low .health-stat{
    border-color:rgba(228,91,105,.35);

    animation:healthWarning 1.2s ease-in-out infinite;
}

@keyframes healthWarning{
    0%,100%{
        box-shadow:0 0 0 rgba(228,91,105,0);
    }

    50%{
        box-shadow:0 0 18px rgba(228,91,105,.12);
    }
}


/* =========================================================
   EMPTY STATES
   ========================================================= */

.empty-state{
    min-height:120px;

    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    text-align:center;

    color:var(--text-muted);
}

.empty-state-icon{
    margin-bottom:7px;

    font-size:28px;
    opacity:.55;
}

.empty-state-title{
    color:var(--text-soft);

    font-size:11px;
    font-weight:800;
}

.empty-state-text{
    margin-top:3px;

    font-size:8px;
}


/* =========================================================
   SELECTION / FOCUS
   ========================================================= */

button:focus-visible{
    outline:2px solid rgba(232,189,103,.6);
    outline-offset:2px;
}

::selection{
    color:#111;
    background:var(--gold-light);
}


/* =========================================================
   FINAL CINEMATIC POLISH
   ========================================================= */

.start-screen::before,
.end-screen::before{
    content:"";

    position:absolute;
    inset:0;

    pointer-events:none;

    background:
        radial-gradient(
            circle at 50% 40%,
            transparent 0 30%,
            rgba(0,0,0,.18) 62%,
            rgba(0,0,0,.58) 100%
        );
}

.start-content,
.end-content{
    position:relative;
    z-index:2;
}


/* =========================================================
   MOBILE TOUCH OPTIMIZATION
   ========================================================= */

@media (pointer:coarse){

    .main-button,
    .hud-button,
    .nav-button,
    .menu-item,
    .choice-button,
    .choice,
    .choices button,
    .modal-action{
        touch-action:manipulation;
    }

    .main-button:hover,
    .menu-item:hover,
    .choice-button:hover,
    .choice:hover,
    .choices button:hover{
        transform:none;
    }
}


/* =========================================================
   END
   ========================================================= */