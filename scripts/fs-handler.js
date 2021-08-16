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
		assign(this.files, path, data)
	}
}

// Helper
function assign(obj, prop, value) {
	if (typeof prop === 'string') prop = prop.split('.');

	if (prop.length > 1) {
		var e = prop.shift();
		assign(obj[e] =
			Object.prototype.toString.call(obj[e]) === '[object Object]'
			? obj[e]
			: {},
			prop,
			value);
	} else obj[prop[0]] = value;
}
