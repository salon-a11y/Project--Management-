

import { useEffect, useState } from "react";
import {
    GitCommit,
    MessageSquare,
    Clock,
    Bug,
    Zap,
    Square
} from "lucide-react";

import { format } from "date-fns";
import { useSelector } from "react-redux";


const typeIcons = {

    BUG:{
        icon:Bug,
        color:"text-red-500",
        bg:"bg-red-500/10"
    },

    FEATURE:{
        icon:Zap,
        color:"text-blue-500",
        bg:"bg-blue-500/10"
    },

    TASK:{
        icon:Square,
        color:"text-green-500",
        bg:"bg-green-500/10"
    },

    IMPROVEMENT:{
        icon:MessageSquare,
        color:"text-yellow-500",
        bg:"bg-yellow-500/10"
    },

    OTHER:{
        icon:GitCommit,
        color:"text-purple-500",
        bg:"bg-purple-500/10"
    }

};



const statusColors = {

TODO:
"bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",

IN_PROGRESS:
"bg-blue-500/10 text-blue-500",

DONE:
"bg-green-500/10 text-green-500"

};



const RecentActivity =()=>{


const [tasks,setTasks]=useState([]);

const {currentWorkspace}=useSelector(
(state)=>state.workspace
);



useEffect(()=>{

if(!currentWorkspace) return;


const allTasks =
currentWorkspace.projects.flatMap(
project=>project.tasks
);


setTasks(allTasks);


},[currentWorkspace]);



return (


<div className="
rounded-2xl
overflow-hidden
border
border-zinc-200
dark:border-zinc-800
bg-white
dark:bg-zinc-950
shadow-xl
">


{/* HEADER */}

<div className="
px-6 py-4
border-b
border-zinc-200
dark:border-zinc-800
flex items-center justify-between
">


<h2 className="
text-lg
font-semibold
text-zinc-900
dark:text-white
">

Recent Activity

</h2>


<div className="
px-3 py-1
rounded-full
bg-blue-500/10
text-blue-500
text-xs
">

Live

</div>


</div>





{
tasks.length===0 ?


<div className="
py-16
text-center
">


<div className="
mx-auto
w-16 h-16
rounded-2xl
bg-zinc-100
dark:bg-zinc-900
flex items-center justify-center
mb-4
">


<Clock
className="text-zinc-400"
size={30}
/>


</div>


<p className="
text-zinc-500
">

No recent activity

</p>


</div>


:


<div className="divide-y divide-zinc-200 dark:divide-zinc-800">


{
tasks.map(task=>{


const data =
typeIcons[task.type] || typeIcons.TASK;


const Icon=data.icon;



return (


<div

key={task.id}

className="
p-5
hover:bg-zinc-50
dark:hover:bg-zinc-900
transition
group
"


>


<div className="flex gap-4">



{/* ICON */}

<div className={`
w-11 h-11
rounded-xl
flex items-center justify-center
${data.bg}
`}>

<Icon
size={20}
className={data.color}
/>


</div>





<div className="flex-1">



<div className="
flex
justify-between
gap-3
mb-2
">


<h3 className="
font-medium
text-zinc-900
dark:text-white
truncate
">


{task.title}


</h3>




<span className={`
text-xs
px-3
py-1
rounded-full
${statusColors[task.status]}
`}>

{task.status.replace("_"," ")}


</span>


</div>





<div className="
flex flex-wrap
items-center
gap-3
text-xs
text-zinc-500
dark:text-zinc-400
">



<span className="
capitalize
">

{task.type.toLowerCase()}

</span>





{
task.assignee &&

<div className="
flex items-center gap-2
">


<div className="
w-6 h-6
rounded-full
bg-gradient-to-br
from-blue-500
to-purple-600
text-white
flex
items-center
justify-center
text-[10px]
">


{
task.assignee.name
?.charAt(0)
.toUpperCase()
}


</div>


{task.assignee.name}


</div>


}




<span>

{format(
new Date(task.updatedAt),
"MMM d, h:mm a"
)}

</span>



</div>



</div>


</div>


</div>


)

})

}



</div>


}



</div>


)

}


export default RecentActivity;