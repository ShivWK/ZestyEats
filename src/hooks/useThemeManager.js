import { useEffect } from "react";
import { selectCurrentTheme, setCurrentTheme } from "../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";

export const useThemeManager = () => {
    const theme = useSelector(selectCurrentTheme);
    const dispatch = useDispatch();

    useEffect(() => {
        const html = document.documentElement;
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

        function changeStatusBarColor(color) {
            let metaElement = document.querySelector('meta[name=theme-color]');

            if (!metaElement) {
                metaElement = document.createElement('meta');
                metaElement.name = 'theme-color';
                document.head.appendChild(metaElement);
            }

            metaElement.setAttribute('content', color);
        }

        if (theme === 'dark') {
            html.classList.add('dark');
            changeStatusBarColor('#1e2939');
        } else if (theme === 'light') {
            html.classList.remove('dark');
            changeStatusBarColor('#ffffff');
        } else if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

            if (systemTheme.matches) {
                html.classList.add('dark');
                dispatch(setCurrentTheme("system_dark"))
                changeStatusBarColor('#1e2939');
            } else {
                html.classList.remove('dark');
                dispatch(setCurrentTheme("system_light"))
                changeStatusBarColor('#ffffff');
            }
        }

        const themeChangeHandler = (e) => {
            const currentTheme = localStorage.getItem('theme');

            if (currentTheme === 'system') {
                if (e.matches) {
                    html.classList.add('dark');
                    dispatch(setCurrentTheme("system_dark"))
                    changeStatusBarColor('#1e2939');
                } else {
                    html.classList.remove('dark');
                    dispatch(setCurrentTheme("system_light"))
                    changeStatusBarColor('#ffffff');
                }
            }
        };

        systemTheme.addEventListener('change', themeChangeHandler);
        return () => systemTheme.removeEventListener('change', themeChangeHandler);
    }, [theme, dispatch]);
}