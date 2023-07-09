"use client"

import {Toaster} from "react-hot-toast";
import { deflate } from "zlib";

const ToasterProvider = () =>{
    return (
        <Toaster
         toastOptions={{
            style:{
                background:'#333',
                color:'#fff'
            }
         }}
        />
    )
}

export default ToasterProvider;