import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';

const LoginPage = ({ theme }) => {
  const [userNameOrEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = e => {
    e.preventDefault();
    login({ userNameOrEmail, password }).catch(() =>
      notify('Invalid email or password')
    );
  };

  return (
    <form>
      <label htmlFor="userNameOrEmail">Email or User Name</label>
      <input
        id="userNameOrEmail"
        name="userNameOrEmail"
        type="text"
        value={userNameOrEmail}
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button type="submit" onClick={handleSubmit}>Login</button>
    </form>
  );
};

export default LoginPage;