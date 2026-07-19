import { useEffect, useMemo, useRef, useState } from "react";
import "@fontsource/dm-serif-display/latin-400.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowsClockwise,
  Bank,
  Briefcase,
  CaretDown,
  ChartBar,
  CheckCircle,
  CircleNotch,
  Clock,
  CloudSun,
  CurrencyDollar,
  EnvelopeSimple,
  FilmSlate,
  HeartStraight,
  LinkedinLogo,
  List,
  MagnifyingGlass,
  Moon,
  MusicNotes,
  Palette,
  Pause,
  PersonArmsSpread,
  Phone,
  Play,
  Robot,
  Sun,
  Translate,
  UsersThree,
  Warning,
  X,
} from "@phosphor-icons/react";
import {
  applications,
  capabilityGroups,
  credentials,
  experience,
  honors,
  impactStories,
  musicItems,
  navItems,
  telegramBots,
} from "./data.js";
import logoDefault from "./assets/logo-default.png";
import logoGreen from "./assets/logo-green.png";
import logoRed from "./assets/logo-red.png";
import systemsBlueprint from "./assets/systems-blueprint.png";

const routeMap = Object.fromEntries(navItems.map((item) => [item.path, item.id]));

function getRoute() {
  return routeMap[window.location.pathname] || "career";
}

function fallbackCover(index) {
  return musicItems[index % Math.max(musicItems.length, 1)]?.cover || "";
}

function normalizeMusicCatalog(payload) {
  const songs = Array.isArray(payload?.songs)
    ? payload.songs
        .filter((song) => song?.id && song?.audio)
        .map((song, index) => ({
          id: song.id,
          sourceId: song.id,
          title: song.title || "Untitled",
          type: "song",
          plays: Number(song.plays) || 0,
          duration: Number(song.duration) || 0,
          created: song.created || null,
          cover: song.image || fallbackCover(index),
          href: song.url || `https://suno.com/song/${song.id}`,
          audio: song.audio,
        }))
    : [];

  const playlists = Array.isArray(payload?.playlists)
    ? payload.playlists
        .filter((playlist) => playlist?.id)
        .map((playlist, index) => ({
          id: `playlist:${playlist.id}`,
          sourceId: playlist.id,
          title: playlist.title || "Untitled playlist",
          type: "playlist",
          tracks: Number(playlist.count) || 0,
          plays: Number(playlist.plays) || 0,
          cover: playlist.image || fallbackCover(index),
          href: playlist.url || `https://suno.com/playlist/${playlist.id}`,
          audio: "",
        }))
    : [];

  return [...songs, ...playlists];
}

function formatCatalogTime(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(value));
  } catch {
    return "";
  }
}

function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Local storage can be unavailable in privacy-restricted contexts.
    }
  }, [key, value]);

  return [value, setValue];
}

function SectionHeading({ eyebrow, title, intro, id }) {
  return (
    <div className="section-heading" id={id}>
      <p className="eyebrow">{eyebrow}</p>
      <div className="section-heading-grid">
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
    </div>
  );
}

function Header({ page, theme, setTheme, dark, setDark, navigate, menuOpen, setMenuOpen }) {
  const [themeOpen, setThemeOpen] = useState(false);
  const themeRef = useRef(null);
  const logo = theme === "green" ? logoGreen : theme === "red" ? logoRed : logoDefault;

  useEffect(() => {
    function handleOutside(event) {
      if (themeRef.current && !themeRef.current.contains(event.target)) setThemeOpen(false);
    }
    window.addEventListener("pointerdown", handleOutside);
    return () => window.removeEventListener("pointerdown", handleOutside);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <button className="mobile-menu-button icon-button" type="button" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(true)}>
            <List size={22} weight="regular" />
          </button>

          <button className="brand" type="button" aria-label="Go to Career" onClick={() => navigate("career")}>
            <img src={logo} alt="AJ Miller T. Perez logo" />
            <span>AJ Miller T. Perez</span>
          </button>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button key={item.id} className={page === item.id ? "active" : ""} type="button" onClick={() => navigate(item.id)}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <div className="theme-control" ref={themeRef}>
              <button
                className="icon-button"
                type="button"
                aria-label="Choose color theme"
                aria-expanded={themeOpen}
                onClick={() => setThemeOpen((open) => !open)}
              >
                <Palette size={19} weight="regular" />
                <span className={`theme-indicator ${theme}`} aria-hidden="true" />
              </button>
              {themeOpen ? (
                <div className="theme-menu" role="menu" aria-label="Color theme">
                  {[
                    ["default", "Default"],
                    ["green", "Green"],
                    ["red", "Red"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      role="menuitemradio"
                      aria-checked={theme === value}
                      className={theme === value ? "selected" : ""}
                      type="button"
                      onClick={() => {
                        setTheme(value);
                        setThemeOpen(false);
                      }}
                    >
                      <span className={`theme-swatch ${value}`} aria-hidden="true" />
                      {label}
                      {theme === value ? <CheckCircle size={17} weight="fill" /> : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <button
              className="icon-button"
              type="button"
              aria-label={dark ? "Use light mode" : "Use dark mode"}
              onClick={() => setDark((mode) => !mode)}
            >
              {dark ? <Sun size={19} weight="regular" /> : <Moon size={19} weight="regular" />}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-drawer-backdrop ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} aria-hidden={!menuOpen} />
      <aside id="mobile-navigation" className={`mobile-drawer ${menuOpen ? "open" : ""}`} aria-label="Menu" aria-hidden={!menuOpen}>
        <div className="drawer-header">
          <span>Navigate</span>
          <button className="icon-button" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <X size={21} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button key={item.id} className={page === item.id ? "active" : ""} type="button" onClick={() => navigate(item.id)}>
              <span>{item.label}</span>
              <ArrowRight size={17} />
            </button>
          ))}
        </nav>
        <p className="drawer-note">Quality, product leadership, useful applications, bots, and original music—all in one portfolio.</p>
      </aside>
    </>
  );
}

function CareerPage({ navigate }) {
  const [caseOpen, setCaseOpen] = useState(false);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <section className="career-hero" id="top">
        <div className="hero-copy">
          <p className="location-line">Metro Manila · Philippines</p>
          <h1>AJ Miller T. Perez</h1>
          <p className="hero-role">Product &amp; Program Leader</p>
          <p className="hero-specialty">Engineering Quality · AI-Enabled Transformation</p>
          <div className="hero-statement">
            <span aria-hidden="true" />
            <p>Quality is not a checkpoint.<br />It is the operating system.</p>
          </div>
          <p className="hero-summary">14+ years building execution systems across engineering, product, and operations.</p>
          <div className="hero-actions">
            <button className="button primary" type="button" onClick={() => scrollTo("selected-impact")}>
              Explore selected work <ArrowRight size={18} />
            </button>
            <button className="button secondary" type="button" onClick={() => scrollTo("contact")}>
              Start a conversation <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="hero-visual" role="img" aria-label="Technical systems blueprint showing interconnected delivery workflows">
          <img src={systemsBlueprint} alt="" />
          <span className="visual-label">Systems · Quality · Scale</span>
        </div>
      </section>

      <section className="evidence-band" aria-label="Career outcomes">
        <div><Clock size={31} weight="regular" /><p><strong>2 weeks</strong><span>faster releases</span></p></div>
        <div><ChartBar size={31} weight="regular" /><p><strong>120 hours</strong><span>saved monthly</span></p></div>
        <div><PersonArmsSpread size={31} weight="regular" /><p><strong>95%</strong><span>accessibility</span></p></div>
        <div><UsersThree size={31} weight="regular" /><p><strong>20+</strong><span>engineers led</span></p></div>
      </section>

      <section className="case-study section-shell" id="selected-impact">
        <div className="case-copy">
          <p className="eyebrow">Selected impact / 01</p>
          <h2>Automation at scale</h2>
          <p className="case-summary">A Selenium rollout for a 20-person QA team reduced cycle time and removed 120 manual testing hours each month.</p>
          <div className="tag-row"><span>Automation</span><span>DevOps</span><span>Leadership</span></div>
          <button className="text-link" type="button" aria-expanded={caseOpen} onClick={() => setCaseOpen((open) => !open)}>
            {caseOpen ? "Close outcome" : "Read the outcome"} <ArrowRight size={17} />
          </button>
          {caseOpen ? (
            <div className="case-details">
              <p>Designed the automation rollout around high-value regression paths, adoption coaching, reusable patterns, and shared delivery metrics.</p>
              <ul>
                <li>Two weeks removed from the release cycle</li>
                <li>120 manual testing hours eliminated every month</li>
                <li>Five cross-functional teams enabled by one scalable system</li>
              </ul>
            </div>
          ) : null}
        </div>
        <div className="case-art" role="img" aria-label="Systems architecture blueprint artwork">
          <img src={systemsBlueprint} alt="" />
          <div className="case-stat"><span>20</span><p>QA engineers enabled</p></div>
          <div className="case-stat"><span>5</span><p>cross-functional teams</p></div>
        </div>
      </section>

      <section className="about-section section-shell" id="about">
        <SectionHeading eyebrow="01 — About" title="Leadership that connects strategy to release" intro="I align quality, product, engineering, and operations so complex programs move with clarity—and measurable outcomes." />
        <div className="about-grid">
          <p>I’ve evolved from hands-on QA into a cross-functional leader driving end-to-end execution for global clients across Banking, Healthcare, E-Commerce, Legal, and Energy.</p>
          <p>I embed AI quality, accessibility, risk-based thinking, and practical delivery systems directly into the product lifecycle—improving speed, cost, reliability, and team confidence.</p>
        </div>
      </section>

      <section className="experience-section section-shell" id="experience">
        <SectionHeading eyebrow="02 — Experience" title="Where I’ve worked" intro="A career built around increasingly complex delivery, broader leadership, and stronger evidence." />
        <div className="timeline">
          {experience.map((job) => (
            <article className="timeline-item" key={`${job.company}-${job.period}`}>
              <div className="timeline-meta"><span>{job.period}</span><span>{job.location}</span></div>
              <div>
                <h3>{job.role}</h3>
                <p className="company">{job.company}</p>
                <p>{job.summary}</p>
                {job.outcomes.length ? <ul>{job.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities-section section-shell" id="skills">
        <SectionHeading eyebrow="03 — Capabilities" title="What I bring to the table" intro="A practical mix of quality engineering depth, program leadership, AI fluency, and inclusive design." />
        <div className="capability-grid">
          {capabilityGroups.map((group, index) => (
            <article key={group.title}>
              <span className="group-number">0{index + 1}</span>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="impact-section section-shell" id="impact">
        <SectionHeading eyebrow="04 — Evidence" title="Impact, measured" intro="Selected outcomes that show how strategy becomes better delivery performance." />
        <div className="impact-list">
          {impactStories.map((story, index) => (
            <article key={story.title}>
              <span className="impact-index">0{index + 1}</span>
              <div><p className="impact-metric">{story.metric}</p><h3>{story.title}</h3><p>{story.copy}</p></div>
              <div className="tag-row">{story.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="recognition-section section-shell" id="recognition">
        <SectionHeading eyebrow="05 — Recognition" title="Credentials &amp; honors" intro="Continuous learning, professional community, and recognition across quality, accessibility, innovation, and leadership." />
        <div className="recognition-grid">
          <article><h3>Licenses &amp; certifications</h3><ul>{credentials.map((item) => <li key={item}><CheckCircle size={18} weight="fill" /><span>{item}</span></li>)}</ul></article>
          <article><h3>Honors &amp; awards</h3><ul>{honors.map((item) => <li key={item}><CheckCircle size={18} weight="fill" /><span>{item}</span></li>)}</ul></article>
          <article className="education-card"><h3>Education &amp; memberships</h3><p><strong>New Era University</strong><br />B.S. Business Administration, Major in Marketing<br /><span>2007 — 2011</span></p><p><strong>Member</strong><br />Project Management Institute<br />Philippine Society for Quality</p></article>
        </div>
      </section>

      <ContactSection navigate={navigate} />
    </>
  );
}

function ContactSection() {
  return (
    <section className="contact-section section-shell" id="contact">
      <p className="eyebrow">06 — Contact</p>
      <div className="contact-grid">
        <div><h2>Let’s build something that works—and keeps working.</h2><p>Open to product, program, quality-engineering, AI, and digital-transformation opportunities.</p></div>
        <div className="contact-actions">
          <a href="mailto:pjomill@gmail.com"><EnvelopeSimple size={21} />pjomill@gmail.com<ArrowUpRight size={17} /></a>
          <a href="https://www.linkedin.com/in/millertperez/" target="_blank" rel="noreferrer"><LinkedinLogo size={21} />LinkedIn<ArrowUpRight size={17} /></a>
          <a href="tel:+639688515632"><Phone size={21} />+63 968 851 5632<ArrowUpRight size={17} /></a>
        </div>
      </div>
    </section>
  );
}

function PageIntro({ eyebrow, title, description, action }) {
  return (
    <section className="page-intro section-shell">
      <p className="eyebrow">{eyebrow}</p>
      <div><h1>{title}</h1><p>{description}</p>{action}</div>
    </section>
  );
}

function ApplicationsPage() {
  const categories = ["All", ...new Set(applications.map((app) => app.category))];
  const [category, setCategory] = useState("All");
  const visibleApps = category === "All" ? applications : applications.filter((app) => app.category === category);

  return (
    <>
      <PageIntro eyebrow="Applications" title="Useful products, shipped" description="A collection of focused tools spanning wealth, energy, careers, learning, media, and everyday productivity." />
      <section className="catalog-section section-shell">
        <div className="filter-row" aria-label="Filter applications">
          {categories.map((item) => <button key={item} className={category === item ? "active" : ""} type="button" onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <div className="app-grid">
          {visibleApps.map((app, index) => (
            <article className="app-card" key={app.name}>
              <div className="app-card-top"><span className="app-number">{String(index + 1).padStart(2, "0")}</span><span className={`status ${app.status === "Live" ? "live" : "dev"}`}>{app.status}</span></div>
              <div><p className="card-kicker">{app.category}</p><h2>{app.name}</h2><p>{app.description}</p></div>
              <a href={app.href} target="_blank" rel="noreferrer">Open application <ArrowUpRight size={17} /></a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function BotIcon({ type }) {
  const props = { size: 25, weight: "regular" };
  if (type === "weather") return <CloudSun {...props} />;
  if (type === "translate") return <Translate {...props} />;
  if (type === "alert") return <Warning {...props} />;
  if (type === "currency") return <CurrencyDollar {...props} />;
  return <FilmSlate {...props} />;
}

function TelegramPage() {
  return (
    <>
      <PageIntro eyebrow="Telegram bots" title="Small bots, practical value" description="Weather, translation, disaster alerts, currency rates, and cinema discovery—delivered where people already communicate." />
      <section className="bot-list section-shell">
        {telegramBots.map((bot, index) => (
          <article key={bot.handle}>
            <span className="bot-icon"><BotIcon type={bot.icon} /></span>
            <div className="bot-title"><span>0{index + 1}</span><h2>{bot.name}</h2><p>{bot.handle}</p></div>
            <p className="bot-copy">{bot.description}</p>
            <div className="bot-action"><span className={`status ${bot.status === "Live" ? "live" : "dev"}`}>{bot.status}</span><a href={bot.href} target="_blank" rel="noreferrer">Open in Telegram <ArrowUpRight size={17} /></a></div>
          </article>
        ))}
      </section>
    </>
  );
}

function MusicCard({ item, favorite, toggleFavorite, playing, playerIsPlaying, togglePlayback, loadingItemId }) {
  const isPlaying = playing === item.id && playerIsPlaying;
  const isLoading = loadingItemId === item.id;
  return (
    <article className="music-card">
      <div className="cover-wrap">
        <img src={item.cover} alt={`${item.title} cover artwork`} />
        <button className="play-button" type="button" disabled={isLoading} aria-label={isLoading ? `Loading ${item.title}` : isPlaying ? `Pause ${item.title}` : `Play ${item.title}`} onClick={() => togglePlayback(item)}>
          {isLoading ? <CircleNotch className="spin" size={23} weight="bold" /> : isPlaying ? <Pause size={22} weight="fill" /> : <Play size={22} weight="fill" />}
        </button>
        <button className="favorite-button" type="button" aria-label={favorite ? `Remove ${item.title} from favorites` : `Add ${item.title} to favorites`} onClick={() => toggleFavorite(item.id)}>
          <HeartStraight size={20} weight={favorite ? "fill" : "regular"} />
        </button>
      </div>
      <div className="music-card-copy"><p className="card-kicker">{item.type}</p><h3>{item.title}</h3><p>{item.type === "playlist" ? `${item.tracks} tracks` : `${item.plays} plays`}</p><a href={item.href} target="_blank" rel="noreferrer">Suno <ArrowUpRight size={14} /></a></div>
    </article>
  );
}

function MusicPage({ favorites, toggleFavorite, playing, playerIsPlaying, togglePlayback, loadingItemId, musicCatalog, catalogState, refreshMusic }) {
  const [query, setQuery] = useState("");
  const matches = (item) => item.title.toLowerCase().includes(query.trim().toLowerCase());
  const allSongs = musicCatalog.filter((item) => item.type === "song");
  const allPlaylists = musicCatalog.filter((item) => item.type === "playlist");
  const recommended = [...allSongs].sort((a, b) => b.plays - a.plays).slice(0, 3).filter(matches);
  const playlists = allPlaylists.filter(matches);
  const songs = allSongs.filter(matches);
  const updatedTime = formatCatalogTime(catalogState.updatedAt);
  const statusTitle = catalogState.status === "live" ? "Live catalog" : catalogState.status === "loading" ? "Syncing with Suno" : "Showing saved highlights";

  return (
    <>
      <PageIntro eyebrow="Original music" title="Song &amp; playlists" description="AI-assisted original songs across acoustic pop, ballads, Filipino reggae, and feel-good anthems—written and produced on Suno." action={<a className="button primary intro-action" href="https://suno.com/@millertperez" target="_blank" rel="noreferrer">View on Suno <ArrowUpRight size={17} /></a>} />
      <section className="music-shell section-shell">
        <div className={`catalog-sync ${catalogState.status}`} role="status" aria-live="polite">
          <span className="catalog-sync-dot" aria-hidden="true" />
          <div><strong>{statusTitle}</strong><p>{allSongs.length} songs · {allPlaylists.length} playlists{updatedTime ? ` · Updated ${updatedTime}` : ""}</p></div>
          <button type="button" onClick={() => refreshMusic({ force: true })} disabled={catalogState.status === "loading"}>
            {catalogState.status === "loading" ? <CircleNotch className="spin" size={18} /> : <ArrowsClockwise size={18} />}
            Refresh
          </button>
        </div>
        <label className="search-field"><MagnifyingGlass size={20} /><span className="sr-only">Search songs and playlists</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search songs and playlists" /></label>
        <MusicSection title="Recommended" subtitle="Most-played songs" items={recommended} {...{ favorites, toggleFavorite, playing, playerIsPlaying, togglePlayback, loadingItemId }} />
        <MusicSection title="Playlists" subtitle={`${playlists.length} curated playlists`} items={playlists} {...{ favorites, toggleFavorite, playing, playerIsPlaying, togglePlayback, loadingItemId }} />
        <MusicSection title="Songs" subtitle={`${songs.length} original releases`} items={songs} {...{ favorites, toggleFavorite, playing, playerIsPlaying, togglePlayback, loadingItemId }} />
        {!recommended.length && !playlists.length && !songs.length ? <p className="empty-search">No music matches “{query}”. Try another title.</p> : null}
      </section>
    </>
  );
}

function MusicSection({ title, subtitle, items, favorites, toggleFavorite, playing, playerIsPlaying, togglePlayback, loadingItemId }) {
  if (!items.length) return null;
  return (
    <section className="music-section" id={title.toLowerCase()}>
      <div className="music-section-heading"><div><p className="eyebrow">{subtitle}</p><h2>{title}</h2></div><span>{String(items.length).padStart(2, "0")}</span></div>
      <div className="music-grid">{items.map((item) => <MusicCard key={`${title}-${item.id}`} item={item} favorite={favorites.includes(item.id)} toggleFavorite={toggleFavorite} playing={playing} playerIsPlaying={playerIsPlaying} togglePlayback={togglePlayback} loadingItemId={loadingItemId} />)}</div>
    </section>
  );
}

function FavoritesPage({ favorites, toggleFavorite, playing, playerIsPlaying, togglePlayback, loadingItemId, musicCatalog, navigate }) {
  const items = musicCatalog.filter((item) => favorites.includes(item.id));
  return (
    <>
      <PageIntro eyebrow="Favorites" title="Your saved collection" description="Songs and playlists you want to find again quickly." />
      <section className="favorites-section section-shell">
        {items.length ? <div className="music-grid">{items.map((item) => <MusicCard key={item.id} item={item} favorite toggleFavorite={toggleFavorite} playing={playing} playerIsPlaying={playerIsPlaying} togglePlayback={togglePlayback} loadingItemId={loadingItemId} />)}</div> : (
          <div className="empty-state"><HeartStraight size={42} weight="regular" /><h2>Nothing saved yet</h2><p>Explore the music catalog and select the heart on any song or playlist.</p><button className="button primary" type="button" onClick={() => navigate("music")}>Browse music <ArrowRight size={18} /></button></div>
        )}
      </section>
    </>
  );
}

function Footer({ navigate }) {
  return (
    <footer>
      <div><span>© 2026 AJ Miller T. Perez</span><nav aria-label="Footer navigation">{navItems.map((item) => <button key={item.id} type="button" onClick={() => navigate(item.id)}>{item.label}</button>)}</nav><span>Built with React + Vite</span></div>
    </footer>
  );
}

function formatTime(value) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function MiniPlayer({ item, playerIsPlaying, togglePlayback, favorite, toggleFavorite, currentTime, duration, seekTo, audioError, closePlayer }) {
  if (!item) return null;
  return (
    <div className="mini-player" aria-live="polite">
      <img src={item.cover} alt="" />
      <div className="player-copy">
        <span className={audioError ? "player-status error" : "player-status"}>{audioError || (playerIsPlaying ? "Now playing" : "Paused")}</span>
        <strong>{item.title}</strong>
        <div className="player-progress">
          <input
            type="range"
            aria-label={`Seek ${item.title}`}
            min="0"
            max={Math.max(duration || 0, 1)}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => seekTo(Number(event.target.value))}
          />
          <time>{formatTime(currentTime)} / {formatTime(duration)}</time>
        </div>
      </div>
      <button type="button" aria-label={playerIsPlaying ? `Pause ${item.title}` : `Play ${item.title}`} onClick={() => togglePlayback(item)}>
        {playerIsPlaying ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" />}
      </button>
      <button type="button" aria-label={favorite ? "Remove from favorites" : "Add to favorites"} onClick={() => toggleFavorite(item.id)}><HeartStraight size={20} weight={favorite ? "fill" : "regular"} /></button>
      <button className="player-close" type="button" aria-label="Close music player" onClick={closePlayer}><X size={19} weight="bold" /></button>
    </div>
  );
}

export function App() {
  const [page, setPage] = useState(getRoute);
  const [theme, setTheme] = useStoredState("aj-theme", "default");
  const [dark, setDark] = useStoredState("aj-dark-mode", false);
  const [favorites, setFavorites] = useStoredState("aj-favorites", []);
  const [playing, setPlaying] = useState(null);
  const [playerIsPlaying, setPlayerIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState("");
  const [musicCatalog, setMusicCatalog] = useState(musicItems);
  const [catalogState, setCatalogState] = useState({ status: "loading", updatedAt: null });
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [playbackItem, setPlaybackItem] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const playlistPreviewCache = useRef(new Map());

  useEffect(() => {
    const onPopState = () => {
      setPage(getRoute());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.mode = dark ? "dark" : "light";
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [theme, dark]);

  useEffect(() => {
    const label = navItems.find((item) => item.id === page)?.label || "Career";
    document.title = `${label} — AJ Miller T. Perez`;
  }, [page]);

  useEffect(() => {
    refreshMusic();
    const interval = window.setInterval(() => refreshMusic({ silent: true }), 5 * 60 * 1000);
    const handleVisibility = () => {
      if (document.visibilityState === "visible") refreshMusic({ silent: true });
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  function navigate(id) {
    const item = navItems.find((nav) => nav.id === id) || navItems[0];
    if (window.location.pathname !== item.path) window.history.pushState({}, "", item.path);
    setPage(item.id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleFavorite(id) {
    setFavorites((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }

  async function refreshMusic({ force = false, silent = false } = {}) {
    if (!silent) setCatalogState((state) => ({ ...state, status: "loading" }));

    try {
      const query = force ? `?refresh=${Date.now()}` : "";
      const response = await fetch(`/api/suno${query}`, { headers: { Accept: "application/json" }, cache: "no-store" });
      if (!response.ok) throw new Error("Music sync failed");
      const payload = await response.json();
      const nextCatalog = normalizeMusicCatalog(payload);
      if (!nextCatalog.some((item) => item.type === "song")) throw new Error("Music catalog was empty");

      setMusicCatalog(nextCatalog);
      setCatalogState({ status: "live", updatedAt: payload.fetched_at || new Date().toISOString() });
    } catch {
      setCatalogState((state) => ({ ...state, status: "fallback" }));
    }
  }

  async function togglePlayback(item) {
    const audio = audioRef.current;
    if (!audio) return;

    setAudioError("");

    if (playing === item.id) {
      if (audio.paused) {
        audio.play().catch(() => {
          setPlayerIsPlaying(false);
          setAudioError("Playback unavailable — open this track on Suno.");
        });
      } else {
        audio.pause();
      }
      return;
    }

    let playableItem = item;

    try {
      if (item.type === "playlist" && !item.audio) {
        setLoadingItemId(item.id);
        let preview = playlistPreviewCache.current.get(item.sourceId);

        if (!preview) {
          const response = await fetch(`/api/playlist?id=${encodeURIComponent(item.sourceId)}`, { headers: { Accept: "application/json" }, cache: "no-store" });
          if (!response.ok) throw new Error("Playlist unavailable");
          const payload = await response.json();
          preview = Array.isArray(payload.tracks) ? payload.tracks.find((track) => track?.audio) : null;
          if (!preview) throw new Error("Playlist is empty");
          playlistPreviewCache.current.set(item.sourceId, preview);
        }

        playableItem = {
          ...item,
          title: preview.title || item.title,
          playlistTitle: item.title,
          cover: preview.image || item.cover,
          audio: preview.audio,
        };
      }

      if (!playableItem.audio) throw new Error("Track unavailable");

      audio.src = playableItem.audio;
      audio.currentTime = 0;
      setPlaying(item.id);
      setPlaybackItem(playableItem);
      setCurrentTime(0);
      setDuration(0);
      await audio.play();
    } catch {
      setPlaying(item.id);
      setPlaybackItem(playableItem);
      setPlayerIsPlaying(false);
      setAudioError("Playback unavailable — open this track on Suno.");
    } finally {
      setLoadingItemId(null);
    }
  }

  function seekTo(time) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  function closePlayer() {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    setPlaying(null);
    setPlaybackItem(null);
    setPlayerIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setAudioError("");
  }

  const currentTrack = useMemo(
    () => playbackItem || musicCatalog.find((item) => item.id === playing) || null,
    [musicCatalog, playbackItem, playing],
  );

  return (
    <div className="app-shell">
      <Header {...{ page, theme, setTheme, dark, setDark, navigate, menuOpen, setMenuOpen }} />
      <main>
        {page === "career" ? <CareerPage navigate={navigate} /> : null}
        {page === "applications" ? <ApplicationsPage /> : null}
        {page === "telegram" ? <TelegramPage /> : null}
        {page === "music" ? <MusicPage {...{ favorites, toggleFavorite, playing, playerIsPlaying, togglePlayback, loadingItemId, musicCatalog, catalogState, refreshMusic }} /> : null}
        {page === "favorites" ? <FavoritesPage {...{ favorites, toggleFavorite, playing, playerIsPlaying, togglePlayback, loadingItemId, musicCatalog, navigate }} /> : null}
      </main>
      <Footer navigate={navigate} />
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setPlayerIsPlaying(true)}
        onPause={() => setPlayerIsPlaying(false)}
        onEnded={(event) => {
          setPlayerIsPlaying(false);
          setCurrentTime(event.currentTarget.duration || 0);
        }}
        onError={() => {
          setPlayerIsPlaying(false);
          setAudioError("Playback unavailable — open this track on Suno.");
        }}
      />
      <MiniPlayer item={currentTrack} {...{ playerIsPlaying, togglePlayback, currentTime, duration, seekTo, audioError, closePlayer }} favorite={currentTrack ? favorites.includes(currentTrack.id) : false} toggleFavorite={toggleFavorite} />
    </div>
  );
}
