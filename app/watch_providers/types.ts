export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface CountryDetail {
  link: string;
  buy?: WatchProvider[];
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
}

export interface WatchProvidersResponse {
  id: string;
  results: {
    TH?: CountryDetail;
  };
}
