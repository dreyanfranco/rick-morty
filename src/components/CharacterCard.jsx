import './styles.css'
const CharacterCard = ({ character }) => {
    return (
        <div className='card'>
            <img className='character-image' src={character.image} alt={`Character image ${character.name}`} />
            <div className='card-text'>
                <h3>{character.name}</h3>
                <span>{character.origin.name}</span>
                <br />

            </div>
        </div>
    )
}

export default CharacterCard