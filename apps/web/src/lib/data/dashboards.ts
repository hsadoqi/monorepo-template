export const dashboardContexts = [
  "All",
  "Personal",
  "Projects",
  "Learning",
] as const

export type DashboardContext = Exclude<
  (typeof dashboardContexts)[number],
  "All"
>

export type DashboardFilter = (typeof dashboardContexts)[number]

export interface DashboardSummary {
  id: string
  title: string
  description: string
  context: DashboardContext
  updated: string
  regionCount: number
}

export const dashboards: DashboardSummary[] = [
  {
    id: "life-overview",
    title: "Life overview",
    description:
      "A calm starting point for the week, bringing active projects, routines, and saved notes into one view.",
    context: "Personal",
    updated: "Opened today",
    regionCount: 5,
  },
  {
    id: "synapcity-build",
    title: "Synapcity build",
    description:
      "Current work, decisions in motion, and the references shaping the next product slice.",
    context: "Projects",
    updated: "Edited yesterday",
    regionCount: 4,
  },
  {
    id: "wellbeing-rhythm",
    title: "Wellbeing rhythm",
    description:
      "A gentle view of movement, sleep, and the routines worth noticing over time.",
    context: "Personal",
    updated: "Opened Sep 8",
    regionCount: 3,
  },
  {
    id: "reading-room",
    title: "Reading room",
    description:
      "Books in progress, collected passages, and ideas waiting to connect to a document.",
    context: "Learning",
    updated: "Edited Sep 6",
    regionCount: 4,
  },
]
