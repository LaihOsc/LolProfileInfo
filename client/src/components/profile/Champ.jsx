import React from 'react'

export default function Champ({id, src}) {
  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <img src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${id}.png`} alt="" />
        <img className='w-16 h-16' src={src} alt="" />
        </div>
    </div>
  )
}
