import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import { fetchCache } from '../../src/redisCache';
import { PokemonDetailResults } from '../../interface/main';
import loadImage from '../../utils/loadImage';
import { Box, Link, ListItem, UnorderedList } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const PokemonDetail: NextPage<{ info: PokemonDetailResults }> = ({ info }) => {
  return (
    <div>
      <Box color="green.500" my="8">
        <NextLink href="/" passHref>
          <Link>
            <ArrowBackIcon w={6} h={6} />
            Go back
          </Link>
        </NextLink>
      </Box>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        display="flex"
        justifyContent="center"
        mb="3"
      >
        <Image
          loader={loadImage}
          unoptimized
          src={info?.sprites?.front_default}
          width="200"
          height="200"
          alt="pokemon"
        />
      </Box>
      <Box
        mt="1"
        fontWeight="bold"
        as="h2"
        lineHeight="tight"
        isTruncated
        fontSize="2xl"
        pb="3"
      >
        {info?.name}
      </Box>
      <Box fontSize="md" fontWeight="medium" color="gray.500">
        Experience: {info?.base_experience}, Height: {info?.height}
      </Box>
      <Box pt="4">
        <Box
          my="5"
          color="gray.500"
          fontWeight="bold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          Abilities:
        </Box>
        <UnorderedList>
          {info?.abilities.map((item, index) => {
            return <ListItem key={index}>{item?.ability?.name}</ListItem>;
          })}
        </UnorderedList>
      </Box>
      <Box pt="4">
        <Box
          my="5"
          color="gray.500"
          fontWeight="bold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          Stats:
        </Box>
        <UnorderedList>
          {info.stats.map((item, index) => {
            return <ListItem key={index}>{item?.stat?.name}</ListItem>;
          })}
        </UnorderedList>
      </Box>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const name = id as string;

  const fetchData = async () => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const response: PokemonDetailResults = await data.json();
    return response;
  };

  const cachedData = await fetchCache(name, fetchData, 60 * 60 * 24);
  return {
    props: {
      info: cachedData,
    },
  };
};

export default PokemonDetail;
