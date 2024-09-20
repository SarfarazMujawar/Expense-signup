import React from "react";
import { FcDeleteDatabase } from "react-icons/fc";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Passbook({ transactions, deleteTransaction }) {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };
  const groupByDate = (transactions) => {
    return transactions.reduce((group, transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString();

      if (!group[date]) {
        group[date] = [];
      }
      group[date].push(transaction);
      return group;
    }, {});
  };
  const grouped = groupByDate(transactions);

  const deleteEntry = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/expense/${id}`,
        { withCredentials: true }
      );
      console.log("response from delete", response.data);
      toast.success(response.data.message);
      deleteTransaction(id);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the expense");
    }
  };
  return (
    <div>
      <div className="max-w-md mx-auto p-4 pt-0 mt-5 ">
        <h1 className="text-xl font-bold text-center w-full mb-2 text-white  ">
          Transaction History
        </h1>
        <div className="border max-w-auto border-black rounded-lg   overflow-hidden bg-white bg-opacity-25 backdrop-blur-lg  mt-3 px-3 py-2 shadow-xl shadow-black ">
          <div className="md:max-h-96 overflow-y-auto p-4 max-h-80">
            {Object.keys(grouped)
              .reverse()
              .map((date) => (
                <div key={date} className="mb-4">
                  <h2 className="text-sm font-bold ml-6 text-white">{date}</h2>
                  <ul>
                    {grouped[date].reverse().map((transaction) => (
                      <li
                        key={transaction._id}
                        className={`flex flex-row justify-between items-center py-2 px-0  border-b-2 border-white `}
                      >
                        <div className="flex flex-row items-center w-full ">
                          <p
                            className={` font-bold w-10 text-center h-5 text-white `}
                          >
                            {transaction.text}
                          </p>
                          <p
                            className={` ml-32 font-bold ${
                              transaction.amount >= 0
                                ? "text-green-400"
                                : "text-red-500"
                            }`}
                          >
                            {formatAmount(transaction.amount)}
                          </p>
                        </div>
                        <button
                          className="  px-2 py-1 text-red-600 mr-5 rounded hover:bg-red-600 hover:text-black"
                          onClick={() => deleteEntry(transaction._id)}
                        >
                          <FcDeleteDatabase />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Passbook;
