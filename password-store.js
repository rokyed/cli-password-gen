#!/usr/bin/env node
const read = require('read')
const FileInteraction = require('./file-interaction.js')
console.log('Welcome to password-store!\n')

read({
	prompt: 'Domain:'
}, (dErr, domain, isDomainDefault) => {
	if (dErr) return console.log(dErr)
	read({
		prompt: 'Encryption:',
		default: 'sha256'
	}, (dErr, encryption, isEncryptionDefault) => {
		if (dErr) return console.log(dErr)

		read({
			prompt: 'Remove special characters (yes/no):',
			default: 'no'
		}, (rscErr, removeSpecialChars, isRSCDefault) => {
			if (rscErr) return console.log(rscErr)


			read({
				prompt: 'Max length (number or else you are screwed):',
				default: '100'
			}, (mlErr, maxLength, isMaxLengthDefault) => {
				if (mlErr) return console.log(mlErr)

				read({
					prompt: 'Digest (base64):',
					default: 'base64'
				}, (digErr, digest, isDigestDefault) => {
					if (digErr) return console.log(digErr)
					read({
						prompt: 'Copy password (yes/no):',
						default: 'yes'
					}, (cpErr, copyPass, isCopyPassDefault) => {
						if (cpErr) return console.log(cpErr)

						read({
							prompt: 'Show password (yes/no):',
							default: 'no'
						}, (spErr, showPass, isShowPassDefault) => {
							if (spErr) return console.log(spErr)

							let passwordPreset = {
								domain: domain,
								digest: digest,
								maxLength: maxLength,
								removeSpecialChars: removeSpecialChars,
								encryption: encryption,
								showPass: showPass,
								copyPass: copyPass
							}

							let fi = new FileInteraction()

							fi.add(passwordPreset)

							console.log('')
							console.log('Done!')
						})
					})
				})
			})
		})
	})
})
