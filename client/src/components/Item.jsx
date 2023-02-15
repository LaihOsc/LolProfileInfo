import React, { useState } from 'react'
import { Popover } from '@mui/material'

export default function Item({item}) {

    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)
  return (
    <div>
      <img 
      onMouseEnter={(e) => setAnchorEl(e.currentTarget)} 
      onMouseLeave={() => setAnchorEl(null)}
      src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${item.image.full}`} alt="" />
      <Popover
      className='p-4'
      sx={{pointerEvents: 'none'}}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      transformOrigin={{
        horizontal: 'center',
        vertical: 100
      }}
      onClose={() => setAnchorEl(null)}
      disableRestoreFocus
      
      >
        <div className='max-w-md'>
            <div className='flex'>
            <img className='p-2' src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${item.image.full}`} alt="" />
            <div>
            <p className='font-bold'>{item.name}</p>
            <div>
            <p>{item.gold.base}</p>
            <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/icon_gold.png" alt="" />
            </div>
            
            </div>
            
            </div>
            
            {item.plaintext}
            {item.description}
        </div>
      </Popover>
    </div>
  )
}
