import {
  DateInput,
  SearchInput,
} from 'react-admin';

const ContactFilter = [
  <SearchInput source="q" alwaysOn />,
  <DateInput source="sendBefore" />,
  <DateInput source="sendSince" />,
];

export default ContactFilter;