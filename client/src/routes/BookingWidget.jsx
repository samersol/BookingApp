import { useContext, useEffect, useState } from "react"
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from "react-router-dom"
import { UserContext } from "../userContext"

export default function BookingWidget ({place}){
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckout] = useState('')
    const [numberGuests, setNumberGuests] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState(0)
    const [redirect, setRedirect] = useState('')

    const {user} = useContext(UserContext)
    useEffect(()=>{
        if (user){
            setName(user.name)
        }
    },[user])

    let numberOfDays = 0
    if (checkIn && checkOut){
       numberOfDays = differenceInCalendarDays(new Date(checkOut),new Date (checkIn))
    }
    async function bookPlace (){
       const response = await axios.post ('/bookings',{
            checkIn,
            checkOut,
            numberGuests,
            place:place._id,
            price: numberOfDays* place.price,
            name,
            phone
        })
        const bookingID = response.data._id
        setRedirect(`/account/bookings/${bookingID}`)
    }

    if (redirect){
        return <Navigate to={redirect}/>
    }

    return(
        <>
        
                <div className="bg-white p-4 mt-2 rounded-3xl">
                <div className="text-2xl text-center">
                Price : <b>${place.price}</b>/ per Night
                </div>
                <div className="justify-center mt-2 border border rounded-2xl">
                   <div className="flex">
                   <div className="p-4">
                    <label className="font-semibold">Check in:</label> <br />
                    <input type="date" value={checkIn} onChange={ev=> setCheckIn(ev.target.value)}/>
                    </div>
                    <div className="p-4 border-l">
                    <label className="font-semibold" >Check out:</label> <br />
                    <input type="date"  value={checkOut} onChange={ev=> setCheckout(ev.target.value)}/>
                    </div>
                   </div>
                    <div className="p-4 border-t">
                    <label className="font-semibold">Number of Guests :</label>
                    <input type="number" value={numberGuests} onChange={ev=> setNumberGuests(ev.target.value)}/>
                    {numberOfDays !== 0 && (
                        <div>
                            <label className="font-semibold">Phone Number</label>
                    <input type="number" value={phone} onChange={ev=> setPhone(ev.target.value)}/>
                    <label className="font-semibold">Full Name</label>
                    <input type="text" value={name} onChange={ev=> setName(ev.target.value)}/>
                    
                        </div>
                    )}
                    
                    </div>
                </div>
                <button onClick={bookPlace} className="primary mt-2">Book now 
                {numberOfDays !== 0 && (
                    <span className="font-bold"> <br /> ${numberOfDays * place.price}</span>
                )}
                </button>
                
                </div>
        </>
    )
};