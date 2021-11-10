# ngrok-to-dotenv

This is a ngrok start-up wrapper that uses a dotenv file to get the authtoken and save the https address; it's a node cli tool that you can use with projects that need ngrok. You clone it into your project's folder, and setup a package.json script to call "cd ngrok-to-dotenv && node ngrok". Be sure to add the folder to your .gitignore and and install the one package which is ngrok, with 'npm -i' or 'yarn'.
