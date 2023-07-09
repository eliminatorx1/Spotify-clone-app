"use client"

import UseUploadModal from "@/hooks/useUplaodModal";
import Modal from "./Modal"
import {FieldValues, useForm, SubmitHandler} from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
const UploadModal = ()=>{
    const [isLoading, setIsLoading] = useState();
    const uploadModal = UseUploadModal();
    const {register,
    handleSubmit, reset} = useForm<FieldValues>({
        defaultValues:{
            author:'',
            title:'',
            song : null, //null is because these will not be string instead these will be the files
            image: null



        }

    })




    const onChange = (open: boolean) =>{
        if(!open){
            reset();
            uploadModal.onClose();
        }

    }

    const onSubmit:SubmitHandler<FieldValues> =async(values) =>{
        //upload to the supabase


    }
    return (
        <Modal
        title = "Add a Song"
        description="Upload an mp3 file"
        isOpen = {uploadModal.isOpen}
        onChange={onChange}

        >
           <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                 flex flex-col gap-y-4

                "
           >
            <Input
              id = "title"
              disabled = {isLoading}
              {...register('title', {required: true})}
              placeholder = "Song title"

            />
            <Input
              id = "author"
              disabled = {isLoading}
              {...register('author', {required: true})}
              placeholder = "Singer"

            />
            <div>
                <div className="pb-1">
                    select a file

                </div>
                <Input
                    id = "song" //jo name yahan hai vahi name register me likhna hai
                    type="file"
                    accept=".mp3" //this will accept only mp3 file
                    disabled = {isLoading}
                    {...register('song', {required: true})}
                   

                />

            </div>
            

           </form>
        </Modal>
    )
}

export default UploadModal;
