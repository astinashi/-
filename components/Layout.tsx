
import React from 'react';

export const ScreenContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="h-screen w-screen flex flex-col bg-white">
    {/* 顶部彩色条纹饰面 */}
    <div className="flex w-full h-4">
      <div className="flex-1 bg-[#605bff]"></div>
      <div className="flex-1 bg-[#ff79b0]"></div>
      <div className="flex-1 bg-[#ffcc4d]"></div>
      <div className="flex-1 bg-[#1e293b]"></div>
    </div>
    <div className="flex-1 flex flex-col p-8 md:p-16 overflow-hidden">
      {children}
    </div>
  </div>
);

export const PrimaryButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}> = ({ onClick, children, className = "", disabled = false }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`bg-[#1e293b] hover:bg-[#605bff] px-12 py-6 text-white text-2xl md:text-3xl font-black transition-all duration-200 active:scale-[0.98] disabled:opacity-50 border-none uppercase tracking-tighter ${className}`}
  >
    {children}
  </button>
);

export const SecondaryButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, children, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-10 py-6 bg-white text-[#1e293b] border-4 border-[#1e293b] text-xl font-black transition-all duration-200 active:scale-[0.98] hover:bg-slate-50 ${className}`}
  >
    {children}
  </button>
);
