import { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="relative">
            <main className="relative z-20 mx-auto max-w-5xl">
                {children}
            </main>
            {/* Random shapes */}
            {/* Overlay */}
            <div className="absolute z-10 top-0 left-0 w-full h-full bg-red-800 bg-opacity-50"></div>
        </div>
    )
}

export default Layout
