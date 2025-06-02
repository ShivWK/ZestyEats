import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import createDebounce from "../../utils/debounceCreater";
import { useLazyGetSearchedDishQuery } from "../../features/home/restaurantsApiSlice";
import useScrollToTop from "../../utils/useScrollToTop";

const RestaurantSearch = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const restro_Id = searchParams.get("restaurantId");
  const title = searchParams.get("title");

  const [triggerSearch] = useLazyGetSearchedDishQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);

  const doSearch = createDebounce(async (searchTerm) => {
    if (searchTerm) {
      try {
        const response = await triggerSearch({
          lat,
          lng,
          restro_Id,
          searchTerm: searchTerm.trim(),
        }).unwrap();
        setSearchData(response.data);
      } catch (err) {
        console.error("Error fetching search data:", err.error);
        setSearchData([]);
      }
    }
  }, 300);

  

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    doSearch(searchTerm);
  };

  const handleCross = () => {
    setSearchTerm("");
  };

  return (
    <div className="pt-24 w-full max-w-[800px] mx-auto min-h-[105vh] ">
      <div className="flex w-full items-center gap-1.5 p-2.5 border-b-2 rounded-md bg-gray-200 ">
        <i
          onClick={() => navigate(-1)}
          class="ri-arrow-left-long-fill text-3xl cursor-pointer transform hover:translate-x-[-5px] transition-all duration-300 ease-in-out"
        ></i>
        <div>
          <input
            className="text-gray-900 p-2 outline-none bg-transparent text-lg font-semibold"
            type="text"
            size={73}
            value={searchTerm}
            onChange={handleSearch}
            placeholder={`Search in ${title}...`}
          />
        </div>
        {searchTerm !== "" ? (
          <i
            onClick={handleCross}
            class="ri-close-large-fill text-xl cursor-pointer"
          ></i>
        ) : (
          <i class="ri-search-2-line text-xl cursor-pointer"></i>
        )}
      </div>
      <div className="p-2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius nemo ab nulla numquam itaque, iure doloremque sunt consectetur quod facilis recusandae. Exercitationem alias pariatur architecto asperiores sunt commodi reprehenderit minus quos omnis repellendus quidem vel, nulla ullam consectetur porro sapiente mollitia natus labore cupiditate illum consequatur. Distinctio inventore error blanditiis temporibus magnam molestias explicabo eligendi rem ipsum soluta suscipit alias perspiciatis quas autem, recusandae dicta at magni exercitationem culpa sed veniam nam qui? Mollitia itaque nostrum neque quasi accusantium dolores voluptates, cupiditate, atque ab possimus omnis. Itaque, in? Doloremque porro eos, dolores sequi temporibus accusamus, enim quas cum voluptatem libero nisi saepe magnam ipsam esse doloribus, minima earum ratione iure! Vero, dolor quae illum voluptatum, hic natus facilis dolores rem est, nulla itaque odit! Porro laudantium incidunt omnis inventore accusamus accusantium, hic assumenda dolorem animi, quis quaerat! Et cumque officiis facere voluptas magnam cupiditate voluptatem sunt libero porro eos, blanditiis vel ipsa odio. Impedit eligendi alias corrupti fugit soluta ratione et ipsum accusantium enim modi cupiditate quisquam dolor illum nulla ipsa explicabo libero, porro mollitia voluptate nihil tempore facilis repellendus quidem? Nulla rerum vero tenetur fugiat adipisci? Accusamus minus blanditiis distinctio hic fuga sequi. Aspernatur voluptatibus, esse adipisci perferendis numquam, a asperiores vel quos possimus minima quod natus provident totam cum magnam. Alias veniam eum, placeat laboriosam ea quas perferendis cupiditate inventore hic culpa voluptatum est perspiciatis! Officiis praesentium corrupti nam distinctio illum dolorem facilis commodi maiores ducimus nesciunt quidem unde, reprehenderit deleniti, quos ad, quas placeat optio omnis enim rerum nisi natus officia earum sit. Dolorum fuga asperiores in ut quos, quae cum temporibus ab aspernatur fugiat accusantium eius. Totam nesciunt, illum dicta neque eum tempore voluptatibus soluta, repudiandae laboriosam incidunt exercitationem, voluptas ex cum laudantium aliquam atque eius deleniti maxime? Cum porro eligendi pariatur, inventore error in similique veritatis reprehenderit ducimus, hic aliquam nam! Cumque pariatur mollitia necessitatibus quam sit? Tempore commodi numquam debitis quia animi, architecto distinctio eius voluptates alias. Tenetur, in labore! Corporis in consequuntur iusto iure illum ad ratione adipisci molestiae et blanditiis, reiciendis assumenda sed obcaecati labore? Ipsam dolores soluta facere sed numquam quae exercitationem expedita suscipit consequatur non? Minima deleniti natus similique quo quos laborum porro non facere assumenda, et delectus tempora accusamus ipsum mollitia, est, modi ducimus voluptas maiores animi dolorem praesentium ea commodi? Magnam vero repudiandae aspernatur fugiat quos mollitia, aliquam alias maiores consectetur accusantium. Laboriosam laudantium, molestiae error qui eum repellendus, libero minima hic adipisci eligendi in dicta aperiam nostrum quam. Doloribus consectetur consequatur praesentium cumque atque, illo accusamus placeat aliquid odio error eligendi nesciunt tempora aspernatur deserunt, magnam quae explicabo impedit adipisci? Vel dolore quas id, ad veritatis aliquam tempora? Sequi ducimus voluptates atque deserunt placeat, esse ab itaque quos temporibus asperiores vel repellendus autem facere. Dolor consequatur, incidunt, voluptate est, aspernatur cumque nemo maxime voluptatibus delectus provident nesciunt et architecto magni culpa hic deserunt esse laboriosam? Dolor fugit quia placeat veritatis dignissimos aut esse nulla, facere amet eveniet temporibus facilis natus numquam est quibusdam atque velit quas ipsa.
      </div>
    </div>
  );
};

export default RestaurantSearch;
