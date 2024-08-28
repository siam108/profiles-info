 import { useNavigate, Link } from 'react-router-dom';
 import { db } from './firebase/firebase.init';
import { collection, getDocs ,} from 'firebase/firestore';
import { useState,useEffect } from 'react';


const Login = () => {
    const [data , setData] = useState(null)
    const navigate = useNavigate()

    const connection = collection(db, 'pass')


    const getStore = async () =>{
        try {
            const Alldata = await getDocs(connection);
            const filterData = Alldata.docs.map((doc) => ({...doc.data() ,id: doc.id }))
           
          //  const fireData = filterData[0].data;
          //  const fireCates = filterData[0].cates;
    
            
    
            setData(filterData[0].pass)
            
            
        } catch (err) {
            console.log(err)
        }
    }

    
   useEffect(()=>{
    getStore()
   },[])

    
const handlelogin=(e)=>{
    e.preventDefault()
    
   // const pass = 'bhosdike ustad';
    
    if(e.target.password.value == data){
        sessionStorage.setItem('log' , 'ustad')
        navigate('/')
    }
}
    return (
        <div className='flex flex-col gap-6 items-center justify-center h-screen'>
          <h1 className='text-4xl font-bold' >Login.</h1>
          <form action="" className='flex flex-col gap-6  justify-center' onSubmit={handlelogin}>

            <input type="password" name='password' placeholder="Type Password" className="input input-bordered w-full max-w-xs" />
            <button type='submit' className='btn btn-primary '>Enter</button>
          </form>
          <Link to="/pass-update" className='underline -mt-4 text-gray-400'>Update Password</Link>
        </div>
    );
};

export default Login;