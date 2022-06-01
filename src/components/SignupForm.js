import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import Button from "./Button";
import Form from "./Form";
import Label from "./Label";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [agree, setAgree] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { signUp } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault(); // prevent forms default behaviour so that it will not reload
    //password validation
    if (password !== confirmPassword) {
      return setError("Passwords doesnot match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(email, password, name);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to create account!");
    }
  }

  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter Name"
        icon="person"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        type="text"
        placeholder="Enter Email"
        icon="alternate_email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <Label required value={agree} onChange={(e) => setAgree(e.target.value)}>
        <span>I agree to the Terms &amp; Conditions</span>
      </Label>
      <Button disabled={loading} type="submit">
        <span>Submit Now</span>
      </Button>

      <div className="info">
        Already have an account? <Link to={"/login"}>Login</Link> instead.
      </div>
    </Form>
  );
}
