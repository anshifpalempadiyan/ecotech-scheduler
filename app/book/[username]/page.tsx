import prisma from "@/lib/prismadb";
import  { notFound} from "next/navigation"
import BookingCalendar from "@/app/componenets/BookingCalendar";


interface BookingPageProps {
    params : Promise<{ username : string }>;
}


const Bookingpage = async ({ params } : BookingPageProps) => {

    const resolvedParams = await params
    const username = resolvedParams.username
    const user = await prisma.user.findFirst({
        where : { name : { contains : username.replace("-", " ") , mode : 'insensitive'}},
        include : { availability : true,},
    })

    if ( !user ) {
        return notFound()
    }

return (
  <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {user.name}'s Scheduler
        </h1>
        <p className="text-slate-500 mt-2">Select a date and time to book a meeting.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-100">
            <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Select a Date
            </h2>
            <BookingCalendar 
            username={username}
              availability={{
                startTime: user.availability?.startTime || "09:00",
                endTime: user.availability?.endTime || "17:00",
                days: user.availability?.days || []
              }} 
            />
          </div>

          <div className="p-6 sm:p-8 bg-slate-50/50">
             <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Available Slots
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default Bookingpage


