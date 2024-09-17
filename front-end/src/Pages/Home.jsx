import React, { useContext, useEffect } from "react";

import { UserContext } from "../Context/UserContext";
import Balance from "../TransactionComponents/Balance";
import IncomeExpense from "../TransactionComponents/IncomeExpense";
import AddTransaction from "../TransactionComponents/AddTransaction";
import Navbar from "../TransactionComponents/Navbar";
import Header from "../TransactionComponents/Header";

function Home({ setIsAuthenticated }) {
  const {
    user,
    transactions,
    setUser,
    setTransactions,
    fetchUserData,
    addTransaction,
    deleteTransaction,
  } = useContext(UserContext);

  console.log(user);

  useEffect(() => {
    fetchUserData();
  }, []);
  if (!user) {
    return <div>Loading...</div>; // or a suitable loading indicator
  }
  console.log('transations',transactions);

  return (
    <div className="w-full bg-zinc-500">
  <Navbar
    setUser={setUser}
    setTransactions={setTransactions}
    setIsAuthenticated={setIsAuthenticated}
  />
  <div className="flex flex-col justify-center items-center max-w-xs mx-auto mt-6  "> {/* Center content with a max width */}
    
    <Header user={user}/>
    <Balance transactions={transactions} />
    <IncomeExpense transactions={transactions} />
    
    <AddTransaction fetchUserData={fetchUserData} />
  </div>
</div>
  );
}

export default Home;
