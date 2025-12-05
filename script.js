const tg = window.Telegram.WebApp;
tg.expand();

// Ad Configuration
const adConfig = {
    inApp: {
        type: 'inApp',
        inAppSettings: {
            frequency: 2,
            capping: 0.1,
            interval: 30,
            timeout: 5,
            everyPage: false
        }
    }
};

// Initialize In-App Interstitial
try {
    if (window.show_10279136) {
        window.show_10279136(adConfig.inApp);
    }
} catch (e) {
    console.error("Ad SDK init error:", e);
}

// --- Sound Effects ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'spin') {
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.1);
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
    } else if (type === 'win') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.3);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
        oscillator.start(now);
        oscillator.stop(now + 0.5);
    } else if (type === 'click') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, now);
        gainNode.gain.setValueAtTime(0.05, now);
        oscillator.start(now);
        oscillator.stop(now + 0.05);
    }
}

// --- Content Database ---
const data = {
    food: [
        { title: "بيتزا إيطالي 🍕", desc: "عجينة رقيقة، صلصة طماطم طازجة، وجبنة موزاريلا ذائبة. جربها مع الريحان!", rating: "⭐⭐⭐⭐⭐" },
        { title: "كشري مصري 🍲", desc: "مزيج أسطوري من الأرز والمكرونة والعدس مع صلصة الطماطم والدقة الحارة.", rating: "⭐⭐⭐⭐⭐" },
        { title: "سوشي 🍣", desc: "تجربة يابانية راقية. جرب رول السلمون أو التونة مع الصويا صوص.", rating: "⭐⭐⭐⭐" },
        { title: "شاورما سوري 🌯", desc: "سيخ شاورما دجاج أو لحم مع الثومية والخبز الصاج المقرمش.", rating: "⭐⭐⭐⭐⭐" },
        { title: "مسخن فلسطيني 🍗", desc: "دجاج محمر مع البصل والسماق وزيت الزيتون على خبز الطابون.", rating: "⭐⭐⭐⭐⭐" },
        { title: "كبسة سعودية 🍛", desc: "أرز بسمتي طويل الحبة مع اللحم الضأن والبهارات العربية الأصيلة.", rating: "⭐⭐⭐⭐⭐" },
        { title: "برجر دبل تشيز 🍔", desc: "قطعتين لحم مشوي، جبنة شيدر سايحة، وصوص خاص. دمار شامل!", rating: "⭐⭐⭐⭐" },
        { title: "منسف أردني 🥘", desc: "لحم بلدي، أرز، وجميد كركي أصلي. أكلة الملوك!", rating: "⭐⭐⭐⭐⭐" }
    ],
    movie: [
        { title: "إنسيبشن (Inception) 🌀", desc: "فيلم خيال علمي عن سرقة الأحلام. هل أنت في حلم أم واقع؟", rating: "⭐⭐⭐⭐⭐" },
        { title: "فارس الظلام (Dark Knight) 🦇", desc: "أفضل فيلم سوبر هيرو في التاريخ. أداء الجوكر لا ينسى.", rating: "⭐⭐⭐⭐⭐" },
        { title: "بين النجوم (Interstellar) 🚀", desc: "رحلة عبر الثقوب الدودية لإنقاذ البشرية. موسيقى هانز زيمر ساحرة.", rating: "⭐⭐⭐⭐⭐" },
        { title: "طفيلي (Parasite) 🏠", desc: "فيلم كوري عبقري عن الطبقية الاجتماعية. نهاية صادمة!", rating: "⭐⭐⭐⭐⭐" },
        { title: "العراب (The Godfather) 🌹", desc: "ملحمة العصابات الكلاسيكية. عرض لا يمكنك رفضه.", rating: "⭐⭐⭐⭐⭐" },
        { title: "المخطوفة (Spirited Away) 🐉", desc: "أنمي ساحر من استوديو جيبلي. رحلة شيهيرو في عالم الأرواح.", rating: "⭐⭐⭐⭐⭐" },
        { title: "كوكو (Coco) 🎸", desc: "فيلم عائلي مؤثر عن الموسيقى والذاكرة. جهز المناديل!", rating: "⭐⭐⭐⭐⭐" }
    ],
    song: [
        { title: "أنت عمري - أم كلثوم 🎤", desc: "لقاء السحاب. أغنية طربية تأخذك لعالم آخر.", rating: "⭐⭐⭐⭐⭐" },
        { title: "بوهيميان رابسودي 👑", desc: "تحفة فرقة Queen. مزيج غريب وعبقري من الروك والأوبرا.", rating: "⭐⭐⭐⭐⭐" },
        { title: "شيب أوف يو (Shape of You) ➗", desc: "أغنية بوب إيقاعية لإد شيران. مستحيل ما ترقص عليها!", rating: "⭐⭐⭐⭐" },
        { title: "ثلاث دقات 🏖️", desc: "أغنية الصيف الرسمية. جو بحر ورومانسية.", rating: "⭐⭐⭐⭐" },
        { title: "تخيل (Imagine) ☮️", desc: "نشيد السلام العالمي لجون لينون. كلمات تلمس القلب.", rating: "⭐⭐⭐⭐⭐" },
        { title: "يا مسهرني 🎻", desc: "رائعة سيد مكاوي وأم كلثوم. سلطنة ومزاج عالي.", rating: "⭐⭐⭐⭐⭐" }
    ],
    travel: [
        { title: "جزر المالديف 🏝️", desc: "الجنة على الأرض. مياه فيروزية وشواطئ رملية بيضاء.", rating: "⭐⭐⭐⭐⭐" },
        { title: "طوكيو، اليابان 🇯🇵", desc: "مزيج مذهل بين التكنولوجيا المستقبلية والتقاليد العريقة.", rating: "⭐⭐⭐⭐⭐" },
        { title: "الأقصر وأسوان 🇪🇬", desc: "رحلة عبر التاريخ. ثلث آثار العالم في مكان واحد.", rating: "⭐⭐⭐⭐⭐" },
        { title: "باريس، فرنسا 🇫🇷", desc: "مدينة النور والحب. برج إيفل، اللوفر، والكرواسون.", rating: "⭐⭐⭐⭐" },
        { title: "بالي، إندونيسيا 🇮🇩", desc: "طبيعة خلابة، معابد روحانية، وجو استرخاء تام.", rating: "⭐⭐⭐⭐⭐" }
    ],
    challenge: [
        { title: "تحدي اللهجة 🗣️", desc: "تكلم بلهجة دولة عربية غير دولتك لمدة 5 دقائق كاملة!", rating: "🔥" },
        { title: "تحدي الصمت 🤫", desc: "اجلس مع أصدقائك لمدة 3 دقائق بدون نطق كلمة واحدة.", rating: "🔥" },
        { title: "تحدي الرسم 🎨", desc: "ارسم قطة وأنت مغمض عينيك في 30 ثانية.", rating: "🔥" },
        { title: "تحدي الاتصال 📞", desc: "اتصل بأعز صديق لك وقول له 'أنا بحبك' بدون سبب.", rating: "🔥" }
    ],
    joke: [
        { title: "نكتة 1 😂", desc: "مرة واحد راح يشتري ساعة، لقاها غالية.. اشترى 5 دقايق!", rating: "😂" },
        { title: "نكتة 2 😂", desc: "مرة مدرس رياضة اتجوز مدرسة رياضة.. خلفوا ولد شبه منحرف!", rating: "😂" },
        { title: "نكتة 3 😂", desc: "واحد بخيل أبوه مات، بكي بعين واحدة عشان ميسرفش!", rating: "😂" },
        { title: "نكتة 4 😂", desc: "مرة قمر اتخانق مع شمس، قالها: 'يا ولية يا اللي بتطلعي بالنهار بس!'", rating: "😂" }
    ],
    quote: [
        { title: "حكمة اليوم 💡", desc: "لا تؤجل عمل اليوم إلى الغد، فقد يكون الغد إجازة!", rating: "✨" },
        { title: "حكمة عميقة 🧠", desc: "السفينة آمنة في الميناء، لكنها لم تُصنع لهذا.", rating: "✨" },
        { title: "تحفيز 💪", desc: "النجاح هو الانتقال من فشل إلى فشل دون فقدان الحماس.", rating: "✨" },
        { title: "تفاؤل ☀️", desc: "كل مر سيمر، وكل كسر سيجبر.", rating: "✨" }
    ],
    book: [
        { title: "الخيميائي 📚", desc: "رواية باولو كويلو عن البحث عن الحلم الشخصي.", rating: "⭐⭐⭐⭐⭐" },
        { title: "قواعد العشق الأربعون 🕌", desc: "رواية إليف شفق عن جلال الدين الرومي وشمس التبريزي.", rating: "⭐⭐⭐⭐⭐" },
        { title: "الأب الغني والأب الفقير 💰", desc: "كتاب يغير تفكيرك المالي للأبد.", rating: "⭐⭐⭐⭐⭐" },
        { title: "شيفرة دافنشي 🔍", desc: "رواية غموض وإثارة تحبس الأنفاس.", rating: "⭐⭐⭐⭐" }
    ]
};

let selectedCategory = null;
let currentResult = null;

function selectCategory(type) {
    selectedCategory = type;

    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
    document.querySelector(`.card[data-type="${type}"]`).classList.add('active');

    if (tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
    playSound('click');
}

function generateMix() {
    if (!selectedCategory) {
        const keys = Object.keys(data);
        selectedCategory = keys[Math.floor(Math.random() * keys.length)];
        // Highlight random category briefly
        document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
        document.querySelector(`.card[data-type="${selectedCategory}"]`).classList.add('active');
    }

    // Show Ad
    if (window.show_10279136) {
        window.show_10279136().then(() => {
            startSlotMachine();
        }).catch(e => {
            console.error("Ad error:", e);
            startSlotMachine();
        });
    } else {
        startSlotMachine();
    }
}

function startSlotMachine() {
    const modal = document.getElementById('result-modal');
    const resultValue = document.getElementById('result-value');
    const resultDesc = document.getElementById('result-desc');
    const resultRating = document.getElementById('result-rating');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');

    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('visible'), 10);

    // Reset content
    resultDesc.innerText = '';
    resultRating.innerText = '';
    resultTitle.innerText = "جاري الاختيار...";

    const list = data[selectedCategory];
    let counter = 0;
    const maxSpins = 20;

    // Slot Animation
    const interval = setInterval(() => {
        const randomItem = list[Math.floor(Math.random() * list.length)];
        resultValue.innerText = randomItem.title;
        resultValue.classList.add('slot-spin');
        playSound('spin');

        counter++;
        if (counter >= maxSpins) {
            clearInterval(interval);
            resultValue.classList.remove('slot-spin');
            showFinalResult(list);
        }
    }, 100);
}

function showFinalResult(list) {
    const finalItem = list[Math.floor(Math.random() * list.length)];
    currentResult = finalItem; // Save for sharing/favorites

    const resultValue = document.getElementById('result-value');
    const resultDesc = document.getElementById('result-desc');
    const resultRating = document.getElementById('result-rating');
    const resultTitle = document.getElementById('result-title');
    const resultIcon = document.getElementById('result-icon');
    const favBtn = document.getElementById('fav-btn');

    resultValue.innerText = finalItem.title;
    resultDesc.innerText = finalItem.desc;
    resultRating.innerText = finalItem.rating;

    // Set Title & Icon
    const titles = {
        food: "وجبتك اليوم", movie: "سهرة الليلة", song: "اسمع دي", travel: "سافر إلى",
        challenge: "التحدي هو", joke: "اضحك من قلبك", quote: "حكمة لك", book: "اقرأ هذا"
    };
    const icons = {
        food: '🍔', movie: '🎬', song: '🎵', travel: '✈️',
        challenge: '🎯', joke: '😂', quote: '💡', book: '📚'
    };

    resultTitle.innerText = titles[selectedCategory] || "النتيجة";
    resultIcon.innerText = icons[selectedCategory] || "✨";

    // Check Favorite status
    updateFavButton();

    playSound('win');
    if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
}

// --- Favorites Logic ---
function toggleFavorite() {
    if (!currentResult) return;

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.findIndex(f => f.title === currentResult.title);

    if (index === -1) {
        favorites.push(currentResult);
        playSound('click'); // Add sound
    } else {
        favorites.splice(index, 1);
        playSound('click'); // Remove sound
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavButton();
}

function updateFavButton() {
    if (!currentResult) return;
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFav = favorites.some(f => f.title === currentResult.title);
    const btn = document.getElementById('fav-btn');

    if (isFav) {
        btn.classList.add('fav-active');
        btn.innerText = '❤️';
    } else {
        btn.classList.remove('fav-active');
        btn.innerText = '🤍';
    }
}

function closeModal() {
    const modal = document.getElementById('result-modal');
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.add('hidden'), 300);
    playSound('click');
}

function shareResult() {
    if (!currentResult) return;
    const text = `${currentResult.title}\n\n${currentResult.desc}\n\n✨ عبر بوت ميكس الاقتراحات`;

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        tg.switchInlineQuery(text);
    } else {
        navigator.clipboard.writeText(text).then(() => alert('تم النسخ!'));
    }
    playSound('click');
}
