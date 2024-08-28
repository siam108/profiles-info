
import { useEffect, useState } from 'react';
import { db } from './firebase/firebase.init';
import { collection, getDocs ,doc , updateDoc} from 'firebase/firestore';



const Database = () => {

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
        console.log(fireData)
        console.log(fireCates)
    } catch (err) {
        console.log(err)
    }
}


const updateStoreData = async (newData) => {
    const dataDoc = doc(db, "data", TableId);
    try{
        await updateDoc(dataDoc, {data : JSON.stringify(newData)});
        getStore()
        alert('updated successfull')
    } catch (err) {
       alert(err);
    }
    
  };
 const updateStoreCates = async (newCates) => {
    const dataDoc = doc(db, "data", TableId);
    try{
        await updateDoc(dataDoc, { cates: newCates});
        getStore()
        alert('updated successfull')
    } catch (err) {
       alert(err);
    }
    
  };
 



   useEffect(()=>{
    getStore()
   },[])

 

   
    return (
        <div>
            <button onClick={updateStore}> update </button>
            <p>{cates}</p>
            <p>{data[1]}</p>
        </div>
    );
};

export default Database;