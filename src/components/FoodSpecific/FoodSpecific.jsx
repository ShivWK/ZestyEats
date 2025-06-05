import { useLoaderData } from "react-router-dom";
import useScrollToTop from "../../utils/useScrollToTop";
import { Suspense } from "react";
import { Await } from "react-router-dom";
import ShimmerContainer from "./ShimmerContainer";

const FoodSpecific = () => {
    useScrollToTop();
    const {data} = useLoaderData();

    return (
        <Suspense fallback={<ShimmerContainer />}>
            <Await resolve={data}>
                {data => console.log(data)}
            </Await>
        </Suspense>
    );
};

export default FoodSpecific;

// {
//     "@type": "type.googleapis.com/swiggy.gandalf.widgets.v2.CollectionMasthead",
//     "collectionId": "83636",
//     "title": "Chinese",
//     "description": "Transport your taste buds to the heart of Chinese cuisine with these scrumptious dishes.",
//     "imageId": "COLLECTIONS/IMAGES/MERCH/2025/1/24/6ce5077f-20c1-4232-a8e7-46c026430629_Chinese (3).png",
//     "aspectRatio": "3.44",
//     "cta": {
//         "link": "swiggy://collectionV2?collection_id=83636&tags=layout_CCS_Chinese,chinese,layout_Chinese,ads_pc_chinese",
//         "type": "collectionv2"
//     },
//     "type": "COLLECTION_MASTHEAD_TYPE_IMAGE_WITH_TEXT",
//     "count": "500 restaurants"
// }
