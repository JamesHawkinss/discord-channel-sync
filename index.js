const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');

const webhooks = []

function sendNewMessage(message) {
    webhooks.forEach((hook) => {
        if (hook.channelID == message.channel.id) return;
        const avatarURL = message.author.avatarURL();
        hook.send(`**From ${message.guild.name}**\n${message.content}`, {
            username: message.member.nickname,
            avatarURL
        });
    });
}

async function getWebhook(name, channelId) {
    const hooks = await client.channels.cache.get(channelId).fetchWebhooks();
    const hook = hooks.find(hook => hook.name == name);
    return hook;
}

async function createWebhooks() {
    Object.keys(config.sync).forEach(async (key) => {
        const hook = await getWebhook("Channel Sync", config.sync[key]);
        if (!Boolean(hook)) {
            client.channels.cache.get(config.sync[key]).createWebhook('Channel Sync', {
                avatar: 'https://cdn.discordapp.com/embed/avatars/1.png',
                reason: 'Created by Channel Sync'
            })
            .then((webhook) => {
                webhooks.push(webhook);
            })
            .catch((err) => console.log(err));
        } else {
            webhooks.push(hook);
        }
    });
}

client.on('message', async (message) => {
    if (message.author.bot) return;

    if (config.sync[message.guild.id] == message.channel.id) {
        sendNewMessage(message);
    } else return;
});

client.on('ready', async () => {
    console.log('bot logged in');
    await createWebhooks();
});

client.login(config.discord.token);