import {
  selectEditModal,
  setOpenEditModal,
  setHideEditModal,
} from '../../features/Login/loginSlice';
import { useSelector, useDispatch } from 'react-redux';

const EditModal = ({ Component }) => {
  const { hideEditModal } = useSelector(selectEditModal);
  const dispatch = useDispatch();

  const animationEndHandler = (e) => {
    const classList = e.target.classList;

    if (classList.contains('animate-hideDeleteModal')) {
      dispatch(setOpenEditModal(false));
      dispatch(setHideEditModal(false));
    }
  };

  return (
    <div
      onClick={() => dispatch(setHideEditModal(true))}
      className="absolute top-0 left-0 z-60 flex h-full w-full items-center justify-center bg-black/60"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={animationEndHandler}
        className={`bg-white p-3 dark:bg-gray-800 ${!hideEditModal ? 'animate-showDeleteModal' : 'animate-hideDeleteModal'} w-[80%] rounded-md lg:w-[25%]`}
      >
        {<Component />}
      </div>
    </div>
  );
};

export default EditModal;
