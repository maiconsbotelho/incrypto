"use client";

import { useState } from "react";
import { CampoEntrada } from "../campoEntrada";
import { CampoSelecao } from "../campoSelecao";
import { Botao } from "../botao";
import { Display } from "../display";
import NetworkBackground from "@/components/NetworkBackground";
import Logo from "../logo";
import Modal from "../modal";

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
  const [mensagem, setMensagem] = useState("");
  const [deslocamento, setDeslocamento] = useState(0);
  const [resultado, setResultado] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function gerarHashPalavra(palavra: string) {
    let hash = 0;
    for (let i = 0; i < palavra.length; i++) {
      hash = (hash << 5) - hash + palavra.charCodeAt(i);
    }
    return Math.abs(hash).toString(16);
  }

  function gerarCaractereExtra(palavra: string, indice: number) {
    const hash = gerarHashPalavra(palavra);
    return hash[indice % hash.length];
  }

  function cifrar(texto: string, deslocamento: number) {
    const textoCriptografado: string[] = [];
    for (let i = 0; i < texto.length; i++) {
      const charAtual = texto[i];
      const indiceOriginal = alfabeto.indexOf(charAtual);
      if (indiceOriginal !== -1) {
        const novoIndice = (indiceOriginal + deslocamento) % alfabeto.length;
        const novaLetra = alfabeto[novoIndice];
        const substituida = alfabetoSubstituto[alfabeto.indexOf(novaLetra)];
        textoCriptografado.push(substituida);
        const caractereExtra = gerarCaractereExtra(texto, i);
        textoCriptografado.push(caractereExtra);
      } else {
        textoCriptografado.push(charAtual);
      }
    }
    return textoCriptografado.join("");
  }

  async function handleCriptografar() {
    setIsLoading(true);
    // Simula um delay para mostrar o loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    const textoMaiusculo = mensagem.toUpperCase();
    const resultadoFinal = cifrar(textoMaiusculo, deslocamento);
    setResultado(resultadoFinal);
    setIsLoading(false);
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-8 sm:pt-12 md:pt-16 lg:pt-20 justify-start text-white font-sans px-4 sm:px-6 md:px-8 overflow-hidden">
      <NetworkBackground />
      <Logo />
      <div className="w-full flex flex-col items-center justify-center max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-4xl mt-6 sm:mt-8 gap-4 sm:gap-6 z-10">
        <CampoEntrada 
          id="mensagem" 
          label="Mensagem:" 
          value={mensagem} 
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua mensagem aqui..."
        />
        <CampoSelecao
          id="deslocamento"
          label="Deslocamento:"
          value={deslocamento}
          options={alfabeto}
          onChange={(e) => setDeslocamento(Number(e.target.value))}
        />
        <Botao onClick={handleCriptografar}>Criptografar</Botao>
        {/* Espaço responsivo para o resultado */}
        <div className="w-full mt-4 sm:mt-6">
          <div className="min-h-16 flex items-start justify-center">
            {(resultado || isLoading) && <Display result={resultado} isLoading={isLoading} />}
          </div>
        </div>
      </div>
      <Modal
        isOpen={false}
        onClose={() => {}}
        title="Como usar o Incrypto"
      >
        <ul className="list-disc pl-5 space-y-2">
          <li>Digite a mensagem que deseja criptografar</li>
          <li>Escolha o deslocamento (número de posições para mover cada letra)</li>
          <li>Clique em 'Criptografar' para ver o resultado</li>
          <li>A cifra de César substitui cada letra por outra que está um número fixo de posições à frente no alfabeto</li>
        </ul>
      </Modal>
    </main>
  );
}
