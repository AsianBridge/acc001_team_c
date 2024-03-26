import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { ShowImage } from "./ShowImage";

export const ShowModal = ({ src, storeName }: { src: string, storeName: string }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const boxStyle = {
        bgcolor: "background.paper",
    }

    return (
        <>
            <Button onClick={handleOpen} >
                <ShowImage src={src} width="120vw" height="120vh" />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <ShowImage src={src} width="200vw" height="200vh"></ShowImage>
                    <h1>{storeName}</h1>
                </Box>
            </Modal>
        </>
    );
}