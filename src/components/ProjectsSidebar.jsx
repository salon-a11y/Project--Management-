import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import {
    ChevronRightIcon,
    SettingsIcon,
    KanbanIcon,
    ChartColumnIcon,
    CalendarIcon,
    ArrowRightIcon
} from "lucide-react";

import { useSelector } from "react-redux";


const ProjectSidebar = () => {

    const location = useLocation();

    const [expandedProjects, setExpandedProjects] = useState(new Set());

    const [searchParams] = useSearchParams();


    const projects = useSelector(
        (state) =>
            state?.workspace?.currentWorkspace?.projects || []
    );



    const getProjectSubItems = (projectId) => [
        {
            title: "Tasks",
            icon: KanbanIcon,
            url: `/projectsDetail?id=${projectId}&tab=tasks`
        },
        {
            title: "Analytics",
            icon: ChartColumnIcon,
            url: `/projectsDetail?id=${projectId}&tab=analytics`
        },
        {
            title: "Calendar",
            icon: CalendarIcon,
            url: `/projectsDetail?id=${projectId}&tab=calendar`
        },
        {
            title: "Settings",
            icon: SettingsIcon,
            url: `/projectsDetail?id=${projectId}&tab=settings`
        }
    ];



    const toggleProject = (id) => {

        const newSet = new Set(expandedProjects);

        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }

        setExpandedProjects(newSet);
    };



    return (

        <div className="mt-6 px-3 w-full">


            {/* Header */}

            <div className="
            flex items-center justify-between 
            px-3 mb-4
            ">


                <h3 className="
                text-xs uppercase tracking-widest
                font-semibold text-zinc-400
                ">
                    Projects
                </h3>



                <Link to="/projects">

                    <button
                        className="
                        p-2 rounded-xl
                        bg-zinc-800
                        hover:bg-blue-500/20
                        transition
                        "
                    >

                        <ArrowRightIcon
                            size={14}
                            className="text-blue-400"
                        />

                    </button>

                </Link>


            </div>





            <div className="space-y-2">


                {projects.map((project) => (


                    <div
                        key={project.id}
                        className="rounded-xl overflow-hidden"
                    >




                        {/* Project */}

                        <button

                            onClick={() => toggleProject(project.id)}

                            className="
                            w-full flex items-center gap-3
                            px-4 py-3 rounded-xl

                            bg-zinc-900/70
                            border border-zinc-800

                            text-zinc-300

                            hover:border-blue-500
                            hover:bg-zinc-800

                            transition
                            "

                        >


                            <ChevronRightIcon

                                size={15}

                                className={`
                                text-zinc-400 transition-transform
                                ${
                                    expandedProjects.has(project.id)
                                    ? "rotate-90"
                                    : ""
                                }
                                `}
                            />



                            <div
                                className="
                                w-2.5 h-2.5 rounded-full
                                bg-gradient-to-r
                                from-blue-500 to-indigo-600
                                "
                            />



                            <span className="
                            text-sm truncate
                            ">
                                {project.name}
                            </span>



                        </button>







                        {/* Sub Menu */}

                        {
                            expandedProjects.has(project.id) && (

                                <div
                                    className="
                                    ml-5 mt-2 space-y-1
                                    border-l border-zinc-700
                                    pl-3
                                    "
                                >


                                    {
                                        getProjectSubItems(project.id)
                                        .map((item)=>{


                                            const Icon = item.icon;


                                            const active =
                                            location.pathname === "/projectsDetail"
                                            &&
                                            searchParams.get("id") === project.id
                                            &&
                                            searchParams.get("tab") === item.title.toLowerCase();



                                            return (

                                                <Link

                                                    key={item.title}

                                                    to={item.url}


                                                    className={`
                                                    flex items-center gap-3
                                                    px-3 py-2 rounded-lg
                                                    text-xs transition

                                                    ${
                                                    active

                                                    ?

                                                    "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-400 border border-blue-500/30"

                                                    :

                                                    "text-zinc-400 hover:text-white hover:bg-zinc-800"
                                                    }
                                                    `}

                                                >


                                                    <Icon size={14}/>


                                                    {item.title}


                                                </Link>

                                            )

                                        })
                                    }



                                </div>

                            )
                        }



                    </div>


                ))}



            </div>



        </div>

    );

};


export default ProjectSidebar;