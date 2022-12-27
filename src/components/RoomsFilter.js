import React from 'react'
import { useContext } from 'react'
import { RoomContext } from '../Context'
import Title from './Title'
const getUnique=(items,value)=>{
    return [...new Set (items.map(item=>item[value]))]
}
export default function RoomsFilter({rooms}) {
  const context = useContext(RoomContext)
  const {
    handlechange,type,capacity,price,minprice,maxprice,minsize,maxsize,breakfast,pets } =context
    //get unique types
    let types= getUnique(rooms,'type')
    types = ['all',...types]
    types = types.map((item,index)=>{
        return <option key={index} value={item} >{item}</option>
    })
    //get capacity guests
    let people = getUnique(rooms,'capacity')
    people = people.map((item,index)=>
    {
        return <option key={index} value={item} >{item}</option>
    })
    return (
    <section className="filter-container" > 
      <Title title="search rooms" />
      <form className="filter-form" >
        {/*type*/}
       <div className="form-group" >
        <label htmlFor="type" >room type</label>
        <select name="type" id="type" value={type} className="form-control" onChange={handlechange} >
           {types}
        </select>
       </div>
       {/* guest */}
       <div className="form-group" >
        <label htmlFor="capacity" >Guests</label>
        <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handlechange} >
           {people}
        </select>
       </div>
       {/* price */}
       <div className="form-group" >
        <label htmlFor="price" >Room Price ${price}</label>
        <input type="range" name="price" min={minprice} max={maxprice} id="price" value={price} onChange={handlechange} className="form-control" />
       </div>
       {/* size */}
       <div className="form-group" >
        <label htmlFor="size" >Room Size</label>
        <div className="size-inputs" >
        <input type="number" name="minsize" id="size" value={minsize} onChange={handlechange} className="size-input" />
        <input type="number" name="maxsize" id="size" value={maxsize} onChange={handlechange} className="size-input" />
        </div>
       
       </div>
        {/* breakfast && pets */}
        <div className="form-group" >
        <div className="single-extra" >
        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handlechange} />
        <label htmlFor="breakfast" >Breakfast</label>
        </div>
       <div className="single-extra" >
        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handlechange} />
        <label htmlFor="pets" >Pets</label>
        </div>
       </div>
      </form>
    </section>
  )
}
