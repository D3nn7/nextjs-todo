import { Dayjs } from "dayjs";

export interface TodoList {
    name: string;
    items: TodoItem[];
}

export interface TodoItem {
    id: string;
    created: Dayjs;
    text: string;
    due: Dayjs | null;
    done: boolean;
}

export interface DBTodoItem {
    id?: string;
    created: string;
    text: string;
    due: string | null;
    done: boolean;
}