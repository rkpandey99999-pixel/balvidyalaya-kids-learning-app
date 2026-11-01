import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Trash2, Sparkles, Volume2, ArrowLeft } from 'lucide-react';
import { sound } from '../utils/sound';

interface MagicSlateProps {
  traceChar?: string;
  onClose?: () => void;
  onAddStar: () => void;
}

const CHALK_COLORS = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Yellow', hex: '#FDE047' },
  { name: 'Pink', hex: '#F472B6' },
  { name: 'Cyan', hex: '#38BDF8' },
  { name: 'Lime', hex: '#A3E635' },
  { name: 'Orange', hex: '#FB923C' }
];

export const MagicSlate: React.FC<MagicSlateProps> = ({
  traceChar = 'A',
  onClose,
  onAddStar
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeColor, setActiveColor] = useState('#FDE047');
  const [chalkSize, setChalkSize] = useState(14);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showTraceGuide, setShowTraceGuide] = useState(true);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize and resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const getCanvasCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const pos = getCanvasCoordinates(e);
    lastPosRef.current = pos;
    sound.playTap();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !lastPosRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getCanvasCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = chalkSize;
    ctx.shadowBlur = 6;
    ctx.shadowColor = activeColor;
    ctx.stroke();

    lastPosRef.current = currentPos;
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      lastPosRef.current = null;
      onAddStar();
    }
  };

  const clearCanvas = () => {
    sound.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 max-w-4xl mx-auto w-full select-none overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={() => {
                sound.playTap();
                onClose();
              }}
              className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm flex items-center gap-1 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 text-xs sm:text-sm font-bold text-amber-950">
            <span>जादुई स्लेट (Magic Slate)</span>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              setShowTraceGuide(!showTraceGuide);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
              showTraceGuide
                ? 'bg-amber-500 text-white'
                : 'bg-white text-slate-700 border border-amber-200'
            }`}
          >
            Trace Guide: {showTraceGuide ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Chalk Color Palette */}
        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-2xl border border-slate-700 shadow-md">
          {CHALK_COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => {
                sound.playTap();
                setActiveColor(c.hex);
              }}
              style={{ backgroundColor: c.hex }}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all active:scale-90 ${
                activeColor === c.hex ? 'border-white scale-110 shadow-md' : 'border-transparent opacity-80'
              }`}
              title={c.name}
            />
          ))}

          <button
            onClick={clearCanvas}
            className="ml-1 p-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-all active:scale-90"
            title="Clean Slate"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Blackboard Surface with Wooden Frame */}
      <div className="flex-1 w-full relative min-h-0 rounded-3xl border-8 sm:border-12 border-amber-800 bg-[#1e293b] shadow-2xl overflow-hidden flex items-center justify-center cursor-crosshair">
        {/* Faint guide letter for tracing */}
        {showTraceGuide && traceChar && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-20">
            <span className="text-[200px] sm:text-[340px] font-black text-white font-baloo tracking-tight">
              {traceChar}
            </span>
          </div>
        )}

        {/* Interactive Drawing Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full z-10 touch-none"
        />

        {/* Bottom wooden chalk ledge hint */}
        <div className="absolute bottom-2 z-20 pointer-events-none opacity-60 text-xs sm:text-sm font-bold text-amber-200">
          ✏️ Draw with your finger or mouse using colorful glowing chalk!
        </div>
      </div>
    </div>
  );
};
