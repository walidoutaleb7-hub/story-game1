/* =========================================================
   ظلال المجهول — SHADOWS OF THE UNKNOWN
   DATA ENGINE — ULTRA 4.0
   =========================================================
   PROTAGONIST: وليد
   CHAPTERS: 20
   STYLE: CINEMATIC MYSTERY / PSYCHOLOGICAL THRILLER
   ========================================================= */

const GAME_DATA = {

    /* =====================================================
       GAME INFO
    ===================================================== */

    game: {

        title: "ظلال المجهول",

        subtitle:
            "كل باب يخفي حقيقة... وكل حقيقة تترك ظلاً.",

        version: "4.0.0 ULTRA",

        protagonist: "وليد",

        maxHealth: 100,

        startingHealth: 100,

        startingCoins: 50,

        chaptersCount: 20,

        intro: {

            title: "ظلال المجهول",

            subtitle:
                "في الساعة 03:17 بدأ كل شيء."

        }

    },


    /* =====================================================
       ITEMS
    ===================================================== */

    items: {

        oldKey: {
            name: "المفتاح الصدئ",
            icon: "🗝️",
            description:
                "مفتاح قديم يحمل آثاراً غريبة."
        },

        photograph: {
            name: "الصورة القديمة",
            icon: "🖼️",
            description:
                "صورة يظهر فيها شخص يشبه وليد."
        },

        brokenPhone: {
            name: "الهاتف المكسور",
            icon: "📱",
            description:
                "هاتف توقف عند الساعة 03:17."
        },

        diary: {
            name: "المذكرات السوداء",
            icon: "📓",
            description:
                "مذكرات مجهولة تحتوي على رموز وأرقام."
        },

        basementKey: {
            name: "مفتاح القبو",
            icon: "🔑",
            description:
                "يفتح باباً تحت البيت رقم 17."
        },

        flashlight: {
            name: "المصباح اليدوي",
            icon: "🔦",
            description:
                "مصباح قديم لكنه ما زال يعمل."
        },

        tape: {
            name: "شريط التسجيل",
            icon: "📼",
            description:
                "تسجيل يحتوي على صوت وليد."
        },

        photograph2: {
            name: "الصورة الثانية",
            icon: "🖼️",
            description:
                "الصورة نفسها... لكن بتفاصيل مختلفة."
        },

        metalCard: {
            name: "البطاقة المعدنية",
            icon: "▣",
            description:
                "بطاقة تحمل الرمز 0317."
        },

        crowSymbol: {
            name: "رمز الغراب",
            icon: "◈",
            description:
                "رمز يتكرر في أماكن كثيرة."
        },

        letter: {
            name: "الرسالة",
            icon: "✉️",
            description:
                "رسالة موجهة إلى وليد بالاسم."
        },

        masterKey: {
            name: "المفتاح الرئيسي",
            icon: "🗝️",
            description:
                "يفتح الأبواب الأخيرة في المنشأة."
        },

        archiveBadge: {
            name: "شارة الأرشيف",
            icon: "◇",
            description:
                "شارة تسمح بالوصول إلى الأرشيف."
        },

        blackFile: {
            name: "الملف الأسود",
            icon: "📁",
            description:
                "أخطر ملف في المنشأة."
        },

        memoryFragment: {
            name: "شظية ذاكرة",
            icon: "✦",
            description:
                "جزء من ذاكرة وليد المفقودة."
        },

        redKey: {
            name: "المفتاح الأحمر",
            icon: "🔐",
            description:
                "مفتاح لا يظهر إلا لمن يعرف الحقيقة."
        },

        compass: {
            name: "البوصلة",
            icon: "🧭",
            description:
                "إبرة البوصلة تشير دائماً إلى مكان مجهول."
        },

        mirrorShard: {
            name: "قطعة المرآة",
            icon: "◇",
            description:
                "قطعة تعكس أشياء لا تظهر بالعين."
        },

        archiveMap: {
            name: "خريطة الأرشيف",
            icon: "▤",
            description:
                "خريطة للممرات القديمة."
        },

        voiceRecorder: {
            name: "مسجل الصوت",
            icon: "◉",
            description:
                "يسجل الأصوات التي لا يسمعها الآخرون."
        },

        blackCoin: {
            name: "العملة السوداء",
            icon: "●",
            description:
                "عملة تحمل الرقم 17."
        },

        finalFragment: {
            name: "الشظية الأخيرة",
            icon: "✧",
            description:
                "آخر قطعة من الذاكرة."
        }

    },


    /* =====================================================
       FLAGS
       ===================================================== */

    flags: {

        metLian: false,
        metYoussef: false,
        metStranger: false,

        trustedLian: false,
        trustedYoussef: false,
        trustedDoctor: false,
        trustedStranger: false,

        foundPhotograph: false,
        foundDiary: false,
        foundBasement: false,
        openedSecretRoom: false,

        heardTape: false,
        discoveredLab: false,
        discoveredFile: false,

        discoveredArchive: false,
        discoveredTower: false,
        discoveredUndergroundCity: false,

        liedToLian: false,
        liedToYoussef: false,

        helpedLian: false,
        abandonedLian: false,

        sawMemory1: false,
        sawMemory2: false,
        sawMemory3: false,
        sawMemory4: false,
        sawMemory5: false,
        sawMemory6: false,

        knowsNumber0317: false,
        knowsAboutExperiment: false,
        knowsAboutAdam: false,

        knowsTruth: false,
        knowsWhoIsLian: false,
        knowsWhoIsWaleed: false,

        collectedEvidence1: false,
        collectedEvidence2: false,
        collectedEvidence3: false,
        collectedEvidence4: false,
        collectedEvidence5: false,
        collectedEvidence6: false,
        collectedEvidence7: false,
        collectedEvidence8: false,

        enteredForbiddenArea: false,
        escapedVillage: false,

        openedFinalDoor: false,

        refusedExperiment: false,
        acceptedTruth: false,

        completedArchive: false,
        foundFinalMessage: false,

        secretPath: false,
        secretEndingUnlocked: false,

        finalTruth: false

    },


    /* =====================================================
       ACHIEVEMENTS
       ===================================================== */

    achievements: {

        first_step: {
            name: "الخطوة الأولى",
            description: "بدأت الرحلة."
        },

        detective: {
            name: "المحقق",
            description: "وجدت أول دليل."
        },

        photographer: {
            name: "الصورة",
            description: "اكتشفت الصورة القديمة."
        },

        basement: {
            name: "ما تحت الأرض",
            description: "دخلت القبو."
        },

        listener: {
            name: "المستمع",
            description: "استمعت إلى التسجيل."
        },

        code_breaker: {
            name: "كاسر الشيفرة",
            description: "حللت أول شيفرة."
        },

        puzzle_master: {
            name: "سيد الألغاز",
            description: "حللت خمسة ألغاز."
        },

        truth_seeker: {
            name: "باحث الحقيقة",
            description: "اقتربت من الحقيقة."
        },

        memory: {
            name: "الذاكرة",
            description: "استعدت أول شظية."
        },

        complete_memory: {
            name: "الذاكرة الكاملة",
            description: "جمعت شظايا الذاكرة."
        },

        collector: {
            name: "جامع الأدلة",
            description: "جمعت ثمانية أدلة."
        },

        trust: {
            name: "الثقة",
            description: "وثقت بشخص مهم."
        },

        secret_room: {
            name: "الغرفة السرية",
            description: "وجدت الغرفة المخفية."
        },

        archive: {
            name: "حارس الأرشيف",
            description: "دخلت الأرشيف."
        },

        shadow: {
            name: "الظل",
            description: "اكتشفت وجود الظل."
        },

        survivor: {
            name: "الناجي",
            description: "وصلت إلى النهاية."
        },

        true_ending: {
            name: "الحقيقة",
            description: "وصلت إلى النهاية الحقيقية."
        },

        secret_ending: {
            name: "الظل الرابع",
            description: "اكتشفت النهاية السرية."
        }

    },


    /* =====================================================
       PUZZLES
       ===================================================== */

    puzzles: {

        /* -------------------------------------------------
           PUZZLE 01
           ------------------------------------------------- */

        clock0317: {

            id: "clock0317",

            title: "الساعة المتوقفة",

            description:
                "الهاتف متوقف عند 03:17. أمامك لوحة بأربعة أرقام.",

            clue:
                "الوقت الذي بدأت فيه المكالمة هو المفتاح.",

            question:
                "ما الرقم الذي يجب إدخاله؟",

            options: [
                "0317",
                "1730",
                "3017",
                "0713"
            ],

            answer: "0317",

            reward: {
                coins: 20,
                item: "oldKey",
                flag: "knowsNumber0317"
            },

            successText:
                "سمعت صوت قفل يفتح في مكان قريب.",

            failText:
                "صوت معدني يخرج من الظلام... حاول مرة أخرى.",

            effectSuccess: "light",
            effectFail: "shake"

        },


        /* -------------------------------------------------
           PUZZLE 02
           ------------------------------------------------- */

        villageSymbols: {

            id: "villageSymbols",

            title: "رموز القرية",

            description:
                "ثلاثة رموز محفورة على الحائط: غراب، عين، ساعة.",

            clue:
                "القرية لا تنسى الساعة التي تغيرت فيها الأمور.",

            question:
                "أي رمز يجب الضغط عليه أولاً؟",

            options: [
                "الغراب",
                "العين",
                "الساعة",
                "لا شيء"
            ],

            answer: "الساعة",

            reward: {
                coins: 25,
                item: "crowSymbol"
            },

            successText:
                "تتحرك حجارة الجدار... يظهر ممر ضيق.",

            failText:
                "الرموز تضيء للحظة ثم تنطفئ.",

            effectSuccess: "fog",
            effectFail: "flicker"

        },


        /* -------------------------------------------------
           PUZZLE 03
           ------------------------------------------------- */

        diaryCipher: {

            id: "diaryCipher",

            title: "شيفرة المذكرات",

            description:
                "المذكرات تحتوي على: 3 - 1 - 17 - 7.",

            clue:
                "كل رقم يشير إلى شيء في المكان.",

            question:
                "ما الرقم الذي يتكرر في كل الأدلة؟",

            options: [
                "03",
                "07",
                "17",
                "71"
            ],

            answer: "17",

            reward: {
                coins: 30,
                item: "basementKey",
                flag: "foundDiary"
            },

            successText:
                "تظهر كلمة واحدة بين الصفحات: القبو.",

            failText:
                "الحبر على الصفحة يتحرك كأنه حي.",

            effectSuccess: "flash",
            effectFail: "glitch"

        },


        /* -------------------------------------------------
           PUZZLE 04
           ------------------------------------------------- */

        photoDifference: {

            id: "photoDifference",

            title: "الصورة المستحيلة",

            description:
                "صورتان للغرفة نفسها. شيء واحد تغير.",

            clue:
                "انظر إلى الساعة وليس إلى الشخص.",

            question:
                "ما الشيء المختلف؟",

            options: [
                "النافذة",
                "الساعة",
                "الباب",
                "المصباح"
            ],

            answer: "الساعة",

            reward: {
                coins: 35,
                item: "photograph2",
                flag: "sawMemory1"
            },

            successText:
                "للحظة ترى نفسك واقفاً خلف الشخص الموجود في الصورة.",

            failText:
                "تظهر بقعة سوداء على الصورة.",

            effectSuccess: "memory",
            effectFail: "shadow"

        },


        /* -------------------------------------------------
           PUZZLE 05
           ------------------------------------------------- */

        tapeSequence: {

            id: "tapeSequence",

            title: "التسجيل",

            description:
                "التسجيل يقول: واحد... ثلاثة... واحد... سبعة.",

            clue:
                "لا تسمع الأرقام فقط. اسمع ترتيبها.",

            question:
                "ما التسلسل الصحيح؟",

            options: [
                "1317",
                "1137",
                "0317",
                "1731"
            ],

            answer: "1317",

            reward: {
                coins: 40,
                item: "metalCard",
                flag: "heardTape"
            },

            successText:
                "الصوت يتوقف ويقول: أحسنت يا وليد.",

            failText:
                "الصوت يكرر اسمك.",

            effectSuccess: "whisper",
            effectFail: "darkness"

        },


        /* -------------------------------------------------
           PUZZLE 06
           ------------------------------------------------- */

        undergroundDoor: {

            id: "undergroundDoor",

            title: "الباب السفلي",

            description:
                "ثلاثة أقفال تحمل الأرقام 3 و1 و7.",

            clue:
                "ابدأ بالرقم الذي ظهر أولاً.",

            question:
                "ما ترتيب الأقفال؟",

            options: [
                "3 → 1 → 7",
                "7 → 1 → 3",
                "1 → 7 → 3",
                "3 → 7 → 1"
            ],

            answer: "3 → 1 → 7",

            reward: {
                coins: 45,
                item: "flashlight",
                flag: "foundBasement"
            },

            successText:
                "الباب ينفتح إلى ممر تحت الأرض.",

            failText:
                "الإنذار يعمل لثانيتين.",

            effectSuccess: "light",
            effectFail: "danger"

        },


        /* -------------------------------------------------
           PUZZLE 07
           ------------------------------------------------- */

        mirrorIdentity: {

            id: "mirrorIdentity",

            title: "المرآة",

            description:
                "المرآة تعرض ثلاث نسخ من وليد.",

            clue:
                "واحد منهم لا يملك ظلاً.",

            question:
                "أي نسخة هي الحقيقية؟",

            options: [
                "الأولى",
                "الثانية",
                "الثالثة",
                "كلهم"
            ],

            answer: "الثانية",

            reward: {
                coins: 50,
                item: "mirrorShard",
                flag: "knowsWhoIsWaleed"
            },

            successText:
                "النسخة الثانية تبتسم... ثم تختفي.",

            failText:
                "المرآة تتشقق.",

            effectSuccess: "glitch",
            effectFail: "shake"

        },


        /* -------------------------------------------------
           PUZZLE 08
           ------------------------------------------------- */

        labAccess: {

            id: "labAccess",

            title: "دخول المختبر",

            description:
                "لوحة دخول تطلب الرمز الصحيح.",

            clue:
                "الرمز موجود في الأدلة التي جمعتها.",

            question:
                "ما الرمز؟",

            options: [
                "0317",
                "1713",
                "1307",
                "0717"
            ],

            answer: "0317",

            reward: {
                coins: 55,
                item: "archiveBadge",
                flag: "discoveredLab"
            },

            successText:
                "تم التعرف على هويتك: وليد.",

            failText:
                "النظام: الهوية غير متطابقة.",

            effectSuccess: "light",
            effectFail: "alert"

        },


        /* -------------------------------------------------
           PUZZLE 09
           ------------------------------------------------- */

        blackFile: {

            id: "blackFile",

            title: "الملف الأسود",

            description:
                "أمامك أربعة ملفات. واحد فقط يحمل رمز الغراب.",

            clue:
                "الرمز موجود في الصورة القديمة.",

            question:
                "أي ملف تختار؟",

            options: [
                "A-03",
                "B-17",
                "C-31",
                "D-71"
            ],

            answer: "B-17",

            reward: {
                coins: 60,
                item: "blackFile",
                flag: "discoveredFile"
            },

            successText:
                "تفتح الصفحة الأولى: SUBJECT — WALEED.",

            failText:
                "صفحة فارغة... ثم يظهر عليها اسمك.",

            effectSuccess: "darkness",
            effectFail: "glitch"

        },


        /* -------------------------------------------------
           PUZZLE 10
           ------------------------------------------------- */

        memoryOrder: {

            id: "memoryOrder",

            title: "ترتيب الذاكرة",

            description:
                "ثلاث ذكريات تظهر: البيت، المختبر، الحادث.",

            clue:
                "ابدأ من المكان الذي بدأ فيه كل شيء.",

            question:
                "ما الترتيب الصحيح؟",

            options: [
                "البيت → المختبر → الحادث",
                "الحادث → البيت → المختبر",
                "المختبر → البيت → الحادث",
                "البيت → الحادث → المختبر"
            ],

            answer: "البيت → المختبر → الحادث",

            reward: {
                coins: 65,
                item: "memoryFragment",
                flag: "sawMemory3"
            },

            successText:
                "تتذكر يدك وهي تفتح باباً لم تره من قبل.",

            failText:
                "الذكرى تنهار.",

            effectSuccess: "memory",
            effectFail: "flash"

        },


        /* -------------------------------------------------
           PUZZLE 11
           ------------------------------------------------- */

        silentCity: {

            id: "silentCity",

            title: "المدينة الصامتة",

            description:
                "خريطة تحتوي على أربعة طرق.",

            clue:
                "كل طريق يحمل رمزاً. الغراب لا يعود للخلف.",

            question:
                "أي طريق يؤدي إلى البرج؟",

            options: [
                "الشمال",
                "الجنوب",
                "الشرق",
                "الغرب"
            ],

            answer: "الشمال",

            reward: {
                coins: 70,
                item: "compass",
                flag: "discoveredTower"
            },

            successText:
                "إبرة البوصلة تتحرك نحو الشمال.",

            failText:
                "الضباب يبتلع الطريق.",

            effectSuccess: "wind",
            effectFail: "fog"

        },


        /* -------------------------------------------------
           PUZZLE 12
           ------------------------------------------------- */

        voiceCode: {

            id: "voiceCode",

            title: "صوت وليد",

            description:
                "صوت مسجل يقول ثلاث كلمات: باب... ساعة... ظل.",

            clue:
                "اجمع الأشياء التي تكررت منذ البداية.",

            question:
                "ما الكلمة الأخيرة؟",

            options: [
                "نور",
                "ظل",
                "ماء",
                "صمت"
            ],

            answer: "ظل",

            reward: {
                coins: 75,
                item: "voiceRecorder",
                flag: "knowsTruth"
            },

            successText:
                "الصوت يقول: الآن تذكرت.",

            failText:
                "الصوت يتحول إلى همس.",

            effectSuccess: "whisper",
            effectFail: "darkness"

        },


        /* -------------------------------------------------
           PUZZLE 13
           ------------------------------------------------- */

        archiveMap: {

            id: "archiveMap",

            title: "خريطة الأرشيف",

            description:
                "الممرات تحمل الرموز: عين، غراب، دائرة، ساعة.",

            clue:
                "الساعة دائماً في البداية.",

            question:
                "أي مسار تختار؟",

            options: [
                "ساعة → عين → غراب",
                "غراب → عين → ساعة",
                "عين → ساعة → غراب",
                "ساعة → غراب → عين"
            ],

            answer: "ساعة → غراب → عين",

            reward: {
                coins: 80,
                item: "archiveMap",
                flag: "discoveredArchive"
            },

            successText:
                "باب الأرشيف السري يفتح.",

            failText:
                "تسمع خطوات خلفك.",

            effectSuccess: "light",
            effectFail: "danger"

        },


        /* -------------------------------------------------
           PUZZLE 14
           ------------------------------------------------- */

        archiveSorting: {

            id: "archiveSorting",

            title: "ترتيب الملفات",

            description:
                "أربعة ملفات تحمل سنوات مختلفة.",

            clue:
                "الأقدم يسبق كل شيء.",

            question:
                "أي ترتيب صحيح؟",

            options: [
                "2017 → 2019 → 2021 → 2024",
                "2024 → 2021 → 2019 → 2017",
                "2019 → 2017 → 2024 → 2021",
                "2021 → 2017 → 2019 → 2024"
            ],

            answer: "2017 → 2019 → 2021 → 2024",

            reward: {
                coins: 85,
                item: "blackCoin",
                flag: "completedArchive"
            },

            successText:
                "تظهر عبارة: PROJECT SHADOW.",

            failText:
                "الملفات تختفي للحظة.",

            effectSuccess: "glitch",
            effectFail: "flicker"

        },


        /* -------------------------------------------------
           PUZZLE 15
           ------------------------------------------------- */

        undergroundCity: {

            id: "undergroundCity",

            title: "المدينة تحت المدينة",

            description:
                "أمامك خريطة لمدينة مهجورة تحت الأرض.",

            clue:
                "كل الطرق تنتهي عند الرقم 17.",

            question:
                "أي منطقة تبحث فيها؟",

            options: [
                "القطاع 03",
                "القطاع 07",
                "القطاع 17",
                "القطاع 31"
            ],

            answer: "القطاع 17",

            reward: {
                coins: 90,
                item: "masterKey",
                flag: "discoveredUndergroundCity"
            },

            successText:
                "باب هائل يظهر من بين الأنقاض.",

            failText:
                "المدينة تتحرك كأنها حية.",

            effectSuccess: "shake",
            effectFail: "fog"

        },


        /* -------------------------------------------------
           PUZZLE 16
           ------------------------------------------------- */

        redDoor: {

            id: "redDoor",

            title: "الباب الأحمر",

            description:
                "الباب لا يملك مقبضاً. أمامه ثلاثة رموز.",

            clue:
                "المفتاح الحقيقي ليس شيئاً مادياً.",

            question:
                "ما الذي يفتح الباب؟",

            options: [
                "الخوف",
                "الحقيقة",
                "الغضب",
                "الصمت"
            ],

            answer: "الحقيقة",

            reward: {
                coins: 100,
                item: "redKey",
                flag: "openedFinalDoor"
            },

            successText:
                "الباب يفتح دون أن تلمسه.",

            failText:
                "الظلام يقترب.",

            effectSuccess: "light",
            effectFail: "darkness"

        },


        /* -------------------------------------------------
           PUZZLE 17
           ------------------------------------------------- */

        finalMemory: {

            id: "finalMemory",

            title: "الذاكرة الأخيرة",

            description:
                "أمامك خمس صور من حياة وليد.",

            clue:
                "الصورة التي لا تنتمي للماضي هي المفتاح.",

            question:
                "أي صورة تختار؟",

            options: [
                "الطفولة",
                "البيت 17",
                "المختبر",
                "المدينة",
                "الطريق"
            ],

            answer: "الطريق",

            reward: {
                coins: 110,
                item: "finalFragment",
                flag: "foundFinalMessage"
            },

            successText:
                "تعود آخر ذكرى... وتظهر الحقيقة.",

            failText:
                "الصورة تتحول إلى اللون الأسود.",

            effectSuccess: "memory",
            effectFail: "flash"

        },


        /* -------------------------------------------------
           PUZZLE 18
           ------------------------------------------------- */

        truthChoice: {

            id: "truthChoice",

            title: "الحقيقة",

            description:
                "ثلاثة تسجيلات تعرض ثلاث روايات.",

            clue:
                "الرواية الحقيقية هي التي تتوافق مع الأدلة.",

            question:
                "من بدأ التجربة؟",

            options: [
                "ليان",
                "الطبيب",
                "وليد",
                "الشخص المجهول"
            ],

            answer: "وليد",

            reward: {
                coins: 120,
                flag: "finalTruth"
            },

            successText:
                "تتوقف الشاشة. ثم يظهر وجه وليد على التسجيل.",

            failText:
                "الصوت يقول: لم تكتمل الذاكرة.",

            effectSuccess: "darkness",
            effectFail: "glitch"

        },


        /* -------------------------------------------------
           PUZZLE 19
           ------------------------------------------------- */

        shadowIdentity: {

            id: "shadowIdentity",

            title: "هوية الظل",

            description:
                "الظل يعرف كل شيء عن وليد.",

            clue:
                "ليس شخصاً آخر... لكنه أيضاً ليس وليد الحالي.",

            question:
                "ما هو الظل؟",

            options: [
                "ذاكرة",
                "نسخة",
                "وهم",
                "كل ما سبق"
            ],

            answer: "كل ما سبق",

            reward: {
                coins: 150,
                flag: "secretPath"
            },

            successText:
                "الظل يضحك لأول مرة.",

            failText:
                "الظل يختفي.",

            effectSuccess: "shadow",
            effectFail: "flicker"

        },


        /* -------------------------------------------------
           PUZZLE 20
           ------------------------------------------------- */

        ultimateTruth: {

            id: "ultimateTruth",

            title: "اللغز الأخير",

            description:
                "أمام وليد أربعة أبواب. كل باب يمثل نهاية.",

            clue:
                "الباب الصحيح لا يحمل رقماً.",

            question:
                "أي باب تختار؟",

            options: [
                "03",
                "17",
                "31",
                "الباب بلا رقم"
            ],

            answer: "الباب بلا رقم",

            reward: {
                coins: 300,
                flag: "secretEndingUnlocked"
            },

            successText:
                "لا يوجد شيء خلف الباب... سوى الحقيقة.",

            failText:
                "تعود الساعة إلى 03:17.",

            effectSuccess: "supernatural",
            effectFail: "darkness"

        }

    },


    /* =====================================================
       CHAPTERS
       ===================================================== */

    chapters: [

        /* =================================================
           CHAPTER 01
           ================================================= */

        {

            id: 1,

            title: "03:17",

            subtitle: "المكالمة التي لا يجب أن تصل",

            location: "الطريق الجبلي",

            scenes: [

                {

                    id: "c1_start",

                    title: "الطريق",

                    location: "الطريق الجبلي",

                    time: "03:17",

                    weather: "fog",

                    text:
                        "كان الطريق خالياً تماماً. الضباب يغطي الجبال، والضوء الذهبي البعيد بالكاد يظهر خلف القمم. كان وليد يقود وحده عندما توقفت الساعة في السيارة عند 03:17.",

                    event: "fog",

                    choices: [

                        {
                            text: "أكمل الطريق",
                            next: "c1_car",
                            effects: {
                                coins: 5,
                                flags: {
                                    first_step: true
                                }
                            }
                        },

                        {
                            text: "أوقف السيارة",
                            next: "c1_phone"
                        }

                    ]

                },

                {

                    id: "c1_car",

                    title: "الصوت",

                    location: "داخل السيارة",

                    text:
                        "قبل أن يقرر وليد ماذا يفعل، اشتغل الراديو وحده. لم تكن هناك موسيقى. كان هناك صوت شخص يتنفس.",

                    event: "whisper",

                    choices: [

                        {
                            text: "أخفض الصوت",
                            next: "c1_phone"
                        },

                        {
                            text: "استمع",
                            next: "c1_call",
                            effects: {
                                flags: {
                                    sawMemory1: true
                                }
                            }
                        }

                    ]

                },

                {

                    id: "c1_phone",

                    title: "الهاتف",

                    location: "داخل السيارة",

                    text:
                        "اهتز الهاتف على المقعد. لا يوجد رقم ظاهر. فقط كلمة واحدة: وليد.",

                    event: "flash",

                    choices: [

                        {
                            text: "أجيب",
                            next: "c1_call"
                        },

                        {
                            text: "أتجاهل المكالمة",
                            next: "c1_wait"
                        }

                    ]

                },

                {

                    id: "c1_call",

                    title: "03:17",

                    location: "داخل السيارة",

                    text:
                        "صوت مجهول قال بهدوء: لا تدخل القرية... لا تثق بالرجل الذي ينتظرك... وإذا سألك أحد عن الساعة، لا تجبه.",

                    event: "darkness",

                    choices: [

                        {
                            text: "من أنت؟",
                            next: "c1_stranger"
                        },

                        {
                            text: "ماذا تريد؟",
                            next: "c1_stranger"
                        }

                    ]

                },

                {

                    id: "c1_stranger",

                    title: "الرجل",

                    location: "الطريق",

                    text:
                        "عندما نزل وليد من السيارة، رأى رجلاً واقفاً وسط الضباب. لم يتحرك. فقط رفع يده وأشار نحو القرية.",

                    event: "shadow",

                    choices: [

                        {
                            text: "أتبع الإشارة",
                            next: "c1_window"
                        },

                        {
                            text: "أعود للسيارة",
                            next: "c1_wait"
                        }

                    ]

                },

                {

                    id: "c1_window",

                    title: "النافذة",

                    location: "الطريق",

                    text:
                        "قبل أن يعود وليد للسيارة، ظهر انعكاس في النافذة. انعكاسه هو... لكنه لم يكن يقلده.",

                    event: "glitch",

                    choices: [

                        {
                            text: "ألمس النافذة",
                            next: "c1_exit",
                            effects: {
                                items: ["brokenPhone"]
                            }
                        },

                        {
                            text: "أهرب",
                            next: "c1_exit"
                        }

                    ]

                },

                {

                    id: "c1_wait",

                    title: "الانتظار",

                    location: "الطريق",

                    text:
                        "انتظر وليد دقيقة واحدة. عندما نظر إلى الساعة، كانت لا تزال 03:17. لكن السيارة أصبحت في مكان مختلف.",

                    event: "shake",

                    choices: [

                        {
                            text: "أدخل القرية",
                            next: "c1_exit"
                        }

                    ]

                },

                {

                    id: "c1_exit",

                    title: "القرية",

                    location: "مدخل القرية",

                    text:
                        "ظهر اسم القرية على لوحة خشبية قديمة. كانت الحروف ممسوحة تقريباً، لكن رقماً واحداً بقي واضحاً: 17.",

                    event: "light",

                    choices: [

                        {
                            text: "أدخل القرية",
                            next: "c2_village"
                        }

                    ]

                }

            ]

        },


        /* =================================================
           CHAPTER 02
           ================================================= */

        {

            id: 2,

            title: "القرية التي لا تنام",

            subtitle: "لا أحد هنا ينام بعد الثالثة",

            location: "القرية",

            scenes: [

                {

                    id: "c2_village",

                    title: "المدخل",

                    location: "القرية",

                    text:
                        "لم تكن القرية مهجورة. كانت هناك نوافذ مضاءة في كل بيت، لكن لا أحد يظهر خلفها.",

                    event: "fog",

                    choices: [

                        {
                            text: "أبحث عن شخص",
                            next: "c2_youssef"
                        },

                        {
                            text: "أتجه للساحة",
                            next: "c2_square"
                        }

                    ]

                },

                {

                    id: "c2_youssef",

                    title: "يوسف",

                    location: "مقهى قديم",

                    text:
                        "جلس رجل مسن خلف نافذة المقهى. عندما رأى وليد قال: تأخرت كثيراً.",

                    event: "whisper",

                    choices: [

                        {
                            text: "ماذا تقصد؟",
                            next: "c2_key",
                            effects: {
                                flags: {
                                    metYoussef: true,
                                    trustedYoussef: true
                                }
                            }
                        },

                        {
                            text: "من أنت؟",
                            next: "c2_identity"
                        }

                    ]

                },

                {

                    id: "c2_key",

                    title: "المفتاح",

                    location: "المقهى",

                    text:
                        "وضع يوسف مفتاحاً صدئاً على الطاولة. قال: إذا كنت فعلاً وليد، ستعرف أين تستخدمه.",

                    event: "light",

                    choices: [

                        {
                            text: "آخذ المفتاح",
                            next: "c2_identity",
                            effects: {
                                items: ["oldKey"]
                            }
                        }

                    ]

                },

                {

                    id: "c2_identity",

                    title: "من أنت؟",

                    location: "المقهى",

                    text:
                        "ابتسم يوسف وقال: السؤال ليس من أنا... السؤال هو من أنت؟",

                    event: "darkness",

                    choices: [

                        {
                            text: "أنا وليد",
                            next: "c2_identity2",
                            effects: {
                                flags: {
                                    knowsWhoIsWaleed: true
                                }
                            }
                        },

                        {
                            text: "لا أعرف",
                            next: "c2_identity2"
                        }

                    ]

                },

                {

                    id: "c2_identity2",

                    title: "الساعة",

                    location: "المقهى",

                    text:
                        "دقت الساعة الثالثة وسبع عشرة دقيقة. توقف يوسف عن الكلام تماماً.",

                    event: "heartbeat",

                    puzzle: "clock0317",

                    choices: [

                        {
                            text: "حل اللغز",
                            next: "c2_square"
                        }

                    ]

                },

                {

                    id: "c2_square",

                    title: "الساحة",

                    location: "ساحة القرية",

                    text:
                        "في وسط الساحة تمثال لغراب حجري. تحته ثلاث رموز قديمة.",

                    event: "fog",

                    puzzle: "villageSymbols",

                    choices: [

                        {
                            text: "حل لغز الرموز",
                            next: "c2_symbol"
                        }

                    ]

                },

                {

                    id: "c2_symbol",

                    title: "الممر",

                    location: "الساحة",

                    text:
                        "تحرك الجدار ببطء، وظهر ممر ضيق يقود نحو أطراف القرية.",

                    event: "wind",

                    choices: [

                        {
                            text: "أدخل الممر",
                            next: "c2_child"
                        }

                    ]

                },

                {

                    id: "c2_child",

                    title: "الطفل",

                    location: "الزقاق",

                    text:
                        "ظهر طفل صغير وقال: البيت رقم 17 ينتظرك يا وليد.",

                    event: "shadow",

                    choices: [

                        {
                            text: "أين البيت؟",
                            next: "c2_inn"
                        },

                        {
                            text: "من أخبرك باسمي؟",
                            next: "c2_inn"
                        }

                    ]

                },

                {

                    id: "c2_inn",

                    title: "النزل",

                    location: "نزل القرية",

                    text:
                        "وجد وليد غرفة تحمل الرقم 17. فوق الباب كان رمز الغراب.",

                    event: "light",

                    choices: [

                        {
                            text: "أنام حتى الصباح",
                            next: "c2_leave"
                        },

                        {
                            text: "أفتح الباب",
                            next: "c2_leave",
                            effects: {
                                flags: {
                                    enteredForbiddenArea: true
                                }
                            }
                        }

                    ]

                },

                {

                    id: "c2_leave",

                    title: "البيت 17",

                    location: "أمام البيت",

                    text:
                        "في نهاية الطريق ظهر بيت قديم. الباب كان مفتوحاً بالفعل.",

                    event: "darkness",

                    choices: [

                        {
                            text: "أدخل",
                            next: "c3_house"
                        }

                    ]

                }

            ]

        },


        /* =================================================
           CHAPTER 03
           ================================================= */

        {

            id: 3,

            title: "البيت رقم 17",

            subtitle: "بعض البيوت تتذكر سكانها",

            location: "البيت 17",

            scenes: [

                {

                    id: "c3_house",

                    title: "الباب",

                    location: "البيت 17",

                    text:
                        "دخل وليد. الهواء بارد رغم أن جميع النوافذ مغلقة.",

                    event: "fog",

                    choices: [

                        {
                            text: "أدخل",
                            next: "c3_inside"
                        }

                    ]

                },

                {

                    id: "c3_inside",

                    title: "الردهة",

                    location: "البيت 17",

                    text:
                        "على الجدار صور لعائلة مجهولة. إحدى الصور كانت لوليد.",

                    event: "flash",

                    choices: [

                        {
                            text: "آخذ الصورة",
                            next: "c3_hall",
                            effects: {
                                items: ["photograph"],
                                flags: {
                                    foundPhotograph: true,
                                    collectedEvidence1: true
                                }
                            }
                        },

                        {
                            text: "أتركها",
                            next: "c3_hall"
                        }

                    ]

                },

                {

                    id: "c3_hall",

                    title: "الممر",

                    location: "الممر",

                    text:
                        "كل باب يحمل رقماً. 03... 07... 17... ثم باب بلا رقم.",

                    event: "glitch",

                    choices: [

                        {
                            text: "أدخل الباب 17",
                            next: "c3_room"
                        },

                        {
                            text: "أدخل الباب بلا رقم",
                            next: "c3_secret"
                        }

                    ]

                },

                {

                    id: "c3_room",

                    title: "الغرفة",

                    location: "الغرفة 17",

                    text:
                        "وجد وليد مكتباً. فوقه مذكرات سوداء.",

                    event: "darkness",

                    choices: [

                        {
                            text: "أقرأ المذكرات",
                            next: "c3_diary"
                        }

                    ]

                },

                {

                    id: "c3_diary",

                    title: "المذكرات",

                    location: "الغرفة 17",

                    text:
                        "الصفحة الأولى: إذا وصل وليد إلى هنا، فهذا يعني أن التجربة فشلت مرة أخرى.",

                    event: "memory",

                    choices: [

                        {
                            text: "أتابع القراءة",
                            next: "c3_diary2",
                            effects: {
                                items: ["diary"],
                                flags: {
                                    foundDiary: true,
                                    collectedEvidence2: true
                                }
                            }
                        }

                    ]

                },

                {

                    id: "c3_diary2",

                    title: "الشيفرة",

                    location: "الغرفة 17",

                    text:
                        "وجد وليد أربعة أرقام مكتوبة بطريقة غريبة.",

                    puzzle: "diaryCipher",

                    choices: [

                        {
                            text: "حل الشيفرة",
                            next: "c3_memory1"
                        }

                    ]

                },

                {

                    id: "c3_memory1",

                    title: "الذكرى",

                    location: "ذاكرة مجهولة",

                    text:
                        "رأى وليد نفسه صغيراً أمام البيت. بجانبه فتاة لم يتذكر اسمها.",

                    event: "memory",

                    choices: [

                        {
                            text: "أقترب من الذكرى",
                            next: "c3_tape",
                            effects: {
                                flags: {
                                    sawMemory2: true
                                }
                            }
                        }

                    ]

                },

                {

                    id: "c3_tape",

                    title: "التسجيل",

                    location: "الغرفة",

                    text:
                        "وجد جهاز تسجيل. ضغط على الزر. سمع صوته هو.",

                    event: "whisper",

                    puzzle: "tapeSequence",

                    choices: [

                        {
                            text: "أستمع للتسجيل",
                            next: "c3_secret"
                        }

                    ]

                },

                {

                    id: "c3_secret",

                    title: "الباب بلا رقم",

                    location: "ممر سري",

                    text:
                        "خلف الباب يوجد سلم ينزل إلى الأسفل. على الجدار كلمة واحدة: تذكّر.",

                    event: "darkness",

                    choices: [

                        {
                            text: "أنزل",
                            next: "c3_basement"
                        }

                    ]

                },

                {

                    id: "c3_basement",

                    title: "القبو",

                    location: "القبو",

                    text:
                        "في نهاية الدرج وجد وليد باباً معدنياً بثلاثة أقفال.",

                    puzzle: "undergroundDoor",

                    choices: [

                        {
                            text: "فتح الباب",
                            next: "c4_underground"
                        }

                    ]

                }

            ]

        },


        /* =================================================
           CHAPTER 04
           ================================================= */

        {

            id: 4,

            title: "الشخص الذي يشبهك",

            subtitle: "ماذا لو كان لك ظل آخر؟",

            location: "المنشأة تحت الأرض",

            scenes: [

                {

                    id: "c4_underground",

                    title: "المنشأة",

                    location: "المنشأة",

                    text:
                        "ممر طويل يمتد تحت الأرض. أضواء بيضاء تشتغل وتنطفئ وحدها.",

                    event: "flicker",

                    choices: [

                        {
                            text: "أتابع",
                            next: "c4_mirror"
                        }

                    ]

                },

                {

                    id: "c4_mirror",

                    title: "المرآة",

                    location: "قاعة المرايا",

                    text:
                        "ثلاث مرايا. في كل واحدة يقف وليد... لكن أحدهم لا يتحرك معه.",

                    event: "glitch",

                    puzzle: "mirrorIdentity",

                    choices: [

                        {
                            text: "أحل اللغز",
                            next: "c4_room"
                        }

                    ]

                },

                {

                    id: "c4_room",

                    title: "الغرفة البيضاء",

                    location: "مختبر قديم",

                    text:
                        "سرير طبي في الوسط. بجانبه شاشة تعرض: SUBJECT 17.",

                    event: "light",

                    choices: [

                        {
                            text: "ألمس الشاشة",
                            next: "c4_double"
                        }
                    ]

                },

                {

                    id: "c4_double",

                    title: "النسخة",

                    location: "المختبر",

                    text:
                        "ظهرت على الشاشة صورة لشخص يشبه وليد تماماً.",

                    event: "shadow",

                    choices: [

                        {
                            text: "من هذا؟",
                            next: "c4_truth"
                        }
                    ]

                },

                {

                    id: "c4_truth",

                    title: "الحقيقة الأولى",

                    location: "المختبر",

                    text:
                        "الصوت الآلي: النسخة ليست جسداً... النسخة ذاكرة.",

                    event: "darkness",

                    choices: [

                        {
                            text: "تابع",
                            next: "c4_experiment"
                        }
                    ]

                },

                {

                    id: "c4_experiment",

                    title: "التجربة",

                    location: "غرفة التحكم",

                    text:
                        "ظهرت كلمة PROJECT SHADOW على الشاشة.",

                    event: "glitch",

                    choices: [

                        {
                            text: "أبحث عن ملف المشروع",
                            next: "c4_escape"
                        }
                    ]

                },

                {

                    id: "c4_escape",

                    title: "الهروب",

                    location: "الممر",

                    text:
                        "بدأت أجهزة الإنذار تعمل. باب حديدي فتح في نهاية الممر.",

                    event: "danger",

                    choices: [

                        {
                            text: "أهرب",
                            next: "c5_lian"
                        }
                    ]

                }

            ]

        },


        /* =================================================
           CHAPTER 05
           ================================================= */

        {

            id: 5,

            title: "ليان",

            subtitle: "الشخص الوحيد الذي يعرف اسمك",

            location: "الممر السفلي",

            scenes: [

                {

                    id: "c5_lian",

                    title: "الفتاة",

                    location: "الممر",

                    text:
                        "ظهرت فتاة من الظلام. قالت: وليد... أخيراً وجدتك.",

                    event: "light",

                    choices: [

                        {
                            text: "من أنت؟",
                            next: "c5_lian_intro"
                        },

                        {
                            text: "كيف تعرفين اسمي؟",
                            next: "c5_lian_intro"
                        }

                    ]

                },

                {

                    id: "c5_lian_intro",

                    title: "ليان",

                    location: "الممر",

                    text:
                        "أنا ليان. وإذا بقيت هنا أكثر، لن تتذكر حتى اسمك.",

                    event: "danger",

                    choices: [

                        {
                            text: "أثق بها",
                            next: "c5_lian_name",
                            effects: {
                                flags: {
                                    metLian: true,
                                    trustedLian: true
                                }
                            }
                        },

                        {
                            text: "لا أثق بها",
                            next: "c5_lian_name",
                            effects: {
                                flags: {
                                    metLian: true,
                                    liedToLian: true
                                }
                            }
                        }

                    ]

                },

                {

                    id: "c5_lian_name",

                    title: "الاسم",

                    location: "الممر",

                    text:
                        "قالت ليان: أنت لم تأت إلى هنا صدفة. أنت من بدأ كل هذا.",

                    event: "memory",

                    choices: [

                        {
                            text: "مستحيل",
                            next: "c5_photo"
                        },

                        {
                            text: "أريد الدليل",
                            next: "c5_photo"
                        }

                    ]

                },

                {

                    id: "c5_photo",

                    title: "الصورة الثانية",

                    location: "غرفة قديمة",

                    text:
                        "أخرجت ليان صورة أخرى. الصورة نفسها التي وجدتها في البيت... لكن وليد كان يقف في مكان مختلف.",

                    puzzle: "photoDifference",

                    choices: [

                        {
                            text: "أحل اللغز",
                            next: "c5_help"
                        }

                    ]

                },

                {

                    id: "c5_help",

                    title: "المساعدة",

                    location: "غرفة التحكم",

                    text:
                        "قالت ليان: إذا أردت الحقيقة، ساعدني على الوصول إلى المختبر الرئيسي.",

                    choices: [

                        {
                            text: "أساعدها",
                            next: "c5_lab",
                            effects: {
                                flags: {
                                    helpedLian: true
                                }
                            }
                        },

                        {
                            text: "أتركها",
                            next: "c5_alone",
                            effects: {
                                flags: {
                                    abandonedLian: true
                                }
                            }
                        }

                    ]

                },

                {

                    id: "c5_alone",

                    title: "وحدك",

                    location: "الممر",

                    text:
                        "مشى وليد وحده. بعد عدة خطوات سمع صوت ليان خلفه: لا تثق بالظل.",

                    event: "whisper",

                    choices: [

                        {
                            text: "أعود إليها",
                            next: "c5_lab"
                        },

                        {
                            text: "أكمل وحدي",
                            next: "c5_lab"
                        }

                    ]

                },

                {

                    id: "c5_lab",

                    title: "المختبر الرئيسي",

                    location: "المختبر",

                    text:
                        "الباب الرئيسي يحتاج إلى بطاقة معدنية. ليان تنظر إلى وليد وكأنها تعرف أين توجد.",

                    puzzle: "labAccess",

                    choices: [

                        {
                            text: "أفتح المختبر",
                            next: "c6_facility"
                        }

                    ]

                }

            ]

        },


        /* =================================================
           CHAPTER 06
           ================================================= */

        {

            id: 6,

            title: "الملف الأسود",

            subtitle: "اسمك مكتوب في كل صفحة",

            location: "المختبر الرئيسي",

            scenes: [

                {

                    id: "c6_facility",

                    title: "المختبر",

                    location: "المختبر الرئيسي",

                    text:
                        "أجهزة كثيرة تعمل رغم عدم وجود كهرباء في القرية.",

                    event: "flicker",

                    choices: [

                        {
                            text: "أبحث عن الملفات",
                            next: "c6_files"
                        }

                    ]

                },

                {

                    id: "c6_files",

                    title: "الأرشيف",

                    location: "الأرشيف",

                    text:
                        "أمامك عشرات الملفات. واحد منها أسود بالكامل.",

                    puzzle: "blackFile",

                    choices: [

                        {
                            text: "أختار الملف",
                            next: "c6_file_truth"
                        }

                    ]

                },

                {

                    id: "c6_file_truth",

                    title: "PROJECT SHADOW",

                    location: "الأرشيف",

                    text:
                        "الملف يقول: الهدف ليس إنشاء شخص جديد... الهدف هو إعادة كتابة الذاكرة.",

                    event: "darkness",

                    choices: [

                        {
                            text: "أتابع",
                            next: "c6_previous"
                        }
                    ]

                },

                {

                    id: "c6_previous",

                    title: "قبل وليد",

                    location: "الأرشيف",

                    text:
                        "وجد وليد ملفات تحمل اسمه من سنوات مختلفة.",

                    event: "memory",

                    choices: [

                        {
                            text: "أفتح أقدم ملف",
                            next: "c6_cameras",
                            effects: {
                                flags: {
                                    discoveredFile: true,
                                    collectedEvidence3: true
                                }
                            }
                        }
                    ]

                },

                {

                    id: "c6_cameras",

                    title: "الكاميرات",

                    location: "غرفة المراقبة",

                    text:
                        "شاشة المراقبة تعرض البيت رقم 17. في الفيديو يظهر وليد وهو يدخل البيت... قبل سنوات.",

                    event: "glitch",

                    choices: [

                        {
                            text: "أشاهد الفيديو",
                            next: "c7_memory"
                        }
                    ]

                }

            ]

        },


        /* =================================================
           CHAPTER 07
           ================================================= */

        {

            id: 7,

            title: "الذاكرة",

            subtitle: "ليست كل ذكرياتك حقيقية",

            location: "غرفة الذاكرة",

            scenes: [

                {

                    id: "c7_memory",

                    title: "الغرفة البيضاء",

                    location: "غرفة الذاكرة",

                    text:
                        "كل شيء أبيض. لا يوجد باب. فقط شاشة أمام وليد.",

                    event: "light",

                    choices: [

                        {
                            text: "ألمس الشاشة",
                            next: "c7_memory2"
                        }
                    ]

                },

                {

                    id: "c7_memory2",

                    title: "ثلاث ذكريات",

                    location: "الذاكرة",

                    text:
                        "ظهرت ثلاث صور: البيت، المختبر، الحادث.",

                    puzzle: "memoryOrder",

                    choices: [

                        {
                            text: "ترتيب الذكريات",
                            next: "c7_lian_truth"
                        }
                    ]

                },

                {

                    id: "c7_lian_truth",

                    title: "حقيقة ليان",

                    location: "الذاكرة",

                    text:
                        "قالت ليان: أنا لم أكن جزءاً من التجربة. أنا من حاول إيقافها.",

                    event: "memory",

                    choices: [

                        {
                            text: "أصدقها",
                            next: "c7_fear",
                            effects: {
                                flags: {
                                    trustedLian: true
                                }
                            }
                        },

                        {
                            text: "أشك فيها",
                            next: "c7_fear"
                        }

                    ]

                },

                {

                    id: "c7_fear",

                    title: "الخوف",

                    location: "غرفة الذاكرة",

                    text:
                        "ظهر الظل خلف وليد. هذه المرة لم يكن انعكاساً.",

                    event: "shadow",

                    choices: [

                        {
                            text: "أواجهه",
                            next: "c7_archive"
                        },

                        {
                            text: "أهرب",
                            next: "c7_archive"
                        }
                    ]

                },

                {

                    id: "c7_archive",

                    title: "الأرشيف",

                    location: "ممر الأرشيف",

                    text:
                        "باب يحمل عبارة: ARCHIVE — LEVEL 7.",

                    choices: [

                        {
                            text: "أدخل",
                            next: "c7_accident"
                        }
                    ]

                },

                {

                    id: "c7_accident",

                    title: "الحادث",

                    location: "ذاكرة وليد",

                    text:
                        "تظهر ذكرى سيارة متوقفة على طريق جبلي. الساعة 03:17.",

                    event: "flash",

                    choices: [

                        {
                            text: "أتذكر",
                            next: "c8_city",
                            effects: {
                                flags: {
                                    sawMemory