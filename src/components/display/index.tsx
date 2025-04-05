import { useState, useEffect } from "react";

interface DisplayProps {
  result: string;
}

export function Display({ result }: DisplayProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
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
  }, [result]);

  return (
    <div className="w-[90%] mt-8 p-4 bg-black/40 rounded border border-white max-w-md lg:max-w-full break-words text-center">
      <p className="text-white whitespace-pre-wrap">{displayedText}</p>
    </div>
  );
}
