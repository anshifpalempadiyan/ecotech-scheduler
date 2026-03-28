"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"


const DashboardPage = () => {
    const { data : session , status } = useSession()

    const [ startTime , setStartTime ] = useState("09:00")
    const [ endTime , setEndTime ] = useState("17:00")

    if ( status === "loading" ) return <p className="p-10 text-center ">Loading...</p>

    if ( !session ) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-2xl font-bold text-red-600 ">Access Denied</h1>
                <p className="text-slate-600 ">Please sign in to manage your availability</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6 ">
            <header className="mb-8">
                <h1 className="text-3xl font-black ">Welcome, {session.user?.name}</h1>
                <p className="text-slate-500 ">Set your weekly availability below</p>
            </header>

            <div className="bg-white shadow-sm border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 ">Default Working Hours</h2>


                <div className="flex items-center gap-4 ">
                    <div className="flex flex-col gap-1">
                        <label  className="text-sm font-medium text-slate-700 ">Start Time</label>
                        <input type="time" value={startTime} onChange={ (e) => setStartTime(e.target.value)} className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                        
                    </div>
                    <span className="mt-6 text-slate-400">to</span>

                    <div className="flex flex-col gap-1 ">
                        <label  className="text-sm font-medium text-slate-700">End Time</label>
                        <input type="time" value={endTime} onChange={ (e) => setEndTime(e.target.value)} className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <button className="mt-6 bg-slate-900 text-white px-6 py-2 rounded-md hover:bg-slate-800 transition">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DashboardPage