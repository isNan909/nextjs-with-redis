export interface GetPokemonResults {
    results: Pokemons[];
}

export interface Pokemons {
    name: string;
    url?: string;
}

export interface Ability {
    ability: [];
}

export interface Form {
    name: string;
    url: string;
}

export interface GameIndex {
    game_index: number;
    version: {
        name: string;
        url: string;
    }
}

export interface HeldItem {
    item: {
        name: string;
        url: string;
    }
}

export interface Move {
    move: {
        name: string;
        url: string;

    }
}

export interface Species {
    name: string;
    url: string;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}

export interface Sprites {
    back_default: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_default?: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
    other: {};
    versions: {};
}

export interface Type {
    slot: string;
    type: {};
}

export interface PokemonDetailResults {
    abilities: Ability[];
    base_experience: number;
    forms: Form[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    species: Species;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
    weight: number;
}