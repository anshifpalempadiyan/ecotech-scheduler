"use client";
import { useState, useEffect } from "react";
// Import your save action here, e.g., import { saveAvailability } from "@/app/actions/availability";

export default function AvailabilityPage() {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Add your existing handleSave logic here
    // await saveAvailability(startTime, endTime);
    setLoading(false);
    alert("Availability updated!");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Availability</h1>
        <p className="text-slate-500 font-medium mt-1">Configure your standard weekly work hours</p>
      </header>

      <section className="bg-white rounded-[32px] p-10 shadow-2xl shadow-slate-200 text-black border max-w-3xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold italic">Default Hours</h2>
            <p className="text-slate-400 text-sm mt-1">Set your global start and end times</p>
          </div>
          <div className="p-3 bg-white border rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Starts At</label>
            <input 
              type="time" 
              value={startTime} 
              onChange={(e) => setStartTime(e.target.value)} 
              className="block bg-white  rounded-2xl p-4 text-xl text-black border focus:ring-4 focus:ring-blue-500/20 outline-none cursor-pointer font-bold transition-all" 
            />
          </div>
          
          <div className="mt-8">
             <span className="text-slate-700 font-black text-xl">TO</span>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Ends At</label>
            <input 
              type="time" 
              value={endTime} 
              onChange={(e) => setEndTime(e.target.value)} 
              className="block bg-white border rounded-2xl p-4 text-xl text-black focus:ring-4 focus:ring-blue-500/20 outline-none cursor-pointer font-bold transition-all" 
            />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Saving..." : "Update Schedule"}
          </button>
        </div>
      </section>
    </div>
  );
}