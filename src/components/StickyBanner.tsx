import { HeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";


export default function StickyBanner() {
    return (
        <div className="fixed top-0 start-0 z-50 flex justify-between w-full bg-neutral-900 text-neutral-300 text-sm p-4">
            <p className="flex flex-wrap items-center break-keep">This project was made with <HeartIcon className="w-4 h-4 text-red-600 ml-1 mr-1" /> by <Link className="underline ml-1" href={"https://danny.schapeit.com"} target="_blank">Danny Schapeit</Link>. Visit project on <Link className="underline ml-1" href={"https://github.com/d3nn7/nextjs-todo"} target="_blank">Github</Link>.</p>
        </div>
    );
}