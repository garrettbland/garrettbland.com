import Link from 'next/link'

const Navbar = () => (
    <>
        <div className="flex justify-between items-center py-4">
            <Link href="/">
                <a className="text-xl hover:underline ">Garrett Bland</a>
            </Link>

            <div className="flex items-center flex-row">
                <Link href="https://github.com/garrettbland">
                    <a
                        className="transform ease-in-out duration-150 hover:rotate-25 origin-center mx-3"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img className="w-8 h-8" src="/images/github.png" alt="github-logo" />
                    </a>
                </Link>
                <Link href="https://twitter.com/gbland777">
                    <a
                        className="transform ease-in-out duration-150 hover:rotate-25 origin-center"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img className="w-8 h-8" src="/images/twitter.png" alt="twitter-logo" />
                    </a>
                </Link>
            </div>
        </div>
        <div className="h-px w-full bg-gray-200 mb-6"></div>
    </>
)

export default Navbar
