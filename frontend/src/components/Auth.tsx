// import "../App.css";
// import { Authenticator } from "@aws-amplify/ui-react";
// import { Amplify } from "aws-amplify";
// import awsconfig from "../amplifyconfiguration.json";
// import { ReactNode } from "react";
// import { translations } from "@aws-amplify/ui-react";
// import { I18n } from "aws-amplify/utils";

// import { useEffect } from "react";
// import { useAuthState } from "../store/stateManager";
// import { getCurrentUser } from "aws-amplify/auth";

// Amplify.configure(awsconfig);

// function Auth({ children }: { children: ReactNode }) {
//   I18n.putVocabularies(translations);
//   I18n.setLanguage("ja");
//   I18n.putVocabularies({
//     ja: {
//       "Show password": "パスワードを表示",
//       "Hide password": "パスワードを非表示",
//     },
//   });
//   return <Authenticator>{children}</Authenticator>;
// }

// export default Auth;

// export const AuthStatus = () => {
//   const { setAuthState } = useAuthState();

//   const fetchAuthState = async () => {
//     try {
//       const user = await getCurrentUser();
//       setAuthState(user);
//     } catch (error) {
//       console.error("Error fetching user: ", error);
//       setAuthState(undefined);
//     }
//   };

//   useEffect(() => {
//     fetchAuthState();
//   }, [fetchAuthState]);
// };
