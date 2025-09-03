"use client";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: any;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg max-w-sm sm:max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>
        <div className="text-gray-300 text-sm sm:text-base">{children}</div>
      </div>
    </div>
  );
}
