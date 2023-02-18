import React, { useContext, useState, useRef } from 'react'
import MasteryObject from './MasteryObject'
import { TextField, InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'
import { DataContext } from '../../DataContext'


export default function Mastery() {

  const data = useContext(DataContext)


  const { mastery, champion } = data

  const [champQuery, setChampQuery] = useState('')

const handleInputChange = (e) => {
    setChampQuery(e.target.value)
  }


  return (
    <div className='flex justify-center dark:text-white'>
    <div className='p-4 w-4/5'>

        {/* Title */}
        <div className='p-4'>
          <h1 className='font-bold text-4xl'>Mastery</h1>
        </div>



        {/*  Search Input  */}
        <div className= {`p-4 rounded-md`}>
          <TextField label={'Champion Name'} onChange={(e) => setChampQuery(handleInputChange)} variant="outlined" 
          sx={{color: 'white'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                  <Search />
                </InputAdornment>)}}/>
        </div>



        {/* Titles */}
        <div className='flex justify-around text-left px-4 py-2 font-semibold text-lg'>
            <p className='w-full'>Champion</p>
            <p className='w-full'>Level</p>
            <p className='w-full'>Points</p>
            <p className='w-full'>Last played</p>
            <p className='w-full'>Chest Acquired</p>
        </div>


          {/* Champion Masteries */}
          {mastery.map((mastery) => {
          
          const champ = champion[data.champKeyToId[mastery.championId]]
          const champName = champ.name.toLowerCase()
          return(
          champName.includes(champQuery.toLowerCase()) ? <MasteryObject key={champ.key} champMastery={mastery} champ={champ}/> : null)
          })}
          </div> 
    
    </div>)}
      
