import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Shield, Award, HeartHandshake } from 'lucide-react';

interface ControlsOverlayProps {
  onMove: (dir: 'up' | 'down' | 'left' | 'right') => void;
  onAttack: (type: 'pistol' | 'gatling' | 'whip') => void;
  onRoll: () => void;
  onEatMeat: () => void;
  meatCount: number;
  haki: number;
}

export const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  onMove,
  onAttack,
  onRoll,
  onEatMeat,
  meatCount,
  haki,
}) => {
  return (
    <div className="w-full flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-3.5 bg-slate-900/95 border-2 border-slate-800 p-3.5 rounded-2xl shadow-2xl select-none items-stretch">
      
      {/* Upper Column: Active Game Info Banner */}
      <div className="col-span-1 sm:col-span-2 flex items-center justify-between border-b-2 border-slate-800/80 pb-2 flex-wrap gap-2">
        <span className="text-amber-400 font-mono font-black uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          ⚔️ PODERES Y CONTROLES GUM-GUM
        </span>
        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800 rounded px-1.5 py-0.5 uppercase tracking-widest font-bold">Teclado Activo (PC)</span>
      </div>

      {/* Left Column (sm) / Top Row (lg): Digital D-Pad movement controls */}
      <div className="flex flex-col items-center justify-center p-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 text-center leading-none">Mover Luffy (WASD / Flechas)</span>
        
        {/* Diamond D-Pad Layout */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
          {/* Background cross panel */}
          <div className="absolute w-11 h-32 md:w-12 md:h-36 bg-slate-800/80 rounded-lg border-2 border-slate-700 shadow-md" />
          <div className="absolute h-11 w-32 md:h-12 md:w-36 bg-slate-800/80 rounded-lg border-2 border-slate-700 shadow-md" />
          <div className="absolute w-10 h-10 bg-slate-900 rounded-full z-10 border border-slate-850 shadow-inner flex items-center justify-center text-slate-600 text-[10px] font-bold">⚓</div>
 
          {/* Up arrow */}
          <button 
            onTouchStart={(e) => { e.preventDefault(); onMove('up'); }}
            onClick={() => onMove('up')}
            className="absolute top-0 w-11 h-11 md:w-12 md:h-12 flex flex-col items-center justify-center rounded-t-lg bg-slate-700 hover:bg-slate-600 border-2 border-slate-650 hover:border-slate-500 text-slate-300 hover:text-white active:scale-95 z-20 transition-all cursor-pointer shadow-md"
            title="Mover Arriba (W / ↑)"
          >
            <ArrowUp className="w-4 h-4 text-amber-400" />
            <span className="text-[8px] font-black text-slate-300">W</span>
          </button>
 
          {/* Down arrow */}
          <button 
            onTouchStart={(e) => { e.preventDefault(); onMove('down'); }}
            onClick={() => onMove('down')}
            className="absolute bottom-0 w-11 h-11 md:w-12 md:h-12 flex flex-col items-center justify-center rounded-b-lg bg-slate-700 hover:bg-slate-600 border-2 border-slate-650 hover:border-slate-500 text-slate-300 hover:text-white active:scale-95 z-20 transition-all cursor-pointer shadow-md"
            title="Mover Abajo (S / ↓)"
          >
            <span className="text-[8px] font-black text-slate-300">S</span>
            <ArrowDown className="w-4 h-4 text-amber-400" />
          </button>
 
          {/* Left arrow */}
          <button 
            onTouchStart={(e) => { e.preventDefault(); onMove('left'); }}
            onClick={() => onMove('left')}
            className="absolute left-0 w-11 h-11 md:w-12 md:h-12 flex flex-row items-center justify-center gap-0.5 rounded-l-lg bg-slate-700 hover:bg-slate-600 border-2 border-slate-650 hover:border-slate-500 text-slate-300 hover:text-white active:scale-95 z-20 transition-all cursor-pointer shadow-md"
            title="Mover Izquierda (A / ←)"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span className="text-[8px] font-black text-slate-300">A</span>
          </button>
 
          {/* Right arrow */}
          <button 
            onTouchStart={(e) => { e.preventDefault(); onMove('right'); }}
            onClick={() => onMove('right')}
            className="absolute right-0 w-11 h-11 md:w-12 md:h-12 flex flex-row items-center justify-center gap-0.5 rounded-r-lg bg-slate-700 hover:bg-slate-600 border-2 border-slate-650 hover:border-slate-500 text-slate-300 hover:text-white active:scale-95 z-20 transition-all cursor-pointer shadow-md"
            title="Mover Derecha (D / →)"
          >
            <span className="text-[8px] font-black text-slate-300">D</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
 
      {/* Right Column (sm) / Bottom Row (lg): Interactive Action Trigger buttons */}
      <div className="flex flex-col justify-between gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest text-center leading-none">Ataques Especiales Haki</span>
        
        {/* Main Attack buttons grids */}
        <div className="grid grid-cols-2 gap-2.5 justify-center items-center py-0.5">
          {/* Button A: Gum-Gum Pistol */}
          <button
            onTouchStart={(e) => { e.preventDefault(); onAttack('pistol'); }}
            onClick={() => onAttack('pistol')}
            className="h-14 md:h-16 flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 border-2 border-amber-400 active:scale-95 text-white font-bold transition-all shadow-md cursor-pointer group"
          >
            <span className="text-xl leading-none group-hover:scale-110 transition-transform">👊</span>
            <span className="text-[9px] font-mono tracking-wide font-black">PISTOLA</span>
            <span className="text-[8px] font-bold text-amber-300">Espacio</span>
          </button>
 
          {/* Button B: Dash / Minish Roll */}
          <button
            onTouchStart={(e) => { e.preventDefault(); onRoll(); }}
            onClick={onRoll}
            className="h-14 md:h-16 flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 border-2 border-teal-400 active:scale-95 text-white font-bold transition-all shadow-md cursor-pointer group"
          >
            <span className="text-xl leading-none group-hover:rotate-12 transition-transform">🌀</span>
            <span className="text-[9px] font-mono tracking-wide font-black">GIRO</span>
            <span className="text-[8px] font-bold text-teal-300">Shift</span>
          </button>
 
          {/* Special Weapon X: Gatling flurry */}
          <button
            onTouchStart={(e) => { if (haki >= 10) { e.preventDefault(); onAttack('gatling'); } }}
            onClick={() => onAttack('gatling')}
            disabled={haki < 10}
            className={`h-14 md:h-16 flex flex-col items-center justify-center rounded-xl transition-all shadow-md cursor-pointer group ${
              haki >= 10
                ? 'bg-gradient-to-b from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-amber-500 border-2 border-yellow-300 text-slate-950 font-bold active:scale-95'
                : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed opacity-50'
            }`}
          >
            <span className="text-xl leading-none group-hover:animate-pulse">💥</span>
            <span className="text-[9px] font-mono tracking-wide font-black">METRALLETA</span>
            <span className="text-[8px] font-bold text-slate-900">E / 1 (10 Hk)</span>
          </button>
 
          {/* Special Weapon Y: Gum Gum Whip */}
          <button
            onTouchStart={(e) => { if (haki >= 15) { e.preventDefault(); onAttack('whip'); } }}
            onClick={() => onAttack('whip')}
            disabled={haki < 15}
            className={`h-14 md:h-16 flex flex-col items-center justify-center rounded-xl transition-all shadow-md cursor-pointer group ${
              haki >= 15
                ? 'bg-gradient-to-b from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 border-2 border-purple-400 text-white font-bold active:scale-95 animate-pulse'
                : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed opacity-50'
            }`}
          >
            <span className="text-xl leading-none group-hover:scale-110 transition-transform">🌪️</span>
            <span className="text-[9px] font-mono tracking-wide font-black font-semibold">LÁTIGO</span>
            <span className="text-[8px] font-bold text-purple-200">R / 2 (15 Hk)</span>
          </button>
        </div>
 
        {/* Quick heal touch target */}
        <button
          onTouchStart={(e) => { if (meatCount > 0) { e.preventDefault(); onEatMeat(); } }}
          onClick={onEatMeat}
          disabled={meatCount === 0}
          className={`py-2 px-3 rounded-xl border-2 flex items-center justify-center gap-2 font-mono font-bold text-[10px] md:text-xs transition-all cursor-pointer ${
            meatCount > 0
              ? 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-500 text-rose-300 active:scale-95 shadow-md shadow-rose-950/20'
              : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
          }`}
        >
          <span>🍖 COMER CARNE (H / Q)</span>
          <span className="bg-rose-500/20 border border-rose-500/30 px-1.5 py-0.5 rounded text-[8px] font-black">{meatCount} DISP</span>
        </button>
      </div>
    </div>
  );
};
