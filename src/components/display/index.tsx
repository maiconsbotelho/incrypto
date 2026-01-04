"use client";

import { useEffect, useState } from "react";

interface DisplayProps {
  result: string;
  isLoading?: boolean;
  algorithm?: string;
  showCopyButton?: boolean;
}

export function Display({ result, isLoading = false, algorithm, showCopyButton = true }: DisplayProps) {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  useEffect(() => {
    if (!isLoading && isClient) {
      // Resetamos o texto antes de começar a digitar novamente
      setDisplayedText("");

      let index = 0;
      const typingSpeed = 20;

      const interval = setInterval(() => {
        if (index < result.length) {
          const nextChar = result.charAt(index);
          setDisplayedText((prev) => prev + nextChar);
          index++;
        } else {
          clearInterval(interval);
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    }
  }, [result, isLoading, isClient]);

  if (isLoading) {
    return (
      <div className="w-full mt-8 p-4 bg-black/40 rounded border border-white break-words text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          <p className="text-white">Processando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-8 p-4 bg-black/40 rounded border border-white break-words">
      {/* Header com algoritmo e botão copiar */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-400">
          {algorithm ? `Algoritmo: ${algorithm}` : 'Resultado'}
        </span>
        {result && showCopyButton && (
          <button
            onClick={handleCopy}
            className={`px-3 py-1 rounded text-xs font-medium transition-all duration-200 min-h-[32px] ${
              copied 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            disabled={copied}
          >
            {copied ? '✓ Copiado!' : '📋 Copiar'}
          </button>
        )}
      </div>
      
      {/* Resultado */}
      <div className="text-center">
        <p className="text-white font-mono text-sm sm:text-base break-all">
          {isClient ? displayedText : result}
        </p>
      </div>
    </div>
    );
  }
