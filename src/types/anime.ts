export interface RecentAnime {
  id: string;
  episodeId: string;
  episodeNumber: number;
  title: string;
  image: string;
  url: string;
}

type genres = string[];

export interface TopAnime {
  id: string;
  title: string;
  image: string;
  url: string;
  genres?: genres;
}

export interface SearchAnime {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string;
  subOrDub: string;
}

interface Episode {
  id: string;
  number: number;
  url: string;
}

export interface Anime {
  id: string;
  title: string | string[];
  url: string;
  genres: genres;
  totalEpisodes: number;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: string;
  type: string;
  status: string;
  otherName?: string;
  episodes: Episode[];
}
