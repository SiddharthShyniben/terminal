class CommandHandler {
	constructor(term, commands) {
		this.term = term;
		// cmd = (term, rest, commandData)
		this.commands = commands;
		this.cmdData = {};
	}

	callCommand(text = '_default') {
		const commands = this.parseCommand(text);
		commands.forEach(cmd => {
			if (this.commands[cmd.main]) this.commands[cmd.main](term, cmd.args, this.cmdData);
			else this.commands._default(term, cmd.main);
		});
	}

	addCommands(commands = {}) {
		this.commands = Object.assign(this.commands, commands);
	}

	parseCommand(command) {
		// Remove all || because every command returns true
		return command
			.replace(/\|\|.*?([^&;\n]+)/g)
			.split('&&')
			.flatMap(str => str.split(';'))
			.flatMap(str => str.split('|'))
			.map(str => {
				const components = str.split(' ').map(str => str.trim()).filter(Boolean);
				return {main: components.shift(), args: components.join(' ')}
			});
	}
}

