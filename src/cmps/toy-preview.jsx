import { Link } from 'react-router-dom'
import { removeToy } from '../store/toy.action'

export function ToyPreview({ toy }) {
    function onRemoveToy(toyId) {
        removeToy(toyId)
    }
    return <div className="toy-preview">
        <h4>Name: {toy.name}</h4>
        <h6>Price: {toy.price}</h6>
        <h6>Created At: {toy.createdAt}</h6>
        <h6>{toy.inStock ? 'Available' : 'Out of stock'}</h6>
        <Link to={`/toy/${toy._id}`}>Details</Link>
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link><br />
        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
    </div>
}