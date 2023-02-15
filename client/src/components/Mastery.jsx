import React, { useContext, useState, useRef } from 'react'
import MasteryObject from './MasteryObject'
import { Box, Card, TextField, InputAdornment, Paper } from '@mui/material'
import { Search } from '@mui/icons-material'
import { DataContext } from '../DataContext'


export default function Mastery({ darkMode }) {

  const searches = useRef(0)

  const data = useContext(DataContext)

  const [champQuery, setChampQuery] = useState('')

  const handleInputChange = (e) => {
    setChampQuery(e.target.value)
    console.log(champQuery)
  }

  const { mastery, champion } = data




    // <MasteryObject champion={mastery[0]} champName={champ.name}/>

  return (
    <div className='p-4'>

      {/* Title */}
        <div className='p-4'>
          <h1 className='font-bold text-4xl'>Mastery</h1>
        </div>



    {/*  Search Input  */}
    <div className= {`p-4 rounded-md`}>
    
      <TextField label={'Champion Name'} onChange={handleInputChange} variant="outlined" 
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
              <Search />
            </InputAdornment>
        )
      }}
      />
    
    </div>



      {/* Titles */}
      <div className='flex justify-around text-left px-4 py-2 font-semibold text-lg'>
          <p className='w-full'>Champion</p>
          <p className='w-full'>Level</p>
          <p className='w-full'>Points</p>
          <p className='w-full'>Games since last played</p>
          <p className='w-full'>Chest Acquired</p>
      </div>


      {/* Champion Masteries */}


    {mastery.map((mastery) => {
      
      const champ = champion[data.champKeyToId[mastery.championId]]
      const champName = champ.name.toLowerCase()
      searches.current++
      console.log(searches)
      return(
      champName.includes(champQuery.toLowerCase()) ? <MasteryObject key={champ.key} champMastery={mastery} champ={champ} darkMode={darkMode} /> : null)
    })}
    </div> )}
      
