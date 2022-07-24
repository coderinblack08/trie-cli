#!/usr/bin/env node

import { program } from "commander";
import axios from "axios";
import chalk from "chalk";

const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5500";

program
  .command("show")
  .description("Display the current trie")
  .action(async () => {
    const trie = await axios.get(`${API_URL}/treeify`);
    console.log(chalk.bgGreen("Successfully fetched trie"));
    console.log(trie.data);
  });

program
  .command("search <word>")
  .description("Checks whether word is in the trie")
  .action(async (word) => {
    const searchResult = await axios.get(`${API_URL}/search?word=${word}`);
    if (searchResult.data) {
      console.log(chalk.bgGreen(`'${word}' exists within trie`));
    } else {
      console.log(chalk.bgRed(`'${word}' doesn't exist within trie`));
    }
  });

program
  .command("starts-with <prefix>")
  .description("Check whether any word in the trie contains the prefix")
  .action(async (prefix) => {
    const startsWith = await axios.get(`${API_URL}/starts-with?word=${prefix}`);
    if (startsWith.data) {
      console.log(chalk.bgGreen(`Word starting with '${prefix}' exists`));
    } else {
      console.log(chalk.bgRed(`No word stars with '${prefix}'`));
    }
  });

program
  .command("add <word>")
  .description("Add a word to the trie")
  .action(async (word) => {
    try {
      await axios.post(API_URL, { word });
      console.log(chalk.bgGreen(`Added ${word} successfully`));
    } catch (error) {
      console.log(chalk.bgRed(`Error occurred while adding ${word}`));
    }
  });

program
  .command("delete <word>")
  .description("Delete a word to the trie")
  .action(async (word) => {
    try {
      await axios.delete(API_URL, { word });
      console.log(chalk.bgGreen(`Deleted ${word} successfully`));
    } catch (error) {
      console.log(chalk.bgRed(`Error occurred while deleting ${word}`));
    }
  });

program.parse();
