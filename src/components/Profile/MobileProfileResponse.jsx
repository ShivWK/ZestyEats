import { useSearchParams } from "react-router";
import { useState } from "react";

const MobileProfileResponse = () => {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get("mode");
    const [ isLoading, setLoading ] = useState(false);

}

export default MobileProfileResponse;