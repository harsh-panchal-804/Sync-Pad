"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon, XIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useSearchParam } from '@/hooks/use-search-params';
function SearchInput() {
    const [search,setSearch]=useSearchParam("search");
    const [value,setValue]=useState(search);
    const inputRef=useRef<HTMLInputElement>(null);
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(e.target.value)
    }
    const handleClear =()=>{
        setValue("");
        setSearch("");
        inputRef.current?.blur();
    }
    const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setSearch(value)
        inputRef.current?.blur();
    }
    return (
        <div className='flex-1 flex items-center justify-center'>

            <form 
            onSubmit={handleSubmit}
            className='relative max-w-[720px] w-full'>
                <Input placeholder='Search'
                    className='md:text-base placeholder:text-neutral-900 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)]
            bg-[#f0f4f8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white
            
            '
            value={value}
            onChange={handleChange}
            ref={inputRef}

                />
                <Button
                    type='submit'
                    variant="ghost"
                    className='absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full'
                    size="icon"
                >
                    <SearchIcon/>
                </Button>
                {value &&(
                    <Button
                    type='button'
                    variant="ghost"
                    className='absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full'
                    size="icon"
                    onClick={handleClear}
                >
                    <XIcon/>
                    
                </Button>

                )}



            </form>
        </div>
    )
}

export default SearchInput