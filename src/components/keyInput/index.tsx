"use client";

import { CryptographyAlgorithm, algorithmInfo } from "@/utils/cryptography";

interface KeyInputProps {
  algorithm: CryptographyAlgorithm;
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

export default function KeyInput({ algorithm, value, onChange, className = "" }: KeyInputProps) {
  const info = algorithmInfo[algorithm];
  
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
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-white mb-2">
        {info.keyLabel}
      </label>
      
      {info.keyType === 'number' ? (
        <input
          type="number"
          value={value}
          onChange={handleChange}
          placeholder={info.keyPlaceholder}
          min="1"
          max="25"
          className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ffc3] focus:border-transparent transition-all duration-200 min-h-[44px] text-sm sm:text-base"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={info.keyPlaceholder}
          className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ffc3] focus:border-transparent transition-all duration-200 min-h-[44px] text-sm sm:text-base"
        />
      )}
      
      {/* Dica para o usuário */}
      <p className="mt-1 text-xs text-gray-400">
        {info.keyType === 'number' 
          ? 'Número de posições para deslocar (1-25)'
          : 'Palavra ou frase usada como chave'
        }
      </p>
    </div>
  );
}