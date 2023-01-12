import React, { useState, useEffect, useCallback, SVGProps } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CardPokemon from '../../components/CardPokemon';
import { GoBack } from '../Pokemon/styles';
import { Container, Pokemons } from './style';


interface PokemonProps {
    id: number;
    specie: string;
  }

const MyPokemon: React.FC = () => {
const [pokemons, setPokemons] = useState<PokemonProps[]>([]);

const getStorage = (key: string): PokemonProps[] => {
    const localData = localStorage.getItem(key);
    return localData ? JSON.parse(localData) : [];
  };

const handlePokemonsListDefault = useCallback(async () => {
    const items: PokemonProps[] = getStorage('mypokemon');
    setPokemons(items);
  }, []);

  useEffect(() => {
    handlePokemonsListDefault();
  }, []);

    return (
    <Container>
    <GoBack to="/">
        <FaChevronLeft size={50} />
    </GoBack>
        <Pokemons>
        {pokemons.map(pokemon => (
            <CardPokemon key={pokemon.id} name={pokemon.specie} />
        ))} 
        </Pokemons>     
    </Container>
    )
  };
export default MyPokemon;