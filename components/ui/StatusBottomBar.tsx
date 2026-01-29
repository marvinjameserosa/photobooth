"use client";
import React, { useState } from "react";
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
};

interface StatusBottomBarProps {
    stations: StationItem[];
    activeStationId: number;
}

/**
 * StatusBottomBar - Mobile-only bottom bar showing station progress
 * Hideable/expandable for better mobile UX
 */
export default function StatusBottomBar({ stations, activeStationId }: StatusBottomBarProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const activeIndex = stations.findIndex(s => s.id === activeStationId);
    const activeStation = stations.find(s => s.id === activeStationId);
    const totalCount = stations.length;

    return (
        <>
            {/* Mobile Bottom Bar - Only visible on mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
                {/* Expanded View */}
                {isExpanded && (
                    <div className="bg-[rgba(13,27,42,0.98)] backdrop-blur-xl border-t border-[rgba(0,206,209,0.2)] p-4 pb-20">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-sm font-semibold uppercase tracking-wide text-[#00CED1] ${DINEng.className}`}>
                                Your Journey
                            </h3>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="p-1 text-gray-400 hover:text-white"
                                aria-label="Collapse status"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* Station List */}
                        <div className="space-y-3">
                            {stations.map((st, index) => {
                                const isActive = st.id === activeStationId;
                                let statusColor = COLORS.FUTURE;
                                if (index < activeIndex) statusColor = COLORS.COMPLETED;
                                if (isActive) statusColor = COLORS.ACTIVE;

                                const titleColor = isActive ? "text-white" : index < activeIndex ? "text-[#00CED1]" : "text-gray-400";

                                return (
                                    <div key={st.id} className="flex items-center gap-3">
                                        <span
                                            className="w-3 h-3 rounded-full shrink-0"
                                            style={{ backgroundColor: statusColor, boxShadow: isActive ? `0 0 10px ${statusColor}` : 'none' }}
                                        />
                                        <div className="flex-1 flex items-center gap-2">
                                            <span className={`text-sm font-medium ${titleColor}`}>{st.title}</span>
                                            {isActive && (
                                                <span className="text-[10px] bg-[#FF6B35] text-white px-2 py-0.5 rounded-full">
                                                    ACTIVE
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Collapsed Bar */}
                <div
                    className="bg-[rgba(13,27,42,0.98)] backdrop-blur-xl border-t border-[rgba(0,206,209,0.2)] px-4 py-3 flex items-center justify-between cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            {stations.map((_, index) => (
                                <span
                                    key={index}
                                    className="w-2 h-2 rounded-full"
                                    style={{
                                        backgroundColor: index < activeIndex ? COLORS.COMPLETED : index === activeIndex ? COLORS.ACTIVE : COLORS.FUTURE
                                    }}
                                />
                            ))}
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-400">Station </span>
                            <span className="text-[#FF6B35] font-semibold">{activeStationId}</span>
                            <span className="text-gray-400"> of {totalCount}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 hidden sm:block">{activeStation?.subtitle}</span>
                        <svg
                            className={`w-5 h-5 text-[#00CED1] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Spacer to prevent content from being hidden behind bottom bar */}
            <div className="lg:hidden h-14" />
        </>
    );
}
