require('dotenv').config()
const axios = require('axios')
const api_key = process.env.API_KEY



module.exports = async (req, res) => {

    const {name, region} = req.params

    const profileData = await axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${api_key}`)

    const {id , puuid} = profileData.data
    
    const champMasteryData = await axios.get(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${api_key}`)

    const matchIdData = await axios.get(`https://${region == 'na1' ? 'americas' : 'europe'}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${api_key}`)

    function getMatch(matchId) {
        return axios.get(`https://${region == 'na1' ? 'americas' : 'europe'}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api_key}`)
    }

    const rankedData = await axios.get(`https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api_key}`)

    async function getDataWithMatch() {
        const withMatch = await Promise.all(matchIdData.data.map(match => (getMatch(match))))
        return withMatch
    }

    getDataWithMatch().then(response => {

        let finalResponse = {
            'images': {
                'ranks': {
                    'iron': 'https://static.wikia.nocookie.net/leagueoflegends/images/f/fe/Season_2022_-_Iron.png',
                    'bronze': 'https://static.wikia.nocookie.net/leagueoflegends/images/e/e9/Season_2022_-_Bronze.png',
                    'silver': 'https://static.wikia.nocookie.net/leagueoflegends/images/4/44/Season_2022_-_Silver.png',
                    'gold': 'https://static.wikia.nocookie.net/leagueoflegends/images/8/8d/Season_2022_-_Gold.png',
                    'platinum': 'https://static.wikia.nocookie.net/leagueoflegends/images/3/3b/Season_2022_-_Platinum.png',
                    'diamond': 'https://static.wikia.nocookie.net/leagueoflegends/images/e/ee/Season_2022_-_Diamond.png',
                    'master': 'https://static.wikia.nocookie.net/leagueoflegends/images/e/eb/Season_2022_-_Master.png',
                    'grandmaster': 'https://static.wikia.nocookie.net/leagueoflegends/images/f/fc/Season_2022_-_Grandmaster.png',
                    'challenger': 'https://static.wikia.nocookie.net/leagueoflegends/images/0/02/Season_2022_-_Challenger.png'
                }
            },
            'profile': profileData.data,
            'mastery': champMasteryData.data,
            'ranked': rankedData.data,
            'matches': [
                response[0]['data'],
                 response[1]['data'],
                 response[2]['data'],
                 response[3]['data'],
                 response[4]['data'],
                 response[5]['data'],
                 response[6]['data'],
                 response[7]['data'],
                 response[8]['data'],
                 response[9]['data'],
            ],
            "runes": [
                {
                    "id": 8100,
                    "key": "Domination",
                    "icon": "perk-images/Styles/7200_Domination.png",
                    "name": "Domination",
                    "slots": [
                        {
                            "runes": [
                                {
                                    "id": 8112,
                                    "key": "Electrocute",
                                    "icon": "perk-images/Styles/Domination/Electrocute/Electrocute.png",
                                    "name": "Electrocute",
                                    "shortDesc": "Hitting a champion with 3 <b>separate</b> attacks or abilities in 3s deals bonus <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_AdaptiveDmg'>adaptive damage</lol-uikit-tooltipped-keyword>.",
                                    "longDesc": "Hitting a champion with 3 <b>separate</b> attacks or abilities within 3s deals bonus <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_AdaptiveDmg'><font color='#48C4B7'>adaptive damage</font></lol-uikit-tooltipped-keyword>.<br><br>Damage: 30 - 180 (+0.4 bonus AD, +0.25 AP) damage.<br><br>Cooldown: 25 - 20s<br><br><hr><i>'We called them the Thunderlords, for to speak of their lightning was to invite disaster.'</i>"
                                },
                                {
                                    "id": 8124,
                                    "key": "Predator",
                                    "icon": "perk-images/Styles/Domination/Predator/Predator.png",
                                    "name": "Predator",
                                    "shortDesc": "Add an active effect to your boots that grants a large boost of <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_MS'>MS</lol-uikit-tooltipped-keyword> and causes your next attack or ability to deal bonus <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_AdaptiveDmg'>adaptive damage</lol-uikit-tooltipped-keyword>.",
                                    "longDesc": "Enchants your boots with the active effect '<font color='#c60300'>Predator</font>.'<br><br>Gain increased Move Speed, ramping up to 25-50% Move Speed over 1 second, while chasing enemy champions. After ramping up, damaging attacks or abilities to champions end this effect, dealing 20-180 (+<scaleAD>0.25</scaleAD> bonus AD)(+<scaleAP>0.15</scaleAP> AP) bonus <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_AdaptiveDmg'><font color='#48C4B7'>adaptive damage</font></lol-uikit-tooltipped-keyword>.<br><br>Cooldown: 120s-60s."
                                },
                                {
                                    "id": 8128,
                                    "key": "DarkHarvest",
                                    "icon": "perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png",
                                    "name": "Dark Harvest",
                                    "shortDesc": "Damaging a low health champion inflicts <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_AdaptiveDmg'>adaptive damage</lol-uikit-tooltipped-keyword> and harvests a soul from the victim.",
                                    "longDesc": "Damaging a Champion below 50% health deals <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_AdaptiveDmg'>adaptive damage</lol-uikit-tooltipped-keyword> and harvests their soul, permanently increasing Dark Harvest's damage by 5.<br><br>Dark Harvest damage: 20-60 (based on level) (+5 damage per soul) (+0.25 bonus AD) (+0.15 AP)<br>Cooldown: 45s (resets to 1.5s on takedown)"
                                },
                                {
                                    "id": 9923,
                                    "key": "HailOfBlades",
                                    "icon": "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png",
                                    "name": "Hail of Blades",
                                    "shortDesc": "Gain a large amount of Attack Speed for the first 3 attacks made against enemy champions.",
                                    "longDesc": "Gain 110% Attack Speed when you attack an enemy champion for up to 3 attacks.<br><br>No more than 3s can elapse between attacks or this effect will end.<br><br>Cooldown: 12s.<br><br><rules>Attack resets increase the attack limit by 1.<br>Allows you to temporarily exceed the attack speed limit.</rules>"
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 8126,
                                    "key": "CheapShot",
                                    "icon": "perk-images/Styles/Domination/CheapShot/CheapShot.png",
                                    "name": "Cheap Shot",
                                    "shortDesc": "Deal bonus true damage to enemy champions with <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_ImpairAct'>impaired movement or actions</lol-uikit-tooltipped-keyword>. ",
                                    "longDesc": "Damaging champions with <b>impaired movement or actions</b> deals 10 - 45 bonus true damage (based on level).<br><br>Cooldown: 4s<br><rules>Activates on damage occurring after the impairment.</rules>"
                                },
                                {
                                    "id": 8139,
                                    "key": "TasteOfBlood",
                                    "icon": "perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png",
                                    "name": "Taste of Blood",
                                    "shortDesc": "Heal when you damage an enemy champion.",
                                    "longDesc": "Heal when you damage an enemy champion.<br><br>Healing: 16-30 (+0.15 bonus AD, +0.08 AP) health (based on level)<br><br>Cooldown: 20s"
                                },
                                {
                                    "id": 8143,
                                    "key": "SuddenImpact",
                                    "icon": "perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png",
                                    "name": "Sudden Impact",
                                    "shortDesc": "Gain a burst of Lethality and Magic Penetration after using a dash, leap, blink, teleport, or when leaving stealth.",
                                    "longDesc": "After exiting stealth or using a dash, leap, blink, or teleport, dealing any damage to a champion grants you 9 Lethality and 7 Magic Penetration for 5s.<br><br>Cooldown: 4s"
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 8136,
                                    "key": "ZombieWard",
                                    "icon": "perk-images/Styles/Domination/ZombieWard/ZombieWard.png",
                                    "name": "Zombie Ward",
                                    "shortDesc": "<lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>Takedowns</lol-uikit-tooltipped-keyword> on enemy Wards cause friendly Zombie Wards to sprout from their corpses. Gain permanent AD or AP, <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'>adaptive</lol-uikit-tooltipped-keyword> for each Zombie Ward spawned plus bonus upon completion.",
                                    "longDesc": "<lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>Takedowns</lol-uikit-tooltipped-keyword> on enemy Wards cause friendly Zombie Wards to sprout from their corpses.<br><br>Gain an <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'><font color='#48C4B7'>adaptive</font></lol-uikit-tooltipped-keyword> bonus of 1.2 Attack Damage or 2 Ability Power for every Zombie Ward spawned, up to 10. <br><br>After spawning 10 Zombie Wards, additionally gain 10 adaptive force.<br><br>Zombie Wards are visible, last for 120s and do not count towards your ward limit."
                                },
                                {
                                    "id": 8120,
                                    "key": "GhostPoro",
                                    "icon": "perk-images/Styles/Domination/GhostPoro/GhostPoro.png",
                                    "name": "Ghost Poro",
                                    "shortDesc": "When your wards expire, they leave behind a Ghost Poro. The Ghost Poro grants vision until discovered. Gain permanent AD or AP, <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'>adaptive</lol-uikit-tooltipped-keyword> for each Ghost Poro and when your Ghost Poro spots an enemy champion, plus bonus upon completion.",
                                    "longDesc": "When your wards expire, they leave behind a Ghost Poro, which grants vision for 90s. Nearby enemy champions scare the Ghost Poro away.<br><br>Gain an <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'><font color='#48C4B7'>adaptive</font></lol-uikit-tooltipped-keyword> bonus of 1.2 Attack Damage or 2 Ability Power for every Ghost Poro spawned and when your Ghost Poro spots an enemy champion up to 10 stacks. <br><br>After gaining 10 stacks, additionally gain 10 adaptive force."
                                },
                                {
                                    "id": 8138,
                                    "key": "EyeballCollection",
                                    "icon": "perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png",
                                    "name": "Eyeball Collection",
                                    "shortDesc": "Collect eyeballs for champion <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>takedowns</lol-uikit-tooltipped-keyword>. Gain permanent AD or AP, <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'>adaptive</lol-uikit-tooltipped-keyword> for each eyeball plus bonus upon collection completion.",
                                    "longDesc": "Collect eyeballs for champion takedowns. Gain an <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'><font color='#48C4B7'>adaptive</font></lol-uikit-tooltipped-keyword> bonus of 1.2 Attack Damage or 2 Ability Power, per eyeball collected. <br><br>Upon completing your collection at 10 eyeballs, additionally gain an <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'><font color='#48C4B7'>adaptive</font></lol-uikit-tooltipped-keyword> bonus of 6 Attack Damage, or 10 Ability Power.<br><br>Collect 1 eyeball per champion takedown."
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 8135,
                                    "key": "TreasureHunter",
                                    "icon": "perk-images/Styles/Domination/TreasureHunter/TreasureHunter.png",
                                    "name": "Treasure Hunter",
                                    "shortDesc": "<b>Unique</b> <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>takedowns</lol-uikit-tooltipped-keyword> grant additional gold the first time they are collected. ",
                                    "longDesc": "Gain an additional <gold>70 gold</gold> the next time you collect a <i>Bounty Hunter</i> stack. Increase the gold gained by <gold>20 gold</gold> for each <i>Bounty Hunter</i> stack, up to <gold>150 gold</gold>.<br><br><i>Bounty Hunter</i> stacks are earned the first time you get a takedown on each enemy champion."
                                },
                                {
                                    "id": 8134,
                                    "key": "IngeniousHunter",
                                    "icon": "perk-images/Styles/Domination/IngeniousHunter/IngeniousHunter.png",
                                    "name": "Ingenious Hunter",
                                    "shortDesc": "<b>Unique</b> <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>takedowns</lol-uikit-tooltipped-keyword> grant permanent Item <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_CDR'>Haste</lol-uikit-tooltipped-keyword> (includes Trinkets).",
                                    "longDesc": "Gain <attention>20</attention> <b>Item Haste</b> plus an additional <attention>6</attention> <b>Item Haste</b> per <i>Bounty Hunter</i> stack (includes Trinkets).<br><br><i>Bounty Hunter</i> stacks are earned the first time you get a takedown on each enemy champion.<br><br><rules>Item Haste affects all items with cooldowns. </rules>"
                                },
                                {
                                    "id": 8105,
                                    "key": "RelentlessHunter",
                                    "icon": "perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png",
                                    "name": "Relentless Hunter",
                                    "shortDesc": "<b>Unique</b> <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>takedowns</lol-uikit-tooltipped-keyword> grant permanent <b>out of combat <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_MS'>MS</lol-uikit-tooltipped-keyword></b>. ",
                                    "longDesc": "Gain <speed>5 Move Speed</speed> out of combat plus <speed>8</speed> per <i>Bounty Hunter</i> stack.<br><br><i>Bounty Hunter</i> stacks are earned the first time you get a takedown on each enemy champion."
                                },
                                {
                                    "id": 8106,
                                    "key": "UltimateHunter",
                                    "icon": "perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png",
                                    "name": "Ultimate Hunter",
                                    "shortDesc": "<b>Unique</b> <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>takedowns</lol-uikit-tooltipped-keyword> grant permanent cooldown reduction on your Ultimate. ",
                                    "longDesc": "Your ultimate gains <attention>6</attention> Ability Haste, plus an additional <attention>5</attention> Ability Haste per <i>Bounty Hunter</i> stack.<br><br><i>Bounty Hunter</i> stacks are earned the first time you get a takedown on each enemy champion."
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 8300,
                    "key": "Inspiration",
                    "icon": "perk-images/Styles/7203_Whimsy.png",
                    "name": "Inspiration",
                    "slots": [
                        {
                            "runes": [
                                {
                                    "id": 8351,
                                    "key": "GlacialAugment",
                                    "icon": "perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png",
                                    "name": "Glacial Augment",
                                    "shortDesc": "Immobilizing an enemy champion will cause 3 glacial rays that slow nearby enemies and reduce their damage to your allies.",
                                    "longDesc": "Immobilizing an enemy champion will cause 3 glacial rays to emanate from them towards you and other nearby champions, creating frozen zones for 3 (+ 100% of the immobilizing effect's duration) seconds that slow enemies for 30% (+9% per 10% Heal and Shield Power) (+3% per 100 Ability Power) (+4% per 100 bonus Attack Damage) and reduce their damage by 15% against your allies (not including yourself). <br><br>Cooldown: 25s"
                                },
                                {
                                    "id": 8360,
                                    "key": "UnsealedSpellbook",
                                    "icon": "perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png",
                                    "name": "Unsealed Spellbook",
                                    "shortDesc": "Swap Summoner Spells while out of combat. Swapping to unique Summoner Spells will increase the rate at which you can make future swaps.",
                                    "longDesc": "Swap one of your equipped Summoner Spells to a new, single use Summoner Spell. Each unique Summoner Spell you swap to permanently decreases your swap cooldown by 25s (initial swap cooldown is at 5 mins). <br><br>Your first swap becomes available at 6 mins. <br><rules><br>Summoner Spells can only be swapped while out of combat. <br>After using a swapped Summoner Spell you must swap 3 more times before the first can be selected again.<br>Smite damage increases after two Summoner Spell swaps. </rules>"
                                },
                                {
                                    "id": 8369,
                                    "key": "FirstStrike",
                                    "icon": "perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png",
                                    "name": "First Strike",
                                    "shortDesc": "When you initiate champion combat, deal 9% extra damage for 3 seconds and gain gold based on damage dealt.",
                                    "longDesc": "Attacks or abilities against an enemy champion within 0.25s of entering champion combat grants 5 gold and <b>First Strike</b> for 3 seconds, causing you to deal <truedamage>9%</truedamage> extra <truedamage> damage</truedamage> against champions, and granting <gold>100% (70% for ranged champions)</gold> of bonus damage dealt as <gold>gold</gold>.<br><br>Cooldown: <scaleLevel>25 - 15</scaleLevel>s"
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 8306,
                                    "key": "HextechFlashtraption",
                                    "icon": "perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png",
                                    "name": "Hextech Flashtraption",
                                    "shortDesc": "While Flash is on cooldown it is replaced by <i>Hexflash</i>.<br><br><i>Hexflash</i>: Channel, then blink to a new location.",
                                    "longDesc": "While Flash is on cooldown it is replaced by <i>Hexflash</i>.<br><br><i>Hexflash</i>: Channel for 2s to blink to a new location.<br><br>Cooldown: 20s. Goes on a 10s cooldown when you enter champion combat."
                                },
                                {
                                    "id": 8304,
                                    "key": "MagicalFootwear",
                                    "icon": "perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png",
                                    "name": "Magical Footwear",
                                    "shortDesc": "You get free boots at 12 min but you cannot buy boots before then. Each <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>takedown</lol-uikit-tooltipped-keyword> you get makes your boots come 45s sooner.",
                                    "longDesc": "You get free Slightly Magical Footwear at 12 min, but you cannot buy boots before then. For each takedown you acquire the boots 45s sooner.<br><br>Slightly Magical Footwear grants you an additional <speed>10 Move Speed</speed>."
                                },
                                {
                                    "id": 8313,
                                    "key": "PerfectTiming",
                                    "icon": "perk-images/Styles/Inspiration/PerfectTiming/PerfectTiming.png",
                                    "name": "Perfect Timing",
                                    "shortDesc": "Gain a free Commencing Stopwatch. After 14 minutes, it can be used for a one time <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Stasis'>Stasis</lol-uikit-tooltipped-keyword> effect. <br><br>Each <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>takedown</lol-uikit-tooltipped-keyword> you get shortens this timer by 120 seconds.",
                                    "longDesc": "Begin the game with a Commencing Stopwatch that transforms into a Stopwatch after 14 minutes. Each takedown you acquire reduces this timer by 120 seconds.<br><br>Stopwatch can be used for a one time 2.5 second Stasis effect."
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 8321,
                                    "key": "FuturesMarket",
                                    "icon": "perk-images/Styles/Inspiration/FuturesMarket/FuturesMarket.png",
                                    "name": "Future's Market",
                                    "shortDesc": "You can enter debt to buy items.",
                                    "longDesc": "You can enter debt to buy items. The amount you can borrow increases over time.<br><br>Lending Fee: 50 gold"
                                },
                                {
                                    "id": 8316,
                                    "key": "MinionDematerializer",
                                    "icon": "perk-images/Styles/Inspiration/MinionDematerializer/MinionDematerializer.png",
                                    "name": "Minion Dematerializer",
                                    "shortDesc": "Start the game with 3 Minion Dematerializers. Killing minions with the item gives permanent bonus damage vs. that minion type.",
                                    "longDesc": "Start the game with 3 Minion Dematerializers that kill and absorb lane minions instantly. Minion Dematerializers are on cooldown for the first 180s of the game.<br><br>Absorbing a minion increases your damage by +6% against that type of minion permanently, and an extra +3% for each additional minion of that type absorbed.<br>"
                                },
                                {
                                    "id": 8345,
                                    "key": "BiscuitDelivery",
                                    "icon": "perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png",
                                    "name": "Biscuit Delivery",
                                    "shortDesc": "Gain a free Biscuit every 2 min, until 6 min. Consuming or selling a Biscuit permanently increases your max mana and restores health and mana.",
                                    "longDesc": "Biscuit Delivery: Gain a Total Biscuit of Everlasting Will every 2 mins, until 6 min.<br><br>Biscuits restore 8% of your missing health and mana. Consuming or selling a Biscuit permanently increases your mana cap by 40. <br><br><i>Manaless:</i> Champions without mana restore 12% missing health instead."
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 8347,
                                    "key": "CosmicInsight",
                                    "icon": "perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png",
                                    "name": "Cosmic Insight",
                                    "shortDesc": "+<attention>18</attention> Summoner Spell Haste<br>+<attention>10</attention> Item Haste",
                                    "longDesc": "+<attention>18</attention> Summoner Spell Haste<br>+<attention>10</attention> Item Haste"
                                },
                                {
                                    "id": 8410,
                                    "key": "ApproachVelocity",
                                    "icon": "perk-images/Styles/Resolve/ApproachVelocity/ApproachVelocity.png",
                                    "name": "Approach Velocity",
                                    "shortDesc": "Bonus <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_MS'>MS</lol-uikit-tooltipped-keyword> towards nearby enemy champions that are <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_ImpairMov'>movement impaired</lol-uikit-tooltipped-keyword>, increased for enemy champions that you impair.",
                                    "longDesc": "Gain <speed>7.5% Move Speed</speed> towards nearby enemy champions that are movement impaired. This bonus is increased to <speed>15% Move Speed</speed> for any enemy champion that you impair. <br><br>Activation Range for CC from allies: 1000"
                                },
                                {
                                    "id": 8352,
                                    "key": "TimeWarpTonic",
                                    "icon": "perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png",
                                    "name": "Time Warp Tonic",
                                    "shortDesc": "Potions and biscuits grant some restoration immediately. Gain <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_MS'>MS</lol-uikit-tooltipped-keyword>  while under their effects.",
                                    "longDesc": "Consuming a potion or biscuit grants 30% of its health or mana restoration immediately. In addition, gain <speed>2% Move Speed</speed> while under their effects.<br><br>"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 8000,
                    "key": "Precision",
                    "icon": "perk-images/Styles/7201_Precision.png",
                    "name": "Precision",
                    "slots": [
                        {
                            "runes": [
                                {
                                    "id": 8005,
                                    "key": "PressTheAttack",
                                    "icon": "perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png",
                                    "name": "Press the Attack",
                                    "shortDesc": "Hitting an enemy champion 3 consecutive times makes them vulnerable, dealing bonus damage and causing them to take more damage from all sources for 6s.",
                                    "longDesc": "Hitting an enemy champion with 3 consecutive basic attacks deals 40 - 180 bonus <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_AdaptiveDmg'><font color='#48C4B7'>adaptive damage</font></lol-uikit-tooltipped-keyword> (based on level) and makes them vulnerable, increasing the damage they take by 8 - 12% from all sources for 6s."
                                },
                                {
                                    "id": 8008,
                                    "key": "LethalTempo",
                                    "icon": "perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png",
                                    "name": "Lethal Tempo",
                                    "shortDesc": "Gain Attack Speed when attacking an enemy champion, stacking up to 6 times. At max stacks, gain Attack Range and remove your Attack Speed limit.",
                                    "longDesc": "Gain [60% - 90%] (Melee) or [30% - 54%] (Ranged) Attack Speed for 6 seconds when you attack an enemy champion. This effect stacks up to 6 times.<br><br>While this effect fully stacked, your Attack Speed can exceed 2.5 and you gain 50 Attack Range."
                                },
                                {
                                    "id": 8021,
                                    "key": "FleetFootwork",
                                    "icon": "perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png",
                                    "name": "Fleet Footwork",
                                    "shortDesc": "Attacking and moving builds Energy stacks. At 100 stacks, your next attack heals you and grants increased <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_MS'>MS</lol-uikit-tooltipped-keyword>.",
                                    "longDesc": "Attacking and moving builds Energy stacks. At 100 stacks, your next attack is Energized<br><br>Energized attacks heal you for 10 - 100 (+0.3 Bonus AD, +0.2 AP) and grant <speed>20% Move Speed</speed> for 1s.<br><br>Healing from minions is 10% effective for Ranged Champions, and 20% effective for Melee Champions."
                                },
                                {
                                    "id": 8010,
                                    "key": "Conqueror",
                                    "icon": "perk-images/Styles/Precision/Conqueror/Conqueror.png",
                                    "name": "Conqueror",
                                    "shortDesc": "Gain stacks of adaptive force when attacking enemy champions. After reaching 12 stacks, heal for a portion of damage you deal to champions.",
                                    "longDesc": "Basic attacks or spells that deal damage to an enemy champion grant 2 stacks of Conqueror for 5s, gaining 2-4.5 <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'><font color='#48C4B7'>Adaptive Force</font></lol-uikit-tooltipped-keyword> per stack. Stacks up to 12 times. Ranged champions gain only 1 stack per basic attack.<br><br>When fully stacked, heal for 8% of the damage you deal to champions (5% for ranged champions)."
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 9101,
                                    "key": "Overheal",
                                    "icon": "perk-images/Styles/Precision/Overheal.png",
                                    "name": "Overheal",
                                    "shortDesc": "Excess healing on you becomes a shield.",
                                    "longDesc": "Excess healing on you becomes a shield, for up to 10 <scaleHealth>(+9% Max Health)</scaleHealth>.<br><br>Shield is built up from 20 to 100% of excess healing from yourself or any ally."
                                },
                                {
                                    "id": 9111,
                                    "key": "Triumph",
                                    "icon": "perk-images/Styles/Precision/Triumph.png",
                                    "name": "Triumph",
                                    "shortDesc": "<lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>Takedowns</lol-uikit-tooltipped-keyword> restore 10% of your missing health and grant an additional 20 gold. ",
                                    "longDesc": "Takedowns restore 10% of your missing health and grant an additional 20 gold. <br><br><hr><br><i>'The most dangerous game brings the greatest glory.' <br>—Noxian Reckoner</i>"
                                },
                                {
                                    "id": 8009,
                                    "key": "PresenceOfMind",
                                    "icon": "perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png",
                                    "name": "Presence of Mind",
                                    "shortDesc": "Increase your mana or energy regeneration when damaging an enemy champion. Takedowns restore mana or energy.",
                                    "longDesc": "Damaging an enemy champion increases your mana regeneration by @RegenAmount@ (80% for ranged) mana per second for 4 seconds. All energy users gain 1.5 energy per second, instead.<br><br>Takedowns restore 15% of your maximum mana or energy. "
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 9104,
                                    "key": "LegendAlacrity",
                                    "icon": "perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png",
                                    "name": "Legend: Alacrity",
                                    "shortDesc": "<lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>Takedowns</lol-uikit-tooltipped-keyword> on enemies grant permanent <b>Attack Speed</b>. ",
                                    "longDesc": "Gain 3% attack speed plus an additional 1.5% for every <i>Legend</i> stack (<statGood>max 10 stacks</statGood>).<br><br>Earn progress toward <i>Legend</i> stacks for every champion takedown, epic monster takedown, large monster kill, and minion kill."
                                },
                                {
                                    "id": 9105,
                                    "key": "LegendTenacity",
                                    "icon": "perk-images/Styles/Precision/LegendTenacity/LegendTenacity.png",
                                    "name": "Legend: Tenacity",
                                    "shortDesc": "<lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>Takedowns</lol-uikit-tooltipped-keyword> on enemies grant permanent <b>Tenacity</b>. ",
                                    "longDesc": "Gain 5% tenacity plus an additional 1.5% for every <i>Legend</i> stack (<statGood>max 10 stacks</statGood>).<br><br>Earn progress toward <i>Legend</i> stacks for every champion takedown, epic monster takedown, large monster kill, and minion kill."
                                },
                                {
                                    "id": 9103,
                                    "key": "LegendBloodline",
                                    "icon": "perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png",
                                    "name": "Legend: Bloodline",
                                    "shortDesc": "<lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>Takedowns</lol-uikit-tooltipped-keyword> on enemies grant permanent<b> Life Steal</b>, up to a cap. Once the cap is reached, increase your max health. Weaker earlier but stronger later game than other Legend Runes.",
                                    "longDesc": "Gain 0.4% Life Steal for every <i>Legend</i> stack (<statGood>max 15 stacks</statGood>). At maximum <i>Legend</i> stacks, gain 100 max health.<br><br>Earn progress toward <i>Legend</i> stacks for every champion takedown, epic monster takedown, large monster kill, and minion kill."
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 8014,
                                    "key": "CoupDeGrace",
                                    "icon": "perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png",
                                    "name": "Coup de Grace",
                                    "shortDesc": "Deal more damage to low health enemy champions.",
                                    "longDesc": "Deal 8% more damage to champions who have less than 40% health."
                                },
                                {
                                    "id": 8017,
                                    "key": "CutDown",
                                    "icon": "perk-images/Styles/Precision/CutDown/CutDown.png",
                                    "name": "Cut Down",
                                    "shortDesc": "Deal more damage to champions with more max health than you.",
                                    "longDesc": "Deal 5% to 15% more damage to champions, based on how much more max health they have than you.<br><br><rules>Bonus damage scales up linearly against enemies with 10% to 100% more max health than you.</rules>"
                                },
                                {
                                    "id": 8299,
                                    "key": "LastStand",
                                    "icon": "perk-images/Styles/Sorcery/LastStand/LastStand.png",
                                    "name": "Last Stand",
                                    "shortDesc": "Deal more damage to champions while you are low on health.",
                                    "longDesc": "Deal 5% - 11% increased damage to champions while you are below 60% health. Max damage gained at 30% health."
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 8400,
                    "key": "Resolve",
                    "icon": "perk-images/Styles/7204_Resolve.png",
                    "name": "Resolve",
                    "slots": [
                        {
                            "runes": [
                                {
                                    "id": 8437,
                                    "key": "GraspOfTheUndying",
                                    "icon": "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png",
                                    "name": "Grasp of the Undying",
                                    "shortDesc": "Every 4s your next attack on a champion deals bonus magic damage, heals you, and permanently increases your health.",
                                    "longDesc": "Every 4s in combat, your next basic attack on a champion will:<li>Deal bonus magic damage equal to 3.5% of your max health</li><li>Heals you for 1.7% of your max health</li><li>Permanently increase your health by 5</li><br><rules><i>Ranged Champions:</i> Damage, healing, and permanent health gained reduced by 40%.</rules><br>"
                                },
                                {
                                    "id": 8439,
                                    "key": "Aftershock",
                                    "icon": "perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png",
                                    "name": "Aftershock",
                                    "shortDesc": "After <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Immobilize'>immobilizing</lol-uikit-tooltipped-keyword> an enemy champion gain defenses and later deal a burst of magic damage around you.",
                                    "longDesc": "After immobilizing an enemy champion, increase your Armor and Magic Resist by 35 + 80% of your Bonus Resists for 2.5s. Then explode, dealing magic damage to nearby enemies.<br><br>Damage: 25 - 120 (+8% of your bonus health)<br>Cooldown: 20s<br><br>Resistance bonus from Aftershock capped at: 80-150 (based on level)<br>"
                                },
                                {
                                    "id": 8465,
                                    "key": "Guardian",
                                    "icon": "perk-images/Styles/Resolve/Guardian/Guardian.png",
                                    "name": "Guardian",
                                    "shortDesc": "Guard allies you cast spells on and those that are very nearby. If you or a guarded ally would take damage based on level, you're both granted a shield.",
                                    "longDesc": "<i>Guard</i> allies within 350 units of you, and allies you target with spells for 2.5s. While <i>Guarding</i>, if you or the ally take more than a small amount of damage over the duration of the <i>Guard</i>, both of you gain a shield for 1.5s.<br><br>Cooldown: <scaleLevel>90 - 40</scaleLevel> seconds<br>Shield: <scaleLevel>45 - 120</scaleLevel> + <scaleAP>12.5%</scaleAP> of your ability power + <scalehealth>8%</scalehealth> of your bonus health<br>Proc Threshold: <scaleLevel>90 - 250</scaleLevel> postmitigation damage"
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 8446,
                                    "key": "Demolish",
                                    "icon": "perk-images/Styles/Resolve/Demolish/Demolish.png",
                                    "name": "Demolish",
                                    "shortDesc": "Charge up a powerful attack against a tower while near it.",
                                    "longDesc": "Charge up a powerful attack against a tower over 3s, while within 600 range of it. The charged attack deals 100 (+35% of your max health) bonus physical damage. <br><br>Cooldown: 45s"
                                },
                                {
                                    "id": 8463,
                                    "key": "FontOfLife",
                                    "icon": "perk-images/Styles/Resolve/FontOfLife/FontOfLife.png",
                                    "name": "Font of Life",
                                    "shortDesc": "<lol-uikit-tooltipped-keyword key='LinkTooltip_Description_ImpairMov'>Impairing</lol-uikit-tooltipped-keyword> the movement of an enemy champion marks them. Your allies heal when attacking champions you've marked. ",
                                    "longDesc": "Impairing the movement of an enemy champion marks them for 4s.<br><br>Ally champions who attack marked enemies heal for 5 + 0.9% of your max health over 2s. "
                                },
                                {
                                    "id": 8401,
                                    "key": "ShieldBash",
                                    "icon": "perk-images/Styles/Resolve/MirrorShell/MirrorShell.png",
                                    "name": "Shield Bash",
                                    "shortDesc": "Whenever you gain a shield, your next basic attack against a champion deals bonus <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'><font color='#48C4B7'>adaptive</font></lol-uikit-tooltipped-keyword> damage.",
                                    "longDesc": "While shielded, gain <scaleLevel>1 - 10</scaleLevel> Armor and Magic Resist based on Level.<br><br>Whenever you gain a new shield,  your next basic attack against a champion deals <scaleLevel>5 - 30</scaleLevel> <scaleHealth>(+1.5% Bonus Health)</scaleHealth> <scaleMana>(+8.5% New Shield Amount)</scaleMana> bonus <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'><font color='#48C4B7'>adaptive</font></lol-uikit-tooltipped-keyword> damage.<br><br>You have up to 2s after the shield expires to use this effect."
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 8429,
                                    "key": "Conditioning",
                                    "icon": "perk-images/Styles/Resolve/Conditioning/Conditioning.png",
                                    "name": "Conditioning",
                                    "shortDesc": "After 12 min gain +8 Armor and +8 Magic Resist and increase your bonus Armor and Magic Resist by 3%.",
                                    "longDesc": "After 12 min gain +8 Armor and +8 Magic Resist and increase your bonus Armor and Magic Resist by 3%."
                                },
                                {
                                    "id": 8444,
                                    "key": "SecondWind",
                                    "icon": "perk-images/Styles/Resolve/SecondWind/SecondWind.png",
                                    "name": "Second Wind",
                                    "shortDesc": "After taking damage from an enemy champion heal back some missing health over time. ",
                                    "longDesc": "After taking damage from an enemy champion, heal for 4% of your missing health +3 over 10s."
                                },
                                {
                                    "id": 8473,
                                    "key": "BonePlating",
                                    "icon": "perk-images/Styles/Resolve/BonePlating/BonePlating.png",
                                    "name": "Bone Plating",
                                    "shortDesc": "After taking damage from an enemy champion, the next 3 spells or attacks you receive from them deal 30-60 less damage.<br><br><br>Duration: 1.5s<br>Cooldown: 55s",
                                    "longDesc": "After taking damage from an enemy champion, the next 3 spells or attacks you receive from them deal 30-60 less damage.<br><br><br>Duration: 1.5s<br>Cooldown: 55s"
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 8451,
                                    "key": "Overgrowth",
                                    "icon": "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png",
                                    "name": "Overgrowth",
                                    "shortDesc": "Gain permanent max health when minions or monsters die near you.",
                                    "longDesc": "Absorb life essence from monsters or enemy minions that die near you, permanently gaining 3 maximum health for every 8.<br><br>When you've absorbed 120 monsters or enemy minions, gain an additional 3.5% maximum health."
                                },
                                {
                                    "id": 8453,
                                    "key": "Revitalize",
                                    "icon": "perk-images/Styles/Resolve/Revitalize/Revitalize.png",
                                    "name": "Revitalize",
                                    "shortDesc": "Gain 5% Heal and Shield Power.<br><br>Heals and shields you cast or receive are 10% stronger on targets below 40% health.",
                                    "longDesc": "Gain 5% Heal and Shield Power.<br><br>Heals and shields you cast or receive are 10% stronger on targets below 40% health."
                                },
                                {
                                    "id": 8242,
                                    "key": "Unflinching",
                                    "icon": "perk-images/Styles/Sorcery/Unflinching/Unflinching.png",
                                    "name": "Unflinching",
                                    "shortDesc": "Gain a small amount of tenacity that increases with missing health. ",
                                    "longDesc": "Gain 5% Tenacity and 5% Slow Resist. These values increase by up to an additional 20% Tenacity and 20% Slow Resist based on missing health. Maximum value achieved at 30% health. "
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 8200,
                    "key": "Sorcery",
                    "icon": "perk-images/Styles/7202_Sorcery.png",
                    "name": "Sorcery",
                    "slots": [
                        {
                            "runes": [
                                {
                                    "id": 8214,
                                    "key": "SummonAery",
                                    "icon": "perk-images/Styles/Sorcery/SummonAery/SummonAery.png",
                                    "name": "Summon Aery",
                                    "shortDesc": "Your attacks and abilities send Aery to a target, damaging enemies or shielding allies.",
                                    "longDesc": "Damaging enemy champions with basic attacks or abilities sends Aery to them, dealing 10 - 40 based on level (+<scaleAP>0.1 AP</scaleAP>) (+<scaleAD>0.15 bonus AD</scaleAD>).<br><br>Empower or protecting allies with abilities sends Aery to them, shielding them for 30 - 75 based on level (+<scaleAP>0.22 AP</scaleAP>) (+<scaleAD>0.35 bonus AD</scaleAD>).<br><br>Aery cannot be sent out again until she returns to you."
                                },
                                {
                                    "id": 8229,
                                    "key": "ArcaneComet",
                                    "icon": "perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png",
                                    "name": "Arcane Comet",
                                    "shortDesc": "Damaging a champion with an ability hurls a damaging comet at their location.",
                                    "longDesc": "Damaging a champion with an ability hurls a comet at their location, or, if Arcane Comet is on cooldown, reduces its remaining cooldown.<br><br><lol-uikit-tooltipped-keyword key='LinkTooltip_Description_AdaptiveDmg'><font color='#48C4B7'>Adaptive Damage</font></lol-uikit-tooltipped-keyword>: 30 - 100 based on level (<scaleAP>+0.2 AP</scaleAP> and <scaleAD>+0.35 bonus AD</scaleAD>)<br>Cooldown: 20 - 8s<br><rules><br>Cooldown Reduction:<br>Single Target: 20%.<br>Area of Effect: 10%.<br>Damage over Time: 5%.<br></rules>"
                                },
                                {
                                    "id": 8230,
                                    "key": "PhaseRush",
                                    "icon": "perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png",
                                    "name": "Phase Rush",
                                    "shortDesc": "Hitting an enemy champion with 3 <b>separate</b> attacks or abilities grants a burst of <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_MS'>MS</lol-uikit-tooltipped-keyword>. ",
                                    "longDesc": "Hitting an enemy champion with 3 attacks or <b>separate</b> abilities within 4s grants <speed>15 - 40% Move Speed</speed> based on level and 75% Slow Resistance. <hr>This is increased to <speed>30 - 60% Move Speed</speed> for Melee champions.<hr>Duration: 3s<br>Cooldown: 30s - 10s"
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 8224,
                                    "key": "NullifyingOrb",
                                    "icon": "perk-images/Styles/Sorcery/NullifyingOrb/Pokeshield.png",
                                    "name": "Nullifying Orb",
                                    "shortDesc": "Gain a magic damage shield when taken to low health by magic damage.",
                                    "longDesc": "When you take magic damage that would reduce your Health below 30%, gain a shield that absorbs 35 - 110 magic damage based on level (<scaleAP>+0.09 AP</scaleAP> and <scaleAD>+0.14 bonus AD</scaleAD>) for 4s.<br><br>Cooldown: 60s"
                                },
                                {
                                    "id": 8226,
                                    "key": "ManaflowBand",
                                    "icon": "perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png",
                                    "name": "Manaflow Band",
                                    "shortDesc": "Hitting an enemy champion with an ability permanently increases your maximum mana by 25, up to 250 mana.<br><br>After reaching 250 bonus mana, restore 1% of your missing mana every 5 seconds.",
                                    "longDesc": "Hitting an enemy champion with an ability permanently increases your maximum mana by 25, up to 250 mana.<br><br>After reaching 250 bonus mana, restore 1% of your missing mana every 5 seconds.<br><br>Cooldown: 15 seconds"
                                },
                                {
                                    "id": 8275,
                                    "key": "NimbusCloak",
                                    "icon": "perk-images/Styles/Sorcery/NimbusCloak/6361.png",
                                    "name": "Nimbus Cloak",
                                    "shortDesc": "After casting a Summoner Spell, gain a short <speed>Move Speed</speed> increase that allows you to pass through units.",
                                    "longDesc": "After casting a Summoner Spell, gain a <speed>Move Speed</speed> increase that lasts for 2s and allows you to pass through units.<br><br>Increase: <speed>5% - 25% Move Speed</speed> based on the Summoner Spell's cooldown. (Higher cooldown Summoner Spells grant more <speed>Move Speed</speed>). "
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 8210,
                                    "key": "Transcendence",
                                    "icon": "perk-images/Styles/Sorcery/Transcendence/Transcendence.png",
                                    "name": "Transcendence",
                                    "shortDesc": "Gain bonuses upon reaching the following levels:<br>Level 5: +5 <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_CDR'>Ability Haste</lol-uikit-tooltipped-keyword> <br>Level 8: +5 <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_CDR'>Ability Haste</lol-uikit-tooltipped-keyword> <br>Level 11: On Champion takedown, reduce the remaining cooldown of basic abilities by 20%.",
                                    "longDesc": "Gain bonuses upon reaching the following levels:<br>Level 5: +5 <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_CDR'>Ability Haste</lol-uikit-tooltipped-keyword> <br>Level 8: +5 <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_CDR'>Ability Haste</lol-uikit-tooltipped-keyword> <br>Level 11: On Champion takedown, reduce the remaining cooldown of basic abilities by 20%.<br>"
                                },
                                {
                                    "id": 8234,
                                    "key": "Celerity",
                                    "icon": "perk-images/Styles/Sorcery/Celerity/CelerityTemp.png",
                                    "name": "Celerity",
                                    "shortDesc": "All <speed>Move Speed</speed> bonuses are 7% more effective on you and gain <speed>1% Move Speed</speed>.",
                                    "longDesc": "All movement bonuses are 7% more effective on you and gain <speed>1% Move Speed</speed>."
                                },
                                {
                                    "id": 8233,
                                    "key": "AbsoluteFocus",
                                    "icon": "perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png",
                                    "name": "Absolute Focus",
                                    "shortDesc": "While above 70% health, gain extra <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_AdaptiveDmg'>adaptive damage</lol-uikit-tooltipped-keyword>.",
                                    "longDesc": "While above 70% health, gain an <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'><font color='#48C4B7'>adaptive</font></lol-uikit-tooltipped-keyword> bonus of up to 18 Attack Damage or 30 Ability Power (based on level). <br><br>Grants 1.8 Attack Damage or 3 Ability Power at level 1. "
                                }
                            ]
                        },
                        {
                            "runes": [
                                {
                                    "id": 8237,
                                    "key": "Scorch",
                                    "icon": "perk-images/Styles/Sorcery/Scorch/Scorch.png",
                                    "name": "Scorch",
                                    "shortDesc": "Your first damaging ability hit every 10s burns champions.",
                                    "longDesc": "Your next damaging ability hit sets champions on fire dealing 20 - 40 bonus magic damage based on level after 1s.<br><br>Cooldown: 10s"
                                },
                                {
                                    "id": 8232,
                                    "key": "Waterwalking",
                                    "icon": "perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png",
                                    "name": "Waterwalking",
                                    "shortDesc": "Gain <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_MS'>MS</lol-uikit-tooltipped-keyword> and AP or AD, <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'>adaptive</lol-uikit-tooltipped-keyword> in the river.",
                                    "longDesc": "Gain <speed>25 Move Speed</speed> and an <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'><font color='#48C4B7'>adaptive</font></lol-uikit-tooltipped-keyword> bonus of up to 18 Attack Damage or 30 Ability Power (based on level) when in the river.<br><br><hr><br><i>May you be as swift as the rushing river and agile as a startled Rift Scuttler.</i><br>"
                                },
                                {
                                    "id": 8236,
                                    "key": "GatheringStorm",
                                    "icon": "perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png",
                                    "name": "Gathering Storm",
                                    "shortDesc": "Gain increasing amounts of AD or AP, <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'>adaptive</lol-uikit-tooltipped-keyword> over the course of the game.",
                                    "longDesc": "Every 10 min gain AP or AD, <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Adaptive'><font color='#48C4B7'>adaptive</font></lol-uikit-tooltipped-keyword>.<br><br><i>10 min</i>: + 8 AP or 5 AD <br><i>20 min</i>: + 24 AP or 14 AD<br><i>30 min</i>: + 48 AP or 29 AD<br><i>40 min</i>: + 80 AP or 48 AD<br><i>50 min</i>: + 120 AP or 72 AD<br><i>60 min</i>: + 168 AP or 101 AD<br>etc..."
                                }
                            ]
                        }
                    ]
                }
            ],
        
            "summoner": {
                "SummonerBarrier": {
                    "id": "SummonerBarrier",
                    "name": "Barrier",
                    "description": "Shields your champion from 105-411 damage (depending on champion level) for 2 seconds.",
                    "tooltip": "Temporarily shields {{ tooltipabsorbeddamage }} damage from your champion for 2 seconds.",
                    "maxrank": 1,
                    "cooldown": [
                        180
                    ],
                    "cooldownBurn": "180",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            87
                        ],
                        [
                            18
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "87",
                        "18",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "21",
                    "summonerLevel": 4,
                    "modes": [
                        "NEXUSBLITZ",
                        "URF",
                        "PRACTICETOOL",
                        "TUTORIAL",
                        "CLASSIC",
                        "ARAM",
                        "DOOMBOTSTEEMO",
                        "ULTBOOK",
                        "ONEFORALL",
                        "ARSR",
                        "ASSASSINATE",
                        "FIRSTBLOOD",
                        "PROJECT",
                        "STARGUARDIAN"
                    ],
                    "costType": "No Cost",
                    "maxammo": "-1",
                    "range": [
                        1200
                    ],
                    "rangeBurn": "1200",
                    "image": {
                        "full": "SummonerBarrier.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 0,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "SummonerBoost": {
                    "id": "SummonerBoost",
                    "name": "Cleanse",
                    "description": "Removes all disables (excluding suppression and airborne) and summoner spell debuffs affecting your champion and lowers the duration of incoming disables by 65% for 3 seconds.",
                    "tooltip": "Removes all disables (excluding suppression and airborne) and summoner spell debuffs affecting your champion and reduces the duration of disables by 65% for the next {{ e2 }} seconds.",
                    "maxrank": 1,
                    "cooldown": [
                        210
                    ],
                    "cooldownBurn": "210",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            0.65
                        ],
                        [
                            3
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "0.65",
                        "3",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "1",
                    "summonerLevel": 9,
                    "modes": [
                        "URF",
                        "NEXUSBLITZ",
                        "ARSR",
                        "ONEFORALL",
                        "ARAM",
                        "CLASSIC",
                        "PRACTICETOOL",
                        "DOOMBOTSTEEMO",
                        "TUTORIAL",
                        "ULTBOOK",
                        "FIRSTBLOOD",
                        "PROJECT"
                    ],
                    "costType": "No Cost",
                    "maxammo": "-1",
                    "range": [
                        200
                    ],
                    "rangeBurn": "200",
                    "image": {
                        "full": "SummonerBoost.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 48,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "SummonerDot": {
                    "id": "SummonerDot",
                    "name": "Ignite",
                    "description": "Ignites target enemy champion, dealing 70-410 true damage (depending on champion level) over 5 seconds, grants you vision of the target, and reduces healing effects on them for the duration.",
                    "tooltip": "Ignite deals <span class=\"colorFEFCFF\">{{ tooltiptruedamagecalculation }}</span> true damage to target enemy champion over 5 seconds, grants you vision of the target and applies {{ grievousamount*100 }}% Grievous Wounds for the duration.<br /><br /><rules>(Grievous Wounds reduces healing and regeneration by a percentage equal to the highest value applied. This vision does not reveal stealthed enemies.)</rules>",
                    "maxrank": 1,
                    "cooldown": [
                        180
                    ],
                    "cooldownBurn": "180",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            5
                        ],
                        [
                            10
                        ],
                        [
                            4
                        ],
                        [
                            100
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "5",
                        "10",
                        "4",
                        "100",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "14",
                    "summonerLevel": 9,
                    "modes": [
                        "NEXUSBLITZ",
                        "URF",
                        "PRACTICETOOL",
                        "TUTORIAL",
                        "CLASSIC",
                        "ARAM",
                        "DOOMBOTSTEEMO",
                        "ULTBOOK",
                        "ONEFORALL",
                        "ARSR",
                        "ASSASSINATE",
                        "FIRSTBLOOD"
                    ],
                    "costType": "No Cost",
                    "maxammo": "-1",
                    "range": [
                        600
                    ],
                    "rangeBurn": "600",
                    "image": {
                        "full": "SummonerDot.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 96,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "SummonerExhaust": {
                    "id": "SummonerExhaust",
                    "name": "Exhaust",
                    "description": "Exhausts target enemy champion, reducing their Move Speed by 30%, and their damage dealt by 35% for 3 seconds.",
                    "tooltip": "Exhausts target enemy champion, reducing their Move Speed by {{ e5 }}%, and their damage dealt by {{ damagereductiontooltip }}% for 3 seconds.",
                    "maxrank": 1,
                    "cooldown": [
                        210
                    ],
                    "cooldownBurn": "210",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            3
                        ],
                        [
                            35
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            30
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "3",
                        "35",
                        "0",
                        "0",
                        "30",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "3",
                    "summonerLevel": 4,
                    "modes": [
                        "NEXUSBLITZ",
                        "URF",
                        "PRACTICETOOL",
                        "TUTORIAL",
                        "CLASSIC",
                        "ARAM",
                        "DOOMBOTSTEEMO",
                        "ULTBOOK",
                        "ONEFORALL",
                        "ARSR"
                    ],
                    "costType": "No Cost",
                    "maxammo": "-1",
                    "range": [
                        650
                    ],
                    "rangeBurn": "650",
                    "image": {
                        "full": "SummonerExhaust.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 144,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "SummonerFlash": {
                    "id": "SummonerFlash",
                    "name": "Flash",
                    "description": "Teleports your champion a short distance toward your cursor's location.",
                    "tooltip": "Teleports your champion a short distance toward your cursor's location.",
                    "maxrank": 1,
                    "cooldown": [
                        300
                    ],
                    "cooldownBurn": "300",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            400
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "400",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "4",
                    "summonerLevel": 7,
                    "modes": [
                        "NEXUSBLITZ",
                        "URF",
                        "PRACTICETOOL",
                        "SNOWURF",
                        "TUTORIAL",
                        "CLASSIC",
                        "ARAM",
                        "DOOMBOTSTEEMO",
                        "ULTBOOK",
                        "ONEFORALL",
                        "ARSR",
                        "ASSASSINATE",
                        "FIRSTBLOOD",
                        "PROJECT",
                        "STARGUARDIAN"
                    ],
                    "costType": "No Cost",
                    "maxammo": "-1",
                    "range": [
                        425
                    ],
                    "rangeBurn": "425",
                    "image": {
                        "full": "SummonerFlash.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 192,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "SummonerHaste": {
                    "id": "SummonerHaste",
                    "name": "Ghost",
                    "description": "For 10 seconds, your champion can move through units and gains 24 - 48% Move Speed (depending on champion level). Ghost extends its duration on takedown.",
                    "tooltip": "For {{ duration }} seconds, your champion can move through units and gains {{ movespeedmod }} Move Speed.<br /><br />Ghost extends its duration by {{ takedownextension }} seconds on takedown.",
                    "maxrank": 1,
                    "cooldown": [
                        210
                    ],
                    "cooldownBurn": "210",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "6",
                    "summonerLevel": 1,
                    "modes": [
                        "NEXUSBLITZ",
                        "TUTORIAL_MODULE_2",
                        "URF",
                        "PRACTICETOOL",
                        "TUTORIAL",
                        "CLASSIC",
                        "ARAM",
                        "DOOMBOTSTEEMO",
                        "ULTBOOK",
                        "TUTORIAL_MODULE_1",
                        "ONEFORALL",
                        "ARSR",
                        "ASSASSINATE",
                        "FIRSTBLOOD",
                        "PROJECT",
                        "STARGUARDIAN"
                    ],
                    "costType": "No Cost",
                    "maxammo": "-1",
                    "range": [
                        200
                    ],
                    "rangeBurn": "200",
                    "image": {
                        "full": "SummonerHaste.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 240,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "SummonerHeal": {
                    "id": "SummonerHeal",
                    "name": "Heal",
                    "description": "Restores 80-318 Health (depending on champion level) and grants 30% Move Speed for 1 second to you and target allied champion. This healing is halved for units recently affected by Summoner Heal.",
                    "tooltip": "Restores {{ tooltiphealamount }} Health and grants 30% Move Speed for 1 second to your champion and target allied champion. This healing is halved for units recently affected by Summoner Heal.<br /><br /><span class=\"colorFFFF00\">If this spell cannot find a target, it will cast on the most wounded allied champion in range.</span>",
                    "maxrank": 1,
                    "cooldown": [
                        240
                    ],
                    "cooldownBurn": "240",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            0.3
                        ],
                        [
                            66
                        ],
                        [
                            14
                        ],
                        [
                            0.5
                        ],
                        [
                            826
                        ],
                        [
                            0.5
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "0.3",
                        "66",
                        "14",
                        "0.5",
                        "826",
                        "0.5",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "7",
                    "summonerLevel": 1,
                    "modes": [
                        "NEXUSBLITZ",
                        "TUTORIAL_MODULE_2",
                        "URF",
                        "PRACTICETOOL",
                        "TUTORIAL",
                        "CLASSIC",
                        "ARAM",
                        "DOOMBOTSTEEMO",
                        "ULTBOOK",
                        "TUTORIAL_MODULE_1",
                        "ONEFORALL",
                        "ARSR",
                        "ASSASSINATE",
                        "PROJECT",
                        "STARGUARDIAN"
                    ],
                    "costType": "No Cost",
                    "maxammo": "-1",
                    "range": [
                        850
                    ],
                    "rangeBurn": "850",
                    "image": {
                        "full": "SummonerHeal.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 288,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "SummonerMana": {
                    "id": "SummonerMana",
                    "name": "Clarity",
                    "description": "Restores 50% of your champion's maximum Mana. Also restores allies for 25% of their maximum Mana.",
                    "tooltip": "Restores {{ e1 }}% maximum Mana to your Champion and {{ e2 }}% to nearby allies.",
                    "maxrank": 1,
                    "cooldown": [
                        240
                    ],
                    "cooldownBurn": "240",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            50
                        ],
                        [
                            25
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "50",
                        "25",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "13",
                    "summonerLevel": 6,
                    "modes": [
                        "ARAM",
                        "FIRSTBLOOD"
                    ],
                    "costType": "No Cost",
                    "maxammo": "-1",
                    "range": [
                        600
                    ],
                    "rangeBurn": "600",
                    "image": {
                        "full": "SummonerMana.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 336,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "SummonerPoroRecall": {
                    "id": "SummonerPoroRecall",
                    "name": "To the King!",
                    "description": "Quickly travel to the Poro King's side.",
                    "tooltip": "<span class=\"colorFFE076\">Passive:</span> Hitting an enemy champion with a Poro gives your team a Poro Mark. Upon reaching 10 Poro Marks, your team summons the Poro King to fight alongside them. While the Poro King is active, no Poro Marks can be scored by either team.<br /><br /><span class=\"colorFFE076\">Active:</span> Quickly dash to King Poro's side. Can only be cast while the Poro King is summoned for your team. <br /><br /><i><span class=\"colorFDD017\">''Poros tug the heartstrings. The rest of you just comes along for the ride.''</span></i></mainText>",
                    "maxrank": 1,
                    "cooldown": [
                        10
                    ],
                    "cooldownBurn": "10",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            3000
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "3000",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "30",
                    "summonerLevel": 1,
                    "modes": [
                        "KINGPORO"
                    ],
                    "costType": "No Cost",
                    "maxammo": "-1",
                    "range": [
                        200
                    ],
                    "rangeBurn": "200",
                    "image": {
                        "full": "SummonerPoroRecall.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 384,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "SummonerPoroThrow": {
                    "id": "SummonerPoroThrow",
                    "name": "Poro Toss",
                    "description": "Toss a Poro at your enemies. If it hits, you can quickly travel to your target as a follow up.",
                    "tooltip": "Toss a Poro a long distance, dealing {{ f2 }} true damage to the first enemy unit hit, granting <span class=\"coloree91d7\">True Sight</span> of the target.<br /><br />This ability can be recast for 3 seconds if it hits an enemy to dash to the target hit, dealing {{ f2 }} more true damage and reducing the cooldown of the next Poro Toss by {{ e4 }} seconds.<br /><br />Poros are not blocked by spell shields or wind walls because they are animals, not spells!<br /><br /><i><span class=\"colorFDD017\">''Poros are a model for Runeterran aerodynamics.''</span></i></mainText>",
                    "maxrank": 1,
                    "cooldown": [
                        20
                    ],
                    "cooldownBurn": "20",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            20
                        ],
                        [
                            10
                        ],
                        [
                            3
                        ],
                        [
                            5
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "20",
                        "10",
                        "3",
                        "5",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "31",
                    "summonerLevel": 1,
                    "modes": [
                        "KINGPORO"
                    ],
                    "costType": "No Cost",
                    "maxammo": "-1",
                    "range": [
                        2500
                    ],
                    "rangeBurn": "2500",
                    "image": {
                        "full": "SummonerPoroThrow.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 432,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "SummonerSmite": {
                    "id": "SummonerSmite",
                    "name": "Smite",
                    "description": "Deals 600-1200 true damage to target monster or minion.",
                    "tooltip": "Deals <span class=\"colorFEFCFF\">{{ f1 }}</span> true damage to target monster or minion.<br />",
                    "maxrank": 1,
                    "cooldown": [
                        15
                    ],
                    "cooldownBurn": "15",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            15
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "15",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "11",
                    "summonerLevel": 9,
                    "modes": [
                        "URF",
                        "CLASSIC",
                        "ARSR",
                        "ONEFORALL",
                        "PRACTICETOOL",
                        "NEXUSBLITZ",
                        "TUTORIAL",
                        "DOOMBOTSTEEMO"
                    ],
                    "costType": "No Cost",
                    "maxammo": "2",
                    "range": [
                        500
                    ],
                    "rangeBurn": "500",
                    "image": {
                        "full": "SummonerSmite.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 0,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "SummonerSnowURFSnowball_Mark": {
                    "id": "SummonerSnowURFSnowball_Mark",
                    "name": "Mark",
                    "description": "Throw a snowball in a straight line at your enemies. If it hits an enemy, they become marked, granting True Sight, and your champion can quickly travel to the marked target as a follow up.",
                    "tooltip": "Throw a snowball a long distance, dealing {{ tooltipdamagetotal }} true damage to the first enemy unit hit and granting <span class=\"coloree91d7\">True Sight</span> of the target. If it hits an enemy, this ability can be recast for {{ e3 }} seconds to Dash to the tagged unit, dealing an additional {{ tooltipdamagetotal }} true damage. Dashing to the target will reduce the cooldown of Mark by {{ e4 }}%.<br /><br /><span class=\"colorFFFF00\">Mark projectiles are not stopped by spell shields or projectile mitigation.</span>",
                    "maxrank": 1,
                    "cooldown": [
                        80
                    ],
                    "cooldownBurn": "80",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            10
                        ],
                        [
                            5
                        ],
                        [
                            3
                        ],
                        [
                            25
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "10",
                        "5",
                        "3",
                        "25",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "39",
                    "summonerLevel": 6,
                    "modes": [
                        "SNOWURF"
                    ],
                    "costType": "No Cost",
                    "maxammo": "-1",
                    "range": [
                        8000
                    ],
                    "rangeBurn": "8000",
                    "image": {
                        "full": "SummonerSnowURFSnowball_Mark.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 48,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "SummonerSnowball": {
                    "id": "SummonerSnowball",
                    "name": "Mark",
                    "description": "Throw a snowball in a straight line at your enemies. If it hits an enemy, they become marked, granting True Sight, and your champion can quickly travel to the marked target as a follow up.",
                    "tooltip": "Throw a snowball a long distance, dealing {{ tooltipdamagetotal }} true damage to the first enemy unit hit and granting <span class=\"coloree91d7\">True Sight</span> of the target. If it hits an enemy, this ability can be recast for {{ e3 }} seconds to Dash to the tagged unit, dealing an additional {{ tooltipdamagetotal }} true damage. Dashing to the target will reduce the cooldown of Mark by {{ e4 }}%.<br /><br /><span class=\"colorFFFF00\">Mark projectiles are not stopped by spell shields or projectile mitigation.</span>",
                    "maxrank": 1,
                    "cooldown": [
                        80
                    ],
                    "cooldownBurn": "80",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            10
                        ],
                        [
                            5
                        ],
                        [
                            3
                        ],
                        [
                            25
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "10",
                        "5",
                        "3",
                        "25",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "32",
                    "summonerLevel": 6,
                    "modes": [
                        "ARAM",
                        "FIRSTBLOOD"
                    ],
                    "costType": "No Cost",
                    "maxammo": "-1",
                    "range": [
                        1600
                    ],
                    "rangeBurn": "1600",
                    "image": {
                        "full": "SummonerSnowball.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 96,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "SummonerTeleport": {
                    "id": "SummonerTeleport",
                    "name": "Teleport",
                    "description": "After channeling for 4 seconds, teleports your champion to target allied structure. Upgrades to Unleashed Teleport at 14 minutes, which teleports your champion to target allied structure, minion, or ward.",
                    "tooltip": "After channeling for {{ channelduration }} seconds, your champion teleports to target allied structure.<br /><br />Upgrades to Unleashed Teleport when Turret Plates fall at 14 minutes. Unleashed Teleport has a {{ upgradedcooldown }}s cooldown, can be used on allied structures, minions, or wards, and grants a {{ msamount*100 }}% Move Speed boost for {{ msduration }} seconds.",
                    "maxrank": 1,
                    "cooldown": [
                        360
                    ],
                    "cooldownBurn": "360",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "12",
                    "summonerLevel": 7,
                    "modes": [
                        "ONEFORALL",
                        "PRACTICETOOL",
                        "CLASSIC",
                        "TUTORIAL",
                        "ULTBOOK",
                        "ARSR",
                        "ASSASSINATE",
                        "DOOMBOTSTEEMO"
                    ],
                    "costType": "No Cost",
                    "maxammo": "-1",
                    "range": [
                        25000
                    ],
                    "rangeBurn": "25000",
                    "image": {
                        "full": "SummonerTeleport.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 144,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "No Cost"
                },
                "Summoner_UltBookPlaceholder": {
                    "id": "Summoner_UltBookPlaceholder",
                    "name": "Placeholder",
                    "description": "This slot will be replaced by another champion's ultimate selected at the start of the game. There will be 30 seconds to select an ultimate. Be prepared!",
                    "tooltip": "Will be replaced by your Ultimate Summoner Spell selection.{{ spellmodifierdescriptionappend }}",
                    "maxrank": 1,
                    "cooldown": [
                        0
                    ],
                    "cooldownBurn": "0",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "54",
                    "summonerLevel": 1,
                    "modes": [
                        "ULTBOOK"
                    ],
                    "costType": "&nbsp;",
                    "maxammo": "-1",
                    "range": [
                        400
                    ],
                    "rangeBurn": "400",
                    "image": {
                        "full": "Summoner_UltBookPlaceholder.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 192,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "&nbsp;"
                },
                "Summoner_UltBookSmitePlaceholder": {
                    "id": "Summoner_UltBookSmitePlaceholder",
                    "name": "Placeholder and Attack-Smite",
                    "description": "This slot will be replaced by another champion's ultimate and you will gain Attack-Smite. There will be 30 seconds to select an ultimate. Be prepared!",
                    "tooltip": "Will be replaced by your Ultimate Summoner Spell.<br /><br />Gain Attack-Smite. Attack-Smite will execute allied Buff Monsters, Epic Monsters, and Scuttle Crabs when you attack them.<br /><br /><attention>Attack-Smite does not have a cooldown.</attention>{{ spellmodifierdescriptionappend }}",
                    "maxrank": 1,
                    "cooldown": [
                        0
                    ],
                    "cooldownBurn": "0",
                    "cost": [
                        0
                    ],
                    "costBurn": "0",
                    "datavalues": {},
                    "effect": [
                        null,
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ],
                        [
                            0
                        ]
                    ],
                    "effectBurn": [
                        null,
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    "vars": [],
                    "key": "55",
                    "summonerLevel": 1,
                    "modes": [
                        "ULTBOOK"
                    ],
                    "costType": "&nbsp;",
                    "maxammo": "-1",
                    "range": [
                        400
                    ],
                    "rangeBurn": "400",
                    "image": {
                        "full": "Summoner_UltBookSmitePlaceholder.png",
                        "sprite": "spell0.png",
                        "group": "spell",
                        "x": 240,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "resource": "&nbsp;"
                }
            }, 
        
            "champion": {
                "Aatrox": {
                    "version": "13.1.1",
                    "id": "Aatrox",
                    "key": "266",
                    "name": "Aatrox",
                    "title": "the Darkin Blade",
                    "blurb": "Once honored defenders of Shurima against the Void, Aatrox and his brethren would eventually become an even greater threat to Runeterra, and were defeated only by cunning mortal sorcery. But after centuries of imprisonment, Aatrox was the first to find...",
                    "info": {
                        "attack": 8,
                        "defense": 4,
                        "magic": 3,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Aatrox.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 0,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Blood Well",
                    "stats": {
                        "hp": 650,
                        "hpperlevel": 114,
                        "mp": 0,
                        "mpperlevel": 0,
                        "movespeed": 345,
                        "armor": 38,
                        "armorperlevel": 4.45,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 3,
                        "hpregenperlevel": 1,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 60,
                        "attackdamageperlevel": 5,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.651
                    }
                },
                "Ahri": {
                    "version": "13.1.1",
                    "id": "Ahri",
                    "key": "103",
                    "name": "Ahri",
                    "title": "the Nine-Tailed Fox",
                    "blurb": "Innately connected to the latent power of Runeterra, Ahri is a vastaya who can reshape magic into orbs of raw energy. She revels in toying with her prey by manipulating their emotions before devouring their life essence. Despite her predatory nature...",
                    "info": {
                        "attack": 3,
                        "defense": 4,
                        "magic": 8,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Ahri.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 48,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 570,
                        "hpperlevel": 96,
                        "mp": 418,
                        "mpperlevel": 25,
                        "movespeed": 330,
                        "armor": 18,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 2.5,
                        "hpregenperlevel": 0.6,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 53,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.668
                    }
                },
                "Akali": {
                    "version": "13.1.1",
                    "id": "Akali",
                    "key": "84",
                    "name": "Akali",
                    "title": "the Rogue Assassin",
                    "blurb": "Abandoning the Kinkou Order and her title of the Fist of Shadow, Akali now strikes alone, ready to be the deadly weapon her people need. Though she holds onto all she learned from her master Shen, she has pledged to defend Ionia from its enemies, one...",
                    "info": {
                        "attack": 5,
                        "defense": 3,
                        "magic": 8,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Akali.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 96,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin"
                    ],
                    "partype": "Energy",
                    "stats": {
                        "hp": 570,
                        "hpperlevel": 119,
                        "mp": 200,
                        "mpperlevel": 0,
                        "movespeed": 345,
                        "armor": 23,
                        "armorperlevel": 4.7,
                        "spellblock": 37,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 9,
                        "hpregenperlevel": 0.9,
                        "mpregen": 50,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 62,
                        "attackdamageperlevel": 3.3,
                        "attackspeedperlevel": 3.2,
                        "attackspeed": 0.625
                    }
                },
                "Akshan": {
                    "version": "13.1.1",
                    "id": "Akshan",
                    "key": "166",
                    "name": "Akshan",
                    "title": "the Rogue Sentinel",
                    "blurb": "Raising an eyebrow in the face of danger, Akshan fights evil with dashing charisma, righteous vengeance, and a conspicuous lack of shirts. He is highly skilled in the art of stealth combat, able to evade the eyes of his enemies and reappear when they...",
                    "info": {
                        "attack": 0,
                        "defense": 0,
                        "magic": 0,
                        "difficulty": 0
                    },
                    "image": {
                        "full": "Akshan.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 144,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 630,
                        "hpperlevel": 104,
                        "mp": 350,
                        "mpperlevel": 40,
                        "movespeed": 330,
                        "armor": 26,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 500,
                        "hpregen": 3.75,
                        "hpregenperlevel": 0.65,
                        "mpregen": 8.2,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 52,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 4,
                        "attackspeed": 0.638
                    }
                },
                "Alistar": {
                    "version": "13.1.1",
                    "id": "Alistar",
                    "key": "12",
                    "name": "Alistar",
                    "title": "the Minotaur",
                    "blurb": "Always a mighty warrior with a fearsome reputation, Alistar seeks revenge for the death of his clan at the hands of the Noxian empire. Though he was enslaved and forced into the life of a gladiator, his unbreakable will was what kept him from truly...",
                    "info": {
                        "attack": 6,
                        "defense": 9,
                        "magic": 5,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Alistar.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 192,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 670,
                        "hpperlevel": 120,
                        "mp": 350,
                        "mpperlevel": 40,
                        "movespeed": 330,
                        "armor": 44,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.85,
                        "mpregen": 8.5,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 62,
                        "attackdamageperlevel": 3.75,
                        "attackspeedperlevel": 2.125,
                        "attackspeed": 0.625
                    }
                },
                "Amumu": {
                    "version": "13.1.1",
                    "id": "Amumu",
                    "key": "32",
                    "name": "Amumu",
                    "title": "the Sad Mummy",
                    "blurb": "Legend claims that Amumu is a lonely and melancholy soul from ancient Shurima, roaming the world in search of a friend. Doomed by an ancient curse to remain alone forever, his touch is death, his affection ruin. Those who claim to have seen him describe...",
                    "info": {
                        "attack": 2,
                        "defense": 6,
                        "magic": 8,
                        "difficulty": 3
                    },
                    "image": {
                        "full": "Amumu.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 240,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 685,
                        "hpperlevel": 100,
                        "mp": 285,
                        "mpperlevel": 40,
                        "movespeed": 335,
                        "armor": 30,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 9,
                        "hpregenperlevel": 0.85,
                        "mpregen": 7.4,
                        "mpregenperlevel": 0.55,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 53,
                        "attackdamageperlevel": 3.8,
                        "attackspeedperlevel": 2.18,
                        "attackspeed": 0.736
                    }
                },
                "Anivia": {
                    "version": "13.1.1",
                    "id": "Anivia",
                    "key": "34",
                    "name": "Anivia",
                    "title": "the Cryophoenix",
                    "blurb": "Anivia is a benevolent winged spirit who endures endless cycles of life, death, and rebirth to protect the Freljord. A demigod born of unforgiving ice and bitter winds, she wields those elemental powers to thwart any who dare disturb her homeland...",
                    "info": {
                        "attack": 1,
                        "defense": 4,
                        "magic": 10,
                        "difficulty": 10
                    },
                    "image": {
                        "full": "Anivia.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 288,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 550,
                        "hpperlevel": 96,
                        "mp": 495,
                        "mpperlevel": 45,
                        "movespeed": 325,
                        "armor": 21,
                        "armorperlevel": 5.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 600,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 51,
                        "attackdamageperlevel": 3.2,
                        "attackspeedperlevel": 1.68,
                        "attackspeed": 0.625
                    }
                },
                "Annie": {
                    "version": "13.1.1",
                    "id": "Annie",
                    "key": "1",
                    "name": "Annie",
                    "title": "the Dark Child",
                    "blurb": "Dangerous, yet disarmingly precocious, Annie is a child mage with immense pyromantic power. Even in the shadows of the mountains north of Noxus, she is a magical outlier. Her natural affinity for fire manifested early in life through unpredictable...",
                    "info": {
                        "attack": 2,
                        "defense": 3,
                        "magic": 10,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Annie.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 336,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 594,
                        "hpperlevel": 102,
                        "mp": 418,
                        "mpperlevel": 25,
                        "movespeed": 335,
                        "armor": 19,
                        "armorperlevel": 5.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 625,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 50,
                        "attackdamageperlevel": 2.65,
                        "attackspeedperlevel": 1.36,
                        "attackspeed": 0.579
                    }
                },
                "Aphelios": {
                    "version": "13.1.1",
                    "id": "Aphelios",
                    "key": "523",
                    "name": "Aphelios",
                    "title": "the Weapon of the Faithful",
                    "blurb": "Emerging from moonlight's shadow with weapons drawn, Aphelios kills the enemies of his faith in brooding silence—speaking only through the certainty of his aim, and the firing of each gun. Though fueled by a poison that renders him mute, he is guided by...",
                    "info": {
                        "attack": 6,
                        "defense": 2,
                        "magic": 1,
                        "difficulty": 10
                    },
                    "image": {
                        "full": "Aphelios.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 384,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 580,
                        "hpperlevel": 102,
                        "mp": 348,
                        "mpperlevel": 42,
                        "movespeed": 325,
                        "armor": 26,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 3.25,
                        "hpregenperlevel": 0.55,
                        "mpregen": 6.5,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.1,
                        "attackspeed": 0.64
                    }
                },
                "Ashe": {
                    "version": "13.1.1",
                    "id": "Ashe",
                    "key": "22",
                    "name": "Ashe",
                    "title": "the Frost Archer",
                    "blurb": "Iceborn warmother of the Avarosan tribe, Ashe commands the most populous horde in the north. Stoic, intelligent, and idealistic, yet uncomfortable with her role as leader, she taps into the ancestral magics of her lineage to wield a bow of True Ice...",
                    "info": {
                        "attack": 7,
                        "defense": 3,
                        "magic": 2,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Ashe.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 432,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 640,
                        "hpperlevel": 101,
                        "mp": 280,
                        "mpperlevel": 32,
                        "movespeed": 325,
                        "armor": 26,
                        "armorperlevel": 4.6,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 600,
                        "hpregen": 3.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 7,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 59,
                        "attackdamageperlevel": 2.95,
                        "attackspeedperlevel": 3.33,
                        "attackspeed": 0.658
                    }
                },
                "AurelionSol": {
                    "version": "13.1.1",
                    "id": "AurelionSol",
                    "key": "136",
                    "name": "Aurelion Sol",
                    "title": "The Star Forger",
                    "blurb": "Aurelion Sol once graced the vast emptiness of the cosmos with celestial wonders of his own devising. Now, he is forced to wield his awesome power at the behest of a space-faring empire that tricked him into servitude. Desiring a return to his...",
                    "info": {
                        "attack": 2,
                        "defense": 3,
                        "magic": 8,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "AurelionSol.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 0,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 645,
                        "hpperlevel": 106,
                        "mp": 350,
                        "mpperlevel": 50,
                        "movespeed": 325,
                        "armor": 19,
                        "armorperlevel": 4.8,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 7,
                        "hpregenperlevel": 0.6,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 57,
                        "attackdamageperlevel": 3.2,
                        "attackspeedperlevel": 1.36,
                        "attackspeed": 0.625
                    }
                },
                "Azir": {
                    "version": "13.1.1",
                    "id": "Azir",
                    "key": "268",
                    "name": "Azir",
                    "title": "the Emperor of the Sands",
                    "blurb": "Azir was a mortal emperor of Shurima in a far distant age, a proud man who stood at the cusp of immortality. His hubris saw him betrayed and murdered at the moment of his greatest triumph, but now, millennia later, he has been reborn as an Ascended...",
                    "info": {
                        "attack": 6,
                        "defense": 3,
                        "magic": 8,
                        "difficulty": 9
                    },
                    "image": {
                        "full": "Azir.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 48,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 622,
                        "hpperlevel": 119,
                        "mp": 480,
                        "mpperlevel": 21,
                        "movespeed": 335,
                        "armor": 19,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 7,
                        "hpregenperlevel": 0.75,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 52,
                        "attackdamageperlevel": 2.8,
                        "attackspeedperlevel": 3,
                        "attackspeed": 0.625
                    }
                },
                "Bard": {
                    "version": "13.1.1",
                    "id": "Bard",
                    "key": "432",
                    "name": "Bard",
                    "title": "the Wandering Caretaker",
                    "blurb": "A traveler from beyond the stars, Bard is an agent of serendipity who fights to maintain a balance where life can endure the indifference of chaos. Many Runeterrans sing songs that ponder his extraordinary nature, yet they all agree that the cosmic...",
                    "info": {
                        "attack": 4,
                        "defense": 4,
                        "magic": 5,
                        "difficulty": 9
                    },
                    "image": {
                        "full": "Bard.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 96,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 630,
                        "hpperlevel": 103,
                        "mp": 350,
                        "mpperlevel": 50,
                        "movespeed": 330,
                        "armor": 34,
                        "armorperlevel": 5.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 500,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 6,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 52,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.625
                    }
                },
                "Belveth": {
                    "version": "13.1.1",
                    "id": "Belveth",
                    "key": "200",
                    "name": "Bel'Veth",
                    "title": "the Empress of the Void",
                    "blurb": "A nightmarish empress created from the raw material of an entire devoured city, Bel'Veth is the end of Runeterra itself... and the beginning of a monstrous reality of her own design. Driven by epochs of repurposed history, knowledge, and memories from...",
                    "info": {
                        "attack": 4,
                        "defense": 2,
                        "magic": 7,
                        "difficulty": 10
                    },
                    "image": {
                        "full": "Belveth.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 144,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter"
                    ],
                    "partype": "",
                    "stats": {
                        "hp": 610,
                        "hpperlevel": 99,
                        "mp": 60,
                        "mpperlevel": 0,
                        "movespeed": 340,
                        "armor": 32,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 6,
                        "hpregenperlevel": 0.6,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 60,
                        "attackdamageperlevel": 1.7,
                        "attackspeedperlevel": 0,
                        "attackspeed": 0.85
                    }
                },
                "Blitzcrank": {
                    "version": "13.1.1",
                    "id": "Blitzcrank",
                    "key": "53",
                    "name": "Blitzcrank",
                    "title": "the Great Steam Golem",
                    "blurb": "Blitzcrank is an enormous, near-indestructible automaton from Zaun, originally built to dispose of hazardous waste. However, he found this primary purpose too restricting, and modified his own form to better serve the fragile people of the Sump...",
                    "info": {
                        "attack": 4,
                        "defense": 8,
                        "magic": 5,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Blitzcrank.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 192,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 633,
                        "hpperlevel": 109,
                        "mp": 267,
                        "mpperlevel": 40,
                        "movespeed": 325,
                        "armor": 40,
                        "armorperlevel": 4.7,
                        "spellblock": 28,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 7.5,
                        "hpregenperlevel": 0.75,
                        "mpregen": 8.5,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 62,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 1.13,
                        "attackspeed": 0.65
                    }
                },
                "Brand": {
                    "version": "13.1.1",
                    "id": "Brand",
                    "key": "63",
                    "name": "Brand",
                    "title": "the Burning Vengeance",
                    "blurb": "Once a tribesman of the icy Freljord named Kegan Rodhe, the creature known as Brand is a lesson in the temptation of greater power. Seeking one of the legendary World Runes, Kegan betrayed his companions and seized it for himself—and, in an instant, the...",
                    "info": {
                        "attack": 2,
                        "defense": 2,
                        "magic": 9,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Brand.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 240,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 590,
                        "hpperlevel": 102,
                        "mp": 469,
                        "mpperlevel": 21,
                        "movespeed": 340,
                        "armor": 22,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 10.65,
                        "mpregenperlevel": 0.6,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 57,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 1.36,
                        "attackspeed": 0.625
                    }
                },
                "Braum": {
                    "version": "13.1.1",
                    "id": "Braum",
                    "key": "201",
                    "name": "Braum",
                    "title": "the Heart of the Freljord",
                    "blurb": "Blessed with massive biceps and an even bigger heart, Braum is a beloved hero of the Freljord. Every mead hall north of Frostheld toasts his legendary strength, said to have felled a forest of oaks in a single night, and punched an entire mountain into...",
                    "info": {
                        "attack": 3,
                        "defense": 9,
                        "magic": 4,
                        "difficulty": 3
                    },
                    "image": {
                        "full": "Braum.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 288,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 610,
                        "hpperlevel": 112,
                        "mp": 311,
                        "mpperlevel": 45,
                        "movespeed": 335,
                        "armor": 47,
                        "armorperlevel": 5.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8.5,
                        "hpregenperlevel": 1,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 3.2,
                        "attackspeedperlevel": 3.5,
                        "attackspeed": 0.644
                    }
                },
                "Caitlyn": {
                    "version": "13.1.1",
                    "id": "Caitlyn",
                    "key": "51",
                    "name": "Caitlyn",
                    "title": "the Sheriff of Piltover",
                    "blurb": "Renowned as its finest peacekeeper, Caitlyn is also Piltover's best shot at ridding the city of its elusive criminal elements. She is often paired with Vi, acting as a cool counterpoint to her partner's more impetuous nature. Even though she carries a...",
                    "info": {
                        "attack": 8,
                        "defense": 2,
                        "magic": 2,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Caitlyn.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 336,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 580,
                        "hpperlevel": 107,
                        "mp": 315,
                        "mpperlevel": 35,
                        "movespeed": 325,
                        "armor": 28,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 650,
                        "hpregen": 3.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 7.4,
                        "mpregenperlevel": 0.55,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 62,
                        "attackdamageperlevel": 3.8,
                        "attackspeedperlevel": 4,
                        "attackspeed": 0.681
                    }
                },
                "Camille": {
                    "version": "13.1.1",
                    "id": "Camille",
                    "key": "164",
                    "name": "Camille",
                    "title": "the Steel Shadow",
                    "blurb": "Weaponized to operate outside the boundaries of the law, Camille is the Principal Intelligencer of Clan Ferros—an elegant and elite agent who ensures the Piltover machine and its Zaunite underbelly runs smoothly. Adaptable and precise, she views sloppy...",
                    "info": {
                        "attack": 8,
                        "defense": 6,
                        "magic": 3,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Camille.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 384,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 646,
                        "hpperlevel": 99,
                        "mp": 339,
                        "mpperlevel": 52,
                        "movespeed": 340,
                        "armor": 35,
                        "armorperlevel": 5,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.8,
                        "mpregen": 8.15,
                        "mpregenperlevel": 0.75,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 68,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.644
                    }
                },
                "Cassiopeia": {
                    "version": "13.1.1",
                    "id": "Cassiopeia",
                    "key": "69",
                    "name": "Cassiopeia",
                    "title": "the Serpent's Embrace",
                    "blurb": "Cassiopeia is a deadly creature bent on manipulating others to her sinister will. Youngest and most beautiful daughter of the noble Du Couteau family of Noxus, she ventured deep into the crypts beneath Shurima in search of ancient power. There, she was...",
                    "info": {
                        "attack": 2,
                        "defense": 3,
                        "magic": 9,
                        "difficulty": 10
                    },
                    "image": {
                        "full": "Cassiopeia.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 432,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 630,
                        "hpperlevel": 104,
                        "mp": 350,
                        "mpperlevel": 60,
                        "movespeed": 328,
                        "armor": 18,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.5,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 53,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 1.5,
                        "attackspeed": 0.647
                    }
                },
                "Chogath": {
                    "version": "13.1.1",
                    "id": "Chogath",
                    "key": "31",
                    "name": "Cho'Gath",
                    "title": "the Terror of the Void",
                    "blurb": "From the moment Cho'Gath first emerged into the harsh light of Runeterra's sun, the beast was driven by the most pure and insatiable hunger. A perfect expression of the Void's desire to consume all life, Cho'Gath's complex biology quickly converts...",
                    "info": {
                        "attack": 3,
                        "defense": 7,
                        "magic": 7,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Chogath.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 0,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 644,
                        "hpperlevel": 94,
                        "mp": 270,
                        "mpperlevel": 60,
                        "movespeed": 345,
                        "armor": 38,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 9,
                        "hpregenperlevel": 0.85,
                        "mpregen": 7.2,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 69,
                        "attackdamageperlevel": 4.2,
                        "attackspeedperlevel": 1.44,
                        "attackspeed": 0.625
                    }
                },
                "Corki": {
                    "version": "13.1.1",
                    "id": "Corki",
                    "key": "42",
                    "name": "Corki",
                    "title": "the Daring Bombardier",
                    "blurb": "The yordle pilot Corki loves two things above all others: flying, and his glamorous mustache... though not necessarily in that order. After leaving Bandle City, he settled in Piltover and fell in love with the wondrous machines he found there. He...",
                    "info": {
                        "attack": 8,
                        "defense": 3,
                        "magic": 6,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Corki.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 48,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 588,
                        "hpperlevel": 105,
                        "mp": 350,
                        "mpperlevel": 54,
                        "movespeed": 325,
                        "armor": 28,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 7.4,
                        "mpregenperlevel": 0.55,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 2.8,
                        "attackspeedperlevel": 2.3,
                        "attackspeed": 0.638
                    }
                },
                "Darius": {
                    "version": "13.1.1",
                    "id": "Darius",
                    "key": "122",
                    "name": "Darius",
                    "title": "the Hand of Noxus",
                    "blurb": "There is no greater symbol of Noxian might than Darius, the nation's most feared and battle-hardened commander. Rising from humble origins to become the Hand of Noxus, he cleaves through the empire's enemies—many of them Noxians themselves. Knowing that...",
                    "info": {
                        "attack": 9,
                        "defense": 5,
                        "magic": 1,
                        "difficulty": 2
                    },
                    "image": {
                        "full": "Darius.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 96,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 652,
                        "hpperlevel": 114,
                        "mp": 263,
                        "mpperlevel": 58,
                        "movespeed": 340,
                        "armor": 39,
                        "armorperlevel": 5.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 10,
                        "hpregenperlevel": 0.95,
                        "mpregen": 6.6,
                        "mpregenperlevel": 0.35,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 64,
                        "attackdamageperlevel": 5,
                        "attackspeedperlevel": 1,
                        "attackspeed": 0.625
                    }
                },
                "Diana": {
                    "version": "13.1.1",
                    "id": "Diana",
                    "key": "131",
                    "name": "Diana",
                    "title": "Scorn of the Moon",
                    "blurb": "Bearing her crescent moonblade, Diana fights as a warrior of the Lunari—a faith all but quashed in the lands around Mount Targon. Clad in shimmering armor the color of winter snow at night, she is a living embodiment of the silver moon's power. Imbued...",
                    "info": {
                        "attack": 7,
                        "defense": 6,
                        "magic": 8,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Diana.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 144,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 640,
                        "hpperlevel": 109,
                        "mp": 375,
                        "mpperlevel": 25,
                        "movespeed": 345,
                        "armor": 31,
                        "armorperlevel": 4.3,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 150,
                        "hpregen": 6.5,
                        "hpregenperlevel": 0.85,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 57,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.25,
                        "attackspeed": 0.625
                    }
                },
                "Draven": {
                    "version": "13.1.1",
                    "id": "Draven",
                    "key": "119",
                    "name": "Draven",
                    "title": "the Glorious Executioner",
                    "blurb": "In Noxus, warriors known as Reckoners face one another in arenas where blood is spilled and strength tested—but none has ever been as celebrated as Draven. A former soldier, he found that the crowds uniquely appreciated his flair for the dramatic, and...",
                    "info": {
                        "attack": 9,
                        "defense": 3,
                        "magic": 1,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Draven.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 192,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 675,
                        "hpperlevel": 104,
                        "mp": 361,
                        "mpperlevel": 39,
                        "movespeed": 330,
                        "armor": 29,
                        "armorperlevel": 4.5,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 3.75,
                        "hpregenperlevel": 0.7,
                        "mpregen": 8.05,
                        "mpregenperlevel": 0.65,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 62,
                        "attackdamageperlevel": 3.6,
                        "attackspeedperlevel": 2.7,
                        "attackspeed": 0.679
                    }
                },
                "DrMundo": {
                    "version": "13.1.1",
                    "id": "DrMundo",
                    "key": "36",
                    "name": "Dr. Mundo",
                    "title": "the Madman of Zaun",
                    "blurb": "Utterly mad, tragically homicidal, and horrifyingly purple, Dr. Mundo is what keeps many of Zaun's citizens indoors on particularly dark nights. Now a self-proclaimed physician, he was once a patient of Zaun's most infamous asylum. After \"curing\" the...",
                    "info": {
                        "attack": 5,
                        "defense": 7,
                        "magic": 6,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "DrMundo.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 240,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "None",
                    "stats": {
                        "hp": 613,
                        "hpperlevel": 103,
                        "mp": 0,
                        "mpperlevel": 0,
                        "movespeed": 345,
                        "armor": 32,
                        "armorperlevel": 3.7,
                        "spellblock": 29,
                        "spellblockperlevel": 2.3,
                        "attackrange": 125,
                        "hpregen": 6.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 61,
                        "attackdamageperlevel": 2.5,
                        "attackspeedperlevel": 3.3,
                        "attackspeed": 0.67
                    }
                },
                "Ekko": {
                    "version": "13.1.1",
                    "id": "Ekko",
                    "key": "245",
                    "name": "Ekko",
                    "title": "the Boy Who Shattered Time",
                    "blurb": "A prodigy from the rough streets of Zaun, Ekko manipulates time to twist any situation to his advantage. Using his own invention, the Zero Drive, he explores the branching possibilities of reality to craft the perfect moment. Though he revels in this...",
                    "info": {
                        "attack": 5,
                        "defense": 3,
                        "magic": 7,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Ekko.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 288,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 655,
                        "hpperlevel": 99,
                        "mp": 280,
                        "mpperlevel": 70,
                        "movespeed": 340,
                        "armor": 32,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 9,
                        "hpregenperlevel": 0.9,
                        "mpregen": 7,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 58,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 3.3,
                        "attackspeed": 0.688
                    }
                },
                "Elise": {
                    "version": "13.1.1",
                    "id": "Elise",
                    "key": "60",
                    "name": "Elise",
                    "title": "the Spider Queen",
                    "blurb": "Elise is a deadly predator who dwells in a shuttered, lightless palace, deep within the oldest city of Noxus. Once mortal, she was the mistress of a powerful house, but the bite of a vile demigod transformed her into something beautiful, yet utterly...",
                    "info": {
                        "attack": 6,
                        "defense": 5,
                        "magic": 7,
                        "difficulty": 9
                    },
                    "image": {
                        "full": "Elise.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 336,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 650,
                        "hpperlevel": 109,
                        "mp": 324,
                        "mpperlevel": 50,
                        "movespeed": 330,
                        "armor": 30,
                        "armorperlevel": 5.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.6,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 1.75,
                        "attackspeed": 0.625
                    }
                },
                "Evelynn": {
                    "version": "13.1.1",
                    "id": "Evelynn",
                    "key": "28",
                    "name": "Evelynn",
                    "title": "Agony's Embrace",
                    "blurb": "Within the dark seams of Runeterra, the demon Evelynn searches for her next victim. She lures in prey with the voluptuous façade of a human female, but once a person succumbs to her charms, Evelynn's true form is unleashed. She then subjects her victim...",
                    "info": {
                        "attack": 4,
                        "defense": 2,
                        "magic": 7,
                        "difficulty": 10
                    },
                    "image": {
                        "full": "Evelynn.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 384,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 642,
                        "hpperlevel": 98,
                        "mp": 315,
                        "mpperlevel": 42,
                        "movespeed": 335,
                        "armor": 37,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.75,
                        "mpregen": 8.11,
                        "mpregenperlevel": 0.6,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 61,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.1,
                        "attackspeed": 0.667
                    }
                },
                "Ezreal": {
                    "version": "13.1.1",
                    "id": "Ezreal",
                    "key": "81",
                    "name": "Ezreal",
                    "title": "the Prodigal Explorer",
                    "blurb": "A dashing adventurer, unknowingly gifted in the magical arts, Ezreal raids long-lost catacombs, tangles with ancient curses, and overcomes seemingly impossible odds with ease. His courage and bravado knowing no bounds, he prefers to improvise his way...",
                    "info": {
                        "attack": 7,
                        "defense": 2,
                        "magic": 6,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Ezreal.png",
                        "sprite": "champion0.png",
                        "group": "champion",
                        "x": 432,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 600,
                        "hpperlevel": 102,
                        "mp": 375,
                        "mpperlevel": 70,
                        "movespeed": 325,
                        "armor": 24,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 4,
                        "hpregenperlevel": 0.65,
                        "mpregen": 8.5,
                        "mpregenperlevel": 0.65,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 60,
                        "attackdamageperlevel": 2.5,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.625
                    }
                },
                "Fiddlesticks": {
                    "version": "13.1.1",
                    "id": "Fiddlesticks",
                    "key": "9",
                    "name": "Fiddlesticks",
                    "title": "the Ancient Fear",
                    "blurb": "Something has awoken in Runeterra. Something ancient. Something terrible. The ageless horror known as Fiddlesticks stalks the edges of mortal society, drawn to areas thick with paranoia where it feeds upon terrorized victims. Wielding a jagged scythe...",
                    "info": {
                        "attack": 2,
                        "defense": 3,
                        "magic": 9,
                        "difficulty": 9
                    },
                    "image": {
                        "full": "Fiddlesticks.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 0,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 650,
                        "hpperlevel": 106,
                        "mp": 500,
                        "mpperlevel": 28,
                        "movespeed": 335,
                        "armor": 34,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 480,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.6,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 2.65,
                        "attackspeedperlevel": 2.11,
                        "attackspeed": 0.625
                    }
                },
                "Fiora": {
                    "version": "13.1.1",
                    "id": "Fiora",
                    "key": "114",
                    "name": "Fiora",
                    "title": "the Grand Duelist",
                    "blurb": "The most feared duelist in all Valoran, Fiora is as renowned for her brusque manner and cunning mind as she is for the speed of her bluesteel rapier. Born to House Laurent in the kingdom of Demacia, Fiora took control of the family from her father in...",
                    "info": {
                        "attack": 10,
                        "defense": 4,
                        "magic": 2,
                        "difficulty": 3
                    },
                    "image": {
                        "full": "Fiora.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 48,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 620,
                        "hpperlevel": 99,
                        "mp": 300,
                        "mpperlevel": 60,
                        "movespeed": 345,
                        "armor": 33,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 150,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 68,
                        "attackdamageperlevel": 3.3,
                        "attackspeedperlevel": 3.2,
                        "attackspeed": 0.69
                    }
                },
                "Fizz": {
                    "version": "13.1.1",
                    "id": "Fizz",
                    "key": "105",
                    "name": "Fizz",
                    "title": "the Tidal Trickster",
                    "blurb": "Fizz is an amphibious yordle, who dwells among the reefs surrounding Bilgewater. He often retrieves and returns the tithes cast into the sea by superstitious captains, but even the saltiest of sailors know better than to cross him—for many are the tales...",
                    "info": {
                        "attack": 6,
                        "defense": 4,
                        "magic": 7,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Fizz.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 96,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 640,
                        "hpperlevel": 106,
                        "mp": 317,
                        "mpperlevel": 52,
                        "movespeed": 335,
                        "armor": 22,
                        "armorperlevel": 4.6,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 8,
                        "hpregenperlevel": 0.7,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 58,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 3.1,
                        "attackspeed": 0.658
                    }
                },
                "Galio": {
                    "version": "13.1.1",
                    "id": "Galio",
                    "key": "3",
                    "name": "Galio",
                    "title": "the Colossus",
                    "blurb": "Outside the gleaming city of Demacia, the stone colossus Galio keeps vigilant watch. Built as a bulwark against enemy mages, he often stands motionless for decades until the presence of powerful magic stirs him to life. Once activated, Galio makes the...",
                    "info": {
                        "attack": 1,
                        "defense": 10,
                        "magic": 6,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Galio.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 144,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 632,
                        "hpperlevel": 126,
                        "mp": 500,
                        "mpperlevel": 40,
                        "movespeed": 335,
                        "armor": 24,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 150,
                        "hpregen": 8,
                        "hpregenperlevel": 0.8,
                        "mpregen": 9.5,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 59,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 1.5,
                        "attackspeed": 0.625
                    }
                },
                "Gangplank": {
                    "version": "13.1.1",
                    "id": "Gangplank",
                    "key": "41",
                    "name": "Gangplank",
                    "title": "the Saltwater Scourge",
                    "blurb": "As unpredictable as he is brutal, the dethroned reaver king Gangplank is feared far and wide. Once, he ruled the port city of Bilgewater, and while his reign is over, there are those who believe this has only made him more dangerous. Gangplank would see...",
                    "info": {
                        "attack": 7,
                        "defense": 6,
                        "magic": 4,
                        "difficulty": 9
                    },
                    "image": {
                        "full": "Gangplank.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 192,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 600,
                        "hpperlevel": 114,
                        "mp": 280,
                        "mpperlevel": 60,
                        "movespeed": 345,
                        "armor": 31,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 6,
                        "hpregenperlevel": 0.6,
                        "mpregen": 7.5,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 64,
                        "attackdamageperlevel": 4,
                        "attackspeedperlevel": 3.2,
                        "attackspeed": 0.658
                    }
                },
                "Garen": {
                    "version": "13.1.1",
                    "id": "Garen",
                    "key": "86",
                    "name": "Garen",
                    "title": "The Might of Demacia",
                    "blurb": "A proud and noble warrior, Garen fights as one of the Dauntless Vanguard. He is popular among his fellows, and respected well enough by his enemies—not least as a scion of the prestigious Crownguard family, entrusted with defending Demacia and its...",
                    "info": {
                        "attack": 7,
                        "defense": 7,
                        "magic": 1,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Garen.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 240,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "None",
                    "stats": {
                        "hp": 690,
                        "hpperlevel": 98,
                        "mp": 0,
                        "mpperlevel": 0,
                        "movespeed": 340,
                        "armor": 36,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 1.55,
                        "attackrange": 175,
                        "hpregen": 8,
                        "hpregenperlevel": 0.5,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 66,
                        "attackdamageperlevel": 4.5,
                        "attackspeedperlevel": 3.65,
                        "attackspeed": 0.625
                    }
                },
                "Gnar": {
                    "version": "13.1.1",
                    "id": "Gnar",
                    "key": "150",
                    "name": "Gnar",
                    "title": "the Missing Link",
                    "blurb": "Gnar is a primeval yordle whose playful antics can erupt into a toddler's outrage in an instant, transforming him into a massive beast bent on destruction. Frozen in True Ice for millennia, the curious creature broke free and now hops about a changed...",
                    "info": {
                        "attack": 6,
                        "defense": 5,
                        "magic": 5,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Gnar.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 288,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Rage",
                    "stats": {
                        "hp": 540,
                        "hpperlevel": 79,
                        "mp": 100,
                        "mpperlevel": 0,
                        "movespeed": 335,
                        "armor": 32,
                        "armorperlevel": 3.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 175,
                        "hpregen": 4.5,
                        "hpregenperlevel": 1.25,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 57,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 6,
                        "attackspeed": 0.625
                    }
                },
                "Gragas": {
                    "version": "13.1.1",
                    "id": "Gragas",
                    "key": "79",
                    "name": "Gragas",
                    "title": "the Rabble Rouser",
                    "blurb": "Equal parts jolly and imposing, Gragas is a massive, rowdy brewmaster on his own quest for the perfect pint of ale. Hailing from parts unknown, he now searches for rare ingredients among the unblemished wastes of the Freljord, trying each recipe as he...",
                    "info": {
                        "attack": 4,
                        "defense": 7,
                        "magic": 6,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Gragas.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 336,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 670,
                        "hpperlevel": 109,
                        "mp": 400,
                        "mpperlevel": 47,
                        "movespeed": 330,
                        "armor": 38,
                        "armorperlevel": 4.8,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.5,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 64,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 2.05,
                        "attackspeed": 0.675
                    }
                },
                "Graves": {
                    "version": "13.1.1",
                    "id": "Graves",
                    "key": "104",
                    "name": "Graves",
                    "title": "the Outlaw",
                    "blurb": "Malcolm Graves is a renowned mercenary, gambler, and thief—a wanted man in every city and empire he has visited. Even though he has an explosive temper, he possesses a strict sense of criminal honor, often enforced at the business end of his...",
                    "info": {
                        "attack": 8,
                        "defense": 5,
                        "magic": 3,
                        "difficulty": 3
                    },
                    "image": {
                        "full": "Graves.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 384,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 625,
                        "hpperlevel": 106,
                        "mp": 325,
                        "mpperlevel": 40,
                        "movespeed": 340,
                        "armor": 33,
                        "armorperlevel": 4.6,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 425,
                        "hpregen": 8,
                        "hpregenperlevel": 0.7,
                        "mpregen": 8,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 68,
                        "attackdamageperlevel": 4,
                        "attackspeedperlevel": 2.6,
                        "attackspeed": 0.475
                    }
                },
                "Gwen": {
                    "version": "13.1.1",
                    "id": "Gwen",
                    "key": "887",
                    "name": "Gwen",
                    "title": "The Hallowed Seamstress",
                    "blurb": "A former doll transformed and brought to life by magic, Gwen wields the very tools that once created her. She carries the weight of her maker's love with every step, taking nothing for granted. At her command is the Hallowed Mist, an ancient and...",
                    "info": {
                        "attack": 7,
                        "defense": 4,
                        "magic": 5,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Gwen.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 432,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 620,
                        "hpperlevel": 109,
                        "mp": 330,
                        "mpperlevel": 40,
                        "movespeed": 340,
                        "armor": 39,
                        "armorperlevel": 5.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 150,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.9,
                        "mpregen": 7.5,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 63,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.25,
                        "attackspeed": 0.69
                    }
                },
                "Hecarim": {
                    "version": "13.1.1",
                    "id": "Hecarim",
                    "key": "120",
                    "name": "Hecarim",
                    "title": "the Shadow of War",
                    "blurb": "Hecarim is a spectral fusion of man and beast, cursed to ride down the souls of the living for all eternity. When the Blessed Isles fell into shadow, this proud knight was obliterated by the destructive energies of the Ruination, along with all his...",
                    "info": {
                        "attack": 8,
                        "defense": 6,
                        "magic": 4,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Hecarim.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 0,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 625,
                        "hpperlevel": 99,
                        "mp": 277,
                        "mpperlevel": 60,
                        "movespeed": 345,
                        "armor": 32,
                        "armorperlevel": 5.45,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 7,
                        "hpregenperlevel": 0.75,
                        "mpregen": 6.5,
                        "mpregenperlevel": 0.6,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 66,
                        "attackdamageperlevel": 3.2,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.67
                    }
                },
                "Heimerdinger": {
                    "version": "13.1.1",
                    "id": "Heimerdinger",
                    "key": "74",
                    "name": "Heimerdinger",
                    "title": "the Revered Inventor",
                    "blurb": "A brilliant yet eccentric yordle scientist, Professor Cecil B. Heimerdinger is one of the most innovative and esteemed inventors Piltover has ever known. Relentless in his work to the point of neurotic obsession, he thrives on answering the universe's...",
                    "info": {
                        "attack": 2,
                        "defense": 6,
                        "magic": 8,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Heimerdinger.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 48,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 558,
                        "hpperlevel": 101,
                        "mp": 385,
                        "mpperlevel": 20,
                        "movespeed": 340,
                        "armor": 19,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 7,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 56,
                        "attackdamageperlevel": 2.7,
                        "attackspeedperlevel": 1.36,
                        "attackspeed": 0.625
                    }
                },
                "Illaoi": {
                    "version": "13.1.1",
                    "id": "Illaoi",
                    "key": "420",
                    "name": "Illaoi",
                    "title": "the Kraken Priestess",
                    "blurb": "Illaoi's powerful physique is dwarfed only by her indomitable faith. As the prophet of the Great Kraken, she uses a huge, golden idol to rip her foes' spirits from their bodies and shatter their perception of reality. All who challenge the “Truth Bearer...",
                    "info": {
                        "attack": 8,
                        "defense": 6,
                        "magic": 3,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Illaoi.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 96,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 656,
                        "hpperlevel": 109,
                        "mp": 300,
                        "mpperlevel": 50,
                        "movespeed": 350,
                        "armor": 35,
                        "armorperlevel": 5,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 9.5,
                        "hpregenperlevel": 0.8,
                        "mpregen": 7.5,
                        "mpregenperlevel": 0.75,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 68,
                        "attackdamageperlevel": 5,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.625
                    }
                },
                "Irelia": {
                    "version": "13.1.1",
                    "id": "Irelia",
                    "key": "39",
                    "name": "Irelia",
                    "title": "the Blade Dancer",
                    "blurb": "The Noxian occupation of Ionia produced many heroes, none more unlikely than young Irelia of Navori. Trained in the ancient dances of her province, she adapted her art for war, using the graceful and carefully practised movements to levitate a host of...",
                    "info": {
                        "attack": 7,
                        "defense": 4,
                        "magic": 5,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Irelia.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 144,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 590,
                        "hpperlevel": 124,
                        "mp": 350,
                        "mpperlevel": 50,
                        "movespeed": 335,
                        "armor": 36,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 2.05,
                        "attackrange": 200,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.85,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 65,
                        "attackdamageperlevel": 4,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.656
                    }
                },
                "Ivern": {
                    "version": "13.1.1",
                    "id": "Ivern",
                    "key": "427",
                    "name": "Ivern",
                    "title": "the Green Father",
                    "blurb": "Ivern Bramblefoot, known to many as the Green Father, is a peculiar half man, half tree who roams Runeterra's forests, cultivating life everywhere he goes. He knows the secrets of the natural world, and holds deep friendships with all things that grow...",
                    "info": {
                        "attack": 3,
                        "defense": 5,
                        "magic": 7,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Ivern.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 192,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 655,
                        "hpperlevel": 99,
                        "mp": 450,
                        "mpperlevel": 60,
                        "movespeed": 330,
                        "armor": 27,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 475,
                        "hpregen": 7,
                        "hpregenperlevel": 0.85,
                        "mpregen": 6,
                        "mpregenperlevel": 0.75,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 50,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 3.4,
                        "attackspeed": 0.644
                    }
                },
                "Janna": {
                    "version": "13.1.1",
                    "id": "Janna",
                    "key": "40",
                    "name": "Janna",
                    "title": "the Storm's Fury",
                    "blurb": "Armed with the power of Runeterra's gales, Janna is a mysterious, elemental wind spirit who protects the dispossessed of Zaun. Some believe she was brought into existence by the pleas of Runeterra's sailors who prayed for fair winds as they navigated...",
                    "info": {
                        "attack": 3,
                        "defense": 5,
                        "magic": 7,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Janna.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 240,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 570,
                        "hpperlevel": 84,
                        "mp": 350,
                        "mpperlevel": 64,
                        "movespeed": 325,
                        "armor": 28,
                        "armorperlevel": 5,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 500,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 11.5,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 52,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 3,
                        "attackspeed": 0.625
                    }
                },
                "JarvanIV": {
                    "version": "13.1.1",
                    "id": "JarvanIV",
                    "key": "59",
                    "name": "Jarvan IV",
                    "title": "the Exemplar of Demacia",
                    "blurb": "Prince Jarvan, scion of the Lightshield dynasty, is heir apparent to the throne of Demacia. Raised to be a paragon of his nation's greatest virtues, he is forced to balance the heavy expectations placed upon him with his own desire to fight on the front...",
                    "info": {
                        "attack": 6,
                        "defense": 8,
                        "magic": 3,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "JarvanIV.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 288,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 640,
                        "hpperlevel": 104,
                        "mp": 300,
                        "mpperlevel": 55,
                        "movespeed": 340,
                        "armor": 34,
                        "armorperlevel": 4.8,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 8,
                        "hpregenperlevel": 0.7,
                        "mpregen": 6.5,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 64,
                        "attackdamageperlevel": 3.4,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.658
                    }
                },
                "Jax": {
                    "version": "13.1.1",
                    "id": "Jax",
                    "key": "24",
                    "name": "Jax",
                    "title": "Grandmaster at Arms",
                    "blurb": "Unmatched in both his skill with unique armaments and his biting sarcasm, Jax is the last known weapons master of Icathia. After his homeland was laid low by its own hubris in unleashing the Void, Jax and his kind vowed to protect what little remained...",
                    "info": {
                        "attack": 7,
                        "defense": 5,
                        "magic": 7,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Jax.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 336,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 685,
                        "hpperlevel": 99,
                        "mp": 339,
                        "mpperlevel": 52,
                        "movespeed": 350,
                        "armor": 36,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 7.6,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 68,
                        "attackdamageperlevel": 4.25,
                        "attackspeedperlevel": 3.4,
                        "attackspeed": 0.638
                    }
                },
                "Jayce": {
                    "version": "13.1.1",
                    "id": "Jayce",
                    "key": "126",
                    "name": "Jayce",
                    "title": "the Defender of Tomorrow",
                    "blurb": "Jayce is a brilliant inventor who has pledged his life to the defense of Piltover and its unyielding pursuit of progress. With his transforming hextech hammer in hand, Jayce uses his strength, courage, and considerable intelligence to protect his...",
                    "info": {
                        "attack": 8,
                        "defense": 4,
                        "magic": 3,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Jayce.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 384,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 590,
                        "hpperlevel": 109,
                        "mp": 375,
                        "mpperlevel": 45,
                        "movespeed": 335,
                        "armor": 22,
                        "armorperlevel": 5,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 125,
                        "hpregen": 6,
                        "hpregenperlevel": 0.6,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 57,
                        "attackdamageperlevel": 4.25,
                        "attackspeedperlevel": 3,
                        "attackspeed": 0.658
                    }
                },
                "Jhin": {
                    "version": "13.1.1",
                    "id": "Jhin",
                    "key": "202",
                    "name": "Jhin",
                    "title": "the Virtuoso",
                    "blurb": "Jhin is a meticulous criminal psychopath who believes murder is art. Once an Ionian prisoner, but freed by shadowy elements within Ionia's ruling council, the serial killer now works as their cabal's assassin. Using his gun as his paintbrush, Jhin...",
                    "info": {
                        "attack": 10,
                        "defense": 2,
                        "magic": 6,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Jhin.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 432,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 655,
                        "hpperlevel": 107,
                        "mp": 300,
                        "mpperlevel": 50,
                        "movespeed": 330,
                        "armor": 24,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 3.75,
                        "hpregenperlevel": 0.55,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 59,
                        "attackdamageperlevel": 4.7,
                        "attackspeedperlevel": 0,
                        "attackspeed": 0.625
                    }
                },
                "Jinx": {
                    "version": "13.1.1",
                    "id": "Jinx",
                    "key": "222",
                    "name": "Jinx",
                    "title": "the Loose Cannon",
                    "blurb": "A manic and impulsive criminal from Zaun, Jinx lives to wreak havoc without care for the consequences. With an arsenal of deadly weapons, she unleashes the loudest blasts and brightest explosions to leave a trail of mayhem and panic in her wake. Jinx...",
                    "info": {
                        "attack": 9,
                        "defense": 2,
                        "magic": 4,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Jinx.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 0,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 630,
                        "hpperlevel": 100,
                        "mp": 245,
                        "mpperlevel": 45,
                        "movespeed": 325,
                        "armor": 26,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 3.75,
                        "hpregenperlevel": 0.5,
                        "mpregen": 6.7,
                        "mpregenperlevel": 1,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 59,
                        "attackdamageperlevel": 3.4,
                        "attackspeedperlevel": 1,
                        "attackspeed": 0.625
                    }
                },
                "Kaisa": {
                    "version": "13.1.1",
                    "id": "Kaisa",
                    "key": "145",
                    "name": "Kai'Sa",
                    "title": "Daughter of the Void",
                    "blurb": "Claimed by the Void when she was only a child, Kai'Sa managed to survive through sheer tenacity and strength of will. Her experiences have made her a deadly hunter and, to some, the harbinger of a future they would rather not live to see. Having entered...",
                    "info": {
                        "attack": 8,
                        "defense": 5,
                        "magic": 3,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Kaisa.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 48,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 670,
                        "hpperlevel": 102,
                        "mp": 344.88,
                        "mpperlevel": 38,
                        "movespeed": 335,
                        "armor": 28,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 3.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8.2,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 59,
                        "attackdamageperlevel": 2,
                        "attackspeedperlevel": 1.8,
                        "attackspeed": 0.644
                    }
                },
                "Kalista": {
                    "version": "13.1.1",
                    "id": "Kalista",
                    "key": "429",
                    "name": "Kalista",
                    "title": "the Spear of Vengeance",
                    "blurb": "A specter of wrath and retribution, Kalista is the undying spirit of vengeance, an armored nightmare summoned from the Shadow Isles to hunt deceivers and traitors. The betrayed may cry out in blood to be avenged, but Kalista only answers those willing...",
                    "info": {
                        "attack": 8,
                        "defense": 2,
                        "magic": 4,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Kalista.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 96,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 574,
                        "hpperlevel": 114,
                        "mp": 300,
                        "mpperlevel": 45,
                        "movespeed": 330,
                        "armor": 24,
                        "armorperlevel": 5.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 3.75,
                        "hpregenperlevel": 0.55,
                        "mpregen": 6.3,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 66,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 4.5,
                        "attackspeed": 0.694
                    }
                },
                "Karma": {
                    "version": "13.1.1",
                    "id": "Karma",
                    "key": "43",
                    "name": "Karma",
                    "title": "the Enlightened One",
                    "blurb": "No mortal exemplifies the spiritual traditions of Ionia more than Karma. She is the living embodiment of an ancient soul reincarnated countless times, carrying all her accumulated memories into each new life, and blessed with power that few can...",
                    "info": {
                        "attack": 1,
                        "defense": 7,
                        "magic": 8,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Karma.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 144,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 604,
                        "hpperlevel": 109,
                        "mp": 374,
                        "mpperlevel": 50,
                        "movespeed": 335,
                        "armor": 28,
                        "armorperlevel": 5,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 13,
                        "mpregenperlevel": 0.5,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 51,
                        "attackdamageperlevel": 3.3,
                        "attackspeedperlevel": 2.3,
                        "attackspeed": 0.625
                    }
                },
                "Karthus": {
                    "version": "13.1.1",
                    "id": "Karthus",
                    "key": "30",
                    "name": "Karthus",
                    "title": "the Deathsinger",
                    "blurb": "The harbinger of oblivion, Karthus is an undying spirit whose haunting songs are a prelude to the horror of his nightmarish appearance. The living fear the eternity of undeath, but Karthus sees only beauty and purity in its embrace, a perfect union of...",
                    "info": {
                        "attack": 2,
                        "defense": 2,
                        "magic": 10,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Karthus.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 192,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 620,
                        "hpperlevel": 110,
                        "mp": 467,
                        "mpperlevel": 31,
                        "movespeed": 335,
                        "armor": 21,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 450,
                        "hpregen": 6.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 46,
                        "attackdamageperlevel": 3.25,
                        "attackspeedperlevel": 2.11,
                        "attackspeed": 0.625
                    }
                },
                "Kassadin": {
                    "version": "13.1.1",
                    "id": "Kassadin",
                    "key": "38",
                    "name": "Kassadin",
                    "title": "the Void Walker",
                    "blurb": "Cutting a burning swath through the darkest places of the world, Kassadin knows his days are numbered. A widely traveled Shuriman guide and adventurer, he had chosen to raise a family among the peaceful southern tribes—until the day his village was...",
                    "info": {
                        "attack": 3,
                        "defense": 5,
                        "magic": 8,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Kassadin.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 240,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 646,
                        "hpperlevel": 119,
                        "mp": 400,
                        "mpperlevel": 87,
                        "movespeed": 335,
                        "armor": 19,
                        "armorperlevel": 4,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 150,
                        "hpregen": 6,
                        "hpregenperlevel": 0.5,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 59,
                        "attackdamageperlevel": 3.9,
                        "attackspeedperlevel": 3.7,
                        "attackspeed": 0.64
                    }
                },
                "Katarina": {
                    "version": "13.1.1",
                    "id": "Katarina",
                    "key": "55",
                    "name": "Katarina",
                    "title": "the Sinister Blade",
                    "blurb": "Decisive in judgment and lethal in combat, Katarina is a Noxian assassin of the highest caliber. Eldest daughter to the legendary General Du Couteau, she made her talents known with swift kills against unsuspecting enemies. Her fiery ambition has driven...",
                    "info": {
                        "attack": 4,
                        "defense": 3,
                        "magic": 9,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Katarina.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 288,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin",
                        "Mage"
                    ],
                    "partype": "None",
                    "stats": {
                        "hp": 672,
                        "hpperlevel": 108,
                        "mp": 0,
                        "mpperlevel": 0,
                        "movespeed": 335,
                        "armor": 28,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 7.5,
                        "hpregenperlevel": 0.7,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 58,
                        "attackdamageperlevel": 3.2,
                        "attackspeedperlevel": 2.74,
                        "attackspeed": 0.658
                    }
                },
                "Kayle": {
                    "version": "13.1.1",
                    "id": "Kayle",
                    "key": "10",
                    "name": "Kayle",
                    "title": "the Righteous",
                    "blurb": "Born to a Targonian Aspect at the height of the Rune Wars, Kayle honored her mother's legacy by fighting for justice on wings of divine flame. She and her twin sister Morgana were the protectors of Demacia for many years—until Kayle became disillusioned...",
                    "info": {
                        "attack": 6,
                        "defense": 6,
                        "magic": 7,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Kayle.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 336,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 670,
                        "hpperlevel": 92,
                        "mp": 330,
                        "mpperlevel": 50,
                        "movespeed": 335,
                        "armor": 26,
                        "armorperlevel": 4.2,
                        "spellblock": 22,
                        "spellblockperlevel": 1.3,
                        "attackrange": 175,
                        "hpregen": 5,
                        "hpregenperlevel": 0.5,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 50,
                        "attackdamageperlevel": 2.5,
                        "attackspeedperlevel": 1.5,
                        "attackspeed": 0.625
                    }
                },
                "Kayn": {
                    "version": "13.1.1",
                    "id": "Kayn",
                    "key": "141",
                    "name": "Kayn",
                    "title": "the Shadow Reaper",
                    "blurb": "A peerless practitioner of lethal shadow magic, Shieda Kayn battles to achieve his true destiny—to one day lead the Order of Shadow into a new era of Ionian supremacy. He wields the sentient darkin weapon Rhaast, undeterred by its creeping corruption of...",
                    "info": {
                        "attack": 10,
                        "defense": 6,
                        "magic": 1,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Kayn.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 384,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 655,
                        "hpperlevel": 109,
                        "mp": 410,
                        "mpperlevel": 50,
                        "movespeed": 340,
                        "armor": 38,
                        "armorperlevel": 4.5,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 8,
                        "hpregenperlevel": 0.75,
                        "mpregen": 11.5,
                        "mpregenperlevel": 0.95,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 68,
                        "attackdamageperlevel": 3.3,
                        "attackspeedperlevel": 2.7,
                        "attackspeed": 0.669
                    }
                },
                "Kennen": {
                    "version": "13.1.1",
                    "id": "Kennen",
                    "key": "85",
                    "name": "Kennen",
                    "title": "the Heart of the Tempest",
                    "blurb": "More than just the lightning-quick enforcer of Ionian balance, Kennen is the only yordle member of the Kinkou. Despite his small, furry stature, he is eager to take on any threat with a whirling storm of shuriken and boundless enthusiasm. Alongside his...",
                    "info": {
                        "attack": 6,
                        "defense": 4,
                        "magic": 7,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Kennen.png",
                        "sprite": "champion1.png",
                        "group": "champion",
                        "x": 432,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Marksman"
                    ],
                    "partype": "Energy",
                    "stats": {
                        "hp": 611,
                        "hpperlevel": 98,
                        "mp": 200,
                        "mpperlevel": 0,
                        "movespeed": 335,
                        "armor": 29,
                        "armorperlevel": 4.95,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.65,
                        "mpregen": 50,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 48,
                        "attackdamageperlevel": 3.75,
                        "attackspeedperlevel": 3.4,
                        "attackspeed": 0.625
                    }
                },
                "Khazix": {
                    "version": "13.1.1",
                    "id": "Khazix",
                    "key": "121",
                    "name": "Kha'Zix",
                    "title": "the Voidreaver",
                    "blurb": "The Void grows, and the Void adapts—in none of its myriad spawn are these truths more apparent than Kha'Zix. Evolution drives the core of this mutating horror, born to survive and to slay the strong. Where it struggles to do so, it grows new, more...",
                    "info": {
                        "attack": 9,
                        "defense": 4,
                        "magic": 3,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Khazix.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 0,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 643,
                        "hpperlevel": 99,
                        "mp": 327,
                        "mpperlevel": 40,
                        "movespeed": 350,
                        "armor": 36,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 7.5,
                        "hpregenperlevel": 0.75,
                        "mpregen": 7.59,
                        "mpregenperlevel": 0.5,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 63,
                        "attackdamageperlevel": 3.1,
                        "attackspeedperlevel": 2.7,
                        "attackspeed": 0.668
                    }
                },
                "Kindred": {
                    "version": "13.1.1",
                    "id": "Kindred",
                    "key": "203",
                    "name": "Kindred",
                    "title": "The Eternal Hunters",
                    "blurb": "Separate, but never parted, Kindred represents the twin essences of death. Lamb's bow offers a swift release from the mortal realm for those who accept their fate. Wolf hunts down those who run from their end, delivering violent finality within his...",
                    "info": {
                        "attack": 8,
                        "defense": 2,
                        "magic": 2,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Kindred.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 48,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 610,
                        "hpperlevel": 99,
                        "mp": 300,
                        "mpperlevel": 35,
                        "movespeed": 325,
                        "armor": 29,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 500,
                        "hpregen": 7,
                        "hpregenperlevel": 0.55,
                        "mpregen": 7,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 65,
                        "attackdamageperlevel": 2.5,
                        "attackspeedperlevel": 3.5,
                        "attackspeed": 0.625
                    }
                },
                "Kled": {
                    "version": "13.1.1",
                    "id": "Kled",
                    "key": "240",
                    "name": "Kled",
                    "title": "the Cantankerous Cavalier",
                    "blurb": "A warrior as fearless as he is ornery, the yordle Kled embodies the furious bravado of Noxus. He is an icon beloved by the empire's soldiers, distrusted by its officers, and loathed by the nobility. Many claim Kled has fought in every campaign the...",
                    "info": {
                        "attack": 8,
                        "defense": 2,
                        "magic": 2,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Kled.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 96,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Courage",
                    "stats": {
                        "hp": 410,
                        "hpperlevel": 84,
                        "mp": 100,
                        "mpperlevel": 0,
                        "movespeed": 345,
                        "armor": 35,
                        "armorperlevel": 5.2,
                        "spellblock": 28,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 6,
                        "hpregenperlevel": 0.75,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 65,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 3.5,
                        "attackspeed": 0.625
                    }
                },
                "KogMaw": {
                    "version": "13.1.1",
                    "id": "KogMaw",
                    "key": "96",
                    "name": "Kog'Maw",
                    "title": "the Mouth of the Abyss",
                    "blurb": "Belched forth from a rotting Void incursion deep in the wastelands of Icathia, Kog'Maw is an inquisitive yet putrid creature with a caustic, gaping mouth. This particular Void-spawn needs to gnaw and drool on anything within reach to truly understand it...",
                    "info": {
                        "attack": 8,
                        "defense": 2,
                        "magic": 5,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "KogMaw.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 144,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 635,
                        "hpperlevel": 99,
                        "mp": 325,
                        "mpperlevel": 40,
                        "movespeed": 330,
                        "armor": 24,
                        "armorperlevel": 4.45,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 500,
                        "hpregen": 3.75,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8.75,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 61,
                        "attackdamageperlevel": 3.1,
                        "attackspeedperlevel": 2.65,
                        "attackspeed": 0.665
                    }
                },
                "KSante": {
                    "version": "13.1.1",
                    "id": "KSante",
                    "key": "897",
                    "name": "K'Sante",
                    "title": "the Pride of Nazumah",
                    "blurb": "Defiant and courageous, K'Sante battles colossal beasts and ruthless Ascended to protect his home of Nazumah, a coveted oasis amid the sands of Shurima. But after a falling-out with his former partner, K'Sante realizes that in order to become a warrior...",
                    "info": {
                        "attack": 8,
                        "defense": 8,
                        "magic": 7,
                        "difficulty": 9
                    },
                    "image": {
                        "full": "KSante.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 192,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 610,
                        "hpperlevel": 108,
                        "mp": 290,
                        "mpperlevel": 60,
                        "movespeed": 330,
                        "armor": 33,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 2.1,
                        "attackrange": 175,
                        "hpregen": 9.5,
                        "hpregenperlevel": 0.85,
                        "mpregen": 7,
                        "mpregenperlevel": 1,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 64,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.625
                    }
                },
                "Leblanc": {
                    "version": "13.1.1",
                    "id": "Leblanc",
                    "key": "7",
                    "name": "LeBlanc",
                    "title": "the Deceiver",
                    "blurb": "Mysterious even to other members of the Black Rose cabal, LeBlanc is but one of many names for a pale woman who has manipulated people and events since the earliest days of Noxus. Using her magic to mirror herself, the sorceress can appear to anyone...",
                    "info": {
                        "attack": 1,
                        "defense": 4,
                        "magic": 10,
                        "difficulty": 9
                    },
                    "image": {
                        "full": "Leblanc.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 240,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 598,
                        "hpperlevel": 111,
                        "mp": 400,
                        "mpperlevel": 55,
                        "movespeed": 340,
                        "armor": 22,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 7.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 1.4,
                        "attackspeed": 0.625
                    }
                },
                "LeeSin": {
                    "version": "13.1.1",
                    "id": "LeeSin",
                    "key": "64",
                    "name": "Lee Sin",
                    "title": "the Blind Monk",
                    "blurb": "A master of Ionia's ancient martial arts, Lee Sin is a principled fighter who channels the essence of the dragon spirit to face any challenge. Though he lost his sight many years ago, the warrior-monk has devoted his life to protecting his homeland...",
                    "info": {
                        "attack": 8,
                        "defense": 5,
                        "magic": 3,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "LeeSin.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 288,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Assassin"
                    ],
                    "partype": "Energy",
                    "stats": {
                        "hp": 645,
                        "hpperlevel": 105,
                        "mp": 200,
                        "mpperlevel": 0,
                        "movespeed": 345,
                        "armor": 36,
                        "armorperlevel": 4.9,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 7.5,
                        "hpregenperlevel": 0.7,
                        "mpregen": 50,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 68,
                        "attackdamageperlevel": 3.7,
                        "attackspeedperlevel": 3,
                        "attackspeed": 0.651
                    }
                },
                "Leona": {
                    "version": "13.1.1",
                    "id": "Leona",
                    "key": "89",
                    "name": "Leona",
                    "title": "the Radiant Dawn",
                    "blurb": "Imbued with the fire of the sun, Leona is a holy warrior of the Solari who defends Mount Targon with her Zenith Blade and the Shield of Daybreak. Her skin shimmers with starfire while her eyes burn with the power of the celestial Aspect within her...",
                    "info": {
                        "attack": 4,
                        "defense": 8,
                        "magic": 3,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Leona.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 336,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 646,
                        "hpperlevel": 101,
                        "mp": 302,
                        "mpperlevel": 40,
                        "movespeed": 335,
                        "armor": 47,
                        "armorperlevel": 4.8,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.85,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 60,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.9,
                        "attackspeed": 0.625
                    }
                },
                "Lillia": {
                    "version": "13.1.1",
                    "id": "Lillia",
                    "key": "876",
                    "name": "Lillia",
                    "title": "the Bashful Bloom",
                    "blurb": "Intensely shy, the fae fawn Lillia skittishly wanders Ionia's forests. Hiding just out of sight of mortals—whose mysterious natures have long captivated, but intimidated, her—Lillia hopes to discover why their dreams no longer reach the ancient Dreaming...",
                    "info": {
                        "attack": 0,
                        "defense": 2,
                        "magic": 10,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Lillia.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 384,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 605,
                        "hpperlevel": 105,
                        "mp": 410,
                        "mpperlevel": 50,
                        "movespeed": 330,
                        "armor": 22,
                        "armorperlevel": 5.2,
                        "spellblock": 32,
                        "spellblockperlevel": 1.55,
                        "attackrange": 325,
                        "hpregen": 2.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 11.5,
                        "mpregenperlevel": 0.95,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 61,
                        "attackdamageperlevel": 3.1,
                        "attackspeedperlevel": 2.7,
                        "attackspeed": 0.625
                    }
                },
                "Lissandra": {
                    "version": "13.1.1",
                    "id": "Lissandra",
                    "key": "127",
                    "name": "Lissandra",
                    "title": "the Ice Witch",
                    "blurb": "Lissandra's magic twists the pure power of ice into something dark and terrible. With the force of her black ice, she does more than freeze—she impales and crushes those who oppose her. To the terrified denizens of the north, she is known only as ''The...",
                    "info": {
                        "attack": 2,
                        "defense": 5,
                        "magic": 8,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Lissandra.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 432,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 620,
                        "hpperlevel": 110,
                        "mp": 475,
                        "mpperlevel": 30,
                        "movespeed": 325,
                        "armor": 22,
                        "armorperlevel": 4.9,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 7,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 2.7,
                        "attackspeedperlevel": 1.36,
                        "attackspeed": 0.656
                    }
                },
                "Lucian": {
                    "version": "13.1.1",
                    "id": "Lucian",
                    "key": "236",
                    "name": "Lucian",
                    "title": "the Purifier",
                    "blurb": "Lucian, a Sentinel of Light, is a grim hunter of undying spirits, pursuing them relentlessly and annihilating them with his twin relic pistols. After the wraith Thresh slew his wife, Lucian embarked on the path of vengeance—but even with her return to...",
                    "info": {
                        "attack": 8,
                        "defense": 5,
                        "magic": 3,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Lucian.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 0,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 641,
                        "hpperlevel": 100,
                        "mp": 349,
                        "mpperlevel": 38,
                        "movespeed": 335,
                        "armor": 28,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 500,
                        "hpregen": 3.75,
                        "hpregenperlevel": 0.65,
                        "mpregen": 8.18,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 60,
                        "attackdamageperlevel": 2.9,
                        "attackspeedperlevel": 3.3,
                        "attackspeed": 0.638
                    }
                },
                "Lulu": {
                    "version": "13.1.1",
                    "id": "Lulu",
                    "key": "117",
                    "name": "Lulu",
                    "title": "the Fae Sorceress",
                    "blurb": "The yordle mage Lulu is known for conjuring dreamlike illusions and fanciful creatures as she roams Runeterra with her fairy companion Pix. Lulu shapes reality on a whim, warping the fabric of the world, and what she views as the constraints of this...",
                    "info": {
                        "attack": 4,
                        "defense": 5,
                        "magic": 7,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Lulu.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 48,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 595,
                        "hpperlevel": 88,
                        "mp": 350,
                        "mpperlevel": 55,
                        "movespeed": 330,
                        "armor": 29,
                        "armorperlevel": 4.9,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 6,
                        "hpregenperlevel": 0.6,
                        "mpregen": 11,
                        "mpregenperlevel": 0.6,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 47,
                        "attackdamageperlevel": 2.6,
                        "attackspeedperlevel": 2.25,
                        "attackspeed": 0.625
                    }
                },
                "Lux": {
                    "version": "13.1.1",
                    "id": "Lux",
                    "key": "99",
                    "name": "Lux",
                    "title": "the Lady of Luminosity",
                    "blurb": "Luxanna Crownguard hails from Demacia, an insular realm where magical abilities are viewed with fear and suspicion. Able to bend light to her will, she grew up dreading discovery and exile, and was forced to keep her power secret, in order to preserve...",
                    "info": {
                        "attack": 2,
                        "defense": 4,
                        "magic": 9,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Lux.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 96,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 560,
                        "hpperlevel": 99,
                        "mp": 480,
                        "mpperlevel": 23.5,
                        "movespeed": 330,
                        "armor": 19,
                        "armorperlevel": 5.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 54,
                        "attackdamageperlevel": 3.3,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.669
                    }
                },
                "Malphite": {
                    "version": "13.1.1",
                    "id": "Malphite",
                    "key": "54",
                    "name": "Malphite",
                    "title": "Shard of the Monolith",
                    "blurb": "A massive creature of living stone, Malphite struggles to impose blessed order on a chaotic world. Birthed as a servitor-shard to an otherworldly obelisk known as the Monolith, he used his tremendous elemental strength to maintain and protect his...",
                    "info": {
                        "attack": 5,
                        "defense": 9,
                        "magic": 7,
                        "difficulty": 2
                    },
                    "image": {
                        "full": "Malphite.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 144,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 644,
                        "hpperlevel": 104,
                        "mp": 280,
                        "mpperlevel": 60,
                        "movespeed": 335,
                        "armor": 37,
                        "armorperlevel": 4.95,
                        "spellblock": 28,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 7,
                        "hpregenperlevel": 0.55,
                        "mpregen": 7.3,
                        "mpregenperlevel": 0.55,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 62,
                        "attackdamageperlevel": 4,
                        "attackspeedperlevel": 3.4,
                        "attackspeed": 0.736
                    }
                },
                "Malzahar": {
                    "version": "13.1.1",
                    "id": "Malzahar",
                    "key": "90",
                    "name": "Malzahar",
                    "title": "the Prophet of the Void",
                    "blurb": "A zealous seer dedicated to the unification of all life, Malzahar truly believes the newly emergent Void to be the path to Runeterra's salvation. In the desert wastes of Shurima, he followed the voices that whispered in his mind, all the way to ancient...",
                    "info": {
                        "attack": 2,
                        "defense": 2,
                        "magic": 9,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Malzahar.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 192,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 580,
                        "hpperlevel": 101,
                        "mp": 375,
                        "mpperlevel": 28,
                        "movespeed": 335,
                        "armor": 18,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 500,
                        "hpregen": 6,
                        "hpregenperlevel": 0.6,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 1.5,
                        "attackspeed": 0.625
                    }
                },
                "Maokai": {
                    "version": "13.1.1",
                    "id": "Maokai",
                    "key": "57",
                    "name": "Maokai",
                    "title": "the Twisted Treant",
                    "blurb": "Maokai is a rageful, towering treant who fights the unnatural horrors of the Shadow Isles. He was twisted into a force of vengeance after a magical cataclysm destroyed his home, surviving undeath only through the Waters of Life infused within his...",
                    "info": {
                        "attack": 3,
                        "defense": 8,
                        "magic": 6,
                        "difficulty": 3
                    },
                    "image": {
                        "full": "Maokai.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 240,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 635,
                        "hpperlevel": 109,
                        "mp": 375,
                        "mpperlevel": 43,
                        "movespeed": 335,
                        "armor": 39,
                        "armorperlevel": 5.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 5,
                        "hpregenperlevel": 0.75,
                        "mpregen": 7.2,
                        "mpregenperlevel": 0.6,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 64,
                        "attackdamageperlevel": 3.3,
                        "attackspeedperlevel": 2.125,
                        "attackspeed": 0.8
                    }
                },
                "MasterYi": {
                    "version": "13.1.1",
                    "id": "MasterYi",
                    "key": "11",
                    "name": "Master Yi",
                    "title": "the Wuju Bladesman",
                    "blurb": "Master Yi has tempered his body and sharpened his mind, so that thought and action have become almost as one. Though he chooses to enter into violence only as a last resort, the grace and speed of his blade ensures resolution is always swift. As one of...",
                    "info": {
                        "attack": 10,
                        "defense": 4,
                        "magic": 2,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "MasterYi.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 288,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 669,
                        "hpperlevel": 100,
                        "mp": 251,
                        "mpperlevel": 42,
                        "movespeed": 355,
                        "armor": 33,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 7.5,
                        "hpregenperlevel": 0.65,
                        "mpregen": 7.25,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 65,
                        "attackdamageperlevel": 2.2,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.679
                    }
                },
                "MissFortune": {
                    "version": "13.1.1",
                    "id": "MissFortune",
                    "key": "21",
                    "name": "Miss Fortune",
                    "title": "the Bounty Hunter",
                    "blurb": "A Bilgewater captain famed for her looks but feared for her ruthlessness, Sarah Fortune paints a stark figure among the hardened criminals of the port city. As a child, she witnessed the reaver king Gangplank murder her family—an act she brutally...",
                    "info": {
                        "attack": 8,
                        "defense": 2,
                        "magic": 5,
                        "difficulty": 1
                    },
                    "image": {
                        "full": "MissFortune.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 336,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 640,
                        "hpperlevel": 103,
                        "mp": 300,
                        "mpperlevel": 35,
                        "movespeed": 325,
                        "armor": 28,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 3.75,
                        "hpregenperlevel": 0.65,
                        "mpregen": 8.05,
                        "mpregenperlevel": 0.65,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 52,
                        "attackdamageperlevel": 2.4,
                        "attackspeedperlevel": 3,
                        "attackspeed": 0.656
                    }
                },
                "MonkeyKing": {
                    "version": "13.1.1",
                    "id": "MonkeyKing",
                    "key": "62",
                    "name": "Wukong",
                    "title": "the Monkey King",
                    "blurb": "Wukong is a vastayan trickster who uses his strength, agility, and intelligence to confuse his opponents and gain the upper hand. After finding a lifelong friend in the warrior known as Master Yi, Wukong became the last student of the ancient martial...",
                    "info": {
                        "attack": 8,
                        "defense": 5,
                        "magic": 2,
                        "difficulty": 3
                    },
                    "image": {
                        "full": "MonkeyKing.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 384,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 610,
                        "hpperlevel": 99,
                        "mp": 300,
                        "mpperlevel": 65,
                        "movespeed": 340,
                        "armor": 31,
                        "armorperlevel": 4.7,
                        "spellblock": 28,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 3.5,
                        "hpregenperlevel": 0.65,
                        "mpregen": 8,
                        "mpregenperlevel": 0.65,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 68,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 3,
                        "attackspeed": 0.69
                    }
                },
                "Mordekaiser": {
                    "version": "13.1.1",
                    "id": "Mordekaiser",
                    "key": "82",
                    "name": "Mordekaiser",
                    "title": "the Iron Revenant",
                    "blurb": "Twice slain and thrice born, Mordekaiser is a brutal warlord from a foregone epoch who uses his necromantic sorcery to bind souls into an eternity of servitude. Few now remain who remember his earlier conquests, or know the true extent of his powers—but...",
                    "info": {
                        "attack": 4,
                        "defense": 6,
                        "magic": 7,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Mordekaiser.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 432,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter"
                    ],
                    "partype": "Shield",
                    "stats": {
                        "hp": 645,
                        "hpperlevel": 104,
                        "mp": 100,
                        "mpperlevel": 0,
                        "movespeed": 335,
                        "armor": 37,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 5,
                        "hpregenperlevel": 0.75,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 61,
                        "attackdamageperlevel": 4,
                        "attackspeedperlevel": 1,
                        "attackspeed": 0.625
                    }
                },
                "Morgana": {
                    "version": "13.1.1",
                    "id": "Morgana",
                    "key": "25",
                    "name": "Morgana",
                    "title": "the Fallen",
                    "blurb": "Conflicted between her celestial and mortal natures, Morgana bound her wings to embrace humanity, and inflicts her pain and bitterness upon the dishonest and the corrupt. She rejects laws and traditions she believes are unjust, and fights for truth from...",
                    "info": {
                        "attack": 1,
                        "defense": 6,
                        "magic": 8,
                        "difficulty": 1
                    },
                    "image": {
                        "full": "Morgana.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 0,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 630,
                        "hpperlevel": 104,
                        "mp": 340,
                        "mpperlevel": 60,
                        "movespeed": 335,
                        "armor": 25,
                        "armorperlevel": 5,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 450,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.4,
                        "mpregen": 11,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 56,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 1.53,
                        "attackspeed": 0.625
                    }
                },
                "Nami": {
                    "version": "13.1.1",
                    "id": "Nami",
                    "key": "267",
                    "name": "Nami",
                    "title": "the Tidecaller",
                    "blurb": "A headstrong young vastaya of the seas, Nami was the first of the Marai tribe to leave the waves and venture onto dry land, when their ancient accord with the Targonians was broken. With no other option, she took it upon herself to complete the sacred...",
                    "info": {
                        "attack": 4,
                        "defense": 3,
                        "magic": 7,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Nami.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 48,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 560,
                        "hpperlevel": 88,
                        "mp": 365,
                        "mpperlevel": 43,
                        "movespeed": 335,
                        "armor": 29,
                        "armorperlevel": 5.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 11.5,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 51,
                        "attackdamageperlevel": 3.1,
                        "attackspeedperlevel": 2.61,
                        "attackspeed": 0.644
                    }
                },
                "Nasus": {
                    "version": "13.1.1",
                    "id": "Nasus",
                    "key": "75",
                    "name": "Nasus",
                    "title": "the Curator of the Sands",
                    "blurb": "Nasus is an imposing, jackal-headed Ascended being from ancient Shurima, a heroic figure regarded as a demigod by the people of the desert. Fiercely intelligent, he was a guardian of knowledge and peerless strategist whose wisdom guided the ancient...",
                    "info": {
                        "attack": 7,
                        "defense": 5,
                        "magic": 6,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Nasus.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 96,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 631,
                        "hpperlevel": 104,
                        "mp": 326,
                        "mpperlevel": 62,
                        "movespeed": 350,
                        "armor": 34,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 9,
                        "hpregenperlevel": 0.9,
                        "mpregen": 7.45,
                        "mpregenperlevel": 0.5,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 67,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 3.48,
                        "attackspeed": 0.638
                    }
                },
                "Nautilus": {
                    "version": "13.1.1",
                    "id": "Nautilus",
                    "key": "111",
                    "name": "Nautilus",
                    "title": "the Titan of the Depths",
                    "blurb": "A lonely legend as old as the first piers sunk in Bilgewater, the armored goliath known as Nautilus roams the dark waters off the coast of the Blue Flame Isles. Driven by a forgotten betrayal, he strikes without warning, swinging his enormous anchor to...",
                    "info": {
                        "attack": 4,
                        "defense": 6,
                        "magic": 6,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Nautilus.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 144,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 646,
                        "hpperlevel": 100,
                        "mp": 400,
                        "mpperlevel": 47,
                        "movespeed": 325,
                        "armor": 39,
                        "armorperlevel": 4.95,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8.65,
                        "mpregenperlevel": 0.5,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 61,
                        "attackdamageperlevel": 3.3,
                        "attackspeedperlevel": 1,
                        "attackspeed": 0.706
                    }
                },
                "Neeko": {
                    "version": "13.1.1",
                    "id": "Neeko",
                    "key": "518",
                    "name": "Neeko",
                    "title": "the Curious Chameleon",
                    "blurb": "Hailing from a long lost tribe of vastaya, Neeko can blend into any crowd by borrowing the appearances of others, even absorbing something of their emotional state to tell friend from foe in an instant. No one is ever sure where—or who—Neeko might be...",
                    "info": {
                        "attack": 1,
                        "defense": 1,
                        "magic": 9,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Neeko.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 192,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 610,
                        "hpperlevel": 104,
                        "mp": 450,
                        "mpperlevel": 30,
                        "movespeed": 340,
                        "armor": 21,
                        "armorperlevel": 5.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 7.5,
                        "hpregenperlevel": 0.75,
                        "mpregen": 7,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 48,
                        "attackdamageperlevel": 2.5,
                        "attackspeedperlevel": 3.5,
                        "attackspeed": 0.625
                    }
                },
                "Nidalee": {
                    "version": "13.1.1",
                    "id": "Nidalee",
                    "key": "76",
                    "name": "Nidalee",
                    "title": "the Bestial Huntress",
                    "blurb": "Raised in the deepest jungle, Nidalee is a master tracker who can shapeshift into a ferocious cougar at will. Neither wholly woman nor beast, she viciously defends her territory from any and all trespassers, with carefully placed traps and deft spear...",
                    "info": {
                        "attack": 5,
                        "defense": 4,
                        "magic": 7,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Nidalee.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 240,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 610,
                        "hpperlevel": 109,
                        "mp": 295,
                        "mpperlevel": 45,
                        "movespeed": 335,
                        "armor": 28,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 6,
                        "hpregenperlevel": 0.6,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 58,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 3.22,
                        "attackspeed": 0.638
                    }
                },
                "Nilah": {
                    "version": "13.1.1",
                    "id": "Nilah",
                    "key": "895",
                    "name": "Nilah",
                    "title": "the Joy Unbound",
                    "blurb": "Nilah is an ascetic warrior from a distant land, seeking the world's deadliest, most titanic opponents so that she might challenge and destroy them. Having won her power through an encounter with the long-imprisoned demon of joy, she has no emotions...",
                    "info": {
                        "attack": 8,
                        "defense": 4,
                        "magic": 4,
                        "difficulty": 10
                    },
                    "image": {
                        "full": "Nilah.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 288,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 570,
                        "hpperlevel": 101,
                        "mp": 350,
                        "mpperlevel": 35,
                        "movespeed": 340,
                        "armor": 27,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 225,
                        "hpregen": 4,
                        "hpregenperlevel": 0.9,
                        "mpregen": 8.2,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 58,
                        "attackdamageperlevel": 2,
                        "attackspeedperlevel": 3,
                        "attackspeed": 0.697
                    }
                },
                "Nocturne": {
                    "version": "13.1.1",
                    "id": "Nocturne",
                    "key": "56",
                    "name": "Nocturne",
                    "title": "the Eternal Nightmare",
                    "blurb": "A demonic amalgamation drawn from the nightmares that haunt every sentient mind, the thing known as Nocturne has become a primordial force of pure evil. It is liquidly chaotic in aspect, a faceless shadow with cold eyes and armed with wicked-looking...",
                    "info": {
                        "attack": 9,
                        "defense": 5,
                        "magic": 2,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Nocturne.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 336,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 655,
                        "hpperlevel": 109,
                        "mp": 275,
                        "mpperlevel": 35,
                        "movespeed": 345,
                        "armor": 38,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 1.55,
                        "attackrange": 125,
                        "hpregen": 7,
                        "hpregenperlevel": 0.75,
                        "mpregen": 7,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 62,
                        "attackdamageperlevel": 2.6,
                        "attackspeedperlevel": 2.7,
                        "attackspeed": 0.721
                    }
                },
                "Nunu": {
                    "version": "13.1.1",
                    "id": "Nunu",
                    "key": "20",
                    "name": "Nunu & Willump",
                    "title": "the Boy and His Yeti",
                    "blurb": "Once upon a time, there was a boy who wanted to prove he was a hero by slaying a fearsome monster—only to discover that the beast, a lonely and magical yeti, merely needed a friend. Bound together by ancient power and a shared love of snowballs, Nunu...",
                    "info": {
                        "attack": 4,
                        "defense": 6,
                        "magic": 7,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Nunu.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 384,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 610,
                        "hpperlevel": 90,
                        "mp": 280,
                        "mpperlevel": 42,
                        "movespeed": 345,
                        "armor": 29,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 5,
                        "hpregenperlevel": 0.8,
                        "mpregen": 7,
                        "mpregenperlevel": 0.5,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 61,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.25,
                        "attackspeed": 0.625
                    }
                },
                "Olaf": {
                    "version": "13.1.1",
                    "id": "Olaf",
                    "key": "2",
                    "name": "Olaf",
                    "title": "the Berserker",
                    "blurb": "An unstoppable force of destruction, the axe-wielding Olaf wants nothing but to die in glorious combat. Hailing from the brutal Freljordian peninsula of Lokfar, he once received a prophecy foretelling his peaceful passing—a coward's fate, and a great...",
                    "info": {
                        "attack": 9,
                        "defense": 5,
                        "magic": 3,
                        "difficulty": 3
                    },
                    "image": {
                        "full": "Olaf.png",
                        "sprite": "champion2.png",
                        "group": "champion",
                        "x": 432,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 645,
                        "hpperlevel": 119,
                        "mp": 316,
                        "mpperlevel": 50,
                        "movespeed": 350,
                        "armor": 35,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 6.5,
                        "hpregenperlevel": 0.6,
                        "mpregen": 7.5,
                        "mpregenperlevel": 0.6,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 68,
                        "attackdamageperlevel": 4.7,
                        "attackspeedperlevel": 2.7,
                        "attackspeed": 0.694
                    }
                },
                "Orianna": {
                    "version": "13.1.1",
                    "id": "Orianna",
                    "key": "61",
                    "name": "Orianna",
                    "title": "the Lady of Clockwork",
                    "blurb": "Once a curious girl of flesh and blood, Orianna is now a technological marvel comprised entirely of clockwork. She became gravely ill after an accident in the lower districts of Zaun, and her failing body had to be replaced with exquisite artifice...",
                    "info": {
                        "attack": 4,
                        "defense": 3,
                        "magic": 9,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Orianna.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 0,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 600,
                        "hpperlevel": 105,
                        "mp": 418,
                        "mpperlevel": 25,
                        "movespeed": 325,
                        "armor": 17,
                        "armorperlevel": 4.2,
                        "spellblock": 26,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 7,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 40,
                        "attackdamageperlevel": 2.6,
                        "attackspeedperlevel": 3.5,
                        "attackspeed": 0.658
                    }
                },
                "Ornn": {
                    "version": "13.1.1",
                    "id": "Ornn",
                    "key": "516",
                    "name": "Ornn",
                    "title": "The Fire below the Mountain",
                    "blurb": "Ornn is the Freljordian spirit of forging and craftsmanship. He works in the solitude of a massive smithy, hammered out from the lava caverns beneath the volcano Hearth-Home. There he stokes bubbling cauldrons of molten rock to purify ores and fashion...",
                    "info": {
                        "attack": 5,
                        "defense": 9,
                        "magic": 3,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Ornn.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 48,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 660,
                        "hpperlevel": 109,
                        "mp": 341,
                        "mpperlevel": 65,
                        "movespeed": 335,
                        "armor": 33,
                        "armorperlevel": 5.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 9,
                        "hpregenperlevel": 0.9,
                        "mpregen": 8,
                        "mpregenperlevel": 0.6,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 69,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.625
                    }
                },
                "Pantheon": {
                    "version": "13.1.1",
                    "id": "Pantheon",
                    "key": "80",
                    "name": "Pantheon",
                    "title": "the Unbreakable Spear",
                    "blurb": "Once an unwilling host to the Aspect of War, Atreus survived when the celestial power within him was slain, refusing to succumb to a blow that tore stars from the heavens. In time, he learned to embrace the power of his own mortality, and the stubborn...",
                    "info": {
                        "attack": 9,
                        "defense": 4,
                        "magic": 3,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Pantheon.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 96,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 650,
                        "hpperlevel": 109,
                        "mp": 317,
                        "mpperlevel": 31,
                        "movespeed": 345,
                        "armor": 40,
                        "armorperlevel": 4.95,
                        "spellblock": 28,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 7.5,
                        "hpregenperlevel": 0.65,
                        "mpregen": 7.35,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 64,
                        "attackdamageperlevel": 3.3,
                        "attackspeedperlevel": 2.95,
                        "attackspeed": 0.644
                    }
                },
                "Poppy": {
                    "version": "13.1.1",
                    "id": "Poppy",
                    "key": "78",
                    "name": "Poppy",
                    "title": "Keeper of the Hammer",
                    "blurb": "Runeterra has no shortage of valiant champions, but few are as tenacious as Poppy. Bearing the legendary hammer of Orlon, a weapon twice her size, this determined yordle has spent untold years searching in secret for the fabled “Hero of Demacia,” said...",
                    "info": {
                        "attack": 6,
                        "defense": 7,
                        "magic": 2,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Poppy.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 144,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 610,
                        "hpperlevel": 104,
                        "mp": 280,
                        "mpperlevel": 40,
                        "movespeed": 345,
                        "armor": 38,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8,
                        "hpregenperlevel": 0.8,
                        "mpregen": 7,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 64,
                        "attackdamageperlevel": 4,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.625
                    }
                },
                "Pyke": {
                    "version": "13.1.1",
                    "id": "Pyke",
                    "key": "555",
                    "name": "Pyke",
                    "title": "the Bloodharbor Ripper",
                    "blurb": "A renowned harpooner from the slaughter docks of Bilgewater, Pyke should have met his death in the belly of a gigantic jaull-fish… and yet, he returned. Now, stalking the dank alleys and backways of his former hometown, he uses his new supernatural...",
                    "info": {
                        "attack": 9,
                        "defense": 3,
                        "magic": 1,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Pyke.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 192,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 670,
                        "hpperlevel": 104,
                        "mp": 415,
                        "mpperlevel": 50,
                        "movespeed": 330,
                        "armor": 45,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 150,
                        "hpregen": 7,
                        "hpregenperlevel": 0.5,
                        "mpregen": 8,
                        "mpregenperlevel": 1,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 62,
                        "attackdamageperlevel": 2,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.667
                    }
                },
                "Qiyana": {
                    "version": "13.1.1",
                    "id": "Qiyana",
                    "key": "246",
                    "name": "Qiyana",
                    "title": "Empress of the Elements",
                    "blurb": "In the jungle city of Ixaocan, Qiyana plots her own ruthless path to the high seat of the Yun Tal. Last in line to succeed her parents, she faces those who stand in her way with brash confidence and unprecedented mastery over elemental magic. With the...",
                    "info": {
                        "attack": 0,
                        "defense": 2,
                        "magic": 4,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Qiyana.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 240,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 590,
                        "hpperlevel": 124,
                        "mp": 320,
                        "mpperlevel": 50,
                        "movespeed": 335,
                        "armor": 28,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 150,
                        "hpregen": 6,
                        "hpregenperlevel": 0.9,
                        "mpregen": 8,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 66,
                        "attackdamageperlevel": 3.1,
                        "attackspeedperlevel": 2.1,
                        "attackspeed": 0.688
                    }
                },
                "Quinn": {
                    "version": "13.1.1",
                    "id": "Quinn",
                    "key": "133",
                    "name": "Quinn",
                    "title": "Demacia's Wings",
                    "blurb": "Quinn is an elite ranger-knight of Demacia, who undertakes dangerous missions deep in enemy territory. She and her legendary eagle, Valor, share an unbreakable bond, and their foes are often slain before they realize they are fighting not one, but two...",
                    "info": {
                        "attack": 9,
                        "defense": 4,
                        "magic": 2,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Quinn.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 288,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 603,
                        "hpperlevel": 99,
                        "mp": 269,
                        "mpperlevel": 35,
                        "movespeed": 335,
                        "armor": 28,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 7,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 59,
                        "attackdamageperlevel": 2.4,
                        "attackspeedperlevel": 3.1,
                        "attackspeed": 0.668
                    }
                },
                "Rakan": {
                    "version": "13.1.1",
                    "id": "Rakan",
                    "key": "497",
                    "name": "Rakan",
                    "title": "The Charmer",
                    "blurb": "As mercurial as he is charming, Rakan is an infamous vastayan troublemaker and the greatest battle-dancer in Lhotlan tribal history. To the humans of the Ionian highlands, his name has long been synonymous with wild festivals, uncontrollable parties...",
                    "info": {
                        "attack": 2,
                        "defense": 4,
                        "magic": 8,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Rakan.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 336,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 610,
                        "hpperlevel": 99,
                        "mp": 315,
                        "mpperlevel": 50,
                        "movespeed": 335,
                        "armor": 32,
                        "armorperlevel": 5.1,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 300,
                        "hpregen": 5,
                        "hpregenperlevel": 0.5,
                        "mpregen": 8.75,
                        "mpregenperlevel": 0.5,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 62,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 3,
                        "attackspeed": 0.635
                    }
                },
                "Rammus": {
                    "version": "13.1.1",
                    "id": "Rammus",
                    "key": "33",
                    "name": "Rammus",
                    "title": "the Armordillo",
                    "blurb": "Idolized by many, dismissed by some, mystifying to all, the curious being Rammus is an enigma. Protected by a spiked shell, he inspires increasingly disparate theories on his origin wherever he goes—from demigod, to sacred oracle, to a mere beast...",
                    "info": {
                        "attack": 4,
                        "defense": 10,
                        "magic": 5,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Rammus.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 384,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 614,
                        "hpperlevel": 94,
                        "mp": 310,
                        "mpperlevel": 33,
                        "movespeed": 335,
                        "armor": 36,
                        "armorperlevel": 5.5,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8,
                        "hpregenperlevel": 0.55,
                        "mpregen": 7.85,
                        "mpregenperlevel": 0.5,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 53,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 2.215,
                        "attackspeed": 0.656
                    }
                },
                "RekSai": {
                    "version": "13.1.1",
                    "id": "RekSai",
                    "key": "421",
                    "name": "Rek'Sai",
                    "title": "the Void Burrower",
                    "blurb": "An apex predator, Rek'Sai is a merciless Void-spawn that tunnels beneath the ground to ambush and devour unsuspecting prey. Her insatiable hunger has laid waste to entire regions of the once-great empire of Shurima—merchants, traders, even armed...",
                    "info": {
                        "attack": 8,
                        "defense": 5,
                        "magic": 2,
                        "difficulty": 3
                    },
                    "image": {
                        "full": "RekSai.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 432,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter"
                    ],
                    "partype": "Rage",
                    "stats": {
                        "hp": 640,
                        "hpperlevel": 99,
                        "mp": 100,
                        "mpperlevel": 0,
                        "movespeed": 335,
                        "armor": 36,
                        "armorperlevel": 4.95,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 7.5,
                        "hpregenperlevel": 0.65,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 61,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.667
                    }
                },
                "Rell": {
                    "version": "13.1.1",
                    "id": "Rell",
                    "key": "526",
                    "name": "Rell",
                    "title": "the Iron Maiden",
                    "blurb": "The product of brutal experimentation at the hands of the Black Rose, Rell is a defiant, living weapon determined to topple Noxus. Her childhood was one of misery and horror, enduring unspeakable procedures to perfect and weaponize her magical control...",
                    "info": {
                        "attack": 0,
                        "defense": 0,
                        "magic": 0,
                        "difficulty": 0
                    },
                    "image": {
                        "full": "Rell.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 0,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 610,
                        "hpperlevel": 104,
                        "mp": 350,
                        "mpperlevel": 45,
                        "movespeed": 335,
                        "armor": 32,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 7,
                        "hpregenperlevel": 0.55,
                        "mpregen": 6,
                        "mpregenperlevel": 0.35,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.55
                    }
                },
                "Renata": {
                    "version": "13.1.1",
                    "id": "Renata",
                    "key": "888",
                    "name": "Renata Glasc",
                    "title": "the Chem-Baroness",
                    "blurb": "Renata Glasc rose from the ashes of her childhood home with nothing but her name and her parents' alchemical research. In the decades since, she has become Zaun's wealthiest chem-baron, a business magnate who built her power by tying everyone's...",
                    "info": {
                        "attack": 2,
                        "defense": 6,
                        "magic": 9,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Renata.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 48,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 545,
                        "hpperlevel": 94,
                        "mp": 350,
                        "mpperlevel": 50,
                        "movespeed": 330,
                        "armor": 27,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 11.5,
                        "mpregenperlevel": 0.5,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 49,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.11,
                        "attackspeed": 0.625
                    }
                },
                "Renekton": {
                    "version": "13.1.1",
                    "id": "Renekton",
                    "key": "58",
                    "name": "Renekton",
                    "title": "the Butcher of the Sands",
                    "blurb": "Renekton is a terrifying, rage-fueled Ascended being from the scorched deserts of Shurima. Once, he was his empire's most esteemed warrior, leading the nation's armies to countless victories. However, after the empire's fall, Renekton was entombed...",
                    "info": {
                        "attack": 8,
                        "defense": 5,
                        "magic": 2,
                        "difficulty": 3
                    },
                    "image": {
                        "full": "Renekton.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 96,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Fury",
                    "stats": {
                        "hp": 660,
                        "hpperlevel": 111,
                        "mp": 100,
                        "mpperlevel": 0,
                        "movespeed": 345,
                        "armor": 35,
                        "armorperlevel": 5.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8,
                        "hpregenperlevel": 0.75,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 69,
                        "attackdamageperlevel": 4.15,
                        "attackspeedperlevel": 2.75,
                        "attackspeed": 0.665
                    }
                },
                "Rengar": {
                    "version": "13.1.1",
                    "id": "Rengar",
                    "key": "107",
                    "name": "Rengar",
                    "title": "the Pridestalker",
                    "blurb": "Rengar is a ferocious vastayan trophy hunter who lives for the thrill of tracking down and killing dangerous creatures. He scours the world for the most fearsome beasts he can find, especially seeking any trace of Kha'Zix, the void creature who...",
                    "info": {
                        "attack": 7,
                        "defense": 4,
                        "magic": 2,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Rengar.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 144,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin",
                        "Fighter"
                    ],
                    "partype": "Ferocity",
                    "stats": {
                        "hp": 620,
                        "hpperlevel": 104,
                        "mp": 4,
                        "mpperlevel": 0,
                        "movespeed": 345,
                        "armor": 34,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 7,
                        "hpregenperlevel": 0.5,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 68,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 3,
                        "attackspeed": 0.667
                    }
                },
                "Riven": {
                    "version": "13.1.1",
                    "id": "Riven",
                    "key": "92",
                    "name": "Riven",
                    "title": "the Exile",
                    "blurb": "Once a swordmaster in the warhosts of Noxus, Riven is an expatriate in a land she previously tried to conquer. She rose through the ranks on the strength of her conviction and brutal efficiency, and was rewarded with a legendary runic blade and a...",
                    "info": {
                        "attack": 8,
                        "defense": 5,
                        "magic": 1,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Riven.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 192,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Assassin"
                    ],
                    "partype": "None",
                    "stats": {
                        "hp": 630,
                        "hpperlevel": 100,
                        "mp": 0,
                        "mpperlevel": 0,
                        "movespeed": 340,
                        "armor": 33,
                        "armorperlevel": 4.4,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.5,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 64,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 3.5,
                        "attackspeed": 0.625
                    }
                },
                "Rumble": {
                    "version": "13.1.1",
                    "id": "Rumble",
                    "key": "68",
                    "name": "Rumble",
                    "title": "the Mechanized Menace",
                    "blurb": "Rumble is a young inventor with a temper. Using nothing more than his own two hands and a heap of scrap, the feisty yordle constructed a colossal mech suit outfitted with an arsenal of electrified harpoons and incendiary rockets. Though others may scoff...",
                    "info": {
                        "attack": 3,
                        "defense": 6,
                        "magic": 8,
                        "difficulty": 10
                    },
                    "image": {
                        "full": "Rumble.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 240,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Mage"
                    ],
                    "partype": "Heat",
                    "stats": {
                        "hp": 659,
                        "hpperlevel": 99,
                        "mp": 100,
                        "mpperlevel": 0,
                        "movespeed": 345,
                        "armor": 36,
                        "armorperlevel": 4.7,
                        "spellblock": 28,
                        "spellblockperlevel": 1.55,
                        "attackrange": 125,
                        "hpregen": 8,
                        "hpregenperlevel": 0.6,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 61,
                        "attackdamageperlevel": 3.2,
                        "attackspeedperlevel": 1.85,
                        "attackspeed": 0.644
                    }
                },
                "Ryze": {
                    "version": "13.1.1",
                    "id": "Ryze",
                    "key": "13",
                    "name": "Ryze",
                    "title": "the Rune Mage",
                    "blurb": "Widely considered one of the most adept sorcerers on Runeterra, Ryze is an ancient, hard-bitten archmage with an impossibly heavy burden to bear. Armed with immense arcane power and a boundless constitution, he tirelessly hunts for World Runes—fragments...",
                    "info": {
                        "attack": 2,
                        "defense": 2,
                        "magic": 10,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Ryze.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 288,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 645,
                        "hpperlevel": 124,
                        "mp": 300,
                        "mpperlevel": 70,
                        "movespeed": 340,
                        "armor": 22,
                        "armorperlevel": 4.2,
                        "spellblock": 36,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 8,
                        "hpregenperlevel": 0.8,
                        "mpregen": 8,
                        "mpregenperlevel": 1,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 58,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.11,
                        "attackspeed": 0.625
                    }
                },
                "Samira": {
                    "version": "13.1.1",
                    "id": "Samira",
                    "key": "360",
                    "name": "Samira",
                    "title": "the Desert Rose",
                    "blurb": "Samira stares death in the eye with unyielding confidence, seeking thrill wherever she goes. After her Shuriman home was destroyed as a child, Samira found her true calling in Noxus, where she built a reputation as a stylish daredevil taking on...",
                    "info": {
                        "attack": 8,
                        "defense": 5,
                        "magic": 3,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Samira.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 336,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 600,
                        "hpperlevel": 108,
                        "mp": 349,
                        "mpperlevel": 38,
                        "movespeed": 335,
                        "armor": 26,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 500,
                        "hpregen": 3.25,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8.2,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 57,
                        "attackdamageperlevel": 3.3,
                        "attackspeedperlevel": 3.3,
                        "attackspeed": 0.658
                    }
                },
                "Sejuani": {
                    "version": "13.1.1",
                    "id": "Sejuani",
                    "key": "113",
                    "name": "Sejuani",
                    "title": "Fury of the North",
                    "blurb": "Sejuani is the brutal, unforgiving Iceborn warmother of the Winter's Claw, one of the most feared tribes of the Freljord. Her people's survival is a constant, desperate battle against the elements, forcing them to raid Noxians, Demacians, and Avarosans...",
                    "info": {
                        "attack": 5,
                        "defense": 7,
                        "magic": 6,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Sejuani.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 384,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 630,
                        "hpperlevel": 114,
                        "mp": 400,
                        "mpperlevel": 40,
                        "movespeed": 340,
                        "armor": 34,
                        "armorperlevel": 5.45,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 150,
                        "hpregen": 8.5,
                        "hpregenperlevel": 1,
                        "mpregen": 7,
                        "mpregenperlevel": 0.7,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 66,
                        "attackdamageperlevel": 4,
                        "attackspeedperlevel": 3.5,
                        "attackspeed": 0.688
                    }
                },
                "Senna": {
                    "version": "13.1.1",
                    "id": "Senna",
                    "key": "235",
                    "name": "Senna",
                    "title": "the Redeemer",
                    "blurb": "Cursed from childhood to be haunted by the supernatural Black Mist, Senna joined a sacred order known as the Sentinels of Light, and fiercely fought back—only to be killed, her soul imprisoned in a lantern by the cruel wraith Thresh. But refusing to...",
                    "info": {
                        "attack": 7,
                        "defense": 2,
                        "magic": 6,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Senna.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 432,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 530,
                        "hpperlevel": 89,
                        "mp": 350,
                        "mpperlevel": 45,
                        "movespeed": 330,
                        "armor": 28,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 600,
                        "hpregen": 3.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 11.5,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 50,
                        "attackdamageperlevel": 0,
                        "attackspeedperlevel": 4,
                        "attackspeed": 0.625
                    }
                },
                "Seraphine": {
                    "version": "13.1.1",
                    "id": "Seraphine",
                    "key": "147",
                    "name": "Seraphine",
                    "title": "the Starry-Eyed Songstress",
                    "blurb": "Born in Piltover to Zaunite parents, Seraphine can hear the souls of others—the world sings to her, and she sings back. Though these sounds overwhelmed her in her youth, she now draws on them for inspiration, turning the chaos into a symphony. She...",
                    "info": {
                        "attack": 0,
                        "defense": 0,
                        "magic": 0,
                        "difficulty": 0
                    },
                    "image": {
                        "full": "Seraphine.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 0,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 570,
                        "hpperlevel": 104,
                        "mp": 440,
                        "mpperlevel": 40,
                        "movespeed": 325,
                        "armor": 19,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 6.5,
                        "hpregenperlevel": 0.6,
                        "mpregen": 8,
                        "mpregenperlevel": 1,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 1,
                        "attackspeed": 0.669
                    }
                },
                "Sett": {
                    "version": "13.1.1",
                    "id": "Sett",
                    "key": "875",
                    "name": "Sett",
                    "title": "the Boss",
                    "blurb": "A leader of Ionia's growing criminal underworld, Sett rose to prominence in the wake of the war with Noxus. Though he began as a humble challenger in the fighting pits of Navori, he quickly gained notoriety for his savage strength, and his ability to...",
                    "info": {
                        "attack": 8,
                        "defense": 5,
                        "magic": 1,
                        "difficulty": 2
                    },
                    "image": {
                        "full": "Sett.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 48,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Grit",
                    "stats": {
                        "hp": 670,
                        "hpperlevel": 114,
                        "mp": 0,
                        "mpperlevel": 0,
                        "movespeed": 340,
                        "armor": 33,
                        "armorperlevel": 5.2,
                        "spellblock": 28,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 7,
                        "hpregenperlevel": 0.5,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 60,
                        "attackdamageperlevel": 4,
                        "attackspeedperlevel": 1.75,
                        "attackspeed": 0.625
                    }
                },
                "Shaco": {
                    "version": "13.1.1",
                    "id": "Shaco",
                    "key": "35",
                    "name": "Shaco",
                    "title": "the Demon Jester",
                    "blurb": "Crafted long ago as a plaything for a lonely prince, the enchanted marionette Shaco now delights in murder and mayhem. Corrupted by dark magic and the loss of his beloved charge, the once-kind puppet finds pleasure only in the misery of the poor souls...",
                    "info": {
                        "attack": 8,
                        "defense": 4,
                        "magic": 6,
                        "difficulty": 9
                    },
                    "image": {
                        "full": "Shaco.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 96,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 630,
                        "hpperlevel": 99,
                        "mp": 297,
                        "mpperlevel": 40,
                        "movespeed": 345,
                        "armor": 30,
                        "armorperlevel": 4,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 7.15,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 63,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 3,
                        "attackspeed": 0.694
                    }
                },
                "Shen": {
                    "version": "13.1.1",
                    "id": "Shen",
                    "key": "98",
                    "name": "Shen",
                    "title": "the Eye of Twilight",
                    "blurb": "Among the secretive, Ionian warriors known as the Kinkou, Shen serves as their leader, the Eye of Twilight. He longs to remain free from the confusion of emotion, prejudice, and ego, and walks the unseen path of dispassionate judgment between the spirit...",
                    "info": {
                        "attack": 3,
                        "defense": 9,
                        "magic": 3,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Shen.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 144,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank"
                    ],
                    "partype": "Energy",
                    "stats": {
                        "hp": 610,
                        "hpperlevel": 99,
                        "mp": 400,
                        "mpperlevel": 0,
                        "movespeed": 340,
                        "armor": 34,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.75,
                        "mpregen": 50,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 60,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 3,
                        "attackspeed": 0.751
                    }
                },
                "Shyvana": {
                    "version": "13.1.1",
                    "id": "Shyvana",
                    "key": "102",
                    "name": "Shyvana",
                    "title": "the Half-Dragon",
                    "blurb": "Shyvana is a creature with the magic of a rune shard burning within her heart. Though she often appears humanoid, she can take her true form as a fearsome dragon, incinerating her foes with fiery breath. Having saved the life of the crown prince Jarvan...",
                    "info": {
                        "attack": 8,
                        "defense": 6,
                        "magic": 3,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Shyvana.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 192,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Fury",
                    "stats": {
                        "hp": 665,
                        "hpperlevel": 109,
                        "mp": 100,
                        "mpperlevel": 0,
                        "movespeed": 350,
                        "armor": 38,
                        "armorperlevel": 4.55,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.8,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 66,
                        "attackdamageperlevel": 3.4,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.658
                    }
                },
                "Singed": {
                    "version": "13.1.1",
                    "id": "Singed",
                    "key": "27",
                    "name": "Singed",
                    "title": "the Mad Chemist",
                    "blurb": "Singed is a Zaunite alchemist of unmatched intellect, who has devoted his life to pushing the boundaries of knowledge—with no price, even his own sanity, too high to pay. Is there a method to his madness? His concoctions rarely fail, but it appears to...",
                    "info": {
                        "attack": 4,
                        "defense": 8,
                        "magic": 7,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Singed.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 240,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 650,
                        "hpperlevel": 99,
                        "mp": 330,
                        "mpperlevel": 45,
                        "movespeed": 345,
                        "armor": 34,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 9.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 7.5,
                        "mpregenperlevel": 0.55,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 63,
                        "attackdamageperlevel": 3.4,
                        "attackspeedperlevel": 1.9,
                        "attackspeed": 0.613
                    }
                },
                "Sion": {
                    "version": "13.1.1",
                    "id": "Sion",
                    "key": "14",
                    "name": "Sion",
                    "title": "The Undead Juggernaut",
                    "blurb": "A war hero from a bygone era, Sion was revered in Noxus for choking the life out of a Demacian king with his bare hands—but, denied oblivion, he was resurrected to serve his empire even in death. His indiscriminate slaughter claimed all who stood in his...",
                    "info": {
                        "attack": 5,
                        "defense": 9,
                        "magic": 3,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Sion.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 288,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 655,
                        "hpperlevel": 87,
                        "mp": 400,
                        "mpperlevel": 52,
                        "movespeed": 345,
                        "armor": 32,
                        "armorperlevel": 4.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 7.5,
                        "hpregenperlevel": 0.8,
                        "mpregen": 8,
                        "mpregenperlevel": 0.6,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 68,
                        "attackdamageperlevel": 4,
                        "attackspeedperlevel": 1.3,
                        "attackspeed": 0.679
                    }
                },
                "Sivir": {
                    "version": "13.1.1",
                    "id": "Sivir",
                    "key": "15",
                    "name": "Sivir",
                    "title": "the Battle Mistress",
                    "blurb": "Sivir is a renowned fortune hunter and mercenary captain who plies her trade in the deserts of Shurima. Armed with her legendary jeweled crossblade, she has fought and won countless battles for those who can afford her exorbitant price. Known for her...",
                    "info": {
                        "attack": 9,
                        "defense": 3,
                        "magic": 1,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Sivir.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 336,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 600,
                        "hpperlevel": 104,
                        "mp": 340,
                        "mpperlevel": 40,
                        "movespeed": 335,
                        "armor": 26,
                        "armorperlevel": 4.45,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 500,
                        "hpregen": 3.25,
                        "hpregenperlevel": 0.55,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 58,
                        "attackdamageperlevel": 2.8,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.625
                    }
                },
                "Skarner": {
                    "version": "13.1.1",
                    "id": "Skarner",
                    "key": "72",
                    "name": "Skarner",
                    "title": "the Crystal Vanguard",
                    "blurb": "Skarner is an immense crystalline scorpion from a hidden valley in Shurima. Part of the ancient Brackern race, Skarner and his kin are known for their great wisdom and deep connection to the land, as their souls are fused with powerful life crystals...",
                    "info": {
                        "attack": 7,
                        "defense": 6,
                        "magic": 5,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Skarner.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 384,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 650,
                        "hpperlevel": 99,
                        "mp": 320,
                        "mpperlevel": 60,
                        "movespeed": 335,
                        "armor": 38,
                        "armorperlevel": 5,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 9,
                        "hpregenperlevel": 0.85,
                        "mpregen": 7.2,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 65,
                        "attackdamageperlevel": 4.5,
                        "attackspeedperlevel": 2.1,
                        "attackspeed": 0.625
                    }
                },
                "Sona": {
                    "version": "13.1.1",
                    "id": "Sona",
                    "key": "37",
                    "name": "Sona",
                    "title": "Maven of the Strings",
                    "blurb": "Sona is Demacia's foremost virtuoso of the stringed etwahl, speaking only through her graceful chords and vibrant arias. This genteel manner has endeared her to the highborn, though others suspect her spellbinding melodies to actually emanate magic—a...",
                    "info": {
                        "attack": 5,
                        "defense": 2,
                        "magic": 8,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Sona.png",
                        "sprite": "champion3.png",
                        "group": "champion",
                        "x": 432,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 550,
                        "hpperlevel": 91,
                        "mp": 340,
                        "mpperlevel": 45,
                        "movespeed": 325,
                        "armor": 26,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 11.5,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 49,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.3,
                        "attackspeed": 0.644
                    }
                },
                "Soraka": {
                    "version": "13.1.1",
                    "id": "Soraka",
                    "key": "16",
                    "name": "Soraka",
                    "title": "the Starchild",
                    "blurb": "A wanderer from the celestial dimensions beyond Mount Targon, Soraka gave up her immortality to protect the mortal races from their own more violent instincts. She endeavors to spread the virtues of compassion and mercy to everyone she meets—even...",
                    "info": {
                        "attack": 2,
                        "defense": 5,
                        "magic": 7,
                        "difficulty": 3
                    },
                    "image": {
                        "full": "Soraka.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 0,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 605,
                        "hpperlevel": 88,
                        "mp": 425,
                        "mpperlevel": 40,
                        "movespeed": 325,
                        "armor": 32,
                        "armorperlevel": 5,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 2.5,
                        "hpregenperlevel": 0.5,
                        "mpregen": 11.5,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 50,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.14,
                        "attackspeed": 0.625
                    }
                },
                "Swain": {
                    "version": "13.1.1",
                    "id": "Swain",
                    "key": "50",
                    "name": "Swain",
                    "title": "the Noxian Grand General",
                    "blurb": "Jericho Swain is the visionary ruler of Noxus, an expansionist nation that reveres only strength. Though he was cast down and crippled in the Ionian wars, his left arm severed, he seized control of the empire with ruthless determination… and a new...",
                    "info": {
                        "attack": 2,
                        "defense": 6,
                        "magic": 9,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Swain.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 48,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 595,
                        "hpperlevel": 99,
                        "mp": 468,
                        "mpperlevel": 29,
                        "movespeed": 330,
                        "armor": 26,
                        "armorperlevel": 5.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 7,
                        "hpregenperlevel": 0.65,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 58,
                        "attackdamageperlevel": 2.7,
                        "attackspeedperlevel": 2.11,
                        "attackspeed": 0.625
                    }
                },
                "Sylas": {
                    "version": "13.1.1",
                    "id": "Sylas",
                    "key": "517",
                    "name": "Sylas",
                    "title": "the Unshackled",
                    "blurb": "Raised in one of Demacia's lesser quarters, Sylas of Dregbourne has come to symbolize the darker side of the Great City. As a boy, his ability to root out hidden sorcery caught the attention of the notorious mageseekers, who eventually imprisoned him...",
                    "info": {
                        "attack": 3,
                        "defense": 4,
                        "magic": 8,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Sylas.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 96,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 575,
                        "hpperlevel": 129,
                        "mp": 310,
                        "mpperlevel": 70,
                        "movespeed": 340,
                        "armor": 27,
                        "armorperlevel": 5.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.55,
                        "attackrange": 175,
                        "hpregen": 9,
                        "hpregenperlevel": 0.9,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 61,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 3.5,
                        "attackspeed": 0.645
                    }
                },
                "Syndra": {
                    "version": "13.1.1",
                    "id": "Syndra",
                    "key": "134",
                    "name": "Syndra",
                    "title": "the Dark Sovereign",
                    "blurb": "Syndra is a fearsome Ionian mage with incredible power at her command. As a child, she disturbed the village elders with her reckless and wild magic. She was sent away to be taught greater control, but eventually discovered her supposed mentor was...",
                    "info": {
                        "attack": 2,
                        "defense": 3,
                        "magic": 9,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Syndra.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 144,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 563,
                        "hpperlevel": 104,
                        "mp": 480,
                        "mpperlevel": 40,
                        "movespeed": 330,
                        "armor": 25,
                        "armorperlevel": 4.6,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 6.5,
                        "hpregenperlevel": 0.6,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 54,
                        "attackdamageperlevel": 2.9,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.625
                    }
                },
                "TahmKench": {
                    "version": "13.1.1",
                    "id": "TahmKench",
                    "key": "223",
                    "name": "Tahm Kench",
                    "title": "The River King",
                    "blurb": "Known by many names throughout history, the demon Tahm Kench travels the waterways of Runeterra, feeding his insatiable appetite with the misery of others. Though he may appear singularly charming and proud, he swaggers through the physical realm like a...",
                    "info": {
                        "attack": 3,
                        "defense": 9,
                        "magic": 6,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "TahmKench.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 192,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 640,
                        "hpperlevel": 103,
                        "mp": 325,
                        "mpperlevel": 50,
                        "movespeed": 335,
                        "armor": 42,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 6.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8,
                        "mpregenperlevel": 1,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 56,
                        "attackdamageperlevel": 3.2,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.658
                    }
                },
                "Taliyah": {
                    "version": "13.1.1",
                    "id": "Taliyah",
                    "key": "163",
                    "name": "Taliyah",
                    "title": "the Stoneweaver",
                    "blurb": "Taliyah is a nomadic mage from Shurima, torn between teenage wonder and adult responsibility. She has crossed nearly all of Valoran on a journey to learn the true nature of her growing powers, though more recently she has returned to protect her tribe...",
                    "info": {
                        "attack": 1,
                        "defense": 7,
                        "magic": 8,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Taliyah.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 240,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 550,
                        "hpperlevel": 104,
                        "mp": 470,
                        "mpperlevel": 30,
                        "movespeed": 330,
                        "armor": 18,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 6.5,
                        "hpregenperlevel": 0.65,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 58,
                        "attackdamageperlevel": 3.3,
                        "attackspeedperlevel": 1.36,
                        "attackspeed": 0.625
                    }
                },
                "Talon": {
                    "version": "13.1.1",
                    "id": "Talon",
                    "key": "91",
                    "name": "Talon",
                    "title": "the Blade's Shadow",
                    "blurb": "Talon is the knife in the darkness, a merciless killer able to strike without warning and escape before any alarm is raised. He carved out a dangerous reputation on the brutal streets of Noxus, where he was forced to fight, kill, and steal to survive...",
                    "info": {
                        "attack": 9,
                        "defense": 3,
                        "magic": 1,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Talon.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 288,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 658,
                        "hpperlevel": 109,
                        "mp": 377,
                        "mpperlevel": 37,
                        "movespeed": 335,
                        "armor": 30,
                        "armorperlevel": 4.7,
                        "spellblock": 39,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.75,
                        "mpregen": 7.6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 68,
                        "attackdamageperlevel": 3.1,
                        "attackspeedperlevel": 2.9,
                        "attackspeed": 0.625
                    }
                },
                "Taric": {
                    "version": "13.1.1",
                    "id": "Taric",
                    "key": "44",
                    "name": "Taric",
                    "title": "the Shield of Valoran",
                    "blurb": "Taric is the Aspect of the Protector, wielding incredible power as Runeterra's guardian of life, love, and beauty. Shamed by a dereliction of duty and exiled from his homeland Demacia, Taric ascended Mount Targon to find redemption, only to discover a...",
                    "info": {
                        "attack": 4,
                        "defense": 8,
                        "magic": 5,
                        "difficulty": 3
                    },
                    "image": {
                        "full": "Taric.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 336,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 645,
                        "hpperlevel": 99,
                        "mp": 300,
                        "mpperlevel": 60,
                        "movespeed": 340,
                        "armor": 40,
                        "armorperlevel": 4.6,
                        "spellblock": 28,
                        "spellblockperlevel": 2.05,
                        "attackrange": 150,
                        "hpregen": 6,
                        "hpregenperlevel": 0.5,
                        "mpregen": 8.5,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.625
                    }
                },
                "Teemo": {
                    "version": "13.1.1",
                    "id": "Teemo",
                    "key": "17",
                    "name": "Teemo",
                    "title": "the Swift Scout",
                    "blurb": "Undeterred by even the most dangerous and threatening of obstacles, Teemo scouts the world with boundless enthusiasm and a cheerful spirit. A yordle with an unwavering sense of morality, he takes pride in following the Bandle Scout's Code, sometimes...",
                    "info": {
                        "attack": 5,
                        "defense": 3,
                        "magic": 7,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Teemo.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 384,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 598,
                        "hpperlevel": 104,
                        "mp": 334,
                        "mpperlevel": 25,
                        "movespeed": 330,
                        "armor": 24,
                        "armorperlevel": 4.95,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 500,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.65,
                        "mpregen": 9.6,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 54,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 3.38,
                        "attackspeed": 0.69
                    }
                },
                "Thresh": {
                    "version": "13.1.1",
                    "id": "Thresh",
                    "key": "412",
                    "name": "Thresh",
                    "title": "the Chain Warden",
                    "blurb": "Sadistic and cunning, Thresh is an ambitious and restless spirit of the Shadow Isles. Once the custodian of countless arcane secrets, he was undone by a power greater than life or death, and now sustains himself by tormenting and breaking others with...",
                    "info": {
                        "attack": 5,
                        "defense": 6,
                        "magic": 6,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Thresh.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 432,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Fighter"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 600,
                        "hpperlevel": 120,
                        "mp": 274,
                        "mpperlevel": 44,
                        "movespeed": 330,
                        "armor": 28,
                        "armorperlevel": 0,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 450,
                        "hpregen": 7,
                        "hpregenperlevel": 0.55,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 56,
                        "attackdamageperlevel": 2.2,
                        "attackspeedperlevel": 3.5,
                        "attackspeed": 0.625
                    }
                },
                "Tristana": {
                    "version": "13.1.1",
                    "id": "Tristana",
                    "key": "18",
                    "name": "Tristana",
                    "title": "the Yordle Gunner",
                    "blurb": "While many other yordles channel their energy into discovery, invention, or just plain mischief-making, Tristana was always inspired by the adventures of great warriors. She had heard much about Runeterra, its factions, and its wars, and believed her...",
                    "info": {
                        "attack": 9,
                        "defense": 3,
                        "magic": 5,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Tristana.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 0,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 670,
                        "hpperlevel": 102,
                        "mp": 250,
                        "mpperlevel": 32,
                        "movespeed": 325,
                        "armor": 26,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 4,
                        "hpregenperlevel": 0.65,
                        "mpregen": 7.2,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 59,
                        "attackdamageperlevel": 3.7,
                        "attackspeedperlevel": 1.5,
                        "attackspeed": 0.656
                    }
                },
                "Trundle": {
                    "version": "13.1.1",
                    "id": "Trundle",
                    "key": "48",
                    "name": "Trundle",
                    "title": "the Troll King",
                    "blurb": "Trundle is a hulking and devious troll with a particularly vicious streak, and there is nothing he cannot bludgeon into submission—not even the Freljord itself. Fiercely territorial, he chases down anyone foolish enough to enter his domain. Then, his...",
                    "info": {
                        "attack": 7,
                        "defense": 6,
                        "magic": 2,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Trundle.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 48,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 686,
                        "hpperlevel": 110,
                        "mp": 281,
                        "mpperlevel": 45,
                        "movespeed": 350,
                        "armor": 37,
                        "armorperlevel": 3.9,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 6,
                        "hpregenperlevel": 0.75,
                        "mpregen": 7.5,
                        "mpregenperlevel": 0.6,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 68,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.9,
                        "attackspeed": 0.6
                    }
                },
                "Tryndamere": {
                    "version": "13.1.1",
                    "id": "Tryndamere",
                    "key": "23",
                    "name": "Tryndamere",
                    "title": "the Barbarian King",
                    "blurb": "Fueled by unbridled fury and rage, Tryndamere once carved his way through the Freljord, openly challenging the greatest warriors of the north to prepare himself for even darker days ahead. The wrathful barbarian has long sought revenge for the...",
                    "info": {
                        "attack": 10,
                        "defense": 5,
                        "magic": 2,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Tryndamere.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 96,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Assassin"
                    ],
                    "partype": "Fury",
                    "stats": {
                        "hp": 696,
                        "hpperlevel": 112,
                        "mp": 100,
                        "mpperlevel": 0,
                        "movespeed": 345,
                        "armor": 33,
                        "armorperlevel": 4.3,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 8.5,
                        "hpregenperlevel": 0.9,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 72,
                        "attackdamageperlevel": 3.7,
                        "attackspeedperlevel": 2.9,
                        "attackspeed": 0.67
                    }
                },
                "TwistedFate": {
                    "version": "13.1.1",
                    "id": "TwistedFate",
                    "key": "4",
                    "name": "Twisted Fate",
                    "title": "the Card Master",
                    "blurb": "Twisted Fate is an infamous cardsharp and swindler who has gambled and charmed his way across much of the known world, earning the enmity and admiration of the rich and foolish alike. He rarely takes things seriously, greeting each day with a mocking...",
                    "info": {
                        "attack": 6,
                        "defense": 2,
                        "magic": 6,
                        "difficulty": 9
                    },
                    "image": {
                        "full": "TwistedFate.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 144,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 604,
                        "hpperlevel": 108,
                        "mp": 333,
                        "mpperlevel": 39,
                        "movespeed": 330,
                        "armor": 21,
                        "armorperlevel": 4.35,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.6,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 52,
                        "attackdamageperlevel": 3.3,
                        "attackspeedperlevel": 3.22,
                        "attackspeed": 0.651
                    }
                },
                "Twitch": {
                    "version": "13.1.1",
                    "id": "Twitch",
                    "key": "29",
                    "name": "Twitch",
                    "title": "the Plague Rat",
                    "blurb": "A Zaunite plague rat by birth, but a connoisseur of filth by passion, Twitch is not afraid to get his paws dirty. Aiming a chem-powered crossbow at the gilded heart of Piltover, he has vowed to show those in the city above just how filthy they really...",
                    "info": {
                        "attack": 9,
                        "defense": 2,
                        "magic": 3,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Twitch.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 192,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 682,
                        "hpperlevel": 100,
                        "mp": 287.2,
                        "mpperlevel": 40,
                        "movespeed": 330,
                        "armor": 27,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 3.75,
                        "hpregenperlevel": 0.6,
                        "mpregen": 7.25,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 59,
                        "attackdamageperlevel": 3.1,
                        "attackspeedperlevel": 3.38,
                        "attackspeed": 0.679
                    }
                },
                "Udyr": {
                    "version": "13.1.1",
                    "id": "Udyr",
                    "key": "77",
                    "name": "Udyr",
                    "title": "the Spirit Walker",
                    "blurb": "The most powerful spirit walker alive, Udyr communes with all the spirits of the Freljord, whether by empathically understanding their needs, or by channeling and transforming their ethereal energy into his own primal fighting style. He seeks balance...",
                    "info": {
                        "attack": 8,
                        "defense": 7,
                        "magic": 4,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Udyr.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 240,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 664,
                        "hpperlevel": 98,
                        "mp": 271,
                        "mpperlevel": 50,
                        "movespeed": 350,
                        "armor": 34,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 6,
                        "hpregenperlevel": 0.75,
                        "mpregen": 7.5,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 62,
                        "attackdamageperlevel": 4,
                        "attackspeedperlevel": 3,
                        "attackspeed": 0.65
                    }
                },
                "Urgot": {
                    "version": "13.1.1",
                    "id": "Urgot",
                    "key": "6",
                    "name": "Urgot",
                    "title": "the Dreadnought",
                    "blurb": "Once a powerful Noxian headsman, Urgot was betrayed by the empire for which he had killed so many. Bound in iron chains, he was forced to learn the true meaning of strength in the Dredge—a prison mine deep beneath Zaun. Emerging in a disaster that...",
                    "info": {
                        "attack": 8,
                        "defense": 5,
                        "magic": 3,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Urgot.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 288,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 655,
                        "hpperlevel": 102,
                        "mp": 340,
                        "mpperlevel": 45,
                        "movespeed": 330,
                        "armor": 36,
                        "armorperlevel": 5.45,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 350,
                        "hpregen": 7.5,
                        "hpregenperlevel": 0.7,
                        "mpregen": 7.25,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 63,
                        "attackdamageperlevel": 4,
                        "attackspeedperlevel": 3.75,
                        "attackspeed": 0.625
                    }
                },
                "Varus": {
                    "version": "13.1.1",
                    "id": "Varus",
                    "key": "110",
                    "name": "Varus",
                    "title": "the Arrow of Retribution",
                    "blurb": "One of the ancient darkin, Varus was a deadly killer who loved to torment his foes, driving them almost to insanity before delivering the killing arrow. He was imprisoned at the end of the Great Darkin War, but escaped centuries later in the remade...",
                    "info": {
                        "attack": 7,
                        "defense": 3,
                        "magic": 4,
                        "difficulty": 2
                    },
                    "image": {
                        "full": "Varus.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 336,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 600,
                        "hpperlevel": 105,
                        "mp": 360,
                        "mpperlevel": 40,
                        "movespeed": 330,
                        "armor": 27,
                        "armorperlevel": 4.6,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 575,
                        "hpregen": 3.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 62,
                        "attackdamageperlevel": 3.4,
                        "attackspeedperlevel": 4,
                        "attackspeed": 0.658
                    }
                },
                "Vayne": {
                    "version": "13.1.1",
                    "id": "Vayne",
                    "key": "67",
                    "name": "Vayne",
                    "title": "the Night Hunter",
                    "blurb": "Shauna Vayne is a deadly, remorseless Demacian monster hunter, who has dedicated her life to finding and destroying the demon that murdered her family. Armed with a wrist-mounted crossbow and a heart full of vengeance, she is only truly happy when...",
                    "info": {
                        "attack": 10,
                        "defense": 1,
                        "magic": 1,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Vayne.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 384,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 550,
                        "hpperlevel": 103,
                        "mp": 232,
                        "mpperlevel": 35,
                        "movespeed": 330,
                        "armor": 23,
                        "armorperlevel": 4.6,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 3.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 7,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 60,
                        "attackdamageperlevel": 2.35,
                        "attackspeedperlevel": 3.3,
                        "attackspeed": 0.658
                    }
                },
                "Veigar": {
                    "version": "13.1.1",
                    "id": "Veigar",
                    "key": "45",
                    "name": "Veigar",
                    "title": "the Tiny Master of Evil",
                    "blurb": "An enthusiastic master of dark sorcery, Veigar has embraced powers that few mortals dare approach. As a free-spirited inhabitant of Bandle City, he longed to push beyond the limitations of yordle magic, and turned instead to arcane texts that had been...",
                    "info": {
                        "attack": 2,
                        "defense": 2,
                        "magic": 10,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Veigar.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 432,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 575,
                        "hpperlevel": 108,
                        "mp": 490,
                        "mpperlevel": 26,
                        "movespeed": 340,
                        "armor": 21,
                        "armorperlevel": 5.2,
                        "spellblock": 32,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 6.5,
                        "hpregenperlevel": 0.6,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 52,
                        "attackdamageperlevel": 2.7,
                        "attackspeedperlevel": 2.24,
                        "attackspeed": 0.625
                    }
                },
                "Velkoz": {
                    "version": "13.1.1",
                    "id": "Velkoz",
                    "key": "161",
                    "name": "Vel'Koz",
                    "title": "the Eye of the Void",
                    "blurb": "It is unclear if Vel'Koz was the first Void-spawn to emerge on Runeterra, but there has certainly never been another to match his level of cruel, calculating sentience. While his kin devour or defile everything around them, he seeks instead to...",
                    "info": {
                        "attack": 2,
                        "defense": 2,
                        "magic": 10,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Velkoz.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 0,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 590,
                        "hpperlevel": 102,
                        "mp": 469,
                        "mpperlevel": 21,
                        "movespeed": 340,
                        "armor": 22,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 3.1416,
                        "attackspeedperlevel": 1.36,
                        "attackspeed": 0.625
                    }
                },
                "Vex": {
                    "version": "13.1.1",
                    "id": "Vex",
                    "key": "711",
                    "name": "Vex",
                    "title": "the Gloomist",
                    "blurb": "In the black heart of the Shadow Isles, a lone yordle trudges through the spectral fog, content in its murky misery. With an endless supply of teen angst and a powerful shadow in tow, Vex lives in her own self-made slice of gloom, far from the revolting...",
                    "info": {
                        "attack": 0,
                        "defense": 0,
                        "magic": 0,
                        "difficulty": 0
                    },
                    "image": {
                        "full": "Vex.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 48,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 590,
                        "hpperlevel": 104,
                        "mp": 490,
                        "mpperlevel": 32,
                        "movespeed": 335,
                        "armor": 23,
                        "armorperlevel": 4.45,
                        "spellblock": 28,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 6.5,
                        "hpregenperlevel": 0.6,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 54,
                        "attackdamageperlevel": 2.75,
                        "attackspeedperlevel": 1,
                        "attackspeed": 0.669
                    }
                },
                "Vi": {
                    "version": "13.1.1",
                    "id": "Vi",
                    "key": "254",
                    "name": "Vi",
                    "title": "the Piltover Enforcer",
                    "blurb": "Once a criminal from the mean streets of Zaun, Vi is a hotheaded, impulsive, and fearsome woman with only a very loose respect for authority figures. Growing up all but alone, Vi developed finely honed survival instincts as well as a wickedly abrasive...",
                    "info": {
                        "attack": 8,
                        "defense": 5,
                        "magic": 3,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Vi.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 96,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 655,
                        "hpperlevel": 99,
                        "mp": 295,
                        "mpperlevel": 65,
                        "movespeed": 340,
                        "armor": 30,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 10,
                        "hpregenperlevel": 1,
                        "mpregen": 8,
                        "mpregenperlevel": 0.65,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 63,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.644
                    }
                },
                "Viego": {
                    "version": "13.1.1",
                    "id": "Viego",
                    "key": "234",
                    "name": "Viego",
                    "title": "The Ruined King",
                    "blurb": "Once ruler of a long-lost kingdom, Viego perished over a thousand years ago when his attempt to bring his wife back from the dead triggered the magical catastrophe known as the Ruination. Transformed into a powerful, unliving wraith tortured by an...",
                    "info": {
                        "attack": 6,
                        "defense": 4,
                        "magic": 2,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Viego.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 144,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin",
                        "Fighter"
                    ],
                    "partype": "None",
                    "stats": {
                        "hp": 630,
                        "hpperlevel": 109,
                        "mp": 10000,
                        "mpperlevel": 0,
                        "movespeed": 345,
                        "armor": 34,
                        "armorperlevel": 5.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 200,
                        "hpregen": 7,
                        "hpregenperlevel": 0.7,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 57,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.658
                    }
                },
                "Viktor": {
                    "version": "13.1.1",
                    "id": "Viktor",
                    "key": "112",
                    "name": "Viktor",
                    "title": "the Machine Herald",
                    "blurb": "The herald of a new age of technology, Viktor has devoted his life to the advancement of humankind. An idealist who seeks to lift the people of Zaun to a new level of understanding, he believes that only by embracing a glorious evolution of technology...",
                    "info": {
                        "attack": 2,
                        "defense": 4,
                        "magic": 10,
                        "difficulty": 9
                    },
                    "image": {
                        "full": "Viktor.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 192,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 600,
                        "hpperlevel": 104,
                        "mp": 405,
                        "mpperlevel": 45,
                        "movespeed": 335,
                        "armor": 23,
                        "armorperlevel": 5.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 8,
                        "hpregenperlevel": 0.65,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 53,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.11,
                        "attackspeed": 0.658
                    }
                },
                "Vladimir": {
                    "version": "13.1.1",
                    "id": "Vladimir",
                    "key": "8",
                    "name": "Vladimir",
                    "title": "the Crimson Reaper",
                    "blurb": "A fiend with a thirst for mortal blood, Vladimir has influenced the affairs of Noxus since the empire's earliest days. In addition to unnaturally extending his life, his mastery of hemomancy allows him to control the minds and bodies of others as easily...",
                    "info": {
                        "attack": 2,
                        "defense": 6,
                        "magic": 8,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Vladimir.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 240,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Crimson Rush",
                    "stats": {
                        "hp": 607,
                        "hpperlevel": 110,
                        "mp": 2,
                        "mpperlevel": 0,
                        "movespeed": 330,
                        "armor": 27,
                        "armorperlevel": 4.5,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 450,
                        "hpregen": 7,
                        "hpregenperlevel": 0.6,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.658
                    }
                },
                "Volibear": {
                    "version": "13.1.1",
                    "id": "Volibear",
                    "key": "106",
                    "name": "Volibear",
                    "title": "the Relentless Storm",
                    "blurb": "To those who still revere him, the Volibear is the storm made manifest. Destructive, wild, and stubbornly resolute, he existed before mortals walked the Freljord's tundra, and is fiercely protective of the lands that he and his demi-god kin created...",
                    "info": {
                        "attack": 7,
                        "defense": 7,
                        "magic": 4,
                        "difficulty": 3
                    },
                    "image": {
                        "full": "Volibear.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 288,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 650,
                        "hpperlevel": 104,
                        "mp": 350,
                        "mpperlevel": 70,
                        "movespeed": 340,
                        "armor": 31,
                        "armorperlevel": 5.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 150,
                        "hpregen": 9,
                        "hpregenperlevel": 0.75,
                        "mpregen": 6.25,
                        "mpregenperlevel": 0.5,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 60,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.625
                    }
                },
                "Warwick": {
                    "version": "13.1.1",
                    "id": "Warwick",
                    "key": "19",
                    "name": "Warwick",
                    "title": "the Uncaged Wrath of Zaun",
                    "blurb": "Warwick is a monster who hunts the gray alleys of Zaun. Transformed by agonizing experiments, his body is fused with an intricate system of chambers and pumps, machinery filling his veins with alchemical rage. Bursting out of the shadows, he preys upon...",
                    "info": {
                        "attack": 9,
                        "defense": 5,
                        "magic": 3,
                        "difficulty": 3
                    },
                    "image": {
                        "full": "Warwick.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 336,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 620,
                        "hpperlevel": 99,
                        "mp": 280,
                        "mpperlevel": 35,
                        "movespeed": 335,
                        "armor": 33,
                        "armorperlevel": 4.4,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 4,
                        "hpregenperlevel": 0.75,
                        "mpregen": 7.45,
                        "mpregenperlevel": 0.6,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 65,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.3,
                        "attackspeed": 0.638
                    }
                },
                "Xayah": {
                    "version": "13.1.1",
                    "id": "Xayah",
                    "key": "498",
                    "name": "Xayah",
                    "title": "the Rebel",
                    "blurb": "Deadly and precise, Xayah is a vastayan revolutionary waging a personal war to save her people. She uses her speed, guile, and razor-sharp feather blades to cut down anyone who stands in her way. Xayah fights alongside her partner and lover, Rakan, to...",
                    "info": {
                        "attack": 10,
                        "defense": 6,
                        "magic": 1,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Xayah.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 384,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 660,
                        "hpperlevel": 102,
                        "mp": 340,
                        "mpperlevel": 40,
                        "movespeed": 330,
                        "armor": 25,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 3.25,
                        "hpregenperlevel": 0.75,
                        "mpregen": 8.25,
                        "mpregenperlevel": 0.75,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 60,
                        "attackdamageperlevel": 3.5,
                        "attackspeedperlevel": 3.9,
                        "attackspeed": 0.658
                    }
                },
                "Xerath": {
                    "version": "13.1.1",
                    "id": "Xerath",
                    "key": "101",
                    "name": "Xerath",
                    "title": "the Magus Ascendant",
                    "blurb": "Xerath is an Ascended Magus of ancient Shurima, a being of arcane energy writhing in the broken shards of a magical sarcophagus. For millennia, he was trapped beneath the desert sands, but the rise of Shurima freed him from his ancient prison. Driven...",
                    "info": {
                        "attack": 1,
                        "defense": 3,
                        "magic": 10,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Xerath.png",
                        "sprite": "champion4.png",
                        "group": "champion",
                        "x": 432,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 596,
                        "hpperlevel": 106,
                        "mp": 459,
                        "mpperlevel": 22,
                        "movespeed": 340,
                        "armor": 22,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 525,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.55,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 1.36,
                        "attackspeed": 0.625
                    }
                },
                "XinZhao": {
                    "version": "13.1.1",
                    "id": "XinZhao",
                    "key": "5",
                    "name": "Xin Zhao",
                    "title": "the Seneschal of Demacia",
                    "blurb": "Xin Zhao is a resolute warrior loyal to the ruling Lightshield dynasty. Once condemned to the fighting pits of Noxus, he survived countless gladiatorial bouts, but after being freed by Demacian forces, he swore his life and allegiance to these brave...",
                    "info": {
                        "attack": 8,
                        "defense": 6,
                        "magic": 3,
                        "difficulty": 2
                    },
                    "image": {
                        "full": "XinZhao.png",
                        "sprite": "champion5.png",
                        "group": "champion",
                        "x": 0,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Assassin"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 640,
                        "hpperlevel": 106,
                        "mp": 274,
                        "mpperlevel": 55,
                        "movespeed": 345,
                        "armor": 35,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 8,
                        "hpregenperlevel": 0.7,
                        "mpregen": 7.25,
                        "mpregenperlevel": 0.45,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 63,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 3.5,
                        "attackspeed": 0.645
                    }
                },
                "Yasuo": {
                    "version": "13.1.1",
                    "id": "Yasuo",
                    "key": "157",
                    "name": "Yasuo",
                    "title": "the Unforgiven",
                    "blurb": "An Ionian of deep resolve, Yasuo is an agile swordsman who wields the air itself against his enemies. As a proud young man, he was falsely accused of murdering his master—unable to prove his innocence, he was forced to slay his own brother in self...",
                    "info": {
                        "attack": 8,
                        "defense": 4,
                        "magic": 4,
                        "difficulty": 10
                    },
                    "image": {
                        "full": "Yasuo.png",
                        "sprite": "champion5.png",
                        "group": "champion",
                        "x": 48,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Assassin"
                    ],
                    "partype": "Flow",
                    "stats": {
                        "hp": 590,
                        "hpperlevel": 101,
                        "mp": 100,
                        "mpperlevel": 0,
                        "movespeed": 345,
                        "armor": 30,
                        "armorperlevel": 4.6,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 6.5,
                        "hpregenperlevel": 0.9,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 60,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 3.5,
                        "attackspeed": 0.697
                    }
                },
                "Yone": {
                    "version": "13.1.1",
                    "id": "Yone",
                    "key": "777",
                    "name": "Yone",
                    "title": "the Unforgotten",
                    "blurb": "In life, he was Yone—half-brother of Yasuo, and renowned student of his village's sword school. But upon his death at the hands of his brother, he found himself hunted by a malevolent entity of the spirit realm, and was forced to slay it with its own...",
                    "info": {
                        "attack": 8,
                        "defense": 4,
                        "magic": 4,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Yone.png",
                        "sprite": "champion5.png",
                        "group": "champion",
                        "x": 96,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin",
                        "Fighter"
                    ],
                    "partype": "Flow",
                    "stats": {
                        "hp": 620,
                        "hpperlevel": 99,
                        "mp": 500,
                        "mpperlevel": 0,
                        "movespeed": 345,
                        "armor": 28,
                        "armorperlevel": 4.6,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 7.5,
                        "hpregenperlevel": 0.75,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 60,
                        "attackdamageperlevel": 2,
                        "attackspeedperlevel": 3.5,
                        "attackspeed": 0.625
                    }
                },
                "Yorick": {
                    "version": "13.1.1",
                    "id": "Yorick",
                    "key": "83",
                    "name": "Yorick",
                    "title": "Shepherd of Souls",
                    "blurb": "The last survivor of a long-forgotten religious order, Yorick is both blessed and cursed with power over the dead. Trapped on the Shadow Isles, his only companions are the rotting corpses and shrieking spirits that he gathers to him. Yorick's monstrous...",
                    "info": {
                        "attack": 6,
                        "defense": 6,
                        "magic": 4,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Yorick.png",
                        "sprite": "champion5.png",
                        "group": "champion",
                        "x": 144,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Fighter",
                        "Tank"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 650,
                        "hpperlevel": 114,
                        "mp": 300,
                        "mpperlevel": 60,
                        "movespeed": 340,
                        "armor": 39,
                        "armorperlevel": 5.2,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 8,
                        "hpregenperlevel": 0.8,
                        "mpregen": 7.5,
                        "mpregenperlevel": 0.75,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 62,
                        "attackdamageperlevel": 5,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.625
                    }
                },
                "Yuumi": {
                    "version": "13.1.1",
                    "id": "Yuumi",
                    "key": "350",
                    "name": "Yuumi",
                    "title": "the Magical Cat",
                    "blurb": "A magical cat from Bandle City, Yuumi was once the familiar of a yordle enchantress, Norra. When her master mysteriously disappeared, Yuumi became the Keeper of Norra's sentient Book of Thresholds, traveling through portals in its pages to search for...",
                    "info": {
                        "attack": 5,
                        "defense": 1,
                        "magic": 8,
                        "difficulty": 2
                    },
                    "image": {
                        "full": "Yuumi.png",
                        "sprite": "champion5.png",
                        "group": "champion",
                        "x": 192,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 550,
                        "hpperlevel": 84,
                        "mp": 400,
                        "mpperlevel": 45,
                        "movespeed": 330,
                        "armor": 25,
                        "armorperlevel": 4.2,
                        "spellblock": 25,
                        "spellblockperlevel": 1.1,
                        "attackrange": 500,
                        "hpregen": 7,
                        "hpregenperlevel": 0.55,
                        "mpregen": 10,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 55,
                        "attackdamageperlevel": 3.1,
                        "attackspeedperlevel": 1,
                        "attackspeed": 0.625
                    }
                },
                "Zac": {
                    "version": "13.1.1",
                    "id": "Zac",
                    "key": "154",
                    "name": "Zac",
                    "title": "the Secret Weapon",
                    "blurb": "Zac is the product of a toxic spill that ran through a chemtech seam and pooled in an isolated cavern deep in Zaun's Sump. Despite such humble origins, Zac has grown from primordial ooze into a thinking being who dwells in the city's pipes, occasionally...",
                    "info": {
                        "attack": 3,
                        "defense": 7,
                        "magic": 7,
                        "difficulty": 8
                    },
                    "image": {
                        "full": "Zac.png",
                        "sprite": "champion5.png",
                        "group": "champion",
                        "x": 240,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Tank",
                        "Fighter"
                    ],
                    "partype": "None",
                    "stats": {
                        "hp": 685,
                        "hpperlevel": 109,
                        "mp": 0,
                        "mpperlevel": 0,
                        "movespeed": 340,
                        "armor": 33,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 175,
                        "hpregen": 8,
                        "hpregenperlevel": 0.5,
                        "mpregen": 0,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 60,
                        "attackdamageperlevel": 3.4,
                        "attackspeedperlevel": 1.6,
                        "attackspeed": 0.736
                    }
                },
                "Zed": {
                    "version": "13.1.1",
                    "id": "Zed",
                    "key": "238",
                    "name": "Zed",
                    "title": "the Master of Shadows",
                    "blurb": "Utterly ruthless and without mercy, Zed is the leader of the Order of Shadow, an organization he created with the intent of militarizing Ionia's magical and martial traditions to drive out Noxian invaders. During the war, desperation led him to unlock...",
                    "info": {
                        "attack": 9,
                        "defense": 2,
                        "magic": 1,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Zed.png",
                        "sprite": "champion5.png",
                        "group": "champion",
                        "x": 288,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Assassin"
                    ],
                    "partype": "Energy",
                    "stats": {
                        "hp": 654,
                        "hpperlevel": 99,
                        "mp": 200,
                        "mpperlevel": 0,
                        "movespeed": 345,
                        "armor": 32,
                        "armorperlevel": 4.7,
                        "spellblock": 32,
                        "spellblockperlevel": 2.05,
                        "attackrange": 125,
                        "hpregen": 7,
                        "hpregenperlevel": 0.65,
                        "mpregen": 50,
                        "mpregenperlevel": 0,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 63,
                        "attackdamageperlevel": 3.4,
                        "attackspeedperlevel": 3.3,
                        "attackspeed": 0.651
                    }
                },
                "Zeri": {
                    "version": "13.1.1",
                    "id": "Zeri",
                    "key": "221",
                    "name": "Zeri",
                    "title": "The Spark of Zaun",
                    "blurb": "A headstrong, spirited young woman from Zaun's working-class, Zeri channels her electric magic to charge herself and her custom-crafted gun. Her volatile power mirrors her emotions, its sparks reflecting her lightning-fast approach to life. Deeply...",
                    "info": {
                        "attack": 8,
                        "defense": 5,
                        "magic": 3,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Zeri.png",
                        "sprite": "champion5.png",
                        "group": "champion",
                        "x": 336,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Marksman"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 630,
                        "hpperlevel": 115,
                        "mp": 250,
                        "mpperlevel": 45,
                        "movespeed": 330,
                        "armor": 24,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 500,
                        "hpregen": 3.25,
                        "hpregenperlevel": 0.7,
                        "mpregen": 6,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 53,
                        "attackdamageperlevel": 1.3,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.658
                    }
                },
                "Ziggs": {
                    "version": "13.1.1",
                    "id": "Ziggs",
                    "key": "115",
                    "name": "Ziggs",
                    "title": "the Hexplosives Expert",
                    "blurb": "With a love of big bombs and short fuses, the yordle Ziggs is an explosive force of nature. As an inventor's assistant in Piltover, he was bored by his predictable life and befriended a mad, blue-haired bomber named Jinx. After a wild night on the town...",
                    "info": {
                        "attack": 2,
                        "defense": 4,
                        "magic": 9,
                        "difficulty": 4
                    },
                    "image": {
                        "full": "Ziggs.png",
                        "sprite": "champion5.png",
                        "group": "champion",
                        "x": 384,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 606,
                        "hpperlevel": 106,
                        "mp": 480,
                        "mpperlevel": 23.5,
                        "movespeed": 325,
                        "armor": 22,
                        "armorperlevel": 4.5,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 6.5,
                        "hpregenperlevel": 0.6,
                        "mpregen": 8,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 54,
                        "attackdamageperlevel": 3.1,
                        "attackspeedperlevel": 2,
                        "attackspeed": 0.656
                    }
                },
                "Zilean": {
                    "version": "13.1.1",
                    "id": "Zilean",
                    "key": "26",
                    "name": "Zilean",
                    "title": "the Chronokeeper",
                    "blurb": "Once a powerful Icathian mage, Zilean became obsessed with the passage of time after witnessing his homeland's destruction by the Void. Unable to spare even a minute to grieve the catastrophic loss, he called upon ancient temporal magic to divine all...",
                    "info": {
                        "attack": 2,
                        "defense": 5,
                        "magic": 8,
                        "difficulty": 6
                    },
                    "image": {
                        "full": "Zilean.png",
                        "sprite": "champion5.png",
                        "group": "champion",
                        "x": 432,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Support",
                        "Mage"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 574,
                        "hpperlevel": 96,
                        "mp": 452,
                        "mpperlevel": 50,
                        "movespeed": 335,
                        "armor": 24,
                        "armorperlevel": 5,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.5,
                        "mpregen": 11.35,
                        "mpregenperlevel": 0.8,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 52,
                        "attackdamageperlevel": 3,
                        "attackspeedperlevel": 2.13,
                        "attackspeed": 0.625
                    }
                },
                "Zoe": {
                    "version": "13.1.1",
                    "id": "Zoe",
                    "key": "142",
                    "name": "Zoe",
                    "title": "the Aspect of Twilight",
                    "blurb": "As the embodiment of mischief, imagination, and change, Zoe acts as the cosmic messenger of Targon, heralding major events that reshape worlds. Her mere presence warps the arcane mathematics governing realities, sometimes causing cataclysms without...",
                    "info": {
                        "attack": 1,
                        "defense": 7,
                        "magic": 8,
                        "difficulty": 5
                    },
                    "image": {
                        "full": "Zoe.png",
                        "sprite": "champion5.png",
                        "group": "champion",
                        "x": 0,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 630,
                        "hpperlevel": 106,
                        "mp": 425,
                        "mpperlevel": 25,
                        "movespeed": 340,
                        "armor": 21,
                        "armorperlevel": 4.7,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 550,
                        "hpregen": 6.5,
                        "hpregenperlevel": 0.6,
                        "mpregen": 8,
                        "mpregenperlevel": 0.65,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 58,
                        "attackdamageperlevel": 3.3,
                        "attackspeedperlevel": 2.5,
                        "attackspeed": 0.625
                    }
                },
                "Zyra": {
                    "version": "13.1.1",
                    "id": "Zyra",
                    "key": "143",
                    "name": "Zyra",
                    "title": "Rise of the Thorns",
                    "blurb": "Born in an ancient, sorcerous catastrophe, Zyra is the wrath of nature given form—an alluring hybrid of plant and human, kindling new life with every step. She views the many mortals of Valoran as little more than prey for her seeded progeny, and thinks...",
                    "info": {
                        "attack": 4,
                        "defense": 3,
                        "magic": 8,
                        "difficulty": 7
                    },
                    "image": {
                        "full": "Zyra.png",
                        "sprite": "champion5.png",
                        "group": "champion",
                        "x": 48,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "tags": [
                        "Mage",
                        "Support"
                    ],
                    "partype": "Mana",
                    "stats": {
                        "hp": 574,
                        "hpperlevel": 93,
                        "mp": 418,
                        "mpperlevel": 25,
                        "movespeed": 340,
                        "armor": 29,
                        "armorperlevel": 4.2,
                        "spellblock": 30,
                        "spellblockperlevel": 1.3,
                        "attackrange": 575,
                        "hpregen": 5.5,
                        "hpregenperlevel": 0.5,
                        "mpregen": 13,
                        "mpregenperlevel": 0.4,
                        "crit": 0,
                        "critperlevel": 0,
                        "attackdamage": 53,
                        "attackdamageperlevel": 3.2,
                        "attackspeedperlevel": 2.11,
                        "attackspeed": 0.625
                    }
                }
            },
        
            "item": {
                "1001": {
                    "name": "Boots",
                    "description": "<mainText><stats><attention>25</attention> Move Speed</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Slightly increases Move Speed",
                    "into": [
                        "3158",
                        "3006",
                        "3009",
                        "3020",
                        "3047",
                        "3111",
                        "3117"
                    ],
                    "image": {
                        "full": "1001.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 0,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 300,
                        "purchasable": true,
                        "total": 300,
                        "sell": 210
                    },
                    "tags": [
                        "Boots"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMovementSpeedMod": 25
                    }
                },
                "1004": {
                    "name": "Faerie Charm",
                    "description": "<mainText><stats><attention>50%</attention> Base Mana Regen</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Slightly increases Mana Regen",
                    "into": [
                        "3114",
                        "4642"
                    ],
                    "image": {
                        "full": "1004.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 48,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 250,
                        "purchasable": true,
                        "total": 250,
                        "sell": 175
                    },
                    "tags": [
                        "ManaRegen"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "1006": {
                    "name": "Rejuvenation Bead",
                    "description": "<mainText><stats><attention>100%</attention> Base Health Regen</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Slightly increases Health Regen",
                    "into": [
                        "3109",
                        "3801"
                    ],
                    "image": {
                        "full": "1006.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 96,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 300,
                        "purchasable": true,
                        "total": 300,
                        "sell": 120
                    },
                    "tags": [
                        "HealthRegen"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "1011": {
                    "name": "Giant's Belt",
                    "description": "<mainText><stats><attention>350</attention> Health</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Greatly increases Health",
                    "from": [
                        "1028"
                    ],
                    "into": [
                        "3075",
                        "3084",
                        "3083",
                        "3116",
                        "3143",
                        "3748",
                        "4637",
                        "8001"
                    ],
                    "image": {
                        "full": "1011.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 144,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 900,
                        "sell": 630
                    },
                    "tags": [
                        "Health"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 350
                    },
                    "depth": 2
                },
                "1018": {
                    "name": "Cloak of Agility",
                    "description": "<mainText><stats><attention>15%</attention> Critical Strike Chance</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Increases critical strike chance",
                    "into": [
                        "3124",
                        "6676",
                        "3086",
                        "3031",
                        "3036",
                        "3072",
                        "3095",
                        "3139",
                        "3508",
                        "6671",
                        "6672",
                        "6673",
                        "6675"
                    ],
                    "image": {
                        "full": "1018.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 192,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 600,
                        "purchasable": true,
                        "total": 600,
                        "sell": 420
                    },
                    "tags": [
                        "CriticalStrike"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatCritChanceMod": 0.15
                    }
                },
                "1026": {
                    "name": "Blasting Wand",
                    "description": "<mainText><stats><attention>40</attention> Ability Power</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Moderately increases Ability Power",
                    "into": [
                        "3115",
                        "3116",
                        "6655",
                        "3135",
                        "3152",
                        "3165",
                        "4633",
                        "4637",
                        "6657"
                    ],
                    "image": {
                        "full": "1026.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 240,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 850,
                        "purchasable": true,
                        "total": 850,
                        "sell": 595
                    },
                    "tags": [
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 40
                    }
                },
                "1027": {
                    "name": "Sapphire Crystal",
                    "description": "<mainText><stats><attention>250</attention> Mana</stats></mainText><br>",
                    "colloq": ";blue",
                    "plaintext": "Increases Mana",
                    "into": [
                        "3024",
                        "3803",
                        "3802"
                    ],
                    "image": {
                        "full": "1027.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 288,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 350,
                        "purchasable": true,
                        "total": 350,
                        "sell": 245
                    },
                    "tags": [
                        "Mana"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMPPoolMod": 250
                    }
                },
                "1028": {
                    "name": "Ruby Crystal",
                    "description": "<mainText><stats><attention>150</attention> Health</stats></mainText><br>",
                    "colloq": ";red",
                    "plaintext": "Increases Health",
                    "into": [
                        "6035",
                        "6609",
                        "1011",
                        "3066",
                        "3067",
                        "3803",
                        "3044",
                        "3053",
                        "3211",
                        "3814",
                        "3119",
                        "6664",
                        "6665",
                        "3145",
                        "3165",
                        "3742",
                        "3748",
                        "3801",
                        "4401",
                        "4629",
                        "4635",
                        "6660",
                        "6667"
                    ],
                    "image": {
                        "full": "1028.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 336,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 400,
                        "sell": 280
                    },
                    "tags": [
                        "Health"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 150
                    }
                },
                "1029": {
                    "name": "Cloth Armor",
                    "description": "<mainText><stats><attention>15</attention> Armor</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Slightly increases Armor",
                    "into": [
                        "1031",
                        "3082",
                        "3076",
                        "3193",
                        "3191",
                        "3024",
                        "3047",
                        "3105"
                    ],
                    "image": {
                        "full": "1029.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 384,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 300,
                        "purchasable": true,
                        "total": 300,
                        "sell": 210
                    },
                    "tags": [
                        "Armor"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatArmorMod": 15
                    }
                },
                "1031": {
                    "name": "Chain Vest",
                    "description": "<mainText><stats><attention>40</attention> Armor</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Greatly increases Armor",
                    "from": [
                        "1029"
                    ],
                    "into": [
                        "3068",
                        "3026",
                        "3742",
                        "6333",
                        "6662"
                    ],
                    "image": {
                        "full": "1031.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 432,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 800,
                        "sell": 560
                    },
                    "tags": [
                        "Armor"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatArmorMod": 40
                    },
                    "depth": 2
                },
                "1033": {
                    "name": "Null-Magic Mantle",
                    "description": "<mainText><stats><attention>25</attention> Magic Resist</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Slightly increases Magic Resist",
                    "into": [
                        "3091",
                        "1057",
                        "3193",
                        "3105",
                        "3211",
                        "3111",
                        "3140",
                        "3155",
                        "4632"
                    ],
                    "image": {
                        "full": "1033.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 0,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 450,
                        "purchasable": true,
                        "total": 450,
                        "sell": 315
                    },
                    "tags": [
                        "SpellBlock"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatSpellBlockMod": 25
                    }
                },
                "1035": {
                    "name": "Emberknife",
                    "description": "<mainText><stats></stats><li><passive>Sear:</passive> Damaging Monsters burns them over time.<li><passive>Challenging Path:</passive> Smiting 5 times consumes this item upgrade your Smite to <attention>Challenging Smite</attention> and increases its damage to monsters. Challenging Smite marks champions. During this time, you deal bonus true damage to them on hit and take reduced damage from them.<li><passive>Huntsman:</passive> Killing Large Monsters grants bonus experience.<li><passive>Recoup:</passive> Regen mana when in the Jungle or River. <br><br><rules><status>Consuming</status> this item grants all item effects permanently and increases Smite damage to monsters. If you have gained more gold from minions than jungle monsters, gold and experience from minions is heavily reduced. Healing is not reduced on AoE attacks. If two levels behind the average champion level of the game, monster kills grant bonus experience. </rules><br><br><rules>Only attacks and abilities apply Challenging Smite's burn</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1035.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 48,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 350,
                        "purchasable": false,
                        "total": 350,
                        "sell": 140
                    },
                    "tags": [
                        "LifeSteal",
                        "SpellVamp",
                        "Jungle"
                    ],
                    "maps": {
                        "11": false,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "60",
                        "Effect2Amount": "25",
                        "Effect3Amount": "5",
                        "Effect4Amount": "8"
                    }
                },
                "1036": {
                    "name": "Long Sword",
                    "description": "<mainText><stats><attention>10</attention> Attack Damage</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Slightly increases Attack Damage",
                    "into": [
                        "3071",
                        "1053",
                        "3004",
                        "3179",
                        "3035",
                        "3044",
                        "3046",
                        "3051",
                        "3814",
                        "3123",
                        "3133",
                        "3134",
                        "3155",
                        "6670",
                        "6692"
                    ],
                    "image": {
                        "full": "1036.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 96,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 350,
                        "purchasable": true,
                        "total": 350,
                        "sell": 245
                    },
                    "tags": [
                        "Damage",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 10
                    }
                },
                "1037": {
                    "name": "Pickaxe",
                    "description": "<mainText><stats><attention>25</attention> Attack Damage</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Moderately increases Attack Damage",
                    "into": [
                        "6035",
                        "3077",
                        "3091",
                        "6676",
                        "3031",
                        "3053",
                        "3139",
                        "3153",
                        "6029",
                        "3181",
                        "6333",
                        "6671",
                        "6672",
                        "6675",
                        "6695"
                    ],
                    "image": {
                        "full": "1037.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 144,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 875,
                        "purchasable": true,
                        "total": 875,
                        "sell": 613
                    },
                    "tags": [
                        "Damage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 25
                    }
                },
                "1038": {
                    "name": "B. F. Sword",
                    "description": "<mainText><stats><attention>40</attention> Attack Damage</stats></mainText><br>",
                    "colloq": ";bf",
                    "plaintext": "Greatly increases Attack Damage",
                    "into": [
                        "3026",
                        "3031",
                        "3072",
                        "3095",
                        "3161",
                        "4403"
                    ],
                    "image": {
                        "full": "1038.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 192,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1300,
                        "purchasable": true,
                        "total": 1300,
                        "sell": 910
                    },
                    "tags": [
                        "Damage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 40
                    }
                },
                "1039": {
                    "name": "Hailblade",
                    "description": "<mainText><stats></stats><li><passive>Sear:</passive> Damaging Monsters burns them over time.<li><passive>Chilling Path:</passive> Smiting 5 times consumes this item upgrade your Smite to <attention>Chilling Smite</attention> and increases its damage to monsters. When smiting champions Chilling Smite deals true damage and steals their Move Speed.<li><passive>Huntsman:</passive> Killing Large Monsters grants bonus experience.<li><passive>Recoup:</passive> Regen mana when in the Jungle or River. <br><br><rules><status>Consuming</status> this item grants all item effects permanently and increases Smite damage to monsters. If you have gained more gold from minions than jungle monsters, gold and experience from minions is heavily reduced. Healing is not reduced on AoE attacks. If two levels behind the average champion level of the game, monster kills grant bonus experience. </rules><br><br></mainText><br>",
                    "colloq": ";jungle;Jungle",
                    "plaintext": "Provides damage against Monsters and Mana Regen in the Jungle",
                    "inStore": false,
                    "image": {
                        "full": "1039.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 240,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 350,
                        "purchasable": false,
                        "total": 350,
                        "sell": 140
                    },
                    "tags": [
                        "LifeSteal",
                        "SpellVamp",
                        "Jungle"
                    ],
                    "maps": {
                        "11": false,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "60",
                        "Effect2Amount": "25",
                        "Effect3Amount": "5",
                        "Effect4Amount": "8"
                    }
                },
                "1040": {
                    "name": "Obsidian Edge",
                    "description": "<mainText><stats></stats><li><passive>Sear:</passive> Damaging Monsters burns them over time.<li><passive>Auto Path:</passive> Smiting 5 times consumes this item upgrade your Attack-Smite, increasing its damage to monsters.<li><passive>Huntsman:</passive> Killing Large Monsters grants bonus experience.<li><passive>Recoup:</passive> Regen mana when in the Jungle or River. <br><br><rules><status>Consuming</status> this item grants all item effects permanently and increases Smite damage to monsters. If you have gained more gold from minions than jungle monsters, gold and experience from minions is heavily reduced. Healing is not reduced on AoE attacks. If two levels behind the average champion level of the game, monster kills grant bonus experience. </rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "image": {
                        "full": "1040.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 288,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 350,
                        "purchasable": true,
                        "total": 350,
                        "sell": 140
                    },
                    "tags": [
                        "LifeSteal",
                        "SpellVamp",
                        "Jungle"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "60",
                        "Effect2Amount": "25",
                        "Effect3Amount": "5",
                        "Effect4Amount": "8"
                    }
                },
                "1042": {
                    "name": "Dagger",
                    "description": "<mainText><stats><attention>12%</attention> Attack Speed</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Slightly increases Attack Speed",
                    "into": [
                        "1043",
                        "3124",
                        "6677",
                        "3085",
                        "2015",
                        "3086",
                        "3006",
                        "3051",
                        "6670"
                    ],
                    "image": {
                        "full": "1042.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 336,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 300,
                        "purchasable": true,
                        "total": 300,
                        "sell": 210
                    },
                    "tags": [
                        "AttackSpeed"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "PercentAttackSpeedMod": 0.12
                    }
                },
                "1043": {
                    "name": "Recurve Bow",
                    "description": "<mainText><stats><attention>25%</attention> Attack Speed</stats><br><li><passive>Steeltipped:</passive> Attacks apply physical damage On-Hit.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Greatly increases Attack Speed",
                    "from": [
                        "1042",
                        "1042"
                    ],
                    "into": [
                        "3115",
                        "3153"
                    ],
                    "image": {
                        "full": "1043.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 384,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 1000,
                        "sell": 700
                    },
                    "tags": [
                        "AttackSpeed",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "PercentAttackSpeedMod": 0.25
                    },
                    "depth": 2
                },
                "1052": {
                    "name": "Amplifying Tome",
                    "description": "<mainText><stats><attention>20</attention> Ability Power</stats></mainText><br>",
                    "colloq": ";amptome",
                    "plaintext": "Slightly increases Ability Power",
                    "into": [
                        "6616",
                        "3191",
                        "3108",
                        "3113",
                        "3115",
                        "3116",
                        "3145",
                        "3152",
                        "3504",
                        "3802",
                        "4632",
                        "3916",
                        "4630",
                        "4635",
                        "4636",
                        "4637",
                        "4642",
                        "4644",
                        "6656",
                        "6657"
                    ],
                    "image": {
                        "full": "1052.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 432,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 435,
                        "purchasable": true,
                        "total": 435,
                        "sell": 305
                    },
                    "tags": [
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 20
                    }
                },
                "1053": {
                    "name": "Vampiric Scepter",
                    "description": "<mainText><stats><attention>15</attention> Attack Damage<br><attention>7%</attention> Life Steal</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Basic attacks restore Health",
                    "from": [
                        "1036"
                    ],
                    "into": [
                        "3072",
                        "3074",
                        "3153",
                        "4403",
                        "6673",
                        "6692"
                    ],
                    "image": {
                        "full": "1053.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 0,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 550,
                        "purchasable": true,
                        "total": 900,
                        "sell": 630
                    },
                    "tags": [
                        "Damage",
                        "LifeSteal"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 15,
                        "PercentLifeStealMod": 0.07
                    },
                    "depth": 2
                },
                "1054": {
                    "name": "Doran's Shield",
                    "description": "<mainText><stats><attention>80</attention> Health</stats><br><li><passive>Focus:</passive> Attacks deal additional damage to minions.<li><passive>Recovery:</passive> Restores Health over time.<li><passive>Endure:</passive> Restores Health after taking damage from a champion, large jungle monster, or epic jungle monster. Restoration increases when you are low Health.<br><br><rules><passive>Endure</passive> 66% effective when owned by Ranged champions or when taking damage from area of effect or periodic damage sources.</rules></mainText><br>",
                    "colloq": ";dshield",
                    "plaintext": "Good defensive starting item",
                    "image": {
                        "full": "1054.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 48,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 450,
                        "purchasable": true,
                        "total": 450,
                        "sell": 180
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 80,
                        "FlatHPRegenMod": 1.2
                    },
                    "effect": {
                        "Effect1Amount": "8",
                        "Effect2Amount": "5",
                        "Effect3Amount": "40",
                        "Effect4Amount": "0.66"
                    }
                },
                "1055": {
                    "name": "Doran's Blade",
                    "description": "<mainText><stats><attention>8</attention> Attack Damage<br><attention>80</attention> Health</stats><br><li><passive>Warmonger:</passive> Gain Omnivamp.<br><br><rules>Omnivamp is only 33% effective when dealing area of effect damage or damage through pets.</rules></mainText><br>",
                    "colloq": ";dblade",
                    "plaintext": "Good starting item for attackers",
                    "image": {
                        "full": "1055.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 96,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 450,
                        "purchasable": true,
                        "total": 450,
                        "sell": 180
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "SpellVamp",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 8,
                        "FlatHPPoolMod": 80
                    }
                },
                "1056": {
                    "name": "Doran's Ring",
                    "description": "<mainText><stats><attention>15</attention> Ability Power<br><attention>70</attention> Health</stats><br><li><passive>Focus:</passive> Attacks deal additional damage to minions. <li><passive>Drain:</passive> Restore Mana every second. Damaging an enemy champion increases this amount. If you can't gain Mana, regenerate Health instead. </mainText><br>",
                    "colloq": ";dring",
                    "plaintext": "Good starting item for casters",
                    "image": {
                        "full": "1056.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 144,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 400,
                        "sell": 160
                    },
                    "tags": [
                        "Health",
                        "Lane",
                        "ManaRegen",
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 70,
                        "FlatMagicDamageMod": 15
                    }
                },
                "1057": {
                    "name": "Negatron Cloak",
                    "description": "<mainText><stats><attention>50</attention> Magic Resist</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Moderately increases Magic Resist",
                    "from": [
                        "1033"
                    ],
                    "into": [
                        "6664",
                        "3222",
                        "4401"
                    ],
                    "image": {
                        "full": "1057.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 192,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 450,
                        "purchasable": true,
                        "total": 900,
                        "sell": 630
                    },
                    "tags": [
                        "SpellBlock"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatSpellBlockMod": 50
                    },
                    "depth": 2
                },
                "1058": {
                    "name": "Needlessly Large Rod",
                    "description": "<mainText><stats><attention>60</attention> Ability Power</stats></mainText><br>",
                    "colloq": ";nlr",
                    "plaintext": "Greatly increases Ability Power",
                    "into": [
                        "3003",
                        "3089",
                        "4403",
                        "4645"
                    ],
                    "image": {
                        "full": "1058.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 240,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1250,
                        "purchasable": true,
                        "total": 1250,
                        "sell": 875
                    },
                    "tags": [
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 60
                    }
                },
                "1082": {
                    "name": "Dark Seal",
                    "description": "<mainText><stats><attention>15</attention> Ability Power<br><attention>40</attention> Health</stats><br><li><passive>Glory:</passive> Gain 2 stacks for a champion kill or 1 stack for an assist (up to 10 stacks total). Lose 5 stacks on death.<li><passive>Dread:</passive> Grants <scaleAP>4 Ability Power</scaleAP> per stack of <passive>Glory</passive>.<br><br><rules>Obtained <passive>Glory</passive> stacks are preserved between this item and <rarityLegendary>Mejai's Soulstealer</rarityLegendary>.</rules></mainText><br>",
                    "colloq": ";Noxian",
                    "plaintext": "Provides Ability Power and Mana.  Increases in power as you kill enemies.",
                    "into": [
                        "3041"
                    ],
                    "image": {
                        "full": "1082.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 288,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 350,
                        "purchasable": true,
                        "total": 350,
                        "sell": 140
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 40,
                        "FlatMagicDamageMod": 15
                    }
                },
                "1083": {
                    "name": "Cull",
                    "description": "<mainText><stats><attention>7</attention> Attack Damage</stats><br><li>Attacks restore Health per hit.<li><passive>Reap:</passive> Killing a lane minion grants <goldGain>1</goldGain> additional gold. Killing 100 lane minions grants an additional <goldGain>350</goldGain> bonus gold immediately and disables <passive>Reap</passive>.<br></mainText><br>",
                    "colloq": ";dblade",
                    "plaintext": "Provides damage and Life Steal on hit - Killing minions grant bonus Gold",
                    "image": {
                        "full": "1083.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 336,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 450,
                        "purchasable": true,
                        "total": 450,
                        "sell": 180
                    },
                    "tags": [
                        "Damage",
                        "LifeSteal",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 7
                    }
                },
                "1101": {
                    "name": "Scorchclaw Pup",
                    "description": "<mainText><stats></stats><li><passive>Jungle Companions:</passive> Summon an <font color='#DD2E2E'>Scorchclaw</font> to assist you in the jungle.<li><passive>Scorchclaw's Slash:</passive> When fully grown your companion periodically imbues your next damaging effect to <status>Slow</status> and <passive>damage</passive> enemy champions.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "image": {
                        "full": "1101.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 384,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 450,
                        "purchasable": true,
                        "total": 450,
                        "sell": 180
                    },
                    "tags": [
                        "LifeSteal",
                        "SpellVamp",
                        "Jungle"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "60",
                        "Effect2Amount": "25",
                        "Effect3Amount": "5",
                        "Effect4Amount": "8"
                    }
                },
                "1102": {
                    "name": "Gustwalker Hatchling",
                    "description": "<mainText><stats></stats><li><passive>Jungle Companions:</passive> Summon a <font color='#38A8E8'>Gustwalker</font> to assist you while in the jungle.<li><passive>Gustwalker's Gait:</passive> When fully grown your companion grants <speed>Move Speed</speed> after entering brush or killing monsters.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "image": {
                        "full": "1102.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 432,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 450,
                        "purchasable": true,
                        "total": 450,
                        "sell": 180
                    },
                    "tags": [
                        "LifeSteal",
                        "SpellVamp",
                        "Jungle"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "60",
                        "Effect2Amount": "25",
                        "Effect3Amount": "5",
                        "Effect4Amount": "8"
                    }
                },
                "1103": {
                    "name": "Mosstomper Seedling",
                    "description": "<mainText><stats></stats><li><passive>Jungle Companions:</passive> Summon a <font color='#1CA935'>Mosstomper</font> to assist you while in the jungle. <li><passive>Mosstomper's Courage:</passive> When fully grown your companion grants a <shield>permanent shield</shield> that regenerates either after killing monsters or out of combat. While the shield holds gain 20% Tenacity and Slow Resist.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "image": {
                        "full": "1103.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 0,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 450,
                        "purchasable": true,
                        "total": 450,
                        "sell": 180
                    },
                    "tags": [
                        "LifeSteal",
                        "SpellVamp",
                        "Jungle"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "60",
                        "Effect2Amount": "25",
                        "Effect3Amount": "5",
                        "Effect4Amount": "8"
                    }
                },
                "1104": {
                    "name": "Eye of the Herald",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Crush the Eye of the Herald, summoning Rift Herald. The Herald will proceed down the nearest lane and deal massive damage to any turrets in the way.<br><br><passive>Glimpse of the Void:</passive> Grants Empowered.<br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "consumed": true,
                    "inStore": false,
                    "image": {
                        "full": "1104.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 48,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Trinket",
                        "Active"
                    ],
                    "maps": {
                        "11": false,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "240",
                        "Effect2Amount": "1",
                        "Effect3Amount": "20",
                        "Effect4Amount": "180"
                    }
                },
                "1500": {
                    "name": "Penetrating Bullets",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1500.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 96,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "HealthRegen",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "0.3",
                        "Effect2Amount": "0.4",
                        "Effect3Amount": "1.2",
                        "Effect4Amount": "3"
                    }
                },
                "1501": {
                    "name": "Fortification",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1501.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 144,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "0.5",
                        "Effect2Amount": "5",
                        "Effect3Amount": "0.35"
                    }
                },
                "1502": {
                    "name": "Reinforced Armor",
                    "description": "<mainText><stats></stats><unique>UNIQUE Passive - Reinforced Armor:</unique> Reduces incoming damage by 0% and becomes immune to True Damage when no enemy minions are nearby.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1502.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 192,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Armor",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "66.66"
                    }
                },
                "1503": {
                    "name": "Warden's Eye",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1503.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 240,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "HealthRegen",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "1000"
                    }
                },
                "1504": {
                    "name": "Vanguard",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1504.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 288,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Armor",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": false,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "30",
                        "Effect2Amount": "30",
                        "Effect3Amount": "30",
                        "Effect4Amount": "300"
                    }
                },
                "1505": {
                    "name": "Lightning Rod",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1505.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 336,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Armor",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": false,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {}
                },
                "1506": {
                    "name": "Reinforced Armor",
                    "description": "<mainText><stats></stats><unique>UNIQUE Passive - Base Turret Reinforced Armor:</unique> Reduces incoming damage by 0% and becomes immune to True Damage when no enemy minions are nearby. Base turrets have health regeneration, but cannot regenerate past their current segment. Base turrets are segmented at 33%, 66% and 100% health.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1506.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 384,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Armor",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "66",
                        "Effect2Amount": "66"
                    }
                },
                "1507": {
                    "name": "Overcharged",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1507.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 432,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Armor",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "75",
                        "Effect2Amount": "75"
                    }
                },
                "1508": {
                    "name": "Anti-tower Socks",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1508.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 0,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Armor",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "1509": {
                    "name": "Gusto",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1509.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 48,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Armor",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "1510": {
                    "name": "Phreakish Gusto",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1510.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 96,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Armor",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "1511": {
                    "name": "Super Mech Armor",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1511.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 144,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Armor",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "1512": {
                    "name": "Super Mech Power Field",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1512.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 192,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Armor",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "1515": {
                    "name": "Turret Plating",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1515.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 240,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Armor"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "40",
                        "Effect2Amount": "175",
                        "Effect3Amount": "20",
                        "Effect4Amount": "45",
                        "Effect5Amount": "0.17"
                    }
                },
                "1516": {
                    "name": "Structure Bounty",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1516.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 288,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "HealthRegen",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "0.3",
                        "Effect2Amount": "0.4",
                        "Effect3Amount": "1.2",
                        "Effect4Amount": "3"
                    }
                },
                "1517": {
                    "name": "Structure Bounty",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1517.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 336,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "HealthRegen",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "0.3",
                        "Effect2Amount": "0.4",
                        "Effect3Amount": "1.2",
                        "Effect4Amount": "3"
                    }
                },
                "1518": {
                    "name": "Structure Bounty",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1518.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 384,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "HealthRegen",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "0.3",
                        "Effect2Amount": "0.4",
                        "Effect3Amount": "1.2",
                        "Effect4Amount": "3"
                    }
                },
                "1519": {
                    "name": "Structure Bounty",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1519.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 432,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "HealthRegen",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "0.3",
                        "Effect2Amount": "0.4",
                        "Effect3Amount": "1.2",
                        "Effect4Amount": "3"
                    }
                },
                "1520": {
                    "name": "OvererchargedHA",
                    "description": "",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "image": {
                        "full": "1520.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 0,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Armor",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "75",
                        "Effect2Amount": "75"
                    }
                },
                "2003": {
                    "name": "Health Potion",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Drink the potion to restore <healing>120 Health</healing> over 15 seconds.<br><br><rules>You may carry up to 5 Health Potions.</rules></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Consume to restore Health over time",
                    "stacks": 5,
                    "consumed": true,
                    "image": {
                        "full": "2003.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 48,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 50,
                        "purchasable": true,
                        "total": 50,
                        "sell": 20
                    },
                    "tags": [
                        "HealthRegen",
                        "Consumable",
                        "Lane",
                        "Jungle"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "2010": {
                    "name": "Total Biscuit of Everlasting Will",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Eat the biscuit to restore <healing>8% missing Health</healing> and <scaleMana>Mana</scaleMana> over 5 seconds. Consuming or selling a biscuit permanently grants <scaleMana>40 maximum Mana</scaleMana>. </mainText><br>",
                    "colloq": ";",
                    "plaintext": "",
                    "stacks": 10,
                    "consumed": true,
                    "inStore": false,
                    "hideFromAll": true,
                    "image": {
                        "full": "2010.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 96,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 50,
                        "purchasable": false,
                        "total": 50,
                        "sell": 5
                    },
                    "tags": [],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "10"
                    }
                },
                "2015": {
                    "name": "Kircheis Shard",
                    "description": "<mainText><stats><attention>15%</attention> Attack Speed</stats><br><li><passive>Energized:</passive> Moving and Attacking will generate an Energized Attack.<li><passive>Jolt:</passive> Energized Attacks gain additional magic damage.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Attack speed and a chargable magic hit",
                    "from": [
                        "1042"
                    ],
                    "into": [
                        "3094",
                        "3095"
                    ],
                    "image": {
                        "full": "2015.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 144,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 700,
                        "sell": 490
                    },
                    "tags": [
                        "AttackSpeed"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "PercentAttackSpeedMod": 0.15
                    },
                    "depth": 2
                },
                "2031": {
                    "name": "Refillable Potion",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Consumes a charge to restore <healing>100 Health</healing> over 12 seconds. Holds up to 2 charges and refills upon visiting the shop.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Restores Health over time. Refills at shop.",
                    "into": [
                        "2033"
                    ],
                    "image": {
                        "full": "2031.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 192,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 150,
                        "purchasable": true,
                        "total": 150,
                        "sell": 60
                    },
                    "tags": [
                        "HealthRegen",
                        "Consumable",
                        "Active",
                        "Lane",
                        "Jungle"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "2033": {
                    "name": "Corrupting Potion",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Consumes a charge to restore <healing>100 Health</healing> and <scaleMana>75 Mana</scaleMana> over 12 seconds. During this time, damaging Abilities and Attacks burn enemy champions for <magicDamage>15 (20 if you cannot gain Mana) magic damage</magicDamage> over 3 seconds. Holds up to 3 charges and refills upon visiting the shop.<br><br><rules>Corrupting damage is reduced to 50% when triggered by area of effect or periodic damage.</rules></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Restores Health and Mana over time and boosts combat power - Refills at Shop",
                    "from": [
                        "2031"
                    ],
                    "image": {
                        "full": "2033.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 240,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 350,
                        "purchasable": true,
                        "total": 500,
                        "sell": 200
                    },
                    "tags": [
                        "Active",
                        "Consumable",
                        "HealthRegen",
                        "Lane",
                        "ManaRegen"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "depth": 2
                },
                "2051": {
                    "name": "Guardian's Horn",
                    "description": "<mainText><stats><attention>150</attention> Health</stats><br><li><passive>Recovery:</passive> Restores Health over time.<li><passive>Undaunted:</passive> Blocks damage from attacks and spells from champions.<li><passive>Legendary:</passive> This item counts as a <rarityLegendary>Legendary</rarityLegendary> item.</mainText><br>",
                    "colloq": "Golden Arm of Kobe;Golden Bicep of Kobe;Horn; Horn of the ManWolf; ManWolf",
                    "plaintext": "Good starting item for tanks",
                    "image": {
                        "full": "2051.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 288,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 950,
                        "purchasable": true,
                        "total": 950,
                        "sell": 665
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "Lane"
                    ],
                    "maps": {
                        "11": false,
                        "12": true,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 150,
                        "FlatHPRegenMod": 4
                    },
                    "effect": {
                        "Effect1Amount": "15",
                        "Effect2Amount": "0.25"
                    }
                },
                "2052": {
                    "name": "Poro-Snax",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Serves a scrumptious scoop to a nearby Poro, causing it to grow in size.<br><br><flavorText>This savory blend of free-range, grass-fed Avarosan game hens and organic, non-ZMO Freljordian herbs contains the essential nutrients necessary to keep your Poro purring with pleasure.<br><br>All proceeds will be donated towards fighting Noxian animal cruelty. </flavorText></mainText><br>",
                    "colloq": ";",
                    "plaintext": "",
                    "stacks": 2,
                    "consumed": true,
                    "inStore": false,
                    "image": {
                        "full": "2052.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 336,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "2055": {
                    "name": "Control Ward",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Places a powerful Control Ward that grants vision of the surrounding area. This device will also reveal <keywordStealth>Invisible</keywordStealth> traps, reveal <keywordStealth>Camouflaged</keywordStealth> enemies, and reveal (and disable) enemy Stealth Wards. <br><br><rules>You may carry up to 2 Control Wards. Control Wards do not disable other Control Wards.</rules></mainText><br>",
                    "colloq": "orange;",
                    "plaintext": "Used to disable wards and invisible traps in an area.",
                    "stacks": 2,
                    "consumed": true,
                    "consumeOnFull": true,
                    "image": {
                        "full": "2055.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 384,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 75,
                        "purchasable": true,
                        "total": 75,
                        "sell": 30
                    },
                    "tags": [
                        "Consumable",
                        "Lane",
                        "Stealth",
                        "Vision"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "1",
                        "Effect2Amount": "2"
                    }
                },
                "2065": {
                    "name": "Shurelya's Battlesong",
                    "description": "<mainText><stats><attention>40</attention> Ability Power<br><attention>200</attention> Health<br><attention>20</attention> Ability Haste<br><attention>100%</attention> Base Mana Regen</stats><br><br><active>Active -</active> <active>Inspire:</active> Grants nearby allies Move Speed.<li><passive>Motivate:</passive> Empowering or Protecting another ally Champion grants both allies Move Speed.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Haste.<br></mainText><br>",
                    "colloq": ";shurelya;reverie;",
                    "plaintext": "Activate to speed up nearby allies.",
                    "from": [
                        "3067",
                        "4642"
                    ],
                    "into": [
                        "7020"
                    ],
                    "image": {
                        "full": "2065.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 432,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 750,
                        "purchasable": true,
                        "total": 2500,
                        "sell": 1750
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "ManaRegen",
                        "Active",
                        "CooldownReduction",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 200,
                        "FlatMagicDamageMod": 40
                    },
                    "depth": 3
                },
                "2138": {
                    "name": "Elixir of Iron",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Drink to gain <scaleHealth>300 Health</scaleHealth>, 25% Tenacity, and increased champion size for 3 minutes. While active, moving leaves a path behind that boosts allied champions' <speed>Move Speed by 15%</speed>.<br><br><rules>Drinking a different Elixir will replace the existing one's effects.</rules></mainText><br>",
                    "colloq": ";white",
                    "plaintext": "Temporarily increases defenses. Leaves a trail for allies to follow.",
                    "consumed": true,
                    "consumeOnFull": true,
                    "image": {
                        "full": "2138.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 0,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 500,
                        "sell": 200
                    },
                    "tags": [
                        "Health",
                        "Consumable",
                        "NonbootsMovement",
                        "Tenacity"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "300",
                        "Effect2Amount": "0.25",
                        "Effect3Amount": "3",
                        "Effect4Amount": "0.15",
                        "Effect5Amount": "0.15",
                        "Effect6Amount": "0",
                        "Effect7Amount": "0",
                        "Effect8Amount": "9"
                    }
                },
                "2139": {
                    "name": "Elixir of Sorcery",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Drink to gain <scaleAP>50 Ability Power</scaleAP> and <scaleMana>15% Mana Regen</scaleMana> for 3 minutes. While active, damaging a champion or turret deals <trueDamage>25 bonus true damage</trueDamage> (5s cooldown).<br><br><rules>Champion level <attention>9</attention> or greater required to purchase. Elixir of Sorcery's true damage effect has no cooldown when attacking turrets. Drinking a different Elixir will replace the existing one's effects.</rules></mainText><br>",
                    "colloq": ";blue",
                    "plaintext": "Temporarily grants Ability Power and Bonus Damage to champions and turrets.",
                    "consumed": true,
                    "consumeOnFull": true,
                    "image": {
                        "full": "2139.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 48,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 500,
                        "sell": 200
                    },
                    "tags": [
                        "Consumable",
                        "ManaRegen",
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "50",
                        "Effect2Amount": "50",
                        "Effect3Amount": "25",
                        "Effect4Amount": "3",
                        "Effect5Amount": "5",
                        "Effect6Amount": "3",
                        "Effect7Amount": "0",
                        "Effect8Amount": "9"
                    }
                },
                "2140": {
                    "name": "Elixir of Wrath",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Drink to gain <scaleAD>30 Attack Damage</scaleAD> and <lifeSteal>12% Physical Vamp</lifeSteal> (against champions) for 3 minutes.<br><br><rules>Drinking a different Elixir will replace the existing one's effects.</rules></mainText><br>",
                    "colloq": ";red",
                    "plaintext": "Temporarily grants Attack Damage and heals you when dealing physical damage to champions.",
                    "consumed": true,
                    "consumeOnFull": true,
                    "image": {
                        "full": "2140.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 96,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 500,
                        "sell": 200
                    },
                    "tags": [
                        "Consumable",
                        "Damage",
                        "LifeSteal",
                        "SpellVamp"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "30",
                        "Effect2Amount": "30",
                        "Effect3Amount": "0.12",
                        "Effect4Amount": "3",
                        "Effect5Amount": "0",
                        "Effect6Amount": "0",
                        "Effect7Amount": "0",
                        "Effect8Amount": "9"
                    }
                },
                "2403": {
                    "name": "Minion Dematerializer",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Kill target lane minion (10s ).</mainText><br>",
                    "colloq": ";",
                    "plaintext": "",
                    "stacks": 10,
                    "consumed": true,
                    "inStore": false,
                    "hideFromAll": true,
                    "image": {
                        "full": "2403.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 144,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "2419": {
                    "name": "Commencing Stopwatch",
                    "description": "<mainText><stats></stats><li>Transforms into a <rarityGeneric>Stopwatch</rarityGeneric> after 14 minutes. Takedowns reduce this timer by 2 minutes. That <rarityGeneric>Stopwatch</rarityGeneric> contributes 250 gold to the items it builds into.<br><br><rules>Stopwatch normally contributes 750 gold</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "into": [
                        "2420",
                        "3157",
                        "3026"
                    ],
                    "image": {
                        "full": "2419.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 192,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Active"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "2420": {
                    "name": "Stopwatch",
                    "description": "<mainText><stats></stats><active>Active -</active> <active>Stasis:</active> Use one time only to become <status>Invulnerable</status> and <status>Untargetable</status> for 2.5 seconds, but are prevented from taking any other actions during this time (transforms into a <rarityGeneric>Broken Stopwatch</rarityGeneric>).</mainText><br>",
                    "colloq": ";zhg;zonyas",
                    "plaintext": "Activate to become invincible but unable to take actions",
                    "into": [
                        "3026",
                        "3157"
                    ],
                    "image": {
                        "full": "2420.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 240,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 750,
                        "purchasable": true,
                        "total": 750,
                        "sell": 300
                    },
                    "tags": [
                        "Active"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "0",
                        "Effect2Amount": "2.5"
                    }
                },
                "2421": {
                    "name": "Broken Stopwatch",
                    "description": "<mainText><stats></stats><br><li><passive>Shattered Time:</passive> Stopwatch is broken, but can still be upgraded.<br><br><rules>After breaking one Stopwatch, the shopkeeper will only sell you <rarityGeneric>Broken Stopwatches.</rarityGeneric></rules></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Upgrades to stopwatch",
                    "hideFromAll": true,
                    "into": [
                        "3157",
                        "3026"
                    ],
                    "image": {
                        "full": "2421.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 288,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 750,
                        "purchasable": true,
                        "total": 750,
                        "sell": 300
                    },
                    "tags": [],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "0",
                        "Effect2Amount": "0",
                        "Effect3Amount": "0",
                        "Effect4Amount": "0",
                        "Effect5Amount": "300"
                    }
                },
                "2422": {
                    "name": "Slightly Magical Footwear",
                    "description": "<mainText><stats><attention>25</attention> Move Speed</stats><br><li>Grants an additional <speed>10 Move Speed</speed>. Boots that build from Slightly Magical Footwear retain this bonus Move Speed.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "into": [
                        "3006",
                        "3047",
                        "3020",
                        "3158",
                        "3111",
                        "3117",
                        "3009"
                    ],
                    "image": {
                        "full": "2422.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 336,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 300,
                        "purchasable": false,
                        "total": 300,
                        "sell": 210
                    },
                    "tags": [
                        "Boots"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMovementSpeedMod": 25
                    }
                },
                "2423": {
                    "name": "Perfectly Timed Stopwatch",
                    "description": "<mainText><stats></stats><active>Active -</active> <active>Stasis:</active> Use one time only to become <status>Invulnerable</status> and <status>Untargetable</status> for 2.5 seconds, but are prevented from taking any other actions during this time (transforms into a <rarityGeneric>Broken Stopwatch</rarityGeneric>).</mainText><br>",
                    "colloq": ";zhg;zonyas",
                    "plaintext": "Activate to become invincible but unable to take actions",
                    "inStore": false,
                    "into": [
                        "3157",
                        "3026"
                    ],
                    "image": {
                        "full": "2423.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 384,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 750,
                        "purchasable": false,
                        "total": 750,
                        "sell": 300
                    },
                    "tags": [
                        "Active"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "0",
                        "Effect2Amount": "2.5"
                    }
                },
                "2424": {
                    "name": "Broken Stopwatch",
                    "description": "<mainText><stats></stats><br><li><passive>Shattered Time:</passive> Stopwatch is broken, but can still be upgraded.<br><br><rules>After breaking one Stopwatch, the shopkeeper will only sell you <rarityGeneric>Broken Stopwatches.</rarityGeneric></rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "inStore": false,
                    "hideFromAll": true,
                    "into": [
                        "3157",
                        "3026"
                    ],
                    "image": {
                        "full": "2424.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 432,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 750,
                        "purchasable": false,
                        "total": 750,
                        "sell": 300
                    },
                    "tags": [],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "0",
                        "Effect2Amount": "0",
                        "Effect3Amount": "0",
                        "Effect4Amount": "0",
                        "Effect5Amount": "300"
                    }
                },
                "3001": {
                    "name": "Evenshroud",
                    "description": "<mainText><stats><attention>200</attention> Health<br><attention>20</attention> Ability Haste<br><attention>30</attention> Armor<br><attention>30</attention> Magic Resist</stats><br><li><passive>Coruscation:</passive> After <status>Immobilizing</status> champions or being <status>Immobilized</status>, cause that target and all nearby enemy Champions to take increased damage.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention> Armor and Magic Resist</attention></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Nearby enemies take more magic damage",
                    "from": [
                        "3067",
                        "3105"
                    ],
                    "into": [
                        "7023"
                    ],
                    "image": {
                        "full": "3001.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 0,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 2500,
                        "sell": 1750
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "Armor",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 200,
                        "FlatSpellBlockMod": 30,
                        "FlatArmorMod": 30
                    },
                    "depth": 3
                },
                "3003": {
                    "name": "Archangel's Staff",
                    "description": "<mainText><stats><attention>80</attention> Ability Power<br><attention>500</attention> Mana<br><attention>200</attention> Health<br><attention>10</attention> Ability Haste</stats><br><li><passive>Awe:</passive> Gain Ability Power equal to bonus Mana.<li><passive>Mana Charge:</passive> Strike a target with an Ability to consume a charge and gain 3 bonus Mana, doubled if the target is a champion. Grants a maximum of 360 Mana at which point this item transforms into <rarityLegendary>Seraph's Embrace</rarityLegendary>.<br><br><rules>Gain a new <passive>Mana Charge</passive> every 8 seconds (max 4).</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "Increases Ability Power based on maximum Mana",
                    "from": [
                        "3070",
                        "3067",
                        "1058"
                    ],
                    "image": {
                        "full": "3003.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 48,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 550,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "Mana",
                        "Active",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 200,
                        "FlatMPPoolMod": 500,
                        "FlatMagicDamageMod": 80
                    },
                    "depth": 3
                },
                "3004": {
                    "name": "Manamune",
                    "description": "<mainText><stats><attention>35</attention> Attack Damage<br><attention>500</attention> Mana<br><attention>15</attention> Ability Haste</stats><br><li><passive>Awe:</passive> Gain bonus <scaleAD>Attack Damage equal to your max Mana</scaleAD>. <li><passive>Mana Charge:</passive> Strike a target with an Ability or Attack to consume a charge and gain <scaleMana>3 bonus Mana</scaleMana>, doubled if the target is a champion. Grants a maximum of 360 Mana at which point this item transforms into <rarityLegendary>Muramana</rarityLegendary>.<br><br><rules>Gain a new <passive>Mana Charge</passive> every 8 seconds (max 4).</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "Increases Attack Damage based on maximum Mana",
                    "from": [
                        "3070",
                        "3133",
                        "1036"
                    ],
                    "image": {
                        "full": "3004.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 96,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1050,
                        "purchasable": true,
                        "total": 2900,
                        "sell": 2030
                    },
                    "tags": [
                        "Damage",
                        "Mana",
                        "CooldownReduction",
                        "OnHit",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 35,
                        "FlatMPPoolMod": 500
                    },
                    "depth": 3
                },
                "3006": {
                    "name": "Berserker's Greaves",
                    "description": "<mainText><stats><attention>35%</attention> Attack Speed<br><attention>45</attention> Move Speed</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Enhances Move Speed and Attack Speed",
                    "from": [
                        "1001",
                        "1042"
                    ],
                    "image": {
                        "full": "3006.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 144,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 1100,
                        "sell": 770
                    },
                    "tags": [
                        "AttackSpeed",
                        "Boots"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMovementSpeedMod": 45,
                        "PercentAttackSpeedMod": 0.35
                    },
                    "depth": 2
                },
                "3009": {
                    "name": "Boots of Swiftness",
                    "description": "<mainText><stats><attention>60</attention> Move Speed</stats><br><li>The strength of movement slowing effects is reduced by 25%.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Enhances Move Speed and reduces the effect of slows",
                    "from": [
                        "1001"
                    ],
                    "image": {
                        "full": "3009.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 192,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 600,
                        "purchasable": true,
                        "total": 900,
                        "sell": 630
                    },
                    "tags": [
                        "Boots"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMovementSpeedMod": 60
                    },
                    "effect": {
                        "Effect1Amount": "0.25"
                    },
                    "depth": 2
                },
                "3011": {
                    "name": "Chemtech Putrifier",
                    "description": "<mainText><stats><attention>60</attention> Ability Power<br><attention>20</attention> Ability Haste<br><attention>100%</attention> Base Mana Regen</stats><br><li><passive>Puffcap Toxin:</passive> Dealing magic damage applies <status>25% Grievous Wounds</status> to champions for 3 seconds. Healing or shielding another ally will enhance both of you, causing the next damage to enemy champions to apply <status>40% Grievous Wounds</status>.<br><br><rules><status>Grievous Wounds</status> reduces the effectiveness of Healing and Regeneration effects.</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3916",
                        "4642"
                    ],
                    "image": {
                        "full": "3011.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 240,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 550,
                        "purchasable": true,
                        "total": 2300,
                        "sell": 1610
                    },
                    "tags": [
                        "SpellDamage",
                        "ManaRegen",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 60
                    },
                    "depth": 3
                },
                "3020": {
                    "name": "Sorcerer's Shoes",
                    "description": "<mainText><stats><attention>18</attention> Magic Penetration<br><attention>45</attention> Move Speed</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Enhances Move Speed and magic damage",
                    "from": [
                        "1001"
                    ],
                    "image": {
                        "full": "3020.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 288,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 800,
                        "purchasable": true,
                        "total": 1100,
                        "sell": 770
                    },
                    "tags": [
                        "Boots",
                        "MagicPenetration"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMovementSpeedMod": 45
                    },
                    "effect": {
                        "Effect1Amount": "18"
                    },
                    "depth": 2
                },
                "3024": {
                    "name": "Glacial Buckler",
                    "description": "<mainText><stats><attention>20</attention> Armor<br><attention>250</attention> Mana<br><attention>10</attention> Ability Haste</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Increases Armor and Cooldown Reduction",
                    "from": [
                        "1027",
                        "1029"
                    ],
                    "into": [
                        "3050",
                        "3110"
                    ],
                    "image": {
                        "full": "3024.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 336,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 250,
                        "purchasable": true,
                        "total": 900,
                        "sell": 630
                    },
                    "tags": [
                        "Armor",
                        "Mana",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMPPoolMod": 250,
                        "FlatArmorMod": 20
                    },
                    "depth": 2
                },
                "3026": {
                    "name": "Guardian Angel",
                    "description": "<mainText><stats><attention>45</attention> Attack Damage<br><attention>40</attention> Armor</stats><br><li><passive>Saving Grace:</passive> Upon taking lethal damage, restores <healing>50% base Health</healing> and <scaleMana>30% max Mana</scaleMana> after 4 seconds of stasis (300s cooldown).</mainText><br>",
                    "colloq": ";ga",
                    "plaintext": "Periodically revives champion upon death",
                    "from": [
                        "1038",
                        "1031",
                        "2420"
                    ],
                    "image": {
                        "full": "3026.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 384,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 150,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 1200
                    },
                    "tags": [
                        "Armor",
                        "Damage"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 45,
                        "FlatArmorMod": 40
                    },
                    "effect": {
                        "Effect1Amount": "0.5",
                        "Effect2Amount": "4",
                        "Effect3Amount": "300",
                        "Effect4Amount": "0.3"
                    },
                    "depth": 3
                },
                "3031": {
                    "name": "Infinity Edge",
                    "description": "<mainText><stats><attention>70</attention> Attack Damage<br><attention>20%</attention> Critical Strike Chance</stats><br><li><passive>Perfection:</passive> If you have at least 60% Critical Strike Chance, gain35% Critical Strike Damage.</mainText><br>",
                    "colloq": ";ie",
                    "plaintext": "Massively enhances critical strikes",
                    "from": [
                        "1038",
                        "1037",
                        "1018"
                    ],
                    "image": {
                        "full": "3031.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 432,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 625,
                        "purchasable": true,
                        "total": 3400,
                        "sell": 2380
                    },
                    "tags": [
                        "CriticalStrike",
                        "Damage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 70,
                        "FlatCritChanceMod": 0.2
                    },
                    "depth": 2
                },
                "3033": {
                    "name": "Mortal Reminder",
                    "description": "<mainText><stats><attention>35</attention> Attack Damage<br><attention>20%</attention> Attack Speed<br><attention>20%</attention> Critical Strike Chance<br><attention>7%</attention> Move Speed</stats><br><li><passive>Sepsis:</passive> Dealing physical damage applies <status>25% Grievous Wounds</status> to enemy champions for 3 seconds. Consecutive attacks to that enemy enhances this effect to <status>40% Grievous Wounds</status> against them until the effect is allowed to elapse.<br><br><rules><status>Grievous Wounds</status> reduces the effectiveness of Healing and Regeneration effects.</rules></mainText><br>",
                    "colloq": ";grievous",
                    "plaintext": "Overcomes enemies with high Health recovery and Armor",
                    "from": [
                        "3123",
                        "3086"
                    ],
                    "image": {
                        "full": "3033.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 0,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 750,
                        "purchasable": true,
                        "total": 2600,
                        "sell": 1820
                    },
                    "tags": [
                        "Damage",
                        "CriticalStrike",
                        "AttackSpeed",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 35,
                        "FlatCritChanceMod": 0.2,
                        "PercentMovementSpeedMod": 0.07,
                        "PercentAttackSpeedMod": 0.2
                    },
                    "depth": 3
                },
                "3035": {
                    "name": "Last Whisper",
                    "description": "<mainText><stats><attention>20</attention> Attack Damage<br><attention>18%</attention> Armor Penetration</stats></mainText><br>",
                    "colloq": ";lw",
                    "plaintext": "Overcomes enemies with high Armor",
                    "from": [
                        "1036",
                        "1036"
                    ],
                    "into": [
                        "3036",
                        "6694"
                    ],
                    "image": {
                        "full": "3035.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 48,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 750,
                        "purchasable": true,
                        "total": 1450,
                        "sell": 1015
                    },
                    "tags": [
                        "ArmorPenetration",
                        "Damage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 20
                    },
                    "depth": 2
                },
                "3036": {
                    "name": "Lord Dominik's Regards",
                    "description": "<mainText><stats><attention>30</attention> Attack Damage<br><attention>20%</attention> Critical Strike Chance<br><attention>30%</attention> Armor Penetration</stats><br><li><passive>Giant Slayer:</passive> Deal bonus physical damage against champions with greater max Health than you.</mainText><br>",
                    "colloq": ";lw",
                    "plaintext": "Overcomes enemies with high health and armor",
                    "from": [
                        "3035",
                        "1018"
                    ],
                    "image": {
                        "full": "3036.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 96,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 950,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Damage",
                        "CriticalStrike",
                        "ArmorPenetration"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 30,
                        "FlatCritChanceMod": 0.2
                    },
                    "effect": {
                        "Effect1Amount": "0.2"
                    },
                    "depth": 3
                },
                "3040": {
                    "name": "Seraph's Embrace",
                    "description": "<mainText><stats><attention>80</attention> Ability Power<br><attention>860</attention> Mana<br><attention>250</attention> Health<br><attention>10</attention> Ability Haste</stats><br><li><passive>Awe:</passive> Gain Ability Power based on Mana.<li><passive>Lifeline:</passive> Upon taking damage that would reduce your Health below 30%, gain a Shield based on your current Mana.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "specialRecipe": 3003,
                    "inStore": false,
                    "image": {
                        "full": "3040.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 144,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 3000,
                        "purchasable": false,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "Mana",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 250,
                        "FlatMPPoolMod": 860,
                        "FlatMagicDamageMod": 80
                    }
                },
                "3041": {
                    "name": "Mejai's Soulstealer",
                    "description": "<mainText><stats><attention>20</attention> Ability Power<br><attention>100</attention> Health</stats><br><li><passive>Glory:</passive> Gain 4 stacks for a champion kill or 2 stacks for an assist (up to 25 stacks total). Lose 10 stacks on death.<li><passive>Dread:</passive> Grants <scaleAP>5 Ability Power</scaleAP> per stack of <passive>Glory</passive>. Gain <speed>10% Move Speed</speed> if you have at least 10 stacks.<br><br><rules>Obtained <passive>Glory</passive> stacks are preserved between this item and <rarityGeneric>Dark Seal</rarityGeneric>.</rules></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Grants Ability Power for kills and assists",
                    "from": [
                        "1082"
                    ],
                    "image": {
                        "full": "3041.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 192,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1250,
                        "purchasable": true,
                        "total": 1600,
                        "sell": 1120
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 100,
                        "FlatMagicDamageMod": 20
                    },
                    "depth": 2
                },
                "3042": {
                    "name": "Muramana",
                    "description": "<mainText><stats><attention>35</attention> Attack Damage<br><attention>860</attention> Mana<br><attention>15</attention> Ability Haste</stats><br><li><passive>Awe:</passive> Gain bonus Attack Damage based on Mana. <li><passive>Shock:</passive> Attacks against champions deal additional physical damage.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "specialRecipe": 3004,
                    "inStore": false,
                    "image": {
                        "full": "3042.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 240,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 3000,
                        "purchasable": false,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Damage",
                        "Mana",
                        "CooldownReduction",
                        "OnHit",
                        "ArmorPenetration"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 35,
                        "FlatMPPoolMod": 860
                    }
                },
                "3044": {
                    "name": "Phage",
                    "description": "<mainText><stats><attention>15</attention> Attack Damage<br><attention>200</attention> Health</stats><br><li><passive>Sturdy:</passive> After you deal physical damage to a champion, restore Health over time.<br><br><rules>Restoration reduced for Ranged users.</rules></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Attacks and kills give a small burst of speed",
                    "from": [
                        "1028",
                        "1036"
                    ],
                    "into": [
                        "3053",
                        "3181"
                    ],
                    "image": {
                        "full": "3044.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 288,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 350,
                        "purchasable": true,
                        "total": 1100,
                        "sell": 770
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "Damage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 15,
                        "FlatHPPoolMod": 200
                    },
                    "effect": {
                        "Effect1Amount": "20",
                        "Effect2Amount": "2",
                        "Effect3Amount": "60",
                        "Effect4Amount": "0",
                        "Effect5Amount": "0",
                        "Effect6Amount": "0",
                        "Effect7Amount": "0",
                        "Effect8Amount": "8"
                    },
                    "depth": 2
                },
                "3046": {
                    "name": "Phantom Dancer",
                    "description": "<mainText><stats><attention>20</attention> Attack Damage<br><attention>25%</attention> Attack Speed<br><attention>20%</attention> Critical Strike Chance<br><attention>7%</attention> Move Speed</stats><br><li><passive>Spectral Waltz:</passive> Attacks grant <status>Ghosting</status> and stacking increased Move Speed. In addition, Attacking 4 times causes Spectral Waltz to also grant Attack Speed.<br><br><rules><status>Ghosted</status> units ignore collision with other units.</rules></mainText><br>",
                    "colloq": ";pd",
                    "plaintext": "Move faster while attacking enemies and gain a shield when on low health.",
                    "from": [
                        "1036",
                        "3086",
                        "1036"
                    ],
                    "image": {
                        "full": "3046.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 336,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 850,
                        "purchasable": true,
                        "total": 2600,
                        "sell": 1820
                    },
                    "tags": [
                        "Damage",
                        "CriticalStrike",
                        "AttackSpeed",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 20,
                        "FlatCritChanceMod": 0.2,
                        "PercentMovementSpeedMod": 0.07,
                        "PercentAttackSpeedMod": 0.25
                    },
                    "effect": {
                        "Effect1Amount": "0.24",
                        "Effect2Amount": "10",
                        "Effect3Amount": "550",
                        "Effect4Amount": "0.1",
                        "Effect5Amount": "0.3",
                        "Effect6Amount": "2.5",
                        "Effect7Amount": "90",
                        "Effect8Amount": "240",
                        "Effect9Amount": "600",
                        "Effect10Amount": "40",
                        "Effect11Amount": "5",
                        "Effect12Amount": "0.3",
                        "Effect13Amount": "0.7",
                        "Effect14Amount": "3",
                        "Effect15Amount": "300",
                        "Effect16Amount": "1",
                        "Effect17Amount": "0.4",
                        "Effect18Amount": "9"
                    },
                    "depth": 3
                },
                "3047": {
                    "name": "Plated Steelcaps",
                    "description": "<mainText><stats><attention>20</attention> Armor<br><attention>45</attention> Move Speed</stats><br><li>Reduces incoming damage from Attacks by 12%.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Enhances Move Speed and reduces incoming basic attack damage",
                    "from": [
                        "1001",
                        "1029"
                    ],
                    "image": {
                        "full": "3047.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 384,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 1100,
                        "sell": 770
                    },
                    "tags": [
                        "Armor",
                        "Boots"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMovementSpeedMod": 45,
                        "FlatArmorMod": 20
                    },
                    "effect": {
                        "Effect1Amount": "0.12"
                    },
                    "depth": 2
                },
                "3050": {
                    "name": "Zeke's Convergence",
                    "description": "<mainText><stats><attention>250</attention> Health<br><attention>35</attention> Armor<br><attention>250</attention> Mana<br><attention>20</attention> Ability Haste</stats><br><br><active>Active -</active> <active>Conduit:</active> Designate an <attention>Accomplice</attention>.<br><li><passive>Convergence:</passive> After you <status>Immobilize</status> an enemy, your <attention>Accomplice's</attention> Attacks and Ability hits apply additional damage to that enemy.<br><br><rules>Champions can only be linked by one Zeke's Convergence at a time.</rules></mainText><br>",
                    "colloq": ";haroldandkumar",
                    "plaintext": "Grants you and your ally bonuses when you cast your ultimate.",
                    "from": [
                        "3067",
                        "3024"
                    ],
                    "image": {
                        "full": "3050.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 432,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 700,
                        "purchasable": true,
                        "total": 2400,
                        "sell": 1680
                    },
                    "tags": [
                        "Health",
                        "Armor",
                        "Mana",
                        "Active",
                        "CooldownReduction",
                        "OnHit",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 250,
                        "FlatMPPoolMod": 250,
                        "FlatArmorMod": 35
                    },
                    "depth": 3
                },
                "3051": {
                    "name": "Hearthbound Axe",
                    "description": "<mainText><stats><attention>15</attention> Attack Damage<br><attention>15%</attention> Attack Speed</stats><br><li><passive>Nimble:</passive> Attacking a unit grants Move Speed.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1042",
                        "1036"
                    ],
                    "into": [
                        "3078",
                        "6631",
                        "3091"
                    ],
                    "image": {
                        "full": "3051.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 0,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 350,
                        "purchasable": true,
                        "total": 1000,
                        "sell": 700
                    },
                    "tags": [
                        "Damage",
                        "AttackSpeed",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 15,
                        "PercentAttackSpeedMod": 0.15
                    },
                    "effect": {
                        "Effect1Amount": "20",
                        "Effect2Amount": "2",
                        "Effect3Amount": "60"
                    },
                    "depth": 2
                },
                "3053": {
                    "name": "Sterak's Gage",
                    "description": "<mainText><stats><attention>400</attention> Health</stats><br><li><passive>The Claws that Catch:</passive> Gain base AD as bonus Attack Damage.<li><passive>Lifeline:</passive> Upon taking damage that would reduce your Health below 30%, gain a Shield, decaying over time.</mainText><br>",
                    "colloq": ";juggernaut;primal",
                    "plaintext": "Shields against large bursts of damage",
                    "from": [
                        "1037",
                        "3044",
                        "1028"
                    ],
                    "image": {
                        "full": "3053.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 48,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 725,
                        "purchasable": true,
                        "total": 3100,
                        "sell": 2170
                    },
                    "tags": [
                        "Health",
                        "Damage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 400
                    },
                    "depth": 3
                },
                "3057": {
                    "name": "Sheen",
                    "description": "<mainText><stats></stats><li><passive>Spellblade:</passive> After using an Ability, your next Attack is enhanced with additional damage.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Grants a bonus to next attack after spell cast",
                    "into": [
                        "3078",
                        "3100",
                        "3508",
                        "6632",
                        "6662"
                    ],
                    "image": {
                        "full": "3057.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 96,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 700,
                        "purchasable": true,
                        "total": 700,
                        "sell": 490
                    },
                    "tags": [
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "3065": {
                    "name": "Spirit Visage",
                    "description": "<mainText><stats><attention>450</attention> Health<br><attention>50</attention> Magic Resist<br><attention>10</attention> Ability Haste<br><attention>100%</attention> Base Health Regen</stats><br><li><passive>Boundless Vitality:</passive> Increases all Healing and Shielding effectiveness on you.</mainText><br>",
                    "colloq": ";sv",
                    "plaintext": "Increases Health and healing effects",
                    "from": [
                        "3211",
                        "3067"
                    ],
                    "image": {
                        "full": "3065.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 144,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 850,
                        "purchasable": true,
                        "total": 2900,
                        "sell": 2030
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "HealthRegen",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 450,
                        "FlatSpellBlockMod": 50
                    },
                    "depth": 3
                },
                "3066": {
                    "name": "Winged Moonplate",
                    "description": "<mainText><stats><attention>150</attention> Health</stats><br><li><passive>Flight:</passive> Grants <speed>5% Move Speed</speed>.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1028"
                    ],
                    "into": [
                        "3742",
                        "4401"
                    ],
                    "image": {
                        "full": "3066.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 192,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 800,
                        "sell": 560
                    },
                    "tags": [
                        "Health",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 150
                    },
                    "depth": 2
                },
                "3067": {
                    "name": "Kindlegem",
                    "description": "<mainText><stats><attention>200</attention> Health<br><attention>10</attention> Ability Haste</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Increases Health and Cooldown Reduction",
                    "from": [
                        "1028"
                    ],
                    "into": [
                        "3065",
                        "2065",
                        "3071",
                        "3084",
                        "3083",
                        "6630",
                        "6617",
                        "3190",
                        "3001",
                        "3003",
                        "3050",
                        "3078",
                        "3107",
                        "3109",
                        "3119",
                        "6664",
                        "6665",
                        "3161",
                        "4005",
                        "4403",
                        "4644",
                        "6631",
                        "6632",
                        "6656",
                        "6662",
                        "6667",
                        "8001"
                    ],
                    "image": {
                        "full": "3067.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 240,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 800,
                        "sell": 560
                    },
                    "tags": [
                        "Health",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 200
                    },
                    "depth": 2
                },
                "3068": {
                    "name": "Sunfire Aegis",
                    "description": "<mainText><stats><attention>500</attention> Health<br><attention>50</attention> Armor</stats><br><li><passive>Immolate:</passive> Taking or dealing damage causes you to begin dealing <magicDamage> (15 + 1.75% bonus Health) magic damage</magicDamage> per second to nearby enemies (increased by 25% against minions) for 3 seconds. Damaging Champions or Epic Monsters with this effect adds a stack, increasing subsequent <passive>Immolate</passive> damage by 10% for 5 seconds (max stacks 6).<br></mainText><br>",
                    "colloq": ";",
                    "plaintext": "High armor. Constantly deals damage to nearby enemies. Immobilize enemies to release a wave of damaging flame",
                    "from": [
                        "6660",
                        "1031"
                    ],
                    "image": {
                        "full": "3068.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 288,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 900,
                        "purchasable": true,
                        "total": 2700,
                        "sell": 1890
                    },
                    "tags": [
                        "Health",
                        "Armor",
                        "Aura"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 500,
                        "FlatArmorMod": 50
                    },
                    "depth": 3
                },
                "3070": {
                    "name": "Tear of the Goddess",
                    "description": "<mainText><stats><attention>240</attention> Mana</stats><br><li><passive>Focus:</passive> Attacks deal additional physical damage to Minions.<li><passive>Mana Charge:</passive> Strike a target with an Ability to consume a charge and gain <scaleMana>3 bonus Mana</scaleMana>, doubled if the target is a champion. Grants a maximum of 360 Mana.<br><br><rules>Gain a new <passive>Mana Charge</passive> every 8 seconds (max 4).</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "Increases maximum Mana as Mana is spent",
                    "into": [
                        "3003",
                        "3004",
                        "3119"
                    ],
                    "image": {
                        "full": "3070.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 336,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 400,
                        "sell": 280
                    },
                    "tags": [
                        "Mana",
                        "ManaRegen"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMPPoolMod": 240
                    }
                },
                "3071": {
                    "name": "Black Cleaver",
                    "description": "<mainText><stats><attention>45</attention> Attack Damage<br><attention>350</attention> Health<br><attention>30</attention> Ability Haste</stats><br><li><passive>Carve:</passive> Dealing physical damage to a champion applies a stack of Armor reduction.<li><passive>Rage:</passive> Dealing physical damage to a champion grants Move Speed per stack of <unique>Carve</unique> on them.</mainText><br>",
                    "colloq": ";bc",
                    "plaintext": "Dealing physical damage to enemy champions reduces their Armor",
                    "from": [
                        "3133",
                        "3067",
                        "1036"
                    ],
                    "image": {
                        "full": "3071.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 384,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 850,
                        "purchasable": true,
                        "total": 3100,
                        "sell": 2170
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "CooldownReduction",
                        "OnHit",
                        "NonbootsMovement",
                        "ArmorPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 45,
                        "FlatHPPoolMod": 350
                    },
                    "effect": {
                        "Effect1Amount": "-0.2",
                        "Effect2Amount": "0.05",
                        "Effect3Amount": "6",
                        "Effect4Amount": "6",
                        "Effect5Amount": "0.3",
                        "Effect6Amount": "0",
                        "Effect7Amount": "0",
                        "Effect8Amount": "0",
                        "Effect9Amount": "0",
                        "Effect10Amount": "0.01"
                    },
                    "depth": 3
                },
                "3072": {
                    "name": "Bloodthirster",
                    "description": "<mainText><stats><attention>55</attention> Attack Damage<br><attention>20%</attention> Critical Strike Chance<br><attention>18%</attention> Life Steal</stats><br><li><passive>Ichorshield:</passive> Life Steal from Attacks can now overheal you. Excess Health is stored as a Shield that decays slowly if you haven't dealt or taken damage.</mainText><br>",
                    "colloq": ";bt",
                    "plaintext": "Grants Attack Damage, Life Steal and Life Steal now overheals",
                    "from": [
                        "1038",
                        "1018",
                        "1053"
                    ],
                    "image": {
                        "full": "3072.png",
                        "sprite": "item0.png",
                        "group": "item",
                        "x": 432,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 600,
                        "purchasable": true,
                        "total": 3400,
                        "sell": 2380
                    },
                    "tags": [
                        "Damage",
                        "CriticalStrike",
                        "LifeSteal"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 55,
                        "FlatCritChanceMod": 0.2,
                        "PercentLifeStealMod": 0.18
                    },
                    "depth": 3
                },
                "3074": {
                    "name": "Ravenous Hydra",
                    "description": "<mainText><stats><attention>65</attention> Attack Damage<br><attention>20</attention> Ability Haste<br><attention>10%</attention> Omnivamp</stats><br><li><passive>Cleave:</passive> Attacks and Abilities deal physical damage to other nearby enemies.<br><li><passive>Carnivorous:</passive> Gain AD whenever you kill a minion and 2 times that amount when you kill a Champion, Large Monster, or Siege Minion. Lose 60% of your stacks on death.<br><br></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Melee attacks hit nearby enemies, dealing damage and restoring Health",
                    "from": [
                        "3077",
                        "1053",
                        "3133"
                    ],
                    "image": {
                        "full": "3074.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 0,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 200,
                        "purchasable": true,
                        "total": 3400,
                        "sell": 2380
                    },
                    "tags": [
                        "Damage",
                        "LifeSteal",
                        "CooldownReduction",
                        "SpellVamp",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 65
                    },
                    "depth": 3
                },
                "3075": {
                    "name": "Thornmail",
                    "description": "<mainText><stats><attention>350</attention> Health<br><attention>60</attention> Armor</stats><br><li><passive>Thorns:</passive> When struck by an Attack, deal damage to the attacker and apply 25% <status>Grievous Wounds</status> if they are a champion. Immobilizing enemy champions also applies 40% <status>Grievous Wounds</status>.<br><br><rules><status>Grievous Wounds</status> reduces the effectiveness of Healing and Regeneration effects.</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3076",
                        "1011"
                    ],
                    "image": {
                        "full": "3075.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 48,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1000,
                        "purchasable": true,
                        "total": 2700,
                        "sell": 1890
                    },
                    "tags": [
                        "Health",
                        "Armor"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 350,
                        "FlatArmorMod": 60
                    },
                    "depth": 3
                },
                "3076": {
                    "name": "Bramble Vest",
                    "description": "<mainText><stats><attention>30</attention> Armor</stats><br><li><passive>Thorns:</passive> When struck by an Attack, deal damage to the attacker and apply 25% Grievous Wounds if they are a champion.<br><br><rules><status>Grievous Wounds</status> reduces the effectiveness of Healing and Regeneration effects.</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1029",
                        "1029"
                    ],
                    "into": [
                        "3075"
                    ],
                    "image": {
                        "full": "3076.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 96,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 200,
                        "purchasable": true,
                        "total": 800,
                        "sell": 560
                    },
                    "tags": [
                        "Armor"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatArmorMod": 30
                    },
                    "depth": 2
                },
                "3077": {
                    "name": "Tiamat",
                    "description": "<mainText><stats><attention>25</attention> Attack Damage</stats><br><li><passive>Cleave:</passive> Attacks deal physical damage to other nearby enemies. <br><br>Cleave does not trigger on structures.<br><br>Item performance differs for melee and ranged users.<br></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Melee attacks hit nearby enemies",
                    "from": [
                        "1037"
                    ],
                    "into": [
                        "3074",
                        "3748"
                    ],
                    "image": {
                        "full": "3077.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 144,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 325,
                        "purchasable": true,
                        "total": 1200,
                        "sell": 840
                    },
                    "tags": [
                        "Damage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 25
                    },
                    "depth": 2
                },
                "3078": {
                    "name": "Trinity Force",
                    "description": "<mainText><stats><attention>35</attention> Attack Damage<br><attention>30%</attention> Attack Speed<br><attention>300</attention> Health<br><attention>20</attention> Ability Haste</stats><br><li><passive>Threefold Strike:</passive> Attacks grant Move Speed. If the target is a champion, increase your base Attack Damage, stacking.<li><passive>Spellblade:</passive> After using an Ability, your next Attack is enhanced with additional damage.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Attack Damage, Ability Haste, and Move Speed.</mainText><br>",
                    "colloq": ";triforce;tons of damage",
                    "plaintext": "Tons of Damage",
                    "from": [
                        "3057",
                        "3051",
                        "3067"
                    ],
                    "into": [
                        "7018"
                    ],
                    "image": {
                        "full": "3078.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 192,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 833,
                        "purchasable": true,
                        "total": 3333,
                        "sell": 2333
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "AttackSpeed",
                        "CooldownReduction",
                        "OnHit",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 35,
                        "FlatHPPoolMod": 300,
                        "PercentAttackSpeedMod": 0.3
                    },
                    "effect": {
                        "Effect1Amount": "25",
                        "Effect2Amount": "60",
                        "Effect3Amount": "2",
                        "Effect4Amount": "1.5",
                        "Effect5Amount": "1.5"
                    },
                    "depth": 3
                },
                "3082": {
                    "name": "Warden's Mail",
                    "description": "<mainText><stats><attention>40</attention> Armor</stats><br><li><passive>Rock Solid:</passive> Reduce incoming damage from Attacks.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1029",
                        "1029"
                    ],
                    "into": [
                        "3110",
                        "3143"
                    ],
                    "image": {
                        "full": "3082.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 240,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 1000,
                        "sell": 700
                    },
                    "tags": [
                        "Armor"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatArmorMod": 40
                    },
                    "depth": 2
                },
                "3083": {
                    "name": "Warmog's Armor",
                    "description": "<mainText><stats><attention>800</attention> Health<br><attention>10</attention> Ability Haste<br><attention>200%</attention> Base Health Regen</stats><br><li><passive>Warmog's Heart:</passive> If you have at least 1100 bonus Health, restore max Health per second if damage hasn't been taken within 6 seconds.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Grants massive Health and Health Regen",
                    "from": [
                        "1011",
                        "3067",
                        "3801"
                    ],
                    "image": {
                        "full": "3083.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 288,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 800
                    },
                    "depth": 3
                },
                "3084": {
                    "name": "Heartsteel",
                    "description": "<mainText><stats><attention>800</attention> Health<br><attention>200%</attention> Base Health Regen<br><attention>20</attention> Ability Haste</stats><br><li><passive>Colossal Consumption:</passive> Charge up a powerful attack against a champion over 3s while within 700 range of them. The charged attack deals 125 + <scalehealth>6%</scalehealth> of your max Health as bonus physical damage, and grants you 10% of that amount as permanent max Health. (30s) cooldown per target.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention>1%</attention> Increased Health & <attention>6%</attention> Champion Size.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Restores Health on kill or assist",
                    "from": [
                        "1011",
                        "3067",
                        "3801"
                    ],
                    "into": [
                        "7025"
                    ],
                    "image": {
                        "full": "3084.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 336,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 700,
                        "purchasable": true,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 800
                    },
                    "depth": 3
                },
                "3085": {
                    "name": "Runaan's Hurricane",
                    "description": "<mainText><stats><attention>45%</attention> Attack Speed<br><attention>20%</attention> Critical Strike Chance<br><attention>7%</attention> Move Speed</stats><br><li><passive>Wind's Fury:</passive> When Attacking, bolts are fired at up to 2 enemies near the target. Bolts apply On-Hit effects and can Critically Strike.<br><br><rules>Item is for Ranged champions only.</rules></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Ranged attacks fire two bolts at nearby enemies",
                    "from": [
                        "1042",
                        "3086",
                        "1042"
                    ],
                    "image": {
                        "full": "3085.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 384,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 950,
                        "purchasable": true,
                        "total": 2600,
                        "sell": 1820
                    },
                    "tags": [
                        "CriticalStrike",
                        "AttackSpeed",
                        "OnHit",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatCritChanceMod": 0.2,
                        "PercentMovementSpeedMod": 0.07,
                        "PercentAttackSpeedMod": 0.45
                    },
                    "effect": {
                        "Effect1Amount": "0",
                        "Effect2Amount": "40",
                        "Effect3Amount": "2",
                        "Effect4Amount": "0",
                        "Effect5Amount": "40",
                        "Effect6Amount": "1"
                    },
                    "depth": 3
                },
                "3086": {
                    "name": "Zeal",
                    "description": "<mainText><stats><attention>18%</attention> Attack Speed<br><attention>15%</attention> Critical Strike Chance</stats><br><li><passive>Zealous:</passive> Gain <speed>7% Move Speed</speed>.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Slight bonuses to Critical Strike Chance, Move Speed and Attack Speed",
                    "from": [
                        "1018",
                        "1042"
                    ],
                    "into": [
                        "3085",
                        "3033",
                        "3046",
                        "3094",
                        "4403"
                    ],
                    "image": {
                        "full": "3086.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 432,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 150,
                        "purchasable": true,
                        "total": 1050,
                        "sell": 735
                    },
                    "tags": [
                        "AttackSpeed",
                        "CriticalStrike",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatCritChanceMod": 0.15,
                        "PercentAttackSpeedMod": 0.18
                    },
                    "effect": {
                        "Effect1Amount": "0.07"
                    },
                    "depth": 2
                },
                "3089": {
                    "name": "Rabadon's Deathcap",
                    "description": "<mainText><stats><attention>120</attention> Ability Power</stats><br><li><passive>Magical Opus:</passive> Increases your total <scaleAP>Ability Power by 35%</scaleAP>.</mainText><br>",
                    "colloq": ";dc;banksys;hat",
                    "plaintext": "Massively increases Ability Power",
                    "from": [
                        "1058",
                        "1058"
                    ],
                    "image": {
                        "full": "3089.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 0,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1100,
                        "purchasable": true,
                        "total": 3600,
                        "sell": 2520
                    },
                    "tags": [
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 120
                    },
                    "depth": 2
                },
                "3091": {
                    "name": "Wit's End",
                    "description": "<mainText><stats><attention>40</attention> Attack Damage<br><attention>40%</attention> Attack Speed<br><attention>40</attention> Magic Resist</stats><br><li><passive>Fray:</passive> Attacks apply magic damage On-Hit and grant Move Speed.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Resist magic damage and claw your way back to life.",
                    "from": [
                        "3051",
                        "1033",
                        "1037"
                    ],
                    "image": {
                        "full": "3091.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 48,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 775,
                        "purchasable": true,
                        "total": 3100,
                        "sell": 2170
                    },
                    "tags": [
                        "SpellBlock",
                        "Damage",
                        "AttackSpeed",
                        "OnHit",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 40,
                        "FlatSpellBlockMod": 40,
                        "PercentAttackSpeedMod": 0.4
                    },
                    "depth": 3
                },
                "3094": {
                    "name": "Rapid Firecannon",
                    "description": "<mainText><stats><attention>35%</attention> Attack Speed<br><attention>20%</attention> Critical Strike Chance<br><attention>7%</attention> Move Speed</stats><br><li><passive>Energized:</passive> Moving and Attacking will generate an Energized Attack.<li><passive>Sharpshooter:</passive> Your Energized Attack applies bonus damage. In addition, Energized attacks gain Attack Range.<br><br><rules>Attack Range cannot increase more than 150 units.</rules></mainText><br>",
                    "colloq": ";canon;rapidfire;rfc",
                    "plaintext": "Movement builds charges that release a sieging fire attack on release",
                    "from": [
                        "3086",
                        "2015"
                    ],
                    "image": {
                        "full": "3094.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 96,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 750,
                        "purchasable": true,
                        "total": 2500,
                        "sell": 1750
                    },
                    "tags": [
                        "CriticalStrike",
                        "AttackSpeed",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatCritChanceMod": 0.2,
                        "PercentMovementSpeedMod": 0.07,
                        "PercentAttackSpeedMod": 0.35
                    },
                    "depth": 3
                },
                "3095": {
                    "name": "Stormrazor",
                    "description": "<mainText><stats><attention>45</attention> Attack Damage<br><attention>15%</attention> Attack Speed<br><attention>20%</attention> Critical Strike Chance</stats><br><li><passive>Energized:</passive> Moving and Attacking will generate an Energized Attack.<li><passive>Paralyze:</passive> Your Energized Attack gains bonus magic damage. In addition, Energized Attacks slow enemies.<br></mainText><br>",
                    "colloq": ";Windblade",
                    "plaintext": "Tremendously empower other Energized effects.",
                    "from": [
                        "1038",
                        "1018",
                        "2015"
                    ],
                    "image": {
                        "full": "3095.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 144,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 100,
                        "purchasable": true,
                        "total": 2700,
                        "sell": 1890
                    },
                    "tags": [
                        "Damage",
                        "CriticalStrike",
                        "AttackSpeed",
                        "Slow"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 45,
                        "FlatCritChanceMod": 0.2,
                        "PercentAttackSpeedMod": 0.15
                    },
                    "effect": {
                        "Effect1Amount": "120",
                        "Effect2Amount": "120",
                        "Effect3Amount": "5",
                        "Effect4Amount": "0.35",
                        "Effect5Amount": "0.75",
                        "Effect6Amount": "0.5"
                    },
                    "depth": 3
                },
                "3100": {
                    "name": "Lich Bane",
                    "description": "<mainText><stats><attention>75</attention> Ability Power<br><attention>15</attention> Ability Haste<br><attention>8%</attention> Move Speed</stats><br><li><passive>Spellblade:</passive> After using an Ability, your next Attack is enhanced with additional magic damage.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Grants a bonus to next attack after spell cast",
                    "from": [
                        "3057",
                        "3113",
                        "3108"
                    ],
                    "image": {
                        "full": "3100.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 192,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 550,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "SpellDamage",
                        "OnHit",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "PercentMovementSpeedMod": 0.08,
                        "FlatMagicDamageMod": 75
                    },
                    "depth": 3
                },
                "3102": {
                    "name": "Banshee's Veil",
                    "description": "<mainText><stats><attention>80</attention> Ability Power<br><attention>45</attention> Magic Resist<br><attention>10</attention> Ability Haste</stats><br><li><passive>Annul:</passive> Grants a Spell Shield that blocks the next enemy Ability.<br><br><rules>Item cooldown is restarted if you take damage from champions before it is completed.</rules></mainText><br>",
                    "colloq": ";bv",
                    "plaintext": "Periodically blocks enemy abilities",
                    "from": [
                        "3108",
                        "4632"
                    ],
                    "image": {
                        "full": "3102.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 240,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 700,
                        "purchasable": true,
                        "total": 2600,
                        "sell": 1820
                    },
                    "tags": [
                        "SpellBlock",
                        "SpellDamage",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatSpellBlockMod": 45,
                        "FlatMagicDamageMod": 80
                    },
                    "effect": {
                        "Effect1Amount": "40",
                        "Effect2Amount": "45",
                        "Effect3Amount": "10",
                        "Effect4Amount": "-0.1",
                        "Effect5Amount": "8",
                        "Effect6Amount": "2"
                    },
                    "depth": 3
                },
                "3105": {
                    "name": "Aegis of the Legion",
                    "description": "<mainText><stats><attention>30</attention> Armor<br><attention>30</attention> Magic Resist<br><attention>10</attention> Ability Haste</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Grants Armor and Magic Resistance",
                    "from": [
                        "1033",
                        "1029"
                    ],
                    "into": [
                        "3190",
                        "3193",
                        "3001",
                        "6665",
                        "4403",
                        "6667"
                    ],
                    "image": {
                        "full": "3105.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 288,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 450,
                        "purchasable": true,
                        "total": 1200,
                        "sell": 840
                    },
                    "tags": [
                        "SpellBlock",
                        "Armor",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatSpellBlockMod": 30,
                        "FlatArmorMod": 30
                    },
                    "depth": 2
                },
                "3107": {
                    "name": "Redemption",
                    "description": "<mainText><stats><attention>16%</attention> Heal and Shield Power<br><attention>200</attention> Health<br><attention>15</attention> Ability Haste<br><attention>100%</attention> Base Mana Regen</stats><br><br><active>Active -</active> <active>Intervention:</active> Target an area within. After 2.5 seconds, call down a beam of light to restore Health to allies and damage enemy champions.<br><br><rules>Item can be activated whilst dead. Damage and healing reduced by 50% if the target has recently been affected by another <active>Intervention</active>. Strength of level-scaling effects are based on the ally's level.</rules></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Activate to heal allies and damage enemies in an area",
                    "from": [
                        "3067",
                        "3114"
                    ],
                    "image": {
                        "full": "3107.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 336,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 700,
                        "purchasable": true,
                        "total": 2300,
                        "sell": 1610
                    },
                    "tags": [
                        "Health",
                        "ManaRegen",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 200
                    },
                    "depth": 3
                },
                "3108": {
                    "name": "Fiendish Codex",
                    "description": "<mainText><stats><attention>35</attention> Ability Power<br><attention>10</attention> Ability Haste</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Increases Ability Power and Cooldown Reduction",
                    "from": [
                        "1052"
                    ],
                    "into": [
                        "3100",
                        "3102",
                        "6653",
                        "3157",
                        "4628",
                        "4629",
                        "4636"
                    ],
                    "image": {
                        "full": "3108.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 384,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 465,
                        "purchasable": true,
                        "total": 900,
                        "sell": 630
                    },
                    "tags": [
                        "SpellDamage",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 35
                    },
                    "effect": {
                        "Effect1Amount": "-0.1"
                    },
                    "depth": 2
                },
                "3109": {
                    "name": "Knight's Vow",
                    "description": "<mainText><stats><attention>400</attention> Health<br><attention>20</attention> Ability Haste<br><attention>200%</attention> Base Health Regen</stats><br><br><active>Active -</active> <active>Pledge:</active> Designate an ally who is <attention>Worthy</attention>..<br><li><passive>Sacrifice:</passive> While your <attention>Worthy</attention> ally is nearby, redirect damage they take to you and heal based on the damage dealt by your <attention>Worthy</attention> ally to Champions.<br></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Partner with an ally to protect each other",
                    "from": [
                        "3801",
                        "3067",
                        "1006"
                    ],
                    "image": {
                        "full": "3109.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 432,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 2300,
                        "sell": 1610
                    },
                    "tags": [
                        "Health",
                        "Armor",
                        "Aura",
                        "Active",
                        "CooldownReduction",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 400
                    },
                    "depth": 3
                },
                "3110": {
                    "name": "Frozen Heart",
                    "description": "<mainText><stats><attention>90</attention> Armor<br><attention>400</attention> Mana<br><attention>20</attention> Ability Haste</stats><br><li><passive>Winter's Caress:</passive> Reduces the <attackSpeed>Attack Speed</attackSpeed> of nearby enemies.<li><passive>Rock Solid:</passive> Reduce incoming damage from Attacks.</mainText><br>",
                    "colloq": ";fh",
                    "plaintext": "Massively increases Armor and slows enemy basic attacks",
                    "from": [
                        "3082",
                        "3024"
                    ],
                    "image": {
                        "full": "3110.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 0,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 800,
                        "purchasable": true,
                        "total": 2700,
                        "sell": 1890
                    },
                    "tags": [
                        "Armor",
                        "Mana",
                        "Aura",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMPPoolMod": 400,
                        "FlatArmorMod": 90
                    },
                    "depth": 3
                },
                "3111": {
                    "name": "Mercury's Treads",
                    "description": "<mainText><stats><attention>25</attention> Magic Resist<br><attention>45</attention> Move Speed<br><attention>30%</attention> Tenacity</stats><br><br><rules>Tenacity reduces the duration of <status>Stun</status>, <status>Slow</status>, <status>Taunt</status>, <status>Fear</status>, <status>Silence</status>, <status>Blind</status>, <status>Polymorph</status> and <status>Immobilizing</status> effects. It has no effect on <status>Airborne</status> or <status>Suppression</status>.</rules></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Increases Move Speed and reduces duration of disabling effects",
                    "from": [
                        "1001",
                        "1033"
                    ],
                    "image": {
                        "full": "3111.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 48,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 350,
                        "purchasable": true,
                        "total": 1100,
                        "sell": 770
                    },
                    "tags": [
                        "Boots",
                        "SpellBlock",
                        "Tenacity"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMovementSpeedMod": 45,
                        "FlatSpellBlockMod": 25
                    },
                    "depth": 2
                },
                "3112": {
                    "name": "Guardian's Orb",
                    "description": "<mainText><stats><attention>50</attention> Ability Power<br><attention>150</attention> Health</stats><br><li><passive>Recovery:</passive> Restores Mana over time. If you can't gain mana, restores Health instead.<li><passive>Legendary:</passive> This item counts as a <rarityLegendary>Legendary</rarityLegendary> item.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Good starting item for mages",
                    "image": {
                        "full": "3112.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 96,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 950,
                        "purchasable": true,
                        "total": 950,
                        "sell": 665
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "ManaRegen",
                        "Lane"
                    ],
                    "maps": {
                        "11": false,
                        "12": true,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 150,
                        "FlatMagicDamageMod": 50
                    },
                    "effect": {
                        "Effect1Amount": "3"
                    }
                },
                "3113": {
                    "name": "Aether Wisp",
                    "description": "<mainText><stats><attention>30</attention> Ability Power</stats><br><li><passive>Glide:</passive> Gain <speed>5% Move Speed</speed>.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Increases Ability Power and Move Speed",
                    "from": [
                        "1052"
                    ],
                    "into": [
                        "3100",
                        "4629"
                    ],
                    "image": {
                        "full": "3113.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 144,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 415,
                        "purchasable": true,
                        "total": 850,
                        "sell": 595
                    },
                    "tags": [
                        "NonbootsMovement",
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 30
                    },
                    "depth": 2
                },
                "3114": {
                    "name": "Forbidden Idol",
                    "description": "<mainText><stats><attention>50%</attention> Base Mana Regen<br><attention>8%</attention> Heal and Shield Power</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Increases Heal and Shield Power, Mana Regeneration, and Cooldown Reduction",
                    "from": [
                        "1004"
                    ],
                    "into": [
                        "6616",
                        "3107",
                        "3222",
                        "3504"
                    ],
                    "image": {
                        "full": "3114.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 192,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 550,
                        "purchasable": true,
                        "total": 800,
                        "sell": 560
                    },
                    "tags": [
                        "ManaRegen"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "depth": 2
                },
                "3115": {
                    "name": "Nashor's Tooth",
                    "description": "<mainText><stats><attention>100</attention> Ability Power<br><attention>50%</attention> Attack Speed</stats><br><li><passive>Icathian Bite:</passive> Attacks apply magic damage <OnHit>On-Hit</OnHit>.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Increases Attack Speed, Ability Power, and Cooldown Reduction",
                    "from": [
                        "1043",
                        "1026",
                        "1052"
                    ],
                    "image": {
                        "full": "3115.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 240,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 715,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "AttackSpeed",
                        "SpellDamage",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 100,
                        "PercentAttackSpeedMod": 0.5
                    },
                    "depth": 3
                },
                "3116": {
                    "name": "Rylai's Crystal Scepter",
                    "description": "<mainText><stats><attention>75</attention> Ability Power<br><attention>400</attention> Health</stats><br><li><passive>Rimefrost:</passive> Damaging Abilities <status>Slow</status> enemies.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Abilities slow enemies",
                    "from": [
                        "1026",
                        "1011",
                        "1052"
                    ],
                    "image": {
                        "full": "3116.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 288,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 415,
                        "purchasable": true,
                        "total": 2600,
                        "sell": 1820
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "Slow"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 400,
                        "FlatMagicDamageMod": 75
                    },
                    "effect": {
                        "Effect1Amount": "-0.3",
                        "Effect2Amount": "-0.3",
                        "Effect3Amount": "-0.3",
                        "Effect4Amount": "1",
                        "Effect5Amount": "1",
                        "Effect6Amount": "1"
                    },
                    "depth": 3
                },
                "3117": {
                    "name": "Mobility Boots",
                    "description": "<mainText><stats></stats><attention>25</attention> Move Speed <li>When out of combat for at least 5 seconds, increase this item's effect to <attention>115</attention>.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Greatly enhances Move Speed when out of combat",
                    "from": [
                        "1001"
                    ],
                    "image": {
                        "full": "3117.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 336,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 700,
                        "purchasable": true,
                        "total": 1000,
                        "sell": 700
                    },
                    "tags": [
                        "Boots"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMovementSpeedMod": 115
                    },
                    "effect": {
                        "Effect1Amount": "0",
                        "Effect2Amount": "0",
                        "Effect3Amount": "0",
                        "Effect4Amount": "0",
                        "Effect5Amount": "0",
                        "Effect6Amount": "0",
                        "Effect7Amount": "0",
                        "Effect8Amount": "25"
                    },
                    "depth": 2
                },
                "3119": {
                    "name": "Winter's Approach",
                    "description": "<mainText><stats><attention>400</attention> Health<br><attention>500</attention> Mana<br><attention>15</attention> Ability Haste</stats><br><li><passive>Awe:</passive> Gain bonus <scaleHealth>Health equal to Total Mana</scaleHealth>.<li><passive>Mana Charge:</passive> Strike a target with an Ability or Attack to consume a charge and gain <scaleMana>3 bonus Mana</scaleMana>, doubled if the target is a champion. Grants a maximum of 360 Mana at which point this item transforms into <rarityLegendary>Fimbulwinter</rarityLegendary>.<br><br><rules>Gain a new <passive>Mana Charge</passive> every 8 seconds (max 4).</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3070",
                        "3067",
                        "1028"
                    ],
                    "image": {
                        "full": "3119.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 384,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1000,
                        "purchasable": true,
                        "total": 2600,
                        "sell": 1820
                    },
                    "tags": [
                        "Health",
                        "Mana",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 400,
                        "FlatMPPoolMod": 500
                    },
                    "depth": 3
                },
                "3121": {
                    "name": "Fimbulwinter",
                    "description": "<mainText><stats><attention>350</attention> Health<br><attention>860</attention> Mana<br><attention>15</attention> Ability Haste</stats><li><passive>Awe:</passive> Gain bonus Health based on Mana.<li><passive>Everlasting:</passive> <status>Immobilizing</status> or <status>Slowing</status> an enemy champion consumes current Mana and grants a Shield. The Shield is increased if more than one enemy is nearby.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "specialRecipe": 3119,
                    "inStore": false,
                    "image": {
                        "full": "3121.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 432,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 2700,
                        "purchasable": false,
                        "total": 2700,
                        "sell": 1890
                    },
                    "tags": [
                        "Health",
                        "Mana",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 350,
                        "FlatMPPoolMod": 860
                    }
                },
                "3123": {
                    "name": "Executioner's Calling",
                    "description": "<mainText><stats><attention>20</attention> Attack Damage</stats><br><li><passive>Rend:</passive> Dealing physical damage applies <status>25% Grievous Wounds</status> to champions for 3 seconds. <br><br><rules><status>Grievous Wounds</status> reduces the effectiveness of Healing and Regeneration effects.</rules></mainText><br>",
                    "colloq": ";grievous",
                    "plaintext": "Overcomes enemies with high health gain",
                    "from": [
                        "1036"
                    ],
                    "into": [
                        "6609",
                        "3033"
                    ],
                    "image": {
                        "full": "3123.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 0,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 450,
                        "purchasable": true,
                        "total": 800,
                        "sell": 560
                    },
                    "tags": [
                        "Damage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 20
                    },
                    "effect": {
                        "Effect1Amount": "3"
                    },
                    "depth": 2
                },
                "3124": {
                    "name": "Guinsoo's Rageblade",
                    "description": "<mainText><stats><attention>45%</attention> Attack Speed<br><attention>20%</attention> Critical Strike Chance</stats><br><li><passive>Wrath:</passive> Your Critical Strike Chance is converted into <OnHit>On-Hit</OnHit> damage. Gain <physicalDamage>40</physicalDamage> <OnHit>On-Hit</OnHit> for each 20% Critical Strike Chance converted.<li><passive>Seething Strike:</passive> Every third Attack applies your On-Hit effects twice.<br><br><rules><passive>Wrath</passive> cannot benefit from more than 100% Critical Strike Chance. <passive>Wrath's</passive> On-Hit damage conversion is affected by Critical Strike damage modifiers. </rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6677",
                        "1018",
                        "1042"
                    ],
                    "image": {
                        "full": "3124.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 48,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 900,
                        "purchasable": true,
                        "total": 2600,
                        "sell": 1820
                    },
                    "tags": [
                        "CriticalStrike",
                        "AttackSpeed",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatCritChanceMod": 0.2,
                        "PercentAttackSpeedMod": 0.45
                    },
                    "effect": {
                        "Effect1Amount": "0.08",
                        "Effect2Amount": "2.5",
                        "Effect3Amount": "2.5",
                        "Effect4Amount": "5",
                        "Effect5Amount": "6",
                        "Effect6Amount": "0.1",
                        "Effect7Amount": "0.1",
                        "Effect8Amount": "15",
                        "Effect9Amount": "1",
                        "Effect10Amount": "3",
                        "Effect11Amount": "0",
                        "Effect12Amount": "0",
                        "Effect13Amount": "3"
                    },
                    "depth": 3
                },
                "3133": {
                    "name": "Caulfield's Warhammer",
                    "description": "<mainText><stats><attention>25</attention> Attack Damage<br><attention>10</attention> Ability Haste</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Attack Damage and Cooldown Reduction",
                    "stacks": 0,
                    "from": [
                        "1036",
                        "1036"
                    ],
                    "into": [
                        "6609",
                        "3071",
                        "3004",
                        "6630",
                        "3074",
                        "3142",
                        "3156",
                        "3161",
                        "3508",
                        "6333",
                        "6632",
                        "6675",
                        "6691",
                        "6693",
                        "6694",
                        "6696"
                    ],
                    "image": {
                        "full": "3133.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 96,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 1100,
                        "sell": 770
                    },
                    "tags": [
                        "Damage",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 25
                    },
                    "depth": 2
                },
                "3134": {
                    "name": "Serrated Dirk",
                    "description": "<mainText><stats><attention>30</attention> Attack Damage</stats><br><li><passive>Gouge:</passive> Gain <scaleLethality>10 Lethality</scaleLethality>.</mainText><br>",
                    "colloq": ";lethality",
                    "plaintext": "Increases Attack Damage and Lethality",
                    "stacks": 0,
                    "from": [
                        "1036",
                        "1036"
                    ],
                    "into": [
                        "3142",
                        "6676",
                        "3179",
                        "3814",
                        "6691",
                        "6692",
                        "6693",
                        "6695",
                        "6696"
                    ],
                    "image": {
                        "full": "3134.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 144,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 1100,
                        "sell": 770
                    },
                    "tags": [
                        "Damage",
                        "ArmorPenetration"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 30
                    },
                    "effect": {
                        "Effect1Amount": "10"
                    },
                    "depth": 2
                },
                "3135": {
                    "name": "Void Staff",
                    "description": "<mainText><stats><attention>65</attention> Ability Power<br><attention>40%</attention> Magic Penetration</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Increases magic damage",
                    "from": [
                        "4630",
                        "1026"
                    ],
                    "image": {
                        "full": "3135.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 192,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 700,
                        "purchasable": true,
                        "total": 2800,
                        "sell": 1960
                    },
                    "tags": [
                        "MagicPenetration",
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 65
                    },
                    "depth": 3
                },
                "3139": {
                    "name": "Mercurial Scimitar",
                    "description": "<mainText><stats><attention>40</attention> Attack Damage<br><attention>20%</attention> Critical Strike Chance<br><attention>40</attention> Magic Resist</stats><br><br><active>Active -</active> <active>Quicksilver:</active> Remove all crowd control debuffs and gain Move Speed.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Activate to remove all crowd control debuffs and grant massive Move Speed",
                    "from": [
                        "3140",
                        "1018",
                        "1037"
                    ],
                    "image": {
                        "full": "3139.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 240,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 225,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "SpellBlock",
                        "Damage",
                        "CriticalStrike",
                        "Active",
                        "NonbootsMovement",
                        "Tenacity"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 40,
                        "FlatCritChanceMod": 0.2,
                        "FlatSpellBlockMod": 40
                    },
                    "effect": {
                        "Effect1Amount": "0.5",
                        "Effect2Amount": "1.5",
                        "Effect3Amount": "90"
                    },
                    "depth": 3
                },
                "3140": {
                    "name": "Quicksilver Sash",
                    "description": "<mainText><stats><attention>30</attention> Magic Resist</stats><br><br><active>Active -</active> <active>Quicksilver:</active> Removes all crowd control debuffs (excluding <status>Airborne</status>).<br></mainText><br>",
                    "colloq": ";qss",
                    "plaintext": "Activate to remove all crowd control debuffs",
                    "from": [
                        "1033"
                    ],
                    "into": [
                        "6035",
                        "3139"
                    ],
                    "image": {
                        "full": "3140.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 288,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 850,
                        "purchasable": true,
                        "total": 1300,
                        "sell": 910
                    },
                    "tags": [
                        "Active",
                        "SpellBlock"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatSpellBlockMod": 30
                    },
                    "depth": 2
                },
                "3142": {
                    "name": "Youmuu's Ghostblade",
                    "description": "<mainText><stats><attention>55</attention> Attack Damage<br><attention>18</attention> Lethality<br><attention>15</attention> Ability Haste</stats><br><br><active>Active -</active> <active>Wraith Step:</active> Gain Move Speed and Ghosting.<br><li><passive>Haunt:</passive> Gain Move Speed out of combat.<br><br><rules><status>Ghosted</status> units ignore collision with other units.</rules></mainText><br>",
                    "colloq": ";lethality",
                    "plaintext": "Activate to greatly increase Move Speed",
                    "from": [
                        "3134",
                        "3133"
                    ],
                    "image": {
                        "full": "3142.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 336,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 800,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Damage",
                        "Active",
                        "NonbootsMovement",
                        "ArmorPenetration"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 55
                    },
                    "effect": {
                        "Effect1Amount": "45",
                        "Effect2Amount": "18",
                        "Effect3Amount": "0.2",
                        "Effect4Amount": "0",
                        "Effect5Amount": "6",
                        "Effect6Amount": "40"
                    },
                    "depth": 3
                },
                "3143": {
                    "name": "Randuin's Omen",
                    "description": "<mainText><stats><attention>400</attention> Health<br><attention>60</attention> Armor</stats><br><br><active>Active -</active> <active>Humility:</active> <status>Slow</status> nearby enemies.<br><li><passive>Rock Solid:</passive> Reduce incoming damage from Attacks.<li><passive>Critical Resilience:</passive> Critical Strikes deal 20% less damage to you.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Greatly increases defenses, activate to slow nearby enemies",
                    "from": [
                        "3082",
                        "1011"
                    ],
                    "image": {
                        "full": "3143.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 384,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1100,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "Armor",
                        "Active",
                        "Slow"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 400,
                        "FlatArmorMod": 60
                    },
                    "depth": 3
                },
                "3145": {
                    "name": "Hextech Alternator",
                    "description": "<mainText><stats><attention>25</attention> Ability Power<br><attention>150</attention> Health</stats><br><li><passive>Revved:</passive> Damaging a champion deals additional damage.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Increases Ability Power. Deal bonus magic damage on attack periodically.",
                    "from": [
                        "1052",
                        "1028"
                    ],
                    "into": [
                        "3152",
                        "4628",
                        "4636",
                        "4645"
                    ],
                    "image": {
                        "full": "3145.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 432,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 215,
                        "purchasable": true,
                        "total": 1050,
                        "sell": 735
                    },
                    "tags": [
                        "Health",
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 150,
                        "FlatMagicDamageMod": 25
                    },
                    "depth": 2
                },
                "3152": {
                    "name": "Hextech Rocketbelt",
                    "description": "<mainText><stats><attention>90</attention> Ability Power<br><attention>6</attention> Magic Penetration<br><attention>250</attention> Health<br><attention>15</attention> Ability Haste</stats><br><br><active>Active -</active> <active>Supersonic:</active> Dash in target direction, unleashing an arc of magic missiles that deal damage. Then, gain Move Speed towards enemy champions.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Magic Penetration.</mainText><br>",
                    "colloq": "rocket belt;",
                    "plaintext": "Activate to dash forward and unleash a fiery explosion",
                    "from": [
                        "1026",
                        "3145",
                        "1052"
                    ],
                    "into": [
                        "7011"
                    ],
                    "image": {
                        "full": "3152.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 0,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 865,
                        "purchasable": true,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "Active",
                        "CooldownReduction",
                        "NonbootsMovement",
                        "MagicPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 250,
                        "FlatMagicDamageMod": 90
                    },
                    "depth": 3
                },
                "3153": {
                    "name": "Blade of The Ruined King",
                    "description": "<mainText><stats><attention>40</attention> Attack Damage<br><attention>25%</attention> Attack Speed<br><attention>8%</attention> Life Steal</stats><br><li><passive>Mist's Edge:</passive> Attacks apply physical damage based off of the target's current Health. <li><passive>Siphon:</passive> Attacking a champion 3 times deals magic damage and steals Move Speed.<br><br>Item performance differs for melee and ranged users.</mainText><br>",
                    "colloq": ";brk;bork;bork;bork;botrk",
                    "plaintext": "Deals damage based on target's Health, can steal Move Speed",
                    "from": [
                        "1053",
                        "1043",
                        "1037"
                    ],
                    "image": {
                        "full": "3153.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 48,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 525,
                        "purchasable": true,
                        "total": 3300,
                        "sell": 2310
                    },
                    "tags": [
                        "Damage",
                        "AttackSpeed",
                        "LifeSteal",
                        "Slow",
                        "OnHit",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 40,
                        "PercentAttackSpeedMod": 0.25,
                        "PercentLifeStealMod": 0.08
                    },
                    "depth": 3
                },
                "3155": {
                    "name": "Hexdrinker",
                    "description": "<mainText><stats><attention>25</attention> Attack Damage<br><attention>35</attention> Magic Resist</stats><br><li><passive>Lifeline:</passive> Upon taking magic damage that would reduce Health below 30%, gain a magic damage Shield.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Increases Attack Damage and Magic Resist",
                    "stacks": 0,
                    "from": [
                        "1036",
                        "1033"
                    ],
                    "into": [
                        "3156"
                    ],
                    "image": {
                        "full": "3155.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 96,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 1300,
                        "sell": 910
                    },
                    "tags": [
                        "Damage",
                        "SpellBlock"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 25,
                        "FlatSpellBlockMod": 35
                    },
                    "depth": 2
                },
                "3156": {
                    "name": "Maw of Malmortius",
                    "description": "<mainText><stats><attention>55</attention> Attack Damage<br><attention>50</attention> Magic Resist<br><attention>20</attention> Ability Haste</stats><br><li><passive>Lifeline:</passive> Upon taking magic damage that would reduce Health below 30%, gain a magic damage Shield. When <passive>Lifeline</passive> triggers, gain Omnivamp until the end of combat.  </mainText><br>",
                    "colloq": ";",
                    "plaintext": "Grants bonus Attack Damage when Health is low",
                    "stacks": 0,
                    "from": [
                        "3155",
                        "3133"
                    ],
                    "image": {
                        "full": "3156.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 144,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 2900,
                        "sell": 2030
                    },
                    "tags": [
                        "SpellBlock",
                        "Damage",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 55,
                        "FlatSpellBlockMod": 50
                    },
                    "depth": 3
                },
                "3157": {
                    "name": "Zhonya's Hourglass",
                    "description": "<mainText><stats><attention>80</attention> Ability Power<br><attention>45</attention> Armor<br><attention>15</attention> Ability Haste</stats><br><br><active>Active -</active> <active>Stasis:</active> You become <status>Invulnerable</status> and <status>Untargetable</status> for 2.5 seconds, but are prevented from taking any other actions during this time.</mainText><br>",
                    "colloq": ";zhg;zonyas",
                    "plaintext": "Activate to become invincible but unable to take actions",
                    "from": [
                        "3191",
                        "3108",
                        "2420"
                    ],
                    "image": {
                        "full": "3157.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 192,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 350,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Armor",
                        "SpellDamage",
                        "Active",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 80,
                        "FlatArmorMod": 45
                    },
                    "effect": {
                        "Effect1Amount": "0",
                        "Effect2Amount": "2.5",
                        "Effect3Amount": "120"
                    },
                    "depth": 3
                },
                "3158": {
                    "name": "Ionian Boots of Lucidity",
                    "description": "<mainText><stats><attention>20</attention> Ability Haste<br><attention>45</attention> Move Speed</stats><br><li>Gain 12 Summoner Spell Haste.<br><br><flavorText>''This item is dedicated in honor of Ionia's victory over Noxus in the Rematch for the Southern Provinces on 10 December, 20 CLE.'</flavorText></mainText><br>",
                    "colloq": "",
                    "plaintext": "Increases Move Speed and Cooldown Reduction",
                    "from": [
                        "1001"
                    ],
                    "image": {
                        "full": "3158.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 240,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 650,
                        "purchasable": true,
                        "total": 950,
                        "sell": 665
                    },
                    "tags": [
                        "Boots",
                        "CooldownReduction"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMovementSpeedMod": 45
                    },
                    "depth": 2
                },
                "3161": {
                    "name": "Spear Of Shojin",
                    "description": "<mainText><stats><attention>65</attention> Attack Damage<br><attention>300</attention> Health<br><attention>20</attention> Ability Haste</stats><br><li><passive>Dragonforce:</passive> Your Non-Ultimate spells gain (8 (+0.08 per 100 Bonus AD) | 6 (+0.06 per 100 Bonus AD)) Ability Haste, reduced to (4 (+0.04 per 100 Bonus AD) | 3 (+0.03 per 100 Bonus AD))) Ability Haste for Immobilizing spells.<li><passive>Exigency:</passive> Gain up to (0.15 | 0.1) increased move speed, based on your missing health (Maxed when below 33% Health).<br><br>Item performance differs for melee and ranged users.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Reduce damage taken from champions by a flat amount. Attack while near multiple enemy champions to increase this amount for a short time.",
                    "from": [
                        "3133",
                        "1038",
                        "3067"
                    ],
                    "image": {
                        "full": "3161.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 288,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 200,
                        "purchasable": true,
                        "total": 3400,
                        "sell": 2380
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 65,
                        "FlatHPPoolMod": 300
                    },
                    "depth": 3
                },
                "3165": {
                    "name": "Morellonomicon",
                    "description": "<mainText><stats><attention>90</attention> Ability Power<br><attention>300</attention> Health</stats><br><li><passive>Affliction:</passive> Dealing magic damage applies <status>25% Grievous Wounds</status> to enemy champions for 3 seconds. If the target is below 50% Health, this effect is increased to <status>40% Grievous Wounds</status>.<br><br><rules><status>Grievous Wounds</status> reduces the effectiveness of Healing and Regeneration effects.</rules></mainText><br>",
                    "colloq": ";nmst;grievous",
                    "plaintext": "Increases magic damage",
                    "from": [
                        "1026",
                        "3916",
                        "1028"
                    ],
                    "image": {
                        "full": "3165.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 336,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 450,
                        "purchasable": true,
                        "total": 2500,
                        "sell": 1750
                    },
                    "tags": [
                        "Health",
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 300,
                        "FlatMagicDamageMod": 90
                    },
                    "depth": 3
                },
                "3177": {
                    "name": "Guardian's Blade",
                    "description": "<mainText><stats><attention>30</attention> Attack Damage<br><attention>150</attention> Health<br><attention>15</attention> Ability Haste</stats><br><li><passive>Legendary:</passive> This item counts as a <rarityLegendary>Legendary</rarityLegendary> item.</mainText><br>",
                    "colloq": ";dblade",
                    "plaintext": "Good starting item for attackers",
                    "image": {
                        "full": "3177.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 384,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 950,
                        "purchasable": true,
                        "total": 950,
                        "sell": 665
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "Lane",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": false,
                        "12": true,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 30,
                        "FlatHPPoolMod": 150
                    },
                    "effect": {
                        "Effect1Amount": "10"
                    }
                },
                "3179": {
                    "name": "Umbral Glaive",
                    "description": "<mainText><stats><attention>50</attention> Attack Damage<br><attention>10</attention> Lethality<br><attention>15</attention> Ability Haste</stats><br><li><passive>Blackout:</passive> When spotted by an enemy Ward, reveal traps and disable Wards around you. Your Attacks instantly kill revealed traps and do triple damage to Wards.</mainText><br>",
                    "colloq": ";lethality",
                    "plaintext": "Provides trap and ward detection periodically",
                    "from": [
                        "1036",
                        "3134",
                        "1036"
                    ],
                    "image": {
                        "full": "3179.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 432,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 2300,
                        "sell": 1610
                    },
                    "tags": [
                        "Damage",
                        "Vision",
                        "CooldownReduction",
                        "ArmorPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 50
                    },
                    "effect": {
                        "Effect1Amount": "10",
                        "Effect2Amount": "8",
                        "Effect3Amount": "40"
                    },
                    "depth": 3
                },
                "3181": {
                    "name": "Hullbreaker",
                    "description": "<mainText><stats><attention>50</attention> Attack Damage<br><attention>400</attention> Health<br><attention>150%</attention> Base Health Regen</stats><br><br><li><passive>Boarding Party:</passive> While no allied champions are nearby you gain <scaleArmor>Armor</scaleArmor> and <scaleMR>Magic Resist</scaleMR> and Attacks deal increased damage to towers. Nearby large minions gain <scaleArmor>Armor</scaleArmor> and <scaleMR>Magic Resist</scaleMR> and increased damage to towers. <br><br><rules>Boarding Party's resistances decay over 3 seconds when an ally gets too close.</rules><br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1037",
                        "3044"
                    ],
                    "image": {
                        "full": "3181.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 0,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 825,
                        "purchasable": true,
                        "total": 2800,
                        "sell": 1960
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "Armor",
                        "Damage"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 50,
                        "FlatHPPoolMod": 400
                    },
                    "depth": 3
                },
                "3184": {
                    "name": "Guardian's Hammer",
                    "description": "<mainText><stats><attention>25</attention> Attack Damage<br><attention>150</attention> Health<br><attention>7%</attention> Life Steal</stats><br><li><passive>Legendary:</passive> This item counts as a <rarityLegendary>Legendary</rarityLegendary> item.</mainText><br>",
                    "colloq": ";dblade",
                    "plaintext": "Good starting item for attackers",
                    "image": {
                        "full": "3184.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 48,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 950,
                        "purchasable": true,
                        "total": 950,
                        "sell": 665
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "LifeSteal",
                        "Lane"
                    ],
                    "maps": {
                        "11": false,
                        "12": true,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 25,
                        "FlatHPPoolMod": 150,
                        "PercentLifeStealMod": 0.07
                    }
                },
                "3190": {
                    "name": "Locket of the Iron Solari",
                    "description": "<mainText><stats><attention>200</attention> Health<br><attention>20</attention> Ability Haste<br><attention>30</attention> Armor<br><attention>30</attention> Magic Resist</stats><br><br><active>Active -</active> <active>Devotion:</active> Grant nearby allies a <shield>Shield</shield>, decaying over time.<br><li><passive>Consecrate:</passive> Grant nearby allied champions Armor and <scaleMR>Magic Resist</scaleMR>. <br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Armor and Magic Resist increase to <passive>Consecrate</passive>.<br><br></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Activate to shield nearby allies from damage",
                    "from": [
                        "3067",
                        "3105"
                    ],
                    "into": [
                        "7019"
                    ],
                    "image": {
                        "full": "3190.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 96,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 2500,
                        "sell": 1750
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "Armor",
                        "Aura",
                        "Active",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 200,
                        "FlatSpellBlockMod": 30,
                        "FlatArmorMod": 30
                    },
                    "depth": 3
                },
                "3191": {
                    "name": "Seeker's Armguard",
                    "description": "<mainText><stats><attention>30</attention> Ability Power<br><attention>15</attention> Armor</stats><br><li><passive>Witch's Path:</passive> Killing a unit grants <scaleArmor>0.5 Armor</scaleArmor> (max <scaleArmor>15</scaleArmor>).</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Increases Armor and Ability Power",
                    "from": [
                        "1052",
                        "1029"
                    ],
                    "into": [
                        "3157"
                    ],
                    "image": {
                        "full": "3191.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 144,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 265,
                        "purchasable": true,
                        "total": 1000,
                        "sell": 700
                    },
                    "tags": [
                        "Armor",
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 30,
                        "FlatArmorMod": 15
                    },
                    "effect": {
                        "Effect1Amount": "0.5",
                        "Effect2Amount": "15"
                    },
                    "depth": 2
                },
                "3193": {
                    "name": "Gargoyle Stoneplate",
                    "description": "<mainText><stats><attention>60</attention> Armor<br><attention>60</attention> Magic Resist<br><attention>15</attention> Ability Haste</stats><br><br><active>Active -</active> <active>Unbreakable:</active> Gain a Shield that decays and grow in size.<br><li><passive>Fortify:</passive> Taking damage from a champion grants a stack of <scaleArmor>bonus Armor</scaleArmor> and <scaleMR>bonus Magic Resist</scaleMR>.<br><br><rules>Max 5 stacks; 1 per champion.</rules></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Greatly increases defense near multiple enemies.",
                    "from": [
                        "1029",
                        "3105",
                        "1033"
                    ],
                    "image": {
                        "full": "3193.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 192,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1250,
                        "purchasable": true,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "SpellBlock",
                        "Armor",
                        "Active",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatSpellBlockMod": 60,
                        "FlatArmorMod": 60
                    },
                    "depth": 3
                },
                "3211": {
                    "name": "Spectre's Cowl",
                    "description": "<mainText><stats><attention>250</attention> Health<br><attention>25</attention> Magic Resist</stats><br><li><passive>Incorporeal:</passive> After taking damage from a champion, Regenerate Health.</mainText><br>",
                    "colloq": ";hat",
                    "plaintext": "Improves defense and grants regeneration upon being damaged",
                    "from": [
                        "1028",
                        "1033"
                    ],
                    "into": [
                        "3065",
                        "8020"
                    ],
                    "image": {
                        "full": "3211.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 240,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 1250,
                        "sell": 875
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "SpellBlock"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 250,
                        "FlatSpellBlockMod": 25
                    },
                    "depth": 2
                },
                "3222": {
                    "name": "Mikael's Blessing",
                    "description": "<mainText><stats><attention>16%</attention> Heal and Shield Power<br><attention>50</attention> Magic Resist<br><attention>15</attention> Ability Haste<br><attention>100%</attention> Base Mana Regen</stats><br><br><active>Active -</active> <active>Purify:</active> Restore Health and Remove all crowd control debuffs (except <status>Knockups</status> and <status>Suppression</status>) from an ally champion.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Activate to remove all disabling effects from an allied champion",
                    "from": [
                        "3114",
                        "1057"
                    ],
                    "image": {
                        "full": "3222.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 288,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 600,
                        "purchasable": true,
                        "total": 2300,
                        "sell": 1610
                    },
                    "tags": [
                        "SpellBlock",
                        "ManaRegen",
                        "Active",
                        "CooldownReduction",
                        "Tenacity",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatSpellBlockMod": 50
                    },
                    "depth": 3
                },
                "3330": {
                    "name": "Scarecrow Effigy",
                    "description": "<mainText><stats></stats><br><active>Active - Trinket:</active> Places an effigy that appears exactly as Fiddlesticks does to enemies. Stores up to a maximum of 2 charges.<br><br>Enemy champions approaching an effigy will activate it, causing the effigy to fake a random action, after which the effigy will fall apart.</mainText><br>",
                    "colloq": "yellow; totem; trinket",
                    "plaintext": "Periodically place a Stealth Ward",
                    "requiredChampion": "FiddleSticks",
                    "image": {
                        "full": "3330.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 336,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": true,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Active",
                        "Jungle",
                        "Lane",
                        "Trinket",
                        "Vision"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "90",
                        "Effect2Amount": "240",
                        "Effect3Amount": "120",
                        "Effect4Amount": "120",
                        "Effect5Amount": "2",
                        "Effect6Amount": "9",
                        "Effect7Amount": "30",
                        "Effect8Amount": "120"
                    }
                },
                "3340": {
                    "name": "Stealth Ward",
                    "description": "<mainText><stats></stats><active>Active - Trinket:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 2 Stealth Wards.</mainText><br>",
                    "colloq": "yellow; totem; trinket",
                    "plaintext": "Periodically place a Stealth Ward",
                    "image": {
                        "full": "3340.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 384,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": true,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Active",
                        "Jungle",
                        "Lane",
                        "Trinket",
                        "Vision"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "90",
                        "Effect2Amount": "240",
                        "Effect3Amount": "120",
                        "Effect4Amount": "120",
                        "Effect5Amount": "2",
                        "Effect6Amount": "9",
                        "Effect7Amount": "30",
                        "Effect8Amount": "120"
                    }
                },
                "3363": {
                    "name": "Farsight Alteration",
                    "description": "<mainText><stats></stats><active>Active - Trinket:</active> Reveals an area and places a visible, fragile Ward up to 4000 units away.</mainText><br>",
                    "colloq": "blue; totem; trinket",
                    "plaintext": "Grants increased range and reveals the targetted area",
                    "image": {
                        "full": "3363.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 432,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": true,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Active",
                        "Trinket",
                        "Vision"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "4000",
                        "Effect2Amount": "2",
                        "Effect3Amount": "5",
                        "Effect4Amount": "198",
                        "Effect5Amount": "60",
                        "Effect6Amount": "9",
                        "Effect7Amount": "30",
                        "Effect8Amount": "120",
                        "Effect9Amount": "6.5",
                        "Effect10Amount": "198",
                        "Effect11Amount": "99",
                        "Effect12Amount": "60",
                        "Effect13Amount": "180",
                        "Effect14Amount": "10",
                        "Effect15Amount": "45"
                    }
                },
                "3364": {
                    "name": "Oracle Lens",
                    "description": "<mainText><stats></stats><active>Active - Trinket:</active> Scans around you, warning against hidden enemy units, revealing invisible traps and revealing (and temporarily disabling) enemy Stealth Wards.</mainText><br>",
                    "colloq": "red; lens; trinket",
                    "plaintext": "Disables nearby invisible wards and traps for a duration",
                    "image": {
                        "full": "3364.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 0,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": true,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Active",
                        "Trinket",
                        "Vision"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": true,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "6",
                        "Effect2Amount": "10",
                        "Effect3Amount": "90",
                        "Effect4Amount": "60",
                        "Effect5Amount": "0",
                        "Effect6Amount": "1",
                        "Effect7Amount": "30",
                        "Effect8Amount": "120",
                        "Effect9Amount": "60"
                    }
                },
                "3400": {
                    "name": "Your Cut",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Gain 0 gold.<br><br><rules>Bonus gold given to an ally when Pyke executes an enemy champion using his Ultimate Ability. If no ally was involved in the kill, Pyke gets to keep the Cut!</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "consumed": true,
                    "inStore": false,
                    "hideFromAll": true,
                    "image": {
                        "full": "3400.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 48,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Consumable",
                        "GoldPer"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "3504": {
                    "name": "Ardent Censer",
                    "description": "<mainText><stats><attention>60</attention> Ability Power<br><attention>8%</attention> Heal and Shield Power<br><attention>100%</attention> Base Mana Regen</stats><br><li><passive>Sanctify:</passive> Healing or Shielding another ally enhances you both, granting Attack Speed and magic damage <OnHit>On-Hit</OnHit>. <br></mainText><br>",
                    "colloq": "",
                    "plaintext": "Shield and heal effects on other units grant both of you Attack Speed and their attacks deal additional on-hit magic damage.",
                    "from": [
                        "1052",
                        "3114",
                        "1052"
                    ],
                    "image": {
                        "full": "3504.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 96,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 630,
                        "purchasable": true,
                        "total": 2300,
                        "sell": 1610
                    },
                    "tags": [
                        "AttackSpeed",
                        "SpellDamage",
                        "ManaRegen",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 60
                    },
                    "depth": 3
                },
                "3508": {
                    "name": "Essence Reaver",
                    "description": "<mainText><stats><attention>45</attention> Attack Damage<br><attention>20%</attention> Critical Strike Chance<br><attention>20</attention> Ability Haste</stats><br><li><passive>Spellblade:</passive> After using an Ability, your next Attack deals additional damage and restores Mana.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3057",
                        "3133",
                        "1018"
                    ],
                    "image": {
                        "full": "3508.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 144,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 2800,
                        "sell": 1960
                    },
                    "tags": [
                        "Damage",
                        "CriticalStrike",
                        "ManaRegen",
                        "CooldownReduction",
                        "OnHit",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 45,
                        "FlatCritChanceMod": 0.2
                    },
                    "depth": 3
                },
                "3513": {
                    "name": "Eye of the Herald",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Crush the Eye of the Herald, summoning Rift Herald. The Herald will proceed down the nearest lane and deal massive damage to any turrets in the way.<br><br><passive>Glimpse of the Void:</passive> Grants Empowered.<br></mainText><br>",
                    "colloq": ";Herald's Eye",
                    "plaintext": "Eye of the Herald - a Gift of the Void.",
                    "consumed": true,
                    "inStore": false,
                    "image": {
                        "full": "3513.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 192,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Trinket",
                        "Active"
                    ],
                    "maps": {
                        "11": false,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {},
                    "effect": {
                        "Effect1Amount": "240",
                        "Effect2Amount": "1",
                        "Effect3Amount": "20",
                        "Effect4Amount": "180"
                    }
                },
                "3599": {
                    "name": "Kalista's Black Spear",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Bind with an ally for the remainder of the game, becoming Oathsworn Allies. Oathsworn empowers you both while near one another.</mainText><br>",
                    "colloq": ";spear",
                    "plaintext": "Kalista's spear that binds an Oathsworn Ally.",
                    "requiredChampion": "Kalista",
                    "image": {
                        "full": "3599.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 240,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": true,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Consumable"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "3600": {
                    "name": "Kalista's Black Spear",
                    "description": "<mainText><stats></stats><active>Active - Consume:</active> Bind with an ally for the remainder of the game, becoming Oathsworn Allies. Oathsworn empowers you both while near one another.<br><br><rules>Required to use <attention>Kalista's</attention> Ultimate Ability.</rules></mainText><br>",
                    "colloq": ";spear",
                    "plaintext": "Kalista's spear that binds an Oathsworn Ally.",
                    "requiredChampion": "Sylas",
                    "image": {
                        "full": "3600.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 288,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": true,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [
                        "Consumable"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "3742": {
                    "name": "Dead Man's Plate",
                    "description": "<mainText><stats><attention>300</attention> Health<br><attention>45</attention> Armor<br><attention>5%</attention> Move Speed</stats><li><passive>Shipwrecker:</passive> While moving, build up  Move Speed. Your next Attack discharges built up Move Speed to deal damage. If dealt by a Melee champion at top speed, the Attack also <status>Slows</status> the target.<br><br><flavorText>''There's only one way you'll get this armor from me...'' - forgotten namesake</flavorText></mainText><br>",
                    "colloq": ";juggernaut;dreadnought",
                    "plaintext": "Build momentum as you move around then smash into enemies.",
                    "from": [
                        "3066",
                        "1028",
                        "1031"
                    ],
                    "image": {
                        "full": "3742.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 336,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 900,
                        "purchasable": true,
                        "total": 2900,
                        "sell": 2030
                    },
                    "tags": [
                        "Health",
                        "Armor",
                        "Slow",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "PercentMovementSpeedMod": 0.05,
                        "FlatHPPoolMod": 300,
                        "FlatArmorMod": 45
                    },
                    "depth": 3
                },
                "3748": {
                    "name": "Titanic Hydra",
                    "description": "<mainText><stats><attention>30</attention> Attack Damage<br><attention>500</attention> Health</stats><br><li><passive>Colossus:</passive> Gain bonus <scaleAD>Attack Damage based off of bonus Health</scaleAD>.<li><passive>Cleave:</passive> Attacks apply additional damage <OnHit>On-Hit</OnHit>, creating a shockwave that deals damage to enemies behind the target.</mainText><br>",
                    "colloq": ";juggernaut",
                    "plaintext": "Deals area of effect damage based on owner's health",
                    "from": [
                        "3077",
                        "1028",
                        "1011"
                    ],
                    "image": {
                        "full": "3748.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 384,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 800,
                        "purchasable": true,
                        "total": 3300,
                        "sell": 2310
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "Damage",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 30,
                        "FlatHPPoolMod": 500
                    },
                    "effect": {
                        "Effect1Amount": "0",
                        "Effect2Amount": "40",
                        "Effect3Amount": "0",
                        "Effect4Amount": "0",
                        "Effect5Amount": "0.1",
                        "Effect6Amount": "0",
                        "Effect7Amount": "0",
                        "Effect8Amount": "0",
                        "Effect9Amount": "0",
                        "Effect10Amount": "5"
                    },
                    "depth": 3
                },
                "3801": {
                    "name": "Crystalline Bracer",
                    "description": "<mainText><stats><attention>200</attention> Health<br><attention>100%</attention> Base Health Regen</stats></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Grants Health and Health Regen",
                    "from": [
                        "1028",
                        "1006"
                    ],
                    "into": [
                        "3084",
                        "3083",
                        "3109"
                    ],
                    "image": {
                        "full": "3801.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 432,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 100,
                        "purchasable": true,
                        "total": 800,
                        "sell": 560
                    },
                    "tags": [
                        "Health",
                        "HealthRegen"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 200
                    },
                    "depth": 2
                },
                "3802": {
                    "name": "Lost Chapter",
                    "description": "<mainText><stats><attention>40</attention> Ability Power<br><attention>300</attention> Mana<br><attention>10</attention> Ability Haste</stats><br><li><passive>Enlighten:</passive> Upon levelling up, restores <scaleMana>20% max Mana</scaleMana> over 3 seconds.</mainText><br>",
                    "colloq": ";",
                    "plaintext": "Restores Mana upon levelling up.",
                    "from": [
                        "1052",
                        "1027",
                        "1052"
                    ],
                    "into": [
                        "6655",
                        "6653",
                        "4644",
                        "6656"
                    ],
                    "image": {
                        "full": "3802.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 0,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 80,
                        "purchasable": true,
                        "total": 1300,
                        "sell": 910
                    },
                    "tags": [
                        "SpellDamage",
                        "Mana",
                        "ManaRegen",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMPPoolMod": 300,
                        "FlatMagicDamageMod": 40
                    },
                    "depth": 2
                },
                "3803": {
                    "name": "Catalyst of Aeons",
                    "description": "<mainText><stats><attention>225</attention> Health<br><attention>300</attention> Mana</stats><br><li><passive>Eternity:</passive> Restore Mana equal to 7% of premitigation damage taken from champions, and Health equal to 25% of Mana spent, up to 20 Health per cast, per second.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1028",
                        "1027"
                    ],
                    "into": [
                        "8020",
                        "6657"
                    ],
                    "image": {
                        "full": "3803.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 48,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 350,
                        "purchasable": true,
                        "total": 1100,
                        "sell": 770
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "Mana",
                        "ManaRegen"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 225,
                        "FlatMPPoolMod": 300
                    },
                    "depth": 2
                },
                "3814": {
                    "name": "Edge of Night",
                    "description": "<mainText><stats><attention>50</attention> Attack Damage<br><attention>10</attention> Lethality<br><attention>325</attention> Health</stats><br><li><passive>Annul:</passive> Gain a Spell Shield that blocks the next enemy Ability.<br><br><rules>Item's cooldown is restarted if you take damage before it is completed.</rules></mainText><br>",
                    "colloq": ";lethality",
                    "plaintext": "Periodically blocks enemy abilities",
                    "stacks": 0,
                    "from": [
                        "1036",
                        "3134",
                        "1028"
                    ],
                    "image": {
                        "full": "3814.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 96,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1050,
                        "purchasable": true,
                        "total": 2900,
                        "sell": 2030
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "ArmorPenetration"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 50,
                        "FlatHPPoolMod": 325
                    },
                    "effect": {
                        "Effect1Amount": "10",
                        "Effect2Amount": "0",
                        "Effect3Amount": "0",
                        "Effect4Amount": "40"
                    },
                    "depth": 3
                },
                "3850": {
                    "name": "Spellthief's Edge",
                    "description": "<mainText><stats><attention>8</attention> Ability Power<br><attention>10</attention> Health<br><attention>50%</attention> Base Mana Regen<br><attention>2</attention> Gold Per 10 Seconds</stats><br><li><passive>Tribute:</passive> While nearby an ally champion, damaging Abilities and Attacks against champions or buildings grant 20 gold. This can occur up to 3 times every 30 seconds.<li><passive>Quest:</passive> Earn 500 gold from this item to transform it into <rarityGeneric>Frostfang</rarityGeneric>, gaining <active>Active -</active> <active>Warding</active>.<br><br><rules>This item grants reduced gold from minions if you kill excessive numbers of them.</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "Gain gold and upgrade by damaging enemy champions",
                    "image": {
                        "full": "3850.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 144,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 400,
                        "sell": 160
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "ManaRegen",
                        "Vision",
                        "GoldPer",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 10,
                        "FlatMagicDamageMod": 8
                    },
                    "effect": {
                        "Effect1Amount": "2",
                        "Effect2Amount": "20",
                        "Effect3Amount": "20",
                        "Effect4Amount": "500",
                        "Effect5Amount": "10",
                        "Effect6Amount": "3",
                        "Effect7Amount": "2000"
                    }
                },
                "3851": {
                    "name": "Frostfang",
                    "description": "<mainText><stats><attention>15</attention> Ability Power<br><attention>70</attention> Health<br><attention>75%</attention> Base Mana Regen<br><attention>3</attention> Gold Per 10 Seconds</stats><br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 0 Stealth Wards, which refill upon visiting the shop. <br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 3 Stealth Wards, which refill upon visiting the shop. <br><br><br><br><li><passive>Tribute:</passive> While nearby an ally champion, damaging Abilities and Attacks against champions or buildings grant 20 gold. This can occur up to 3 times every 30 seconds.<li><passive>Quest:</passive> Earn 1000 gold from this item to transform it into <rarityLegendary>Shard of True Ice</rarityLegendary>.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "specialRecipe": 3850,
                    "inStore": false,
                    "image": {
                        "full": "3851.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 192,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": false,
                        "total": 400,
                        "sell": 160
                    },
                    "tags": [
                        "GoldPer",
                        "Lane",
                        "ManaRegen",
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 70,
                        "FlatMagicDamageMod": 15
                    },
                    "effect": {
                        "Effect1Amount": "3",
                        "Effect2Amount": "20",
                        "Effect3Amount": "20",
                        "Effect4Amount": "1000",
                        "Effect5Amount": "10",
                        "Effect6Amount": "3",
                        "Effect7Amount": "2000"
                    }
                },
                "3853": {
                    "name": "Shard of True Ice",
                    "description": "<mainText><stats><attention>40</attention> Ability Power<br><attention>75</attention> Health<br><attention>115%</attention> Base Mana Regen<br><attention>3</attention> Gold Per 10 Seconds</stats><br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 0 Stealth Wards, which refill upon visiting the shop. <br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 4 Stealth Wards, which refill upon visiting the shop. </mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "specialRecipe": 3851,
                    "inStore": false,
                    "image": {
                        "full": "3853.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 240,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": false,
                        "total": 400,
                        "sell": 160
                    },
                    "tags": [
                        "GoldPer",
                        "Lane",
                        "ManaRegen",
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 75,
                        "FlatMagicDamageMod": 40
                    },
                    "effect": {
                        "Effect1Amount": "3"
                    }
                },
                "3854": {
                    "name": "Steel Shoulderguards",
                    "description": "<mainText><stats><attention>3</attention> Attack Damage<br><attention>30</attention> Health<br><attention>25%</attention> Base Health Regen<br><attention>2</attention> Gold Per 10 Seconds</stats><li><passive>Spoils of War:</passive> While nearby an allied champion, Attacks execute minions below (50% for Melee Users | 30% for Ranged Users) of their max Health. Killing a minion grants the same kill gold to the nearest allied champion. These effects recharge every 35 seconds (Max 3 charges).<li><passive>Quest:</passive> Earn 500 gold from this item to transform it into <rarityGeneric>Runesteel Spaulders</rarityGeneric>, gaining <active>Active -</active> <active>Warding</active>.<br><br><rules>This item grants reduced gold from minions if you kill excessive numbers of them.</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "Gain gold and upgrade by executing minions alongside allies",
                    "image": {
                        "full": "3854.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 288,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 400,
                        "sell": 160
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "Damage",
                        "Vision",
                        "GoldPer",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 3,
                        "FlatHPPoolMod": 30
                    },
                    "effect": {
                        "Effect1Amount": "2",
                        "Effect2Amount": "0.5",
                        "Effect3Amount": "0.3",
                        "Effect4Amount": "500",
                        "Effect5Amount": "35",
                        "Effect6Amount": "3"
                    }
                },
                "3855": {
                    "name": "Runesteel Spaulders",
                    "description": "<mainText><stats><attention>6</attention> Attack Damage<br><attention>100</attention> Health<br><attention>50%</attention> Base Health Regen<br><attention>3</attention> Gold Per 10 Seconds</stats><br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 0 Stealth Wards, which refill upon visiting the shop. <br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 3 Stealth Wards, which refill upon visiting the shop. <br><li><passive>Spoils of War:</passive> While nearby an allied champion, Attacks execute minions below 50% of their max Health. Killing a minion grants the same kill gold to the nearest allied champion. These effects recharge every 35 seconds (Max 3 charges).<li><passive>Quest:</passive> Earn 1000 gold from this item to transform it into <rarityLegendary>Bulwark of the Mountain</rarityLegendary>. </mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "specialRecipe": 3854,
                    "inStore": false,
                    "image": {
                        "full": "3855.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 336,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": false,
                        "total": 400,
                        "sell": 160
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "GoldPer",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 6,
                        "FlatHPPoolMod": 100
                    },
                    "effect": {
                        "Effect1Amount": "3",
                        "Effect2Amount": "0.5",
                        "Effect3Amount": "0.5",
                        "Effect4Amount": "1000",
                        "Effect5Amount": "35",
                        "Effect6Amount": "3"
                    }
                },
                "3857": {
                    "name": "Pauldrons of Whiterock",
                    "description": "<mainText><stats><attention>15</attention> Attack Damage<br><attention>250</attention> Health<br><attention>100%</attention> Base Health Regen<br><attention>3</attention> Gold Per 10 Seconds</stats><br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 0 Stealth Wards, which refill upon visiting the shop. <br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 4 Stealth Wards, which refill upon visiting the shop. </mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "specialRecipe": 3855,
                    "inStore": false,
                    "image": {
                        "full": "3857.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 384,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": false,
                        "total": 400,
                        "sell": 160
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "GoldPer",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 15,
                        "FlatHPPoolMod": 250
                    },
                    "effect": {
                        "Effect1Amount": "3"
                    }
                },
                "3858": {
                    "name": "Relic Shield",
                    "description": "<mainText><stats><attention>5</attention> Ability Power<br><attention>30</attention> Health<br><attention>25%</attention> Base Health Regen<br><attention>2</attention> Gold Per 10 Seconds</stats><li><passive>Spoils of War:</passive> While nearby an allied champion, Attacks execute minions below (50% for Melee Users | 30% for Ranged Users) of their max Health. Killing a minion grants the same kill gold to the nearest allied champion. These effects recharge every 35 seconds (Max 3 charges).<li><passive>Quest:</passive> Earn 500 gold from this item to transform it into <rarityGeneric>Targon's Buckler</rarityGeneric>, gaining <active>Active -</active> <active>Warding</active>.<br><br><rules>This item grants reduced gold from minions if you kill excessive numbers of them.</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "Gain gold and upgrade by executing minions alongside allies",
                    "image": {
                        "full": "3858.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 432,
                        "y": 336,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 400,
                        "sell": 160
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "SpellDamage",
                        "Vision",
                        "GoldPer",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 30,
                        "FlatMagicDamageMod": 5
                    },
                    "effect": {
                        "Effect1Amount": "2",
                        "Effect2Amount": "0.5",
                        "Effect3Amount": "0.3",
                        "Effect4Amount": "500",
                        "Effect5Amount": "35",
                        "Effect6Amount": "3"
                    }
                },
                "3859": {
                    "name": "Targon's Buckler",
                    "description": "<mainText><stats><attention>10</attention> Ability Power<br><attention>100</attention> Health<br><attention>50%</attention> Base Health Regen<br><attention>3</attention> Gold Per 10 Seconds</stats><br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 0 Stealth Wards, which refill upon visiting the shop. <br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 3 Stealth Wards, which refill upon visiting the shop. <br><li><passive>Spoils of War:</passive> While nearby an allied champion, Attacks execute minions below 50% of their max Health. Killing a minion grants the same kill gold to the nearest allied champion. These effects recharge every 35 seconds (Max 3 charges).<li><passive>Quest:</passive> Earn 1000 gold from this item to transform it into <rarityLegendary>Bulwark of the Mountain</rarityLegendary>. </mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "specialRecipe": 3858,
                    "inStore": false,
                    "image": {
                        "full": "3859.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 0,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": false,
                        "total": 400,
                        "sell": 160
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "GoldPer",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 100,
                        "FlatMagicDamageMod": 10
                    },
                    "effect": {
                        "Effect1Amount": "3",
                        "Effect2Amount": "0.5",
                        "Effect3Amount": "0.5",
                        "Effect4Amount": "1000",
                        "Effect5Amount": "35",
                        "Effect6Amount": "3"
                    }
                },
                "3860": {
                    "name": "Bulwark of the Mountain",
                    "description": "<mainText><stats><attention>20</attention> Ability Power<br><attention>250</attention> Health<br><attention>100%</attention> Base Health Regen<br><attention>3</attention> Gold Per 10 Seconds</stats><br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 0 Stealth Wards, which refill upon visiting the shop. <br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 4 Stealth Wards, which refill upon visiting the shop. </mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "specialRecipe": 3859,
                    "inStore": false,
                    "image": {
                        "full": "3860.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 48,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": false,
                        "total": 400,
                        "sell": 160
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "GoldPer",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 250,
                        "FlatMagicDamageMod": 20
                    },
                    "effect": {
                        "Effect1Amount": "3"
                    }
                },
                "3862": {
                    "name": "Spectral Sickle",
                    "description": "<mainText><stats><attention>5</attention> Attack Damage<br><attention>10</attention> Health<br><attention>25%</attention> Base Mana Regen<br><attention>2</attention> Gold Per 10 Seconds</stats><br><li><passive>Tribute:</passive> While nearby an ally champion, damaging Abilities and Attacks against champions or buildings grant 20 gold. This can occur up to 3 times every 30 seconds.<li><passive>Quest:</passive> Earn 500 gold from this item to transform it into <rarityGeneric>Harrowing Crescent</rarityGeneric>, gaining <active>Active -</active> <active>Warding</active>.<br><br><rules>This item grants reduced gold from minions if you kill excessive numbers of them.</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "Gain gold and upgrade by damaging enemy champions",
                    "image": {
                        "full": "3862.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 96,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 400,
                        "sell": 160
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "ManaRegen",
                        "Vision",
                        "GoldPer",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 5,
                        "FlatHPPoolMod": 10
                    },
                    "effect": {
                        "Effect1Amount": "2",
                        "Effect2Amount": "20",
                        "Effect3Amount": "20",
                        "Effect4Amount": "500",
                        "Effect5Amount": "10",
                        "Effect6Amount": "3",
                        "Effect7Amount": "2000"
                    }
                },
                "3863": {
                    "name": "Harrowing Crescent",
                    "description": "<mainText><stats><attention>10</attention> Attack Damage<br><attention>60</attention> Health<br><attention>50%</attention> Base Mana Regen<br><attention>3</attention> Gold Per 10 Seconds</stats><br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 0 Stealth Wards, which refill upon visiting the shop. <br><li><passive>Tribute:</passive> While nearby an ally champion, damaging Abilities and Attacks against champions or buildings grant 20 gold. This can occur up to 3 times every 30 seconds.<li><passive>Quest:</passive> Earn 1000 gold from this item to transform it into <rarityLegendary>Black Mist Scythe</rarityLegendary>.<br><br><rules>This item grants reduced gold from minions if you kill excessive numbers of them.</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "specialRecipe": 3862,
                    "inStore": false,
                    "image": {
                        "full": "3863.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 144,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": false,
                        "total": 400,
                        "sell": 160
                    },
                    "tags": [
                        "Health",
                        "ManaRegen",
                        "GoldPer",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 10,
                        "FlatHPPoolMod": 60
                    },
                    "effect": {
                        "Effect1Amount": "3",
                        "Effect2Amount": "20",
                        "Effect3Amount": "20",
                        "Effect4Amount": "1000",
                        "Effect5Amount": "10",
                        "Effect6Amount": "3",
                        "Effect7Amount": "2000"
                    }
                },
                "3864": {
                    "name": "Black Mist Scythe",
                    "description": "<mainText><stats><attention>20</attention> Attack Damage<br><attention>75</attention> Health<br><attention>100%</attention> Base Mana Regen<br><attention>3</attention> Gold Per 10 Seconds</stats><br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 0 Stealth Wards, which refill upon visiting the shop. <br><br><active>Active -</active> <active>Ward:</active> Place a Stealth Ward on the ground that is <keywordStealth>Invisible</keywordStealth> to enemies but grants your team vision of the surrounding area. Stores up to 4 Stealth Wards, which refill upon visiting the shop. </mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "specialRecipe": 3863,
                    "inStore": false,
                    "image": {
                        "full": "3864.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 192,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": false,
                        "total": 400,
                        "sell": 160
                    },
                    "tags": [
                        "Health",
                        "ManaRegen",
                        "GoldPer",
                        "Lane"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 20,
                        "FlatHPPoolMod": 75
                    },
                    "effect": {
                        "Effect1Amount": "3"
                    }
                },
                "3901": {
                    "name": "<rarityLegendary>Fire at Will</rarityLegendary><br><subtitleLeft><silver>500 Silver Serpents</silver></subtitleLeft>",
                    "description": "",
                    "colloq": "",
                    "plaintext": "Cannon Barrage fires at an increasing rate over time (additional 6 waves over the duration).",
                    "consumed": true,
                    "consumeOnFull": true,
                    "inStore": false,
                    "requiredChampion": "Gangplank",
                    "image": {
                        "full": "3901.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 240,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "3902": {
                    "name": "<rarityLegendary>Death's Daughter</rarityLegendary><br><subtitleLeft><silver>500 Silver Serpents</silver></subtitleLeft>",
                    "description": "",
                    "colloq": "",
                    "plaintext": "<mainText>Cannon Barrage additionally fires a mega-cannonball at the center of the Barrage, dealing <trueDamage>300% true damage</trueDamage> and <status>Slowing</status> them by 60% for 1.5 seconds.</mainText>",
                    "consumed": true,
                    "consumeOnFull": true,
                    "inStore": false,
                    "requiredChampion": "Gangplank",
                    "image": {
                        "full": "3902.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 288,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "3903": {
                    "name": "<rarityLegendary>Raise Morale</rarityLegendary><br><subtitleLeft><silver>500 Silver Serpents</silver></subtitleLeft>",
                    "description": "",
                    "colloq": "",
                    "plaintext": "Allies in the Cannon Barrage gain <speed>30% Move Speed</speed> for 2 seconds.",
                    "consumed": true,
                    "consumeOnFull": true,
                    "inStore": false,
                    "requiredChampion": "Gangplank",
                    "image": {
                        "full": "3903.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 336,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "3916": {
                    "name": "Oblivion Orb",
                    "description": "<mainText><stats><attention>35</attention> Ability Power</stats><br><li><passive>Cursed:</passive> Dealing magic damage applies <status>25% Grievous Wounds</status> to champions for 3 seconds.<br><br><rules><status>Grievous Wounds</status> reduces the effectiveness of Healing and Regeneration effects.</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "Increases magic damage",
                    "stacks": 0,
                    "from": [
                        "1052"
                    ],
                    "into": [
                        "3011",
                        "3165"
                    ],
                    "image": {
                        "full": "3916.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 384,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 365,
                        "purchasable": true,
                        "total": 800,
                        "sell": 560
                    },
                    "tags": [
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 35
                    },
                    "depth": 2
                },
                "4005": {
                    "name": "Imperial Mandate",
                    "description": "<mainText><stats><attention>40</attention> Ability Power<br><attention>200</attention> Health<br><attention>20</attention> Ability Haste<br><attention>100%</attention> Base Mana Regen</stats><br><li><passive>Coordinated Fire:</passive> Abilities that <status>Slow</status> or <status>Immobilize</status> a champion deal bonus damage and mark them. Ally champion damage detonates the mark, dealing additional damage and granting you both Move Speed. <br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Power. <br></mainText><br>",
                    "colloq": ";",
                    "plaintext": "Defer damage until later.",
                    "from": [
                        "3067",
                        "4642"
                    ],
                    "into": [
                        "7022"
                    ],
                    "image": {
                        "full": "4005.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 432,
                        "y": 384,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 750,
                        "purchasable": true,
                        "total": 2500,
                        "sell": 1750
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "ManaRegen",
                        "CooldownReduction",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 200,
                        "FlatMagicDamageMod": 40
                    },
                    "depth": 3
                },
                "4401": {
                    "name": "Force of Nature",
                    "description": "<mainText><stats><attention>350</attention> Health<br><attention>70</attention> Magic Resist<br><attention>5%</attention> Move Speed</stats><br><li><passive>Absorb:</passive> Taking <magicDamage>magic damage</magicDamage> from enemy Champions grants a stack of <attention>Steadfast</attention>. Enemy <status>Immobilizing</status> effects grant additional stacks.<li><passive>Dissipate:</passive> While at max stacks of <attention>Steadfast</attention>, take reduced magic damage and gain increased Move Speed.</mainText><br>",
                    "colloq": ";fon",
                    "plaintext": "Move Speed, Magic Resist, and max Health Regeneration",
                    "from": [
                        "1057",
                        "1028",
                        "3066"
                    ],
                    "image": {
                        "full": "4401.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 0,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 800,
                        "purchasable": true,
                        "total": 2900,
                        "sell": 2030
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "PercentMovementSpeedMod": 0.05,
                        "FlatHPPoolMod": 350,
                        "FlatSpellBlockMod": 70
                    },
                    "depth": 3
                },
                "4403": {
                    "name": "The Golden Spatula",
                    "description": "<mainText><stats><attention>70</attention> Attack Damage<br><attention>120</attention> Ability Power<br><attention>50%</attention> Attack Speed<br><attention>30%</attention> Critical Strike Chance<br><attention>250</attention> Health<br><attention>30</attention> Armor<br><attention>30</attention> Magic Resist<br><attention>250</attention> Mana<br><attention>20</attention> Ability Haste<br><attention>10%</attention> Move Speed<br><attention>10%</attention> Life Steal<br><attention>100%</attention> Base Health Regen<br><attention>100%</attention> Base Mana Regen</stats><br><li><passive>Doing Something:</passive> You are permanently On Fire!</mainText><br>",
                    "colloq": ";",
                    "plaintext": "It does EVERYTHING!",
                    "from": [
                        "1038",
                        "1053",
                        "3086",
                        "1058",
                        "3067",
                        "3105"
                    ],
                    "image": {
                        "full": "4403.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 48,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 687,
                        "purchasable": true,
                        "total": 7187,
                        "sell": 5031
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "HealthRegen",
                        "Armor",
                        "Damage",
                        "CriticalStrike",
                        "AttackSpeed",
                        "LifeSteal",
                        "SpellDamage",
                        "Mana",
                        "ManaRegen",
                        "CooldownReduction",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": false,
                        "12": false,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 70,
                        "FlatCritChanceMod": 0.3,
                        "PercentMovementSpeedMod": 0.1,
                        "FlatHPPoolMod": 250,
                        "FlatSpellBlockMod": 30,
                        "FlatMPPoolMod": 250,
                        "FlatMagicDamageMod": 120,
                        "FlatArmorMod": 30,
                        "PercentAttackSpeedMod": 0.5,
                        "PercentLifeStealMod": 0.1
                    },
                    "depth": 3
                },
                "4628": {
                    "name": "Horizon Focus",
                    "description": "<mainText><stats><attention>100</attention> Ability Power<br><attention>150</attention> Health<br><attention>15</attention> Ability Haste</stats><br><li><passive>Hypershot:</passive> Damaging a champion with a non-targeted Ability at over 700 range or <status>Slowing or Immobilizing</status> them <keywordStealth>Reveals</keywordStealth> them and increases their damage taken from you.<br><br><rules>The Ability that triggers <passive>Hypershot</passive> also benefits from the damage increase. Pets and non-immobilizing traps do not trigger this effect. Only the initial placement of zone Abilities will trigger this effect. Distance is measured from the Ability cast position. </rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "Immobilizing a champion causes lightning to strike them",
                    "from": [
                        "3145",
                        "3108"
                    ],
                    "image": {
                        "full": "4628.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 96,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1050,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 150,
                        "FlatMagicDamageMod": 100
                    },
                    "depth": 3
                },
                "4629": {
                    "name": "Cosmic Drive",
                    "description": "<mainText><stats><attention>65</attention> Ability Power<br><attention>200</attention> Health<br><attention>30</attention> Ability Haste<br><attention>5%</attention> Move Speed</stats><br><li><passive>Spelldance:</passive> Damaging a champion with 3 separate Attacks or Spells grants Move Speed and Ability Power until exiting champion combat.<br></mainText><br>",
                    "colloq": "",
                    "plaintext": "Massive amounts of Cooldown Reduction",
                    "from": [
                        "3108",
                        "3113",
                        "1028"
                    ],
                    "image": {
                        "full": "4629.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 144,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 850,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "CooldownReduction",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "PercentMovementSpeedMod": 0.05,
                        "FlatHPPoolMod": 200,
                        "FlatMagicDamageMod": 65
                    },
                    "depth": 3
                },
                "4630": {
                    "name": "Blighting Jewel",
                    "description": "<mainText><stats><attention>25</attention> Ability Power<br><attention>13%</attention> Magic Penetration</stats></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1052"
                    ],
                    "into": [
                        "3135"
                    ],
                    "image": {
                        "full": "4630.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 192,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 815,
                        "purchasable": true,
                        "total": 1250,
                        "sell": 875
                    },
                    "tags": [
                        "MagicPenetration",
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 25
                    },
                    "depth": 2
                },
                "4632": {
                    "name": "Verdant Barrier",
                    "description": "<mainText><stats><attention>20</attention> Ability Power<br><attention>25</attention> Magic Resist</stats><br><li><passive>Adaptive:</passive> Killing a unit grants <scaleMR>0.3 Magic Resist</scaleMR> (max <scaleMR>9</scaleMR>). <br><br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1033",
                        "1052"
                    ],
                    "into": [
                        "3102"
                    ],
                    "image": {
                        "full": "4632.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 240,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 115,
                        "purchasable": true,
                        "total": 1000,
                        "sell": 700
                    },
                    "tags": [
                        "SpellBlock",
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatSpellBlockMod": 25,
                        "FlatMagicDamageMod": 20
                    },
                    "depth": 2
                },
                "4633": {
                    "name": "Riftmaker",
                    "description": "<mainText><stats><attention>70</attention> Ability Power<br><attention>300</attention> Health<br><attention>15</attention> Ability Haste<br><attention>7%</attention> Omnivamp</stats><br><li><passive>Void Corruption:</passive> For each second damaging enemy champions, deal bonus damage. At maximum strength, the bonus damage is dealt as <trueDamage>true damage</trueDamage> instead. <br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Omnivamp and Ability Power.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "4635",
                        "1026"
                    ],
                    "into": [
                        "7009"
                    ],
                    "image": {
                        "full": "4633.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 288,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1050,
                        "purchasable": true,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "CooldownReduction",
                        "SpellVamp",
                        "MagicPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 300,
                        "FlatMagicDamageMod": 70
                    },
                    "depth": 3
                },
                "4635": {
                    "name": "Leeching Leer",
                    "description": "<mainText><stats><attention>20</attention> Ability Power<br><attention>250</attention> Health<br><attention>5%</attention> Omnivamp</stats></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1028",
                        "1052"
                    ],
                    "into": [
                        "4633"
                    ],
                    "image": {
                        "full": "4635.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 336,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 465,
                        "purchasable": true,
                        "total": 1300,
                        "sell": 910
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "SpellVamp"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 250,
                        "FlatMagicDamageMod": 20
                    },
                    "depth": 2
                },
                "4636": {
                    "name": "Night Harvester",
                    "description": "<mainText><stats><attention>90</attention> Ability Power<br><attention>300</attention> Health<br><attention>25</attention> Ability Haste</stats><br><li><passive>Soulrend:</passive> Damaging a champion deals additional magic damage and grants you Move Speed.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Haste.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3145",
                        "3108",
                        "1052"
                    ],
                    "into": [
                        "7010"
                    ],
                    "image": {
                        "full": "4636.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 384,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 815,
                        "purchasable": true,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "CooldownReduction",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 300,
                        "FlatMagicDamageMod": 90
                    },
                    "depth": 3
                },
                "4637": {
                    "name": "Demonic Embrace",
                    "description": "<mainText><stats><attention>75</attention> Ability Power<br><attention>350</attention> Health</stats><br><li><passive>Azakana Gaze:</passive> Dealing Ability damage burns enemies for max Health magic damage every second.<li><passive>Dark Pact:</passive> Gain <scaleHealth>bonus Health</scaleHealth> as <scaleAP>Ability Power</scaleAP>. </mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1026",
                        "1011",
                        "1052"
                    ],
                    "image": {
                        "full": "4637.png",
                        "sprite": "item1.png",
                        "group": "item",
                        "x": 432,
                        "y": 432,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 815,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "SpellDamage"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 350,
                        "FlatMagicDamageMod": 75
                    },
                    "depth": 3
                },
                "4638": {
                    "name": "Watchful Wardstone",
                    "description": "<mainText><stats><attention>150</attention> Health<br><attention>10</attention> Ability Haste</stats><br><li><passive>Arcane Cache:</passive> This item can store up to 3 purchased Control Wards.<br><br>After completing the <keywordMajor>Support Quest</keywordMajor> and reaching Level 13, transforms into <rarityLegendary>Vigilant Wardstone</rarityLegendary>.<br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "consumed": true,
                    "consumeOnFull": true,
                    "into": [
                        "4643"
                    ],
                    "image": {
                        "full": "4638.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 0,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1100,
                        "purchasable": true,
                        "total": 1100,
                        "sell": 770
                    },
                    "tags": [
                        "Health",
                        "Vision",
                        "Active",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 150
                    }
                },
                "4641": {
                    "name": "Stirring Wardstone",
                    "description": "<mainText><stats><attention>100</attention> Health<br><attention>10</attention> Ability Haste</stats><li><passive>Arcane Cache:</passive> This item can store up to 3 purchased Control Wards.<li><passive>Blooming Empire:</passive> This item transforms into <rarityLegendary>Watchful Wardstone</rarityLegendary> once 15 Stealth Wards have been placed.<br><br><rules>Stealth Wards are placed from the Stealth Ward Trinket and the upgraded <attention>Unique: Support</attention> items.</rules><br><br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "consumed": true,
                    "consumeOnFull": true,
                    "inStore": false,
                    "image": {
                        "full": "4641.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 48,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1200,
                        "purchasable": false,
                        "total": 1200,
                        "sell": 480
                    },
                    "tags": [
                        "Health",
                        "Active",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 100
                    }
                },
                "4642": {
                    "name": "Bandleglass Mirror",
                    "description": "<mainText><stats><attention>20</attention> Ability Power<br><attention>10</attention> Ability Haste<br><attention>50%</attention> Base Mana Regen</stats></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1004",
                        "1052"
                    ],
                    "into": [
                        "2065",
                        "6617",
                        "3011",
                        "4005"
                    ],
                    "image": {
                        "full": "4642.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 96,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 265,
                        "purchasable": true,
                        "total": 950,
                        "sell": 665
                    },
                    "tags": [
                        "SpellDamage",
                        "ManaRegen",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 20
                    },
                    "depth": 2
                },
                "4643": {
                    "name": "Vigilant Wardstone",
                    "description": "<mainText><stats><attention>150</attention> Health<br><attention>15</attention> Ability Haste</stats><br><li><passive>Arcane Cache:</passive> This item can store up to 3 purchased Control Wards.<li><passive>Behold:</passive> Increase your Stealth Ward and Control Ward placement caps by 1.<li><passive>Blessing of Ixtal:</passive> Grants a 12% increase to bonus Health, bonus Attack Damage, Ability Haste, and Ability Power.<br><br><rules>Upgrades from <rarityLegendary>Watchful Sightstone</rarityLegendary>.</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "4638"
                    ],
                    "inStore": false,
                    "image": {
                        "full": "4643.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 144,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 1100,
                        "sell": 770
                    },
                    "tags": [
                        "Health",
                        "Vision",
                        "Active",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": false,
                        "21": false,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 150
                    },
                    "depth": 2
                },
                "4644": {
                    "name": "Crown of the Shattered Queen",
                    "description": "<mainText><stats><attention>70</attention> Ability Power<br><attention>250</attention> Health<br><attention>600</attention> Mana<br><attention>20</attention> Ability Haste</stats><br><li><passive>Divine Safeguard:</passive> You are <keywordMajor>Safeguarded</keywordMajor>, reducing incoming champion damage. <keywordMajor>Safeguard</keywordMajor> persists for 1.5 seconds after taking champion damage. <li><passive>Holy Gift:</passive> While <keywordMajor>Safeguarded</keywordMajor> and for 3 seconds after it is broken, gain  Ability Power. <br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Move Speed and Ability Power.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3067",
                        "3802",
                        "1052"
                    ],
                    "into": [
                        "7024"
                    ],
                    "image": {
                        "full": "4644.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 192,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 265,
                        "purchasable": true,
                        "total": 2800,
                        "sell": 1960
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "Mana",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 250,
                        "FlatMPPoolMod": 600,
                        "FlatMagicDamageMod": 70
                    },
                    "depth": 3
                },
                "4645": {
                    "name": "Shadowflame",
                    "description": "<mainText><stats><attention>100</attention> Ability Power<br><attention>200</attention> Health</stats><br><li><passive>Cinderbloom:</passive> Damage to champions benefits from additional <keywordStealth>Magic Penetration</keywordStealth> based on their current <scaleHealth>Health</scaleHealth>. If the target was recently affected by Shields, gain the maximum benefit against that target. </mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3145",
                        "1058"
                    ],
                    "image": {
                        "full": "4645.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 240,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 700,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "MagicPenetration"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 200,
                        "FlatMagicDamageMod": 100
                    },
                    "depth": 3
                },
                "6029": {
                    "name": "Ironspike Whip",
                    "description": "<mainText><stats><attention>30</attention> Attack Damage</stats><br><br><active>Active -</active> <active>Crescent:</active> Deal damage to nearby enemies.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1037"
                    ],
                    "into": [
                        "6630",
                        "6631"
                    ],
                    "image": {
                        "full": "6029.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 288,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 225,
                        "purchasable": true,
                        "total": 1100,
                        "sell": 770
                    },
                    "tags": [
                        "Damage",
                        "Active"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 30
                    },
                    "depth": 2
                },
                "6035": {
                    "name": "Silvermere Dawn",
                    "description": "<mainText><stats><attention>40</attention> Attack Damage<br><attention>300</attention> Health<br><attention>40</attention> Magic Resist</stats><br><br><active>Active -</active> <active>Quicksilver:</active> Remove all crowd control debuffs and gain Tenacity and Slow Resistance.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3140",
                        "1037",
                        "1028"
                    ],
                    "image": {
                        "full": "6035.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 336,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 425,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "Damage",
                        "Active",
                        "Tenacity"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 40,
                        "FlatHPPoolMod": 300,
                        "FlatSpellBlockMod": 40
                    },
                    "effect": {
                        "Effect1Amount": "0.5",
                        "Effect2Amount": "1",
                        "Effect3Amount": "90"
                    },
                    "depth": 3
                },
                "6333": {
                    "name": "Death's Dance",
                    "description": "<mainText><stats><attention>55</attention> Attack Damage<br><attention>45</attention> Armor<br><attention>15</attention> Ability Haste</stats><br><li><passive>Ignore Pain:</passive> Damage taken is dealt to you over time instead.<li><passive>Defy:</passive> Champion takedowns cleanse <passive>Ignore Pain's</passive> remaining damage pool and restore Health over time.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "stacks": 0,
                    "from": [
                        "1037",
                        "1031",
                        "3133"
                    ],
                    "image": {
                        "full": "6333.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 384,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 525,
                        "purchasable": true,
                        "total": 3300,
                        "sell": 2310
                    },
                    "tags": [
                        "Armor",
                        "Damage",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 55,
                        "FlatArmorMod": 45
                    },
                    "depth": 3
                },
                "6609": {
                    "name": "Chempunk Chainsword",
                    "description": "<mainText><stats><attention>55</attention> Attack Damage<br><attention>250</attention> Health<br><attention>25</attention> Ability Haste</stats><br><li><passive>Hackshorn:</passive> Dealing physical damage applies 25% <status>Grievous Wounds</status> to enemy champions for 3 seconds. If the target is below 50% Health, this effect is increased to 40% <status>Grievous Wounds</status>.<br><br><rules><status>Grievous Wounds</status> reduces the effectiveness of Healing and Regeneration effects.</rules></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3123",
                        "1028",
                        "3133"
                    ],
                    "image": {
                        "full": "6609.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 432,
                        "y": 0,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 500,
                        "purchasable": true,
                        "total": 2800,
                        "sell": 1960
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 55,
                        "FlatHPPoolMod": 250
                    },
                    "depth": 3
                },
                "6616": {
                    "name": "Staff of Flowing Water",
                    "description": "<mainText><stats><attention>50</attention> Ability Power<br><attention>8%</attention> Heal and Shield Power<br><attention>100%</attention> Base Mana Regen</stats><br><li><passive>Rapids:</passive> Healing or Shielding another ally grants you both Ability Power and Ability Haste.<br></mainText><br>",
                    "colloq": "",
                    "plaintext": "Your heals and shields reduce crowd control and grant Move Speed",
                    "from": [
                        "1052",
                        "3114",
                        "1052"
                    ],
                    "image": {
                        "full": "6616.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 0,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 630,
                        "purchasable": true,
                        "total": 2300,
                        "sell": 1610
                    },
                    "tags": [
                        "SpellDamage",
                        "ManaRegen",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMagicDamageMod": 50
                    },
                    "depth": 3
                },
                "6617": {
                    "name": "Moonstone Renewer",
                    "description": "<mainText><stats><attention>40</attention> Ability Power<br><attention>200</attention> Health<br><attention>20</attention> Ability Haste<br><attention>100%</attention> Base Mana Regen</stats><br><li><passive>Starlit Grace:</passive> When affecting champions with Attacks or Abilities in combat, restore Health to the most wounded nearby ally. Each second spent in combat with champions increases your Heal and Shield Power.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items an increase to <passive>Starlit Grace's</passive> Heal.<br><br></mainText><br>",
                    "colloq": "",
                    "plaintext": "Your heals and shields cool down faster and have greater effect on low health allies",
                    "from": [
                        "3067",
                        "4642"
                    ],
                    "into": [
                        "7021"
                    ],
                    "image": {
                        "full": "6617.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 48,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 750,
                        "purchasable": true,
                        "total": 2500,
                        "sell": 1750
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "CooldownReduction"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 200,
                        "FlatMagicDamageMod": 40
                    },
                    "depth": 3
                },
                "6630": {
                    "name": "Goredrinker",
                    "description": "<mainText><stats><attention>55</attention> Attack Damage<br><attention>300</attention> Health<br><attention>20</attention> Ability Haste<br><attention>8%</attention> Omnivamp</stats><br><br><active>Active -</active> <active>Thirsting Slash:</active> Deal damage to nearby enemies. Restore Health for each champion hit.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Haste.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6029",
                        "3133",
                        "3067"
                    ],
                    "into": [
                        "7015"
                    ],
                    "image": {
                        "full": "6630.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 96,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 300,
                        "purchasable": true,
                        "total": 3300,
                        "sell": 2310
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "LifeSteal",
                        "Active",
                        "CooldownReduction",
                        "SpellVamp",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 55,
                        "FlatHPPoolMod": 300
                    },
                    "depth": 3
                },
                "6631": {
                    "name": "Stridebreaker",
                    "description": "<mainText><stats><attention>50</attention> Attack Damage<br><attention>20%</attention> Attack Speed<br><attention>300</attention> Health<br><attention>20</attention> Ability Haste</stats><br><br><active>Active -</active> <active>Halting Slash:</active> Deal damage to nearby enemies, <status>Slowing</status> them. Can be cast while moving.<br><li><passive>Heroic Gait:</passive> Dealing physical damage grants Move Speed.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Move Speed.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6029",
                        "3051",
                        "3067"
                    ],
                    "into": [
                        "7016"
                    ],
                    "image": {
                        "full": "6631.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 144,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 400,
                        "purchasable": true,
                        "total": 3300,
                        "sell": 2310
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "AttackSpeed",
                        "Active",
                        "CooldownReduction",
                        "Slow",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 50,
                        "FlatHPPoolMod": 300,
                        "PercentAttackSpeedMod": 0.2
                    },
                    "effect": {
                        "Effect1Amount": "0.5",
                        "Effect2Amount": "0",
                        "Effect3Amount": "90",
                        "Effect4Amount": "0",
                        "Effect5Amount": "10"
                    },
                    "depth": 3
                },
                "6632": {
                    "name": "Divine Sunderer",
                    "description": "<mainText><stats><attention>40</attention> Attack Damage<br><attention>300</attention> Health<br><attention>20</attention> Ability Haste</stats><li><passive>Spellblade:</passive> After using an Ability, your next Attack is enhanced with additional damage <OnHit>On-Hit</OnHit>. If the target is a champion, also heal.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Armor Penetration and Magic Penetration.<br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3133",
                        "3057",
                        "3067"
                    ],
                    "into": [
                        "7017"
                    ],
                    "image": {
                        "full": "6632.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 192,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 700,
                        "purchasable": true,
                        "total": 3300,
                        "sell": 2310
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "LifeSteal",
                        "CooldownReduction",
                        "OnHit",
                        "MagicPenetration",
                        "ArmorPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 40,
                        "FlatHPPoolMod": 300
                    },
                    "depth": 3
                },
                "6653": {
                    "name": "Liandry's Anguish",
                    "description": "<mainText><stats><attention>80</attention> Ability Power<br><attention>600</attention> Mana<br><attention>20</attention> Ability Haste</stats><br><li><passive>Agony:</passive> Deal bonus magic damage to Champions based on the target's bonus Health.<li><passive>Torment:</passive> Dealing damage with Abilities causes enemies to burn over time.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Haste.</mainText><br>",
                    "colloq": "",
                    "plaintext": "Charge up in combat to deal high damage over time, especially against durable enemies",
                    "from": [
                        "3802",
                        "3108"
                    ],
                    "into": [
                        "7012"
                    ],
                    "image": {
                        "full": "6653.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 240,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1000,
                        "purchasable": true,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "SpellDamage",
                        "Mana",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMPPoolMod": 600,
                        "FlatMagicDamageMod": 80
                    },
                    "depth": 3
                },
                "6655": {
                    "name": "Luden's Tempest",
                    "description": "<mainText><stats><attention>80</attention> Ability Power<br><attention>6</attention> Magic Penetration<br><attention>600</attention> Mana<br><attention>20</attention> Ability Haste</stats><br><li><passive>Echo:</passive> Damaging Abilities deal magic damage to the target and 3 nearby enemies and grants you Move Speed. Dealing ability damage to Champions reduces this item's cooldown.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Magic Penetration. </mainText><br>",
                    "colloq": "",
                    "plaintext": "High burst damage, good against fragile foes",
                    "from": [
                        "3802",
                        "1026"
                    ],
                    "into": [
                        "7013"
                    ],
                    "image": {
                        "full": "6655.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 288,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 1050,
                        "purchasable": true,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "SpellDamage",
                        "Mana",
                        "CooldownReduction",
                        "NonbootsMovement",
                        "MagicPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMPPoolMod": 600,
                        "FlatMagicDamageMod": 80
                    },
                    "depth": 3
                },
                "6656": {
                    "name": "Everfrost",
                    "description": "<mainText><stats><attention>70</attention> Ability Power<br><attention>250</attention> Health<br><attention>600</attention> Mana<br><attention>20</attention> Ability Haste</stats><br><br><active>Active -</active> <active>Glaciate:</active> Deal damage in a cone, <status>Slowing</status> enemies hit. Enemies at the center of the cone are <status>Rooted</status> instead.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Power. <br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3067",
                        "3802",
                        "1052"
                    ],
                    "into": [
                        "7014"
                    ],
                    "image": {
                        "full": "6656.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 336,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 265,
                        "purchasable": true,
                        "total": 2800,
                        "sell": 1960
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "Mana",
                        "Active",
                        "CooldownReduction",
                        "Slow",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 250,
                        "FlatMPPoolMod": 600,
                        "FlatMagicDamageMod": 70
                    },
                    "depth": 3
                },
                "6657": {
                    "name": "Rod of Ages",
                    "description": "<mainText><stats><attention>60</attention> Ability Power<br><attention>400</attention> Health<br><attention>400</attention> Mana</stats><br><br>This item gains 20 Health, 20 Mana and 4 Ability Power every 60 seconds up to 10 times, for a maximum of 200 Health, 200 Mana,  and 40 Ability Power. Upon reaching max stacks, gain a level and all effects of Eternity are increased by 50%.<br><li><passive>Eternity:</passive> Restore Mana equal to 7% of premitigation damage taken from champions, and Health equal to 25% of Mana spent, up to 20 Health per cast, per second. For every 200 Health or Mana restored this way, gain <speed>35% Decaying Move Speed</speed> for 3 seconds.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention>5 Ability Haste.</attention></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1026",
                        "3803",
                        "1052"
                    ],
                    "into": [
                        "7028"
                    ],
                    "image": {
                        "full": "6657.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 384,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 415,
                        "purchasable": true,
                        "total": 2800,
                        "sell": 1960
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "SpellDamage",
                        "Mana",
                        "ManaRegen",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 400,
                        "FlatMPPoolMod": 400,
                        "FlatMagicDamageMod": 60
                    },
                    "depth": 3
                },
                "6660": {
                    "name": "Bami's Cinder",
                    "description": "<mainText><stats><attention>300</attention> Health</stats><br><li><passive>Immolate :</passive> Taking or dealing damage causes you to begin dealing magic damage per second to nearby enemies (increased against minions and monsters).</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1028",
                        "1028"
                    ],
                    "into": [
                        "3068"
                    ],
                    "image": {
                        "full": "6660.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 432,
                        "y": 48,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 200,
                        "purchasable": true,
                        "total": 1000,
                        "sell": 700
                    },
                    "tags": [
                        "Health"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 300
                    },
                    "depth": 2
                },
                "6662": {
                    "name": "Iceborn Gauntlet",
                    "description": "<mainText><stats><attention>400</attention> Health<br><attention>50</attention> Armor<br><attention>20</attention> Ability Haste</stats><br><li><passive>Spellblade:</passive> After using an Ability, your next Attack is enhanced with additional damage and creates a frost field for 2.5s. Enemies that move across the field are <status>Slowed</status>. Your primary target is crippled, applying a 100% stronger slow on them and reducing their damage by 10% against you for 2.5s. (1.5s ).<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention>50 Health</attention>, <attention>5%</attention> Tenacity, and <attention>5%</attention> Slow Resist.<br></mainText><br>",
                    "colloq": "",
                    "plaintext": "High Magic Resist.Passively slow nearby enemies. When spells are cast near you, release a wave of energy that damages and slows.",
                    "from": [
                        "3057",
                        "3067",
                        "1031"
                    ],
                    "into": [
                        "7005"
                    ],
                    "image": {
                        "full": "6662.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 0,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 700,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "Armor",
                        "CooldownReduction",
                        "Slow",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 400,
                        "FlatArmorMod": 50
                    },
                    "depth": 3
                },
                "6664": {
                    "name": "Turbo Chemtank",
                    "description": "<mainText><stats><attention>500</attention> Health<br><attention>50</attention> Magic Resist<br><attention>10</attention> Ability Haste</stats><br><br><active>Active -</active> <active>Supercharged:</active> Grants Move Speed towards enemies or enemy turrets. Once near an enemy (or after 4 seconds) a shockwave is emitted that <status>Slows</status> nearby champions.</mainText><br>",
                    "colloq": "",
                    "plaintext": "Immobilize enemies to gain a shield. Activate to run faster at opponents.",
                    "from": [
                        "3067",
                        "1057",
                        "1028"
                    ],
                    "image": {
                        "full": "6664.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 48,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 700,
                        "purchasable": true,
                        "total": 2800,
                        "sell": 1960
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "Active",
                        "CooldownReduction",
                        "Slow",
                        "NonbootsMovement",
                        "MagicResist",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 500,
                        "FlatSpellBlockMod": 50
                    },
                    "depth": 3
                },
                "6665": {
                    "name": "Jak'Sho, The Protean",
                    "description": "<mainText><stats><attention>400</attention> Health<br><attention>30</attention> Armor<br><attention>30</attention> Magic Resist<br><attention>20</attention> Ability Haste</stats><br><li><passive>Voidborn Resilience:</passive> For each second in champion combat gain a stack granting 2 <scaleArmor>Armor</scaleArmor> and <scaleMR>Magic Resist</scaleMR>, up to 8 stacks max. At max stacks become empowered, instantly draining enemies around you for 0 magic damage (healing you for the same amount), and increasing your bonus resists by 20% until end of combat.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention>5 Armor and Magic Resist</attention>.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3105",
                        "3067",
                        "1028"
                    ],
                    "into": [
                        "7026"
                    ],
                    "image": {
                        "full": "6665.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 96,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 800,
                        "purchasable": true,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "Armor",
                        "CooldownReduction",
                        "MagicResist",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 400,
                        "FlatSpellBlockMod": 30,
                        "FlatArmorMod": 30
                    },
                    "depth": 3
                },
                "6667": {
                    "name": "Radiant Virtue",
                    "description": "<mainText><stats><attention>400</attention> Health<br><attention>30</attention> Armor<br><attention>30</attention> Magic Resist<br><attention>20</attention> Ability Haste</stats><br><li><passive>Guiding Light:</passive> Upon casting your Ultimate you Transcend, increasing your Max Health by 10% for 9s. While Transcended you and allies within 1200 range of you gain 20 non-ultimate Ability Haste and heal for 2% of your max Health every 3 seconds, increased by up to 100% based on that champion's missing Health (60s ).<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention>100</attention> Health.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3105",
                        "3067",
                        "1028"
                    ],
                    "into": [
                        "7027"
                    ],
                    "image": {
                        "full": "6667.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 144,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 600,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "Armor",
                        "Aura",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 400,
                        "FlatSpellBlockMod": 30,
                        "FlatArmorMod": 30
                    },
                    "depth": 3
                },
                "6670": {
                    "name": "Noonquiver",
                    "description": "<mainText><stats><attention>30</attention> Attack Damage<br><attention>15%</attention> Attack Speed</stats><br><li><passive>Precision:</passive> Attacks deal additional damage to Minions and Monsters.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1036",
                        "1042",
                        "1036"
                    ],
                    "into": [
                        "6671",
                        "6672",
                        "6673"
                    ],
                    "image": {
                        "full": "6670.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 192,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 300,
                        "purchasable": true,
                        "total": 1300,
                        "sell": 910
                    },
                    "tags": [
                        "Damage",
                        "AttackSpeed"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 30,
                        "PercentAttackSpeedMod": 0.15
                    },
                    "depth": 2
                },
                "6671": {
                    "name": "Galeforce",
                    "description": "<mainText><stats><attention>60</attention> Attack Damage<br><attention>20%</attention> Attack Speed<br><attention>20%</attention> Critical Strike Chance</stats><br><br><active>Active -</active> <active>Cloudburst:</active> Dash in target direction, firing three missiles at the lowest Health enemy near your destination. Deals damage, increased against low Health targets.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Move Speed.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6670",
                        "1018",
                        "1037"
                    ],
                    "into": [
                        "7006"
                    ],
                    "image": {
                        "full": "6671.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 240,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 625,
                        "purchasable": true,
                        "total": 3400,
                        "sell": 2380
                    },
                    "tags": [
                        "Damage",
                        "CriticalStrike",
                        "AttackSpeed",
                        "Active",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 60,
                        "FlatCritChanceMod": 0.2,
                        "PercentAttackSpeedMod": 0.2
                    },
                    "depth": 3
                },
                "6672": {
                    "name": "Kraken Slayer",
                    "description": "<mainText><stats><attention>65</attention> Attack Damage<br><attention>25%</attention> Attack Speed<br><attention>20%</attention> Critical Strike Chance</stats><br><li><passive>Bring It Down:</passive> Every third Attack deals additional true damage.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Attack Speed.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6670",
                        "1018",
                        "1037"
                    ],
                    "into": [
                        "7007"
                    ],
                    "image": {
                        "full": "6672.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 288,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 625,
                        "purchasable": true,
                        "total": 3400,
                        "sell": 2380
                    },
                    "tags": [
                        "Damage",
                        "CriticalStrike",
                        "AttackSpeed",
                        "ArmorPenetration"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 65,
                        "FlatCritChanceMod": 0.2,
                        "PercentAttackSpeedMod": 0.25
                    },
                    "depth": 3
                },
                "6673": {
                    "name": "Immortal Shieldbow",
                    "description": "<mainText><stats><attention>50</attention> Attack Damage<br><attention>20%</attention> Attack Speed<br><attention>20%</attention> Critical Strike Chance<br><attention>7%</attention> Life Steal</stats><br><li><passive>Lifeline:</passive> When taking damage that would reduce you below 30% Health, gain a Shield. In addition, gain Attack Damage.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Attack Damage and Health.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6670",
                        "1018",
                        "1053"
                    ],
                    "into": [
                        "7008"
                    ],
                    "image": {
                        "full": "6673.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 336,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 600,
                        "purchasable": true,
                        "total": 3400,
                        "sell": 2380
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "CriticalStrike",
                        "AttackSpeed",
                        "LifeSteal"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 50,
                        "FlatCritChanceMod": 0.2,
                        "PercentAttackSpeedMod": 0.2,
                        "PercentLifeStealMod": 0.07
                    },
                    "depth": 3
                },
                "6675": {
                    "name": "Navori Quickblades",
                    "description": "<mainText><stats><attention>60</attention> Attack Damage<br><attention>20%</attention> Critical Strike Chance<br><attention>20</attention> Ability Haste</stats><br><li><passive>Transcendence:</passive>  If you have at least 60% Critical Strike Chance, your Attacks reduce your non-Ultimate Ability cooldowns.<li><passive>Impermanence:</passive> Your abilities deal increased damage based on Critical Strike Chance.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3133",
                        "1037",
                        "1018"
                    ],
                    "image": {
                        "full": "6675.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 384,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 825,
                        "purchasable": true,
                        "total": 3400,
                        "sell": 2380
                    },
                    "tags": [
                        "Damage",
                        "CriticalStrike",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 60,
                        "FlatCritChanceMod": 0.2
                    },
                    "effect": {
                        "Effect1Amount": "0.5",
                        "Effect2Amount": "1",
                        "Effect3Amount": "90"
                    },
                    "depth": 3
                },
                "6676": {
                    "name": "The Collector",
                    "description": "<mainText><stats><attention>55</attention> Attack Damage<br><attention>20%</attention> Critical Strike Chance<br><attention>12</attention> Lethality</stats><br><li><passive>Death and Taxes:</passive> Dealing damage that would leave an enemy champion below 5% Health executes them. Champion kills grant an additional 25 gold.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3134",
                        "1037",
                        "1018"
                    ],
                    "image": {
                        "full": "6676.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 432,
                        "y": 96,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 425,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Damage",
                        "CriticalStrike",
                        "ArmorPenetration"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 55,
                        "FlatCritChanceMod": 0.2
                    },
                    "depth": 3
                },
                "6677": {
                    "name": "Rageknife",
                    "description": "<mainText><stats><attention>25%</attention> Attack Speed</stats><br><li><passive>Wrath:</passive> Your Critical Strike Chance is converted into <OnHit>On-Hit</OnHit> damage. Gain <physicalDamage>35</physicalDamage> <OnHit>On-Hit</OnHit> for each 20% Critical Strike Chance converted.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "1042",
                        "1042"
                    ],
                    "into": [
                        "3124"
                    ],
                    "image": {
                        "full": "6677.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 0,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 200,
                        "purchasable": true,
                        "total": 800,
                        "sell": 560
                    },
                    "tags": [
                        "AttackSpeed",
                        "OnHit"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "PercentAttackSpeedMod": 0.25
                    },
                    "depth": 2
                },
                "6691": {
                    "name": "Duskblade of Draktharr",
                    "description": "<mainText><stats><attention>60</attention> Attack Damage<br><attention>18</attention> Lethality<br><attention>20</attention> Ability Haste</stats><br><li><passive>Nightstalker:</passive> Attacking a champion deals additional damage. If dealt by a Melee champion, this Attack also <status>Slows</status> the target.  When a champion that you have damaged within the last 3 seconds dies, this cooldown is refreshed and you become <keywordStealth>Invisible</keywordStealth>.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Haste and Move Speed.<br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3134",
                        "3133"
                    ],
                    "into": [
                        "7002"
                    ],
                    "image": {
                        "full": "6691.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 48,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 900,
                        "purchasable": true,
                        "total": 3100,
                        "sell": 2170
                    },
                    "tags": [
                        "Damage",
                        "Stealth",
                        "CooldownReduction",
                        "Slow",
                        "NonbootsMovement",
                        "ArmorPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 60
                    },
                    "depth": 3
                },
                "6692": {
                    "name": "Eclipse",
                    "description": "<mainText><stats><attention>60</attention> Attack Damage<br><attention>12</attention> Lethality<br><attention>7%</attention> Omnivamp</stats><br><br><li><passive>Ever Rising Moon:</passive> Hitting a champion with 2 separate Attacks or Abilities within 1.5 seconds deals additional damage, grants you Move Speed and a Shield.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Armor Penetration and Move Speed.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3134",
                        "1036",
                        "1053"
                    ],
                    "into": [
                        "7001"
                    ],
                    "image": {
                        "full": "6692.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 96,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 750,
                        "purchasable": true,
                        "total": 3100,
                        "sell": 2170
                    },
                    "tags": [
                        "Damage",
                        "LifeSteal",
                        "SpellVamp",
                        "NonbootsMovement",
                        "ArmorPenetration"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 60
                    },
                    "depth": 3
                },
                "6693": {
                    "name": "Prowler's Claw",
                    "description": "<mainText><stats><attention>60</attention> Attack Damage<br><attention>18</attention> Lethality<br><attention>20</attention> Ability Haste</stats><br><br><active>Active -</active> <active>Sandswipe:</active> Dash through target enemy champion, dealing damage. You deal increased damage to the target.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Lethality and Move Speed.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3134",
                        "3133"
                    ],
                    "into": [
                        "7000"
                    ],
                    "image": {
                        "full": "6693.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 144,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 900,
                        "purchasable": true,
                        "total": 3100,
                        "sell": 2170
                    },
                    "tags": [
                        "Damage",
                        "Active",
                        "CooldownReduction",
                        "NonbootsMovement",
                        "ArmorPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 60
                    },
                    "depth": 3
                },
                "6694": {
                    "name": "Serylda's Grudge",
                    "description": "<mainText><stats><attention>45</attention> Attack Damage<br><attention>30%</attention> Armor Penetration<br><attention>20</attention> Ability Haste</stats><br><li><passive>Bitter Cold:</passive> Damaging Abilities <status>Slow</status> enemies.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3133",
                        "3035"
                    ],
                    "image": {
                        "full": "6694.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 192,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 650,
                        "purchasable": true,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "Damage",
                        "CooldownReduction",
                        "ArmorPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 45
                    },
                    "depth": 3
                },
                "6695": {
                    "name": "Serpent's Fang",
                    "description": "<mainText><stats><attention>55</attention> Attack Damage<br><attention>12</attention> Lethality</stats><br><li><passive>Shield Reaver:</passive> Dealing damage to an enemy champion reduces any shields they gain. When you damage an enemy who is unaffected by Shield Reaver, reduce all shields on them.<br><br>Item performance differs for melee and ranged users.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3134",
                        "1037"
                    ],
                    "image": {
                        "full": "6695.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 240,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 625,
                        "purchasable": true,
                        "total": 2600,
                        "sell": 1820
                    },
                    "tags": [
                        "Damage",
                        "ArmorPenetration"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 55
                    },
                    "depth": 3
                },
                "6696": {
                    "name": "Axiom Arc",
                    "description": "<mainText><stats><attention>55</attention> Attack Damage<br><attention>18</attention> Lethality<br><attention>25</attention> Ability Haste</stats><br><li><passive>Flux:</passive> Whenever a Champion dies within 3 seconds of you having damaged them, refund 20% of your Ultimate Ability's total cooldown.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3134",
                        "3133"
                    ],
                    "image": {
                        "full": "6696.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 288,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 800,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Damage",
                        "ArmorPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 55
                    },
                    "depth": 3
                },
                "7000": {
                    "name": "Sandshrike's Claw",
                    "description": "<mainText><stats><ornnBonus>75</ornnBonus> Attack Damage<br><ornnBonus>26</ornnBonus> Lethality<br><ornnBonus>25</ornnBonus> Ability Haste</stats><br><br><active>Active -</active> <active>Sandswipe:</active> Dash through target enemy champion, dealing damage. You deal increased damage to the target.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Lethality and Move Speed.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6693"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7000.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 336,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3100,
                        "sell": 2170
                    },
                    "tags": [
                        "Damage",
                        "Active",
                        "CooldownReduction",
                        "NonbootsMovement",
                        "ArmorPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 75
                    },
                    "depth": 4
                },
                "7001": {
                    "name": "Syzygy",
                    "description": "<mainText><stats><ornnBonus>80</ornnBonus> Attack Damage<br><ornnBonus>20</ornnBonus> Lethality<br><ornnBonus>8%</ornnBonus> Omnivamp</stats><br><br><li><passive>Ever Rising Moon:</passive> Hitting a champion with 2 separate Attacks or Abilities within 1.5 seconds deals additional damage, grants you Move Speed and a Shield.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Armor Penetration and Move Speed.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6692"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7001.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 384,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3100,
                        "sell": 2170
                    },
                    "tags": [
                        "Damage",
                        "LifeSteal",
                        "SpellVamp",
                        "NonbootsMovement",
                        "ArmorPenetration"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 80
                    },
                    "depth": 4
                },
                "7002": {
                    "name": "Draktharr's Shadowcarver",
                    "description": "<mainText><stats><ornnBonus>75</ornnBonus> Attack Damage<br><ornnBonus>26</ornnBonus> Lethality<br><ornnBonus>25</ornnBonus> Ability Haste</stats><br><li><passive>Nightstalker:</passive> Attacking a champion deals additional damage. If dealt by a Melee champion, this Attack also <status>Slows</status> the target.  When a champion that you have damaged within the last 3 seconds dies, this cooldown is refreshed and you become <keywordStealth>Invisible</keywordStealth>.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Haste and Move Speed.<br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6691"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7002.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 432,
                        "y": 144,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3100,
                        "sell": 2170
                    },
                    "tags": [
                        "Damage",
                        "Stealth",
                        "CooldownReduction",
                        "Slow",
                        "NonbootsMovement",
                        "ArmorPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 75
                    },
                    "depth": 4
                },
                "7005": {
                    "name": "Frozen Fist",
                    "description": "<mainText><stats><ornnBonus>550</ornnBonus> Health<br><ornnBonus>70</ornnBonus> Armor<br><ornnBonus>25</ornnBonus> Ability Haste</stats><br><li><passive>Spellblade:</passive> After using an Ability, your next Attack is enhanced with additional damage and creates a frost field for 2.5s. Enemies that move across the field are <status>Slowed</status>. Your primary target is crippled, applying a 100% stronger slow on them and reducing their damage by 10% against you for 2.5s. (1.5s ).<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention>50 Health</attention>, <attention>5%</attention> Tenacity, and <attention>5%</attention> Slow Resist.<br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6662"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7005.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 0,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "Armor",
                        "CooldownReduction",
                        "Slow",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 550,
                        "FlatArmorMod": 70
                    },
                    "depth": 4
                },
                "7006": {
                    "name": "Typhoon",
                    "description": "<mainText><stats><ornnBonus>80</ornnBonus> Attack Damage<br><ornnBonus>35%</ornnBonus> Attack Speed<br><attention>20%</attention> Critical Strike Chance</stats><br><br><active>Active -</active> <active>Cloudburst:</active> Dash in target direction, firing three missiles at the lowest Health enemy near your destination. Deals damage, increased against low Health targets.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Move Speed.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6671"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7006.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 48,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3400,
                        "sell": 2380
                    },
                    "tags": [
                        "Damage",
                        "CriticalStrike",
                        "AttackSpeed",
                        "Active",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 80,
                        "FlatCritChanceMod": 0.2,
                        "PercentAttackSpeedMod": 0.35
                    },
                    "depth": 4
                },
                "7007": {
                    "name": "Wyrmfallen Sacrifice",
                    "description": "<mainText><stats><ornnBonus>85</ornnBonus> Attack Damage<br><ornnBonus>40%</ornnBonus> Attack Speed<br><attention>20%</attention> Critical Strike Chance</stats><br><li><passive>Bring It Down:</passive> Every third Attack deals additional true damage.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Attack Speed.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6672"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7007.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 96,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3400,
                        "sell": 2380
                    },
                    "tags": [
                        "Damage",
                        "CriticalStrike",
                        "AttackSpeed",
                        "ArmorPenetration"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 85,
                        "FlatCritChanceMod": 0.2,
                        "PercentAttackSpeedMod": 0.4
                    },
                    "depth": 4
                },
                "7008": {
                    "name": "Bloodward",
                    "description": "<mainText><stats><ornnBonus>65</ornnBonus> Attack Damage<br><ornnBonus>30%</ornnBonus> Attack Speed<br><attention>20%</attention> Critical Strike Chance<br><ornnBonus>8%</ornnBonus> Life Steal</stats><br><li><passive>Lifeline:</passive> When taking damage that would reduce you below 30% Health, gain a Shield. In addition, gain Attack Damage.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Attack Damage and Health.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6673"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7008.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 144,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3400,
                        "sell": 2380
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "CriticalStrike",
                        "AttackSpeed",
                        "LifeSteal"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 65,
                        "FlatCritChanceMod": 0.2,
                        "PercentAttackSpeedMod": 0.3,
                        "PercentLifeStealMod": 0.08
                    },
                    "depth": 4
                },
                "7009": {
                    "name": "Icathia's Curse",
                    "description": "<mainText><stats><ornnBonus>90</ornnBonus> Ability Power<br><ornnBonus>450</ornnBonus> Health<br><ornnBonus>20</ornnBonus> Ability Haste<br><ornnBonus>8%</ornnBonus> Omnivamp</stats><br><li><passive>Void Corruption:</passive> For each second damaging enemy champions, deal bonus damage. At maximum strength, the bonus damage is dealt as <trueDamage>true damage</trueDamage> instead. <br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Omnivamp and Ability Power.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "4633"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7009.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 192,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "CooldownReduction",
                        "SpellVamp",
                        "MagicPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 450,
                        "FlatMagicDamageMod": 90
                    },
                    "depth": 4
                },
                "7010": {
                    "name": "Vespertide",
                    "description": "<mainText><stats><ornnBonus>120</ornnBonus> Ability Power<br><ornnBonus>400</ornnBonus> Health<br><ornnBonus>30</ornnBonus> Ability Haste</stats><br><li><passive>Soulrend:</passive> Damaging a champion deals additional magic damage and grants you Move Speed.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Haste.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "4636"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7010.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 240,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "CooldownReduction",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 400,
                        "FlatMagicDamageMod": 120
                    },
                    "depth": 4
                },
                "7011": {
                    "name": "Upgraded Aeropack",
                    "description": "<mainText><stats><ornnBonus>120</ornnBonus> Ability Power<br><ornnBonus>10</ornnBonus> Magic Penetration<br><ornnBonus>350</ornnBonus> Health<br><ornnBonus>20</ornnBonus> Ability Haste</stats><br><br><active>Active -</active> <active>Supersonic:</active> Dash in target direction, unleashing an arc of magic missiles that deal damage. Then, gain Move Speed towards enemy champions.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Magic Penetration.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3152"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7011.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 288,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "Active",
                        "CooldownReduction",
                        "NonbootsMovement",
                        "MagicPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 350,
                        "FlatMagicDamageMod": 120
                    },
                    "depth": 4
                },
                "7012": {
                    "name": "Liandry's Lament",
                    "description": "<mainText><stats><ornnBonus>110</ornnBonus> Ability Power<br><ornnBonus>800</ornnBonus> Mana<br><ornnBonus>25</ornnBonus> Ability Haste</stats><br><li><passive>Agony:</passive> Deal bonus magic damage to Champions based on the target's bonus Health.<li><passive>Torment:</passive> Dealing damage with Abilities causes enemies to burn over time.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Haste.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6653"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7012.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 336,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "SpellDamage",
                        "Mana",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMPPoolMod": 800,
                        "FlatMagicDamageMod": 110
                    },
                    "depth": 4
                },
                "7013": {
                    "name": "Eye of Luden",
                    "description": "<mainText><stats><ornnBonus>100</ornnBonus> Ability Power<br><ornnBonus>10</ornnBonus> Magic Penetration<br><ornnBonus>800</ornnBonus> Mana<br><ornnBonus>25</ornnBonus> Ability Haste</stats><br><li><passive>Echo:</passive> Damaging Abilities deal magic damage to the target and 3 nearby enemies and grants you Move Speed. Dealing ability damage to Champions reduces this item's cooldown.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Magic Penetration. </mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6655"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7013.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 384,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "SpellDamage",
                        "Mana",
                        "CooldownReduction",
                        "NonbootsMovement",
                        "MagicPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatMPPoolMod": 800,
                        "FlatMagicDamageMod": 100
                    },
                    "depth": 4
                },
                "7014": {
                    "name": "Eternal Winter",
                    "description": "<mainText><stats><ornnBonus>90</ornnBonus> Ability Power<br><ornnBonus>350</ornnBonus> Health<br><ornnBonus>800</ornnBonus> Mana<br><ornnBonus>25</ornnBonus> Ability Haste</stats><br><br><active>Active -</active> <active>Glaciate:</active> Deal damage in a cone, <status>Slowing</status> enemies hit. Enemies at the center of the cone are <status>Rooted</status> instead.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Power. <br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6656"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7014.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 432,
                        "y": 192,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 2800,
                        "sell": 1960
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "Mana",
                        "Active",
                        "CooldownReduction",
                        "Slow",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 350,
                        "FlatMPPoolMod": 800,
                        "FlatMagicDamageMod": 90
                    },
                    "depth": 4
                },
                "7015": {
                    "name": "Ceaseless Hunger",
                    "description": "<mainText><stats><ornnBonus>70</ornnBonus> Attack Damage<br><ornnBonus>450</ornnBonus> Health<br><ornnBonus>25</ornnBonus> Ability Haste<br><ornnBonus>12%</ornnBonus> Omnivamp</stats><br><br><active>Active -</active> <active>Thirsting Slash:</active> Deal damage to nearby enemies. Restore Health for each champion hit.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Haste.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6630"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7015.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 0,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3300,
                        "sell": 2310
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "LifeSteal",
                        "Active",
                        "CooldownReduction",
                        "SpellVamp",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 70,
                        "FlatHPPoolMod": 450
                    },
                    "depth": 4
                },
                "7016": {
                    "name": "Dreamshatter",
                    "description": "<mainText><stats><ornnBonus>60</ornnBonus> Attack Damage<br><ornnBonus>30%</ornnBonus> Attack Speed<br><ornnBonus>400</ornnBonus> Health<br><ornnBonus>25</ornnBonus> Ability Haste</stats><br><br><active>Active -</active> <active>Halting Slash:</active> Deal damage to nearby enemies, <status>Slowing</status> them. Can be cast while moving.<br><li><passive>Heroic Gait:</passive> Dealing physical damage grants Move Speed.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Move Speed.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6631"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7016.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 48,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3300,
                        "sell": 2310
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "AttackSpeed",
                        "Active",
                        "CooldownReduction",
                        "Slow",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 60,
                        "FlatHPPoolMod": 400,
                        "PercentAttackSpeedMod": 0.3
                    },
                    "effect": {
                        "Effect1Amount": "0.5",
                        "Effect2Amount": "0",
                        "Effect3Amount": "90",
                        "Effect4Amount": "0",
                        "Effect5Amount": "10"
                    },
                    "depth": 4
                },
                "7017": {
                    "name": "Deicide",
                    "description": "<mainText><stats><ornnBonus>60</ornnBonus> Attack Damage<br><ornnBonus>450</ornnBonus> Health<br><ornnBonus>25</ornnBonus> Ability Haste</stats><li><passive>Spellblade:</passive> After using an Ability, your next Attack is enhanced with additional damage <OnHit>On-Hit</OnHit>. If the target is a champion, also heal.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Armor Penetration and Magic Penetration.<br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6632"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7017.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 96,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3300,
                        "sell": 2310
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "LifeSteal",
                        "CooldownReduction",
                        "OnHit",
                        "MagicPenetration",
                        "ArmorPenetration",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 60,
                        "FlatHPPoolMod": 450
                    },
                    "depth": 4
                },
                "7018": {
                    "name": "Infinity Force",
                    "description": "<mainText><stats><ornnBonus>45</ornnBonus> Attack Damage<br><ornnBonus>40%</ornnBonus> Attack Speed<br><ornnBonus>400</ornnBonus> Health<br><ornnBonus>25</ornnBonus> Ability Haste</stats><br><li><passive>Threefold Strike:</passive> Attacks grant Move Speed. If the target is a champion, increase your base Attack Damage, stacking.<li><passive>Spellblade:</passive> After using an Ability, your next Attack is enhanced with additional damage.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Attack Damage, Ability Haste, and Move Speed.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3078"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7018.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 144,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3333,
                        "sell": 2333
                    },
                    "tags": [
                        "Health",
                        "Damage",
                        "AttackSpeed",
                        "CooldownReduction",
                        "OnHit",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatPhysicalDamageMod": 45,
                        "FlatHPPoolMod": 400,
                        "PercentAttackSpeedMod": 0.4
                    },
                    "effect": {
                        "Effect1Amount": "25",
                        "Effect2Amount": "60",
                        "Effect3Amount": "2",
                        "Effect4Amount": "1.5",
                        "Effect5Amount": "1.5"
                    },
                    "depth": 4
                },
                "7019": {
                    "name": "Reliquary of the Golden Dawn",
                    "description": "<mainText><stats><ornnBonus>400</ornnBonus> Health<br><ornnBonus>25</ornnBonus> Ability Haste<br><ornnBonus>40</ornnBonus> Armor<br><ornnBonus>40</ornnBonus> Magic Resist</stats><br><br><active>Active -</active> <active>Devotion:</active> Grant nearby allies a <shield>Shield</shield>, decaying over time.<br><li><passive>Consecrate:</passive> Grant nearby allied champions Armor and <scaleMR>Magic Resist</scaleMR>. <br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Armor and Magic Resist increase to <passive>Consecrate</passive>.<br><br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3190"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7019.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 192,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 2500,
                        "sell": 1750
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "Armor",
                        "Aura",
                        "Active",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 400,
                        "FlatSpellBlockMod": 40,
                        "FlatArmorMod": 40
                    },
                    "depth": 4
                },
                "7020": {
                    "name": "Shurelya's Requiem",
                    "description": "<mainText><stats><ornnBonus>70</ornnBonus> Ability Power<br><ornnBonus>300</ornnBonus> Health<br><ornnBonus>25</ornnBonus> Ability Haste<br><ornnBonus>200%</ornnBonus> Base Mana Regen</stats><br><br><active>Active -</active> <active>Inspire:</active> Grants nearby allies Move Speed.<li><passive>Motivate:</passive> Empowering or Protecting another ally Champion grants both allies Move Speed.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Haste.<br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "2065"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7020.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 240,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 2500,
                        "sell": 1750
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "ManaRegen",
                        "Active",
                        "CooldownReduction",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 300,
                        "FlatMagicDamageMod": 70
                    },
                    "depth": 4
                },
                "7021": {
                    "name": "Starcaster",
                    "description": "<mainText><stats><ornnBonus>70</ornnBonus> Ability Power<br><ornnBonus>300</ornnBonus> Health<br><ornnBonus>25</ornnBonus> Ability Haste<br><ornnBonus>200%</ornnBonus> Base Mana Regen</stats><br><li><passive>Starlit Grace:</passive> When affecting champions with Attacks or Abilities in combat, restore Health to the most wounded nearby ally. Each second spent in combat with champions increases your Heal and Shield Power.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items an increase to <passive>Starlit Grace's</passive> Heal.<br><br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6617"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7021.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 288,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 2500,
                        "sell": 1750
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "CooldownReduction"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 300,
                        "FlatMagicDamageMod": 70
                    },
                    "depth": 4
                },
                "7022": {
                    "name": "Seat of Command",
                    "description": "<mainText><stats><ornnBonus>70</ornnBonus> Ability Power<br><ornnBonus>300</ornnBonus> Health<br><ornnBonus>25</ornnBonus> Ability Haste<br><ornnBonus>200%</ornnBonus> Base Mana Regen</stats><br><li><passive>Coordinated Fire:</passive> Abilities that <status>Slow</status> or <status>Immobilize</status> a champion deal bonus damage and mark them. Ally champion damage detonates the mark, dealing additional damage and granting you both Move Speed. <br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Ability Power. <br></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "4005"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7022.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 336,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 2500,
                        "sell": 1750
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "ManaRegen",
                        "CooldownReduction",
                        "NonbootsMovement"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 300,
                        "FlatMagicDamageMod": 70
                    },
                    "depth": 4
                },
                "7023": {
                    "name": "Equinox",
                    "description": "<mainText><stats><ornnBonus>400</ornnBonus> Health<br><ornnBonus>25</ornnBonus> Ability Haste<br><ornnBonus>40</ornnBonus> Armor<br><ornnBonus>40</ornnBonus> Magic Resist</stats><br><li><passive>Coruscation:</passive> After <status>Immobilizing</status> champions or being <status>Immobilized</status>, cause that target and all nearby enemy Champions to take increased damage.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention> Armor and Magic Resist</attention></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3001"
                    ],
                    "inStore": false,
                    "image": {
                        "full": "7023.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 384,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 2500,
                        "sell": 1750
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "Armor",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 400,
                        "FlatSpellBlockMod": 40,
                        "FlatArmorMod": 40
                    },
                    "depth": 4
                },
                "7024": {
                    "name": "Caesura",
                    "description": "<mainText><stats><ornnBonus>90</ornnBonus> Ability Power<br><ornnBonus>350</ornnBonus> Health<br><ornnBonus>800</ornnBonus> Mana<br><ornnBonus>25</ornnBonus> Ability Haste</stats><br><li><passive>Divine Safeguard:</passive> You are <keywordMajor>Safeguarded</keywordMajor>, reducing incoming champion damage. <keywordMajor>Safeguard</keywordMajor> persists for 1.5 seconds after taking champion damage. <li><passive>Holy Gift:</passive> While <keywordMajor>Safeguarded</keywordMajor> and for 3 seconds after it is broken, gain  Ability Power. <br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Move Speed and Ability Power.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "4644"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7024.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 432,
                        "y": 240,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 2800,
                        "sell": 1960
                    },
                    "tags": [
                        "Health",
                        "SpellDamage",
                        "Mana",
                        "NonbootsMovement",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 350,
                        "FlatMPPoolMod": 800,
                        "FlatMagicDamageMod": 90
                    },
                    "depth": 4
                },
                "7025": {
                    "name": "Leviathan",
                    "description": "<mainText><stats><ornnBonus>1050</ornnBonus> Health<br><ornnBonus>300%</ornnBonus> Base Health Regen<br><ornnBonus>25</ornnBonus> Ability Haste</stats><br><li><passive>Colossal Consumption:</passive> Charge up a powerful attack against a champion over 3s while within 700 range of them. The charged attack deals 125 + <scalehealth>6%</scalehealth> of your max Health as bonus physical damage, and grants you 10% of that amount as permanent max Health. (30s) cooldown per target.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention>1%</attention> Increased Health & <attention>6%</attention> Champion Size.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3084"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7025.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 0,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 1050
                    },
                    "depth": 4
                },
                "7026": {
                    "name": "The Unspoken Parasite",
                    "description": "<mainText><stats><ornnBonus>550</ornnBonus> Health<br><ornnBonus>40</ornnBonus> Armor<br><ornnBonus>40</ornnBonus> Magic Resist<br><ornnBonus>25</ornnBonus> Ability Haste</stats><br><li><passive>Voidborn Resilience:</passive> For each second in champion combat gain a stack granting 2 <scaleArmor>Armor</scaleArmor> and <scaleMR>Magic Resist</scaleMR>, up to 8 stacks max. At max stacks become empowered, instantly draining enemies around you for 0 magic damage (healing you for the same amount), and increasing your bonus resists by 20% until end of combat.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention>5 Armor and Magic Resist</attention>.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6665"
                    ],
                    "inStore": false,
                    "requiredAlly": "Ornn",
                    "image": {
                        "full": "7026.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 48,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3200,
                        "sell": 2240
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "Armor",
                        "CooldownReduction",
                        "MagicResist",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 550,
                        "FlatSpellBlockMod": 40,
                        "FlatArmorMod": 40
                    },
                    "depth": 4
                },
                "7027": {
                    "name": "Primordial Dawn",
                    "description": "<mainText><stats><ornnBonus>550</ornnBonus> Health<br><ornnBonus>40</ornnBonus> Armor<br><ornnBonus>40</ornnBonus> Magic Resist<br><ornnBonus>25</ornnBonus> Ability Haste</stats><br><li><passive>Guiding Light:</passive> Upon casting your Ultimate you Transcend, increasing your Max Health by 10% for 9s. While Transcended you and allies within 1200 range of you gain 20 non-ultimate Ability Haste and heal for 2% of your max Health every 3 seconds, increased by up to 100% based on that champion's missing Health (60s ).<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention>100</attention> Health.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6667"
                    ],
                    "inStore": false,
                    "image": {
                        "full": "7027.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 96,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "Armor",
                        "Aura",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 550,
                        "FlatSpellBlockMod": 40,
                        "FlatArmorMod": 40
                    },
                    "depth": 4
                },
                "7028": {
                    "name": "Infinite Convergence",
                    "description": "<mainText><stats><ornnBonus>80</ornnBonus> Ability Power<br><ornnBonus>550</ornnBonus> Health<br><ornnBonus>550</ornnBonus> Mana</stats><br><br>This item gains 20 Health, 20 Mana and 4 Ability Power every 60 seconds up to 10 times, for a maximum of 200 Health, 200 Mana,  and 40 Ability Power. Upon reaching max stacks, gain a level and all effects of Eternity are increased by 50%.<br><li><passive>Eternity:</passive> Restore Mana equal to 7% of premitigation damage taken from champions, and Health equal to 25% of Mana spent, up to 20 Health per cast, per second. For every 200 Health or Mana restored this way, gain <speed>35% Decaying Move Speed</speed> for 3 seconds.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention>5 Ability Haste.</attention></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "6657"
                    ],
                    "inStore": false,
                    "image": {
                        "full": "7028.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 144,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 2800,
                        "sell": 1960
                    },
                    "tags": [
                        "Health",
                        "HealthRegen",
                        "SpellDamage",
                        "Mana",
                        "ManaRegen",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 550,
                        "FlatMPPoolMod": 550,
                        "FlatMagicDamageMod": 80
                    },
                    "depth": 4
                },
                "7050": {
                    "name": "Gangplank Placeholder",
                    "description": "",
                    "colloq": "",
                    "plaintext": "New Gangplank interface coming soon!",
                    "stacks": 0,
                    "consumed": true,
                    "consumeOnFull": true,
                    "inStore": false,
                    "requiredChampion": "Gangplank",
                    "hideFromAll": true,
                    "image": {
                        "full": "7050.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 192,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 0,
                        "purchasable": false,
                        "total": 0,
                        "sell": 0
                    },
                    "tags": [],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {}
                },
                "8001": {
                    "name": "Anathema's Chains",
                    "description": "<mainText><stats><attention>650</attention> Health<br><attention>20</attention> Ability Haste</stats><br><br><active>Active -</active> <active>Vow:</active> Choose a Nemesis to start building a Vendetta (90s).<br><li><passive>Vendetta:</passive> Take reduced damage from your Nemesis, increasing per Vendetta stack. You gain stacks over time, and reach the maximum number of stacks after 60 seconds.<li><passive>Vengeance:</passive> At maximum stacks, your Nemesis has reduced Tenacity while near you.<br><br><rules>Active can be cast while dead and at global range. Stacks reset upon choosing a new target. Cannot be cast for 15 seconds while in-combat with champions.</rules><br><br><flavorText>\"She swore to dedicate her life to his destruction. The gauntlets heard.\"</flavorText></mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3067",
                        "1011"
                    ],
                    "image": {
                        "full": "8001.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 240,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 800,
                        "purchasable": true,
                        "total": 2500,
                        "sell": 1750
                    },
                    "tags": [
                        "Health",
                        "Active",
                        "CooldownReduction",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 650
                    },
                    "depth": 3
                },
                "8020": {
                    "name": "Abyssal Mask",
                    "description": "<mainText><stats><attention>500</attention> Health<br><attention>300</attention> Mana<br><attention>40</attention> Magic Resist<br><attention>10</attention> Ability Haste</stats><br><li><passive>Eternity:</passive> Restore Mana equal to 7% of premitigation damage taken from champions, and Health equal to 25% of Mana spent, up to 20 Health per cast, per second.<li><passive>Unmake:</passive> <status>Curse</status> nearby enemy champions, reducing their Magic Resist. For each <status>Cursed</status> enemy, gain Magic Resist.</mainText><br>",
                    "colloq": "",
                    "plaintext": "",
                    "from": [
                        "3803",
                        "3211"
                    ],
                    "image": {
                        "full": "8020.png",
                        "sprite": "item2.png",
                        "group": "item",
                        "x": 288,
                        "y": 288,
                        "w": 48,
                        "h": 48
                    },
                    "gold": {
                        "base": 650,
                        "purchasable": true,
                        "total": 3000,
                        "sell": 2100
                    },
                    "tags": [
                        "Health",
                        "SpellBlock",
                        "HealthRegen",
                        "Mana",
                        "ManaRegen",
                        "CooldownReduction",
                        "MagicPenetration",
                        "MagicResist",
                        "AbilityHaste"
                    ],
                    "maps": {
                        "11": true,
                        "12": true,
                        "21": true,
                        "22": false
                    },
                    "stats": {
                        "FlatHPPoolMod": 500,
                        "FlatSpellBlockMod": 40,
                        "FlatMPPoolMod": 300
                    },
                    "depth": 3
                }
            }
        }

       res.json(finalResponse)
    })


}
