/* =========================================================
   ظلال المجهول
   DATA ENGINE — ULTRA 3.0
   ========================================================= */

const GAME_DATA = {

    /* =====================================================
       GAME
       ===================================================== */

    game: {
        title: "ظلال المجهول",
        version: "3.0.0 ULTRA",
        protagonist: "آدم",

        maxHealth: 100,
        startingHealth: 100,
        startingCoins: 25,

        chaptersCount: 12,

        intro: {
            title: "ظلال المجهول",
            subtitle: "كل اختيار له أثر... وكل باب يخفي قصة."
        }
    },


    /* =====================================================
       ITEMS
       ===================================================== */

    items: {

        oldKey: {
            name: "المفتاح الصدئ",
            icon: "🗝️"
        },

        photograph: {
            name: "الصورة القديمة",
            icon: "🖼️"
        },

        brokenPhone: {
            name: "الهاتف المكسور",
            icon: "📱"
        },

        diary: {
            name: "المذكرات السوداء",
            icon: "📓"
        },

        basementKey: {
            name: "مفتاح القبو",
            icon: "🔑"
        },

        flashlight: {
            name: "المصباح اليدوي",
            icon: "🔦"
        },

        tape: {
            name: "شريط التسجيل",
            icon: "📼"
        },

        photograph2: {
            name: "صورة الغرفة",
            icon: "🖼️"
        },

        metalCard: {
            name: "البطاقة المعدنية",
            icon: "▣"
        },

        crowSymbol: {
            name: "رمز الغراب",
            icon: "◈"
        },

        letter: {
            name: "الرسالة",
            icon: "✉️"
        },

        masterKey: {
            name: "المفتاح الرئيسي",
            icon: "🗝️"
        },

        archiveBadge: {
            name: "شارة الأرشيف",
            icon: "◇"
        },

        blackFile: {
            name: "الملف الأسود",
            icon: "📁"
        },

        memoryFragment: {
            name: "شظية ذاكرة",
            icon: "✦"
        }
    },


    /* =====================================================
       FLAGS
       ===================================================== */

    flags: {

        metLian: false,
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

        liedToLian: false,
        liedToYoussef: false,

        helpedLian: false,
        abandonedLian: false,

        sawMemory1: false,
        sawMemory2: false,
        sawMemory3: false,

        knowsNumber0317: false,
        knowsAboutExperiment: false,
        knowsAboutAdam: false,

        collectedEvidence1: false,
        collectedEvidence2: false,
        collectedEvidence3: false,
        collectedEvidence4: false,
        collectedEvidence5: false,

        enteredForbiddenArea: false,
        escapedVillage: false,

        knowsTruth: false,
        knowsWhoIsLian: false,
        knowsWhoIsAdam: false,

        openedFinalDoor: false,

        refusedExperiment: false,
        acceptedTruth: false,

        completedArchive: false,
        foundFinalMessage: false,

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
            description: "اكتشفت صورة قديمة."
        },

        basement: {
            name: "ما تحت الأرض",
            description: "وصلت إلى القبو."
        },

        listener: {
            name: "المستمع",
            description: "استمعت إلى التسجيل."
        },

        truth_seeker: {
            name: "باحث الحقيقة",
            description: "اقتربت من الحقيقة."
        },

        survivor: {
            name: "الناجي",
            description: "وصلت إلى النهاية."
        },

        trust: {
            name: "الثقة",
            description: "وثقت بشخص مهم."
        },

        secret_room: {
            name: "الغرفة السرية",
            description: "فتحت الطريق المخفي."
        },

        complete_memory: {
            name: "الذاكرة الكاملة",
            description: "استعدت شظايا الذاكرة."
        },

        collector: {
            name: "جامع الأدلة",
            description: "جمعت مجموعة من الأدلة."
        },

        true_ending: {
            name: "الحقيقة",
            description: "وصلت إلى النهاية الحقيقية."
        }
    },


    /* =====================================================
       CHAPTERS
       ===================================================== */

    chapters: [


        /* =================================================
           CHAPTER 1
           ================================================= */

        {
            id: 1,
            title: "03:17",

            scenes: [

                {
                    id: "c1_start",

                    title: "الاستيقاظ",
                    location: "مكان مجهول",
                    time: "03:17",

                    events: [

                        {
                            type: "darkness",
                            duration: 650
                        },

                        {
                            type: "flash",
                            color: "#d9ecff",
                            duration: 180
                        },

                        {
                            type: "shake",
                            intensity: 2,
                            duration: 220
                        },

                        {
                            type: "light",
                            color: "#55a8ff",
                            intensity: 0.7,
                            duration: 1000
                        }
                    ],

                    text:
                        "فتح آدم عينيه ببطء. كان أول ما شعر به هو البرد. " +
                        "مصباح وحيد في السقف يومض بصورة متقطعة. " +
                        "وعلى الجدار المقابل ظهرت أرقام محفورة بعناية: 03:17. " +
                        "حاول آدم أن يتذكر آخر شيء حدث له... لكن ذاكرته كانت فارغة.",

                    choices: [

                        {
                            text: "تفقد المكان",
                            next: "c1_car",

                            effects: {
                                coins: 2
                            }
                        },

                        {
                            text: "ابحث عن هاتفك",
                            next: "c1_phone"
                        },

                        {
                            text: "اخرج فورًا",
                            next: "c1_exit"
                        }
                    ]
                },


                {
                    id: "c1_car",

                    title: "السيارة السوداء",
                    location: "طريق ريفي",
                    time: "03:21",

                    events: [

                        {
                            type: "light",
                            color: "#dcecff",
                            duration: 900
                        },

                        {
                            type: "fog",
                            duration: 1300
                        }
                    ],

                    text:
                        "خرج آدم إلى طريق تحيطه الأشجار. " +
                        "سيارة سوداء متوقفة في الظلام، ومصابيحها الأمامية مضاءة " +
                        "رغم عدم وجود أحد بداخلها.",

                    choices: [

                        {
                            text: "اقترب من السيارة",
                            next: "c1_stranger",

                            events: [
                                {
                                    type: "flash",
                                    color: "#8ecbff",
                                    duration: 220
                                }
                            ]
                        },

                        {
                            text: "انظر من النافذة",
                            next: "c1_window"
                        },

                        {
                            text: "تجاهلها وتابع الطريق",
                            next: "c1_silent"
                        }
                    ]
                },


                {
                    id: "c1_phone",

                    title: "الهاتف",
                    location: "الغرفة",
                    time: "03:17",

                    events: [

                        {
                            type: "glitch",
                            duration: 600
                        },

                        {
                            type: "shake",
                            intensity: 2,
                            duration: 180
                        }
                    ],

                    text:
                        "وجد آدم هاتفًا مكسور الشاشة تحت الكرسي. " +
                        "الرقم الظاهر الوحيد هو 0317. " +
                        "بدأ الهاتف يرن فجأة.",

                    choices: [

                        {
                            text: "أجب على الاتصال",
                            next: "c1_call",

                            effects: {

                                items: [
                                    "brokenPhone"
                                ],

                                flags: {
                                    knowsNumber0317: true
                                }
                            },

                            events: [

                                {
                                    type: "alert",
                                    duration: 450
                                },

                                {
                                    type: "flash",
                                    color: "#65b8ff",
                                    duration: 160
                                }
                            ]
                        },

                        {
                            text: "لا تجب",
                            next: "c1_exit",

                            effects: {
                                items: [
                                    "brokenPhone"
                                ]
                            }
                        }
                    ]
                },


                {
                    id: "c1_call",

                    title: "الصوت",
                    location: "الغرفة",
                    time: "03:17",

                    events: [

                        {
                            type: "darkness",
                            duration: 300
                        },

                        {
                            type: "glitch",
                            duration: 700
                        },

                        {
                            type: "whisper",
                            duration: 700
                        }
                    ],

                    text:
                        "صمت الطرف الآخر لثوانٍ. " +
                        "ثم جاء صوت منخفض: «لا تثق بمن يعرف اسمك.» " +
                        "انقطع الاتصال فورًا.",

                    choices: [

                        {
                            text: "انتظر",
                            next: "c1_wait",

                            events: [

                                {
                                    type: "pause",
                                    duration: 500
                                },

                                {
                                    type: "flash",
                                    color: "#ffffff",
                                    duration: 100
                                }
                            ]
                        },

                        {
                            text: "اخرج",
                            next: "c1_exit"
                        }
                    ]
                },


                {
                    id: "c1_stranger",

                    title: "الرجل بين الأشجار",
                    location: "الغابة",
                    time: "03:25",

                    events: [

                        {
                            type: "fog",
                            duration: 1200
                        },

                        {
                            type: "light",
                            color: "#5faaff",
                            duration: 900
                        }
                    ],

                    text:
                        "بين الأشجار وقف رجل لا يظهر وجهه بوضوح. " +
                        "قال بهدوء: «تأخرت كثيرًا يا آدم.»",

                    choices: [

                        {
                            text: "اتبعه",
                            next: "c2_village",

                            effects: {

                                flags: {
                                    metStranger: true,
                                    trustedStranger: true
                                }
                            }
                        },

                        {
                            text: "ابتعد عنه",
                            next: "c2_village",

                            effects: {

                                flags: {
                                    metStranger: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c1_window",

                    title: "الانعكاس",
                    location: "السيارة",

                    events: [

                        {
                            type: "memory",
                            duration: 850
                        },

                        {
                            type: "glitch",
                            duration: 500
                        }
                    ],

                    text:
                        "في زجاج السيارة رأى آدم انعكاس وجهه... " +
                        "وخلفه شخصًا واقفًا. " +
                        "التفت بسرعة. لم يكن هناك أحد.",

                    choices: [

                        {
                            text: "اذهب إلى القرية",
                            next: "c2_village"
                        }
                    ]
                },


                {
                    id: "c1_silent",

                    title: "الطريق",
                    location: "الغابة",

                    events: [

                        {
                            type: "fog",
                            duration: 1400
                        }
                    ],

                    text:
                        "تابع آدم السير. " +
                        "في نهاية الطريق ظهرت أضواء قرية هادئة بشكل غير طبيعي.",

                    choices: [

                        {
                            text: "ادخل القرية",
                            next: "c2_village"
                        }
                    ]
                },


                {
                    id: "c1_wait",

                    title: "نحن نراك",
                    location: "الغرفة",

                    events: [

                        {
                            type: "darkness",
                            duration: 350
                        },

                        {
                            type: "glitch",
                            duration: 500
                        }
                    ],

                    text:
                        "انتظر آدم. " +
                        "أضاء الهاتف وحده وظهرت رسالة واحدة: «نحن نراك.»",

                    choices: [

                        {
                            text: "اذهب إلى القرية",
                            next: "c2_village"
                        }
                    ]
                },


                {
                    id: "c1_exit",

                    title: "الخروج",
                    location: "طريق الغابة",

                    events: [

                        {
                            type: "flash",
                            color: "#6bb8ff",
                            duration: 120
                        },

                        {
                            type: "fog",
                            duration: 1000
                        }
                    ],

                    text:
                        "خرج آدم من المبنى. " +
                        "الهواء بارد والطريق ممتد نحو أضواء بعيدة. " +
                        "في الأفق ظهرت قرية لا تنام.",

                    choices: [

                        {
                            text: "اتجه إلى القرية",
                            next: "c2_village"
                        }
                    ]
                }
            ]
        },


        /* =================================================
           CHAPTER 2
           ================================================= */

        {
            id: 2,
            title: "القرية التي لا تنام",

            scenes: [

                {
                    id: "c2_village",

                    title: "القرية",
                    location: "القرية",
                    time: "03:41",

                    events: [

                        {
                            type: "fog",
                            duration: 1200
                        }
                    ],

                    text:
                        "كل مصابيح القرية مضاءة، لكن الشوارع خالية. " +
                        "عند المدخل كُتبت عبارة: «من يدخل يعرف... ومن يعرف لا يعود كما كان.»",

                    choices: [

                        {
                            text: "ابحث عن شخص",
                            next: "c2_youssef"
                        },

                        {
                            text: "ابحث عن مكان تعرفه",
                            next: "c2_identity"
                        },

                        {
                            text: "حاول المغادرة",
                            next: "c2_leave"
                        }
                    ]
                },


                {
                    id: "c2_youssef",

                    title: "يوسف",
                    location: "القرية",

                    events: [

                        {
                            type: "light",
                            color: "#6bb8ff",
                            duration: 700
                        }
                    ],

                    text:
                        "ظهر رجل اسمه يوسف. " +
                        "قال: «أخيرًا وصلت.» " +
                        "ثم أخرج مفتاحًا صدئًا وقال إن البيت رقم 17 ينتظرك.",

                    choices: [

                        {
                            text: "ثق به",
                            next: "c2_key",

                            effects: {

                                items: [
                                    "oldKey"
                                ],

                                flags: {
                                    trustedYoussef: true
                                }
                            }
                        },

                        {
                            text: "لا تثق به",
                            next: "c2_square"
                        }
                    ]
                },


                {
                    id: "c2_key",

                    title: "المفتاح 17",
                    location: "القرية",

                    text:
                        "وضع يوسف المفتاح في يد آدم. " +
                        "«لا تسأل لماذا أنت هنا. اذهب إلى البيت 17.»",

                    choices: [

                        {
                            text: "اذهب إلى البيت",
                            next: "c3_house"
                        }
                    ]
                },


                {
                    id: "c2_identity",

                    title: "الاسم",
                    location: "الساحة",

                    events: [

                        {
                            type: "memory",
                            duration: 700
                        }
                    ],

                    text:
                        "وجد آدم لوحًا حجريًا قديمًا. " +
                        "الاسم المحفور عليه يشبه اسمه بشكل مخيف.",

                    choices: [

                        {
                            text: "دقق في الكتابة",
                            next: "c2_identity2"
                        },

                        {
                            text: "ابتعد",
                            next: "c2_square"
                        }
                    ]
                },


                {
                    id: "c2_identity2",

                    title: "آدم نادر",
                    location: "الساحة",

                    text:
                        "ظهر الاسم: «آدم نادر — قبل 17 عامًا». " +
                        "لم يتذكر آدم أي شيء.",

                    choices: [

                        {
                            text: "تابع إلى الساحة",
                            next: "c2_square"
                        }
                    ]
                },


                {
                    id: "c2_square",

                    title: "رمز الغراب",
                    location: "الساحة",

                    events: [

                        {
                            type: "flash",
                            color: "#d9b867",
                            duration: 180
                        },

                        {
                            type: "shake",
                            intensity: 2,
                            duration: 220
                        }
                    ],

                    text:
                        "على حجر قديم نُحت رمز غراب. " +
                        "عندما لمسه آدم شعر بوخزة، ثم سمع: " +
                        "«لا تلمس الأشياء التي تتذكرك.»",

                    choices: [

                        {
                            text: "افحص الرمز",
                            next: "c2_symbol",

                            effects: {

                                items: [
                                    "crowSymbol"
                                ],

                                flags: {
                                    collectedEvidence1: true
                                }
                            }
                        },

                        {
                            text: "اذهب إلى النزل",
                            next: "c2_inn"
                        }
                    ]
                },


                {
                    id: "c2_symbol",

                    title: "الرقم 17",
                    location: "الساحة",

                    events: [

                        {
                            type: "light",
                            color: "#d9b867",
                            duration: 650
                        }
                    ],

                    text:
                        "كان الرمز موجودًا أيضًا على خاتم قديم. " +
                        "بجانبه ورقة تحمل الرقم 17.",

                    choices: [

                        {
                            text: "ابحث عن الطفل",
                            next: "c2_child"
                        },

                        {
                            text: "اتجه إلى النزل",
                            next: "c2_inn"
                        }
                    ]
                },


                {
                    id: "c2_child",

                    title: "الطفل",
                    location: "القرية",

                    events: [

                        {
                            type: "whisper",
                            duration: 600
                        }
                    ],

                    text:
                        "قال طفل من بعيد: «كنت هنا من قبل... أخذوا الجزء المهم.» " +
                        "ثم اختفى خلف باب.",

                    choices: [

                        {
                            text: "اذهب إلى البيت 17",
                            next: "c3_house",

                            effects: {

                                flags: {
                                    knowsAboutAdam: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c2_inn",

                    title: "الصورة",
                    location: "النزل",

                    events: [

                        {
                            type: "memory",
                            duration: 700
                        }
                    ],

                    text:
                        "كان النزل فارغًا. " +
                        "على الحائط صورة قديمة لآدم أمام البيت رقم 17.",

                    choices: [

                        {
                            text: "خذ الصورة",
                            next: "c3_house",

                            effects: {

                                items: [
                                    "photograph"
                                ],

                                flags: {
                                    foundPhotograph: true,
                                    collectedEvidence2: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c2_leave",

                    title: "الطريق الدائري",
                    location: "خارج القرية",

                    events: [

                        {
                            type: "glitch",
                            duration: 650
                        }
                    ],

                    text:
                        "مشى آدم طويلًا ثم وجد نفسه أمام القرية نفسها. " +
                        "في الجهة الأخرى ظهر مبنى يحمل الرقم 17.",

                    choices: [

                        {
                            text: "ادخل المبنى",
                            next: "c3_house"
                        }
                    ]
                }
            ]
        },


        /* =================================================
           CHAPTER 3
           ================================================= */

        {
            id: 3,
            title: "البيت رقم 17",

            scenes: [

                {
                    id: "c3_house",

                    title: "البيت",
                    location: "البيت 17",

                    events: [

                        {
                            type: "light",
                            duration: 800
                        },

                        {
                            type: "fog",
                            duration: 900
                        }
                    ],

                    text:
                        "الباب نصف مفتوح. " +
                        "خلف إحدى النوافذ يتحرك ضوء بطيء كأن أحدًا يراقبك.",

                    choices: [

                        {
                            text: "ادخل",
                            next: "c3_inside"
                        },

                        {
                            text: "ارجع",
                            next: "c2_village"
                        }
                    ]
                },


                {
                    id: "c3_inside",

                    title: "الغرفة النظيفة",
                    location: "البيت 17",

                    text:
                        "الغبار يغطي كل شيء باستثناء صورة واحدة نظيفة فوق الطاولة.",

                    choices: [

                        {
                            text: "اتبع الممر",
                            next: "c3_hall"
                        },

                        {
                            text: "افحص الصورة",
                            next: "c3_hall"
                        }
                    ]
                },


                {
                    id: "c3_hall",

                    title: "الصورة",
                    location: "الممر",

                    events: [

                        {
                            type: "memory",
                            duration: 650
                        }
                    ],

                    text:
                        "الصورة تُظهر غرفة تشبه المكان الذي استيقظ فيه آدم تمامًا.",

                    choices: [

                        {
                            text: "اذهب إلى الغرفة",
                            next: "c3_room",

                            effects: {

                                items: [
                                    "photograph2"
                                ],

                                flags: {
                                    collectedEvidence3: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c3_room",

                    title: "الغرفة السرية",
                    location: "البيت 17",

                    events: [

                        {
                            type: "light",
                            duration: 500
                        }
                    ],

                    text:
                        "وجد آدم مذكرات سوداء ومسجلًا وبابًا صغيرًا مخفيًا خلف خزانة.",

                    choices: [

                        {
                            text: "اقرأ المذكرات",
                            next: "c3_diary"
                        },

                        {
                            text: "شغل المسجل",
                            next: "c3_tape"
                        },

                        {
                            text: "افحص الباب",
                            next: "c3_secret"
                        }
                    ]
                },


                {
                    id: "c3_diary",

                    title: "المذكرات السوداء",
                    location: "الغرفة",

                    events: [

                        {
                            type: "glitch",
                            duration: 500
                        }
                    ],

                    text:
                        "«يمكن فصل الذاكرة عن صاحبها. " +
                        "لكن الذكريات لا تموت بسهولة.»",

                    choices: [

                        {
                            text: "تابع القراءة",
                            next: "c3_diary2",

                            effects: {

                                items: [
                                    "diary"
                                ],

                                flags: {
                                    foundDiary: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c3_diary2",

                    title: "التجربة 0317",
                    location: "الغرفة",

                    events: [

                        {
                            type: "alert",
                            duration: 500
                        },

                        {
                            type: "flash",
                            color: "#65b8ff",
                            duration: 150
                        }
                    ],

                    text:
                        "«التجربة 0317: تعديل الذاكرة. " +
                        "الهدف ليس العقل... الهدف هو ما يحمله العقل.»",

                    choices: [

                        {
                            text: "تذكر",
                            next: "c3_memory1",

                            effects: {

                                flags: {
                                    knowsAboutExperiment: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c3_memory1",

                    title: "الذكرى الأولى",
                    location: "ذاكرة آدم",

                    events: [

                        {
                            type: "memory",
                            duration: 1000
                        },

                        {
                            type: "flash",
                            color: "#ffffff",
                            duration: 260
                        },

                        {
                            type: "shake",
                            intensity: 2,
                            duration: 200
                        }
                    ],

                    text:
                        "غرفة بيضاء. " +
                        "زجاج يفصل آدم عن شخص يقف خلفه. " +
                        "جاء صوت: «ابدأ التسجيل... الثالثة وسبع عشرة دقيقة.»",

                    choices: [

                        {
                            text: "افتح عينيك",
                            next: "c3_secret",

                            effects: {

                                flags: {
                                    sawMemory1: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c3_tape",

                    title: "التسجيل",
                    location: "الغرفة",

                    events: [

                        {
                            type: "whisper",
                            duration: 800
                        },

                        {
                            type: "glitch",
                            duration: 650
                        }
                    ],

                    text:
                        "جاء صوت آدم من التسجيل: " +
                        "«إذا كنت تسمع هذا، فقد فشلت الخطة الأولى. " +
                        "لا تصدق أي نسخة منك.»",

                    choices: [

                        {
                            text: "أوقف التسجيل",
                            next: "c3_secret",

                            effects: {

                                items: [
                                    "tape"
                                ],

                                flags: {
                                    heardTape: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c3_secret",

                    title: "الطريق إلى الأسفل",
                    location: "البيت 17",

                    events: [

                        {
                            type: "darkness",
                            duration: 400
                        },

                        {
                            type: "light",
                            color: "#4d9dff",
                            duration: 900
                        },

                        {
                            type: "shake",
                            intensity: 3,
                            duration: 260
                        }
                    ],

                    text:
                        "خلف الخزانة آلية مخفية. " +
                        "فُتح باب يؤدي إلى درج طويل تحت الأرض. " +
                        "في نهايته باب كتب عليه: ممنوع.",

                    choices: [

                        {
                            text: "انزل",
                            next: "c3_basement",

                            effects: {

                                items: [
                                    "metalCard",
                                    "basementKey"
                                ],

                                flags: {
                                    foundBasement: true,
                                    openedSecretRoom: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c3_basement",

                    title: "القبو",
                    location: "المنشأة تحت الأرض",

                    events: [

                        {
                            type: "darkness",
                            duration: 500
                        },

                        {
                            type: "fog",
                            duration: 1000
                        },

                        {
                            type: "glitch",
                            duration: 600
                        }
                    ],

                    text:
                        "ممر إسمنتي طويل. " +
                        "الرقم 0317 يتكرر على الجدران. " +
                        "في النهاية باب معدني يهتز من الجهة الأخرى.",

                    choices: [

                        {
                            text: "افتح الباب",
                            next: "c4_underground"
                        }
                    ]
                }
            ]
        },


        /* =================================================
           CHAPTER 4
           ================================================= */

        {
            id: 4,
            title: "الشخص الذي يشبهك",

            scenes: [

                {
                    id: "c4_underground",

                    title: "المنشأة",
                    location: "تحت الأرض",

                    events: [

                        {
                            type: "light",
                            duration: 700
                        }
                    ],

                    text:
                        "من خلف الباب ظهرت منشأة قديمة. " +
                        "وفي الممر وقف شخص يشبه آدم.",

                    choices: [

                        {
                            text: "اقترب",
                            next: "c4_mirror"
                        },

                        {
                            text: "ابق بعيدًا",
                            next: "c4_room"
                        }
                    ]
                },


                {
                    id: "c4_mirror",

                    title: "النسخة",
                    location: "المنشأة",

                    events: [

                        {
                            type: "memory",
                            duration: 800
                        },

                        {
                            type: "glitch",
                            duration: 600
                        }
                    ],

                    text:
                        "كان وجهه قريبًا جدًا من وجه آدم. " +
                        "قال: «لا تقلق... أنت لست أول من وصل.»",

                    choices: [

                        {
                            text: "اسأله من يكون",
                            next: "c4_room"
                        }
                    ]
                },


                {
                    id: "c4_room",

                    title: "الملفات",
                    location: "الأرشيف",

                    text:
                        "ملفات كثيرة تحمل اسم آدم، " +
                        "لكن بجانب الاسم أرقام مختلفة.",

                    choices: [

                        {
                            text: "افتح ملفًا",
                            next: "c4_double"
                        },

                        {
                            text: "ابحث عن مخرج",
                            next: "c4_escape"
                        }
                    ]
                },


                {
                    id: "c4_double",

                    title: "الحقيقة الأولى",
                    location: "الأرشيف",

                    events: [

                        {
                            type: "flash",
                            color: "#d9b867",
                            duration: 180
                        }
                    ],

                    text:
                        "قال الشخص: «أنا لا أشبهك... أنت الذي تشبهني.» " +
                        "ثم أشار إلى شاشة تحمل 0317.",

                    choices: [

                        {
                            text: "استمع إليه",
                            next: "c4_truth",

                            effects: {

                                flags: {
                                    trustedStranger: true
                                }
                            }
                        },

                        {
                            text: "اهرب",
                            next: "c4_escape"
                        }
                    ]
                },


                {
                    id: "c4_truth",

                    title: "ما حُذف",
                    location: "غرفة المراقبة",

                    events: [

                        {
                            type: "glitch",
                            duration: 700
                        }
                    ],

                    text:
                        "«التجربة حذفت شيئًا من شخص موجود أصلًا. " +
                        "لكن شيئًا واحدًا لم يستطعوا حذفه.»",

                    choices: [

                        {
                            text: "ما هو؟",
                            next: "c4_experiment"
                        }
                    ]
                },


                {
                    id: "c4_experiment",

                    title: "ذاكرتك",
                    location: "غرفة المراقبة",

                    events: [

                        {
                            type: "memory",
                            duration: 850
                        }
                    ],

                    text:
                        "«ذاكرتك. ولهذا أعادوك إلى هنا.» " +
                        "في الشاشة ظهر اسم ليان.",

                    choices: [

                        {
                            text: "اذهب إلى ليان",
                            next: "c5_lian"
                        }
                    ]
                },


                {
                    id: "c4_escape",

                    title: "الهروب",
                    location: "المنشأة",

                    events: [

                        {
                            type: "shake",
                            intensity: 4,
                            duration: 350
                        }
                    ],

                    text:
                        "ركض آدم. " +
                        "على إحدى الشاشات ظهرت ليان وكأنها كانت تنتظره.",

                    choices: [

                        {
                            text: "اتبع الإشارة",
                            next: "c5_lian"
                        }
                    ]
                }
            ]
        },


        /* =================================================
           CHAPTER 5
           ================================================= */

        {
            id: 5,
            title: "ليان",

            scenes: [

                {
                    id: "c5_lian",

                    title: "ليان",
                    location: "الباب المعدني",

                    events: [

                        {
                            type: "light",
                            color: "#65b8ff",
                            duration: 700
                        }
                    ],

                    text:
                        "كانت ليان تقف عند باب معدني. " +
                        "قالت: «كنت أعرف أنك ستصل.»",

                    choices: [

                        {
                            text: "اسألها عن اسمك",
                            next: "c5_lian_name"
                        },

                        {
                            text: "اسألها عن التجربة",
                            next: "c5_lian_intro"
                        }
                    ]
                },


                {
                    id: "c5_lian_intro",

                    title: "الثقة",
                    location: "المنشأة",

                    text:
                        "قالت ليان إنها تستطيع مساعدتك على تذكر البداية، " +
                        "لكن عليها أن تعرف هل تثق بها.",

                    choices: [

                        {
                            text: "أثق بك",
                            next: "c5_help",

                            effects: {

                                flags: {
                                    metLian: true,
                                    trustedLian: true,
                                    helpedLian: true
                                }
                            }
                        },

                        {
                            text: "لن أثق بك",
                            next: "c5_alone",

                            effects: {

                                flags: {
                                    metLian: true,
                                    abandonedLian: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c5_lian_name",

                    title: "بدأت تتذكر",
                    location: "المنشأة",

                    events: [

                        {
                            type: "memory",
                            duration: 700
                        }
                    ],

                    text:
                        "ابتسمت ليان: «إذن بدأت تتذكر.» " +
                        "أخرجت صورة قديمة لكما أمام المنشأة.",

                    choices: [

                        {
                            text: "خذ الصورة",
                            next: "c5_photo",

                            effects: {

                                items: [
                                    "photograph2"
                                ],

                                flags: {
                                    collectedEvidence4: true
                                }
                            }
                        },

                        {
                            text: "اتبعها إلى المختبر",
                            next: "c5_lab"
                        }
                    ]
                },


                {
                    id: "c5_photo",

                    title: "الصورة المشتركة",
                    location: "الأرشيف",

                    text:
                        "في الصورة يقف آدم وليان بجانب جهاز التجربة. " +
                        "خلفهما الرقم 0317.",

                    choices: [

                        {
                            text: "اذهب للمختبر",
                            next: "c5_lab"
                        }
                    ]
                },


                {
                    id: "c5_help",

                    title: "التحالف",
                    location: "المنشأة",

                    events: [

                        {
                            type: "light",
                            duration: 700
                        }
                    ],

                    text:
                        "قادته ليان إلى مدخل جانبي. " +
                        "قالت إن العودة إلى قلب التجربة هي الطريق الوحيد للحقيقة.",

                    choices: [

                        {
                            text: "اذهب معها",
                            next: "c5_lab"
                        }
                    ]
                },


                {
                    id: "c5_alone",

                    title: "وحدك",
                    location: "المنشأة",

                    text:
                        "ابتعدت ليان. " +
                        "بقي الشك في ذهن آدم، لكنه عرف أن المختبر هو الطريق الوحيد.",

                    choices: [

                        {
                            text: "اذهب إلى المختبر",
                            next: "c5_lab"
                        }
                    ]
                },


                {
                    id: "c5_lab",

                    title: "المختبر",
                    location: "المنشأة",

                    events: [

                        {
                            type: "alert",
                            duration: 450
                        },

                        {
                            type: "light",
                            duration: 850
                        }
                    ],

                    text:
                        "بطاقة ليان فتحت مدخلًا جانبيًا. " +
                        "خلفه مختبر لم يتوقف عن العمل رغم مرور السنين.",

                    choices: [

                        {
                            text: "ادخل",
                            next: "c6_facility"
                        }
                    ]
                }
            ]
        },


        /* =================================================
           CHAPTER 6
           ================================================= */

        {
            id: 6,
            title: "الملف الأسود",

            scenes: [

                {
                    id: "c6_facility",

                    title: "الممر 0317",
                    location: "المختبر",

                    events: [

                        {
                            type: "fog",
                            duration: 800
                        },

                        {
                            type: "glitch",
                            duration: 500
                        }
                    ],

                    text:
                        "ممر طويل. " +
                        "في نهايته باب يحمل 0317. " +
                        "همست ليان: «لا تفتح أي ملف قبل أن تعرف لماذا.»",

                    choices: [

                        {
                            text: "ابحث عن الملفات",
                            next: "c6_files"
                        },

                        {
                            text: "شاهد الكاميرات",
                            next: "c6_cameras"
                        }
                    ]
                },


                {
                    id: "c6_files",

                    title: "الأرشيف الأسود",
                    location: "الأرشيف",

                    events: [

                        {
                            type: "flash",
                            color: "#d9b867",
                            duration: 220
                        },

                        {
                            type: "light",
                            color: "#d9b867",
                            duration: 900
                        }
                    ],

                    text:
                        "وجد آدم ملفًا أسود يحمل الرقم 0317. " +
                        "عند فتحه توقفت كل شاشات الغرفة لثانية.",

                    choices: [

                        {
                            text: "افتح الملف",
                            next: "c6_file_truth",

                            effects: {

                                items: [
                                    "blackFile",
                                    "archiveBadge"
                                ],

                                flags: {

                                    discoveredFile: true,
                                    collectedEvidence5: true,
                                    knowsTruth: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c6_file_truth",

                    title: "الهدف الحقيقي",
                    location: "الأرشيف الأسود",

                    events: [

                        {
                            type: "glitch",
                            duration: 850
                        },

                        {
                            type: "memory",
                            duration: 600
                        }
                    ],

                    text:
                        "لم تكن التجربة تستهدف ذاكرة آدم كما ظن. " +
                        "كانت تستهدف الشيء الذي يحمله آدم داخل ذاكرته.",

                    choices: [

                        {
                            text: "تابع",
                            next: "c6_previous"
                        }
                    ]
                },


                {
                    id: "c6_previous",

                    title: "النسخة الأولى",
                    location: "الأرشيف الأسود",

                    text:
                        "«إذا وصل آدم... النسخة الأولى فشلت. " +
                        "لا تدع النسخة الثانية تتذكر كل شيء.»",

                    choices: [

                        {
                            text: "اذهب إلى الذاكرة",
                            next: "c7_memory"
                        }
                    ]
                },


                {
                    id: "c6_cameras",

                    title: "التسجيل القديم",
                    location: "غرفة المراقبة",

                    events: [

                        {
                            type: "memory",
                            duration: 900
                        },

                        {
                            type: "glitch",
                            duration: 600
                        }
                    ],

                    text:
                        "أظهر التسجيل آدم وليان هنا قبل سنوات. " +
                        "كان آدم هو من يقود التجربة.",

                    choices: [

                        {
                            text: "تابع التسجيل",
                            next: "c7_memory",

                            effects: {

                                flags: {
                                    discoveredLab: true
                                }
                            }
                        }
                    ]
                }
            ]
        },


        /* =================================================
           CHAPTER 7
           ================================================= */

        {
            id: 7,
            title: "الذاكرة",

            scenes: [

                {
                    id: "c7_memory",

                    title: "الغرفة البيضاء",
                    location: "الذاكرة",

                    events: [

                        {
                            type: "flash",
                            color: "#ffffff",
                            duration: 350
                        },

                        {
                            type: "memory",
                            duration: 1100
                        }
                    ],

                    text:
                        "دخل آدم ذاكرته. " +
                        "غرفة بيضاء. " +
                        "خلف الزجاج رأى نفسه واقفًا في الجهة الأخرى.",

                    choices: [

                        {
                            text: "اقترب",
                            next: "c7_memory2",

                            effects: {

                                flags: {
                                    sawMemory2: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c7_memory2",

                    title: "قبل التجربة",
                    location: "الذاكرة",

                    events: [

                        {
                            type: "light",
                            duration: 700
                        }
                    ],

                    text:
                        "ظهر آدم وليان معًا. " +
                        "قال لها: «لا تسمحي لهم أن يعيدوا التجربة.»",

                    choices: [

                        {
                            text: "اسأل ليان",
                            next: "c7_lian_truth"
                        },

                        {
                            text: "ابحث عن سجل",
                            next: "c7_archive"
                        }
                    ]
                },


                {
                    id: "c7_lian_truth",

                    title: "ليان تعرف",
                    location: "الذاكرة",

                    events: [

                        {
                            type: "glitch",
                            duration: 600
                        }
                    ],

                    text:
                        "قالت ليان إنها كانت تعرف، " +
                        "لكنها لم تكن تعرف أي نسخة ستعود. " +
                        "ثم اعترفت بأنها كتبت كل شيء تقريبًا.",

                    choices: [

                        {
                            text: "ماذا لم تكتبي؟",
                            next: "c7_fear",

                            effects: {

                                flags: {
                                    knowsWhoIsLian: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c7_fear",

                    title: "الشيء الذي لم يُكتب",
                    location: "الذاكرة",

                    events: [

                        {
                            type: "darkness",
                            duration: 400
                        },

                        {
                            type: "flash",
                            color: "#d9b867",
                            duration: 150
                        }
                    ],

                    text:
                        "«كل ذكرياتك عني مُسحت من الجميع. " +
                        "لذلك كتبتها. لكن هناك شيئًا واحدًا لم أكتبه.»",

                    choices: [

                        {
                            text: "ابحث عنه",
                            next: "c7_archive"
                        }
                    ]
                },


                {
                    id: "c7_archive",

                    title: "السجل المخفي",
                    location: "الأرشيف",

                    events: [

                        {
                            type: "alert",
                            duration: 450
                        }
                    ],

                    text:
                        "في درج مخفي وجد آدم سجلًا: «لم يكن آدم الأول.»",

                    choices: [

                        {
                            text: "تابع",
                            next: "c7_accident"
                        }
                    ]
                },


                {
                    id: "c7_accident",

                    title: "ثلاث دوائر",
                    location: "الأرشيف",

                    events: [

                        {
                            type: "memory",
                            duration: 900
                        },

                        {
                            type: "flash",
                            color: "#8cc9ff",
                            duration: 180
                        }
                    ],

                    text:
                        "ظهر رسم لثلاث دوائر: 0317 / A / فارغ. " +
                        "في وسطه شظية صورة لوجه آدم.",

                    choices: [

                        {
                            text: "خذ الشظية",
                            next: "c8_city",

                            effects: {

                                items: [
                                    "memoryFragment"
                                ],

                                flags: {
                                    sawMemory3: true
                                }
                            }
                        }
                    ]
                }
            ]
        },


        /* =================================================
           CHAPTER 8
           ================================================= */

        {
            id: 8,
            title: "المدينة الصامتة",

            scenes: [

                {
                    id: "c8_city",

                    title: "المدينة",
                    location: "المدينة",
                    time: "الفجر",

                    events: [

                        {
                            type: "fog",
                            duration: 1000
                        },

                        {
                            type: "light",
                            duration: 900
                        }
                    ],

                    text:
                        "خرج آدم إلى مدينة فارغة عند الفجر. " +
                        "كل شاشة تعرض الرقم 03:17.",

                    choices: [

                        {
                            text: "اقترب من الشاشة",
                            next: "c8_answer"
                        }
                    ]
                },


                {
                    id: "c8_answer",

                    title: "الرسالة",
                    location: "مبنى مهجور",

                    events: [

                        {
                            type: "glitch",
                            duration: 800
                        }
                    ],

                    text:
                        "على شاشة مكسورة ظهرت جملة: «ذاكرتك أكثر مما ينبغي.»",

                    choices: [

                        {
                            text: "ابحث عن مصدرها",
                            next: "c8_car"
                        }
                    ]
                },


                {
                    id: "c8_car",

                    title: "السيارة السوداء",
                    location: "المدينة",

                    events: [

                        {
                            type: "light",
                            duration: 800
                        },

                        {
                            type: "memory",
                            duration: 700
                        }
                    ],

                    text:
                        "ظهرت السيارة السوداء نفسها من بداية الرحلة. " +
                        "على المقعد ظرف يحمل اسم آدم.",

                    choices: [

                        {
                            text: "افتح الظرف",
                            next: "c8_record",

                            effects: {

                                items: [
                                    "letter"
                                ],

                                flags: {
                                    foundFinalMessage: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c8_record",

                    title: "لماذا وافقت؟",
                    location: "السيارة",

                    events: [

                        {
                            type: "flash",
                            color: "#d9b867",
                            duration: 160
                        }
                    ],

                    text:
                        "الرسالة موقعة باسم آدم: " +
                        "«إذا وصلت إلى هنا، ابحث عن سبب موافقتي على فقدان الذاكرة.»",

                    choices: [

                        {
                            text: "اتبع التسجيل",
                            next: "c9_phone"
                        }
                    ]
                }
            ]
        },


        /* =================================================
           CHAPTER 9
           ================================================= */

        {
            id: 9,
            title: "الصوت",

            scenes: [

                {
                    id: "c9_phone",

                    title: "الهاتف يستيقظ",
                    location: "السيارة",

                    events: [

                        {
                            type: "glitch",
                            duration: 700
                        },

                        {
                            type: "alert",
                            duration: 400
                        }
                    ],

                    text:
                        "أضاء الهاتف المكسور وحده. " +
                        "لم يظهر إلا تسجيل واحد.",

                    choices: [

                        {
                            text: "استمع",
                            next: "c9_accident",

                            effects: {

                                flags: {
                                    heardTape: true
                                }
                            }
                        },

                        {
                            text: "خذه إلى ليان",
                            next: "c9_lian"
                        }
                    ]
                },


                {
                    id: "c9_accident",

                    title: "اختياري",
                    location: "التسجيل",

                    events: [

                        {
                            type: "memory",
                            duration: 900
                        },

                        {
                            type: "flash",
                            color: "#ffffff",
                            duration: 180
                        }
                    ],

                    text:
                        "قال آدم في التسجيل: " +
                        "«أنا من طلب فقدان الذاكرة. " +
                        "كنت أحاول حماية الحقيقة من شيء لا يجب أن يصل إليها.»",

                    choices: [

                        {
                            text: "اذهب إلى ليان",
                            next: "c9_lian"
                        }
                    ]
                },


                {
                    id: "c9_lian",

                    title: "الذين لم يغادروا",
                    location: "المنشأة",

                    events: [

                        {
                            type: "fog",
                            duration: 700
                        }
                    ],

                    text:
                        "قالت ليان: «الذين دخلوا المنشأة لم يغادروا كلهم. " +
                        "بعضهم بقي داخل التجربة.»",

                    choices: [

                        {
                            text: "ماذا نفعل؟",
                            next: "c9_agreement",

                            effects: {

                                flags: {
                                    trustedLian: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c9_agreement",

                    title: "العودة",
                    location: "البوابة",

                    events: [

                        {
                            type: "light",
                            duration: 900
                        },

                        {
                            type: "shake",
                            intensity: 2,
                            duration: 200
                        }
                    ],

                    text:
                        "عاد آدم وليان إلى المنشأة. " +
                        "انفتحت البوابة وحدها.",

                    choices: [

                        {
                            text: "ادخل",
                            next: "c10_truth"
                        }
                    ]
                }
            ]
        },


        /* =================================================
           CHAPTER 10
           ================================================= */

        {
            id: 10,
            title: "الحقيقة",

            scenes: [

                {
                    id: "c10_truth",

                    title: "الغرفة الأخيرة",
                    location: "الغرفة النهائية",

                    events: [

                        {
                            type: "darkness",
                            duration: 450
                        },

                        {
                            type: "light",
                            duration: 900
                        }
                    ],

                    text:
                        "غرفة نهائية. " +
                        "كرسي وشاشة ومرآة. " +
                        "ظهرت على الشاشة عبارة: «مرحبًا بعودتك.»",

                    choices: [

                        {
                            text: "شاهد الشاشة",
                            next: "c10_screen"
                        },

                        {
                            text: "انظر إلى المرآة",
                            next: "c10_mirror"
                        }
                    ]
                },


                {
                    id: "c10_screen",

                    title: "التسجيل الأخير",
                    location: "الغرفة النهائية",

                    events: [

                        {
                            type: "memory",
                            duration: 900
                        }
                    ],

                    text:
                        "ظهر آدم القديم على الشاشة: " +
                        "«نجحت الخطة... منعه من الوصول إليك.»",

                    choices: [

                        {
                            text: "تابع",
                            next: "c10_memory"
                        }
                    ]
                },


                {
                    id: "c10_mirror",

                    title: "الانعكاس",
                    location: "الغرفة النهائية",

                    events: [

                        {
                            type: "glitch",
                            duration: 800
                        },

                        {
                            type: "flash",
                            color: "#d9b867",
                            duration: 160
                        }
                    ],

                    text:
                        "ابتسم انعكاس آدم بينما وجه آدم الحقيقي لم يتحرك. " +
                        "على المرآة ظهر الرقم 1.",

                    choices: [

                        {
                            text: "اقترب",
                            next: "c10_memory"
                        }
                    ]
                },


                {
                    id: "c10_memory",

                    title: "الأصل والنسخ",
                    location: "الغرفة النهائية",

                    events: [

                        {
                            type: "memory",
                            duration: 1100
                        },

                        {
                            type: "shake",
                            intensity: 2,
                            duration: 250
                        }
                    ],

                    text:
                        "اكتشف آدم أن الذكريات استُخدمت لصناعة أشخاص " +
                        "يحملون أجزاء من ذاكرة الأصل.",

                    choices: [

                        {
                            text: "اعرف الحقيقة",
                            next: "c10_truth2",

                            effects: {

                                flags: {

                                    sawMemory3: true,
                                    knowsWhoIsAdam: true,
                                    knowsTruth: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c10_truth2",

                    title: "أنا لست الأول",
                    location: "الغرفة النهائية",

                    events: [

                        {
                            type: "flash",
                            color: "#ffffff",
                            duration: 220
                        },

                        {
                            type: "glitch",
                            duration: 600
                        }
                    ],

                    text:
                        "قال آدم: «أنا لست النسخة الأولى.» " +
                        "أجاب النظام: «لكن النسخة الأولى ما زالت هنا.»",

                    choices: [

                        {
                            text: "افتح الباب الأخير",
                            next: "c11_choice",

                            effects: {

                                flags: {
                                    openedFinalDoor: true
                                }
                            }
                        }
                    ]
                }
            ]
        },


        /* =================================================
           CHAPTER 11
           ================================================= */

        {
            id: 11,
            title: "الاختيار",

            scenes: [

                {
                    id: "c11_choice",

                    title: "النسخة الأولى",
                    location: "المنصة الزجاجية",

                    events: [

                        {
                            type: "light",
                            duration: 900
                        },

                        {
                            type: "heartbeat",
                            duration: 900
                        }
                    ],

                    text:
                        "خلف الزجاج شخص نائم يحمل وجه آدم. " +
                        "الشاشة تسأل: «هل تريد استعادة كل شيء؟»",

                    choices: [

                        {
                            text: "نعم، أعرف الحقيقة",
                            next: "c11_accept",

                            effects: {

                                flags: {
                                    acceptedTruth: true
                                }
                            }
                        },

                        {
                            text: "لا. أوقف التجربة",
                            next: "c11_refuse",

                            effects: {

                                flags: {
                                    refusedExperiment: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c11_accept",

                    title: "الاستيقاظ",
                    location: "المنصة",

                    events: [

                        {
                            type: "flash",
                            color: "#d9b867",
                            duration: 260
                        },

                        {
                            type: "shake",
                            intensity: 4,
                            duration: 350
                        },

                        {
                            type: "memory",
                            duration: 1100
                        }
                    ],

                    text:
                        "فتحت النسخة الأولى عينيها. " +
                        "«أنت الذاكرة التي فقدتها... وأنا الشخص الذي فقدته.»",

                    choices: [

                        {
                            text: "ادمج الذكريات",
                            next: "c11_merge"
                        }
                    ]
                },


                {
                    id: "c11_merge",

                    title: "البداية الحقيقية",
                    location: "المنصة",

                    events: [

                        {
                            type: "light",
                            duration: 1200
                        }
                    ],

                    text:
                        "تذكّر آدم أنه هو من بدأ التجربة، " +
                        "ثم أوقفها، ثم طلب محو ذاكرته " +
                        "حتى لا تصل الحقيقة إلى الشخص الخطأ.",

                    choices: [

                        {
                            text: "واجه النهاية",
                            next: "c12_final"
                        }
                    ]
                },


                {
                    id: "c11_refuse",

                    title: "الرفض",
                    location: "المنصة",

                    events: [

                        {
                            type: "darkness",
                            duration: 700
                        },

                        {
                            type: "light",
                            duration: 500
                        }
                    ],

                    text:
                        "أوقف آدم النظام. " +
                        "قالت ليان إن السجلات قد تختفي للأبد.",

                    choices: [

                        {
                            text: "أحفظ الأرشيف",
                            next: "c12_final",

                            effects: {

                                flags: {
                                    completedArchive: true
                                }
                            }
                        },

                        {
                            text: "دع كل شيء يختفي",
                            next: "c12_final"
                        }
                    ]
                }
            ]
        },


        /* =================================================
           CHAPTER 12
           ================================================= */

        {
            id: 12,
            title: "ظلال المجهول",

            scenes: [

                {
                    id: "c12_final",

                    title: "الباب الأخير",
                    location: "الخروج",

                    events: [

                        {
                            type: "darkness",
                            duration: 500
                        },

                        {
                            type: "light",
                            color: "#d9b867",
                            duration: 1100
                        }
                    ],

                    text:
                        "وقف آدم أمام الباب الأخير. " +
                        "لم يعد السؤال من أنت، بل: " +
                        "من تريد أن تصبح بعد معرفة كل شيء؟",

                    choices: [

                        {
                            text: "أعرف الحقيقة كاملة",
                            next: "ending_true",

                            effects: {

                                flags: {
                                    finalTruth: true
                                }
                            }
                        },

                        {
                            text: "أخرج وأترك الماضي",
                            next: "ending_escape",

                            effects: {

                                flags: {
                                    escapedVillage: true
                                }
                            }
                        },

                        {
                            text: "أدمر النظام",
                            next: "ending_destroy",

                            effects: {

                                flags: {
                                    refusedExperiment: true
                                }
                            }
                        }
                    ]
                },


                /* =============================================
                   TRUE ENDING
                   ============================================= */

                {
                    id: "ending_true",

                    title: "الحقيقة",
                    location: "بعد 03:17",

                    events: [

                        {
                            type: "flash",
                            color: "#ffffff",
                            duration: 350
                        },

                        {
                            type: "light",
                            color: "#d9b867",
                            duration: 1500
                        },

                        {
                            type: "memory",
                            duration: 1200
                        }
                    ],

                    text:
                        "استعاد آدم كل الذكريات. " +
                        "لم تكن الحقيقة مريحة، لكنها كانت حقيقية. " +
                        "لأول مرة لم يكن رقمًا ولا نسخة. " +
                        "كان آدم.",

                    ending: {

                        title: "الحقيقة",

                        text:
                            "انتهت التجربة. " +
                            "بقيت الذاكرة، وبقي الاختيار.",

                        type: "true"
                    }
                },


                /* =============================================
                   ESCAPE ENDING
                   ============================================= */

                {
                    id: "ending_escape",

                    title: "الطريق المفتوح",
                    location: "الخارج",

                    events: [

                        {
                            type: "fog",
                            duration: 1000
                        },

                        {
                            type: "light",
                            color: "#65b8ff",
                            duration: 1200
                        }
                    ],

                    text:
                        "فتح آدم الباب وترك الماضي خلفه. " +
                        "الطريق أمامه مفتوح، لكن الهاتف قال مرة أخيرة: " +
                        "«هذه ليست النهاية.»",

                    ending: {

                        title: "الهروب",

                        text:
                            "نجوت من الماضي، " +
                            "لكن بعض الأسئلة ستبقى.",

                        type: "escape"
                    }
                },


                /* =============================================
                   DESTROY ENDING
                   ============================================= */

                {
                    id: "ending_destroy",

                    title: "الإطفاء",
                    location: "المنشأة",

                    events: [

                        {
                            type: "shake",
                            intensity: 5,
                            duration: 500
                        },

                        {
                            type: "darkness",
                            duration: 900
                        },

                        {
                            type: "flash",
                            color: "#d9b867",
                            duration: 250
                        }
                    ],

                    text:
                        "ضغط آدم زر الإيقاف. " +
                        "أطفئت الشاشات واحدة تلو الأخرى، " +
                        "واختفى 0317 من آخر شاشة.",

                    ending: {

                        title: "الإطفاء",

                        text:
                            "دمرت النظام قبل أن يقرر عنك.",

                        type: "destroy"
                    }
                },


                /* =============================================
                   SECRET ENDING
                   ============================================= */

                {
                    id: "ending_secret",

                    title: "0418",
                    location: "مكان غير معروف",

                    events: [

                        {
                            type: "darkness",
                            duration: 800
                        },

                        {
                            type: "glitch",
                            duration: 900
                        },

                        {
                            type: "flash",
                            color: "#8cc9ff",
                            duration: 220
                        },

                        {
                            type: "light",
                            color: "#55a8ff",
                            duration: 1200
                        }
                    ],

                    text:
                        "ظن آدم أن كل شيء انتهى. " +
                        "لكن شاشة صغيرة أضاءت في الظلام. " +
                        "لم يظهر عليها 0317... بل ظهر رقم جديد: 0418.",

                    ending: {

                        title: "الظل الرابع",

                        text:
                            "ربما لم تكن هذه القصة عن آدم وحده.",

                        type: "secret"
                    }
                }
            ]
        }
    ]
};


/* =========================================================
   DATA VALIDATION
   ========================================================= */

(function validateGameData() {

    const ids = new Set();

    GAME_DATA.chapters.forEach(chapter => {

        chapter.scenes.forEach(scene => {

            if (ids.has(scene.id)) {
                console.warn(
                    "Duplicate scene ID:",
                    scene.id
                );
            }

            ids.add(scene.id);
        });
    });

    GAME_DATA.chapters.forEach(chapter => {

        chapter.scenes.forEach(scene => {

            (scene.choices || []).forEach(choice => {

                if (!ids.has(choice.next)) {

                    console.error(
                        "Invalid next scene:",
                        scene.id,
                        "=>",
                        choice.next
                    );
                }
            });
        });
    });

})();