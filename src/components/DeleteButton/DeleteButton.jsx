import axios from 'axios';

function DeleteButton({getItems, itemId}) {
    const deleteItem = () => {
        axios.delete(`/shopping/${itemId}`)
          .then(response => {
            getItems()
          })
          .catch(err => {
            alert('error deleting item');
            console.log(err);
          })
      }

      return (
        <button onClick={deleteItem}>Remove</button>
      )

}


export default DeleteButton;