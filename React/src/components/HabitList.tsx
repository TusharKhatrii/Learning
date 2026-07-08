import { Button } from './Button'
import {eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns'
export function HabitList() {
    const habits = [
        { id: "1", name: "Habit 1 " },
        { id: "2", name: "Habit 2 " },
        { id: "3", name: "Habit 3 " }
    ];

    if (habits.length === 0) {

        return <h1 className="text-center text-zinc-400 py-12"> No Habits yet</h1>
    }

    return <div className="flex flex-col gap-3">
        {habits.map(habit => (
            <HabitItem key={habit.id} habit={habit} />
        ))}
    </div>
}

type HabitItemProps = {
    habit: { id: string; name: string };
}

function HabitItem({ habit }: HabitItemProps) {
    const visibleDates = eachDayOfInterval({
        start: startOfWeek(new Date(), {weekStartsOn : 1}),
        end: endOfWeek(new Date())
    })
    return (
        <div className="rounded-xl bg-zinc-800 p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    <span className="font-medium">
                        {habit.name}
                    </span>
                    <span className="text-sm text-amber-400"> 🤩 3</span>
                </div>
                <div className="flex gap-5">
                    <Button >Delete</Button>
                </div>
            </div>
            <div className="flex gap-1.5">
                {visibleDates.map(date => (
                    <Button key={date.toISOString()}>
                        <span className='font-medium'>{format(date, "EEE")}</span>
                        <span> {format(date,"d")} </span>
                    </Button>
                ))}
            </div>
        </div>
    )
}