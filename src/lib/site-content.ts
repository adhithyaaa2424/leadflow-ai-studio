import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Workflow,
  Users,
  Plug,
  Code2,
  Sparkles,
  Clock,
  Search,
  PenTool,
  Wrench,
  Rocket,
} from "lucide-react";

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "how-it-works", label: "How It Works" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const VALUE_PROPS: Feature[] = [
  {
    icon: Workflow,
    title: "Smarter Workflows",
    description:
      "Automate repetitive business processes and reduce unnecessary manual operations.",
  },
  {
    icon: Users,
    title: "Better Lead Management",
    description:
      "Organize customer inquiries, track prospects and improve your lead management process.",
  },
  {
    icon: Clock,
    title: "Less Manual Work",
    description:
      "Connect your everyday tools and create efficient workflows that save time.",
  },
];

export interface Service extends Feature {
  features: string[];
}

export const SERVICES: Service[] = [
  {
    icon: Bot,
    title: "AI Automation",
    description:
      "Build intelligent workflows that automate repetitive business tasks and improve operational efficiency.",
    features: ["AI-powered workflows", "Task automation", "Intelligent data processing"],
  },
  {
    icon: Users,
    title: "Lead Management Systems",
    description:
      "Capture, organize and manage customer inquiries using streamlined lead management solutions.",
    features: ["Lead capture", "CRM integration", "Automated follow-ups"],
  },
  {
    icon: Plug,
    title: "Workflow Integration",
    description:
      "Connect your business tools so data flows automatically between the apps your team already uses.",
    features: ["App-to-app integrations", "Data synchronization", "Real-time notifications"],
  },
  {
    icon: Code2,
    title: "Custom Digital Solutions",
    description:
      "Tailored dashboards, portals and internal tools designed around the way your business actually works.",
    features: ["Custom dashboards", "Client portals", "Internal tools"],
  },
];

export const PROCESS_STEPS: Feature[] = [
  {
    icon: Search,
    title: "Discovery & Audit",
    description:
      "We map your current processes, tools and lead journey to find the biggest time drains and missed opportunities.",
  },
  {
    icon: PenTool,
    title: "Architecture & Design",
    description:
      "We design a clear automation blueprint: triggers, data flows, integrations and the experience for your team.",
  },
  {
    icon: Wrench,
    title: "Build & Integration",
    description:
      "We build, connect and test every workflow against real scenarios before anything touches your customers.",
  },
  {
    icon: Rocket,
    title: "Launch & Optimization",
    description:
      "We launch, train your team and keep refining based on real performance data and feedback.",
  },
];

export const METRICS = [
  { value: "+340%", label: "Lead Response Rate" },
  { value: "25+", label: "Hours Saved Weekly" },
  { value: "2 min", label: "Average Lead Reply Time" },
  { value: "98%", label: "Workflow Accuracy" },
];

export interface CaseStudy {
  industry: string;
  title: string;
  summary: string;
  results: { value: string; label: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    industry: "Real Estate Agency",
    title: "Instant replies for every property inquiry",
    summary:
      "Website and portal inquiries are captured, scored and answered automatically, then routed to the right agent with full context.",
    results: [
      { value: "+340%", label: "Lead response rate" },
      { value: "90 sec", label: "First reply time" },
    ],
  },
  {
    industry: "Marketing Consultancy",
    title: "Onboarding that runs itself",
    summary:
      "New client forms now create CRM records, project boards, welcome emails and kickoff bookings without anyone lifting a finger.",
    results: [
      { value: "25+ hrs", label: "Saved every week" },
      { value: "0", label: "Missed handoffs" },
    ],
  },
  {
    industry: "Home Services Company",
    title: "From missed calls to booked jobs",
    summary:
      "Every inquiry is logged, followed up within minutes and nudged with reminders until it becomes a booked appointment.",
    results: [
      { value: "+62%", label: "Booked jobs" },
      { value: "3x", label: "Follow-up coverage" },
    ],
  },
];

export const PRINCIPLES: Feature[] = [
  {
    icon: Sparkles,
    title: "Practical over flashy",
    description: "We automate what genuinely saves time and earns revenue, not what looks impressive in a demo.",
  },
  {
    icon: Users,
    title: "People stay in control",
    description: "Automation handles the repetitive work so your team can focus on relationships and decisions.",
  },
  {
    icon: Workflow,
    title: "Built to scale",
    description: "Clean, documented systems that grow with your business instead of breaking under it.",
  },
];

export const FAQS = [
  {
    q: "What kind of businesses do you work with?",
    a: "We work with small and medium businesses, startups, consultants, agencies and service-based companies that handle a steady flow of inquiries and want to spend less time on manual work.",
  },
  {
    q: "Do I need technical knowledge to use the systems you build?",
    a: "No. We design every workflow to run in the background, and we train your team on anything they interact with. You get clear documentation and a simple handover.",
  },
  {
    q: "Which tools can you integrate with?",
    a: "We commonly connect form builders, CRMs like Notion or HubSpot, email platforms, calendars, spreadsheets and automation platforms such as Make.com. If a tool has an API, we can usually connect it.",
  },
  {
    q: "How long does a typical project take?",
    a: "Focused automations are often live within 1–2 weeks. Larger lead management systems or custom solutions typically take 3–6 weeks, depending on scope.",
  },
  {
    q: "What happens after launch?",
    a: "We monitor performance, fix anything that needs attention and suggest improvements based on real data. Ongoing support plans are available if you want us on hand long term.",
  },
  {
    q: "How is pricing structured?",
    a: "Most projects are quoted as a fixed price after a free discovery call, so you know the full cost before we start. There are no surprise fees.",
  },
];
