import {  useEffect, useState } from 'react';

const New = () => {

  const [data, setData] = useState(null);
  const [cates, setCates] = useState(null);

  
 useEffect(() => {
   const localData = localStorage.getItem('data')
   setData(JSON.parse(localData));
   const localCates = localStorage.getItem('cates')
   setCates(JSON.parse(localCates));


 }, []);

 const AllData = data;
 // console.log(cates)


  // const [data, setData] = useState(() => {
  //   const storedData = localStorage.getItem('Data');
  //   return storedData ? JSON.parse(storedData) : [];
  // });

  // const cates = [
  //   "Name", "Facebook" , "Address", "Institution" , "Connection"
  // ]

  // const data = [
  //   [ "tanika rahman" , "tanika405", "rangpur, bd", "dhaka idial collage" , "complicated"],
  //   [ "tanika rahman" , "tanika405", "rangpur, bd", "dhaka idial collage" , "complicated"],

  // ]



  // const [count, setCount] = useState(() => {
  //   const storedCount = localStorage.getItem('count');
  //   return storedCount ? parseInt(storedCount) : 0;
  // });

  // const increment = () => {
  //   setCount(count + 1);

  // };
 

const handleSubmit = (e)=>{
  
  e.preventDefault();
  console.log(AllData);
  
   const allInputs = e.target.querySelectorAll('input');
 // console.log(allInputs);

 // console.log(allInputs[0])

  const newItem = []

  for(let i = 0; i < allInputs.length; i++){

    
 //   console.log(allInputs[i].value);
    newItem.push(allInputs[i].value)
    allInputs[i].value = ''
  }

  if(newItem[0]){
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString()
    // const formattedDate = currentDate.toLocaleDateString();
    // const newData = [...data , newItem]
    // setData(newData);
    newItem.unshift(date);
    AllData.push(newItem);
    // console.log(data);
    // console.log(cates);
  
     localStorage.setItem('data', JSON.stringify(AllData));
     document.getElementById('my_modal_success').showModal()
  
  }else{
   document.getElementById('my_modal_empty').showModal()
  }


   //console.log('added succesfully')
  
}



// useEffect(() => {
 
// }, [data]);
   
const handleAdd =(e)=>{
  e.stopPropagation();
  
  document.getElementById('my_modal_6').showModal();
//  document.getElementById('my_modal_6').style.display = "block"
  
 }
 const handleFormAdd =(e) =>{
  const input = e.target.text.value;
  if(input){
     console.log(input)
  const newCates = [...cates , input]
  localStorage.setItem("cates" , JSON.stringify(newCates));
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
        <div>
          <dialog id="my_modal_5" className="modal">
  <div className="modal-box">
    <form action=""></form>
    <h3 className="font-bold text-lg">New!</h3>
    <p className="py-4">Added SuccessFull</p>
  </div>
   
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
          
          <dialog id="my_modal_6" className="modal modal-bottom  sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">New</h3>
    <p className="py-4">Add new Category</p>
    <div className="modal-action block">
   
      <form method="dialog" onSubmit={handleFormAdd}>
 <button onClick={handleModalClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

      <input type="text" name="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"  />
        <button type="submit" className="btn btn-info md:ml-7 md:w-auto w-full mt-3 md:mt-0">Add</button>
      </form>
    </div>
  </div>
</dialog>

{/* <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button> */}
<dialog id="my_modal_6" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" className="modal-backdrop">
  <input type="text" name="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <button type="submit" className="btn btn-info md:ml-7 md:w-auto w-full mt-3 md:mt-0">Add</button>
  </form>
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
<dialog id="my_modal_success" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-green-700">Entry Added Successfully.</h3>
    <p className="py-4">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
            {/* <button className='btn btn-primary' onClick={local}> Add local</button> */}
            <div className="main max-w-6xl  mx-auto mt-10 ">

<h1 className="text-3xl font-bold mt-10 mb-8">Add New Entry.</h1>

<form action="#" className="w-full" onSubmit={handleSubmit}>

  {
    cates?.map((item,index) => {
      return (
        <div key={index}> <label className={`form-control w-full my-2  flex flex-col md:flex-row ${index == 0 ? "hidden" : 'block'}`}>
        <div className='label'>
          <span className="label-text text-2xl w-60">{item}: </span>
         
        </div>
        {index == 0 ? "" : <input type="text"  placeholder="Type here" className="input input-bordered w-full max-w-xs" />}
        
        
      </label></div>
      )
    })
  }
 
  

      <button type='submit' className="btn mt-28 btn-primary md:w-96 w-full">Submit
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
        
        <path fill="none"  strokeWidth="2" d="M6,12.4 L18,12.4 M12.6,7 L18,12.4 L12.6,17.8"/>
        </svg>
         
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


</div>
        </div>
    );
};

export default New;