import { Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

import StatsGrid from "../components/StatsGrid";
import ProjectOverview from "../components/ProjectOverview";
import RecentActivity from "../components/RecentActivity";
import TasksSummary from "../components/TasksSummary";
import CreateProjectDialog from "../components/CreateProjectDialog";


const Dashboard = () => {


    const { user, isLoaded } = useUser();

    const [isDialogOpen,setIsDialogOpen] = useState(false);



    if(!isLoaded) return null;



    const displayName =
        user?.fullName ||
        user?.firstName ||
        user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
        "User";



    return (


    <div
    className="
    min-h-screen

    bg-gradient-to-br
    from-slate-100
    via-white
    to-blue-100

    dark:from-zinc-950
    dark:via-zinc-900
    dark:to-black

    "
    >


        <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-10
        "
        >



        {/* Header */}


        <div
        className="
        relative
        overflow-hidden

        rounded-3xl

        p-8
        mb-10

        bg-white/70
        dark:bg-zinc-900/70

        backdrop-blur-xl

        border
        border-zinc-200
        dark:border-zinc-800

        shadow-lg
        "
        >



        <div
        className="
        absolute
        w-60
        h-60
        bg-blue-500/20
        rounded-full
        blur-3xl
        -top-20
        -right-20
        "
        />



        <div
        className="
        relative
        flex
        flex-col
        lg:flex-row
        justify-between
        gap-6
        "
        >



            <div>


            <div
            className="
            flex
            items-center
            gap-2
            text-blue-500
            mb-3
            "
            >

                <Sparkles size={18}/>

                <span
                className="text-sm"
                >
                    Workspace Dashboard
                </span>


            </div>



            <h1
            className="
            text-4xl
            font-bold

            bg-gradient-to-r
            from-blue-600
            to-purple-600

            bg-clip-text
            text-transparent
            "
            >

                Welcome back, {displayName}

            </h1>



            <p
            className="
            mt-3
            text-zinc-500
            dark:text-zinc-400
            "
            >

                Manage projects, tasks and your team from one place

            </p>


            </div>





            <button

            onClick={()=>setIsDialogOpen(true)}

            className="
            h-fit

            flex
            items-center
            gap-2

            px-6
            py-3

            rounded-2xl

            bg-gradient-to-r
            from-blue-500
            to-indigo-600

            text-white

            font-medium

            shadow-lg
            shadow-blue-500/30

            hover:-translate-y-1

            transition-all
            "

            >

                <Plus size={18}/>

                New Project

            </button>



        </div>



        <CreateProjectDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        />



        </div>







        {/* Stats */}


        <div
        className="
        mb-10

        rounded-3xl

        p-6

        bg-white/60
        dark:bg-zinc-900/60

        backdrop-blur-xl

        border
        border-zinc-200
        dark:border-zinc-800

        shadow-md
        "
        >

            <StatsGrid />

        </div>







        {/* Content */}



        <div
        className="
        grid
        lg:grid-cols-3
        gap-8
        "
        >



            <div
            className="
            lg:col-span-2
            space-y-8
            "
            >



                <section
                className="
                rounded-3xl
                p-6

                bg-white
                dark:bg-zinc-900

                border
                border-zinc-200
                dark:border-zinc-800

                shadow-md

                hover:shadow-xl
                transition
                "
                >

                    <ProjectOverview/>

                </section>





                <section
                className="
                rounded-3xl
                p-6

                bg-white
                dark:bg-zinc-900

                border
                border-zinc-200
                dark:border-zinc-800

                shadow-md

                hover:shadow-xl

                transition
                "
                >

                    <RecentActivity/>

                </section>



            </div>





            <section

            className="
            rounded-3xl

            p-6

            bg-white
            dark:bg-zinc-900

            border
            border-zinc-200
            dark:border-zinc-800

            shadow-md

            hover:shadow-xl

            transition
            "

            >

                <TasksSummary/>


            </section>




        </div>



        </div>


    </div>


    )

}


export default Dashboard;