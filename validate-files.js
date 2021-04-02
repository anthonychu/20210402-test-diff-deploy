const fetch = require("node-fetch-retry")
var streamEqual = require('stream-equal')
const fs = require('fs')
const path = require('path')

const baseUrl = "https://thankful-desert-0bca1c01e.azurestaticapps.net"
// const baseUrl = "http://localhost:4280"
const baseFolder = "web"

async function validate() {
    const folder = path.join(baseFolder, "files")
    const files = fs.readdirSync(folder)

    for (const file of files) {
        const filePath = path.join(folder, file)
        if (!fs.lstatSync(filePath).isFile()) continue

        const res = await fetch(`${baseUrl}/files/${file}`, { method: 'GET', retry: 3, timeout: 2000 })
        const bodyStream = res.body
        const fileStream = fs.createReadStream(filePath)
        const result = await streamEqual(bodyStream, fileStream)
        fileStream.close()
        
        console.log(filePath, result)
    }
}

validate()