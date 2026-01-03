"use client";

import { CryptographyAlgorithm, algorithmInfo } from "@/utils/cryptography";
import { useEffect, useRef, useState } from "react";

interface AlgorithmSelectorProps {
  value: CryptographyAlgorithm;
  onChange: (algorithm: CryptographyAlgorithm) => void;
  className?: string;
}

export default function AlgorithmSelector({ value, onChange, className = "" }: AlgorithmSelectorProps) {
  const algorithms: CryptographyAlgorithm[] = ['caesar', 'vigenere', 'base64', 'rot13'];
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const [isClient, setIsClient] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (showTooltip && tooltipRef.current && isClient) {
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
  }, [showTooltip, value, isClient]);

  return (
    <div className={`w-full ${className} relative`}>
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-white">
          Algoritmo de Criptografia
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
              className="fixed z-10 w-72 sm:w-80 p-3 bg-gray-900 border border-gray-600 rounded-lg shadow-lg"
              style={{
                left: `${tooltipPosition.left}px`,
                top: `${tooltipPosition.top}px`
              }}
            >
              <p className="text-xs sm:text-sm text-gray-300 mb-2">
                <strong className="text-white">{algorithmInfo[value].name}:</strong> {algorithmInfo[value].description}
              </p>
              <p className="text-xs text-[#00ffc3] font-mono">
                Exemplo: {algorithmInfo[value].example}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CryptographyAlgorithm)}
        className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00ffc3] focus:border-transparent transition-all duration-200 min-h-[44px] text-sm sm:text-base"
        style={{
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
      >
        {algorithms.map((algorithm) => (
          <option key={algorithm} value={algorithm}>
            {algorithmInfo[algorithm].name}
          </option>
        ))}
      </select>
    </div>
  );
}