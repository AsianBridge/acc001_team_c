import { Button } from '@mui/base/Button';
import { AccountImage, HomeImage } from './ShowImage';
import { styled } from '@mui/material';
import { forwardRef, InputHTMLAttributes } from 'react';

export const HomeButton = () => {
    return (
        <Button href='/'>
            <HomeImage />
        </Button>
    )
}

export const MyBingoButton = () => {
    return (
        <Button href='/MyBingo'>
            ビンゴ
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