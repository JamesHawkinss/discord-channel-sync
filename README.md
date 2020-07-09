# discord-channel-sync

This will allow one channel in a specified server to be synced with other servers.

## Configuration

```
{
	"discord": {
		"token": "discord bot token" 
	},
	"sync": {
		"serverid": "channelid",
		"serverid2": "channelid2"
	}
}
```

## Example Usecase

To sync up an announcements channel between servers, for sharing important information.

## Known Issues

Spamming the synced channel will cause ratelimiting - all the messages will be synced, but may take longer than expected. It's not advised to use this in a busy channel.
