import {
  useSearchParams,
  useNavigate,
  Await,
  useLoaderData,
} from 'react-router';

import { useSelector } from 'react-redux';

import { Suspense } from 'react';
import ScooterAnimation from '../../utils/ScooterAnimation';
import ProfileResponseShimmer from './ProfileResponseShimmer';
import MobileFooterMenu from '../Footer/MobileFooterMenu';
import Logout from './Logout';
import Address from './Address';
import { selectIsLoggedIn } from '../../features/Login/loginSlice';
import UnauthorizedError from '../ErrorHandling/UnauthorizedError';

const MainContent = ({ mainData }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  // console.log("main", mainData);

  if (!isLoggedIn) return <UnauthorizedError />;

  return (
    <>
      <main className="h-full overflow-x-hidden pt-14 pb-20">
        <section className="bg-primary profile-animation relative h-28 overflow-hidden rounded-b-3xl px-3 pt-5 pb-2 dark:bg-gray-800">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-long-line text-2xl font-medium text-white"
          />
          <h1 className="mt-2 text-2xl text-white text-shadow-2xs dark:text-gray-100">
            {mode}
          </h1>
        </section>
        {mode === 'Logout Options' && (
          <div className="my-4">
            <ScooterAnimation />
          </div>
        )}
        {mode === 'Logout Options' ? (
          <Logout mainData={mainData} />
        ) : mode === 'Saved Address' ? (
          <Address data={mainData} />
        ) : (
          ''
        )}
      </main>
      <MobileFooterMenu />
    </>
  );
};

const MobileProfileResponse = () => {
  const loaderData = useLoaderData();

  return (
    <Suspense fallback={<ProfileResponseShimmer />}>
      <Await resolve={loaderData.data}>
        {(data) => <MainContent mainData={data} />}
      </Await>
    </Suspense>
  );
};

export default MobileProfileResponse;
