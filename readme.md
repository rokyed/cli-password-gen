# password-gen

### Short Description:
It's a tiny tool to handle passwords (by having the same main password and generating new ones for each website)

What's cool about it? Well we only need to remember the main password not all the derivates.

### Requirements:
#### Linux:
* `xsel` (for clipboard access)

### Installation:
#### We made changes please see the way we run it now (it's still backwards compatible)
```
npm i -g cli-password-gen

# run
password-gen #generates the password from preset
password-confirm #confirms password (good when creating passwords)
password-store #used to store the password config

# and enjoy :D but don't blame me, it's your own will
```

### Long Description:
It uses 'sha.js' package in order to generate (by default is sha256) unique keys that are converted to base64 (because it has special characters but not impossible for most of the websites)
What's great about this is that by feeding the same seed you can get the same key always, in other words the seed is generated by 'password+domain', all is super simple :D and works.

### Note:
For future me, please note that you need `xsel` installed on linux :D , and only phone you are doomed :), enjoy it !

#### 2024 update:
I still use this tool to this day. It is a great tool, it helps me keep my passwords secure.
