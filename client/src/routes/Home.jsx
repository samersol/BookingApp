import { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
    const [places,setPlaces]= useState([])
    useEffect(()=>{
        axios.get('/places').then(response =>{
            setPlaces([...response.data])
        })
    },[])
    return (
              
        <div className="mt-16 gap-6 flex grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">  
            {places.length > 0 && places.map(place=>(
                <Link to={'/places/'+place._id}>
                    <div className="mb-1">
                    {place.photos?.[0] && (
                        <img className="rounded-2xl aspect-square object-cover" src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt="" />
                    )}
                    </div>
                        <h2 className="text-lg font-bold">{place.address}</h2>
                        <h3 className="text-gray-600"> {place.title} </h3>
                        <h4 > 
                        <span className="font-bold"> €{place.price}</span> per Night</h4>
                </Link>
            ))}
        </div>

    );
  }