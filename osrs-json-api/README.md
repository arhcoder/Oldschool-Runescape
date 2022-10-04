# OSRS JSON API

A simple and easy Old School RuneScape API (hiscores and Grand Exchange) wrapper that returns JSON friendly objects

## Installation

```bash
$ npm install osrs-json-api
```

## Usage

### Hiscores

`getPlayer({rsn, [gamemode]})` Retrieves a player's hiscores stats

-   `rsn` {`String`} Player's RuneScape Name
-   `gamemode` {`String`} Player's game mode
    -   `'main'`: Regular **(Default)**
    -   `'iron'` : Ironman
    -   `'uim'` : Ultimate Ironman
    -   `'hcim'` : Hardcore Ironman
    -   `'dmm'` : Deadman Mode
    -   `'sdmm'` : Seasonal Deadman Mode
    -   `'dmmt'` : Deadman Mode Tournament

Example

```javascript
const { hiscores } = require('osrs-json-api');

hiscores
    .getPlayer('B0aty')
    .then(console.log)
    .catch(console.error);
```

Outputs

```javascript
{
    skills: {
        overall: { rank: '3333', level: '2277', xp: '416409455' },
        attack: { rank: '12431', level: '99', xp: '23587437' },
        defence: { rank: '10292', level: '99', xp: '21161023' },
        ...
    },
    clues: {
        all: { rank: '142056', score: '93' },
        easy: { rank: '-1', score: '-1' },
        medium: { rank: '-1', score: '-1' },
        ...
    },
    bh: {
        hunter: { rank: '129731', score: '8' },
        rogue: { rank: '89108', score: '7' }
    },
    lms: { rank: '74', score: '2496' }
}
```

### Grand Exchange

`getItem({id})` Retrieves an item's Grand Exchange details

Example

```javascript
const { ge } = require('osrs-json-api');

ge.getItem(12934)
    .then(console.log)
    .catch(console.error);
```

Outputs

```javascript
{
    item: {
        icon: 'http://services.runescape.com/m=itemdb_oldschool/1548068525870_obj_sprite.gif?id=12934',
        icon_large: 'http://services.runescape.com/m=itemdb_oldschool/1548068525870_obj_big.gif?id=12934',
        id: 12934,
        type: 'Default',
        typeIcon: 'http://www.runescape.com/img/categories/Default',
        name: 'Zulrah\'s scales',
        description: 'Flakes of toxic snakeskin.',
        current: { trend: 'neutral', price: 241 },
        today: { trend: 'positive', price: '+5' },
        members: 'true',
        day30: { trend: 'positive', change: '+40.0%' },
        day90: { trend: 'positive', change: '+8.0%' },
        day180: { trend: 'positive', change: '+9.0%' }
    }
}
```

`getGraph({id})` Retrieves an item's Grand Exchange price data of the last 180 days

Example

```javascript
const { ge } = require('osrs-json-api');

ge.getGraph(12934)
    .then(console.log)
    .catch(console.error);
```

Outputs

```javascript
{
    daily: {
        '1532736000000': 217,
        '1532822400000': 215,
        '1532908800000': 217,
        '1532995200000': 221,
        ...
    },
    average: {
        '1532736000000': 238,
        '1532822400000': 237,
        '1532908800000': 237,
        '1532995200000': 236,
        ...
    }
}
```
