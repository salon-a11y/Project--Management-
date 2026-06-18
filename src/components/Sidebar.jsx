
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import MyTasksSidebar from "./MyTasksSidebar";
import ProjectSidebar from "./ProjectsSidebar";
import WorkspaceDropdown from "./WorkspaceDropdown";

import {
    FolderOpenIcon,
    LayoutDashboardIcon,
    SettingsIcon,
    UsersIcon,
    Sparkles
} from "lucide-react";


const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {


    const menuItems = [
        {
            name: "Dashboard",
            href: "/",
            icon: LayoutDashboardIcon
        },
        {
            name: "Projects",
            href: "/projects",
            icon: FolderOpenIcon
        },
        {
            name: "Team",
            href: "/team",
            icon: UsersIcon
        },
    ];


    const sidebarRef = useRef(null);


    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setIsSidebarOpen(false);
            }

        };


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, [setIsSidebarOpen]);



    return (

        <aside
            ref={sidebarRef}
            className={`
            z-20 
            w-72
            h-screen
            flex
            flex-col
            fixed
            md:static

            bg-white/80
            dark:bg-zinc-950/80

            backdrop-blur-xl

            border-r
            border-zinc-200
            dark:border-zinc-800

            transition-all
            duration-300

            ${isSidebarOpen
                ? "left-0"
                : "-left-full md:left-0"
            }
            `}
        >


            {/* Workspace */}

            <div className="p-4">

                <div
                    className="
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-500
                    to-indigo-600
                    p-1
                    shadow-lg
                    "
                >

                    <div
                        className="
                        bg-white
                        dark:bg-zinc-950
                        rounded-xl
                        "
                    >

                        <WorkspaceDropdown />

                    </div>


                </div>

            </div>



            <div className="px-4">

                <div
                    className="
                    h-px
                    bg-zinc-200
                    dark:bg-zinc-800
                    "
                />

            </div>




            {/* Menu */}

            <div
                className="
                flex-1
                overflow-y-auto
                no-scrollbar
                px-4
                py-5
                "
            >


                <p
                    className="
                    text-xs
                    uppercase
                    tracking-wider
                    text-zinc-400
                    mb-3
                    px-3
                    "
                >
                    Menu
                </p>



                <div className="space-y-2">


                    {
                        menuItems.map((item)=> (

                            <NavLink
                                key={item.name}
                                to={item.href}

                                className={({isActive}) => `

                                group
                                flex
                                items-center
                                gap-3
                                px-4
                                py-3
                                rounded-xl
                                transition-all


                                ${
                                isActive

                                ?

                                `
                                bg-gradient-to-r
                                from-blue-500
                                to-indigo-500
                                text-white
                                shadow-lg
                                shadow-blue-500/20
                                `

                                :

                                `
                                text-zinc-700
                                dark:text-zinc-300
                                hover:bg-zinc-100
                                dark:hover:bg-zinc-800
                                `
                                }

                                `}
                            >


                                <div
                                className="
                                p-1.5
                                rounded-lg
                                bg-black/5
                                dark:bg-white/10
                                "
                                >

                                    <item.icon size={16}/>

                                </div>


                                <span
                                className="text-sm font-medium"
                                >
                                    {item.name}
                                </span>


                            </NavLink>

                        ))
                    }



                    {/* Settings */}


                    <button

                    className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl

                    text-zinc-700
                    dark:text-zinc-300

                    hover:bg-zinc-100
                    dark:hover:bg-zinc-800

                    transition
                    "

                    >

                        <div
                        className="
                        p-1.5
                        rounded-lg
                        bg-black/5
                        dark:bg-white/10
                        "
                        >

                            <SettingsIcon size={16}/>

                        </div>


                        <span className="text-sm font-medium">
                            Settings
                        </span>


                    </button>


                </div>



                {/* Tasks */}

                <div className="mt-8">

                    <div
                    className="
                    flex
                    items-center
                    gap-2
                    px-3
                    mb-3
                    "
                    >

                        <Sparkles
                        size={15}
                        className="text-blue-500"
                        />

                        <p
                        className="
                        text-xs
                        uppercase
                        text-zinc-400
                        "
                        >
                            Workspace
                        </p>


                    </div>



                    <MyTasksSidebar />


                    <ProjectSidebar />


                </div>



            </div>


        </aside>

    );

};


export default Sidebar;