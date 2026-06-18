import { format } from "date-fns";
import { Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import AddProjectMember from "./AddProjectMember";

export default function ProjectSettings({ project }) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "PLANNING",
        priority: "MEDIUM",
        start_date: new Date(),
        end_date: new Date(),
        progress: 0,
    });


    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);



    useEffect(() => {

        if(project){

            setFormData({
                ...project,

                start_date:
                project.start_date
                ? new Date(project.start_date)
                : new Date(),

                end_date:
                project.end_date
                ? new Date(project.end_date)
                : new Date(),

                progress: project.progress || 0
            });

        }

    },[project]);





    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            setIsSubmitting(true);

            // API / dispatch yaha lagana

            await new Promise(
                resolve=>setTimeout(resolve,1000)
            );


        }
        finally{

            setIsSubmitting(false);

        }

    };





    const inputClasses =
    `
    w-full px-3 py-2 mt-2 rounded-xl
    border text-sm outline-none

    bg-white dark:bg-zinc-900

    border-zinc-300
    dark:border-zinc-700

    text-zinc-900
    dark:text-zinc-200

    focus:ring-2
    focus:ring-blue-500
    `;



    const cardClasses =
    `
    rounded-2xl
    p-6

    bg-white
    dark:bg-gradient-to-br
    dark:from-zinc-800/70
    dark:to-zinc-900/70

    border
    border-zinc-200
    dark:border-zinc-800

    shadow-lg
    `;



    const labelClasses =
    `
    text-sm
    text-zinc-600
    dark:text-zinc-400
    `;





    return (

    <div className="grid lg:grid-cols-2 gap-8">



        {/* Project Details */}

        <div className={cardClasses}>


        <h2 className="
        text-xl font-semibold mb-5
        text-zinc-900 dark:text-white
        ">
            Project Details
        </h2>



        <form 
        onSubmit={handleSubmit}
        className="space-y-5"
        >


        <div>

        <label className={labelClasses}>
        Project Name
        </label>

        <input

        value={formData.name}

        onChange={
        e=>setFormData({
            ...formData,
            name:e.target.value
        })
        }

        className={inputClasses}

        />

        </div>





        <div>

        <label className={labelClasses}>
        Description
        </label>


        <textarea

        value={formData.description}

        onChange={
        e=>setFormData({
            ...formData,
            description:e.target.value
        })
        }

        className={inputClasses+" h-28"}

        />

        </div>





        <div className="grid grid-cols-2 gap-4">


        <div>

        <label className={labelClasses}>
        Status
        </label>


        <select

        value={formData.status}

        onChange={
        e=>setFormData({
            ...formData,
            status:e.target.value
        })
        }

        className={inputClasses}

        >

        <option value="PLANNING">
        Planning
        </option>

        <option value="ACTIVE">
        Active
        </option>

        <option value="ON_HOLD">
        On Hold
        </option>

        <option value="COMPLETED">
        Completed
        </option>

        </select>


        </div>





        <div>

        <label className={labelClasses}>
        Priority
        </label>


        <select

        value={formData.priority}

        onChange={
        e=>setFormData({
            ...formData,
            priority:e.target.value
        })
        }

        className={inputClasses}

        >

        <option value="LOW">
        Low
        </option>

        <option value="MEDIUM">
        Medium
        </option>

        <option value="HIGH">
        High
        </option>


        </select>


        </div>


        </div>






        <div className="grid grid-cols-2 gap-4">


        <div>

        <label className={labelClasses}>
        Start Date
        </label>


        <input

        type="date"

        value={
        format(
        new Date(formData.start_date),
        "yyyy-MM-dd"
        )
        }


        onChange={
        e=>setFormData({
            ...formData,
            start_date:new Date(e.target.value)
        })
        }

        className={inputClasses}

        />


        </div>





        <div>

        <label className={labelClasses}>
        End Date
        </label>


        <input

        type="date"

        value={
        format(
        new Date(formData.end_date),
        "yyyy-MM-dd"
        )
        }


        onChange={
        e=>setFormData({
            ...formData,
            end_date:new Date(e.target.value)
        })
        }


        className={inputClasses}

        />


        </div>


        </div>






        <div>

        <label className={labelClasses}>
        Progress {formData.progress}%
        </label>


        <input

        type="range"

        min="0"

        max="100"

        value={formData.progress}

        onChange={
        e=>setFormData({
            ...formData,
            progress:Number(e.target.value)
        })
        }

        className="
        w-full accent-blue-500
        "

        />


        </div>







        <button

        disabled={isSubmitting}

        className="
        flex items-center gap-2
        ml-auto

        px-5 py-2

        rounded-xl

        bg-gradient-to-r
        from-blue-500
        to-indigo-600

        text-white

        hover:scale-105
        transition
        "

        >

        <Save size={16}/>

        {
        isSubmitting
        ?
        "Saving..."
        :
        "Save Changes"
        }


        </button>



        </form>


        </div>







        {/* Members */}


        <div className={cardClasses}>


        <div className="
        flex justify-between items-center
        ">


        <h2 className="
        text-xl font-semibold
        text-zinc-900 dark:text-white
        ">

        Team Members

        </h2>



        <button

        onClick={()=>setIsDialogOpen(true)}

        className="
        p-2 rounded-xl

        bg-blue-500/10
        hover:bg-blue-500/20

        "

        >

        <Plus size={18}/>

        </button>


        </div>



        <AddProjectMember

        isDialogOpen={isDialogOpen}

        setIsDialogOpen={setIsDialogOpen}

        />



        <div className="mt-5 space-y-3">


        {
        project?.members?.map((member,index)=>(


        <div

        key={index}

        className="
        flex justify-between items-center

        p-3 rounded-xl

        bg-zinc-100
        dark:bg-zinc-800

        text-sm

        "

        >

        <span>

        {member?.user?.email || "Unknown"}

        </span>



        {
        project?.team_lead === member?.user?.id &&

        <span className="
        text-xs
        px-2 py-1
        rounded-full
        bg-blue-500/20
        text-blue-400
        ">

        Team Lead

        </span>

        }


        </div>


        ))
        }


        </div>


        </div>


    </div>

    );

}