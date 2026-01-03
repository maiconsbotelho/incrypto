"use client";

import NetworkBackground from "@/components/NetworkBackground";
import { algorithmInfo, autoDecrypt, CryptographyAlgorithm, decrypt, encrypt } from "@/utils/cryptography";
import { useState } from "react";
import AlgorithmSelector from "../algorithmSelector";
import { Botao } from "../botao";
import { CampoEntrada } from "../campoEntrada";
import { Display } from "../display";
import HelpButton from "../helpButton";
import KeyInput from "../keyInput";
import Logo from "../logo";
import Modal from "../modal";
import Tutorial from "../tutorial";

const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
const alfabetoSubstituto = [
  "@",
  "s",
  "4",
  "1",
  "m",
  "n",
  "b",
  "!",
  "7",
  "x",
  "9",
  "6",
  "3",
  "%",
  "f",
  "&",
  "5",
  "L",
  "K",
  "J",
  "2",
  "#",
  "8",
  "Q",
  "A",
  "Z",
  "g",
  "t",
  "v",
  "E",
  "D",
  "C",
  "$",
  "0",
  "P",
  "h",
];

export default function HomePage() {
  const [texto, setTexto] = useState("");
  const [algorithm, setAlgorithm] = useState<CryptographyAlgorithm>('caesar');
  const [key, setKey] = useState<string | number>(3);
  const [resultado, setResultado] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [tutorialAberto, setTutorialAberto] = useState(false);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [autoDetectResult, setAutoDetectResult] = useState<string>('');

  const handleAlgorithmChange = (newAlgorithm: CryptographyAlgorithm) => {
    setAlgorithm(newAlgorithm);
    // Reset key based on algorithm
    const info = algorithmInfo[newAlgorithm];
    if (info.keyType === 'number') {
      setKey(3);
    } else if (info.keyType === 'text') {
      setKey('');
    } else {
      setKey('');
    }
    // Clear result when changing algorithm
    setResultado('');
  };

  const handleCryptography = async () => {
    if (!texto.trim()) return;
    
    // Validar chave para algoritmos que precisam
    const info = algorithmInfo[algorithm];
    if (info.keyType === 'text' && (!key || key === '')) {
      setResultado('Por favor, insira uma chave para o algoritmo ' + info.name);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simula delay de processamento
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let result: string;
      
      if (mode === 'encrypt') {
        const encryptResult = encrypt(texto, algorithm, key);
        result = encryptResult.result;
      } else {
        const decryptResult = decrypt(texto, algorithm, key);
        result = decryptResult.result;
      }
      
      setResultado(result);
      setAutoDetectResult(''); // Clear auto-detect when manual operation
    } catch (error) {
      console.error('Erro na criptografia:', error);
      setResultado('Erro ao processar o texto');
    }
    
    setIsLoading(false);
  };

  const handleAutoDecrypt = async () => {
    if (!texto.trim()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const autoResult = autoDecrypt(texto);
      
      if (autoResult.algorithm) {
        setResultado(autoResult.result);
        setAutoDetectResult(
          `🤖 Detectado: ${algorithmInfo[autoResult.algorithm].name} (Confiança: ${autoResult.confidence === 'high' ? 'Alta' : autoResult.confidence === 'medium' ? 'Média' : 'Baixa'})`
        );
        
        // Update algorithm and key if detected
        setAlgorithm(autoResult.algorithm);
        if (autoResult.alternatives.length > 0 && autoResult.alternatives[0].key) {
          setKey(autoResult.alternatives[0].key);
        }
      } else {
        setResultado(autoResult.result);
        setAutoDetectResult('❌ Detecção automática falhou');
      }
    } catch (error) {
      console.error('Erro na detecção automática:', error);
      setResultado('Erro na detecção automática');
      setAutoDetectResult('❌ Erro na detecção');
    }
    
    setIsLoading(false);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-8 sm:pt-12 md:pt-16 lg:pt-20 justify-start text-white font-sans px-4 sm:px-6 md:px-8 overflow-hidden">
      <NetworkBackground />
      <Logo />
      
      {/* Visor de Resultado no Topo - Sempre Visível */}
      <div className="w-full flex flex-col items-center justify-center max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-4xl mt-6 sm:mt-8 z-10 px-4">
        <div className="w-full max-w-md space-y-4 transition-all duration-500 ease-in-out">
          {autoDetectResult && (
              <div className="w-full mb-4 p-3 bg-purple-900/30 border border-purple-600/50 rounded-lg animate-slideDown transition-all duration-300">
                <p className="text-purple-300 text-sm text-center animate-fadeIn">
                  {autoDetectResult}
                </p>
              </div>
            )}
          <Display 
            result={resultado || "Aguardando entrada..."} 
            isLoading={isLoading} 
            algorithm={algorithmInfo[algorithm].name}
            showCopyButton={!!resultado}
          />
        </div>
      </div>
      
      <div className="w-full flex flex-col items-center justify-center max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-4xl mt-4 sm:mt-6 gap-4 sm:gap-6 z-10">
        <div className="w-full max-w-md space-y-6 transition-all duration-500 ease-in-out">
          {/* Seletor de Modo */}
          <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-600">
            <button
              onClick={() => setMode('encrypt')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                mode === 'encrypt'
                  ? 'bg-[#00ffc3] text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              🔒 Criptografar
            </button>
            <button
              onClick={() => setMode('decrypt')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                mode === 'decrypt'
                  ? 'bg-[#00ffc3] text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              🔓 Descriptografar
            </button>
          </div>

          {/* Seletores de Algoritmo e Chave */}
          <div className="flex gap-3">
            <div className="flex-1">
              <AlgorithmSelector
                value={algorithm}
                onChange={handleAlgorithmChange}
              />
            </div>
            
            {algorithmInfo[algorithm].keyType === 'number' && (
              <div className="w-24">
                <KeyInput
                  algorithm={algorithm}
                  value={key}
                  onChange={setKey}
                />
              </div>
            )}
          </div>
          
          {/* Chave de texto (quando necessária) */}
          {algorithmInfo[algorithm].keyType === 'text' && (
            <KeyInput
              algorithm={algorithm}
              value={key}
              onChange={setKey}
            />
          )}
          
          <CampoEntrada
              id="texto"
              label={mode === 'encrypt' ? "Texto para criptografar:" : "Texto para descriptografar:"}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder={mode === 'encrypt' 
                ? "Digite o texto para criptografar..." 
                : "Digite o texto para descriptografar..."
              }
            />
          
          <div className="space-y-3 w-full mx-auto flex flex-col transition-all duration-300 ease-in-out">
             <Botao onClick={handleCryptography}>
               {isLoading 
                 ? (mode === 'encrypt' ? "Criptografando..." : "Descriptografando...") 
                 : (mode === 'encrypt' ? "🔒 Criptografar" : "🔓 Descriptografar")
               }
             </Botao>
             
             {mode === 'decrypt' && (
                <Botao onClick={handleAutoDecrypt}>
                  {isLoading ? "Detectando..." : "🤖 Detecção Automática"}
                </Botao>
              )}
           </div>
           

        </div>
      </div>
      <Modal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        title="Sobre os Algoritmos de Criptografia"
      >
        <div className="space-y-4">
          {Object.entries(algorithmInfo).map(([key, info]) => (
            <div key={key} className="border-b border-gray-600 pb-3 last:border-b-0">
              <h3 className="font-semibold text-[#00ffc3] mb-2">{info.name}</h3>
              <p className="text-gray-300 text-sm mb-2">{info.description}</p>
              <p className="text-xs text-gray-400">
                <strong>Tipo de chave:</strong> {info.keyType === 'number' ? 'Numérica' : info.keyType === 'string' ? 'Texto' : 'Nenhuma'}
              </p>
            </div>
          ))}
        </div>
      </Modal>
      
      <Tutorial 
        isOpen={tutorialAberto}
        onClose={() => setTutorialAberto(false)}
      />
      
      <HelpButton 
        onTutorialClick={() => setTutorialAberto(true)}
        onAboutClick={() => setModalAberto(true)}
      />
    </main>
  );
}
