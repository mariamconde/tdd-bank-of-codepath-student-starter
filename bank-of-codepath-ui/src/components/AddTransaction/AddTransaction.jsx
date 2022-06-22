import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction({form, setForm, handleOnSubmit, isCreating}) {

  const handleOnFormFieldChange = (event) => {
    const {name, value} = event.target
    setForm({...form, [name]: value})
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm
      form={form} 
      handleOnFormFieldChange={handleOnFormFieldChange} 
      handleOnSubmit={handleOnSubmit} 
      isCreating={isCreating}/>
    </div>
  )
}

export function AddTransactionForm({form, handleOnFormFieldChange, handleOnSubmit}) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input type="text" name="description" placeholder="Enter description" value={form?.description} onChange={handleOnFormFieldChange}/>
        </div>
        <div className="field">
          <label>Category</label>
          <input type="text" name="category" placeholder="Enter category" value={form?.category} onChange={handleOnFormFieldChange}/>
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input type="number" name="amount" placeholder="Enter amount" value={form?.amount} onChange={handleOnFormFieldChange}/>
        </div>

        <button className="btn add-transaction" type="submit" 
        onClick={handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
