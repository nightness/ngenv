# ngrok-to-dotenv

This is a ngrok start-up wrapper that uses a dotenv file (at './.env') to get the authtoken and save the https address; it's a node cli tool that you can use with projects that need ngrok. You clone it into your project's folder, and add to the project's package.json a run script to call "cd ngrok-to-dotenv && node ngrok". Be sure to add the folder to your .gitignore and install the one package which is ngrok and command-line-args, using 'npm i' or 'yarn'. The 'node ngrok' script supports two arguments --proto or -P (string, the protocol), --port or -p (number, the port number).

By default 'node ngrok' (no arguments) is equivalent to 'node ngrok -P http -p 3000' and 'node ngrok --proto http --port 3000'.
