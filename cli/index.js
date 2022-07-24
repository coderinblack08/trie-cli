#!/usr/bin/env node

import { program } from "commander";
import { show, search, startsWith, addWord, deleteWord } from "./commands.js";

program.command("show").description("Display the current trie").action(show);

program
  .command("search <word>")
  .description("Checks whether word is in the trie")
  .action(search);

program
  .command("starts-with <prefix>")
  .description("Check whether any word in the trie contains the prefix")
  .action(startsWith);

program
  .command("add <word>")
  .description("Add a word to the trie")
  .action(addWord);

program
  .command("delete <word>")
  .description("Delete a word to the trie")
  .action(deleteWord);

program.parse();
