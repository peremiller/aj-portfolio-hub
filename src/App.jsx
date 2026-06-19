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
    company: 'Kforce Global Solutions, Inc.',
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
    company: 'Cognizant Technology Solutions, Inc.',
    loc: 'Bonifacio Global City, Taguig, Philippines',
    bullets: [
      'Selected for the HTML5 multi-platform ads team among 50+ testers.',
      'Executed testing to ensure application performance across a range of mobile and tablet devices.',
    ],
  },
  {
    period: 'Sep 2011 — Aug 2014',
    role: 'Software Quality Assurance Analyst',
    company: 'Icomteq Solutions, Inc.',
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
    meta: 'Icomteq Solutions Inc. · Dec 2013',
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
  'Philippine Society for Quality, Inc. (PSQ) — Member',
]

const bots = [
  {
    name: 'Weather',
    handle: '@pjo_weather_bot',
    desc: 'Daily forecasts and on-demand weather delivered straight to Telegram.',
    status: 'live',
  },
  {
    name: 'Tagalog Translate',
    handle: '@tagalog_translate_bot',
    desc: 'Two-way Tagalog ⇄ English translation with automatic direction detection.',
    status: 'dev',
  },
  {
    name: 'Disaster Watch',
    handle: '@disaster_watch_bot',
    desc: 'Real-time alerts for earthquakes, tsunamis, typhoons, floods, and volcanic activity.',
    status: 'dev',
  },
  {
    name: 'PH Dollar Rate',
    handle: '@ph_dollar_rate',
    desc: 'Compares USD→PHP buy & sell rates across Philippine banks.',
    status: 'dev',
  },
  {
    name: 'Pelikula Finder',
    handle: '@pelikula_finder_bot',
    desc: 'Finds now-playing movies and showtimes in nearby cinemas.',
    status: 'dev',
  },
]

const apps = [
  {
    name: 'Retirement Guardian',
    desc: 'Guardrails-based retirement spending tool that signals when to adjust withdrawals to stay on track.',
    url: 'https://peremiller.github.io/retirement-guardian/',
  },
  {
    name: 'Calm Capital',
    desc: 'Behavioral-wealth dashboard — investment policy statement, synthetic paycheck, net-worth tracking, and a "bear mode" for downturns.',
    url: 'https://peremiller.github.io/calm-capital/',
  },
  {
    name: 'Cash Reserve Planner',
    desc: 'Three-bucket liquidity planner with a reserve glide path and multi-currency support.',
    url: 'https://cash-reserve-planner.vercel.app',
  },
  {
    name: 'Dynamic Withdrawal',
    desc: 'Models dynamic retirement withdrawal strategies that adapt spending to market performance.',
    url: 'https://peremiller.github.io/dynamic-withdrawal/',
  },
  {
    name: 'Retirement Income Maximizer',
    desc: 'Calculators for maximizing retirement income — delaying Social Security to 70 and joint-and-survivor annuities.',
    url: 'https://peremiller.github.io/retirement-planner/',
  },
  {
    name: 'Asset Location Optimizer',
    desc: 'Places bonds in tax-deferred accounts and equities in taxable accounts for asset-location tax efficiency (PWA).',
    url: 'https://asset-location-optimizer.vercel.app',
  },
  {
    name: 'Job Portal (TalentMatch)',
    desc: 'Matches your CV to job openings and lets you apply, with OAuth sign-in.',
    url: 'https://job-portal-beta-rose.vercel.app',
    status: 'dev',
  },
  {
    name: 'Blockchain Problems',
    desc: 'Interactive data-visualization of the top problems facing the blockchain industry.',
    url: 'https://blockchain-problems.vercel.app/',
  },
]

const TABS = ['Career', 'Application', 'Telegram Bot', 'Music']

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

function ApplicationTab() {
  return (
    <>
      <div className="tabhero">
        <div className="tabhero__glow" />
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
          {apps.map((app) => {
            const live = app.status !== 'dev'
            return (
            <div className="itemcard reveal" key={app.name}>
              <div className="itemcard__top">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AppFavicon url={app.url} name={app.name} />
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
          })}
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
                    <span className="itemcard__mark"><PlaneIcon /></span>
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

function MusicTab({ songs, playlists, loading, currentTrack, activePlaylistId, onPlaySong, onPlayPlaylist }) {
  return (
    <>
      <div className="tabhero">
        <div className="tabhero__glow" />
        <div className="tabhero__inner reveal">
          <p className="tabhero__kicker">Music</p>
          <h1 className="tabhero__title">Songs & Playlists on Suno</h1>
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

      <div className="musicsub">
        <h2 className="musicsub__title">Playlists</h2>
        <p className="musicsub__count">{playlists.length} playlists</p>
        <div className="plgrid">
          {playlists.map((pl) => {
            const active = activePlaylistId && activePlaylistId === pl.id
            return (
              <div
                className={`plcard reveal${active ? ' plcard--active' : ''}`}
                key={pl.id}
              >
                <button
                  type="button"
                  className="plcard__play"
                  onClick={() => onPlayPlaylist(pl)}
                  aria-label={`Play ${pl.name}`}
                >
                  <PlaylistCover image={pl.image} name={pl.name} />
                  <span className="plcard__playicon" aria-hidden="true">▶</span>
                </button>
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
                    <a
                      className="plcard__suno"
                      href={pl.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Suno ↗
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="musicsub">
        <h2 className="musicsub__title">Songs</h2>
        <p className="musicsub__count">{songs.length} songs</p>
        <div className="songgrid">
          {songs.map((song) => {
            const active = currentTrack && currentTrack.id === song.id
            return (
              <div
                className={`songcard reveal${active ? ' songcard--active' : ''}`}
                key={song.id}
              >
                <button
                  type="button"
                  className="songcard__play"
                  onClick={() => onPlaySong(song)}
                  aria-label={`Play ${song.title}`}
                >
                  <img
                    className="songcard__cover"
                    src={song.image}
                    alt={song.title}
                    loading="lazy"
                  />
                  <span className="songcard__playicon" aria-hidden="true">▶</span>
                </button>
                <div className="songcard__body">
                  <button
                    type="button"
                    className="songcard__titlebtn"
                    onClick={() => onPlaySong(song)}
                  >
                    <span className="songcard__title">{song.title}</span>
                  </button>
                  {styleLine(song.tags) && (
                    <p className="songcard__style">{styleLine(song.tags)}</p>
                  )}
                  <div className="songcard__foot">
                    <p className="songcard__meta">{song.plays} plays</p>
                    <a
                      className="songcard__suno"
                      href={song.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Suno ↗
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
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
  return false
}

function LyricsPanel({ lyrics, audioRef, trackId }) {
  const containerRef = useRef(null)
  const lineRefs = useRef([])
  const [activeLine, setActiveLine] = useState(-1)

  // Parse lyrics into lines + the singable-line index map (memo-free; cheap).
  const lines = (lyrics || '').split('\n')
  const singableIndexes = []
  lines.forEach((line, i) => {
    if (!isStructuralLine(line)) singableIndexes.push(i)
  })
  const singableCount = singableIndexes.length

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Reset to the top whenever the track changes.
  useEffect(() => {
    setActiveLine(-1)
    const c = containerRef.current
    if (c) c.scrollTop = 0
  }, [trackId])

  // Track playback position and compute the active singable line proportionally.
  useEffect(() => {
    const el = audioRef && audioRef.current
    if (!el) return
    const onTime = () => {
      const dur = el.duration
      if (!dur || !isFinite(dur) || dur <= 0 || singableCount === 0) return
      const progress = el.currentTime / dur
      let idx = Math.floor(progress * singableCount)
      if (idx < 0) idx = 0
      if (idx > singableCount - 1) idx = singableCount - 1
      const realIndex = singableIndexes[idx]
      setActiveLine((prev) => (prev === realIndex ? prev : realIndex))
    }
    el.addEventListener('timeupdate', onTime)
    return () => el.removeEventListener('timeupdate', onTime)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef, singableCount, trackId])

  // Auto-scroll the active line to center — scoped to the lyrics container ONLY
  // (computing scrollTop directly, so the page itself never scrolls; a plain
  // scrollIntoView would also scroll document ancestors).
  useEffect(() => {
    if (activeLine < 0) return
    const container = containerRef.current
    const node = lineRefs.current[activeLine]
    if (!container || !node) return
    const target =
      node.offsetTop - container.clientHeight / 2 + node.offsetHeight / 2
    const top = Math.max(0, target)
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

  return (
    <div className="player__lyrics" ref={containerRef}>
      {lines.map((line, i) => (
        <p
          key={i}
          ref={(node) => {
            lineRefs.current[i] = node
          }}
          className={`lyrics__line${i === activeLine ? ' lyrics__line--active' : ''}${
            isStructuralLine(line) ? ' lyrics__line--structural' : ''
          }`}
        >
          {line === '' ? ' ' : line}
        </p>
      ))}
    </div>
  )
}

function NowPlayingBar({ song, audioRef, onClose, onEnded, onPrev, onNext, hasPrev, hasNext, multi, position }) {
  return (
    <div className="player">
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
          <img
            className="player__cover"
            src={song.image}
            alt={song.title}
            loading="lazy"
          />
          <div className="player__meta">
            <div className="player__metahead">
              <div>
                <p className="player__nowplaying">
                  Now Playing{multi && position ? ` · ${position}` : ''}
                </p>
                <p className="player__title">{song.title}</p>
              </div>
              {song.url && (
                <a
                  className="player__suno"
                  href={song.url}
                  target="_blank"
                  rel="noreferrer"
                  title="Open in Suno"
                >
                  Open in Suno ↗
                </a>
              )}
            </div>
            {styleLine(song.tags) && (
              <p className="player__style">{styleLine(song.tags)}</p>
            )}
            {song.audio ? (
              <audio
                ref={audioRef}
                className="player__audio"
                key={song.id}
                src={song.audio}
                controls
                preload="none"
                onEnded={onEnded}
              />
            ) : (
              <p className="player__noaudio">No audio available for this track.</p>
            )}
            {multi && (
              <div className="player__controls">
                <button
                  type="button"
                  className="player__skip"
                  onClick={onPrev}
                  disabled={!hasPrev}
                  aria-label="Previous track"
                >
                  ⏮ Prev
                </button>
                <button
                  type="button"
                  className="player__skip"
                  onClick={onNext}
                  disabled={!hasNext}
                  aria-label="Next track"
                >
                  Next ⏭
                </button>
              </div>
            )}
          </div>
        </div>
        <LyricsPanel lyrics={song.lyrics} audioRef={audioRef} trackId={song.id} />
      </div>
    </div>
  )
}

function App() {
  const [tab, setTab] = useState('Career')
  const [theme, setTheme] = useState(
    () => (typeof document !== 'undefined' && document.documentElement.dataset.theme) || 'light'
  )

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
  // Remember whether audio was playing when the browser tab was hidden.
  const wasPlayingOnHide = useRef(false)

  const { songs = [], playlists = [] } = musicData
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
  useEffect(() => {
    const onVisibility = () => {
      const el = audioRef.current
      if (!el) return
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
          className="hubbar__brand"
          onClick={() => {
            setTab('Career')
            window.scrollTo(0, 0)
          }}
          style={{ background: 'none', border: 0, cursor: 'pointer', color: 'inherit' }}
          aria-label="Go to Career"
        >
          <span className="hubbar__mark">MP</span>
          <span className="hubbar__name">{profile.name}</span>
        </button>
        <div className="hubtabs">
          {TABS.map((t) => (
            <button
              key={t}
              className={`hubtab${tab === t ? ' hubtab--active' : ''}`}
              onClick={() => setTab(t)}
              aria-current={tab === t ? 'page' : undefined}
            >
              {t}
            </button>
          ))}
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
          />
        )}
      </main>

      <footer className="footer hub-footer">
        <span>© {new Date().getFullYear()} AJ Miller T. Perez</span>
        <span className="footer__made">Career · Application · Telegram Bot · Music — built with React + Vite</span>
      </footer>
    </>
  )
}

export default App
