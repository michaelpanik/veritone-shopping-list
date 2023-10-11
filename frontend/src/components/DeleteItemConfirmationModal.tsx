import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

type DeleteItemConfirmationModalProps = {
    open: boolean
    handleCancel: () => void
    handleContinue: () => void
}

const DeleteItemConfirmationModal: React.FC<DeleteItemConfirmationModalProps> = ({ open, handleCancel, handleContinue }) => {
    return (
        <Dialog
            open={open}
        >
            <DialogTitle>Delete Item?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this item? This can not be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="text" sx={{ textTransform: "capitalize", color: 'text.primary' }} onClick={handleCancel}>Cancel</Button>
                <Button variant="contained" sx={{ textTransform: "capitalize" }} onClick={handleContinue}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteItemConfirmationModal