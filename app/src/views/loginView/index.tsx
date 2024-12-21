"use client";

import { useState } from "react";
import LoginForm from "../../components/login/login";

const LoginView = () => {
  const [loggin, setlogging] = useState<boolean>(true);

  return <section>{loggin ? <LoginForm /> : ""}</section>;
};

export default LoginView;
