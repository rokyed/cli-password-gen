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
// for (let i = 0; i < list.length; i ++) {
// 	console.log(`ID: ${i} Domain: ${list[i].domain}  Digest: ${list[i].digest} Encryption:${list[i].encryption}  MaxLength: ${list[i].maxLength}  Show: ${list[i].showPass}  Copy: ${list[i].copyPass}  NoSpecialChars: ${list[i].removeSpecialChars}`)
// }
read({
	prompt: 'Passphrase:',
	silent: true
}, (pErr, passphrase, isPassDefault) => {
	if (pErr) return console.log(pErr)
	read({
		prompt: 'Passphrase confirm (again):',
		silent: true
	}, (pErr, passphraseConfirm, isPassDefault) => {
		if (pErr) return console.log(pErr)

		if (passphraseConfirm == passphrase) {
			read({
				prompt: 'Preset (index):'
			}, (dErr, preset, isPresetDefault) => {
				if (dErr) return console.log(dErr)

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
		} else {
			console.log('Passphrase confirm missmatch.')
		}
	})
})
