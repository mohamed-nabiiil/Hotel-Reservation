import React from 'react'
import {withRoomConsumer} from '../Context'
import Loading from './Loading'
import RoomsList from './RoomsList'
import RoomsFilter from './RoomsFilter'



function RoomsContainer({context}){
    

    const {loading,sortedrooms,rooms} = context
        if(loading){
                    return <Loading/>
               }
                return(
                <>
                
                  <RoomsFilter rooms={rooms}/>
                  <RoomsList rooms={sortedrooms} />
                </>
                )

}
export default withRoomConsumer(RoomsContainer)











