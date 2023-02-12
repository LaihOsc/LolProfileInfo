import React from 'react'

export default function MasteryObject({ champMastery, champ, darkMode }) {



  return (
    <div className={`${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white'} p-4 border-b-2 flex justify-around text-left`}>
      <div className='flex items-center justify-start w-full'>
        <img className='w-16 h-16 rounded-full' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${champ.id}.png`} alt="" />
        <p className='mx-2 italic'>{champ.name}</p>
      </div>

      <p className='w-full flex self-center text-left'>{champMastery.championLevel}</p>
      <p className='w-full flex self-center text-left'>{champMastery.championPoints}</p>
      <p className='w-full flex self-center text-left'>{champMastery.lastPlayTime}</p>
      <div className='w-full flex self-center justify-center'><img className={`w-16 h-16 ${champMastery.chestGranted ? '' : 'grayscale'}`} src="https://static.wikia.nocookie.net/leagueoflegends/images/6/60/Hextech_Crafting_Chest.png" alt="" /></div>

    </div>
  )
}
