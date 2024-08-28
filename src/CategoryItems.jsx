import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from './firebase/firebase.init';
import { collection, getDocs ,doc , updateDoc} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryItems = () => {

 const { id } = useParams();

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


  let serial = 1;

  return (
    <div>
      <ToastContainer />
      <div className="main max-w-6xl  mx-auto mt-10 ">
        <Link to="/categories" className="btn btn-info mt-10 btn-sm  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M11 9L8 12M8 12L11 15M8 12H16M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </Link>

        <h1 className="text-3xl font-bold mt-2 mb-8">
          All Entries of : {cates ? cates[id] : ""}
        </h1>

        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Descriptions</th>
              {/* <th>Description</th> */}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              if (item[id]) {
                return (
                  <tr key={index}>
                    <th>{serial++}</th>
                    <td>{item[id]}</td>
                    <td>
                      <Link
                        className="btn btn-info btn-sm"
                        to={`/details/${index}`}
                      >
                        {" "}
                        View{" "}
                      </Link>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>

        <div className="mb-8 mt-10">
          {/* <button className="btn btn-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Update
          </button>{" "}
          <button className="btn  btn-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M10 12V17"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 12V17"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 7H20"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Delete
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryItems;
