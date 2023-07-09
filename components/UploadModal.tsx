"use client"

import UseUploadModal from "@/hooks/useUplaodModal";
import Modal from "./Modal"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

import {toast} from "react-hot-toast"
import { useUser } from "@/hooks/useUser";
import { unique } from "next/dist/build/utils";
import uniqid from "uniqid"
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";


const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = UseUploadModal();
    const {user} = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { register,
        handleSubmit, reset } = useForm<FieldValues>({
            defaultValues: {
                author: '',
                title: '',
                song: null, //null is because these will not be string instead these will be the files
                image: null,



            }

        });




    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }

    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {

        try{
            setIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if(!imageFile || !songFile || !user){
                toast.error("missing fields");
                return;
            }
            const uniqueID= uniqid(); //we can use that to safely upload our song with a unique key
            //upload songs
            const {
                data:songData,
                error:songError,

            } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueID}`, songFile, {
                cacheControl:'3600', //this will keep the file in the cache for the 3600 seconds
                upsert:false //this will prevent the same already existing file form overwritten
            });
            if(songError){
                setIsLoading(false);
                return toast.error('Failed song upload')
            }
            //uplaod image
            const {
                data:imageData,
                error:imageError,

            } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueID}`, imageFile, {
                cacheControl:'3600', //this will keep the file in the cache for the 3600 seconds
                upsert:false //this will prevent the same already existing file form overwritten
            });

            if(imageError){
                setIsLoading(false);
                return toast.error("Failed image upload")
            }
            //crate record
            const {
                error: supabaseError


            } = await supabaseClient.from('songs').insert({
                user_id: user.id,
                title:values.title,
                author:values.author,
                image_path: imageData.path,
                song_path: songData.path

            });
            if(supabaseError){
                // setIsLoading(false);
                return toast.error(supabaseError.message);
            }
            router.refresh();
            setIsLoading(false);
            toast.success("new song added :)");
            reset();
            uploadModal.onClose();






        } catch(error){
            toast.error("something went wrong :(")

        } finally{
            setIsLoading(false);

        }
        


    }
    return (
        <Modal
            title="Add a Song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}

        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                 flex flex-col gap-y-4

                "
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true})}
                    placeholder="Song title"

                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Singer"

                />
                <div>
                    <div className="pb-1">
                        select a file

                    </div>
                    <Input
                        id="song" //jo name yahan hai vahi name register me likhna hai
                        type="file"
                        accept=".mp3" //this will accept only mp3 file
                        disabled={isLoading}
                        {...register('song', { required: true })}


                    />
                </div>
                <div>
                    <div className="pb-1">
                        select an image

                    </div>
                    <Input
                        id="image" //jo name yahan hai vahi name register me likhna hai
                        type="file"
                        accept="image/*" //this will accept only image file, * means user can pick all types of the image file

                        disabled={isLoading}
                        {...register('image', { required: true })}
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Create

                </Button>
            </form>
        </Modal>
    )
}

export default UploadModal;
