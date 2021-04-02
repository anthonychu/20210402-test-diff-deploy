const { LoremIpsum } = require("lorem-ipsum")
const lorem = new LoremIpsum()
const folder = "web/files"
const fs = require("fs")
const path = require("path")

for (let i = 0; i < 2000; i++) {
    fs.writeFileSync(path.join(folder, `${i}.txt`), lorem.generateWords(10000))
}

