import React, { Fragment } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import NeedCard from './NeedCard'
import NeedDetail from './NeedDetail'
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