interface MainProps {
    children: React.ReactElement
}

export default function Main({ children }: MainProps) {
    return (
        <main className="overflow-hidden min-h-[100vh] flex justify-center xl:min-h-[80vh]">
            {children}
        </main>
    )
}