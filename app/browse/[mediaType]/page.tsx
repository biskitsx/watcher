import { BrowsePage } from "../components/BrowsePage";
import { getInitialDataByMediaType } from "./actions";

const Page = async ({
  params: { mediaType },
}: {
  params: { mediaType: string };
}) => {
  try {
    const validMediaTypes = ["movie", "serie", "anime"];
    if (!validMediaTypes.includes(mediaType)) {
      throw new Error("Invalid media type");
    }

    const initialData = await getInitialDataByMediaType(mediaType);

    return <BrowsePage mediaType={mediaType} initialData={initialData} />;
  } catch (error) {
    return <div>Something went wrong</div>;
  }
};

export default Page;
