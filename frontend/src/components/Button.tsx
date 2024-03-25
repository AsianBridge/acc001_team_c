import { Button } from '@mui/base/Button';
import { AccountImage, HomeImage } from './ShowImage';

export const HomeButton = () => {
    return (
        <Button href='/'>
            <HomeImage />
        </Button>
    )
}

export const MyAccountButton = () => {
    return (
        <Button href='/MyAccount'>
            <AccountImage />
        </Button>
    )
}

export const MyBingoButton = () => {
    return (
        <Button href='/MyBingo'>ビンゴ</Button>
    )
}