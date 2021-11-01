const fetch = require("node-fetch")
const fs = require('fs')

const downloadVideo = (url, path) => new Promise((resolve, reject) => {
    fetch(url)
        .then(res => res.buffer())
        .then(buffer => resolve(fs.writeFileSync('./files/' + path +'.mp4', buffer)))
        .catch(err => reject(err))
})

module.exports = downloadVideo