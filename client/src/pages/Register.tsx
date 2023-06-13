import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../containers/Layout";
import { useCreateUserMutation, UsersDocument } from "../gql/generated/schema";

function Register() {
  const [createUser, { loading: processing }] = useCreateUserMutation();
  const [firstName, setFirstName] = useState("simon");
  const [lastName, setLastName] = useState("mandela");
  const [email, setEmail] = useState("test24@gmail.com");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("testtest");

  const [showPassword, setShowPassword] = useState(false);
  const [isFree, setIsFree] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createUser({
        variables: { data: { email, firstName, lastName, password } },
        refetchQueries: [{ query: UsersDocument }],
      });
      navigate("/");
    } catch (err) {
      console.error("err", err);
    } finally {
      setFirstName("");
      setLastName("");
      setEmail("");
      setCompany("");
      setPassword("");
    }
  };

  return (<h1>Register</h1>
  );
}

export default Register;
