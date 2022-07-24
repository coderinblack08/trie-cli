# Slingshot Algorithms Test (Trie Data Structure CLI)

> Project for [slingshotahead.com](https://slingshotahead.com)'s technical/specialization test

## Stacked Used

- Node.js
- Typescript
- Npm Registry
- Commander (CLI)
- Express.js

## Deployment

API deployed on Railway (https://trie-cli-production.up.railway.app)

CLI deployed on npm (https://www.npmjs.com/package/cib-trie-cli)

## API Reference

- `curl -X GET http://localhost:5500/`: Returns the trie object

- `curl -X GET http://localhost:5500/starts-with\?word\=<your-word-here>`: Checks if any word in the trie starts with the query parameter "word"

- `curl -X GET http://localhost:5500/search\?word\=<your-word-here>`: Checks if the query parameter "word" exists within the trie

- `curl -X POST -H "Content-Type:application/json" \ -d '{"word": <your-word-here>}' \ http://localhost:5500/`: Insert the word in the request body into the trie

- `curl -X DELETE -H "Content-Type:application/json" \ -d '{"word": <your-word-here>}' \ http://localhost:5500/`: Delete the word in the request body from the trie

## CLI

Either `cd` into cli and run `yarn start ...` or install the cli via npm using `npm i -g cib-trie-cli` and type `trie --help` to view available commands.

## Testing

All testing is done with jest and can be viewed in the CLI folder. Further elaboration on in the demo video.

## Video Demo
