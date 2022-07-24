import { addWord, search, deleteWord, startsWith } from "./commands";

function generateWord(randomLength) {
  let word = "";
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < randomLength; i++) {
    word += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return word;
}

let words = [];
const numberOfWords = 10;

while (words.length < numberOfWords) {
  const randomLength = Math.floor(Math.random() * 20) + 10;
  words.push(generateWord(randomLength));
}

describe("add and search data", () => {
  words.forEach((word) => {
    it(`test for ${word} individually`, async () => {
      await addWord(word);
      expect(await search(word)).toBeTruthy();
      // "reset" the trie
      await deleteWord(word);
    });
  });
});

describe("delete and search data", () => {
  words.forEach((word) => {
    it(`test for ${word} individually`, async () => {
      await addWord(word);
      await deleteWord(word);
      expect(await search(word)).toBeFalsy();
    });
  });
});

describe("starts with data", () => {
  words.forEach((word) => {
    it(`test for ${word} individually`, async () => {
      await addWord(word);
      for (let i = 1; i < word.length; i++) {
        expect(await startsWith(word.slice(0, i))).toBeTruthy();
      }
      // "reset" the trie
      await deleteWord(word);
    });
  });
});
