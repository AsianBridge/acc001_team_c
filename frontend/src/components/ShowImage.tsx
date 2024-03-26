type Props = {
  src: string;
  width: string;
  height: string;
};

export const ShowImage = (props: Props) => {
  const { src, ...other } = props;
  return <img src={src} {...other}></img>;
};

export const HomeImage = () => {
  return (
    <ShowImage
      src="https://loosedrawing.com/assets/illustrations/png/487.png"
      width="50vw"
      height="50vh"
    />
  );
};

export const AccountImage = () => {
  return (
    <ShowImage
      src="https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_13.png"
      width="50vw"
      height="50vh"
    />
  );
};

export const FooterBingoImage = () => {
  return (
    <ShowImage
      src="https://tegakisozai.com/wp-content/uploads/2019/09/bingogame_green_55.png"
      width="50vw"
      height="50vh"
    />
  )
}

