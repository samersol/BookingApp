import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate,Link, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../accountNav";

export default function PccountPage(){
const [redirect,setRedirect] = useState(null);
const {user,ready,setUser} = useContext(UserContext)
let {subpage} = useParams();

if (subpage === undefined){
    subpage= 'profile';
}   
    async function logout (){
     await axios.post('/logout')
     setRedirect('/');
     setUser(null);
    }
    
  

  
    if (!ready){
        return 'Loading..'
    }

    if (ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }

    if (redirect){
        return <Navigate to={redirect}/>
    }
    
    return(
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="flex-auto text-center pt-4">
                    You're Logged in as {user.name} <br />
                    Your Email : {user.email} <br />
                    <button className="primary max-w-xs mt-2" onClick={logout}>Log out</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage/>
            )}
        </div>
    );
};