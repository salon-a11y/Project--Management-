

import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteProject } from "../features/workspaceSlice";
import toast from "react-hot-toast";

const statusColors = {
  PLANNING: "bg-slate-700/50 text-slate-300 border-slate-600",

  ACTIVE: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",

  ON_HOLD: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",

  COMPLETED: "bg-blue-500/20 text-blue-400 border-blue-500/30",

  CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30",
};

const ProjectCard = ({ project }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();

    e.stopPropagation();

    const confirmDelete = window.confirm("Delete this project?");

    if (!confirmDelete) return;

    dispatch(deleteProject(project.id));

    toast.success("Project deleted");
  };

  return (
    <Link
      to={`/projects/${project.id}`}
      className="

block

rounded-2xl

p-5


bg-gradient-to-br

from-slate-900

via-slate-950

to-black


border

border-slate-800


shadow-xl


hover:border-blue-500


hover:shadow-blue-500/20


hover:-translate-y-1


transition-all

duration-300


group

"
    >
      {/* Header */}

      <div
        className="

flex

justify-between

items-start

mb-5

"
      >
        <div className="flex-1 min-w-0">
          <h3
            className="

text-lg

font-semibold


text-white


truncate


group-hover:text-blue-400


transition

"
          >
            {project.name}
          </h3>

          <p
            className="

mt-2

text-sm

text-slate-400


line-clamp-2

"
          >
            {project.description || "No description"}
          </p>
        </div>

        {/* Delete */}

        <button
          onClick={handleDelete}
          className="

p-2


rounded-xl


bg-red-500/10


hover:bg-red-500/20


transition

"
        >
          <Trash2 size={16} className="text-red-400" />
        </button>
      </div>

      {/* Status */}

      <div
        className="

flex

items-center

justify-between

mb-5

"
      >
        <span
          className={`

px-3

py-1


rounded-full


text-xs

font-medium


border


${statusColors[project.status]}

`}
        >
          {project.status.replace("_", " ")}
        </span>

        <span
          className="

text-xs

text-slate-400

capitalize

"
        >
          {project.priority}
          priority
        </span>
      </div>

      {/* Progress */}

      <div className="space-y-3">
        <div
          className="

flex

justify-between

text-xs

"
        >
          <span className="text-slate-400">Progress</span>

          <span className="text-blue-400 font-medium">
            {project.progress || 0}%
          </span>
        </div>

        <div
          className="

w-full

h-2


rounded-full


bg-slate-800


overflow-hidden

"
        >
          <div
            className="

h-full


rounded-full


bg-gradient-to-r

from-blue-500

to-indigo-600


transition-all


"
            style={{
              width: `${project.progress || 0}%`,
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
