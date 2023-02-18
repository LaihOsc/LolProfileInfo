import React, { useContext } from 'react'
import { DataContext } from '../../DataContext'
import Champ from './Champ'

export default function TopChamps() {

    const {champion, mastery, images, champKeyToId} = useContext(DataContext)

    const top3 = mastery.slice(0,3)




    return(<div className='flex w-1/3'>
      {top3.map(obj => 
      <Champ 
      key={obj.championId} 
      id={champion[champKeyToId[obj.championId]].id} 
      src={images.masteries[obj.championLevel]} 
      />
      )}
    </div>)
}
