import { useEffect, useState } from 'react'
import suno from './suno.json'

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
  { value: '95%', label: 'Accessibility compliance' },
  { value: '5', label: 'Industries served' },
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

const recognition = [
  {
    title: 'Certifications',
    items: [
      'Salesforce Certified Associate',
      'CPACC — Certified Professional in Accessibility Core Competencies',
      'WAI0.1x: Introduction to Web Accessibility',
      'Discover the Art of Prompting',
      'Maximize Productivity With AI Tools',
    ],
  },
  {
    title: 'Honors & Awards',
    items: [
      'Most Outstanding Employee of the Year, 2013',
      'Champion — DLSU Marketing Approach to National Development, Phase 3',
      'Champion — 16th National Marketing Week Case Analysis',
      'Champion — CBEA Week Team Debate Cup',
      'Finalist — Top 180 Nationwide, Marketing Professional Students',
    ],
  },
  {
    title: 'Memberships',
    items: [
      'Project Management Institute (PMI) — Member',
      'Philippine Society for Quality, Inc. (PSQ) — Member',
    ],
  },
]

const bots = [
  {
    name: 'Tagalog Translate',
    handle: '@tagalog_translate_bot',
    desc: 'Two-way Tagalog ⇄ English translation with automatic direction detection.',
    status: 'dev',
  },
  {
    name: 'PJO Weather',
    handle: '@pjo_weather_bot',
    desc: 'Daily forecasts and on-demand weather delivered straight to Telegram.',
    status: 'live',
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
  },
]

const TABS = ['Career', 'Application', 'Telegram Bot', 'Music']

const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
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
        <div className="hero__inner">
          <p className="hero__eyebrow">{profile.location}</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__headline">{profile.headline}</p>
          <p className="hero__tagline">{profile.tagline}</p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#contact" target="_blank" rel="noreferrer">
              Get in touch
            </a>
            <a className="btn btn--ghost" href="#experience" target="_blank" rel="noreferrer">
              View experience
            </a>
            <a className="btn btn--ghost" href={profile.resumeUrl} target="_blank" rel="noreferrer">
              Résumé
            </a>
          </div>
          <div className="hero__stats">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <div className="stat__value">{stat.value}</div>
                <div className="stat__label">{stat.label}</div>
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

      <Section id="recognition" kicker="05 — Recognition" title="Credentials & honors">
        <div className="recognition">
          {recognition.map((card) => (
            <div className="listcard reveal" key={card.title}>
              <h3>{card.title}</h3>
              <ul>
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
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
          {apps.map((app) => (
            <div className="itemcard reveal" key={app.name}>
              <div className="itemcard__top">
                <h3>{app.name}</h3>
                <span className="badge badge--live"><span className="badge__dot" />Live</span>
              </div>
              <p className="itemcard__desc">{app.desc}</p>
              <div className="itemcard__foot">
                <span className="tag">Web</span>
                <a className="btn btn--primary" href={app.url} target="_blank" rel="noreferrer">
                  Open ↗
                </a>
              </div>
            </div>
          ))}
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
                <div className="itemcard__top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="itemcard__mark"><PlaneIcon /></span>
                    <div>
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

function MusicTab() {
  const { songs = [], playlists = [] } = suno
  return (
    <>
      <div className="tabhero">
        <div className="tabhero__glow" />
        <div className="tabhero__inner reveal">
          <p className="tabhero__kicker">Music</p>
          <h1 className="tabhero__title">Songs & playlists on Suno</h1>
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

      <div className="musicsub">
        <h2 className="musicsub__title">Playlists</h2>
        <p className="musicsub__count">{playlists.length} playlists</p>
        <div className="plgrid">
          {playlists.map((pl) => (
            <a
              className="plcard reveal"
              key={pl.id}
              href={pl.url}
              target="_blank"
              rel="noreferrer"
            >
              <PlaylistCover image={pl.image} name={pl.name} />
              <div className="plcard__body">
                <p className="plcard__name">{pl.name}</p>
                <p className="plcard__meta">{pl.count} tracks</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="musicsub">
        <h2 className="musicsub__title">Songs</h2>
        <p className="musicsub__count">{songs.length} songs</p>
        <div className="songgrid">
          {songs.map((song) => (
            <a
              className="songcard reveal"
              key={song.id}
              href={song.url}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="songcard__cover"
                src={song.image}
                alt={song.title}
                loading="lazy"
              />
              <div className="songcard__body">
                <p className="songcard__title">{song.title}</p>
                {styleLine(song.tags) && (
                  <p className="songcard__style">{styleLine(song.tags)}</p>
                )}
                <p className="songcard__meta">{song.plays} plays</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

function App() {
  const [tab, setTab] = useState('Career')

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
      </nav>

      <main className="hubmain">
        {tab === 'Career' && <CareerTab />}
        {tab === 'Application' && <ApplicationTab />}
        {tab === 'Telegram Bot' && <TelegramBotTab />}
        {tab === 'Music' && <MusicTab />}
      </main>

      <footer className="footer hub-footer">
        <span>© {new Date().getFullYear()} AJ Miller T. Perez</span>
        <span className="footer__made">Career · Application · Telegram Bot · Music — built with React + Vite</span>
      </footer>
    </>
  )
}

export default App
