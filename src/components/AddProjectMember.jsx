
import { useState } from "react";
import { Mail, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const AddProjectMember = ({ isDialogOpen, setIsDialogOpen }) => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  const currentWorkspace = useSelector(
    (state) => state.workspace?.currentWorkspace || null,
  );

  const project = currentWorkspace?.projects.find((p) => p.id === id);

  const projectMembersEmails =
    project?.members?.map((member) => member.user.email) || [];

  const [email, setEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsAdding(true);

    try {
      console.log("Adding member:", email);

      // API call here
    } catch (error) {
      console.log(error);
    } finally {
      setIsAdding(false);
    }
  };

  if (!isDialogOpen) return null;

  return (
    <div
      className="
            fixed inset-0 
            bg-black/70 
            backdrop-blur-md
            flex 
            items-center 
            justify-center 
            z-50
        "
    >
      <div
        className="
                w-full 
                max-w-md

                rounded-2xl

                bg-gradient-to-br 
                from-slate-900 
                via-slate-950 
                to-black

                border
                border-slate-700

                p-6

                shadow-2xl
                shadow-blue-500/20

                text-white
            "
      >
        {/* Header */}

        <div className="mb-6">
          <h2
            className="
                        text-2xl
                        font-bold
                        flex
                        items-center
                        gap-3
                    "
          >
            <div
              className="
                            p-2
                            rounded-xl
                            bg-blue-500/20
                        "
            >
              <UserPlus
                className="
                                w-5
                                h-5
                                text-blue-400
                                "
              />
            </div>
            Add Member
          </h2>

          {currentWorkspace && project && (
            <p
              className="
                            mt-2
                            text-sm
                            text-slate-400
                        "
            >
              Adding to Project:
              <span
                className="
                                ml-1
                                text-blue-400
                                font-medium
                            "
              >
                {project.name}
              </span>
            </p>
          )}
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Select */}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="
                                text-sm
                                font-medium
                                text-slate-300
                            "
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2

                                    w-4
                                    h-4

                                    text-slate-400
                                "
              />

              <select
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                                    w-full

                                    pl-10
                                    pr-3
                                    py-3

                                    rounded-xl

                                    bg-slate-800

                                    border
                                    border-slate-700

                                    text-white

                                    outline-none

                                    focus:ring-2
                                    focus:ring-blue-500

                                    hover:border-blue-500

                                    transition
                                "
              >
                <option value="" className="bg-slate-900">
                  Select a member
                </option>

                {currentWorkspace?.members

                  .filter(
                    (member) =>
                      !projectMembersEmails.includes(member.user.email),
                  )

                  .map((member) => (
                    <option
                      key={member.user.id}
                      value={member.user.email}
                      className="bg-slate-900"
                    >
                      {member.user.email}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Buttons */}

          <div
            className="
                        flex
                        justify-end
                        gap-3
                        pt-4
                    "
          >
            <button
              type="button"
              onClick={() => setIsDialogOpen(false)}
              className="
                                px-5
                                py-2.5

                                rounded-xl

                                bg-slate-800

                                border
                                border-slate-700

                                text-slate-300

                                hover:bg-slate-700

                                transition
                            "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isAdding || !currentWorkspace}
              className="
                                px-5
                                py-2.5

                                rounded-xl

                                bg-gradient-to-r
                                from-blue-500
                                to-indigo-600

                                text-white

                                font-medium

                                shadow-lg
                                shadow-blue-500/30

                                hover:scale-105

                                transition

                                disabled:opacity-50
                            "
            >
              {isAdding ? "Adding..." : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectMember;
