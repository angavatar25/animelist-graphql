export interface IAnimeDetail {
  Media?: {
    id: number,
    title?: {
      english?: string,
    },
    type: string,
    genres: Array<[]>,
    bannerImage: string,
    description: string | TrustedHTML,
    episodes: number | null,
  };
}

export interface IAnimeCollectionCard {
  showEditButton?: boolean;
  showActionButton?: boolean;
  bannerImage: string | null;
  name: string;
  totalCollections?: Array<collection>;
  onClick?: (string: string) => void;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onEdit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export interface collection {
  name: string,
  animeList?: Array<animeData>,
};

export interface animeData {
  bannerImage: string,
  id: number,
  episodes: number,
  name: string,
};