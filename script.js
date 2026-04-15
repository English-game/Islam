let currentUser = "";
let currentLevel = 1;
let score = 0;
let timeLeft = 480; 
let timerInterval;
let currentWordIndex = 0;
let shuffledWords = [];
let mistakes = []; 

const levelData = {
    1: [
        {tj: "макола", en: "article"}, {tj: "рахти хоб", en: "bed"}, {tj: "китоб", en: "book"},
        {tj: "писарбача", en: "boy"}, {tj: "китобдон", en: "briefcase"}, {tj: "автобус", en: "bus"},
        {tj: "банд, серкор", en: "busy"}, {tj: "камера", en: "camera"}, {tj: "пойтахт", en: "capital"},
        {tj: "кимие", en: "chemistry"}, {tj: "компютер", en: "computer"}, {tj: "тухм", en: "egg"},
        {tj: "мухандис", en: "engineer"}, {tj: "хаткуркунак", en: "eraser"}, {tj: "машк", en: "exercise"},
        {tj: "барои, для", en: "for"}, {tj: "география", en: "geography"}, {tj: "духтар", en: "girl"},
        {tj: "хуб, нагз", en: "good"}, {tj: "субх ба хайр", en: "Good morning"}, {tj: "руз ба хайр", en: "good afternoon"},
        {tj: "шом ба хайр", en: "good evening"}, {tj: "грамматика", en: "grammar"}, {tj: "таьрих", en: "history"},
        {tj: "хона", en: "home"}, {tj: "чи хел, чи тавр", en: "how"}, {tj: "кор, касбу хунар", en: "job"},
        {tj: "окил", en: "intelligent"}, {tj: "дарс", en: "lesson"}, {tj: "харита", en: "map"},
        {tj: "дар хотир нигох доштан", en: "memorize"}, {tj: "хонум", en: "miss"}, {tj: "мохтоб", en: "moon"},
        {tj: "чаноб", en: "mr mister"}, {tj: "хонума зани шавхардор", en: "mrs mistress"}, {tj: "рузнома", en: "newspaper"},
        {tj: "шаб", en: "night"}, {tj: "дафтар", en: "notebook"}, {tj: "утоки кори ", en: "office"},
        {tj: "дар болои", en: "on"}, {tj: "афлесун", en: "orange"}, {tj: "калам", en: "pencil"},
        {tj: "мушкили", en: "problem"}, {tj: "барномасоз", en: "programmer"}, {tj: "илм", en: "science"},
        {tj: "осмон", en: "sky"}, {tj: "хурд е майда", en: "small"}, {tj: "хикоя", en: "story"},
        {tj: "накл кардан", en: "tell"}, {tj: "рахмат, ташакур", en: "thanks"}
    ],
    2: [
        {tj: "ходими саехат", en: "travel agent"}, {tj: "чатр, соябон", en: "umbrella"},
        {tj: "интизор шудан", en: "wait"}, {tj: "нагз, хуб", en: "well"}, {tj: "чи", en: "what"},
        {tj: "дар кучо, ба кучо", en: "where"}, {tj: "ки", en: "who"},
        {tj: "занчираки либосро гузаронидан", en: "zip"}, {tj: "пурсидан", en: "ask"},
        {tj: "таххона", en: "basement"}, {tj: "хонаи хоб", en: "bedroom"}, {tj: "бо", en: "by"},
        {tj: "мошини сабукрав", en: "car"}, {tj: "курси", en: "chair"},
        {tj: "тоза, фахмо", en: "clearly"}, {tj: "кахва", en: "coffee"}, {tj: "гиря кардан", en: "cry"},
        {tj: "ракс кардан", en: "dance"}, {tj: "косаву табак", en: "dish"}, {tj: "ичро кардан", en: "do"},
        {tj: "нушидан", en: "drink"}, {tj: "хушк кардан", en: "dry"}, {tj: "хурок хурдан", en: "eat"},
        {tj: "тез, зуд", en: "fast"}, {tj: "рафтан", en: "go"}, {tj: "гитар", en: "guitar"},
        {tj: "бо чиду чахд", en: "hard"}, {tj: "як дакика ", en: "just a minute"},
        {tj: "ошхона", en: "kitchen"}, {tj: "донистан", en: "know"}, {tj: "хандидан", en: "laugh"},
        {tj: "тарк карда рафтан", en: "leave"}, {tj: "мактуб, харф", en: "letter"},
        {tj: "китобхона", en: "library"}, {tj: "маькул кардан", en: "like"},
        {tj: "гуш кардан", en: "listen"}, {tj: "мехмонхона", en: "living room"},
        {tj: "эхтиеч доштан", en: "need"}, {tj: "соат", en: "o'clock"}, {tj: "тах кардан", en: "pack"},
        {tj: "пианино", en: "piano"}, {tj: "бози кардан", en: "play"},
        {tj: "машк кардан", en: "practice"}, {tj: "тез", en: "quickly"},
        {tj: "савол", en: "question"}, {tj: "радио", en: "radio"}, {tj: "хондан", en: "read"},
        {tj: "тарабхона", en: "restaurant"}, {tj: "хозир", en: "right"}, {tj: "дидан", en: "see"}
    ],
    3: [
        {tj: "суруд хондан", en: "sing"}, {tj: "култ култ об хурдан", en: "sip"}, {tj: "хоб рафтан", en: "sleep"},
        {tj: "суруд", en: "song"}, {tj: "шурбо", en: "soup"}, {tj: "охиста", en: "slowly"},
        {tj: "гап задан", en: "speak"}, {tj: "тахсил кардан", en: "study"}, {tj: "сухбат кардан", en: "talk"},
        {tj: "такси", en: "taxi"}, {tj: "омузонидан", en: "teach"}, {tj: "ба онхо, онхоро", en: "them"},
        {tj: "телевизор", en: "television"}, {tj: "ба (самт)", en: "to"}, {tj: "дар ончо", en: "there"},
        {tj: "сафари хидмати", en: "trip"}, {tj: "шустан", en: "wash"}, {tj: "хостан", en: "want"},
        {tj: "кор кардан", en: "work"}, {tj: "сол", en: "year"}, {tj: "вараки дафтар", en: "a piece of paper"},
        {tj: "хам", en: "also"}, {tj: "чавоб додан", en: "answer"}, {tj: "банана", en: "banana"},
        {tj: "хомуш бошед", en: "be quiet"}, {tj: "сиех", en: "black"}, {tj: "кабуд", en: "blue"},
        {tj: "кахваранг", en: "brown"}, {tj: "харидан", en: "buy"}, {tj: "гурба", en: "cat"},
        {tj: "пушидан", en: "close"}, {tj: "абр", en: "cloud"}, {tj: " палто", en: "coat"},
        {tj: "коллеч", en: "college"}, {tj: "ранг", en: "color"}, {tj: "дар", en: "door"},
        {tj: "мошин рондан", en: "drive"}, {tj: "ангезанда", en: "exciting"}, {tj: "писандида", en: "favorite"},
        {tj: "фарш", en: "floor"}, {tj: "гул", en: "flower"}, {tj: "фаромуш кардан", en: "forget"},
        {tj: "додан", en: "give"}, {tj: "ангур", en: "grape"}, {tj: "алаф", en: "grass"},
        {tj: "хокистаранг", en: "gray"}, {tj: "сабз", en: "green"}, {tj: "кулох", en: "hat"},
        {tj: "ба у (зан)", en: "her"}, {tj: "мактаб", en: "high school"}
    ]
};

let progress = JSON.parse(localStorage.getItem('userProgress')) || { unlocked: 1, history: {} };

function shuffleArray(array) {
    let newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const authScreen = document.getElementById('auth-screen');
        const quizScreen = document.getElementById('quiz-screen');
        if (!authScreen.classList.contains('hidden')) {
            login();
        } else if (!quizScreen.classList.contains('hidden')) {
            checkAnswer();
        }
    }
});

function login() {
    const name = document.getElementById('username-input').value;
    if(name) {
        currentUser = name;
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
        document.getElementById('welcome-msg').innerText = `Салом, ${name}!`;
    }
}

function showLevels() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('level-screen').classList.remove('hidden');
    const grid = document.getElementById('levels-grid');
    grid.innerHTML = '';

    for(let i = 1; i <= 20; i++) {
        const btn = document.createElement('div');
        btn.className = `level-btn ${i <= progress.unlocked ? 'unlocked' : 'locked'}`;
        btn.innerText = i;
        if(i <= progress.unlocked) {
            btn.onclick = () => startQuiz(i);
        }
        grid.appendChild(btn);
    }
}

function startQuiz(lvl) {
    if(!levelData[lvl]) return alert("Ин левел ҳанӯз калима надорад!");
    currentLevel = lvl;
    score = 0;
    currentWordIndex = 0;
    timeLeft = 480;
    mistakes = []; 
    
    shuffledWords = shuffleArray(levelData[lvl]);
    
    document.getElementById('level-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('btn-mistakes').classList.add('hidden');
    document.getElementById('mistakes-list').classList.add('hidden');
    
    nextQuestion();
    startTimer();
}

function nextQuestion() {
    if(currentWordIndex >= shuffledWords.length) {
        endQuiz();
        return;
    }
    document.getElementById('tj-word').innerText = shuffledWords[currentWordIndex].tj;
    const inputField = document.getElementById('en-answer');
    inputField.value = "";
    
    // Ислоҳи клавиатура барои телефон:
    setTimeout(() => {
        inputField.focus();
    }, 100); 

    document.getElementById('score-counter').innerText = `Score: ${score}`;
}

function checkAnswer() {
    const inputField = document.getElementById('en-answer');
    const userAns = inputField.value.trim().toLowerCase();
    const correctAns = shuffledWords[currentWordIndex].en.toLowerCase();

    if(userAns === correctAns) {
        score++;
        inputField.classList.add('correct-glow');
        setTimeout(() => {
            inputField.classList.remove('correct-glow');
            currentWordIndex++;
            nextQuestion();
        }, 200);
    } else {
        mistakes.push({
            tj: shuffledWords[currentWordIndex].tj,
            en: shuffledWords[currentWordIndex].en,
            user: userAns || "(холӣ)"
        });
        inputField.classList.add('error-shake');
        setTimeout(() => {
            inputField.classList.remove('error-shake');
            currentWordIndex++;
            nextQuestion();
        }, 400);
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;
        document.getElementById('timer').innerText = `${min < 10 ? '0'+min : min}:${sec < 10 ? '0'+sec : sec}`;
        if(timeLeft <= 0) endQuiz();
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    document.getElementById('stats-content').innerHTML = `
        <p style="font-size: 1.2rem;">Балл: <b>${score}</b> аз ${shuffledWords.length}</p>
        <p>${score >= 42 ? "✅ Гузаштед!" : "❌ Кӯшиш кунед (42 лозим)."}</p>
    `;

    if (mistakes.length > 0) {
        document.getElementById('btn-mistakes').classList.remove('hidden');
        document.getElementById('mistakes-list').innerHTML = "<strong>Хатогиҳо:</strong><br>" + 
            mistakes.map(m => `<p style="font-size: 0.85rem; border-bottom: 1px solid #444; padding: 3px;">
                ${m.tj} → <span style="color: #2ed573;">${m.en}</span> (Шумо: <span style="color: #ff4757;">${m.user}</span>)
            </p>`).join('');
    }

    if(score >= 42 && currentLevel === progress.unlocked && progress.unlocked < 20) {
        progress.unlocked++;
    }
    progress.history[`Level ${currentLevel}`] = score;
    localStorage.setItem('userProgress', JSON.stringify(progress));
}

function toggleMistakes() {
    const list = document.getElementById('mistakes-list');
    list.classList.toggle('hidden');
}

function showResults() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    const content = document.getElementById('stats-content');
    content.innerHTML = progress.history && Object.keys(progress.history).length > 0 
        ? Object.entries(progress.history).map(([lvl, s]) => `<p>${lvl}: ${s} бал</p>`).join('')
        : "<p>Ҳанӯз натиҷае нест.</p>";
}

function backToMenu() {
    document.querySelectorAll('.container').forEach(c => c.classList.add('hidden'));
    document.getElementById('main-menu').classList.remove('hidden');
}
