// Configuration constants
const CONFIG = {
    BASE_ACCURACY: 70,
    COMBO_TIMEOUT: 3000,
    COMBO_MAX: 10,
    COMBO_CRIT_BONUS: 5, // 5% per combo
    FEVER_TIME: 60,
    TRUST_DECAY_INTERVAL: 360000, // 6 minutes for prototype (10pt per hour equivalent)
    TRUST_DECAY_AMOUNT: 1,
    RECOVERY_HP_RATIO: 0.3, // 30% HP on re-encounter
    FP_COST_AUTOFILL: 1,
    MIN_CHAR_LENGTH: 2,
    MAX_CHAR_LENGTH: 100,
    BASE_COOLDOWN: 2500
};

// Character Data
const characters = [
    {
        id: 'yuna', name: '유나 (유비)', trait: '성실·학생회장', avatar: '🎓',
        bg: 'yuna_bg.png', hit_bg: 'yuna_hit.png', panic_bg: 'yuna_panic.png',
        archetype: '공감하는 리더', props: ['HEART', 'BODY'],
        stats: { atk: 320, acc: 300, crt: 150, def: 100, hp: 12000 },
        maxTrust: 36000, trust: 0, isUnlocked: true,
        greeting: '안녕하세요! 에테르가드의 유나입니다. 대화를 통해 서로를 더 알아갔으면 해요.'
    },
    {
        id: 'kwan', name: '민주 (관우)', trait: '과묵·검도부', avatar: '🗡️',
        bg: 'kwan_bg.png', hit_bg: 'kwan_hit.png', panic_bg: 'kwan_panic.png',
        archetype: '직관적인 통찰가', props: ['LOGIC', 'MYSTIC'],
        stats: { atk: 480, acc: 200, crt: 100, def: 200, hp: 12000 },
        maxTrust: 36000, trust: 0, isUnlocked: false,
        greeting: '...검의 길만큼 대화도 정직해야 하는 법. 무엇을 원하나?'
    },
    {
        id: 'jang', name: '지희 (장비)', trait: '활발·스트릿', avatar: '🔥',
        bg: 'jang_bg.png', hit_bg: 'jang_hit.png', panic_bg: 'jang_panic.png',
        archetype: '독불장군 투사', props: ['BODY'],
        stats: { atk: 250, acc: 150, crt: 50, def: 50, hp: 12000 },
        maxTrust: 36000, trust: 0, isUnlocked: false,
        greeting: '헤이! 오늘 텐션 장난 아닌데? 나랑 한판 붙어볼래? 히히!'
    },
    {
        id: 'sora', name: '소라 (조조)', trait: '냉철·엘리트', avatar: '🍷',
        bg: 'sora_bg.png', hit_bg: 'sora_hit.png', panic_bg: 'sora_panic.png',
        archetype: '냉혹한 전략가', props: ['LOGIC', 'BODY'],
        stats: { atk: 420, acc: 280, crt: 250, def: 150, hp: 12000 },
        maxTrust: 36000, trust: 0, isUnlocked: false,
        greeting: '당신의 논리가 내 시간을 뺏을 만큼 가치 있기를 바랍니다.'
    },
    {
        id: 'seola', name: '설아 (제갈량)', trait: '천재·사서', avatar: '📖',
        bg: 'seola_bg.png', hit_bg: 'seola_hit.png', panic_bg: 'seola_panic.png',
        archetype: '철두철미한 분석가', props: ['LOGIC'],
        stats: { atk: 350, acc: 350, crt: 300, def: 100, hp: 12000 },
        maxTrust: 36000, trust: 0, isUnlocked: false,
        greeting: '지혜로운 자는 말을 아끼지만, 꼭 필요할 땐 예리한 법이죠.'
    }
];

const managerBaseStats = { atk: 400, acc: 200, crt: 100, def: 300, hp: 10000, maxHp: 10000 };
let activeSupporter = characters[0]; // Start with Yuna as supporter

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
let currentManagerHp = 10000;
let inventoryFirePoints = 10000;
let selectedFpCount = 1;

let comboCount = 0;
let lastHitTime = 0;
let repeatMap = new Map();
let isMentalBreak = false;
let breakTimerFunc = null;

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    updateRepresentativeMarker();
    updateManagerHpUI();
    startTrustDecay();
});

const ALL_TAGS = ['#명령', '#논리', '#위로', '#공감', '#칭찬', '#팩트', '#질문', '#도발', '#회유', '#결단'];

function initUI() {
    const slider = document.getElementById('face-icons');
    slider.innerHTML = ''; // Clear for re-rendering if needed

    characters.forEach(char => {
        const icon = document.createElement('div');
        icon.className = 'face-icon';
        icon.dataset.id = char.id;

        if (char.isUnlocked) icon.classList.add('unlocked');
        if (char.trust >= char.maxTrust) icon.classList.add('recruited');

        icon.innerHTML = `<span style="font-size: 20px;">${char.avatar}</span>`;
        icon.onclick = (e) => {
            if (e.ctrlKey || e.metaKey) {
                setRepresentative(char); // Ctrl+Click to set as supporter
            } else {
                selectCharacter(char, icon);
            }
        };
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

    document.getElementById('send-btn').onclick = handleSend;
    document.getElementById('chat-input').onkeypress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    refreshTags();
}

function refreshTags() {
    const tagContainer = document.getElementById('keyword-tags');
    tagContainer.innerHTML = '';

    // Shuffle and pick 6
    const shuffled = [...ALL_TAGS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);

    selected.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'tag-btn';
        btn.textContent = tag;
        btn.onclick = () => autoFill(tag);
        tagContainer.appendChild(btn);
    });
}

function setRepresentative(char) {
    if (!char.isUnlocked) return;
    activeSupporter = char;
    updateRepresentativeMarker();
    addMessage(`[정보] 대표 캐릭터가 ${char.name}(으)로 변경되었습니다. 스탯 버프가 갱신됩니다.`, 'ai', true);
}

function updateRepresentativeMarker() {
    const marker = document.getElementById('representative-marker');
    const icons = document.querySelectorAll('.face-icon');
    const idx = characters.findIndex(c => c === activeSupporter);
    if (idx !== -1 && icons[idx]) {
        marker.style.display = 'block';
        const rect = icons[idx].getBoundingClientRect();
        const sliderRect = document.querySelector('.face-icons').getBoundingClientRect();
        marker.style.top = `${icons[idx].offsetTop}px`;
    }
}

function autoFill(tag) {
    if (!currentTarget) return;

    // Cost check
    if (inventoryFirePoints < 1) {
        addMessage("[시스템] 발화점이 부족하여 자동 문장을 생성할 수 없습니다.", "ai", true);
        return;
    }

    // Deduct cost
    inventoryFirePoints -= 1;
    document.getElementById('item-count').textContent = inventoryFirePoints;

    const input = document.getElementById('chat-input');

    // Logic for "AI-style" sentence generation based on Tag + Target Archetype
    const pool = {
        '#위로': [
            `${currentTarget.name}님, 당신의 고충을 충분히 이해해요. 제가 곁에 있을게요.`,
            `지쳐 보이지만 정말 잘하고 계세요. 잠시 제 어깨를 빌려드릴까요?`,
            `혼자서 감당하기엔 너무 무거운 짐이었군요. 제가 나누어 들겠습니다.`
        ],
        '#팩트': [
            `객관적으로 볼 때, ${currentTarget.name}님이 제안에 응하는 것이 가장 효율적입니다.`,
            `이 수치는 거짓말을 하지 않죠. 합리적인 결론은 이미 나와 있습니다.`,
            `데이터가 증명하듯, 우리의 협력은 서로에게 최상의 결과를 가져올 것입니다.`
        ],
        '#명령': [
            `논란의 여지는 없습니다. 지금 바로 제 결정을 따르도록 하세요.`,
            `더 이상의 지체는 피해만 키울 뿐입니다. 즉시 행동으로 옮기세요.`,
            `제 권한으로 명합니다. 이 협약에 지금 즉시 서명하십시오.`
        ],
        '#공감': [
            `저도 같은 상황이라면 똑같은 기분이었을 거예요. 정말 마음이 아프네요.`,
            `${currentTarget.name}님의 입장에서 생각해보니 그 서운함이 충분히 느껴져요.`,
            `말하지 않아도 알 것 같아요. 그 침묵 속에 담긴 무게를 제가 느낍니다.`
        ],
        '#칭찬': [
            `역시 ${currentTarget.trait}답군요! 이런 감각은 아무나 가질 수 없는 재능이에요.`,
            `${currentTarget.name}님의 안목은 정말 독보적입니다. 진심으로 존경스러워요.`,
            `어떻게 그런 생각을 하셨죠? 기대 이상의 성과에 정말 감탄했습니다!`
        ],
        '#논리': [
            `앞선 상황을 분석해볼 때, 이 논리가 가장 타당한 근거가 됩니다.`,
            `A와 B를 연결하면 결국 우리가 가야 할 길은 명확해지죠. 시각을 넓혀보세요.`,
            `논리적 허점이 전혀 없는 완벽한 계획입니다. 당신도 부정할 수 없을 거예요.`
        ],
        '#질문': [
            `${currentTarget.name}님은 이 상황에서 본인의 신념과 이익 중 무엇을 선택하실 건가요?`,
            `우리가 함께할 때 발생할 시너지가 보이지 않나요? 한번 더 깊게 생각해보시죠.`,
            `단도입입적으로 묻겠습니다. 당신이 진정으로 원하는 미래는 무엇입니까?`
        ],
        '#도발': [
            `겨우 이 정도에 무너질 분이었나요? 당신의 명성이 아깝군요.`,
            `제 논리에 반박하지 못하는 것을 보니, 이미 마음은 기운 것 같네요.`,
            `입으로만 큰 뜻을 말하는 건 누구나 할 수 있죠. 행동으로 보여주시겠습니까?`
        ],
        '#회유': [
            `너무 날을 세우지 마세요. 우리 둘 다 웃을 수 있는 최선의 길을 제시하는 것뿐입니다.`,
            `잠시만 감정을 내려놓고 제 제안을 재검토해 주세요. 후회하지 않으실 겁니다.`,
            `우리는 적이 아니라 친구가 될 수 있는 운명이라고 생각합니다. 제 손을 잡으세요.`
        ],
        '#결단': [
            `시간이 얼마 없습니다. 지금 결정하지 않으면 이 기회는 영원히 사라질 거예요.`,
            `이제 망설임을 끝내야 할 때입니다. 제 결론은 이미 확고합니다.`,
            `결정은 당신의 몫이지만, 결과에 대한 책임도 당신의 몫이라는 것을 명심하세요.`
        ]
    };

    const sentences = pool[tag] || [tag];
    input.value = sentences[Math.floor(Math.random() * sentences.length)];
    input.focus();

    showFloatingText("-1 FIREPOINT", "#38bdf8");
}

function selectCharacter(char, icon) {
    if (currentTarget === char) return;
    if (icon) {
        document.querySelectorAll('.face-icon').forEach(el => el.classList.remove('active'));
        icon.classList.add('active');
    }

    currentTarget = char;
    currentTarget.currentHp = char.stats.hp;
    isMentalBreak = false;
    comboCount = 0;
    repeatMap.clear();

    const bgLayer = document.getElementById('character-bg');
    bgLayer.style.backgroundImage = `url('${char.bg}')`;
    bgLayer.className = 'character-bg-layer live-bg'; // Apply to all

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
    // A. 지연 시간 은폐
    const dummy = addMessage('...', 'ai', true);
    const dummyPool = ["...", "호오?", "냉철하군.", "계산된 말인가?", "어디 보죠."];
    dummy.textContent = dummyPool[Math.floor(Math.random() * dummyPool.length)];

    // B. 스킬 룰렛 연출
    const roulette = document.getElementById('roulette-layer');
    const rouletteItem = document.getElementById('roulette-item');
    roulette.classList.remove('hidden');

    const matchedSkill = analyzeText(text);
    let rouletteSpin = setInterval(() => {
        rouletteItem.textContent = skills[Math.floor(Math.random() * skills.length)].name;
    }, 80);

    await new Promise(r => setTimeout(r, 1200));
    clearInterval(rouletteSpin);

    if (matchedSkill) {
        rouletteItem.textContent = matchedSkill.name;
        rouletteItem.style.color = 'var(--accent-gold)';
    } else {
        rouletteItem.textContent = "NORMAL HIT";
        rouletteItem.style.color = 'white';
    }

    await new Promise(r => setTimeout(r, 300));
    roulette.classList.add('hidden');
    dummy.remove();

    // C. 데미지 계산 및 전투 공식 적용
    const result = calculateDamage(text, matchedSkill);

    if (result.isHit) {
        processCombatHit(result, matchedSkill);
    } else {
        showFloatingText("MISS", "slate");
        comboCount = 0;
        updateComboUI();
    }

    // D. 타겟 반격 (C 타입)
    if (!isMentalBreak && currentTarget.currentHp > 0) {
        setTimeout(() => {
            processTargetCounter(text);
            refreshTags(); // Refresh tags after turn
        }, 800);
    } else {
        refreshTags(); // Also refresh after fever time or other ends
    }
}

function calculateDamage(text, skill) {
    // Current Stats (Base + Supporter Buff)
    const currentAtk = managerBaseStats.atk + (activeSupporter ? activeSupporter.stats.atk * 0.2 : 0);
    const currentAcc = managerBaseStats.acc + (activeSupporter ? activeSupporter.stats.acc * 0.2 : 0);
    const currentCrt = managerBaseStats.crt + (activeSupporter ? activeSupporter.stats.crt * 0.2 : 0);

    // 1. 명중 판정
    const synergy = skill ? getSynergy(skill.id, currentTarget.props) : 1.0;
    const synergyMod = synergy > 1.0 ? 0.5 : (synergy < 1.0 ? 1.5 : 1.0);
    const hitProb = CONFIG.BASE_ACCURACY + (currentAcc * 0.1) - (currentTarget.stats.def * 0.1 * synergyMod);
    const isHit = Math.random() * 100 < hitProb || (selectedFpCount === 100);
    if (!isHit) return { isHit: false };

    // 2. 데미지 계산
    let baseDmg = currentAtk;
    const critProb = 5 + (currentCrt * 0.1) + (comboCount * CONFIG.COMBO_CRIT_BONUS);
    const isCrit = Math.random() * 100 < critProb;
    const critMultiplier = isCrit ? (selectedFpCount === 100 ? 2.0 : 1.5) : 1.0;

    const fpMods = { 1: 1.5, 10: 2.0, 30: 3.0, 50: 4.5, 100: 8.0 };
    const fpMulti = fpMods[selectedFpCount] || 1.0;
    inventoryFirePoints -= selectedFpCount;
    document.getElementById('item-count').textContent = inventoryFirePoints;

    let penalty = 1.0;
    const count = repeatMap.get(text) || 0;
    if (count === 1) penalty = 0.5;
    else if (count === 2) penalty = 0.1;
    else if (count >= 3) penalty = 0;
    repeatMap.set(text, count + 1);

    const finalDmg = Math.floor((baseDmg * fpMulti * critMultiplier * synergy * penalty) - currentTarget.stats.def);
    return { isHit: true, dmg: Math.max(1, finalDmg), isCrit, isImmune: penalty < 0.2 };
}

function processCombatHit(res, skill) {
    if (isMentalBreak) {
        currentTarget.trust = Math.min(currentTarget.maxTrust, currentTarget.trust + res.dmg);
        showFloatingText(`+${res.dmg} TRUST`, "gold");

        // Instant check for early completion
        if (currentTarget.trust >= currentTarget.maxTrust) {
            if (breakTimerFunc) clearInterval(breakTimerFunc);
            endMentalBreak();
            return; // Exit early as target is switched
        }
    } else {
        // 100 Firepoints Impact Effect
        if (selectedFpCount === 100) {
            showImpactText(selectedFpCount);
        }

        // Dynamic Typography with Direction & Filter Effects
        if (skill) {
            if (res.isCrit) {
                showFloatingText(`CRITICAL! -${res.dmg}`, 'gold', 'crit');
                applyFilter('anger');
            } else {
                showFloatingText(`${skill.name} -${res.dmg}`, '#38bdf8', 'skill');
            }
        } else {
            if (res.isImmune) {
                showFloatingText("IMMUNE!", "#94a3b8", 'chat');
            } else {
                showFloatingText(`-${res.dmg}`, res.isCrit ? "#fbbf24" : "white", 'chat');
                if (res.isCrit) {
                    showFloatingText("CRITICAL!", "#ef4444", 'chat');
                    applyFilter('anger');
                } else if (Math.random() < 0.2) {
                    applyFilter('anger', 500); // Occasional anger flash for normal hits
                }
            }
        }

        // 콤보 업데이트
        const now = Date.now();
        if (now - lastHitTime < CONFIG.COMBO_TIMEOUT) {
            comboCount++;
            if (comboCount > CONFIG.COMBO_MAX) {
                comboCount = 1; // 10 이후 초기화 (1부터 다시 시작)
            }
        } else {
            comboCount = 1;
        }
        lastHitTime = now;
        updateComboUI();

        // 10콤보 시 특수 효과 (캐릭터 떨림)
        if (comboCount === CONFIG.COMBO_MAX) {
            document.querySelector('.main-workspace').classList.add('combo-max-vibrate');
        } else {
            document.querySelector('.main-workspace').classList.remove('combo-max-vibrate');
        }
    }

    if (currentTarget.currentHp <= 0 && !isMentalBreak) {
        enterMentalBreak();
        applyFilter('panic');

        // 멘탈 붕괴 이미지 적용 (존재 시)
        if (currentTarget.panic_bg) {
            updateCharacterImage(currentTarget.panic_bg);
        }
    }
    shakeScreen(res.isCrit ? 15 : 5);
    updateUIGauges();
}

function processTargetCounter(text) {
    const replies = ["그것이 당신의 한계인가요?", "논리가 빈약하군요.", "후후, 더 노력해 보세요.", "겨우 그 정도로 저를..."];
    addMessage(replies[Math.floor(Math.random() * replies.length)], 'ai');

    let counterDmg = Math.floor(currentTarget.stats.atk * (Math.random() * 0.4 + 0.3));
    if (text.length < 5 || (repeatMap.get(text) || 0) > 1) {
        counterDmg *= 2;
        showFloatingText("COUNTER!!", "#f43f5e");
    }

    currentManagerHp = Math.max(0, currentManagerHp - counterDmg);
    updateManagerHpUI();
    triggerHitEffect();

    if (currentManagerHp <= 0) {
        alert("멘탈 붕괴... 재정비가 필요합니다.");
        location.reload();
    }
}

function updateManagerHpUI() {
    const pct = (currentManagerHp / managerBaseStats.maxHp) * 100;
    document.getElementById('user-hp-fill').style.width = `${pct}%`;
}

function triggerHitEffect() {
    document.body.classList.add('hit-blink');
    setTimeout(() => document.body.classList.remove('hit-blink'), 200);
}

function enterMentalBreak() {
    isMentalBreak = true;
    document.querySelector('.main-workspace').classList.add('mental-break');
    addMessage('...아아, 더는 버틸 수 없군요. 당신이 원하는 대로...', 'ai');
    showFloatingText('MENTAL BREAK!!', '#a855f7');

    const timerUI = document.getElementById('fever-timer');
    timerUI.classList.remove('hidden');
    let timeLeft = CONFIG.FEVER_TIME;

    breakTimerFunc = setInterval(() => {
        timeLeft--;
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        timerUI.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        if (timeLeft <= 0 || !currentTarget) {
            clearInterval(breakTimerFunc);
            endMentalBreak();
        }
    }, 1000);
}

function endMentalBreak() {
    isMentalBreak = false;
    document.querySelector('.main-workspace').classList.remove('mental-break');
    document.getElementById('fever-timer').classList.add('hidden');

    // Recruitment Check (Trust 100%)
    if (currentTarget.trust >= currentTarget.maxTrust) {
        // Success message and UI update (regardless of prior unlocked state)
        const wasUnlocked = currentTarget.isUnlocked;
        currentTarget.isUnlocked = true;

        // Only show success message if it's the 'first' time reaching 100% in this session 
        // OR better: always show if it's considered a 'recruitment' success.
        addMessage(`[경축] ${currentTarget.name} 캐릭터를 전적으로 섭외했습니다!`, 'ai', true);

        document.querySelectorAll('.face-icon').forEach((el, i) => {
            if (characters[i].id === currentTarget.id) {
                el.classList.add('unlocked');
                el.classList.add('recruited');
            }
        });

        // Auto switch logic: Look for target with trust < maxTrust
        setTimeout(() => {
            const nextTarget = characters.find(c => c.trust < c.maxTrust);
            if (nextTarget) {
                const nextIcon = document.querySelector(`.face-icon[data-id="${nextTarget.id}"]`);
                selectCharacter(nextTarget, nextIcon);
                // Post-switch message
                setTimeout(() => {
                    addMessage(`[안내] 섭외 성공! 다음 타겟인 ${nextTarget.name}님에게로 자동 이동되었습니다.`, 'ai', true);
                }, 400);
            } else {
                // ALL CLEAR STATE
                showMissionClear();
            }
        }, 600); // Faster transition (1500 -> 600)
    }
    currentTarget.currentHp = currentTarget.stats.hp;
    document.getElementById('target-bg').classList.remove('panic');

    // 일반 상태로 복구
    updateCharacterImage(currentTarget.bg);

    updateUIGauges();
}

function updateUIGauges() {
    if (!currentTarget) return;
    const hpPct = (currentTarget.currentHp / currentTarget.stats.hp) * 100;
    const trPct = (currentTarget.trust / currentTarget.maxTrust) * 100;
    document.getElementById('hp-fill').style.width = `${hpPct}%`;
    document.getElementById('trust-fill').style.width = `${trPct}%`;

    // Real-time recruitment check for UI
    if (currentTarget.trust >= currentTarget.maxTrust) {
        const icon = document.querySelector(`.face-icon[data-id="${currentTarget.id}"]`);
        if (icon) icon.classList.add('recruited');
    }
}

function showMissionClear() {
    addMessage(`[SYSTEM] ★ MISSION CLEAR ★ 모든 캐릭터를 섭외했습니다!`, 'ai', true);
    const overlay = document.createElement('div');
    overlay.className = 'mission-clear-overlay';
    overlay.innerHTML = `
        <div class="clear-content">
            <h1>MISSION CLEAR</h1>
            <p>모든 에테르가드 대원을 소집했습니다.</p>
            <button onclick="this.parentElement.parentElement.remove()">CONTINUE</button>
        </div>
    `;
    document.body.appendChild(overlay);
}

function updateComboUI() {
    const container = document.getElementById('combo-container');
    const count = document.getElementById('combo-count');

    if (comboCount < 3) {
        container.classList.add('hidden');
    } else {
        container.classList.remove('hidden');
        count.textContent = comboCount;

        if (comboCount < 5) count.style.color = '#38bdf8';
        else if (comboCount < 9) count.style.color = '#a855f7';
        else {
            count.style.color = '#ef4444';
            if (comboCount === CONFIG.COMBO_MAX) triggerComboFlash();
        }
    }
}

function triggerComboFlash() {
    const flash = document.createElement('div');
    flash.className = 'combo-flash hit-overlay'; // Reusing hit-overlay for sizing
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 200);
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

function startTrustDecay() {
    setInterval(() => {
        characters.forEach(char => {
            if (char.isUnlocked && char.trust > 0) {
                char.trust = Math.max(0, char.trust - CONFIG.TRUST_DECAY_AMOUNT);
                if (char.trust === 0 && char !== characters[0]) { // Don't lock Yuna in prototype
                    char.isUnlocked = false;
                    document.querySelectorAll('.face-icon').forEach((el, i) => {
                        if (characters[i] === char) el.classList.remove('unlocked');
                    });
                }
            }
        });
        updateUIGauges();
    }, CONFIG.TRUST_DECAY_INTERVAL);
}

function showFloatingText(text, color, animType = 'chat') {
    const fx = document.getElementById('fx-container');
    const div = document.createElement('div');
    div.className = `damage-text ${animType}-anim`;
    div.textContent = text;

    if (animType === 'chat') {
        div.style.left = `${40 + Math.random() * 20}%`;
        div.style.top = `${30 + Math.random() * 20}%`;
    } else {
        // Skill or Crit text usually centered vertically
        div.style.left = `0`;
        div.style.width = `100%`;
        div.style.textAlign = `center`;
        div.style.top = `40%`;
        div.style.fontSize = `3rem`;
    }

    div.style.color = color;
    fx.appendChild(div);

    const duration = (animType === 'chat') ? 1000 : 2000;
    setTimeout(() => div.remove(), duration);
}

function showImpactText(count) {
    const div = document.createElement('div');
    div.className = 'impact-text';
    div.textContent = `x${count}`;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 600);
}

function applyFilter(type, duration = 1000) {
    const bg = document.getElementById('target-bg');
    bg.classList.add(type);

    // 캐릭터 타격(Hit) 상태 이미지 전환
    if (type === 'anger' && currentTarget.hit_bg) {
        updateCharacterImage(currentTarget.hit_bg);
        setTimeout(() => {
            // Panic(붕괴) 상태가 아니라면 일반으로 복구
            if (!isMentalBreak) updateCharacterImage(currentTarget.bg);
        }, 2000); // 2초 유지
    }

    // Also show a screen flash overlay
    const overlay = document.createElement('div');
    overlay.className = `hit-overlay ${type}-tint`;
    document.body.appendChild(overlay);

    setTimeout(() => {
        bg.classList.remove(type);
        overlay.remove();
    }, duration);
}

function updateCharacterImage(src) {
    // Update Background (Removing IDLE animation classes)
    const bg = document.getElementById('target-bg');
    bg.src = src;
    bg.className = ''; // IDLE 삭제
}

// Matrix Logic
document.getElementById('matrix-btn').addEventListener('click', () => {
    const popup = document.getElementById('matrix-popup');
    const grid = document.getElementById('matrix-grid');
    const weakInfo = document.getElementById('target-weakness-info');

    grid.innerHTML = '';
    Object.entries(synergyMap).forEach(([prop, data]) => {
        const item = document.createElement('div');
        item.className = 'matrix-item';
        item.innerHTML = `<strong>${prop}</strong><br>
            <span style="color:#22c55e">▶ ${data.strong}</span><br>
            <span style="color:#ef4444">◀ ${data.weak}</span>`;
        grid.appendChild(item);
    });

    if (currentTarget) {
        const weaknesses = [];
        Object.entries(synergyMap).forEach(([prop, data]) => {
            if (currentTarget.properties.includes(data.strong)) {
                weaknesses.push(`<span style="color:gold;font-weight:bold">${prop}</span>`);
            }
        });
        weakInfo.innerHTML = `<strong>TARGET ANALYSIS:</strong><br>
            지금 상대인 ${currentTarget.name}님은 ${weaknesses.join(', ')} 속성 키워드에 매우 취약합니다.`;
    }

    popup.classList.remove('hidden');
});

document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('matrix-popup').classList.add('hidden');
});

window.onclick = (event) => {
    const popup = document.getElementById('matrix-popup');
    if (event.target == popup) popup.classList.add('hidden');
}

function shakeScreen(intensity) {
    const workspace = document.querySelector('.main-workspace');
    workspace.style.animation = 'none';
    setTimeout(() => {
        workspace.style.animation = `vibrate 0.1s infinite`;
        setTimeout(() => workspace.style.animation = 'none', 300);
    }, 10);
}
