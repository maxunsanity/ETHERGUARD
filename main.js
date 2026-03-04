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
        id: 'jang', name: '여포', trait: '폭군·광기', avatar: '🔥',
        images: {
            normal: 'jang_normal.png',
            break: 'jang_break.png',
            recruited: 'jang_recruited.png'
        },
        bg: 'jang_normal.png',
        archetype: '폭주하는 무력', props: ['BODY'],
        stats: { atk: 384, acc: 180, crt: 60, def: 60, hp: 7056 },
        maxTrust: 3780, trust: 0, isUnlocked: true, isRecruited: false, hasFailedBefore: false, hasSeenSynopsis: false,
        attempts: 0, achievedTitle: null,
        synopsis: '빙의 직후 혼란에 빠져 에테르가드 변두리 클럽을 닥치는 대로 부수며 폭주하고 있는 상태.',
        introMonologues: [
            "으오오옷! 이 몸의 힘을 감당할 수 있겠느냐!!",
            "다 부숴버리겠다! 날 막아서는 것들은 전부!!",
            "매니저? 디렉터? 그딴 게 내 분노를 잠재울 수 있을까!"
        ],
        recruitedGreeting: '흐흥, 제법이군. 이 여포의 무력을 감당할 수 있는 자는 네놈이 처음이다. 에테르가드의 최전선은 내가 책임지지!',
        failedGreeting: '고작 그 정도냐? 실망이군. 더 강한 진심을 가져와라!'
    },
    {
        id: 'seola', name: '제갈량', trait: '천재·해커', avatar: '📖',
        images: {
            normal: 'seola_normal.png',
            break: 'seola_break.png',
            recruited: 'seola_recruited.png'
        },
        bg: 'seola_bg.png',
        archetype: '철두철미한 분석가', props: ['LOGIC'],
        stats: { atk: 448, acc: 380, crt: 320, def: 120, hp: 7762 },
        maxTrust: 4158, trust: 0, isUnlocked: false, isRecruited: false, hasFailedBefore: false, hasSeenSynopsis: false,
        attempts: 0, achievedTitle: null,
        synopsis: '에테르가드의 메인 관제 시스템을 해킹해 쥐고, 디렉터의 접근을 차갑게 분석하며 시험하려 드는 해커.',
        introMonologues: [
            "에테르가드의 시스템은 이미 제 손안에 있습니다.",
            "당신의 접근 권한... 제가 허락할 것 같습니까?",
            "제 시뮬레이션에 의하면 당신의 성공 확률은 0.01%입니다."
        ],
        recruitedGreeting: '천명조차 비틀어버리는 당신의 불확실성에... 제 모든 계책을 걸어보고 싶어졌습니다. 에테르가드의 시스템을 제가 재설계하죠.',
        failedGreeting: '역시 계산대로군요. 논리적인 허점부터 메우고 오시길.'
    },
    {
        id: 'kwan', name: '초선', trait: '무희·인플루언서', avatar: '💃',
        images: {
            normal: 'kwan_normal.png',
            break: 'kwan_break.png',
            recruited: 'kwan_recruited.png'
        },
        bg: 'kwan_normal.png',
        archetype: '매혹적인 감각', props: ['SENSE'],
        stats: { atk: 352, acc: 220, crt: 110, def: 220, hp: 8467 },
        maxTrust: 4536, trust: 0, isUnlocked: false, isRecruited: false, hasFailedBefore: false, hasSeenSynopsis: false,
        attempts: 0, achievedTitle: null,
        synopsis: '가장 화려한 루미나 플라자 VIP 라운지에서 대중의 시선을 사로잡으며 자신만의 세력을 구축 중인 인플루언서.',
        introMonologues: [
            "어머, 이 화려한 조명보다 눈부신 제안이 있나요?",
            "사람들의 시선은 언제나 저를 향하죠. 당신도 예외는 아닐 텐데?",
            "지루한 이야기는 딱 질색이에요. 절 웃겨보시겠어요?"
        ],
        recruitedGreeting: '호호, 당신 제법 센스 있네요? 에테르가드의 가장 화려한 꽃이 되어드리죠. 전 세계의 이목을 끌어당길 준비 되셨나요?',
        failedGreeting: '너무 뻔한 대화네요. 감각 없는 사람은 제 곁에 둘 수 없답니다.'
    },
    {
        id: 'yuna', name: '유비', trait: '군주·이상주의', avatar: '🎓',
        images: {
            normal: 'yuna_normal.png',
            break: 'yuna_break.png',
            recruited: 'yuna_recruited.png'
        },
        bg: 'yuna_normal.png',
        archetype: '공감하는 리더', props: ['HEART'],
        stats: { atk: 320, acc: 300, crt: 150, def: 100, hp: 9173 },
        maxTrust: 4914, trust: 0, isUnlocked: false, isRecruited: false, hasFailedBefore: false, hasSeenSynopsis: false,
        attempts: 0, achievedTitle: null,
        synopsis: '도시의 억압받는 자들을 모아 언더그라운드 빈민가에서 거대한 저항의 불씨를 지피고 있는 이상주의 리더.',
        introMonologues: [
            "약자들의 눈물이 멈추지 않는 이 비극을 두고 볼 수 없습니다.",
            "진정한 낙원은 지배가 아닌 헌신으로 만들어지는 것입니다.",
            "당신도 결국 기득권의 앞잡이인가요? 아니면..."
        ],
        recruitedGreeting: '당신의 진심에서 제가 꿈꾸던 세상을 보았습니다. 에테르가드를 모두가 웃을 수 있는 따뜻한 보금자리로 함께 만들어가요.',
        failedGreeting: '아직은 당신을 온전히 믿기 어렵군요. 더 깊은 진심을 보여주세요.'
    },
    {
        id: 'sora', name: '조조', trait: '패왕·지배자', avatar: '🍷',
        images: {
            normal: 'sora_normal.png',
            break: 'sora_break.png',
            recruited: 'sora_recruited.png'
        },
        bg: 'sora_normal.png',
        archetype: '냉혹한 전략가', props: ['MYSTIC', 'LOGIC'],
        stats: { atk: 416, acc: 300, crt: 260, def: 180, hp: 9878 },
        maxTrust: 5292, trust: 0, isUnlocked: false, isRecruited: false, hasFailedBefore: false, hasSeenSynopsis: false,
        attempts: 0, achievedTitle: null,
        synopsis: '코어 타워 최상층. 도시의 통제권을 완전히 장악하기 직전, 당신을 불러들여 최후의 독대를 요청하는 지배자.',
        introMonologues: [
            "천하를 쥐는 것은 오직 자격 있는 자뿐입니다.",
            "에테르가드... 이곳의 진짜 주인이 누구인지 제가 정하죠.",
            "위축되지 말고 당당히 서십시오. 패왕 앞에 서는 자의 예우입니다."
        ],
        recruitedGreeting: '제 압도적인 카리스마마저 당당히 마주하는 그 배짱... 좋습니다. 당신의 야망에 제 지략과 운명을 걸어보죠. 천하를 쥐실 준비가 되셨습니까?',
        failedGreeting: '범인(凡人)의 수준이군요. 이 조조를 설득하려면 더 거시적인 안목을 가져오세요.'
    }
];

const quests = {
    'jang': {
        description: "스포츠카의 키를 걸고 여포를 진정시키고 첫 동료로 영입하라.",
        hint: "복잡한 설명 대신 그의 힘을 절대적으로 칭찬하고 호탕하게 다가가세요.",
        titles: ["여포의 의형제", "광기를 잠재운 자", "호탕한 디렉터"]
    },
    'seola': {
        description: "당신의 비즈니스 모델이 완벽한 대안임을 증명하여 제갈량을 CTO로 섭외하라.",
        hint: "감정에 호소하지 마세요. 수치와 팩트 중심의 이익을 제시해야 합니다.",
        titles: ["불확실성의 변수", "제갈량의 주군", "천재의 파트너"]
    },
    'kwan': {
        description: "초선의 예술적 안목을 만족시키고 에테르가드 최고의 PR 모델로 섭외하라.",
        hint: "지루한 말은 통하지 않습니다. 세련된 농담과 우아한 화법을 구사하세요.",
        titles: ["루미나의 별", "초선의 뮤즈", "세련된 연출가"]
    },
    'yuna': {
        description: "단순한 지배가 아닌, 모두를 위한 낙원을 만들겠다는 진심을 증명하여 유비를 영입하라.",
        hint: "약자에 대한 깊은 공감과 헌신을 약속하여 그녀의 굳건한 경계를 허무세요.",
        titles: ["최고의 이상주의자", "유비의 동반자", "민중의 대변인"]
    },
    'sora': {
        description: "조조의 압도적인 카리스마를 뚫고, 당신이 진정한 '디렉터'임을 선포하라.",
        hint: "위축되지 말고 당당히 맞서세요. 논리와 거시적 운명을 동시에 논해야 합니다.",
        titles: ["에테르가드의 지배자", "조조가 인정한 영웅", "패업의 동반자"]
    }
};

const managerBaseStats = { atk: 400, acc: 200, crt: 100, def: 300, hp: 13000, maxHp: 13000 };
let activeSupporter = characters[0]; // Start with the first character in sequence (Yeopo)

const skills = [
    { id: 'BODY', name: '무력 시위', keywords: ['힘', '파괴', '강함', '무력', '돌직구', '호탕', '친구'], multiplier: 1.5, cooldown: 3000, lastUsed: 0 },
    { id: 'LOGIC', name: '논파', keywords: ['논리', '분석', '증거', '명분', '이익', '수치', '사실', '팩트'], multiplier: 1.5, cooldown: 3000, lastUsed: 0 },
    { id: 'SENSE', name: '예리한 통찰', keywords: ['감각', '직감', '꿰뚫다', '안목', '재치', '유머', '농담'], multiplier: 1.5, cooldown: 3000, lastUsed: 0 },
    { id: 'HEART', name: '감정 동화', keywords: ['공감', '위로', '지지', '고충', '마음', '따뜻한'], multiplier: 1.5, cooldown: 3000, lastUsed: 0 },
    { id: 'MYSTIC', name: '심연의 응시', keywords: ['운명', '인연', '비유', '수수께끼', '심연'], multiplier: 1.5, cooldown: 3000, lastUsed: 0 }
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
let currentStageIndex = 0; // 0-4
let viewedStageIndex = 0; // Tracks which character is currently viewed in the lobby
let currentManagerHp = 13000;
let inventoryFirePoints = 99999;
let selectedFpCount = 0; // 기본값: 사용안함(OFF)

// 신규: 다음 미섭외 스테이지 인덱스 찾기 함수
function updateCurrentStageIndex() {
    let nextIdx = characters.findIndex(c => !c.isRecruited);
    if (nextIdx === -1) {
        currentStageIndex = characters.length; // 모든 스테이지 클리어
    } else {
        currentStageIndex = nextIdx;
        // 현재 스테이지와 그 이전의 모든 스테이지는 잠금 해제 상태여야 함
        for (let i = 0; i <= currentStageIndex; i++) {
            if (characters[i]) characters[i].isUnlocked = true;
        }
    }
}

let comboCount = 0;
let lastHitTime = 0;
let repeatMap = new Map();
let isMentalBreak = false;
let breakTimerFunc = null;

// 춴팅 메시지만 지우기 (로비 DOM 보존)
function clearChatMessages() {
    const container = document.getElementById('chat-messages');
    const lobby = document.getElementById('lobby-target-workspace');
    // lobby 제외한 자식네드만 제거
    Array.from(container.children).forEach(el => {
        if (el.id !== 'lobby-target-workspace') el.remove();
    });
}

function renderGauntlet() {
    const mapContainer = document.getElementById('gauntlet-map');
    mapContainer.innerHTML = '';

    characters.forEach((char, index) => {
        const isCleared = char.isRecruited;
        const isCurrent = index === currentStageIndex && !isCleared;
        const isLocked = index > currentStageIndex;

        const node = document.createElement('div');
        node.className = `stage-node ${isCleared ? 'cleared' : ''} ${isCurrent ? 'current' : ''} ${isLocked ? 'locked' : ''}`;

        let statusText = "LOCKED";
        let statusIcon = "🔒";
        if (isCleared) {
            statusText = "CLEARED";
            statusIcon = "✅";
        } else if (isCurrent) {
            statusText = "START";
            statusIcon = char.avatar;
        } else {
            statusText = "CHALLENGE";
            statusIcon = char.avatar; // Show avatar but node has 'locked' class (opacity/blur)
        }

        node.innerHTML = `
            <span class="stage-number">STAGE 0${index + 1}</span>
            <span class="stage-status-icon">${statusIcon}</span>
            <h3 class="stage-name">${char.name}</h3>
            <button class="stage-btn">${statusText}</button>
        `;

        // 모든 스테이지(클리어 포함, 단 현재 순서 이전의 잠긴 스테이지 제외) 클릭 가능하도록 수정
        // 섭외된 캐릭터는 관리창으로, 미섭외는 전투 준비/경고창으로 유도
        node.querySelector('.stage-btn').onclick = () => selectStage(index);

        mapContainer.appendChild(node);
    });

    // Toggle close button if at least one stage is playable/active
    const closeBtn = document.getElementById('close-gauntlet');
    if (currentTarget) {
        closeBtn.classList.remove('hidden');
    } else {
        closeBtn.classList.add('hidden');
    }
}

// 가운틀렛에서 스테이지 선택 시 미션 브리핑 표시 후 전투 진입
let pendingBriefingChar = null;

function selectStage(index) {
    const char = characters[index];
    if (!char) return;

    // 수정: 이미 섭외(클리어)된 캐릭터 클릭 시 설전(관리) 화면으로 진입
    if (char.isRecruited) {
        // 만약 다른 미섭외 캐릭터와 전투 중이라면 중단 확인
        if (currentTarget && !currentTarget.isRecruited) {
            if (!confirm(`진행 중인 [${currentTarget.name}]과의 설전을 중단하고 캐릭터 상태를 확인하시겠습니까?`)) {
                return;
            }
            cancelCurrentCombat();
        }
        // 섭외된 캐릭터 전용 진입 처리
        doSelectStage(index, false);
        return;
    }

    // 비순차 선택 감지: 현재 순서(currentStageIndex)보다 뒤 스테이지를 선택
    if (index > currentStageIndex) {
        // 경고 모달 표시
        const modal = document.getElementById('skip-warning-modal');
        modal.classList.remove('hidden');

        // 버튼 이벤트 (1회성으로 등록해 중복 방지)
        const confirmBtn = document.getElementById('skip-confirm-btn');
        const cancelBtn = document.getElementById('skip-cancel-btn');

        const onConfirm = () => {
            modal.classList.add('hidden');
            confirmBtn.removeEventListener('click', onConfirm);
            cancelBtn.removeEventListener('click', onCancel);
            doSelectStage(index, true); // 패널티 적용하여 진입
        };

        const onCancel = () => {
            modal.classList.add('hidden');
            confirmBtn.removeEventListener('click', onConfirm);
            cancelBtn.removeEventListener('click', onCancel);
            // 가운틀렛 맵으로 복귀
            document.body.classList.add('show-gauntlet');
        };

        confirmBtn.addEventListener('click', onConfirm);
        cancelBtn.addEventListener('click', onCancel);
        return;
    }

    // 정상 순서 진입 (패널티 없음)
    doSelectStage(index, false);
}

function doSelectStage(index, withPenalty) {
    const char = characters[index];

    // 가운틀렛 닫기
    document.body.classList.remove('show-gauntlet');
    viewedStageIndex = index;

    // 캐릭터 기본 셋업 (UI 준비)
    currentTarget = char;
    char.currentHp = char.stats.hp;

    // 매니저 스탯 초기화
    managerBaseStats.atk = 400;
    managerBaseStats.acc = 200;
    managerBaseStats.crt = 100;
    managerBaseStats.def = 300;
    managerBaseStats.hp = 13000;
    managerBaseStats.maxHp = 13000;

    // 비순차 패널티 적용 (멘탈 약화)
    if (withPenalty) {
        managerBaseStats.atk *= 0.5;
        managerBaseStats.acc *= 0.5;
        managerBaseStats.crt *= 0.5;
        managerBaseStats.def *= 0.5;
        managerBaseStats.hp *= 0.5;
        managerBaseStats.maxHp *= 0.5;
    }
    currentManagerHp = managerBaseStats.hp;
    updateManagerHpUI();

    // 아이콘 active 표시
    document.querySelectorAll('.face-icon').forEach(el => el.classList.remove('active'));
    const icon = document.querySelector(`.face-icon[data-id="${char.id}"]`);
    if (icon) icon.classList.add('active');

    // 전투 상태 초기화
    isMentalBreak = false;
    comboCount = 0;
    turnCount = 0;
    qteCeilingCounter = 0;
    isQTEActive = false;
    repeatMap.clear();

    // UI 업데이트
    document.getElementById('target-vs-name').textContent = char.name; // VS 화면용
    document.getElementById('target-name').textContent = char.name;    // Trust 화면용
    document.getElementById('target-trait').textContent = char.trait;

    // 획득 타이틀 표시 (Phase 2 UI용)
    const titleEl = document.getElementById('target-achieved-title');
    if (titleEl) {
        titleEl.textContent = char.achievedTitle || (quests[char.id]?.titles[0] + " (임시)") || "";
        titleEl.style.display = char.isRecruited ? 'inline-block' : 'none';
    }

    updateCharacterImage();
    updateUIGauges();

    // 채팅 초기화 (lobby-target-workspace DOM 보존)
    clearChatMessages();
    const lobbyWs = document.getElementById('lobby-target-workspace');
    if (lobbyWs) lobbyWs.classList.add('hidden');

    // UI 모드 전환: 섭외 여부에 따라 Combat UI / Trust UI 분기
    if (char.isRecruited) {
        document.getElementById('phase-combat-ui').classList.add('hidden');
        document.getElementById('phase-trust-ui').classList.remove('hidden');
        document.querySelector('.main-workspace').classList.add('phase-trust');

        // 섭외된 캐릭터는 설전 입력 바로 활성화
        document.getElementById('chat-input').disabled = false;
        document.getElementById('send-btn').disabled = false;

        // 브리핑 건너뜀
        pendingBriefingChar = null;
        document.getElementById('quest-overlay').classList.add('hidden');

        // 섭외된 캐릭터 인트로 & 채팅 시작
        startCharacterChat(char);

    } else {
        document.getElementById('phase-combat-ui').classList.remove('hidden');
        document.getElementById('phase-trust-ui').classList.add('hidden');
        document.querySelector('.main-workspace').classList.remove('phase-trust');
        document.getElementById('chat-input').disabled = true;
        document.getElementById('send-btn').disabled = true;

        // 미션 브리핑 오버레이 표시
        pendingBriefingChar = char;
        showQuestOverlay(char);
    }
}

function initCombat(char) {
    const index = characters.indexOf(char);
    selectStage(index);
}

// QTE State
let turnCount = 0;
let qteCeilingCounter = 0; // Tracks consecutive turns without QTE
let isQTEActive = false;

const qteData = {
    'yuna': {
        questions: [
            "과거에 잃어버린 형제들처럼... 당신도 제 이상을 쫓다 결국 부러져 버리는 건 아닐까요? 디렉터님은 이 희생을 어떻게 감당하실 건가요?",
            "모두를 구하려는 이 마음이... 제가 그저 치유받고 싶은 욕심에서 나온 거라면, 저는 어떡해야 할까요?",
            "저는 언제까지나 모두의 짐을 질 수 있는 사람이 아닐지도 몰라요. 디렉터님은 제가 무너지면 어떻게 하실 건가요?",
            "형제를 잃은 이 고통... 누군가가 채워줄 수 있을까요, 아니면 제가 평생 안고 가야 할 상처일까요?",
            "강한 척 이끌어왔지만... 속으로는 아무도 저를 진심으로 믿어주지 않는 것 같아서 두려워요.",
            "디렉터님이 저를 선택한 건 제 이상(理想) 때문인가요, 아니면 이용 가치 때문인가요?",
            "세상의 모든 약자가 웃는 날을 꿈꿔왔는데... 그 꿈이 너무 순진한 건 아닐까요?",
            "저를 의지하는 사람들이 있어요. 하지만 저는 누구에게 의지할 수 있죠? 디렉터님은 정말 곁에 있어줄 건가요?",
            "가끔은 모든 걸 내려놓고 평범한 삶을 살고 싶다는 생각을 해요. 그런 저는... 나쁜 사람인가요?",
            "제가 틀렸을 때, 당신은 솔직하게 말해줄 수 있는 사람인가요? 아니면 저를 위로만 할 건가요?"
        ],
        options: [
            { text: "#희생_아닌_동행", score: 100, msg: "네... 당신이 곁에 있다면, 무너지지 않을 수 있겠네요." },
            { text: "#현실적_지원", score: 50, msg: "자원 기술로 돕는다니... 마음보단 합리적인 대답이군요." },
            { text: "#위험_회피", score: -50, msg: "결국 당신도 언제든 저를 버리겠다는 뜻이군요... 배신자!" },
            { text: "#분노", score: -50, msg: "화를 내다니, 제 고뇌를 비웃는 건가요?!" },
            { text: "#사과", score: -50, msg: "미안하다는 말로 끝날 희생이 아닙니다!" }
        ]
    },
    'kwan': {
        questions: [
            "전장에서 단 한 번의 오판이 목을 떨구는 법. 디렉터, 당신의 지휘가 그저 펜대를 굴리는 기만에 불과하다면 내가 당장 당신을 베겠다. 증명할 수 있나?",
            "신의(信義)만이 한 인간의 가치를 증명한다. 과거에 당신이 배신한 자가 있다면 지금 당장 고백하라.",
            "내 청룡언월도는 숱한 배신자의 목을 베었다. 디렉터, 당신은 내 도(刀)의 이쪽인가, 저쪽인가?",
            "나는 주군을 위해 목숨을 바쳤다. 당신은 나를 위해 무엇을 잃을 자신이 있는가?",
            "두려움 없이 내 눈을 똑바로 볼 수 있는 자만이 내 동지가 될 자격이 있다. 눈을 피하지 말라.",
            "전쟁터에서 지략이 없는 자는 스스로 칼을 부르는 법이다. 당신의 진짜 전략을 내놓아 보라.",
            "나는 죽음도 두렵지 않다. 당신은 나를 잃더라도 흔들리지 않을 수 있는가?",
            "옛 주군이 남긴 約(약속)을 나는 아직도 지킨다. 당신과의 약속은 얼마나 지속될 것이라 생각하는가?",
            "내 생에 진정한 동료를 만나는 것은 하늘의 뜻이다. 우리의 인연이 우연인지 필연인지 증명해 보라.",
            "거짓으로 나를 섬기는 자는 없는 것만 못하다. 당신의 진심은 어디에 있는가?"
        ],
        options: [
            { text: "#죽음마저_초월한_신의", score: 100, msg: "내 검이 부러지는 한이 있더라도 곁을 지키겠다는 건가... 그 의리, 베지 않겠다." },
            { text: "#전술적_신뢰", score: 50, msg: "데이터와 분석이라... 전장의 피비린내를 모르는군. 일단 지켜보겠다." },
            { text: "#비굴한_변명", score: -50, msg: "나약한 소리! 목숨을 구걸하는 자에게 내어줄 등은 없다!" },
            { text: "#욕설", score: -50, msg: "감히 관운장 앞에서 불경한 입을 놀리는가!" },
            { text: "#반박", score: -50, msg: "네놈의 알량한 혀로 내 청룡언월도를 막을 수 있을까?" }
        ]
    },
    'sora': {
        questions: [
            "디렉터, 에테르가드의 이 혼란을 힘으로 짓밟아 통일하는 것이 유일한 답입니다. 당신이 감히 내 야망을 품을 그릇이 되나요?",
            "재능 없는 자에게 기회를 주는 것은 자원 낭비입니다. 당신이 내 기대에 못 미친다면 언제든 버릴 준비가 되어 있어요.",
            "이 세계는 강한 자가 지배하기 마련입니다. 당신은 지배하는 자인가요, 지배당하는 자인가요?",
            "저는 제 목적을 위해서라면 누구든 희생시킬 수 있습니다. 당신도 예외는 아니에요. 그래도 함께할 수 있겠어요?",
            "감정은 전략의 가장 큰 적입니다. 디렉터, 당신은 지금 이성과 감정 중 어느 쪽으로 저를 설득하려 하나요?",
            "권력은 쟁취하는 것이지, 주어지는 것이 아닙니다. 당신은 원하는 것을 얻기 위해 어디까지 할 수 있죠?",
            "제 야망 앞에 도덕이나 법은 걸림돌일 뿐입니다. 당신은 저를 막을 자신이 있나요, 같이 달릴 자신이 있나요?",
            "과거에 천하를 가졌던 자들은 모두 야망을 잃는 순간 몰락했습니다. 당신의 야망은 얼마나 큰가요?",
            "충성은 대가가 따릅니다. 저를 얻고 싶다면, 그에 걸맞은 가치를 입증해 보세요.",
            "패배를 두려워하는 자는 승리를 얻을 자격이 없습니다. 당신은 실패를 어떻게 받아들이나요?"
        ],
        options: [
            { text: "#더_거대한_패권", score: 100, msg: "감히 내 야망 위에 서겠다고? ...후후, 마음에 드는 오만함이군요." },
            { text: "#상호_이익", score: 50, msg: "비즈니스 파트너라... 당신의 그릇은 딱 거기까지로군요." },
            { text: "#도덕적_비난", score: -50, msg: "난세에 도덕을 운운하는 범재(凡才)라니! 죽어 마땅합니다!" },
            { text: "#명령", score: -50, msg: "내게 명령을 내리다니, 조맹덕을 너무 얕보았군요." },
            { text: "#간청", score: -50, msg: "제발 도와달라니... 구걸하는 자는 곁에 두지 않습니다." }
        ]
    },
    'seola': {
        questions: [
            "제가 완벽한 묘수를 내놓아도... 결국 당신이란 불확실한 시스템이 이 세계를 가장 먼저 무너뜨릴 겁니다. 거대한 운명 앞에 내놓을 당신의 '변수'는 무엇이죠?",
            "제 계산에 따르면, 현재 이 대화의 성공 확률은 12.7%입니다. 당신은 어떻게 그 수치를 높일 생각인가요?",
            "오장원에서 스러진 그 날 이후로 저는 도박 같은 희망을 믿지 않습니다. 당신의 '확실한' 근거는 무엇인가요?",
            "천재의 계획도 실행하는 인간이 변수일 때 무의미해집니다. 당신이 제 뇌를 보완할 수 있는 무기는 무엇인가요?",
            "지난 수천 년의 역사를 보면, 명분과 전략 중 어느 것이 더 강력했을까요? 당신의 견해를 말해보세요.",
            "저는 미래를 시뮬레이션합니다. 당신과 함께하는 미래의 성공 시나리오를 하나만 설명해보세요.",
            "완벽한 계획에도 인간의 감정이 개입되면 균열이 생깁니다. 당신은 감정을 어떻게 통제하나요?",
            "지식 없이 행동하는 것과 행동 없이 지식만 있는 것, 당신은 어느 쪽이 더 위험하다고 생각하나요?",
            "전략가가 가장 위험한 상황은 자신의 계획을 맹신할 때입니다. 당신은 저의 오류를 지적할 자신이 있나요?",
            "별이 지는 데는 이유가 있습니다. 제가 에테르가드에 남아야 할 이유를 논리적으로 설명해주시겠습니까?"
        ],
        options: [
            { text: "#운명을_비트는_비전", score: 100, msg: "계산을 뛰어넘는 기적... 당신이라면 제 팔백 진도를 완성할 수 있겠군요." },
            { text: "#데이터_보완", score: 50, msg: "데이터를 채워 완벽에 가까워지겠다... 묘수는 아니지만 타당하군요." },
            { text: "#맹목적_낙관", score: -50, msg: "아무런 근거 없는 낙관이라니... 당신을 믿은 제 계산이 틀렸군요." },
            { text: "#부정", score: -50, msg: "현실을 부정하는 자와는 대화할 가치조차 없습니다." },
            { text: "#포기", score: -50, msg: "모든 것을 포기했다면, 이 도서관에서 영원히 잠드세요." }
        ]
    },
    'jang': {
        questions: [
            "매번 똑같애! 나불대는 놈들은 꼭 등 뒤에서 내게 칼을 꽂더라!? 디렉터, 네가 내 등 뒤를 지켜줄 자격이 있는지 피맺힌 맹세라도 해봐!!",
            "나는 형제들을 잃었어. 근데 넌 뭘 잃어봤어? 잃어본 게 없는 놈이 나를 이해할 수 있겠냐고!!",
            "이 분노가 어쩔 수 없이 터져나올 때, 진짜 내 편이라면 어떻게 해줄 거야?! 그냥 받아줄 수 있어?",
            "나 같은 거친 놈을 쓸모 있다고 보는 이유가 뭐야? 솔직히 말해봐, 그냥 이용만 하는 거 아니야?",
            "배신당할 거 알면서도 믿는 게 바보짓 아냐? 근데... 나는 또 믿고 싶다고. 왜 이러는 거지?",
            "형이 죽을 때 나는 아무것도 못 했어. 그 죄는 평생 안고 가야 해. 그래도 넌 내 편이 될 수 있어?",
            "조용한 놈들이 더 무서워. 넌 왜 이렇게 차분해? 숨기는 거 있는 거 아니야?",
            "싸움에서는 최강이지만 혼자 있으면 아무것도 모르겠어. 이 세상에서 어떻게 살아야 하는지 알려줄 수 있어?",
            "누군가를 믿으려다 배신당하는 게 무서워 죽겠어. 근데 혼자인 것도 싫어. 이 딜레마 좀 해결해봐!",
            "내가 진짜 강한 건지, 겁이 나서 먼저 때리는 건지 모르겠어. 디렉터, 넌 어떻게 생각해?"
        ],
        options: [
            { text: "#피를_나눈_형제", score: 100, msg: "크하하! 내 분노를 대신 맞겠다고? 맘에 들었어! 이제부터 넌 내 맹세 형제다!" },
            { text: "#진정_요구", score: 50, msg: "으씨... 알았어, 한 번 더 들어는 볼게." },
            { text: "#규칙_강요", score: -50, msg: "시끄러워!! 법이고 나발이고 내 주먹이 먼저야!!" },
            { text: "#맞대응", score: -50, msg: "어쭈, 너도 한 판 붙자 이거지?! 다 박살내주마!" },
            { text: "#위협", score: -50, msg: "날 겁주려고? 내가 누군지 똑똑히 보여주마!!" }
        ]
    }
};

let qteTimerInterval = null;
let qteTimeRemaining = 30;

function triggerQTE() {
    if (!currentTarget || !qteData[currentTarget.id] || currentTarget.isRecruited) return;
    isQTEActive = true;

    // UI 로직: 입력창 잠금 및 태그 영역 강조
    document.getElementById('chat-input').disabled = true;
    document.getElementById('send-btn').disabled = true;

    const data = qteData[currentTarget.id];

    // 질문 배열에서 랜덤으로 하나 선택
    const questionPool = data.questions || [data.question];
    const randomQuestion = questionPool[Math.floor(Math.random() * questionPool.length)];

    // 채팅창에 질문 추가 (특수 스타일 적용)
    const msgDiv = addMessage(randomQuestion, 'ai');
    msgDiv.classList.add('qte-message');

    // 하단 태그 영역에 QTE 전용 태그 생성
    displayQTETags(data);

    // 타이머 시작
    startQTETimer();
}

function displayQTETags(data) {
    const tagContainer = document.getElementById('keyword-tags');
    tagContainer.innerHTML = '';
    tagContainer.classList.add('qte-active');

    // 옵션 셔플
    const shuffled = [...data.options].sort(() => 0.5 - Math.random());

    shuffled.forEach(opt => {
        const span = document.createElement('span');
        span.className = 'tag-btn'; // 기존 스타일 재사용
        span.textContent = opt.text;
        span.onclick = () => handleQTEAnswer(opt);
        tagContainer.appendChild(span);
    });
}

function startQTETimer() {
    qteTimeRemaining = 30;
    const timerUI = document.getElementById('qte-timer');
    timerUI.classList.remove('hidden');
    timerUI.textContent = `${qteTimeRemaining}s`;

    if (qteTimerInterval) clearInterval(qteTimerInterval);

    qteTimerInterval = setInterval(() => {
        qteTimeRemaining--;
        timerUI.textContent = `${qteTimeRemaining}s`;

        if (qteTimeRemaining <= 0) {
            handleQTEAnswer({ text: "시간초과", score: -50, msg: "침묵은 곧 무능함의 방증일 뿐입니다." });
        }
    }, 1000);
}

function handleQTEAnswer(selectedOpt) {
    if (!isQTEActive) return;
    isQTEActive = false;

    clearInterval(qteTimerInterval);
    document.getElementById('qte-timer').classList.add('hidden');

    // 비주얼 타이머(메시지 하단 바) 즉시 중지
    const currentQteMsg = document.querySelector('.qte-message:not(.qte-stopped)');
    if (currentQteMsg) currentQteMsg.classList.add('qte-stopped');

    const tagContainer = document.getElementById('keyword-tags');
    tagContainer.classList.remove('qte-active');
    tagContainer.innerHTML = ''; // QTE 태그 제거

    // UI 잠금 해제
    document.getElementById('chat-input').disabled = false;
    document.getElementById('send-btn').disabled = false;
    document.getElementById('chat-input').focus();

    // 기존 전투 로직을 위해 태그 리필
    refreshTags();

    if (selectedOpt.text !== "시간초과") {
        addMessage(`[${selectedOpt.text}]`, 'user'); // 유저가 선택한 태그
    } else {
        addMessage(`[시간 초과] 멍하니 있다가 상대의 질문에 제때 대답하지 못했습니다...`, 'user', true);
    }

    // AI의 대사 반응 출력
    addMessage(selectedOpt.msg, 'ai');

    if (selectedOpt.score === 100) {
        // 완벽 파훼
        const highDmg = Math.floor(currentTarget.stats.hp * 0.20); // 20% 데미지
        currentTarget.currentHp = Math.max(0, currentTarget.currentHp - highDmg);
        showFloatingText(`PERFECT!! -${highDmg}`, "#fbbf24");
        triggerCriticalFlash();
        shakeScreen(20);
    } else if (selectedOpt.score === 50) {
        // 적절한 타협
        const medDmg = Math.floor(currentTarget.stats.hp * 0.10); // 10% 데미지
        currentTarget.currentHp = Math.max(0, currentTarget.currentHp - medDmg);
        showFloatingText(`GOOD! -${medDmg}`, "#60a5fa");
        triggerCharacterFlash('hit');
    } else {
        // 가치관 충돌 (-50)
        const counterDmg = 1500;
        currentManagerHp = Math.max(0, currentManagerHp - counterDmg);
        showFloatingText("MENTAL CRASH!!", "#f43f5e");
        updateManagerHpUI();
        if (typeof triggerHitEffect === 'function') triggerHitEffect();
        else {
            // fallback 시 화면 흔들림 효과
            shakeScreen(10);
        }
    }

    updateUIGauges();
    if (checkGameOver()) return; // Added: check if director's HP reached 0
    if (currentTarget.currentHp <= 0 && !isMentalBreak) enterMentalBreak();
}

function checkGameOver() {
    if (currentManagerHp <= 0) {
        currentManagerHp = 0; // Ensure it stays at 0
        updateManagerHpUI();

        // Disable chat inputs completely
        const c_input = document.getElementById('chat-input');
        const c_btn = document.getElementById('send-btn');
        if (c_input) c_input.disabled = true;
        if (c_btn) c_btn.disabled = true;

        isQTEActive = true; // Lock the system so nothing else triggers

        // Show the elegant Game Over overlay
        const overlay = document.getElementById('game-over-overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
            overlay.style.display = 'flex';
        }

        return true;
    }
    return false;
}


const ALL_TAGS = ['#명령', '#논리', '#위로', '#공감', '#칭찬', '#팩트', '#질문', '#도발', '#회유', '#결단'];

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    updateRepresentativeMarker();
    updateManagerHpUI();
    startTrustDecay();
    renderGauntlet();
    updateLobbyStageInfo();
    initTutorial();
});


function refreshSlider() {
    const slider = document.getElementById('face-icons');
    slider.innerHTML = '';
    characters.forEach(char => {
        const icon = document.createElement('div');
        icon.className = 'face-icon';
        icon.dataset.id = char.id;
        if (char.isUnlocked) icon.classList.add('unlocked');
        if (char.isRecruited) icon.classList.add('recruited');

        // 내부 이미지 DIV 생성
        const imgDiv = document.createElement('div');
        imgDiv.className = 'face-img';

        // 아이콘을 배경 이미지로 채움
        if (char.images && char.images.normal) {
            imgDiv.style.backgroundImage = `url('${char.images.normal}')`;
        } else {
            imgDiv.innerHTML = `<span style="font-size: 20px; display:flex; justify-content:center; align-items:center; height:100%; font-family:sans-serif;">${char.avatar}</span>`;
        }

        icon.appendChild(imgDiv);

        icon.onclick = (e) => {
            if (e.ctrlKey || e.metaKey) {
                setRepresentative(char);
            } else {
                // 수정: 섭외 완료된 캐릭터는 관리창으로, 아니면 시놉시스로
                if (char.isRecruited) {
                    selectStage(characters.indexOf(char));
                } else {
                    showCharacterSynopsisFromSidebar(char, icon);
                }
            }
        };
        slider.appendChild(icon);
    });
}

function showCharacterSynopsisFromSidebar(char, icon) {
    // 섭외되지 않은 캐릭터는 항상 시놉시스만 보기
    // 채팅 시작 버튼 숨김 처리
    document.getElementById('synopsis-title').textContent = `SYSTEM: 대상 식별 - ${char.name}`;
    document.getElementById('synopsis-text').textContent = char.synopsis;
    document.getElementById('synopsis-modal').classList.remove('hidden');

    // 이 메뉴에서는 진입 불가하므로 START 버튼을 숨김
    const startBtn = document.getElementById('btn-start-chat');
    if (startBtn) startBtn.style.display = 'none';

    // 닫기 버튼 이벤트 연결
    const closeBtn = document.getElementById('close-synopsis-modal');
    if (closeBtn) {
        closeBtn.onclick = () => {
            document.getElementById('synopsis-modal').classList.add('hidden');
        };
    }
}

function initUI() {
    refreshSlider();
    // FP Toggle & Stepper
    const fpToggleBtn = document.getElementById('fp-toggle-btn');
    const fpOffInfo = document.getElementById('fp-off-info');
    const fpStepperContainer = document.getElementById('fp-stepper-container');
    const fpMinus = document.getElementById('fp-minus');
    const fpPlus = document.getElementById('fp-plus');
    const fpDisplay = document.getElementById('current-fp-use');

    let lastFpCount = 1; // Default when first switched on

    fpToggleBtn.onclick = () => {
        const isOn = fpToggleBtn.classList.toggle('on');
        if (isOn) {
            fpToggleBtn.textContent = '사용함';
            fpToggleBtn.classList.remove('off');
            fpOffInfo.classList.add('hidden');
            fpStepperContainer.classList.remove('hidden');
            selectedFpCount = lastFpCount;
        } else {
            fpToggleBtn.textContent = '사용안함';
            fpToggleBtn.classList.add('off');
            fpOffInfo.classList.remove('hidden');
            fpStepperContainer.classList.add('hidden');
            selectedFpCount = 0;
        }
        fpDisplay.textContent = selectedFpCount;
    };

    fpMinus.onclick = () => {
        if (selectedFpCount > 1) {
            selectedFpCount--;
            lastFpCount = selectedFpCount;
            fpDisplay.textContent = selectedFpCount;
        }
    };

    fpPlus.onclick = () => {
        if (selectedFpCount < 100) {
            selectedFpCount++;
            lastFpCount = selectedFpCount;
            fpDisplay.textContent = selectedFpCount;
        }
    };

    document.getElementById('send-btn').onclick = handleSend;
    document.getElementById('chat-input').onkeypress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    // Synergy Modal Handlers
    const synergyBtn = document.getElementById('btn-synergy');
    const synergyBtnVs = document.getElementById('btn-synergy-vs');
    const synergyModal = document.getElementById('synergy-modal');
    const closeSynergyBtn = document.getElementById('close-synergy-modal');

    const openSynergy = () => {
        // Populate tactical info if there's a target
        const infoBox = document.getElementById('target-synergy-info');
        if (currentTarget && !currentTarget.isRecruited) {
            document.getElementById('modal-target-name').textContent = currentTarget.name;

            // Get weakness based on archetype/props
            // characters object has props: ['HEART', 'BODY'] etc. Synergy Map shows weak against.
            // But usually characters have an 'archetype speed' or 'ego speed'. 
            // In characters data: props: ['HEART', 'BODY']
            // Let's find what beats them.
            const weakness = currentTarget.props ? currentTarget.props.map(p => {
                // Find what beats this prop
                const entry = Object.entries(synergyMap).find(([key, val]) => val.strong === p);
                return entry ? entry[0] : null;
            }).filter(p => p).join(', ') : "???";

            document.getElementById('modal-target-weakness').textContent = weakness;
            document.getElementById('modal-target-hint').textContent = quests[currentTarget.id]?.hint || "공략 정보가 없습니다.";
            infoBox.classList.remove('hidden');
        } else {
            infoBox.classList.add('hidden');
        }
        synergyModal.classList.remove('hidden');
    };

    if (synergyBtn && synergyModal && closeSynergyBtn) {
        synergyBtn.onclick = openSynergy;
        if (synergyBtnVs) synergyBtnVs.onclick = openSynergy;

        closeSynergyBtn.onclick = () => synergyModal.classList.add('hidden');
        window.onclick = (e) => { if (e.target === synergyModal) synergyModal.classList.add('hidden'); };

        // Gauntlet Navigation from Stage Map Button
        document.getElementById('btn-stage-map').onclick = () => {
            // Check if there is an active battle running
            if (currentTarget && !currentTarget.isRecruited) {
                if (!confirm("진행 중인 설전을 중단하고 스테이지 맵으로 이동하시겠습니까?")) {
                    return; // 취소시 이동 안 함
                }

                // 설전 중단 확인 후 뒤로가기
                currentTarget = null;
                pendingBriefingChar = null;

                document.getElementById('phase-combat-ui').classList.add('hidden');
                document.getElementById('phase-trust-ui').classList.add('hidden');
                document.getElementById('quest-overlay').classList.add('hidden');
                document.querySelectorAll('.face-icon').forEach(el => el.classList.remove('active'));

                clearChatMessages();
                document.querySelector('.main-workspace').classList.remove('mental-break');
            }

            document.body.classList.add('show-gauntlet');
            renderGauntlet();
        };

        document.getElementById('close-gauntlet').onclick = () => {
            document.body.classList.remove('show-gauntlet');
        };
    }

    refreshTags();

    // Quest Overlay Handler - START MISSION 버튼: 미션 브리핑 닫고 전투 시작
    const questStartBtn = document.getElementById('quest-start-btn');
    if (questStartBtn) {
        questStartBtn.onclick = () => {
            document.getElementById('quest-overlay').classList.add('hidden');
            // currentTarget이 설정되어 있으면 채팅 전투 시작
            if (currentTarget && !currentTarget.isRecruited) {
                startCharacterChat(currentTarget);
            }
        };
    }
}

function showQuestOverlay(char) {
    const q = quests[char.id];
    if (!q) return;

    document.getElementById('quest-desc').textContent = `미션: ${q.description}`;
    document.getElementById('quest-hint').textContent = `(힌트: ${q.hint})`;
    document.getElementById('title-1').textContent = q.titles[0];
    document.getElementById('title-2').textContent = q.titles[1];
    document.getElementById('title-3').textContent = q.titles[2];

    document.getElementById('quest-overlay').classList.remove('hidden');

    // Disable chat until "Mission Start" is clicked
    document.getElementById('chat-input').disabled = true;
    document.getElementById('send-btn').disabled = true;
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
            `우리가 함께할 때 발생할 시너지가 보이지 않나요? 한번 더 깊게 생각해 보시죠.`,
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

function updateLobbyStageInfo() {
    const lobbyWorkspace = document.getElementById('lobby-target-workspace');
    const lobbyContainer = document.getElementById('lobby-stage-display');
    const char = characters[viewedStageIndex];

    if (!char || currentTarget) {
        lobbyWorkspace.classList.add('hidden');
        return;
    }

    lobbyWorkspace.classList.remove('hidden');

    // Penalty Check: if viewing a stage that isn't the current sequential goal
    const isPenalized = viewedStageIndex !== currentStageIndex;
    let penaltyHtml = '';
    let actionButtonsHtml = `<button class="lobby-start-btn" id="lobby-start-mission-btn">START MISSION</button>`;

    if (isPenalized) {
        penaltyHtml = `
            <div class="lobby-penalty-warning">
                ⚠️ 이전 미션을 클리어 하지 않아서 능력의 50%가 차감되어 진행 됩니다.
            </div>
        `;
        actionButtonsHtml += `
            <button class="lobby-return-btn" id="lobby-return-current-btn">이전 미션으로 돌아가기</button>
        `;
    }

    lobbyContainer.innerHTML = `
        <span class="lobby-stage-num">STAGE 0${viewedStageIndex + 1}</span>
        <span class="lobby-stage-avatar">${char.avatar}</span>
        <h2 class="lobby-stage-name">${char.name}</h2>
        ${penaltyHtml}
        <p class="lobby-stage-synopsis">${char.synopsis}</p>
        <div class="lobby-actions">
            ${actionButtonsHtml}
        </div>
    `;

    document.getElementById('lobby-start-mission-btn').onclick = () => {
        const icon = document.querySelector(`.face-icon[data-id="${char.id}"]`);
        selectCharacter(char, icon);
    };

    if (isPenalized) {
        document.getElementById('lobby-return-current-btn').onclick = () => {
            viewedStageIndex = currentStageIndex;
            updateLobbyStageInfo();
        };
    }
}

function selectCharacter(char, icon) {
    if (currentTarget === char) return;
    document.querySelectorAll('.face-icon').forEach(el => el.classList.remove('active'));
    if (icon) icon.classList.add('active');

    // Hide Lobby when character is selected
    document.getElementById('lobby-target-workspace').classList.add('hidden');

    currentTarget = char;

    // Reset managerBaseStats to original values before applying any new penalties
    // This ensures that penalties from previous out-of-order encounters don't stack.
    managerBaseStats.atk = 400;
    managerBaseStats.acc = 200;
    managerBaseStats.crt = 100;
    managerBaseStats.def = 300;
    managerBaseStats.hp = 13000;
    managerBaseStats.maxHp = 13000;

    // Apply Out-of-Order Penalty
    const targetIdx = characters.indexOf(char);
    if (targetIdx !== currentStageIndex) {
        // 50% stat reduction
        managerBaseStats.atk *= 0.5;
        managerBaseStats.acc *= 0.5;
        managerBaseStats.crt *= 0.5;
        managerBaseStats.def *= 0.5;
        // 50% HP reduction (Initial HP for this combat)
        managerBaseStats.hp *= 0.5;
        currentManagerHp = managerBaseStats.hp; // Set current HP based on penalized max HP
        updateManagerHpUI();

        addMessage(`[경고] 비순차적 대상 접근으로 인해 모든 능력치가 50% 차감되었습니다.`, 'ai', true);
    } else {
        // If it's the correct stage, ensure currentManagerHp is reset to full (unpenalized)
        currentManagerHp = managerBaseStats.hp;
        updateManagerHpUI();
    }

    currentTarget.currentHp = char.stats.hp;
    isMentalBreak = false;
    comboCount = 0;
    turnCount = 0; // Reset turn count for new target
    qteCeilingCounter = 0; // Reset ceiling counter for new target
    isQTEActive = false; // Reset QTE state
    repeatMap.clear();

    updateCharacterImage();
    document.getElementById('target-name').textContent = char.name;
    document.getElementById('target-trait').textContent = char.trait;
    document.getElementById('btn-synergy').style.display = 'inline-flex'; // Phase 2 버튼
    if (document.getElementById('btn-synergy-vs')) {
        document.getElementById('btn-synergy-vs').style.display = 'inline-flex'; // Phase 1 버튼
    }
    document.querySelector('.main-workspace').classList.remove('mental-break');
    document.getElementById('fever-timer').classList.add('hidden');

    updateUIGauges();

    document.getElementById('chat-messages').innerHTML = '';

    // Phase 1: 시놉시스 모달창 - 섭외되지 않은 캐릭터는 항상 표시 (맵에서 진입할 때만)
    if (!char.isRecruited) {
        // 채팅창 비활성화
        document.getElementById('chat-input').disabled = true;
        document.getElementById('send-btn').disabled = true;

        // 시놉시스 모달 띄우기
        document.getElementById('synopsis-title').textContent = `SYSTEM: 대상 식별 - ${char.name}`;
        document.getElementById('synopsis-text').textContent = char.synopsis;
        document.getElementById('synopsis-modal').classList.remove('hidden');

        // 맵에서 넘어왔으므로 다시 START 버튼 보이기 활성화 및 작동되게끔
        const btnStart = document.getElementById('btn-start-chat');
        if (btnStart) btnStart.style.display = 'block';

        const closeBtn = document.getElementById('close-synopsis-modal');
        if (closeBtn) closeBtn.onclick = () => { document.getElementById('synopsis-modal').classList.add('hidden'); };

        // 모달창의 '대화 시작' 버튼 클릭 이벤트 리스너 임시 연결
        if (btnStart) {
            btnStart.onclick = () => {
                char.hasSeenSynopsis = true;
                document.getElementById('synopsis-modal').classList.add('hidden');
                // 미션 브리핑 표시 (quest-start-btn에서 startCharacterChat 호출됨)
                showQuestOverlay(char);
            };
        }
    } else {
        startCharacterChat(char);
    }
}

function startCharacterChat(char) {
    // Phase HUD Reset based on recruitment state
    const combatUI = document.getElementById('phase-combat-ui');
    const trustUI = document.getElementById('phase-trust-ui');

    if (char.isRecruited) {
        combatUI.classList.add('hidden');
        trustUI.classList.remove('hidden');
        document.getElementById('target-name').textContent = char.name;
        document.getElementById('target-trait').textContent = char.trait;
        document.getElementById('target-trait').style.display = 'inline-block';

        // Update title display if recruited
        const titleEl = document.getElementById('target-achieved-title');
        if (titleEl) {
            titleEl.textContent = char.achievedTitle || "";
            titleEl.style.display = char.achievedTitle ? 'block' : 'none';
        }

        document.getElementById('chat-input').disabled = false;
        document.getElementById('send-btn').disabled = false;
    } else {
        combatUI.classList.remove('hidden');
        trustUI.classList.add('hidden');
        document.getElementById('target-vs-name').textContent = char.name.split(' (')[0];

        // 채팅 활성화
        document.getElementById('chat-input').disabled = false;
        document.getElementById('send-btn').disabled = false;
    }

    // Feature 3 & 6: Different greetings based on recruitment state
    let messagesToWrap = [];

    if (char.isRecruited) {
        messagesToWrap = [char.recruitedGreeting];
    } else if (char.hasFailedBefore) {
        messagesToWrap = [char.failedGreeting];
    } else {
        // 최초 진입 시 배열 형태의 선제 독백을 전송
        messagesToWrap = char.introMonologues || [char.greeting || "..."];
    }

    sendAITypingMessages(messagesToWrap);
    refreshTags(); // Refresh tags for new character
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

/**
 * AI의 대사를 1.5초 딜레이를 두고 순차적으로 렌더링하는 함수 (메신저 느낌 연출)
 */
function sendAITypingMessages(messagesArray) {
    if (!messagesArray || messagesArray.length === 0) return;

    // 입력창 임시 잠금
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    chatInput.disabled = true;
    sendBtn.disabled = true;

    let idx = 0;

    function sendNext() {
        if (idx < messagesArray.length) {
            // "생각 중..." 이나 "입력 중..." 메시지 표시
            const charName = currentTarget ? currentTarget.name.split(' (')[0] : 'AI';
            const statusTexts = [`[${charName} 님이 생각 중입니다...]`, `[${charName} 님이 메시지를 입력하고 있습니다...]`];
            const statusMsg = addMessage(statusTexts[Math.floor(Math.random() * statusTexts.length)], 'ai', true);
            statusMsg.style.fontStyle = 'italic';
            statusMsg.style.opacity = '0.7';

            // 1~2초 랜덤 대기
            const typingDelay = Math.floor(Math.random() * 1000) + 1000;

            setTimeout(() => {
                // 더미(입력 상태) 메시지 삭제
                statusMsg.remove();

                // 실제 메시지 출력
                addMessage(messagesArray[idx], 'ai');
                idx++;

                // 다음 메시지가 있다면 0.5초 대기 후 다음 입력 시작
                if (idx < messagesArray.length) {
                    setTimeout(sendNext, 500);
                } else {
                    // 모두 전송 완료 시 입력창 활성화
                    if (!isQTEActive) {
                        chatInput.disabled = false;
                        sendBtn.disabled = false;
                        chatInput.focus();
                    }
                }
            }, typingDelay);
        }
    }

    sendNext();
}

async function handleSend() {
    if (isQTEActive) return; // Ignore input while QTE is active

    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || !currentTarget) return;

    addMessage(text, 'user');
    input.value = '';

    await executeCombatLoop(text);
}

async function executeCombatLoop(text) {
    const matchedSkill = analyzeText(text);

    // A. 지연 시간 은폐
    const dummy = addMessage('...', 'ai', true);
    const dummyPool = ["...", "호오?", "냉철하군.", "계산된 말인가?", "어디 보죠."];
    dummy.textContent = dummyPool[Math.floor(Math.random() * dummyPool.length)];

    // 발화점이 ON(x1, x10, x100) 상태면 스킬 연출 실행 또는 랜덤 스킬 발동
    const isSpecialAttack = selectedFpCount > 0;
    let effectSkill = matchedSkill;

    if (isSpecialAttack) {
        // 키워드 매칭이 없으면 하단 스킬 중 하나를 랜덤하게 선택
        if (!effectSkill) {
            const now = Date.now();
            const availableSkills = skills.filter(s => now - s.lastUsed >= s.cooldown);
            // 쿨타임이 아닌 스킬이 있으면 그중에서, 없으면 전체에서 랜덤 선택
            const pool = availableSkills.length > 0 ? availableSkills : skills;
            effectSkill = pool[Math.floor(Math.random() * pool.length)];
        }

        // 쿨타임 체크
        const now = Date.now();
        if (now - effectSkill.lastUsed < effectSkill.cooldown) {
            // 사용자가 직접 키워드(#)로 입력한 경우에만 쿨타임 알림 표시 후 중단
            if (matchedSkill) {
                addMessage(`[시스템] ${effectSkill.name} 스킬이 아직 재사용 대기 중입니다.`, 'ai', true);
                dummy.remove();
                return;
            }
            // 랜덤 발동의 경우 쿨타임 중이면 연출 없이 진행
        } else {
            // 슬롯머신 연출 및 쿨타임 시작
            await triggerSlotMachineEffect(effectSkill.id);
            effectSkill.lastUsed = now;
            startCooldownUI(effectSkill);
        }
    } else {
        await new Promise(r => setTimeout(r, 600));
    }

    dummy.remove();

    // B. 데미지 계산 및 전투 공식 적용 (선택된 effectSkill 사용)
    const result = calculateDamage(text, effectSkill, isDirectSkillClick);
    isDirectSkillClick = false; // 플래그 초기화

    if (result.isHit) {
        processCombatHit(result, effectSkill);
    } else {
        showFloatingText("MISS", "slate");
        comboCount = 0;
        updateComboUI();
    }

    // C. QTE 또는 타겟 반격 (모든 연출 종료 후 실행)
    if (!isMentalBreak && currentTarget.currentHp > 0) {
        turnCount++;
        let isQteTriggered = false;

        if (!currentTarget.isRecruited && turnCount >= 2) {
            qteCeilingCounter++;
            if (qteCeilingCounter >= 4 || Math.random() < 0.45) {
                qteCeilingCounter = 0;
                isQteTriggered = true;
                setTimeout(() => triggerQTE(), 800);
            }
        }

        if (!isQteTriggered) {
            setTimeout(() => {
                processTargetCounter(text);
                refreshTags();
            }, 800);
        }
    } else {
        refreshTags();
    }
}

function calculateDamage(text, skill, directSkillClick = false) {
    // Current Stats (Base + Supporter Buff)
    const currentAtk = managerBaseStats.atk + (activeSupporter ? activeSupporter.stats.atk * 0.2 : 0);
    const currentAcc = managerBaseStats.acc + (activeSupporter ? activeSupporter.stats.acc * 0.2 : 0);
    const currentCrt = managerBaseStats.crt + (activeSupporter ? activeSupporter.stats.crt * 0.2 : 0);

    // 1. 명중 판정
    const synergy = skill ? getSynergy(skill.id, currentTarget.props) : 1.0;
    const skillBonus = skill ? skill.multiplier : 1.0; // 1.5x multiplier
    const synergyMod = synergy > 1.0 ? 0.5 : (synergy < 1.0 ? 1.5 : 1.0);
    const hitProb = CONFIG.BASE_ACCURACY + (currentAcc * 0.1) - (currentTarget.stats.def * 0.1 * synergyMod);

    // x100(MAX) 사용 시 100% 명중 보장
    const isHit = Math.random() * 100 < hitProb || (selectedFpCount >= 100);
    if (!isHit) return { isHit: false };

    // 2. 데미지 계산
    // 스킬 직접 클릭: 스킬 공격력만 (일반 공격력 제외)
    // 채팅 + 스킬: 일반 공격력 + 스킬 공격력 합산
    let baseDmg;
    if (directSkillClick && skill) {
        // 스킬 슬롯 직접 클릭 → 스킬 데미지만
        baseDmg = currentAtk * (skillBonus - 1.0); // 스킬 배율 부분만 적용 (0.5x)
        if (baseDmg < 1) baseDmg = Math.floor(currentAtk * 0.5);
    } else {
        // 채팅 입력 (+ 스킬 매칭 시 합산)
        baseDmg = currentAtk; // 일반 공격력이 기본
    }
    const critProb = 5 + (currentCrt * 0.1) + (comboCount * CONFIG.COMBO_CRIT_BONUS);
    const isCrit = Math.random() * 100 < critProb;
    const critMultiplier = isCrit ? (selectedFpCount === 100 ? 2.0 : 1.5) : 1.0;

    const fpMods = { 1: 1.5, 10: 2.0, 30: 3.0, 50: 4.5, 100: 8.0 };
    let fpMulti = 1.0;

    // 발화점 보유량 체크 (스테이지 가중치 적용)
    if (selectedFpCount > 0) {
        const stageIdx = characters.indexOf(currentTarget);
        const costPerUnit = (stageIdx + 1) * 10;
        const totalCost = selectedFpCount * costPerUnit;

        if (inventoryFirePoints >= totalCost) {
            fpMulti = fpMods[selectedFpCount] || 1.0;
            inventoryFirePoints -= totalCost;
            document.getElementById('item-count').textContent = inventoryFirePoints;
            showFloatingText(`-${totalCost} FIREPOINTS`, "#38bdf8");
        } else {
            // 발화점 부족 시 일반 공격으로 전환
            addMessage("[시스템] 발화점이 부족하여 일반 공격으로 진행합니다.", "ai", true);
            fpMulti = 1.0;
        }
    }

    let penalty = 1.0;
    const count = repeatMap.get(text) || 0;
    if (count === 1) penalty = 0.5;
    else if (count === 2) penalty = 0.1;
    else if (count >= 3) penalty = 0;
    repeatMap.set(text, count + 1);

    const finalDmg = Math.floor((baseDmg * fpMulti * skillBonus * critMultiplier * synergy * penalty) - currentTarget.stats.def);
    return { isHit: true, dmg: Math.max(1, finalDmg), isCrit, isImmune: penalty < 0.2 };
}

function processCombatHit(res, skill) {
    if (isMentalBreak || currentTarget.isRecruited) {
        // Phase 2 or Post-recruit: Damage adds to Trust
        currentTarget.trust = Math.min(currentTarget.maxTrust, currentTarget.trust + res.dmg);
        showFloatingText(`+${res.dmg} TRUST`, "gold");

        // Feature 1: Trust 100% → 즉시 획득 (타이머 무시)
        if (currentTarget.trust >= currentTarget.maxTrust) {
            if (breakTimerFunc) clearInterval(breakTimerFunc);
            endMentalBreak();
            return;
        }
    } else {
        // Phase 1: Damage reduces Mental HP
        const overDmg = Math.max(0, res.dmg - currentTarget.currentHp);
        currentTarget.currentHp = Math.max(0, currentTarget.currentHp - res.dmg);

        if (overDmg > 0) {
            currentTarget.trust = Math.min(currentTarget.maxTrust, currentTarget.trust + overDmg);
            showFloatingText(`+${overDmg} OVERKILL`, "gold");
        }

        if (res.isImmune) {
            showFloatingText("IMMUNE!", "#94a3b8");
        } else {
            showFloatingText(`-${res.dmg}`, res.isCrit ? "#fbbf24" : "white");
            if (res.isCrit) showFloatingText("CRITICAL!", "#ef4444");
            triggerCharacterFlash('hit'); // 캐릭터가 공격받음 (레드 플래시)
        }

        // 콤보 업데이트
        const now = Date.now();
        if (now - lastHitTime < CONFIG.COMBO_TIMEOUT) {
            comboCount++;
            if (comboCount > CONFIG.COMBO_MAX) {
                comboCount = 1;
            }
        } else {
            comboCount = 1;
        }
        lastHitTime = now;
        updateComboUI();

        if (comboCount === CONFIG.COMBO_MAX) {
            document.querySelector('.main-workspace').classList.add('combo-max-vibrate');
        } else {
            document.querySelector('.main-workspace').classList.remove('combo-max-vibrate');
        }
    }

    if (currentTarget.currentHp <= 0 && !isMentalBreak && !currentTarget.isRecruited) enterMentalBreak();
    shakeScreen(res.isCrit ? 15 : 5);
    updateUIGauges();
}

function processTargetCounter(text) {
    // Feature 2: 섭외 완료된 캐릭터는 공손한 말투로 반격
    let replies;
    if (currentTarget.isRecruited) {
        replies = [
            ["디렉터님,", "좀 더 설득력 있는 말씀을 부탁드립니다."],
            ["존경하지만...", "그 말씀은 조금 아쉽네요."],
            ["디렉터님의 기대에 부응하고 싶습니다.", "하지만 조언은 냉정해야 하니까요."],
            ["더 좋은 방법이 있을 것 같아요.", "다시 한 번 생각해 보시겠어요?"]
        ];
    } else {
        replies = [
            ["그것이 당신의 한계인가요?", "실망스럽군요."],
            ["논리가 빈약하군요.", "다시 제대로 준비해서 오시죠."],
            ["후후, 수준이 뻔히 보이는군요.", "더 노력해 보세요."],
            ["겨우 그 정도로 저를...", "상대할 수 있다고 생각했나요?"]
        ];
    }

    // 여러 말풍선으로 나뉘어 순차 전송
    const selectedReplyArr = replies[Math.floor(Math.random() * replies.length)];
    sendAITypingMessages(selectedReplyArr);

    let counterDmg = Math.floor(currentTarget.stats.atk * (Math.random() * 0.4 + 0.3)) * 2; // Increased by 100%
    if (text.length < 5 || (repeatMap.get(text) || 0) > 1) {
        counterDmg *= 2;
        showFloatingText("COUNTER!!", "#f43f5e");
    }

    currentManagerHp = Math.max(0, currentManagerHp - counterDmg);
    updateManagerHpUI();
    triggerHitEffect(); // 매니저 화면 흔들림/빨간 테두리
    triggerCharacterFlash('attack'); // 캐릭터가 공격함 (블루 플래시)

    checkGameOver();
}

function updateManagerHpUI() {
    const pct = (currentManagerHp / managerBaseStats.maxHp) * 100;
    const hpFill = document.getElementById('player-hp-fill');
    if (hpFill) hpFill.style.width = `${pct}%`;
}

function triggerHitEffect() {
    document.body.classList.add('hit-blink');
    setTimeout(() => document.body.classList.remove('hit-blink'), 200);
}

function enterMentalBreak() {
    isMentalBreak = true;
    updateCharacterImage();
    document.querySelector('.main-workspace').classList.add('mental-break');

    // UI Phase Transition: Combat -> Trust Only
    const combatUI = document.getElementById('phase-combat-ui');
    const trustUI = document.getElementById('phase-trust-ui');

    // Shatter effect on the combat header
    combatUI.classList.add('shatter');

    setTimeout(() => {
        combatUI.classList.add('hidden');
        combatUI.classList.remove('shatter');
        trustUI.classList.remove('hidden');
        document.getElementById('target-name').textContent = currentTarget.name;
        document.getElementById('target-trait').style.display = 'inline-block';
        document.getElementById('target-trait').textContent = currentTarget.trait;
    }, 500);

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

    if (currentTarget.trust >= currentTarget.maxTrust) {
        // Feature 1 & 4: 즉시 획득 + 노란 테두리
        currentTarget.isUnlocked = true;
        currentTarget.isRecruited = true;

        // Feature 4 추가: 섭외 성공 시 디렉터 멘탈 100% 회복
        currentManagerHp = managerBaseStats.maxHp;
        updateManagerHpUI();
        showFloatingText('MENTAL RECOVERED!!', '#22c55e');

        // Advance Stage and Unlock Next (미섭외 캐릭터를 찾아 건너뜀)
        updateCurrentStageIndex();

        // 즉시 UI 갱신 (슬라이더 및 맵)
        refreshSlider();
        renderGauntlet();

        // Phase 11.2: Award Title based on attempts
        const q = quests[currentTarget.id];
        if (q) {
            let awardedTitle = "";
            if (currentTarget.attempts === 0) awardedTitle = q.titles[0];
            else if (currentTarget.attempts === 1) awardedTitle = q.titles[1];
            else awardedTitle = q.titles[2];

            currentTarget.achievedTitle = awardedTitle;

            // UI Update: Mission Success Effect
            const successEl = document.createElement('div');
            successEl.className = 'mission-success-text';
            successEl.textContent = 'MISSION SUCCESS!!';
            document.body.appendChild(successEl);
            setTimeout(() => successEl.remove(), 2500);

            // UI Update: Recording Title above character name
            const titleDisplay = document.getElementById('target-achieved-title');
            if (titleDisplay) {
                titleDisplay.textContent = awardedTitle;
                titleDisplay.style.display = 'block';
                titleDisplay.style.animation = 'fadeIn 1s';
            }

            addMessage(`[미션 성공] 타이틀 '${awardedTitle}'을(를) 획득했습니다!`, 'ai', true);
        }

        addMessage(`[경축] ${currentTarget.name} 캐릭터를 전적으로 섭외했습니다!`, 'ai', true);

        // Feature 4: 노란 테두리
        document.querySelectorAll('.face-icon').forEach((el, i) => {
            if (characters[i].id === currentTarget.id) {
                el.classList.add('unlocked');
                el.classList.add('recruited');
            }
        });

        // 캐릭터별 마무리 대사 (이미지 전환 후 약 10초간 연출)
        const recruitedOutros = {
            'jang': [
                currentTarget.recruitedGreeting,
                "...흥, 제법이군. 이 몸의 무력을 담기엔 이 에테르가드도 좁을지 모르지.",
                "네놈의 배짱 하나는 인정하마. 지루하게 만들지 마라!",
                "자, 다음 판은 어디냐? 내 분노를 쏟을 곳을 안내해라!"
            ],
            'seola': [
                currentTarget.recruitedGreeting,
                "...제 계산에 없던 변수가 승리를 이끌었군요.",
                "완벽한 설계와 당신이라는 변수... 꽤 흥미로운 조합이 될 것 같습니다.",
                "에테르가드의 코어는 이제 제 통제하에 있습니다. 안심하시길."
            ],
            'kwan': [
                currentTarget.recruitedGreeting,
                "...어머, 제 마음의 리듬을 맞춘 건 당신이 처음이에요.",
                "에테르가드의 무대는 이미 준비되었답니다. 제 춤에 매료될 준비 되셨나요?",
                "후후, 당신 곁에 있으면 지루할 틈이 없겠어요."
            ],
            'yuna': [
                currentTarget.recruitedGreeting,
                "...이 떨림이 '희망'인가요. 진심으로 믿어보고 싶어졌어요.",
                "빈민가의 아이들도, 억압받는 자들도... 이제야 웃을 수 있겠군요.",
                "낙원을 향한 여정, 끝까지 당신과 함께하겠습니다."
            ],
            'sora': [
                currentTarget.recruitedGreeting,
                "...패왕의 길을 이해하는 자를 만났군요. 만족스럽습니다.",
                "에테르가드의 진짜 가치는 이제 제가 증명해 보이죠.",
                "절 실망시키지 마십시오. 당신의 야망이 어디까지 닿는지 지켜보겠습니다."
            ]
        };

        const outroLines = recruitedOutros[currentTarget.id] || [currentTarget.recruitedGreeting];

        // 영입 이미지로 전환
        updateCharacterImage();

        // 마무리 대사를 2~3초 간격으로 순차 출력 (총 약 10초)
        let delay = 1000;
        outroLines.forEach((line, i) => {
            setTimeout(() => {
                const charName = currentTarget ? currentTarget.name.split(' (')[0] : 'AI';
                const statusTexts = [`[${charName} 님이 생각 중입니다...]`, `[${charName} 님이 메시지를 입력하고 있습니다...]`];
                const statusMsg = addMessage(statusTexts[i % 2], 'ai', true);
                statusMsg.style.fontStyle = 'italic';
                statusMsg.style.opacity = '0.7';
                setTimeout(() => {
                    statusMsg.remove();
                    addMessage(line, 'ai');
                }, 1500);
            }, delay);
            delay += 2800; // 각 대사마다 2.8초 간격
        });

        // 모든 대사 완료 후 가운틀렛(스테이지 선택) 화면으로 이동
        const totalOutroTime = delay + 1000;
        const outroCharId = currentTarget.id;

        setTimeout(() => {
            if (currentTarget && currentTarget.id !== outroCharId) return;

            currentTarget = null;
            pendingBriefingChar = null;

            document.getElementById('phase-combat-ui').classList.add('hidden');
            document.getElementById('phase-trust-ui').classList.add('hidden');
            document.getElementById('quest-overlay').classList.add('hidden');
            document.querySelectorAll('.face-icon').forEach(el => el.classList.remove('active'));

            clearChatMessages();
            updateCurrentStageIndex();
            refreshSlider();

            characters.forEach(ch => { ch.trust = Math.floor(ch.trust / 2); });

            renderGauntlet();
            document.body.classList.add('show-gauntlet');
        }, totalOutroTime);
    } else {
        // 섭외 실패
        currentTarget.hasFailedBefore = true;
        currentTarget.attempts++;
    }

    // 섭외 실패 시 전투 UI 복원
    if (currentTarget && !currentTarget.isRecruited) {
        document.getElementById('phase-combat-ui').classList.remove('hidden');
        document.getElementById('phase-trust-ui').classList.add('hidden');
        updateCharacterImage();
        currentTarget.currentHp = currentTarget.stats.hp;
        updateUIGauges();
    }
}

function updateUIGauges() {
    if (!currentTarget) return;
    const hpPct = (currentTarget.currentHp / currentTarget.stats.hp) * 100;
    const trPct = (currentTarget.trust / currentTarget.maxTrust) * 100;
    const playerHpPct = (currentManagerHp / managerBaseStats.maxHp) * 100;

    // Phase 1 Bars (Combat)
    const phaseCombatUIs = document.getElementById('phase-combat-ui');
    const enemyHpFill = document.getElementById('hp-fill');
    const playerHpFill = document.getElementById('player-hp-fill');

    if (enemyHpFill) enemyHpFill.style.width = `${hpPct}%`;
    if (playerHpFill) playerHpFill.style.width = `${playerHpPct}%`;

    // Phase 2 Bars (Trust)
    const phaseTrustUIs = document.getElementById('phase-trust-ui');
    const trFill = document.getElementById('trust-fill');
    if (trFill) trFill.style.width = `${trPct}%`;

    // UI 가시성 보정 (재입장 시 등을 고려)
    if (currentTarget.isRecruited) {
        if (phaseCombatUIs) phaseCombatUIs.classList.add('hidden');
        if (phaseTrustUIs) phaseTrustUIs.classList.remove('hidden');
    } else {
        if (phaseCombatUIs && !isMentalBreak) phaseCombatUIs.classList.remove('hidden');
        // Trust UI는 Mental Break 때만 나중에 켜짐 (다른 함수에서 처리)
    }

    // Vignette logic (Low HP Warning)
    const vignette = document.getElementById('vignette');
    if (vignette) {
        if (playerHpPct < 30) {
            vignette.classList.add('vignette-active');
        } else {
            vignette.classList.remove('vignette-active');
        }
    }
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
    // 텍스트에서 가장 많은 키워드가 포함된 스킬을 찾거나,
    // #태그 형식이 포함된 경우 해당 스킬을 우선순위로 둡니다.
    let bestSkill = null;
    let maxMatches = 0;

    for (const s of skills) {
        let matches = 0;
        // #태그 매칭 (우선순위 높음)
        if (text.includes(`#${s.name}`) || text.includes(`#${s.id}`)) {
            return s;
        }

        // 키워드 매칭
        for (const k of s.keywords) {
            if (text.includes(k)) {
                matches++;
            }
        }

        if (matches > maxMatches) {
            maxMatches = matches;
            bestSkill = s;
        }
    }
    return bestSkill;
}

function startTrustDecay() {
    setInterval(() => {
        characters.forEach(char => {
            if (char.isUnlocked && char.trust > 0) {
                char.trust = Math.max(0, char.trust - CONFIG.TRUST_DECAY_AMOUNT);

                // 현재 보고 있는 캐릭터인 경우 UI/이미지 갱신
                if (currentTarget === char) {
                    updateUIGauges();
                    updateCharacterImage();

                    // 신뢰도 하락 경고 메시지 (채팅 중일 때)
                    if (char.isRecruited) {
                        const trustPct = char.trust / char.maxTrust;
                        if (char.trust === 0) {
                            addMessage(`[시스템] ${char.name}의 신뢰도가 바닥을 쳤습니다. 멘탈이 붕괴되었습니다!`, 'ai', true);
                        } else if (trustPct < 0.3) {
                            addMessage(`[경고] ${char.name}의 신뢰도가 위험 수준입니다. 빨리 대화하여 신뢰를 회복하세요!`, 'ai', true);
                        }
                    }
                }
            }
        });
    }, CONFIG.TRUST_DECAY_INTERVAL);
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
    setTimeout(() => div.remove(), 800);
}

function shakeScreen(intensity) {
    const workspace = document.querySelector('.main-workspace');
    workspace.style.animation = 'none';
    setTimeout(() => {
        workspace.style.animation = `vibrate 0.1s infinite`;
        setTimeout(() => workspace.style.animation = 'none', 300);
    }, 10);
}

function triggerCriticalFlash() {
    const flash = document.createElement('div');
    flash.className = 'qte-critical-flash';
    document.body.appendChild(flash);
    setTimeout(() => {
        flash.style.opacity = '0.8';
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 300);
        }, 100);
    }, 10);
}

async function triggerSlotMachineEffect(targetSkillId) {
    const skillItems = document.querySelectorAll('.skill-item');
    const totalSkills = skills.length;

    // Reset highlights
    skillItems.forEach(item => item.classList.remove('active-slot', 'slot-rolling'));

    // "Rolling" animation: highlight each slot in sequence
    let rollingDelay = 80;
    const rollingFullCycles = 2; // Full passes through slots

    for (let c = 0; c < rollingFullCycles; c++) {
        for (let i = 0; i < totalSkills; i++) {
            const currentItem = document.getElementById(`skill-${skills[i].id}`);
            currentItem.classList.add('slot-rolling');
            await new Promise(r => setTimeout(r, rollingDelay));
            currentItem.classList.remove('slot-rolling');
        }
    }

    // Settling on the target
    const targetIdx = skills.findIndex(s => s.id === targetSkillId);
    for (let i = 0; i <= targetIdx; i++) {
        const currentItem = document.getElementById(`skill-${skills[i].id}`);
        currentItem.classList.add('slot-rolling');
        await new Promise(r => setTimeout(r, rollingDelay));
        if (i < targetIdx) currentItem.classList.remove('slot-rolling');
    }

    // Final selection
    const finalItem = document.getElementById(`skill-${targetSkillId}`);
    finalItem.classList.remove('slot-rolling');
    finalItem.classList.add('active-slot');

    await new Promise(r => setTimeout(r, 400));
}

function startCooldownUI(skill) {
    const slot = document.getElementById(`skill-${skill.id}`);
    const overlay = slot.querySelector('.cooldown-overlay');
    const duration = skill.cooldown;
    let start = Date.now();

    overlay.style.height = '100%';

    const tick = setInterval(() => {
        const elapsed = Date.now() - start;
        const progress = Math.max(0, 100 - (elapsed / duration) * 100);
        overlay.style.height = `${progress}%`;

        if (elapsed >= duration) {
            clearInterval(tick);
            overlay.style.height = '0%';
            slot.classList.remove('active-slot');
        }
    }, 50);
}

let isDirectSkillClick = false; // 스킬 슬롯 직접 클릭 플래그

function handleSkillSlotClick(skillId) {
    if (!currentTarget || isQTEActive) return;
    const skill = skills.find(s => s.id === skillId);
    if (!skill) return;

    isDirectSkillClick = true; // 직접 클릭 표시
    const input = document.getElementById("chat-input");
    input.value = `#${skill.name}`;
    handleSend();
}

document.querySelectorAll(".skill-item").forEach(item => {
    const skillId = item.id.replace("skill-", "");
    item.addEventListener("click", () => handleSkillSlotClick(skillId));
    item.style.cursor = "pointer";
});

// 신규 유틸리티 함수: 상태별 이미지 업데이트 및 전투 플래시 (Restored)
function updateCharacterImage() {
    if (!currentTarget) return;
    let imgPath = currentTarget.images.normal;

    if (currentTarget.isRecruited) {
        // 섭외 완료된 캐릭터: 신뢰도가 0이면 멘탈 붕괴(break), 아니면 recruited 이미지
        if (currentTarget.trust === 0) {
            imgPath = currentTarget.images.break;
        } else {
            imgPath = currentTarget.images.recruited;
        }
    } else if (isMentalBreak) {
        imgPath = currentTarget.images.break;
    }

    document.getElementById('character-bg').style.backgroundImage = `url('${imgPath}')`;
}

function triggerCharacterFlash(type) {
    const bg = document.getElementById('character-bg');
    const flashClass = type === 'hit' ? 'flash-hit' : 'flash-attack';

    bg.classList.remove('flash-hit', 'flash-attack');
    void bg.offsetWidth; // Trigger reflow for animation restart
    bg.classList.add(flashClass);
    setTimeout(() => bg.classList.remove(flashClass), 500);
}

/**
 * 미섭외 캐릭터 클릭 시 경고 모달 표시 함수
 * - 스테이지 메시지 스타일의 경고창
 * - 확인: 공격력 50% 패널티로 입장
 * - 취소: 모달 닫기
 */
function showUnrecruitedWarning(char, icon) {
    // 기존 경고 모달 제거
    const existingModal = document.getElementById('unrecruited-warning-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'unrecruited-warning-modal';
    modal.className = 'unrecruited-warning-overlay';
    modal.innerHTML = `
        <div class="unrecruited-warning-box">
            <div class="unrecruited-warning-icon">⚠️</div>
            <h3 class="unrecruited-warning-title">경고</h3>
            <p class="unrecruited-warning-msg">
                <strong>${char.name}</strong>은(는) 아직 섭외되지 않은 캐릭터입니다.<br><br>
                미섭외 상태로 입장하면<br>
                <span class="warning-highlight">공격력이 50% 하락</span>한 상태로 진행됩니다.<br><br>
                그래도 입장하시겠습니까?
            </p>
            <div class="unrecruited-warning-buttons">
                <button id="unrecruited-confirm-btn" class="warning-btn warning-confirm">확인</button>
                <button id="unrecruited-cancel-btn" class="warning-btn warning-cancel">취소</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 확인 버튼: 입장 진행
    document.getElementById('unrecruited-confirm-btn').onclick = () => {
        modal.remove();
        selectCharacter(char, icon);
    };

    // 취소 버튼: 닫기
    document.getElementById('unrecruited-cancel-btn').onclick = () => {
        modal.remove();
    };

    // 모달 외부 클릭 시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}
// 신규: 현재 전투 중단 로직 (재사용성)
function cancelCurrentCombat() {
    currentTarget = null;
    pendingBriefingChar = null;

    document.getElementById('phase-combat-ui').classList.add('hidden');
    document.getElementById('phase-trust-ui').classList.add('hidden');
    document.getElementById('quest-overlay').classList.add('hidden');
    document.querySelectorAll('.face-icon').forEach(el => el.classList.remove('active'));

    clearChatMessages();
    document.querySelector('.main-workspace').classList.remove('mental-break');

    // 로비가 보이지 않도록 함
    const lobbyWs = document.getElementById('lobby-target-workspace');
    if (lobbyWs) lobbyWs.classList.add('hidden');
}

// 신규: 캐릭터 관리 모달 오픈 및 데이터 세팅
function openCharacterManagement(char) {
    document.getElementById('mgmt-avatar').textContent = char.avatar;
    document.getElementById('mgmt-name').textContent = char.name;
    document.getElementById('mgmt-trait').textContent = char.trait;

    // 스탯 표시
    document.getElementById('mgmt-hp').textContent = char.stats.hp;
    document.getElementById('mgmt-atk').textContent = char.stats.atk;
    document.getElementById('mgmt-def').textContent = char.stats.def;
    document.getElementById('mgmt-acc').textContent = char.stats.acc;
    document.getElementById('mgmt-crt').textContent = char.stats.crt;

    document.getElementById('mgmt-synopsis').textContent = char.synopsis || "정보가 없습니다.";

    const setRepBtn = document.getElementById('btn-mgmt-set-rep');
    setRepBtn.onclick = () => {
        setRepresentative(char);
        document.getElementById('character-management-modal').classList.add('hidden');
    };

    const modal = document.getElementById('character-management-modal');
    modal.classList.remove('hidden');

    const closeBtn = document.getElementById('close-management-modal');
    closeBtn.onclick = () => {
        modal.classList.add('hidden');
    };

    window.onclick = (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    };
}

// =============================================
// TUTORIAL / COACH MARK SYSTEM
// =============================================

const TUTORIAL_STEPS = [
    {
        targetId: 'gauntlet-map',
        title: '🗺️ 스테이지 맵',
        desc: '게임의 핵심! 5개의 스테이지가 있으며, 순서대로 캐릭터를 클릭해 전투에 입장하세요. 금색 테두리 스테이지가 현재 진행 가능한 목표입니다.',
        position: 'bottom'
    },
    {
        targetId: 'face-icons',
        title: '👥 캐릭터 슬라이더',
        desc: '왼쪽 사이드바에는 캐릭터 아이콘이 있습니다. 클릭하면 시놉시스를 확인하거나 섭외된 캐릭터의 스탯을 관리할 수 있습니다.',
        position: 'right'
    },
    {
        targetId: 'btn-stage-map',
        title: '🗺️ 맵 버튼',
        desc: '이 버튼을 클릭하면 언제든지 스테이지 맵으로 돌아올 수 있습니다.',
        position: 'right'
    },
    {
        targetId: 'phase-combat-ui',
        title: '⚔️ 전투 게이지',
        desc: '전투 중에는 상단에 DIRECTOR(나)와 TARGET(적)의 HP 게이지가 표시됩니다. 상대의 HP를 0으로 만들면 멘탈 브레이크 상태로 전환됩니다!',
        position: 'bottom'
    },
    {
        targetId: 'skill-slots',
        title: '🔮 스킬 슬롯',
        desc: '5가지 속성 스킬(무력·논파·통찰·동화·심연)이 있습니다. 채팅 입력 시 자동으로 발동되거나, 직접 클릭해 특정 스킬을 사용할 수 있습니다. 쿨타임에 주의하세요!',
        position: 'top'
    },
    {
        targetId: 'fp-toggle-btn',
        title: '🔥 발화점 시스템',
        desc: '발화점(FP)을 사용하면 공격력이 최대 8배까지 증가합니다! 적의 스테이지가 높을수록 소비량이 커지니 전략적으로 사용하세요.',
        position: 'top'
    },
    {
        targetId: 'chat-input',
        title: '💬 채팅 입력창',
        desc: '이곳에 메시지를 입력해 상대를 설득하세요. 입력한 텍스트의 키워드에 따라 스킬이 자동 발동됩니다. 같은 말을 반복하면 효과가 줄어드니 다양하게 시도하세요!',
        position: 'top'
    }
];

let coachStepIndex = 0;
let prevHighlightEl = null;

function startTutorial() {
    coachStepIndex = 0;
    showCoachStep(0);
}

function showCoachStep(idx) {
    const steps = TUTORIAL_STEPS;

    // 이전 하이라이트 제거
    if (prevHighlightEl) {
        prevHighlightEl.classList.remove('coach-highlight');
        prevHighlightEl.style.position = '';
        prevHighlightEl.style.zIndex = '';
        prevHighlightEl = null;
    }

    if (idx >= steps.length) {
        endTutorial();
        return;
    }

    const step = steps[idx];

    // 1~3단계→ 가운틀렛 화면 보이기, 4~7단계→ 메인 화면 보이기
    if (idx <= 2) {
        document.body.classList.add('show-gauntlet');
    } else {
        document.body.classList.remove('show-gauntlet');
    }

    const targetEl = document.getElementById(step.targetId);

    // 오버레이 표시
    const overlay = document.getElementById('coach-overlay');
    overlay.classList.remove('hidden');

    // 툴팁 채우기
    const tooltip = document.getElementById('coach-tooltip');
    document.getElementById('coach-step-num').textContent = `${idx + 1} / ${steps.length}`;
    document.getElementById('coach-title').textContent = step.title;
    document.getElementById('coach-desc').textContent = step.desc;

    // 마지막 단계는 버튼 텍스트 변경
    const nextBtn = document.getElementById('coach-next-btn');
    nextBtn.textContent = idx === steps.length - 1 ? '완료 ✓' : '다음 →';

    // 하이라이트
    if (targetEl) {
        prevHighlightEl = targetEl;
        targetEl.classList.add('coach-highlight');
        targetEl.style.position = 'relative';
        targetEl.style.zIndex = '40001';

        // 툴팁 위치 계산 (requestAnimationFrame으로 렌더 후 측정)
        requestAnimationFrame(() => {
            const rect = targetEl.getBoundingClientRect();
            tooltip.classList.remove('hidden');

            const MARGIN = 14;
            const TTW = 320;
            const TTH = tooltip.offsetHeight || 160;

            let top, left;
            if (step.position === 'bottom') {
                top = rect.bottom + MARGIN;
                left = rect.left + rect.width / 2 - TTW / 2;
            } else if (step.position === 'top') {
                top = rect.top - TTH - MARGIN;
                left = rect.left + rect.width / 2 - TTW / 2;
            } else if (step.position === 'right') {
                top = rect.top + rect.height / 2 - TTH / 2;
                left = rect.right + MARGIN;
            } else {
                top = rect.bottom + MARGIN;
                left = rect.left;
            }

            // 화면 밖 넘침 보정
            left = Math.max(10, Math.min(left, window.innerWidth - TTW - 10));
            top = Math.max(10, Math.min(top, window.innerHeight - TTH - 10));

            tooltip.style.transform = '';
            tooltip.style.top = top + 'px';
            tooltip.style.left = left + 'px';
        });
    } else {
        // 대상 요소가 없으면 중앙에 표시
        tooltip.classList.remove('hidden');
        tooltip.style.top = '50%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translate(-50%, -50%)';
    }
}

function endTutorial() {
    // 하이라이트 제거
    if (prevHighlightEl) {
        prevHighlightEl.classList.remove('coach-highlight');
        prevHighlightEl.style.position = '';
        prevHighlightEl.style.zIndex = '';
        prevHighlightEl = null;
    }
    document.getElementById('coach-overlay').classList.add('hidden');
    document.getElementById('coach-tooltip').classList.add('hidden');
    document.getElementById('coach-tooltip').style.transform = '';

    // 완료 기록
    localStorage.setItem('eg_tutorial_done', '1');
}

function initTutorial() {
    const introModal = document.getElementById('tutorial-intro-modal');

    // 이미 튜토리얼을 완료한 경우 건너뜀
    if (localStorage.getItem('eg_tutorial_done') === '1') {
        introModal.classList.add('hidden');
        return;
    }

    // 첫 방문 시 모달 표시 (visible)
    introModal.classList.remove('hidden');
    // modal-overlay는 기본 opacity:0, visibility:hidden 이므로 직접 표시
    introModal.style.opacity = '1';
    introModal.style.visibility = 'visible';

    document.getElementById('tutorial-yes-btn').onclick = () => {
        introModal.style.opacity = '0';
        introModal.style.visibility = 'hidden';
        setTimeout(() => introModal.classList.add('hidden'), 300);
        startTutorial();
    };

    document.getElementById('tutorial-no-btn').onclick = () => {
        introModal.style.opacity = '0';
        introModal.style.visibility = 'hidden';
        setTimeout(() => introModal.classList.add('hidden'), 300);
        localStorage.setItem('eg_tutorial_done', '1');
    };

    // 코치마크 버튼 이벤트
    document.getElementById('coach-next-btn').onclick = () => {
        coachStepIndex++;
        showCoachStep(coachStepIndex);
    };

    document.getElementById('coach-skip-btn').onclick = () => {
        endTutorial();
    };
}
