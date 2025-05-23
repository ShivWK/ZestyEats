const TopPicksCards = ({ data }) => {
    const mainData = data?.card?.card?.carousel;
    const cards = mainData.map(item => item?.dish?.info)

    console.log(cards);

    return <div></div>
} 

export default TopPicksCards;