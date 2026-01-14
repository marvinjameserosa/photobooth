"use client";
import localFont from 'next/font/local';
import React from "react";
import { DINEng, TTFirsNeue, segmentA,DSDIGI, segmentAbold } from "@/lib/fonts";

export type StationItem = {
  id: number;
  title: string;
  subtitle?: string;
};

// Configurable Colors
const COLORS = {
  COMPLETED: "#39FF14", 
  ACTIVE: "#FF1D25",    
  FUTURE: "#FFD400",   
  LINE: "#2F2F2F",      
};

export default function Sidebar({
  stations = [],
  activeStationId = 1,
  isOpen = false,
  onClose,
  onSelect,
  isDesktop = false,
  onToggle,
}: Readonly<{
  stations?: StationItem[];
  activeStationId?: number;
  isOpen?: boolean;
  onClose?: () => void;
  onSelect?: (id: number) => void;
  isDesktop?: boolean;
  onToggle?: () => void;
}>) {
  const classes = [
    'w-72',
    'bg-[#0b0b0b]',
    'border-r',
    'border-gray-900',
    'flex',
    'flex-col',
    'justify-between',
    'p-6',
    'transform',
    'transition-transform',
    'duration-300',
    'ease-in-out',
  ];

  if (isDesktop) {
    classes.push('translate-x-0', 'relative', 'md:static');
  } else {
    classes.push(isOpen ? 'translate-x-0' : '-translate-x-full', 'fixed', 'inset-y-0', 'left-0');
  }

  classes.push('z-30');

  // Find the index of the active station to determine what is "past" and "future"
  const activeIndex = stations.findIndex(s => s.id === activeStationId);

  return (
    <aside id="main-navigation" className={classes.join(' ')} style={{ fontFamily: 'TT Firs Neue Trial Var Roman, sans-serif' }}>
      {!isDesktop && (
        <button
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-controls="main-navigation"
          aria-expanded={isOpen}
          onClick={onToggle}
          className="absolute top-4 right-4 z-40 p-2 rounded focus:outline-none"
        >
          <div className="w-8 h-8 flex items-center justify-center relative">
            <span className={`absolute block w-6 h-0.5 bg-yellow-400 transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : '-rotate-45 translate-y-2'}`} />
            <span className={`absolute block w-6 h-0.5 bg-yellow-400 transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45' : 'rotate-45 -translate-y-2'}`} />
          </div>
        </button>
      )}

      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <div className="mb-6">
          <h2 className={`text-5xl font-extrabold tracking-wide text-white tracking-tight ${segmentA.className}`}>
            SnapGrid <span className="text-yellow-400">Station</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">Are you lost in the city too?</p>
          <hr className="border-gray-500 mt-4"></hr>
        </div>

        {/* Status Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={`rounded-full bg-red-500 text-white font-bold h-10 w-10 flex items-center justify-center text-lg ${DSDIGI.className}`}>5G</div>
            <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">SUBWAY LINE STATUS</p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <svg width="20" height="12" viewBox="0 0 32 16" fill="none" aria-hidden>
              <path d="M20 3l7 5-7 5" stroke="#FACC15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 8h22" stroke="#FACC15" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h4 className={`text-lg text-yellow-400 uppercase tracking-wide font-semibold ${DINEng.className}`}>Your Journey</h4>
          </div>

          {/* Navigation/Station List */}
          <nav className="relative space-y-4">
            {/* The vertical gray line behind the dots */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-[10px] bottom-[10px] w-[2px]"
              style={{ left: 12, backgroundColor: COLORS.LINE }}
            />
            
            {stations.map((st, index) => {
              const isActive = st.id === activeStationId;
              
              // Logic: If current index is less than active index, it's completed (Green).
              // If it matches, it's active (Red).
              // Otherwise, it's future (Yellow).
              let statusColor = COLORS.FUTURE; 
              if (index < activeIndex) statusColor = COLORS.COMPLETED;
              if (isActive) statusColor = COLORS.ACTIVE;

              // Active dot is slightly larger and shifted left, others are standard
              const indicatorStyle: React.CSSProperties = {
                backgroundColor: statusColor,
                marginLeft: isActive ? -7 : 0,
                width: isActive ? '20px' : '12px', // Make active dot slightly larger
                height: isActive ? '20px' : '12px',
                transition: 'all 0.3s ease'
              };

              // Text Color Logic
              const titleColor = isActive ? "text-white" : "text-yellow-400";
              const subtitleColor = isActive ? "text-white" : "text-gray-400";

              return (
                <div
                  key={st.id}
                  className="w-full flex items-start gap-4 text-left group"
                >
                  {/* The Dot */}
                  <span
                    className="mt-1 rounded-full flex-none flex-shrink-0 z-10"
                    style={indicatorStyle}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-semibold uppercase ${titleColor}`}>
                        {st.title}
                      </p>
                      
                      {/* IN TRANSIT Badge - Only for Active Station */}
                      {isActive && (
                        <span
                          className="ml-4 bg-red-500 text-white text-xs px-3 py-1"
                          style={{
                            fontSize: "0.6rem",
                            fontFamily: "Arial, Helvetica, sans-serif"
                          }}
                        >
                          IN TRANSIT
                        </span>
                      )}
                    </div>
                    <p className={`text-sm uppercase font-semibold mt-0.5 ${subtitleColor} ${DINEng.className}`}>
                      {st.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="text-xs text-gray-400 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span>SYSTEM ONLINE</span>
      </div>
    </aside>
  );
}