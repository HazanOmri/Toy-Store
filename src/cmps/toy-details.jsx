import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"

export function ToyDetails() {
    const navigate = useNavigate()
    const params = useParams()
    const { toyId } = params
    const [toy, setToy] = useState(toyService.getEmptyToy())
    useEffect(() => {
        if (toyId) loadToy()
    }, [])
    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    return <div className="toy-details" key={toy._id}>
        <h2>Name:{toy.name}</h2>
        <h4>Price:{toy.price}</h4>
        <h4>Created at:{toy.createdAt}</h4>
        <h4>Labels:{toy.labels.join(', ')}</h4>
        <Link to='/toy'>Back</Link>
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
    </div>
}