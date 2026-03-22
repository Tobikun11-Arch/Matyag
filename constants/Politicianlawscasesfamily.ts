// ─────────────────────────────────────────────────────────────────────────────
// MATYAG — Laws, Cases & Family Dataset (Demo / Hackathon Use Only)
// All names, data, cases, and family connections are entirely fictional.
// News sources cited are real outlets but articles are fabricated for demo.
// ─────────────────────────────────────────────────────────────────────────────

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type BillStatus =
  | 'ENACTED INTO LAW'
  | 'SECOND READING'
  | 'COMMITTEE LEVEL'
  | 'VETOED'
  | 'LAPSED INTO LAW';

export type BillRole = 'Authored' | 'Co-Authored';

export interface LawEntry {
  billNumber: string;         // e.g. "RA 11954" or "SENATE BILL 1841"
  isRepublicAct: boolean;
  role: BillRole;
  date: string;               // e.g. "July 2023"
  title: string;
  description: string;
  status: BillStatus;
  notableVote?: 'YES' | 'NO' | 'ABSTAIN';
  coSponsors?: number;
}

export type CaseType = 'PUBLIC CONTROVERSY' | 'LEGAL CASE' | 'COA FLAG' | 'OMBUDSMAN' | 'MEDIA REPORT';
export type FlagCategory =
  | 'FLAG: RESOURCE ALLOCATION'
  | 'FLAG: PROCUREMENT ANOMALY'
  | 'FLAG: LIFESTYLE CHECK'
  | 'FLAG: PLUNDER'
  | 'FLAG: GRAFT'
  | 'FLAG: SECTOR LEGITIMACY'
  | 'FLAG: CONFLICT OF INTEREST';

export type CaseStatus = 'PENDING' | 'DISMISSED' | 'ACQUITTED' | 'UNDER REVIEW';

export interface NewsSource {
  name: string;               // e.g. "PCIJ", "Rappler", "GMA News"
  logo: string;               // short slug for logo lookup e.g. "pcij" | "rappler" | "gma"
  url: string;                // fictional article URL for demo
}

export interface CaseEntry {
  type: CaseType;
  date: string;
  title: string;
  description: string;
  flagCategory: FlagCategory;
  status: CaseStatus;
  sources: NewsSource[];
}

export type FamilyRole =
  | 'PATRIARCH'
  | 'MATRIARCH'
  | 'SPOUSE'
  | 'MEMBER'
  | 'SIBLING'
  | 'PARENT';

export interface FamilyMember {
  name: string;
  role: FamilyRole;
  position?: string;          // e.g. "Governor", "Representative", "Mayor" — omit if no political role
  isCurrentPolitician?: boolean; // true if this person is also in the dataset
  currentPoliticianId?: string;
}

export interface FamilyData {
  hasDynasty: boolean;
  members: FamilyMember[];    // ordered: parents/spouse first, then children/siblings
  dynastyNote?: string;       // short note shown under the family tree
}

export interface PoliticianLCF {
  id: string;
  laws: LawEntry[];
  cases: CaseEntry[];         // empty array if no flags
  family: FamilyData;
}

// ─── NEWS SOURCE HELPERS ──────────────────────────────────────────────────────

const PCIJ: NewsSource    = { name: 'PCIJ',        logo: 'pcij',    url: 'https://pcij.org/article/demo' };
const RAPPLER: NewsSource = { name: 'Rappler',     logo: 'rappler', url: 'https://rappler.com/article/demo' };
const INQUIRER: NewsSource= { name: 'Inquirer',    logo: 'inquirer',url: 'https://inquirer.net/article/demo' };
const GMA: NewsSource     = { name: 'GMA News',    logo: 'gma',     url: 'https://gmanetwork.com/article/demo' };
const ABSCBN: NewsSource  = { name: 'ABS-CBN News',logo: 'abscbn',  url: 'https://news.abs-cbn.com/article/demo' };
const PHILSTAR: NewsSource= { name: 'PhilStar',    logo: 'philstar', url: 'https://philstar.com/article/demo' };
const MANILATIMES: NewsSource={ name: 'Manila Times',logo:'manilatimes',url:'https://manilatimes.net/article/demo' };
const BUSINESSWORLD: NewsSource={ name: 'BusinessWorld',logo:'businessworld',url:'https://businessworld.com.ph/article/demo' };

// ─────────────────────────────────────────────────────────────────────────────
// PRESIDENTS
// ─────────────────────────────────────────────────────────────────────────────

const presidentsLCF: PoliticianLCF[] = [
  {
    id: 'p-001', // Ricardo "Ricky" Montemayor — BPC, 2 pending flags
    laws: [
      {
        billNumber: 'RA 11782',
        isRepublicAct: true,
        role: 'Authored',
        date: 'March 2021',
        title: 'National Infrastructure Modernization Act',
        description: 'Mandates a 10-year rolling infrastructure master plan and establishes the National Infrastructure Authority to coordinate all major public works.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 18,
      },
      {
        billNumber: 'SENATE BILL 2104',
        isRepublicAct: false,
        role: 'Authored',
        date: 'August 2023',
        title: 'Border Security Enhancement Act',
        description: 'Strengthens maritime and land border surveillance through integrated radar systems and expanded Coast Guard and AFP joint patrol coverage.',
        status: 'SECOND READING',
        coSponsors: 9,
      },
      {
        billNumber: 'RA 11540',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'June 2019',
        title: 'Regional Road Connectivity Act',
        description: 'Allocates ₱80B over five years to close the road network gap in Regions I, II, and CAR, linking 142 isolated barangays to provincial highways.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 22,
      },
    ],
    cases: [
      {
        type: 'COA FLAG',
        date: 'September 2022',
        title: 'Infrastructure Fund Disallowance — ₱12M Irregularity',
        description: 'The Commission on Audit issued a Notice of Disallowance covering ₱12M released from the regional infrastructure fund during Montemayor\'s governorship. COA found that three road contracts were awarded without competitive public bidding. Montemayor\'s office has submitted a motion for reconsideration citing emergency procurement rules.',
        flagCategory: 'FLAG: PROCUREMENT ANOMALY',
        status: 'PENDING',
        sources: [PCIJ, INQUIRER],
      },
      {
        type: 'OMBUDSMAN',
        date: 'February 2023',
        title: 'Overpriced Medical Supplies Procurement',
        description: 'The Ombudsman received a complaint alleging that ₱4.8M worth of medical supplies procured during the COVID-19 response in Ilocos Norte were overpriced by at least 300% compared to PhilGEPS reference prices. The complaint was filed by a local government watchdog. The Ombudsman has ordered Montemayor to submit a counter-affidavit.',
        flagCategory: 'FLAG: PROCUREMENT ANOMALY',
        status: 'PENDING',
        sources: [RAPPLER, ABSCBN],
      },
    ],
    family: {
      hasDynasty: true,
      members: [
        { name: 'Elena Montemayor', role: 'SPOUSE', position: undefined },
        { name: 'Gov. Rodrigo Montemayor', role: 'SIBLING', position: 'Governor, Ilocos Norte' },
        { name: 'Rep. Clarinda Montemayor-Fajardo', role: 'SIBLING', position: 'Representative, 1st District, Ilocos Norte' },
        { name: 'Mayor Danilo Montemayor', role: 'MEMBER', position: 'Mayor, Laoag City' },
      ],
      dynastyNote: 'The Montemayor family has held overlapping positions in Ilocos Norte for over two decades, controlling the governorship, a congressional seat, and the Laoag City mayoralty simultaneously.',
    },
  },

  {
    id: 'p-002', // Esperanza "Espe" Villanueva-Santos — DP, clean record
    laws: [
      {
        billNumber: 'RA 11717',
        isRepublicAct: true,
        role: 'Authored',
        date: 'January 2022',
        title: 'Universal Maternal Care Act',
        description: 'Guarantees free prenatal, delivery, and postnatal care for all Filipino women in public health facilities, regardless of PhilHealth membership status.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 27,
      },
      {
        billNumber: 'RA 11601',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'May 2020',
        title: 'Anti-Political Dynasty Act',
        description: 'Prohibits immediate family members of elected officials from running for any public office in the same province or city within one electoral cycle.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 14,
      },
      {
        billNumber: 'HOUSE BILL 7823',
        isRepublicAct: false,
        role: 'Authored',
        date: 'October 2023',
        title: 'Expanded Malasakit Centers Bill',
        description: 'Mandates Malasakit Centers in all Level 3 and Level 4 government hospitals and standardizes the application process for indigent patient financial assistance.',
        status: 'COMMITTEE LEVEL',
        coSponsors: 31,
      },
    ],
    cases: [], // clean record
    family: {
      hasDynasty: false,
      members: [
        { name: 'Dr. Ramon Santos', role: 'SPOUSE', position: undefined },
        { name: 'Miguel Santos', role: 'MEMBER', position: undefined },
        { name: 'Isabel Santos', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is a private physician. No relatives currently hold or have held elective office.',
    },
  },

  {
    id: 'p-003', // Aurelio "Dodong" Cabanero III — LM, 2 pending flags
    laws: [
      {
        billNumber: 'RA 11489',
        isRepublicAct: true,
        role: 'Authored',
        date: 'February 2019',
        title: 'Comprehensive Agriculture Modernization Act',
        description: 'Consolidates fragmented agriculture support programs under a single National Agriculture Modernization Authority and establishes a ₱50B annual agriculture productivity fund.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 19,
      },
      {
        billNumber: 'RA 11820',
        isRepublicAct: true,
        role: 'Authored',
        date: 'September 2022',
        title: 'Federalism Framework Resolution Act',
        description: 'Creates a Constitutional Commission tasked to draft a federal charter within 18 months, setting out the composition, powers, and revenue-sharing formula for federal states.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 12,
      },
      {
        billNumber: 'SENATE BILL 1977',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'March 2023',
        title: 'Death Penalty Restoration Bill',
        description: 'Reimposes capital punishment for heinous crimes including drug trafficking, murder of a minor, and qualified rape. Bill currently pending plenary debate.',
        status: 'SECOND READING',
        notableVote: 'YES',
        coSponsors: 8,
      },
    ],
    cases: [
      {
        type: 'LEGAL CASE',
        date: 'November 2017',
        title: 'Regional Development Fund Irregularity — Sandiganbayan',
        description: 'The Sandiganbayan tried Cabanero on charges of malversation of public funds related to ₱22M drawn from the Regional Development Fund during his term as Mayor of Digos. The prosecution alleged funds were disbursed to ghost infrastructure projects. Cabanero was acquitted in 2019 after the court ruled that disbursement records were properly documented.',
        flagCategory: 'FLAG: RESOURCE ALLOCATION',
        status: 'DISMISSED',
        sources: [INQUIRER, GMA, PHILSTAR],
      },
      {
        type: 'OMBUDSMAN',
        date: 'June 2022',
        title: 'Road Contract Anomaly — Ongoing Probe',
        description: 'The Ombudsman is investigating a complaint that a ₱38M road widening contract in Davao del Sur was awarded to a firm with connections to Cabanero\'s campaign finance network. The PCIJ first reported the contract link in July 2022. Cabanero denies involvement, stating all procurement followed RA 9184 procedures.',
        flagCategory: 'FLAG: PROCUREMENT ANOMALY',
        status: 'PENDING',
        sources: [PCIJ, RAPPLER, ABSCBN],
      },
    ],
    family: {
      hasDynasty: true,
      members: [
        { name: 'Nelia Cabanero', role: 'SPOUSE', position: undefined },
        { name: 'Rep. Aurelio Cabanero IV', role: 'MEMBER', position: 'Representative, 2nd District, Davao del Sur' },
        { name: 'Mayor Florencio Cabanero', role: 'MEMBER', position: 'Mayor, Digos City' },
        { name: 'Gov. Ernesto Cabanero Jr.', role: 'SIBLING', position: 'Governor, Davao del Sur' },
      ],
      dynastyNote: 'The Cabanero family controls the Davao del Sur governorship, the Digos City mayoralty, and a congressional district simultaneously — a textbook three-branch local dynasty.',
    },
  },

  {
    id: 'p-004', // Lorenzo "Enzo" Bautista-Reyes — KP, clean record
    laws: [
      {
        billNumber: 'RA 11853',
        isRepublicAct: true,
        role: 'Authored',
        date: 'November 2022',
        title: 'Open Data Governance Act',
        description: 'Mandates all national government agencies to publish machine-readable datasets on a unified open data portal within 90 days of collection, with enforceable data freshness standards.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 16,
      },
      {
        billNumber: 'SENATE BILL 1641',
        isRepublicAct: false,
        role: 'Authored',
        date: 'January 2024',
        title: 'Digital Connectivity Act',
        description: 'Mandates zero-rated data access to government portals and educational platforms for all registered students and civil servants.',
        status: 'SECOND READING',
        coSponsors: 24,
      },
      {
        billNumber: 'SENATE BILL 1196',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'June 2022',
        title: 'Freedom of Information Full Implementation Act',
        description: 'Extends FOI coverage to all government-owned and controlled corporations and local government units, closing the loophole that had kept most GOCCs exempt from public records requests.',
        status: 'COMMITTEE LEVEL',
        coSponsors: 11,
      },
    ],
    cases: [], // clean record
    family: {
      hasDynasty: false,
      members: [
        { name: 'Patricia Bautista-Reyes', role: 'SPOUSE', position: undefined },
        { name: 'Lucas Bautista-Reyes', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Wife is a private sector executive. No relatives hold elective or appointive government positions.',
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// VICE PRESIDENTS
// ─────────────────────────────────────────────────────────────────────────────

const vicePresidentsLCF: PoliticianLCF[] = [
  {
    id: 'vp-001', // Corazon "Cora" Dimaculangan — BPC, clean record
    laws: [
      {
        billNumber: 'RA 11641',
        isRepublicAct: true,
        role: 'Authored',
        date: 'December 2021',
        title: 'OFW Protection and Welfare Act',
        description: 'Consolidates OFW protection under a single Department of Migrant Workers, establishes a ₱5B OFW Emergency Repatriation Fund, and mandates legal assistance for all documented overseas Filipino workers facing labor disputes.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 20,
      },
      {
        billNumber: 'RA 11776',
        isRepublicAct: true,
        role: 'Authored',
        date: 'June 2022',
        title: 'Socialized Housing Expanded Fund Act',
        description: 'Increases the National Housing Authority\'s annual appropriation by ₱30B and mandates on-site or near-site relocation for all informal settler families affected by infrastructure projects.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 17,
      },
      {
        billNumber: 'SENATE BILL 2011',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'February 2024',
        title: 'Remittance Fee Reduction Act',
        description: 'Caps transaction fees for OFW remittances at 1% of transfer value and prohibits predatory foreign exchange conversion practices by accredited remittance centers.',
        status: 'SECOND READING',
        coSponsors: 13,
      },
    ],
    cases: [], // clean record
    family: {
      hasDynasty: false,
      members: [
        { name: 'Atty. Jose Dimaculangan', role: 'SPOUSE', position: undefined },
        { name: 'Sofia Dimaculangan', role: 'MEMBER', position: undefined },
        { name: 'Marco Dimaculangan', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is a private attorney. No relatives hold political office.',
    },
  },

  {
    id: 'vp-002', // Gregorio "Greg" Padua-Lim — DP, clean record
    laws: [
      {
        billNumber: 'RA 11808',
        isRepublicAct: true,
        role: 'Authored',
        date: 'August 2022',
        title: 'Budget Transparency and Open Procurement Act',
        description: 'Requires all government procuring entities to publish contract awards, bid results, and disbursement records on a publicly accessible digital portal within 72 hours of transaction.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 21,
      },
      {
        billNumber: 'RA 11544',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'July 2019',
        title: 'Anti-Red Tape Act Strengthening Amendment',
        description: 'Reduces maximum processing time for all government frontline services to three working days and establishes the Anti-Red Tape Authority with prosecutorial powers.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 29,
      },
      {
        billNumber: 'HOUSE BILL 6634',
        isRepublicAct: false,
        role: 'Authored',
        date: 'November 2023',
        title: 'Government Financial Intelligence Act',
        description: 'Establishes a Financial Intelligence Unit within the COA with authority to cross-reference SALN filings against bank records for elected officials with unexplained wealth.',
        status: 'COMMITTEE LEVEL',
        coSponsors: 8,
      },
    ],
    cases: [], // clean record
    family: {
      hasDynasty: false,
      members: [
        { name: 'Rowena Padua-Lim', role: 'SPOUSE', position: undefined },
        { name: 'Gabriel Padua-Lim', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Wife is a school principal. No relatives hold elective office.',
    },
  },

  {
    id: 'vp-003', // Maricel "MC" Tungol-Adriano — LM, 1 pending COA flag
    laws: [
      {
        billNumber: 'RA 11755',
        isRepublicAct: true,
        role: 'Authored',
        date: 'May 2022',
        title: 'Climate Adaptation Fund Act',
        description: 'Establishes a ₱15B annual Climate Adaptation Fund sourced from a dedicated carbon levy, prioritizing flood control, coastal protection, and climate-resilient infrastructure in typhoon-prone provinces.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 23,
      },
      {
        billNumber: 'SENATE BILL 1880',
        isRepublicAct: false,
        role: 'Authored',
        date: 'September 2023',
        title: 'Typhoon Resilience Infrastructure Standards Bill',
        description: 'Sets minimum structural standards for all public buildings in typhoon corridors and mandates wind-load engineering compliance audits for existing government structures.',
        status: 'SECOND READING',
        coSponsors: 15,
      },
      {
        billNumber: 'RA 11612',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'October 2020',
        title: 'National Land Use Act',
        description: 'Establishes a comprehensive land use framework that designates protected agricultural zones, urban expansion corridors, and disaster-risk exclusion areas, replacing the 30-year-old CLUP system.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 18,
      },
    ],
    cases: [
      {
        type: 'COA FLAG',
        date: 'March 2022',
        title: 'Calamity Fund Usage Discrepancy — ₱4.2M',
        description: 'The Commission on Audit flagged ₱4.2M in calamity fund releases during Tungol-Adriano\'s term as Governor of Leyte, citing missing liquidation documents for relief goods procured after Typhoon Odette. COA noted that three suppliers could not be located for post-audit verification. Tungol-Adriano\'s office argues that wartime-like conditions during the typhoon response justified emergency procurement and that documents are being reconstructed.',
        flagCategory: 'FLAG: RESOURCE ALLOCATION',
        status: 'PENDING',
        sources: [PCIJ, GMA],
      },
    ],
    family: {
      hasDynasty: true,
      members: [
        { name: 'Congressman Renato Adriano', role: 'SPOUSE', position: 'Representative, 1st District, Leyte' },
        { name: 'Mayor Cristina Tungol', role: 'SIBLING', position: 'Mayor, Tacloban City' },
      ],
      dynastyNote: 'The Tungol-Adriano family holds a senatorial candidacy, a congressional seat, and a city mayoralty across Leyte simultaneously.',
    },
  },

  {
    id: 'vp-004', // Fernan Delgado-Cruz — KP, clean record
    laws: [
      {
        billNumber: 'RA 11815',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'July 2022',
        title: 'National Broadband Plan Act',
        description: 'Mandates completion of a national fiber backbone reaching all 81 provincial capitals by 2027 and requires all internet service providers to offer a regulated affordable access tier.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 19,
      },
      {
        billNumber: 'HOUSE BILL 7201',
        isRepublicAct: false,
        role: 'Authored',
        date: 'April 2023',
        title: 'Digital Jobs and Remote Work Act',
        description: 'Creates a national digital jobs registry, provides startup grant incentives for youth-led tech enterprises, and mandates remote work options for all government positions where service delivery permits.',
        status: 'SECOND READING',
        coSponsors: 22,
      },
      {
        billNumber: 'RA 11699',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'March 2021',
        title: '5G Spectrum Allocation Act',
        description: 'Establishes a competitive spectrum auction framework for 5G frequencies and requires telcos to deploy coverage in all municipalities with populations above 5,000 within three years of license award.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 11,
      },
    ],
    cases: [], // clean record
    family: {
      hasDynasty: false,
      members: [
        { name: 'Maria Delgado-Cruz', role: 'SPOUSE', position: undefined },
        { name: 'Rafael Delgado-Cruz', role: 'MEMBER', position: undefined },
        { name: 'Ana Delgado-Cruz', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. No relatives hold elective office.',
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SENATORS
// ─────────────────────────────────────────────────────────────────────────────

const senatorsLCF: PoliticianLCF[] = [
  {
    id: 's-001', // Andres Macaraeg — BPC, 2 pending flags
    laws: [
      {
        billNumber: 'RA 11511',
        isRepublicAct: true,
        role: 'Authored',
        date: 'November 2019',
        title: 'Agrarian Reform Extension and Land Distribution Act',
        description: 'Extends the CARP land acquisition and distribution component for 10 years and increases the agrarian reform fund by ₱15B to cover remaining landholdings.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 14,
      },
      {
        billNumber: 'SENATE BILL 1742',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'May 2023',
        title: 'Rural Irrigation Rehabilitation Fund Bill',
        description: 'Appropriates ₱20B for the rehabilitation of irrigation systems serving over 300,000 hectares of rice and corn lands, prioritizing systems damaged by typhoons in the past decade.',
        status: 'SECOND READING',
        coSponsors: 10,
      },
    ],
    cases: [
      {
        type: 'LEGAL CASE',
        date: 'October 2021',
        title: 'Irregular Awarding of Regional Infrastructure Contracts',
        description: 'The Ombudsman filed graft charges against Macaraeg for allegedly directing the award of ₱45M in road contracts to a single firm linked to his former campaign manager during his term as Governor. Three former regional DPWH officers were named co-respondents. Macaraeg has pleaded not guilty and filed a motion to quash, arguing all bids complied with RA 9184.',
        flagCategory: 'FLAG: PROCUREMENT ANOMALY',
        status: 'PENDING',
        sources: [PCIJ, ABSCBN, INQUIRER],
      },
      {
        type: 'COA FLAG',
        date: 'July 2022',
        title: 'Public Works Fund Disallowance — ₱7.4M',
        description: 'COA disallowed ₱7.4M released from a Senate infrastructure allocation, finding that fund releases were credited to projects not listed in the approved GAA. Macaraeg\'s staff attributed the discrepancy to a miscoding error in the DBM system and has filed a motion for reconsideration.',
        flagCategory: 'FLAG: RESOURCE ALLOCATION',
        status: 'PENDING',
        sources: [GMA, PHILSTAR],
      },
    ],
    family: {
      hasDynasty: true,
      members: [
        { name: 'Lourdes Macaraeg', role: 'SPOUSE', position: undefined },
        { name: 'Gov. Andres Macaraeg Jr.', role: 'MEMBER', position: 'Governor, Ilocos Sur' },
        { name: 'Mayor Cecilia Macaraeg-Tolentino', role: 'MEMBER', position: 'Mayor, Vigan City' },
        { name: 'Rep. Bernardo Macaraeg', role: 'MEMBER', position: 'Representative, 2nd District, Ilocos Sur' },
      ],
      dynastyNote: 'The Macaraeg family is one of the most entrenched political dynasties in Ilocos Sur, controlling the governorship, a congressional seat, and a city mayoralty concurrently across three generations.',
    },
  },

  {
    id: 's-002', // Soledad "Sol" Ramos-Ferrer — DP, clean
    laws: [
      {
        billNumber: 'RA 11724',
        isRepublicAct: true,
        role: 'Authored',
        date: 'March 2022',
        title: 'SOGIE Equality Act',
        description: 'Prohibits discrimination based on sexual orientation, gender identity, and expression in employment, education, housing, and access to public services, with penalties of up to ₱500,000 and imprisonment.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 16,
      },
      {
        billNumber: 'RA 11648',
        isRepublicAct: true,
        role: 'Authored',
        date: 'July 2021',
        title: 'Mental Health Act — PhilHealth Coverage Amendment',
        description: 'Extends PhilHealth coverage to include outpatient psychiatric consultations, psychotherapy sessions, and community mental health center services for all members and their dependents.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 24,
      },
      {
        billNumber: 'SENATE BILL 2050',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'January 2024',
        title: 'Comprehensive Anti-Discrimination Bill',
        description: 'Expands anti-discrimination protections to cover age, disability, socioeconomic status, and religion in all public and private institutions.',
        status: 'COMMITTEE LEVEL',
        coSponsors: 12,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Dr. Ferdinand Ferrer', role: 'SPOUSE', position: undefined },
        { name: 'Camille Ferrer', role: 'MEMBER', position: undefined },
        { name: 'Paolo Ferrer', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is a private physician. No relatives hold elective office.',
    },
  },

  {
    id: 's-003', // Bonifacio "Bong" Ilustre — LM, dismissed case
    laws: [
      {
        billNumber: 'RA 11801',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'July 2022',
        title: 'Federalism Charter Change Resolution Act',
        description: 'Convenes a constitutional convention to draft a federal charter, establishing the composition and mandate of the convention body and setting a 24-month drafting timeline.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 11,
      },
      {
        billNumber: 'SENATE BILL 1933',
        isRepublicAct: false,
        role: 'Authored',
        date: 'April 2023',
        title: 'Death Penalty Restoration and Heinous Crimes Act',
        description: 'Reimposes the death penalty for drug trafficking involving quantities above 10 grams of shabu, qualified rape, and murder committed in the course of robbery.',
        status: 'SECOND READING',
        notableVote: 'YES',
        coSponsors: 7,
      },
      {
        billNumber: 'RA 11433',
        isRepublicAct: true,
        role: 'Authored',
        date: 'August 2018',
        title: 'Peace and Order Appropriations Increase Act',
        description: 'Increases the annual appropriation for PNP and BFP modernization by ₱12B and mandates the construction of 500 new police substations in geographically isolated and disadvantaged areas.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 20,
      },
    ],
    cases: [
      {
        type: 'LEGAL CASE',
        date: 'January 2018',
        title: 'Plunder Case — Sandiganbayan (Acquitted)',
        description: 'The Ombudsman charged Ilustre with plunder before the Sandiganbayan for allegedly siphoning ₱180M from the Cebu provincial development fund through ghost road projects during his governorship. After three years of trial, the Sandiganbayan acquitted Ilustre in April 2021, ruling that the prosecution failed to establish that he personally benefited from the disbursements. The Supreme Court denied the prosecution\'s motion for reconsideration in 2022.',
        flagCategory: 'FLAG: PLUNDER',
        status: 'ACQUITTED',
        sources: [INQUIRER, GMA, PHILSTAR, RAPPLER],
      },
    ],
    family: {
      hasDynasty: true,
      members: [
        { name: 'Amelia Ilustre', role: 'SPOUSE', position: undefined },
        { name: 'Gov. Bonifacio Ilustre Jr.', role: 'MEMBER', position: 'Governor, Cebu' },
        { name: 'Rep. Maribel Ilustre-Tiu', role: 'MEMBER', position: 'Representative, 4th District, Cebu' },
        { name: 'Mayor Eusebio Ilustre', role: 'MEMBER', position: 'Mayor, Cebu City' },
        { name: 'Board Member Lorenzo Ilustre', role: 'MEMBER', position: 'Board Member, Sangguniang Panlalawigan, Cebu' },
      ],
      dynastyNote: 'The Ilustre family is the most dominant political dynasty in Cebu, controlling the governorship, a city mayoralty, a congressional seat, and a provincial board seat simultaneously across two generations.',
    },
  },

  {
    id: 's-004', // Clarissa Navarro-Tan — KP, clean
    laws: [
      {
        billNumber: 'RA 11803',
        isRepublicAct: true,
        role: 'Authored',
        date: 'September 2022',
        title: 'Open Data and Government Transparency Act',
        description: 'Establishes mandatory open data publication standards for all national agencies, requires machine-readable budget and procurement data, and creates the Open Government Data Office under the DICT.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 18,
      },
      {
        billNumber: 'SENATE BILL 1588',
        isRepublicAct: false,
        role: 'Authored',
        date: 'July 2023',
        title: 'Cybersecurity Governance Act',
        description: 'Creates the National Cybersecurity Authority, mandates cybersecurity audits for all critical information infrastructure, and establishes a 24-hour National Cyber Incident Response Center.',
        status: 'SECOND READING',
        coSponsors: 14,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Engr. Victor Tan', role: 'SPOUSE', position: undefined },
        { name: 'Beatrix Tan', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is a civil engineer in the private sector.',
    },
  },

  {
    id: 's-005', // Herminio "Minong" Salcedo — BPC, 1 pending flag
    laws: [
      {
        billNumber: 'RA 11769',
        isRepublicAct: true,
        role: 'Authored',
        date: 'April 2022',
        title: 'Build Better More Infrastructure Act',
        description: 'Establishes a rolling 10-year national infrastructure pipeline, streamlines right-of-way acquisition, and mandates a 30% allocation of infrastructure funds for climate-resilient design.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 16,
      },
      {
        billNumber: 'SENATE BILL 1812',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'October 2023',
        title: 'PPP Streamlining and Investment Protection Bill',
        description: 'Reduces the PPP approvals timeline from 36 months to 12 months, establishes an investor dispute resolution mechanism, and creates a ₱10B government viability gap fund for social infrastructure projects.',
        status: 'SECOND READING',
        coSponsors: 9,
      },
    ],
    cases: [
      {
        type: 'MEDIA REPORT',
        date: 'August 2022',
        title: 'Irregular Quarry Permits Linked to Salcedo — PCIJ Investigation',
        description: 'A PCIJ investigation published in August 2022 found that at least 14 quarry permits in Pampanga were issued to companies linked to Salcedo\'s business associates during his time as Governor. The report alleged that quarry revenues bypassed local government depository accounts. Salcedo denied any connection, stating permit issuance is handled by the MGB and he had no role in approvals. The DENR initiated a review, which remains ongoing.',
        flagCategory: 'FLAG: CONFLICT OF INTEREST',
        status: 'UNDER REVIEW',
        sources: [PCIJ, ABSCBN],
      },
    ],
    family: {
      hasDynasty: true,
      members: [
        { name: 'Corazon Salcedo', role: 'SPOUSE', position: undefined },
        { name: 'Rep. Herminio Salcedo Jr.', role: 'MEMBER', position: 'Representative, 2nd District, Pampanga' },
        { name: 'Mayor Rolando Salcedo', role: 'SIBLING', position: 'Mayor, San Fernando City, Pampanga' },
      ],
      dynastyNote: 'The Salcedo family holds a senatorial post, a congressional seat, and a city mayoralty simultaneously across Pampanga.',
    },
  },

  {
    id: 's-006', // Theresa "Tess" Evangelista — IND, clean
    laws: [
      {
        billNumber: 'RA 11223',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'February 2019',
        title: 'Universal Health Care Act',
        description: 'Automatically enrolls all Filipinos in the National Health Insurance Program and mandates primary care services through a network of accredited local health systems.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 31,
      },
      {
        billNumber: 'RA 11748',
        isRepublicAct: true,
        role: 'Authored',
        date: 'February 2022',
        title: 'PhilHealth Reform and Anti-Corruption Act',
        description: 'Restructures the PhilHealth Board, introduces an independent audit committee, mandates quarterly public disclosure of benefit utilization data, and increases benefit packages for indigent members.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 22,
      },
      {
        billNumber: 'SENATE BILL 2030',
        isRepublicAct: false,
        role: 'Authored',
        date: 'December 2023',
        title: 'Rural Health Unit Upgrading Act',
        description: 'Mandates upgrading all 2,500 rural health units to meet Level 1 hospital standards within 5 years, with dedicated staffing requirements for doctors, nurses, and midwives in underserved municipalities.',
        status: 'COMMITTEE LEVEL',
        coSponsors: 17,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Dr. Renato Evangelista', role: 'SPOUSE', position: undefined },
        { name: 'Theresa Evangelista Jr.', role: 'MEMBER', position: undefined },
        { name: 'Marcus Evangelista', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is a retired surgeon. No relatives in elective or appointive government positions.',
    },
  },

  {
    id: 's-007', // Rodrigo "Digoy" Abad-Santos Jr. — LM, 2 pending flags
    laws: [
      {
        billNumber: 'RA 11709',
        isRepublicAct: true,
        role: 'Authored',
        date: 'January 2022',
        title: 'AFP Modernization Act — Extension and Enhancement',
        description: 'Extends the AFP Modernization Program for 15 years and authorizes ₱300B in equipment procurement covering naval vessels, combat aircraft, and cyber defense infrastructure.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 17,
      },
      {
        billNumber: 'SENATE BILL 1902',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'June 2023',
        title: 'Mindanao Security and Stabilization Framework Bill',
        description: 'Establishes an integrated civil-military operations framework for Mindanao, creating inter-agency security clusters and a dedicated Mindanao Peace and Security Fund.',
        status: 'SECOND READING',
        coSponsors: 10,
      },
    ],
    cases: [
      {
        type: 'COA FLAG',
        date: 'April 2021',
        title: 'Public Market Project Fund Irregularity — ₱8M COA Finding',
        description: 'The Commission on Audit flagged ₱8M released from a congressional allocation for the construction of a public market in Davao del Norte, finding that the project was completed at only 40% of contracted specifications while full payment was disbursed. COA recommended recovery of ₱4.8M and referral to the Ombudsman. The case is pending resolution.',
        flagCategory: 'FLAG: RESOURCE ALLOCATION',
        status: 'PENDING',
        sources: [PCIJ, GMA, INQUIRER],
      },
      {
        type: 'OMBUDSMAN',
        date: 'February 2023',
        title: 'Lifestyle Check — Unexplained Asset Growth Under Scrutiny',
        description: 'The Ombudsman initiated a lifestyle check on Abad-Santos after a civil society coalition filed a complaint noting that his declared SALN wealth grew from ₱18M to ₱63.5M over nine years — a 250% increase that critics argue is inconsistent with his declared income. The complaint was corroborated by a Rappler analysis of his annual SALN filings from 2014 to 2022.',
        flagCategory: 'FLAG: LIFESTYLE CHECK',
        status: 'PENDING',
        sources: [RAPPLER, MANILATIMES],
      },
    ],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Gloria Abad-Santos', role: 'SPOUSE', position: undefined },
        { name: 'Rodrigo Abad-Santos III', role: 'MEMBER', position: undefined },
        { name: 'Carla Abad-Santos', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political dynasty. Children are currently in private life. No relatives hold elective office.',
    },
  },

  {
    id: 's-008', // Patricia "Pat" Ocampo-Reyes — DP, clean
    laws: [
      {
        billNumber: 'RA 11596',
        isRepublicAct: true,
        role: 'Authored',
        date: 'November 2019',
        title: 'Anti-VAWC Act — Digital Harassment Amendment',
        description: 'Expands the Anti-Violence Against Women and Children Act to cover online harassment, non-consensual image sharing, and digital stalking, with protection orders enforceable against platform operators.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 28,
      },
      {
        billNumber: 'RA 11765',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'April 2022',
        title: 'Labor Code Flexibilization and Worker Protection Amendment',
        description: 'Bans all forms of labor-only contracting, mandates regularization after six months of continuous service, and increases night differential rates from 10% to 25%.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 19,
      },
      {
        billNumber: 'SENATE BILL 2066',
        isRepublicAct: false,
        role: 'Authored',
        date: 'February 2024',
        title: 'Women\'s Safe Workplaces Act',
        description: 'Requires all employers with 50 or more employees to appoint a trained Gender and Development focal person, conduct annual harassment audits, and publish results to their workforce.',
        status: 'SECOND READING',
        coSponsors: 20,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Atty. Marcos Reyes', role: 'SPOUSE', position: undefined },
        { name: 'Sofia Reyes', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is a private attorney. No relatives hold public office.',
    },
  },

  {
    id: 's-009', // Victorino "Vic" Gaston — BPC, 3 pending flags
    laws: [
      {
        billNumber: 'RA 11571',
        isRepublicAct: true,
        role: 'Authored',
        date: 'August 2020',
        title: 'Sugar Industry Development and Modernization Act',
        description: 'Establishes the Sugar Regulatory Authority with restructured governance, creates a ₱5B industry modernization fund, and mandates minimum farm-gate price support for sugar cane farmers.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 11,
      },
      {
        billNumber: 'SENATE BILL 1755',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'July 2023',
        title: 'Sugarcane Bioethanol Fuel Blending Increase Bill',
        description: 'Raises the mandatory bioethanol blend in fuel from 10% to 20%, projected to increase domestic sugar demand by 800,000 metric tons annually.',
        status: 'SECOND READING',
        coSponsors: 8,
      },
    ],
    cases: [
      {
        type: 'OMBUDSMAN',
        date: 'November 2021',
        title: 'Unexplained Asset Growth — Lifestyle Check',
        description: 'The Ombudsman opened a lifestyle check on Gaston after his SALN showed an asset increase of ₱61M over 12 years on a government salary. A civil society consortium submitted an analysis showing that Gaston\'s annual asset growth exceeded his combined declared income by an average of ₱5M per year. Gaston\'s camp attributes the growth to agricultural land appreciation in Negros Occidental.',
        flagCategory: 'FLAG: LIFESTYLE CHECK',
        status: 'PENDING',
        sources: [PCIJ, RAPPLER, INQUIRER],
      },
      {
        type: 'PUBLIC CONTROVERSY',
        date: 'August 2022',
        title: 'Sugar Importation Quota Anomaly — Congressional Inquiry',
        description: 'A congressional inquiry was opened after leaked SRA documents showed Gaston personally endorsed a sugar importation order covering 300,000 metric tons despite an existing SRA technical report recommending against importation. The anomaly resulted in a domestic oversupply that drove sugar prices down by 18%, affecting an estimated 700,000 sugar workers. The Department of Justice is conducting a parallel inquiry.',
        flagCategory: 'FLAG: CONFLICT OF INTEREST',
        status: 'PENDING',
        sources: [GMA, ABSCBN, BUSINESSWORLD],
      },
      {
        type: 'LEGAL CASE',
        date: 'March 2023',
        title: 'Malversation of Public Funds — Sandiganbayan',
        description: 'The Sandiganbayan is trying Gaston on charges of malversation for allegedly diverting ₱28M from the Negros Occidental local infrastructure fund to projects outside the approved project list. The COA report underlying the charges was filed in 2020. Pre-trial proceedings are ongoing. Gaston has pleaded not guilty.',
        flagCategory: 'FLAG: RESOURCE ALLOCATION',
        status: 'PENDING',
        sources: [PHILSTAR, MANILATIMES, PCIJ],
      },
    ],
    family: {
      hasDynasty: true,
      members: [
        { name: 'Pilar Gaston', role: 'SPOUSE', position: undefined },
        { name: 'Gov. Victorino Gaston Jr.', role: 'MEMBER', position: 'Governor, Negros Occidental' },
        { name: 'Rep. Carmelo Gaston', role: 'MEMBER', position: 'Representative, 3rd District, Negros Occidental' },
        { name: 'Mayor Isidro Gaston', role: 'MEMBER', position: 'Mayor, Bacolod City' },
        { name: 'Board Member Pilar Gaston-Reyes', role: 'MEMBER', position: 'Board Member, Sangguniang Panlalawigan, Negros Occidental' },
      ],
      dynastyNote: 'The Gaston family is widely cited as the most entrenched dynasty in Western Visayas, holding the Negros Occidental governorship, Bacolod City mayoralty, a congressional seat, and a provincial board seat simultaneously.',
    },
  },

  {
    id: 's-010', // Marisol Cabrera-Lim — KP, clean
    laws: [
      {
        billNumber: 'RA 11849',
        isRepublicAct: true,
        role: 'Authored',
        date: 'October 2022',
        title: 'Fintech Regulatory Sandbox Act',
        description: 'Creates a supervised regulatory sandbox allowing licensed fintech firms to test innovative financial products for 24 months before full BSP licensing, unlocking a fast-track pathway for digital lending, insurance, and payment innovations.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 15,
      },
      {
        billNumber: 'SENATE BILL 1611',
        isRepublicAct: false,
        role: 'Authored',
        date: 'September 2023',
        title: 'Digital Peso and CBDC Framework Bill',
        description: 'Authorizes the Bangko Sentral ng Pilipinas to issue a digital peso, establishes interoperability standards with e-wallets, and mandates digital peso acceptance by all government agencies.',
        status: 'SECOND READING',
        coSponsors: 13,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Engr. Anthony Lim', role: 'SPOUSE', position: undefined },
        { name: 'Isabelle Lim', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is a private sector engineer. No relatives hold elective office.',
    },
  },

  {
    id: 's-011', // Emmanuel "Manny" Florido — LM, dismissed case
    laws: [
      {
        billNumber: 'RA 11054',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'July 2018',
        title: 'Bangsamoro Organic Law',
        description: 'Establishes the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM), replacing the ARMM with a parliamentary form of government and a more expansive fiscal autonomy framework.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 35,
      },
      {
        billNumber: 'SENATE BILL 1870',
        isRepublicAct: false,
        role: 'Authored',
        date: 'March 2023',
        title: 'MILF Accord Full Normalization Implementation Act',
        description: 'Provides the legislative framework for the full normalization track of the Comprehensive Agreement on the Bangsamoro, including decommissioning support and socioeconomic integration of former combatants.',
        status: 'SECOND READING',
        coSponsors: 14,
      },
    ],
    cases: [
      {
        type: 'PUBLIC CONTROVERSY',
        date: 'March 2020',
        title: 'Extrajudicial Killing Allegation — Dismissed',
        description: 'A human rights group filed a complaint with the Ombudsman in March 2020 alleging that Florido ordered the killing of a local activist and former MILF liaison officer in Maguindanao in January 2020. The complaint cited two affidavits from witnesses who claimed Florido met with paramilitary leaders weeks before the killing. The Ombudsman dismissed the case in September 2022, ruling that the evidence was insufficient to establish probable cause. Florido denied all involvement throughout the proceedings.',
        flagCategory: 'FLAG: GRAFT',
        status: 'DISMISSED',
        sources: [RAPPLER, INQUIRER, ABSCBN],
      },
    ],
    family: {
      hasDynasty: true,
      members: [
        { name: 'Saidamen Florido', role: 'SPOUSE', position: undefined },
        { name: 'Gov. Hassan Florido', role: 'SIBLING', position: 'Governor, Maguindanao del Norte' },
      ],
      dynastyNote: 'Brother controls the Maguindanao del Norte governorship while Florido holds a Senate seat — a two-branch family presence in Bangsamoro governance.',
    },
  },

  {
    id: 's-012', // Jovita "Joy" Delos Santos — IND, clean
    laws: [
      {
        billNumber: 'RA 11767',
        isRepublicAct: true,
        role: 'Authored',
        date: 'March 2022',
        title: 'Climate Change Act — Strengthening Amendment',
        description: 'Raises mandatory climate change adaptation fund contributions from 5% to 10% of LGU local revenue, establishes the Climate Change Commission as an independent body, and sets binding emission reduction targets for 2030 and 2040.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 21,
      },
      {
        billNumber: 'RA 11832',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'January 2023',
        title: 'National Disaster Risk Reduction Fund Act',
        description: 'Establishes a permanent ₱50B National Disaster Risk Reduction Fund outside the annual appropriations process, ensuring pre-disaster mitigation projects are continuously funded regardless of congressional budget cycles.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 19,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Engr. Roberto Santos', role: 'SPOUSE', position: undefined },
        { name: 'Leia Santos', role: 'MEMBER', position: undefined },
        { name: 'Marco Santos', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is a structural engineer. No relatives hold elective office.',
    },
  },

  {
    id: 's-013', // Carlos Aquino-Mendez — DP, clean
    laws: [
      {
        billNumber: 'RA 11717',
        isRepublicAct: true,
        role: 'Authored',
        date: 'June 2021',
        title: 'Teachers\' Salary Standardization Act of 2021',
        description: 'Raises the base salary of public school teachers by 40% across all 19 salary grades and mandates a review every three years to maintain parity with cost of living increases.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 24,
      },
      {
        billNumber: 'SENATE BILL 1921',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'September 2023',
        title: 'SUC Budget Adequacy and Accountability Act',
        description: 'Mandates a minimum 15% annual increase in state university and college appropriations and requires SUC presidents to publish annual performance-budget alignment reports.',
        status: 'SECOND READING',
        coSponsors: 16,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Prof. Ligaya Mendez', role: 'SPOUSE', position: undefined },
        { name: 'Carlos Aquino-Mendez Jr.', role: 'MEMBER', position: undefined },
        { name: 'Maria Aquino-Mendez', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Wife is a university professor. No relatives hold public office.',
    },
  },

  {
    id: 's-014', // Rosario "Charo" Buenaventura — BPC, 1 pending flag
    laws: [
      {
        billNumber: 'RA 11479',
        isRepublicAct: true,
        role: 'Authored',
        date: 'July 2020',
        title: 'Anti-Terrorism Act',
        description: 'Defines terrorism and terrorist financing, establishes the Anti-Terrorism Council with authority to designate terrorist organizations, and creates a Human Security Act replacement framework with enhanced penalties.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 16,
      },
      {
        billNumber: 'RA 11694',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'December 2021',
        title: 'AFP Logistics and Equipment Procurement Reform Act',
        description: 'Creates a dedicated AFP Procurement Service independent of the DBM process, authorizing direct negotiation for classified equipment and fast-track procurement for emergency defense needs.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 13,
      },
      {
        billNumber: 'SENATE BILL 2044',
        isRepublicAct: false,
        role: 'Authored',
        date: 'November 2023',
        title: 'Mindanao Peace and Development Authority Act',
        description: 'Restructures the Mindanao Development Authority with a larger budget mandate, requires representation from all Bangsamoro sectors in its governing board, and establishes a Mindanao-specific development investment fund.',
        status: 'COMMITTEE LEVEL',
        coSponsors: 11,
      },
    ],
    cases: [
      {
        type: 'MEDIA REPORT',
        date: 'October 2023',
        title: 'PPP Contract Awarded to Relative\'s Firm — PCIJ Report',
        description: 'A PCIJ investigation published in October 2023 found that a ₱320M PPP road rehabilitation contract in the Zamboanga Peninsula was awarded to a construction firm co-owned by Buenaventura\'s brother-in-law. The PCIJ obtained BAC records showing the firm submitted the sole compliant bid after two other bidders were disqualified on technical grounds. Buenaventura denied involvement in the procurement, stating the BAC operated independently.',
        flagCategory: 'FLAG: CONFLICT OF INTEREST',
        status: 'UNDER REVIEW',
        sources: [PCIJ, RAPPLER],
      },
    ],
    family: {
      hasDynasty: true,
      members: [
        { name: 'Gen. (ret.) Eduardo Buenaventura', role: 'SPOUSE', position: undefined },
        { name: 'Rep. Clarita Buenaventura-Gomez', role: 'MEMBER', position: 'Representative, 2nd District, Zamboanga del Sur' },
        { name: 'Mayor Renaldo Buenaventura', role: 'SIBLING', position: 'Mayor, Zamboanga City' },
      ],
      dynastyNote: 'The Buenaventura family controls a Senate seat, a congressional district, and the Zamboanga City mayoralty simultaneously.',
    },
  },

  {
    id: 's-015', // Arnulfo "Jun" Tiongson — KP, clean
    laws: [
      {
        billNumber: 'RA 11841',
        isRepublicAct: true,
        role: 'Authored',
        date: 'February 2023',
        title: 'MSME Credit Access and Digitization Act',
        description: 'Mandates all universal and commercial banks to allocate 10% of their loan portfolio to MSMEs, establishes a ₱20B credit guarantee fund, and creates a digital MSME registry for streamlined loan application.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 18,
      },
      {
        billNumber: 'SENATE BILL 1677',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'August 2023',
        title: 'Corporate Tax Reduction and MSME Incentives Bill',
        description: 'Reduces the corporate income tax rate for MSMEs with gross revenues below ₱50M from 25% to 15% and introduces a simplified tax filing process for micro enterprises.',
        status: 'SECOND READING',
        coSponsors: 11,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Aileen Tiongson', role: 'SPOUSE', position: undefined },
        { name: 'Bea Tiongson', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Wife is an accountant. No relatives hold public office.',
    },
  },

  {
    id: 's-016', // Natividad "Naty" Vergara — LM, clean
    laws: [
      {
        billNumber: 'RA 11752',
        isRepublicAct: true,
        role: 'Authored',
        date: 'March 2022',
        title: 'Expanded Senior Citizens Act',
        description: 'Increases the monthly social pension for indigent senior citizens from ₱500 to ₱1,500, expands free medicine coverage to include maintenance drugs for hypertension and diabetes, and mandates priority lanes in all government offices.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 26,
      },
      {
        billNumber: 'RA 11592',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'September 2019',
        title: '4Ps Institutionalization and Expansion Act',
        description: 'Converts the 4Ps conditional cash transfer program from an executive program to a statutory entitlement, expands coverage to 6 million households, and establishes a monitoring board with civil society representation.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 22,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Domingo Vergara', role: 'SPOUSE', position: undefined },
        { name: 'Ana Vergara', role: 'MEMBER', position: undefined },
        { name: 'Luis Vergara', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is a retired schoolteacher. No relatives hold public office.',
    },
  },

  {
    id: 's-017', // Domingo "Doms" Espiritu III — BPC, 2 pending flags
    laws: [
      {
        billNumber: 'RA 11823',
        isRepublicAct: true,
        role: 'Authored',
        date: 'December 2022',
        title: 'General Appropriations Act — Fiscal Discipline Framework',
        description: 'Embeds a statutory debt ceiling mechanism in the annual GAA process, limits supplemental budgets to 5% of the original appropriation, and mandates mid-year public budget performance reports.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 14,
      },
      {
        billNumber: 'SENATE BILL 1748',
        isRepublicAct: false,
        role: 'Authored',
        date: 'June 2023',
        title: 'Progressive Capital Gains Tax Reform Bill',
        description: 'Introduces graduated capital gains tax rates for real property transactions and financial instruments, with revenues earmarked for education and social protection programs.',
        status: 'COMMITTEE LEVEL',
        coSponsors: 7,
      },
    ],
    cases: [
      {
        type: 'PUBLIC CONTROVERSY',
        date: 'July 2022',
        title: 'SALN Inconsistency — BIR Underdeclaration Flag',
        description: 'The Bureau of Internal Revenue flagged an inconsistency between Espiritu\'s income tax returns and his SALN filings after a civil society coalition requested a comparative audit. The BIR found that asset values declared in his 2019–2021 SALNs exceeded income tax return declarations by an average of ₱3.2M per year. Espiritu\'s accountant attributed the discrepancy to a difference in valuation methods for inherited real property.',
        flagCategory: 'FLAG: LIFESTYLE CHECK',
        status: 'UNDER REVIEW',
        sources: [RAPPLER, PCIJ],
      },
      {
        type: 'COA FLAG',
        date: 'March 2023',
        title: 'Medical Equipment Procurement Overpricing — ₱5.1M COA Finding',
        description: 'COA found that ₱5.1M worth of medical equipment procured under a Senate-endorsed allocation to a provincial hospital was overpriced by 220% compared to PhilGEPS reference prices. Three suppliers were found to be connected to a single beneficial owner. Espiritu\'s office says it had no role in the procurement process after endorsing the allocation.',
        flagCategory: 'FLAG: PROCUREMENT ANOMALY',
        status: 'PENDING',
        sources: [GMA, INQUIRER],
      },
    ],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Gloria Espiritu', role: 'SPOUSE', position: undefined },
        { name: 'Domingo Espiritu IV', role: 'MEMBER', position: undefined },
        { name: 'Rosario Espiritu', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. No relatives hold elective office.',
    },
  },

  {
    id: 's-018', // Leah Gonzales-Abueva — DP, first-time, clean
    laws: [],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Miguel Abueva', role: 'SPOUSE', position: undefined },
      ],
      dynastyNote: 'First-time candidate with no legislative record and no political family connections.',
    },
  },

  {
    id: 's-019', // Simplicio "Simpi" Datu-Apao — IND, clean
    laws: [
      {
        billNumber: 'RA 11790',
        isRepublicAct: true,
        role: 'Authored',
        date: 'July 2022',
        title: 'Indigenous Peoples Rights Act — Strengthening Amendment',
        description: 'Expands Free, Prior and Informed Consent requirements to cover all infrastructure projects on or adjacent to ancestral domains, establishes an IP Rights Enforcement Office under NCIP, and increases penalties for ancestral domain violations.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 20,
      },
      {
        billNumber: 'SENATE BILL 1855',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'April 2023',
        title: 'Mindanao Development Authority Modernization Act',
        description: 'Restructures MinDA with a new investment facilitation mandate, a ₱15B Mindanao Investment Fund, and representation of all ethnic minorities on its governing board.',
        status: 'SECOND READING',
        coSponsors: 12,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Rowena Datu-Apao', role: 'SPOUSE', position: undefined },
        { name: 'Hannah Datu-Apao', role: 'MEMBER', position: undefined },
        { name: 'Joshua Datu-Apao', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Wife is a public school principal. No relatives hold elective or appointive office.',
    },
  },

  {
    id: 's-020', // Felicitas "Fely" Monsod-Cruz — KP, clean
    laws: [
      {
        billNumber: 'RA 11712',
        isRepublicAct: true,
        role: 'Authored',
        date: 'February 2022',
        title: 'Renewable Energy Act — 50% Target Amendment',
        description: 'Sets a binding 50% renewable energy share in the national power mix by 2030, mandates the ERC to prioritize renewable energy dispatch, and creates a Green Energy Auction program to attract ₱500B in clean energy investment.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 23,
      },
      {
        billNumber: 'SENATE BILL 1799',
        isRepublicAct: false,
        role: 'Authored',
        date: 'August 2023',
        title: 'Coal Phase-Out Roadmap Act',
        description: 'Prohibits approval of new coal power plant applications, mandates a retirement schedule for existing coal plants by 2040, and establishes a Just Transition Fund for affected workers and communities.',
        status: 'SECOND READING',
        coSponsors: 17,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Dr. Andrei Cruz', role: 'SPOUSE', position: undefined },
        { name: 'Emilio Cruz', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is an environmental scientist. No relatives hold public office.',
    },
  },

  {
    id: 's-021', // Renato "Nato" Dimalanta — LM, dismissed case
    laws: [
      {
        billNumber: 'RA 11593',
        isRepublicAct: true,
        role: 'Authored',
        date: 'October 2019',
        title: 'Comprehensive Agrarian Reform Extension Act',
        description: 'Provides a 10-year extension of the CARP land acquisition program and increases the Land Bank agrarian reform fund by ₱25B to complete the titling of over 300,000 pending agrarian reform beneficiary land awards.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 15,
      },
      {
        billNumber: 'SENATE BILL 2012',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'January 2024',
        title: 'NPA Peace Talks Framework Resolution',
        description: 'Mandates the government peace panel to re-engage in substantive talks with the National Democratic Front under a structured timeline and establishes a joint monitoring committee for the duration of negotiations.',
        status: 'COMMITTEE LEVEL',
        coSponsors: 6,
      },
    ],
    cases: [
      {
        type: 'LEGAL CASE',
        date: 'August 2016',
        title: 'Election Protest — HRET (Dismissed)',
        description: 'A rival candidate filed an election protest before the House of Representatives Electoral Tribunal alleging widespread vote-buying in Ilocos Norte\'s 2nd District during the 2016 elections. The HRET dismissed the protest in September 2017, ruling that the evidence presented — primarily affidavits of alleged vote buyers — lacked corroboration and that the statistical analysis submitted was methodologically flawed. The dismissal was upheld on motion for reconsideration in February 2018.',
        flagCategory: 'FLAG: GRAFT',
        status: 'DISMISSED',
        sources: [PHILSTAR, GMA],
      },
    ],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Cristina Dimalanta', role: 'SPOUSE', position: undefined },
        { name: 'Renato Dimalanta Jr.', role: 'MEMBER', position: undefined },
        { name: 'Andrea Dimalanta', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Wife is a retired nurse. No relatives hold elective office.',
    },
  },

  {
    id: 's-022', // Carmela Yulo-Macasaet — DP, clean
    laws: [
      {
        billNumber: 'RA 11812',
        isRepublicAct: true,
        role: 'Authored',
        date: 'October 2022',
        title: 'PWD Inclusive Employment and Workplace Accommodation Act',
        description: 'Mandates reasonable workplace accommodations for PWD employees in all companies with 50 or more workers, establishes tax incentives for inclusive employers, and creates a PWD Employment Compliance Office under DOLE.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 21,
      },
      {
        billNumber: 'SENATE BILL 1634',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'August 2023',
        title: 'Mental Health Act — School-Based Services Amendment',
        description: 'Mandates one licensed guidance counselor per 500 students in all public schools, provides PhilHealth coverage for student mental health services, and establishes a student mental health emergency protocol.',
        status: 'SECOND READING',
        coSponsors: 18,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Dr. Noel Macasaet', role: 'SPOUSE', position: undefined },
        { name: 'Clara Macasaet', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is a psychiatrist. No relatives hold public office.',
    },
  },

  {
    id: 's-023', // Isidro "Sid" Arroyo-Perez — BPC, 1 pending flag
    laws: [
      {
        billNumber: 'RA 11743',
        isRepublicAct: true,
        role: 'Authored',
        date: 'January 2022',
        title: 'Tourism Infrastructure Development Fund Act',
        description: 'Channels ₱20B toward airport terminal upgrades, road access improvements, and visitor facility construction in 25 priority tourism destinations, funded by a 2% tourism infrastructure levy on hotel and resort accommodation.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 16,
      },
      {
        billNumber: 'SENATE BILL 1793',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'July 2023',
        title: 'Heritage Tourism and Cultural Sites Protection Act',
        description: 'Establishes a National Heritage Tourism Authority, mandates UNESCO nomination of 20 additional Filipino heritage sites by 2030, and prohibits commercialization within 100 meters of designated heritage zones.',
        status: 'SECOND READING',
        coSponsors: 12,
      },
    ],
    cases: [
      {
        type: 'MEDIA REPORT',
        date: 'September 2023',
        title: 'PPP Contract Awarded to Relative\'s Firm — Rappler Investigation',
        description: 'Rappler reported in September 2023 that a ₱180M PPP contract for a Cavite expressway service road was awarded to a construction company majority-owned by Arroyo-Perez\'s first cousin. The report cited DPWH procurement records showing the firm was pre-qualified despite having no prior government contract above ₱10M. The Cavite BAC confirmed the award but stated all procedures were properly followed.',
        flagCategory: 'FLAG: CONFLICT OF INTEREST',
        status: 'UNDER REVIEW',
        sources: [RAPPLER, GMA],
      },
    ],
    family: {
      hasDynasty: true,
      members: [
        { name: 'Rowena Arroyo-Perez', role: 'SPOUSE', position: undefined },
        { name: 'Mayor Crisanto Arroyo-Perez', role: 'SIBLING', position: 'Mayor, Tagaytay City' },
      ],
      dynastyNote: 'Brother holds the Tagaytay City mayoralty while Arroyo-Perez holds a Senate seat — a family presence spanning both the national legislature and local executive in the CALABARZON region.',
    },
  },

  {
    id: 's-024', // Marita Rebollos-Ocfemia — IND, clean
    laws: [
      {
        billNumber: 'RA 11783',
        isRepublicAct: true,
        role: 'Authored',
        date: 'May 2022',
        title: 'Volcano Hazard Zone Resettlement Act',
        description: 'Authorizes ₱12B for the voluntary resettlement of 45,000 households in permanent danger zones around Mayon, Kanlaon, and Taal volcanoes, with livelihood restoration packages and land tenure guarantees for resettled families.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 22,
      },
      {
        billNumber: 'SENATE BILL 1867',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'March 2023',
        title: 'Rice Tariffication Law — Small Farmer Protection Amendment',
        description: 'Increases the rice competitiveness enhancement fund from ₱10B to ₱20B annually, mandates direct cash transfers to rice farmers affected by import-induced price drops, and tightens enforcement of import volume thresholds.',
        status: 'SECOND READING',
        coSponsors: 14,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Engr. Roberto Ocfemia', role: 'SPOUSE', position: undefined },
        { name: 'Rina Ocfemia', role: 'MEMBER', position: undefined },
        { name: 'Carlo Ocfemia', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is a civil engineer. No relatives hold public office.',
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PARTY-LIST REPRESENTATIVES
// ─────────────────────────────────────────────────────────────────────────────

const partyListLCF: PoliticianLCF[] = [
  {
    id: 'pl-001', // Kristine Malaya — KP, clean
    laws: [
      {
        billNumber: 'RA 11838',
        isRepublicAct: true,
        role: 'Authored',
        date: 'January 2023',
        title: 'Student Loan Debt Relief and Restructuring Act',
        description: 'Provides loan restructuring options for 180,000 student borrowers under the CHED Study Now Pay Later Plan, caps interest rates at 2% annually, and establishes a debt forgiveness program for graduates employed in public service for five or more years.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 17,
      },
      {
        billNumber: 'HOUSE BILL 8802',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'September 2023',
        title: 'Youth Entrepreneurship Startup Act',
        description: 'Establishes a ₱2B Youth Startup Fund, provides tax holidays for youth-founded enterprises in their first three years, and mandates SUCs to operate startup incubation centers.',
        status: 'SECOND READING',
        coSponsors: 24,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Leo Malaya', role: 'MEMBER', position: undefined },
        { name: 'Rosa Malaya', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Parents are public school teachers. No relatives hold public office.',
    },
  },

  {
    id: 'pl-002', // Danilo Quiambao — LM, 1 pending flag
    laws: [
      {
        billNumber: 'RA 11724',
        isRepublicAct: true,
        role: 'Authored',
        date: 'April 2021',
        title: 'Farm-to-Market Road Priority Act',
        description: 'Mandates the DPWH to prioritize the construction of 600km of farm-to-market roads annually in agricultural provinces, funded by a dedicated ₱15B annual appropriation separate from regular DPWH allocations.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 19,
      },
      {
        billNumber: 'HOUSE BILL 8144',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'July 2023',
        title: 'Irrigation Systems Rehabilitation Fund Bill',
        description: 'Appropriates ₱20B for the rehabilitation of irrigation systems serving over 300,000 hectares of rice and corn lands, with priority given to systems damaged by typhoons in the past decade.',
        status: 'COMMITTEE LEVEL',
        coSponsors: 13,
      },
    ],
    cases: [
      {
        type: 'PUBLIC CONTROVERSY',
        date: 'August 2023',
        title: 'Sector Representation Legitimacy Dispute — COMELEC Review',
        description: 'A rival farmers\' organization filed a petition with COMELEC challenging whether BUHAY Magsasaka genuinely represents small farmers, alleging that over 60% of the organization\'s declared membership roster consists of individuals who are not active smallholder farmers. The petitioner submitted BIR and PSA records suggesting several listed members are large landowners. COMELEC has ordered BUHAY Magsasaka to submit an updated and verified membership list.',
        flagCategory: 'FLAG: SECTOR LEGITIMACY',
        status: 'PENDING',
        sources: [INQUIRER, GMA],
      },
    ],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Lolita Quiambao', role: 'SPOUSE', position: undefined },
        { name: 'Danilo Quiambao Jr.', role: 'MEMBER', position: undefined },
        { name: 'Carla Quiambao', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Wife is a cooperative bookkeeper. No relatives hold public office.',
    },
  },

  {
    id: 'pl-003', // Rosemarie "Bing" Tolentino — DP, clean
    laws: [
      {
        billNumber: 'RA 11783',
        isRepublicAct: true,
        role: 'Authored',
        date: 'March 2021',
        title: 'No-Endo Law — Anti-Contractualization Amendment',
        description: 'Closes loopholes in the ban on labor-only contracting, mandates regularization after six months of continuous service regardless of employment arrangement, and increases penalties for violating employers to ₱2M per affected worker.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 22,
      },
      {
        billNumber: 'RA 11672',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'October 2020',
        title: 'Wage Rationalization Act',
        description: 'Restructures the regional wage board system, mandates annual wage reviews, and sets a floor of 70% of estimated living wage for all wage orders.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 18,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Jaime Tolentino', role: 'SPOUSE', position: undefined },
        { name: 'Rina Tolentino', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is a factory worker and union member. No relatives hold public office.',
    },
  },

  {
    id: 'pl-004', // Ramonito "Ramie" Dagdagui — IND, clean
    laws: [
      {
        billNumber: 'RA 11818',
        isRepublicAct: true,
        role: 'Authored',
        date: 'November 2022',
        title: 'Free, Prior and Informed Consent Enforcement Act',
        description: 'Mandates FPIC compliance for all infrastructure and extractive industry projects within or adjacent to ancestral domains, creates an FPIC Violations Prosecution Office under the DOJ, and provides for automatic project suspension pending FPIC completion.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 16,
      },
      {
        billNumber: 'HOUSE BILL 8221',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'June 2023',
        title: 'Ancestral Domain Development Fund Bill',
        description: 'Establishes a ₱5B Ancestral Domain Development Fund managed by an IP-led board, funding sustainable livelihood, cultural preservation, and land titling programs for recognized indigenous communities.',
        status: 'SECOND READING',
        coSponsors: 11,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Remedios Dagdagui', role: 'SPOUSE', position: undefined },
        { name: 'Raymond Dagdagui', role: 'MEMBER', position: undefined },
        { name: 'Ruth Dagdagui', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Wife is a community health worker. No relatives hold public office.',
    },
  },

  {
    id: 'pl-005', // Glenda Corpuz-Ramos — KP, clean
    laws: [
      {
        billNumber: 'RA 11729',
        isRepublicAct: true,
        role: 'Authored',
        date: 'May 2021',
        title: 'Mandatory Accessibility Compliance Act',
        description: 'Requires all public buildings, transport terminals, and government offices to achieve full wheelchair and mobility device accessibility within three years, with fines of up to ₱500,000 per month for non-compliance.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 28,
      },
      {
        billNumber: 'HOUSE BILL 8330',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'August 2023',
        title: 'PWD Digital Inclusion and Assistive Technology Act',
        description: 'Mandates accessibility compliance for all government digital platforms, provides assistive technology grants for PWD students and workers, and requires DICT to maintain a free national assistive technology library.',
        status: 'SECOND READING',
        coSponsors: 20,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Rogelio Ramos', role: 'SPOUSE', position: undefined },
        { name: 'Gabriel Ramos', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Husband is a social worker. No relatives hold public office.',
    },
  },

  {
    id: 'pl-006', // Ernesto "Ernie" Bulan — IND, 1 pending flag
    laws: [
      {
        billNumber: 'RA 11796',
        isRepublicAct: true,
        role: 'Authored',
        date: 'August 2022',
        title: 'Fisherfolk Welfare and Maritime Rights Act',
        description: 'Extends PhilHealth and GSIS coverage to all registered municipal fisherfolk, establishes a ₱3B fisherfolk livelihood fund, and mandates exclusive municipal fishing zone enforcement by the BFAR.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 14,
      },
      {
        billNumber: 'HOUSE BILL 8510',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'October 2023',
        title: 'Coral Reef Protected Area Expansion Bill',
        description: 'Doubles the area of designated marine protected areas covering coral reef ecosystems, mandates community-based reef monitoring with fisherfolk as wardens, and increases penalties for illegal fishing within protected zones.',
        status: 'COMMITTEE LEVEL',
        coSponsors: 10,
      },
    ],
    cases: [
      {
        type: 'COA FLAG',
        date: 'May 2022',
        title: 'Fisherfolk Livelihood Fund Disbursement Irregularity — ₱1.8M',
        description: 'COA flagged ₱1.8M in disbursements from the congressional fisherfolk livelihood fund allocation, finding that 12 beneficiary boat operators listed as recipients could not be located during post-audit verification. Three of the listed boats had no registration on record with the BFAR. Bulan\'s office submitted a supplemental list of alternative beneficiaries and argues that the original lists were prepared by a third-party NGO partner whose records were incomplete.',
        flagCategory: 'FLAG: RESOURCE ALLOCATION',
        status: 'PENDING',
        sources: [GMA, ABSCBN],
      },
    ],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Maricel Bulan', role: 'SPOUSE', position: undefined },
        { name: 'Ernesto Bulan Jr.', role: 'MEMBER', position: undefined },
        { name: 'Liza Bulan', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Wife is a fish vendor and cooperative treasurer. No relatives hold public office.',
    },
  },

  {
    id: 'pl-007', // Sheryl Anne Mirasol — DP, clean
    laws: [
      {
        billNumber: 'RA 11814',
        isRepublicAct: true,
        role: 'Authored',
        date: 'October 2022',
        title: 'Women\'s Economic Rights and Equal Pay Act',
        description: 'Mandates equal pay audits for all employers with 50 or more employees, requires public disclosure of gender pay gap data, and creates financial penalties for companies with documented pay discrimination.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 25,
      },
      {
        billNumber: 'RA 11582',
        isRepublicAct: true,
        role: 'Co-Authored',
        date: 'July 2019',
        title: 'Safe Spaces Act — Digital Extension Amendment',
        description: 'Extends Safe Spaces Act coverage to online platforms, mandates social media companies to respond to gender-based harassment reports within 24 hours, and creates a digital safe spaces helpline under the PCW.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 30,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Carlos Mirasol', role: 'MEMBER', position: undefined },
        { name: 'Luz Mirasol', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Parents are both retired public school teachers. No relatives hold public office.',
    },
  },

  {
    id: 'pl-008', // Celestino "Lolo Tino" Pascual — BPC, clean
    laws: [
      {
        billNumber: 'RA 11752',
        isRepublicAct: true,
        role: 'Authored',
        date: 'April 2022',
        title: 'Social Pension Increase and Senior Welfare Act',
        description: 'Raises the monthly social pension for 4.5 million indigent senior citizens from ₱500 to ₱1,000, expands the Senior Citizens Act discount coverage to include digital services, and mandates dedicated senior counters in all government facilities.',
        status: 'ENACTED INTO LAW',
        notableVote: 'YES',
        coSponsors: 29,
      },
      {
        billNumber: 'HOUSE BILL 8612',
        isRepublicAct: false,
        role: 'Co-Authored',
        date: 'November 2023',
        title: 'Elder Care Facilities Standards and Accreditation Act',
        description: 'Establishes minimum staffing, nutritional, and medical standards for eldercare facilities, creates a mandatory accreditation system under DSWD, and provides tax incentives for compliant private eldercare operators.',
        status: 'SECOND READING',
        coSponsors: 22,
      },
    ],
    cases: [],
    family: {
      hasDynasty: false,
      members: [
        { name: 'Remedios Pascual', role: 'SPOUSE', position: undefined },
        { name: 'Nilo Pascual', role: 'MEMBER', position: undefined },
        { name: 'Gloria Pascual-Reyes', role: 'MEMBER', position: undefined },
        { name: 'Tino Pascual Jr.', role: 'MEMBER', position: undefined },
      ],
      dynastyNote: 'No political family connections. Children are all in private life. No relatives hold elective or appointive public office.',
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMBINED EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export const allLCF: PoliticianLCF[] = [
  ...presidentsLCF,
  ...vicePresidentsLCF,
  ...senatorsLCF,
  ...partyListLCF,
];

/**
 * Look up Laws, Cases & Family data for a single politician by their id.
 * Returns undefined if no data exists for that id.
 *
 * @example
 * import { getLCFById } from './politicianLawsCasesFamily';
 * const lcf = getLCFById('s-009');
 * // lcf.laws   → render in the Laws tab
 * // lcf.cases  → render in the Cases tab (empty array = clean record)
 * // lcf.family → render in the Family tab
 */
export const getLCFById = (id: string): PoliticianLCF | undefined =>
  allLCF.find(e => e.id === id);