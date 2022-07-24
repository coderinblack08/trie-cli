## CLI

Either `cd` into cli and run `yarn start ...` or install the cli via npm using `npm i -g cib-trie-cli` and type `trie --help` to view available commands. Note, the installed CLI uses the deployed version of the API.

```
Usage: index [options] [command]

Options:
  -h, --help            display help for command

Commands:
  show                  Display the current trie
  search <word>         Checks whether word is in the trie
  starts-with <prefix>  Check whether any word in the trie contains the
                        prefix
  add <word>            Add a word to the trie
  delete <word>         Delete a word to the trie
```
