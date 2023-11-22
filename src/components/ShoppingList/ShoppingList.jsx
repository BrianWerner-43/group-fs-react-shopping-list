import axios from 'axios';
import DeleteButton from '../DeleteButton/DeleteButton';
import BuyButton from '../BuyButton/BuyButton';
function ShoppingList({shoppingList, getItems}) {
    const clearAll = () => {
        axios.delete('/shopping')
          .then(response => {
            getItems()
          })
          .catch(err => {
            alert('error deleting items');
            console.log(err);
          })
      }

      const resetAll = () => {
        axios.put('/shopping')
          .then(response => {
            getItems()
          })
          .catch(err => {
            alert('error updating items');
            console.log(err);
          })
      }



return (
    <>
    <h2>Shopping List</h2>
                <button onClick={resetAll}>Reset</button>
                <button onClick={clearAll}>Clear</button>
                <div>
                    {shoppingList.map(item => (
                        <div className="item" key={item.id}>
                            <div className="item2">
                                <p>{item.name}</p>
                                <p>{item.quantity} {item.unit}</p>
                            
                               <p>{ item.isPurchased ?
                                    <>Purchased</>
                                             : 
                                             <>
                               <DeleteButton getItems={getItems}
                                             itemId={item.id}/>
                                <BuyButton  getItems={getItems}
                                             itemId={item.id}/>
                                             </> }</p>          
                            </div>
                        </div>
                    ))}
                </div>
    
    </>
)
}

export default ShoppingList;