import { Link,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { db } from './firebase/firebase.init';
import { collection, getDocs ,doc , updateDoc} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 
const Home = () => {
  const navigate = useNavigate();

  
  const [showing, setShowing] = useState([]);
  const [searching, setSearching] = useState([]);
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
      // console.log(fireCates)
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
        toast.success( "undo done !")
        
       }else{
         toast.success( <>Updated   <button onClick={()=> {handleUndoData(); toast.dismiss();}} className="btn btn-primary ml-5">Undo changes</button></>)
       }
   } catch (err) {
      toast(err);
   }
   
 };
const updateStoreCates = async (newCates) => {
   const dataDoc = doc(db, "data", TableId);
   try{
       await updateDoc(dataDoc, { cates: newCates});
       getStore()
       toast('updated successfullssss <button class="btn btn-info"> Undo</button>')
   } catch (err) {
      toast(err);
   }
   
 };



  useEffect(()=>{
   getStore()


   let counter = 0;
const intervalId = setInterval(() => {
  getStore()
  console.log("Iteration:", counter);
  counter++;

  if (counter === 1) {
    clearInterval(intervalId);
  }
}, 6000);
 
  },[])



 // const AllData = data;

 // cates && console.log(cates)

 const handleUndoData = () => {
  
   const tempData = localStorage.getItem('temp-data');
   
   console.log('from home');
   setData(JSON.parse(tempData));
   updateStoreData(JSON.parse(tempData) , true);
 }



 const handleDelete =(indexs) =>{

  //creating temp for undo

  localStorage.setItem('temp-data' , JSON.stringify(data));


  let id = indexs.indexs
  
  console.log(id);

  const newData = [...data];
 // console.log(newData[id])

  

newData.splice((id), 1); // Remove the element at index 2 (3)

console.log(newData);

setData(newData);
// localStorage.setItem("data" , JSON.stringify(newData))
updateStoreData(newData);



     

   }
let cates_show = [];
const categoryfix = () =>{

  ///let newItem = [...showing];


  let flag = true
  for(let i = 0; i < showing.length; i++){
    if(!showing[i]){
      flag = false;
    }
  }
  console.log(showing)
  console.log('flagflagflag-' , flag)

  if(showing.length === 0 || flag){

      const newItem = []
      console.log('empty')
       console.log(cates_show.length)
       for(let i = 0; i < cates.length; i++){newItem.push(false)}

       setShowing(newItem);
     }
  
 
   console.log(showing)
    
}
const handleCategories = (id,e) => {
   
  
  let box = e.target;
  console.log(box.checked);
 //  if(cates_show.length === 0){
 //   console.log('full')
  //   console.log(cates_show.length)
  //   for(let i = 0; i < cates.length; i++){cates_show.push(true)}
  // }
  let newItem = [...showing];
  newItem[id] = box.checked;
  // cates_show[id] = box.checked;

  let flag = true
  for(let i = 0; i < newItem.length; i++){
    if(newItem[i]){
      flag = false;
    }
  }

  if(flag){
    for(let i = 0; i < newItem.length; i++){
      newItem[i] = true;
  }
}

  setShowing(newItem)
   console.log(showing) 
}



const handleSearch = (e) => {
 //  console.log(e.target.value);
//  // let oldData = [...data]
let newItem = [...searching];
for(let i = 0; i < newItem.length; i++){newItem[i] = false}


//   let newData = [];

   for(let i= 0; i < newItem.length; i++){
    
    for(let j = 0; j < data[i].length; j++){
//    //  console.log(data[i][j])
//   // let item = oldData[i][j].to
    if (data[i][j].toLowerCase().includes(e.target.value.toLowerCase())) {
//   //  console.log(data[i]);
     newItem[i] = true;
    }
  // else {
//     newData.filter((item, index) => item !== data[i])
     // newItem[i] = false
   //  }
    }
   } 
   setSearching(newItem)
   console.log(searching)
    console.log(newItem);

  
}

const searchfix =() =>{
  if(searching.length === 0){

    let newItem = [...searching]
    console.log('empty')
   //  console.log(cates_show.length)
     for(let i = 0; i < data.length; i++){newItem.push(true)}

     setSearching(newItem);
   }
   

 console.log(searching)
}


const handleSortDate = (e) => {

    const newItems = [...data]

    for(let i = 0 ; i < newItems.length; i++){
      newItems[i][0] = new Date(newItems[i][0])
    }

   const sortedData = newItems.sort((a, b) => b[0].getTime() - a[0].getTime());
   for(let i = 0 ; i < sortedData.length; i++){
    sortedData[i][0] = new Date(newItems[i][0]).toLocaleDateString();
   

  }

  setData(sortedData);
   console.log(sortedData)
  console.log('sorted data')

  // active current sort
  
  let currentActive = document.querySelector('.sortBtn.btn-primary');

  if(currentActive){
    currentActive.classList.remove('btn-primary');
    e.target.classList.add('btn-primary')
  }else{
    e.target.classList.add('btn-primary')
  }



}

const handleSortName = (e) => {
  const newItems = [...data]
  const sortedData = newItems.sort((a, b) => a[1].localeCompare(b[1]));
  console.log(sortedData)
  setData(sortedData);

    
  let currentActive = document.querySelector('.sortBtn.btn-primary');

  if(currentActive){
    currentActive.classList.remove('btn-primary');
    e.target.classList.add('btn-primary')
  }else{
    e.target.classList.add('btn-primary')
  }
}

 let serial = 1;
 
    return (
        <div>
            <div className="main max-w-6xl  mx-auto mt-10 ">
            <ToastContainer autoClose={3000}/>
              {/* <button className="btn btn-success " onClick={searchfix}>Category fix</button> */}
        <div className="options flex items-center flex-wrap">



            <label  onClick={searchfix} className="input bg-base-200 w-full  input-bordered flex items-center gap-2 flex-1">
                <input type="text" className="grow" placeholder="Search" onChange={handleSearch} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-6 w-6 opacity-80">
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
                </svg>
                {/* <button className="btn btn-sm btn-info ml-1">search</button> */}
              </label>

              <div className="dropdown">
                <div tabIndex={0} className="btn m-1 btn-primary">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                  
                    <path d="M13 12H21M13 8H21M13 16H21M6 7V17M6 17L3 14M6 17L9 14"   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="hidden md:block"> Sort By</span> </div>
                <ul tabIndex={0} className="menu dropdown-content bg-base-300 rounded-box z-[10] w-52 p-2 shadow">
                  <li><button onClick={handleSortName} className="btn sortBtn">By Name (A to Z)</button></li>
                  <li><button className="btn sortBtn mt-2" onClick={handleSortDate}>By Date (new to old)</button></li>
                </ul>
              </div>

     {/*           <div className="dropdown">
 <div tabIndex={0} role="button" className="btn m-1">Click</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div> */}
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn  m-1 btn-primary" onClick={categoryfix}>
                    <svg  xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                        
                        <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"  strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"  strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"  strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>

                      <span className="hidden md:block"> Categories</span> 
                     
                    
                    </div>
                <ul tabIndex={0

                } className="menu dropdown-content bg-base-300 rounded-box z-[10] w-52 p-2 shadow">
                  
                  <form action="">

                  {
                   
                    cates?.map((item,index) => {
                      return(
                        
                          
                         <div className="form-control" key={index}>
                            <label className="label cursor-pointer justify-start gap-5"> 
                              <input type="checkbox" name="box"   className="checkbox"  onClick={()=>handleCategories(index,event)}/>
                             
                              <span className="label-text">{item}</span>
                             
                            </label>
                          </div>
                        
                      )
                    })
                   
                  } </form>
                  <Link to="/categories" className="btn btn-sm btn-info">Manage</Link>
                </ul>
              </div>
              {/* <form action="" onChange={handleCategories}>
                <input type="text" />
              </form> */}

              <Link to='/new' className="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                
                    <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"  strokeWidth="2" strokeLinecap="round"/>
<path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"  strokeWidth="2" strokeLinecap="round"/>
                </svg>

                <span className="hidden md:block"> Add New </span> 
                 
              </Link>

        </div>

        <div className="table1 mt-8">
            <div className="overflow-x-auto">
                <table className="table md:table-md table-xs table-zebra  table-pin-rows table-pin-cols">
                  <thead>
                    <tr>
                       <th>#</th>
                      
                      {
                        cates?.map((item,index) =>{
                          return(
                            <td className={showing ? showing[index] == false ? 'hidden' : '' : ''} key={index}>{item}</td> 
                          )
                         
                        })
                      }


                     
                      {/* <td>Name</td>
                      <td>Number</td>
                      <td>Facebook</td>
                      <td>Address</td>
                      <td>Institution</td>
                      <td>Connection</td> */}
                     
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>

                   {
                    data?.map((items,indexs) => {
                      //  <td>{}</td>
                      return (
                      
                        <tr className={searching ? searching[indexs] == false ? "hidden" : "" :""} key={indexs}>
                      <th className="first-th " onClick={()=> navigate(`details/${indexs}`)} >{serial++}</th>
                      
                      {cates.map((item,index)=>{
                        return(
                          <td  onClick={()=> navigate(`details/${indexs}`)} className={showing ? showing[index] == false ? 'hidden' : '' : ''} key={index}>{items[index]}</td>
                        )
                      })
                    } 
                     
                     
                      {/* <td>Quality Control Specialist</td>
                      <td>Littel, Schaden and Vandervort</td>
                      <td>Canada</td>
                      <td>12/16/2020</td>
                      <td>Blue</td> 
                     */}
                      <th  className="actions bg-base-200 hover:bg-base-300  items-center  gap-2">
                        <div className="flex">
                        <Link className="btn md:btn-md btn-sm md:p-2 p-0 border-none  md:border-2" to={`/update/${indexs}`} >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                             
                          </Link> <button className="btn md:btn-md btn-sm md:p-2 p-0 border-none  md:border-2"  onClick={() => handleDelete({indexs})}>
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
                      </th>
                    </tr>
                      )
                    })
                   }
                  </tbody>
                  {/* <tfoot>
                    <tr>
                      <th></th>
                      <td>Name</td>
                      <td>Job</td>
                      <td>company</td>
                      <td>location</td>
                      <td>Last Login</td>
                      <td>Favorite Color</td>
                      <th></th>
                    </tr>
                  </tfoot> */}
                </table>
              </div>
        </div>
      </div>
        </div>
    );
};

export default Home;