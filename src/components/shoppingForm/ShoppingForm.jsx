import { useState } from 'react';
import axios from 'axios';

function ShoppingForm({getItems}) {
    let [nameInput, setNameInput] = useState('')
    let [unitInput, setUnitInput] = useState('')
    let [quantityInput, setQuantityInput] = useState('')

    const addItem = () => {
        // axios post route
    
  axios.post('/shopping', { name: nameInput, quantity: quantityInput, unit: unitInput})
          .then(response => {
            // clear inputs
            setNameInput('');
            setQuantityInput('');
            setUnitInput('');
            getItems();
          })
          .catch(err => {
            alert('Error Adding shopping items');
            console.log(err);
          })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        addItem();

    }

    return (
        <>

         <h2>Add an Item:</h2>
                <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={nameInput}
                    onChange={(evt) => setNameInput(evt.target.value)}
                    />  
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantityInput}
                    onChange={(evt) => setQuantityInput(evt.target.value)}
                    />
                    <input
                    type="text"
                    placeholder="Unit"
                    value={unitInput}
                    onChange={(evt) => setUnitInput(evt.target.value)}
                    />
                    <button>submit</button>

                </form>
        
        </>
    )
}
export default ShoppingForm;