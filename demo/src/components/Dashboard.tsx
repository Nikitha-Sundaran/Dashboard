import React, { useContext ,useEffect, useState } from "react";
import  MyContext  from '../MyContext';
import { dashboardData } from "../Firebase";
import Table from "./Table";
import Insert from "./Insert";
import { userDetails } from "../Firebase";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Dashboard = () =>{

    
    const { text } = useContext(MyContext);
    const [data, setData] = useState<any[]>([]);
    const [show , setShow] =useState(false);
    const [userDetail,setUserDetail] =  useState<any[]>([]);
    
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(text === undefined){
            navigate('/')
        }
    },[text])


    useEffect(() => {
        if (text?.Username){
            const fetchDataFromFirebase = async () => {
            try {
                const fetchedData:any = await dashboardData(text?.Username); // Fetch data from Firebase
                setData(fetchedData); // Update component state with fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromFirebase();
     } 
    }, [show]);


    useEffect(() => {
        if (text?.Username){
            const fetchDataFromFirebase = async () => {
            try {
                const fetchedData:any = await userDetails(text?.Username); // Fetch data from Firebase
                setUserDetail(fetchedData); // Update component state with fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromFirebase();
     } 
    }, []);

    const handleClick = ()=>{
        setShow(true);
    }

    const logout = () =>{
        navigate('/')
    }


    return (
        <div className={text?.type==='user'?"userbg":"dashboardbg"}>
        <div className="dashboard">
            <div className="font">Welcome {text?.Username}!
            <div className="insert"><Button login={logout} name='Logout'/></div>
            {text?.type==="admin" &&( <div className="space"><Button login={handleClick} name='Insert'/></div>)}
            </div>
            {show  &&(<div>
                <Insert setShow ={setShow} text ={text?.Username}/>
            </div>
            )}
            
            {data?.length > 0 && text?.type==="admin" &&  (<div className="table">
                <Table data={data} setData={setData} text={text?.type}/>
            </div>
            
            )}

            <div className="table">
              <Table data={userDetail} setData={setUserDetail} text='user'/>
            </div>
        </div>
        </div>
    )
}

export default Dashboard;