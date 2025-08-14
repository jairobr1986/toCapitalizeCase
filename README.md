# toCapitalizeCase ✨

> Uma função **pequena, sem dependências**, para deixar **a primeira letra de cada palavra em maiúscula** e o resto em minúscula. Ideal para **nomes**, **títulos** e **inputs de formulários**.

&#x20;&#x20;

> 🔗 **Atualize os links colocando o nome real do pacote no lugar de **``** e seus perfis nas seções abaixo.**

---

## 🧭 Sumário

- [Por que usar?](#-por-que-usar)
- [Instalação](#-instalação)
- [Uso Rápido (para iniciantes)](#-uso-rápido-para-iniciantes)
- [API](#-api)
- [Casos de Uso](#-casos-de-uso)
  - [Básicos](#básicos)
  - [Intermediários](#intermediários)
  - [Avançados](#avançados)
- [Compatibilidade (ESM x CommonJS x Browser)](#-compatibilidade-esm-x-commonjs-x-browser)
- [Boas práticas e limites](#-boas-práticas-e-limites)
- [Contribuindo](#-contribuindo)
- [Autor & Links](#-autor--links)
- [Licença](#-licença)

---

## 💡 Por que usar?

- **Simples**: uma função, objetivo claro.
- **Robusta**: trata espaços extras e entradas vazias.
- **Sem dependências**: leve e fácil de manter.
- **Universal**: funciona em Node.js, bundlers e navegadores.

> 👶 **Explicação para quem tem 12 anos:** Você dá uma frase para a função e ela devolve a mesma frase, mas com **cada palavra começando com letra grande**. Ex.: `"hoje é UM Ótimo dia"` vira `"Hoje É Um Ótimo Dia"`.

---

## 📦 Instalação

### npm

```bash
npm install tocaptcase
```

### yarn

```bash
yarn add tocaptcase
```

### pnpm

```bash
pnpm add tocaptcase
```

> Se você ainda **não tem** um `package.json`, crie com `npm init -y`.

---

## 🚀 Uso Rápido (para iniciantes)

### ES Modules (import)

```js
import capitalizeCase from 'tocaptcase';

console.log(capitalizeCase('hello, npm!, JAIRO'));
// → "Hello, Npm!, Jairo"
```

### CommonJS (require)

```js
const capitalizeCase = require('tocaptcase');

console.log(capitalizeCase('bom DIA mundo'));
// → "Bom Dia Mundo"
```

### Browser (sem build), via CDN

```html
<script type="module">
  import capitalizeCase from 'https://unpkg.com/tocaptcase?module';
  console.log(capitalizeCase('javascript É legal!'));
  // → "Javascript É Legal!"
</script>
```

---

## 🧪 API

```ts
function capitalizeCase(str: string): string
```

**Parâmetros**

- `str`: texto de entrada.

**Retorno**

- Uma nova `string` com **cada palavra capitalizada**.
- Se a entrada for inválida (não-string ou vazia), retorna `""` (string vazia).

> ⚙️ Implementação sugerida (resumo):
>
> - `trim()` para remover espaços no começo/fim;
> - `split(/\s+/)` para separar por 1+ espaços;
> - para cada palavra: primeira letra `toUpperCase()`, resto `toLowerCase()`;
> - `join(' ')` para montar de volta.

---

## 📚 Casos de Uso

### Básicos

**1) Normalizar nomes digitados pelo usuário**

```js
capitalizeCase('  aNA  mÁrcia   sOUZA ');
// → "Ana Márcia Souza"
```

**2) Títulos simples**

```js
capitalizeCase('como aprender javascript RÁPIDO');
// → "Como Aprender Javascript Rápido"
```

**3) Limpar conteúdo vindo de formulários**

```js
formValue.name = capitalizeCase(formValue.name || '');
```

---

### Intermediários

**4) Capitalizar uma lista de nomes**

```js
['maria da silva', 'JOÃO p. almeida'].map(capitalizeCase);
// → ["Maria Da Silva", "João P. Almeida"]
```

**5) Manter hífens e apóstrofos**

> A função base trata palavras separadas por espaço. Para hífens/apóstrofos, capitalize cada parte:

```js
function smartCap(s) {
  return s
    .split(/\s+/)
    .map(word => word
      .split('-')
      .map(part => capitalizeCase(part))
      .join('-')
    )
    .join(' ');
}

smartCap("maria-clara d'artagnan");
// → "Maria-Clara D'Artagnan"
```

**6) Usar com Express/Next para normalizar campos**

```js
app.post('/users', (req, res) => {
  const name = capitalizeCase(req.body.name || '');
  // salvar no banco já normalizado
  // ...
  res.json({ ok: true, name });
});
```

---

### Avançados

**7) Exceções de preposições ("de", "da", "dos"...)**

> Em títulos, às vezes queremos **não** capitalizar certas palavrinhas, a menos que seja a **primeira** palavra.

```js
const SMALL = new Set(['de','da','do','dos','das','e','a','o','as','os','em','no','na','nos','nas','por','para']);

function titleCasePtBR(s) {
  const words = s.trim().split(/\s+/);
  return words.map((w, i) => {
    const low = w.toLowerCase();
    if (i > 0 && SMALL.has(low)) return low; // mantém minúscula no meio
    return capitalizeCase(w);
  }).join(' ');
}

titleCasePtBR('a queda da casa de usher');
// → "A Queda da Casa de Usher"
```

**8) Localidade (acentos)**

> Se você **precisar** respeitar regras específicas de idioma, pode trocar por `toLocaleUpperCase('pt-BR')` / `toLocaleLowerCase('pt-BR')` dentro da sua implementação.

**9) Sanitização extra (remover espaços repetidos e pontuações soltas)**

```js
function cleanAndCap(s) {
  return capitalizeCase(
    String(s || '')
      .replace(/[\t\n\r]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim()
  );
}
```

---

## 🧩 Compatibilidade (ESM x CommonJS x Browser)

- **ESM (import/export)**: `"type": "module"` no `package.json` **ou** use `.mjs`.
- **CommonJS (require/module.exports)**: funciona em Node sem configuração especial.
- **Browser**: importe por CDN com `<script type="module">`.

> Dica: não instale pacotes de biblioteca **globalmente** (`-g`). Instale **localmente** no projeto para o `import` funcionar.

---

## ✅ Boas práticas e limites

- Esta função **não** entende gramática (ex.: nomes próprios especiais, regras editoriais complexas).
- Para casos editoriais, combine com uma lista de exceções (veja o [Avançados](#avançados)).
- Para performance, a função é O(n) no tamanho da string—normal para inputs de formulário.

---

## 🤝 Contribuindo

1. Faça um fork
2. Crie uma branch: `git checkout -b feat/minha-ideia`
3. Commit: `git commit -m "feat: minha ideia"`
4. Push: `git push origin feat/minha-ideia`
5. Abra um Pull Request 🎉

> Testes de exemplo (Jest):

```bash
npm i -D jest
```

```js
// capitalizeCase.test.js
import capitalizeCase from './index.js';

test('básico', () => {
  expect(capitalizeCase('bom DIA mundo')).toBe('Bom Dia Mundo');
});

test('vazio', () => {
  expect(capitalizeCase('   ')).toBe('');
});
```

---

## 👤 Autor & Links

- **Autor:** Jairo Oliveira Santos
- **NPM:** [https://www.npmjs.com/~jairobr1986](https://www.npmjs.com/~jairobr1986)
- **GitHub:** [https://github.com/jairobr1986](https://github.com/jairobr1986)
- **LinkedIn:** [https://www.linkedin.com/in/jairobr1986/](https://www.linkedin.com/in/jairobr1986/)
<!-- - **X (Twitter):** *(adicione seu link aqui)*
- **Instagram:** *(adicione seu link aqui)* -->
- **E-mail:** [jairobr1986@gmail.com](mailto:jairobr1986@gmail.com)



> Substitua os `<placeholders>` acima pelos seus links reais.

---

## 📄 Licença

Este projeto é licenciado sob a **MIT License** – veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

### 📝 Anexo: Implementação sugerida

```js
/**
 * Capitaliza a primeira letra de cada palavra de uma string.
 * Retorna "" se a entrada for inválida.
 */
export default function capitalizeCase(str) {
  try {
    if (typeof str !== 'string') return '';
    const words = str.trim().split(/\s+/);
    if (words[0] === '') return '';
    return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  } catch (e) {
    console.error('capitalizeCase error:', e);
    return '';
  }
}
```

> Dica: Se preferir **modo estrito** (lançar erro em vez de retornar `""`), troque as validações por `throw new TypeError(...)` e remova o `try/catch`.

