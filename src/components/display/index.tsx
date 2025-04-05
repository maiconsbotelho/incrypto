import { div } from "three/tsl";

interface DisplayProps {
  result: string;
}

export function Display({ result }: DisplayProps) {
  return (
    <div className="w-[90%]">
      <p className="mt-8  p-4 bg-black/40 rounded border border-white max-w-md lg:max-w-full break-words text-center">
        {result}
      </p>
    </div>
  );
}
