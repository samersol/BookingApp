import { useEffect, useState } from "react"
import AccountNav from "../accountNav"
import axios from "axios"
import { differenceInCalendarDays } from 'date-fns'

import BookingsImg from "./BookingsImg"

export default function BookingsPage (){
    const [bookings, setBooking] = useState([])
    useEffect(()=>{
        axios.get('/bookings').then(response =>{
            setBooking(response.data)
        })
    },[])
    return (
        <div>
            <AccountNav/>
        <div className="pt-4">
         {bookings?.length >0 && bookings.map(booking=>(
            <div>
                <div className="flex gap-4 bg-gray-300 rounded-3xl ">
                    <BookingsImg place={booking.place}/>
                    
                    <div className="p-4 ">
                    <h2 className=" font-semibold text-4xl mt-6">
                        {booking.place.title}
                    </h2>
                    <div className="border-t border-gray-400 mt-2 py-2"></div>
                       <div className="flex items-center gap-1">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>

                       {booking.checkIn.slice(0,10)} &rarr; {booking.checkOut.slice(0,10)}
                       </div>
                       
                    <div className="font-normal text-3xl py-2">
                        <h2 className="pb-2">
                            Total Nights : {parseInt(booking.checkOut.slice(9,10)) - parseInt(booking.checkIn.slice(9,10))}
                        </h2>
                        <h2>
                            Total Price : ${booking.price}
                        </h2>
                    </div>
                    </div>
                </div>  
            </div>
    ))} 
        </div>
        </div>

    )
}   