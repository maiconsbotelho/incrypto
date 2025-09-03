import { useState, useEffect } from "react";

interface DisplayProps {
  result: string;
  isLoading?: boolean;
}

export function Display({ result, isLoading = false }: DisplayProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isLoading) {
      // Resetamos o texto antes de começar a digitar novamente
      setDisplayedText("");

      let index = 0;
      const typingSpeed = 80;

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
  }, [result, isLoading]);

  if (isLoading) {
    return (
      <div className="w-[90%] mt-8 p-4 bg-black/40 rounded border border-white max-w-md lg:max-w-full break-words text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          <p className="text-white">Processando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] mt-8 p-4 bg-black/40 rounded border border-white max-w-md lg:max-w-full break-words text-center">
      <p className="text-white whitespace-pre-wrap">{displayedText}</p>
    </div>
  );
}
