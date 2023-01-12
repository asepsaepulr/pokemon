import React, { useState, useEffect, useCallback } from 'react';

import CardPokemon from '../../components/CardPokemon';
import InputSearch from '../../components/InputSearch';
import Pagination from "../Home/pagination";

import api from '../../services/api';

import { Container, Pokemons, Background } from './style';
import { Link } from 'react-router-dom';
import { Pokeball } from '../../assets/patterns';

interface PokemonProps {
  id: string;
  name: string;
}

const Home: React.FC = () => {
  const NUMBER_POKEMONS = 9;
  const NUMBER_MAX_POKEMONS_API = 750;

  const [offset, offSet] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(83);

  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [pokemonSearch, setPokemonSearch] = useState('');

  const handlePrevPage = (prevPage: number) => {
    offSet((offset) => offset - 10);
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    offSet((offset) => offset + 10);
    setPage((nextPage) => nextPage + 1);
  };

  const handleSearchPokemons = useCallback(async () => {
    const response = await api.get(`/pokemon?limit=${NUMBER_MAX_POKEMONS_API}`);

    setPokemonSearch(pokemonSearch.toLocaleLowerCase());
    const pokemonsSearch = response.data.results.filter(
      ({ name }: PokemonProps) => name.includes(pokemonSearch),
    );
    setPokemons(pokemonsSearch);
  }, [pokemonSearch]);

  const handlePokemonsListDefault = useCallback(async () => {
    const response = await api.get('/pokemon', {
      params: {
        limit: NUMBER_POKEMONS,
        offset: offset,
      },
      
    });
    console.log("data",response.data );
    setPokemons(response.data.results);
    setTotalPages(totalPages);
  }, [page]);

  useEffect(() => {

    const isSearch = pokemonSearch.length >= 2;

    if (isSearch) handleSearchPokemons();
    else handlePokemonsListDefault();
  }, [pokemonSearch, handlePokemonsListDefault, handleSearchPokemons]);

  return (    
    <Background>
    <Container>
    <Pokeball />
    <Link to='/mypokemon'><button className='mypokemon'>My Pokemon</button></Link>
      <InputSearch value={pokemonSearch} onChange={setPokemonSearch} />
      <Pokemons>
        {pokemons.map(pokemon => (
          <CardPokemon key={pokemon.name} name={pokemon.name} />
        ))}
      </Pokemons>
      
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
     
    </Container>
    </Background>
  );
};

export default Home;
