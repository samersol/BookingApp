import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";

export default function Header () {
const {user} = useContext(UserContext);
return (
    <div>
        <header className=" flex justify-between">
          <Link to={'/'} className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          <span className="font-bold text-xl"> BookingAir </span>
          </Link>
          <div className="flex gap-2 border border-grey-300 rounded-full py-4 px-3 shadow-md shadow-gray-300">
          <div>Anywhere</div>
          <div className="border-l border-gray-300"> </div>
          <div>Any week</div>
          <div className="border-l border-gray-300"> </div>
          <div>Add guests</div>
          <button className='bg-primary text-white p-1 rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        
          </button>
          </div>
          <Link to={user? '/account' : '/Login'} className="flex items-center gap-3 border border-grey-300 rounded-full py-4 px-3 shadow-md shadow-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
          <div className='bg-gray-500 text-white rounded-full p-1 border border-gray-500'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
          </div>
          {!!user && (
            <div>
              {user.name}
            </div>
            
          )}

          </Link>
        </header>




    </div>



);


}