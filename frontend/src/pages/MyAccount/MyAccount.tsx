import { FooterMenu } from "../../features/ButtonAggregation";
import { UserIdField } from "../../components/TextField";
import { UserProfile } from "../../components/UserInformation";

const MyAccount = () => {
    return (
        <>
            <h3>Hello MyAccount</h3>
            <FooterMenu />
            <UserProfile />
            <UserIdField />
        </>
    );
}

export default MyAccount;