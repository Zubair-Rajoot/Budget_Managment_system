import React from 'react'
import {} from 'antd'

const Analytics = ({allTransection}) => {
    const totalTransaction = allTransection.length
    const totalIncomeTransactions = allTransection.filter(transaction => transaction.type === 'income')
    const totalExpenseTransactions = allTransection.filter(transaction => transaction.type === 'income')
    const totalIncomePercent =(totalIncomeTransactions/totalTransaction)* 100
    const totalExpensePercent=(totalExpenseTransactions/totalTransaction)* 100 
  return (
    <>
    <div className='row mt-3'>
        <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                    Total Transaction : {totalTransaction}
                </div>
                <div className='card-body'>
                    <h5>income: {totalIncomeTransactions.length}</h5>
                    <h5>Expense: {totalExpenseTransactions.length}</h5>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Analytics