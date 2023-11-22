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



return (
    <>
    <h2>Shopping List</h2>
                <button>Reset</button>
                <button onClick={clearAll}>Clear</button>
                <div>
                    {shoppingList.map(item => (
                        <div key={item.id}>
                            <div>
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