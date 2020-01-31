import React, { Fragment } from 'react'
import NeedCard from './NeedCard'

function NeedsList (props) {

  const NeedsListContent = props.needs.map( needs => {
    return( 
      <NeedCard key={needs.id} {...needs} />
    ) 
  })

  return(
    <Fragment>
      {NeedsListContent}
    </Fragment>
  )

} export default NeedsList