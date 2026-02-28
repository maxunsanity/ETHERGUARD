/** 
 * ETHERGUARD Core Combat Engine v2.0
 * Implementation of 5-Ego Stats, Mental Break, Trust Decay, and Multi-Type Combat
 */

const characters = [
    {
        id: 'yuna', name: '유나 (유비)', trait: '성실·학생회장', avatar: '🎓', bg: 'yuna_bg.png',
        archetype: '공감하는 리더', props: ['HEART', 'BODY'],
        stats: { atk: 320, acc: 300, crt: 150, def: 100, hp: 1200 },
        maxTrust: 3600, trust: 0, isUnlocked: false,
        greeting: '안녕하세요! 에테르가드의 유나입니다. 대화를 통해 서로를 더 알아갔으면 해요.'
    },
    {
        id: 'kwan', name: '민주 (관우)', trait: '과묵·검도부', avatar: '🗡️', bg: 'kwan_bg.png',
        archetype: '직관적인 통찰가', props: ['LOGIC', 'MYSTIC'],
        stats: { atk: 480, acc: 200, crt: 100, def: 200, hp: 1200 },
        maxTrust: 3600, trust: 0, isUnlocked: false,
        greeting: '...검의 길만큼 대화도 정직해야 하는 법. 무엇을 원하나?'
    },
    {
        id: 'jang', name: '지희 (장비)', trait: '활발·스트릿', avatar: '🔥', bg: 'jang_bg.png',
        archetype: '독불장군 투사', props: ['BODY'],
        stats: { atk: 250, acc: 150, crt: 50, def: 50, hp: 1200 },
        maxTrust: 3600, trust: 0, isUnlocked: false,
        greeting: '헤이! 오늘 텐션 장난 아닌데? 나랑 한판 붙어볼래? 히히!'
    },
    {
        id: 'sora', name: '소라 (조조)', trait: '냉철·엘리트', avatar: '🍷', bg: 'sora_bg.png',
        archetype: '냉혹한 전략가', props: ['LOGIC', 'BODY'],
        stats: { atk: 420, acc: 280, crt: 250, def: 150, hp: 1200 },
        maxTrust: 3600, trust: 0, isUnlocked: false,
        greeting: '당신의 논리가 내 시간을 뺏을 만큼 가치 있기를 바랍니다.'
    },
    {
        id: 'seola', name: '설아 (제갈량)', trait: '천재·사서', avatar: '📖', bg: 'seola_bg.png',
        archetype: '철두철미한 분석가', props: ['LOGIC'],
        stats: { atk: 350, acc: 350, crt: 300, def: 100, hp: 1200 },
        maxTrust: 3600, trust: 0, isUnlocked: false,
        greeting: '지혜로운 자는 말을 아끼지만, 꼭 필요할 땐 예리한 법이죠.'
    }
];

const managerStats = { atk: 400, acc: 200, crt: 100, def: 300, hp: 1000, maxHp: 1000 };

const skills = [
    { id: 'BODY', name: '무력 시위', keywords: ['힘', '파괴', '강함', '무력', '돌직구', '호탕', '친구'] },
    { id: 'LOGIC', name: '논파', keywords: ['논리', '분석', '증거', '명분', '이익', '수치', '사실', '팩트'] },
    { id: 'SENSE', name: '예리한 통찰', keywords: ['감각', '직감', '꿰뚫다', '안목', '재치', '유머', '농담'] },
    { id: 'HEART', name: '감정 동화', keywords: ['공감', '위로', '지지', '고충', '마음', '따뜻한'] },
    { id: 'MYSTIC', name: '심연의 응시', keywords: ['운명', '인연', '비유', '수수께끼', '심연'] }
];

const synergyMap = {
    'BODY': { weak: 'MYSTIC', strong: 'LOGIC' },
    'LOGIC': { weak: 'BODY', strong: 'SENSE' },
    'SENSE': { weak: 'LOGIC', strong: 'HEART' },
    'HEART': { weak: 'SENSE', strong: 'MYSTIC' },
    'MYSTIC': { weak: 'HEART', strong: 'BODY' }
};

// Game State
let currentTarget = null;
let currentManagerHp = 1000;
let inventoryFirePoints = 10000;
let selectedFpCount = 1;

let comboCount = 0;
let lastHitTime = 0;
let repeatMap = new Map();
let isMentalBreak = false;
let breakTimer = 0;

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    startTrustDecay();
});

function initUI() {
    const slider = document.getElementById('face-icons');
    characters.forEach(char => {
        const icon = document.createElement('div');
        icon.className = 'face-icon';
        icon.innerHTML = `<span style="font-size: 20px;">${char.avatar}</span>`;
        if (char.isUnlocked) icon.classList.add('unlocked');
        icon.onclick = () => selectCharacter(char, icon);
        slider.appendChild(icon);
    });

    // FP Selectors
    document.querySelectorAll('.fp-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.fp-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedFpCount = btn.dataset.val === '100' ? 100 : parseInt(btn.dataset.val);
            document.getElementById('current-fp-use').textContent = selectedFpCount;
        };
    });
    document.querySelector('.fp-btn[data-val="1"]').classList.add('active');

    // Chat
    document.getElementById('send-btn').onclick = handleSend;
    document.getElementById('chat-input').onkeypress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    // Auto-complete tags
    const tagContainer = document.getElementById('keyword-tags');
    ['#명령', '#논리', '#위로', '#공감', '#칭찬', '#팩트'].forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn';
        btn.textContent = tag;
        btn.onclick = () => autoFill(tag);
        tagContainer.appendChild(btn);
    });
}

function autoFill(tag) {
    const input = document.getElementById('chat-input');
    const templates = {
        '#위로': '너무 걱정 마세요. 제가 항상 곁에서 지지하고 응원할게요.',
        '#팩트': '데이터와 사실만 놓고 봅시다. 이 명분이 가장 합리적인 선택입니다.',
        '#명령': '더 이상 지체할 시간 없어요. 제 결정을 따르세요.',
        '#칭찬': '역시 안목이 대단하시네요. 이런 감각은 아무나 가질 수 없죠.',
        '#논리': '이 상황에서는 논리적인 증거가 가장 중요합니다.'
    };
    input.value = templates[tag] || tag;
    input.focus();
}

function selectCharacter(char, icon) {
    if (currentTarget === char) return;
    document.querySelectorAll('.face-icon').forEach(el => el.classList.remove('active'));
    icon.classList.add('active');

    currentTarget = char;
    currentTarget.currentHp = char.stats.hp; // Reset session HP
    isMentalBreak = false;
    comboCount = 0;
    repeatMap.clear();

    document.getElementById('character-bg').style.backgroundImage = `url('${char.bg}')`;
    document.getElementById('target-name').textContent = char.name;
    document.getElementById('target-trait').textContent = char.trait;
    document.querySelector('.main-workspace').classList.remove('mental-break');
    document.getElementById('fever-timer').classList.add('hidden');

    updateUIGauges();

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

async function handleSend() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || !currentTarget) return;

    addMessage(text, 'user');
    input.value = '';

    await executeCombatLoop(text);
}

async function executeCombatLoop(text) {
    // 1. LLM Delay Masking (Type A)
    const dummy = addMessage('...', 'ai', true);
    const pool = ["...", "호오?", "냉철하군.", "계산된 말인가?", "어디 보죠."];
    dummy.textContent = pool[Math.floor(Math.random() * pool.length)];

    // 2. Skill Roulette (Type B)
    const roulette = document.getElementById('roulette-layer');
    const rouletteItem = document.getElementById('roulette-item');
    roulette.classList.remove('hidden');

    const matchedSkill = analyzeText(text);
    let rouletteSpin = setInterval(() => {
        rouletteItem.textContent = skills[Math.floor(Math.random() * skills.length)].name;
    }, 80).

    await new Promise(r => setTimeout(r, 1200));
    clearInterval(rouletteSpin);

    if (matchedSkill) rouletteItem.textContent = matchedSkill.name;
    else rouletteItem.textContent = "NORMAL HIT";

    await new Promise(r => setTimeout(r, 300));
    roulette.classList.add('hidden');
    dummy.remove();

    // 3. Damage Calculation
    const result = calculateDamage(text, matchedSkill);

    if (result.isHit) {
        processHit(result, matchedSkill);
    } else {
        showFloatingText("MISS", "slate");
        comboCount = 0;
        updateComboUI();
    }

    // 4. Counterattack (Type C) - Only if not in Break Mode
    if (!isMentalBreak && currentTarget.currentHp > 0) {
        setTimeout(() => {
            processCounterattack(text);
        }, 800);
    }
}

function processHit(res, skill) {
    // Apply Damage
    if (isMentalBreak) {
        // Break Mode: Damage converts to Trust
        currentTarget.trust = Math.min(currentTarget.maxTrust, currentTarget.trust + res.dmg);
        showFloatingText(`+${res.dmg} TRUST`, "gold");
    } else {
        // Normal Mode: Damage Target HP
        const overDmg = Math.max(0, res.dmg - currentTarget.currentHp);
        currentTarget.currentHp = Math.max(0, currentTarget.currentHp - res.dmg);

        if (overDmg > 0) {
            currentTarget.trust = Math.min(currentTarget.maxTrust, currentTarget.trust + overDmg);
            showFloatingText(`+${overDmg} OVERKILL`, "gold");
        }

        showFloatingText(`-${res.dmg}`, res.isCrit ? "red" : "white");
        if (res.isCrit) showFloatingText("CRITICAL!", "gold");

        // Combo
        const now = Date.now();
        if (now - lastHitTime < 3500) {
            comboCount = Math.min(10, comboCount + 1);
        } else {
            comboCount = 1;
        }
        lastHitTime = now;
        updateComboUI();
    }

    if (currentTarget.currentHp <= 0 && !isMentalBreak) {
        enterMentalBreak();
    }

    shakeScreen(res.isCrit ? 10 : 5);
    updateUIGauges();
}

function calculateDamage(text, skill) {
    // 1. Accuracy Check
    const accBase = 70;
    const synergy = skill ? getSynergy(skill.id, currentTarget.props) : 1.0;
    const mod = synergy > 1.0 ? 0.5 : (synergy < 1.0 ? 1.5 : 1.0);
    const hitProb = accBase + (managerStats.acc * 0.1) - (currentTarget.stats.def * 0.1 * mod);

    const isHit = Math.random() * 100 < hitProb || (selectedFpCount === 100);
    if (!isHit) return { isHit: false };

    // 2. Base Damage
    let baseDmg = managerStats.atk;

    // 3. Critical Check
    const critProb = 5 + (managerStats.crt * 0.1) + (comboCount * 5);
    const isCrit = Math.random() * 100 < critProb;
    const critMod = isCrit ? (selectedFpCount === 100 ? 2.0 : 1.5) : 1.0;

    // 4. Fire Point Multiplier
    const fpMods = { 1: 1.5, 10: 2.0, 30: 3.0, 50: 4.5, 100: 8.0 };
    const fpMulti = fpMods[selectedFpCount] || 1.0;
    inventoryFirePoints -= selectedFpCount;
    document.getElementById('item-count').textContent = inventoryFirePoints;

    // 5. Repeated Penalty & Tone Analysis
    let penalty = 1.0;
    const count = repeatMap.get(text) || 0;
    if (count === 1) penalty = 0.5;
    else if (count === 2) penalty = 0.1;
    else if (count >= 3) penalty = 0;
    repeatMap.set(text, count + 1);

    // 6. Synergy & Results
    const finalDmg = Math.floor((baseDmg * fpMulti * critMod * synergy * penalty) - currentTarget.stats.def);
    return { isHit: true, dmg: Math.max(1, finalDmg), isCrit };
}

function getSynergy(atkProp, targetProps) {
    let best = 1.0;
    targetProps.forEach(tp => {
        if (synergyMap[atkProp].strong === tp) best = Math.max(best, 1.5);
        if (synergyMap[atkProp].weak === tp) best = Math.min(best, 0.7);
    });
    return best;
}

function analyzeText(text) {
    for (const s of skills) {
        if (s.keywords.some(k => text.includes(k))) return s;
    }
    return null;
}

function processCounterattack(text) {
    const replyPool = ["논점이 빗나갔군요.", "겨우 그 정도로 저를 흔들 수 있겠나요?", "당신의 진심이 의심스럽네요.", "후후, 기대 이하입니다."];
    addMessage(replyPool[Math.floor(Math.random() * replyPool.length)], 'ai');

    // Counter Damage
    let dmg = Math.floor(currentTarget.stats.atk * (Math.random() * 0.3 + 0.3));
    if (text.length < 5 || (repeatMap.get(text) || 0) > 1) {
        dmg *= 2;
        showFloatingText("POWER COUNTER!", "purple");
    }

    currentManagerHp = Math.max(0, currentManagerHp - dmg);
    document.getElementById('user-hp-fill').style.width = `${(currentManagerHp / managerStats.maxHp) * 100}%`;

    if (currentManagerHp <= 0) {
        alert("멘탈 붕괴... 재정비가 필요합니다.");
        location.reload();
    }
}

function enterMentalBreak() {
    isMentalBreak = true;
    document.querySelector('.main-workspace').classList.add('mental-break');
    addMessage('...아아, 더는 버틸 수 없군요. 당신이 원하는 대로...', 'ai');
    showFloatingText('MENTAL BREAK!!', 'purple');

    // Timer Start (1 min)
    const timerUI = document.getElementById('fever-timer');
    timerUI.classList.remove('hidden');
    let timeLeft = 60;

    const interval = setInterval(() => {
        timeLeft--;
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        timerUI.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        if (timeLeft <= 0 || !currentTarget) {
            clearInterval(interval);
            endMentalBreak();
        }
    }, 1000);
}

function endMentalBreak() {
    isMentalBreak = false;
    document.querySelector('.main-workspace').classList.remove('mental-break');
    document.getElementById('fever-timer').classList.add('hidden');

    if (currentTarget.trust >= currentTarget.maxTrust) {
        currentTarget.isUnlocked = true;
        addMessage(`[경축] ${currentTarget.name} 캐릭터를 전적으로 섭외했습니다!`, 'ai', true);
        document.querySelector('.face-icon.active').classList.add('unlocked');
    } else {
        addMessage(`전투 종료. 누적 신뢰도: ${currentTarget.trust}/${currentTarget.maxTrust}`, 'ai', true);
    }

    // Recovery HP for next session
    currentTarget.currentHp = currentTarget.stats.hp;
    updateUIGauges();
}

function updateUIGauges() {
    if (!currentTarget) return;
    const hpPct = (currentTarget.currentHp / currentTarget.stats.hp) * 100;
    const trPct = (currentTarget.trust / currentTarget.maxTrust) * 100;

    document.getElementById('hp-fill').style.width = `${hpPct}%`;
    document.getElementById('trust-fill').style.width = `${trPct}%`;
}

function updateComboUI() {
    const container = document.getElementById('combo-container');
    const count = document.getElementById('combo-count');

    if (comboCount < 3) {
        container.classList.add('hidden');
    } else {
        container.classList.remove('hidden');
        count.textContent = comboCount;

        // Color Evolution
        if (comboCount < 5) count.style.color = '#38bdf8'; // Blue
        else if (comboCount < 9) count.style.color = '#a855f7'; // Violet
        else count.style.color = '#ef4444'; // Red

        // Vibration on 10+
        if (comboCount === 10) count.classList.add('vibrate');
    }
}

function startTrustDecay() {
    setInterval(() => {
        characters.forEach(char => {
            if (char.isUnlocked && char.trust > 0) {
                char.trust = Math.max(0, char.trust - 1); // 1 pt decay
                if (char.trust === 0) {
                    char.isUnlocked = false;
                    // Update UI if current char lost trust
                    if (currentTarget === char) {
                        updateUIGauges();
                        addMessage(`[경고] ${char.name}님과의 신뢰가 바닥나 우리 팀을 떠났습니다.`, 'ai', true);
                    }
                }
            }
        });
    }, 120000); // Every 2 min for prototype (Normally much slower)
}

function showFloatingText(text, color) {
    const fx = document.getElementById('fx-container');
    const div = document.createElement('div');
    div.className = 'damage-text';
    div.textContent = text;
    div.style.left = `${40 + Math.random() * 20}%`;
    div.style.top = `${30 + Math.random() * 20}%`;
    div.style.color = color;
    fx.appendChild(div);
    setTimeout(() => div.remove(), 1000);
}

function shakeScreen(intensity) {
    const workspace = document.querySelector('.main-workspace');
    workspace.style.animation = `none`;
    setTimeout(() => {
        workspace.style.animation = `screenShake ${intensity / 100}s infinite`;
        setTimeout(() => workspace.style.animation = 'none', 300);
    }, 10);
}
