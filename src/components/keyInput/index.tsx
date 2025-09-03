"use client";

import { useState, useRef, useEffect } from "react";
import { CryptographyAlgorithm, algorithmInfo } from "@/utils/cryptography";

interface KeyInputProps {
  algorithm: CryptographyAlgorithm;
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

export default function KeyInput({ algorithm, value, onChange, className = "" }: KeyInputProps) {
  const info = algorithmInfo[algorithm];
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const tooltipRect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Centralizar horizontalmente na tela
      const left = (viewportWidth - tooltipRect.width) / 2;
      // Posicionar verticalmente no centro da tela
      const top = (viewportHeight - tooltipRect.height) / 2;

      setTooltipPosition({ left, top });

      // Timer para fechar automaticamente após 3 segundos
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [showTooltip, algorithm]);
  
  // Algoritmos que não precisam de chave
  if (info.keyType === 'none') {
    return null;
  }

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    if (info.keyType === 'number') {
      const numValue = parseInt(newValue) || 0;
      onChange(numValue);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className={`w-full ${className} relative`}>
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-white">
          {info.keyLabel}
        </label>
        <div 
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button
            ref={buttonRef}
            type="button"
            className="w-4 h-4 rounded-full bg-gray-600 text-white text-xs flex items-center justify-center hover:bg-gray-500 transition-colors"
            onClick={() => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              setShowTooltip(!showTooltip);
            }}
          >
            i
          </button>
          
          {/* Tooltip */}
          {showTooltip && (
            <div 
              ref={tooltipRef}
              className="fixed z-10 w-60 sm:w-64 p-3 bg-gray-900 border border-gray-600 rounded-lg shadow-lg"
              style={{
                left: `${tooltipPosition.left}px`,
                top: `${tooltipPosition.top}px`
              }}
            >
              <p className="text-xs sm:text-sm text-gray-300">
                {info.keyType === 'number' 
                  ? 'Número de posições para deslocar cada letra no alfabeto (1-25). Exemplo: com deslocamento 3, A vira D, B vira E, etc.'
                  : 'Palavra ou frase usada como chave para a criptografia. Cada letra da chave determina o deslocamento da letra correspondente no texto.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
      
      {info.keyType === 'number' ? (
        <select
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00ffc3] focus:border-transparent transition-all duration-200 min-h-[44px] text-sm sm:text-base"
        >
          {Array.from({ length: 25 }, (_, i) => i + 1).map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={info.keyPlaceholder}
          className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ffc3] focus:border-transparent transition-all duration-200 min-h-[44px] text-sm sm:text-base"
        />
      )}
    </div>
  );
}