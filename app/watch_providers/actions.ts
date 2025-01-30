import { getTMDb } from "@/wrapper/tmdb";
import { WatchProvidersResponse } from "./types";

export const getMediaWatchProviders = async (
  id: number,
  type: "movie" | "tv"
) => {
  try {
    const url = `${type}/${id}/watch/providers?language=en-US`;
    const res: WatchProvidersResponse = await getTMDb(url);
    if (!res) {
      throw new Error("No watch providers found");
    }

    if (res.results.TH) {
      // sort the display priority from lowest to highest
      const providers = [
        ...(res.results.TH.buy ?? []),
        ...(res.results.TH.flatrate ?? []),
        ...(res.results.TH.rent ?? []),
      ];

      providers.sort((a, b) => a.display_priority - b.display_priority);
      // remove the duplicate providers
      const uniqueProviders = providers.filter(
        (provider, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.provider_id === provider.provider_id &&
              t.provider_name === provider.provider_name
          )
      );

      return uniqueProviders.slice(0, 3);
    }

    return [];
  } catch (error) {
    throw error;
  }
};
