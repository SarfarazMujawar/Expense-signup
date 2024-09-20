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
     
      const balance = amount.reduce((acc,ele)=>{
        return acc+ele;

      },0)
      
      
      
  return (
    <div className='flex flex-col justify-start items-start w-full mt-4 ' >
      <p className='font-semibold text-sm text-white'>YOUR BALANCE</p>
      <p className='text-3xl font-bold text-white '>{formatAmount(balance)}</p>
    </div>
  )
}

export default Balance

