import meowCover from "./assets/meow-meow-twirl.png";
import vietnamyCover from "./assets/vietnamy-smiley.png";
import breatheCover from "./assets/breathe-with-the-light.png";

export { applications, telegramBots } from "./catalog-data.js";

export const navItems = [
  { id: "career", label: "Career", path: "/career" },
  { id: "applications", label: "Applications", path: "/applications" },
  { id: "telegram", label: "Telegram Bots", path: "/telegram" },
  { id: "music", label: "Music", path: "/music" },
  { id: "favorites", label: "Favorites", path: "/favorites" },
];

export const experience = [
  {
    period: "Oct 2021 — Present",
    role: "Software Quality Engineering Associate Manager",
    company: "Accenture",
    location: "Metro Manila, Philippines",
    summary:
      "Lead engineering-quality strategy, AI-enabled test planning, accessibility, automation, and team development for global digital products.",
    outcomes: [
      "Reduced release cycle time by two weeks and removed 120 manual testing hours monthly through a Selenium rollout for a 20-person QA team.",
      "Raised accessibility compliance from 72% to 95% within six months.",
      "Increased certification completion from 40% to 85% through targeted enablement.",
    ],
  },
  {
    period: "Jul 2016 — Oct 2021",
    role: "Senior Software Quality Assurance Engineer",
    company: "RCG Global Services",
    location: "Makati City, Philippines",
    summary:
      "Led functional, regression, data, performance, and accessibility testing for major US clients across retail, healthcare, and media.",
    outcomes: [
      "Used analytics to target regression at user drop-off points, reducing critical defects by 25%.",
      "Ran A/B testing that contributed to a 15% increase in user engagement.",
    ],
  },
  {
    period: "Apr 2015 — Jul 2016",
    role: "Software Quality Assurance Analyst",
    company: "Kforce Global Solutions",
    location: "Ayala, Makati City, Philippines",
    summary:
      "Pioneered visual management for infrastructure automation projects and strengthened end-to-end test design.",
    outcomes: ["Improved testing efficiency for virtual-server and database deployment workflows."],
  },
  {
    period: "Oct 2014 — Apr 2015",
    role: "Richmedia Quality Assurance Analyst",
    company: "Cognizant Technology Solutions",
    location: "Bonifacio Global City, Taguig",
    summary:
      "Selected for the HTML5 multi-platform ads team and validated rich media across desktop, mobile, and tablet experiences.",
    outcomes: [],
  },
  {
    period: "Sep 2011 — Aug 2014",
    role: "Software Quality Assurance Analyst",
    company: "Icomteq Solutions",
    location: "Quezon City, Philippines",
    summary:
      "Led test execution, process improvement, knowledge management, and stakeholder communication.",
    outcomes: ["Named Most Outstanding Employee of the Year in 2013."],
  },
];

export const capabilityGroups = [
  {
    title: "Quality Engineering",
    items: ["Test Strategy", "API Testing", "Selenium Automation", "Regression & Functional", "Defect Management", "Performance Testing"],
  },
  {
    title: "Leadership & Delivery",
    items: ["Program Leadership", "Product Thinking", "Agile & DevOps", "Risk Management", "Stakeholder Alignment", "Team Scaling"],
  },
  {
    title: "AI & Data",
    items: ["GitHub Copilot", "Gemini", "AI Quality", "Prompt Engineering", "SQL / Data Management", "Google Analytics"],
  },
  {
    title: "Accessibility & Process",
    items: ["CPACC", "Web Accessibility (WCAG)", "Lean Six Sigma", "Systems Design", "Process Optimization"],
  },
];

export const impactStories = [
  { title: "Accessibility at 95%", metric: "72% → 95%", copy: "Built and executed an accessibility strategy in six months while leading a team inclusive of PWDs.", tags: ["CPACC", "WCAG", "Strategy"] },
  { title: "Automation at scale", metric: "120 hrs", copy: "Led a Selenium rollout for a 20-person QA team, cutting release cycle time by two weeks.", tags: ["Automation", "DevOps", "Leadership"] },
  { title: "AI-enabled quality", metric: "GenAI", copy: "Drove practical use of Copilot and Gemini to improve test-planning efficiency across teams.", tags: ["Copilot", "Gemini", "AI Quality"] },
  { title: "Team growth & enablement", metric: "+25%", copy: "Grew the QA team and raised certification completion from 40% to 85%.", tags: ["Leadership", "Coaching"] },
  { title: "Analytics-driven testing", metric: "−25%", copy: "Targeted regression at user drop-off points to reduce critical defects for major US clients.", tags: ["Analytics", "Regression"] },
  { title: "Process optimization", metric: "−20%", copy: "Authored runbooks that improved cross-team consistency and reduced test-execution errors.", tags: ["Lean Six Sigma", "Runbooks"] },
];

export const credentials = [
  "Lean Six Sigma White Belt Certification",
  "Lean Six Sigma Yellow Belt",
  "Salesforce Certified Associate",
  "CPACC — Certified Professional in Accessibility Core Competencies",
  "WAI0.1x: Introduction to Web Accessibility",
  "Discover the Art of Prompting",
  "Maximize Productivity With AI Tools",
];

export const honors = [
  "Champion, IoT in Action: From Concept to Connection — 2026",
  "TechStar 2025",
  "3rd Place, Accessibility Internet Rally Award 2023",
  "ATCP Gantimpala Awards 2022",
  "3rd Place, Startup Weekend Manila 2019",
  "Participant, Testing Cup Poland 2018",
  "Most Outstanding Employee of the Year 2013",
];

export const musicItems = [
  { id: "meow", title: "Meow-Meow Twirl", type: "song", plays: 21, cover: meowCover, href: "https://suno.com/song/ceef3040-ea4d-413f-92a7-8862254c8d11", audio: "https://cdn1.suno.ai/ceef3040-ea4d-413f-92a7-8862254c8d11.mp3" },
  { id: "vietnamy", title: "Vietnamy Smiley", type: "song", plays: 18, cover: vietnamyCover, href: "https://suno.com/song/dc901bcc-2f73-4da2-a554-0f555372ebdb", audio: "https://cdn1.suno.ai/dc901bcc-2f73-4da2-a554-0f555372ebdb.mp3" },
  { id: "breathe", title: "Breathe With the Light", type: "song", plays: 18, cover: breatheCover, href: "https://suno.com/song/8aff1600-9cd4-4b16-b874-b5b0b0a265b1", audio: "https://cdn1.suno.ai/8aff1600-9cd4-4b16-b874-b5b0b0a265b1.mp3" },
  { id: "meow-playlist", title: "Meow Meow Twirl", type: "playlist", tracks: 2, cover: meowCover, href: "https://suno.com/playlist/1eba0100-ba49-4392-8869-91d965faf125", audio: "https://cdn1.suno.ai/ceef3040-ea4d-413f-92a7-8862254c8d11.mp3" },
  { id: "vietnamy-playlist", title: "Vietnamy Smiley", type: "playlist", tracks: 2, cover: vietnamyCover, href: "https://suno.com/playlist/c833c406-3b5c-4aaa-ba50-a442baad2ec5", audio: "https://cdn1.suno.ai/dc901bcc-2f73-4da2-a554-0f555372ebdb.mp3" },
  { id: "breathe-playlist", title: "Breathe With the Light", type: "playlist", tracks: 2, cover: breatheCover, href: "https://suno.com/playlist/12c71505-a830-4a3c-beaf-75b90d973d8e", audio: "https://cdn1.suno.ai/8aff1600-9cd4-4b16-b874-b5b0b0a265b1.mp3" },
  { id: "meow-alt", title: "Meow-Meow Twirl — Acoustic", type: "song", plays: 12, cover: meowCover, href: "https://suno.com/song/ceef3040-ea4d-413f-92a7-8862254c8d11", audio: "https://cdn1.suno.ai/ceef3040-ea4d-413f-92a7-8862254c8d11.mp3" },
  { id: "vietnamy-alt", title: "Vietnamy Smiley — Bright Mix", type: "song", plays: 14, cover: vietnamyCover, href: "https://suno.com/song/061fc9bb-f42a-4853-95e6-7be3fe4a1b3a", audio: "https://cdn1.suno.ai/061fc9bb-f42a-4853-95e6-7be3fe4a1b3a.mp3" },
  { id: "breathe-alt", title: "Breathe With the Light — Horizon Mix", type: "song", plays: 14, cover: breatheCover, href: "https://suno.com/song/26ed1acb-d419-49f7-b16d-f98ab678e6f1", audio: "https://cdn1.suno.ai/26ed1acb-d419-49f7-b16d-f98ab678e6f1.mp3" },
];
