export type Locale = "en" | "yo" | "ha" | "ig" | "pj";

interface Translations {
  [key: string]: string | Translations | Array<{ title: string; body: string }>;
}
/* ───────────── ENGLISH ───────────── */
const en: Translations = {
  app: {
    name: "Shield",
    tagline: "You're safe here",
    subtitle: "Everything below stays local to this device unless you choose to share it.",
  },
  calculator: {
    unlockHint: "Enter 2 4 6 8 = =",
  },
  nav: {
    home: "Home",
    checkin: "Check-in",
    vault: "Vault",
    guide: "Guide",
  },
  home: {
    quickActions: "Quick actions",
    recent: "Recent",
    startCheckin: "Start a meetup check-in",
    checkProfile: "Check a profile / number",
    evidenceVault: "Evidence vault",
    playbook: "Blackmail playbook",
    panic: "Panic — alert my trusted contacts now",
    noActivity: "No recent activity",
    noActivityDesc: "Check-ins, lookups, and vault items you create will show up here — visible only after you unlock the app.",
  },
  checkin: {
    title: "Meetup check-in",
    subtitle: "Share your location with a trusted contact for a set window — nothing persists after.",
    trustedContact: "Trusted contact",
    contactPlaceholder: "e.g. Tolu (best friend)",
    window: "Check-in window",
    windowPlaceholder: "e.g. 90 minutes",
    start: "Start check-in",
    liveTracking: "Live location sharing",
    imSafe: "I'm safe — check in now",
    cancel: "Cancel check-in",
    windowClosed: "Window closed — contact has been alerted",
    checkedIn: "Checked in — contact was notified",
    cancelled: "Check-in cancelled",
    started: "Check-in started",
    shareLink: "Share this link with your contact so they can track you live:",
    copyLink: "Copy",
    copied: "Link copied! Send it to your contact.",
  },
  lookup: {
    title: "Check before you meet",
    subtitle: "Search a phone number or username against community reports.",
    placeholder: "Phone number or username",
    check: "Check",
    noReports: "No reports",
    noReportsDesc: "Nothing on file — that doesn't guarantee safety. Still meet in a public, well-lit place and keep a check-in running.",
    confirmedPattern: "Confirmed pattern",
    oneReport: "1 report",
    reportsOnFile: "independent report(s) on file",
    submitReport: "Submit a report",
    reportTier: "Risk level",
    reportNote: "Describe what happened...",
    submit: "Submit Report",
    reportSubmitted: "Report submitted for review. Thank you.",
  },
  vault: {
    title: "Evidence vault",
    subtitle: "Encrypted on this device, locked separately from the calculator.",
    setPasscode: "Set a vault passcode",
    passcodeDesc: "Separate from the calculator unlock. This encrypts everything saved here — it cannot be recovered if forgotten, by design.",
    newPasscode: "New vault passcode",
    confirmPasscode: "Confirm passcode",
    createVault: "Create vault",
    enterPasscode: "Enter vault passcode",
    unlockDesc: "Unlocks only the evidence vault — separate from the calculator.",
    unlock: "Unlock vault",
    incorrect: "Incorrect passcode",
    minChars: "Use at least 4 characters.",
    mismatch: "Passcodes don't match.",
    created: "Vault created — this passcode cannot be recovered if lost",
    addNote: "Add a note",
    notePlaceholder: "What happened...",
    saveNote: "Save encrypted note",
    addScreenshot: "Add a screenshot",
    saveScreenshot: "Save encrypted screenshot",
    voiceNote: "Voice Note",
    voiceDesc: "Record audio evidence directly into your encrypted vault.",
    record: "● Record",
    stop: "■ Stop",
    save: "💾 Save to Vault",
    discard: "🗑️ Discard",
    lockVault: "Lock vault",
    saved: "Saved, encrypted",
    nothingYet: "Nothing saved yet.",
  },
  playbook: {
    title: "If someone threatens to expose you",
    subtitle: "Read this before you respond to them.",
    steps: [
      { title: "1. Don't pay, and don't panic-reply", body: "Paying rarely ends it — it usually signals you\'ll pay again. Take time before responding to anything." },
      { title: "2. Lock down your accounts", body: "Change passwords on email and social accounts, turn on two-factor authentication, and check for unfamiliar login sessions." },
      { title: "3. Save everything", body: "Screenshot every message before blocking. Store it in your evidence vault — don\'t rely on the platform to keep a copy." },
      { title: "4. Tell someone you trust", body: "Isolation is what makes this work for them. One trusted person knowing changes your options." },
      { title: "5. Report through the right channel", body: "Use the platform's report flow for extortion/blackmail specifically — it's routed differently than general abuse reports." },
    ],
  },
  panic: {
    title: "Panic alert",
    subtitle: "This sends your location to your trusted contacts immediately.",
    confirmTitle: "Send alert now?",
    confirmBody: "Your trusted contacts will get a message with your live location. Nothing else changes on your screen.",
    sendAlert: "Yes, alert them now",
    cancel: "Cancel",
    sent: "Alert sent",
    sentBody: "Your contacts have your location. This screen will return to normal in a moment.",
    standard: "Alert trusted contacts only",
    critical: "🚨 CRITICAL — Also alert police/NGO",
  },
  threat: {
    analyzing: "Analyzing threat level...",
    score: "Threat score",
    category: "Category",
    urgency: "Urgency",
    keywords: "Keywords detected",
    entities: "Entities found",
    summary: "Summary",
    critical: "Critical",
    high: "High",
    medium: "Medium",
    low: "Low",
  },
};

/* ───────────── YORÙBÁ ───────────── */
const yo: Translations = {
  app: {
    name: "Aṣáájú",
    tagline: "Aàbò ń bẹ níbí",
    subtitle: "Ohun gbogbo wà lórí ẹ̀rọ yìi àfi tí o bá fẹ́ pín rẹ̀.",
  },
  calculator: {
    unlockHint: "Tẹ 2 4 6 8 = =",
  },
  nav: {
    home: "Ilé",
    checkin: "Ìṣàyẹ̀wò",
    vault: "Ilé-ìṣọ́",
    guide: "Ìtọ́sọ́nà",
  },
  home: {
    quickActions: "Àwọn ìgbésẹ̀ kíákíá",
    recent: "Tuntun",
    startCheckin: "Bẹ̀rẹ̀ ìṣàyẹ̀wò pàdé",
    checkProfile: "Ṣàyẹ̀wò prófáìlì / nọ́mbà",
    evidenceVault: "Ilé-ìṣọ́ ẹ̀rí",
    playbook: "Ìwé àtùnṣe ìdípò",
    panic: "Ìbànújẹ́ — fi ìròyìn ránṣẹ́ sí àwọn ọ̀rẹ́ mi",
    noActivity: "Kò sí ìṣe tuntun",
    noActivityDesc: "Àwọn ìṣàyẹ̀wò àti ohun ilé-ìṣọ́ tí o dá yóò hàn níbí — ó hàn nìkan lẹ́yìn tí o bá ti ṣí àápù náà.",
  },
  checkin: {
    title: "Ìṣàyẹ̀wò pàdé",
    subtitle: "Pín ibi rẹ pẹ̀lú ẹnìkan tó ní ìgbàgbọ́ fún àkókò kan — kò sí nǹkan tí ó yè.",
    trustedContact: "Ẹni tó ní ìgbàgbọ́",
    contactPlaceholder: "àp. Tolu (ọ̀rẹ́ tó dára jùlọ)",
    window: "Àsìkò ìṣàyẹ̀wò",
    windowPlaceholder: "àp. ìṣẹ́jú 90",
    start: "Bẹ̀rẹ̀ ìṣàyẹ̀wò",
    liveTracking: "Ìpín ibi lọ́wọ́lọ́wọ́",
    imSafe: "Mo wà láàbò — ṣàyẹ̀wò nísinsìnyí",
    cancel: "Fagilé ìṣàyẹ̀wò",
    windowClosed: "Àsìkò parí — ẹni ti gba ìròyìn",
    checkedIn: "Ti ṣàyẹ̀wò — wọ́n ti fi ẹni mọ̀",
    cancelled: "Ìṣàyẹ̀wò ti fagilé",
    started: "Ìṣàyẹ̀wò ti bẹ̀rẹ̀",
    shareLink: "Pín òǹdé yìí pẹ̀lú ẹni rẹ kí wọ́n lè tẹ̀lé ọ lọ́wọ́lọ́wọ́:",
    copyLink: "Kọpọ̀",
    copied: "Ti kọpọ̀ òǹdé! Ránṣẹ́ sí ẹni rẹ.",
  },
  lookup: {
    title: "Ṣàyẹ̀wò kí o tó pàdé",
    subtitle: "Wá nọ́mbà tàbí orúkọ aṣàmúlò lòdì sí àwọn ìròyìn àgbáyé.",
    placeholder: "Nọ́mbà fóònù tàbí orúkọ aṣàmúlò",
    check: "Ṣàyẹ̀wò",
    noReports: "Kò sí ìròyìn",
    noReportsDesc: "Kò sí nǹkan nínú faili — ìyẹn kò dájú ààbò. Pàdé ní ibi tó hàn gbangba tí ìmọ́lọ́ wà.",
    confirmedPattern: "Àpẹẹrẹ tó dájú",
    oneReport: "Ìròyìn 1",
    reportsOnFile: "ìròyìn tí ó yàtọ̀ síra wọn",
    submitReport: "Fi ìròyìn sílẹ̀",
    reportTier: "Ìpele èwu",
    reportNote: "Ṣàlàyé ohun tí ó ṣẹlẹ̀...",
    submit: "Fi Ìròyìn Sílẹ̀",
    reportSubmitted: "Ìròyìn ti fi sílẹ̀ fún àyẹ̀wò. Ẹ ṣéun.",
  },
  vault: {
    title: "Ilé-ìṣọ́ ẹ̀rí",
    subtitle: "Ti fi ìfọwọ́sowọ́pọ̀ sí ẹ̀rọ yìi, ti tìtì sílẹ̀ látọ̀dọ̀ kàlkúlétà.",
    setPasscode: "Ṣètò ọ̀rọ̀-ìgbaniwọlé ilé-ìṣọ́",
    passcodeDesc: "Yàtọ̀ sí ìfisun kàlkúlétà. Èyí fi ìfọwọ́sowọ́pọ̀ sí ohun gbogbo tí a fi pamọ̀ níbí — a kò lè gbà á padà bí o bá gbàgbé, gẹ́gẹ́ bí ìṣe.",
    newPasscode: "Ọ̀rọ̀-ìgbaniwọlé tuntun",
    confirmPasscode: "Jẹ́rìí ọ̀rọ̀-ìgbaniwọlé",
    createVault: "Dá ilé-ìṣọ́",
    enterPasscode: "Tẹ ọ̀rọ̀-ìgbaniwọlé ilé-ìṣọ́",
    unlockDesc: "Ó ṣí ilé-ìṣọ́ ẹ̀rí nìkan — yàtọ̀ sí kàlkúlétà.",
    unlock: "Ṣí ilé-ìṣọ́",
    incorrect: "Ọ̀rọ̀-ìgbaniwọlé kò tọ́",
    minChars: "Lò ó kéré jù lẹ́tà 4.",
    mismatch: "Àwọn ọ̀rọ̀ kò yàtọ̀.",
    created: "Ilé-ìṣọ́ ti dá — a kò lè gbà ọ̀rọ̀-ìgbaniwọlé padà bí o bá sọnù",
    addNote: "Fi àkíyèsí kun",
    notePlaceholder: "Kí ni ó ṣẹlẹ̀...",
    saveNote: "Fi àkíyèsí pamọ̀",
    addScreenshot: "Fi àwòrán kun",
    saveScreenshot: "Fi àwòrán pamọ̀",
    voiceNote: "Ohun Ẹ̀rí",
    voiceDesc: "Gba ohun ẹ̀rí sílẹ̀ tààrà sí ilé-ìṣọ́ tí a fi ìfọwọ́sowọ́pọ̀ sí.",
    record: "● Gba Ohun",
    stop: "■ Dúró",
    save: "💾 Fi Pamọ̀ sí Ilé-Ìṣọ́",
    discard: "🗑️ Paá",
    lockVault: "Tìtì ilé-ìṣọ́",
    saved: "Ti fi pamọ̀, ti fi ìfọwọ́sowọ́pọ̀ sí",
    nothingYet: "Kò sí nǹkan tí a fi pamọ̀.",
  },
  playbook: {
    title: "Tí ẹnìkan bá ń dọ̀jú kí o tó fi ẹ̀yà hàn",
    subtitle: "Ka èyí kí o tó dáhùn wọ́n.",
    steps: [
      { title: "1. Má ṣan owó, má sì dáhùn pẹ̀lú ìbànújẹ́", body: "Ṣíṣan owó kò parí rẹ̀ — ó tọ́ka pé ìwọ yóò tún san. Gbà á sílẹ̀ kí o tó dáhùn." },
      { title: "2. Tìtì àwọn àkáàntì rẹ", body: "Yí àwọn ọ̀rọ̀-ìgbaniwọlé àti àwọn àkọsílẹ̀ ìwọlé padà. Ṣàyẹ̀wò àwọn ìgbà ìwọlé tí o mò." },
      { title: "3. Fi ohun gbogbo pamọ̀", body: "Gba àwòrán gbogbo ìránṣẹ́ kí o tó dínà. Fi nínú ilé-ìṣọ́ rẹ — má ṣe dúró lórí àwọn pẹ̀lú." },
      { title: "4. Sọ fún ẹnìkan tó ní ìgbàgbọ́", body: "Ìyàsọ́tọ̀ ni ó mú kí èyí ṣiṣẹ́ fún wọ́n. Ẹnìkan kan tó mọ̀ yí àwọn àṣàyàn rẹ padà." },
      { title: "5. Fi ẹ̀sùn sílẹ̀ nípasẹ̀ ọ̀nà tó tọ́", body: "Lò ọ̀nà ìròyìn ìdípò pàtó — a máa yí rẹ̀ padà lọ́nà tí ó yàtọ̀ sí ìwà ipá." },
    ],
  },
  panic: {
    title: "Ìròyìn ìbànújẹ́",
    subtitle: "Èyí fi ibi rẹ ránṣẹ́ sí àwọn ẹni tó ní ìgbàgbọ́ lẹ́sẹ̀kẹsẹ̀.",
    confirmTitle: "Fi ìròyìn ránṣẹ́ nísinsìnyí?",
    confirmBody: "Àwọn ẹni tó ní ìgbàgbọ́ yóò gba ìròyìn pẹ̀lú ibi rẹ lọ́wọ́lọ́wọ́. Kò sí nǹkan mìíràn tí yóò yí lórí ààyè rẹ.",
    sendAlert: "Bẹ́ẹ̀ni, fi ìròyìn ránṣẹ́ nísinsìnyí",
    cancel: "Fagilé",
    sent: "Ìròyìn ti ránṣẹ́",
    sentBody: "Àwọn ẹni tó ní ìgbàgbọ́ ni ibi rẹ. Ààyè yìí yóò padà sí àìníṣe láìpẹ́.",
    standard: "Fi ìròyìn sí àwọn ẹni tó ní ìgbàgbọ́ nìkan",
    critical: "🚨 PÀTÀKÌ — Tún fi ìròyìn sí ọlọ́pàà/NGO",
  },
  threat: {
    analyzing: "Ń ṣàyẹ̀wò ìpele èwu...",
    score: "Àmì èwu",
    category: "Ẹ̀ka",
    urgency: "Ìbẹ̀rù",
    keywords: "Àwọn ọ̀rọ̀ kííkí tí a rí",
    entities: "Àwọn nǹkan tí a rí",
    summary: "Àkópọ̀",
    critical: "Pàtàkì gan-an",
    high: "Gíga",
    medium: "Àárín",
    low: "Kéré",
  },
};

/* ───────────── HAUSA ───────────── */
const ha: Translations = {
  app: {
    name: "Garkuwa",
    tagline: "Kai cikin aminci ne a nan",
    subtitle: "Duk abin da ke nan yana kan wannan na'urar sai idan ka zabi raba shi.",
  },
  calculator: {
    unlockHint: "Shigar da 2 4 6 8 = =",
  },
  nav: {
    home: "Gida",
    checkin: "Duba",
    vault: "Vault",
    guide: "Jagora",
  },
  home: {
    quickActions: "Ayyuka masu sauri",
    recent: "Na baya-bayan nan",
    startCheckin: "Fara duba taron saduwa",
    checkProfile: "Duba fasfo / lamba",
    evidenceVault: "Vault na shaida",
    playbook: "Littafin shawara kan barazana",
    panic: "Barnata — sanar da abokan tarayyata yanzu",
    noActivity: "Babu aiki na baya-bayan nan",
    noActivityDesc: "Dububu, bincike, da abubuwan vault da ka ƙirƙira za su bayyana nan — ana ganin su ne kawai bayan ka buɗe app ɗin.",
  },
  checkin: {
    title: "Duba taron saduwa",
    subtitle: "Raba wurin ka da aboki mai aminci na wani lokaci — babu abin da ke ci gaba da wanzuwa.",
    trustedContact: "Aboki mai aminci",
    contactPlaceholder: "mis. Amina (abokiya mafi kyau)",
    window: "Lokacin duba",
    windowPlaceholder: "mis. mintuna 90",
    start: "Fara duba",
    liveTracking: "Rabin wurin kai tsaye",
    imSafe: "Ina cikin aminci — duba yanzu",
    cancel: "Soke duba",
    windowClosed: "Lokaci ya kare — an sanar da aboki",
    checkedIn: "An duba — an sanar da aboki",
    cancelled: "An soke duba",
    started: "An fara duba",
    shareLink: "Raba wannan haɗin da abokinka don su iya bin ka kai tsaye:",
    copyLink: "Kwatanta",
    copied: "An kwatanta haɗin! Aika shi ga abokinka.",
  },
  lookup: {
    title: "Duba kafin ka sadu",
    subtitle: "Bincika lambar waya ko sunan mai amfani a kan rahotannin al\u2019umma.",
    placeholder: "Lambar waya ko sunan mai amfani",
    check: "Duba",
    noReports: "Babu rahotanni",
    noReportsDesc: "Babu abin da ke cikin fayil — hakan bai tabbatar da aminci ba. Har yanzu ka sadu a wani wuri mai jama'a da haske.",

    confirmedPattern: "Tabbataccen tsari",
    oneReport: "Rahoto 1",
    reportsOnFile: "rahoto(rahotanni) masu cin gashin kansu",
    submitReport: "Sallama rahoto",
    reportTier: "Matsin haɗari",
    reportNote: "Bayyana abin da ya faru...",
    submit: "Sallama Rahoto",
    reportSubmitted: "An sallama rahoto don duba. Na gode.",
  },
  vault: {
    title: "Vault na shaida",
    subtitle: "An ɓoye shi a kan wannan na'ura, an kulle shi daban daga calculator.",

    setPasscode: "Saita kalmar sirri ta vault",
    passcodeDesc: "Daban daga buɗe calculator. Wannan ya ɓoye duk abin da aka adana nan — ba za a iya dawo da shi ba idan an manta, bisa tsari.",
    newPasscode: "Sabuwar kalmar sirri",
    confirmPasscode: "Tabbatar da kalmar sirri",
    createVault: "Ƙirƙiri vault",
    enterPasscode: "Shigar da kalmar sirri ta vault",
    unlockDesc: "Yana buɗe vault na shaida kawai — daban daga calculator.",
    unlock: "Buɗe vault",
    incorrect: "Kalmar sirri ba daidai ba",
    minChars: "Yi amfani da haruffa 4 aƙalla.",
    mismatch: "Kalmomin sirri ba sa daidaita.",
    created: "An ƙirƙiri vault — ba za a iya dawo da kalmar sirri ba idan ta ɓace",
    addNote: "Ƙara rubutu",
    notePlaceholder: "Me ya faru...",
    saveNote: "Adana rubutu mai ɓoye",
    addScreenshot: "Ƙara hoton allo",
    saveScreenshot: "Adana hoton allo mai ɓoye",
    voiceNote: "Sauti na Shaida",
    voiceDesc: "Yi rikodin shaida kai tsaye cikin vault ɗinka mai ɓoye.",
    record: "● Yi Rikodi",
    stop: "■ Tsaya",
    save: "💾 Adana a Vault",
    discard: "🗑️ Yi Watsi",
    lockVault: "Kulle vault",
    saved: "An adana, an ɓoye",
    nothingYet: "Babu abin da aka adana tukuna.",
  },
  playbook: {
    title: "Idan wani ya yi barazana ya bayyana ka",
    subtitle: "Karanta wannan kafin ka amsa musu.",
    steps: [
      { title: "1. Kada ka biya, kada ka amsa cikin tsoro", body: "Biyan kuɗi ba ya ƙarewa — yawanci yana nuna cewa za ka biya kuma. Ka ɗauki lokaci kafin ka amsa wani abu." },
      { title: "2. Kulle asusunka", body: "Canza kalmar sirri a kan imel da kafafen sada zumunta, kunna tabbacin biyu, ka kuma duba sabbin zama-zama na shiga." },
      { title: "3. Adana duk abu", body: "Dauki hoton allo na kowane sako kafin toshe. Adana shi a cikin vault ɗinka — kada ka dogara da dandali don adana kwafin." },
      { title: "4. Gaya wa wani da ka amince da shi", body: "Kai tsaye shi ne abin da ya sa wannan ya yi aiki a gare su. Sanin mutum ɗaya mai aminci yana canza zaɓuɓɓukan ka." },
      { title: "5. Yi rahoto ta hanyar da ta dace", body: "Yi amfani da hanyar rahoton dandali don cin zarafin/kuɗin barazana musamman — ana tafiyar da shi daban daga rahoton cin zarafi na gama-gari." },
    ],
  },
  panic: {
    title: "Sanarwar gaggawa",
    subtitle: "Wannan yana aika wurinka zuwa ga abokan tarayyarka nan take.",
    confirmTitle: "Aika sanarwa yanzu?",
    confirmBody: "Abokan tarayyarka za su sami sako tare da wurin kai tsaye. Babu wani abu da zai canza a kan allon ka.",
    sendAlert: "Eh, sanar da su yanzu",
    cancel: "Soke",
    sent: "An aika sanarwa",
    sentBody: "Abokan tarayyarka suna da wurinka. Wannan allon zai dawo cikin halin da ya dace da wuri.",
    standard: "Sanar da abokan tarayya kawai",
    critical: "🚨 GAGGAWA — Tuna sanar da 'yan sanda/NGO",

  },
  threat: {
    analyzing: "Ana nazarin matsin haɗari...",
    score: "Matsin haɗari",
    category: "Rukuni",
    urgency: "Gaggawa",
    keywords: "Kalmomi da aka gano",
    entities: "Abubuwan da aka samu",
    summary: "Takaitawa",
    critical: "Gaggawa",
    high: "Babba",
    medium: "Tsakiya",
    low: "Ƙaranci",
  },
};

/* ───────────── IGBO ───────────── */
const ig: Translations = {
  app: {
    name: "Nkwa",
    tagline: "Ị nọ nchebe ebe a",
    subtitle: "Ihe niile nọ n'ime ngwaọrụ a ma ọ bụrụ na ị họrọ ịkekọrịta ya.",

  },
  calculator: {
    unlockHint: "Tinye 2 4 6 8 = =",
  },
  nav: {
    home: "Ụlọ",
    checkin: "Nlele",
    vault: "Ọba",
    guide: "Nduzi",
  },
  home: {
    quickActions: "Omume ngwa ngwa",
    recent: "Nke a nso nso a",
    startCheckin: "Bido nlele nzute",
    checkProfile: "Lelee profaịlụ / nọmba",
    evidenceVault: "Ọba ihe akaebe",
    playbook: "Akwụkwọ ntụziaka maka ịdọ aka ná ntị",
    panic: "Ihe ụgwụ — zaa ndị enyi m ezigbo ozi ugbu a",
    noActivity: "Enweghị ihe ọ bụla a nso nso a",
    noActivityDesc: "Nlele, nyocha, na ihe ndị ọba ị kere ga-egosi ebe a — a na-ahụ ha naanị mgbe ị mepụrụ ngwaọrụ ahụ.",
  },
  checkin: {
    title: "Nlele nzute",
    subtitle: "Kekọrịta ebe ị nọe nye onye enyi ị tozuru arụ n'oge a kapịrị ọnụ — ihe ọ bụla adịghị.",

    trustedContact: "Onye enyi ị tozuru arụ",
    contactPlaceholder: "dị ka Chioma (enyi kacha mma)",
    window: "Windọ nlele",
    windowPlaceholder: "dị ka nkeji 90",
    start: "Bido nlele",
    liveTracking: "Na-eso ebe ị nọ n'oge ugbu a",

    imSafe: "Anọ m nchebe — lelee ugbu a",
    cancel: "Kagbuo nlele",
    windowClosed: "Windọ mechiri — a zara onye enyi",
    checkedIn: "E leleela — a zara onye enyi",
    cancelled: "A kagbuola nlele",
    started: "E bidoala nlele",
    shareLink: "Kekọrịta njikọ a nye onye enyi gị ka ha nwee ike ịchọpụta ebe ị nọ n'oge ugbu a:",

    copyLink: "Kọpịa",
    copied: "E kọpịrụla njikọ! Zitere ya onye enyi gị.",
  },
  lookup: {
    title: "Lelee tupu ị zute",
    subtitle: "Chọọ nọmba waya ma ọ bụ aha ojiarụ megide akụkọ ọha.",
    placeholder: "Nọmba waya ma ọ bụ aha ojiarụ",
    check: "Lelee",
    noReports: "Enweghị akụkọ",
    noReportsDesc: "Enweghị ihe n'ime faịlụ — nke ahụ abụghị nkwa nchebe. Ka ị zute n'ọnwụnwe ọha na ebe a na-enwu ọkụ.",

    confirmedPattern: "Nkwa atụmatụ",
    oneReport: "Akụkọ 1",
    reportsOnFile: "akụkọ ndị nwe onwe ha",
    submitReport: "Nye akụkọ",
    reportTier: "Ọkwa ihe ize ndụ",
    reportNote: "Kọwaa ihe mere...",
    submit: "Nye Akụkọ",
    reportSubmitted: "E nyela akụkọ maka nyocha. Daalụ.",
  },
  vault: {
    title: "Ọba ihe akaebe",
    subtitle: "E zoro ya n'ime ngwaọrụ a, e kpochiri ya nke ọma site n'aka kalkuleta.",

    setPasscode: "Hazie paswọdu ọba",
    passcodeDesc: "Ọ dị iche site n'imepere kalkuleta. Nke a zoro ihe niile echekwara ebe a — a pụghị ịweta ya ọ bụrụ na e chefu ya, nke bụ ihe e ji eme ya.",

    newPasscode: "Paswọdu ọba ọhụrụ",
    confirmPasscode: "Kwenye na paswọdu",
    createVault: "Mepụta ọba",
    enterPasscode: "Tinye paswọdu ọba",
    unlockDesc: "Na-emepụta ọba ihe akaebe nke ọma — ọ dị iche site n'aka kalkuleta.",

    unlock: "Mepụta ọba",
    incorrect: "Paswọdu ezighi ezi",
    minChars: "Jiri ozi 4 ma ọ bụ karịa.",
    mismatch: "Paswọdu anaghị akwụ ụgwọ.",
    created: "E mepụtala ọba — a pụghị ịweta paswọdu ọ bụrụ na e chefu ya",
    addNote: "Tinye ihe ederede",
    notePlaceholder: "Gịnị mere...",
    saveNote: "Chekwaa ederede e zoro ezo",
    addScreenshot: "Tinye ihe nchụpụ",
    saveScreenshot: "Chekwaa ihe nchụpụ e zoro ezo",
    voiceNote: "Mkpụrụ Okwu Akaebe",
    voiceDesc: "Dee ihe akaebe ụzọ okwu zuru oke n'ime ọba gị e zoro ezo.",

    record: "● Dee Okwu",
    stop: "■ Kwụsị",
    save: "💾 Chekwaa n'Ọba",

    discard: "🗑️ Tufuo",
    lockVault: "Kpochie ọba",
    saved: "E chekwara, e zoro ezo",
    nothingYet: "Enweghị ihe echekwara tụlata.",
  },
  playbook: {
    title: "Ọ bụrụ na onye ọ bụla na-agba gị ụme ka ha gbaa gị ọsọ",
    subtitle: "Gụọ nke a tupu ị zaa ha.",
    steps: [
      { title: "1. Akwụghị ụgwọ, ma zaa n'ụzọ na-atụghị anya", body: "Ịkwụ ụgwọ na-abụkarị ihe na-ekwu na ị ga-akwụ ụgwọ ọzọ. Were oge tupu ị zaa ihe ọ bụla." },
      { title: "2. Kpochie akaụntụ gị niile", body: "Gbanwee paswọdu n'ime email na akaụntụ ọha, gbanye nchịkwa abụọ, ma lelee maka nzute banyere na-amaghị gị." },
      { title: "3. Chekwaa ihe niile", body: "Dee ihe nchụpụ nke ozi ọ bụla tupu igbochi. Chekwaa ya n'ime ọba gị — ekwesịghị ịdabere na ikpo okwu iji chekwaa kọpị." },
      { title: "4. Gwa onye ị tozuru arụ", body: "Nchebe onwe gị bụ ihe na-eme ka nke a rụọ ọrụ maka ha. Onye otu maara gị na-agbanwe nhọrọ gị." },
      { title: "5. Kpesa site n'ụzọ ziri ezi", body: "Jiri usoro akụkọ ikpo okwu maka ịdọ aka ná ntị / ịdọ aka ná ntị karịa — a na-agba ya nke ọma karịa akụkọ mmezighị ozi zuru oke." },
    ],
  },
  panic: {
    title: "Ihe ụgwụ",
    subtitle: "Nke a na-ezitere ebe ị nọe nye ndị enyi gị ezigbo ozi ozugbo.",
    confirmTitle: "Zaa ozi ugbu a?",
    confirmBody: "Ndị enyi gị ezigbo ozi ga-anweta ozi nwere ebe ị nọ n'oge ugbu a. Ihe ọ bụla ọzọ agaghị agbanwe n'ime ihuenyo gị.",

    sendAlert: "Ee, zaa ha ugbu a",
    cancel: "Kagbuo",
    sent: "E zara ozi",
    sentBody: "Ndị enyi gị ezigbo ozi nwere ebe ị nọ. Ihuenyo a ga-alọghachi nke ọma n'oge adịghị anya.",

    standard: "Zaa ndị enyi ezigbo ozi nke ọma nke ọma",
    critical: "🚨 IHE ỤGWỤ — Tuzie ndị uwe ojii / NGO",
  },
  threat: {
    analyzing: "Na-enyocha ọkwa ihe ize ndụ...",
    score: "Akara ihe ize ndụ",
    category: "Otu",
    urgency: "Ngwa ngwa",
    keywords: "Kokma ndị a chọpụtara",
    entities: "Ihe ndị a hụrụ",
    summary: "Nchikota",
    critical: "Ihe ụgwụ",
    high: "Elu",
    medium: "Ọkara",
    low: "Nta",
  },
};

/* ───────────── NIGERIAN PIDGIN ───────────── */
const pj: Translations = {
  app: {
    name: "Shield",
    tagline: "You dey safe here",
    subtitle: "Everything dey for your phone unless you wan share am.",
  },
  calculator: {
    unlockHint: "Press 2 4 6 8 = =",
  },
  nav: {
    home: "Home",
    checkin: "Check-in",
    vault: "Vault",
    guide: "Guide",
  },
  home: {
    quickActions: "Quick things wey you fit do",
    recent: "Wetin just happen",
    startCheckin: "Start check-in for your meeting",
    checkProfile: "Check person profile / number",
    evidenceVault: "Vault where you keep evidence",
    playbook: "Book wey go help you if person wan blackmail you",
    panic: "Panic — alert your trusted people now now",
    noActivity: "Nothing don happen recently",
    noActivityDesc: "Your check-ins, searches, and vault things go show here — you go only see am after you unlock the app.",
  },
  checkin: {
    title: "Meeting check-in",
    subtitle: "Share your location with person wey you trust for some time — nothing go remain after.",
    trustedContact: "Person wey you trust",
    contactPlaceholder: "e.g. Tolu (your best person)",
    window: "Check-in time",
    windowPlaceholder: "e.g. 90 minutes",
    start: "Start check-in",
    liveTracking: "Sharing your location live live",
    imSafe: "I dey safe — check in now",
    cancel: "Cancel check-in",
    windowClosed: "Time don finish — your person don get alert",
    checkedIn: "You don check in — dem don tell your person",
    cancelled: "Check-in don cancel",
    started: "Check-in don start",
    shareLink: "Share this link with your person make dem fit track you live:",
    copyLink: "Copy",
    copied: "Link don copy! Send am to your person.",
  },
  lookup: {
    title: "Check person before you meet am",
    subtitle: "Search phone number or username to see wetin community talk about am.",
    placeholder: "Phone number or username",
    check: "Check",
    noReports: "No reports",
    noReportsDesc: "Nothing dey for file — that one no mean say the person safe. Still meet for public place where light dey.",
    confirmedPattern: "Confirmed pattern",
    oneReport: "1 report",
    reportsOnFile: "independent report(s) for file",
    submitReport: "Submit report",
    reportTier: "Risk level",
    reportNote: "Describe wetin happen...",
    submit: "Submit Report",
    reportSubmitted: "Report don submit for review. Thank you.",
  },
  vault: {
    title: "Evidence vault",
    subtitle: "E dey encrypted for your phone, e get separate lock from calculator.",
    setPasscode: "Set vault passcode",
    passcodeDesc: "Different from calculator unlock. E go encrypt everything wey you save here — if you forget am, nobody fit recover am.",
    newPasscode: "New vault passcode",
    confirmPasscode: "Confirm passcode",
    createVault: "Create vault",
    enterPasscode: "Enter vault passcode",
    unlockDesc: "E go only unlock the evidence vault — different from calculator.",
    unlock: "Unlock vault",
    incorrect: "Passcode no correct",
    minChars: "Use at least 4 characters.",
    mismatch: "Passcodes no match.",
    created: "Vault don create — if you lose am, nobody fit recover am",
    addNote: "Add note",
    notePlaceholder: "Wetin happen...",
    saveNote: "Save encrypted note",
    addScreenshot: "Add screenshot",
    saveScreenshot: "Save encrypted screenshot",
    voiceNote: "Voice Note",
    voiceDesc: "Record audio evidence straight into your encrypted vault.",
    record: "● Record",
    stop: "■ Stop",
    save: "💾 Save to Vault",
    discard: "🗑️ Throwaway",
    lockVault: "Lock vault",
    saved: "Saved and encrypted",
    nothingYet: "Nothing don save yet.",
  },
  playbook: {
    title: "If person wan expose you",
    subtitle: "Read this one before you reply dem.",
    steps: [
      { title: "1. No pay, no reply with fear", body: "To pay no dey end am — e dey show say you go pay again. Take your time before you reply anything." },
      { title: "2. Lock your accounts", body: "Change password for email and social media, turn on two-factor, check if another person don login your account." },
      { title: "3. Save everything", body: "Screenshot every message before you block am. Keep am for your vault — no depend on the app to keep copy." },
      { title: "4. Tell person wey you trust", body: "Na isolation dey make this thing work for dem. If one person know, your options go change." },
      { title: "5. Report through the right way", body: "Use the app report way for extortion/blackmail specifically — e dey go different place from normal abuse report." },
    ],
  },
  panic: {
    title: "Panic alert",
    subtitle: "E go send your location to your trusted people immediately.",
    confirmTitle: "Send alert now?",
    confirmBody: "Your trusted people go get message with your live location. Nothing else go change for your screen.",
    sendAlert: "Yes, alert dem now",
    cancel: "Cancel",
    sent: "Alert don send",
    sentBody: "Your people don get your location. This screen go return to normal small time.",
    standard: "Alert your trusted people only",
    critical: "🚨 CRITICAL — Alert police/NGO too",
  },
  threat: {
    analyzing: "Dey analyze threat level...",
    score: "Threat score",
    category: "Category",
    urgency: "Urgency",
    keywords: "Keywords wey dem find",
    entities: "Things wey dem find",
    summary: "Summary",
    critical: "Critical",
    high: "High",
    medium: "Medium",
    low: "Low",
  },
};

const translations: Record<Locale, Translations> = { en, yo, ha, ig, pj };

let currentLocale: Locale = (localStorage.getItem("shield_locale") as Locale) || "en";

export function setLocale(locale: Locale): void {
  currentLocale = locale;
  localStorage.setItem("shield_locale", locale);
  document.documentElement.lang = locale;
  document.documentElement.dir = "ltr"; // All Nigerian languages are LTR
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t(path: string): string {
  const keys = path.split(".");
  let value: unknown = translations[currentLocale];
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      // Fallback to English
      value = translations.en;
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return path;
        }
      }
      break;
    }
  }
  return typeof value === "string" ? value : path;
}

export function tArray(path: string): Array<{ title: string; body: string }> {
  const value = t(path);
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

// Initialize
setLocale(currentLocale);