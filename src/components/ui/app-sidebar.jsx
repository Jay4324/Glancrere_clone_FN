import { Calendar, LayoutDashboard, CirclePlay ,NotebookPen , Info , Settings,UserCog  } from "lucide-react"
import { Link } from "react-router-dom"
import Img from "../../static/download.png"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Automation",
    url: "#",
    icon: CirclePlay ,
  },
  {
    title: "Reports",
    url: "#",
    icon: NotebookPen ,
  },
  {
    title: "Accounts",
    url: "#",
    icon: UserCog ,
  },
  {
    title: "Name Formate Setting",
    url: "#",
    icon: Settings,
  },
  {
    title: "Help",
    url: "#",
    icon: Info,
  },
]

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarContent className="bg-white">
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
            <div className="my-1  flex justify-center items-center" >
                  {/* <SidebarMenuButton asChild  className="px-4 hover:bg-blue-700 hover:text-white pt-6 pb-6"> */}
                   <img src={Img} className="w-48 h-24"/>
                  {/* </SidebarMenuButton> */}
                </div>
            
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="my-1 " >
                  <SidebarMenuButton asChild  className="px-4 hover:bg-blue-700 hover:text-white pt-6 pb-6">
                    <Link href={item.url} >
                      <item.icon  style={{height:"28px",width:"30px"}} />
                      <span className="text-base font-bold ">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
