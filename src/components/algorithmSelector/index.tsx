"use client";

import { CryptographyAlgorithm, algorithmInfo } from "@/utils/cryptography";

interface AlgorithmSelectorProps {
  value: CryptographyAlgorithm;
  onChange: (algorithm: CryptographyAlgorithm) => void;
  className?: string;
}

export default function AlgorithmSelector({ value, onChange, className = "" }: AlgorithmSelectorProps) {
  const algorithms: CryptographyAlgorithm[] = ['caesar', 'vigenere', 'base64', 'rot13'];

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-white mb-2">
        Algoritmo de Criptografia
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CryptographyAlgorithm)}
        className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00ffc3] focus:border-transparent transition-all duration-200 min-h-[44px] text-sm sm:text-base"
      >
        {algorithms.map((algorithm) => (
          <option key={algorithm} value={algorithm}>
            {algorithmInfo[algorithm].name}
          </option>
        ))}
      </select>
      
      {/* Descrição do algoritmo selecionado */}
      <div className="mt-2 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
        <p className="text-xs sm:text-sm text-gray-300 mb-1">
          {algorithmInfo[value].description}
        </p>
        <p className="text-xs text-[#00ffc3] font-mono">
          Exemplo: {algorithmInfo[value].example}
        </p>
      </div>
    </div>
  );
}