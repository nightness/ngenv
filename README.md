# Ngenv

Ngenv is a Node.js CLI tool that enhances development workflows by seamlessly integrating ngrok tunnels. It simplifies the process of starting an ngrok tunnel and automatically updates your project's `.env` file with the newly generated ngrok URL, ensuring your environment variables are always synchronized with ngrok's dynamic URLs. This tool is invaluable for developers working with webhooks, APIs, and external services that require secure, reliable tunneling to localhost.

## Features

- **Automation:** Starts an ngrok tunnel and updates the `.env` file without manual intervention.
- **Flexibility:** Supports running ngrok in both foreground for direct interaction and background for uninterrupted terminal use.
- **Customization:** Allows for custom ngrok configurations, including protocol, port, and `.env` file path specifications.
- **Log Management:** Provides utility commands for managing ngrok process logs in background mode.

## Prerequisites

- Node.js (Version 10 or newer)
- An ngrok account and authtoken, obtainable by signing up at [ngrok.com](https://ngrok.com/).

## Installation

1. **Global Installation:**

   Install Ngenv globally with npm:

   ```sh
   npm install -g ngenv
   ```

2. **Configure ngrok:**

   Set up your ngrok with your authtoken:

   ```sh
   ngrok authtoken <your-ngrok-authtoken>
   ```

## Usage

### Running ngrok in the Foreground

The `run` command initiates the ngrok tunnel in the foreground, maintaining it active in the current terminal session for immediate feedback.

```sh
ngenv run
```

### Starting the ngrok Tunnel in the Background

The `start` command launches the ngrok tunnel as a background task, ensuring only one instance runs at a time, freeing up the terminal.

```sh
ngenv start
```

In background mode, ngenv handles log files for output and errors, aiding in debugging and monitoring.

### Stopping the ngrok Tunnel

Terminate a background ngrok tunnel with the `stop` command:

```sh
ngenv stop
```

### Viewing Logs

Inspect output and error logs (only applicable in background mode):

```sh
ngenv logs
```

### Clearing Logs

Remove log files associated with background processes:

```sh
ngenv clear
```

## Command Options (start and run)

- `-P, --proto <protocol>`: Specify the protocol (default: http).
- `-p, --port <port>`: Set the port for ngrok to forward (default: 3000).
- `-e, --env <path>`: Define a custom path to your `.env` file.

## Examples

**Foreground operation on port 8080:**

```sh
ngenv run --port 8080
```

**Background operation with HTTPS protocol:**

```sh
ngenv start --proto https
```

**Custom `.env` file path in background mode:**

```sh
ngenv start --env /path/to/your/.env
```

## Troubleshooting

- Ensure ngrok is properly installed and your authtoken is configured.
- Check permissions for updating `.env` files and managing processes.
- In background mode, consult log files for potential issues.

## Contributing

We welcome contributions! Feel free to open issues or submit pull requests with your ideas, bug fixes, or features.

## License

Ngenv is available under the MIT License. See the LICENSE file for more details.

---

For more information on ngrok, please visit [ngrok's official documentation](https://ngrok.com/docs).
