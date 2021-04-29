import React from "react";
import {
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const InfoDialog = (props) => {
  const { openInfoDialog, openEditDialog, task, infoDialogIsOpen } = props;
  return (
    <Dialog
      onBackdropClick={() => openInfoDialog(false)}
      onEscapeKeyDown={() => openInfoDialog(false)}
      open={infoDialogIsOpen}
    >
      <IconButton onClick={() => openInfoDialog(false)} size="small">
        <Close />
      </IconButton>
      <DialogContent>
        <Typography variant="h2">{task.title}</Typography>
        <Typography variant="h4">{task.description}</Typography>

        <Button
          onClick={() => {
            openInfoDialog(false);
            openEditDialog(true);
          }}
          color="primary"
        >
          Edit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
