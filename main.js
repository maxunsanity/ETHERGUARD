const characters = [
    {
        id: 'yuna',
        name: '유나 (유비)',
        trait: '성실·학생회장',
        avatar: '🎓',
        bg: 'yuna_bg.png',
        mental: 100, maxMental: 100, trust: 0,
        atk: 10, def: 15,
        greeting: '안녕하세요! 에테르가드의 유나입니다. 대화를 통해 서로를 더 알아갔으면 해요.'
    },
    {
        id: 'kwan',
        name: '민주 (관우)',
        trait: '과묵·검도부',
        avatar: '🗡️',
        bg: 'kwan_bg.png',
        mental: 120, maxMental: 120, trust: 0,
        atk: 15, def: 20,
        greeting: '...검의 길만큼 대화도 정직해야 하는 법. 무엇을 원하나?'
    },
    {
        id: 'jang',
        name: '지희 (장비)',
        trait: '활발·스트릿',
        avatar: '🔥',
        bg: 'jang_bg.png',
        mental: 80, maxMental: 80, trust: 0,
        atk: 20, def: 10,
        greeting: '헤이! 오늘 텐션 장난 아닌데? 나랑 한판 붙어볼래? 물론 말싸움으로! 히히!'
    },
    {
        id: 'sora',
        name: '소라 (조조)',
        trait: '냉철·엘리트',
        avatar: '🍷',
        bg: 'sora_bg.png',
        mental: 150, maxMental: 150, trust: 0,
        atk: 12, def: 25,
        greeting: '당신의 논리가 내 시간을 뺏을 만큼 가치 있기를 바랍니다.'
    },
    {
        id: 'seola',
        name: '설아 (제갈량)',
        trait: '천재·사서',
        avatar: '📖',
        bg: 'seola_bg.png',
        mental: 110, maxMental: 110, trust: 0,
        atk: 18, def: 12,
        greeting: '지혜로운 자는 말을 아끼지만, 꼭 필요할 땐 예리한 법이죠. 들어볼까요?'
    }
];

let activeChar = null;
let userMental = 100;
let firePoints = 5;
let repeatMap = new Map();

document.addEventListener('DOMContentLoaded', () => {
    initUI();
});

function initUI() {
    const slider = document.getElementById('face-icons');
    characters.forEach(char => {
        const icon = document.createElement('div');
        icon.className = 'face-icon';
        icon.innerHTML = `<span style="font-size: 20px;">${char.avatar}</span>`; // Temporary emoji, will show images if available
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

    // Update UI
    document.getElementById('character-bg').style.backgroundImage = `url('${char.bg}')`;
    document.getElementById('target-name').textContent = char.name;
    document.getElementById('target-trait').textContent = char.trait;

    updateGauges();

    document.getElementById('chat-input').disabled = false;
    document.getElementById('send-btn').disabled = false;

    const messages = document.getElementById('chat-messages');
    messages.innerHTML = '';
    addMessage(char.greeting, 'ai');
}

function addMessage(text, sender) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.textContent = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function handleSend() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || !activeChar) return;

    addMessage(text, 'user');
    input.value = '';

    processCombat(text);
}

function processCombat(text) {
    // 1. Damage Calculation
    let baseAtk = 15; // Global base
    let repeatCount = repeatMap.get(text) || 0;
    let penalty = 1.0;
    if (repeatCount > 0) penalty = repeatCount === 1 ? 0.5 : 0.1;
    repeatMap.set(text, repeatCount + 1);

    let damage = Math.max(5, Math.floor((baseAtk * penalty)));

    // 2. Skill Roulette (Item use)
    let skillUsed = false;
    if (firePoints > 0 && Math.random() > 0.6) {
        damage *= 2;
        firePoints--;
        document.getElementById('item-count').textContent = firePoints;
        skillUsed = true;
        showFloatingText('CRITICAL SKILL!', 'gold');
    }

    // 3. Apply Damage to Target
    activeChar.mental = Math.max(0, activeChar.mental - damage);
    showFloatingText(`-${damage}`, 'red');
    shakeScreen();

    // 4. Check Victory / Break Mode
    if (activeChar.mental === 0) {
        handleVictory();
    }

    updateGauges();

    // 5. AI Counter Attack
    setTimeout(() => {
        if (activeChar.mental > 0) {
            const reply = getAIDialogue();
            addMessage(reply, 'ai');

            // Player Mental Damage
            userMental = Math.max(0, userMental - 5);
            document.getElementById('user-hp-fill').style.width = `${userMental}%`;
        }
    }, 1000);
}

function handleVictory() {
    addMessage('...내가 졌다. 너의 논리는 완벽하군. 이제 에테르가드의 관리자로서 함께하겠다.', 'ai');
    showFloatingText('MENTAL BREAK!', 'purple');
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
    div.style.left = '50%';
    div.style.top = '40%';
    div.style.color = color;
    fx.appendChild(div);
    setTimeout(() => div.remove(), 1000);
}

function shakeScreen() {
    const workspace = document.querySelector('.main-workspace');
    workspace.classList.add('shake');
    setTimeout(() => workspace.classList.remove('shake'), 300);
}

function getAIDialogue() {
    const pool = ["말도 안 돼!", "그건 억지잖아.", "흥, 좀 하는 모양이지?", "논리적으로 반박해 봐.", "관심 없어."];
    return pool[Math.floor(Math.random() * pool.length)];
}
