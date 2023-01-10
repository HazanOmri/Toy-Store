import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadToys } from '../store/toy.action.js'
import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'

export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    useEffect(() => {
        onLoadToys()
    }, [])

    function onLoadToys(filterBy) {
        loadToys(filterBy)
            .then(() => {
                // showSuccessMsg('Toys loaded')
                console.log('Toys loaded')
            })
            .catch(err => {
                // showErrorMsg('Cannot load toys')
                console.log('Cannot load toys')
            })

    }
    return <section>
        <ToyFilter />
        {toys && <ToyList toys={toys} />}
    </section>
}