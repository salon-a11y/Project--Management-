
import { useState } from "react";
import { Mail, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";

const InviteMemberDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const currentWorkspace = useSelector(
    (state) => state.workspace?.currentWorkspace || null,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    role: "org:member",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      console.log(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isDialogOpen) return null;

  return (
    <div
      className="
        fixed inset-0
        bg-black/70
        backdrop-blur-md
        flex items-center justify-center
        z-50
    "
    >
      <div
        className="
            w-full
            max-w-md

            p-6

            rounded-2xl

            bg-gradient-to-br
            from-slate-900
            via-slate-950
            to-black

            border
            border-slate-700

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
                gap-3
                items-center
            "
          >
            <div
              className="
                p-2
                rounded-xl
                bg-blue-500/20
            "
            >
              <UserPlus className="text-blue-400" size={20} />
            </div>
            Invite Team Member
          </h2>

          {currentWorkspace && (
            <p
              className="
                text-sm
                text-slate-400
                mt-2
            "
            >
              Workspace:
              <span
                className="
                ml-1
                text-blue-400
                font-medium
            "
              >
                {currentWorkspace.name}
              </span>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}

          <div>
            <label
              className="
            text-sm
            text-slate-300
        "
            >
              Email Address
            </label>

            <div className="relative mt-2">
              <Mail
                className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-400
        "
                size={17}
              />

              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                placeholder="Enter email address"
                className="
        w-full
        pl-10
        py-3

        rounded-xl

        bg-slate-800

        border
        border-slate-700

        text-white

        outline-none

        focus:ring-2
        focus:ring-blue-500

        transition
        "
              />
            </div>
          </div>

          {/* Role */}

          <div>
            <label
              className="
        text-sm
        text-slate-300
        "
            >
              Role
            </label>

            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value,
                })
              }
              className="
        mt-2
        w-full
        py-3
        px-3

        rounded-xl

        bg-slate-800

        border
        border-slate-700

        text-white

        outline-none

        focus:ring-2
        focus:ring-blue-500
        "
            >
              <option value="org:member">Member</option>

              <option value="org:admin">Admin</option>
            </select>
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

        hover:bg-slate-700

        transition
        "
            >
              Cancel
            </button>

            <button
              disabled={isSubmitting}
              className="
        px-5
        py-2.5

        rounded-xl

        bg-gradient-to-r
        from-blue-500
        to-indigo-600

        text-white

        shadow-lg
        shadow-blue-500/30

        hover:scale-105

        transition

        disabled:opacity-50
        "
            >
              {isSubmitting ? "Sending..." : "Send Invitation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMemberDialog;
