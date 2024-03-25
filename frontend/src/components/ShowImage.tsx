export const ShowImage = (props:any) => {
    const {
        src,
        ...other
    } = props;
    return (
        <img src={src}
            {...other}></img>
    );
}

export const HomeImage = () => {
    return (
        <ShowImage src="https://loosedrawing.com/assets/illustrations/png/487.png" width="50vw" height="50vh"/>
    )
}

export const AccountImage = () => {
    return (
        <ShowImage src="https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_13.png" width="50vw" height="50vh" />
    )
}