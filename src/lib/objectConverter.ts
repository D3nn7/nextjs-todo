import dayjs from "dayjs"
import { DBTodoItem, TodoItem, TodoList } from "./types"

export function convertDbTaskListToUiList(data: DBTodoItem[]): TodoItem[] {
    return data.map((item) => {
        return {
            id: item.id,
            created: dayjs(item.created),
            text: item.text,
            due: item.due ? dayjs(item.due) : null,
            done: item.done
        }
    }).sort((a, b) => {
        const dateA = a.due ? a.due : a.created;
        const dateB = b.due ? b.due : b.created;
        return dateA.diff(dateB);
    });
}