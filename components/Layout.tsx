import { ReactNode } from 'react'
import Navbar from './Navbar'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => (
    <div className="max-w-xl mx-auto px-4 md:px-0 mb-24">
        <Navbar />
        {children}
    </div>
)

export default Layout
