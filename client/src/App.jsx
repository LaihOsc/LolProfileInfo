import Mastery from "./components/Mastery"
import Matches from "./components/Matches"
import Profile from "./components/Profile"
import { useQuery } from "react-query"

function App() {
  return (
    <div className="text-green-500">
      <FetchSummonerData />
    </div>
  )
}

  function FetchSummonerData() {
    const { isLoading, error, data } = useQuery('summonerData', () =>
      fetch('http://localhost:8080/summoner/milkku').then(res =>
        res.json()
      )
    )
  
    if (isLoading) return 'Loading...'
  
    if (error) return 'An error has occurred: ' + error.message

  


return(
  <div>
    <Profile profile={data.profile} />
      <Mastery mastery={data.mastery} />
      <Matches matches={data.matches} summonerName={data.profile.name} />
  </div>
)

}

export default App
