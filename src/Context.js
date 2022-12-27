import React, { Component } from 'react'
import items from './data'

const RoomContext = React.createContext()
class RoomProvider extends Component {
    state={
        rooms:[],
        sortedrooms:[],
        featuredRooms:[],
        loading:true,
        type:'all',
        capacity:1,
        price:0,
        minprice:0,
        maxprice:0,
        minsize:0,
        maxsize:0,
        breakfast:false,
        pets:false,



    }
    componentDidMount(){
        let rooms = this.formatData(items)
        let featuredRooms= rooms.filter(room => room.featured ===true)
        let maxprice = Math.max(...rooms.map(item=> item.price))
        let maxsize = Math.max(...rooms.map(item=> item.size))
        this.setState({
            rooms,featuredRooms,sortedrooms:rooms,loading:false,price:maxprice,maxprice,maxsize,
        })
    }
    formatData(items){
        let tempItems = items.map(item=>{
            let id = item.sys.id
            let images = item.fields.images.map(image=> image.fields.file.url)
            let room = {...item.fields,images,id}
            return room
        })
        return tempItems
    }
    getRoom =(slug)=>{
        let tempRooms= [ ...this.state.rooms]
        const room = tempRooms.find((room)=>room.slug===slug)
        return room
    }
    handlechange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        
    
        this.setState(
          {
            [name]: value
          },
          this.filterRooms
        );
      };
   filterRooms=()=>{
    let {
        rooms,type,capacity, price,minsize,maxsize,breakfast,pets
    }=this.state
    let tempRooms = [...rooms]
    capacity =parseInt(capacity)
    price=parseInt(price)
    //filter by type
    if(type !== 'all'){
        tempRooms = tempRooms.filter(room=>room.type===type)
    }
    //filter by capacity
    
    if(capacity !== 1){
        tempRooms = tempRooms.filter(room=>room.capacity>=capacity)
    }
//filter by price
    
    tempRooms = tempRooms.filter(room=>room.price<=price)
//filter by size*
    tempRooms = tempRooms.filter(room=>room.size>=minsize && room.size<=maxsize)
//filter by breakfast
     if(breakfast){
        tempRooms = tempRooms.filter(room=>room.breakfast===true)
     }
     //filter by pets
     if(pets){
        tempRooms = tempRooms.filter(room=>room.pets===true)
     }
    this.setState({
          sortedrooms:tempRooms
    })
    


   }
    render() {
    return (
      <RoomContext.Provider value={{...this.state , getRoom:this.getRoom,handlechange:this.handlechange}}>
        {this.props.children}
         </RoomContext.Provider>
        
      
    )
  }
}
const RoomConsumer = RoomContext.Consumer
export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return( <RoomConsumer>
            {value=> <Component {...props} context={value} />}
        </RoomConsumer>
        )
    }

}

export {RoomProvider,RoomConsumer,RoomContext}