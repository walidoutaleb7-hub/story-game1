
const GAME_DATA = {
    title: "ظلال المجهول",
    version: "3.0",

    settings: {
        maxHealth: 100,
        startingHealth: 100,
        startingCoins: 25
    },

    chapters: {
        1: {
            name: "الفصل الأول — الاستيقاظ",

            scenes: {

                start: {
                    title: "حين فتح عينيه",
                    text: "فتح عينيه ببطء. لم يعرف أين هو، ولا كيف وصل إلى هذا المكان. كان الصمت يملأ الغرفة، لكن من خلف الباب جاء صوت خافت وكأنه يناديه.",
                    choices: [
                        {
                            text: "اتبع الضوء القادم من النافذة",
                            next: "light",
                            effects: {
                                coins: 5
                            }
                        },
                        {
                            text: "اقترب من مصدر الصوت",
                            next: "corridor",
                            effects: {
                                courage: 1
                            }
                        }
                    ]
                },

                light: {
                    title: "الضوء",
                    text: "كان ضوء غريب يتسلل من باب نصف مفتوح. لم يكن ضوءًا طبيعيًا، بل كان أبيض بشكل مقلق.",
                    choices: [
                        {
                            text: "افتح الباب",
                            next: "room",
                            effects: {
                                courage: 1
                            }
                        },
                        {
                            text: "ابتعد وعد إلى الممر",
                            next: "corridor"
                        }
                    ]
                },

                corridor: {
                    title: "الممر الطويل",
                    text: "خرج إلى ممر لا يبدو أن له نهاية. ثلاثة أبواب كانت أمامه: باب أبيض، باب أسود، وباب صغير يكاد يختفي في الجدار.",
                    choices: [
                        {
                            text: "ادخل الباب الأبيض",
                            next: "whiteDoor",
                            effects: {
                                morality: 1
                            }
                        },
                        {
                            text: "ادخل الباب الأسود",
                            next: "blackDoor",
                            effects: {
                                courage: 1,
                                health: -5
                            }
                        },
                        {
                            text: "تفحص الباب الصغير",
                            next: "smallDoor",
                            effects: {
                                curiosity: 1
                            }
                        }
                    ]
                },

                room: {
                    title: "الغرفة القديمة",
                    text: "وجد غرفة مليئة بالأغراض القديمة. فوق طاولة خشبية كان هناك مفتاح صدئ، وبجانبه ورقة تحمل رمزًا غريبًا.",
                    choices: [
                        {
                            text: "خذ المفتاح",
                            next: "archive",
                            effects: {
                                curiosity: 1,
                                item: "المفتاح القديم"
                            }
                        },
                        {
                            text: "اترك كل شيء وغادر",
                            next: "corridor"
                        }
                    ]
                },

                whiteDoor: {
                    title: "الباب الأبيض",
                    text: "عندما فتح الباب، وجد رجلًا يقف وسط غرفة بيضاء تمامًا. لم يتحرك الرجل، لكنه قال: كنت أعلم أنك ستصل.",
                    choices: [
                        {
                            text: "اسأله: من أنت؟",
                            next: "stranger",
                            effects: {
                                curiosity: 1
                            }
                        },
                        {
                            text: "ابتعد فورًا",
                            next: "corridor"
                        }
                    ]
                },

                blackDoor: {
                    title: "الباب الأسود",
                    text: "كان الظلام خلف الباب كثيفًا لدرجة أنه بدا وكأنه شيء حي. ثم تحرك ظل طويل أمامه.",
                    choices: [
                        {
                            text: "واجه الظل",
                            next: "shadow",
                            effects: {
                                health: -10,
                                courage: 2
                            }
                        },
                        {
                            text: "اهرب",
                            next: "corridor",
                            effects: {
                                health: -5
                            }
                        }
                    ]
                },

                smallDoor: {
                    title: "الباب الصغير",
                    text: "انحنى أمام الباب الصغير. كان هناك رمز محفور عليه يشبه العين، وحين اقترب منه شعر أن شيئًا داخل رأسه بدأ يستيقظ.",
                    choices: [
                        {
                            text: "المس الرمز",
                            next: "memory",
                            effects: {
                                curiosity: 2,
                                item: "الخريطة القديمة"
                            }
                        },
                        {
                            text: "خذ الورقة الموجودة بجانبه",
                            next: "archive",
                            effects: {
                                item: "الخريطة القديمة"
                            }
                        }
                    ]
                },

                stranger: {
                    title: "الرجل الغريب",
                    text: "ابتسم الرجل وقال: أنت لا تبحث عن طريق للخروج... أنت تبحث عن الحقيقة. ثم أخرج قطعة صغيرة من معدن غريب.",
                    choices: [
                        {
                            text: "خذ القطعة",
                            next: "archive",
                            effects: {
                                coins: 20,
                                item: "القطعة الغامضة"
                            }
                        },
                        {
                            text: "اسأله عن الحقيقة",
                            next: "memory",
                            effects: {
                                curiosity: 2
                            }
                        },
                        {
                            text: "ابحث عنه عندما يختفي",
                            next: "corridor",
                            effects: {
                                curiosity: 1
                            }
                        }
                    ]
                },

                memory: {
                    title: "الذكرى",
                    text: "فجأة ظهرت صورة في ذهنه. كان يقف في هذا المكان من قبل... لكنه لم يكن وحده. شخص آخر كان معه، وشخص ما كان يراقبهما.",
                    choices: [
                        {
                            text: "حاول تذكر المزيد",
                            next: "archive",
                            effects: {
                                achievement: "memory",
                                curiosity: 1
                            }
                        }
                    ]
                },

                archive: {
                    title: "الأرشيف",
                    text: "وصل إلى غرفة ضخمة مليئة بالملفات. معظمها كان يحمل أسماء أشخاص، لكن ملفًا واحدًا كان يحمل اسمه.",
                    choices: [
                        {
                            text: "افتح الملف",
                            next: "future",
                            effects: {
                                curiosity: 2
                            }
                        },
                        {
                            text: "أغلق الملف واتبع الممر",
                            next: "finalDoor"
                        }
                    ]
                },

                future: {
                    title: "غدًا",
                    text: "داخل الملف لم يجد ماضيه، بل وجد شيئًا أكثر غرابة: وصفًا لما سيحدث غدًا. وفي آخر الصفحة جملة واحدة: إذا قرأت هذا، فقد بدأ كل شيء بالفعل.",
                    choices: [
                        {
                            text: "تابع نحو الباب الأخير",
                            next: "finalDoor",
                            effects: {
                                courage: 1
                            }
                        },
                        {
                            text: "اهرب من المكان",
                            next: "corridor"
                        }
                    ]
                },

                finalDoor: {
                    title: "الباب الأخير",
                    text: "وقف أمام باب ضخم. لم يكن عليه مقبض، لكن الرمز الموجود في الخريطة بدأ يضيء. شعر أن القرار القادم سيغير كل شيء.",
                    choices: [
                        {
                            text: "افتح الباب",
                            next: "ending",
                            effects: {
                                courage: 2,
                                coins: 50,
                                achievement: "first_chapter"
                            }
                        },
                        {
                            text: "لا تفتحه الآن",
                            next: "secretEnding",
                            effects: {
                                curiosity: 2
                            }
                        }
                    ]
                },

                shadow: {
                    title: "مواجهة الظل",
                    text: "توقف الظل أمامه. لم يكن له وجه، لكن صوتًا خرج منه: اختر بعناية... فالطريق الذي ستختاره الآن لن يكون من السهل تغييره.",
                    choices: [
                        {
                            text: "اختر طريق النور",
                            next: "finalLight",
                            effects: {
                                morality: 1
                            }
                        },
                        {
                            text: "اختر طريق الظلام",
                            next: "finalDark",
                            effects: {
                                courage: 2
                            }
                        }
                    ]
                },

                finalLight: {
                    title: "طريق النور",
                    text: "دخل إلى مكان هادئ تغمره الإضاءة. وفي نهاية الطريق رأى شخصًا يقف منتظرًا.",
                    choices: [
                        {
                            text: "اقترب منه",
                            next: "ending",
                            effects: {
                                morality: 2
                            }
                        }
                    ]
                },

                finalDark: {
                    title: "طريق الظلام",
                    text: "اختار الظلام. لم يسمع سوى خطواته، ثم ظهرت أمامه أضواء مدينة بعيدة لم يكن يعرف بوجودها.",
                    choices: [
                        {
                            text: "ادخل المدينة",
                            next: "ending",
                            effects: {
                                courage: 3,
                                coins: 30
                            }
                        }
                    ]
                },

                secretEnding: {
                    title: "سر لم يُكشف",
                    text: "اخترت ألا تفتح الباب. ربما كان هذا القرار أكثر أهمية مما تتخيل. خلف الباب بدأ شيء ما يتحرك... وكأنه كان ينتظر منذ زمن.",
                    ending: true,
                    endingText: "بعض الأبواب لا تحتاج إلى أن تُفتح كي تغيّر حياتك.",
                    effects: {
                        achievement: "secret"
                    }
                },

                ending: {
                    title: "البداية فقط",
                    text: "فتح الباب، لكنه لم يجد النهاية التي كان يبحث عنها. وجد طريقًا جديدًا، وأدرك أن كل ما حدث لم يكن سوى البداية.",
                    ending: true,
                    endingText: "لقد أنهيت الفصل الأول... لكن رحلتك الحقيقية بدأت الآن.",
                    effects: {
                        achievement: "first_chapter"
                    }
                }
            }
        }
    },

    achievements: {

        memory: {
            title: "الذاكرة الأولى",
            description: "استعدت أول جزء من ذاكرتك.",
            icon: "🧠"
        },

        brave: {
            title: "الشجاع",
            description: "واجهت الخطر بدلًا من الهروب.",
            icon: "⚔️"
        },

        discoverer: {
            title: "المكتشف",
            description: "اكتشفت سرًا مخفيًا.",
            icon: "🔮"
        },

        secret: {
            title: "السر",
            description: "اكتشفت أن هناك شيئًا أكبر مما تتخيل.",
            icon: "👁️"
        },

        first_chapter: {
            title: "البداية",
            description: "أنهيت الفصل الأول.",
            icon: "🌟"
        }
    }
};