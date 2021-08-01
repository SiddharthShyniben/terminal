class FS {
	constructor(files = {}, where = '/') {
		this.files = files;
		this.where = where;
	}

	readPath(path) {
		try {
			return this._getPath(path);
		} catch (error) {
			return undefined;
		}
	}

	writePath(path, data) {
		return this._setPath(path, data);
	}

	cd(path) {
		if (path.startsWith('/')) {
			this.where = this._normalizePath(path)
			return;
		}
		this.where = this._normalizePath(this.where + path + '/');
	}

	_normalizePath(path) {
		path = path.trim().replace(/\/\//g, '/').replace(/\\/g, '/')

		while (/\/[^\\.\/]+\/\.\.\//g.test(path)) path = path.replace(/\/[^\\.\/]+\/\.\.\//g, '/')
		path = path.replace(/\/[^\/]*\/\.{2}$/g, '')
		path = path.trim().replace(/\/\//g, '/').replace(/\\/g, '/')
		path = path.replace(/\/\.\//g, '/');
		path = path.replace(/^\.\//g, '')
		return path;
	}

	_getPath(path) {
		return this._normalizePath((path.startsWith('/') ? '' : this.where) + path)
			.split('/')
			.filter(Boolean)
			.reduce((o, i) => o[i], this.files);
	}

	_setPath(path, data) {
		path = this._normalizePath((path.startsWith('/') ? '' : this.where) + path).split('/').filter(Boolean)
		let temp = this.files;
		let len = path.length;
		path.forEach((frag, index) => {
			if (!temp[frag]) temp[frag] = index === len - 1 ? data : {};
			temp = temp[frag];
		});
	}
}
