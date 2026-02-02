"use client";
import React from "react";
import { DINEng } from "@/lib/fonts";

export type StationItem = {
  id: number;
  title: string;
  subtitle?: string;
};

// Arduino Day Philippines Color Scheme
const COLORS = {
  COMPLETED: "#00CED1",  // Teal for completed
  ACTIVE: "#FF6B35",     // Orange for active
  FUTURE: "#4A5568",     // Muted gray for future
  LINE: "#1a3a4a",       // Dark teal for line
};

interface SidebarProps {
  stations?: StationItem[];
  activeStationId?: number;
  isOpen?: boolean;
  isDesktop?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

/**
 * Sidebar - Responsive status sidebar showing station progress
 * Supports both desktop (always visible) and mobile (toggleable) modes
 */
export default function Sidebar({
  stations = [],
  activeStationId = 1,
  isOpen = true,
  isDesktop = true,
  onToggle,
  onClose,
}: Readonly<SidebarProps>) {

  // Find the index of the active station to determine what is "past" and "future"
  const activeIndex = stations.findIndex(s => s.id === activeStationId);

  return (
    <aside
      className={`
        ${isDesktop ? 'flex' : isOpen ? 'flex' : 'hidden'}
        ${!isDesktop ? 'fixed inset-y-0 left-0 z-30 transform transition-transform duration-300' : ''}
        ${!isDesktop && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        w-72 bg-[rgba(13,27,42,0.95)] backdrop-blur-xl border-r border-[rgba(0,206,209,0.2)] flex-col justify-between p-6
      `}
      style={{ fontFamily: 'TT Firs Neue Trial Var Roman, sans-serif' }}
    >
      <div className="flex-1 flex flex-col">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-4xl font-extrabold tracking-tight text-white`}>
                Snap<span className="text-[#00CED1]">Grid</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">Your photobooth journey</p>
            </div>
            {/* Close button for mobile */}
            {!isDesktop && onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2"
                aria-label="Close sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <hr className="border-[rgba(0,206,209,0.3)] mt-4"></hr>
        </div>

        {/* Status Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-full bg-[#00CED1] text-[#0d1b2a] font-bold h-10 w-10 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(0,206,209,0.4)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
            </div>
            <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Photobooth Status</p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <svg width="20" height="12" viewBox="0 0 32 16" fill="none" aria-hidden>
              <path d="M20 3l7 5-7 5" stroke="#00CED1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 8h22" stroke="#00CED1" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <h4 className={`text-lg text-[#00CED1] uppercase tracking-wide font-semibold ${DINEng.className}`}>Your Journey</h4>
          </div>

          {/* Navigation/Station List */}
          <nav className="relative space-y-4">
            {/* The vertical line behind the dots */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-[10px] bottom-[10px] w-[2px]"
              style={{ left: 12, backgroundColor: COLORS.LINE }}
            />

            {stations.map((st, index) => {
              const isActive = st.id === activeStationId;

              // Logic: If current index is less than active index, it's completed (Teal).
              // If it matches, it's active (Orange).
              // Otherwise, it's future (Gray).
              let statusColor = COLORS.FUTURE;
              if (index < activeIndex) statusColor = COLORS.COMPLETED;
              if (isActive) statusColor = COLORS.ACTIVE;

              // Active dot is slightly larger and shifted left, others are standard
              const indicatorStyle: React.CSSProperties = {
                backgroundColor: statusColor,
                marginLeft: isActive ? -7 : 0,
                width: isActive ? '20px' : '12px',
                height: isActive ? '20px' : '12px',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? `0 0 12px ${statusColor}` : 'none'
              };

              // Text Color Logic
              const titleColor = isActive ? "text-white" : index < activeIndex ? "text-[#00CED1]" : "text-gray-400";
              const subtitleColor = isActive ? "text-white" : "text-gray-500";

              return (
                <div
                  key={st.id}
                  className="w-full flex items-start gap-4 text-left group"
                >
                  {/* The Dot */}
                  <span
                    className="mt-1 rounded-full flex-none shrink-0 z-10"
                    style={indicatorStyle}
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-semibold uppercase ${titleColor}`}>
                        {st.title}
                      </p>

                      {/* IN PROGRESS Badge - Only for Active Station */}
                      {isActive && (
                        <span
                          className="ml-2 bg-[#FF6B35] text-white text-xs px-2 py-0.5 rounded-full"
                          style={{
                            fontSize: "0.6rem",
                            fontFamily: "Arial, Helvetica, sans-serif"
                          }}
                        >
                          ACTIVE
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
        <span className="h-2 w-2 rounded-full bg-[#00CED1] shadow-[0_0_8px_rgba(0,206,209,0.6)]" />
        <span>SYSTEM READY</span>
      </div>
    </aside>
  );
}