import { FC, ReactNode } from "react"

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"


interface MainLayoutProps {
    children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                { children }
            </main>
            <Footer />
        </div>
    )
}