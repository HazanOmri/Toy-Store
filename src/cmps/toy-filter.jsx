
import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { loadToys } from "../store/toy.action.js"


export function ToyFilter() {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    const elInputRef = useRef(null)

    // useEffect(() => {
    //     elInputRef.current.focus()
    // }, [])

    useEffect(() => {
        loadToys(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        if (target.name === 'isInStock') var { checked: value, name: field } = target
        else var { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    // function onSubmitFilter(ev) {
    //     // update father cmp that filters change on submit
    //     ev.preventDefault()
    //     onSetFilter(filterByToEdit)
    // }


    return <section className="toy-filter full main-layout">
        <form>
            <label htmlFor="name">Name:</label>
            <input type="text"
                id="name"
                name="txt"
                placeholder="By name"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="isInStock"></label>
            <input type="checkbox"
                id="isInStock"
                name="isInStock"
                value={filterByToEdit.isInStock}
                onChange={handleChange}
            />In Stock:

            <button hidden>Filter</button>
        </form>

    </section>
}