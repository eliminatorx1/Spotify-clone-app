
"use client"
import Modal from "./Modal"

import { deflate } from "zlib"
import { useSession, useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"

import {Auth} from "@supabase/auth-ui-react"
import {ThemeSupa} from "@supabase/auth-ui-shared"
import { useRouter } from "next/navigation"
import UseAuthModal from "@/hooks/useAuthModal"
import { useEffect } from "react"


const AuthModal = ()=>{
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();
    const {onClose, isOpen} = UseAuthModal()

    useEffect(() =>{
        if(session){
            router.refresh();
            onClose();

        }

    }, [session, router, onClose]);

    const onChange = (open:boolean) =>{
        if(!open){
            onClose();
        }
    
    }




    return(
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen = {isOpen}
            onChange={onChange}

        >
            <Auth  //this will display the authentication page provided by the supabase client
            theme="dark"
            magicLink = {true} //this will send the link to the email for the login no need of password
            providers={["github", "facebook", "google"]} //this will provide the authentication providers
            supabaseClient={supabaseClient}
            appearance={{theme:ThemeSupa,
                variables:{
                    default:{
                        colors:{
                            brand:'#404040',
                            brandAccent:'#22c55e'
                        }
                    }
                }
            }}
            
            />
        </Modal>
    )
}

export default AuthModal;