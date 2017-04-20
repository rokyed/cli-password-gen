#!/usr/bin/env node
const shajs = require('sha.js')
const read = require('read')
const copy = require('to-clipboard')

console.log('Welcome to password-gen!\n')
read({
	prompt: 'Passphrase:',
	silent: true
}, (pErr, passphrase, isPassDefault) => {
	if (pErr) return console.log(pErr)

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

								let pass = shajs(encryption).update(`${passphrase}${domain}`).digest(digest)
								let maxLengthNumber = +maxLength

								if (removeSpecialChars != 'no')
									pass = pass.replace(/=|\/|\+/ig, '')

								pass = pass.substring(0, maxLengthNumber)
								console.log('')
								if (showPass != 'no')
									console.log(pass)

								if (copyPass != 'no')
									copy(pass, (err) => { if (err) console.log(err)})

								console.log('')
								console.log('Done!')
							})
						})
					})
				})
			})
		})
	})
})
