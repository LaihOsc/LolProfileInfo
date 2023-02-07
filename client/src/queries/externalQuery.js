import { useQuery } from 'react-query'

module.exports( () => {
    const summonerSpellData = useQuery('summonerSpellJson', () =>
  fetch('http://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/summoner.json').then(res =>
    res.json()
  )
)

if (summonerSpellData.isLoading) return 'Loading...'

if (summonerSpellData.error) return 'An error has occurred: ' + error.message


return (summonerSpellData.data)

}
)