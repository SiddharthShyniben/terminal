class CommandHandler {
	constructor(term, commands) {
		this.term = term;
		// cmd = (term, rest, commandData)
		this.commands = commands;
		this.cmdData = {};
	}

	callCommand(text = '_default') {
		const now = new Date();
		if (now.getMonth() == 3 && now.getDate() == 1) {
			if (window.pleaseActivateSuperSiddharthMode) {
				term.writeln('Fine!');
			} else {
				this.term.writeln('sidsh: Unable to run command because Super Siddharth mode has not been activated')
				this.term.writeln('It is being activated in the background');
				this.term.writeln('\x1B[31;1mstop\x1B[0m the terminal to speed up')
				return;
			}
		}

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
				if (str === '') return {main: '', args: ''};
				const components = str.split(' ').map(str => str.trim()).filter(Boolean);
				return {main: components.shift(), args: components.join(' ')};
			});
	}
}

