import React from 'react';
import { PlayerState } from '../types';
import { Heart, Key, Navigation, Sparkles, Check } from 'lucide-react';

interface GameHUDProps {
  player: PlayerState;
  onEatMeat: () => void;
  onReset: () => void;
  currentLevel: number;
}

export const GameHUD: React.FC<GameHUDProps> = ({ player, onEatMeat, onReset, currentLevel }) => {
  // Translate HP (each heart represents 4 HP, so 12 HP = 3 full hearts)
  const renderHearts = () => {
    const totalHearts = Math.ceil(player.maxHp / 4);
    const heartsList = [];

    for (let i = 0; i < totalHearts; i++) {
      const heartStartHp = i * 4;
      const currentFill = Math.max(0, Math.min(4, player.hp - heartStartHp));

      // Determine heart visual representation
      if (currentFill >= 4) {
        // Full Heart
        heartsList.push(
          <div key={i} className="relative w-7 h-7 flex items-center justify-center animate-bounce-subtle" style={{ animationDelay: `${i * 150}ms` }}>
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500 stroke-rose-600 drop-shadow-[0_2px_4px_rgba(244,63,94,0.4)]" />
          </div>
        );
      } else if (currentFill > 0) {
        // Half Heart
        heartsList.push(
          <div key={i} className="relative w-7 h-7 flex items-center justify-center">
            {/* Base Empty Heart */}
            <Heart className="absolute w-7 h-7 text-rose-300 stroke-rose-600 opacity-60" />
            {/* Half Filled overlay */}
            <div className="absolute w-[50%] h-full overflow-hidden left-0 flex justify-start">
              <Heart className="w-7 h-7 text-rose-500 fill-rose-500 stroke-rose-600 max-w-none" />
            </div>
          </div>
        );
      } else {
        // Empty Heart
        heartsList.push(
          <div key={i} className="relative w-7 h-7 flex items-center justify-center opacity-40">
            <Heart className="w-7 h-7 text-slate-400 stroke-slate-500 fill-slate-300" />
          </div>
        );
      }
    }
    return heartsList;
  };

  return (
    <div className="w-full flex flex-col gap-1.5 sm:gap-3 bg-slate-900 border border-slate-700/80 p-2 sm:p-4 rounded-xl shadow-2xl backdrop-blur-md">
      {/* Current Level Indicator Header Badge */}
      <div className="flex items-center justify-between bg-slate-950/65 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 border border-slate-800/85">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[8px] sm:text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30 font-extrabold">
            NIVEL {currentLevel}
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-200">
            {currentLevel === 1 ? '📦 SÓTANO' : currentLevel === 2 ? '⛵ CUBIERTA PRINCIPAL' : '💂‍♂️ BASE MARINA'}
          </span>
        </div>
        <div className="text-[8px] sm:text-[9px] font-mono text-slate-400 hidden md:block">
          {currentLevel === 1 ? 'Objetivo: Consigue la llave en (13, 8), abre el portón y sube la escalera en (13, 2)' : 'Objetivo: Derrota a Alvida, consigue el mapa en la cabina y escapa en el bote en (1, 10)'}
        </div>
      </div>

      {/* Top row: Hearts & Status Bar */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto">
        {/* Heart container lists */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">HP:</span>
          <div className="flex items-center gap-0.5 sm:gap-1">
            {renderHearts()}
          </div>
          <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-300 bg-slate-800/80 px-1.5 py-0.5 rounded-md border border-slate-700/50">
            {player.hp}/{player.maxHp}
          </span>
        </div>

        {/* Haki bar (Stamina) */}
        <div className="flex items-center gap-1.5 flex-1 max-w-[130px] sm:max-w-[200px]">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-amber-400 flex items-center gap-0.5 uppercase shrink-0">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> ST:
          </span>
          <div className="relative flex-1 h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 transition-all duration-100 ease-out"
              style={{ width: `${(player.haki / player.maxHaki) * 100}%` }}
            />
            {player.haki >= player.maxHaki && (
              <span className="absolute inset-x-0 inset-y-0 text-[6.5px] tracking-tight text-center text-slate-900 font-extrabold select-none flex items-center justify-center leading-none">
                HAKI OK
              </span>
            )}
          </div>
        </div>

        {/* Inventory Items Grid */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Key */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400">🔑</span>
            <div className={`p-1 rounded-md border flex items-center justify-center transition-all ${
              player.hasKey 
                ? 'bg-amber-500/20 border-amber-500 text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)] animate-pulse' 
                : 'bg-slate-950/80 border-slate-800 text-slate-600'
            }`}>
              <Key className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Navigation Map or swords */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400">{currentLevel === 3 ? '⚔️' : '🗺️'}</span>
            <div className={`p-1 rounded-md border flex items-center justify-center transition-all ${
              (currentLevel === 3 ? player.hasSwords : player.hasMap)
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 drop-shadow-[0_2px_8px_rgba(16,185,129,0.3)] animate-pulse' 
                : 'bg-slate-950/80 border-slate-800 text-slate-600'
            }`}>
              <Navigation className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-slate-800 w-full" />

      {/* Bottom row: Food Counter / Quick heals + controls prompt */}
      <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs font-mono text-slate-400">
        {/* Meat heal counter */}
        <div className="flex items-center gap-1">
          <button 
            onClick={onEatMeat}
            disabled={player.meatCount === 0 || player.hp >= player.maxHp}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-bold text-[10px] sm:text-xs uppercase cursor-pointer transition-all ${
              player.meatCount > 0 && player.hp < player.maxHp
                ? 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-500 text-rose-300 drop-shadow-[0_2px_4px_rgba(244,63,94,0.15)] active:scale-95'
                : 'bg-slate-950/40 border-slate-800 text-slate-500 cursor-not-allowed'
            }`}
            title="Sana (Restaurar 4 HP) al comer Carne"
          >
            <span>🍖 Carne: {player.meatCount}</span>
            <span className="hidden sm:inline bg-slate-950/60 text-slate-400 px-1 py-0.5 rounded text-[8px] border border-slate-800">Cliquear / H</span>
          </button>
        </div>

        {/* Action Controls tutorial tags for Desktop/PC only */}
        <div className="hidden md:flex items-center gap-x-2 text-[10px] bg-slate-950/50 px-2.5 py-1 rounded-lg border border-slate-800/60">
          <span className="text-[9px] text-amber-500 font-extrabold uppercase.">Bindeos:</span>
          <span>[WASD] Mover</span>
          <span className="text-slate-600">•</span>
          <span>[Espacio] Puño</span>
          <span className="text-slate-600">•</span>
          <span>[Shift] Dash</span>
        </div>

        {/* Right side utility resets */}
        <button 
          onClick={onReset}
          className="px-2 py-1 border border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-700/80 active:scale-95 text-slate-300 rounded-lg font-bold text-[10px] sm:text-xs uppercase transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
