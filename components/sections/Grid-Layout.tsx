"use client";
import React, { useState, useEffect } from "react";
import Squares from '@/components/ui/bg-particles';
import Sidebar from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';

type Station = {
  id: number;
  title: string;
  subtitle?: string;
};

// Values for the Grid Layout Cards
const stations: Station[] = [
  { id: 1, title: "SUBWAY 1", subtitle: "4-Cut Train Car" },
  { id: 2, title: "SUBWAY 2", subtitle: "Subway Doors" },
  { id: 3, title: "ELEVATOR", subtitle: "Vertical Strip" },
  { id: 4, title: "TRANSIT TERMINAL", subtitle: "Route Maps" },
];

// Journey steps for Sidebar Navigation
const journeySteps: Station[] = [
  { id: 1, title: "STATION 01", subtitle: "SELECT LAYOUT" },
  { id: 2, title: "STATION 02", subtitle: "CAPTURE PHOTOS" },
  { id: 3, title: "STATION 03", subtitle: "PHOTO GALLERY" },
  { id: 4, title: "STATION 04", subtitle: "SHARE RESULTS" },
];

// --- Sub Components ---

function StationBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex items-center justify-center px-10 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-[#f2c200]">
      <span className="absolute inset-0 border border-[#f2c200]/80" aria-hidden />
      <span className="absolute -top-1 -left-1 h-3 w-3  bg-[#f2c200]" aria-hidden />
      <span className="absolute -top-1 -right-1 h-3 w-3  bg-[#f2c200]" aria-hidden />
      <span className="absolute -bottom-1 -left-1 h-3 w-3  bg-[#f2c200]" aria-hidden />
      <span className="absolute -bottom-1 -right-1 h-3 w-3 bg-[#f2c200]" aria-hidden />
      <span className="relative tracking-[0.4em]">{children}</span>
    </span>
  );
}

function Button({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className="text-xs border border-gray-600 text-gray-300 hover:bg-gray-800 px-4 py-2 w-full rounded transition"
    >
      {children}
    </button>
  );
}

function StationCard({ station, onSelect }: { station: Station; onSelect?: (id: number) => void }) {
  const renderIcon = (id: number) => {
    switch (id) {
      case 1:
        return <img src="/icons/Grid%20(gray).png" alt="Grid icon" className="h-[80%] w-[80%] object-contain" />;
      case 2:
        return <img src="/icons/door-open.png" alt="Grid icon" className="h-[80%] w-[80%] object-contain" />;
      case 3:
        return <img src="/icons/up-down.png" alt="Elevator icon" className="h-[80%] w-[80%] object-contain" />;
      default:
        return <img src="/icons/map%20(gray).png" alt="Map icon" className="h-[80%] w-[80%] object-contain" />;
    }
  };

  const renderPreview = (id: number) => {
    switch (id) {
      case 1:
        return (
          <div className="grid grid-cols-2 gap-2 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square bg-neutral-800 border border-neutral-700 rounded-sm" />
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-3 gap-2 w-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-neutral-800 border border-neutral-700 rounded-sm" />
            ))}
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-1 items-center w-full justify-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-8 sm:h-9 bg-neutral-800 border border-neutral-700 rounded-sm" />
            ))}
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-2 gap-1 w-full mb-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className=" w-full h-12 sm:h-12  bg-neutral-800 border border-neutral-700 rounded-sm" />
            ))}
          </div>
        );
    }
  };

  return (
    <article className="relative border border-gray-800 p-6 sm:p-8 rounded-md flex flex-col justify-between items-center text-center min-h-[420px] sm:min-h-[480px] md:min-h-[520px] bg-transparent transition-transform duration-300 ease-out hover:-translate-y-3 hover:shadow-[0_10px_30px_rgba(255,200,0,0.08)] hover:z-10">
      <div className="absolute top-3 left-3 text-xs border border-gray-800 px-2 rounded bg-[#0b0b0b]">{String(station.id).padStart(2, "0")}</div>
      <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-yellow-400" aria-hidden />

      <div className="pt-4 mb-2 flex flex-col items-center">
        <div className="h-14 w-14 sm:h-20 sm:w-20 rounded bg-transparent flex items-center justify-center mb-4">
          {renderIcon(station.id)}
        </div>
        <h3 className="text-lg sm:text-2xl text-gray-100 font-extrabold mb-1 uppercase tracking-wide">{station.title}</h3>
        {station.subtitle && <p className="text-xs text-gray-400 mb-6">{station.subtitle}</p>}
      </div>

      <div className="flex-1 flex items-center justify-center mb-6 w-full">
        <div className="w-full max-w-40">
          {renderPreview(station.id)}
        </div>
      </div>

      <div className="w-full mt-6">
        <Button onClick={() => onSelect?.(station.id)}>— BOARD THIS TRAIN</Button>
      </div>
    </article>
  );
}

// --- Main Page Component ---

export default function GridLayout() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  // We default to 1 because this IS the Layout Selection page (Station 01)
  const [activeStationId, setActiveStationId] = useState<number>(1);

  useEffect(() => {
    const shouldLockScroll = !isDesktop && isSidebarOpen;
    document.body.style.overflow = shouldLockScroll ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen, isDesktop]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const checkWidth = () => {
      const desktop = window.innerWidth >= 1000;
      setIsDesktop(desktop);
      if (desktop) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Sidebar Nav Logic
  const handleSidebarSelect = (id: number) => {
    setActiveStationId(id); // mag rered
    
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-gray-100">
      {/* Mobile Menu Button */}
      {!isDesktop && !isSidebarOpen && (
        <button
          aria-label="Open navigation"
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 rounded focus:outline-none"
        >
          <div className="w-8 h-8 flex flex-col items-center justify-center gap-1.5">
            <span className="block w-6 h-0.5 bg-yellow-400" />
            <span className="block w-6 h-0.5 bg-yellow-400" />
            <span className="block w-6 h-0.5 bg-yellow-400" />
          </div>
        </button>
      )}
      
      {/* Sidebar Component */}
      <Sidebar
        stations={journeySteps}
        activeStationId={activeStationId}
        isOpen={isSidebarOpen}
        isDesktop={isDesktop}
        onClose={() => setIsSidebarOpen(false)}
        onSelect={handleSidebarSelect}
        onToggle={() => setIsSidebarOpen((v) => !v)}
      />

      {/* Main Content */}
      <main className="relative flex-1 p-12">
        {/* Mobile Overlay */}
        <div className={`${(!isDesktop && isSidebarOpen) ? 'block' : 'hidden'} fixed inset-0 bg-black/40 z-20`} onClick={() => setIsSidebarOpen(false)} />
        
        {/* Background Particles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Squares 
            speed={0.5}
            squareSize={48}
            direction="diagonal"
            borderColor={'rgba(255,255,255,0.04)'}
            hoverFillColor={'rgba(255,255,255,0.02)'}
          />
        </div>

        <div className="relative max-w-6xl mx-auto z-10">
          <div className="text-center mb-12">
            <StationBadge>STATION 01</StationBadge>
            <h1 className="mt-6 tracking-tight">
              <span className="block text-6xl font-normal leading-none">SELECT YOUR</span>
              <span className="block text-6xl font-extrabold leading-none text-yellow-400">STATION</span>
            </h1>
            <p className="mt-3 text-gray-400">Choose your photobooth layout and prepare for departure</p>
            <div className="flex items-center justify-center gap-3 mt-4 border-2 border-solid border-gray-400 w-40 p-2 m-auto">
              <span className="h-3 w-3 rounded-full bg-green-500 inline-block" />
              <span className="text-xs text-green-500">SYSTEM READY</span>
            </div>
            <div className="mt-6 text-red-500 text-2xl">▾</div>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stations.map((s) => (
              <StationCard 
                key={s.id} 
                station={s} 
                onSelect={(id) => {
                  router.push(`/capture-photos?station=${id}`);
                }} 
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}