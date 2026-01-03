"use client";

import { useState, useRef, useEffect } from "react";

interface HelpButtonProps {
  onTutorialClick: () => void;
  onAboutClick: () => void;
}

export default function HelpButton({ onTutorialClick, onAboutClick }: HelpButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTutorialClick = () => {
    onTutorialClick();
    setIsMenuOpen(false);
  };

  const handleAboutClick = () => {
    onAboutClick();
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu flutuante */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="absolute bottom-16 right-0 bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-2 min-w-[200px] animate-slideDown"
        >
          <button
            onClick={handleTutorialClick}
            className="w-full text-left px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-3"
          >
            <span className="text-lg">🎓</span>
            <span className="text-sm font-medium">Tutorial Interativo</span>
          </button>
          <button
            onClick={handleAboutClick}
            className="w-full text-left px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-3"
          >
            <span className="text-lg">📚</span>
            <span className="text-sm font-medium">Sobre os Algoritmos</span>
          </button>
        </div>
      )}
      
      {/* Botão de ajuda */}
      <button
        ref={buttonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="w-14 h-14 bg-gradient-to-r from-[#00d2ff] via-[#3a47d5] to-[#7e1adb] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-xl font-bold"
        aria-label="Menu de ajuda"
      >
        ?
      </button>
    </div>
  );
}