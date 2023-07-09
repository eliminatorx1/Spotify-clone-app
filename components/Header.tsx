
"use client" //since it should be a server components
import { useRouter } from "next/navigation";
import {twMerge} from "tailwind-merge"
import{RxCaretLeft} from "react-icons/rx"
import{RxCaretRight} from "react-icons/rx"
import {HiHome} from "react-icons/hi"
import {BiSearch} from "react-icons/bi"
import Button from "./Button";
import UseAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";

//defining the props that the header will accept
interface HeaderProps{
    children:React.ReactNode;
    className?:string; //this means that the class name is optional and if provided then its type must be a string



}


const  Header: React.FC<HeaderProps> = ({
    children,
    className
}) =>{
    const authModal = UseAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const {user, subscription} = useUser();

    const handleLogout = async() =>{
        const {error} = await supabaseClient.auth.signOut();
        //reset any playing songs in the future

        router.refresh();
        if(error){
            console.log(error);

        }
       

    }
    return(
        // twMerge is used to merge the the clases that we define and the classes that we passed as props 
        <div className= {twMerge(`
        h-fit
        bg-gradient-to-b
        from-emerald-800
        p-6
        `,
        className
        )}>
            <div className="w-full
            mb-4
            flex
            items-center
            justify-between
            ">
                <div className="
                hidden
                md:flex
                gap-x-2
                items-center
                ">
                    <button
                    onClick={()=>router.back()}
                    className="
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition


                    ">
                        <RxCaretLeft className = "text-white" size={36}/>
                    </button>


                    <button 
                    onClick={()=>router.forward()}
                    className="
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                    ">
                        <RxCaretRight className = "text-white" size={36}/>
                    </button>

                </div>

                {/* this will be visible only on the mobile devices part  */}
                <div className="flex md:hidden gap-x-2 items-center">
                    <button
                    className="
                    rounded-full
                    p-2
                    bg-white
                    item-center
                    hover:opacity-75
                    transition
                    
                    "
                    >
                        <HiHome className="text-black" size={20}/>

                    </button>


                    <button
                    className="
                    rounded-full
                    p-2
                    bg-white
                    item-center
                    hover:opacity-75
                    transition

                    "
                    >
                        <BiSearch className="text-black" size={20}/>

                    </button>
                </div>
                <div 
                className="
                flex
                justify-between
                items-center
                gap-x-4
                "
                >{user?(
                    <div>Logged in</div>
                ):(
                    <>
                        <div>
                            {/* //custom button component that we have built */}
                            <Button
                            onClick={authModal.onOpen}
                            className="bg-transparent
                            text-Neutral-300
                            font-medium
                            ">
                            Sign Up

                            </Button>

                        </div>

                        <div>
                            {/* //custom button component that we have built */}
                            {/* login button  */}
                            <Button
                            onClick={authModal.onOpen}
                            className="bg-white
                            px-6
                            py-2
                            ">
                            Login

                            </Button>

                        </div>
                    </>
                )}

                </div>
            </div>
            {children}
        </div>
    )
}

export default Header;

