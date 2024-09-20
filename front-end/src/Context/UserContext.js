import React, { createContext,useState,useEffect } from 'react'
import axios from 'axios';
export const UserContext = createContext();


export function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);

    
    const deleteTransaction=(id)=>{
    
           
            
            setTransactions(transactions.filter((e)=>
                id!==e._id
            ))
       

        
    }
    const fetchUserData = async () => {
   
        try {
            console.log("fetching data..");
            
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/expense`, { withCredentials: true });
            if (response.data) {
             
                setUser(response.data.user);
                setTransactions(response.data.expense);
                
                
                 // Set transactions from user data
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user data", error);
            setUser(null);
        }
    };
    useEffect(() => {
        fetchUserData();
        
    }, []);
    
  return (
    <UserContext.Provider value={{ user, setUser, transactions, setTransactions,fetchUserData,deleteTransaction }}>
    {children}
    </UserContext.Provider>
  )
}


