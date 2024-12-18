"use client";
import { useRouter } from "next/router";
import { Search } from "lucide-react";
import { useState, ChangeEvent } from "react";

interface iDefault {
    defaultString: string | null;
}

export default function SearchBar({ defaultString }: iDefault) {
    const router = useRouter();
    const [inputValue, setValue] = useState(defaultString);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setValue(inputValue);
    }

    const handleSearch = () => {
        if (inputValue) router.push(`/?q=${inputValue}`);
        if (!inputValue) router.push(`/`);
    }

    const handleKeyPress = (event: { key: any; }) => {

        if (event.key === "Enter") return handleSearch()

    }
    return (

        <div className="search__input border-[2px] border-solid border-slate-500 flex flex-row items-center gap-5 p-1 rounded-[15px]">

            <label htmlFor="inputId"><Search /></label>


            <input type="text"

                id="inputId"

                placeholder="Enter your keywords"

                value={inputValue ?? ""} onChange={handleChange}

                onKeyDown={handleKeyPress}

                className="bg-[transparent] outline-none border-none w-full py-3 pl-2 pr-3" />


        </div>)
}