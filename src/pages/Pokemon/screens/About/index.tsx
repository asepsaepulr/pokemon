import React, { ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import { SectionAbout, SectionAboutContent, Weaknesse } from './styles';
import pokemonTypes from '../../../../assets/types';
import api from '../../../../services/api';

import { PokemonProps, PokemonTypesProps } from '../../index';

interface AboutProps {
  pokemon: PokemonProps;
  colorText: string;
}

interface SpecieProps {
  capture_rate: string;
  base_happiness: string;
  growth_rate: string;
}

const About: React.FC<AboutProps> = ({ pokemon, colorText }) => {
  const { colors } = useTheme();
  const [weaknesses, setWeaknesses] = useState<PokemonTypesProps[]>([]);
  const [pokemonSpecie, setPokemonSpecie] = useState<SpecieProps>(
    {} as SpecieProps,
  );

  useEffect(() => {
    if (pokemon.type && pokemon.type.length) {
      api.get(`/type/${pokemon.type[0].name}`).then(response => {
        const {
          damage_relations: { double_damage_from },
        } = response.data;
        const auxWeaknesses = double_damage_from.map(
          (typeDamage: { name: keyof typeof pokemonTypes }) => ({
            icon: pokemonTypes[typeDamage.name],
            color: colors.type[typeDamage.name],
            name: typeDamage.name,
          }),
        );
        setWeaknesses(auxWeaknesses);
      });
    }
  }, [pokemon.type, colors.type]);

  useEffect(() => {
    if (pokemon.specie) {
      api.get(`/pokemon-species/${pokemon.specie}`).then(response => {
        const { capture_rate, base_happiness, growth_rate } = response.data;

        setPokemonSpecie({
          capture_rate,
          base_happiness,
          growth_rate: growth_rate.name.replace('-', ' '),
        });
      });
    }
  }, [pokemon]);

  return (
    <SectionAbout colorText={colorText}>

      <SectionAboutContent>
        <div>
          <h3>Pokemon Data</h3>
          <ul>
            <li>
              <strong>Species</strong> <span>{pokemon.specie}</span>
            </li>
            <li>
              <strong>Height</strong> <span>{pokemon.height}</span>
            </li>
            <li>
              <strong>Weight</strong> <span>{pokemon.weight}</span>
            </li>
            <li>
              <strong>Weaknesses</strong>
              {weaknesses &&
                weaknesses.map(weaknesse => (
                  <Weaknesse key={weaknesse.color} color={weaknesse.color}>
                    {weaknesse.icon as ReactNode} 
                  </Weaknesse>
                ))}
            </li>
          </ul>
        </div>

        <div>
          <h3>Training</h3>
          <ul>
            <li>
              <strong>Catch Rate</strong>
              <span>{pokemonSpecie.capture_rate}</span>
            </li>
            <li>
              <strong>Base Friendship</strong>
              <span>{pokemonSpecie.base_happiness}</span>
            </li>
            <li>
              <strong>Growth Rate</strong>
              <span>{pokemonSpecie.growth_rate}</span>
            </li>
          </ul>
        </div>
      </SectionAboutContent>
    </SectionAbout>
  );
};

export default About;
