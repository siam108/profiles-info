 import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate()
    
const handlelogin=(e)=>{
    e.preventDefault()
    const pass = 'bhosdike ustad';
    
    if(e.target.password.value == pass){
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
          {/* <Link to="pass-update"></Link> */}
        </div>
    );
};

export default Login;