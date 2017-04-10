const shajs = require('sha.js')
const copy = require('to-clipboard')
const keyphrase = process.argv[2]
const domain = process.argv[3]
const removeSpecialChars = process.argv[4] == 'yes'
const encryption = process.argv[5] || 'sha256'
let messages = [
`
<<<<< ERROR >>>>>
wrong ammount of parameters.
>>>>> ERROR <<<<<

<<<<< HELP >>>>>
usability: node index.js [key-phrase] [domain]
>>>>> HELP <<<<<
`,
`
<<<<< HASH >>>>>
`,
`
>>>>> HASH <<<<<
copied to clipboard
`,

]


if (keyphrase && domain) {
	let pass = shajs(encryption).update(`${keyphrase}${domain}`).digest('base64')

	if (removeSpecialChars)
		pass = pass.replace(/=|\/|\+/ig, '')

	console.log(messages[1])
	console.log(pass)
	console.log(messages[2])
	copy(pass, (err) => { if (err) console.log(err)})
} else {
	console.log(messages[0])
}
