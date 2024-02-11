"use client";

import { checkAsDone, recoverTask, removeTask } from "@/actions/todo";
import { DBTodoItem, TodoItem } from "@/lib/types";
import { ArrowUturnLeftIcon, CalendarDaysIcon, CheckIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Todo({ id, created, text, due, done }: TodoItem) {

    async function handleRecover() {
        if (done) {
            await recoverTask({ id: id, created: created.toString(), text: text, due: due?.toString(), done: false } as DBTodoItem);
        }
    }

    async function handleCheckAsDone() {
        if (!done) {
            await checkAsDone({ id: id, created: created.toString(), text: text, due: due?.toString(), done: true } as DBTodoItem);
        }
    }

    async function handleRemove() {
        await removeTask(id);
    }

    return(
        <div className="px-4 py-2.5 md:flex group rounded-lg hover:bg-neutral-900 hover:text-neutral-300 hover-animation">
            <div className="w-full">
                <h3 className="text-base select-text">{text}</h3>
                {due && <p className="text-sm mt-1 flex items-center"><CalendarDaysIcon className="w-4 h-4 mr-1" /> due: {due.format("DD.MM.YYYY")}</p>}
            </div>
            <div className="flex">
                {done ? 
                    <button onClick={() => handleRecover()} className="text-sm hover:text-neutral-500 p-2 opacity-0 group-hover:opacity-100 hover-animation">
                        <ArrowUturnLeftIcon className="w-5 h-5" />
                    </button> 
                :
                <button onClick={() => handleCheckAsDone()} className="text-sm hover:text-green-500 p-2 opacity-0 group-hover:opacity-100 hover-animation">
                    <CheckIcon className="w-5 h-5" />
                </button>
                }
                <button onClick={() => handleRemove()} className="text-sm hover:text-red-600 p-2 opacity-0 group-hover:opacity-100 hover-animation">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}