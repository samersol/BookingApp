import axios from "axios";
import { useState } from "react";

export default function photoUploader ({addedphotos,onChange}){
    const [photoLink,setPhotoLink]= useState('')

    async function addPhotoByLink (ev){
        ev.preventDefault()
        const {data:filename} = await axios.post('/upload-by-link',{link:photoLink});
        onChange(prev =>{
           return [...prev, filename]
        })
        setPhotoLink('');
   }

async function uploadPhoto(ev) {
       const files = ev.target.files;
       const data = new FormData();
       for(let i=0; i<files.length; i++){
           data.append('photos', files[i]);

       }
  
           const response = await axios.post('/upload', data, {
               headers: {'Content-type': 'multipart/form-data'}
           });
           const {data: filenames} = response;
           onChange(prev => {
               return [...prev, ...filenames];
           });
      
   }
   function removePhoto(ev,filename){
    ev.preventDefault()
    onChange([...addedphotos.filter(photo => photo !== filename)])

   }
   function setMainPhoto(ev,filename){
    ev.preventDefault()
    onChange([filename,...addedphotos.filter(photo => photo !== filename)])

   }



    return(
        <>
            <div className="flex">
                        <input type="text" 
                            placeholder="add Photo using Link"
                            value={photoLink}
                            onChange={ev=> setPhotoLink(ev.target.value)} />
                        <button onClick={addPhotoByLink} className="ml-2 py-2 px-4 bg-primary rounded-3xl text-white">Add&nbsp;Photo</button>
                    </div>
              <div className=" grid grid-cols-3 gap-2 mt-2 md:grid-cols-4 lg:grid-cols-6">
                        {addedphotos.length > 0 && addedphotos.map(link=>(
                            <div className="h-32 relative flex" key={link}>
                                <img className=" w-full object-cover rounded-2xl" src={'http://localhost:4000/uploads/'+link} alt="" />
                                <button onClick={ev=>removePhoto(ev,link)} className="absolute cursor-pointer bottom-1 right-1 bg-black text-white p-2 bg-opacity-50 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>

                                </button>
                              
                                <button onClick={ev=>setMainPhoto(ev,link)} className="absolute cursor-pointer bottom-1 left-1 bg-black text-white p-2 bg-opacity-50 rounded-md">
                                {link === addedphotos[0] &&(
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                                
                                )}
                                {link !== addedphotos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>

                                )}

                                </button>
                            </div>
                        ))}
                        <label className="flex h-32 justify-center items-center  cursor-pointer gap-1 border bg-transparent p-4 rounded-xl">
                        <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Upload
                        </label>
                    </div>
        </>
    )
}