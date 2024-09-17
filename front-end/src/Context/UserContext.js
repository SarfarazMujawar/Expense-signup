import React, { createContext,useState,useEffect } from 'react'
import axios from 'axios';
export const UserContext = createContext();


export function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);

    function addTransaction(newTransaction) {
        setTransactions([...transactions, newTransaction]);
        console.log(newTransaction);
    }
    function deleteTransaction(id){
        setTransactions(transactions.filter((e)=>
            id!==e.id
        ))
    }
    const fetchUserData = async () => {
   
        try {
            console.log("fetching data..");
            
            const response = await axios.get('http://localhost:8000/expense', { withCredentials: true });
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
    <UserContext.Provider value={{ user, setUser, transactions, setTransactions,fetchUserData,addTransaction,deleteTransaction }}>
    {children}
    </UserContext.Provider>
  )
}


