import Image from "next/image";
import LogoSVG from "@/../public/logo.svg";

export default function Logo() {
  return (
    <div className="flex flex-col  w-[200px] mx-auto items-center justify-center">
      <Image src={LogoSVG} alt="Logo" width={80} height={80} />
      <h1 className="text-2xl mt-4 font-bold  text-white">Incrypto</h1>
    </div>
  );
}
