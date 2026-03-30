"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getUpcomingBookings } from "../actions/getBooking"
import BookingList from "../componenets/BookingList"

const DashboardPage =  () => {
    const { data: session, status } = useSession()

    const [startTime, setStartTime] = useState("09:00")
    const [endTime, setEndTime] = useState("17:00")
    const [bookings, setBookings] = useState<any[]>([])
    const [fetchingBookings, setFetchingBookings] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            const availabilityRes = await fetch("/api/availability")
            if (availabilityRes.ok) {
                const data = await availabilityRes.json()
                if (data.startTime && data.endTime) {
                    setStartTime(data.startTime)
                    setEndTime(data.endTime)
                }
            }

            try {
                const data = await getUpcomingBookings()
                setBookings(data)
            } catch (error) {
                console.error("Failded to fetch bookings", error)
            } finally {
                setFetchingBookings(false)
            }
        }
        if (status === "authenticated") {
            fetchData()
        }
    }, [status])

    if (status === "loading") return <p className="p-10 text-center ">Loading...</p>

    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-2xl font-bold text-red-600 ">Access Denied</h1>
                <p className="text-slate-600 ">Please sign in to manage your availability</p>
            </div>
        )
    }

    const handleSave = async () => {
        try {
            const response = await fetch("/api/availability", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ startTime, endTime })
            })

            if (response.ok) {
                alert("Availability saved successfully!")
            } else {
                alert("Something went wrong.")
            }
        } catch (error) {
            console.log(error)
        }
    }



   // Inside your main dashboard page.tsx, keep the header and appointments:
return (
  <div className="space-y-10 animate-in fade-in duration-700">
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                    Dashboard
                </h1>
                <p className="text-slate-500 font-medium mt-1">
                    Welcome back, {session.user?.name?.split(' ')[0]}
                </p>
            </div>

            {/* QUICK SHARE CARD */}
            <div className="bg-blue-600 p-5 rounded-3xl shadow-xl shadow-blue-100 flex items-center gap-6 text-white border border-blue-500">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-70">Your Public Link</p>
                    <p className="text-sm font-bold truncate max-w-[150px]">book/{session.user?.name?.toLowerCase().replace(" ", "-")}</p>
                </div>
                <button 
                    onClick={() => {
                        const link = `${window.location.origin}/book/${session.user?.name?.toLowerCase().replace(" ", "-")}`;
                        navigator.clipboard.writeText(link);
                        alert("Link copied to clipboard!");
                    }}
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-2xl transition-all active:scale-90 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </button>
            </div>
        </header>

    <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm min-h-[500px]">
      <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        Confirmed Appointments
      </h2>
      
      {/* Your BookingList component */}
      <BookingList bookings={bookings} />
    </section>
  </div>
);
}
export default DashboardPage

//  return (
//     <div className="space-y-10 animate-in fade-in duration-700">
//         {/* HEADER & SHARE LINK */}
//         <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//             <div>
//                 <h1 className="text-4xl font-black text-slate-900 tracking-tight">
//                     Dashboard
//                 </h1>
//                 <p className="text-slate-500 font-medium mt-1">
//                     Welcome back, {session.user?.name?.split(' ')[0]}
//                 </p>
//             </div>

//             {/* QUICK SHARE CARD */}
//             <div className="bg-blue-600 p-5 rounded-3xl shadow-xl shadow-blue-100 flex items-center gap-6 text-white border border-blue-500">
//                 <div>
//                     <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-70">Your Public Link</p>
//                     <p className="text-sm font-bold truncate max-w-[150px]">book/{session.user?.name?.toLowerCase().replace(" ", "-")}</p>
//                 </div>
//                 <button 
//                     onClick={() => {
//                         const link = `${window.location.origin}/book/${session.user?.name?.toLowerCase().replace(" ", "-")}`;
//                         navigator.clipboard.writeText(link);
//                         alert("Link copied to clipboard!");
//                     }}
//                     className="bg-white/20 hover:bg-white/30 p-3 rounded-2xl transition-all active:scale-90 cursor-pointer"
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
//                 </button>
//             </div>
//         </header>

//         <div className="grid grid-cols-1 gap-8">
//             {/* UPCOMING MEETINGS SECTION */}
//             <section className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
//                 <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
//                     <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
//                     Upcoming Meetings
//                 </h2>
                
//                 <div className="min-h-[200px]">
//                     {fetchingBookings ? (
//                         <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-4">
//                              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                              <p className="text-sm font-medium">Fetching your schedule...</p>
//                         </div>
//                     ) : (
//                         <div className="space-y-4">
//                             {/* The BookingList component should ideally use the same blue/white theme */}
//                             <BookingList bookings={bookings} />
//                         </div>
//                     )}
//                 </div>
//             </section>

//             {/* QUICK SETTINGS / WORKING HOURS */}
//             <section className="bg-white rounded-[32px] p-8 shadow-2xl border shadow-slate-200 text-black">
//                 <div className="flex items-center justify-between mb-8">
//                     <div>
//                         <h2 className="text-xl font-bold italic">Default Hours</h2>
//                         <p className="text-slate-400 text-xs">Set your standard weekly availability</p>
//                     </div>
//                     <div className="p-2 bg-slate-800 rounded-xl">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
//                     </div>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-6">
//                     <div className="space-y-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Starts At</label>
//                         <input 
//                             type="time" 
//                             value={startTime} 
//                             onChange={(e) => setStartTime(e.target.value)} 
//                             className="block bg-slate-800 border-none rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer font-bold" 
//                         />
//                     </div>
                    
//                     <span className="mt-6 text-slate-600 font-black">TO</span>

//                     <div className="space-y-2">
//                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ends At</label>
//                         <input 
//                             type="time" 
//                             value={endTime} 
//                             onChange={(e) => setEndTime(e.target.value)} 
//                             className="block bg-slate-800 border-none rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer font-bold" 
//                         />
//                     </div>

//                     <button 
//                         onClick={handleSave} 
//                         className="mt-6 ml-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95 cursor-pointer"
//                     >
//                         Update Schedule
//                     </button>
//                 </div>
//             </section>
//         </div>
//     </div>
// )