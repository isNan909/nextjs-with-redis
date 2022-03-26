import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetPokemonResults, Pokemons } from '../interface/main';
import { FormControl, Button, Select, Box, useToast } from '@chakra-ui/react';
import styles from '../styles/Home.module.css';

const Home: NextPage<{ pokemons: Pokemons[] }> = ({ pokemons }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<string>('');
  const toast = useToast();
  const router = useRouter();

  const handelSelect = (e: any) => {
    setSelectedPokemon(e.target.value);
  };

  const searchPokemon = () => {
    if (selectedPokemon === '')
      return toast({
        title: 'No pokemon selected',
        description: 'You need to select a pokemon to search.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    router.push(`/details/${selectedPokemon}`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Pokemon Application with Redis</title>
        <meta
          name="description"
          content="Pokemon application with redis caching enabled"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Box
          className={styles.title}
          fontWeight="semibold"
          letterSpacing="wid
          e"
          display="flex"
          alignItems="center"
          fontSize="3xl"
        >
          Search your favourite Pokemon
          <Image
            src="/pokemon.png"
            m-l="5"
            alt="pokemon"
            width="50"
            height="50"
          />
        </Box>

        <Box my="10">
          <FormControl>
            <Box display="flex">
              <Box flex="1">
                <Select
                  id="country"
                  placeholder={
                    selectedPokemon ? selectedPokemon : 'Select Pokemon'
                  }
                  onChange={handelSelect}
                >
                  {pokemons.map((pokemon, index) => {
                    return <option key={index}>{pokemon.name}</option>;
                  })}
                </Select>
              </Box>
              <Box>
                <Button
                  colorScheme="teal"
                  size="md"
                  ml="3"
                  onClick={searchPokemon}
                >
                  Search
                </Button>
              </Box>
            </Box>
          </FormControl>
        </Box>

        <div></div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=100&offset=100'
  );
  const { results }: GetPokemonResults = await res.json();

  return {
    props: {
      pokemons: results,
    },
  };
};

export default Home;
