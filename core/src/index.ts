import { Trie } from "./Trie";

/**  
Example usage:

const dict = new Trie();

dict.insert("pot");
dict.insert("part");
dict.insert("past");
dict.insert("pass");

console.log(dict.search("pot"));
console.log(dict.search("pass"));
console.log(dict.search("po", true));
console.log(dict.search("pa", true));
console.log(dict.search("pan", true));
*/

const state = new Trie();
