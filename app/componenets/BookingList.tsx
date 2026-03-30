 const BookingList = ({ bookings }: { bookings: any[] }) => {
    if (bookings.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500">No upcoming meetings yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {bookings.map((booking) => (
                <div key={booking.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h4 className="font-bold text-slate-900">{booking.guestName}</h4>
                        <p className="text-sm text-slate-500">{booking.guestEmail}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="font-medium text-slate-900">
                                {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                            <p className="text-sm text-blue-600 font-semibold">{booking.timeSlot}</p>
                        </div>
                        {/* Optional: Add a delete button here later */}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookingList