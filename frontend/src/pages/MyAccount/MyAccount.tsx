import { FooterMenu } from "../../features/ButtonAggregation";
import { UserProfile } from "../../components/UserInformation";

const MyAccount = () => {
  return (
    <>
      <UserProfile />
      <h3>Hello MyAccount</h3>
      <FooterMenu />
    </>
  );
};

export default MyAccount;
