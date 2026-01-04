"use client";

import { CryptographyAlgorithm, algorithmInfo } from "@/utils/cryptography";
import { useState } from "react";

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  algorithm?: CryptographyAlgorithm;
  example?: {
    input: string;
    key: string | number;
    output: string;
  };
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "intro",
    title: "Bem-vindo ao Incrypto! 🔐",
    content: "A criptografia é a arte de proteger informações transformando-as em códigos secretos. Vamos explorar diferentes algoritmos e como eles funcionam!"
  },
  {
    id: "caesar",
    title: "Cifra de César 🏛️",
    content: "A cifra de César é um dos métodos mais antigos de criptografia. Cada letra é substituída por outra que está um número fixo de posições à frente no alfabeto.",
    algorithm: "caesar",
    example: {
      input: "HELLO",
      key: 3,
      output: "KHOOR"
    }
  },
  {
    id: "extended",
    title: "Cifra Estendida 🚀",
    content: "Uma versão moderna e poderosa! Ela remove espaços, dobra o tamanho da mensagem adicionando caracteres de ruído e suporta símbolos, números e letras.",
    algorithm: "extended",
    example: {
      input: "Oi 123",
      key: 3,
      output: "Rl#4$5%6"
    }
  },
  {
    id: "vigenere",
    title: "Cifra de Vigenère 🔑",
    content: "Mais segura que César, a cifra de Vigenère usa uma palavra-chave. Cada letra da mensagem é deslocada por um valor diferente baseado na chave.",
    algorithm: "vigenere",
    example: {
      input: "HELLO",
      key: "KEY",
      output: "RIJVS"
    }
  },
  {
    id: "base64",
    title: "Base64 📊",
    content: "Base64 não é criptografia, mas codificação. Converte dados binários em texto usando 64 caracteres seguros. Muito usado na web!",
    algorithm: "base64",
    example: {
      input: "Hello",
      key: "",
      output: "SGVsbG8="
    }
  },
  {
    id: "rot13",
    title: "ROT13 🔄",
    content: "ROT13 é uma variação especial da cifra de César com deslocamento fixo de 13. Aplicar ROT13 duas vezes retorna o texto original!",
    algorithm: "rot13",
    example: {
      input: "HELLO",
      key: "",
      output: "URYYB"
    }
  },
  {
    id: "security",
    title: "Segurança na Prática 🛡️",
    content: "Lembre-se: estes algoritmos são educacionais. Para segurança real, use algoritmos modernos como AES. A criptografia evoluiu muito desde César!"
  }
];

export default function Tutorial({ isOpen, onClose }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showExample, setShowExample] = useState(false);

  if (!isOpen) return null;

  const step = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;
  const isFirstStep = currentStep === 0;

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
      setShowExample(false);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
      setShowExample(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    setShowExample(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg border border-gray-600 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-600">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">{step.title}</h2>
            <span className="text-sm text-gray-400">({currentStep + 1}/{tutorialSteps.length})</span>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Fechar tutorial"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-[#00ffc3] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            {step.content}
          </p>

          {/* Algorithm Info */}
          {step.algorithm && (
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[#00ffc3] font-semibold">
                  {algorithmInfo[step.algorithm].name}
                </h3>
                <button
                  onClick={() => setShowExample(!showExample)}
                  className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition-colors"
                >
                  {showExample ? "Ocultar" : "Ver"} Exemplo
                </button>
              </div>
              
              <p className="text-gray-400 text-sm mb-3">
                {algorithmInfo[step.algorithm].description}
              </p>

              {showExample && step.example && (
                <div className="bg-gray-900 rounded p-3 font-mono text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-gray-400">Entrada:</span>
                      <div className="text-white bg-gray-800 p-2 rounded mt-1">
                        {step.example.input}
                      </div>
                    </div>
                    {step.example.key && (
                      <div>
                        <span className="text-gray-400">Chave:</span>
                        <div className="text-[#00ffc3] bg-gray-800 p-2 rounded mt-1">
                          {step.example.key}
                        </div>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">Saída:</span>
                      <div className="text-green-400 bg-gray-800 p-2 rounded mt-1">
                        {step.example.output}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Fun Facts */}
          {step.id === "caesar" && (
            <div className="bg-blue-900/30 border border-blue-600/50 rounded-lg p-4 mb-4">
              <p className="text-blue-300 text-sm">
                💡 <strong>Curiosidade:</strong> Júlio César usava um deslocamento de 3 para suas mensagens militares secretas!
              </p>
            </div>
          )}

          {step.id === "vigenere" && (
            <div className="bg-purple-900/30 border border-purple-600/50 rounded-lg p-4 mb-4">
              <p className="text-purple-300 text-sm">
                💡 <strong>Curiosidade:</strong> Por 300 anos, Vigenère foi considerada "indecifrável" até ser quebrada em 1863!
              </p>
            </div>
          )}

          {step.id === "rot13" && (
            <div className="bg-green-900/30 border border-green-600/50 rounded-lg p-4 mb-4">
              <p className="text-green-300 text-sm">
                💡 <strong>Curiosidade:</strong> ROT13 é usado em fóruns para "esconder" spoilers de filmes e livros!
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center p-6 border-t border-gray-600">
          <button
            onClick={prevStep}
            disabled={isFirstStep}
            className={`px-4 py-2 rounded transition-all ${
              isFirstStep 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            ← 
          </button>

          <div className="flex gap-2">
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentStep(index);
                  setShowExample(false);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStep 
                    ? 'bg-[#00ffc3]' 
                    : index < currentStep 
                      ? 'bg-gray-500' 
                      : 'bg-gray-700'
                }`}
              />
            ))}
          </div>

          {isLastStep ? (
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-[#00ffc3] text-black rounded hover:bg-[#00e6b0] transition-colors font-medium"
            >
              Finalizar ✓
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-[#00ffc3] text-black rounded hover:bg-[#00e6b0] transition-colors font-medium"
            >
               →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}