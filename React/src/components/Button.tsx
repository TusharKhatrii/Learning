import type { ReactNode } from "react"

type ButtonProps = {
    children: ReactNode
}
export function Button({children}: ButtonProps) {
    return <button className="bg-blue-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-8 rounded-l"> {children} </button>
}