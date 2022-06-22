import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import axios from "axios";

//pass props
export default function Home({transactions, transfers, setTransactions, setTransfers, error, setError, isLoading, setIsLoading, filterInputValue, isCreating, setIsCreating, newTransactionForm, setNewTransactionForm,}) {

// filters the transactions
  const filteredTransactions = transactions?.filter((trans) =>
    filterInputValue.length
      ? trans.description
          ?.toLowerCase()
          .includes(filterInputValue?.toLowerCase())
      : transactions
  );

  const filteredTransfers = transfers?.filter((trans) =>
    filterInputValue.length
      ? trans.description
          ?.toLowerCase()
          .includes(filterInputValue?.toLowerCase())
      : transfers
  );
// fetches data
  const getTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/bank/transactions"
      );
      console.log('transactions', response.data.transactions)
      setTransactions(response.data.transactions);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  const getTransfers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/bank/transfers");
      setTransfers(response.data.transfers);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };
// handles submit events
 
  const handleOnCreateTransaction = async () => {
    // custom rendering
    setIsCreating(true);
    try {

      const response = await axios.post(
        "http://localhost:3001/bank/transactions",
        {
          transaction: {
            ...newTransactionForm,
          },
        }
        
      );
      console.log(response);
      await setTransactions(transactions =>[...transactions, {...response.data.transaction}]);

// send error message 
    } catch (err) {
      setError(err.message);
      setIsCreating(false);
    }
    
    setNewTransactionForm({ category: "", description: "", amount: 0 });
    setIsCreating(false);
  };

// useEffect hook that makes a GET request to the transfers endpoint
  React.useEffect(() => {
    const fetchData = async () => {
      getTransactions();
      getTransfers();
    };

    fetchData();
  }, []);


// pass in new prop "AddTransaction" / add error in h2 element if any deifined value recieved
  return (
    <div className="home">
      <AddTransaction 
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        form={newTransactionForm}
        setForm={setNewTransactionForm}
        handleOnSubmit={handleOnCreateTransaction}
      />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
      <BankActivity  transactions={filteredTransactions}
      transfers={filteredTransfers}/>
      )}
      <h2 className="error">{error}</h2>
    </div>
  )
}
