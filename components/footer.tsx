

export function Footer() {
  return (
    <footer className="bg-red-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img src="/ppsu logo.png" alt="PPSU Logo" className="h-6 w-auto" />
            <span className="font-bold text-lg">SSE</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm opacity-90">© 2025 PPSU. All rights reserved.</p>
            <p className="text-xs opacity-75 mt-1">Student Dashboard & Exam Eligibility Tracker</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
