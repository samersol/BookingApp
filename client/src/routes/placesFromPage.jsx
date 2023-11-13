import { useEffect, useState } from "react"
import Perks from "../perks"
import PhotoUploader from "../photoUploader"
import AccountNav from "../accountNav"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"


export default function placesFromPage(){
    const {id} = useParams();
    const [title,setTitle] = useState('')
    const [address,setAddress]= useState('')
    const [addedphotos,setAddedphotos]= useState([])
    const [description,setDescription]= useState('')
    const [price,setPrice] = useState()
    const [perks,setPerks]= useState([])
    const [extraInfo,setExtraInfo]= useState('')
    const [checkIn,setCheckIn] = useState('') 
    const [checkOut,setCheckOut] = useState('')
    const [maxGuests,setMaxGuests] = useState(1)
    const [redirect, setRedirect] = useState(false)
    
    useEffect(()=>{
        if (!id){
            return;
        }
        axios.get('/places/'+id).then(response=>{
            const {data} = response;
            setTitle(data.title)
            setAddress(data.address)
            setExtraInfo(data.extraInfo)
            setPrice(data.price)
            setDescription(data.description)
            setAddedphotos(data.photos);
            setPerks(data.perks)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
        })
    },[id]);
    
    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {title,address,description,price,addedphotos,
            perks,extraInfo,checkIn
            ,checkOut,maxGuests}
        if (id){
            // update
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true)
        } else {
            // new place
            await axios.post('/places', placeData);
            setRedirect(true)
        }
        
       }
       if(redirect){
        return <Navigate to={'/account/places'}/>
       }
    
    return(
        <>
        <AccountNav/>
         <div className="ml-16 mr-16 mt-16">
                <form onSubmit={savePlace}>
                    <h2 className="text-3xl mt-8">Title</h2>
                    <input type="text" 
                        placeholder="type your Title here"
                        value={title} 
                        onChange={ev => setTitle(ev.target.value)} />
                    <h2 className="text-3xl mt-6">Address</h2>
                    <input type="text" 
                        placeholder="type your Address here"
                        value={address} 
                        onChange={ev=> setAddress(ev.target.value)} />
                    <h2 className="text-3xl mt-6 mb-2">Photos</h2>
                    
                    <PhotoUploader addedphotos={addedphotos} onChange={setAddedphotos}/>
              
                    <h2 className="text-3xl mt-6">Discription</h2>
                    <textarea cols="10" rows="4"
                        placeholder="type your Description here"
                        value={description}
                        onChange={ev=> setDescription(ev.target.value)}
                        ></textarea>
                    <h2 className="text-3xl mt-6 mb-3">Price</h2>
                    <input type="number" 
                        placeholder="2500 Euro"
                        value={price}
                        onChange={ev=> setPrice(ev.target.value)} />
                    <h2 className="text-3xl mt-6 mb-3">Perks</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        <Perks selected={perks} onChange={setPerks} />
                    </div>
                    <h2 className="text-3xl mt-6">Extra info</h2>
                    <textarea 
                        value={extraInfo}
                        onChange={ev=> setExtraInfo(ev.target.value)}
                        placeholder="type your Extra info here"></textarea>
                    <h2 className="text-3xl mt-6">Checks in&out</h2>
                    <div className="grid mt-2 gap-3 sm:grid-cols-3">
                        <input type="text" 
                        placeholder="check in mm:hh"
                        value={checkIn}
                        onChange={ev=> setCheckIn(ev.target.value)} />
                        <input type="text" 
                        placeholder="check out mm:hh"
                        value={checkOut} 
                        onChange={ev=> setCheckOut(ev.target.value)}/>
                        <input type="number" 
                        placeholder="max guests 1-10" 
                        value={maxGuests}
                        onChange={ev=> setMaxGuests(ev.target.value)}/>
                    </div>
                    <button className="primary my-4">Save</button>
                </form>
            </div>

        </>


    )
}