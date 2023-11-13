import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingWidget from "./BookingWidget"

export default function placePage (){
    const {id} = useParams()
    const [place,setPlace] = useState(null)
    const [MorePhotos, setMorePhotos] = useState(false)
    useEffect(()=>{
        if (!id){
            return;
        }
        axios.get('/places/'+id).then(respone =>{
            setPlace(respone.data)
        })
    },[id]);

        if (!place){
            return ''
        }
        if (MorePhotos){
            return(
            <div className="absolute inset-0 bg-black min-h-screen">
                <h1 className="text-white p-8 mt-2 text-4xl">All Photos of {place.title}</h1>
                <div className="relative grid gap-2 p-8 bg-black min-h-screen">
                    <div>
                    <button onClick={()=> setMorePhotos(false)} className="flex g-1 fixed bg-white rounded-2xl top-12 right-12 px-4 py-2 shadow-md shadow-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Close</button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo=>(
                        <div className="">
                        <img src={'http://localhost:4000/uploads'+photo} alt="" />
                        
                        </div>
                    ))}
                </div>
            </div>
            )
        }
    return(
        <div className="bg-gray-200 mt-8 pt-5 px-8 -mx-8">
            <h1 className=" text-4xl">{place.title}</h1>
            <a className="flex gap-1 mt-2 text-lg font-bold underline" target="blank" href={'https://www.google.com/maps/place/'+place.address}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {place.address}</a>
            <div className="relative grid mt-2 gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                   {place.photos?.[0] && (
                    <div>
                        <img className=" aspect-square object-cover" src={'http://localhost:4000/uploads'+place.photos[0]} alt="" />

                    </div>
                    )}
                    <div>
                    {place.photos?.[1] && (
                        <img className=" aspect-square object-cover" src={'http://localhost:4000/uploads'+place.photos[1]} alt="" />
                    )} 
                    {place.photos?.[2] && (
                        <div className=" overflow-hidden">
                        <img className=" aspect-square object-cover relative top-2" src={'http://localhost:4000/uploads'+place.photos[2]} alt="" />                
                        </div>
                    )}

                        
                    </div>
                    <button onClick={()=> setMorePhotos(true)} className=" flex gap-1 absolute bottom-4 right-4 bg-gray-200 opacity-90 px-4 py-2 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    Show More</button>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[2fr_1fr] mt-4">
                <div className="mt-4">
                <div className="mb-6 mr-4">
                <h2 className="font-bold text-2xl mt-4 mb-1">Description</h2>
                {place.description}
                </div>
                <div className="py-2">
                <b>Check in time : </b> {place.checkIn} <br />
                <b>Check out time : </b> {place.checkOut} <br />
                <b>Max Guests : </b> {place.maxGuests}
                </div>
                </div>
            <BookingWidget place={place}/>
            </div>
            <div className="py-2 bg-white px-8 py-8 mt-4 -mx-8">
                <h2 className="font-bold text-2xl mb-2">Extra info</h2>
                <span className="text-gray-600">{place.extraInfo} </span>
            </div>
        </div>
    )
}