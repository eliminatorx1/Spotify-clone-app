import { IconType } from "react-icons";
import Link from "next/link";
import {twMerge} from "tailwind-merge"

interface sidebarItemProps{ //this is done to define teh type of props and their data type that this component will accept

    icon:IconType;
    label:string;
    active?:boolean;
    href: string

}


const SidebarItem:React.FC<sidebarItemProps> = ({
    //extracting the props
    icon : Icon,//remapping th icon prop
    label,
    active,
    href
}) =>{
    return (
        <Link href={href}
        className={twMerge(
            `flex
            flex-row
            h-auto
            items-center
            w-full
            gap-x-4
            text-md
            font-medium
            cursor-pointer
            hover:text-white
            transition
            text-neutral-400 
            py-1
            `,
            active && "text-white"
        )}>
            <Icon size={26}/>
            <p className="truncate w-full">{label}</p>
        </Link>
            
       
    )
}
export default SidebarItem;