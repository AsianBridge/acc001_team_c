import { Grid } from "@mui/material";
import { HomeButton, MyAccountButton, MyBingoButton } from "../components/Button"

export const FooterMenu = () => {
    return (
        <>
            <Grid container spacing={5}>
                <Grid item xs={4}>
                    <HomeButton />
                </Grid>
                <Grid item xs={4}>
                    <MyBingoButton />
                </Grid>
                <Grid item xs={4}>
                    <MyAccountButton />
                </Grid>
            </Grid>
        </>
    );
}