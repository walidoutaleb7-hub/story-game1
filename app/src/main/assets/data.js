/* =========================================================
   ظلال المجهول
   DATA ENGINE — الإصدار السينمائي
   ========================================================= */

const GAME_DATA = {

    /* =====================================================
       معلومات اللعبة
       ===================================================== */

    game: {
        title: "ظلال المجهول",
        version: "2.0.0",
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
       العناصر
       ===================================================== */

    items: {

        oldKey: {
            id: "oldKey",
            name: "المفتاح الصدئ",
            icon: "🗝️",
            description:
                "مفتاح قديم وجده آدم في القرية. لا يعرف الباب الذي ينتمي إليه."
        },

        photograph: {
            id: "photograph",
            name: "الصورة القديمة",
            icon: "📷",
            description:
                "صورة باهتة يظهر فيها آدم أمام منزل لا يتذكر أنه زاره من قبل."
        },

        brokenPhone: {
            id: "brokenPhone",
            name: "الهاتف المكسور",
            icon: "📱",
            description:
                "هاتف آدم. شاشته متضررة، لكنه يستقبل أحيانًا رسائل من رقم مجهول."
        },

        diary: {
            id: "diary",
            name: "المذكرات السوداء",
            icon: "📓",
            description:
                "دفتر قديم يحتوي على ملاحظات عن تجربة غامضة جرت في القرية."
        },

        basementKey: {
            id: "basementKey",
            name: "مفتاح القبو",
            icon: "🔑",
            description:
                "مفتاح ثقيل محفور عليه الرقم 17."
        },

        flashlight: {
            id: "flashlight",
            name: "المصباح اليدوي",
            icon: "🔦",
            description:
                "مصباح قديم يعمل بصورة متقطعة، لكنه قد يكون مفيدًا في الأماكن المظلمة."
        },

        tape: {
            id: "tape",
            name: "شريط التسجيل",
            icon: "📼",
            description:
                "تسجيل قديم يحمل اسم آدم، رغم أن آدم لا يتذكر أنه سجله."
        },

        photograph2: {
            id: "photograph2",
            name: "صورة الغرفة",
            icon: "🖼️",
            description:
                "صورة لغرفة تشبه الغرفة التي استيقظ فيها آدم."
        },

        metalCard: {
            id: "metalCard",
            name: "البطاقة المعدنية",
            icon: "💳",
            description:
                "بطاقة مجهولة تحمل الرقم 0317."
        },

        crowSymbol: {
            id: "crowSymbol",
            name: "رمز الغراب",
            icon: "◈",
            description:
                "رمز غريب يتكرر على الجدران والأبواب وفي بعض الوثائق القديمة."
        },

        letter: {
            id: "letter",
            name: "الرسالة",
            icon: "✉️",
            description:
                "رسالة مكتوبة بخط يشبه خط آدم."
        },

        masterKey: {
            id: "masterKey",
            name: "المفتاح الرئيسي",
            icon: "🗝",
            description:
                "مفتاح غريب يبدو أنه يفتح الباب الأخير في المنشأة."
        },

        archiveBadge: {
            id: "archiveBadge",
            name: "شارة الأرشيف",
            icon: "🎫",
            description:
                "شارة تحمل شعار المنشأة ورقمًا ممسوحًا جزئيًا."
        },

        blackFile: {
            id: "blackFile",
            name: "الملف الأسود",
            icon: "📁",
            description:
                "ملف سري يحتوي على معلومات عن آدم وتجربة الرقم 0317."
        },

        memoryFragment: {
            id: "memoryFragment",
            name: "شظية ذاكرة",
            icon: "🧩",
            description:
                "قطعة صغيرة من شيء لا يتذكر آدم متى حصل عليه."
        }
    },


    /* =====================================================
       الحالات والمتغيرات
       ===================================================== */

    flags: {

        metLian: false,
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
       الإنجازات
       ===================================================== */

    achievements: [

        {
            id: "first_step",
            title: "أول خطوة",
            description: "ابدأ رحلتك.",
            icon: "👣"
        },

        {
            id: "detective",
            title: "المحقق",
            description: "اعثر على أول دليل.",
            icon: "🔎"
        },

        {
            id: "photographer",
            title: "الصورة المنسية",
            description: "اعثر على الصورة القديمة.",
            icon: "📷"
        },

        {
            id: "basement",
            title: "ما تحت المنزل",
            description: "اكتشف القبو.",
            icon: "🚪"
        },

        {
            id: "listener",
            title: "استمع جيدًا",
            description: "استمع إلى التسجيل الغامض.",
            icon: "🎧"
        },

        {
            id: "truth_seeker",
            title: "باحث عن الحقيقة",
            description: "اكتشف حقيقة التجربة.",
            icon: "🧩"
        },

        {
            id: "survivor",
            title: "الناجي",
            description: "أكمل القصة.",
            icon: "🛡️"
        },

        {
            id: "trust",
            title: "الثقة",
            description: "ضع ثقتك في شخص آخر.",
            icon: "🤝"
        },

        {
            id: "secret_room",
            title: "الغرفة السرية",
            description: "اكتشف الغرفة المخفية.",
            icon: "🔐"
        },

        {
            id: "complete_memory",
            title: "الذاكرة",
            description: "استعد الذكريات الثلاث.",
            icon: "🧠"
        },

        {
            id: "collector",
            title: "جامع الأدلة",
            description: "اجمع خمسة أدلة.",
            icon: "📚"
        },

        {
            id: "true_ending",
            title: "ظلال المجهول",
            description: "اكتشف النهاية الحقيقية.",
            icon: "✦"
        }
    ],


    /* =====================================================
       الفصول
       ===================================================== */

    chapters: [

        /* =================================================
           الفصل الأول
           ================================================= */

        {
            id: 1,
            title: "03:17",

            scenes: [

                {
                    id: "c1_start",

                    title: "الاستيقاظ",

                    location: "مكان مجهول",

                    chapterTag: "الفصل الأول",

                    time: "03:17",

                    text:
                        "فتح آدم عينيه ببطء. كان أول شيء شعر به هو البرد. " +
                        "لم يعرف أين هو، ولا كيف وصل إلى ذلك المكان. " +
                        "مصباح وحيد في السقف كان يومض بصورة متقطعة، " +
                        "وعلى الجدار المقابل ظهرت أرقام محفورة بعناية: 03:17. " +
                        "حاول آدم أن يتذكر آخر شيء حدث له... لكن ذاكرته كانت فارغة.",

                    choices: [

                        {
                            id: "c1_car",
                            text: "تفقد المكان من حولك.",
                            next: "c1_car"
                        },

                        {
                            id: "c1_phone",
                            text: "ابحث عن هاتفك.",
                            next: "c1_phone"
                        },

                        {
                            id: "c1_exit",
                            text: "غادر المكان فورًا.",
                            next: "c1_exit"
                        }
                    ]
                },


                {
                    id: "c1_car",

                    title: "السيارة السوداء",

                    location: "طريق ريفي",

                    text:
                        "حين خرج آدم، وجد نفسه أمام طريق ضيق تحيط به الأشجار. " +
                        "كانت سيارة سوداء متوقفة على مسافة قصيرة. " +
                        "المحرك مطفأ، لكن أضواءها كانت تعمل. " +
                        "لم يكن هناك أحد في الداخل.",

                    choices: [

                        {
                            id: "c1_stranger",
                            text: "اقترب من السيارة.",
                            next: "c1_stranger"
                        },

                        {
                            id: "c1_window",
                            text: "انظر من نافذة السيارة.",
                            next: "c1_window"
                        },

                        {
                            id: "c1_silent",
                            text: "تجاهل السيارة وتابع السير.",
                            next: "c1_silent"
                        }
                    ]
                },


                {
                    id: "c1_phone",

                    title: "المكالمة",

                    location: "الغرفة المجهولة",

                    text:
                        "وجد آدم هاتفه تحت الكرسي. الشاشة مكسورة، " +
                        "لكنها أضاءت فجأة. ظهر رقم واحد على الشاشة: 0317. " +
                        "ثم بدأ الهاتف يرن.",

                    choices: [

                        {
                            id: "c1_call",
                            text: "أجب عن المكالمة.",
                            next: "c1_call",

                            effects: {
                                addItems: ["brokenPhone"],
                                setFlags: {
                                    knowsNumber0317: true
                                }
                            }
                        },

                        {
                            id: "c1_exit",
                            text: "لا تجب. غادر المكان.",
                            next: "c1_exit",

                            effects: {
                                addItems: ["brokenPhone"]
                            }
                        }
                    ]
                },


                {
                    id: "c1_call",

                    title: "الصوت",

                    location: "الغرفة المجهولة",

                    text:
                        "ساد الصمت لثوانٍ بعد أن أجاب آدم. " +
                        "ثم جاء صوت منخفض من الطرف الآخر. " +
                        "لم يقل سوى جملة واحدة: \"لا تثق بمن يعرف اسمك.\" " +
                        "وقبل أن يستطيع آدم الرد، انقطع الاتصال.",

                    choices: [

                        {
                            id: "c1_wait",
                            text: "انتظر لترى إن كان سيتصل مجددًا.",
                            next: "c1_wait"
                        },

                        {
                            id: "c1_exit",
                            text: "اخرج وابحث عن أي شخص.",
                            next: "c1_exit"
                        }
                    ]
                },


                {
                    id: "c1_stranger",

                    title: "الرجل الواقف",

                    location: "الطريق",

                    text:
                        "قبل أن يصل آدم إلى السيارة، ظهر رجل يقف بين الأشجار. " +
                        "لم يقترب منه. اكتفى بالنظر إليه من بعيد. " +
                        "ثم قال بصوت هادئ: \"تأخرت كثيرًا يا آدم.\"",

                    choices: [

                        {
                            id: "c1_follow",
                            text: "اتبع الرجل.",
                            next: "c2_village",

                            effects: {
                                setFlags: {
                                    metStranger: true
                                }
                            }
                        },

                        {
                            id: "c1_exit",
                            text: "ابتعد عنه واتجه نحو الطريق.",
                            next: "c2_village"
                        }
                    ]
                },


                {
                    id: "c1_window",

                    title: "الانعكاس",

                    location: "السيارة السوداء",

                    text:
                        "نظر آدم من النافذة. لم يجد أحدًا في السيارة. " +
                        "لكن انعكاس وجهه على الزجاج لم يكن واضحًا. " +
                        "للحظة قصيرة، بدا وكأن شخصًا يقف خلفه. " +
                        "استدار بسرعة... ولم يجد أحدًا.",

                    choices: [

                        {
                            id: "c1_exit",
                            text: "غادر المكان.",
                            next: "c2_village"
                        }
                    ]
                },


                {
                    id: "c1_silent",

                    title: "الطريق",

                    location: "الغابة",

                    text:
                        "واصل آدم السير دون أن يلتفت. " +
                        "وبعد دقائق، بدأت أضواء قرية صغيرة تظهر بين الأشجار. " +
                        "الغريب أن جميع نوافذ المنازل كانت مضاءة، " +
                        "رغم أن الساعة تجاوزت الثالثة صباحًا.",

                    choices: [

                        {
                            id: "c1_exit",
                            text: "اتجه نحو القرية.",
                            next: "c2_village"
                        }
                    ]
                },


                {
                    id: "c1_wait",

                    title: "الانتظار",

                    location: "الغرفة",

                    text:
                        "مرت دقيقة... ثم دقيقتان. " +
                        "لم يتصل أحد. " +
                        "لكن شاشة الهاتف أظهرت رسالة جديدة: " +
                        "\"نحن نراك.\"",

                    choices: [

                        {
                            id: "c1_exit",
                            text: "غادر المكان.",
                            next: "c2_village"
                        }
                    ]
                }
            ]
        },


        /* =================================================
           الفصل الثاني
           ================================================= */

        {
            id: 2,
            title: "القرية التي لا تنام",

            scenes: [

                {
                    id: "c2_village",

                    title: "القرية",

                    location: "مدخل القرية",

                    text:
                        "دخل آدم القرية. كانت الشوارع هادئة بصورة غير طبيعية. " +
                        "لا سيارات، لا أصوات، ولا شخص واحد في الخارج. " +
                        "ومع ذلك، كانت الأنوار مضاءة في معظم المنازل. " +
                        "وعلى مدخل القرية كُتبت عبارة قديمة: " +
                        "\"من يدخل يعرف... ومن يعرف لا يعود كما كان.\"",

                    choices: [

                        {
                            id: "c2_youssef",
                            text: "ابحث عن أي شخص.",
                            next: "c2_youssef"
                        },

                        {
                            id: "c2_identity",
                            text: "ابحث عن مكان تعرفه.",
                            next: "c2_identity"
                        },

                        {
                            id: "c2_leave",
                            text: "حاول مغادرة القرية.",
                            next: "c2_leave"
                        }
                    ]
                },


                {
                    id: "c2_youssef",

                    title: "يوسف",

                    location: "الساحة القديمة",

                    text:
                        "ظهر شاب من أحد الأزقة. توقف عندما رأى آدم، " +
                        "ثم قال: \"أخيرًا وصلت.\" " +
                        "تقدم خطوة وأضاف: \"إذا كنت تبحث عن الحقيقة، " +
                        "فلا تبدأ بالسؤال عمّن أنت... ابدأ بالسؤال عمّن أحضرك إلى هنا.\"",

                    choices: [

                        {
                            id: "c2_key",
                            text: "صدقه واطلب مساعدته.",
                            next: "c2_key",

                            effects: {
                                addItems: ["oldKey"],
                                setFlags: {
                                    trustedYoussef: true
                                }
                            }
                        },

                        {
                            id: "c2_square",
                            text: "لا تثق به. اذهب إلى الساحة.",
                            next: "c2_square"
                        }
                    ]
                },


                {
                    id: "c2_identity",

                    title: "الاسم",

                    location: "ممر قديم",

                    text:
                        "وجد آدم لوحة حجرية تحمل أسماء أشخاص. " +
                        "مرر إصبعه فوق الأسماء... ثم توقف. " +
                        "كان هناك اسم يشبه اسمه تمامًا، وتحت الاسم تاريخ قديم.",

                    choices: [

                        {
                            id: "c2_identity2",
                            text: "تحقق من الاسم.",
                            next: "c2_identity2"
                        },

                        {
                            id: "c2_square",
                            text: "ابتعد عن اللوحة.",
                            next: "c2_square"
                        }
                    ]
                },


                {
                    id: "c2_identity2",

                    title: "الاسم الثاني",

                    location: "الممر",

                    text:
                        "اقترب آدم أكثر. كان الاسم هو: آدم نادر. " +
                        "لكن التاريخ يعود إلى سبعة عشر عامًا مضت. " +
                        "شعر بقشعريرة تسري في جسده. " +
                        "كيف يمكن أن يكون اسمه موجودًا هنا قبل أن يعرف القرية أصلًا؟",

                    choices: [

                        {
                            id: "c2_square",
                            text: "تابع نحو الساحة.",
                            next: "c2_square"
                        }
                    ]
                },


                {
                    id: "c2_key",

                    title: "المفتاح",

                    location: "الساحة القديمة",

                    text:
                        "أخرج يوسف مفتاحًا صدئًا من جيبه ووضعه في يد آدم. " +
                        "\"ستجد بيتًا يحمل الرقم 17. لا تدخله وحدك.\" " +
                        "ثم غادر قبل أن يتمكن آدم من سؤاله عن أي شيء آخر.",

                    choices: [

                        {
                            id: "c2_key_continue",
                            text: "احتفظ بالمفتاح واتجه نحو البيت رقم 17.",
                            next: "c3_house"
                        }
                    ]
                },


                {
                    id: "c2_square",

                    title: "رمز الغراب",

                    location: "الساحة القديمة",

                    text:
                        "في وسط الساحة، وجد آدم رمزًا محفورًا على حجر: " +
                        "شكل غراب تحيط به ثلاثة خطوط. " +
                        "حين لمسه، شعر بوخزة خفيفة في يده. " +
                        "ثم سمع صوتًا خلفه: \"لا تلمس الأشياء التي تتذكرك.\"",

                    choices: [

                        {
                            id: "c2_symbol",
                            text: "افحص الرمز.",
                            next: "c2_symbol",

                            effects: {
                                addItems: ["crowSymbol"],
                                setFlags: {
                                    collectedEvidence1: true
                                }
                            }
                        },

                        {
                            id: "c2_inn",
                            text: "اذهب إلى النزل.",
                            next: "c2_inn"
                        }
                    ]
                },


                {
                    id: "c2_symbol",

                    title: "العلامة",

                    location: "الساحة",

                    text:
                        "لاحظ آدم أن الرمز نفسه موجود على خاتم قديم في الأرض. " +
                        "وعندما رفعه، وجد تحته ورقة صغيرة تحمل رقمًا واحدًا: 17.",

                    choices: [

                        {
                            id: "c2_child",
                            text: "اسأل الطفل الذي يراقبك.",
                            next: "c2_child"
                        },

                        {
                            id: "c2_inn",
                            text: "غادر الساحة.",
                            next: "c2_inn"
                        }
                    ]
                },


                {
                    id: "c2_child",

                    title: "الطفل",

                    location: "زقاق القرية",

                    text:
                        "كان طفل صغير يقف عند نهاية الزقاق. " +
                        "قال لآدم: \"كنت هنا من قبل.\" " +
                        "ثم ابتسم وأضاف: \"لكنّك لا تتذكر لأنهم أخذوا الجزء المهم.\"",

                    choices: [

                        {
                            id: "c2_child_continue",
                            text: "اسأله: أي جزء؟",
                            next: "c3_house",

                            effects: {
                                setFlags: {
                                    knowsAboutAdam: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c2_inn",

                    title: "النزل",

                    location: "نزل القرية",

                    text:
                        "دخل آدم نزلًا قديمًا. لم يجد أحدًا خلف مكتب الاستقبال. " +
                        "لكن فوق الطاولة كانت هناك صورة قديمة. " +
                        "في الصورة وقف آدم أمام البيت رقم 17.",

                    choices: [

                        {
                            id: "c2_inn_photo",
                            text: "خذ الصورة.",
                            next: "c3_house",

                            effects: {
                                addItems: ["photograph"],
                                setFlags: {
                                    foundPhotograph: true,
                                    collectedEvidence2: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c2_leave",

                    title: "الطريق المغلق",

                    location: "خارج القرية",

                    text:
                        "عاد آدم إلى الطريق الذي دخل منه. " +
                        "لكنه وجد نفسه أمام القرية مرة أخرى. " +
                        "مهما سار، كان يعود إلى المكان ذاته. " +
                        "وفي النهاية لمح مبنى قديمًا يحمل الرقم 17.",

                    choices: [

                        {
                            id: "c2_leave_inn",
                            text: "اتبع الطريق نحو البيت.",
                            next: "c3_house"
                        }
                    ]
                }
            ]
        },


        /* =================================================
           الفصل الثالث
           ================================================= */

        {
            id: 3,
            title: "البيت رقم 17",

            scenes: [

                {
                    id: "c3_house",

                    title: "البيت",

                    location: "المنزل رقم 17",

                    text:
                        "وقف آدم أمام المنزل. كان الباب نصف مفتوح. " +
                        "لم يكن هناك ما يدل على أن أحدًا يعيش هنا منذ سنوات. " +
                        "ومع ذلك، كان الضوء يتحرك خلف إحدى النوافذ.",

                    choices: [

                        {
                            id: "c3_inside",
                            text: "ادخل.",
                            next: "c3_inside"
                        },

                        {
                            id: "c3_back",
                            text: "تراجع وابحث عن مدخل آخر.",
                            next: "c3_back"
                        }
                    ]
                },


                {
                    id: "c3_inside",

                    title: "الداخل",

                    location: "المنزل رقم 17",

                    text:
                        "دخل آدم. كان الهواء ساكنًا. " +
                        "على الجدار صور قديمة، وكل صورة كانت مغطاة بطبقة من الغبار. " +
                        "إلا صورة واحدة... كانت نظيفة تمامًا.",

                    choices: [

                        {
                            id: "c3_room",
                            text: "ادخل الغرفة الأولى.",
                            next: "c3_room"
                        },

                        {
                            id: "c3_hall",
                            text: "استكشف الممر.",
                            next: "c3_hall"
                        }
                    ]
                },


                {
                    id: "c3_hall",

                    title: "الممر",

                    location: "المنزل",

                    text:
                        "في نهاية الممر وجد آدم صورة لغرفة صغيرة. " +
                        "كانت الغرفة مطابقة تقريبًا للمكان الذي استيقظ فيه.",

                    choices: [

                        {
                            id: "c3_hall_photo",
                            text: "خذ الصورة.",
                            next: "c3_room",

                            effects: {
                                addItems: ["photograph2"],
                                setFlags: {
                                    foundPhotograph: true,
                                    collectedEvidence3: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c3_room",

                    title: "الغرفة",

                    location: "المنزل رقم 17",

                    text:
                        "في الغرفة ثلاثة أشياء لفتت انتباه آدم: " +
                        "مذكرات سوداء، جهاز تسجيل قديم، وباب صغير بلا مقبض. " +
                        "شعر آدم أن هذه الأشياء ليست هنا بالصدفة.",

                    choices: [

                        {
                            id: "c3_diary",
                            text: "اقرأ المذكرات.",
                            next: "c3_diary"
                        },

                        {
                            id: "c3_tape",
                            text: "شغّل جهاز التسجيل.",
                            next: "c3_tape"
                        },

                        {
                            id: "c3_secret",
                            text: "افحص الباب الصغير.",
                            next: "c3_secret"
                        }
                    ]
                },


                {
                    id: "c3_diary",

                    title: "المذكرات",

                    location: "الغرفة",

                    text:
                        "كانت الصفحات الأولى مليئة بأرقام وتواريخ. " +
                        "وفي الصفحة الأخيرة ظهرت جملة واحدة: " +
                        "\"المرحلة الأولى نجحت. الذاكرة قابلة للفصل عن صاحبها.\"",

                    choices: [

                        {
                            id: "c3_diary2",
                            text: "تابع القراءة.",
                            next: "c3_diary2",

                            effects: {
                                addItems: ["diary"],
                                setFlags: {
                                    foundDiary: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c3_diary2",

                    title: "التجربة",

                    location: "الغرفة",

                    text:
                        "تابع آدم القراءة. كانت المذكرات تتحدث عن تجربة اسمها 0317. " +
                        "لم يكن الاسم لشخص... بل لبرنامج كامل يهدف إلى تغيير الذاكرة البشرية.",

                    choices: [

                        {
                            id: "c3_memory1",
                            text: "حاول استعادة ما تتذكره.",
                            next: "c3_memory1",

                            effects: {
                                setFlags: {
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

                    text:
                        "رأى آدم غرفة بيضاء. كان أصغر سنًا. " +
                        "كان هناك شخص يقف خلف زجاج سميك. " +
                        "ثم سمع صوتًا يقول: \"ابدأ التسجيل... الثالثة وسبع عشرة دقيقة.\"",

                    choices: [

                        {
                            id: "c3_memory1_continue",
                            text: "افتح عينيك.",
                            next: "c3_secret",

                            effects: {
                                setFlags: {
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

                    text:
                        "دار الشريط ببطء. جاء صوت آدم نفسه من التسجيل: " +
                        "\"إذا كنت تسمع هذا، فقد فشلت الخطة الأولى. لا تصدق أي نسخة منك.\"",

                    choices: [

                        {
                            id: "c3_tape_continue",
                            text: "أكمل الاستماع.",
                            next: "c3_secret",

                            effects: {
                                addItems: ["tape"],
                                setFlags: {
                                    heardTape: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c3_secret",

                    title: "الباب المخفي",

                    location: "المنزل",

                    text:
                        "وجد آدم آلية مخفية خلف الخزانة. " +
                        "وضع المفتاح في مكانه، فانفتح الباب ببطء. " +
                        "وراءه درج ينزل إلى الظلام.",

                    choices: [

                        {
                            id: "c3_basement",
                            text: "انزل إلى الأسفل.",
                            next: "c3_basement",

                            effects: {
                                addItems: [
                                    "metalCard",
                                    "basementKey"
                                ],
                                setFlags: {
                                    foundBasement: true,
                                    openedSecretRoom: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c3_back",

                    title: "الجانب الآخر",

                    location: "المنزل",

                    text:
                        "دار آدم حول المنزل. خلفه وجد نافذة مفتوحة تؤدي إلى الممر الداخلي. " +
                        "ومن الداخل جاء صوت خطوات بطيئة.",

                    choices: [

                        {
                            id: "c3_back_inside",
                            text: "ادخل من النافذة.",
                            next: "c3_inside"
                        }
                    ]
                },


                {
                    id: "c3_basement",

                    title: "القبو",

                    location: "تحت المنزل",

                    text:
                        "نزل آدم الدرج. في الأسفل كان هناك ممر إسمنتي طويل. " +
                        "على الجدار تكرر الرقم 0317 عشرات المرات. " +
                        "وفي نهاية الممر كان باب معدني يحمل عبارة: " +
                        "\"الوصول ممنوع حتى على صاحب التجربة.\"",

                    choices: [

                        {
                            id: "c3_basement_continue",
                            text: "افتح الباب.",
                            next: "c4_underground"
                        }
                    ]
                }
            ]
        },


        /* =================================================
           الفصل الرابع
           ================================================= */

        {
            id: 4,
            title: "الشخص الذي يشبهك",

            scenes: [

                {
                    id: "c4_underground",

                    title: "المنشأة",

                    location: "المنشأة تحت الأرض",

                    text:
                        "فتح آدم الباب. خلفه منشأة كاملة تحت الأرض. " +
                        "شاشات قديمة، غرف زجاجية، وأجهزة لم يرَ مثلها من قبل. " +
                        "ثم لمح شخصًا يقف في نهاية الممر.",

                    choices: [

                        {
                            id: "c4_mirror",
                            text: "اقترب من الشخص.",
                            next: "c4_mirror"
                        },

                        {
                            id: "c4_room",
                            text: "اختبئ واستكشف المكان.",
                            next: "c4_room"
                        }
                    ]
                },


                {
                    id: "c4_mirror",

                    title: "الانعكاس",

                    location: "المنشأة",

                    text:
                        "اقترب آدم. كان الشخص واقفًا أمام زجاج مظلم. " +
                        "عندما استدار، شعر آدم بصدمة. " +
                        "كان وجهه مشابهًا لوجه آدم بصورة مخيفة، لكن أكثر هدوءًا.",

                    choices: [

                        {
                            id: "c4_mirror_continue",
                            text: "تحدث إليه.",
                            next: "c4_room"
                        }
                    ]
                },


                {
                    id: "c4_room",

                    title: "الغرفة البيضاء",

                    location: "المنشأة",

                    text:
                        "دخل آدم غرفة مليئة بالملفات. " +
                        "وجد اسمًا يتكرر في عشرات الصفحات: آدم. " +
                        "لكن بعض الملفات تشير إلى آدم برقم مختلف.",

                    choices: [

                        {
                            id: "c4_double",
                            text: "واجه الشخص الذي يشبهك.",
                            next: "c4_double"
                        },

                        {
                            id: "c4_escape",
                            text: "ابحث عن مخرج.",
                            next: "c4_escape"
                        }
                    ]
                },


                {
                    id: "c4_double",

                    title: "الحقيقة الأولى",

                    location: "المنشأة",

                    text:
                        "قال الشخص: \"أنا لا أشبهك يا آدم... أنت الذي تشبهني.\" " +
                        "ساد الصمت. ثم أضاف: \"لكن لا تقلق. " +
                        "لم تعد التجربة مستمرة.\"",

                    choices: [

                        {
                            id: "c4_truth",
                            text: "صدقه واطلب الحقيقة.",
                            next: "c4_truth",

                            effects: {
                                setFlags: {
                                    trustedStranger: true
                                }
                            }
                        },

                        {
                            id: "c4_escape",
                            text: "لا تثق به. اخرج.",
                            next: "c4_escape"
                        }
                    ]
                },


                {
                    id: "c4_truth",

                    title: "الملف 0317",

                    location: "المنشأة",

                    text:
                        "أشار الرجل إلى شاشة قديمة. ظهر عليها ملف يحمل الرقم 0317. " +
                        "قال: \"لم تكن التجربة تهدف إلى صناعة شخص جديد. " +
                        "كانت تهدف إلى حذف شيء من شخص موجود أصلًا.\"",

                    choices: [

                        {
                            id: "c4_experiment",
                            text: "اسأله: ماذا حذفتم؟",
                            next: "c4_experiment"
                        },

                        {
                            id: "c5_lian",
                            text: "اترك المكان وابحث عن ليان.",
                            next: "c5_lian"
                        }
                    ]
                },


                {
                    id: "c4_experiment",

                    title: "الشيء المحذوف",

                    location: "المنشأة",

                    text:
                        "أجاب الرجل: \"ذاكرتك.\" " +
                        "ثم أضاف: \"لكن هناك جزءًا واحدًا لم نستطع حذفه. " +
                        "ولهذا عدت إلى هنا.\"",

                    choices: [

                        {
                            id: "c4_escape",
                            text: "غادر المنشأة.",
                            next: "c5_lian"
                        }
                    ]
                },


                {
                    id: "c4_escape",

                    title: "الممر",

                    location: "المنشأة",

                    text:
                        "ركض آدم عبر الممرات حتى وجد بابًا يؤدي إلى الخارج. " +
                        "وقبل أن يغادر، رأى اسمًا مكتوبًا على شاشة: ليان.",

                    choices: [

                        {
                            id: "c4_escape_continue",
                            text: "اتبع الإشارة.",
                            next: "c5_lian"
                        }
                    ]
                }
            ]
        },


        /* =================================================
           الفصل الخامس
           ================================================= */

        {
            id: 5,
            title: "ليان",

            scenes: [

                {
                    id: "c5_lian",

                    title: "الفتاة عند الباب",

                    location: "مبنى مهجور",

                    text:
                        "وجد آدم فتاة تقف قرب باب معدني. " +
                        "نظرت إليه طويلًا ثم قالت: \"كنت أعلم أنك ستصل.\"",

                    choices: [

                        {
                            id: "c5_lian_intro",
                            text: "اسألها من تكون.",
                            next: "c5_lian_intro"
                        },

                        {
                            id: "c5_lian_name",
                            text: "قل لها إنك تعرف اسمها.",
                            next: "c5_lian_name"
                        }
                    ]
                },


                {
                    id: "c5_lian_intro",

                    title: "ليان",

                    location: "المبنى المهجور",

                    text:
                        "قالت: \"اسمي ليان. وأنا الشخص الوحيد الذي يستطيع مساعدتك على تذكر البداية.\"",

                    choices: [

                        {
                            id: "c5_help",
                            text: "ثق بليان.",
                            next: "c5_help",

                            effects: {
                                setFlags: {
                                    metLian: true,
                                    trustedLian: true,
                                    helpedLian: true
                                }
                            }
                        },

                        {
                            id: "c5_alone",
                            text: "ارفض مساعدتها وتابع وحدك.",
                            next: "c5_alone",

                            effects: {
                                setFlags: {
                                    metLian: true,
                                    abandonedLian: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c5_lian_name",

                    title: "الاسم",

                    location: "المبنى",

                    text:
                        "تغيرت ملامح ليان عندما ذكر آدم اسمها. " +
                        "قالت بهدوء: \"إذن بدأت تتذكر.\"",

                    choices: [

                        {
                            id: "c5_photo",
                            text: "اسألها عن الصورة.",
                            next: "c5_photo",

                            effects: {
                                addItems: ["photograph2"],
                                setFlags: {
                                    collectedEvidence4: true
                                }
                            }
                        },

                        {
                            id: "c5_lab",
                            text: "اسألها عن المنشأة.",
                            next: "c5_lab"
                        }
                    ]
                },


                {
                    id: "c5_photo",

                    title: "الصورة",

                    location: "المبنى",

                    text:
                        "أخرجت ليان صورة قديمة. " +
                        "فيها آدم وليان يقفان أمام المنشأة. " +
                        "قالت: \"كنا نعمل هنا... قبل أن نكتشف ما يفعلونه.\"",

                    choices: [

                        {
                            id: "c5_photo_continue",
                            text: "تابع معها.",
                            next: "c5_lab"
                        }
                    ]
                },


                {
                    id: "c5_help",

                    title: "التحالف",

                    location: "المبنى",

                    text:
                        "قالت ليان: \"إذا أردت الحقيقة، علينا العودة إلى المكان الذي بدأت فيه التجربة.\"",

                    choices: [

                        {
                            id: "c5_lab",
                            text: "اذهب معها.",
                            next: "c5_lab",

                            effects: {
                                setFlags: {
                                    trustedLian: true
                                }
                            }
                        }
                    ]
                },


                {
                    id: "c5_alone",

                    title: "وحدك",

                    location: "الطريق",

                    text:
                        "تابع آدم السير وحده. لكنه لم يستطع التخلص من شعور غريب. " +
                        "كان يعرف أن ليان تخفي شيئًا... لكنه لم يكن يعرف ماذا.",

                    choices: [

                        {
                            id: "c5_alone_continue",
                            text: "تابع نحو المنشأة.",
                            next: "c5_lab"
                        }
                    ]
                },


                {
                    id: "c5_lab",

                    title: "المدخل القديم",

                    location: "المنشأة",

                    text:
                        "وصلا إلى مدخل جانبي للمنشأة. " +
                        "أخرجت ليان بطاقة قديمة وفتحت الباب. " +
                        "قالت: \"من هنا ستعرف لماذا نسيت.\"",

                    choices: [

                         {
                            id: "c5_lab_continue",
                            text: "ادخل.",
                            next: "c6_facility"
                        }
                    ]
                }
            ]
        },


        /* =================================================
           الفصل السادس — الملف الأسود
           ================================================= */

        {
            id: 6,
            title: "الملف الأسود",

            scenes: [

                {
                    id: "c6_facility",
                    title: "المنشأة",
                    location: "الطابق السفلي",

                    text:
                        "كان الممر أطول مما توقع آدم. " +
                        "كلما ابتعد عن المدخل، اختفت أصوات العالم الخارجي. " +
                        "الجدران هنا لم تكن تحمل أسماء الغرف، بل أرقامًا. " +
                        "وعلى أحد الأبواب كُتب: 0317. " +
                        "توقفت ليان أمامه، ثم قالت: \"من هذه النقطة... لا أستطيع أن أخبرك بما ستجد.\"",

                    choices: [
                        {
                            id: "c6_files",
                            text: "ابحث في الملفات.",
                            next: "c6_files"
                        },
                        {
                            id: "c6_cameras",
                            text: "راقب كاميرات المراقبة.",
                            next: "c6_cameras"
                        }
                    ]
                },


                {
                    id: "c6_files",
                    title: "غرفة الأرشيف",
                    location: "أرشيف المنشأة",

                    text:
                        "كانت الغرفة مليئة بخزائن معدنية. " +
                        "فتح آدم أحدها، فوجد مئات الملفات. " +
                        "لكن معظمها كان فارغًا. " +
                        "وفي الخزانة الأخيرة وجد ملفًا أسود لا يحمل اسمًا، " +
                        "بل يحمل الرقم نفسه الذي يطارده منذ استيقاظه: 0317.",

                    choices: [
                        {
                            id: "c6_file_truth",
                            text: "افتح الملف الأسود.",
                            next: "c6_file_truth",

                            effects: {
                                addItems: [
                                    "blackFile",
                                    "archiveBadge"
                                ],

                                setFlags: {
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
                    title: "الملف الأسود",
                    location: "الأرشيف",

                    text:
                        "قرأ آدم الصفحة الأولى. " +
                        "كان اسمه مكتوبًا في أعلى الصفحة، وتحته عبارة: \"الموضوع الأساسي للتجربة.\" " +
                        "ثم ظهرت ملاحظة: \"الذاكرة ليست الهدف الحقيقي. الهدف هو معرفة ما الذي يبقى من الإنسان بعد تغييرها.\" " +
                        "توقفت أنفاس آدم للحظة.",

                    choices: [
                        {
                            id: "c6_previous",
                            text: "اقرأ الصفحة الأخيرة.",
                            next: "c6_previous"
                        }
                    ]
                },


                {
                    id: "c6_previous",
                    title: "ا