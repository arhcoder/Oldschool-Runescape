const {getPlayer} = require('osrs-json-hiscores');

hiscores
.getStats("Yeezy")
.then((userStats) =>
{
    // console.log(userStats);
    var gameMode = userStats.mode;
    var totalLevel = parseInt(userStats.main.skills.overall.level);
    var totalExperience = parseInt(userStats.main.skills.overall.xp);
    console.log(gameMode);
    console.log(totalLevel);
    console.log(totalExperience);
    console.log(userStats.main.skills);
})
.catch(console.error);

/*const { hiscores } = require("osrs-json-api");

var userStats =
{
    "accountType": "Main",
    "totalLevel": "0",
    "totalExperience": "0"
};

hiscores
        .getPlayer("" + "Dids")
        .then(response =>
        {
            userStats["totalLevel"] = parseInt(response["skills"]["overall"].mode);
            userStats["totalLevel"] = parseInt(response["skills"]["overall"].level);
            userStats["totalExperience"] = parseInt(response["skills"]["overall"].xp);

            console.log(userStats);
        });
/*
function getUserStats(username, callback)
{
    /// This function recieves a user name, and; using
    /// the Oldschool-Runescape API, gets the stats for
    /// the user; in a special way.

    // Uses the [getPlayer] function from [hiscores].
    hiscores
    .getPlayer(username)
    .then(callback)
    // Print an api get error with a [catch] function.
    .catch(console.error);
}

getUserStats("Audux", response =>
{
    // JSON var in which returns the user stats.
    var userStats =
    {
        "accountType": "main",
        "thievingLevel": "0",
        "totalLevel": "0",
        "totalExperience": "0"
    };

    // Found the account type.
    // Pending...
    console.log(response);
    
    // Gets the theiving level from json api.
    userStats["thievingLevel"] = response.skills.thieving.level;

    // Gets the total level, getting all the skills properties
    // and suming the level attribute for each one.
    var skills = response.skills;
    var totalLevel = 0;
    for (let skill in skills)
    {
        totalLevel += parseInt(skills[skill].level);
    }
    userStats["totalLevel"] = totalLevel.toLocaleString();

    // Gets the total experience, getting all the skills properties
    // and suming the level attribute for each one.
    var totalExperience = 0;
    for (let skill in skills)
    {
        totalExperience += parseInt(skills[skill].xp);
    }
    userStats["totalExperience"] = totalExperience.toLocaleString();

    console.log(userStats);
});*/

// getUserStats("Audux");

// Exports the function to be used in another files.
// module.exports = { getUserStats };