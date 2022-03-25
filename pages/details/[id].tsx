import type { NextPage, GetStaticProps } from 'next';
import { GetServerSideProps } from 'next';
// import Image from 'next/image';
import NextLink from 'next/link';
import { Box, Link } from '@chakra-ui/react';
import { PokemonDetailResults } from '../../interface/main';
import { ArrowBackIcon } from '@chakra-ui/icons';

const PokemonDetail: NextPage<{ info: PokemonDetailResults }> = ({ info }) => {
  console.log(info);
  return (
    <div>
      <Box color="green.500">
        <NextLink href="/" passHref>
          <Link>
            <ArrowBackIcon w={6} h={6} />
            Go back
          </Link>
        </NextLink>
      </Box>
      <Box fontSize="3xl" fontWeight="semibold">
        <h2>{info.name}</h2>
        <span>
          {info.abilities.map((ability, index) => {
            return (
              <ul key={index}>
                <li>{ability.ability?.name}</li>
              </ul>
            );
          })}
        </span>
      </Box>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const response: PokemonDetailResults = await data.json();
  return {
    props: {
      info: response,
    },
  };
};

export default PokemonDetail;
