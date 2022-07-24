# API Reference

Deployed on Railway (https://trie-cli-production.up.railway.app)

- `curl -X GET http://localhost:5500/`: Returns the trie object

- `curl -X GET http://localhost:5500/starts-with\?word\=<your-word-here>`: Checks if any word in the trie starts with the query parameter "word"

- `curl -X GET http://localhost:5500/search\?word\=<your-word-here>`: Checks if the query parameter "word" exists within the trie

- `curl -X POST -H "Content-Type:application/json" \ -d '{"word": <your-word-here>}' \ http://localhost:5500/`: Insert the word in the request body into the trie

- `curl -X DELETE -H "Content-Type:application/json" \ -d '{"word": <your-word-here>}' \ http://localhost:5500/`: Delete the word in the request body from the trie

# CLI

Either `cd` into cli and run `yarn start ...` or install the cli via npm using `npm i -g coderinblack-trie-cli` and type `trie --help` to view available commands.
