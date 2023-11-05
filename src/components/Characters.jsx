import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CharacterCard from './CharacterCard'
import './styles.css'

const Characters = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const fetchCharacters = (page) => fetch(`https://rickandmortyapi.com/api/character/?name=${searchQuery}&page=${page}`).then(res => res.json())

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['characters', searchQuery],
        queryFn: ({ pageParam = 1 }) => fetchCharacters(pageParam, searchQuery),
        getNextPageParam: (lastPage) => {
            const previousPage = lastPage.info.prev ? +lastPage.info.prev.split('=')[1] : 0
            const currentPage = previousPage + 1;

            if (currentPage === lastPage.info.pages) return false;
            return currentPage + 1;
        }
    })

    const characters =
        data?.pages.reduce(
            (prevMovies, page) => prevMovies.concat(page.results),
            []
        ) ?? [];

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase()
        setSearchQuery(characters.filter(character => character.name.toLowerCase().includes(query)))
    }

    return (
        <div>
            {isLoading ?
                <p>Loading...</p>
                :
                <>
                    <input
                        type="search"
                        placeholder='Search 🔎'
                        onChange={(event) => handleSearch(event)}
                    />
                    <InfiniteScroll
                        dataLength={characters.length}
                        hasMore={hasNextPage | isLoading}
                        next={() => fetchNextPage()}
                        loader={<h1>Loading</h1>}
                    >
                        <div className='container'>
                            {characters.map((character) => (
                                <div key={character.id}>
                                    <CharacterCard key={character.id} character={character} />
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </>
            }
        </div>
    )
}

export default Characters