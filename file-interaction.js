const os = require('os')
const path = require('path')
const fs = require('fs')

class FileInteraction {
	constructor () {
		this.path = os.homedir() + '/.password-gen-presetsrc'

		if(fs.existsSync(this.path)) {
			this.presets = JSON.parse(fs.readFileSync(this.path))
		} else {
			this.presets = []
			this.write()
		}
	}

	write () {
		fs.writeFileSync(this.path, JSON.stringify(this.presets), 'utf8')
	}

	add (preset) {
		this.presets.push(preset)
		this.write()
	}

	get (index) {
		return this.presets[index]
	}

	list (){
		return this.presets
	}
}

module.exports = FileInteraction
