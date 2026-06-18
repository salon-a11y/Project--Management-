

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Calendar,
    UsersIcon,
    FolderOpen
} from "lucide-react";

import { format } from "date-fns";
import { useSelector } from "react-redux";
import CreateProjectDialog from "./CreateProjectDialog";



const ProjectOverview = () => {



const statusColors={


PLANNING:
"bg-slate-700/50 text-slate-300 border-slate-600",


ACTIVE:
"bg-emerald-500/20 text-emerald-400 border-emerald-500/30",


ON_HOLD:
"bg-yellow-500/20 text-yellow-400 border-yellow-500/30",


COMPLETED:
"bg-blue-500/20 text-blue-400 border-blue-500/30",


CANCELLED:
"bg-red-500/20 text-red-400 border-red-500/30"


};





const priorityColors={


LOW:
"border-slate-500",


MEDIUM:
"border-yellow-400",


HIGH:
"border-red-400"


};







const currentWorkspace =
useSelector(
(state)=>state?.workspace?.currentWorkspace || null
);





const [isDialogOpen,setIsDialogOpen]=
useState(false);



const [projects,setProjects]=
useState([]);






useEffect(()=>{


setProjects(
currentWorkspace?.projects || []
);


},[currentWorkspace]);








if(!currentWorkspace)
return null;







return (



<div

className="

rounded-2xl


bg-gradient-to-br

from-slate-900

via-slate-950

to-black


border

border-slate-800


shadow-xl


overflow-hidden

"

>







{/* Header */}



<div

className="

flex

justify-between

items-center


p-5


border-b

border-slate-800

"

>



<h2 className="

text-xl

font-semibold

text-white

">

Project Overview

</h2>





<Link

to="/projects"

className="

flex

items-center

gap-2


text-sm

text-blue-400


hover:text-blue-300

transition

"

>

View all

<ArrowRight size={16}/>

</Link>



</div>









<div>





{
projects.length===0

?

(


<div className="

p-12

text-center

"


>


<div className="

w-20

h-20


mx-auto

rounded-full


bg-blue-500/20


flex

items-center

justify-center

mb-5

"


>


<FolderOpen

size={35}

className="text-blue-400"

/>


</div>





<p className="

text-slate-400

"

>

No projects yet

</p>





<button


onClick={()=>
setIsDialogOpen(true)
}


className="

mt-5

px-5

py-2.5


rounded-xl


bg-gradient-to-r

from-blue-500

to-indigo-600


text-white


hover:scale-105


transition

"

>


Create your First Project


</button>





<CreateProjectDialog

isDialogOpen={isDialogOpen}

setIsDialogOpen={setIsDialogOpen}

/>





</div>



)

:

(


<div className="divide-y divide-slate-800">


{

projects
.slice(0,5)
.map((project)=>(





<Link


key={project.id}


to={`/projectsDetail?id=${project.id}&tab=tasks`}


className="

block

p-6


hover:bg-slate-900/60


transition

"

>








<div className="

flex

justify-between

items-start

mb-4

">





<div>


<h3 className="

text-lg

font-semibold

text-white


hover:text-blue-400

transition

">


{project.name}


</h3>





<p className="

text-sm

text-slate-400

mt-1

line-clamp-2

">


{
project.description ||
"No description"
}


</p>


</div>







<div className="

flex

gap-3

items-center

">


<span


className={`

px-3

py-1


rounded-full

text-xs

border

${statusColors[project.status]}

`}

>


{
project.status
.replace("_"," ")
}



</span>





<div

className={`

w-3

h-3


rounded-full

border-2


${priorityColors[project.priority]}

`}

/>





</div>





</div>









{/* Info */}





<div className="

flex

gap-5

text-xs

text-slate-400

mb-5

">


{

project.members?.length>0 &&


<div className="flex gap-1 items-center">


<UsersIcon size={14}/>


{project.members.length}
members


</div>


}





{

project.end_date &&


<div className="flex gap-1 items-center">


<Calendar size={14}/>


{
format(
new Date(project.end_date),
"MMM d, yyyy"
)
}


</div>


}




</div>










{/* Progress */}



<div className="space-y-2">


<div className="

flex

justify-between

text-xs

">


<span className="text-slate-400">

Progress

</span>



<span className="text-blue-400">

{
project.progress || 0
}%

</span>


</div>






<div className="

h-2

bg-slate-800

rounded-full

overflow-hidden

">


<div

className="

h-full


bg-gradient-to-r

from-blue-500

to-indigo-600


rounded-full

"

style={{

width:
`${project.progress || 0}%`

}}


/>


</div>


</div>







</Link>




))


}


</div>


)

}





</div>







</div>


);

};


export default ProjectOverview;