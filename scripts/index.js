const term = new Terminal();

term.open(document.getElementById("term"));
term.prompt = "~$ ";

term.writeln('Type \x1B[31mls\x1b[0m to get started');
term.writeln('');

let localEcho = new LocalEchoController(term);
let fs = new FS(files, '/', special)

const commandHandler = new CommandHandler(term, commands);

const read = () => {
	localEcho.read(term.prompt)
		.then(out => {
			// Handle read
			commandHandler.callCommand(out);
			// Re read
			read();
		}).catch(error => {
			// Handle error
			term.writeln(`An error occured: \x1B[1;31;${error}`);
			console.log(error)
			// Re read
			read();
		});
};

read();
