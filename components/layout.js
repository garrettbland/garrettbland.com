import Navbar from './navbar'
export default function Layout({ children }) {
    return (
        <div className="max-w-xl mx-auto">
            <Navbar />
            {children}
        </div>
    )
}
