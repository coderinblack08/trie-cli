import { Trie, TrieNode } from "./Trie";
import { asTree } from "treeify";
import express from "express";
import { AsyncTaskQueue } from "./TaskQueue";
import cors from "cors";

/**  
Tire class example:

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
const queue = new AsyncTaskQueue();

// Initiate test data
state.insert("pot");
state.insert("part");
state.insert("past");
state.insert("pass");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  try {
    await queue.add(async () => {
      if (typeof req.body.word !== "string") {
        throw new Error("Invalid word");
      }
      console.log(req.body.word);
      state.insert(req.body.word);
    });
    res.status(201).send("Successfully added word to global trie");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete("/", async (req, res) => {
  try {
    await queue.add(async () => {
      if (typeof req.body.word !== "string") {
        throw new Error("Invalid word");
      }
      state.delete(req.body.word);
    });
    res.status(201).send("Successfully deleted word from global trie");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/search", async (req, res) => {
  try {
    await queue.add(async () => {
      if (!req.query.word) {
        throw new Error("Please provide a word");
      }
      res.status(200).send(state.search(req.query.word?.toString()));
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/starts-with", async (req, res) => {
  try {
    await queue.add(async () => {
      if (!req.query.word) {
        throw new Error("Please provide a word");
      }
      res.status(200).send(state.search(req.query.word?.toString(), true));
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/", async (_req, res) => {
  try {
    await queue.add(async () => {
      res.status(200).json(state);
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/treeify", async (_req, res) => {
  const containsValidWore = (node: TrieNode): boolean => {
    if (node.isValidWord) return true;
    let valid = false;
    for (const child of Object.keys(node.children)) {
      valid = valid || containsValidWore(node.children[child]);
    }
    return valid;
  };
  const convertToTree = (node: TrieNode) => {
    const treeObject: Record<string, any> = {};
    for (const child of Object.keys(node.children)) {
      if (containsValidWore(node.children[child])) {
        treeObject[child] = convertToTree(node.children[child]);
      }
    }
    return treeObject;
  };
  res.send(asTree(convertToTree(state.root), true, true));
});

app.listen(process.env.PORT || 5500, () =>
  console.log("listening on port 5500")
);
