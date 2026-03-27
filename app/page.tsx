const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-white text-slate-900">
      <header className="max-w-2xl">
        <h1 className="text-5xl font-extrabold tracking-tight">
          EcoTech <span className="text-blue-600">Scheduler</span>
        </h1>
        <p className="mt-6 text-lg text-slate-600 leading-7">
          A high-performance scheduling platform built for the 4N EcoTech assessment. 
          Seamlessly sync meetings and manage availability.
        </p>
      </header>

      <div className="mt-10 flex gap-4">
        <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          Get Started
        </button>
        <button className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition-all">
          View Demo
        </button>
      </div>

      <footer className="absolute bottom-8 text-sm text-slate-400">
        Built with Next.js, Tailwind, and Prisma
      </footer>
    </div>
  );
};

export default Home;