import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Map_dialog(){
    const [open, setOpen] = React.useState(true);
    const scroll = 'paper';
    const country = "USA";
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
      };

    return (
        <>
            <Dialog
                open={true}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description" 
            >
                <DialogTitle id="scroll-dialog-title">{country}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText>
                        Hello World
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}