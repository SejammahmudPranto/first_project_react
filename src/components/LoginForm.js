import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
//import classes from "../../Styles/Login.module.css";
import Button from "./Button";
import Form from "./Form";
//import Illustration from "../Illustration";
import TextInput from "./TextInput";

export default function LoginForm() {
  //const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //const [confirmPassword, setConfirmPassword] = useState();
  //const [agree, setAgree] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { login } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault(); // prevent forms default behaviour so that it will not reload

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to login! Email or password maybe incorrect");
    }
  }
  return (
    <Form style={{ height: "330px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter Email"
        icon="alternate_email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      ></TextInput>
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      ></TextInput>
      <Button type="submit" disabled={loading}>
        <span>Submit Now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Don't have an account? <Link to={"/signup"}>Signup</Link> instead.
      </div>
    </Form>
  );
}
