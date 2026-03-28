"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"


const Navbar = () => {
    const { data: session } = useSession()


    return (
        <nav className="flex justify-between items-center p-4 border-b">
            <h1 className="text-xl font-black ">EcoTech Scheduler</h1>

            <div>
                {session ? (
                    <div className="flex items-center gap-4">
                        {/* <p>Hello, {session.user?.name}</p> */}
                        <div className="flex items-center gap-6 ">
                            <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600">Dashboard</Link>
                        </div>
                        {session.user?.image && (
                            <Image
                                src={session.user.image}
                                alt="Profile"
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                        )}
                        <button
                            onClick={() => signOut()}
                            className="bg-red-500 text-white px-4 py-2 rounded ">
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => signIn("google")}
                        className="bg-blue-600 text-white px-4 py-2 rounded ">
                        Sign In with Google
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar
