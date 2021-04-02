const { LoremIpsum } = require("lorem-ipsum")
const lorem = new LoremIpsum()
const folder = "web/files"
const fs = require("fs")
const path = require("path")

for (let i = 2900; i < 3200; i++) {
    fs.writeFileSync(path.join(folder, `${i}.txt`), lorem.generateWords(10000))
}

