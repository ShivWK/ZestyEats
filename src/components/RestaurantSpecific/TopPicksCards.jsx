import TopPicksCard from './TopPicksCard';
import HorizontalCarousel from '../HorizontalCarousel';
import { memo } from 'react';

const TopPicksCards = memo(({ data }) => {
    const mainData = data?.card?.card?.carousel;
    const cardsData = mainData?.map(item => item?.dish?.info)

    return <HorizontalCarousel heading="Top Picks" margin_bottom="mb-2" dataToMap={cardsData} Card={TopPicksCard} showScrollBar={false} />
} )

export default TopPicksCards;
