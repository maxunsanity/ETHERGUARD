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
        images: {
            normal: 'yuna_normal.png',
            break: 'yuna_break.png',
            recruited: 'yuna_recruited.png'
        },
        bg: 'yuna_normal.png',
        archetype: '공감하는 리더', props: ['HEART', 'BODY'],
        stats: { atk: 320, acc: 300, crt: 150, def: 100, hp: 12000 },
        maxTrust: 36000, trust: 0, isUnlocked: true, isRecruited: false, hasFailedBefore: false, hasSeenSynopsis: false,
        attempts: 0, achievedTitle: null,
        synopsis: '평범하고 성실한 학생회장이었으나, 어느 날부터 길 잃은 약자들을 모두 구원해야 한다는 맹목적인 대의(유비의 이상)에 사로잡혀 극심한 책임감과 피로에 짓눌려 있습니다.',
        introMonologues: [
            "모두를 이끌어야 한다는 목소리가 머릿속에서 울려퍼져요...",
            "이 도시(에테르가드)의 지독한 어둠...",
            "흑, 제가 그 모든 것들을 안아낼 수 있을까요?"
        ],
        recruitedGreeting: '디렉터님과 함께라면 무너지지 않을 수 있어요. 이 에테르가드를 과거의 한족(漢族)이 꿈꿨던 것처럼 따뜻한 내 나라로 만들어 곁에서 돕겠습니다.',
        failedGreeting: '또 오셨군요... 이번에는 좀 더 진심을 보여주실 건가요?'
    },
    {
        id: 'kwan', name: '민주 (관우)', trait: '과묵·검도부', avatar: '🗡️',
        images: {
            normal: 'kwan_normal.png',
            break: 'kwan_break.png',
            recruited: 'kwan_recruited.png'
        },
        bg: 'kwan_normal.png',
        archetype: '직관적인 통찰가', props: ['LOGIC', 'MYSTIC'],
        stats: { atk: 352, acc: 220, crt: 110, def: 220, hp: 13200 },
        maxTrust: 39600, trust: 0, isUnlocked: false, isRecruited: false, hasFailedBefore: false, hasSeenSynopsis: false,
        attempts: 0, achievedTitle: null,
        synopsis: '과묵한 검도부원이었으나, 누군가를 위해 자신의 목을 바칠 만큼의 맹목적인 신의와 죽음에 대한 환영(관우의 최후)에 시달려 타인에게 곁을 주지 않고 날을 세우고 있습니다.',
        introMonologues: [
            "...다가오지 마라.",
            "이 시대의 얄팍한 배신에...",
            "내 푸른 언월도가 더는 피를 묻히고 싶지 않다."
        ],
        recruitedGreeting: '당신의 눈빛에서 지난날의 주군이 겹쳐 보였네. 에테르가드의 전장은 이제 내 검이 베어낼 테니, 디렉터는 앞만 보고 나아가시오.',
        failedGreeting: '또 왔는가... 진심이 아닌 말에는 검으로 답하겠다.'
    },
    {
        id: 'jang', name: '지희 (장비)', trait: '활발·스트릿', avatar: '🔥',
        images: {
            normal: 'jang_normal.png',
            break: 'jang_break.png',
            recruited: 'jang_recruited.png'
        },
        bg: 'jang_normal.png',
        archetype: '독불장군 투사', props: ['BODY'],
        stats: { atk: 384, acc: 180, crt: 60, def: 60, hp: 14400 },
        maxTrust: 43200, trust: 0, isUnlocked: false, isRecruited: false, hasFailedBefore: false, hasSeenSynopsis: false,
        attempts: 0, achievedTitle: null,
        synopsis: '피가 끊고 활발한 스트릿 댄서였으나, 과거 배신당해 죽음을 맞이한 기억과 주체할 수 없는 분노, 그리고 형을 잃은 슬픔이 엉켜 걸핏하면 주먹부터 나가는 트러블 메이커가 되었습니다.',
        introMonologues: [
            "아 젠장, 다 때려부수고 싶어!!",
            "뭐? 매니저?",
            "시끄럽고, 내 주먹부터 피해보라고!"
        ],
        recruitedGreeting: '히히, 보스 꽤 맘에 드는데? 앞으로 내 등은 보스가 지켜! 네 길을 막는 놈들은 장팔사모 대신 내 맨주먹으로 다 날려줄 테니까!',
        failedGreeting: '뭐야 또 왔어? 지난번엔 좀 실망이었는데... 이번엔 제대로 해봐!'
    },
    {
        id: 'sora', name: '소라 (조조)', trait: '냉철·엘리트', avatar: '🍷',
        images: {
            normal: 'sora_normal.png',
            break: 'sora_break.png',
            recruited: 'sora_recruited.png'
        },
        bg: 'sora_normal.png',
        archetype: '냉혹한 전략가', props: ['LOGIC', 'BODY'],
        stats: { atk: 416, acc: 300, crt: 260, def: 180, hp: 15600 },
        maxTrust: 46800, trust: 0, isUnlocked: false, isRecruited: false, hasFailedBefore: false, hasSeenSynopsis: false,
        attempts: 0, achievedTitle: null,
        synopsis: '완벽을 추구하는 엘리트. 그러나 최근 내면에서 끓어오르는 압도적인 지배욕과, 세상이 자신을 버리기 전에 먼저 천하를 쥐어야 한다는 편집증(조조의 야망) 때문에 위태로운 행보를 걷고 있습니다.',
        introMonologues: [
            "이 도시의 시스템은 어설프기 짝이 없군요.",
            "힘 없는 자가 지배하는 세상은 제가 허락하지 않습니다.",
            "당신의 자격부터 묻죠."
        ],
        recruitedGreeting: '후후, 제 오만한 야망마저 품어내는 그릇이라... 좋습니다. 당신의 패업(覇業)을 위해, 제 냉혹한 두뇌를 에테르가드의 가장 날카로운 검으로 바치죠.',
        failedGreeting: '또 찾아왔군요. 지난번 논리는 매우 실망스러웠는데, 발전이 있기를.'
    },
    {
        id: 'seola', name: '설아 (제갈량)', trait: '천재·사서', avatar: '📖',
        images: {
            normal: 'seola_bg.png',
            break: 'seola_bg.png',
            recruited: 'seola_bg.png'
        },
        bg: 'seola_bg.png',
        archetype: '철두철미한 분석가', props: ['LOGIC'],
        stats: { atk: 448, acc: 380, crt: 320, def: 120, hp: 16800 },
        maxTrust: 50400, trust: 0, isUnlocked: false, isRecruited: false, hasFailedBefore: false, hasSeenSynopsis: false,
        attempts: 0, achievedTitle: null,
        synopsis: '천재적인 도서관의 사서. 하지만 오장원에서 스러져간 미완의 꿈, 완벽한 계책을 짜고도 천명을 이기지 못한 무력감에 휩싸여 끝없는 시뮬레이션 속으로 도피 중입니다.',
        introMonologues: [
            "결국 모든 수창은 변수에 무너지기 마련입니다.",
            "당신의 어설픈 설득 확률도...",
            "제 계산에선 이미 0에 수렴하고 있어요."
        ],
        recruitedGreeting: '천명조차 비틀어버리는 당신의 불확실성에... 제 남은 생을 걸어보고 싶어졌습니다. 에테르가드의 새로운 진법은 제가 설계하겠습니다.',
        failedGreeting: '다시 오셨군요... 지난번 대화의 논리적 허점은 개선되었나요?'
    }
];

const quests = {
    'yuna': {
        description: "학생회장의 무거운 책임을 덜어주고, 그녀를 에테르가드의 리더로 영입하세요.",
        hint: "그녀의 성실함과 학생회장으로서의 무게를 공감하며, #위로나 #공감 키워드로 마음의 벽을 허무세요.",
        titles: ["유나의 유일한 이해자", "유나의 신뢰받는 조언자", "학생회의 든든한 후원자"]
    },
    'kwan': {
        description: "관우에게 적토마(현대식 스포츠카) 선물을 받도록 설득하라.",
        hint: "무력보다는 #명분과 #신의를 강조하고, 유비(유나)와의 재회를 돕겠다는 약속으로 설득하세요.",
        titles: ["관우의 첫사랑(?)", "관우의 신뢰받는 자", "관우의 비즈니스 파트너"]
    },
    'jang': {
        description: "장비의 분노를 잠재우고 그녀의 압도적인 무력을 에테르가드에 보태게 하세요.",
        hint: "주먹보다 앞서는 #호탕함에 맞서 #공감보다는 #무력이나 #도발로 그녀의 야성을 깨우고 친구가 되세요.",
        titles: ["장비의 의형제", "지희의 베스트 프렌드", "스트릿의 동료"]
    },
    'sora': {
        description: "조조의 야망을 에테르가드의 평화로 승화시키세요.",
        hint: "논리적 우월함을 인정하되, #지배보다는 #대의를 강조하고 #결단력 있는 모습으로 그녀의 야망을 자극하세요.",
        titles: ["치세의 능신", "조조의 최측근 전략가", "엘리트 파트너"]
    },
    'seola': {
        description: "제갈량의 완벽한 계산 속에 당신이라는 변수를 심으세요.",
        hint: "천재적인 #논리를 무너뜨리기보다, 당신이라는 예측 불가능한 #인연과 #운명의 변수를 강조해 호기심을 유발하세요.",
        titles: ["수어지교(수어지교)", "설아의 계산된 변수", "도서관의 방문객"]
    }
};

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
let selectedFpCount = 0; // 기본값: 사용안함(OFF)

let comboCount = 0;
let lastHitTime = 0;
let repeatMap = new Map();
let isMentalBreak = false;
let breakTimerFunc = null;

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
            { text: "#진정_요구", score: 50, msg: "조용히 하라고? 으씨... 알았어, 한 번 더 들어는 볼게." },
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
});

function initUI() {
    const slider = document.getElementById('face-icons');
    characters.forEach(char => {
        const icon = document.createElement('div');
        icon.className = 'face-icon';
        icon.dataset.id = char.id; // Add data-id for selection logic
        if (char.isUnlocked) icon.classList.add('unlocked');
        if (char.isRecruited) icon.classList.add('recruited'); // Add recruited class if already recruited

        // 아이콘을 배경 이미지로 채움
        if (char.images && char.images.normal) {
            icon.style.backgroundImage = `url('${char.images.normal}')`;
        } else {
            icon.innerHTML = `<span style="font-size: 20px;">${char.avatar}</span>`;
        }

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

    // Synergy Modal Handlers
    const synergyBtn = document.getElementById('btn-synergy');
    const synergyBtnVs = document.getElementById('btn-synergy-vs');
    const synergyModal = document.getElementById('synergy-modal');
    const closeSynergyBtn = document.getElementById('close-synergy-modal');

    const openSynergy = () => synergyModal.classList.remove('hidden');

    if (synergyBtn && synergyModal && closeSynergyBtn) {
        synergyBtn.onclick = openSynergy;
        if (synergyBtnVs) synergyBtnVs.onclick = openSynergy;

        closeSynergyBtn.onclick = () => synergyModal.classList.add('hidden');
        synergyModal.onclick = (e) => {
            if (e.target === synergyModal) {
                synergyModal.classList.add('hidden');
            }
        };
    }

    refreshTags();

    // Quest Overlay Handler
    const questStartBtn = document.getElementById('quest-start-btn');
    if (questStartBtn) {
        questStartBtn.onclick = () => {
            document.getElementById('quest-overlay').classList.add('hidden');
            // Re-enable chat after briefcase is read
            document.getElementById('chat-input').disabled = false;
            document.getElementById('send-btn').disabled = false;
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
    document.querySelectorAll('.face-icon').forEach(el => el.classList.remove('active'));
    if (icon) icon.classList.add('active');

    currentTarget = char;
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

    // Phase 1: 시놉시스 모달창 출력 확인
    if (!char.isRecruited && !char.hasSeenSynopsis) {
        // 채팅창 비활성화
        document.getElementById('chat-input').disabled = true;
        document.getElementById('send-btn').disabled = true;

        // 시놉시스 모달 띄우기
        document.getElementById('synopsis-title').textContent = `SYSTEM: 대상 식별 - ${char.name}`;
        document.getElementById('synopsis-text').textContent = char.synopsis;
        document.getElementById('synopsis-modal').classList.remove('hidden');

        // 모달창의 '대화 시작' 버튼 클릭 이벤트 리스너 임시 연결
        const btnStart = document.getElementById('btn-start-chat');
        btnStart.onclick = () => {
            char.hasSeenSynopsis = true;
            document.getElementById('synopsis-modal').classList.add('hidden');
            startCharacterChat(char);
        };
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

        // Phase 11.2: Show Mission Briefing
        showQuestOverlay(char);
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

    // 발화점이 ON(x1, x10, x30, x50, x100) 상태면 무조건 스킬 연출 실행
    const isSpecialAttack = selectedFpCount > 0;

    if (isSpecialAttack) {
        const roulette = document.getElementById('roulette-layer');
        const rouletteItem = document.getElementById('roulette-item');
        roulette.classList.remove('hidden');

        let rouletteSpin = setInterval(() => {
            rouletteItem.textContent = skills[Math.floor(Math.random() * skills.length)].name;
        }, 80);

        await new Promise(r => setTimeout(r, 1200));
        clearInterval(rouletteSpin);

        // 일치하는 키워드가 있으면 스킬명, 없으면 강화 공격 표시
        rouletteItem.textContent = matchedSkill ? matchedSkill.name : "EMPOWERED ATTACK";
        rouletteItem.style.color = 'var(--accent-gold)';

        await new Promise(r => setTimeout(r, 400));
        roulette.classList.add('hidden');
    } else {
        await new Promise(r => setTimeout(r, 600));
    }

    dummy.remove();

    // B. 데미지 계산 및 전투 공식 적용
    const result = calculateDamage(text, matchedSkill);

    if (result.isHit) {
        processCombatHit(result, matchedSkill);
    } else {
        showFloatingText("MISS", "slate");
        comboCount = 0;
        updateComboUI();
    }

    // C. QTE 또는 타겟 반격 (모든 연출 종료 후 실행)
    if (!isMentalBreak && currentTarget.currentHp > 0) {
        // QTE 체크 로직 (여기서 실행되도록 이동)
        turnCount++;
        let isQteTriggered = false;

        // 섭외되지 않은 대상에 대해서만 QTE 발동 (2회 이상 대화 시 40% 확률)
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

function calculateDamage(text, skill) {
    // Current Stats (Base + Supporter Buff)
    const currentAtk = managerBaseStats.atk + (activeSupporter ? activeSupporter.stats.atk * 0.2 : 0);
    const currentAcc = managerBaseStats.acc + (activeSupporter ? activeSupporter.stats.acc * 0.2 : 0);
    const currentCrt = managerBaseStats.crt + (activeSupporter ? activeSupporter.stats.crt * 0.2 : 0);

    // 1. 명중 판정
    const synergy = skill ? getSynergy(skill.id, currentTarget.props) : 1.0;
    const synergyMod = synergy > 1.0 ? 0.5 : (synergy < 1.0 ? 1.5 : 1.0);
    const hitProb = CONFIG.BASE_ACCURACY + (currentAcc * 0.1) - (currentTarget.stats.def * 0.1 * synergyMod);

    // x100(MAX) 사용 시 100% 명중 보장
    const isHit = Math.random() * 100 < hitProb || (selectedFpCount >= 100);
    if (!isHit) return { isHit: false };

    // 2. 데미지 계산
    let baseDmg = currentAtk;
    const critProb = 5 + (currentCrt * 0.1) + (comboCount * CONFIG.COMBO_CRIT_BONUS);
    const isCrit = Math.random() * 100 < critProb;
    const critMultiplier = isCrit ? (selectedFpCount === 100 ? 2.0 : 1.5) : 1.0;

    const fpMods = { 1: 1.5, 10: 2.0, 30: 3.0, 50: 4.5, 100: 8.0 };
    let fpMulti = 1.0;

    // 발화점 보유량 체크
    if (selectedFpCount > 0) {
        if (inventoryFirePoints >= selectedFpCount) {
            fpMulti = fpMods[selectedFpCount] || 1.0;
            inventoryFirePoints -= selectedFpCount;
            document.getElementById('item-count').textContent = inventoryFirePoints;
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

    const finalDmg = Math.floor((baseDmg * fpMulti * critMultiplier * synergy * penalty) - currentTarget.stats.def);
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
            'yuna': [
                currentTarget.recruitedGreeting,
                "...후, 드디어 제대로 된 디렉터를 만났군요.",
                "이제부터는 혼자가 아니에요. 같이 이 도시를 지켜요.",
                "언제든 제게 기대세요. 저도 그럴게요, 디렉터님."
            ],
            'kwan': [
                currentTarget.recruitedGreeting,
                "...오랜만에 등을 맡길 수 있는 기분이로다.",
                "언월도는 녹슬지 않는다. 적이 나타나면 알려라.",
                "이 관운장, 디렉터의 뜻이 닿는 날까지 함께하리라."
            ],
            'jang': [
                currentTarget.recruitedGreeting,
                "야호~!! 이제 진짜 한 팀이다!",
                "다음엔 더 센 놈들이 와도 걱정 마! 내가 다 때려줄게.",
                "보스, 밥은 먹었어? 싸우려면 힘 있어야 한다구!"
            ],
            'sora': [
                currentTarget.recruitedGreeting,
                "…이런 기분이 '안도감'이라는 건가요. 낯설군요.",
                "앞으로 제 두뇌는 당신의 것입니다. 낭비하지 마세요.",
                "실망시키면 용납하지 않을 거예요. 물론, 기대도 하고 있고요."
            ],
            'seola': [
                currentTarget.recruitedGreeting,
                "...흥미롭군요. 제 시뮬레이션엔 없던 결과입니다.",
                "함께라면 제가 넘지 못한 천명을, 이번엔 넘을 수 있을지도 모르겠어요.",
                "앞으로 잘 부탁합니다, 디렉터님. 제 계책은 아낌없이 드리죠."
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

        // 모든 대사 완료 후 다음 캐릭터로 이동 (총 ~10~12초)
        const totalOutroTime = delay + 1000;
        setTimeout(() => {
            const nextTarget = characters.find(c => !c.isRecruited && c !== currentTarget);
            if (nextTarget) {
                const nextIcon = document.querySelector(`.face-icon[data-id="${nextTarget.id}"]`);
                addMessage(`[안내] 섭외 성공! 다음 타겟 ${nextTarget.name}님에게로 이동합니다.`, 'ai', true);
                setTimeout(() => selectCharacter(nextTarget, nextIcon), 1500);
            } else {
                addMessage(`[SYSTEM] ★ MISSION CLEAR ★ 모든 캐릭터를 섭외했습니다!`, 'ai', true);
            }
        }, totalOutroTime);
    } else {
        // Feature 6: 섭외 실패 표시
        currentTarget.hasFailedBefore = true;
        // Phase 11.2: Increment attempts on failure
        currentTarget.attempts++;
    }

    // Reset UI to Phase 1 (Combat) if not recruited, or keep Trust UI if recruited
    if (!currentTarget.isRecruited) {
        document.getElementById('phase-combat-ui').classList.remove('hidden');
        document.getElementById('phase-trust-ui').classList.add('hidden');
    }

    updateCharacterImage();
    currentTarget.currentHp = currentTarget.stats.hp;
    updateUIGauges();
}

function updateUIGauges() {
    if (!currentTarget) return;
    const hpPct = (currentTarget.currentHp / currentTarget.stats.hp) * 100;
    const trPct = (currentTarget.trust / currentTarget.maxTrust) * 100;
    const playerHpPct = (currentManagerHp / managerBaseStats.maxHp) * 100;

    // Phase 1 Bars
    const enemyHpFill = document.getElementById('hp-fill');
    const playerHpFill = document.getElementById('player-hp-fill');

    if (enemyHpFill) enemyHpFill.style.width = `${hpPct}%`;
    if (playerHpFill) playerHpFill.style.width = `${playerHpPct}%`;

    // Phase 2 Bars
    const trFill = document.getElementById('trust-fill');
    if (trFill) trFill.style.width = `${trPct}%`;

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

// 신규 유틸리티 함수: 상태별 이미지 업데이트 및 전투 플래시
function updateCharacterImage() {
    if (!currentTarget) return;
    let imgPath = currentTarget.images.normal;

    if (currentTarget.isRecruited) {
        imgPath = currentTarget.images.recruited;
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
