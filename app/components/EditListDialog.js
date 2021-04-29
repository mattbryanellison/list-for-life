// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { useParams } from "react-router-dom";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   TextField,
// } from "@material-ui/core";
// import { Info, Close } from "@material-ui/icons";

// import { putList } from "../redux/lists";

// const EditListDialog = (props) => {
//   const { list } = props;
//   const { listId } = useParams();
//   const [editDialogIsOpen, openEditDialog] = useState(false);
//   const [infoDialogIsOpen, openInfoDialog] = useState(false);
//   const [title, setTitle] = useState(list.title);

//   return (
//     <Dialog
//       onBackdropClick={() => openEditDialog(false)}
//       onEscapeKeyDown={() => openEditDialog(false)}
//       open={editDialogIsOpen}
//     >
//       <DialogContent>
//         <TextField
//           autoFocus
//           defaultValue={list.title}
//           margin="dense"
//           id="title"
//           label="Title"
//           type="title"
//           fullWidth
//           onKeyPress={onEnter}
//           onChange={(event) => {
//             setTitle(event.target.value);
//           }}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button
//           onClick={(id, list) => {
//             props.updateList(list.id, list);
//           }}
//           color="primary"
//         >
//           Save
//         </Button>
//         <Button onClick={} color="primary">
//           Delete
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const mapState = (state) => {
//   return {
//     list: state.list,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     updateList: (id, list) => dispatch(putList(id, list)),
//   };
// };

// export default connect(mapState, mapDispatch)(EditListDialog);
