// Utilitários de criptografia para múltiplos algoritmos

export type CryptographyAlgorithm = 'caesar' | 'vigenere' | 'base64' | 'rot13';

export interface CryptographyResult {
  result: string;
  algorithm: CryptographyAlgorithm;
  key?: string | number;
}

// Cifra de César
export function caesarCipher(text: string, shift: number): string {
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (char >= 'A' && char <= 'Z') {
        const charCode = char.charCodeAt(0) - 65;
        const shiftedCode = (charCode + shift) % 26;
        return String.fromCharCode(shiftedCode + 65);
      }
      return char;
    })
    .join('');
}

// Descriptografia César
export function caesarDecipher(text: string, shift: number): string {
  return caesarCipher(text, -shift);
}

// Cifra de Vigenère
export function vigenereCipher(text: string, key: string): string {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  
  if (cleanKey.length === 0) return text;
  
  let result = '';
  let keyIndex = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i].toUpperCase();
    
    if (char >= 'A' && char <= 'Z') {
      const charCode = char.charCodeAt(0) - 65;
      const keyChar = cleanKey[keyIndex % cleanKey.length];
      const keyCode = keyChar.charCodeAt(0) - 65;
      const encryptedCode = (charCode + keyCode) % 26;
      
      result += String.fromCharCode(encryptedCode + 65);
      keyIndex++;
    } else {
      result += text[i];
    }
  }
  
  return result;
}

// Descriptografia Vigenère
export function vigenereDecipher(text: string, key: string): string {
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  
  if (cleanKey.length === 0) return text;
  
  let result = '';
  let keyIndex = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i].toUpperCase();
    
    if (char >= 'A' && char <= 'Z') {
      const charCode = char.charCodeAt(0) - 65;
      const keyChar = cleanKey[keyIndex % cleanKey.length];
      const keyCode = keyChar.charCodeAt(0) - 65;
      const decryptedCode = (charCode - keyCode + 26) % 26;
      
      result += String.fromCharCode(decryptedCode + 65);
      keyIndex++;
    } else {
      result += text[i];
    }
  }
  
  return result;
}

// Base64
export function base64Encode(text: string): string {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (error) {
    return 'Erro na codificação Base64';
  }
}

// Decodificação Base64
export function base64Decode(text: string): string {
  try {
    return atob(text);
  } catch (error) {
    return 'Erro na decodificação Base64 - texto inválido';
  }
}

// ROT13
export function rot13(text: string): string {
  return text
    .split('')
    .map(char => {
      if (char >= 'A' && char <= 'Z') {
        const charCode = char.charCodeAt(0) - 65;
        const rotatedCode = (charCode + 13) % 26;
        return String.fromCharCode(rotatedCode + 65);
      }
      if (char >= 'a' && char <= 'z') {
        const charCode = char.charCodeAt(0) - 97;
        const rotatedCode = (charCode + 13) % 26;
        return String.fromCharCode(rotatedCode + 97);
      }
      return char;
    })
    .join('');
}

// Função principal de criptografia
export function encrypt(text: string, algorithm: CryptographyAlgorithm, key?: string | number): CryptographyResult {
  let result: string;
  
  switch (algorithm) {
    case 'caesar':
      const shift = typeof key === 'number' ? key : parseInt(key as string) || 3;
      result = caesarCipher(text, shift);
      return { result, algorithm, key: shift };
      
    case 'vigenere':
      const vigenereKey = (key as string) || 'CHAVE';
      result = vigenereCipher(text, vigenereKey);
      return { result, algorithm, key: vigenereKey };
      
    case 'base64':
      result = base64Encode(text);
      return { result, algorithm };
      
    case 'rot13':
      result = rot13(text);
      return { result, algorithm };
      
    default:
      result = caesarCipher(text, 3);
      return { result, algorithm: 'caesar', key: 3 };
  }
}

// Função principal de descriptografia
export function decrypt(text: string, algorithm: CryptographyAlgorithm, key?: string | number): CryptographyResult {
  let result: string;
  
  switch (algorithm) {
    case 'caesar':
      const shift = typeof key === 'number' ? key : parseInt(key as string) || 3;
      result = caesarDecipher(text, shift);
      return { result, algorithm, key: shift };
      
    case 'vigenere':
      const vigenereKey = (key as string) || 'CHAVE';
      result = vigenereDecipher(text, vigenereKey);
      return { result, algorithm, key: vigenereKey };
      
    case 'base64':
      result = base64Decode(text);
      return { result, algorithm };
      
    case 'rot13':
      // ROT13 é simétrico - aplicar novamente descriptografa
      result = rot13(text);
      return { result, algorithm };
      
    default:
      result = caesarDecipher(text, 3);
      return { result, algorithm: 'caesar', key: 3 };
  }
}

// Informações sobre os algoritmos
export const algorithmInfo = {
  caesar: {
    name: 'Cifra de César',
    description: 'Substitui cada letra por outra que está um número fixo de posições à frente no alfabeto.',
    keyType: 'number',
    keyLabel: 'Desloc.',
    keyPlaceholder: 'Ex: 3',
    example: 'HELLO → KHOOR (deslocamento 3)'
  },
  vigenere: {
    name: 'Cifra de Vigenère',
    description: 'Usa uma palavra-chave para criar múltiplos deslocamentos, mais segura que César.',
    keyType: 'text',
    keyLabel: 'Palavra-chave',
    keyPlaceholder: 'Ex: CHAVE',
    example: 'HELLO + CHAVE → JFNQP'
  },
  base64: {
    name: 'Base64',
    description: 'Codificação que converte dados binários em texto ASCII usando 64 caracteres.',
    keyType: 'none',
    keyLabel: '',
    keyPlaceholder: '',
    example: 'HELLO → SEVMTE8='
  },
  rot13: {
    name: 'ROT13',
    description: 'Variação da cifra de César com deslocamento fixo de 13 posições.',
    keyType: 'none',
    keyLabel: '',
    keyPlaceholder: '',
    example: 'HELLO → URYYB'
  }
};

// Detectar possível algoritmo usado (para descriptografia automática)
export function detectAlgorithm(text: string): CryptographyAlgorithm[] {
  const possibilities: CryptographyAlgorithm[] = [];
  
  // Base64: caracteres específicos e padding
  if (/^[A-Za-z0-9+/]*={0,2}$/.test(text) && text.length % 4 === 0) {
    possibilities.push('base64');
  }
  
  // ROT13/César: apenas letras
  if (/^[A-Za-z\s]*$/.test(text)) {
    possibilities.push('rot13', 'caesar', 'vigenere');
  }
  
  return possibilities.length > 0 ? possibilities : ['caesar'];
}

export function detectPossibleAlgorithms(text: string): CryptographyAlgorithm[] {
  const algorithms: CryptographyAlgorithm[] = [];
  
  // Base64 detection - very specific pattern
  if (/^[A-Za-z0-9+/]*={0,2}$/.test(text) && text.length % 4 === 0 && text.length > 0) {
    algorithms.push('base64');
  }
  
  // ROT13 detection - only letters and spaces
  if (/^[A-Za-z\s]*$/.test(text) && text.trim().length > 0) {
    algorithms.push('rot13');
  }
  
  // Caesar cipher detection - only letters and spaces
  if (/^[A-Za-z\s]*$/.test(text) && text.trim().length > 0) {
    algorithms.push('caesar');
  }
  
  // Vigenère detection - only letters and spaces
  if (/^[A-Za-z\s]*$/.test(text) && text.trim().length > 0) {
    algorithms.push('vigenere');
  }
  
  return algorithms;
}

// Auto-detect and decrypt function
export function autoDecrypt(encryptedText: string): {
  algorithm: CryptographyAlgorithm | null;
  result: string;
  confidence: 'high' | 'medium' | 'low';
  alternatives: Array<{ algorithm: CryptographyAlgorithm; result: string; key?: string | number }>;
} {
  const alternatives: Array<{ algorithm: CryptographyAlgorithm; result: string; key?: string | number }> = [];
  
  // Try Base64 first (most reliable detection)
  if (/^[A-Za-z0-9+/]*={0,2}$/.test(encryptedText) && encryptedText.length % 4 === 0) {
    try {
      const result = base64Decode(encryptedText);
      if (!result.includes('Erro')) {
        return {
          algorithm: 'base64',
          result: result,
          confidence: 'high',
          alternatives: []
        };
      }
    } catch (error) {
      // Continue to other algorithms
    }
  }
  
  // Try ROT13 (no key needed)
  if (/^[A-Za-z\s]*$/.test(encryptedText)) {
    try {
      const result = rot13(encryptedText);
      alternatives.push({
        algorithm: 'rot13',
        result: result
      });
    } catch (error) {
      // Continue
    }
  }
  
  // Try Caesar with common keys (1-25)
  if (/^[A-Za-z\s]*$/.test(encryptedText)) {
    for (let key = 1; key <= 25; key++) {
      try {
        const result = caesarDecipher(encryptedText, key);
        // Simple heuristic: check if result contains common English words
        const commonWords = ['THE', 'AND', 'FOR', 'ARE', 'BUT', 'NOT', 'YOU', 'ALL', 'CAN', 'HER', 'WAS', 'ONE', 'OUR', 'HAD', 'BY', 'WORD', 'WHAT', 'SAID'];
        const upperResult = result.toUpperCase();
        const hasCommonWords = commonWords.some(word => upperResult.includes(word));
        
        alternatives.push({
          algorithm: 'caesar',
          result: result,
          key: key
        });
        
        // If we find common English words, prioritize this result
        if (hasCommonWords && alternatives.length === 1) {
          return {
            algorithm: 'caesar',
            result: result,
            confidence: 'medium',
            alternatives: alternatives.slice(1)
          };
        }
      } catch (error) {
        // Continue
      }
    }
  }
  
  // Return best alternative or indicate failure
  if (alternatives.length > 0) {
    const best = alternatives[0];
    return {
      algorithm: best.algorithm,
      result: best.result,
      confidence: 'low',
      alternatives: alternatives.slice(1)
    };
  }
  
  return {
    algorithm: null,
    result: 'Não foi possível detectar o algoritmo automaticamente',
    confidence: 'low',
    alternatives: []
  };
}