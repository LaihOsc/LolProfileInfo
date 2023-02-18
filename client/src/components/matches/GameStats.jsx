import React, { useContext } from 'react'
import TeamStat from './TeamStat'

export default function GameStats({ players }) {

  //Reusable function for getting multiple values and adding them together e.g. profile[0].kills + profile[1].kills + ...
  const unifyData = ( object, startIndex, endIndex , property) => {  
    const indexes = [...Array(endIndex - startIndex).keys()].map(x => x + startIndex)  // Creates array like range(x,y) in python

    const values = indexes.map(index => object[index][property]) // [Populating an array with required values]

      const initialValue = 0
      const sum = values.reduce(
        (accumulator, currentValue) => accumulator + currentValue, // [Reducing values into one value]
        initialValue
      )

  
    return sum
  }

console.log(unifyData(players,0, 5, 'kills'))

  return (
    <div className='w-4/5 bg-white dark:bg-gray-800 dark:text-white'>
      
      {/* Team 1 */}
      <TeamStat key={0} startIndex={0} stopIndex={5}  players={players} unifyData={unifyData} team={'blue'} />

      {/* Team 2 */}
      <TeamStat key={1} startIndex={5} stopIndex={10}  players={players} unifyData={unifyData} team={'red'} />

      
    </div>
  )
}
