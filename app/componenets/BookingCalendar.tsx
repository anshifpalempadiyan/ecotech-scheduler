"use client"

import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { createBooking } from "../actions/book"
import { useRouter } from "next/navigation";

interface BookingCalendarProps {
    username: string
    availability: {
        startTime: string
        endTime: string
        days: string[]
    }
    bookings: any[]
}


const BookingCalendar = ({ availability, username, bookings }: BookingCalendarProps) => {
    const router = useRouter();
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

        const bookingDate = new Date(selectedDate);
        bookingDate.setHours(0, 0, 0, 0);

        const result = await createBooking({
            username: username,
            date: bookingDate,
            timeSlot: selectedSlot as string,
            guestName: formData.name,
            guestEmail: formData.email,
        });

        if (result.success) {
            // alert(`Success! Meeting booked for ${selectedSlot}`)
            router.push(`/book/${username}/success`);
            // setSelectedSlot(null);
            // setFormData({ name : "" , email : "" , notes : ""})

        } else {
            alert("Failed to book meeting. Please try again.");
            setLoading(false)

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
                                {/* <p className="text-sm text-slate-500 mb-4">Available on {selectedDate.toDateString()}</p> */}
                                <div className="mb-6 border-b border-slate-100 pb-4">
                                    <p className="text-sm text-slate-500 mb-1">Available for</p>
                                    <h3 className="font-bold text-slate-900 text-xl">
                                        {selectedDate.toDateString()}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-2 text-slate-500 text-xs font-medium bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-blue-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <span>Times shown in <span className="text-slate-900 font-semibold">{Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " ")}</span></span>
                                    </div>
                                </div>
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
                                                className={`py-3 px-2 text-sm font-medium border rounded-xl transition-all cursor-pointer active:scale-95 ${isBusy
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
