import { useParams , useNavigate} from "react-router-dom";
import {  useState,useEffect } from "react";
import { db } from './firebase/firebase.init';
import { collection, getDocs ,doc , updateDoc} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Update = () => {

  const navigate = useNavigate()
 

   
   // const myRef = useRef(null);

  
      const {id} = useParams();
  const [input , setinput] = useState(null);
   const [data, setData] = useState(null);
   const [cates, setCates] = useState(null);
   const [TableId, setTableId] = useState();

   const connection = collection(db, 'data')

   const getStore = async () =>{
    try {
        const Alldata = await getDocs(connection);
        const filterData = Alldata.docs.map((doc) => ({...doc.data() ,id: doc.id }))
       
        const fireData = filterData[0].data;
        const fireCates = filterData[0].cates;

        setTableId(filterData[0].id)

        setData(JSON.parse(fireData));
        setCates(fireCates)
        console.log(TableId)
      //  console.log(fireData)
      //  console.log(fireCates)
    } catch (err) {
        toast(err)
    }
}

const updateStoreData = async (newData) => {
  const dataDoc = doc(db, "data", TableId);
  try{
      await updateDoc(dataDoc, {data : JSON.stringify(newData)});
      getStore()
      toast('updated successfull')
  } catch (err) {
     toast(err);
  }
  
};
const updateStoreCates = async (newCates) => {
  const dataDoc = doc(db, "data", TableId);
  try{
      await updateDoc(dataDoc, { cates: newCates});
      getStore()
      toast('updated successfull')
  } catch (err) {
     toast(err);
  }
  
};




   useEffect(()=>{
    getStore()
   },[])

 

   useEffect(() => {
    if(data){
        const newData = [...data];
    setinput(newData[id])
    }
  
  }, [data]);

  //  const inputdata = () =>{

  //    const newData = [...data];
  //     setinput(newData[id])
  //  }
 



  // data && setinput(data[id])

  const handleUpdate = (e) =>{
    e.preventDefault()

  //  const updateItem = data[id];
   // console.log(updateItem);

     
   const allInputs = e.target.querySelectorAll('input');
   // console.log(allInputs);
  
   // console.log(allInputs[0])
  
    const newItem = []
  
    for(let i = 0; i < allInputs.length; i++){
  
      
   //  console.log(allInputs[i].value);
      newItem.push(allInputs[i].value)
  
  
    }

    if(newItem[1]){
        //  console.log(newItem);

    const newData = [...data]
    newData[id] = newItem;
   // localStorage.setItem('data', JSON.stringify(newData))
   updateStoreData(newData)
   
   // navigate('/')
   console.log(newItem)

    }else{
       document.getElementById('my_modal_empty').showModal();
    }

  }
  const handleChange = (index, e) =>{
    const { value} = e.target;
   // console.log(name,value)
   // console.log(index)
   // console.log()
    const newInput = [...input];
    newInput[index] = value
   // console.log(newInput)
    setinput(newInput);
    

   }

    //  const [myValue, setMyValue] = useState('siam');
  
    // const handleChang = (event) => {
    //   setMyValue(event.target.value);
    // }

    const handleAdd = (e)=>{
      e.preventDefault();
      document.getElementById('my_modal_6').showModal();
      
     }
     const handleFormAdd =(e) =>{
      const input = e.target.text.value;
      if(input){
          console.log(input)
      const newCates = [...cates , input]
     // localStorage.setItem("cates" , JSON.stringify(newCates));
      updateStoreCates(newCates)
      setCates(newCates)

      e.target.text.value = ''
      }
    
     }

    
     const handleModalClose = (e) =>{
      // document.getElementById('my_modal_6').style.display = "none"
        // e.preventDefault();
       //  e.stopPropagation();
        e.target.parentNode.text.value = ''
       // console.log(input)
      }

    return (
        <div >
          <ToastContainer />
            <div className="main max-w-6xl  mx-auto mt-10 ">
            <dialog id="my_modal_5" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">New!</h3>
    <p className="py-4">Added SuccessFull</p>
  </div>
   
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
            <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">New</h3>
    <p className="py-4">Add new Category</p>
    <div className="modal-action block">
   
      <form method="dialog" onSubmit={handleFormAdd}>
         <button onClick={handleModalClose}  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <input type="text" name="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <button type="submit" className="btn btn-info md:ml-7 md:w-auto w-full mt-3 md:mt-0">Add</button>
      </form>
    </div>
  </div>
</dialog>

<dialog id="my_modal_empty" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-red-700">Name Is Empty !!</h3>
    <p className="py-4">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    
    

<h1 className="text-3xl font-bold mt-10 mb-8">Update This Entry.</h1>
{/* <button className="btn btn-primary" onClick={inputdata}>
       See Current Values
      </button> */}

<form action="#" className="w-full" onSubmit={handleUpdate}>
   
      
{
    cates?.map((item,index) => {
      return (
        <div key={index}> <label className="form-control w-full my-2  flex flex-col md:flex-row ">
        <div className="label">
          <span className="label-text text-2xl w-60">{item}: </span>
         
        </div>
        <input type='text' readOnly={item == "Date" ? true : false} name={item}  placeholder="Type here" className="input input-bordered w-full max-w-xs" value={input ? input[index] ? input[index] : '' : ''} onChange={()=>handleChange(index ,event)} />
        
      </label></div>
      )
    })
  }

      <button className="btn  mt-28 btn-primary md:w-96 w-full " type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
        
            <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"  strokeWidth="2" strokeLinecap="round"/>
<path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"  strokeWidth="2" strokeLinecap="round"/>
        </svg>
         Submit
      </button>
</form>

<div className="-mt-32">
      <button className="btn btn-info " onClick={handleAdd}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
        
            <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"  strokeWidth="2" strokeLinecap="round"/>
<path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"  strokeWidth="2" strokeLinecap="round"/>
       </svg>
         Add New Category
      </button> </div>


</div><div className="mb-28"></div>

        </div>
    );
};

export default Update;