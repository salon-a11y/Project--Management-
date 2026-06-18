
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTask, updateTask } from "../features/workspaceSlice";
import {
  Bug,
  CalendarIcon,
  GitCommit,
  MessageSquare,
  Square,
  Trash,
  XIcon,
  Zap
} from "lucide-react";


const typeIcons = {
  BUG: { icon: Bug, color: "text-red-500" },
  FEATURE: { icon: Zap, color: "text-blue-500" },
  TASK: { icon: Square, color: "text-green-500" },
  IMPROVEMENT: { icon: GitCommit, color: "text-purple-500" },
  OTHER: { icon: MessageSquare, color: "text-orange-500" },
};


const priorityTexts = {
 LOW:{
  background:"bg-red-500/10",
  prioritycolor:"text-red-500"
 },
 MEDIUM:{
  background:"bg-blue-500/10",
  prioritycolor:"text-blue-500"
 },
 HIGH:{
  background:"bg-green-500/10",
  prioritycolor:"text-green-500"
 }
};


const ProjectTasks = ({tasks})=>{

const dispatch = useDispatch();
const navigate = useNavigate();

const [selectedTasks,setSelectedTasks]=useState([]);

const [filters,setFilters]=useState({
 status:"",
 type:"",
 priority:"",
 assignee:""
});


const assigneeList = useMemo(
()=>Array.from(new Set(
 tasks.map(t=>t.assignee?.name).filter(Boolean)
)),[tasks]);


const filteredTasks = useMemo(()=>{

return tasks.filter(task=>{

return (
(!filters.status || task.status===filters.status)&&
(!filters.type || task.type===filters.type)&&
(!filters.priority || task.priority===filters.priority)&&
(!filters.assignee || task.assignee?.name===filters.assignee)
)

})

},[filters,tasks])



const handleFilterChange=(e)=>{

setFilters({
 ...filters,
 [e.target.name]:e.target.value
})

}



const handleStatusChange=async(id,status)=>{

toast.loading("Updating...")

await new Promise(r=>setTimeout(r,1000))

let updated = structuredClone(
 tasks.find(t=>t.id===id)
)

updated.status=status;

dispatch(updateTask(updated))

toast.dismiss();

toast.success("Updated")

}



const handleDelete=()=>{

if(!window.confirm("Delete selected tasks?"))
return;


dispatch(deleteTask(selectedTasks));

toast.success("Deleted");

}



return (

<div className="space-y-5">


{/* FILTERS */}

<div className="flex flex-wrap gap-3">


{
["status","type","priority","assignee"].map(name=>(

<select
key={name}
name={name}
onChange={handleFilterChange}
className="
bg-white dark:bg-zinc-900
border border-zinc-200 dark:border-zinc-700
rounded-xl px-4 py-2
text-sm
outline-none
shadow-sm
focus:ring-2 focus:ring-blue-500
"
>


<option value="">
All {name}
</option>


{
(name==="status"?
["TODO","IN_PROGRESS","DONE"]:
name==="type"?
["TASK","BUG","FEATURE","IMPROVEMENT"]:
name==="priority"?
["LOW","MEDIUM","HIGH"]:
assigneeList
)
.map(x=>

<option key={x} value={x}>
{x}
</option>

)

}

</select>


))

}



{
Object.values(filters).some(Boolean)&&

<button

onClick={()=>setFilters({
status:"",
type:"",
priority:"",
assignee:""
})}

className="
flex items-center gap-2
px-4 py-2
rounded-xl
bg-purple-500
text-white
text-sm
"

>

<XIcon size={15}/>
Reset

</button>


}


{
selectedTasks.length>0&&

<button

onClick={handleDelete}

className="
flex items-center gap-2
px-4 py-2
rounded-xl
bg-red-500
text-white
text-sm
"

>

<Trash size={15}/>
Delete

</button>

}


</div>





{/* TABLE CARD */}

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


<div className="overflow-x-auto">


<table className="w-full text-sm">


<thead className="
bg-zinc-100
dark:bg-zinc-900
text-zinc-500
">

<tr>

<th className="p-4"> </th>
<th className="p-4 text-left">Title</th>
<th className="p-4">Type</th>
<th className="p-4">Priority</th>
<th className="p-4">Status</th>
<th className="p-4">User</th>
<th className="p-4">Date</th>


</tr>


</thead>



<tbody>


{
filteredTasks.map(task=>{

const {icon:Icon,color}=typeIcons[task.type];

const {
background,
prioritycolor
}=priorityTexts[task.priority];

return (

<tr

key={task.id}

onClick={()=>
navigate(`/taskDetails?projectId=${task.projectId}&taskId=${task.id}`)
}

className="
border-t
border-zinc-200
dark:border-zinc-800
hover:bg-blue-50
dark:hover:bg-zinc-900
cursor-pointer
transition
"


>


<td className="p-4">

<input
type="checkbox"

checked={selectedTasks.includes(task.id)}

onChange={(e)=>{

e.stopPropagation();

selectedTasks.includes(task.id)

?
setSelectedTasks(
selectedTasks.filter(x=>x!==task.id)
)

:

setSelectedTasks([
...selectedTasks,
task.id
])

}}

 />

</td>



<td className="p-4 font-medium">
{task.title}
</td>



<td className="p-4">

<div className="flex gap-2 items-center">

<Icon size={16} className={color}/>

<span className={color}>
{task.type}
</span>

</div>

</td>




<td>

<span className={`
px-3 py-1 rounded-full
text-xs
${background}
${prioritycolor}
`}>

{task.priority}

</span>

</td>




<td>


<select

value={task.status}

onChange={(e)=>{

e.stopPropagation();

handleStatusChange(
task.id,
e.target.value
)

}}

className="
rounded-lg
bg-zinc-100
dark:bg-zinc-800
px-2 py-1
outline-none
"


>


<option>TODO</option>
<option>IN_PROGRESS</option>
<option>DONE</option>


</select>


</td>




<td>

<div className="flex gap-2 items-center">

<img

src={task.assignee?.image}

className="w-7 h-7 rounded-full"

/>

{task.assignee?.name}

</div>

</td>




<td>


<div className="flex gap-2 items-center">

<CalendarIcon size={15}/>

{format(
new Date(task.due_date),
"dd MMM"
)}

</div>


</td>



</tr>


)

})

}



</tbody>



</table>


</div>


</div>


</div>

)

}


export default ProjectTasks;