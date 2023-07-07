"use client"
import Router from "next/router";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ListItemProps{
    image: string;
    name: string;
    href: string;
}



const ListItem:React.FC<ListItemProps> = ({
    image,
    name,
    href
}) =>{
    const router = useRouter();
    const onClick = () =>{
        //Add authentication before push
        router.push(href);

    }

    return (
        //this is an html button and not our custom button

        <button
        
        className="
         relative
         group
         flex
         items-center
         rounded-md
         overflow-hidden
         gap-x-4
         bg-neutral-100/10
         hover:bg-neutral-100/20
         transition
         pr-4
        "
        >
            <div className="
             relative
             flex
             min-h-[64px]
             min-w[64px]

            ">
                <Image
                className="
                object-cover"
                src = {image}
                width={60}
                height={40}
                
                alt = "Image" 
                />
            </div>
            <p>{name}</p>

        </button>
        
    )
}

export default ListItem;