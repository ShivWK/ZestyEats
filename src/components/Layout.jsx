import { Outlet } from 'react-router-dom';
import PageHeader from './Header/PageHeader';
import PageFooter from './Footer/PageFooter';
import LoginModal from './Login/LoginModal';
import LocationInfoModal from './Location/LocationInfoModal';
import DeleteModal from './Profile/DeleteModal';

import LocationModal from './Location/LocationModal';
import EditProfile from './Profile/EditProfile';
import Verification from './Profile/Verification';

import {
  selectLogInModal,
  selectLocationModal,
  selectLocationInfoModal,
  selectDeleteModal,
  selectEditModal,
  selectToEdit,
} from '../features/Login/loginSlice';

import { useSelector } from 'react-redux';
import useTrackNavigation from '../hooks/useTrackNavigation';
import UpdateStorage from '../utils/UpdateStorage';
import EditModal from './Modal/EditModal';
import { useHomeInitialization } from '../hooks/useHomeInitialization';
import { useSessionBootstrap } from '../hooks/useSessionBootstrap';
import { useModalLock } from '../hooks/useModalLock';
import { useBackNavigationModal } from '../hooks/useBackNavigationModal';

export default function Layout() {
  const isLoginOpen = useSelector(selectLogInModal);
  const isLocationOpen = useSelector(selectLocationModal);
  const { OpenLocationInfoModal } = useSelector(selectLocationInfoModal);
  const { deleteModal } = useSelector(selectDeleteModal);
  const { openEditModal } = useSelector(selectEditModal);
  const toEdit = useSelector(selectToEdit);

  useTrackNavigation();
  useSessionBootstrap();
  useHomeInitialization();
  useModalLock();
  useBackNavigationModal();

  return (
    <>
      <PageHeader />
      <Outlet />
      {isLoginOpen && <LoginModal />}
      {isLocationOpen && <LocationModal />}
      {deleteModal && <DeleteModal />}
      {openEditModal && (
        <EditModal
          Component={toEdit === 'profile' ? EditProfile : Verification}
        />
      )}
      <PageFooter />
      {OpenLocationInfoModal && <LocationInfoModal />}
    </>
  );
}
