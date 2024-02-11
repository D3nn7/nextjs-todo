"use client";

import { add, getAllTasks } from "@/actions/todo";
import MegaInput from "@/components/MegaInput";
import StickyBanner from "@/components/StickyBanner";
import TodoList from "@/components/Todo/TodoList";
import TodoLoading from "@/components/Todo/TodoLoading";
import { convertDbTaskListToUiList } from "@/lib/objectConverter";
import { DBTodoItem } from "@/lib/types";
import { Dayjs } from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string | URL) => fetch(url).then(r => r.json())

export default function Home() {
	const [userInputText, setUserInputText] = useState<string | null>(null)
	const [userInputDate, setUserInputDate] = useState<Dayjs | null>(null)
	const [userInputSubmit, setUserInputSubmit] = useState<boolean>(false)

	const [tasks, setTasks] = useState<DBTodoItem[]>([])

	const [blockUi, setBlockUi] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>("")

	const { data, error, isLoading } = useSWR<DBTodoItem[]>(process.env.NEXT_PUBLIC_DB_ENDPOINT + '/tasks', fetcher, {
		refreshInterval: 20000,
		revalidateOnFocus: true,
	})

	if (error) {
		console.log("Error fetching tasks", error);
	}

	useEffect(() => {
		if (!blockUi) {
			if (userInputSubmit) {
				if (userInputText && userInputText.trim().length > 0) {
					setBlockUi(true);

					const addTask = async () => {
						await add({ text: userInputText, due: userInputDate?.toString(), done: false } as DBTodoItem);

						//FIXME: DO NOT WORK!
						const tasks = await getAllTasks();
						setTasks(tasks);
						setUserInputDate(null);
						setUserInputText(null);
						setUserInputSubmit(false);
						setBlockUi(false);
					};

					addTask();
				} else {
					setErrorMessage("Please provide a specific todo.");
				}
			}
		}

		if (data) {
			setTasks(data);
		}
	}, [userInputSubmit, blockUi, data, tasks, userInputText, userInputDate]);

	//FIXME: Calendar content do not reset after submit
	return (
		<main className="flex flex-col justify-center w-4/5 mx-auto mt-20">
			<StickyBanner />
			<Image src="/logo.png" width={150} height={150} alt="Logo" className="self-center" />
			<div className="mt-4">
				<MegaInput 
					text={userInputText}
					date={userInputDate}
					submit={userInputSubmit}
					onTextChange={(text: string) => setUserInputText(text)} 
					onDateChange={(date: Dayjs) => setUserInputDate(date)} 
					onSend={() => setUserInputSubmit(true)}
				/>
				{errorMessage && <span className="text-red-400 text-sm">{error}</span>}
			</div>

			{isLoading ? 
			<div className="space-y-2 mt-20">
				<TodoLoading />
				<TodoLoading />
				<TodoLoading />
			</div>:
			<>
				{data === undefined ?
				<>
					<p>An error happend while getting youre tasks...</p>
				</>:
				<div className="mt-20 space-y-12">
					{tasks.length > 0 ? 
					<>
						<TodoList name="Tasks" items={convertDbTaskListToUiList(tasks).filter(item => item.done === false)} />
						<TodoList name="Already done" items={convertDbTaskListToUiList(tasks).filter(item => item.done === true)} />
					</> :
					<div className="text-center text-neutral-600 space-y-2">
						<p className="text-5xl">😕</p>
						<p className="text-xl">No tasks yet. Start creating some to get track about them.</p>
					</div>
					}
				</div>
				}
			</>
			}
		</main>
	);
}
