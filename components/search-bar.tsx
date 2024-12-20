"use client";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

interface iDefault {
    defaultString: string | null;
}

export default function SearchBar({ defaultString }: iDefault) {

    let inputValue = defaultString ?? "";

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputValue = e.target.value;
    }

    const handleSearch = () => {
        if (inputValue) redirect('student-view?searchQuery=' + inputValue);
        if (!inputValue) redirect('student-view');
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

                   defaultValue={inputValue ?? defaultString ?? ""} onChange={HandleChange}

                   onKeyDown={handleKeyPress}

                   className="bg-[transparent] outline-none border-none w-full py-3 pl-2 pr-3" />


        </div>)
}