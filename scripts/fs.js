const hl = text => text.replace(/hl\((.*?)\)/g, '\x1B[31;1m$1\x1B[0m').replace(/il\((.*?)\)/g, '\x1B[3m$1\x1B[0m')


const files = {
	'help.txt': hl(`hl(Welcome!)

This is just a simple shell, called hl(sidsh), similar to hl(zsh).
Many commands (hl(chroot), hl(echo), hl(df)) work, and there is a complete filesystem here.
Try ls, or cd, maybe pwd or cat, or cp or mkdir.

And yeah, I forgot to tell you, like any other shell, you have history.
Try hitting the up arrow.
And logic statements just work. Try hl(cat help.txt || echo 'Falsy')
You also get a multiline prompt, try typing hl(cat help.txt ||) and hitting enter

Then there is hl(shred). This one took me a long time to make,
and it served as a entry point to many bugs in my code.
It took some time to fix this, so please try it ;)

There is also hl(who) and hl(whoami). And also hl(sleep) and hl(clear).
There is also hl(nano), hl(emacs), hl(vim), hl(ed) and more.

There is also hl(fortune) and hl(lolcat). Also the dangerous hl(stop)

There are many easter eggs here :D. Try to find them all!

hl(Happy hacking)

------------------------

If you're confused by all this (or you've had enough shell for a day), click the hl(I don't know shell) link down there`),
	'about': {
		'me.txt': hl(`I’m Siddharth, a 13 year old programmer from India, and I love open source.
I mainly code in JavaScript, but also use HTML/CSS/Angular to make websites.

hl(What I use)

- il(HTML)
- il(CSS, SCSS, Sass)
- il(JavaScript)
- il(TypeScript)
- il(Angular)
- il(Node.js)
- il(Vim)
- il(Deno – sort of)

hl(Where you can find me)

- il(DEV Community) –  hl(cd dev)
- il(GitHub) – hl(cd github)`)
	},
	projects: {
		'portfolio.md': hl('This thing. hl(cd source) to view the source code'),
		'social-image-generator.md': hl('A simple API to return HTML which can then be screenshotted.\n\nCheck it out by running  hl(cd bloggen)'),
		'dotfiles.md': hl('My dotfile for hl(vim), hl(tmux), hl(zsh) and hl(git).\n\nCheck it out by running  hl(cd dotfiles)'),
		'js-command-system.md': hl('A command system for JavaScript. Allows you to have stuff like: \n\nhl(// code..)\nhl(foo; // This does something)\n\nCheck it out by running  hl(cd jscmdsys)'),
	},
};

const special = {
	github: () => window.open('https://github.com/SiddharthShyniben'),
	dev: () => window.open('https://dev.to/SiddharthShyniben'),
	dotfiles: () => window.open('https://github.com/SiddharthShyniben/dotfiles'),
	source: () => window.open('https://github.com/SiddharthShyniben/SiddharthShyniben.github.io'),
	bloggen: () => window.open('https://github.com/SiddharthShyniben/social-image-generator'),
	jscmdsys: () => window.open('https://github.com/SiddharthShyniben/cmd-quiz'),
	blog: this.dev,
}
