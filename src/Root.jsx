import { useEffect } from "react";
import {  Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navber from "./Navber";
const Root = () => {

 
const navigate = useNavigate();
 useEffect(() => {
  //  const categories = localStorage.getItem('cates');
  //  const data = localStorage.getItem('data');
   const log = sessionStorage.getItem('log');

  

   if(log){
     console.log('loged in')
   }else{
      navigate('/login')
   }

  //  if(categories){
  //   console.log('availabe categories')
  //  }else{
  //   const cates = [
  //      "Date", "Name", "Number", "Facebook" , "Address", "Institution" , "Connection"
  //     ]
  //   localStorage.setItem('cates' , JSON.stringify(cates));
  //  }

  //  if(data){
  //   console.log('availabe data')
  //  }else{
  //   const currentDate = new Date();
  //   const date = currentDate.toLocaleDateString()
   
  //   const data = [
  //      [date, "shophia", "222342", "shophia204" , "london uk", "standford" , "local"],
  //     ]
  //   localStorage.setItem('data' , JSON.stringify(data));
  //  }
 }, []);



    return (
        <div className=" mx-auto font-poppins">
            <Navber></Navber>
            <Outlet></Outlet>      
             
        </div>
    );
};

export default Root;