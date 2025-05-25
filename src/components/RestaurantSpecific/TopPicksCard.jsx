const TopPicksCard = ({ data }) => {
  const imageId = encodeURIComponent(data?.imageId.trim());
  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/${imageId}}`;
  const price = data?.price ? (data?.price/100).toFixed(2) : "";

  return (
    <div
      className={`flex flex-col justify-between w-72 h-72 rounded my-2 bg-cover bg-center p-4`}
      style={{
        backgroundImage: `url(${imageUrl})  url('/images/fallback.png')`,
      }}
    >
      {!imageId && (
        <div id="decription">
          <p className="text-black font-bold text-lg">{data?.name}</p>
          <p className="">
            {data?.description ? data?.description.match(/\w+.*?\./)?.[0] : ""}
          </p>
        </div>
      )}
      <div id="button" className="flex items-center justify-between mt-auto">
        <p className=" font-semibold text-black">₹{price}</p>
        <button className="py-2 px-7 bg-green-500 text-white rounded-md">
          Add
        </button>
      </div>
    </div>
  );
};

export default TopPicksCard;

//  https://media-assets.swiggy.com/swiggy/image/uploa…l_lossy,f_auto,q_auto,w_292,h_300/TopPicks/KoSCB1


// <img src="https://media-assets.swiggy.com/swiggy/image/upload/FOOD_CATALOG/IMAGES/CMS/2025/4/2/dd6612b2-16e2-4184-9598-5248ad305dcf_7d08c76a-18b4-497a-8206-562ef44ae963.jpg" alt="Korean Spicy Chicken Burger" aria-hidden="true">


{/* <div class="_1U7PA" style="background-image: url(&quot;https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/green_placeholder&quot;);"><img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/TopPicks/KoSCB1" alt="Korean Spicy Chicken Burger" aria-hidden="true"><div class="_buSC" style="color: rgb(255, 255, 255);"><p class="_1QbUq">Non-veg item. 
            Korean Spicy Chicken Burger. 
            Description: "Crunchy Juicy whole muscle chicken patty dunked in hot and sweet Korean glaze with Korean sesame mayo in premium Brioche buns for authentic Korean flavours 
Qty: 227 Gms| Kcal: 607.27 | Carbs 55.14 Gms| Sugar: 31.59 Gms| Fat: 31.59 Gms| Saturated fat: 11.58 Gms| Protein: 25.58 Gms| Sodium: 1793.87 Mg 
Contains: Gluten, Soybean , Milk ". 
            Price: 299 rupees.</p><div class="ddDKp"><div class="_1gGaK"><div class="sc-aXZVg gBtjIP">299</div></div><div class="_7QqbN"><div style="position: relative;"><div class="sc-fBdRDi ceMcJT"><div class="sc-kbhJrz hNnSKV"><button class="sc-ehixzo sc-bpUBKd cxbRDQ dckZKm add-button-left-container"><div class="sc-aXZVg biMKCZ">−</div></button><div class="sc-kbousE bIERnx"><button class="sc-ehixzo sc-gfoqjT cxbRDQ dqQKJp"><div class="sc-aXZVg biMKCZ">Add</div></button><button class="sc-ehixzo sc-iHmpnF cxbRDQ eoVtij add-button-center-container"><div class="sc-aXZVg biMKCZ">Add</div></button><button class="sc-ehixzo sc-dBmzty cxbRDQ jpoWMJ"><div class="sc-aXZVg biMKCZ">1</div></button></div><button class="sc-ehixzo sc-eyvILC cxbRDQ jFScYw add-button-right-container"><div class="sc-aXZVg biMKCZ">+</div></button></div><div class="sc-fifgRP iPBdcP"><div class="sc-aXZVg btGlKk">Customisable</div></div></div></div></div></div></div><div></div></div> */}