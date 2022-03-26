import type { NextPage, GetStaticProps } from 'next';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import loadImage from '../../utils/loadImage';
import NextLink from 'next/link';
import { Box, Link } from '@chakra-ui/react';
import { PokemonDetailResults } from '../../interface/main';
import { ArrowBackIcon } from '@chakra-ui/icons';

const PokemonDetail: NextPage<{ info: PokemonDetailResults }> = ({ info }) => {
  // console.log(info);
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
        <h2>{info?.name}</h2>
        <span>Height: {info?.height}</span>
        <br /> <br />
        <span>
          <Image
            loader={loadImage}
            unoptimized
            src={info?.sprites?.front_default}
            width="200"
            height="200"
            alt="pokemon"
          />
          <u>Abilities:</u>
          <br />
          {info?.abilities.map((item, index) => {
            return (
              <ul key={index}>
                <li>{item?.ability?.name}</li>
              </ul>
            );
          })}
        </span>
        <br />
        <br />
        <span>
          Base experience:
          {info?.base_experience}
        </span>
        <br />
        <br />
        <span>
          Stats:
          {info.stats.map((item, index) => {
            return (
              <ul key={index}>
                <li>{item?.stat?.name}</li>
              </ul>
            );
          })}
        </span>
      </Box>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id: name } = context.query;
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const response: PokemonDetailResults = await data.json();
  return {
    props: {
      info: response,
    },
  };
};

export default PokemonDetail;
