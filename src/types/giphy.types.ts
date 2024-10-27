export type GiphyResponse = {
  data: GifObject[];
  pagination: GiphyPagination;
  meta: GiphyMeta;
};

type GiphyMeta = {
  status: 200 | 400 | 401 | 403 | 404 | 414 | 429;
  msg: string;
  response_id: string;
};

type GiphyPagination = {
  offset: number;
  total_count?: number;
  count: number;
};

export type GifObject = {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: ImageVariants;
  user?: User;
  analytics_response_payload: string;
  analytics: Analytics;
};

// This type is assuming the bundle query === 'messaging_non_clips'
type ImageVariants = {
  fixed_height: ImageData;
  fixed_height_downsampled: ImageData;
  fixed_height_small: ImageData;
  fixed_width: ImageData;
  fixed_width_downsampled: ImageData;
  fixed_width_small: ImageData;
  original: ImageData;
};

type ImageData = {
  url: string;
  width: string;
  height: string;
  size?: string;
  mp4?: string;
  mp4_size?: string;
  webp?: string;
  webp_size?: string;
  frames?: string;
  hash?: string;
};

type User = {
  avatar_url: string;
  banner_url: string;
  banner_image: string;
  profile_url: string;
  username: string;
  display_name: string;
  is_verified: boolean;
};

type Analytics = {
  onload: EventData;
  onclick: EventData;
  onsent: EventData;
};

type EventData = {
  url: string;
};
