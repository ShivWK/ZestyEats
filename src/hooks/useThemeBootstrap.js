import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTheme } from "../features/home/homeSlice";
import { getItemFromLocalStorage } from "../utils/accessLocalStorage";

export const useThemeBootstrap = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const theme = getItemFromLocalStorage("theme") || "system";
        dispatch(setCurrentTheme(theme));
    }, [dispatch])
}