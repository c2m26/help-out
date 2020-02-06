import React from 'react'
import NeedCard from './NeedCard'
import './NeedList.css'

function NeedsList (props) {

  const NeedsListContent = props.needs.map( needs => {
    return( 
      
      <NeedCard key={needs.id} {...needs} />
      
    ) 
  })

  return(
    <div id="overflow" className="mb-2">
      {NeedsListContent}
    </div>
  )

} export default NeedsList