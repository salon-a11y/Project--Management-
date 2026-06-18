

import { useUser, SignInButton } from "@clerk/clerk-react";
import {
    FolderKanban,
    CheckCircle2,
    Users,
    BarChart3,
    Sparkles
} from "lucide-react";


const ProtectedRoute = ({ children }) => {

    const { isLoaded, isSignedIn } = useUser();


    if (!isLoaded) {
        return (
            <div className="
            min-h-screen flex items-center justify-center
            bg-gradient-to-br from-blue-50 via-white to-purple-100
            dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950
            text-zinc-900 dark:text-white">

                <div className="
                px-6 py-4 rounded-xl
                bg-white/70 dark:bg-zinc-900/70
                backdrop-blur shadow-xl">

                    Loading...

                </div>

            </div>
        );
    }



    if (!isSignedIn) {

        return (

            <div className="
            min-h-screen
            flex items-center justify-center
            px-6
            bg-gradient-to-br
            from-blue-100 via-white to-purple-100
            dark:from-zinc-950 dark:via-zinc-900 dark:to-purple-950">


                <div className="
                max-w-6xl w-full
                grid md:grid-cols-2
                gap-12 items-center">



                    {/* LEFT */}

                    <div>


                        <div className="flex items-center gap-4 mb-8">


                            <div className="
                            w-16 h-16 rounded-2xl
                            flex items-center justify-center
                            bg-gradient-to-br
                            from-blue-500 to-purple-600
                            shadow-xl">


                                <FolderKanban
                                className="text-white size-8"/>

                            </div>



                            <div>

                                <div className="flex items-center gap-2">

                                <h1 className="
                                text-5xl font-bold
                                text-zinc-900 dark:text-white">

                                    ProjectSync

                                </h1>


                                <Sparkles
                                className="text-yellow-500"/>

                                </div>


                                <p className="
                                text-zinc-500 dark:text-zinc-400 mt-1">

                                    Smart Project Management

                                </p>

                            </div>


                        </div>



                        <p className="
                        text-lg leading-relaxed
                        text-zinc-600 dark:text-zinc-400">

                            Manage projects, organize tasks,
                            collaborate with your team and
                            monitor progress from one powerful dashboard.

                        </p>



                        <div className="mt-10 space-y-5">



                            <Feature
                            icon={<CheckCircle2/>}
                            text="Create and manage unlimited projects"
                            color="text-green-500"/>



                            <Feature
                            icon={<Users/>}
                            text="Invite and collaborate with teams"
                            color="text-blue-500"/>



                            <Feature
                            icon={<BarChart3/>}
                            text="Track analytics and productivity"
                            color="text-purple-500"/>


                        </div>



                    </div>





                    {/* LOGIN CARD */}


                    <div className="
                    rounded-3xl
                    p-8
                    bg-white/70
                    dark:bg-zinc-900/70
                    backdrop-blur-xl
                    border border-white/20
                    dark:border-zinc-800
                    shadow-2xl">


                        <div className="text-center">


                            <h2 className="
                            text-3xl font-bold
                            text-zinc-900 dark:text-white">

                                Welcome Back 👋

                            </h2>



                            <p className="
                            mt-3
                            text-zinc-500 dark:text-zinc-400">

                                Login to continue your workspace

                            </p>



                            <div className="mt-8">


                                <SignInButton>


                                    <button
                                    className="
                                    w-full
                                    py-3
                                    rounded-xl
                                    text-white
                                    font-medium
                                    bg-gradient-to-r
                                    from-blue-500
                                    to-purple-600
                                    hover:scale-[1.02]
                                    transition
                                    shadow-lg">

                                        Sign In

                                    </button>


                                </SignInButton>


                            </div>



                            <div className="
                            mt-6
                            text-xs
                            text-zinc-400">

                                🔒 Secure authentication powered by Clerk

                            </div>


                        </div>


                    </div>



                </div>



            </div>

        );
    }


    return children;
};




// reusable feature component

const Feature = ({icon,text,color}) => (

<div className="flex items-center gap-4">


<div className={`
w-10 h-10 rounded-xl
flex items-center justify-center
bg-white dark:bg-zinc-900
shadow
${color}
`}>

{icon}

</div>


<p className="
text-zinc-700 dark:text-zinc-300">

{text}

</p>


</div>

)



export default ProtectedRoute;