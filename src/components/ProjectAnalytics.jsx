
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  ArrowRightIcon,
} from "lucide-react";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const PRIORITY_COLORS = {
  LOW: "text-red-400 bg-red-500/20",

  MEDIUM: "text-blue-400 bg-blue-500/20",

  HIGH: "text-emerald-400 bg-emerald-500/20",
};

const ProjectAnalytics = ({ project, tasks }) => {
  const { stats, statusData, typeData, priorityData } = useMemo(() => {
    const now = new Date();

    const total = tasks.length;

    const stats = {
      total,

      completed: 0,

      inProgress: 0,

      todo: 0,

      overdue: 0,
    };

    const statusMap = {
      TODO: 0,
      IN_PROGRESS: 0,
      DONE: 0,
    };

    const typeMap = {
      TASK: 0,
      BUG: 0,
      FEATURE: 0,
      IMPROVEMENT: 0,
      OTHER: 0,
    };

    const priorityMap = {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
    };

    tasks.forEach((t) => {
      if (t.status === "DONE") stats.completed++;

      if (t.status === "IN_PROGRESS") stats.inProgress++;

      if (t.status === "TODO") stats.todo++;

      if (new Date(t.due_date) < now && t.status !== "DONE") stats.overdue++;

      if (statusMap[t.status] !== undefined) statusMap[t.status]++;

      if (typeMap[t.type] !== undefined) typeMap[t.type]++;

      if (priorityMap[t.priority] !== undefined) priorityMap[t.priority]++;
    });

    return {
      stats,

      statusData: Object.entries(statusMap).map(([k, v]) => ({
        name: k.replace("_", " "),
        value: v,
      })),

      typeData: Object.entries(typeMap)
        .filter(([_, v]) => v > 0)
        .map(([k, v]) => ({
          name: k,
          value: v,
        })),

      priorityData: Object.entries(priorityMap).map(([k, v]) => ({
        name: k,

        value: v,

        percentage: total ? Math.round((v / total) * 100) : 0,
      })),
    };
  }, [tasks]);

  const completionRate = stats.total
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const metrics = [
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: <CheckCircle />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
    },

    {
      label: "Active Tasks",
      value: stats.inProgress,
      icon: <Clock />,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
    },

    {
      label: "Overdue Tasks",
      value: stats.overdue,
      icon: <AlertTriangle />,
      color: "text-red-400",
      bg: "bg-red-500/20",
    },

    {
      label: "Team Size",
      value: project?.members?.length || 0,
      icon: <Users />,
      color: "text-purple-400",
      bg: "bg-purple-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics */}

      <div
        className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
gap-5
"
      >
        {metrics.map((m, i) => (
          <div
            key={i}
            className="

p-5

rounded-2xl

bg-gradient-to-br
from-slate-900
to-black

border
border-slate-800

shadow-xl

hover:border-blue-500

transition

"
          >
            <div
              className="
flex
justify-between
items-center
"
            >
              <div>
                <p
                  className="
text-sm
text-slate-400
"
                >
                  {m.label}
                </p>

                <p
                  className={`
text-3xl
font-bold
${m.color}
`}
                >
                  {m.value}
                </p>
              </div>

              <div
                className={`
p-3
rounded-xl
${m.bg}
${m.color}
`}
              >
                {m.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}

      <div
        className="
grid
lg:grid-cols-2
gap-6
"
      >
        <div
          className="
p-6
rounded-2xl

bg-gradient-to-br
from-slate-900
to-black

border
border-slate-800

"
        >
          <h2
            className="
text-white
font-semibold
mb-4
"
          >
            Tasks By Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" stroke="#94a3b8" />

              <YAxis stroke="#94a3b8" />

              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          className="
p-6

rounded-2xl

bg-gradient-to-br
from-slate-900
to-black

border
border-slate-800

"
        >
          <h2
            className="
text-white
font-semibold
mb-4
"
          >
            Tasks By Type
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {typeData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Priority */}

      <div
        className="
p-6

rounded-2xl

bg-gradient-to-br
from-slate-900
to-black

border
border-slate-800

"
      >
        <h2
          className="
text-white
font-semibold
mb-5
"
        >
          Tasks By Priority
        </h2>

        <div className="space-y-5">
          {priorityData.map((p) => (
            <div key={p.name}>
              <div
                className="
flex
justify-between
mb-2
"
              >
                <span
                  className="
text-slate-300
capitalize
"
                >
                  {p.name.toLowerCase()}
                </span>

                <span
                  className="
text-slate-400
text-sm
"
                >
                  {p.value} tasks
                </span>
              </div>

              <div
                className="
h-2

bg-slate-800

rounded-full

overflow-hidden

"
              >
                <div
                  style={{
                    width: `${p.percentage}%`,
                  }}
                  className="
h-full

bg-gradient-to-r

from-blue-500

to-indigo-600

rounded-full
"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalytics;
