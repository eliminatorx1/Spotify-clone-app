import { Song } from "@/types";
import usePlayer from "./usePlayer";
import UseAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnplay = (songs:Song[])=>{
    const player = usePlayer();
    const authModal = UseAuthModal();
    const {user} = useUser();

    const Onplay = (id:string)=>{
        if(!user){
            return authModal.onOpen();
        }

        player.setId(id);
        player.setIds(songs.map((song)=>song.id))
    };
    return Onplay;

}

export default useOnplay;