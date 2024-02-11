"use client";

import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import DatePicker from "tailwind-datepicker-react"
import { IOptions } from "tailwind-datepicker-react/types/Options";

interface Props {
    text: string | null;
    date: Dayjs | null;
    submit: boolean | null;
    onTextChange: (text: string) => void;
    onDateChange: (date: Dayjs) => void;
    onSend: () => void;
}


export default function MegaInput({text, date, submit, onTextChange, onDateChange, onSend}: Props) {
    const today = dayjs();

    const dateInputConfiguration = {
        title: "When should this task be done?",
        autoHide: true,
        todayBtn: true,
        clearBtn: false,
        clearBtnText: "Reset",
        maxDate: today.add(100, "year").toDate(),
        minDate: today.subtract(1, "day").toDate(),
        theme: {
            background: "dark:bg-neutral-800",
            todayBtn: "",
            clearBtn: "",
            icons: "bg-neutral-700/30 hover:bg-neutral-700/50 dark:hover:bg-neutral-700/50 dark:bg-neutral-700/30",
            text: "text-neutral-400 dark:text-neutral-400",
            disabledText: "bg-neutral-700/30 text-neutral-600 dark:text-neutral-600 dark:bg-neutral-700/30 hover:bg-neutral-700/10 dark:hover:bg-neutral-700/10", 
            input: "",
            inputIcon: "",
            selected: "button",
        },
        icons: {
            prev: () => <ChevronLeftIcon className="w-3 h-3" />,
            next: () => <ChevronRightIcon className="w-3 h-3" />,
        },
        datepickerClassNames: "right-2",
        defaultDate: today.toDate(),
        language: "en",
        disabledDates: [],
        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
    } as IOptions

    const [show, setShow] = useState(false)
    const [dueDate, setDueDate] = useState<null | Dayjs>(date)
	const handleChange = (selectedDate?: Date) => {
        setDueDate(dayjs(selectedDate))
        onDateChange(dayjs(selectedDate))
        setShow(false)
	}
	const handleClose = (state: boolean) => {
		setShow(state)
	}

    return(
        <div className="w-full h-12 items-center rounded-lg px-3 py-2 flex border border-neutral-700 space-x-2">
            <input
                className="bg-transparent -m-1 w-full placeholder:text-neutral-600 text-neutral-300 focus:outline-none"
                placeholder="What needs to be done?"
                type="text"
                value={text ? text : ""}
                onChange={(e) => onTextChange(e.target.value)}
            />
            <div className="space-x-4 flex">
                <DatePicker options={dateInputConfiguration} onChange={handleChange} show={show} setShow={handleClose} classNames="w-fit">
                    <div className="flex space-x-1">
                        {dueDate && <p onClick={() => setDueDate(null)} className="text-neutral-400 cursor-pointer hover:line-through">{dueDate.format("DD.MM.YYYY")}</p>}
                        <CalendarDaysIcon onClick={() => setShow(!show)} className="w-6 h-6 text-neutral-200 hover:text-neutral-400 cursor-pointer" />
                    </div>
                </DatePicker>
                <button onClick={() => submit ? {} : onSend()} className="text-neutral-200"><PaperAirplaneIcon className="w-6 h-6 text-neutral-200 hover:text-neutral-400" /></button>
            </div>
        </div>
    )
}