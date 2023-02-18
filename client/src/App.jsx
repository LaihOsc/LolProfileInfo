import Mastery from "./components/mastery/Mastery"
import Matches from "./components/matches/Matches"
import Profile from "./components/profile/Profile"
import { useQuery } from "react-query"
import { useEffect, useState } from "react"
import { TextField, Select, MenuItem, Paper, InputAdornment, InputLabel, FormControl } from "@mui/material"
import ClipLoader from "react-spinners/ClipLoader";
import { Search, LightMode, DarkMode} from '@mui/icons-material';
import Sidebar from "./components/universal/Sidebar"
import { DataContext } from "./DataContext"



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

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark').matches) {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')

    } else { 
      document.documentElement.classList.add('dark')
    }
  }, [darkMode])

  console.log(darkMode)
 

  return (
    <div className={'bg-gray-200 dark:bg-gray-900'}>
      {/* Navbar */}
      <Sidebar handleTabChange={handleTabChange} />
    
    <div className={`w-screen h-screen flex font-sans justify-end`} >
       

      <div className={`w-5/6  h-fit text-lg dark:bg-gray-900`}>
      <div className={`p-4 rounded-md flex justify-center w-5/6`}>
        <Paper>
          <FormControl sx={{minWidth: '100px'}}>
          <InputLabel  id='yeet'>Region</InputLabel>
          <Select
          id="yeet"
          label='Region'
          value={region}
          onChange={handleSelectChange}
          autoWidth
          >
            <MenuItem value={'eun1'}>EUNE</MenuItem>
            <MenuItem value={'euw1'}>EUW</MenuItem>
            <MenuItem value={'na1'}>NA</MenuItem>
          </Select>
          </FormControl>
          <TextField label={'Summoner Name'} variant='outlined'

            onChange={handleInputChange}
    
          />

          

        </Paper>
        <Paper sx={{
          display: 'flex',
          px: '16px'
        }}>
        <button onClick={handleClick}><Search /></button>
        </Paper>

        <div onClick={handleDarkMode} className="flex p-4 ml-40 self-center hover:bg-gray-300">
            {!darkMode ? <DarkMode /> : <LightMode />}
          </div>

      </div>
      
          <div className="w-5/6">
      {nameDone ? <FetchSummonerData summonerName={queryName} region={region} tab={tab} /> : null}
      </div>
      

      </div>

      </div>
    </div>
  )
}



  function FetchSummonerData({ summonerName, region, tab, darkMode }) {
    const { isLoading, error, data } = useQuery('summonerData', () =>
      fetch(`http://localhost:8080/summoner/${region}/${summonerName}`).then(res =>
        res.json()
        //Real request = http://localhost:8080/summoner/${region}/${summonerName}
        //Example request = http://localhost:8080/summonerExample
      )
    )
  
    if (isLoading) return <div className="flex justify-center items-center h-screen"><ClipLoader size={300} color={'#d6d3d1'} /></div>
  
    if (error) return 'An error has occurred: ' + error.message

    console.log(data)

    

return(
  <DataContext.Provider value={data} >
    <div className="">
    {tab == 'profile' 
        ? <Profile /> : tab == 'mastery' 
        ? <Mastery  darkMode={darkMode}/> : tab == 'matchHistory' 
        ? <Matches /> : 'yeet'}
    </div>
  </DataContext.Provider>


)

}

export default App
