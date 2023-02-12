import Mastery from "./components/Mastery"
import Matches from "./components/Matches"
import Profile from "./components/Profile"
import { useQuery } from "react-query"
import { useState } from "react"
import { TextField, Select, MenuItem, IconButton, Paper, Divider, InputAdornment } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import ClipLoader from "react-spinners/ClipLoader";
import { AccountBox, CurrencyBitcoin, Assessment, List, Search, LightMode, DarkMode} from '@mui/icons-material';
import Sidebar from "./components/Sidebar"


function App() {

  const [queryName, setQueryName] = useState('')
  const [region, setRegion] = useState('')
  const [nameDone, setNameDone] = useState(false)
  const [tab, setTab] = useState('profile')
  const [darkMode, setDarkMode] = useState(false)

  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }


  const handleInputChange = (e) => {
    setQueryName(e.target.value)
  }

  const handleSelectChange = (e) => {
    setRegion(e.target.value)
  }

  const handleClick = () => {
    setNameDone(!nameDone)
  }


  
    const handleTabChange = (e) => {
      setTab(e.target.value)
      console.log(e.target.value)
    }

 

  return (
    <div className={darkMode ? 'bg-gray-900' : ''}>
      {/* Navbar */}
      <Sidebar handleTabChange={handleTabChange} />
    
    <div className={`w-screen h-screen flex font-sans justify-end`} >
       

      <div className={`w-5/6 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-200'} h-fit text-lg`}>
      <div className={`${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-200'} p-4 rounded-md flex justify-center`}>
        <Paper>
          <Select
          label='Region'
          value={region}
          onChange={handleSelectChange}
          
          >
            <MenuItem value={'eun1'}>EUNE</MenuItem>
            <MenuItem value={'euw1'}>EUW</MenuItem>
            <MenuItem value={'na1'}>NA</MenuItem>
          </Select>
          <TextField label={'Summoner Name'} variant='outlined'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
          />
          <button onClick={handleClick}>yeet</button>
        </Paper>

        <div onClick={handleDarkMode} className="flex p-4 ml-40 self-center hover:bg-gray-300">
            {darkMode ? <DarkMode /> : <LightMode />}
          </div>

      </div>
      
          <div className="">
      {nameDone ? <FetchSummonerData summonerName={queryName} region={region} tab={tab} darkMode={darkMode} /> : null}
      </div>
      

      </div>

      </div>
    </div>
  )
}



  function FetchSummonerData({ summonerName, region, tab, darkMode }) {
    const { isLoading, error, data } = useQuery('summonerData', () =>
      fetch(`http://localhost:8080/summonerExample`).then(res =>
        res.json()
      )
    )
  
    if (isLoading) return <div className="flex justify-center items-center h-screen"><ClipLoader size={300} color={'#d6d3d1'} /></div>
  
    if (error) return 'An error has occurred: ' + error.message

    console.log(data)


    
    

return(
  <div>
        {tab == 'profile' 
        ? <Profile data={data} /> : tab == 'mastery' 
        ? <Mastery data={data}  darkMode={darkMode}/> : tab == 'matchHistory' 
        ? <Matches data={data} /> : 'yeet'}
 
    </div>

)

}

export default App
