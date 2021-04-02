const fetch = require("node-fetch").default
var streamEqual = require('stream-equal')
const fs = require('fs')
const path = require('path')

const baseUrl = "https://witty-desert-01bfde800.azurestaticapps.net"
// const baseUrl = "http://localhost:4280"
const baseFolder = "web"

async function validate() {
    const folder = path.join(baseFolder, "files")
    const files = fs.readdirSync(folder)

    const errors = []

    for (const file of files) {
        const filePath = path.join(folder, file)
        if (!fs.lstatSync(filePath).isFile()) continue

        const res = await fetch(`${baseUrl}/files/${file}`)
        const bodyStream = await res.text()
        const fileStream = fs.readFileSync(filePath, 'utf-8')
        const result = bodyStream === fileStream
        // fileStream.close()
        // bodyStream.destroy()
        
        if (!result) errors.push(file)
        console.log(filePath, result)
    }

    console.log(JSON.stringify(errors, null, 2))
}

validate()