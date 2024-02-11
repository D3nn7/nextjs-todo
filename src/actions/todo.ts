"use server";
import { DBTodoItem } from "@/lib/types";

export async function getAllTasks(): Promise<DBTodoItem[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_DB_ENDPOINT + '/tasks');
    const data = await response.json();
    return data as DBTodoItem[];
}

export async function removeTask(id: string) {
    await fetch(process.env.NEXT_PUBLIC_DB_ENDPOINT + '/tasks/' + id, {
        method: 'DELETE'
    });
}

export async function checkAsDone(task: DBTodoItem) {
    await fetch(process.env.NEXT_PUBLIC_DB_ENDPOINT + '/tasks/' + task.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
}

export async function recoverTask(task: DBTodoItem) {
    await fetch(process.env.NEXT_PUBLIC_DB_ENDPOINT + '/tasks/' + task.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
}

export async function add(task: DBTodoItem) {
    await fetch(process.env.NEXT_PUBLIC_DB_ENDPOINT + '/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
}