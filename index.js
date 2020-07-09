const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');

function sendNewMessage(message) {
    Object.keys(config.sync).forEach((key) => {
        if (config.sync[key] == message.channel.id) return;
        const channelToSend = client.guilds.cache.get(key).channels.cache.get(config.sync[key]);
        channelToSend.send(`**${message.guild.name}** (#${message.channel.name} - ${message.member.nickname})\n${message.content}`)
    });
}

client.on('message', (message) => {
    if (message.author.bot) return;
    Object.values(config.sync).forEach((value) => {
        if (value == message.channel.id) {
            sendNewMessage(message);
        } else return;
    });
});

client.on('ready', () => {
    console.log('ready');
});

client.login(config.discord.token);