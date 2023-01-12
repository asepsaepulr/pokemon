import React, { useCallback, useEffect, useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';

import { Pokeball } from '../../../../assets/patterns';
import api from '../../../../services/api';

import {
  SectionEvolution,
  EvolutionPokemon,
  EvolutionPokemonImage,
} from './styles';

interface PokemonEvolvesProps {
  name: string;
  level: number;
  image?: string;
  number?: string;
}

interface EvolvesProps {
  species: {
    name: string;
  };
  evolution_details: [{ min_level: number }];
  evolves_to: EvolvesProps[];
}

const Evolution: React.FC<{ name: string; color: string }> = ({
  name,
  color,
}) => {
  const [pokemonsFamily, setPokemonsFamily] = useState<PokemonEvolvesProps[]>(
    [],
  );

  const [evolvesPokemon, setEvolvesPokemon] = useState<PokemonEvolvesProps[]>(
    [],
  );
  
  const handleNameSpecies = useCallback(
    ({
      species,
      evolves_to,
      evolution_details,
    }: EvolvesProps): PokemonEvolvesProps[] => {
      let namesPokemons: PokemonEvolvesProps[] = [
        {
          name: species.name,
          level: 0,
        },
      ];
      if (evolution_details.length)
        namesPokemons[0].level = evolution_details[0].min_level;

      evolves_to.forEach((evolves: EvolvesProps) => {
        namesPokemons = namesPokemons.concat(handleNameSpecies(evolves));
      });

      return namesPokemons;
    },
    [],
  );

  useEffect(() => {
    api.get(`/pokemon-species/${name}`).then(responseSpecies => {

      const url = responseSpecies.data.evolution_chain.url.split('v2')[1];
      api.get(url).then(responseEvolution => {
        const species = handleNameSpecies(responseEvolution.data.chain);
        setPokemonsFamily(species);
      });
    });
  }, [name, handleNameSpecies]);

  useEffect(() => {
    if (pokemonsFamily.length) {
      const urlsAxios = pokemonsFamily.map(p => api.get(`/pokemon/${p.name}`));

      Promise.all([...urlsAxios]).then(responses => {
        const result = responses.map((response, index) => {
          const { id, sprites } = response.data;
          return {
            ...pokemonsFamily[index],
            number: `#${'000'.substr(id.toString().length)}${id}`,
            image: sprites.other['official-artwork'].front_default,
          };
        });
        setEvolvesPokemon(result);
      });
    }
  }, [pokemonsFamily]);

  return (
    <SectionEvolution>
      {evolvesPokemon.length ? (
        evolvesPokemon.slice(0, 6).map((evolves, index) => (
          <React.Fragment key={evolves.level}>
            {index !== 0 && (
              <EvolutionPokemon>
                <FaLongArrowAltRight size={80} color="rgba(0, 0, 0, 0.06)" />
                <p>(Level {evolves.level || 'null'})</p>
              </EvolutionPokemon>
            )}
            <EvolutionPokemon>
              <EvolutionPokemonImage to={`/pokemon/${evolves.name}`}>
                <Pokeball />
                <img
                  src={evolves.image}
                  alt={`Imagem do pokémon ${evolves.name}`}
                />
              </EvolutionPokemonImage>
              <p>{evolves.number}</p>
              <h4>{evolves.name}</h4>
            </EvolutionPokemon>
          </React.Fragment>
        ))
      ) : (
        <h1 style={{ textAlign: 'center' }}>Loading...</h1>
      )}
    </SectionEvolution>
  );
};

export default Evolution;
