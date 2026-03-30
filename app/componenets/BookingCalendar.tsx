"use client"

import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { createBooking } from "../actions/book"

interface BookingCalendarProps {
    username : string
    availability: {
        startTime: string
        endTime: string
        days: string[]
    }
}


const BookingCalendar = ({ availability , username }: BookingCalendarProps) => {
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
        if ( !selectedDate || !selectedSlot ) return

        setLoading(true)

        const result = await createBooking({
        username: username, 
        date: selectedDate,
        timeSlot: selectedSlot as string,
        guestName: formData.name,
        guestEmail: formData.email,
    });

    if (result.success) {
        alert(`Success! Meeting booked for ${selectedSlot}`);
        setLoading(false);
        setSelectedSlot(null);
        
    } else {
        alert("Failed to book meeting. Please try again.");
        setLoading(false);
    }

        console.log("Booking Deatails: ", {
            date: selectedDate,
            slot: selectedSlot,
            ...formData
        })

        setTimeout(() => {
            alert(`Success! Meeting booked fro ${selectedSlot}`)
            setLoading(false)
            setSelectedSlot(null)
        }, 1500)
    }


    return (
        <div className="flex flex-col gap-8" suppressHydrationWarning >
            <div className="calendar-container shadow-sm border rounded-xl p-4 bg-white">
                <Calendar
                    onChange={(val) => {
                        setSelectedDate(val as Date)
                        setSelectedSlot(null)
                    }}
                    value={date}
                    minDate={new Date()}
                    className="border-none w-full" />
            </div>

            {
                selectedDate && !selectedSlot && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {availability.days.length === 0 || availability.days.includes(selectedDate.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()) ? (

                            <>
                                <h3 className="font-medium mb-4 text-slate-800 flex items-center gap2">
                                    {/* <span className="w-2 h-6 bg-blue-600 rounded-full"></span> */}
                                    Available for {selectedDate.toDateString()}</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {

                                        timeSlots.map((slot) => (
                                            <button
                                                key={slot}
                                                onClick={() => setSelectedSlot(slot)}
                                                suppressHydrationWarning
                                                className="py-2.5 cursor-pointer text-sm font-medium border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 active:scale-95">{slot}</button>
                                        ))

                                    }
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-10 bg-slate-100 rounded-xl border border-dashed border-slate-300">
                                <p className="text-slate-500 font-medium">Not available on this day.</p>
                                <p className="text-slate-400 text-sm">Please select another date.</p>
                            </div>
                        )}
                    </div>
                )
            }

            {
                selectedSlot && (
                    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold">Confirm Booking</h3>
                                <p className="text-slate-400 text-sm">{selectedDate?.toDateString()}</p>
                            </div>
                            <button onClick={() => { setSelectedSlot(null) }} className="text-slate-400 hover:text-white">Change Time</button>
                        </div>

                        <form onSubmit={handleBooking} className="space-y-4">
                            <div>
                                <label className="block text-xs font-uppercase tracking-wider text-slate-500 mb-1">YOUR NAME</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter your name"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-uppercase tracking-wider text-slate-500 mb-1">EMAIL ADDRESS</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500"
                                    placeholder="name@company.com"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold transition-all disabled:opacity-50">
                                {loading ? "Processing..." : "Confirm Meeting"}
                            </button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default BookingCalendar