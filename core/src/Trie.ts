export class TrieNode {
  children: Record<string, TrieNode> = {};
  isValidWord: boolean = false;
  value: string | null;

  constructor(value: string | null) {
    this.value = value;
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode(null);
  }

  public insert(word: string) {
    let curr = this.root;
    // iterate through every character of the word and update the trie
    for (const character of word) {
      // if the node doesn't exit create it
      if (!curr.children.hasOwnProperty(character)) {
        curr.children[character] = new TrieNode(character);
      }
      curr = curr.children[character];
    }
    // set the resulting chain of nodes to be valid
    curr.isValidWord = true;
  }

  public delete(word: string) {
    // preforms the opposite of the insert method
    let curr = this.root;
    for (const character of word) {
      if (!curr.children.hasOwnProperty(character)) return;
      curr = curr.children[character];
    }
    curr.isValidWord = false;
  }

  /**
   *
   * @param word The word we're going to search for
   * @param prefix Checks only if the word is a valid prefix
   * @returns If the word meets the conditions to be within the trie
   */
  public search(word: string, prefix = false): boolean {
    let node = this.root;
    for (const character of word) {
      if (!node.children.hasOwnProperty(character)) return false;
      node = node.children[character];
    }
    return prefix ? true : node.isValidWord;
  }
}
