import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectLogInModal,
  selectLocationModal,
} from '../features/Login/loginSlice';
import { selectMenuModel } from '../features/home/restaurantsSlice';

const BackToTopBtn = ({ extraMargin = false }) => {
  const [showBtn, setShowBtn] = useState(false);
  const isLoginOpen = useSelector(selectLogInModal);
  const isLocationOpen = useSelector(selectLocationModal);
  const menuModel = useSelector(selectMenuModel);

  const clickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const scrollHandler = () => {
      const HTML = document.documentElement;
      const windowScrollTop = HTML.scrollTop;

      const hasScrolledALot =
        windowScrollTop >= Math.max(HTML.clientHeight * 2.2, 500);

      if (hasScrolledALot) setShowBtn(true);
      else setShowBtn(false);
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <button
      onClick={clickHandler}
      className={`fixed bottom-5 left-1/2 flex -translate-x-1/2 transform cursor-pointer items-center justify-center gap-1 rounded-md bg-[rgba(0,0,0,0.6)] px-2 py-1.5 text-sm text-white transition-all duration-200 ease-linear dark:bg-red-800/70 ${(isLocationOpen || isLoginOpen || menuModel) && 'md:hidden'} ${extraMargin && 'max-md:mb-12'} ${showBtn ? 'translate-y-o' : 'translate-y-[500%]'}`}
    >
      <i className="ri-arrow-up-circle-line text-xl font-extralight"></i>
      <p className="tracking-wider">Back to top</p>
    </button>
  );
};

export default BackToTopBtn;
