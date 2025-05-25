import { useLocation, useNavigate } from "react-router-dom";

const useRouteRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname !== "/") {
    navigate("/", { replace: true });
  }
}

export default useRouteRedirect;