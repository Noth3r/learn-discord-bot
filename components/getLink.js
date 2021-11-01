const fetch = require("node-fetch")

const getFacebookVideo = url => new Promise((resolve, reject) => {
    fetch(url)
        .then(res => res.text())
        .then(text => {
            const sd = text.split('sd_src:"')[1] ? text.split('sd_src:"')[1].split('"')[0] : null
            const hd = text.split('hd_src:"')[1] ? text.split('hd_src:"')[1].split('"')[0] : null
            resolve({sd, hd})
        })
        .catch(err => reject(err))
}) 

module.exports = getFacebookVideo