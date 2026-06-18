

import { useState } from "react";
import {
    SearchIcon,
    PanelLeft,
    MoonIcon,
    SunIcon
} from "lucide-react";

import {
    useDispatch,
    useSelector
} from "react-redux";


import { toggleTheme } from "../features/themeSlice";


import {
    SignedIn,
    SignedOut,
    UserButton,
    SignInButton,
} from "@clerk/clerk-react";




const Navbar = ({
    setIsSidebarOpen,
    projects=[]
}) => {



const dispatch = useDispatch();


const {theme} =
useSelector(
(state)=>state.theme
);



const [search,setSearch]=
useState("");




const filteredProjects =
projects.filter(
(project)=>

project.title
?.toLowerCase()
.includes(
search.toLowerCase()
)

);





return (


<div

className="

w-full

px-5
xl:px-16
py-4


bg-gradient-to-r
from-slate-950
via-slate-900
to-black


border-b
border-slate-800


shadow-lg

"

>


<div className="

flex
items-center
justify-between

max-w-7xl
mx-auto

">





{/* LEFT */}

<div className="

flex
items-center
gap-4
flex-1

">





{/* Sidebar Button */}


<button


onClick={()=>
setIsSidebarOpen(
prev=>!prev
)
}


className="

sm:hidden

p-2

rounded-xl

bg-slate-800

text-blue-400

hover:bg-slate-700

transition

"

>


<PanelLeft size={20}/>


</button>







{/* Search */}



<div className="

relative
w-full
max-w-sm

">


<SearchIcon

className="

absolute

left-3

top-1/2

-translate-y-1/2

text-slate-400

"

size={16}

/>




<input


type="text"


placeholder="Search projects..."


value={search}


onChange={(e)=>
setSearch(e.target.value)
}



className="

w-full

pl-10
pr-4
py-2.5


rounded-xl


bg-slate-800


border
border-slate-700


text-white


placeholder:text-slate-500


outline-none


focus:ring-2
focus:ring-blue-500


transition

"


/>





{/* Search Dropdown */}



{
search && (


<div

className="

absolute

top-12

left-0

w-full


rounded-xl


bg-slate-900


border
border-slate-700


shadow-2xl


z-50


overflow-hidden

"

>



{
filteredProjects.length>0 ?


filteredProjects.map(
(project,index)=>(


<div

key={index}


className="

px-4
py-3


text-sm

text-white


hover:bg-blue-500/20


cursor-pointer


transition

"

>

{project.title}


</div>


)


)

:

(

<div

className="

px-4
py-3

text-sm

text-slate-400

"

>

No project found

</div>

)

}



</div>


)

}




</div>



</div>







{/* RIGHT */}



<div className="

flex
items-center
gap-3

">






{/* Theme */}



<button


onClick={()=>
dispatch(toggleTheme())
}



className="

w-10
h-10


flex
items-center
justify-center


rounded-xl


bg-slate-800


border
border-slate-700


hover:scale-105


transition

"

>



{

theme==="light"

?

(

<MoonIcon

size={18}

className="text-blue-400"

/>

)

:

(

<SunIcon

size={18}

className="text-yellow-400"

/>

)

}



</button>








{/* Login */}



<SignedOut>


<SignInButton>


<button

className="

px-4
py-2


rounded-xl


bg-gradient-to-r

from-blue-500

to-indigo-600


text-white


text-sm


font-medium


hover:scale-105


transition

"

>

Login

</button>


</SignInButton>


</SignedOut>






<SignedIn>


<div className="

p-1

rounded-xl

bg-slate-800

">


<UserButton />

</div>


</SignedIn>





</div>





</div>


</div>


);

};



export default Navbar;