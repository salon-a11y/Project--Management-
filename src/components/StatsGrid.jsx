import { 
    FolderOpen, 
    CheckCircle, 
    Users, 
    AlertTriangle 
} from "lucide-react";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function StatsGrid() {


    const currentWorkspace = useSelector(
        (state)=>state?.workspace?.currentWorkspace || null
    );


    const [stats,setStats] = useState({
        totalProjects:0,
        activeProjects:0,
        completedProjects:0,
        myTasks:0,
        overdueIssues:0,
    });



    const statCards = [

        {
            icon:FolderOpen,
            title:"Total Projects",
            value:stats.totalProjects,
            subtitle:`projects in ${currentWorkspace?.name || ""}`,
            iconBg:"bg-blue-500/20",
            iconColor:"text-blue-500",
            glow:"from-blue-500/20"
        },


        {
            icon:CheckCircle,
            title:"Completed Projects",
            value:stats.completedProjects,
            subtitle:`of ${stats.totalProjects} total`,
            iconBg:"bg-emerald-500/20",
            iconColor:"text-emerald-500",
            glow:"from-emerald-500/20"
        },


        {
            icon:Users,
            title:"My Tasks",
            value:stats.myTasks,
            subtitle:"assigned to me",
            iconBg:"bg-purple-500/20",
            iconColor:"text-purple-500",
            glow:"from-purple-500/20"
        },


        {
            icon:AlertTriangle,
            title:"Overdue",
            value:stats.overdueIssues,
            subtitle:"need attention",
            iconBg:"bg-red-500/20",
            iconColor:"text-red-500",
            glow:"from-red-500/20"
        }

    ];





    useEffect(()=>{


        if(currentWorkspace){


            setStats({

                totalProjects:
                currentWorkspace.projects.length,


                activeProjects:
                currentWorkspace.projects.filter(
                    p =>
                    p.status !== "CANCELLED" &&
                    p.status !== "COMPLETED"
                ).length,



                completedProjects:
                currentWorkspace.projects
                .filter(
                    p=>p.status==="COMPLETED"
                )
                .reduce(
                    (acc,p)=>acc+p.tasks.length,
                    0
                ),



                myTasks:
                currentWorkspace.projects.reduce(
                    (acc,project)=>
                    acc+
                    project.tasks.filter(
                        t=>
                        t.assignee?.email ===
                        currentWorkspace.owner.email
                    ).length,
                    0
                ),



                overdueIssues:
                currentWorkspace.projects.reduce(
                    (acc,project)=>
                    acc+
                    project.tasks.filter(
                        t =>
                        new Date(t.due_date) < new Date()
                    ).length,
                    0
                )

            });

        }


    },[currentWorkspace]);





    return (

        <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
        my-10
        "
        >


        {
            statCards.map(
            (
                {
                    icon:Icon,
                    title,
                    value,
                    subtitle,
                    iconBg,
                    iconColor,
                    glow
                },
                i
            )=>(


            <div

            key={i}

            className={`
            relative
            overflow-hidden

            rounded-2xl

            border
            border-zinc-200
            dark:border-zinc-800

            bg-white
            dark:bg-zinc-950

            backdrop-blur-xl

            shadow-sm
            hover:shadow-xl

            transition-all
            duration-300

            hover:-translate-y-1

            `}

            >


            {/* Glow */}

            <div
            className={`
            absolute
            inset-0
            bg-gradient-to-br
            ${glow}
            to-transparent
            opacity-40
            `}
            />



            <div
            className="
            relative
            p-6
            "
            >


                <div
                className="
                flex
                justify-between
                items-start
                "
                >


                    <div>


                        <p
                        className="
                        text-sm
                        text-zinc-500
                        dark:text-zinc-400
                        "
                        >
                            {title}
                        </p>



                        <h2
                        className="
                        text-4xl
                        font-bold
                        mt-2
                        text-zinc-900
                        dark:text-white
                        "
                        >

                            {value}

                        </h2>



                        <p
                        className="
                        text-xs
                        mt-2
                        text-zinc-400
                        dark:text-zinc-500
                        "
                        >
                            {subtitle}
                        </p>



                    </div>



                    <div
                    className={`
                    p-4
                    rounded-2xl
                    ${iconBg}
                    `}
                    >

                        <Icon
                        size={24}
                        className={iconColor}
                        />

                    </div>



                </div>



                {/* Bottom line */}


                <div
                className="
                mt-6
                h-1
                rounded-full
                bg-zinc-200
                dark:bg-zinc-800
                "
                >

                    <div
                    className="
                    h-full
                    w-2/3
                    rounded-full
                    bg-gradient-to-r
                    from-blue-500
                    to-indigo-500
                    "
                    />

                </div>


            </div>



            </div>


            ))
        }


        </div>

    );
}