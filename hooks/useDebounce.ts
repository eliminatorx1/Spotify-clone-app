import { useEffect, useState } from "react";

//debouncing is to prevent refreshing of the page with each single input the user types

function useDebounce<T>(value:T, delay?:number):T{
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(()=>{
        const timer = setTimeout(() => {
            setDebouncedValue(value);
            
        }, delay||500);
        return ()=>{
            clearTimeout(timer);
        }

    }, [value, delay])
    return debouncedValue;

}

export default useDebounce;