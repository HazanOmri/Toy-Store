import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/toy.action.js"

export function ToyEdit() {
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

    function handleSubmit(ev) {
        ev.preventDefault()
        saveToy(toy).then(() => {
            navigate('/toy')
        })
    }

    function handleChange({ target }) {
        if (target.name === 'isInStock') var { checked: value, name: field } = target
        else var { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setToy((prevToy) => ({ ...prevToy, [field]: value }))
    }

    return <div className="toy-edit" key={toy._id}>
        {<form htmlFor="name" onSubmit={handleSubmit}>
            <label htmlFor="name"> Name:
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={toy.name}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor="createdAt"> Created at:
                <input
                    type="date"
                    name="createdAt"
                    id="createdAt"
                    value={toy.createdAt}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor="price"> Price:
                <input
                    type="number"
                    name="price"
                    id="price"
                    value={toy.price}
                    onChange={handleChange}
                />
            </label>
            <input
                type="checkbox"
                name="inStock"
                id="inStock"
                value={toy.inStock}
                onChange={handleChange}
            />
            <label htmlFor="inStock"> In stock?</label>
            <button>Done</button>
        </form>}
    </div>
}