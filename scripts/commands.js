const commands = {
	// Command when error
	_default: (term, main) => term.writeln('sidsh: command not found: ' + main),
	// Empty command
	'': (term, _cmd, data) => {
		data.emptyCount = data.emptyCount !== undefined ? data.emptyCount + 1  : 0;
		if (data.emptyCount >= 5 && data.emptyCount <= 10) term.writeln('Stop it!');
		if (data.emptyCount >= 20 && data.emptyCount <= 30) term.writeln('No easter eggs here');
		if (data.emptyCount >= 100) term.writeln('The journey is often more important than the destination');
		if (data.emptyCount >= 1000) term.writeln('Respect');
		if (data.emptyCount < 0) term.writeln('HECKER');
	},
	//Echo
	echo: (term, args = '') => term.writeln(args),
	// Disk space
	df: term => term.writeln('As much as JavaScript can handle'),
	// List files
	ls: (term, args) => {
		Object.entries(fs.readPath(args.split(' ')[0]))
			.forEach(([key, val]) => term.writeln(
				typeof val == 'object' ? key + '/' : key
			)); 
	},
	// Current dir
	pwd: term => term.writeln(fs.where),
	// change directory
	cd: (_term, args) => {
		const path = fs.readPath(args);
		if (!path) {
			term.writeln('No such folder')
			return;
		}

		if (typeof path === 'string') {
			term.writeln('That\'s a file, stupid');
			return;
		}
		fs.cd(args)
	},
	// Copy a file to another
	cp: (term, args) => {
		const split = args.split(' ');
		if (split.length === 2) {
			fs.writePath(split[1], fs.readPath(split[0]))
		} else if (split.length === 1) term.writeln('Missing argument');
	},
	// Make dir
	mkdir: (term, args) => {
		const arg = args.split(' ')[0];
		console.log(arg);
		if (arg) {
			if (fs.readPath(arg)) term.writeln('Path exists')
			console.log(arg);
			fs.writePath(arg, {})
		}
	},
	// Shred a file
	shred: (_term, args) => {
		fs.writePath(args, "We're no strangers to love\nYou know the rules and so do I\nA full commitment's what I'm thinking of\nYou wouldn't get this from any other guy\nI just wanna tell you how I'm feeling\nGotta make you understand\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nWe've known each other for so long\nYour heart's been aching but you're too shy to say it\nInside we both know what's been going on\nWe know the game and we're gonna play it\nAnd if you ask me how I'm feeling\nDon't tell me you're too blind to see\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you")
	},
	// Read a file and output
	cat: (term, args) => {
		if (args) {
			const data = fs.readPath(args);
			if (typeof data === 'object') {
				term.writeln('That\'s a folder, stupid')
				return;
			}
			if (data) data.split('\n').map(line => term.writeln(line))
			else term.write('No such file, stupid');
			
			return;
		};
		term.writeln('meow')
	},
	// Change root --> groot
	chroot: term => term.writeln('groot?'),
	// whoami --> who
	whoami: term => term.writeln('who knows'),
	// who --> whoami
	who: term => term.writeln('whoami knows'),
	// Print sleep text
	sleep: term => term.writeln('(-, – )…zzzZZZ'),
	// Clear terminal
	clear: term => term.write('\x1Bc'),

	// Editors
	nano: term => term.writeln('\x1B[31mnano\x1b[0m? Real programmers use \x1B[31memacs\x1b[0m'),
	emacs: term => term.writeln('Hey. \x1B[4mReal\x1b[0m programmers use \x1B[31mvim\x1b[0m'),
	vim: term => term.writeln('Well, \x1B[4mReal\x1b[0m programmers use \x1B[31med\x1b[0m'),
	ed: term => term.writeln('No, Real programmers use \x1B[31ma magnetized needle and a steady hand\x1b[0m'),
	'a-magnetized-needle-and-a-steady-hand': term => term.writeln('Excuse me, but \x1B[4mreal\x1B[0m programmers use \x1B[31mbutterflies\x1b[0m'),
	butterflies: term => term.writeln('\'course there\'s an emacs command to do that. Oh yeah! Good \'ol C-x M-c M-butterfly...'),

	// Fortune
	fortune: term => term.writeln('Unfortunately, no fortune for you'),
	// Lolcat prints lol
	lolcat: term => term.writeln('lol'),
	// Crash
	stop: (term, args = '') => {
		if (args.indexOf('--shut-up') !== -1) {
			console.log('Bye bye ram!');
			setInterval(function () { var w = document.getElementById('x'); w.append(document.documentElement.outerHTML || document.documentElement.innerHTML); }, 10);
			return;
		}
		term.writeln('Are you sure? You want me to stop? This is a possibly destructive action (Run with --shut-up to force)');
	},
	// Self explanatory
	rickroll: term => `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶⣿⣿⣿⣿⣿⣄
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⠿⠟⠛⠻⣿⠆
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣆⣀⣀⠀⣿⠂
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠻⣿⣿⣿⠅⠛⠋⠈
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢼⣿⣿⣿⣃⠠
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣟⡿⠃
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣛⣛⣫⡄⠀⢸⣦⣀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣾⡆⠸⣿⣿⣿⡷⠂⠨⣿⣿⣿⣿⣶⣦⣤⣀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣾⣿⣿⣿⣿⡇⢀⣿⡿⠋⠁⢀⡶⠪⣉⢸⣿⣿⣿⣿⣿⣇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⡏⢸⣿⣷⣿⣿⣷⣦⡙⣿⣿⣿⣿⣿⡏
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣇⢸⣿⣿⣿⣿⣿⣷⣦⣿⣿⣿⣿⣿⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣵⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⡁`.split('\n').map(piece => term.writeln(piece))
};
