const { LoremIpsum } = require("lorem-ipsum")
const lorem = new LoremIpsum()
const folder = "web/files"
const fs = require("fs")
const path = require("path")

for (let i = 1000; i < 3000; i++) {
    fs.writeFileSync(path.join(folder, `${i}.txt`), lorem.generateWords(10000))
}

