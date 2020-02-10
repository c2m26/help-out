import React from 'react'

import './NeedsList.css'

function NeedsList (props) {

  return(
    <div id="overflow" className="mb-2">
      {props.content}
    </div>
  )

} export default NeedsList