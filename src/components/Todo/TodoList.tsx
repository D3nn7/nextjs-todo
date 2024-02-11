"use client";

import { TodoList } from "@/lib/types";
import { useEffect, useState } from "react";
import Todo from "./Todo";

export default function TodoList({name, items}: TodoList) {
    const [currentlyShownItemSize, setCurrentlyShownItemSize] = useState(items.length > 5 ? 5 : items.length);
    const [todos, setTodos] = useState(items);

    //FIXME: WHEN LIST ITEMS REPLACES, currentlyShownItemSize MUST RECALCULATED
    useEffect(() => {
        setTodos(items);
    }, [items]);

    return (
        <div>
            <h2 className="text-2xl mb-2 capitalize">{name}</h2>
            
            <div className="mt-2 space-y-2">
                {todos.slice(0, currentlyShownItemSize).map((todo) => (
                    <Todo key={todo.id} {...todo} />
                ))}

                {currentlyShownItemSize < todos.length && (
                    <button onClick={() => setCurrentlyShownItemSize(currentlyShownItemSize + 5)} className="text-sm mt-2 underline">Show more</button>
                )}
            </div>
        </div>
    )
}