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

// Initialize In-App Interstitial (Runs on load)
try {
    if (window.show_10279136) {
        window.show_10279136(adConfig.inApp);
    }
} catch (e) {
    console.error("Ad SDK init error:", e);
}

// Data
const data = {
    food: [
        "بيتزا 🍕", "برجر 🍔", "سوشي 🍣", "شاورما 🌯", "كشري 🍲",
        "مكرونة بشاميل 🍝", "مشويات 🍖", "سمك مشوي 🐟", "فطير مشلتت 🥞", "ملوخية 🌿",
        "كبسة 🍛", "مندي 🍖", "ورق عنب 🍇", "حواوشي 🥙", "فلافل 🧆"
    ],
    movie: [
        "Inception 🌀", "The Dark Knight 🦇", "Interstellar 🚀", "The Godfather 🌹", "Pulp Fiction 🔫",
        "Shawshank Redemption ⛓️", "Matrix 🕶️", "Fight Club 👊", "Forrest Gump 🏃", "Gladiator ⚔️",
        "Parasite 🏠", "Spirited Away 🐉", "Coco 🎸", "Avengers: Endgame 🦸", "Joker 🤡"
    ],
    song: [
        "Bohemian Rhapsody 👑", "Shape of You ➗", "Blinding Lights 🌃", "Rolling in the Deep 🎤", "Smells Like Teen Spirit 🎸",
        "Hotel California 🏨", "Imagine ☮️", "Billie Jean 🕺", "Hallelujah 🙏", "Sweet Child O' Mine 🌹",
        "Despacito 💃", "Uptown Funk 🎷", "Someone Like You 💔", "Thinking Out Loud 💭", "Perfect 🎻"
    ],
    travel: [
        "باريس، فرنسا 🇫🇷", "طوكيو، اليابان 🇯🇵", "روما، إيطاليا 🇮🇹", "نيويورك، أمريكا 🇺🇸", "دبي، الإمارات 🇦🇪",
        "إسطنبول، تركيا 🇹🇷", "لندن، بريطانيا 🇬🇧", "بالي، إندونيسيا 🇮🇩", "القاهرة، مصر 🇪🇬", "سيدني، أستراليا 🇦🇺",
        "ريو دي جانيرو، البرازيل 🇧🇷", "كيب تاون، جنوب أفريقيا 🇿🇦", "بانكوك، تايلاند 🇹🇭", "أمستردام، هولندا 🇳🇱", "برشلونة، إسبانيا 🇪🇸"
    ]
};

let selectedCategory = null;

function selectCategory(type) {
    selectedCategory = type;

    // Update UI
    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
    document.querySelector(`.card[data-type="${type}"]`).classList.add('active');

    // Haptic feedback
    if (tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
}

function generateMix() {
    if (!selectedCategory) {
        // If nothing selected, pick random category
        const keys = Object.keys(data);
        selectedCategory = keys[Math.floor(Math.random() * keys.length)];
    }

    // Show Ad (Rewarded Interstitial) before result
    if (window.show_10279136) {
        window.show_10279136().then(() => {
            showSuggestion();
        }).catch(e => {
            console.error("Ad error:", e);
            showSuggestion(); // Show result even if ad fails
        });
    } else {
        showSuggestion();
    }
}

function showSuggestion() {
    const list = data[selectedCategory];
    const randomItem = list[Math.floor(Math.random() * list.length)];

    // Icons mapping
    const icons = { food: '🍔', movie: '🎬', song: '🎵', travel: '✈️' };

    document.getElementById('result-icon').innerText = icons[selectedCategory];
    document.getElementById('result-title').innerText = getTitle(selectedCategory);
    document.getElementById('result-value').innerText = randomItem;

    const modal = document.getElementById('result-modal');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('visible'), 10);

    if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
}

function getTitle(cat) {
    const titles = {
        food: "جرب تأكل...",
        movie: "سهرة الليلة مع...",
        song: "اسمع دي...",
        travel: "وجهتك القادمة..."
    };
    return titles[cat];
}

function closeModal() {
    const modal = document.getElementById('result-modal');
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.add('hidden'), 300);
    selectedCategory = null;
    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
}

function shareResult() {
    const text = document.getElementById('result-value').innerText;
    const title = document.getElementById('result-title').innerText;
    const fullText = `${title}\n${text}\n\n✨ عبر بوت ميكس الاقتراحات`;

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        tg.switchInlineQuery(fullText);
    } else {
        navigator.clipboard.writeText(fullText).then(() => alert('تم النسخ!'));
    }
}
