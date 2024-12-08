// import React from "react";
// import { Progress } from "antd";


// const Analytics = ({ allTransection }) => {
//   const categories = [
//     "salary",
//     "tip",
//     "project",
//     "food",
//     "movie",
//     "bills",
//     "medical",
//     "fee",
//     "tax",
//   ];

//   const totalTurnover = allTransection.reduce(
//     (acc, transaction) => acc + transaction.amount,
//     0
//   );
//   const totalincomeTurnover = allTransection
//     .filter((transaction) => transaction.type === "income")
//     .reduce((acc, transaction) => acc + transaction.amount, 0);
//   const totalExpenseTurnover = allTransection
//     .filter((transaction) => transaction.type === "expense")
//     .reduce((acc, transaction) => acc + transaction.amount, 0);

//   const totalIncomeTurnoverPercent =
//     ((totalincomeTurnover-totalExpensePercent)/totalincomeTurnover) * 100;
//   const totalExpenseTurnoverPercent =
//     (totalExpenseTurnover / totalincomeTurnover) * 100;

//   const totalTransaction = allTransection.length;
//   const totalIncomeTransactions = allTransection.filter(
//     (transaction) => transaction.type === "income"
//   );
//   const totalExpenseTransactions = allTransection.filter(
//     (transaction) => transaction.type === "expense"
//   );
//   const totalIncomePercent =
//     (totalIncomeTransactions.length / totalTransaction) * 100;
//   const totalExpensePercent =
//     (totalExpenseTransactions.length / totalTransaction) * 100;

//   return (
//     <>
//     <div className="analytics-container">
//   <div className="row">
//     <div className="col-md-4">
//       <div className="card analytics-card fade-left ">
//         <div className="card-header">Total Transactions: {totalTransaction}</div>
//         <div className="card-body">
//           <h5 className="text-success">
//             Income: {totalIncomeTransactions.length}
//           </h5>
//           <h5 className="text-danger">
//             Expense: {totalExpenseTransactions.length}
//           </h5>
//           <div className="progress-wrapper">
//             <Progress
//               type="circle"
//               strokeColor="green"
//               className="mx-2"
//               percent={totalIncomePercent.toFixed(0)}
//             />
//             <Progress
//               type="circle"
//               strokeColor="red"
//               className="mx-2"
//               percent={totalExpensePercent.toFixed(0)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="col-md-4">
//       <div className="card analytics-card bounce fade-down">
//         <div className="card-header">Total Turnover: {totalTurnover}</div>
//         <div className="card-body">
//           <h5 className="text-success">Income: {totalincomeTurnover}</h5>
//           <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>
//           <div className="progress-wrapper">
//             <Progress
//               type="circle"
//               strokeColor="green"
//               className="mx-2"
//               percent={totalIncomeTurnoverPercent.toFixed(0)}
//             />
//             <Progress
//               type="circle"
//               strokeColor="red"
//               className="mx-2"
//               percent={totalExpenseTurnoverPercent.toFixed(0)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="col-md-4">
//       <h4 className="section-header fade-right">Category-wise Expense</h4>
//       {categories.map((category) => {
//         const amount = allTransection
//           .filter(
//             (transaction) =>
//               transaction.type === "expense" && transaction.category === category
//           )
//           .reduce((acc, transaction) => acc + transaction.amount, 0);
//         return (
//           amount > 0 && (
//             <div className="card category-card fade-right">
//               <div className="card-body">
//                 <h5>{category}</h5>
//                 <Progress
//                   percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
//                 />
//               </div>
//             </div>
//           )
//         );
//       })}
//     </div>
//   </div>
//   <div className="row mt-3">
//     <div className="col-md-4">
//       <h4 className="section-header fade-left">Category-wise Income</h4>
//       {categories.map((category) => {
//         const amount = allTransection
//           .filter(
//             (transaction) =>
//               transaction.type === "income" && transaction.category === category
//           )
//           .reduce((acc, transaction) => acc + transaction.amount, 0);
//         return (
//           amount > 0 && (
//             <div className="card category-card fade-left">
//               <div className="card-body">
//                 <h5>{category}</h5>
//                 <Progress
//                   percent={((amount / totalincomeTurnover) * 100).toFixed(0)}
//                 />
//               </div>
//             </div>
//           )
//         );
//       })}
//     </div>
//   </div>
// </div>

//     </>
//   );
// };

// export default Analytics;


import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransection }) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  // Calculations
  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalincomeTurnover = allTransection
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransection
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Correct Percent Calculations
  const totalIncomeTurnoverPercent =
    totalincomeTurnover === 0
      ? 0
      : ((totalincomeTurnover - totalExpenseTurnover) / totalincomeTurnover) *
        100;

  const totalExpenseTurnoverPercent =
    totalincomeTurnover === 0
      ? 0
      : (totalExpenseTurnover / totalincomeTurnover) * 100;

  // Transactions Count
  const totalTransaction = allTransection.length;
  const totalIncomeTransactions = allTransection.filter(
    (transaction) => transaction.type === "income"
  ).length;

  const totalExpenseTransactions = allTransection.filter(
    (transaction) => transaction.type === "expense"
  ).length;

  const totalIncomePercent =
    totalTransaction === 0 ? 0 : (totalIncomeTransactions / totalTransaction) * 100;
  const totalExpensePercent =
    totalTransaction === 0 ? 0 : (totalExpenseTransactions / totalTransaction) * 100;

  return (
    <div className="analytics-container">
      <div className="row">
        {/* Total Transactions */}
        <div className="col-md-4">
          <div className="card analytics-card fade-left">
            <div className="card-header">Total Transactions: {totalTransaction}</div>
            <div className="card-body">
              <h5 className="text-success">Income: {totalIncomeTransactions}</h5>
              <h5 className="text-danger">Expense: {totalExpenseTransactions}</h5>
              <div className="progress-wrapper">
                <Progress
                  type="circle"
                  strokeColor="green"
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor="red"
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Turnover */}
        <div className="col-md-4">
          <div className="card analytics-card bounce fade-down">
            <div className="card-header">Total Turnover: {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income: {totalincomeTurnover}</h5>
              <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>
              <div className="progress-wrapper">
                <Progress
                  type="circle"
                  strokeColor="green"
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor="red"
                  className="mx-2"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category-wise Expenses */}
        <div className="col-md-4">
          <h4 className="section-header fade-right">Category-wise Expense</h4>
          {categories.map((category) => {
            const amount = allTransection
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);

            return (
              amount > 0 && (
                <div className="card category-card fade-right" key={category}>
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={(
                        (amount / totalExpenseTurnover) *
                        100
                      ).toFixed(0)}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>

      <div className="row mt-3">
        {/* Category-wise Income */}
        <div className="col-md-4">
          <h4 className="section-header fade-left">Category-wise Income</h4>
          {categories.map((category) => {
            const amount = allTransection
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);

            return (
              amount > 0 && (
                <div className="card category-card fade-left" key={category}>
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={(
                        (amount / totalincomeTurnover) *
                        100
                      ).toFixed(0)}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
