import { useSelector } from 'react-redux';
import { selectContact } from '../../features/home/helpPageSlice';
import Contact from './Contact';
import LegalAndFaqs from './LegalAndFaqs';

const ContentArea = () => {
  // console.log('help/ContentArea rendered');
  const contact = useSelector(selectContact);

  return contact ? <Contact /> : <LegalAndFaqs />;
};

export default ContentArea;
