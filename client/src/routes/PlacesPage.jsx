import { Link, useParams } from "react-router-dom";
import AccountNav from "../accountNav";
import { useEffect, useState } from "react";
import axios from "axios";
export default function PlacesPage (){
     const [places,setPlaces] = useState([])
     useEffect(()=> {
          axios.get('/user-places').then(({data})=>{
               setPlaces(data);
          })
     },[])

     useEffect(()=>{

     })

   return(

        <div>
          <AccountNav />
            <div className="text-center mt-8">
            <Link to={'/account/places/new'} className="inline-flex gap-2 bg-primary text-white font-semibold px-6 py-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
             Add Places</Link>
             </div>
             <div>
               {places.length > 0 && places.map(place =>(
                    <div className="bg-gray-300 p-4 gap-4 flex rounded-3xl mt-4">
                         <div className="flex rounded-3xl w-32 h-32  bg-gray-200 shrink-0">
                         {place.photos  && (
                              <img className=" rounded-3xl object-cover w-32 h-32" src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />
                         )}
                         </div>
                         <Link to={'/account/places/'+place._id} className="grow-0 shrink">
                         <h2 className=" text-2xl font-semibold">
                         {place.title}
                         </h2>
                         <h1 className="mb-2">{place.address}</h1>
                         <p className="font-medium">{place.description}</p>
                         </Link>
                    </div>
               ))}
             </div>
        </div>
   

   )   

}