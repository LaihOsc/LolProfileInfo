require('dotenv').config()
const axios = require('axios')
const api_key = process.env.API_KEY



module.exports = async (req, res) => {

    const {name} = req.params

    const profileData = await axios.get(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${api_key}`)

    const {id , puuid} = profileData.data
    
    const champMasteryData = await axios.get(`https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${api_key}`)

    const matchIdData = await axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${api_key}`)

    function getMatch(matchId) {
        return axios.get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api_key}`)
    }

    async function getDataWithMatch() {
        const withMatch = await Promise.all(matchIdData.data.map(match => (getMatch(match))))
        return withMatch
    }

    getDataWithMatch().then(response => {

        let finalResponse = {
            'profile': profileData.data,
            'mastery': champMasteryData.data,
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
            ]
        }

       res.json(finalResponse)
    })


}
