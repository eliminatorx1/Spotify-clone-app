"use client"
import { Song } from "@/types"
import SongItem from "@/components/SongItem";
import useOnplay from "@/hooks/useOnPlay";
interface pageContentProps{
    songs:Song[];

}

const PageContent:React.FC<pageContentProps>= ({
    songs
}) =>{
    const onPlay = useOnplay(songs);
    if(songs.length === 0){
        return (
            <div className="mt-4 text-neutral-400">
                No Songs Available
            </div>
        )
    }
    return(
        <div
            className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-8
            gap-4
            mt-4
            "
        >
            {songs.map((item)=>(
                <SongItem
                onClick={(id: string)=>onPlay(id)}
                data = {item}
                key = {item.id}
                />
            ))}
            
        </div>

    );
}

export default PageContent;