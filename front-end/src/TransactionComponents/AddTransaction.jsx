import React, { useState } from "react";
import axios from "axios";
import Input from "../Components/Input";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function AddTransaction({ fetchUserData }) {
  const [transaction, setTransaction] = useState({
    text: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...transaction };
    newData[name] = value;
    setTransaction(newData);
  };
  const addExpense = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/expense",
        transaction,
        { withCredentials: true }
      );
      console.log("from addExpense ", response.data);
      toast.success(response.data.message);
      fetchUserData();
    } catch (error) {
      if (error.status === 400) {
        toast.error(error.response.data.error);
        console.log("Error from addExpense 400", error.response.data.error);
      }
      else if (error.status === 404) {
        toast.error(error.response.data.message);
      }
      else if (error.status === 500) {
        toast.error(error.response.data.message);
      }
      else {
        toast.error("Some Error Occured");
      }
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="text">Expense Description</label>
      <Input className="w-full"
        type="text"
        name="text"
        placeholder="Enter Description"
        value={transaction.expense}
        onChange={handleChange}
      ></Input>
      <label htmlFor="amount">Enter Amount</label>
      <p>(negative - expense, positive + income)</p>
      <Input
        type="number"
        name="amount"
        placeholder="Enter Amount"
        value={transaction.amount}
        onChange={handleChange}
      ></Input>
      <button
        className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-cyan-600"
        onClick={addExpense}
      >
        Add Expense
      </button>
      <ToastContainer />
    </div>
  );
}

export default AddTransaction;
