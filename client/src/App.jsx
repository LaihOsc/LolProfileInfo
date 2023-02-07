import Mastery from "./components/Mastery"
import Matches from "./components/Matches"
import Profile from "./components/Profile"
import { useQuery } from "react-query"

function App() {
  return (
    <div className="">
      <FetchSummonerData />
    </div>
  )
}

  function FetchSummonerData() {
    const { isLoading, error, data } = useQuery('summonerData', () =>
      fetch('http://localhost:8080/summonerExample').then(res =>
        res.json()
      )
    )
  
    if (isLoading) return 'Loading...'
  
    if (error) return 'An error has occurred: ' + error.message

    console.log(data)

  


return(
  <div>
    <Profile data = {data} />
      <Mastery data = {data} />
      <Matches data = {data} />
  </div>
)

}

export default App
