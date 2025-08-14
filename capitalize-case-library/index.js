// index.js

/**
 * Capitaliza a primeira letra de cada palavra de uma string.
 * @param {string} str A string a ser capitalizada.
 * @returns {string} A string com cada palavra iniciando com letra maiúscula.
 */
function capitalizeCase(str) {
  // Validação: verifica se é string e não está vazia
  if (typeof str !== 'string' || str.trim().length === 0) {
    return '';
  }

  // Remove espaços extras e divide a string em palavras
  const words = str.trim().split(/\s+/);

  // Capitaliza cada palavra individualmente
  const capitalizedWords = words.map(word => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });

  // Junta as palavras novamente
  return capitalizedWords.join(' ');
}

// Exporta a função usando ES Modules
export default capitalizeCase;
