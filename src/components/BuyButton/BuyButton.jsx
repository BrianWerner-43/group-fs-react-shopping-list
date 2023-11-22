import axios from 'axios';

function BuyButton({getItems, itemId}) {
    const purchaseItem = () => {
    axios.put(`/shopping/${itemId}`) 
        .then(response => {
            getItems()
          })
          .catch(err => {
            alert('error deleting item');
            console.log(err);
          })

    }

    return (
        <button onClick={purchaseItem}>Buy</button>
    )


}


export default BuyButton;