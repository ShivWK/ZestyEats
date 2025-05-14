import { useSelector } from "react-redux";
import { selectIsLoading } from "../../features/home/homeSlice";
import SubFooter from "./SubFooter";

export default function PageFooter() {
  const isLoading = useSelector(selectIsLoading);

  return (
    !isLoading && (
      <footer className="h-20 w-full flex justify-center items-start bg-[#ff5200]">
        <SubFooter />
      </footer>
    )
  );
}


// https://media-assets.swiggy.com/portal/testing/seo-home/Group.svg