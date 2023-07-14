import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import Card from '../../Components/Card/Card'
import "../Home/style.css"
import { Store } from '../../Store'
import axios from 'axios'
import Hero from '../../Components/Hero/Hero'

function HomeScreen() {

  const { events, setEventID, setRegID } = useContext(Store)

  useEffect(() => {
    setEventID(0)
    setRegID(0)
  }, [])

  return (
    <div>
      <SideBar></SideBar>
      <div className="card-main-box">
        {
          events.map(event => {
            return <Card key={event.id} body={event} />
          })
        }
      </div>

    </div>
  )
}

export default HomeScreen
