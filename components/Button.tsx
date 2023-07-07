import { forwardRef } from "react";
import {twMerge} from "tailwind-merge"
//forward ref is a utility function provided by React that enables the forwarding of refs from a parent component to a child
//component

// By extending ButtonHTMLAttributes<HTMLButtonElement>, the ButtonProps interface inherits all the available props that can be used with an HTML button element, such as onClick, type, disabled, and others. This allows you to pass those props to the component implementing the ButtonProps interface without explicitly redefining them.


interface ButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement>{

}


const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) =>{
    return (
        <button
        type = {type}
        className={twMerge(`
        w-full
        rounded-full
        bg-green-500
        border
        border-transparent
        px-3
        py-3
        disabled:cursor-not-allowed
        disabled:opacity-50
        text-black
        font-bold
        hover:opacity-75
        transition
        `, className)} 
        disabled = {disabled}
        ref = {ref}
        {...props}
        >
            {children}

        </button>
    )
})
Button.displayName = "Button";

export default Button;