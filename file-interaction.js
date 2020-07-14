const os = require('os')
const path = require('path')
const fs = require('fs')
const child_process = require('child_process')

class FileInteraction {
	constructor () {
		this.path = os.homedir() + '/.password-gen-presetsrc'
		this.configPath = os.homedir() + '/.password-gen-cfg'
		if (fs.existsSync(this.configPath))
			this.config = JSON.parse(fs.readFileSync(this.configPath))
		else
			this.config = {
				usingWSL: false
			}

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

	isUsingWSL() {
		return this.config.usingWSL
	}

	WSLCopy(data) {
		child_process.spawnSync('clip.exe', [], {
			input: data
		})
	}

}

module.exports = FileInteraction
