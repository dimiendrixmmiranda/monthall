interface MainProps {
    children: React.ReactElement
}

export default function Main({ children }: MainProps) {
    return (
        <main className="flex flex-col p-4 min-h-[80vh] md:p-8">
            {children}
        </main>
    )
}