import MobileFooterMenu from '../Footer/MobileFooterMenu';
import ScooterAnimation from '../../utils/ScooterAnimation';
import DotBounceLoader from '../../utils/DotBounceLoader';

const ProfileResponseShimmer = () => {
  const shimmerArray = Array.from({ length: 4 }, (_, i) => i);

  return (
    <main className="h-full overflow-x-hidden pt-14 pb-20">
      <section className="relative mx-auto mt-8 w-[95%] overflow-hidden rounded-2xl border border-gray-500 p-3 px-3">
        <div className="shimmerBg h-4 w-7 rounded" />
        <div className="shimmerBg mt-4 h-7 w-[70%] rounded" />
      </section>
      <div className="my-4">
        <ScooterAnimation />
      </div>

      <div className="mx-auto flex w-[95%] flex-col gap-4">
        {shimmerArray.map((div, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-md border border-gray-500 p-2"
          >
            <div className="shimmerBg h-5 w-[80%] rounded"></div>
            <div className="shimmerBg h-5 w-[70%] rounded"></div>
            <div className="flex w-full items-center justify-between">
              <div className="shimmerBg h-5 w-[40%]"></div>
              <div className="shimmerBg h-5 w-[20%]"></div>
            </div>
          </div>
        ))}
      </div>
      <MobileFooterMenu />
    </main>
  );
};

export default ProfileResponseShimmer;
