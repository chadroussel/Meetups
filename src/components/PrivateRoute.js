import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "../firebase";
import Layout from "../components/layout/Layout";

const PrivateWrapper = ({ children }) => {
  const { currentUser } = useAuthState();
  return currentUser ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

export default PrivateWrapper;

// export default function PrivateWrapper({ component: Component, ...rest }) {
//   const { currentUser } = useAuth();
//   return (
//     <Outlet
//       {...rest}
//       render={(props) => {
//         return currentUser ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/login" replace />
//         );
//       }}
//     ></Outlet>
//   );
// }
