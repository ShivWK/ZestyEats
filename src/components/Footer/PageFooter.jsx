import { useSelector } from "react-redux";
import { selectIsLoading } from "../../features/home/homeSlice";

export default function PageFooter() {
  const isLoading = useSelector(selectIsLoading);

  return (
    !isLoading && (
      <footer className="h-20 w-full flex justify-center items-start bg-[#ff5200]">
        <div className=" flex max-w-[1210px] items-center text-white font-bold h-16 w-full mt-3">
          
        </div>
      </footer>
    )
  );
}
