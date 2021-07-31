class FS {
	constructor(files = {}, where = '/') {
		console.log('In constructor');
		this.files = files;
		this.where = where;
	}

	readPath(path) {
		console.log('In read path');
		try {
			return this._getPath(path);
		} catch (error) {
			return undefined;
		}
	}

	writePath(path, data) {
		console.log('In write path');
		return this._setPath(path, data);
	}
	
	cd(path) {
		console.log('In cd');
		if (path.startsWith('/')) {
			this.where = this._normalizePath(path)
			return;
		}
		this.where = this._normalizePath(this.where + path + '/');
	}

	_normalizePath(path) {
		console.log('In normalizepath');
		console.log('Original: %s', path);
		path = path.trim().replace(/\/\//g, '/').replace(/\\/g, '/')
		console.log('Trim, fix slashes: %s', path);

		while (/\/[^\\.\/]+\/\.\.\//g.test(path)) path = path.replace(/\/[^\\.\/]+\/\.\.\//g, '/')
		console.log('Remove ../: %s', path);
		path = path.trim().replace(/\/\//g, '/').replace(/\\/g, '/')
		console.log('Trim, fix slashes again: %s', path);
		path = path.replace(/\/\.\//g, '/');
		path = path.replace(/^\.\//g, '')
		console.log('Remove ./: %s', path);
		return path;
	}

	_getPath(path) {
		console.log('In get path');
		return this._normalizePath((path.startsWith('/') ? '' : this.where) + path)
			.split('/')
			.filter(Boolean)
			.reduce((o, i) => o[i], this.files);
	}

	_setPath(path, data) {
		console.log('In setpath');
		path = this._normalizePath((path.startsWith('/') ? '' : this.where) + path).split('/').filter(Boolean)
		let temp = this.files;
		let len = path.length;
		path.forEach((frag, index) => {
			if (!temp[frag]) temp[frag] = index === len - 1 ? data : {};
			temp = temp[frag];
		});
	}
}
