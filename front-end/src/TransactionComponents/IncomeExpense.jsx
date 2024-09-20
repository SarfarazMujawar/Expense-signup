import React from 'react'

function IncomeExpense({transactions}) {
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 2,
        }).format(amount);
      };
    const amount = transactions.map(ele=>ele.amount);
    const income = amount.filter(ele=>ele>0).reduce((acc,ele)=>{
        return acc+ele

    },0)
    const expense = amount.filter(ele=>ele<0).reduce((acc,ele)=>{
        return acc+ele

    },0)*-1;
   
    
  return (
    <div className='w-full grid grid-cols-2  bg-none rounded-lg gap-6  mt-5 '>
        <div className='max-w-xs bg-green-300 border-l-8 border-green-500 rounded-md p-2 shadow-lg shadow-gray-800'>
            <h1 className='font-semibold text-sm text-green-800'>Income</h1>
            <p className='font-bold text-xl text-green-800'>{formatAmount(income)}</p>
        </div>
        <div className='bg-red-300 max-w-xs  border-l-8 border-red-500 rounded-md p-2 shadow-lg shadow-gray-800'>
            <h1 className='font-semibold text-sm text-red-800'>Expense</h1>
            <p  className='font-bold text-xl text-red-800'> {formatAmount(expense)}</p>
        </div>
      
    </div>
  )
}

export default IncomeExpense
