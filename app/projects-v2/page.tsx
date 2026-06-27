import { getProjects } from "@/lib/data/projects";
import { createProject } from "@/lib/data/createProject";

export default async function ProjectsV2Page() {
  const projects = await getProjects();

  return (
    <main className="p-10">

      <h1 className="text-3xl font-bold">
        Projects V2
      </h1>

      <form
        action={createProject}
        className="mt-8 rounded-xl border p-6"
      >

        <h2 className="font-semibold">
          Add Project
        </h2>

        <input
          name="title"
          placeholder="Project Title"
          className="mt-4 w-full rounded-lg border p-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          className="mt-4 w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Save Project
        </button>

      </form>

      <div className="mt-10 grid gap-4">

        {projects?.map((project: any) => (

          <div
            key={project.id}
            className="rounded-xl border p-6"
          >

            <h2 className="text-xl font-semibold">
              {project.title}
            </h2>

            <p className="mt-2 text-neutral-500">
              {project.description}
            </p>

            <p className="mt-4 text-sm">
              Level {project.level}
            </p>

            <p className="text-sm">
              Progress {project.progress}%
            </p>

          </div>

        ))}

      </div>

    </main>
  );
}