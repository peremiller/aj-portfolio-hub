import { useEffect, useRef, useState } from 'react'
import sunoFallback from './suno.json'

function AppFavicon({ url, name }) {
  const [failed, setFailed] = useState(false)
  let host = ''
  try {
    host = new URL(url).hostname
  } catch {
    host = ''
  }
  if (failed || !host) {
    return <div className="itemcard__faviconfallback" aria-hidden="true" />
  }
  return (
    <img
      className="itemcard__favicon"
      src={`https://www.google.com/s2/favicons?domain=${host}&sz=128`}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

// Minimalist line-icon set (Lucide-style: 24px grid, rounded 1.75 stroke,
// currentColor). Used for the app + Telegram-bot marks instead of emoji.
const ICON_PATHS = {
  'file-text': (
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v5h6" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </>
  ),
  landmark: (
    <>
      <line x1="3" x2="21" y1="22" y2="22" />
      <line x1="6" x2="6" y1="18" y2="11" />
      <line x1="10" x2="10" y1="18" y2="11" />
      <line x1="14" x2="14" y1="18" y2="11" />
      <line x1="18" x2="18" y1="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  'trending-up': (
    <>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </>
  ),
  sunrise: (
    <>
      <path d="M12 2v8" />
      <path d="m4.93 10.93 1.41 1.41" />
      <path d="M2 18h2" />
      <path d="M20 18h2" />
      <path d="m19.07 10.93-1.41 1.41" />
      <path d="M22 22H2" />
      <path d="m8 6 4-4 4 4" />
      <path d="M16 18a4 4 0 0 0-8 0" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  briefcase: (
    <>
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  'graduation-cap': (
    <>
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </>
  ),
  'file-video': (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="m10 11 5 3-5 3z" />
    </>
  ),
  calendar: (
    <>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </>
  ),
  'cloud-sun': (
    <>
      <path d="M12 2v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="M20 12h2" />
      <path d="m19.07 4.93-1.41 1.41" />
      <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
      <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
    </>
  ),
  languages: (
    <>
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </>
  ),
  'alert-triangle': (
    <>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  dollar: (
    <>
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </>
  ),
  film: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M3 7.5h4" />
      <path d="M3 12h18" />
      <path d="M3 16.5h4" />
      <path d="M17 3v18" />
      <path d="M17 7.5h4" />
      <path d="M17 16.5h4" />
    </>
  ),
}

function LineIcon({ name }) {
  const paths = ICON_PATHS[name]
  if (!paths) return null
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths}
    </svg>
  )
}

// Years of professional experience since December 2011 — recomputed on every load,
// so it advances automatically each year (e.g. 14+ now, 15+ from December 2026).
const CAREER_START_YEAR = 2011
const CAREER_START_MONTH = 12 // December
const now = new Date()
const experienceYears =
  now.getFullYear() - CAREER_START_YEAR - (now.getMonth() + 1 < CAREER_START_MONTH ? 1 : 0)

const profile = {
  name: 'AJ Miller T. Perez',
  headline: 'Product & Program Leader · Engineering Quality · AI-Enabled Transformation',
  tagline:
    `I don't treat quality as a checkpoint — I build it into the system. ${experienceYears}+ years turning business goals into execution frameworks that scale across engineering, product, and operations.`,
  location: 'Metro Manila, National Capital Region, Philippines',
  email: 'pjomill@gmail.com',
  phone: '+63 968 851 5632',
  linkedin: 'https://www.linkedin.com/in/millertperez/',
  resumeUrl: '/AJ-Miller-T-Perez-Resume.pdf',
}

const stats = [
  { value: `${experienceYears}+`, label: 'Years in QA & delivery' },
  { value: '20+', label: 'Engineers led' },
  { value: '95%', label: ['Accessibility', 'compliance'] },
  { value: '5', label: ['Industries', 'served'] },
]

const aboutParagraphs = [
  `I lead the delivery of complex digital products by aligning engineering quality, business outcomes, and scalable systems. Across ${experienceYears}+ years in Banking, Healthcare, E-Commerce, Legal, and Energy, I’ve evolved from hands-on QA into a cross-functional leader driving end-to-end execution — from strategy to release — for global clients.`,
  'I specialize in turning business goals into execution frameworks that scale, leading cross-functional teams across engineering, product, and operations, and driving Agile + DevOps transformations that improve speed, cost, and reliability. I embed AI quality, accessibility (CPACC), and risk-based thinking directly into the product lifecycle.',
  'Today I’m focused on Product and Program leadership roles — especially in AI, Fintech, and digital platforms — where I can drive both innovation and measurable business results.',
]

const jobs = [
  {
    period: 'Oct 2021 — Present',
    role: 'Software Quality Engineering Associate Manager',
    company: 'Accenture',
    loc: 'Metro Manila, Philippines',
    bullets: [
      'Led a GenAI transformation using GitHub Copilot and Gemini to improve test-planning efficiency, and reported directly to the Director of Quality Engineering.',
      'Managed a Selenium test-automation rollout for a 20-person QA team — reducing release cycle time by two weeks and cutting manual testing hours by 120 per month across five cross-functional teams.',
      'Built and implemented an accessibility strategy that raised compliance scores from 72% to 95% within six months, leading a team inclusive of PWDs.',
      'Grew the QA engineering team by 25% in 18 months and lifted certification completion (CPACC, Salesforce, GCP ACE, ISTQB) from 40% to 85% in two months via targeted training.',
      'Owned test strategy, planning, defect tracking, and metrics reporting across the full software development lifecycle.',
    ],
  },
  {
    period: 'Jul 2016 — Oct 2021',
    role: 'Senior Software Quality Assurance Engineer',
    company: 'RCG Global Services',
    loc: 'Makati City, Philippines',
    bullets: [
      'Led functional & regression testing for major US clients (Chico’s FAS, One Call Care, Disney) to ensure software met specified requirements.',
      'Used Google Analytics to identify user drop-off points and target regression tests, reducing critical defects by 25%.',
      'Ran A/B testing on new features, driving a 15% increase in user engagement for a major client.',
      'Authored operational runbooks for regression testing, improving cross-team consistency and reducing test-execution errors by 20%.',
      'Managed back-end data via SQL and performed performance & accessibility testing while sustaining a 10:1 developer-to-tester ratio.',
    ],
  },
  {
    period: 'Apr 2015 — Jul 2016',
    role: 'Software Quality Assurance Analyst',
    company: 'Kforce Global Solutions',
    loc: 'Ayala, Makati City, Philippines',
    bullets: [
      'Pioneered Visual Management Boards for infrastructure automation projects at Macquarie Bank.',
      'Automated deployment of virtual servers and databases and implemented process improvements that enhanced testing efficiency.',
      'Created comprehensive test-case designs covering all functional requirements.',
    ],
  },
  {
    period: 'Oct 2014 — Apr 2015',
    role: 'Richmedia Quality Assurance Analyst',
    company: 'Cognizant Technology Solutions',
    loc: 'Bonifacio Global City, Taguig, Philippines',
    bullets: [
      'Selected for the HTML5 multi-platform ads team among 50+ testers.',
      'Executed testing to ensure application performance across a range of desktop, mobile, and tablet devices.',
    ],
  },
  {
    period: 'Sep 2011 — Aug 2014',
    role: 'Software Quality Assurance Analyst',
    company: 'Icomteq Solutions',
    loc: 'Quezon City, Philippines',
    bullets: [
      'Awarded Most Outstanding Employee of the Year, 2013.',
      'Led metadata process improvement and established team wikis via Confluence.',
      'Led test execution efforts and communicated QA concepts to non-technical stakeholders.',
    ],
  },
]

const skills = [
  {
    title: 'Quality Engineering',
    items: ['Test Strategy', 'API Testing', 'Selenium Automation', 'Regression & Functional', 'Defect Management', 'Performance Testing'],
  },
  {
    title: 'Leadership & Delivery',
    items: ['Program Leadership', 'Product Thinking', 'Agile & DevOps', 'Risk Management', 'Stakeholder Alignment', 'Team Scaling'],
  },
  {
    title: 'AI & Data',
    items: ['GitHub Copilot', 'Gemini', 'AI Quality', 'Prompt Engineering', 'SQL / Data Management', 'Google Analytics'],
  },
  {
    title: 'Accessibility & Process',
    items: ['CPACC', 'Web Accessibility (WCAG)', 'Lean Six Sigma', 'Systems Design', 'Process Optimization'],
  },
]

const projects = [
  {
    title: 'Accessibility at 95%',
    desc: 'Built and executed an accessibility strategy that lifted compliance scores from 72% to 95% within six months, leading a team inclusive of PWDs.',
    tags: ['CPACC', 'WCAG', 'Strategy'],
  },
  {
    title: 'Automation at Scale',
    desc: 'Led a Selenium rollout for a 20-person QA team — cutting release cycle time by two weeks and eliminating 120 manual testing hours per month.',
    tags: ['Selenium', 'DevOps', 'Automation'],
  },
  {
    title: 'AI-Enabled Quality',
    desc: 'Drove a GenAI transformation using Copilot and Gemini to improve test-planning efficiency across cross-functional teams.',
    tags: ['Copilot', 'Gemini', 'AI Quality'],
  },
  {
    title: 'Team Growth & Enablement',
    desc: 'Grew the QA engineering team by 25% in 18 months and raised certification completion from 40% to 85% through targeted training.',
    tags: ['Leadership', 'Coaching'],
  },
  {
    title: 'Analytics-Driven Testing',
    desc: 'Used Google Analytics to target regression at user drop-off points, reducing critical defects by 25% for major US clients.',
    tags: ['Analytics', 'Regression'],
  },
  {
    title: 'Process Optimization',
    desc: 'Authored operational runbooks that improved cross-team consistency and cut test-execution errors by 20%.',
    tags: ['Lean Six Sigma', 'Runbooks'],
  },
]

// Licenses & certifications — the two Lean Six Sigma certs carry full detail
// (issuer, issued date, credential ID, skills); the rest are simple names.
const certifications = [
  {
    title: 'Lean Six Sigma White Belt Certification',
    issuer: 'The Council for Six Sigma Certification',
    date: 'Issued Jan 2026',
    credential: 'Credential ID 111743143',
    skills: 'Six Sigma · Lean Six Sigma',
  },
  {
    title: 'Lean Six Sigma Yellow Belt',
    issuer: 'The Council for Six Sigma Certification',
    date: 'Issued Jan 2026',
    credential: 'Credential ID 111739364',
    skills: 'Six Sigma · Lean Six Sigma',
  },
  { title: 'Salesforce Certified Associate' },
  { title: 'CPACC — Certified Professional in Accessibility Core Competencies' },
  { title: 'WAI0.1x: Introduction to Web Accessibility' },
  { title: 'Discover the Art of Prompting' },
  { title: 'Maximize Productivity With AI Tools' },
]

// Honors & awards — complete résumé list, verbatim and in order.
const honors = [
  {
    title: 'Champion, IoT in Action: From Concept to Connection',
    meta: 'Polytechnic University of the Philippines · Jan 2026',
  },
  {
    title: 'TechStar 2025',
    meta: 'Aug 2025 · Associated with Accenture',
  },
  {
    title: '3rd Place, Accessibility Internet Rally (AIR) Award 2023',
    meta: 'Knowbility · Jan 2024',
  },
  {
    title: 'ATCP Gantimpala Awards 2022',
    meta: 'Accenture Technology Center Philippines · Nov 2022',
    note: 'Associated with Accenture · Buklod Category (Collaborate Across the Ecosystem)',
  },
  {
    title: '3rd Place, Startup Weekend Manila 2019',
    meta: 'Techstars · Feb 2019',
  },
  {
    title: 'Participant — Testing Cup 2018 (Polish Championship in Software Testing) in Lodz, Poland',
    meta: 'Testing Cup Poland · May 2018',
  },
  {
    title: 'Most Outstanding Employee of Year 2013',
    meta: 'Icomteq Solutions · Dec 2013',
    note: 'Associated with ICOMTEQ SOLUTIONS INC.',
  },
  {
    title: 'Champion, De La Salle University Marketing Approach to National Development Phase 3',
    meta: 'De La Salle University Manila · Feb 2011',
  },
  {
    title: 'Best Debater, CBEA Week Team Debate Cup',
    meta: 'New Era University · Jan 2010',
  },
  {
    title: 'Champion, 16th National Marketing Week Case Analysis',
    meta: 'New Era University · Jan 2010',
  },
  {
    title: 'Champion, CBEA Week Team Debate Cup',
    meta: 'New Era University · Jan 2010',
  },
  {
    title: 'Finalist, Top 180 Nationwide, Marketing Professional students',
    meta: 'Jan 2010',
  },
]

const memberships = [
  'Project Management Institute (PMI) — Member',
  'Philippine Society for Quality (PSQ) — Member',
]

const bots = [
  {
    name: 'Weather',
    icon: 'cloud-sun',
    handle: '@pjo_weather_bot',
    desc: 'Daily forecasts and on-demand weather delivered straight to Telegram.',
    status: 'live',
  },
  {
    name: 'Tagalog Translate',
    icon: 'languages',
    handle: '@tagalog_translate_bot',
    desc: 'Two-way Tagalog ⇄ English translation with automatic direction detection.',
    status: 'dev',
  },
  {
    name: 'Disaster Watch',
    icon: 'alert-triangle',
    handle: '@disaster_watch_bot',
    desc: 'Real-time alerts for earthquakes, tsunamis, typhoons, floods, and volcanic activity.',
    status: 'live',
  },
  {
    name: 'PH Dollar Rate',
    icon: 'dollar',
    handle: '@ph_dollar_rate',
    desc: 'Compares USD→PHP buy & sell rates across Philippine banks.',
    status: 'live',
  },
  {
    name: 'Pelikula Finder',
    icon: 'film',
    handle: '@pelikula_finder_bot',
    desc: 'Finds now-playing movies and showtimes in nearby cinemas.',
    status: 'dev',
  },
]

const apps = [
  {
    name: 'PicPress — Image to PDF Merger',
    icon: 'file-text',
    desc: 'Merge images into a single PDF in the browser — rotate, reorder, and export with a zero-dependency PDF writer. Everything runs client-side; nothing is uploaded.',
    url: 'https://image-pdf-merger.vercel.app',
  },
  {
    name: 'Calm Capital',
    icon: 'landmark',
    desc: 'Behavioral-wealth dashboard — investment policy statement, synthetic paycheck, net-worth tracking, and a "bear mode" for downturns.',
    url: 'https://peremiller.github.io/calm-capital/',
  },
  {
    name: 'Cash Reserve Planner',
    icon: 'layers',
    desc: 'Three-bucket liquidity planner with a reserve glide path and multi-currency support.',
    url: 'https://cash-reserve-planner.vercel.app',
    status: 'dev',
  },
  {
    name: 'Dynamic Withdrawal',
    icon: 'trending-up',
    desc: 'Models dynamic retirement withdrawal strategies that adapt spending to market performance.',
    url: 'https://peremiller.github.io/dynamic-withdrawal/',
  },
  {
    name: 'Retirement Income Maximizer',
    icon: 'sunrise',
    desc: 'Calculators for maximizing retirement income — delaying Social Security to 70 and joint-and-survivor annuities.',
    url: 'https://peremiller.github.io/retirement-planner/',
  },
  {
    name: 'Asset Location Optimizer',
    icon: 'target',
    desc: 'Places bonds in tax-deferred accounts and equities in taxable accounts for asset-location tax efficiency (PWA).',
    url: 'https://asset-location-optimizer.vercel.app',
  },
  {
    name: 'Job Portal (TalentMatch)',
    icon: 'briefcase',
    desc: 'Matches your CV to job openings and lets you apply, with OAuth sign-in.',
    url: 'https://job-portal-beta-rose.vercel.app',
    status: 'dev',
  },
  {
    name: 'Blockchain Problems',
    icon: 'link',
    desc: 'Interactive data-visualization of the top problems facing the blockchain industry.',
    url: 'https://blockchain-problems.vercel.app/',
  },
  {
    name: 'VoltDown',
    icon: 'zap',
    desc: 'Lists 1,000 solutions to high electricity prices, each scored on impact, feasibility (0-100), and estimated cost, with subtasks and editable statuses — plus search, filter, a "Quick wins" sort, a click-to-open detail panel with per-subtask cost, a live progress dashboard, and JSON/CSV export.',
    url: 'https://electricity-solutions.vercel.app',
  },
  {
    name: 'HackCal',
    icon: 'calendar',
    desc: 'Offline-first tech hackathon calendar with month and list views, filtering, and .ics export.',
    url: 'https://hackathon-calendar-umber.vercel.app',
  },
  {
    name: 'SkillForge Academy',
    icon: 'graduation-cap',
    desc: 'Expert training academy — a growing library of curated video lessons and structured skill tracks across engineering, product, and quality.',
    url: 'https://training-academy-five.vercel.app/',
  },
  {
    name: 'CRDownload → MP4',
    icon: 'file-video',
    desc: 'Recovers interrupted Chrome .crdownload files into playable .mp4 videos, right in the browser — nothing is uploaded.',
    url: 'https://crdownload-to-mp4.vercel.app',
  },
]

const TABS = ['Career', 'Application', 'Telegram Bot', 'Music', 'Favorites']

// Color themes (accent). "Default" (a warm mix of royal gold, deep saffron,
// dusty rose, steel blue and charcoal) is the default; Green and Red are options.
const THEMES = [
  {
    id: 'default',
    label: 'Default',
    color: 'linear-gradient(135deg,#cf9526 0%,#c08081 55%,#4a7ba6 100%)',
  },
  { id: 'green', label: 'Green', color: '#2e9e5b' },
  { id: 'red', label: 'Red', color: '#c0443f' },
]

// Section anchors surfaced in the burger menu.
const CAREER_SECTIONS = [
  { id: 'top', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Impact' },
  { id: 'recognition', label: 'Credentials & Honors' },
  { id: 'contact', label: 'Contact' },
]
const MUSIC_SECTIONS = [
  { id: 'music-recommended', label: 'Recommended' },
  { id: 'music-playlists', label: 'Playlists' },
  { id: 'music-songs', label: 'Songs' },
]

const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </svg>
)

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
)

function styleLine(tags) {
  if (!tags) return ''
  const first = String(tags).split('\n')[0].trim()
  if (first.length <= 40) return first
  return first.slice(0, 40).trimEnd() + '…'
}

function LeafShape() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C16 7 18 12 16 18c-1 3-3 4-4 4s-3-1-4-4C6 12 8 7 12 2z"
        fill="currentColor"
      />
      <path
        d="M12 4.5V20"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Small leaves drifting slowly across a banner, as if carried by the wind.
const LEAF_CONF = [
  { top: 12, size: 22, dur: 21, delay: -3, op: 0.5, v: 0 },
  { top: 30, size: 15, dur: 28, delay: -11, op: 0.42, v: 1 },
  { top: 55, size: 26, dur: 24, delay: -16, op: 0.52, v: 0 },
  { top: 70, size: 17, dur: 32, delay: -6, op: 0.38, v: 1 },
  { top: 20, size: 13, dur: 35, delay: -22, op: 0.34, v: 1 },
  { top: 46, size: 20, dur: 26, delay: -18, op: 0.46, v: 0 },
  { top: 82, size: 14, dur: 30, delay: -12, op: 0.4, v: 1 },
  { top: 37, size: 24, dur: 22, delay: -27, op: 0.5, v: 0 },
  { top: 63, size: 16, dur: 34, delay: -8, op: 0.4, v: 1 },
]
function Leaves({ hero }) {
  return (
    <div className={`leaves${hero ? ' leaves--hero' : ''}`} aria-hidden="true">
      {LEAF_CONF.map((c, i) => (
        <span
          key={i}
          className={`leaf leaf--v${c.v}`}
          style={{
            top: `${c.top}%`,
            width: `${c.size}px`,
            height: `${c.size}px`,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
            '--lo': c.op,
          }}
        >
          <LeafShape />
        </span>
      ))}
    </div>
  )
}

// A subtle twinkling star field, shown only in dark mode (gated in CSS).
// Positions are computed once from a tiny deterministic PRNG so they're stable.
const STARS = (() => {
  let s = 1337
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
  return Array.from({ length: 44 }, () => ({
    left: +(rnd() * 100).toFixed(2),
    top: +(rnd() * 100).toFixed(2),
    size: +(1 + rnd() * 2.4).toFixed(2),
    dur: +(2.4 + rnd() * 4).toFixed(2),
    delay: +(-rnd() * 6).toFixed(2),
    op: +(0.45 + rnd() * 0.55).toFixed(2),
  }))
})()
function Stars() {
  return (
    <div className="stars" aria-hidden="true">
      {STARS.map((st, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: `${st.left}%`,
            top: `${st.top}%`,
            width: `${st.size}px`,
            height: `${st.size}px`,
            animationDuration: `${st.dur}s`,
            animationDelay: `${st.delay}s`,
            '--so': st.op,
          }}
        />
      ))}
    </div>
  )
}

function Section({ id, kicker, title, children, className }) {
  return (
    <section id={id}>
      <div className={`section reveal${className ? ` ${className}` : ''}`}>
        <div className="section__head">
          <div className="section__kicker">{kicker}</div>
          <h2 className="section__title">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}

function CareerTab() {
  return (
    <>
      <header className="hero" id="top">
        <div className="hero__glow" />
        <Leaves hero />
        <Stars />
        <div className="hero__spotlight" aria-hidden="true">
          <span className="spot spot--l" />
          <span className="spot spot--r" />
        </div>
        <div className="hero__water" aria-hidden="true">
          <svg className="wave wave--1" viewBox="0 0 2400 120" preserveAspectRatio="none">
            <path d="M0,62 C110,28 210,96 400,62 C590,28 700,96 900,62 C1010,34 1110,82 1200,62 C1310,28 1410,96 1600,62 C1790,28 1900,96 2100,62 C2210,34 2310,82 2400,62 L2400,120 L0,120 Z" />
          </svg>
          <svg className="wave wave--2" viewBox="0 0 2400 120" preserveAspectRatio="none">
            <path d="M0,64 C160,90 300,30 600,64 C900,98 1040,38 1200,64 C1360,90 1500,30 1800,64 C2100,98 2240,38 2400,64 L2400,120 L0,120 Z" />
          </svg>
          <svg className="wave wave--3" viewBox="0 0 2400 120" preserveAspectRatio="none">
            <path d="M0,62 C110,28 210,96 400,62 C590,28 700,96 900,62 C1010,34 1110,82 1200,62 C1310,28 1410,96 1600,62 C1790,28 1900,96 2100,62 C2210,34 2310,82 2400,62 L2400,120 L0,120 Z" />
          </svg>
        </div>
        <div className="hero__inner">
          <p className="hero__eyebrow">{profile.location}</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__headline">{profile.headline}</p>
          <p className="hero__tagline">{profile.tagline}</p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#contact">
              Get in touch
            </a>
            <a className="btn btn--ghost" href="#experience">
              View experience
            </a>
            <a className="btn btn--ghost hide-mobile" href={profile.resumeUrl} target="_blank" rel="noreferrer">
              Résumé
            </a>
          </div>
          <div className="hero__stats">
            {stats.map((stat, i) => (
              <div className="stat" key={i}>
                <div className="stat__value">{stat.value}</div>
                <div className="stat__label">
                  {Array.isArray(stat.label) ? (
                    <>
                      {stat.label[0]} <br className="stat-br" />
                      {stat.label[1]}
                    </>
                  ) : (
                    stat.label
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <Section id="about" kicker="01 — About" title="Who I am" className="about">
        {aboutParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Section>

      <Section id="experience" kicker="02 — Experience" title="Where I've worked">
        <div className="timeline">
          {jobs.map((job) => (
            <article className="job reveal" key={job.role + job.period}>
              <div className="job__period">{job.period}</div>
              <div className="job__body">
                <h3 className="job__role">
                  {job.role} <span className="job__at">@ {job.company}</span>
                </h3>
                <div className="job__loc">{job.loc}</div>
                <ul className="job__bullets">
                  {job.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="skills" kicker="03 — Skills" title="What I work with">
        <div className="skills">
          {skills.map((card) => (
            <div className="skillcard reveal" key={card.title}>
              <h3>{card.title}</h3>
              <ul>
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" kicker="04 — Impact" title="Selected impact">
        <div className="projects">
          {projects.map((project) => (
            <div className="project reveal" key={project.title}>
              <div className="project__top">
                <h3>{project.title}</h3>
              </div>
              <p>{project.desc}</p>
              <div className="project__tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="recognition" kicker="05 — Recognition" title="Credentials & Honors">
        <div className="creds">
          <div className="creds__col">
            <h3 className="creds__heading">Licenses &amp; Certifications</h3>
            <ul className="credlist">
              {certifications.map((c) => (
                <li className="credlist__item" key={c.title}>
                  <span className="credlist__title">{c.title}</span>
                  {c.issuer && (
                    <span className="credlist__meta">
                      {c.issuer}
                      {c.date ? ` · ${c.date}` : ''}
                    </span>
                  )}
                  {c.credential && <span className="credlist__note">{c.credential}</span>}
                  {c.skills && <span className="credlist__skills">Skills: {c.skills}</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className="creds__col">
            <h3 className="creds__heading">Memberships</h3>
            <ul className="credlist credlist--simple">
              {memberships.map((m) => (
                <li className="credlist__item" key={m}>
                  <span className="credlist__title credlist__title--regular">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="honors">
          <h3 className="creds__heading">Honors &amp; Awards</h3>
          <div className="honorsgrid">
            {honors.map((h) => (
              <div className="honor" key={h.title}>
                <div className="honor__title">{h.title}</div>
                {h.meta && <div className="honor__meta">{h.meta}</div>}
                {h.note && <div className="honor__note">{h.note}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="edu">
          <h4 className="edu__title">Education</h4>
          <div className="edu__row">
            <div className="edu__school">New Era University</div>
            <div className="edu__degree">B.S. in Business Administration, Major in Marketing</div>
            <div className="edu__period">2007 — 2011</div>
          </div>
        </div>
      </Section>

      <Section id="contact" kicker="05 — Contact" title="Let's talk" className="contact">
        <p className="contact__lead">
          Open to opportunities and collaborations. The fastest way to reach me:
        </p>
        <div className="contact__links">
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="btn btn--ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn btn--ghost" href="tel:+639688515632">
            {profile.phone}
          </a>
        </div>
      </Section>
    </>
  )
}

// Renders one app card. Reused for both the static public apps and any private
// apps fetched at runtime from /api/private-apps, so the markup stays identical.
function AppCard({ app }) {
  const live = app.status !== 'dev'
  return (
    <div className="itemcard reveal" key={app.name}>
      <div className="itemcard__top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {app.icon && ICON_PATHS[app.icon] ? (
            <span className="itemcard__favicon itemcard__favicon--icon" aria-hidden="true">
              <LineIcon name={app.icon} />
            </span>
          ) : (
            <AppFavicon url={app.url} name={app.name} />
          )}
          <h3>{app.name}</h3>
        </div>
        <span className={`badge ${live ? 'badge--live' : 'badge--dev'}`}>
          <span className="badge__dot" />
          {live ? 'Live' : 'Dev In Progress'}
        </span>
      </div>
      <p className="itemcard__desc">{app.desc}</p>
      <div className="itemcard__foot">
        <span className="tag">Web</span>
        <a className="btn btn--primary" href={app.url} target="_blank" rel="noreferrer">
          Open ↗
        </a>
      </div>
    </div>
  )
}

// Themed unlock card shown when /api/private-apps returns 401. Submitting the
// password POSTs to /api/private-login; on success the parent re-fetches.
function PrivateUnlockCard({ onUnlocked }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    if (e) e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/private-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setPassword('')
        onUnlocked()
      } else {
        setError('Incorrect password')
      }
    } catch {
      setError('Incorrect password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="itemcard unlockcard reveal">
      <div className="itemcard__top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="unlockcard__icon" aria-hidden="true">🔒</span>
          <h3>Private apps</h3>
        </div>
      </div>
      <p className="itemcard__desc">
        Enter the password to reveal additional private apps.
      </p>
      <form className="unlockcard__form" onSubmit={submit}>
        <label className="unlockcard__label" htmlFor="private-password">
          Password
        </label>
        <input
          id="private-password"
          type="password"
          className="unlockcard__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? 'private-password-error' : undefined}
          disabled={submitting}
        />
        {error && (
          <p className="unlockcard__error" id="private-password-error" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="btn btn--primary unlockcard__btn"
          disabled={submitting}
        >
          {submitting ? 'Unlocking…' : 'Unlock'}
        </button>
      </form>
    </div>
  )
}

function ApplicationTab() {
  // Private apps are fetched at runtime (never bundled). States:
  //   'none'   → endpoint 404/error → public deployment, render nothing extra
  //   'locked' → 401 → show the unlock card
  //   'open'   → 200 → render returned apps as extra cards
  const [privState, setPrivState] = useState('none')
  const [privateApps, setPrivateApps] = useState([])
  // Live SkillForge Academy counts (public tracks/videos), fetched from its
  // own /api/stats so the card description stays current as courses are added.
  const [academy, setAcademy] = useState(null)

  useEffect(() => {
    let alive = true
    fetch('https://training-academy-five.vercel.app/api/stats')
      .then((r) => r.json())
      .then((d) => {
        if (alive && d && d.ok && d.publicTracks && d.publicVideos) setAcademy(d)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  // Fold the live counts into the academy card's description when available.
  const withLiveCounts = (app) => {
    if (!academy || app.url !== 'https://training-academy-five.vercel.app/') return app
    return {
      ...app,
      desc: `Expert training academy — ${academy.publicTracks} skill tracks and ${academy.publicVideos} curated video lessons with structured learning paths across engineering, product, and quality.`,
    }
  }

  const loadPrivate = async () => {
    try {
      const res = await fetch('/api/private-apps', { credentials: 'same-origin' })
      if (res.status === 200) {
        const json = await res.json()
        setPrivateApps(Array.isArray(json && json.apps) ? json.apps : [])
        setPrivState('open')
      } else if (res.status === 401) {
        setPrivState('locked')
      } else {
        // 404 or anything else → nothing extra (public deployment).
        setPrivState('none')
      }
    } catch {
      setPrivState('none')
    }
  }

  useEffect(() => {
    loadPrivate()
  }, [])

  return (
    <>
      <div className="tabhero">
        <div className="tabhero__glow" />
        <Leaves />
        <Stars />
        <div className="tabhero__inner reveal">
          <p className="tabhero__kicker">Application</p>
          <h1 className="tabhero__title">Live web apps</h1>
          <p className="tabhero__lead">
            A set of single-purpose tools — mostly around retirement, behavioral wealth,
            and tax-efficient investing — all live and free to use in the browser.
          </p>
        </div>
      </div>
      <div className="section">
        <div className="cardgrid">
          {apps.map((app) => (
            <AppCard key={app.name} app={withLiveCounts(app)} />
          ))}
          {privState === 'open' &&
            privateApps.map((app) => <AppCard key={app.name} app={app} />)}
          {privState === 'locked' && (
            <PrivateUnlockCard onUnlocked={loadPrivate} />
          )}
        </div>
      </div>
    </>
  )
}

function TelegramBotTab() {
  return (
    <>
      <div className="tabhero">
        <div className="tabhero__glow" />
        <Leaves />
        <Stars />
        <div className="tabhero__inner reveal">
          <p className="tabhero__kicker">Telegram Bot</p>
          <h1 className="tabhero__title">Bots on Telegram</h1>
          <p className="tabhero__lead">
            Small, useful Telegram bots — weather, disaster alerts, currency rates,
            translation, and cinema showtimes. One is live; the rest are in active development.
          </p>
        </div>
      </div>
      <div className="section">
        <div className="cardgrid">
          {bots.map((bot) => {
            const tHandle = bot.handle.replace(/^@/, '')
            const live = bot.status === 'live'
            return (
              <div className="itemcard reveal" key={bot.handle}>
                <div className="itemcard__top itemcard__top--bot">
                  <div className="itemcard__lead">
                    <span className="itemcard__mark itemcard__mark--icon" aria-hidden="true">
                      {bot.icon && ICON_PATHS[bot.icon] ? <LineIcon name={bot.icon} /> : <PlaneIcon />}
                    </span>
                    <div className="itemcard__namewrap">
                      <h3>{bot.name}</h3>
                      <p className="itemcard__handle">{bot.handle}</p>
                    </div>
                  </div>
                  <span className={`badge ${live ? 'badge--live' : 'badge--dev'}`}>
                    <span className="badge__dot" />
                    {live ? 'Live' : 'Dev In Progress'}
                  </span>
                </div>
                <p className="itemcard__desc">{bot.desc}</p>
                <div className="itemcard__foot">
                  <a className="btn btn--primary" href={`https://t.me/${tHandle}`} target="_blank" rel="noreferrer">
                    Open in Telegram ↗
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

function PlaylistCover({ image, name }) {
  const [failed, setFailed] = useState(false)
  if (failed || !image) {
    return <div className="plcard__fallback">{(name || '?').slice(0, 1).toUpperCase()}</div>
  }
  return (
    <img
      className="plcard__cover"
      src={image}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

// Heart toggle button shown at the top-right of song & playlist covers. Clicking
// it must never start playback, so we stop/prevent the event before toggling.
function FavButton({ active, onToggle }) {
  const handle = (e) => {
    e.stopPropagation()
    e.preventDefault()
    onToggle()
  }
  return (
    <button
      type="button"
      className={`favbtn${active ? ' favbtn--active' : ''}`}
      onClick={handle}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={active}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span aria-hidden="true">{active ? '♥' : '♡'}</span>
    </button>
  )
}

function PlaylistCard({ pl, active, onPlayPlaylist, isFav, onToggleFav }) {
  return (
    <div className={`plcard${active ? ' plcard--active' : ''}`}>
      <div className="plcard__cover-wrap">
        <button
          type="button"
          className="plcard__play"
          onClick={() => onPlayPlaylist(pl)}
          aria-label={`Play ${pl.name}`}
        >
          <PlaylistCover image={pl.image} name={pl.name} />
          <span className="plcard__playicon" aria-hidden="true">▶</span>
        </button>
        <FavButton active={isFav} onToggle={() => onToggleFav(pl.id)} />
      </div>
      <div className="plcard__body">
        <button
          type="button"
          className="plcard__namebtn"
          onClick={() => onPlayPlaylist(pl)}
        >
          <span className="plcard__name">{pl.name}</span>
        </button>
        <div className="plcard__foot">
          <p className="plcard__meta">{pl.count} tracks</p>
          <a className="plcard__suno" href={pl.url} target="_blank" rel="noreferrer">
            Suno ↗
          </a>
        </div>
      </div>
    </div>
  )
}

function SongCard({ song, active, onPlaySong, isFav, onToggleFav }) {
  return (
    <div className={`songcard${active ? ' songcard--active' : ''}`}>
      <div className="songcard__cover-wrap">
        <button
          type="button"
          className="songcard__play"
          onClick={() => onPlaySong(song)}
          aria-label={`Play ${song.title}`}
        >
          <img className="songcard__cover" src={song.image} alt={song.title} loading="lazy" />
          <span className="songcard__playicon" aria-hidden="true">▶</span>
        </button>
        <FavButton active={isFav} onToggle={() => onToggleFav(song.id)} />
      </div>
      <div className="songcard__body">
        <button
          type="button"
          className="songcard__titlebtn"
          onClick={() => onPlaySong(song)}
        >
          <span className="songcard__title">{song.title}</span>
        </button>
        <div className="songcard__foot">
          <p className="songcard__meta">{song.plays} plays</p>
          <a className="songcard__suno" href={song.url} target="_blank" rel="noreferrer">
            Suno ↗
          </a>
        </div>
      </div>
    </div>
  )
}

function MusicTab({
  songs,
  playlists,
  loading,
  currentTrack,
  activePlaylistId,
  onPlaySong,
  onPlayPlaylist,
  favSongs,
  favPlaylists,
  onToggleFavSong,
  onToggleFavPlaylist,
}) {
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()
  const songMatchesQuery = (s) =>
    !q ||
    (s.title && s.title.toLowerCase().includes(q)) ||
    (s.lyrics && s.lyrics.toLowerCase().includes(q))
  const playlistMatchesQuery = (pl) => {
    if (!q) return true
    if (pl.name && pl.name.toLowerCase().includes(q)) return true
    if (Array.isArray(pl.tracks)) {
      return pl.tracks.some(
        (t) =>
          (t.title && t.title.toLowerCase().includes(q)) ||
          (t.lyrics && t.lyrics.toLowerCase().includes(q))
      )
    }
    return false
  }

  // Results now filter by the search query only.
  const filteredSongs = songs.filter(songMatchesQuery)
  const filteredPlaylists = playlists.filter(playlistMatchesQuery)
  const filtering = q !== ''
  const noResults = filtering && filteredSongs.length === 0 && filteredPlaylists.length === 0

  // Recommended (desktop/laptop only): the query-matched songs sorted by play
  // count descending, top ~10 (all most-played when there is no query).
  const recommended = [...filteredSongs]
    .sort((a, b) => (Number(b.plays) || 0) - (Number(a.plays) || 0))
    .slice(0, 10)

  return (
    <>
      <div className="musicsearch">
        <div className="musicsearch__field">
          <span className="musicsearch__icon" aria-hidden="true"><SearchIcon /></span>
          <input
            type="search"
            className="musicsearch__input"
            placeholder="Search songs, lyrics, or playlists."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search songs and playlists"
          />
          {query && (
            <button
              type="button"
              className="musicsearch__clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        {filtering && (
          <p className="musicsearch__count">
            {filteredPlaylists.length} playlist{filteredPlaylists.length === 1 ? '' : 's'} ·{' '}
            {filteredSongs.length} song{filteredSongs.length === 1 ? '' : 's'}
          </p>
        )}
      </div>

      {noResults && (
        <div className="musicempty" role="status">
          No songs or playlists match{q ? ` “${query.trim()}”` : ''}.
        </div>
      )}

      <div className="tabhero">
        <div className="tabhero__glow" />
        <Leaves />
        <Stars />
        <div className="tabhero__inner reveal">
          <p className="tabhero__kicker">Music</p>
          <h1 className="tabhero__title">Song & Playlists</h1>
          <p className="tabhero__lead">
            A growing catalog of AI-assisted original songs — acoustic pop, ballads,
            Filipino reggae, and feel-good anthems — written and produced on Suno.
          </p>
          <div className="tabhero__cta">
            <a className="btn btn--primary" href="https://suno.com/@millertperez" target="_blank" rel="noreferrer">
              View on Suno ↗
            </a>
          </div>
        </div>
      </div>

      {loading && (
        <div className="musicloading" role="status">
          <span className="musicloading__dot" />
          Refreshing from Suno…
        </div>
      )}

      {recommended.length > 0 && (
      <div className="musicsub musicsub--recommended" id="music-recommended">
        <h2 className="musicsub__title">Recommended</h2>
        <p className="musicsub__count">Most-played songs</p>
        <div className="songgrid">
          {recommended.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              active={currentTrack && currentTrack.id === song.id}
              onPlaySong={onPlaySong}
              isFav={favSongs.has(song.id)}
              onToggleFav={onToggleFavSong}
            />
          ))}
        </div>
      </div>
      )}

      {filteredPlaylists.length > 0 && (
      <div className="musicsub" id="music-playlists">
        <h2 className="musicsub__title">Playlists</h2>
        <p className="musicsub__count">{filteredPlaylists.length} playlists</p>
        <div className="plgrid">
          {filteredPlaylists.map((pl) => (
            <PlaylistCard
              key={pl.id}
              pl={pl}
              active={activePlaylistId && activePlaylistId === pl.id}
              onPlayPlaylist={onPlayPlaylist}
              isFav={favPlaylists.has(pl.id)}
              onToggleFav={onToggleFavPlaylist}
            />
          ))}
        </div>
      </div>
      )}

      {filteredSongs.length > 0 && (
      <div className="musicsub" id="music-songs">
        <h2 className="musicsub__title">Songs</h2>
        <p className="musicsub__count">{filteredSongs.length} songs</p>
        <div className="songgrid">
          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              active={currentTrack && currentTrack.id === song.id}
              onPlaySong={onPlaySong}
              isFav={favSongs.has(song.id)}
              onToggleFav={onToggleFavSong}
            />
          ))}
        </div>
      </div>
      )}

      {/* Mobile only: Playlists + Songs merged into one horizontal row. */}
      {(filteredPlaylists.length > 0 || filteredSongs.length > 0) && (
        <div className="musiclane" id="music-onelane">
          {filteredPlaylists.map((pl) => (
            <PlaylistCard
              key={`l-${pl.id}`}
              pl={pl}
              active={activePlaylistId && activePlaylistId === pl.id}
              onPlayPlaylist={onPlayPlaylist}
              isFav={favPlaylists.has(pl.id)}
              onToggleFav={onToggleFavPlaylist}
            />
          ))}
          {filteredSongs.map((song) => (
            <SongCard
              key={`s-${song.id}`}
              song={song}
              active={currentTrack && currentTrack.id === song.id}
              onPlaySong={onPlaySong}
              isFav={favSongs.has(song.id)}
              onToggleFav={onToggleFavSong}
            />
          ))}
        </div>
      )}
    </>
  )
}

function FavoritesTab({
  songs,
  playlists,
  currentTrack,
  playerVisible,
  favSongs,
  favPlaylists,
  onPlayFavorites,
}) {
  const favSongCount = songs.filter((s) => favSongs.has(s.id)).length
  const favPlCount = playlists.filter((pl) => favPlaylists.has(pl.id)).length
  const empty = favSongCount === 0 && favPlCount === 0
  const nowPlaying = playerVisible && currentTrack ? currentTrack.title : null

  return (
    <>
      <div className="tabhero">
        <div className="tabhero__glow" />
        <Leaves />
        <Stars />
        <div className="tabhero__inner reveal">
          <p className="tabhero__kicker">Favorites</p>
          <h1 className="tabhero__title">Your Favorites</h1>
        </div>
      </div>

      {empty ? (
        <div className="musicempty" role="status">
          No favorites yet — go to the Music tab and tap the ♥ on any song or playlist.
        </div>
      ) : (
        <div className="favplayer">
          <p className="favplayer__summary">
            {favSongCount} song{favSongCount === 1 ? '' : 's'} · {favPlCount} playlist
            {favPlCount === 1 ? '' : 's'} in your favorites mix
          </p>
          <div className="favplayer__actions">
            <button
              type="button"
              className="favplayer__btn favplayer__btn--primary"
              onClick={() => onPlayFavorites(false)}
            >
              <span aria-hidden="true">▶</span> Play all favorites
            </button>
            <button
              type="button"
              className="favplayer__btn"
              onClick={() => onPlayFavorites(true)}
            >
              <span aria-hidden="true">🔀</span> Shuffle
            </button>
          </div>
          <p className="favplayer__hint">
            {nowPlaying
              ? `Now playing: ${nowPlaying}. Use the player's ⏮ / ⏭ to move through your favorites.`
              : 'Then use the player’s ⏮ / ⏭ controls to move through them, or hit Shuffle again to reshuffle.'}
          </p>
        </div>
      )}
    </>
  )
}

// Relative "time ago" for the recent-visits list (e.g. "3m ago", "2h ago").
function timeAgo(iso) {
  const then = new Date(iso).getTime()
  if (!Number.isFinite(then)) return ''
  const s = Math.max(0, Math.floor((Date.now() - then) / 1000))
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d ago`
  const mo = Math.floor(d / 30)
  if (mo < 12) return `${mo}mo ago`
  return `${Math.floor(mo / 12)}y ago`
}

// Themed unlock card for the private analytics gate. Same password flow as the
// Application tab's PrivateUnlockCard: POST /api/private-login then re-fetch.
function AnalyticsUnlockCard({ onUnlocked }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    if (e) e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/private-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setPassword('')
        onUnlocked()
      } else {
        setError('Incorrect password')
      }
    } catch {
      setError('Incorrect password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="itemcard unlockcard reveal">
      <div className="itemcard__top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="unlockcard__icon" aria-hidden="true">🔒</span>
          <h3>Private dashboard</h3>
        </div>
      </div>
      <p className="itemcard__desc">
        Visitor locations are private. Enter the password to view analytics.
      </p>
      <form className="unlockcard__form" onSubmit={submit}>
        <label className="unlockcard__label" htmlFor="analytics-password">
          Password
        </label>
        <input
          id="analytics-password"
          type="password"
          className="unlockcard__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? 'analytics-password-error' : undefined}
          disabled={submitting}
        />
        {error && (
          <p className="unlockcard__error" id="analytics-password-error" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="btn btn--primary unlockcard__btn"
          disabled={submitting}
        >
          {submitting ? 'Unlocking…' : 'Unlock'}
        </button>
      </form>
    </div>
  )
}

function AnalyticsTab() {
  // status: 'loading' | 'ok' | 'locked' | 'unconfigured' | 'error'
  const [status, setStatus] = useState('loading')
  const [data, setData] = useState(null)

  const load = async () => {
    try {
      const res = await fetch('/api/stats', { credentials: 'same-origin' })
      if (res.status === 401) {
        setStatus('locked')
        return
      }
      if (res.status === 200) {
        const json = await res.json()
        if (json && json.configured === false) {
          setStatus('unconfigured')
        } else if (json && json.configured) {
          setData(json)
          setStatus('ok')
        } else {
          setStatus('error')
        }
        return
      }
      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    load()
  }, [])

  // Fall back to an empty dashboard so the count + map are always visible
  // (showing zeros / no dots) even before a Blob store is connected.
  const dash =
    status === 'ok' && data
      ? data
      : { total: 0, unique: 0, today: 0, last7: 0, points: [], byCountry: [], recent: [] }
  const maxCountry =
    dash.byCountry && dash.byCountry.length
      ? Math.max(...dash.byCountry.map((c) => c.count))
      : 0

  return (
    <>
      <div className="tabhero">
        <div className="tabhero__glow" />
        <Leaves />
        <Stars />
        <div className="tabhero__inner reveal">
          <p className="tabhero__kicker">Analytics</p>
          <h1 className="tabhero__title">Who's visiting</h1>
          <p className="tabhero__lead">
            Page views and an approximate map of where visitors are coming from.
          </p>
        </div>
      </div>

      <div className="section">
        {status === 'loading' && (
          <div className="musicempty" role="status">Loading analytics…</div>
        )}

        {status === 'locked' && (
          <div className="cardgrid">
            <AnalyticsUnlockCard onUnlocked={load} />
          </div>
        )}

        {(status === 'ok' || status === 'unconfigured' || status === 'error') && (
          <>
            {status === 'unconfigured' && (
              <div className="geobanner" role="status">
                <span aria-hidden="true">📊</span> Analytics isn't connected yet — add a
                Vercel Blob store (Storage → Create → Blob) and it starts recording page
                views. The dashboard below fills in as visits come in.
              </div>
            )}
            {status === 'error' && (
              <div className="geobanner" role="status">
                Couldn't load live analytics right now — showing an empty dashboard.
              </div>
            )}
            <div className="statcards">
              <div className="statcard reveal">
                <div className="statcard__value">{(dash.total || 0).toLocaleString()}</div>
                <div className="statcard__label">Total views</div>
              </div>
              <div className="statcard reveal">
                <div className="statcard__value">{(dash.unique || 0).toLocaleString()}</div>
                <div className="statcard__label">Unique visitors</div>
              </div>
              <div className="statcard reveal">
                <div className="statcard__value">{(dash.today || 0).toLocaleString()}</div>
                <div className="statcard__label">Today</div>
              </div>
              <div className="statcard reveal">
                <div className="statcard__value">{(dash.last7 || 0).toLocaleString()}</div>
                <div className="statcard__label">Last 7 days</div>
              </div>
            </div>

            <div className="geowrap reveal">
              <div className="geomap">
                <img src="/worldmap.png" className="geomap__base" alt="" />
                {Array.isArray(dash.points) && dash.points.length > 0 ? (
                  dash.points.map((p, i) => {
                    const size = 8 + Math.min(18, Math.sqrt(p.count) * 4)
                    return (
                      <span
                        key={`${p.lat},${p.lng},${i}`}
                        className="geodot"
                        style={{
                          left: `${((p.lng + 180) / 360) * 100}%`,
                          top: `${((90 - p.lat) / 180) * 100}%`,
                          width: `${size}px`,
                          height: `${size}px`,
                        }}
                        title={`${p.city || '—'}, ${p.country} · ${p.count} view(s)`}
                      />
                    )
                  })
                ) : null}
              </div>
              {(!dash.points || dash.points.length === 0) && (
                <p className="geomap__empty">No locations recorded yet.</p>
              )}
            </div>

            {Array.isArray(dash.byCountry) && dash.byCountry.length > 0 && (
              <div className="geopanel reveal">
                <h3 className="geopanel__title">Top countries</h3>
                <ul className="geobars">
                  {dash.byCountry.map((c) => (
                    <li className="geobar" key={c.country}>
                      <span className="geobar__label">{c.country || '—'}</span>
                      <span className="geobar__track">
                        <span
                          className="geobar__fill"
                          style={{ width: `${maxCountry ? (c.count / maxCountry) * 100 : 0}%` }}
                        />
                      </span>
                      <span className="geobar__count">{c.count.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(dash.recent) && dash.recent.length > 0 && (
              <div className="geopanel reveal">
                <h3 className="geopanel__title">Recent visits</h3>
                <ul className="georecent">
                  {dash.recent.map((r, i) => (
                    <li className="georecent__item" key={`${r.ts}-${i}`}>
                      <span className="georecent__place">
                        {[r.city, r.country].filter(Boolean).join(', ') || 'Unknown location'}
                      </span>
                      <span className="georecent__time">{timeAgo(r.ts)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="geonote">
              Approximate city-level location derived from the visitor's network — no
              IP addresses or personal data are stored.
            </p>
          </>
        )}
      </div>
    </>
  )
}

// Classify a lyric line: structural (blank, [Section] header, or fully
// parenthetical note) vs singable. Only singable lines are highlighted/timed.
function isStructuralLine(line) {
  const t = line.trim()
  if (t === '') return true
  if (/^\[.*\]$/.test(t)) return true
  if (/^\(.*\)$/.test(t)) return true
  if (isDashLine(line)) return true
  return false
}

// A "divider" line made only of dashes / underscores / equals (e.g. "-------").
// These are visual separators we strip out of the lyrics rectangle entirely.
function isDashLine(line) {
  const stripped = (line || '').replace(/\s/g, '')
  return stripped !== '' && /^[-–—_=]+$/.test(stripped)
}

// Strip standalone "432" / "432," tokens (432 Hz tuning notes) that leak into
// the sung lyrics. Leaves "432Hz" and other numbers alone, then tidies spacing.
function stripLyricNoise(line) {
  if (!line) return line
  return line
    .replace(/\b432\b,?/g, '')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim()
}

// Auto-correct lyric capitalization for display: capitalize the first letter of
// each line and fix the standalone pronoun "i" → "I" (incl. contractions).
function capitalizeLyricLine(line) {
  if (!line) return line
  const m = line.match(/[a-zA-Z]/)
  let out = line
  if (m) {
    const idx = line.indexOf(m[0])
    out = line.slice(0, idx) + line[idx].toUpperCase() + line.slice(idx + 1)
  }
  return out.replace(/\bi\b/g, 'I')
}

function LyricsPanel({ lyrics, audioRef, trackId }) {
  const containerRef = useRef(null)
  const lineRefs = useRef([])
  const [activeLine, setActiveLine] = useState(-1)
  // Auto-scroll is paused once the user scrolls the lyrics by hand; it resumes
  // automatically when a new track loads. autoScrollingRef flags OUR own
  // programmatic scrolls so they aren't mistaken for a manual scroll.
  const userScrolledRef = useRef(false)
  const autoScrollingRef = useRef(false)
  const autoScrollTimer = useRef(null)
  const markAutoScroll = () => {
    autoScrollingRef.current = true
    if (autoScrollTimer.current) clearTimeout(autoScrollTimer.current)
    autoScrollTimer.current = setTimeout(() => {
      autoScrollingRef.current = false
    }, 700)
  }

  // Parse lyrics into lines + the singable-line index map (memo-free; cheap).
  // Each singable line carries a LENGTH WEIGHT (word count, min 1) so longer
  // lines are estimated to take proportionally more time than short ones — a
  // noticeably better proxy than equal time per line. We also build a
  // cumulative-weight array so the active line is the weight bracket that
  // contains the effective playback progress.
  const lines = (lyrics || '').split('\n').map(stripLyricNoise)
  const singableIndexes = []
  const lineWeights = []
  lines.forEach((line, i) => {
    if (!isStructuralLine(line)) {
      singableIndexes.push(i)
      const words = line.trim().split(/\s+/).filter(Boolean).length
      // Word count is the primary weight; fall back to char-derived weight so
      // a single very long word still counts more than a tiny one.
      const w = Math.max(1, words, Math.round(line.trim().length / 6))
      lineWeights.push(w)
    }
  })
  const singableCount = singableIndexes.length
  // Cumulative weights: cumWeights[k] = sum of weights of lines 0..k-1.
  const cumWeights = [0]
  for (let k = 0; k < lineWeights.length; k++) {
    cumWeights.push(cumWeights[k] + lineWeights[k])
  }
  const totalWeight = cumWeights[cumWeights.length - 1] || 0

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Reset to the top whenever the track changes — and re-enable auto-scroll.
  useEffect(() => {
    setActiveLine(-1)
    userScrolledRef.current = false
    const c = containerRef.current
    if (c) {
      markAutoScroll()
      c.scrollTop = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackId])

  // Detect a manual scroll (anything not triggered by our own auto-scroll) and
  // pause auto-scrolling until the next track.
  useEffect(() => {
    const c = containerRef.current
    if (!c) return
    const onScroll = () => {
      if (autoScrollingRef.current) return
      userScrolledRef.current = true
    }
    c.addEventListener('scroll', onScroll, { passive: true })
    return () => c.removeEventListener('scroll', onScroll)
  }, [])

  // Track playback position and compute the active singable line using a
  // length-weighted estimate. Real per-line Suno timestamps require auth and
  // are unavailable, so we (a) assume singing starts a little after 0:00 and
  // ends a little before the track end, and (b) weight lines by length.
  useEffect(() => {
    const el = audioRef && audioRef.current
    if (!el) return
    const onTime = () => {
      const dur = el.duration
      if (!dur || !isFinite(dur) || dur <= 0 || singableCount === 0 || totalWeight === 0) return
      // Lead-in / outro padding so the highlight is not perpetually early.
      const intro = Math.min(8, dur * 0.06)
      const outro = Math.min(6, dur * 0.05)
      const span = dur - intro - outro
      let p = span > 0 ? (el.currentTime - intro) / span : el.currentTime / dur
      if (p < 0) p = 0
      if (p > 1) p = 1
      const target = p * totalWeight
      // Active singable line = the cumulative-weight bracket containing target.
      let idx = 0
      while (idx < singableCount - 1 && cumWeights[idx + 1] <= target) idx++
      const realIndex = singableIndexes[idx]
      setActiveLine((prev) => (prev === realIndex ? prev : realIndex))
    }
    el.addEventListener('timeupdate', onTime)
    return () => el.removeEventListener('timeupdate', onTime)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef, singableCount, totalWeight, trackId])

  // Auto-scroll the active line to center — scoped to the lyrics container ONLY
  // (computing scrollTop directly, so the page itself never scrolls; a plain
  // scrollIntoView would also scroll document ancestors).
  useEffect(() => {
    if (activeLine < 0) return
    if (userScrolledRef.current) return // paused: the user scrolled by hand
    const container = containerRef.current
    const node = lineRefs.current[activeLine]
    if (!container || !node) return
    const target =
      node.offsetTop - container.clientHeight / 2 + node.offsetHeight / 2
    const top = Math.max(0, target)
    markAutoScroll()
    if (typeof container.scrollTo === 'function') {
      container.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
    } else {
      container.scrollTop = top
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLine])

  if (!lyrics) {
    return <div className="player__lyrics">No lyrics for this track.</div>
  }

  // Highlight a 6-line band: the previous 3 singable lines, the active line, and
  // the next 2 singable lines. activePos is the active line's index within the
  // singable-only sequence.
  const activePos = activeLine >= 0 ? singableIndexes.indexOf(activeLine) : -1
  const highlighted = new Set()
  if (activePos >= 0) {
    for (let p = activePos - 3; p <= activePos + 2; p++) {
      if (p >= 0 && p < singableIndexes.length) highlighted.add(singableIndexes[p])
    }
  }

  return (
    <div className="player__lyrics" ref={containerRef}>
      {lines.map((line, i) =>
        isDashLine(line) ? null : (
        <p
          key={i}
          ref={(node) => {
            lineRefs.current[i] = node
          }}
          className={`lyrics__line${highlighted.has(i) ? ' lyrics__line--active' : ''}${
            isStructuralLine(line) ? ' lyrics__line--structural' : ''
          }`}
        >
          {line === '' ? ' ' : capitalizeLyricLine(line)}
        </p>
        )
      )}
    </div>
  )
}

function NowPlayingBar({ song, audioRef, onClose, onEnded, onPrev, onNext, hasPrev, hasNext, multi, position, lyricsOpen, setLyricsOpen }) {
  // Track whether audio is actively playing (kept for future play-state UI).
  const [playing, setPlaying] = useState(() => !audioRef.current?.paused)
  // lyricsOpen is lifted to App so the one-screen "music-locked" layout can be
  // released when the user collapses the lyrics (listings then scroll normally).

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    setPlaying(!el.paused)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    return () => {
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
    }
    // Re-bind when the track (and thus the <audio> element key) changes.
  }, [audioRef, song.id])

  // Keep the screen awake while audio is playing so the phone doesn't dim/sleep
  // (Screen Wake Lock API; re-acquired when returning to the tab).
  useEffect(() => {
    if (!playing || typeof navigator === 'undefined' || !('wakeLock' in navigator)) return
    let lock = null
    let cancelled = false
    const request = async () => {
      try {
        lock = await navigator.wakeLock.request('screen')
      } catch {
        /* ignore — unsupported or denied */
      }
    }
    const onVisible = () => {
      if (document.visibilityState === 'visible' && !cancelled) request()
    }
    request()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisible)
      if (lock) {
        try {
          lock.release()
        } catch {
          /* ignore */
        }
        lock = null
      }
    }
  }, [playing])

  return (
    <div className={`player${lyricsOpen ? '' : ' player--lyrics-collapsed'}`}>
      <button
        type="button"
        className="player__close"
        onClick={onClose}
        aria-label="Close player"
      >
        ×
      </button>
      <div className="player__inner">
        <div className="player__left">
          <div className="player__leftcol">
            <img
              className="player__cover"
              src={song.image}
              alt={song.title}
              loading="lazy"
            />
            {multi && (
              <div className="player__nav">
                <button
                  type="button"
                  className="player__skip"
                  onClick={onPrev}
                  disabled={!hasPrev}
                  aria-label="Previous track"
                  title="Previous track"
                >
                  ⏮
                </button>
                <button
                  type="button"
                  className="player__skip"
                  onClick={onNext}
                  disabled={!hasNext}
                  aria-label="Next track"
                  title="Next track"
                >
                  ⏭
                </button>
              </div>
            )}
          </div>
          <div className="player__meta">
            <div className="player__metahead">
              <div>
                <p className="player__nowplaying">
                  Now Playing{multi && position ? ` · ${position}` : ''}
                </p>
                <p className="player__title">{song.title}</p>
                <p className="player__artist">AJ Miller</p>
              </div>
            </div>
            {song.audio ? (
              <div className="player__audiorow">
                {song.lyrics && (
                  <button
                    type="button"
                    className={`player__lyricstoggle${lyricsOpen ? ' player__lyricstoggle--open' : ''}`}
                    onClick={() => setLyricsOpen((o) => !o)}
                    aria-label={lyricsOpen ? 'Collapse lyrics' : 'Show lyrics'}
                    aria-expanded={lyricsOpen}
                    title={lyricsOpen ? 'Collapse lyrics' : 'Show lyrics'}
                  >
                    Lyrics
                  </button>
                )}
                <audio
                  ref={audioRef}
                  className="player__audio"
                  key={song.id}
                  src={song.audio}
                  controls
                  preload="none"
                  onEnded={onEnded}
                />
              </div>
            ) : (
              <p className="player__noaudio">No audio available for this track.</p>
            )}
          </div>
        </div>
        {lyricsOpen && (
          <LyricsPanel lyrics={song.lyrics} audioRef={audioRef} trackId={song.id} />
        )}
      </div>
    </div>
  )
}

function App() {
  const [tab, setTab] = useState('Career')
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(
    () => (typeof document !== 'undefined' && document.documentElement.dataset.theme) || 'light'
  )
  const [accent, setAccent] = useState(
    () => (typeof document !== 'undefined' && document.documentElement.dataset.accent) || 'default'
  )
  const [pickerOpen, setPickerOpen] = useState(false)

  // ── Favorites (song + playlist ids), persisted to localStorage. Suno doesn't
  // expose the user's liked songs, so favorites are stored locally per device. ──
  const loadFavSet = (key) => {
    try {
      const raw = localStorage.getItem(key)
      const arr = raw ? JSON.parse(raw) : []
      return new Set(Array.isArray(arr) ? arr : [])
    } catch {
      return new Set()
    }
  }
  const [favSongs, setFavSongs] = useState(() => loadFavSet('hubFavSongs'))
  const [favPlaylists, setFavPlaylists] = useState(() => loadFavSet('hubFavPlaylists'))

  useEffect(() => {
    try {
      localStorage.setItem('hubFavSongs', JSON.stringify([...favSongs]))
    } catch {
      // ignore storage failures
    }
  }, [favSongs])

  useEffect(() => {
    try {
      localStorage.setItem('hubFavPlaylists', JSON.stringify([...favPlaylists]))
    } catch {
      // ignore storage failures
    }
  }, [favPlaylists])

  const onToggleFavSong = (id) =>
    setFavSongs((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const onToggleFavPlaylist = (id) =>
    setFavPlaylists((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  // ── Lifted music playback state (lives at the App root so the <audio>
  // element stays mounted and keeps playing across tab switches) ──────
  const [musicData, setMusicData] = useState(sunoFallback)
  const [musicLoading, setMusicLoading] = useState(true)
  const audioRef = useRef(null)
  const [queue, setQueue] = useState([])
  const [queueIndex, setQueueIndex] = useState(0)
  const [activePlaylistId, setActivePlaylistId] = useState(null)
  const [shouldPlay, setShouldPlay] = useState(false)
  const [playerVisible, setPlayerVisible] = useState(false)
  // Lyrics open/collapsed (lifted from NowPlayingBar). Drives the mobile lock.
  const [lyricsOpen, setLyricsOpen] = useState(true)
  // Remember whether audio was playing when the browser tab was hidden.
  const wasPlayingOnHide = useRef(false)

  // Scroll-to-top button: show once the user has scrolled past the hero / first screen.
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fire one open page-view on mount (once per load). Non-blocking; errors are
  // ignored. The endpoint records only coarse geo and no-ops if unconfigured.
  useEffect(() => {
    fetch('/api/track', { method: 'POST', keepalive: true }).catch(() => {})
  }, [])

  // Expose the active tab on <body> so CSS can target tab-specific mobile layout
  // (e.g. the Music tab's taller player/lyrics that fills the top half).
  useEffect(() => {
    document.body.dataset.tab = tab
  }, [tab])

  // Lock the Music page to one screen (no vertical scroll) while the player is
  // open — the playlists/songs listings below then scroll horizontally instead.
  useEffect(() => {
    // Only lock while the lyrics are OPEN. Collapsing lyrics releases the lock so
    // the playlists/songs flow below the player in the normal scrolling grid.
    const locked = playerVisible && tab === 'Music' && lyricsOpen
    document.documentElement.classList.toggle('music-locked', locked)
    document.body.classList.toggle('music-locked', locked)
    return () => {
      document.documentElement.classList.remove('music-locked')
      document.body.classList.remove('music-locked')
    }
  }, [playerVisible, tab, lyricsOpen])

  // Dock the player to the BOTTOM on the non-Music tabs and expose its measured
  // height as --playerbar-h so page padding + the scroll-top button clear it.
  useEffect(() => {
    const bottomTabs = ['Career', 'Application', 'Telegram Bot', 'Favorites']
    const docked = playerVisible && bottomTabs.includes(tab)
    document.body.classList.toggle('player-docked', docked)
    if (!docked) {
      document.body.style.removeProperty('--playerbar-h')
      return
    }
    const el = document.querySelector('.player')
    if (!el) return
    const update = () =>
      document.body.style.setProperty('--playerbar-h', `${el.offsetHeight}px`)
    update()
    let ro
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(update)
      ro.observe(el)
    }
    return () => {
      if (ro) ro.disconnect()
      document.body.classList.remove('player-docked')
      document.body.style.removeProperty('--playerbar-h')
    }
  }, [playerVisible, tab])

  // Hide the "7:27" song + playlist everywhere.
  const HIDE_RE = /7\s*:?\s*27/
  const songs = (musicData.songs || []).filter((s) => !HIDE_RE.test(s.title || ''))
  const playlists = (musicData.playlists || []).filter((p) => !HIDE_RE.test(p.name || ''))
  const currentTrack = queue[queueIndex] || null

  // Fetch the Suno catalog once at app start; fall back to bundled JSON.
  useEffect(() => {
    let active = true
    setMusicLoading(true)
    fetch('/api/suno')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (!active) return
        if (json && Array.isArray(json.songs) && json.songs.length) {
          setMusicData(json)
        }
      })
      .catch(() => {
        // Fall back to bundled suno.json (dev / offline / upstream error).
      })
      .finally(() => {
        if (active) setMusicLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  // Default the player to the first song once data loads, but do NOT autoplay
  // and do NOT show the bar (it appears only after the first user click).
  useEffect(() => {
    if (!queue.length && songs.length) {
      const def = songs.find((s) => s.title === 'Breathe With the Light') || songs[0]
      setQueue([def])
      setQueueIndex(0)
    }
  }, [songs, queue.length])

  // Play only when a track was selected via a user click (shouldPlay flag).
  // Re-runs whenever the active track changes (queueIndex) so auto-advance
  // and prev/next start playback of the newly selected track.
  useEffect(() => {
    if (!shouldPlay) return
    const el = audioRef.current
    if (el && currentTrack && currentTrack.audio) {
      const p = el.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
  }, [currentTrack, shouldPlay])

  // ── Pause when the browser tab is hidden; resume when visible again ──
  // Only on mobile — on laptop/desktop the music keeps playing across browser
  // tabs (large screens don't aggressively background-throttle audio).
  useEffect(() => {
    const onVisibility = () => {
      const el = audioRef.current
      if (!el) return
      const isMobile = window.matchMedia('(max-width: 720px)').matches
      if (!isMobile) return
      if (document.hidden) {
        // Pause if currently playing, and remember we were playing.
        if (!el.paused) {
          wasPlayingOnHide.current = true
          try {
            el.pause()
          } catch {
            // ignore
          }
        } else {
          wasPlayingOnHide.current = false
        }
      } else if (wasPlayingOnHide.current) {
        // Resume only if it was playing at the moment it was hidden.
        wasPlayingOnHide.current = false
        const p = el.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // Play a single song → one-track queue.
  const onPlaySong = (song) => {
    setShouldPlay(true)
    setActivePlaylistId(null)
    setQueue([song])
    setQueueIndex(0)
    setPlayerVisible(true)
  }

  // Play a playlist → resolve its tracks, queue them, play the first.
  const onPlayPlaylist = async (playlist) => {
    let tracks = Array.isArray(playlist.tracks) ? playlist.tracks : []
    if (!tracks.length) {
      try {
        const res = await fetch('/api/playlist?id=' + encodeURIComponent(playlist.id))
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        tracks = Array.isArray(json && json.tracks) ? json.tracks : []
      } catch {
        // Fall back to opening the playlist on Suno.
        if (playlist.url) window.open(playlist.url, '_blank', 'noreferrer')
        return
      }
    }
    if (!tracks.length) {
      if (playlist.url) window.open(playlist.url, '_blank', 'noreferrer')
      return
    }
    setShouldPlay(true)
    setActivePlaylistId(playlist.id)
    setQueue(tracks)
    setQueueIndex(0)
    setPlayerVisible(true)
  }

  // Build one queue from ALL favorites — favorited songs + every track of each
  // favorited playlist (deduped by id). Powers the Favorites tab's universal player.
  const buildFavoritesQueue = async () => {
    const map = new Map()
    for (const s of songs) if (favSongs.has(s.id)) map.set(s.id, s)
    for (const pl of playlists) {
      if (!favPlaylists.has(pl.id)) continue
      let tracks = Array.isArray(pl.tracks) ? pl.tracks : []
      if (!tracks.length) {
        try {
          const res = await fetch('/api/playlist?id=' + encodeURIComponent(pl.id))
          if (res.ok) {
            const json = await res.json()
            tracks = Array.isArray(json && json.tracks) ? json.tracks : []
          }
        } catch {
          // ignore — just skip this playlist's tracks
        }
      }
      for (const t of tracks) if (t && t.id && !map.has(t.id)) map.set(t.id, t)
    }
    return [...map.values()]
  }

  const onPlayFavorites = async (shuffle = false) => {
    let q = await buildFavoritesQueue()
    if (!q.length) return
    if (shuffle) {
      for (let i = q.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[q[i], q[j]] = [q[j], q[i]]
      }
    }
    setShouldPlay(true)
    setActivePlaylistId(null)
    setQueue(q)
    setQueueIndex(0)
    setPlayerVisible(true)
  }

  const playPrev = () => {
    setQueueIndex((i) => (i > 0 ? i - 1 : i))
    setShouldPlay(true)
  }

  const playNext = () => {
    setQueueIndex((i) => (i < queue.length - 1 ? i + 1 : i))
    setShouldPlay(true)
  }

  // Auto-advance when the current track ends; stop at the end of the queue.
  const onTrackEnded = () => {
    setQueueIndex((i) => {
      if (i < queue.length - 1) {
        setShouldPlay(true)
        return i + 1
      }
      return i
    })
  }

  const closePlayer = () => {
    setPlayerVisible(false)
    setShouldPlay(false)
    wasPlayingOnHide.current = false
    const el = audioRef.current
    if (el) {
      try {
        el.pause()
      } catch {
        // ignore
      }
    }
  }

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // ignore storage failures
    }
  }

  const chooseAccent = (id) => {
    setAccent(id)
    setPickerOpen(false)
    document.documentElement.dataset.accent = id
    try {
      localStorage.setItem('accent', id)
    } catch {
      // ignore storage failures
    }
  }

  // Swap the browser favicon / touch icons to match the active theme colour.
  useEffect(() => {
    const set = (sel, href) => {
      const el = document.querySelector(sel)
      if (el) el.href = href
    }
    set('link[rel="icon"][sizes="32x32"]', `/favicon-32-${accent}.png?v=4`)
    set('link[rel="icon"][sizes="256x256"]', `/favicon-${accent}.png?v=4`)
    set('link[rel="apple-touch-icon"]', `/apple-touch-${accent}.png?v=4`)
  }, [accent])

  // Close the theme picker on Escape or an outside click.
  useEffect(() => {
    if (!pickerOpen) return
    const onDoc = (e) => {
      if (e.key === 'Escape') return setPickerOpen(false)
      if (e.type === 'pointerdown' && !e.target.closest('.themepicker')) setPickerOpen(false)
    }
    document.addEventListener('keydown', onDoc)
    document.addEventListener('pointerdown', onDoc)
    return () => {
      document.removeEventListener('keydown', onDoc)
      document.removeEventListener('pointerdown', onDoc)
    }
  }, [pickerOpen])

  // Burger-menu navigation: jump to a tab and optionally scroll to a section id
  // within it (waiting for the tab to render when switching).
  const navigateTo = (targetTab, sectionId) => {
    setMenuOpen(false)
    const switching = targetTab && targetTab !== tab
    if (switching) setTab(targetTab)
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: switching ? 'auto' : 'smooth' })
      return
    }
    const doScroll = () => {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    if (switching) setTimeout(doScroll, 90)
    else doScroll()
  }

  // Close the menu on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Scroll to top whenever the active tab changes.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tab])

  // Re-run the reveal fade-up for whichever tab is mounted.
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = document.querySelectorAll('.reveal')
    if (prefersReduced) {
      els.forEach((el) => el.classList.add('visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [tab])

  return (
    <>
      <nav className="hubbar">
        <button
          className="hubbar__burger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="site-drawer"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <button
          className="hubbar__brand"
          onClick={() => {
            setTab('Career')
            window.scrollTo(0, 0)
          }}
          style={{ background: 'none', border: 0, cursor: 'pointer', color: 'inherit' }}
          aria-label="Go to Career"
        >
          <span className="hubbar__mark" aria-hidden="true">
            <img className="hubbar__logo" src={`/logo-${accent}.png`} alt="" />
          </span>
          <span className="hubbar__name">{profile.name}</span>
        </button>
        <div className="hubtabs">
          {TABS.map((t) => {
            const iconOnly = t === 'Favorites' || t === 'Analytics'
            const lead = { Career: '💼', Application: '🖥️', 'Telegram Bot': '🤖', Music: '🎵' }[t]
            const icon = t === 'Favorites' ? '♥' : t === 'Analytics' ? '📊' : lead || ''
            return (
              <button
                key={t}
                className={`hubtab${tab === t ? ' hubtab--active' : ''}${iconOnly ? ' hubtab--fav' : ''}${lead ? ' hubtab--lead' : ''}`}
                onClick={() => setTab(t)}
                aria-current={tab === t ? 'page' : undefined}
                aria-label={iconOnly ? t : undefined}
              >
                {iconOnly ? (
                  <>
                    <span className="tabicon" aria-hidden="true">{icon}</span>
                    <span className="tablabel">{t}</span>
                  </>
                ) : (
                  <>
                    <span className="tabicon tabicon--lead" aria-hidden="true">{icon}</span>
                    {t}
                  </>
                )}
              </button>
            )
          })}
        </div>
        <div className="themepicker">
          <button
            className="themepicker__btn"
            onClick={() => setPickerOpen((o) => !o)}
            aria-label="Choose color theme"
            aria-haspopup="menu"
            aria-expanded={pickerOpen}
            title="Color theme"
          >
            <span className="themepicker__dot" aria-hidden="true" />
          </button>
          {pickerOpen && (
            <div className="themepicker__menu" role="menu">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={accent === t.id}
                  className={`themeopt${accent === t.id ? ' themeopt--active' : ''}`}
                  onClick={() => chooseAccent(t.id)}
                >
                  <span className="themeopt__sw" style={{ background: t.color }} aria-hidden="true" />
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          className="themetoggle"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </nav>

      <div
        className={`drawer__overlay${menuOpen ? ' drawer__overlay--show' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="site-drawer"
        className={`drawer${menuOpen ? ' drawer--open' : ''}`}
        aria-hidden={!menuOpen}
        aria-label="Site menu"
      >
        <div className="drawer__head">
          <span className="drawer__title">Menu</span>
          <button
            className="drawer__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <nav className="drawer__nav">
          <p className="drawer__group">Pages</p>
          {TABS.map((t) => (
            <button
              key={t}
              className={`drawer__link${tab === t ? ' drawer__link--active' : ''}`}
              onClick={() => navigateTo(t)}
            >
              {t}
            </button>
          ))}
          <p className="drawer__group">Career page</p>
          {CAREER_SECTIONS.map((s) => (
            <button
              key={s.id}
              className="drawer__link drawer__link--sub"
              onClick={() => navigateTo('Career', s.id)}
            >
              {s.label}
            </button>
          ))}
          <p className="drawer__group">Music page</p>
          {MUSIC_SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`drawer__link drawer__link--sub${s.id === 'music-recommended' ? ' drawer__link--deskonly' : ''}`}
              onClick={() => navigateTo('Music', s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {playerVisible && currentTrack && (
        <NowPlayingBar
          song={currentTrack}
          audioRef={audioRef}
          onClose={closePlayer}
          onEnded={onTrackEnded}
          onPrev={playPrev}
          onNext={playNext}
          hasPrev={queueIndex > 0}
          hasNext={queueIndex < queue.length - 1}
          multi={queue.length > 1}
          position={`${queueIndex + 1} / ${queue.length}`}
          lyricsOpen={lyricsOpen}
          setLyricsOpen={setLyricsOpen}
        />
      )}

      <main className="hubmain">
        {tab === 'Career' && <CareerTab />}
        {tab === 'Application' && <ApplicationTab />}
        {tab === 'Telegram Bot' && <TelegramBotTab />}
        {tab === 'Music' && (
          <MusicTab
            songs={songs}
            playlists={playlists}
            loading={musicLoading}
            currentTrack={currentTrack}
            activePlaylistId={activePlaylistId}
            onPlaySong={onPlaySong}
            onPlayPlaylist={onPlayPlaylist}
            favSongs={favSongs}
            favPlaylists={favPlaylists}
            onToggleFavSong={onToggleFavSong}
            onToggleFavPlaylist={onToggleFavPlaylist}
          />
        )}
        {tab === 'Favorites' && (
          <FavoritesTab
            songs={songs}
            playlists={playlists}
            currentTrack={currentTrack}
            playerVisible={playerVisible}
            favSongs={favSongs}
            favPlaylists={favPlaylists}
            onPlayFavorites={onPlayFavorites}
          />
        )}
        {tab === 'Analytics' && <AnalyticsTab />}
      </main>

      <footer className="footer hub-footer">
        <span>© {new Date().getFullYear()} AJ Miller T. Perez</span>
        <span className="footer__made">Career · Application · Telegram Bot · Music · Favorites · Analytics — built with React + Vite</span>
      </footer>

      <button
        className={`scrolltop${showTop ? ' scrolltop--show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        title="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>
    </>
  )
}

export default App
