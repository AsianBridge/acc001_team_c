import App from "./App";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "../amplify/configureAmplify";

const AuthenticatedApp = withAuthenticator(App);

export default AuthenticatedApp;
