import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDeviceFingerPrint,
  setIsLoggedInHome,
} from '../../features/home/homeSlice';
import { setIsLoggedIn } from '../../features/Login/loginSlice';
import {
  setIsLoggedInRestro,
  setItemToCart,
  toggleItemsToBeAddedInCart,
  addToWishlistItem,
  setFavoriteRestro,
} from '../../features/home/restaurantsSlice';
import { addRecentLocations } from '../../features/home/homeSlice';
import LogoutButton from './LogoutButton';
import DotBounceLoader from '../../utils/DotBounceLoader';
import { toast } from 'react-toastify';
import cleanOnLogout from '../../utils/logoutCleaner';

const Logout = ({ mainData }) => {
  const [currentActiveSession, setCurrentActiveSession] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [otherActiveSessions, setOtherActiveSessions] = useState([]);
  const deviceFingerPrint = useSelector(selectDeviceFingerPrint);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const ActiveSession = mainData.data?.find(
      (session) => session.activeNow === true,
    );

    setCurrentActiveSession(ActiveSession);

    const otherSessions = mainData.data?.filter(
      (session) => session.activeNow === false,
    );

    setOtherActiveSessions(otherSessions);
  }, []);

  const extractLastActive = (data) => {
    const date = new Date(data);

    const inIndianTime = date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    return inIndianTime;
  };

  const deleteHandler = async () => {
    setDeleteLoading(true);
    try {
      const result = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/userActivity/logout/many`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-device-id': deviceFingerPrint,
            'x-user-agent': navigator.userAgent,
            'x-language': navigator.language,
            'x-resolution': `${screen.height}x${screen.width}`,
          },
          credentials: 'include',
        },
      );

      const data = await result.json();

      if (!result.ok) throw new Error(data.message);

      console.log(data);

      navigate('/', { replace: true });
      cleanOnLogout({
        dispatch,
        setItemToCart,
        toggleItemsToBeAddedInCart,
        setFavoriteRestro,
        addRecentLocations,
        addToWishlistItem,
      });
      setOtherActiveSessions([]);
      setCurrentActiveSession({});
      dispatch(setIsLoggedIn(false));
      dispatch(setIsLoggedInHome(false));
      dispatch(setIsLoggedInRestro(false));
      setDeleteLoading(false);
    } catch (err) {
      console.log('Error in logout', err);

      toast.error("Can't logout. Please try after sometime", {
        autoClose: 3000,
        style: {
          backgroundColor: 'rgba(0,0,0,0.9)',
          fontWeight: 'medium',
          color: 'white',
        },
      });
      setDeleteLoading(false);
    }
  };

  return (
    <div
      className={`bg-gray-100 ${
        otherActiveSessions.length !== 0 && 'pb-3'
      } mx-auto w-[95%] overflow-hidden rounded-md dark:bg-gray-800`}
    >
      <div>
        {Object.keys(currentActiveSession).length !== 0 && (
          <div>
            <div className="bg-primary dark:bg-darkPrimary w-full px-1 py-2">
              <h2 className="text-xl text-white">CURRENT DEVICE</h2>
            </div>
            <div className="flex items-center justify-between px-2 py-4">
              <div>
                <p className="block dark:text-gray-200">
                  {currentActiveSession?.data?.browserName.replace(
                    /\b\w/g,
                    (word) => word.toUpperCase(),
                  )}
                  {` Browser`}
                </p>
                <p className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400">
                  <span>
                    {currentActiveSession?.data?.oSName.toUpperCase()}
                  </span>
                  <span className="text-black dark:text-gray-300">•</span>
                  <span className="font-normal text-green-600">
                    {' '}
                    Active now
                  </span>
                </p>
              </div>
              <LogoutButton
                sessionId={currentActiveSession?.id}
                type="current"
              />
            </div>
          </div>
        )}
        {otherActiveSessions.length !== 0 && (
          <div>
            <div className="bg-primary dark:bg-darkPrimary w-full px-1 py-2">
              <h2 className="text-xl text-white">OTHER LOGGED DEVICE</h2>
            </div>
            {otherActiveSessions.map((session, index) => {
              return (
                <div
                  key={index}
                  className="rounded border-b-2 border-gray-800 px-2 py-4 dark:border-gray-400"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="block dark:text-gray-200">
                        {session.data.browserName.replace(/\b\w/g, (word) =>
                          word.toUpperCase(),
                        )}
                        {` Browser`}
                      </p>
                      <LogoutButton
                        sessionId={session.id}
                        index={index}
                        type="other"
                        otherActiveSessionSetter={setOtherActiveSessions}
                      />
                    </div>

                    <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-gray-500 dark:text-gray-400">
                      <span className="tracking-wide">
                        {session.data.oSName.toUpperCase()}
                      </span>
                      <span className="text-black dark:text-gray-300">•</span>
                      <span className="font-normal whitespace-nowrap text-green-600">
                        {' '}
                        Last active on
                      </span>
                      <span className="whitespace-nowrap">
                        {extractLastActive(session.lastActive)}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {otherActiveSessions.length !== 0 && (
        <button
          disabled={deleteLoading}
          onClick={deleteHandler}
          className="bg-primary dark:bg-darkPrimary mx-auto mt-5 flex h-8 items-center justify-center rounded px-3 py-1 text-sm font-semibold tracking-wide text-white max-lg:w-[70%]"
        >
          {deleteLoading ? <DotBounceLoader /> : 'Logout of All Devices'}
        </button>
      )}
    </div>
  );
};

export default Logout;
