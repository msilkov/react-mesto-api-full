import React from "react";
import { Redirect } from "react-router-dom";
export default function ProtectedRoute({ loggedIn, children }) {
	return loggedIn ? children : <Redirect to="/sign-in" />;
}
