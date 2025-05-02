// المتغيرات العامة
let startTime;
let currentScene = 1;
let stars = [];
let userName = '';
const TIME_LIMIT = 15 * 60 * 1000; // 15 دقيقة بالمللي ثانية
let backgroundMusic;
let isInitialized = false;
let currentText = '';
let typingSpeed = 50; // سرعة الكتابة بالمللي ثانية
let storyProgress = 0;
let starsCollected = 0;
let hasStarted = false;

// النص الافتتاحي
const openingText = `مرحباً بكِ في عالمي الخيالي...
سأأخذكِ في رحلة سحرية عبر النجوم...
هل أنتِ مستعدة؟`;

// النصوص القصصية
const storyTexts = [
    "في عالم بعيد، حيث النجوم تتحدث والظلام يخفي أسراراً لا حصر لها...",
    "كل نجمة تحمل قصة، وكل قصة تحمل حكمة...",
    "عندما تجتمع النجوم، تتشكل معاني جديدة...",
    "في قلب الظلام، يولد النور...",
    "وأخيراً، عندما تتجمع كل القصص، تظهر الحقيقة..."
];

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('startScreen');
    if (!startScreen || startScreen.style.display === 'none') return;
    if (hasStarted) return;
    hasStarted = true;
    setTimeout(() => {
        startTyping(openingText, () => {
            setTimeout(() => {
                showLightEffect(() => {
                    setTimeout(() => {
                        showWarpEffect(() => {
                            showScene(1);
                            setTimeout(() => {
                                initScene1();
                            }, 100);
                        });
                    }, 500);
                });
            }, 1000);
        });
    }, 2000);
});

// بدء الرحلة
function startJourney() {
    if (isInitialized) return;
    
    console.log("بدء الرحلة");
    const nameInput = document.getElementById('nameInput');
    if (!nameInput) return;
    
    userName = nameInput.value.trim();
    if (userName === '') {
        alert('من فضلك أدخلي اسمك');
        nameInput.focus();
    return;
  }

    isInitialized = true;

    // إخفاء شاشة البداية
    const startScreen = document.getElementById('startScreen');
    if (!startScreen) return;
    
    startScreen.style.opacity = '0';
    startScreen.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
        startScreen.style.display = 'none';
        // إظهار المشهد الأول
        const scene1 = document.getElementById('scene1');
        if (!scene1) return;
        
        scene1.style.display = 'block';
        scene1.style.opacity = '1';
        initScene1();
    }, 500);
}

// تهيئة المشهد الأول
function initScene1() {
    if (!document.getElementById('scene1')) return;
    console.log("جاري تهيئة المشهد الأول");
    
    const scene1 = document.getElementById('scene1');
    
    // إنشاء النجوم العشوائية
    const starsContainer = scene1.querySelector('.stars-container');
    if (!starsContainer) {
        console.error("لم يتم العثور على حاوية النجوم");
        return;
    }
    
    console.log("حاوية النجوم العادية:", starsContainer);
    
    // مسح النجوم الموجودة
    starsContainer.innerHTML = '';
    
    // إضافة النجوم العشوائية
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${1 + Math.random() * 2}s`);
        star.style.setProperty('--opacity', `${0.3 + Math.random() * 0.7}`);
        star.style.opacity = '1';
        starsContainer.appendChild(star);
    }
    
    // تهيئة النجوم الخاصة
    const specialStarsContainer = scene1.querySelector('.special-stars-container');
    if (!specialStarsContainer) {
        console.error("لم يتم العثور على حاوية النجوم الخاصة");
        return;
    }
    
    const specialStars = specialStarsContainer.querySelectorAll('.special-star');
    console.log("عدد النجوم الخاصة:", specialStars.length);
    
    specialStars.forEach((star, index) => {
        if (!star) return;
        
        // تعيين الموقع
        const x = 20 + (index * 15);
        const y = 20 + (Math.random() * 60);
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // إضافة تأثيرات التوهج
        const glowCircle = document.createElement('div');
        glowCircle.className = 'glow-circle';
        star.appendChild(glowCircle);
        
        // إظهار النجم فوراً
        star.style.opacity = '1';
        star.style.transform = 'scale(1)';
        
        // إضافة معالجات الأحداث
        let pressTimer;
        let isPressed = false;
        
        const handleMouseDown = () => {
            isPressed = true;
            star.classList.add('pressed');
            glowCircle.style.animation = 'glowPulse 1s infinite';
            
            pressTimer = setTimeout(() => {
                if (isPressed) {
                    star.classList.add('explode');
                    setTimeout(() => {
                        showMessage(parseInt(star.dataset.star));
                        star.classList.remove('explode');
                    }, 500);
                }
  }, 1000);
        };
        
        const handleMouseUp = () => {
            isPressed = false;
            star.classList.remove('pressed');
            glowCircle.style.animation = '';
            clearTimeout(pressTimer);
        };
        
        const handleMouseLeave = () => {
            if (isPressed) {
                isPressed = false;
                star.classList.remove('pressed');
                glowCircle.style.animation = '';
                clearTimeout(pressTimer);
            }
        };
        
        // إزالة المستمعين القديمين إذا وجدوا
        star.removeEventListener('mousedown', handleMouseDown);
        star.removeEventListener('mouseup', handleMouseUp);
        star.removeEventListener('mouseleave', handleMouseLeave);
        
        // إضافة المستمعين الجدد
        star.addEventListener('mousedown', handleMouseDown);
        star.addEventListener('mouseup', handleMouseUp);
        star.addEventListener('mouseleave', handleMouseLeave);
        
        console.log(`تم تهيئة النجم الخاص ${index + 1} في الموقع:`, { x, y });
    });

    // ظهور شخصية ألفا بعد ظهور النجوم
    setTimeout(() => {
        console.log("إظهار شخصية ألفا");
        const alphaCharacter = document.querySelector('.alpha-character');
        if (!alphaCharacter) return;
        
        alphaCharacter.style.display = 'block';
        
        setTimeout(() => {
            alphaCharacter.style.opacity = '1';
            alphaCharacter.style.transform = 'translateX(-50%) translateY(0)';
            
            const alphaMessage = document.getElementById('alphaMessage');
            if (alphaMessage) {
                alphaMessage.textContent = `أهلاً وسهلاً ${userName}، كيف حالك اليوم؟`;
            }
            
            const choices = document.querySelector('.choices');
            if (choices) {
                choices.style.display = 'flex';
                setTimeout(() => {
                    choices.style.opacity = '1';
                }, 100);
            }
        }, 100);
    }, 1500);
}

// معالجة الإجابة
function handleAnswer(answer) {
    console.log("معالجة الإجابة:", answer);
    
    if (currentScene === 1) {
        let response = '';
        const choices = document.querySelector('.choices');
        const alphaCharacter = document.querySelector('.alpha-character');
        
        // إخفاء الخيارات
        choices.style.opacity = '0';

  if (answer === 'good') {
            response = `رائع يا ${userName}! يسعدني سماع ذلك، لنبدأ رحلتنا السحرية مع النجوم...`;
  } else if (answer === 'notGood') {
            response = `لماذا؟ لا يجب أن تكوني هكذا... أنتِ قوية جدًا وستحققين كل ما تتمنين. هل تريدين الاستمرار معي في قراءة الرسالة السرية يا ${userName}؟`;
  } else if (answer === 'great') {
            response = `ممتاز! أتمنى أن تبقي بهذا الشعور دائمًا يا ${userName}.`;
        }
        
        // عرض الرسالة
        document.getElementById('alphaMessage').textContent = response;
        
        // الانتقال للمشهد التالي
        setTimeout(() => {
            console.log("بدء الانتقال للمشهد التالي");
            
            // إخفاء شخصية ألفا
            alphaCharacter.style.opacity = '0';
            alphaCharacter.style.transform = 'translateX(-50%) translateY(50px)';
            
            setTimeout(() => {
                // إخفاء المشهد الحالي
                const currentSceneElement = document.getElementById('scene1');
                currentSceneElement.style.display = 'none';
                
                // إظهار المشهد التالي
                currentScene = 2;
                const nextSceneElement = document.getElementById('scene2');
                nextSceneElement.style.display = 'block';
                
                console.log("تم الانتقال للمشهد الثاني");
                
                // تهيئة المشهد الثاني
                initScene2();
            }, 1000);
        }, 2000);
    }
}

// تهيئة المشهد الثاني
function initScene2() {
    console.log("تهيئة المشهد الثاني");
    
    const scene2 = document.getElementById('scene2');
    const starsContainer = scene2.querySelector('.stars-container');
    
    // مسح النجوم الموجودة
    starsContainer.innerHTML = '';
    
    // إضافة النجوم العشوائية
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${1 + Math.random() * 2}s`);
        star.style.setProperty('--opacity', `${0.3 + Math.random() * 0.7}`);
        starsContainer.appendChild(star);
    }
    
    // تهيئة النجوم الخاصة
    const specialStars = scene2.querySelectorAll('.special-star');
    console.log("عدد النجوم الخاصة في المشهد الثاني:", specialStars.length);
    
    specialStars.forEach((star, index) => {
        // تعيين الموقع
        const x = 20 + (index * 15);
        const y = 20 + (Math.random() * 60);
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // إظهار النجم تدريجياً
        setTimeout(() => {
            star.style.opacity = '1';
            star.style.transform = 'scale(1)';
        }, index * 200);
        
        // إضافة معالجات الأحداث
        let pressTimer;
        let isPressed = false;
        
        // إضافة معالجات الأحداث للنجم
        star.addEventListener('mousedown', () => {
            isPressed = true;
            star.classList.add('pressed');
            
            pressTimer = setTimeout(() => {
                if (isPressed) {
                    star.classList.add('explode');
                    setTimeout(() => {
                        showMessage(parseInt(star.dataset.star));
                        star.classList.remove('explode');
                    }, 500);
                }
            }, 1000);
        });
        
        star.addEventListener('mouseup', () => {
            isPressed = false;
            star.classList.remove('pressed');
            clearTimeout(pressTimer);
        });
        
        star.addEventListener('mouseleave', () => {
            if (isPressed) {
                isPressed = false;
                star.classList.remove('pressed');
                clearTimeout(pressTimer);
            }
        });
        
        console.log(`تم تهيئة النجم الخاص ${index + 1} في المشهد الثاني`);
    });
}

// عرض الرسالة
function showMessage(starNumber) {
    const messages = {
        1: {
            title: 'نور البداية ✨',
            subtitle: 'النجمة الأولى',
            content: 'كل طريق مضيء يبدأ بخطوة شجاعة، حتى وإن كان القلب خائفًا.\n\n"في داخلكِ ضوء لا يخبو، وإن خفت من المسير، تذكّري أن النور الحقيقي يولد من عمق الظلام."',
            effect: 'fadeIn'
        },
        2: {
            title: 'صوت الحق 🌟',
            subtitle: 'النجمة الثانية',
            content: 'أن تكوني صوتًا للعدل، هو أن تكوني سيفًا من نور في عالم مرتبك.\n\n"كلما دافعتِ عن مظلوم، تفتح الكون بابًا من نور لم تُرَ ملامحه بعد."',
            effect: 'slideIn'
        },
        3: {
            title: 'هدوء العاصفة 💫',
            subtitle: 'النجمة الثالثة',
            content: 'الهدوء ليس صمتًا، بل حكمة قادرة على إسكات كل ضجيج داخلي.\n\n"كوني تلك التي تمشي وسط العاصفة، لا لأنها لا تخاف، بل لأنها تعلم أن في داخلها سلامًا لا يُهزم."',
            effect: 'zoomIn'
        },
        4: {
            title: 'انعكاس الروح ⭐',
            subtitle: 'النجمة الرابعة',
            content: 'الروح الطيبة لا تُخفى، تشعّ في كل نظرة، كل كلمة، وكل موقف عابر.\n\n"إنكِ لا تحتاجين أن تبرهني شيئًا لأحد، حضوركِ بحد ذاته برهان على النور."',
            effect: 'rotateIn'
        },
        5: {
            title: 'قمة النور 🌠',
            subtitle: 'النجمة الخامسة',
            content: 'حين تصلين، لا تنسي أن كل خطوة سابقة كانت نورًا، لا مجرد طريق.\n\n"النور ليس غاية… هو أنتِ، وهو ما تتركينه خلفكِ في قلوب الآخرين."',
            effect: 'bounceIn'
        }
    };
    
    const popup = document.querySelector('.message-popup');
    const messageContent = document.querySelector('.message-content');
    
    if (!popup || !messageContent) return;
    
    // إضافة تأثيرات للرسالة
    messageContent.innerHTML = `
        <div class="star-message">
            <div class="star-header">
                <div class="star-number">${messages[starNumber].subtitle}</div>
                <h3>${messages[starNumber].title}</h3>
            </div>
            <div class="message-body">
                <p>${messages[starNumber].content.split('\n\n').join('</p><p>')}</p>
            </div>
            <button onclick="continueToNextScene()" class="continue-btn">
                استمري في الرحلة
                <span class="btn-glow"></span>
            </button>
        </div>
    `;
    
    // تطبيق التأثير المحدد
    popup.className = `message-popup ${messages[starNumber].effect}`;
    popup.style.display = 'block';
    
    // تشغيل الصوت
    playStarSound();
}

// تشغيل صوت النجم
function playStarSound() {
    const starSound = new Audio('music/star_sound.mp3');
    starSound.volume = 0.3;
    
    // تأثير صدى بسيط
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const source = context.createMediaElementSource(starSound);
    const delay = context.createDelay(0.2);
    const feedback = context.createGain();
    const filter = context.createBiquadFilter();
    
    feedback.gain.value = 0.3;
    filter.type = 'lowpass';
    filter.frequency.value = 1000;
    
    source.connect(delay);
    delay.connect(feedback);
    feedback.connect(filter);
    filter.connect(delay);
    source.connect(context.destination);
    delay.connect(context.destination);
    
    starSound.play().catch(error => {
        console.log('لم يتمكن المتصفح من تشغيل صوت النجم:', error);
    });
}

// الانتقال للمشهد التالي
function continueToNextScene() {
    const currentSceneElement = document.getElementById(`scene${currentScene}`);
    const messagePopup = currentSceneElement.querySelector('.message-popup');
    if (messagePopup) {
        messagePopup.style.display = 'none';
    }
    
    // تحديث النجوم النشطة
    updateActiveStars(currentScene);
    
    currentScene++;
    
    if (currentScene <= 6) {
        const nextSceneElement = document.getElementById(`scene${currentScene}`);
        if (nextSceneElement) {
            nextSceneElement.style.display = 'block';
            initNextScene();
        }
    } else if (currentScene === 7) {
        showFinalScene();
    }
}

// تهيئة المشهد التالي
function initNextScene() {
    console.log(`تهيئة المشهد ${currentScene}`);
    
    const scene = document.getElementById(`scene${currentScene}`);
    if (!scene) return;

    // إضافة النجوم العشوائية في الخلفية
    const starsContainer = scene.querySelector('.stars-container');
    if (starsContainer) {
        starsContainer.innerHTML = '';
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = `${Math.random() * 3}px`;
            star.style.height = star.style.width;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.setProperty('--duration', `${1 + Math.random() * 2}s`);
            star.style.setProperty('--opacity', `${0.3 + Math.random() * 0.7}`);
            starsContainer.appendChild(star);
        }
    }

    // تحديث النجوم الخاصة
    const specialStarsContainer = scene.querySelector('.special-stars-container');
    if (specialStarsContainer) {
        const specialStars = specialStarsContainer.querySelectorAll('.special-star');
        specialStars.forEach((star, index) => {
            // إخفاء كل النجوم أولاً
            star.style.opacity = '0';
            star.style.transform = 'scale(0)';
            
            // تحديد ما إذا كان يجب إظهار هذا النجم
            const shouldShowStar = index < currentScene;
            
            if (shouldShowStar) {
                // تعيين الموقع
                const x = 20 + (index * 15);
                const y = 20 + (Math.random() * 60);
                star.style.left = `${x}%`;
                star.style.top = `${y}%`;
                
                // إضافة تأثير التوهج
                if (!star.querySelector('.glow-circle')) {
                    const glowCircle = document.createElement('div');
                    glowCircle.className = 'glow-circle';
                    star.appendChild(glowCircle);
                }
                
                // إظهار النجم تدريجياً
                setTimeout(() => {
                    star.style.opacity = '1';
                    star.style.transform = 'scale(1)';
                    star.classList.add('completed');
                }, index * 200);
                
                // إضافة معالج النقر
                star.addEventListener('click', () => {
                    showMessage(parseInt(star.dataset.star));
                });
            }
        });
    }
}

// عرض المشهد النهائي
function showFinalScene() {
    const scene7 = document.getElementById('scene7');
    scene7.style.display = 'block';
    
    // تفعيل جميع النجوم
    const stars = document.querySelectorAll('.special-star');
    stars.forEach(star => star.classList.add('active'));
    
    // عرض اسم المستلم
    document.getElementById('recipientName').textContent = 'اسم المستلم';
}

// عرض الرسالة النهائية
function showFinalMessage() {
    const finalMessage = `
        عيد ميلاد سعيد!
        
        في هذا اليوم المميز، أود أن أشارككِ هذه الكلمات...
        
        [رسالة تهنئة مفصلة]
    `;
    
    document.getElementById('secretMessageText').textContent = finalMessage;
    document.getElementById('scene7').style.display = 'none';
    document.getElementById('scene8').style.display = 'block';
    
    // التحقق من الوقت
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime <= TIME_LIMIT) {
        showHiddenMessage();
    }
}

// عرض الرسالة المخفية
function showHiddenMessage() {
    setTimeout(() => {
        alert('تهانينا! لقد أكملتِ المهمة في الوقت المحدد. لديكِ رسالة سرية خاصة...');
        // عرض الرسالة السرية الخاصة
    }, 1000);
}

// تحديث النجوم النشطة
function updateActiveStars(completedScene) {
    console.log(`تحديث النجوم النشطة بعد المشهد ${completedScene}`);
    
    // تحديث حالة النجوم في المشهد الحالي
    const currentSceneElement = document.getElementById(`scene${completedScene}`);
    if (currentSceneElement) {
        const specialStars = currentSceneElement.querySelectorAll('.special-star');
        specialStars.forEach((star, index) => {
            if (index < completedScene) {
                star.classList.add('completed');
            }
        });
    }
}

// وظيفة الكتابة التدريجية
function startTyping(text, callback) {
    const typingElement = document.querySelector('.typing-text');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// وظيفة تأثير الضوء
function showLightEffect(callback) {
    const lightEffect = document.querySelector('.light-effect');
    lightEffect.classList.add('active');
    
    setTimeout(() => {
        if (callback) callback();
    }, 2000);
}

// وظيفة عرض المشهد
function showScene(sceneNumber) {
    const currentSceneElement = document.getElementById(`scene${currentScene}`);
    const nextSceneElement = document.getElementById(`scene${sceneNumber}`);
    
    if (currentSceneElement) {
        currentSceneElement.style.opacity = '0';
        setTimeout(() => {
            currentSceneElement.style.display = 'none';
        }, 500);
    }
    
    if (nextSceneElement) {
        nextSceneElement.style.display = 'block';
        setTimeout(() => {
            nextSceneElement.style.opacity = '1';
        }, 100);
    }
    
    currentScene = sceneNumber;
    updateProgress();
}

// وظيفة متابعة القصة
function continueStory() {
    if (storyProgress < storyTexts.length) {
        const storyText = document.querySelector('.story-text');
        storyText.textContent = '';
        startTyping(storyTexts[storyProgress], () => {
            storyProgress++;
            if (storyProgress >= storyTexts.length) {
                showScene(3); // الانتقال إلى مشهد تجميع النجوم
            }
        });
    }
}

// وظيفة تجميع النجوم
function collectStar(starNumber) {
    if (!document.querySelector(`.special-star[data-star="${starNumber}"]`).classList.contains('collected')) {
        starsCollected++;
        document.querySelector(`.special-star[data-star="${starNumber}"]`).classList.add('collected');
        
        if (starsCollected === 5) {
            showGoldenBox();
        }
    }
}

// وظيفة عرض الصندوق الذهبي
function showGoldenBox() {
    const goldenBox = document.querySelector('.golden-box');
    goldenBox.classList.add('active');
    
    // إضافة النص داخل الصندوق
    const messageContent = goldenBox.querySelector('.message-content');
    messageContent.textContent = 'تهانينا! لقد جمعتِ كل النجوم...';
}

// وظيفة معالجة الإجابة النهائية
function handleFinalAnswer(answer) {
    if (answer) {
        showNotification('لقد حققتِ مهمة سرية! يمكنكِ الحصول على مكافأة خاصة...');
    } else {
        showNotification('لقد أكملتِ 20% من الرسالة. بالتوفيق في حياتكِ!');
        setTimeout(() => {
            document.body.innerHTML = '<div class="message">سيتم تدمير الرسالة بعد 10 دقائق...</div>';
        }, 5000);
    }
    
    showNavigationBar();
}

// وظيفة عرض الإشعار
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// وظيفة عرض شريط التنقل
function showNavigationBar() {
    const navigationBar = document.querySelector('.navigation-bar');
    navigationBar.style.display = 'flex';
}

// وظيفة التنقل بين المشاهد
function navigateToScene(sceneNumber) {
    showScene(sceneNumber);
}

// وظيفة تحديث التقدم
function updateProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const progress = (currentScene / 4) * 100;
    progressBar.style.width = `${progress}%`;
}

// إضافة مستمعي الأحداث للنجوم
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.special-star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            collectStar(star.dataset.star);
        });
    });
});

// وظيفة تأثير الانتقال الفضائي (warp)
function showWarpEffect(callback) {
    const warp = document.querySelector('.warp-effect');
    if (!warp) return;
    warp.innerHTML = '';
    warp.style.display = 'block';
    // ألوان خيالية للخطوط
    const colors = [
        '#fff', '#0ff', '#39f', '#f0f', '#ff0', '#0f0', '#f8f', '#8ff', '#f99', '#aaf', '#f0c', '#0fc', '#ff8', '#8f8'
    ];
    // خطوط تخرج من المركز بزوايا عشوائية
    for (let i = 0; i < 90; i++) {
        const line = document.createElement('div');
        line.className = 'warp-line';
        // زاوية عشوائية
        const angle = Math.random() * 360;
        line.style.setProperty('--angle', angle + 'deg');
        // لون عشوائي مع تدرج شفاف
        const color = colors[Math.floor(Math.random() * colors.length)];
        line.style.background = `linear-gradient(180deg, ${color} 0%, transparent 100%)`;
        line.style.boxShadow = `0 0 16px 4px ${color}`;
        line.style.animationDelay = `${Math.random() * 1.2}s`;
        warp.appendChild(line);
    }
    // وميض في المركز
    const flash = document.createElement('div');
    flash.className = 'warp-flash';
    warp.appendChild(flash);
    setTimeout(() => {
        warp.style.display = 'none';
        warp.innerHTML = '';
        if (backgroundMusic) {
            backgroundMusic.play().catch(() => {});
        }
        if (callback) callback();
    }, 2500);
}

function goToScene(sceneNumber) {
  // إخفاء كل المشاهد
  document.querySelectorAll('.scene').forEach(scene => scene.style.display = 'none');
  // إظهار المشهد المطلوب
  const target = document.getElementById('scene' + sceneNumber);
  if (target) target.style.display = 'flex';

  // تشغيل الموسيقى في كل المشاهد ما عدا المشهد الأول
  const music = document.getElementById('birthday-music');
  if (sceneNumber > 1 && music) {
    music.play().catch(()=>{});
  } else if (music) {
    music.pause();
    music.currentTime = 0;
  }
}
