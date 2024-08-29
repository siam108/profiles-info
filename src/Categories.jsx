import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from './firebase/firebase.init';
import { collection, getDocs ,doc , updateDoc} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Categories = () => {

 // const navigate = useNavigate();
  

  const [updating, setUpdating] = useState(null);

  const [data, setData] = useState(null);
  const [cates, setCates] = useState(null);
  const [TableId, setTableId] = useState();

  const connection = collection(db, 'data')

  const getStore = async () =>{
   try {
       const data = await getDocs(connection);
       const filterData = data.docs.map((doc) => ({...doc.data() ,id: doc.id }))
      
       const fireData = filterData[0].data;
       const fireCates = filterData[0].cates;

       setTableId(filterData[0].id)

       setData(JSON.parse(fireData));
       setCates(fireCates)
     //  console.log(fireData)
     //  console.log(fireCates)
   } catch (err) {
       toast(err)
   }
}


const updateStoreData = async (newData , undo) => {
  const dataDoc = doc(db, "data", TableId);
  try{
      await updateDoc(dataDoc, {data : JSON.stringify(newData)});
      getStore()
      if(undo){
       toast.success( "undo done !");
      
       
      }else{
        toast.success( <>updated   <button onClick={()=> {handleUndoData(); toast.dismiss();}} className="btn btn-primary ml-5">Undo changes</button></>)
      }
  } catch (err) {
     toast(err);
  }
  
};
const updateStoreCates = async (newCates , undo) => {
 const dataDoc = doc(db, "data", TableId);
 try{
     await updateDoc(dataDoc, { cates: newCates});
     getStore()
     if(undo){
       toast.success( "undo done !");
      
       
      }else{
        toast.success( <>Updated <button onClick={()=> {handleUndoCates(); toast.dismiss();}} className="btn btn-primary ml-5">Undo changes</button></>)
      }
 } catch (err) {
    toast(err);
 }
 
};

const updateStoreBoth = async (newData, newCates , undo) => {

  const dataDoc = doc(db, "data", TableId);
  console.log('boothe updating')

  try{
      await updateDoc(dataDoc, { cates: newCates , data : JSON.stringify(newData)});
      getStore()
      if(undo){
        toast.success( "undo done !");
       
        
       }else{
         toast.success( <>Updated <button onClick={()=> {handleUndoBoth(); toast.dismiss();}} className="btn btn-primary ml-5">Undo changes</button></>)
       }
  } catch (err) {
     toast(err);
  }

}




  useEffect(()=>{
   getStore()
  },[])

  const handleUndoBoth = () => {
    const tempData = localStorage.getItem('temp-data');
    const tempCates = localStorage.getItem('temp-cates');
    setData(JSON.parse(tempData));
    setCates(JSON.parse(tempCates));

    updateStoreBoth(JSON.parse(tempData), JSON.parse(tempCates) , true);


    
  }

  const handleUndoData = () => {
  
    const tempData = localStorage.getItem('temp-data');
    
  //  console.log('from update');
    setData(JSON.parse(tempData));
    updateStoreData(JSON.parse(tempData) , true);
  }
  const handleUndoCates = () => {
  
    const tempCates = localStorage.getItem('temp-cates');
    
  //  console.log('from update');
    setData(JSON.parse(tempCates));
    updateStoreCates(JSON.parse(tempCates) , true);
  }
 
 

  


 const  handleUpdate = (id) =>{
  document.getElementById('my_modal_5').showModal();
  
   setUpdating(id)
 }

 const handleUpdateForm = (e) =>{
  localStorage.setItem("temp-cates" , JSON.stringify(cates))
  const input = e.target.update.value;
  if(input){
    //  console.log(input, updating)

  const newCates = [...cates]
  newCates[updating] = input
 // localStorage.setItem("cates" , JSON.stringify(newCates));
  updateStoreCates(newCates)
  setCates(newCates)
 e.target.update.value = ''
  //console.log(e.target)
  //navigate('/categories')
  }

 }
 
 const handleAdd =()=>{
  document.getElementById('my_modal_6').showModal();
  
 }
 const handleFormAdd =(e) =>{
  localStorage.setItem("temp-cates" , JSON.stringify(cates))
  const input = e.target.new.value;
  console.log(input)
  if(input){
  const newCates = [...cates , input]
 // localStorage.setItem("cates" , JSON.stringify(newCates));
  updateStoreCates(newCates);
  setCates(newCates)
  e.target.new.value = ''
  // navigate('/categories')
  }
 }

 const handleDelete = (id) =>{
  localStorage.setItem('temp-data' , JSON.stringify(data));
  localStorage.setItem("temp-cates" , JSON.stringify(cates))
   console.log(id);
   const newCates = [...cates ];
  newCates.splice(id , 1)
  //localStorage.setItem("cates" , JSON.stringify(newCates));
 // updateStoreCates(newCates)
 
  // console.log(data)

 const newData = [...data];
   for(let i=0; i< data.length; i++){
    console.log(newData[i].splice(id,1));
    
   }
  // localStorage.setItem("data" , JSON.stringify(newData));
 // updateStoreData(newData);
  updateStoreBoth(newData, newCates);
  setCates(newCates)

 }

 const handleModalClose = (e) =>{
  // document.getElementById('my_modal_6').style.display = "none"
   // e.preventDefault();
   //  e.stopPropagation();
    e.target.parentNode.children[1].value = ''
  //  console.log(e.target.parentNode.children[1])
   //console.log(input)

  }

 
 let serial = 1;
    return (
        <div>
          <ToastContainer autoClose={3000} />
          {/* Open the modal using document.getElementById('ID').showModal() method
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button> */}
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Update</h3>
    <p className="py-4">Update This Category Name</p>
    <div className="modal-action block">
   
      <form method="dialog"  onSubmit={handleUpdateForm}> 
        <button onClick={handleModalClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <input type="text" name="update" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <button type="submit" className="btn btn-info md:ml-7 md:w-auto w-full mt-3 md:mt-0">Update</button>
      </form>
    </div>
  </div>
</dialog>
<dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">New</h3>
    <p className="py-4">Add new Category</p>
    <div className="modal-action block">
   
      <form method="dialog" onSubmit={handleFormAdd}> 
        <button onClick={handleModalClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <input type="text" name="new" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <button type="submit" className="btn btn-info md:ml-7 md:w-auto w-full mt-3 md:mt-0">Add</button>
      </form>
    </div>
  </div>
</dialog>
            <div className="main max-w-6xl  mx-auto mt-10 ">

<h1 className="text-3xl font-bold mt-10 mb-8">All Categories.</h1>

<div className="overflow-x-auto">
    <table className="table table-zebra">
     
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Actions</th>
           
        </tr>
      </thead>
      <tbody>

        {
          cates?.map((item,index) => {
            return(
              <tr key={index}>
              <th>{serial++}</th>
              <td>{item}</td>
              <td>
                <div className="flex">

               
                 <Link className="btn btn-sm mr-2 btn-primary" to={`/category-items/${index}`}>

                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>

                  
                 </Link>
                 <button className="btn btn-sm mr-2 btn-primary" onClick={()=>handleUpdate(index)}>


                 <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>


                   
                 </button>
                 <button className={`btn btn-sm btn-error ${item == "Date" ? 'hidden' : ''}`}  onClick={()=>handleDelete(index)}>
                 <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                            
                              <path d="M10 12V17"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14 12V17"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M4 7H20"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                              </button>
                            </div>
              </td>
               
            </tr>
            )
          })
        }
         
       
         
         
      
        
      </tbody>
    </table>
  </div>

<button className="btn btn-info mt-8 " onClick={handleAdd}>
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
  </button>


</div><div className="mb-10"></div>

        </div>
    );
};

export default Categories;