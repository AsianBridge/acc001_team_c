import { TextField, Typography } from "@mui/material"

export const ShowCaption = ({ caption }: { caption: undefined | string }) => {
    return (
        <>
            <Typography component="legend">キャプション</Typography>
            <TextField
                id="standard-basic"
                variant="standard"
                value={caption}
                disabled
            />
        </>
    )
}