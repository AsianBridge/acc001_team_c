import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { ShowImage } from "./ShowImage";

export const ShowModal = ({ src, storeName }: { src: string, storeName: string }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen}>
                <ShowImage src={src} />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <ShowImage src={src}></ShowImage>
                    <h1>{storeName}</h1>
                </Box>
            </Modal>
        </>
    );
}