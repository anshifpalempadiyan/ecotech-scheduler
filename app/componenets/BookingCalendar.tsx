"use client"

import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { createBooking } from "../actions/book"

interface BookingCalendarProps {
    username: string
    availability: {
        startTime: string
        endTime: string
        days: string[]
    }
    bookings: any[]
}


const BookingCalendar = ({ availability , username , bookings }: BookingCalendarProps) => {
    const [date, setDate] = useState<Date | null>(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const [selectedSlot, setSelectedSlot] = useState<String | null>(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ name: "", email: "", notes: "" })

    const generateTimeSlots = (start: string, end: string) => {
        const slots = []
        let current = new Date(`2026-01-01T${start}:00`)
        const stop = new Date(`2026-01-01T${end}:00`)

        while (current < stop) {
            slots.push(
                current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
            )

            current.setMinutes(current.getMinutes() + 30)
        }
        return slots
    }
    const timeSlots = generateTimeSlots(availability.startTime, availability.endTime)

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedDate || !selectedSlot) return

        setLoading(true)

        const result = await createBooking({
            username: username,
            date: selectedDate,
            timeSlot: selectedSlot as string,
            guestName: formData.name,
            guestEmail: formData.email,
        });

        if (result.success) {
            alert(`Success! Meeting booked for ${selectedSlot}`)
            setSelectedSlot(null);
            setFormData({ name : "" , email : "" , notes : ""})

        } else {
            alert("Failed to book meeting. Please try again.");
            
        }
        setLoading(false);


    }


    return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start" suppressHydrationWarning>
        
        {/* LEFT COLUMN: The Calendar (Takes 5 out of 12 columns) */}
        <div className="md:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Select a Date
            </h2>
            <Calendar
                onChange={(val) => {
                    setSelectedDate(val as Date)
                    setSelectedSlot(null)
                }}
                value={date}
                minDate={new Date()}
                className="border-none w-full" 
            />
        </div>

        {/* RIGHT COLUMN: Slots or Form (Takes 7 out of 12 columns) */}
        <div className="md:col-span-7">
            {!selectedSlot ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm min-h-[400px]">
                    <h2 className="font-semibold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                        Available Slots
                    </h2>

                    {selectedDate && (availability.days.length === 0 || availability.days.includes(selectedDate.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase())) ? (
                        <div className="animate-in fade-in duration-500">
                            <p className="text-sm text-slate-500 mb-4">Available on {selectedDate.toDateString()}</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {timeSlots.map((slot) => {
                                    const isBusy = bookings.some(b =>
                                        new Date(b.date).toDateString() === selectedDate.toDateString() &&
                                        b.timeSlot === slot
                                    )
                                    return (
                                        <button
                                            key={slot}
                                            disabled={isBusy}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`py-3 px-2 text-sm font-medium border rounded-xl transition-all cursor-pointer active:scale-95 ${
                                                isBusy
                                                    ? "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                                                    : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                            }`}
                                        >
                                            {isBusy ? "Booked" : slot}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 py-12">
                            <p>No availability on this date.</p>
                        </div>
                    )}
                </div>
            ) : (
                /* THE BOOKING FORM */
                <div className="bg-white text-black p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-bold">Confirm Meeting</h3>
                            <p className="text-slate-400">{selectedDate?.toDateString()} at {selectedSlot}</p>
                        </div>
                        <button onClick={() => setSelectedSlot(null)} className=" border-blue-600 text-blue-600 hover:bg-blue-600  cursor-pointer hover:text-white  text-sm border px-3 py-1 rounded-lg">Change</button>
                    </div>

                    <form onSubmit={handleBooking} className="space-y-4">
                        <input
                            required
                            type="text"
                            placeholder="Your Name"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-500" 
                        />
                        <input
                            required
                            type="email"
                            placeholder="Email Address"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-500" 
                        />
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full border border-blue-600 text-blue-600 bg-white hover:bg-blue-600  cursor-pointer hover:text-white py-4 rounded-xl font-bold transition-all"
                        >
                            {loading ? "Processing..." : "Confirm Meeting"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    </div>
);
}

export default BookingCalendar
// return (
//         <div className="flex flex-col gap-8" suppressHydrationWarning >
//             <div className="calendar-container shadow-sm border rounded-xl p-4 bg-white">
//                 <Calendar
//                     onChange={(val) => {
//                         setSelectedDate(val as Date)
//                         setSelectedSlot(null)
//                     }}
//                     value={date}
//                     minDate={new Date()}
//                     className="border-none w-full" />
//             </div>

//             {
//                 selectedDate && !selectedSlot && (
//                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//                         {availability.days.length === 0 || availability.days.includes(selectedDate.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()) ? (

//                             <>
//                                 <h3 className="font-medium mb-4 text-slate-800 flex items-center gap2">
//                                     {/* <span className="w-2 h-6 bg-blue-600 rounded-full"></span> */}
//                                     Available for {selectedDate.toDateString()}</h3>
//                                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                                     {
//                                         timeSlots.map((slot) => {
//                                             const isBusy = bookings.some(b =>
//                                                 new Date(b.date).toDateString() === selectedDate.toDateString() &&
//                                                 b.timeSlot === slot
//                                             )

//                                             return (
//                                                 <button
//                                                     key={slot}
//                                                     disabled={isBusy}
//                                                     onClick={() => setSelectedSlot(slot)}
//                                                     suppressHydrationWarning
//                                                     className={`py-2.5 cursor-pointer text-sm font-medium border rounded-lg transition-all duration-200 active:scale-95 ${isBusy
//                                                         ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
//                                                         : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
//                                                         }`}
//                                                 >
//                                                     {isBusy ? "Booked" : slot}
//                                                 </button>
//                                             )
//                                         })
//                                     }
//                                 </div>
//                             </>
//                         ) : (
//                             <div className="text-center py-10 bg-slate-100 rounded-xl border border-dashed border-slate-300">
//                                 <p className="text-slate-500 font-medium">Not available on this day.</p>
//                                 <p className="text-slate-400 text-sm">Please select another date.</p>
//                             </div>
//                         )}
//                     </div>
//                 )
//             }

//             {
//                 selectedSlot && (
//                     <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
//                         <div className="flex justify-between items-center mb-6">
//                             <div>
//                                 <h3 className="text-xl font-bold">Confirm Booking</h3>
//                                 <p className="text-slate-400 text-sm">{selectedDate?.toDateString()}</p>
//                             </div>
//                             <button onClick={() => { setSelectedSlot(null) }} className="text-slate-400 hover:text-white">Change Time</button>
//                         </div>

//                         <form onSubmit={handleBooking} className="space-y-4">
//                             <div>
//                                 <label className="block text-xs font-uppercase tracking-wider text-slate-500 mb-1">YOUR NAME</label>
//                                 <input
//                                     required
//                                     type="text"
//                                     placeholder="Enter your name"
//                                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                                     className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500" />
//                             </div>
//                             <div>
//                                 <label className="block text-xs font-uppercase tracking-wider text-slate-500 mb-1">EMAIL ADDRESS</label>
//                                 <input
//                                     type="text"
//                                     required
//                                     className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500"
//                                     placeholder="name@company.com"
//                                     onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//                             </div>
//                             <button
//                                 disabled={loading}
//                                 type="submit"
//                                 className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold transition-all disabled:opacity-50">
//                                 {loading ? "Processing..." : "Confirm Meeting"}
//                             </button>
//                         </form>
//                     </div>
//                 )
//             }
//         </div>
//     )