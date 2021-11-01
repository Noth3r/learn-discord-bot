require("dotenv").config()
const {Client, Intents} = require("discord.js")
const fs = require('fs')

const getFacebookVideo = require('./components/getLink')
const downloadVideo = require('./components/video_download')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () => {
    console.log(`Log in as ${client.user.tag}`)
})

client.on('messageCreate', async msg => {
    if (msg.content.startsWith('!n') && msg.content.includes("facebook.com")){
        const {sd, hd} = await getFacebookVideo(msg.content.replace(/\s\s+/g, ' ').split(" ")[1])
        if(sd) {
           await downloadVideo(sd, msg.nonce)
        } else if (hd) {
           await downloadVideo(hd, msg.nonce)
        } else {
            msg.reply("Video tidak bisa di download")
            return
        }
        await msg.reply({files: [`./files/${msg.nonce}.mp4`]})
        fs.unlinkSync('./files/' + msg.nonce + '.mp4')
    }
})

client.login(process.env.DISCORD_TOKEN)