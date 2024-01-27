import green from '@mui/material/colors/green';
import orange from '@mui/material/colors/orange';
import red from '@mui/material/colors/red';

const rowSx = (selectedRow) => (record) => {
  let style = {};
  if (!record) {
    return style;
  }
  if (selectedRow && selectedRow === record.id) {
    style = {
      ...style,
      backgroundColor: 'action.selected',
    };
  }
  if (record.status === 'accepted')
    return {
      ...style,
      borderLeftColor: green[500],
      borderLeftWidth: 5,
      borderLeftStyle: 'solid',
    };
  if (record.status === 'pending')
    return {
      ...style,
      borderLeftColor: orange[500],
      borderLeftWidth: 5,
      borderLeftStyle: 'solid',
    };
  if (record.status === 'rejected')
    return {
      ...style,
      borderLeftColor: red[500],
      borderLeftWidth: 5,
      borderLeftStyle: 'solid',
    };
  return style;
};

export default rowSx;