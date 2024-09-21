import React, { useContext, useEffect } from "react";


import { UserContext } from "../Context/UserContext";
import Balance from "../TransactionComponents/Balance";
import IncomeExpense from "../TransactionComponents/IncomeExpense";
import AddTransaction from "../TransactionComponents/AddTransaction";
import Navbar from "../TransactionComponents/Navbar";
import Header from "../TransactionComponents/Header";
import Passbook from "../TransactionComponents/Passbook";
function Home({ setIsAuthenticated }) {
  const {
    user,
    transactions,
    setUser,
    setTransactions,
    fetchUserData,
  
    deleteTransaction,
  } = useContext(UserContext);



  useEffect(() => {
    fetchUserData();
  }, []);
  if (!user) {
    return <div>Loading...</div>; // or a suitable loading indicator
  }
 

  return (
    <div className="w-full min-h-screen  bg-gradient-to-br from-gray-900 via-gray-700 to-black  ">
  <Navbar
    setUser={setUser}
    setTransactions={setTransactions}
    setIsAuthenticated={setIsAuthenticated}
  />
  <div className="grid grid-cols-1  mt-10 md:grid-cols-2 ">

  
  <div className="flex flex-col justify-center items-center min-w-80 max-w-80 mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-lg mt-3 px-3 py-2 shadow-xl shadow-black "> {/* Center content with a max width */}
    
    <Header user={user}/>
    <Balance transactions={transactions} />
    <IncomeExpense transactions={transactions} />
    
    <AddTransaction fetchUserData={fetchUserData} />
  </div>

  <div>
    <Passbook transactions={transactions} deleteTransaction={deleteTransaction}/>
            
  </div>
  </div>
</div>
  );
}

export default Home;
