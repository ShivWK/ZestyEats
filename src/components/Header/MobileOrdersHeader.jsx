// Done

import HeaderWrapper from './HeaderWrapper';
import MainHeader from './MainHeader';

const MobileOrdersHeader = () => {
  // console.log("MobileOrdersHeader rendered")
  return (
    <HeaderWrapper>
      <MainHeader searchPlaceholder="Orders & Wishlist" showSearch={false} />
    </HeaderWrapper>
  );
};

export default MobileOrdersHeader;
