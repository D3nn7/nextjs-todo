export default function TodoLoading() {
    return(
        <div className="px-4 py-2.5 h-14 md:flex group rounded-lg bg-neutral-900">
            <div className="w-full flex space-x-3 items-center animate-pulse">
                <div className="h-3 w-3 rounded-full bg-neutral-700"/>
                <div className="h-3 w-3 rounded-full bg-neutral-700"/>
                <div className="h-3 w-3 rounded-full bg-neutral-700"/>
            </div>
        </div>
    )
}