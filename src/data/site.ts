// All visible content for lemondrop.studio lives here.
//
// Assumptions (mirrored in DESIGN.md and the hand-off; replace before launch):
// - Production URL `https://lemondrop.studio` and email `hello@lemondrop.studio` are placeholders.
// - Founder bio is drafted from what we know (Kareem Fahmy, computer science, technical support
//   for production software, Cairo). Review the wording.
// - Every project below is a FICTIONAL placeholder (`placeholder: true`): invented names, briefs and
//   outcomes that show the format. Replace them with real work, real imagery and real results.
// - The engagement steps on /studio describe a sensible default process, not a published policy.
// - Social links are empty until real profiles are added.

export type Part = 'block' | 'step' | 'drop';

export type Project = {
  slug: string;
  title: string;
  client: string;
  sector: string;
  year: number;
  services: string[];
  summary: string;
  palette: [string, string, string]; // ground, drop, parts
  layout: 'tilt' | 'tower' | 'row' | 'sunrise';
  context: string;
  idea: string;
  craft: { kind: 'palette' | 'flow' | 'layout'; caption: string; steps?: string[]; labels?: string[] }[];
  outcome: string;
  placeholder?: boolean;
};

export const site = {
  name: 'LemonDrop',
  role: 'Digital solutions studio',
  url: 'https://lemondrop.studio',
  description:
    'LemonDrop is a digital studio in Cairo. We plan, design and engineer websites, online stores, apps and the systems behind them, for clients anywhere.',
  email: 'hello@lemondrop.studio',
  city: 'Cairo',
  timeZone: 'Africa/Cairo',
  founder: 'Kareem Fahmy',
  socials: [] as { label: string; href: string }[],
};

export const nav = [
  { href: '/work/', label: 'Work' },
  { href: '/studio/', label: 'Studio' },
  { href: '/contact/', label: 'Contact' },
];

export const hero = {
  title: 'Complex ideas, broken into parts and built properly.',
  intro:
    'LemonDrop is a digital studio. We plan, design and engineer websites, stores, apps and the systems behind them.',
  meta: ['Digital solutions studio', 'Cairo, working worldwide'],
  cue: 'Scroll to take it apart',
};

// The three parts of the mark, and what each one stands for in the work.
export const chapters: {
  part: Part | 'all';
  label: string;
  title: string;
  text: string;
  list: string[];
  dims: string;
}[] = [
  {
    part: 'block',
    label: 'The block',
    title: 'Strategy',
    text:
      'Every project starts as a pile of wants. We sort them into the few that matter: who it is for, what it must do on day one, and what can wait. You get a plan you can hold us to.',
    list: ['Research and audits', 'Product definition', 'Content and structure', 'Roadmaps'],
    dims: '148 × 377',
  },
  {
    part: 'drop',
    label: 'The drop',
    title: 'Design',
    text:
      'The part people actually feel. Interface, identity on screen, motion and words, designed together so the product looks like one thing and makes sense on the first try.',
    list: ['Interface and experience', 'Brand systems for screens', 'Prototypes', 'Design systems'],
    dims: 'r 188.5',
  },
  {
    part: 'step',
    label: 'The step',
    title: 'Engineering',
    text:
      'The joint that makes the other two hold. Fast, accessible front ends, connected to the platforms, data and tools your business already runs on. We pick technology for the job, not for the trend.',
    list: ['Websites and web apps', 'Online stores', 'Integrations and content tools', 'Performance and accessibility'],
    dims: '81 × 127',
  },
  {
    part: 'all',
    label: 'Assembled',
    title: 'Shipped, then looked after.',
    text:
      'The parts lock together, go live and get measured. We stay on after launch to fix, tune and add what the next stage needs.',
    list: ['Launch', 'Analytics', 'Care plans', 'Iteration'],
    dims: '522 × 377',
  },
];

export const statement =
  'Most digital projects break in the gaps: strategy that never reaches the designer, designs nobody can build, code nobody can update. We do all three in one studio, so the idea you approved is the idea that ships.';

export const capabilities = [
  { title: 'Websites and platforms', line: 'Marketing sites, editorial sites, member areas.' },
  { title: 'Online stores', line: 'Catalogue, checkout and the operations behind them.' },
  { title: 'Product and app interfaces', line: 'Dashboards, tools and flows people use daily.' },
  { title: 'Brand systems for screens', line: 'Identity that survives contact with a real interface.' },
  { title: 'Design systems', line: 'Components and rules your team can keep extending.' },
  { title: 'Care and growth', line: 'Updates, testing and new features after launch.' },
];

export const projects: Project[] = [
  {
    slug: 'second-hand',
    title: 'Second Hand',
    client: 'Pre-owned luxury watch dealer',
    sector: 'Commerce',
    year: 2026,
    services: ['Strategy', 'Design', 'Engineering'],
    summary:
      'An online boutique that sells watches the way the shop does: one piece at a time, with the full story of each.',
    palette: ['#14231D', '#C9A86A', '#E9E5DA'],
    layout: 'tilt',
    context:
      'The dealer sold through a counter and a phone. Their old site listed watches like spare parts, so buyers called to ask what the photos could not show, and the team spent its day answering the same questions.',
    idea:
      'Treat every watch as a single-item shop. Each listing carries provenance, condition notes and service history up front, with one clear way to reserve it.',
    craft: [
      { kind: 'palette', caption: 'A dial-green ground and a brass accent taken from the shop itself.' },
      { kind: 'flow', caption: 'Reserving a piece in three steps, without an account.', steps: ['Browse', 'Read the story', 'Reserve', 'Collect or ship'] },
      { kind: 'layout', caption: 'Listing schematic: the story sits beside the photos, not under them.', labels: ['Photos', 'Story', 'Reserve'] },
    ],
    outcome:
      'Shipped as a custom storefront with a reservation flow and a stock tool the staff update from their phones.',
    placeholder: true,
  },
  {
    slug: 'baseload',
    title: 'Baseload',
    client: 'Energy monitoring start-up',
    sector: 'Product',
    year: 2025,
    services: ['Strategy', 'Design', 'Engineering'],
    summary:
      'A dashboard that tells small business owners which machine is wasting money, in plain words, before the bill arrives.',
    palette: ['#0C2B30', '#7FD3C6', '#EEF3F1'],
    layout: 'sunrise',
    context:
      'The sensors already collected good data. The product showed it as charts only an engineer could read, so the owners paying for it rarely opened it.',
    idea:
      'Lead with sentences, not charts. Each morning the app says what changed and what to do about it, and the chart is one tap away for anyone who wants it.',
    craft: [
      { kind: 'palette', caption: 'Calm teal for normal, the drop colour only when something needs attention.' },
      { kind: 'flow', caption: 'From alert to action in one screen.', steps: ['Morning note', 'Open the machine', 'See the cause', 'Book a fix'] },
      { kind: 'layout', caption: 'Dashboard schematic: the sentence first, the chart second.', labels: ['Chart', 'Morning note', 'Act'] },
    ],
    outcome:
      'Shipped as a responsive web app with a design system the in-house team now extends.',
    placeholder: true,
  },
  {
    slug: 'common-room',
    title: 'Common Room',
    client: 'Coworking network',
    sector: 'Brand and web',
    year: 2025,
    services: ['Strategy', 'Design', 'Engineering'],
    summary:
      'A brand system and booking site for a group of shared workspaces, so each location can look like itself and still book like the rest.',
    palette: ['#2A2C3F', '#EF8A5A', '#E8E8EC'],
    layout: 'row',
    context:
      'Each space had grown its own logo, website and booking form. Members who moved between locations had to sign up again, and the group had no single place to sell from.',
    idea:
      'One frame, many rooms. A shared structure and booking engine, with a small set of slots where each location brings its own colour, photography and voice.',
    craft: [
      { kind: 'palette', caption: 'A shared ink and ground; each location chooses its own accent.' },
      { kind: 'flow', caption: 'One account across every location.', steps: ['Pick a space', 'Pick a day', 'Book', 'Walk in'] },
      { kind: 'layout', caption: 'Location page schematic: shared frame, local slots.', labels: ['Local photos', 'Shared frame', 'Book'] },
    ],
    outcome:
      'Shipped as one site with a location template and a booking flow shared across spaces.',
    placeholder: true,
  },
  {
    slug: 'night-shift',
    title: 'Night Shift',
    client: 'Clinic network',
    sector: 'Internal tool',
    year: 2024,
    services: ['Strategy', 'Design', 'Engineering'],
    summary:
      'A scheduling tool that lets clinic staff swap shifts from their phones, so a manager no longer rebuilds the rota by hand.',
    palette: ['#111A22', '#F2AE4E', '#E7E5E0'],
    layout: 'tower',
    context:
      'Shifts lived in a shared spreadsheet. Every swap meant a chain of messages, and the manager spent evenings checking that every room still had cover.',
    idea:
      'Make the rules do the checking. Staff offer and accept swaps themselves; the tool only allows swaps that keep every room covered and every person within their hours.',
    craft: [
      { kind: 'palette', caption: 'High contrast for night use, the drop colour for open shifts.' },
      { kind: 'flow', caption: 'A swap, start to finish, on a phone.', steps: ['Offer a shift', 'A colleague accepts', 'Rules check', 'Rota updates'] },
      { kind: 'layout', caption: 'Rota schematic: rooms as rows, people as blocks.', labels: ['Rooms', 'Shifts', 'Swap'] },
    ],
    outcome:
      'Shipped as an installable web app used on the ward floor.',
    placeholder: true,
  },
];

export const studio = {
  title: 'A small studio that builds whole things.',
  lead:
    'LemonDrop exists because most good ideas die in handovers. Strategy goes to one team, design to another, code to a third, and each one loses a little of what was meant. We keep all three in the same room.',
  method: [
    {
      part: 'block' as Part,
      title: 'The block is the plan',
      text: 'Before anything is drawn we agree what the product is for, who uses it and what success looks like. Short, written down, signed off.',
    },
    {
      part: 'drop' as Part,
      title: 'The drop is the experience',
      text: 'Design is where the plan becomes something people can see and use. We test it with real content and real devices before it is final.',
    },
    {
      part: 'step' as Part,
      title: 'The step is the build',
      text: 'Engineering joins the parts. We write code that loads fast, works with a keyboard and a screen reader, and stays easy to change.',
    },
  ],
  services: [
    { title: 'Strategy', items: ['Discovery workshops', 'Audits of what you have now', 'Product and content definition', 'Technical planning'] },
    { title: 'Design', items: ['Interface and experience design', 'Visual identity for digital', 'Interactive prototypes', 'Design systems and documentation'] },
    { title: 'Engineering', items: ['Websites and web applications', 'Commerce builds and migrations', 'CMS and third-party integrations', 'Accessibility and performance work'] },
    { title: 'After launch', items: ['Care plans', 'Analytics and reporting', 'Experiments and iteration', 'Team training'] },
  ],
  founder: {
    name: 'Kareem Fahmy',
    role: 'Founder, design and engineering',
    bio:
      'Kareem studied computer science and spent years in technical support for production software, which is where he learned exactly what breaks after launch. He started LemonDrop to design and build things that hold up once real people use them.',
  },
  steps: [
    { title: 'Intro call', text: 'We hear the idea and ask the awkward questions early.' },
    { title: 'Proposal', text: 'Scope, timeline and price in writing, with what is not included.' },
    { title: 'Strategy', text: 'A short sprint that ends in a plan you approve.' },
    { title: 'Design', text: 'Real screens, tested on real devices, revised with you.' },
    { title: 'Build', text: 'Weekly releases you can click through, not a reveal at the end.' },
    { title: 'Launch and care', text: 'We go live together and stay on for what comes next.' },
  ],
};

export const contact = {
  title: 'Tell us what you want to build.',
  lead: 'Pick what applies, add a sentence, and we will write the email for you. We reply within one working day, Cairo time.',
  needs: ['A website', 'An online store', 'An app or product interface', 'A brand for screens', 'Help with something live', 'Not sure yet'],
  timelines: ['As soon as possible', 'In the next three months', 'Later this year', 'Just exploring'],
};
