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
  const addExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/expense`,
        transaction,
        { withCredentials: true }
      );
      setTransaction({ text: "", amount: "" });
      toast.success(response.data.message);
      fetchUserData();
    } catch (error) {
      if (error.status === 400) {
        toast.error(error.response.data.error);
      } else if (error.status === 404) {
        toast.error(error.response.data.message);
      } else if (error.status === 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Some Error Occured");
      }
    }
  };

  return (
    <div className="w-full mt-5">
      <form onSubmit={addExpense} noValidate>
        <label htmlFor="text" className="font-semibold text-sm text-white">
          Expense Description
        </label>

        <Input
          className="w-full bg-gray-700 font-semibold  placeholder:text-gray-400 placeholder:text-sm text-white  border border-zinc-800 rounded p-1 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
          type="text"
          name="text"
          placeholder="Enter Description"
          value={transaction.text}
          onChange={handleChange}
        ></Input>

        <label htmlFor="amount" className="font-semibold text-sm text-white">
          Enter Amount
        </label>
        <p className="font-semibold text-xs mb-2 text-white">
          (negative - expense, positive + income)
        </p>
        <Input
          className="w-full bg-gray-700 font-semibold  placeholder:text-gray-400 placeholder:text-sm text-white  border border-zinc-800 rounded p-1 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-800"
          type="number"
          name="amount"
          placeholder="Enter Amount"
          value={transaction.amount}
          onChange={handleChange}
        ></Input>
        <button className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
