import TopPicksCard from './TopPicksCard';
import HorizontalCarousel from '../HorizontalCarousel';
import { memo, useMemo } from 'react';

const TopPicksCards = memo(({ data }) => {
    const mainData = data?.card?.card?.carousel;
    const cardsData = useMemo(() => mainData?.map(item => item?.dish?.info), [mainData]);

    return <HorizontalCarousel heading="Top Picks"  dataToMap={cardsData} Card={TopPicksCard} showScrollBar={false} />
} )

export default TopPicksCards;
