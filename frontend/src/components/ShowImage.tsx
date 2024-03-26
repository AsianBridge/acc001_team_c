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
      src="https://img.icons8.com/?size=48&id=86527&format=png"
      width="50vw"
      height="50vh"
    />
  );
};

export const AccountImage = () => {
  return (
    <ShowImage
      src="https://cdn-icons-png.freepik.com/256/456/456212.png"
      width="50vw"
      height="50vh"
    />
  );
};

export const FooterBingoImage = () => {
  return (
    <ShowImage
      src="https://www.silhouette-illust.com/wp-content/uploads/2017/09/bingo_card_37352-300x300.jpg"
      width="60vw"
      height="56vh"
    />
  );
};
