import axios from "axios";
import chalk from "chalk";

const API_URL =
  process.env.NODE_ENV === "local"
    ? "http://localhost:5500"
    : "https://trie-cli-production.up.railway.app";

export const show = async () => {
  const trie = await axios.get(`${API_URL}/treeify`);
  console.log(chalk.bgGreen("Successfully fetched trie"));
  console.log(trie.data);
  return trie.data;
};

export const startsWith = async (prefix) => {
  const startsWith = await axios.get(`${API_URL}/starts-with?word=${prefix}`);
  if (startsWith.data) {
    console.log(chalk.bgGreen(`Word starting with '${prefix}' exists`));
  } else {
    console.log(chalk.bgRed(`No word stars with '${prefix}'`));
  }
  return startsWith.data;
};

export const search = async (word) => {
  const searchResult = await axios.get(`${API_URL}/search?word=${word}`);
  if (searchResult.data) {
    console.log(chalk.bgGreen(`'${word}' exists within trie`));
  } else {
    console.log(chalk.bgRed(`'${word}' doesn't exist within trie`));
  }
  return searchResult.data;
};

export const addWord = async (word) => {
  try {
    await axios.post(API_URL, { word });
    console.log(chalk.bgGreen(`Added ${word} successfully`));
  } catch (error) {
    console.log(chalk.bgRed(`Error occurred while adding ${word}`));
  }
};

export const deleteWord = async (word) => {
  try {
    await axios.delete(API_URL, { data: { word } });
    console.log(chalk.bgGreen(`Deleted ${word} successfully`));
  } catch (error) {
    console.log(chalk.bgRed(`Error occurred while deleting ${word}`));
  }
};
