import React from 'react'

function Balance({transactions}) {
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 2,
        }).format(amount);
      };

      const amount=  transactions.map(ele=>ele.amount)
      console.log(amount);
      const balance = amount.reduce((acc,ele)=>{
        return acc+ele;

      },0)
      console.log(balance);
      
      
  return (
    <div className='flex flex-col justify-start items-start w-full mt-4' >
      <p className='font-semibold text-sm'>YOUR BALANCE</p>
      <p className='text-3xl font-bold '>{formatAmount(balance)}</p>
    </div>
  )
}

export default Balance

