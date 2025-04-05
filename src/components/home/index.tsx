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

  function handleCriptografar() {
    const textoMaiusculo = mensagem.toUpperCase();
    const resultadoFinal = cifrar(textoMaiusculo, deslocamento);
    setResultado(resultadoFinal);
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-20 justify-start text-white font-sans p-4 overflow-hidden">
      <NetworkBackground /> {/* 👈 insere o background */}
      <Logo />
      <div className="w-full flex flex-col items-center justify-center max-w-md lg:max-w-[90%] mt-8 gap-4 z-10">
        <CampoEntrada id="mensagem" label="Mensagem:" value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
        <CampoSelecao
          id="deslocamento"
          label="Deslocamento:"
          value={deslocamento}
          options={alfabeto}
          onChange={(e) => setDeslocamento(Number(e.target.value))}
        />
        <Botao onClick={handleCriptografar}>Criptografar</Botao>
        {/* Espaço fixo para o resultado */}
        <div className="w-full mt-4">
          <div className="min-h-16 flex items-start justify-center">{resultado && <Display result={resultado} />}</div>
        </div>
      </div>
      <Modal
        title="Como usar a aplicação"
        content={[
          "1. Insira a mensagem que deseja criptografar.",
          "2. Escolha o deslocamento desejado.",
          "3. Clique no botão 'Criptografar' para ver o resultado.",
        ]}
      />
    </main>
  );
}
