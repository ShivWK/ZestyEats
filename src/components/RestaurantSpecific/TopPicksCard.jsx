const TopPicksCards = ({ data }) => {
    const mainData = data?.card?.card?.carousel;

    console.log("MAinm",mainData);
    const cards = mainData?.map(item => item?.dish?.info)

    console.log("Cards",cards);

    return <div></div>
} 

export default TopPicksCards;