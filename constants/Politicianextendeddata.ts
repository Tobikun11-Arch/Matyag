// ─────────────────────────────────────────────────────────────────────────────
// MATYAG — Extended Profile Data (Demo / Hackathon Use Only)
// Supplementary Experience & Records data for all politicians.
// All names, data, and records are entirely fictional.
// Import alongside politicians.ts and join by politician id.
// ─────────────────────────────────────────────────────────────────────────────

export interface ExperienceEntry {
  startYear: number;
  endYear: number | 'Present';
  title: string;
  organization: string;
  description: string;
  tags: string[];
}

export interface RecordsData {
  attendanceRate: number;
  attendanceSessions: string;
  lawsPassed: number;
  billsAuthored: number;
  billsCoAuthored: number;
  legislativeImpactSummary: string;
}

export interface PoliticianExtended {
  id: string;
  experience: ExperienceEntry[];
  records: RecordsData;
}

// ─────────────────────────────────────────────────────────────────────────────
// PRESIDENTS
// ─────────────────────────────────────────────────────────────────────────────

const presidentsExtended: PoliticianExtended[] = [
  {
    id: 'p-001', // Ricardo "Ricky" Montemayor
    experience: [
      {
        startYear: 2022,
        endYear: 'Present',
        title: 'Presidential Candidate',
        organization: 'Bagong Pilipinas Coalition',
        description: 'Running for President under the BPC banner, anchoring campaign on infrastructure expansion, border security, and anti-corruption reform.',
        tags: ['INFRASTRUCTURE', 'NATIONAL SECURITY'],
      },
      {
        startYear: 2016,
        endYear: 2022,
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Chaired the Senate Committee on Public Works. Authored the National Infrastructure Modernization Act and the Border Security Enhancement Bill.',
        tags: ['PUBLIC WORKS', 'LEGISLATION'],
      },
      {
        startYear: 2010,
        endYear: 2016,
        title: 'Governor',
        organization: 'Province of Ilocos Norte',
        description: 'Led the province through two terms, overseeing major road and bridge projects. Introduced the Ilocos Norte Digital Governance Program.',
        tags: ['EXECUTIVE', 'LOCAL GOVERNMENT'],
      },
      {
        startYear: 2004,
        endYear: 2010,
        title: 'Vice Governor',
        organization: 'Province of Ilocos Norte',
        description: 'Presided over the Sangguniang Panlalawigan and spearheaded the provincial tourism master plan.',
        tags: ['EXECUTIVE', 'TOURISM'],
      },
    ],
    records: {
      attendanceRate: 91,
      attendanceSessions: '109 of 120',
      lawsPassed: 12,
      billsAuthored: 47,
      billsCoAuthored: 33,
      legislativeImpactSummary:
        'Focused on national infrastructure and border security. Authored the National Infrastructure Modernization Act, increasing highway funding by 40%. Known for building cross-party coalitions on public works bills.',
    },
  },
  {
    id: 'p-002', // Esperanza "Espe" Villanueva-Santos
    experience: [
      {
        startYear: 2022,
        endYear: 'Present',
        title: 'Presidential Candidate',
        organization: 'Demokratikong Pagbabago',
        description: 'Running for President on a platform of universal healthcare, education reform, and gender equality legislation.',
        tags: ['HEALTHCARE', "WOMEN'S RIGHTS"],
      },
      {
        startYear: 2016,
        endYear: 2022,
        title: 'Congresswoman, 2nd District',
        organization: 'House of Representatives',
        description: 'Consistently ranked among the top legislators for attendance and output. Authored the Universal Maternal Care Act and co-authored the Expanded Malasakit Centers Bill.',
        tags: ['HEALTHCARE', 'LEGISLATION'],
      },
      {
        startYear: 2013,
        endYear: 2016,
        title: 'Undersecretary, Local Government',
        organization: 'Department of Interior and Local Government (DILG)',
        description: 'Oversaw local governance capacity building programs across Visayas and Mindanao. Introduced the LGU Performance Scorecard system.',
        tags: ['EXECUTIVE', 'GOVERNANCE'],
      },
      {
        startYear: 2007,
        endYear: 2013,
        title: 'City Councilor',
        organization: 'Cebu City Council',
        description: 'Authored city ordinances on gender-based violence prevention and public health emergency response.',
        tags: ['LOCAL GOVERNMENT', 'GENDER EQUALITY'],
      },
    ],
    records: {
      attendanceRate: 97,
      attendanceSessions: '116 of 120',
      lawsPassed: 18,
      billsAuthored: 63,
      billsCoAuthored: 41,
      legislativeImpactSummary:
        'One of the most productive legislators in this cycle. Championed universal healthcare and gender equality bills that became landmark laws. Maintains one of the highest attendance rates among presidential candidates.',
    },
  },
  {
    id: 'p-003', // Aurelio "Dodong" Cabanero III
    experience: [
      {
        startYear: 2022,
        endYear: 'Present',
        title: 'Presidential Candidate',
        organization: 'Laban ng Mamamayan',
        description: 'Running for President under a law-and-order and federalism platform, drawing on 18 years of executive and legislative experience.',
        tags: ['LAW & ORDER', 'FEDERALISM'],
      },
      {
        startYear: 2013,
        endYear: 2022,
        title: 'Senate President',
        organization: 'Senate of the Philippines',
        description: 'Presided over the Senate for two consecutive terms. Steered the Federalism Framework Resolution and the Comprehensive Agriculture Modernization Act.',
        tags: ['LEGISLATION', 'LEADERSHIP'],
      },
      {
        startYear: 2004,
        endYear: 2013,
        title: 'Mayor',
        organization: 'City of Digos, Davao del Sur',
        description: 'Three-term mayor known for aggressive peace and order campaigns and the Digos Urban Renewal Program. Received the Galing Pook Award in 2009.',
        tags: ['EXECUTIVE', 'LOCAL GOVERNMENT'],
      },
    ],
    records: {
      attendanceRate: 84,
      attendanceSessions: '101 of 120',
      lawsPassed: 24,
      billsAuthored: 89,
      billsCoAuthored: 57,
      legislativeImpactSummary:
        'Most experienced candidate by years in office with the highest laws-passed count among presidential candidates. Strong output on agriculture, security, and federalism legislation. Attendance rate below average, often cited during Senate recesses he called as Senate President.',
    },
  },
  {
    id: 'p-004', // Lorenzo "Enzo" Bautista-Reyes
    experience: [
      {
        startYear: 2022,
        endYear: 'Present',
        title: 'Presidential Candidate',
        organization: 'Kilusan Progresibo',
        description: 'Running for President as a reform outsider, anchoring campaign on digital economy, transparency, and judicial reform.',
        tags: ['DIGITAL ECONOMY', 'REFORM'],
      },
      {
        startYear: 2019,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'First-term senator focused on open data legislation and digital economy policy. Authored the Open Data Governance Act and the E-Government Services Modernization Bill.',
        tags: ['LEGISLATION', 'TECHNOLOGY'],
      },
      {
        startYear: 2012,
        endYear: 2019,
        title: 'Founder & CEO',
        organization: 'BautistaTech Inc.',
        description: 'Built one of the Philippines\' largest B2B software companies, employing over 3,000 Filipinos. Company acquired in 2019 prior to Senate run.',
        tags: ['PRIVATE SECTOR', 'TECHNOLOGY'],
      },
      {
        startYear: 2008,
        endYear: 2012,
        title: 'Technology Policy Advisor',
        organization: 'Department of Information and Communications Technology (DICT)',
        description: 'Advised on early national broadband policy and digital ID system feasibility studies.',
        tags: ['GOVERNMENT ADVISORY', 'TECHNOLOGY'],
      },
    ],
    records: {
      attendanceRate: 88,
      attendanceSessions: '106 of 120',
      lawsPassed: 4,
      billsAuthored: 28,
      billsCoAuthored: 19,
      legislativeImpactSummary:
        'Limited legislative track record as a first-term senator, but has focused on a clear transparency and digital reform agenda. The Open Data Governance Act is regarded as a landmark transparency law. Co-authored several Freedom of Information amendments.',
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// VICE PRESIDENTS
// ─────────────────────────────────────────────────────────────────────────────

const vicePresidentsExtended: PoliticianExtended[] = [
  {
    id: 'vp-001', // Corazon "Cora" Dimaculangan
    experience: [
      {
        startYear: 2022,
        endYear: 'Present',
        title: 'Vice Presidential Candidate',
        organization: 'Bagong Pilipinas Coalition',
        description: 'Running mate of Ricardo Montemayor. Leading campaign on OFW welfare, socialized housing, and expanded social services.',
        tags: ['OFW AFFAIRS', 'HOUSING'],
      },
      {
        startYear: 2016,
        endYear: 2022,
        title: 'Senate Majority Leader',
        organization: 'Senate of the Philippines',
        description: 'Served as Majority Leader during the 18th and 19th Congress. Managed floor debates and shepherded the OFW Protection Act and Expanded Housing Fund Bill into law.',
        tags: ['LEADERSHIP', 'LEGISLATION'],
      },
      {
        startYear: 2010,
        endYear: 2016,
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'First term focused on overseas Filipino worker rights. Authored the landmark Overseas Filipino Workers Protection Act.',
        tags: ['LEGISLATION', 'OFW AFFAIRS'],
      },
      {
        startYear: 2004,
        endYear: 2010,
        title: 'Congresswoman, 1st District',
        organization: 'House of Representatives',
        description: 'Two-term district representative for Pampanga\'s 1st District. Chaired the Committee on Migrant Workers Affairs.',
        tags: ['LEGISLATION', 'LOCAL REPRESENTATION'],
      },
    ],
    records: {
      attendanceRate: 96,
      attendanceSessions: '115 of 120',
      lawsPassed: 19,
      billsAuthored: 71,
      billsCoAuthored: 44,
      legislativeImpactSummary:
        'Regarded as the most effective legislative operator among VP candidates. Strong record on OFW protection and housing. As Majority Leader, successfully consolidated coalition votes on over 30 pieces of major legislation.',
    },
  },
  {
    id: 'vp-002', // Gregorio "Greg" Padua-Lim
    experience: [
      {
        startYear: 2022,
        endYear: 'Present',
        title: 'Vice Presidential Candidate',
        organization: 'Demokratikong Pagbabago',
        description: 'Running mate of Esperanza Villanueva-Santos. Anchoring campaign on fiscal transparency, anti-corruption, and good governance.',
        tags: ['ANTI-CORRUPTION', 'GOOD GOVERNANCE'],
      },
      {
        startYear: 2016,
        endYear: 2022,
        title: 'Congressman, Lone District',
        organization: 'House of Representatives',
        description: 'Two-term representative for Laguna\'s lone district. Authored the Budget Transparency and Open Procurement Act. Maintained a 99% attendance rate.',
        tags: ['LEGISLATION', 'FISCAL POLICY'],
      },
      {
        startYear: 2010,
        endYear: 2016,
        title: 'Commissioner',
        organization: 'Commission on Audit (COA)',
        description: 'Six-year COA commissioner focused on local government audit reforms. Introduced the COA Digital Audit Trail System, cutting disallowances by 35%.',
        tags: ['ACCOUNTABILITY', 'AUDIT'],
      },
      {
        startYear: 2004,
        endYear: 2010,
        title: 'State Auditor IV',
        organization: 'Commission on Audit (COA)',
        description: 'Led audit teams for DPWH and DSWD regional offices. Flagged over ₱200M in irregular disbursements during tenure.',
        tags: ['ACCOUNTABILITY', 'AUDIT'],
      },
    ],
    records: {
      attendanceRate: 99,
      attendanceSessions: '119 of 120',
      lawsPassed: 9,
      billsAuthored: 34,
      billsCoAuthored: 22,
      legislativeImpactSummary:
        'Near-perfect attendance record sets him apart. Budget Transparency Act is considered the most significant procurement reform in a decade. Legislative output modest but targeted — every bill authored directly relates to his anti-corruption platform.',
    },
  },
  {
    id: 'vp-003', // Maricel "MC" Tungol-Adriano
    experience: [
      {
        startYear: 2022,
        endYear: 'Present',
        title: 'Vice Presidential Candidate',
        organization: 'Laban ng Mamamayan',
        description: 'Running mate of Aurelio Cabanero. Platform centers on disaster resilience, rural development, and environmental protection.',
        tags: ['DISASTER RESILIENCE', 'ENVIRONMENT'],
      },
      {
        startYear: 2016,
        endYear: 2022,
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'First-term senator. Chaired the Committee on Climate Change and Disaster Preparedness. Authored the Climate Adaptation Fund Act and the Typhoon Resilience Infrastructure Bill.',
        tags: ['LEGISLATION', 'CLIMATE CHANGE'],
      },
      {
        startYear: 2007,
        endYear: 2016,
        title: 'Governor',
        organization: 'Province of Leyte',
        description: 'Two-term governor who led Leyte\'s post-Yolanda recovery. Built the award-winning Resilient Leyte Housing Program and established the first provincial disaster operations center.',
        tags: ['EXECUTIVE', 'DISASTER RECOVERY'],
      },
    ],
    records: {
      attendanceRate: 93,
      attendanceSessions: '112 of 120',
      lawsPassed: 11,
      billsAuthored: 41,
      billsCoAuthored: 27,
      legislativeImpactSummary:
        'Disaster resilience legislation is her defining legislative legacy. The Climate Adaptation Fund Act unlocked ₱15B in annual government disaster mitigation spending. Strong committee leadership record on climate and environment issues.',
    },
  },
  {
    id: 'vp-004', // Fernan Delgado-Cruz
    experience: [
      {
        startYear: 2022,
        endYear: 'Present',
        title: 'Vice Presidential Candidate',
        organization: 'Kilusan Progresibo',
        description: 'Running mate of Lorenzo Bautista-Reyes. Campaign focused on digital infrastructure, youth employment, and innovation policy.',
        tags: ['DIGITAL INFRASTRUCTURE', 'YOUTH'],
      },
      {
        startYear: 2019,
        endYear: 2022,
        title: 'Secretary',
        organization: 'Department of Information and Communications Technology (DICT)',
        description: 'Led the Free Wi-Fi for All program, connecting 10,000 public sites. Oversaw the National Broadband Network expansion to 37 provinces.',
        tags: ['EXECUTIVE', 'TECHNOLOGY'],
      },
      {
        startYear: 2016,
        endYear: 2019,
        title: 'Undersecretary for Connectivity',
        organization: 'Department of Information and Communications Technology (DICT)',
        description: 'Managed the national connectivity infrastructure roadmap. Spearheaded the first national 5G spectrum allocation framework.',
        tags: ['EXECUTIVE', 'TECHNOLOGY'],
      },
      {
        startYear: 2010,
        endYear: 2016,
        title: 'Founder',
        organization: 'Konekta Labs (Startup)',
        description: 'Built a rural internet service startup that expanded broadband access to 200+ barangays in Batangas and Quezon before acquisition.',
        tags: ['PRIVATE SECTOR', 'TECHNOLOGY'],
      },
    ],
    records: {
      attendanceRate: 90,
      attendanceSessions: '108 of 120',
      lawsPassed: 3,
      billsAuthored: 19,
      billsCoAuthored: 14,
      legislativeImpactSummary:
        'Most of his impact comes from executive action rather than legislation. As DICT Secretary, oversaw the most aggressive national connectivity expansion in Philippine history. Limited legislative record as a first-term candidate.',
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SENATORS
// ─────────────────────────────────────────────────────────────────────────────

const senatorsExtended: PoliticianExtended[] = [
  {
    id: 's-001', // Andres Macaraeg
    experience: [
      {
        startYear: 2004,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Three-term senator serving as Chair of the Committee on Agriculture and Food. Principal author of the Agrarian Reform Extension Act.',
        tags: ['AGRICULTURE', 'LEGISLATION'],
      },
      {
        startYear: 1998,
        endYear: 2004,
        title: 'Governor',
        organization: 'Province of Ilocos Sur',
        description: 'Two-term governor who prioritized rural road networks and irrigation system rehabilitation across Ilocos Sur.',
        tags: ['EXECUTIVE', 'LOCAL GOVERNMENT'],
      },
    ],
    records: {
      attendanceRate: 88,
      attendanceSessions: '176 of 200',
      lawsPassed: 31,
      billsAuthored: 102,
      billsCoAuthored: 68,
      legislativeImpactSummary:
        'Veteran legislator with the strongest agricultural reform record in the Senate. The Agrarian Reform Extension Act directly benefited an estimated 800,000 farmer-beneficiaries. High bill output but attendance has slipped in recent years.',
    },
  },
  {
    id: 's-002', // Soledad "Sol" Ramos-Ferrer
    experience: [
      {
        startYear: 2013,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term senator and Chair of the Committee on Women, Children, Family Relations and Gender Equality. Principal author of the SOGIE Equality Bill and Mental Health Act amendments.',
        tags: ['GENDER EQUALITY', 'MENTAL HEALTH'],
      },
      {
        startYear: 2007,
        endYear: 2013,
        title: 'Congresswoman, 2nd District',
        organization: 'House of Representatives',
        description: 'Two-term representative for Quezon City\'s 2nd District. Authored the first Safe Spaces Act at the local level, later adopted nationally.',
        tags: ['LEGISLATION', 'GENDER EQUALITY'],
      },
      {
        startYear: 2001,
        endYear: 2007,
        title: 'Executive Director',
        organization: 'Gabriela Women\'s Rights Foundation',
        description: 'Led one of the Philippines\' largest women\'s rights organizations, overseeing policy advocacy and legal aid for VAWC survivors.',
        tags: ['CIVIL SOCIETY', "WOMEN'S RIGHTS"],
      },
    ],
    records: {
      attendanceRate: 98,
      attendanceSessions: '196 of 200',
      lawsPassed: 22,
      billsAuthored: 78,
      billsCoAuthored: 50,
      legislativeImpactSummary:
        'Defining legislative voice on SOGIE rights and mental health policy. Near-perfect attendance record across two terms. The Mental Health Act Amendment expanded PhilHealth coverage to include outpatient psychiatric care for the first time.',
    },
  },
  {
    id: 's-003', // Bonifacio "Bong" Ilustre
    experience: [
      {
        startYear: 1998,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Four-term senator and former Senate President Pro Tempore. Highest legislative output in the current cycle. Vocal advocate for federalism and the restoration of the death penalty.',
        tags: ['FEDERALISM', 'LAW & ORDER'],
      },
      {
        startYear: 1992,
        endYear: 1998,
        title: 'Governor',
        organization: 'Province of Cebu',
        description: 'Two-term governor credited with the Cebu Economic Corridor project and early PPP ventures in infrastructure.',
        tags: ['EXECUTIVE', 'INFRASTRUCTURE'],
      },
    ],
    records: {
      attendanceRate: 79,
      attendanceSessions: '158 of 200',
      lawsPassed: 44,
      billsAuthored: 134,
      billsCoAuthored: 89,
      legislativeImpactSummary:
        'Most prolific legislator in the current cycle by raw output. Known for floor dominance and cross-aisle deal-making. Declining attendance rate in recent years is a noted concern. Acquitted of plunder in 2021.',
    },
  },
  {
    id: 's-004', // Clarissa Navarro-Tan
    experience: [
      {
        startYear: 2019,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'First-term senator and Chair of the Committee on Science, Technology, and Innovation. Authored the Open Data Bill and the Cybersecurity Governance Act.',
        tags: ['TECHNOLOGY', 'DIGITAL RIGHTS'],
      },
      {
        startYear: 2014,
        endYear: 2019,
        title: 'Technology Policy Consultant',
        organization: 'World Bank — Philippines Digital Economy Program',
        description: 'Led a five-year World Bank engagement on Philippine ICT policy, data governance, and digital infrastructure investment planning.',
        tags: ['INTERNATIONAL', 'TECHNOLOGY POLICY'],
      },
      {
        startYear: 2010,
        endYear: 2014,
        title: 'Director, ICT Policy',
        organization: 'National Telecommunications Commission (NTC)',
        description: 'Developed the first national data privacy framework, preceding the Data Privacy Act of 2012.',
        tags: ['GOVERNMENT', 'TECHNOLOGY POLICY'],
      },
    ],
    records: {
      attendanceRate: 96,
      attendanceSessions: '96 of 100',
      lawsPassed: 6,
      billsAuthored: 31,
      billsCoAuthored: 20,
      legislativeImpactSummary:
        'Most technically focused legislator in the Senate. The Open Data Bill established the first mandatory government data publication standards. Strong first-term attendance and a clear, specialized legislative agenda on digital rights.',
    },
  },
  {
    id: 's-005', // Herminio "Minong" Salcedo
    experience: [
      {
        startYear: 2010,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term senator and ranking member of the Committee on Public Works and Highways. Championed PPP-funded infrastructure in Central Luzon.',
        tags: ['INFRASTRUCTURE', 'PPP'],
      },
      {
        startYear: 2001,
        endYear: 2010,
        title: 'Governor',
        organization: 'Province of Pampanga',
        description: 'Three-term governor who oversaw Clark Freeport expansion and introduced the Pampanga Integrated Transport System.',
        tags: ['EXECUTIVE', 'INFRASTRUCTURE'],
      },
    ],
    records: {
      attendanceRate: 91,
      attendanceSessions: '182 of 200',
      lawsPassed: 19,
      billsAuthored: 88,
      billsCoAuthored: 55,
      legislativeImpactSummary:
        'Strong record on infrastructure and PPP legislation across two terms. The Build Better More Infrastructure Act is his most cited legislative achievement. PCIJ flag on quarry permits remains under review with no formal charges.',
    },
  },
  {
    id: 's-006', // Theresa "Tess" Evangelista
    experience: [
      {
        startYear: 2013,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term independent senator and Chair of the Committee on Health and Demography. Principal author of the PhilHealth Reform Act and key architect of the Universal Healthcare Law.',
        tags: ['HEALTHCARE', 'LEGISLATION'],
      },
      {
        startYear: 2007,
        endYear: 2013,
        title: 'Regional Director',
        organization: 'Department of Health (DOH) — Western Visayas',
        description: 'Led regional health programs across Western Visayas. Launched the Iloilo Universal Health Access Initiative, reducing maternal mortality by 28% in three years.',
        tags: ['HEALTH ADMINISTRATION', 'PUBLIC SERVICE'],
      },
      {
        startYear: 1998,
        endYear: 2007,
        title: 'Physician / Medical Officer',
        organization: 'Western Visayas Medical Center',
        description: 'Practiced internal medicine while serving as a public hospital medical officer. Specialized in infectious disease response and rural health unit supervision.',
        tags: ['MEDICINE', 'PUBLIC HEALTH'],
      },
    ],
    records: {
      attendanceRate: 97,
      attendanceSessions: '194 of 200',
      lawsPassed: 21,
      billsAuthored: 65,
      billsCoAuthored: 42,
      legislativeImpactSummary:
        'Most credible voice on healthcare legislation in the Senate. Co-authored the Universal Healthcare Act, extending PhilHealth coverage to 100% of Filipinos. One of the few senators consistently cited positively by civil society health monitors.',
    },
  },
  {
    id: 's-007', // Rodrigo "Digoy" Abad-Santos Jr.
    experience: [
      {
        startYear: 2007,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term senator and Chair of the Committee on National Defense and Security. Key author of the AFP Modernization Act Extension and the Mindanao Security Framework Resolution.',
        tags: ['DEFENSE', 'SECURITY'],
      },
      {
        startYear: 2001,
        endYear: 2007,
        title: 'Congressman, 1st District',
        organization: 'House of Representatives',
        description: 'Two-term representative for Davao del Norte\'s 1st District. Chaired the House Committee on Public Order and Safety.',
        tags: ['LEGISLATION', 'PUBLIC ORDER'],
      },
      {
        startYear: 1994,
        endYear: 2001,
        title: 'Provincial Board Member',
        organization: 'Sangguniang Panlalawigan, Davao del Norte',
        description: 'Led provincial law and order programs and chaired the public safety committee.',
        tags: ['LOCAL GOVERNMENT', 'PUBLIC ORDER'],
      },
    ],
    records: {
      attendanceRate: 85,
      attendanceSessions: '170 of 200',
      lawsPassed: 27,
      billsAuthored: 97,
      billsCoAuthored: 61,
      legislativeImpactSummary:
        'Strong record on defense and security legislation. AFP Modernization Act Extension secured ₱300B in equipment upgrades for the military. Two pending accountability cases, including an Ombudsman lifestyle check, currently under investigation.',
    },
  },
  {
    id: 's-008', // Patricia "Pat" Ocampo-Reyes
    experience: [
      {
        startYear: 2016,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term senator and Chair of the Committee on Women and Children. Authored landmark amendments to the Anti-VAWC Act and co-authored the Safe Spaces Act.',
        tags: ["WOMEN'S RIGHTS", 'LEGISLATION'],
      },
      {
        startYear: 2008,
        endYear: 2016,
        title: 'Labor Lawyer / Partner',
        organization: 'Ocampo, Reyes & Associates Law Firm',
        description: 'Handled landmark labor cases including the first class action suit under the Anti-Contractualization law. Represented over 5,000 workers in NLRC cases.',
        tags: ['LEGAL', 'LABOR'],
      },
      {
        startYear: 2004,
        endYear: 2008,
        title: 'Board Director',
        organization: 'National Labor Relations Commission (NLRC)',
        description: 'Appointed to the NLRC Board, handling appeals from regional arbitration branches.',
        tags: ['GOVERNMENT', 'LABOR'],
      },
    ],
    records: {
      attendanceRate: 99,
      attendanceSessions: '198 of 200',
      lawsPassed: 14,
      billsAuthored: 54,
      billsCoAuthored: 36,
      legislativeImpactSummary:
        'Highest attendance rate in the Senate this cycle. Anti-VAWC Act Amendment expanded protection orders to cover digital harassment. Known for methodical, thoroughly researched bill drafting — every authored bill passed through committee with minimal amendments.',
    },
  },
  {
    id: 's-009', // Victorino "Vic" Gaston
    experience: [
      {
        startYear: 2001,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Longest-serving active senator. Four-term member and former Chair of the Committee on Agriculture, Food, and Agrarian Reform. The dominant legislative voice on sugar industry policy.',
        tags: ['AGRICULTURE', 'SUGAR INDUSTRY'],
      },
      {
        startYear: 1992,
        endYear: 2001,
        title: 'Governor',
        organization: 'Province of Negros Occidental',
        description: 'Three-term governor and founder of the Negros Agricultural Development Corporation (NADC). Built 12 farm-to-market road networks during tenure.',
        tags: ['EXECUTIVE', 'AGRICULTURE'],
      },
    ],
    records: {
      attendanceRate: 74,
      attendanceSessions: '148 of 200',
      lawsPassed: 38,
      billsAuthored: 119,
      billsCoAuthored: 75,
      legislativeImpactSummary:
        'Highest legislative output and net worth among senators. Sugar Industry Development Act is his signature legislation. Three pending accountability cases and declining attendance are major concerns raised by civic watchdogs. Strong bloc voting power in agricultural regions.',
    },
  },
  {
    id: 's-010', // Marisol Cabrera-Lim
    experience: [
      {
        startYear: 2019,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'First-term senator and youngest sitting senator. Member of the Committee on Banks, Financial Institutions, and Currencies. Authored the Fintech Regulatory Sandbox Act.',
        tags: ['FINTECH', 'DIGITAL FINANCE'],
      },
      {
        startYear: 2014,
        endYear: 2019,
        title: 'Chief Executive Officer',
        organization: 'BayaniPay (Fintech Startup)',
        description: 'Co-founded and scaled a mobile payment platform serving unbanked communities. Platform reached 2 million users before she stepped down to run for Senate.',
        tags: ['PRIVATE SECTOR', 'FINTECH'],
      },
      {
        startYear: 2010,
        endYear: 2014,
        title: 'Product Manager',
        organization: 'GCash (G-Xchange Inc.)',
        description: 'Led the design and rollout of GCash\'s rural disbursement product used in government social protection transfers.',
        tags: ['PRIVATE SECTOR', 'TECHNOLOGY'],
      },
    ],
    records: {
      attendanceRate: 94,
      attendanceSessions: '94 of 100',
      lawsPassed: 3,
      billsAuthored: 27,
      billsCoAuthored: 18,
      legislativeImpactSummary:
        'Brought private-sector fintech expertise into the legislative process. The Fintech Regulatory Sandbox Act is credited with attracting ₱4B in digital finance investment since enactment. Limited track record as a first-term senator but strong committee presence.',
    },
  },
  {
    id: 's-011', // Emmanuel "Manny" Florido
    experience: [
      {
        startYear: 2013,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term senator and primary Senate sponsor of the Bangsamoro Organic Law. Chair of the Committee on Peace, Unification, and Reconciliation.',
        tags: ['PEACE PROCESS', 'BANGSAMORO'],
      },
      {
        startYear: 2007,
        endYear: 2013,
        title: 'Congressman, 2nd District',
        organization: 'House of Representatives',
        description: 'Two-term representative for Maguindanao\'s 2nd District. Active in the MILF peace negotiations as a legislative observer.',
        tags: ['LEGISLATION', 'PEACE PROCESS'],
      },
      {
        startYear: 2001,
        endYear: 2007,
        title: 'Vice Governor',
        organization: 'Province of Maguindanao',
        description: 'Presided over the Sangguniang Panlalawigan during a period of active conflict. Established the first inter-faith reconciliation council in the province.',
        tags: ['LOCAL GOVERNMENT', 'PEACE'],
      },
    ],
    records: {
      attendanceRate: 87,
      attendanceSessions: '174 of 200',
      lawsPassed: 18,
      billsAuthored: 73,
      billsCoAuthored: 46,
      legislativeImpactSummary:
        'Bangsamoro Organic Law sponsorship is widely regarded as the most significant peace legislation in a generation. Strong record on Mindanao-focused legislation. 2020 EJK allegation was dismissed in 2022 for lack of evidence.',
    },
  },
  {
    id: 's-012', // Jovita "Joy" Delos Santos
    experience: [
      {
        startYear: 2016,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term senator and Chair of the Committee on Climate Change. Authored the Climate Change Act Amendment and the Coastal Protection and Resiliency Act.',
        tags: ['CLIMATE CHANGE', 'DISASTER RESILIENCE'],
      },
      {
        startYear: 2010,
        endYear: 2016,
        title: 'Mayor',
        organization: 'Tacloban City, Leyte',
        description: 'Two-term mayor who led Tacloban\'s post-Yolanda recovery and reconstruction. Received the UN Resilient Cities Award in 2015.',
        tags: ['EXECUTIVE', 'DISASTER RECOVERY'],
      },
      {
        startYear: 2007,
        endYear: 2010,
        title: 'City Councilor',
        organization: 'Tacloban City Council',
        description: 'Authored the city\'s first Disaster Risk Reduction and Management ordinance, two years before the national DRRM law.',
        tags: ['LOCAL GOVERNMENT', 'DISASTER PREPAREDNESS'],
      },
    ],
    records: {
      attendanceRate: 96,
      attendanceSessions: '192 of 200',
      lawsPassed: 11,
      billsAuthored: 48,
      billsCoAuthored: 31,
      legislativeImpactSummary:
        'One of the most consistently rated senators by civil society. Coastal Protection Act established ₱8B in annual coastal resilience funding. Personal Yolanda experience gives her disaster resilience advocacy deep moral authority.',
    },
  },
  {
    id: 's-013', // Carlos Aquino-Mendez
    experience: [
      {
        startYear: 2013,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term senator and Chair of the Committee on Education, Arts, and Culture. Principal author of the Teachers\' Salary Standardization Act.',
        tags: ['EDUCATION', "TEACHERS' WELFARE"],
      },
      {
        startYear: 2007,
        endYear: 2013,
        title: 'Undersecretary for Finance',
        organization: 'Department of Education (DepEd)',
        description: 'Managed DepEd\'s budget allocation and oversaw the School Building Program that constructed 14,000 new classrooms nationwide.',
        tags: ['EDUCATION ADMINISTRATION', 'PUBLIC FINANCE'],
      },
      {
        startYear: 2001,
        endYear: 2007,
        title: 'Superintendent',
        organization: 'DepEd Division of Pangasinan I',
        description: 'Led the division covering 300 public schools. Launched the Pangasinan Literacy Plus Program, raising elementary reading rates by 22%.',
        tags: ['EDUCATION', 'PUBLIC SERVICE'],
      },
    ],
    records: {
      attendanceRate: 93,
      attendanceSessions: '186 of 200',
      lawsPassed: 17,
      billsAuthored: 61,
      billsCoAuthored: 40,
      legislativeImpactSummary:
        'Reliable workhorse legislator on education. Teachers\' Salary Standardization Act increased base teacher pay by 40%, benefiting 900,000 public school teachers. Clean record and consistent cross-party cooperation on education bills.',
    },
  },
  {
    id: 's-014', // Rosario "Charo" Buenaventura
    experience: [
      {
        startYear: 2004,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Three-term senator and ranking member of the Committee on National Defense. Key author of the Anti-Terrorism Act and the AFP Logistics Modernization Bill.',
        tags: ['DEFENSE', 'ANTI-TERRORISM'],
      },
      {
        startYear: 1998,
        endYear: 2004,
        title: 'Congresswoman, 1st District',
        organization: 'House of Representatives',
        description: 'Two-term representative for Zamboanga City\'s 1st District. Chaired the House Committee on National Defense and Security.',
        tags: ['LEGISLATION', 'DEFENSE'],
      },
      {
        startYear: 1992,
        endYear: 1998,
        title: 'City Councilor',
        organization: 'Zamboanga City Council',
        description: 'Authored ordinances on public safety and the first Zamboanga inter-faith peace covenant.',
        tags: ['LOCAL GOVERNMENT', 'PEACE'],
      },
    ],
    records: {
      attendanceRate: 82,
      attendanceSessions: '164 of 200',
      lawsPassed: 33,
      billsAuthored: 108,
      billsCoAuthored: 69,
      legislativeImpactSummary:
        'Among the most influential voices on national defense. Anti-Terrorism Act is her most prominent — and most contested — legislation. PCIJ investigation on relatives benefiting from government contracts is under review with no formal charges filed.',
    },
  },
  {
    id: 's-015', // Arnulfo "Jun" Tiongson
    experience: [
      {
        startYear: 2019,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'First-term senator and member of the Committee on Ways and Means. Authored the MSME Credit Access Act and the Corporate Tax Reform Bill.',
        tags: ['TAX REFORM', 'MSME'],
      },
      {
        startYear: 2013,
        endYear: 2019,
        title: 'National President',
        organization: 'Philippine MSME Confederation',
        description: 'Led the national advocacy body for micro, small, and medium enterprises. Lobbied successfully for the MSME Credit Access Act provisions.',
        tags: ['CIVIL SOCIETY', 'MSME'],
      },
      {
        startYear: 2007,
        endYear: 2013,
        title: 'Business Development Manager',
        organization: 'Land Bank of the Philippines',
        description: 'Managed the agri-lending portfolio for Laguna, growing MSME loan releases by 60% in six years.',
        tags: ['BANKING', 'MSME'],
      },
    ],
    records: {
      attendanceRate: 91,
      attendanceSessions: '91 of 100',
      lawsPassed: 2,
      billsAuthored: 22,
      billsCoAuthored: 14,
      legislativeImpactSummary:
        'Focused, if limited, legislative agenda on tax and SME policy. Lowest net worth among senators, which he cites as credibility for his pro-MSME platform. MSME Credit Access Act expanded lending to 500,000 small businesses in its first year.',
    },
  },
  {
    id: 's-016', // Natividad "Naty" Vergara
    experience: [
      {
        startYear: 2010,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term senator and Chair of the Committee on Social Justice and Human Rights. Key author of the Expanded Senior Citizens Act and the 4Ps Institutionalization Act.',
        tags: ['SOCIAL WELFARE', 'SENIOR CITIZENS'],
      },
      {
        startYear: 2004,
        endYear: 2010,
        title: 'Secretary',
        organization: 'Department of Social Welfare and Development (DSWD)',
        description: 'Led DSWD through two administrations. Scaled the 4Ps conditional cash transfer program from 300,000 to 4 million beneficiary households.',
        tags: ['SOCIAL WELFARE', 'EXECUTIVE'],
      },
      {
        startYear: 1998,
        endYear: 2004,
        title: 'Regional Director',
        organization: 'DSWD Region VIII (Eastern Visayas)',
        description: 'Managed social protection programs across Eastern Visayas, including post-disaster relief and community-based rehabilitation.',
        tags: ['SOCIAL WELFARE', 'PUBLIC SERVICE'],
      },
    ],
    records: {
      attendanceRate: 89,
      attendanceSessions: '178 of 200',
      lawsPassed: 23,
      billsAuthored: 84,
      billsCoAuthored: 53,
      legislativeImpactSummary:
        'Primary legislative champion for social protection programs. Expanded Senior Citizens Act extended medical subsidies to 7 million senior citizens. Strong grassroots support from 4Ps beneficiary communities. Clean record across two terms.',
    },
  },
  {
    id: 's-017', // Domingo "Doms" Espiritu III
    experience: [
      {
        startYear: 2010,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term senator and Chair of the Senate Finance Committee. Principal floor manager for the General Appropriations Act. Former Undersecretary of Finance.',
        tags: ['FISCAL POLICY', 'NATIONAL BUDGET'],
      },
      {
        startYear: 2005,
        endYear: 2010,
        title: 'Undersecretary for Fiscal Policy',
        organization: 'Department of Finance (DOF)',
        description: 'Led tax administration reform and SALN compliance monitoring. Authored the enhanced Bureau of Internal Revenue electronic filing system.',
        tags: ['EXECUTIVE', 'TAXATION'],
      },
      {
        startYear: 2000,
        endYear: 2005,
        title: 'Director IV, Fiscal Policy',
        organization: 'Department of Finance (DOF)',
        description: 'Prepared the medium-term fiscal framework and revenue projections for three consecutive national budgets.',
        tags: ['GOVERNMENT', 'FISCAL POLICY'],
      },
    ],
    records: {
      attendanceRate: 86,
      attendanceSessions: '172 of 200',
      lawsPassed: 26,
      billsAuthored: 91,
      billsCoAuthored: 58,
      legislativeImpactSummary:
        'Influential Senate Finance Chair responsible for shepherding national budgets. Ironically faces two pending financial irregularity cases — a SALN inconsistency and a COA procurement flag — despite his fiscal policy platform.',
    },
  },
  {
    id: 's-018', // Leah Gonzales-Abueva
    experience: [
      {
        startYear: 2022,
        endYear: 'Present',
        title: 'Senatorial Candidate',
        organization: 'Demokratikong Pagbabago',
        description: 'First-time senatorial candidate running on youth empowerment, affordable housing, and mobilizing first-time voters.',
        tags: ['YOUTH', 'AFFORDABLE HOUSING'],
      },
      {
        startYear: 2018,
        endYear: 2022,
        title: 'National President',
        organization: 'Kabataan Pilipinas (Youth Council Federation)',
        description: 'Led the national federation of over 2,000 youth councils. Launched the nationwide Boto Mo, Ipaglaban Mo voter registration campaign that registered 1.2 million youth voters.',
        tags: ['CIVIL SOCIETY', 'YOUTH'],
      },
      {
        startYear: 2015,
        endYear: 2018,
        title: 'Youth Councilor',
        organization: 'Sangguniang Kabataan, Cebu City',
        description: 'Served two SK terms. Established the Cebu City Youth Center and the first city-funded mental health program for students.',
        tags: ['LOCAL GOVERNMENT', 'YOUTH'],
      },
    ],
    records: {
      attendanceRate: 0,
      attendanceSessions: 'No legislative record yet',
      lawsPassed: 0,
      billsAuthored: 0,
      billsCoAuthored: 0,
      legislativeImpactSummary:
        'No legislative record as a first-time candidate. Impact comes from civic advocacy — her Boto Mo, Ipaglaban Mo campaign is credited with the highest youth voter registration in a decade. Brings grassroots youth organizing experience rather than a legislative track record.',
    },
  },
  {
    id: 's-019', // Simplicio "Simpi" Datu-Apao
    experience: [
      {
        startYear: 2016,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term independent senator and Chair of the Committee on Indigenous Cultural Communities and Indigenous Peoples. Principal author of the IPRA Amendment Act.',
        tags: ['INDIGENOUS PEOPLES', 'MINDANAO'],
      },
      {
        startYear: 2010,
        endYear: 2016,
        title: 'Mayor',
        organization: 'Cagayan de Oro City',
        description: 'Two-term mayor known for the Cagayan de Oro Urban Flood Control Program and the first city-level Free, Prior and Informed Consent ordinance.',
        tags: ['EXECUTIVE', 'LOCAL GOVERNMENT'],
      },
      {
        startYear: 2004,
        endYear: 2010,
        title: 'Vice Mayor',
        organization: 'Cagayan de Oro City',
        description: 'Presided over the city council and led the indigenous peoples\' rights committee.',
        tags: ['LOCAL GOVERNMENT', 'INDIGENOUS PEOPLES'],
      },
    ],
    records: {
      attendanceRate: 92,
      attendanceSessions: '184 of 200',
      lawsPassed: 9,
      billsAuthored: 43,
      billsCoAuthored: 28,
      legislativeImpactSummary:
        'Primary Senate voice for indigenous peoples rights. IPRA Amendment Act strengthened ancestral domain protections for over 14 million indigenous Filipinos. Known for bipartisan cooperation on Mindanao development legislation.',
    },
  },
  {
    id: 's-020', // Felicitas "Fely" Monsod-Cruz
    experience: [
      {
        startYear: 2016,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term senator and Chair of the Committee on Environment and Natural Resources. Authored the Renewable Energy Act Amendment and the Coal Phase-Out Roadmap Act.',
        tags: ['ENVIRONMENT', 'RENEWABLE ENERGY'],
      },
      {
        startYear: 2010,
        endYear: 2016,
        title: 'Undersecretary for Policy and Planning',
        organization: 'Department of Environment and Natural Resources (DENR)',
        description: 'Led DENR\'s national land use policy and climate change adaptation framework. Represented the Philippines at COP21 in Paris.',
        tags: ['EXECUTIVE', 'ENVIRONMENT'],
      },
      {
        startYear: 2004,
        endYear: 2010,
        title: 'Executive Director',
        organization: 'Philippine Climate Action Network (PhilCAN)',
        description: 'Led the country\'s largest climate advocacy coalition. Coordinated the first national carbon footprint audit of government operations.',
        tags: ['CIVIL SOCIETY', 'ENVIRONMENT'],
      },
    ],
    records: {
      attendanceRate: 95,
      attendanceSessions: '190 of 200',
      lawsPassed: 13,
      billsAuthored: 57,
      billsCoAuthored: 36,
      legislativeImpactSummary:
        'Leading environmental legislator this cycle. Renewable Energy Act Amendment set a 50% renewable target by 2030, attracting ₱120B in clean energy investment. Consistent high attendance and clean accountability record.',
    },
  },
  {
    id: 's-021', // Renato "Nato" Dimalanta
    experience: [
      {
        startYear: 2007,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term senator and member of the Committee on Agriculture and Peace. Principal author of the Comprehensive Agrarian Reform Extension Act. Notable as one of few senators to vote against the Anti-Terror Act.',
        tags: ['AGRARIAN REFORM', 'CIVIL LIBERTIES'],
      },
      {
        startYear: 2001,
        endYear: 2007,
        title: 'Congressman, 2nd District',
        organization: 'House of Representatives',
        description: 'Two-term representative for Ilocos Norte\'s 2nd District. Led House peace committee delegations to NPA-held areas in Cagayan Valley.',
        tags: ['LEGISLATION', 'PEACE PROCESS'],
      },
      {
        startYear: 1995,
        endYear: 2001,
        title: 'Provincial Board Member',
        organization: 'Sangguniang Panlalawigan, Ilocos Norte',
        description: 'Authored the Ilocos Norte Agrarian Dispute Resolution Code and the first provincial IP rights ordinance in Northern Luzon.',
        tags: ['LOCAL GOVERNMENT', 'AGRARIAN REFORM'],
      },
    ],
    records: {
      attendanceRate: 81,
      attendanceSessions: '162 of 200',
      lawsPassed: 29,
      billsAuthored: 111,
      billsCoAuthored: 70,
      legislativeImpactSummary:
        'High output legislator with a peace process and civil liberties focus. Comprehensive Agrarian Reform Extension is his signature bill. Anti-Terror Act dissent vote is frequently cited by civil society groups as a principled stand.',
    },
  },
  {
    id: 's-022', // Carmela Yulo-Macasaet
    experience: [
      {
        startYear: 2019,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'First-term senator and member of the Committee on Women, Children, Family Relations and Gender Equality. Authored the PWD Inclusive Employment Act and co-authored the SOGIE Equality Bill.',
        tags: ['LGBTQ+ RIGHTS', 'PWD INCLUSION'],
      },
      {
        startYear: 2013,
        endYear: 2019,
        title: 'Senior Partner / Disability Rights Lawyer',
        organization: 'Yulo, Macasaet & Flores Law Partners',
        description: 'Led the country\'s most active disability rights practice. Won landmark Supreme Court cases establishing reasonable accommodation standards for PWDs in the workplace.',
        tags: ['LEGAL', 'DISABILITY RIGHTS'],
      },
      {
        startYear: 2009,
        endYear: 2013,
        title: 'Legal Counsel',
        organization: 'National Council on Disability Affairs (NCDA)',
        description: 'Drafted the implementing rules for the Magna Carta for Disabled Persons amendments and represented NCDA before Congress.',
        tags: ['GOVERNMENT', 'DISABILITY RIGHTS'],
      },
    ],
    records: {
      attendanceRate: 97,
      attendanceSessions: '97 of 100',
      lawsPassed: 5,
      billsAuthored: 33,
      billsCoAuthored: 22,
      legislativeImpactSummary:
        'Intersectional advocacy is her defining brand — combining LGBTQ+, mental health, and disability rights in a single legislative agenda. PWD Inclusive Employment Act mandated PWD hiring quotas in all government agencies. Strong first-term attendance record.',
    },
  },
  {
    id: 's-023', // Isidro "Sid" Arroyo-Perez
    experience: [
      {
        startYear: 2013,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term senator and ranking member of the Committee on Tourism. Authored the Tourism Infrastructure Fund Bill and the Heritage Tourism Act.',
        tags: ['TOURISM', 'INFRASTRUCTURE'],
      },
      {
        startYear: 2007,
        endYear: 2013,
        title: 'Congressman, 3rd District',
        organization: 'House of Representatives',
        description: 'Two-term representative for Cavite\'s 3rd District. Chaired the House Committee on Public Works and championed the CALABARZON regional road network.',
        tags: ['LEGISLATION', 'PUBLIC WORKS'],
      },
      {
        startYear: 2001,
        endYear: 2007,
        title: 'Mayor',
        organization: 'Tagaytay City, Cavite',
        description: 'Two-term mayor who repositioned Tagaytay as a premium tourism destination. Introduced the Tagaytay Green Tourism Certification program.',
        tags: ['EXECUTIVE', 'TOURISM'],
      },
    ],
    records: {
      attendanceRate: 88,
      attendanceSessions: '176 of 200',
      lawsPassed: 20,
      billsAuthored: 76,
      billsCoAuthored: 48,
      legislativeImpactSummary:
        'Tourism and infrastructure focus across two Senate terms. Tourism Infrastructure Fund Bill channeled ₱20B toward airport and road upgrades in key tourist destinations. Rappler report on a PPP contract awarded to a relative\'s firm is under review.',
    },
  },
  {
    id: 's-024', // Marita Rebollos-Ocfemia
    experience: [
      {
        startYear: 2016,
        endYear: 'Present',
        title: 'Senator',
        organization: 'Senate of the Philippines',
        description: 'Two-term independent senator and Chair of the Committee on Agriculture. Principal author of the Volcano Hazard Zone Resettlement Act and the Rice Tariffication Law Amendment.',
        tags: ['DISASTER PREPAREDNESS', 'AGRICULTURE'],
      },
      {
        startYear: 2007,
        endYear: 2016,
        title: 'Governor',
        organization: 'Province of Albay',
        description: 'Three-term governor who institutionalized the Albay Zero-Casualty Evacuation Protocol — a model adopted nationally for volcanic hazard response.',
        tags: ['EXECUTIVE', 'DISASTER MANAGEMENT'],
      },
      {
        startYear: 2001,
        endYear: 2007,
        title: 'Vice Governor',
        organization: 'Province of Albay',
        description: 'Presided over the Sangguniang Panlalawigan and led the first inter-agency Mayon Volcano monitoring task force.',
        tags: ['LOCAL GOVERNMENT', 'DISASTER PREPAREDNESS'],
      },
    ],
    records: {
      attendanceRate: 94,
      attendanceSessions: '188 of 200',
      lawsPassed: 12,
      billsAuthored: 52,
      billsCoAuthored: 33,
      legislativeImpactSummary:
        'Disaster preparedness is her defining legislative identity. Volcano Hazard Zone Resettlement Act funded the relocation of 45,000 households from high-risk zones around Mayon. Respected across party lines for her practical, experience-based approach to legislation.',
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PARTY-LIST REPRESENTATIVES
// ─────────────────────────────────────────────────────────────────────────────

const partyListExtended: PoliticianExtended[] = [
  {
    id: 'pl-001', // Kristine Malaya
    experience: [
      {
        startYear: 2019,
        endYear: 'Present',
        title: 'Party-list Representative',
        organization: 'ALAB-Kabataan / House of Representatives',
        description: 'First-term representative for the youth sector. Authored the Student Debt Relief Act and the Universal Free Tertiary Education Enhancement Bill.',
        tags: ['EDUCATION', 'YOUTH'],
      },
      {
        startYear: 2016,
        endYear: 2019,
        title: 'National President',
        organization: 'Student Council Alliance of the Philippines (SCAP)',
        description: 'Led the national alliance of 1,200 student councils. Organized the first national student summit on education policy reform.',
        tags: ['CIVIL SOCIETY', 'YOUTH LEADERSHIP'],
      },
    ],
    records: {
      attendanceRate: 96,
      attendanceSessions: '96 of 100',
      lawsPassed: 3,
      billsAuthored: 18,
      billsCoAuthored: 12,
      legislativeImpactSummary:
        'Youngest party-list representative and most active on youth and education legislation. Student Debt Relief Act provided loan restructuring for 180,000 student borrowers. Strong attendance record for a first-term representative.',
    },
  },
  {
    id: 'pl-002', // Danilo Quiambao
    experience: [
      {
        startYear: 2016,
        endYear: 'Present',
        title: 'Party-list Representative',
        organization: 'BUHAY Magsasaka / House of Representatives',
        description: 'Second-term representative for the farmers sector. Authored the Farm-to-Market Road Priority Act and the Irrigation Systems Rehabilitation Fund Bill.',
        tags: ['AGRICULTURE', 'RURAL DEVELOPMENT'],
      },
      {
        startYear: 2008,
        endYear: 2016,
        title: 'Regional Coordinator',
        organization: 'Kilusang Magbubukid ng Pilipinas (KMP), Central Luzon',
        description: 'Led farmers\' rights advocacy across eight Central Luzon provinces. Organized the Bulacan-Pampanga Agrarian Reform Monitoring Coalition.',
        tags: ['CIVIL SOCIETY', 'FARMERS'],
      },
      {
        startYear: 2001,
        endYear: 2008,
        title: 'Cooperative President',
        organization: 'Central Luzon Farmers\' Cooperative Network',
        description: 'Led a 15-cooperative network covering 8,000 farmer-members. Expanded cold chain facilities and introduced organic certification for member farms.',
        tags: ['CIVIL SOCIETY', 'AGRICULTURE'],
      },
    ],
    records: {
      attendanceRate: 91,
      attendanceSessions: '182 of 200',
      lawsPassed: 7,
      billsAuthored: 24,
      billsCoAuthored: 16,
      legislativeImpactSummary:
        'Consistent advocate for smallholder farmers across two terms. Farm-to-Market Road Priority Act funded 600km of new rural roads. Faces ongoing COMELEC review on whether BUHAY Magsasaka genuinely represents small farmers.',
    },
  },
  {
    id: 'pl-003', // Rosemarie "Bing" Tolentino
    experience: [
      {
        startYear: 2016,
        endYear: 'Present',
        title: 'Party-list Representative',
        organization: 'SIKAP Manggagawa / House of Representatives',
        description: 'Second-term representative for the labor sector. Principal author of the No-Endo Law Amendment and the Wage Rationalization Act.',
        tags: ['LABOR', 'WORKERS\' RIGHTS'],
      },
      {
        startYear: 2001,
        endYear: 2016,
        title: 'National Secretary-General',
        organization: 'Trade Union Congress of the Philippines (TUCP)',
        description: 'Led national labor negotiations and represented Filipino workers before the International Labour Organization in Geneva.',
        tags: ['LABOR ORGANIZING', 'INTERNATIONAL'],
      },
      {
        startYear: 1995,
        endYear: 2001,
        title: 'Union Organizer',
        organization: 'Federation of Free Workers (FFW)',
        description: 'Organized 40 new union chapters in manufacturing zones across Calabarzon. Negotiated 28 collective bargaining agreements.',
        tags: ['LABOR ORGANIZING', 'CIVIL SOCIETY'],
      },
    ],
    records: {
      attendanceRate: 98,
      attendanceSessions: '196 of 200',
      lawsPassed: 9,
      billsAuthored: 31,
      billsCoAuthored: 20,
      legislativeImpactSummary:
        'Most effective labor sector legislator in the House this cycle. No-Endo Law Amendment ended contractualization for 1.2 million workers. Highest attendance rate among party-list representatives. Clean accountability record.',
    },
  },
  {
    id: 'pl-004', // Ramonito "Ramie" Dagdagui
    experience: [
      {
        startYear: 2019,
        endYear: 'Present',
        title: 'Party-list Representative',
        organization: 'UGAT ng Bayan / House of Representatives',
        description: 'First-term representative for the indigenous peoples sector. Authored the Free, Prior and Informed Consent Enforcement Act and the Ancestral Domain Development Fund Bill.',
        tags: ['INDIGENOUS PEOPLES', 'ANCESTRAL DOMAIN'],
      },
      {
        startYear: 2010,
        endYear: 2019,
        title: 'Regional Director',
        organization: 'National Commission on Indigenous Peoples (NCIP), Region XII',
        description: 'Led NCIP\'s operations across SOCCSKSARGEN. Processed 42 Certificates of Ancestral Domain Title covering 280,000 hectares.',
        tags: ['GOVERNMENT', 'INDIGENOUS PEOPLES'],
      },
      {
        startYear: 2003,
        endYear: 2010,
        title: 'Tribal Affairs Officer',
        organization: 'Office of the Presidential Adviser on the Peace Process (OPAPP)',
        description: 'Served as liaison between the national government and 18 indigenous communities in Mindanao during peace process negotiations.',
        tags: ['GOVERNMENT', 'PEACE PROCESS'],
      },
    ],
    records: {
      attendanceRate: 89,
      attendanceSessions: '89 of 100',
      lawsPassed: 4,
      billsAuthored: 14,
      billsCoAuthored: 9,
      legislativeImpactSummary:
        'Strong sector expertise brought from NCIP to the House. FPIC Enforcement Act is the most significant indigenous rights legislation in a decade. Limited legislative output as a first-term representative, but all authored bills directly address IP community needs.',
    },
  },
  {
    id: 'pl-005', // Glenda Corpuz-Ramos
    experience: [
      {
        startYear: 2016,
        endYear: 'Present',
        title: 'Party-list Representative',
        organization: 'TINDIG PWD / House of Representatives',
        description: 'Second-term representative for the PWD sector. Principal author of the Mandatory Accessibility Compliance Act and the PWD Inclusive Employment Act.',
        tags: ['PWD RIGHTS', 'ACCESSIBILITY'],
      },
      {
        startYear: 2010,
        endYear: 2016,
        title: 'Executive Director',
        organization: 'Philippine Coalition of PWD Organizations (PhilCPO)',
        description: 'Led the national PWD advocacy coalition. Spearheaded the Supreme Court petition that struck down inaccessible building permits as unconstitutional.',
        tags: ['CIVIL SOCIETY', 'DISABILITY RIGHTS'],
      },
      {
        startYear: 2005,
        endYear: 2010,
        title: 'Disability Rights Advocate',
        organization: 'Handicap International Philippines',
        description: 'Conducted nationwide accessibility audits of government buildings and transportation terminals. Filed 14 administrative cases against non-compliant agencies.',
        tags: ['CIVIL SOCIETY', 'ACCESSIBILITY'],
      },
    ],
    records: {
      attendanceRate: 97,
      attendanceSessions: '194 of 200',
      lawsPassed: 6,
      billsAuthored: 21,
      billsCoAuthored: 14,
      legislativeImpactSummary:
        'Most impactful PWD rights legislator in the House. Mandatory Accessibility Compliance Act required all public buildings to achieve full wheelchair accessibility within three years. Widely respected across party lines. Clean record across two terms.',
    },
  },
  {
    id: 'pl-006', // Ernesto "Ernie" Bulan
    experience: [
      {
        startYear: 2019,
        endYear: 'Present',
        title: 'Party-list Representative',
        organization: 'DAGAT Pilipinas / House of Representatives',
        description: 'First-term representative for the fisherfolk sector. Authored the Fisherfolk Welfare and Maritime Rights Act and the Coral Reef Protected Area Expansion Bill.',
        tags: ['FISHERFOLK', 'MARINE ENVIRONMENT'],
      },
      {
        startYear: 2009,
        endYear: 2019,
        title: 'President',
        organization: 'Western Visayas Fisherfolk Cooperative Federation',
        description: 'Led a federation of 87 fishing cooperatives covering 32,000 fisherfolk members. Negotiated the first exclusive municipal fishing zone agreements with three LGUs.',
        tags: ['CIVIL SOCIETY', 'FISHERFOLK'],
      },
      {
        startYear: 2002,
        endYear: 2009,
        title: 'Municipal Fisher Cooperative President',
        organization: 'Bantayan Island Fisherfolk Association',
        description: 'Led the local cooperative, introduced ice plant and cold storage facilities that extended market reach for members by 300km.',
        tags: ['CIVIL SOCIETY', 'FISHERIES'],
      },
    ],
    records: {
      attendanceRate: 85,
      attendanceSessions: '85 of 100',
      lawsPassed: 3,
      billsAuthored: 16,
      billsCoAuthored: 10,
      legislativeImpactSummary:
        'Sector expertise is his primary asset. Fisherfolk Welfare Act extended PhilHealth and GSIS coverage to 1.8 million municipal fisherfolk for the first time. One pending COA flag on a livelihood fund disbursement is under review.',
    },
  },
  {
    id: 'pl-007', // Sheryl Anne Mirasol
    experience: [
      {
        startYear: 2019,
        endYear: 'Present',
        title: 'Party-list Representative',
        organization: 'BUKAS Kababaihan / House of Representatives',
        description: 'First-term representative for the women sector. Highest bills-to-laws ratio among party-list representatives. Authored the Women\'s Economic Rights Strengthening Act and key Safe Spaces provisions.',
        tags: ["WOMEN'S RIGHTS", 'SAFE SPACES'],
      },
      {
        startYear: 2014,
        endYear: 2019,
        title: 'Programme Specialist',
        organization: 'UN Women Philippines',
        description: 'Managed UN Women\'s legislative advocacy and capacity-building programs. Led the Parliamentary Resource Guide on Gender-Responsive Budgeting used by 18 countries.',
        tags: ['INTERNATIONAL', "WOMEN'S RIGHTS"],
      },
      {
        startYear: 2009,
        endYear: 2014,
        title: 'Legal Officer',
        organization: 'Gabriela Commission on Women',
        description: 'Handled gender-based violence cases and drafted model barangay ordinances on VAWC response.',
        tags: ['LEGAL', "WOMEN'S RIGHTS"],
      },
    ],
    records: {
      attendanceRate: 99,
      attendanceSessions: '99 of 100',
      lawsPassed: 8,
      billsAuthored: 27,
      billsCoAuthored: 17,
      legislativeImpactSummary:
        'Perfect attendance and the highest bills-to-laws ratio in the party-list bloc. Women\'s Economic Rights Act mandated equal pay audits for all companies with 50+ employees. International experience with UN Women gives her legislation a global best-practice foundation.',
    },
  },
  {
    id: 'pl-008', // Celestino "Lolo Tino" Pascual
    experience: [
      {
        startYear: 2016,
        endYear: 'Present',
        title: 'Party-list Representative',
        organization: 'AGAPAY Senior / House of Representatives',
        description: 'Second-term representative for the senior citizens sector. Oldest member of the House this cycle. Authored the Senior Citizens Social Pension Increase Act and the Elder Care Facilities Standards Act.',
        tags: ['SENIOR CITIZENS', 'PENSION REFORM'],
      },
      {
        startYear: 2007,
        endYear: 2016,
        title: 'Board Member',
        organization: 'Social Security System (SSS)',
        description: 'Served on the SSS Board for three terms. Led the committee that expanded pension coverage to informal sector workers.',
        tags: ['SOCIAL SECURITY', 'GOVERNMENT ADVISORY'],
      },
      {
        startYear: 2000,
        endYear: 2007,
        title: 'National President',
        organization: 'Federation of Senior Citizens Associations of the Philippines (FSCAP)',
        description: 'Led the national federation of senior citizen associations. Lobbied successfully for the Expanded Senior Citizens Act provisions on free medicine and 20% discount.',
        tags: ['CIVIL SOCIETY', 'SENIOR CITIZENS'],
      },
    ],
    records: {
      attendanceRate: 88,
      attendanceSessions: '176 of 200',
      lawsPassed: 5,
      billsAuthored: 19,
      billsCoAuthored: 12,
      legislativeImpactSummary:
        'Beloved senior citizens advocate across two terms. Social Pension Increase Act raised monthly pensions from ₱500 to ₱1,000 for 4.5 million indigent seniors. Consistent and collegial approach earns him cross-aisle cooperation on social welfare legislation.',
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMBINED EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export const allExtended: PoliticianExtended[] = [
  ...presidentsExtended,
  ...vicePresidentsExtended,
  ...senatorsExtended,
  ...partyListExtended,
];

/**
 * Look up extended data for a single politician by their id.
 * Returns undefined if no extended data exists for that id.
 *
 * @example
 * import { getExtendedById } from './politicianExtendedData';
 * const ext = getExtendedById('s-002');
 * // ext.experience → timeline entries
 * // ext.records    → attendance, laws, bills, coAuthored, impact summary
 */
export const getExtendedById = (id: string): PoliticianExtended | undefined =>
  allExtended.find(e => e.id === id);