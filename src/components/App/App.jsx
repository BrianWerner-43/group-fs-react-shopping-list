import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx'
import ShoppingForm from '../shoppingForm/ShoppingForm.jsx';
import ShoppingList from '../ShoppingList/ShoppingList.jsx';
import './App.css';


function App() {
    let [shoppingList, setShoppingList] = useState([])

    useEffect(() => {
        getItems()
      }, [])

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
                <ShoppingForm getItems={getItems}/>
                <ShoppingList shoppingList={shoppingList} 
                              getItems={getItems}/>
                
                
            </main>
        </div>
    );
}

export default App;
