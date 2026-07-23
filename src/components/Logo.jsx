import React from 'react';

export default function Logo({ light = false, className = "" }) {
  const textColor = light ? "text-white" : "text-graphite";

  return (
    <div className={`inline-flex items-center space-x-2 select-none group ${className}`}>
      {/* RP Monogram with gradient from reddish-terracotta (#E0533C) to warm amber (#F2994A) */}
      <div className="relative flex items-center justify-center font-bold tracking-tighter leading-none text-2xl md:text-3xl font-sans">
        <span className="text-gradient-rp font-extrabold text-3xl md:text-4xl leading-none tracking-tight">
          RP
        </span>
      </div>

      {/* Brand Text Stack */}
      <div className="flex flex-col justify-center leading-tight">
        <span className={`text-base md:text-lg font-bold tracking-tight ${textColor}`}>
          Utilidades
        </span>
        <span className={`text-base md:text-lg font-bold tracking-tight -mt-1 ${textColor}`}>
          Gourmet
        </span>
      </div>
    </div>
  );
}
