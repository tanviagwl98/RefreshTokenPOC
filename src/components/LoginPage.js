import React, { useState } from 'react';
import customAxios from './refreshToken';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //https://q2-libertycf.smartcmobile.net/AgencyAPI/api/1/user/IsLegacyUserCheck?userName=userName
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await customAxios.post('https://q32-libertycf.smartcmobile.net/AgencyAPI/api/1/agency/validatelogin', {
        userName:email,
        password:password,
        ipAddress: "xx.xx.xxx.xxx"
                 },
                 {
                    headers:{
                        'St':'Pl'
                }
        });

      const data = res.data.data;
      console.log(res,"My response")
      localStorage.setItem('APaccessToken', data.accessToken);
      localStorage.setItem("APUData", JSON.stringify(data));
      navigate("/home");
      // Redirect to the dashboard or home page
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="name" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
