const ngrok = require("ngrok");
const fs = require("fs");
const { exec } = require("child_process");

const dotenvFile = "../.env";

const optionDefinitions = [
  { name: "proto", alias: 'P', type: String },
  { name: "port", alias: 'p', type: Number },
];

const commandLineArgs = require("command-line-args");
const options = commandLineArgs(optionDefinitions);

console.log(options);

// Read the .env file
fs.readFile(dotenvFile, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Convert string to string array, split at newlines
  let lines = data.split("\n"); // string[]
  let authtoken = null; // string || null

  // find the auth token
  lines.forEach((element) => {
    const [name, value] = element.split("=");
    if (name === "NGROK_AUTHTOKEN") authtoken = value;
  });

  // No token found
  if (!authtoken) {
    console.error("Setup NGROK_AUTHTOKEN in your .env file");
    return;
  }

  // Start ngrok
  (async function () {
    const proto = options?.proto ?? "http";
    const addr = options?.addr ? options.addr : 3000;

    // Start ngrok
    try {
      const url = await ngrok.connect({ authtoken, proto, addr });

      // Rebuild lines with the new url
      let found = false;
      lines = lines.map((element) => {
        const [name] = element.split("=");
        if (name === "NGROK_SERVERHOST") {
            found = true;
            return `${name}=${url}`;
        }
        return element;
      });

      // Is this variable already in the .env, if not add it.
      if (!found) {
          lines.unshift(`NGROK_SERVERHOST=${url}`)
      }

      // convert back to string format
      let writeData = "";
      lines.forEach((element) => {
        writeData += element + "\n";
      });
      writeData = writeData.slice(0, writeData.length - 1);

      // Write the new .env file
      fs.writeFile(dotenvFile, writeData, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.clear();
        console.log(`Started ngrok: protocol '${proto}', addr '${addr}'`);
        console.log(`Your current ngrok url is ${url}.`);
        console.log(`Your .env file has been updated.`);
      });
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
  })();
});
