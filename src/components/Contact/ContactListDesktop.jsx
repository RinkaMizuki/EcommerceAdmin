import {
  DatagridConfigurable,
  DateField,
  TextField,
} from 'react-admin';

const ContactListDesktop = () => (
  <DatagridConfigurable
    rowClick="edit"
    sx={{
      '& .RaDatagrid-thead': {
        borderLeftColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftStyle: 'solid',
      },
      '& .column-content': {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    }}
  >
    <DateField source="sentDate" locales="fr-FR" />
    <TextField source="name" />
    <TextField source="content" sortable={false} />
    <TextField source="email" sortable={false} />
    <TextField source="phone" sortable={false} />
  </DatagridConfigurable>
);

export default ContactListDesktop;