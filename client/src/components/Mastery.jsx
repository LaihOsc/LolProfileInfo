import React, { useState } from 'react'
import MasteryObject from './MasteryObject'
import { Box, Card, TextField, InputAdornment, Paper } from '@mui/material'
import { Search } from '@mui/icons-material'


export default function Mastery({ data, darkMode }) {

  const [champQuery, setChampQuery] = useState('')

  const handleInputChange = (e) => {
    setChampQuery(e.target.value)
    console.log(champQuery)
  }

  const mastery = data.mastery

  const champs = Object.values(data.champion)

  console.log(data.champion)



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
      
      const champ = champs.find(({ key }) => key == mastery.championId)
      const champName = champ.name.toLowerCase()
      return(
      champName.includes(champQuery.toLowerCase()) ? <MasteryObject key={champ.key} champMastery={mastery} champ={champ} darkMode={darkMode} /> : null)
    })}
    </div> )}
      
