import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../userContext";

export default function Login(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function HandleLoginSubmit(ev){
        ev.preventDefault()
        try {
            const {data}= await axios.post('/Login',{email,password});
            setUser(data);
            alert('Login Successful')
            setRedirect(true);
        } catch (e) {
            alert('Login Failed')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

return(
    <div className="mt-4 grow flex items-center justify-around">
       <div className="mb-64">
        <h1 className="text-4xl text-center mb-6">Login</h1>
        <form className="max-w-md mx-auto " onSubmit={HandleLoginSubmit}>

            <input type="email" 
            placeholder="your@mail.com"
            value={email}
            onChange={ev=> setEmail(ev.target.value)} />

            <input type="password"
            placeholder="password" 
            value={password} 
            onChange={ev=> setPassword(ev.target.value)} />

            <button className="primary hover:bg-blue-500">Login</button>
            <div className="text-center py-2 ">
                Don't have an account yet?
                <Link to={'/register'} className="text-primary font-bold hover:text-blue-500"> Register Now</Link>
            </div>

        </form>



       </div>
        


    </div>


);



}