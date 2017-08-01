#!/usr/bin/env node
const shajs = require('sha.js')
const read = require('read')
const copy = require('to-clipboard')
const FileInteraction = require('./file-interaction.js')
const fi = new FileInteraction()
const list = fi.list()
const betterConsole = require('better-console')

console.log('Welcome to password-gen!\n')
betterConsole.table(list)

read({
	prompt: 'Passphrase:',
	silent: true
}, (pErr, passphrase, isPassDefault) => {
	if (pErr) return console.log(pErr)

	read({
		prompt: 'Preset (index):'
	}, (dErr, preset, isPresetDefault) => {
		if (dErr) return console.log(dErr)

		if (!list[preset])
			return console.log('No valid preset.')

		let cfg = fi.get(preset)


		let pass = shajs(cfg.encryption).update(`${passphrase}${cfg.domain}`).digest(cfg.digest)
		let maxLengthNumber = +cfg.maxLength

		if (cfg.removeSpecialChars != 'no')
			pass = pass.replace(/=|\/|\+/ig, '')

		pass = pass.substring(0, maxLengthNumber)
		console.log('')
		if (cfg.showPass != 'no')
			console.log(pass)

		if (cfg.copyPass != 'no')
			copy(pass, (err) => { if (err) console.log(err)})

	})
})
