import { ProjectSection } from "./sections/project-section";
import { TasksSection } from "./sections/tasks-section";
import { projects } from "@/lib/data/projects";
import { tasks } from "@/lib/data/tasks";

export const DashboardContent = () => {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <TasksSection tasks={tasks} />
      <ProjectSection projects={projects} />
    </div>
  )
}
