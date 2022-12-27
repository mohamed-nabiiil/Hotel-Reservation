// import the useContext hook from 'react', no need for Component since we are using an RFC
import React, { useContext} from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import StyledHero from '../components/StyledHero'
// import the useParams hook from React Router
import {Link, useParams} from 'react-router-dom'
import { RoomContext } from '../Context'

// Transform the RCC to an RFC
export default function SingleRoom() {
    // Get the slug using React Router's useParams hook
    const { slug } = useParams();
    
    // Get the context we defined in context.js using React's useContext hook
    const context = useContext(RoomContext);

    // Similar to the tutorial, we access the getRoom function through our context (no need for 'this')
    const { getRoom } = context;

    // Get the room object that matches our slug like in the tutorial (no need to access state)
    const room = getRoom(slug);

    // Other than no longer needing the render function, everything else should be the same as in the tutorial
    if (!room){
      return <div className='error'>
        <h3>no such room could be found</h3>
        <Link to='/rooms' className='btn-primary'>
          back to rooms
        </Link>
      </div>
    }
    const {name, description, capacity, size, price, extras, breakfast, pets, images} = room;
    const [mainImg,...defaultImg]=images
    return (
      <>
      <StyledHero img={mainImg||defaultBcg}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className='btn-primary'>
            back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-room"  >
        <div className="single-room-images" >
          {defaultImg.map((item,index)=>{
            return <img key={index} src={item} alt={name} />
          })}

        </div>
        <div className="single-room-info" >
          <article className="desc" >
            <h3>detials</h3>
            <p>{description}</p>

          </article>
          <article className="info" >
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : {size} SQFT </h6>
            <h6>max capacity : {capacity > 1 ? `${capacity} people` : `${capacity} person`}</h6>
            <h6> {pets ? "pets allowed" : "No pets allowed"}  </h6>
            <h6>{breakfast && "free breakfast included"}</h6>

          </article>

        </div>
           
      </section>
      <section className="room-extras" >
       <h6>extras</h6>
       <ul className='extras' >
         {extras.map((item,index)=>{
          return <li key={index} >- {item}</li>
         })}
       </ul>
      </section>
      </>
    )
  }