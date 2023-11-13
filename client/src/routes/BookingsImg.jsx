export default function BookingsImg({place, index=0,className=null}){
    if (!place.photos?.length){
        return ''
    }
    return(

    <img className=" rounded-3xl object-cover w-64 h-64" src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />

    )
}