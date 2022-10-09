// Necessary included libs.
"use strict";
require("dotenv").config();
const Discord = require("discord.js");
const { Client, GatewayIntentBits } = require("discord.js");
const hiscores = require("osrs-json-hiscores");
const { MessageEmbed } = require("discord.js");
const express = require("express");
// const { getUserStats } = require("./osrs-api.js");

// Enviroment secret variables.
const secrets = process.env["TOKEN", "WELCOMECHANNELID", "RUNESCAPEROLEID", "IRONMANROLEID", "ULTIMATEROLEID"];

// Running app as a backend in port 3000.
const app = express();
const port = 3000;
app.get("/", (request, response) => response.send("Running bot online..."));
app.listen(port, () => console.log(`Running app in http://localhost:${port}/`));


// Trying to launch the bot like a "client script".
console.log("Launching Spot Drops Bot....");

// Create the client class to create the connection.
const client = new Discord.Client(
{
	intents:
	[
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	]
});

// Access to the special and SECRET Discord Bot Token.
// It takes the token from the file ".env".
const TOKEN = process.env.TOKEN;

// When the client is ready, run this code (only once).
client.once("ready", () =>
{
	// Message in console. When the bot is correctly connected.
	console.log("Spot Drops Bot Ready!");

	// Discord bot display for "Playing ...".
	client.user.setActivity("Oldschool Runescape! 🖥");
});




// Bot prefix to call commands.
const prefix = "!";

// Login to Discord with your client"s token.
client.login(TOKEN);


var ironmanRolID = "" + process.env.IRONMANROLEID;
var hardcoreRolID = "" + process.env.HARDCOREROLEID;
var ultimateRolID = "" + process.env.ULTIMATEROLEID;

// Actively listen for messages on the Discord server...
client.on("messageCreate", message =>
{
	// If the message doesn't call a command.
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// Gets the command info to execute functions.
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	// For the command "rns".
	if (command === "rsn")
	{
		// Gets the username from the argument of the command.
		let username = ("" + args).replaceAll(",", " ");

		// Call the command function.
		rsn(message, username);
	}
});

// Actively listen when a member joins.
client.on("guildMemberAdd", member =>
{
	// Gets the welcome channel.
	const welcomeChannelId = process.env.WELCOMECHANNELID;
	const channel = member.guild.channels.cache.find(channel => channel.id === welcomeChannelId.toString());
	if (!channel) return;

	// Send a welcome messsage taging the member who joins.
	channel.send("Welcome to Spot Drops Discord Server, <@" + member.id + ">!\nPlease use the command `!rsn` to gain access into the server.\nExample: `!rsn username`");
});



// FUNCTION OF RSN COMMAND.
function rsn(message, username)
{
	// THIS CODE MUST BE IN ANOTHER FILE TO BEST CLEAN CODE //
	// Uses the [getPlayer] function from [hiscores].
	hiscores
	.getStats(username)
	.then(async (userStats) =>
	{
		// Gets the specific stats the bot needs.
		var gameMode = userStats.mode;
		var totalLevel = parseInt(userStats.main.skills.overall.level);
		var totalExperience = parseInt(userStats.main.skills.overall.xp);

		// Put in capital the first letter of the game mode.
		gameMode = gameMode.charAt(0).toUpperCase() + gameMode.slice(1);

		// Gives to user the "Runescape" role.
		message.member.roles.add(process.env.RUNESCAPEROLEID);

		// Gives a removes roles depending on the status.

		if (gameMode === "Main")
		{

			// if (member.roles.cache.has(ironmanRolID))
			//   message.member.roles.remove(ironmanRolID);

			// if (member.roles.cache.has(hardcoreRolID))
			//  message.member.roles.remove(hardcoreRolID);

			// if (member.roles.cache.has(ultimateRolID))
			//  message.member.roles.remove(ultimateRolID);
		}
		if (gameMode === "Ironman")
		{
			message.member.roles.add(ironmanRolID);

			// if (member.roles.cache.has(hardcoreRolID))
			//  message.member.roles.remove(hardcoreRolID);

			// if (member.roles.cache.has(ultimateRolID))
			//  message.member.roles.remove(ultimateRolID);
		}
		if (gameMode === "Hardcore")
		{
			message.member.roles.add(hardcoreRolID);

			// if (member.roles.cache.has(ultimateRolID))
			//  message.member.roles.remove(ultimateRolID);
		}
		if (gameMode === "Ultimate")
			message.member.roles.add(ultimateRolID);

		// Send the embed message with the data //
		let userStatsEmbed = new Discord.MessageEmbed()
		.setTitle("Welcome to Spot Drops!")
		.setDescription("User profile found for \"" + ("" + username).replaceAll(",", " ") + "\"")
		.setFooter({ text: "Verified" })
		.setColor("RANDOM")
		.addFields(
		{ name: "Account Type", value: gameMode.toString(), inline: true },
		{ name: "Total Level", value: totalLevel.toLocaleString(), inline: true },
		{ name: "Total Experience", value: totalExperience.toLocaleString() })
		.setThumbnail(message.author.displayAvatarURL())
		.setTimestamp(new Date())
		message.reply({ embeds: [userStatsEmbed] })

		// Try to set the nickname of the server.
		try
		{
			await message.member.setNickname(username.toString().replaceAll(",", " "));
		}
		catch (error)
		{
			console.error(error);
			message.reply("I cannot change your nickname...");
		}
	})
	// Print an api get error with a [catch] function if the OSRS API returns an error.
	.catch(() =>
	{
		let userStatsEmbed = new Discord.MessageEmbed()
		.setTitle(username.toString())
		.setDescription("Invalid username, this may be because of a misspelling or internal error.\nCorrect: `!rsn username`.")
		.setColor("RANDOM")
		.setFooter({ text: "Spot Drops" })
		.setTimestamp(new Date())
		message.reply({ embeds: [userStatsEmbed] })
	});
}