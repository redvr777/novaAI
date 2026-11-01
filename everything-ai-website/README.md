# Nova AI — all-purpose AI website

A responsive chat website with a general-purpose AI assistant, chat history saved in the browser, and a private server-side API connection.

## Requirements
- Node.js 18 or newer
- An OpenAI API key

## Run it
1. Extract the ZIP.
2. Open a terminal in the extracted `everything-ai-website` folder.
3. Run `npm install`.
4. Copy `.env.example` to a new file named `.env`.
5. Put your API key after `OPENAI_API_KEY=` in `.env`.
6. Run `npm start`.
7. Open http://localhost:3000 in your browser.

## Important
- Never put your API key in `public/index.html` or any browser-side JavaScript.
- The key stays in `.env` and is read by the server.
- Chat history is stored in the browser using localStorage.
- API usage may cost money. Check your API account's billing and usage limits.
- Before making the site public, add user authentication, rate limiting, abuse protection, and privacy disclosures. The starter server is intended for local testing, not an unrestricted public launch.

## Customize
Edit the assistant instructions in `server.js` to change Nova's behavior. Edit `public/index.html` to change the design and name.
