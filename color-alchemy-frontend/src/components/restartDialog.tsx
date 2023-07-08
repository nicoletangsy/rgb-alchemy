import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface SDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isWin?: boolean;
}

const SDialog: React.FC<SDialogProps> = ({
    open = false,
    onClose,
    onConfirm,
    isWin = false,
}) => {
    const title = (isWin ? `You Win! ` : `You Lose! `) + `Do you want to play again?`;
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
            <Button onClick={onClose}>No</Button>
            <Button onClick={onConfirm} autoFocus>
                Yes
            </Button>
        </DialogActions>
        </Dialog>
    );
};

export default SDialog;