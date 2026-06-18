

import { useEffect, useState } from "react";
import {
  CheckSquareIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "lucide-react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MyTasksSidebar() {
  const user = {
    id: "user_1",
  };

  const { currentWorkspace } = useSelector((state) => state.workspace);

  const [showMyTasks, setShowMyTasks] = useState(false);

  const [myTasks, setMyTasks] = useState([]);

  const toggleMyTasks = () => {
    setShowMyTasks((prev) => !prev);
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case "DONE":
        return "bg-emerald-500";

      case "IN_PROGRESS":
        return "bg-yellow-400";

      case "TODO":
        return "bg-blue-500";

      default:
        return "bg-slate-500";
    }
  };

  const fetchUserTasks = () => {
    const userId = user?.id || "";

    if (!userId || !currentWorkspace) return;

    const tasks = currentWorkspace.projects.flatMap((project) =>
      project.tasks.filter((task) => task?.assignee?.id === userId),
    );

    setMyTasks(tasks);
  };

  useEffect(() => {
    fetchUserTasks();
  }, [currentWorkspace]);

  return (
    <div className="mt-6 px-3">
      {/* Header */}

      <div
        onClick={toggleMyTasks}
        className="

flex
items-center
justify-between

px-4
py-3

rounded-xl

cursor-pointer

bg-slate-900/60

border
border-slate-800

hover:border-blue-500

hover:bg-slate-800

transition

shadow-lg

"
      >
        <div
          className="
flex
items-center
gap-3
"
        >
          <div
            className="
p-2
rounded-lg
bg-blue-500/20
"
          >
            <CheckSquareIcon
              className="
w-4
h-4
text-blue-400
"
            />
          </div>

          <h3
            className="
text-sm
font-semibold
text-white
"
          >
            My Tasks
          </h3>

          <span
            className="

text-xs

px-2
py-1

rounded-full

bg-blue-500/20

text-blue-400

"
          >
            {myTasks.length}
          </span>
        </div>

        {showMyTasks ? (
          <ChevronDownIcon
            className="
text-blue-400
w-4
h-4
"
          />
        ) : (
          <ChevronRightIcon
            className="
text-slate-400
w-4
h-4
"
          />
        )}
      </div>

      {/* Task List */}

      {showMyTasks && (
        <div
          className="
mt-3
space-y-2
pl-1
"
        >
          {myTasks.length === 0 ? (
            <div
              className="

text-center

py-4

rounded-xl

bg-slate-900

border
border-slate-800

text-xs

text-slate-400

"
            >
              No tasks assigned
            </div>
          ) : (
            myTasks.map((task, index) => (
              <Link
                key={index}
                to={`/taskDetails?projectId=${task.projectId}&taskId=${task.id}`}
                className="

block

rounded-xl

bg-slate-900/70

border
border-slate-800

hover:border-blue-500

hover:bg-slate-800

transition

"
              >
                <div
                  className="
flex
items-center
gap-3

px-3
py-3
"
                >
                  <div
                    className={`

w-2
h-2

rounded-full

${getTaskStatusColor(task.status)}

`}
                  />

                  <div
                    className="
flex-1
min-w-0
"
                  >
                    <p
                      className="
text-sm
text-white
font-medium
truncate
"
                    >
                      {task.title}
                    </p>

                    <p
                      className="
text-xs
text-slate-400
capitalize
"
                    >
                      {task.status.replace("_", " ").toLowerCase()}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default MyTasksSidebar;
