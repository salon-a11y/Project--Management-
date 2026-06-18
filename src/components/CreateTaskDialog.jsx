

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addTask } from "../features/workspaceSlice";


export default function CreateTaskDialog({
    showCreateTask,
    setShowCreateTask,
    projectId,
}) {


const dispatch = useDispatch();



const currentWorkspace = useSelector(
(state)=>state.workspace?.currentWorkspace || null
);



const project =
currentWorkspace?.projects.find(
(p)=>p.id===projectId
);



const teamMembers =
project?.members || [];




const [isSubmitting,setIsSubmitting] =
useState(false);



const [formData,setFormData]=useState({

title:"",
description:"",
type:"TASK",
status:"TODO",
priority:"MEDIUM",
assigneeId:"",
due_date:""

});






const handleSubmit = async(e)=>{


e.preventDefault();


try{


setIsSubmitting(true);



const assignee =
teamMembers.find(
(m)=>m.user.id===formData.assigneeId
);




const newTask={


id:crypto.randomUUID(),

projectId,

title:formData.title,

description:formData.description,

type:formData.type,

status:formData.status,

priority:formData.priority,


due_date:new Date(
formData.due_date
),


assigneeId:
formData.assigneeId,



assignee:{

id:assignee?.user?.id,

name:assignee?.user?.name,

email:assignee?.user?.email

},


createdAt:new Date()

};





dispatch(addTask(newTask));


toast.success(
"Task created successfully"
);




setFormData({

title:"",
description:"",
type:"TASK",
status:"TODO",
priority:"MEDIUM",
assigneeId:"",
due_date:""

});



setShowCreateTask(false);



}
catch(error){

toast.error(error.message);

}

finally{

setIsSubmitting(false);

}


};







if(!showCreateTask)
return null;





return (



<div className="

fixed inset-0

z-50

flex
items-center
justify-center


bg-black/70

backdrop-blur-md

">





<div className="

w-full

max-w-lg


p-6


rounded-2xl


bg-gradient-to-br

from-slate-900

via-slate-950

to-black


border

border-slate-800


shadow-2xl

shadow-blue-500/20


text-white

">






<h2 className="

text-2xl

font-bold

mb-6

text-white

">

Create New Task

</h2>








<form

onSubmit={handleSubmit}

className="space-y-5"

>






{/* Title */}


<div>


<label className="
text-sm
text-slate-300
">

Title

</label>



<input


value={formData.title}


onChange={(e)=>
setFormData({
...formData,
title:e.target.value
})
}


placeholder="Task title"


className="

mt-2

w-full

px-4

py-3


rounded-xl


bg-slate-800


border

border-slate-700


text-white


outline-none


focus:ring-2

focus:ring-blue-500

"

required

/>

</div>








{/* Description */}


<div>


<label className="
text-sm
text-slate-300
">

Description

</label>



<textarea


value={formData.description}


onChange={(e)=>
setFormData({
...formData,
description:e.target.value
})
}



placeholder="Describe the task"


className="

mt-2

w-full

h-24

px-4

py-3


rounded-xl


bg-slate-800


border

border-slate-700


text-white


outline-none


focus:ring-2

focus:ring-blue-500

"

/>


</div>







{/* Type Priority */}


<div className="grid grid-cols-2 gap-4">



<select

value={formData.type}

onChange={(e)=>
setFormData({
...formData,
type:e.target.value
})
}



className="
px-3
py-3

rounded-xl

bg-slate-800

border
border-slate-700

text-white

"

>


<option value="TASK">
Task
</option>


<option value="BUG">
Bug
</option>


<option value="FEATURE">
Feature
</option>


<option value="IMPROVEMENT">
Improvement
</option>


</select>






<select

value={formData.priority}

onChange={(e)=>
setFormData({
...formData,
priority:e.target.value
})
}


className="
px-3
py-3

rounded-xl

bg-slate-800

border
border-slate-700

text-white

"

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







{/* Member Status */}



<div className="grid grid-cols-2 gap-4">



<select


value={formData.assigneeId}


onChange={(e)=>
setFormData({
...formData,
assigneeId:e.target.value
})
}



className="
px-3
py-3

rounded-xl

bg-slate-800

border
border-slate-700

text-white

"

>


<option value="">
Select Member
</option>


{

teamMembers.map(
(member)=>(


<option

key={member.user.id}

value={member.user.id}

>

{member.user.name}

</option>


)

)

}


</select>






<select


value={formData.status}


onChange={(e)=>
setFormData({
...formData,
status:e.target.value
})
}



className="
px-3
py-3

rounded-xl

bg-slate-800

border
border-slate-700

text-white

"

>


<option value="TODO">
Todo
</option>


<option value="IN_PROGRESS">
In Progress
</option>


<option value="DONE">
Done
</option>


</select>



</div>








{/* Date */}


<div>


<label className="
text-sm
text-slate-300
">

Due Date

</label>



<div className="relative mt-2">


<CalendarIcon

className="
absolute
left-3
top-1/2
-translate-y-1/2

text-slate-400

"

size={18}

/>



<input

type="date"


value={formData.due_date}


onChange={(e)=>
setFormData({
...formData,
due_date:e.target.value
})
}



className="

w-full

pl-10

px-4

py-3


rounded-xl


bg-slate-800


border

border-slate-700


text-white

"




/>


</div>


</div>







{/* Buttons */}


<div className="

flex
justify-end
gap-3
pt-4

">



<button


type="button"


onClick={()=>
setShowCreateTask(false)
}



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


type="submit"


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


{
isSubmitting
?
"Creating..."
:
"Create Task"
}


</button>




</div>







</form>





</div>



</div>


);


}
