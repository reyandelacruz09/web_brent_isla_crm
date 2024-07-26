import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useDeleteBranchMutation } from "../../store";
import toast from "react-hot-toast";

interface ModalDeleteProductProps {
  modalid: string;
}

const Modal_Delete_Product: React.FC<ModalDeleteProductProps> = ({
  modalid,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [delBranch] = useDeleteBranchMutation();
  const deleteBranch = async (e: any) => {
    e.preventDefault();

    try {
      const checkstat = await delBranch(modalid).unwrap();
      if (checkstat.success === true) {
        //alert("success");
        toast.success("Successfully Deleted!");
        window.location.reload();
      } else {
        alert("something wrong");
      }
    } catch (error) {
      alert("Hala");
    }
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <DeleteForeverOutlinedIcon onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this Branch?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running. */}
            {/* <p>ID: {modalid}</p> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="">
          <div className="w-full flex pb-5">
            <div className="w-1/2 text-center">
              <Button
                className="w-5/6"
                variant="contained"
                color="error"
                onClick={deleteBranch}
              >
                Yes
              </Button>
            </div>
            <div className="w-1/2 text-center">
              <Button
                className="w-5/6"
                variant="contained"
                color="primary"
                onClick={handleClose}
                autoFocus
              >
                No
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Modal_Delete_Product;
