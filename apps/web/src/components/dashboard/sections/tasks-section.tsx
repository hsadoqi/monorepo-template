import { QuickCaptureCard } from "./quick-capture-card"
import { UpcomingTasksCard, type Task } from "./upcoming-tasks-card"

export const TasksSection = ({ tasks }: { tasks: Task[] }) => {
  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)]">
      <UpcomingTasksCard tasks={tasks} />
      <QuickCaptureCard />
    </section>
  )
}
