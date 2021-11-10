const ngrok = require('ngrok');
const fs = require('fs');
const { exec } = require("child_process");

const dotenvFile = '../.env'

// Read the .env file
fs.readFile(dotenvFile, 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

    // Convert string to string array, split at newlines
    let lines = data.split('\n') // string[]
    let token = null; // string || null

    // find the auth token
    lines.forEach(element => {
        const [name, value] = element.split('=');
        if (name === 'NGROK_AUTHTOKEN')
            token = value;
    });

    // No token found
    if (!token) {
        console.error("Setup NGROK_AUTHTOKEN in your .env file")
        return;
    }

    // Start ngrok
	(async function () {
		const url = await ngrok.connect({ authtoken: token, proto: 'http', addr: 3000 });

        // Rebuild lines with the new url
        lines = lines.map(element => {
            const [name] = element.split('=');
            if (name === 'NGROK_SERVERHOST')
                return `${name}=${url}`
            return element;
        })

        // convert back to string format
        let writeData = ''
        lines.forEach(element => {
            writeData += element + '\n'
        })
        writeData = writeData.slice(0, writeData.length - 1);

        // Write the new .env file
        fs.writeFile(dotenvFile, writeData, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.clear();
            console.log(`Your current ngrok url is ${url}.`);
            console.log(`Your .env file has been updated.`);            
          });		
	})();
});
