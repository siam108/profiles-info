
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from './firebase/firebase.init';
import { collection, getDocs ,doc , updateDoc} from 'firebase/firestore';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const UpdatePass = () => {

    const [data, setData] = useState(null);
    const [tableId, setTableId] = useState(null)

    const connection = collection(db, 'pass')

   const getStore = async () =>{
    try {
        const Alldata = await getDocs(connection);
        const filterData = Alldata.docs.map((doc) => ({...doc.data() ,id: doc.id }))
       
      //  const fireData = filterData[0].data;
      //  const fireCates = filterData[0].cates;

        setTableId(filterData[0].id)

        setData(filterData[0].pass)
        
        
    } catch (err) {
        console.log(err)
    }
}

  
useEffect(()=>{
    getStore()
   },[])




  const  handleUpdatePass=(e)=>{
    e.preventDefault()

    const o_pass = e.target.o_password.value
    const n_pass = e.target.n_password.value
    const c_pass = e.target.c_password.value

  

    

    if(n_pass && c_pass){
       if(n_pass == c_pass){
         if(o_pass == data){

            updatingPass(n_pass)
            document.getElementById('my_modal_1').showModal()
           // console.log('updating');
         }else{
            toast('password vule gesen. mara khain')
         }
       }else{
        toast("new password and confarm password did'n match")
       }
    }else{
        toast("value is empty")
    }

    console.log(data)



    }

    const updatingPass = async (newPass) => {
        const dataDoc = doc(db, "pass", tableId);
        try{
            await updateDoc(dataDoc, {pass : newPass});
           // getStore()
            
        } catch (err) {
           alert(err);
        }
        
      };
    return (
        <div>
            <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-green-600">Valo Hon!</h3>
    <p className="py-4">Password change hoye gese !!</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <Link to='/login' className="btn">Log in </Link>
      </form>
    </div>
  </div>
</dialog>
            <ToastContainer autoClose={3000} />
              <div className='flex flex-col gap-6 items-center justify-center h-screen'>
          <h1 className='text-2xl font-bold' >Update Password.</h1>
          <form action="" className='flex flex-col gap-6  justify-center' onSubmit={handleUpdatePass}>

            <input type="password" name='o_password' placeholder="Type Old Password" className="input input-bordered w-full max-w-xs" />
            <input type="password" name='n_password' placeholder="Type New Password" className="input input-bordered w-full max-w-xs" />
            <input type="password" name='c_password' placeholder="Repeat New Password" className="input input-bordered w-full max-w-xs" />
            <button type='submit' className='btn btn-primary '>Update</button>
          </form>
          {/* <Link to="pass-update"></Link> */}
        </div>
        </div>
    );
};

export default UpdatePass;