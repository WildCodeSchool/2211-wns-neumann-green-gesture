import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../containers/Layout";
import { GetUserByIdDocument, useLoginMutation } from "../gql/generated/schema";
import client from "../gql/client";

function Login() {
  const [email, setEmail] = useState("partner@gmail.com");
  const [password, setPassword] = useState("testtest");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [loginUser, { loading: processing }] = useLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const user = await loginUser({
        variables: { loginData: { email, password } },
        //refetchQueries: [{ query: GetUserByIdDocument }],
      });
      window.localStorage.setItem("gg_logged", "isLogged");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("err", err);
    } finally {
      setEmail("");
      setPassword("");
      client.resetStore();
    }
  };

  return (<h1>Login</h1> );
}

export default Login;
