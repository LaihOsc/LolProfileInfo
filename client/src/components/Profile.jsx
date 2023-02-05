import React from 'react'

export default function Profile({ profile }) {

    const { name, profileIconId, summonerLevel } = profile


  return (
    <div>
      <h1>{name}</h1>
      <p>{summonerLevel}</p>
      <img src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${profileIconId}.png`} alt="" />
    </div>
  )
}
