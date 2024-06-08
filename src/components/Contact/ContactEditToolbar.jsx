import Toolbar from '@mui/material/Toolbar';
import SendIcon from '@mui/icons-material/Send';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import {
  DeleteButton,
  useRecordContext,
  Button,
  useTheme,
  required,
  SaveButton,
  useNotify,
  useRedirect,
  TextInput,
} from 'react-admin';
import { Box, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
const RichTextInput = React.lazy(() =>
  import('ra-input-rich-text').then(module => ({
    default: module.RichTextInput,
  }))
);
const style = {
  display: "flex",
  flexDirection: "column",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ContactEditToolbar = (props) => {
  const { resource } = props;
  const [theme] = useTheme();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const record = useRecordContext(props);
  const notify = useNotify();
  const redirect = useRedirect();

  if (!record) return null;
  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: { sm: 0 },
      }}
    >
      <Modal
        sx={{
          color: theme === 'dark' ? "white" : "black",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
            marginBottom: "20px"
          }}>
            Support for <span style={{ textDecoration: "underline" }}>{record.email}</span>
          </Typography>
          <TextInput label="Title" source="title" />
          <RichTextInput
            fullWidth
            sx={{
              ".ProseMirror": {
                height: "50px"
              },
              fontFamily: "Open Sans,sans-serif",
            }}
            source="support"
            label="Support content"
            validate={req}
          />
          <SaveButton
            alwaysEnable
            icon={<SendIcon />}
            label="Sent"
            mutationOptions={{
              onSuccess: () => {
                notify('Send email success', {
                  type: 'info',
                  messageArgs: { smart_count: 1 },
                  undoable: true,
                });
                redirect('list', 'contacts');
              },
            }}
            type="button"
            sx={{
              alignSelf: "flex-end",
              padding: "10px",
            }}
          />
        </Box>
      </Modal>
      <Button
        onClick={handleOpen}
        startIcon={<QuickreplyIcon />}
        label='Support'
        sx={{
          bgcolor: 'rgba(236, 122, 119, 0.08)',
          padding: "10px"
        }} />
      <DeleteButton record={record} resource={resource} />
    </Toolbar>
  );
};
const req = [required()];
export default ContactEditToolbar;