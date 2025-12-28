
import React from 'react';

export const ScreenContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center p-6 sm:p-12">
    <div className="w-full max-w-2xl bg-white border border-stone-200 card-shadow p-8 md:p-12 rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-[#78350f]"></div>
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
    className={`px-10 py-3.5 bg-[#78350f] text-white text-lg font-medium rounded-full hover:bg-[#451a03] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
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
    className={`px-8 py-3 bg-white border-2 border-stone-200 text-stone-600 hover:border-stone-400 hover:bg-stone-50 transition-all duration-200 rounded-full font-medium ${className}`}
  >
    {children}
  </button>
);
