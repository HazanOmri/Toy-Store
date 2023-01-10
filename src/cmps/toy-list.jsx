import { Link } from 'react-router-dom'
import { ToyPreview } from './toy-preview'
export function ToyList({ toys }) {
    return <div>
        <Link to='/toy/edit'>Add new toy!</Link>
        <section className='toy-list'>
            {toys.map(toy => {
                return <ToyPreview toy={toy} key={toy._id} />
            })}
        </section>
    </div>
}