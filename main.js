const characters = [
    {
        id: 'yuna', name: '유나 (유비)', trait: '성실·학생회장', avatar: '🎓', bg: 'yuna_bg.png',
        mental: 100, maxMental: 100, trust: 0, atk: 15, def: 10,
        greeting: '안녕하세요! 에테르가드의 유나입니다. 대화를 통해 서로를 더 알아갔으면 해요.'
    },
    {
        id: 'kwan', name: '민주 (관우)', trait: '과묵·검도부', avatar: '🗡️', bg: 'kwan_bg.png',
        mental: 120, maxMental: 120, trust: 0, atk: 20, def: 15,
        greeting: '...검의 길만큼 대화도 정직해야 하는 법. 무엇을 원하나?'
    },
    {
        id: 'jang', name: '지희 (장비)', trait: '활발·스트릿', avatar: '🔥', bg: 'jang_bg.png',
        mental: 80, maxMental: 80, trust: 0, atk: 25, def: 5,
        greeting: '헤이! 오늘 텐션 장난 아닌데? 나랑 한판 붙어볼래? 히히!'
    },
    {
        id: 'sora', name: '소라 (조조)', trait: '냉철·엘리트', avatar: '🍷', bg: 'sora_bg.png',
        mental: 150, maxMental: 150, trust: 0, atk: 18, def: 20,
        greeting: '당신의 논리가 내 시간을 뺏을 만큼 가치 있기를 바랍니다.'
    },
    {
        id: 'seola', name: '설아 (제갈량)', trait: '천재·사서', avatar: '📖', bg: 'seola_bg.png',
        mental: 110, maxMental: 110, trust: 0, atk: 22, def: 10,
        greeting: '지혜로운 자는 말을 아끼지만, 꼭 필요할 땐 예리한 법이죠.'
    }
];

const skills = [
    { id: 1, name: '무력 시위', attribute: 'BODY', keywords: ['힘', '파괴', '부수다', '강함', '주먹', '차다', '무력'] },
    { id: 2, name: '논파', attribute: 'LOGIC', keywords: ['논리', '이유', '왜', '분석', '증거', '사실', '모순', '반박'] },
    { id: 3, name: '예리한 통찰', attribute: 'SENSE', keywords: ['느낌', '직감', '본질', '꿰뚫다', '통찰', '눈빛'] },
    { id: 4, name: '감정 동화', attribute: 'HEART', keywords: ['감정', '슬픔', '기쁨', '위로', '마음', '친구', '사랑'] },
    { id: 5, name: '심연의 응시', attribute: 'MYSTIC', keywords: ['어둠', '공포', '영혼', '신비', '심연', '침묵'] }
];

let activeChar = null;
let userMental = 100;
let firePoints = 10;
let repeatMap = new Map();

document.addEventListener('DOMContentLoaded', () => {
    initUI();
});

function initUI() {
    const slider = document.getElementById('face-icons');
    characters.forEach(char => {
        const icon = document.createElement('div');
        icon.className = 'face-icon';
        icon.innerHTML = `<span style="font-size: 20px;">${char.avatar}</span>`;
        icon.title = char.name;
        icon.onclick = () => selectCharacter(char, icon);
        slider.appendChild(icon);
    });

    document.getElementById('send-btn').onclick = handleSend;
    document.getElementById('chat-input').onkeypress = (e) => {
        if (e.key === 'Enter') handleSend();
    };
}

function selectCharacter(char, element) {
    document.querySelectorAll('.face-icon').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    activeChar = char;
    repeatMap.clear();

    document.getElementById('character-bg').style.backgroundImage = `url('${char.bg}')`;
    document.getElementById('target-name').textContent = char.name;
    document.getElementById('target-trait').textContent = char.trait;

    updateGauges();
    document.getElementById('chat-input').disabled = false;
    document.getElementById('send-btn').disabled = false;
    document.getElementById('chat-messages').innerHTML = '';
    addMessage(char.greeting, 'ai');
}

function addMessage(text, sender, isDummy = false) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `message ${sender} ${isDummy ? 'dummy' : ''}`;
    div.textContent = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}

function handleSend() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || !activeChar) return;

    addMessage(text, 'user');
    input.value = '';

    // Start Combat Process
    executeCombatCycle(text);
}

async function executeCombatCycle(text) {
    // Type A: Initial Feedback (Dummy)
    const dummyRef = addMessage('...', 'ai', true);
    const dummyPool = ["흠...", "그렇게 나온다 이거지?", "재미있군.", "지켜보겠어.", "어디 더 말해봐."];
    dummyRef.textContent = dummyPool[Math.floor(Math.random() * dummyPool.length)];

    // Type B: Skill Roulette (Simulating LLM Analysis & Roulette)
    const rouletteLayer = document.getElementById('roulette-layer');
    const rouletteItem = document.getElementById('roulette-item');
    rouletteLayer.classList.remove('hidden');

    // Analysis + Roulette Animation (1.5s total)
    const matchedSkill = analyzeSentiment(text);
    let rouletteTimer = setInterval(() => {
        rouletteItem.textContent = skills[Math.floor(Math.random() * skills.length)].name;
    }, 100);

    await new Promise(r => setTimeout(r, 1500));
    clearInterval(rouletteTimer);

    rouletteLayer.classList.add('hidden');
    dummyRef.remove(); // Remove dummy

    // Damage Calculation
    let damage = calculateDamage(text, matchedSkill);

    // Apply Damage
    activeChar.mental = Math.max(0, activeChar.mental - damage);
    showFloatingText(`-${damage}`, matchedSkill ? 'gold' : 'white');
    shakeScreen();
    updateGauges();

    if (matchedSkill) {
        addMessage(`[스킬 발동: ${matchedSkill.name}] ${matchedSkill.attribute} 속성 강화!`, 'user', true);
    }

    if (activeChar.mental === 0) {
        handleVictory();
        return;
    }

    // Type C: Target Counterattack
    setTimeout(() => {
        const counterText = getCounterDialogue(text);
        addMessage(counterText, 'ai');

        let counterDamage = Math.floor(activeChar.atk * (Math.random() * 0.5 + 0.5));
        // If user text was short or repeated, increase counter damage
        if (text.length < 5 || (repeatMap.get(text) || 0) > 1) {
            counterDamage *= 2;
            showFloatingText('COUNTER!!', 'purple');
        }

        userMental = Math.max(0, userMental - counterDamage);
        document.getElementById('user-hp-fill').style.width = `${userMental}%`;

        if (userMental <= 0) {
            alert("멘탈 붕괴... 로비로 강제 사출됩니다.");
            location.reload();
        }
    }, 800);
}

function analyzeSentiment(text) {
    for (const skill of skills) {
        if (skill.keywords.some(k => text.includes(k))) return skill;
    }
    return null;
}

function calculateDamage(text, skill) {
    let baseAtk = 20;
    let multiplier = skill ? 1.5 : 1.0;

    // Vocabulary Immunity (Repeated text penalty)
    let count = repeatMap.get(text) || 0;
    let penalty = 1.0;
    if (count === 1) penalty = 0.5;
    else if (count === 2) penalty = 0.1;
    else if (count >= 3) penalty = 0;

    repeatMap.set(text, count + 1);

    let finalDmg = Math.floor((baseAtk * multiplier * penalty) - (activeChar.def * 0.2));
    return Math.max(0, finalDmg);
}

function getCounterDialogue(userText) {
    const defaultCounter = ["그건 당신의 생각일 뿐이에요.", "논리적이지 않군요.", "후후, 더 노력해 보세요.", "겨우 그 정도인가요?"];
    return defaultCounter[Math.floor(Math.random() * defaultCounter.length)];
}

function handleVictory() {
    addMessage('...졌군요. 당신의 진심이 느껴집니다. 에테르가드에 합류하죠.', 'ai');
    showFloatingText('CONFIRMED!', 'gold');
}

function updateGauges() {
    if (!activeChar) return;
    const hpPercent = (activeChar.mental / activeChar.maxMental) * 100;
    document.getElementById('hp-fill').style.width = `${hpPercent}%`;
}

function showFloatingText(text, color) {
    const fx = document.getElementById('fx-container');
    const div = document.createElement('div');
    div.className = 'damage-text';
    div.textContent = text;
    div.style.left = '50%'; div.style.top = '40%';
    div.style.color = color;
    fx.appendChild(div);
    setTimeout(() => div.remove(), 1000);
}

function shakeScreen() {
    const workspace = document.querySelector('.main-workspace');
    workspace.classList.add('shake');
    setTimeout(() => workspace.classList.remove('shake'), 300);
}
