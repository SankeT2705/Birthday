/**
 * content.ts — Central Content Kit for "Her Shore: For Surabhi, With Love"
 * Completely overhauled with authentic Marathi reflections, Civil Engineering technical principles,
 * the 8 core public service virtues, Bhagavad Gita 2.47 wisdom, 12 life-affirming wishes,
 * and an intimate best friend's letter.
 */

export const HER_NAME = 'Surabhi';
export const HER_FULL_NAME = 'Surabhi';

export const MARATHI_GREETING = 'वाढदिवसाच्या हार्दिक शुभेच्छा सुरभी! ✨';

/* ── Scene 0: The Gate ── */
export const GATE_CONTENT = {
  badge: 'A Birthday Journey',
  title: 'For Surabhi',
  subtitle: 'A quiet, cinematic walk beneath the stars, crafted just for you.',
  prompt: 'प्रवासाला सुरुवात करा',
  hint: 'Best experienced with sound on & in portrait orientation',
};

/* ── Scene 1: Peace (Opening Night Shore) ── */
export const SHORE_CONTENT = {
  headerTitle: 'For Surabhi',
  openingMarathi: 'तुझ्या मनात कितीही मोठी स्वप्नं असली, तरी आजची ही संध्याकाळ फक्त तुझ्यासाठी आहे. थोडं थांब, स्वतःसाठी जग आणि तुझ्या प्रवासाचा आनंद घे.',
  reflectionMarathi: 'काही स्वप्नं मोठी असतात, काही वाटा कठीण असतात. पण त्या प्रवासात स्वतःला जपायला विसरू नकोस.',
  englishQuote: 'Tonight, this calm sea holds space for you to breathe, reflect, and celebrate who you are.',
  instruction: 'Scroll gently to continue your journey',
};

/* ── Scene 2: Memories (5 Authentic Photographs) ── */
export interface MemoryItem {
  id: number;
  photo: string;
  title: string;
  badge: string;
  date: string;
  caption: string;
  tagline: string;
  note: string;
  marathiReflection?: string;
}

export const MEMORY_ITEMS: MemoryItem[] = [
  {
    id: 1,
    photo: '/photos/Surabhi5.png',
    title: 'Golden Grace & Radiance',
    badge: 'Pure Grace',
    date: 'Moments of Quiet Dignity',
    caption: 'Dressed in traditional warmth with effortless, grounded poise.',
    tagline: 'Timeless elegance and royal poise',
    note: 'There is a regal calmness in the way you carry yourself here. Beneath the festive warmth lies a heart that knows its worth, glowing with quiet dignity and authentic elegance.',
    marathiReflection: 'तुझ्यातली ही शांतता आणि सहजता हीच तुझी खरी ओळख आहे.',
  },
  {
    id: 2,
    photo: '/photos/Surabhi4.png',
    title: 'Same Girl, Bigger Dreams',
    badge: 'The Visionary',
    date: 'Mornings of Dedication',
    caption: 'Better habits, brighter future, and an unwavering commitment to learning.',
    tagline: 'Better habits, brighter future, a kinder you',
    note: 'Behind every ambition are quiet mornings, honest fatigue, and the courageous choice to sit down with your books and try once more. Your dedication to your dreams is something I respect deeply.',
    marathiReflection: 'रोजच्या शांत कष्टांमधून स्वतःला घडवणारी तुझी ही जिद्द वाखाणण्याजोगी आहे.',
  },
  {
    id: 3,
    photo: '/photos/Surabhi1.jpg',
    title: 'That Unstoppable Smile',
    badge: 'Warmth & Joy',
    date: 'A Heart That Lights the Room',
    caption: 'A smile that softens even the most demanding days.',
    tagline: 'A smile that effortlessly brightens every room',
    note: 'No matter how intense the preparation or how heavy the world feels, your genuine, infectious smile brings warmth to everyone around you. Never lose this brightness.',
    marathiReflection: 'तुझं हसू हे तुझ्या मनातल्या चांगुलपणाचं आणि सकारात्मकतेचं सुंदर प्रतिबिंब आहे.',
  },
  {
    id: 4,
    photo: '/photos/Surabhi2.jpg',
    title: 'Quiet Strength & Resolve',
    badge: 'Inner Light',
    date: 'Evenings of Contemplation',
    caption: 'Gentle reflection and the steady fire of quiet resolve.',
    tagline: 'Peaceful moments of contemplation',
    note: 'You do not need to shout to prove your strength. It shows in your patience, your humility, and the quiet resolve with which you face every uncertain crossroad.',
    marathiReflection: 'मनातील शांत दृढनिश्चय हीच वादळात तग धरून राहणारी सर्वात मोठी ताकद असते.',
  },
  {
    id: 5,
    photo: '/photos/Surabhi3.jpg',
    title: 'Walking Toward Wide Horizons',
    badge: 'Confidence',
    date: 'Stepping Forward with Faith',
    caption: 'Poised, grounded, and looking steadily ahead.',
    tagline: 'Taking bold steps into wide horizons',
    note: 'Taking confident strides toward your future. The road is long and demands much, but your spirit is larger than any hurdle standing in your way.',
    marathiReflection: 'पावलांत विश्वास आणि डोळ्यांत स्वप्नं असली की प्रत्येक वाट प्रकाशाकडे घेऊन जाते.',
  },
];

/* ── Scene 3: Civil Engineering — "Built on Strong Foundations" ── */
export const ENGINEERING_CONTENT = {
  badge: 'CIVIL ENGINEERING · STRUCTURAL DESIGN',
  title: 'Built on Strong Foundations',
  subtitle: 'The science of structures, the discipline of patience.',
  drawingMeta: {
    sheetNo: 'DWG. NO. CE-SURABHI-2026',
    scale: '1 : 50 / NOT TO SCALE',
    discipline: 'STRUCTURAL ANALYSIS & DESIGN',
    author: 'CIVIL ENGINEER SURABHI',
  },
  principles: [
    {
      id: 'foundation',
      tabLabel: '01 · FOUNDATION',
      heading: 'The Values That Hold You Steady',
      subheading: 'Footing & Reinforcement Analysis · Structural Base',
      marathiQuote: 'मजबूत इमारत उभी राहण्यासाठी पाया भक्कम असावा लागतो. आयुष्यातही प्रामाणिकपणा, संयम आणि स्वतःवरील विश्वास हाच खरा पाया असतो.',
      techAnnotation: 'IS 456:2000 · RAFT & STEPPED ISOLATED FOOTING · BEARING CAPACITY q_a = 280 kN/m²',
      details: [
        'Load Equilibrium: ΣFy = 0 | Uniform Soil Pressure Distribution',
        'Tension Reinforcement: Fe500 High-Yield Steel in Orthogonal Grid',
        'Safety Factor: Deep anchorage protecting against unexpected external loads',
      ],
      emotionalLesson: 'When unseen foundations are strong, no storm can shake the structure you build.',
    },
    {
      id: 'structure',
      tabLabel: '02 · STRUCTURE',
      heading: 'The Strength Built Through Daily Effort',
      subheading: 'Moment-Resisting Frame · Stress Distribution & Shear Paths',
      marathiQuote: 'प्रत्येक दिवस मोठं यश देत नाही; पण प्रत्येक प्रामाणिक प्रयत्न आपल्याला घडवत असतो. स्वतःच्या गतीने पुढे जात राहा.',
      marathiSecondary: 'अभ्यासाच्या प्रत्येक दिवसाचं फळ लगेच दिसेलच असं नाही. तरीही शांतपणे केलेली मेहनत, शिकण्याची तयारी आणि पुन्हा सुरुवात करण्याचं धैर्य कधीच कमी लेखू नकोस.',
      techAnnotation: 'M30 GRADE CONCRETE · MOMENT DISTRIBUTION METHOD · DUCTILE DETAILING',
      details: [
        'Elastic Modulus: High resilience against dynamic and cyclical stress',
        'Balanced Reinforcement: Balancing ambition with internal equilibrium',
        'Load Paths: Every single hour of quiet study transfers into long-term strength',
      ],
      emotionalLesson: 'Great structures do not rush to completion; they gain strength column by column, day by day.',
    },
    {
      id: 'bridge',
      tabLabel: '03 · BRIDGE',
      heading: 'The Courage to Move Forward',
      subheading: 'Continuous Span & Arch Mechanics · Crossing Uncertain Depths',
      marathiQuote: 'कधी वाटेवर अडथळे येतील, कधी अपेक्षेप्रमाणे उत्तर मिळणार नाही. पण एखादा कठीण टप्पा म्हणजे संपूर्ण प्रवासाचा शेवट नसतो.',
      techAnnotation: 'SPAN L = 160.0 m · PARABOLIC TIE CABLE · VIBRATION DAMPING',
      details: [
        'Tension & Compression: Balancing high expectations with self-compassion',
        'Expansion Joints: Allowing room for human imperfection and rest',
        'Clear Span: Crossing the chasm between where you are and where you aspire to be',
      ],
      emotionalLesson: 'A bridge exists not because the river was shallow, but because someone had the courage to span the divide.',
    },
  ],
  closing: 'तू इमारतींचे आराखडे शिकलीस; आता स्वतःच्या स्वप्नांना आकार देण्याची वेळ आहे.',
};

/* ── Scene 4: UPSC Journey — "A Dream That Serves" ── */
export const UPSC_CONTENT = {
  badge: 'PUBLIC SERVICE & DHARMA',
  title: 'A Dream That Serves',
  subtitle: 'Becoming a public servant is more than securing a position; it is a sacred commitment to how you treat others and fulfill responsibilities.',
  chakraTitle: 'The 24-Spoke Wheel of Dharma',
  chakraSub: 'A compass of character guiding your journey.',
  eightVirtues: [
    {
      word: 'Integrity',
      marathi: 'प्रामाणिकपणा',
      description: 'Doing what is right with quiet steadfastness, especially when no one is watching.',
    },
    {
      word: 'Compassion',
      marathi: 'संवेदनशीलता',
      description: 'A heart that listens deeply to the unspoken needs of society\'s most vulnerable.',
    },
    {
      word: 'Courage',
      marathi: 'धैर्य',
      description: 'Steady fortitude to face uncertainty, difficult choices, and demanding days.',
    },
    {
      word: 'Justice',
      marathi: 'न्याय',
      description: 'Treating every citizen with fairness, dignity, and impartial respect.',
    },
    {
      word: 'Responsibility',
      marathi: 'कर्तव्यनिष्ठा',
      description: 'Holding oneself sincerely accountable to the welfare of the people one serves.',
    },
    {
      word: 'Empathy',
      marathi: 'सहानुभूती',
      description: 'Understanding the lived realities and silent struggles of ordinary human lives.',
    },
    {
      word: 'Humility',
      marathi: 'नम्रता',
      description: 'Staying grounded and eager to learn, no matter how high your responsibilities rise.',
    },
    {
      word: 'Service',
      marathi: 'लोकसेवा',
      description: 'Finding supreme purpose in making someone else\'s burden just a little lighter.',
    },
  ],
  mainMessageMarathi: 'अधिकारी होण्याचं तुझं स्वप्न एक दिवस पूर्ण व्हावं, ही माझी मनापासून इच्छा आहे. पण त्या पदापर्यंत पोहोचण्याच्या प्रवासात तुझ्यातला माणूसपणा, तुझी संवेदनशीलता आणि तुझं हसू कधीही हरवू नये, हीसुद्धा माझी इच्छा आहे.',
  hopeMarathi: 'पुढच्या वर्षी तुझं नाव यशस्वी उमेदवारांच्या यादीत असावं, तुझ्या डोळ्यांत आनंदाश्रू असावेत आणि तुझ्या मेहनतीचं सुंदर फळ तुला मिळावं, अशी मनापासून प्रार्थना. पण तो दिवस येईपर्यंत स्वतःवर विश्वास ठेव आणि स्वतःशीही प्रेमाने वाग.',
};

/* ── Scene 5: Sacred Wisdom & Faith (Bhagavad Gita 2.47) ── */
export const FAITH_CONTENT = {
  badge: 'SACRED WISDOM · INNER STRENGTH',
  title: 'कर्मण्येवाधिकारस्ते',
  subtitle: 'Finding peace, perspective, and unwavering focus in sincere effort.',
  sanskritVerse: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
  scriptureRef: 'श्रीमद्भगवद्गीता २.४७ (Bhagavad Gita 2.47)',
  marathiMeaning: 'आपल्या हातात प्रामाणिकपणे प्रयत्न करणं आहे; प्रत्येक परिणाम आपल्या नियंत्रणात नसतो. म्हणून फळाची चिंता करत प्रयत्न सोडू नयेत.',
  upscReflection: 'याचा अर्थ निकालाकडे दुर्लक्ष करणे नव्हे, तर गुणांच्या आणि निकालांच्या चिंतेत स्वतःचे मानसिक संतुलन आणि आत्मसन्मान हरवू न देणे. प्रामाणिक प्रयत्न हेच तुझे सर्वात मोठे सामर्थ्य आहे.',
  reflections: [
    {
      marathi: 'श्रद्धा मनाला आधार देते, प्रयत्न वाट दाखवतात आणि संयम आपल्याला पुढे चालत राहण्याचं बळ देतो.',
      english: 'Faith anchors the mind, sincere efforts light the path, and patience grants the strength to walk forward.',
    },
    {
      marathi: 'मन शांत ठेव, कर्म प्रामाणिक ठेव आणि कठीण काळातही माणुसकी सोडू नकोस.',
      english: 'Keep the mind serene, keep your action honest, and never abandon humanity even during demanding seasons.',
    },
    {
      marathi: 'स्वतःवर विश्वास ठेव. प्रत्येक प्रश्नाचं उत्तर आजच मिळालं पाहिजे असं नाही. काही उत्तरं वेळ, अनुभव आणि संयम देतात.',
      english: 'Trust in yourself. Not every question demands an answer today; some answers arrive through time, experience, and patience.',
    },
  ],
};

/* ── Scene 6: Sunrise (The Dawn of Dreams) ── */
export const SUNRISE_CONTENT = {
  badge: 'THE DAWN OF YOUR DREAMS',
  primaryMarathi: 'तुझ्या स्वप्नांचा सूर्योदय लवकरच होवो.',
  secondaryMarathi: 'तू ज्या यशासाठी मेहनत करते आहेस, ते यश तुला मिळो. आणि त्या प्रवासात प्रत्येक वेळी स्वतःवर विश्वास ठेवण्याचं बळही मिळो.',
  keyLine: 'Surabhi, the world is about to meet the extraordinary person I already know.',
  comfortMarathi: 'एखादा पेपर कठीण गेला, एखादा दिवस वाया गेला किंवा मनासारखं काही घडलं नाही, तरी स्वतःबद्दलचा आदर कमी करू नकोस. तू तुझ्या निकालापेक्षा खूप मोठी आहेस.',
  subLine: 'After every quiet night of patient preparation, the golden dawn always arrives.',
};

/* ── Scene 7: Sky Lanterns & Sandcastle Cake ── */
export const LANTERN_WISHES: { en: string; mr: string }[] = [
  {
    en: 'May your sincere hard work lead you steadily closer to your cherished dream.',
    mr: 'तुझ्या प्रामाणिक कष्टांना यशाची सुंदर दिशा लाभो आणि स्वप्नांचा मार्ग प्रशस्त होवो.',
  },
  {
    en: 'May you find quiet courage when the road feels steep, tiring, or uncertain.',
    mr: 'वाटा कठीण वाटल्या तरी मनातील उमेद, धैर्य आणि आत्मविश्वास कधीही कमी न होवो.',
  },
  {
    en: 'May you never confuse one disappointing mock test or result with your entire potential.',
    mr: 'एखाद्या निकालावरून किंवा अपयशावरून कधीही स्वतःचे कर्तृत्व आणि मूल्य ठरवू नकोस.',
  },
  {
    en: 'May your future bring meaningful work that touches human lives and kind people who stand by you.',
    mr: 'तुझ्या आयुष्यात चांगल्या माणसांची सोबत आणि समाजाच्या कामी येणारे अर्थपूर्ण काम लाभो.',
  },
  {
    en: 'May you always have the gentle resilience to rest when exhausted, and courageously start again.',
    mr: 'थकल्यावर स्वतःला विश्रांती देण्याचं आणि दुसऱ्या दिवशी नव्याने सुरुवात करण्याचं धैर्य लाभो.',
  },
  {
    en: 'May you protect your physical health and mental peace while fiercely pursuing your ambitions.',
    mr: 'स्वप्नांचा पाठलाग करताना शरीराचे स्वास्थ्य आणि मनाची शांतता जपता येवो.',
  },
  {
    en: 'May you remain gentle, compassionate, and kind, no matter how demanding the world becomes.',
    mr: 'यश मिळवताना तुझ्यातली संवेदनशीलता, माणुसकी आणि आपुलकी नेहमी कायम राहो.',
  },
  {
    en: 'May your faith give you steady anchor and strength without taking away your freedom to learn.',
    mr: 'श्रद्धा तुला संकटांत आधार देवो आणि विचारांना निरंतर शिकण्याची नवी दिशा देवो.',
  },
  {
    en: 'May your achievements bring deep inner fulfillment and quiet pride, not just external recognition.',
    mr: 'तुझ्या कर्तृत्वाने केवळ जगाची प्रशंसा नव्हे, तर मनाला अपार शांतता आणि समाधान मिळो.',
  },
  {
    en: 'May you continue to discover effortless reasons to smile and laugh with all your heart.',
    mr: 'रोजच्या धावपळीत आणि अभ्यासातही खळाळून हसण्याचे अनेक सुंदर क्षण तुला सापडत राहोत.',
  },
  {
    en: 'May the right doors open for you at the right time, meeting your sincere preparation with grace.',
    mr: 'योग्य वेळी योग्य संधी चालून येवोत आणि तुझ्या वर्षानुवर्षांच्या परिश्रमांना न्याय मिळो.',
  },
  {
    en: 'May this coming year bring you closer to the purposeful, beautiful life you dream of.',
    mr: 'हे नवीन वर्ष तुझ्या आयुष्यात स्वप्नपूर्तीची, समाधानाची आणि प्रगतीची नवी पहाट घेऊन येवो.',
  },
];

export const CAKE_CONTENT = {
  badge: 'A Moment for You',
  title: 'Make a Wish, Surabhi',
  prompt: 'Take a deep breath, hold your dearest dream in your heart, and blow out the candle.',
  micButton: '🎙️ Blow into Microphone',
  micHint: 'Privacy first: audio is processed locally in your browser and never recorded.',
  holdButton: '✨ Tap or Hold to Blow',
  extinguishedMessage: 'Your wish is sealed with the quiet sea.\nProtect your dreams, Surabhi, and always remember: your happiness matters just as much as your success.',
  relightPrompt: '🕯️ Light Candle Again',
};

/* ── Scene 8: Sincere Letter from Your Best Friend ── */
export const LETTER_CONTENT = {
  stationeryBadge: 'FROM THE HEART OF A BEST FRIEND',
  monogram: 'S',
  date: 'October 19 · A Day to Celebrate You',
  salutation: 'Dearest Surabhi,',
  p1: 'Happy Birthday! Today is a celebration of who you are — not just for the high mountain you are climbing or the ambitious dream of public service you carry, but for the rare, thoughtful, and deeply compassionate person you are every single day.',
  p2: 'I know how demanding this UPSC preparation is. I see the quiet discipline, the early mornings, the heavy revision cycles, and those long evenings when the syllabus feels endless and self-doubt creeps in unnoticed. It takes extraordinary courage to dedicate years to a goal where nothing is guaranteed, and I respect your effort more than words can express.',
  p3: 'On days when the preparation feels exhausting, or when a mock test doesn’t go as you hoped, please remember this: one difficult day or one score will never define your worth. You are allowed to feel tired. You are allowed to take a break, step back, laugh, sleep well, and begin again with a fresh mind. Your intelligence, integrity, and warmth were never on trial.',
  p4: 'I pray and sincerely hope with all my heart that next year brings your name proudly on that merit list. I want to see happy tears in your eyes and watch you reap the sweetest fruit of your relentless dedication. But whether that day arrives tomorrow or takes its own time, my care, respect, and loyalty as your best friend are unconditional. You are already someone to be deeply proud of.',
  marathiParagraph: 'तुझी स्वप्नं पूर्ण होवोत; पण ती पूर्ण करताना स्वतःला हरवू नकोस. कारण तुझं हसणं, तुझं मन आणि तुझं असणंही तितकंच मौल्यवान आहे. तुझ्या स्वप्नांना पंख मिळावेत, तुझ्या मनाला शांतता लाभावी आणि कठीण दिवसांत तुला स्वतःची ताकद आठवत राहावी, एवढीच माझी प्रार्थना.',
  closingWish: 'तुझ्या आयुष्यात यशासोबत समाधान, स्वप्नांसोबत शांतता आणि प्रत्येक नव्या दिवसासोबत जगण्याचा आनंद येवो.',
  signoff: 'With endless pride, unwavering belief, and lifelong friendship,',
  signature: 'Your Best Friend',
  replayText: '↺ Walk the Shore Again from Beginning',
};

// Backwards compatibility aliases
export const PHOTO_MEMORIES = MEMORY_ITEMS;
export const BIRTHDAY_WISHES = LANTERN_WISHES;
export const BIRTHDAY_LETTER = LETTER_CONTENT;
export const BLUEPRINT_CONTENT = {
  badge: ENGINEERING_CONTENT.badge,
  title: ENGINEERING_CONTENT.title,
  subtitle: ENGINEERING_CONTENT.subtitle,
  closing: ENGINEERING_CONTENT.closing,
};
export const CHAKRA_CONTENT = {
  badge: UPSC_CONTENT.badge,
  title: UPSC_CONTENT.title,
  subtitle: UPSC_CONTENT.subtitle,
  qualities: UPSC_CONTENT.eightVirtues,
  closing: UPSC_CONTENT.mainMessageMarathi,
};
