import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import Header from '../Header/Header.jsx'
import './App.css';


function App() {
    let [nameInput, setNameInput] = useState('')
    let [unitInput, setUnitInput] = useState('')
    let [quantityInput, setQuantityInput] = useState('')
    let [shoppingList, setShoppingList] = useState([])

    useEffect(() => {
        getItems()
      }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        addItem();

    }

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

    const getItems = () => {
        axios.get('/shopping')
        .then(response => {
            setShoppingList(response.data)
            console.log(response.data);
        })
        .catch(err => {
            alert('Error Adding shopping items');
            console.log(err);
          })
    }

    return (
        <div className="App">
            <Header />
            <main>
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
                <h2>Shopping List</h2>
                <button>Reset</button>
                <button>Clear</button>
                <div>
                    {shoppingList.map(item => (
                        <div key={item.id}>
                            <div>
                                <p>{item.name}</p>
                                <p>{item.quantity} {item.unit}</p>
                                <button>Buy</button>
                                <button>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;
