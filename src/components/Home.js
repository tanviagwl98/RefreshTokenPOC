import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getCountries } from "../customAxios";

const Home = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        debugger
        getCountries()
        .then((response) => {
          // console.log(response.data, "My Data");
          setCountries(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        // User is signed out
        navigate("/");
        // console.log("user is logged out");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem('APaccessToken');
        localStorage.removeItem('APUData');
        localStorage.removeItem('expiry');
        navigate("/");
        // console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <nav>
        <p>Welcome Home</p>
        <button onClick={handleLogout}>Logout</button>
        <div>
        <ul>
        {countries.slice(0, 10).map((country) => (
          <li key={country.alpha3Code}>{country.name}</li>
        ))}
      </ul>
        </div>
      </nav>
    </div>
  );
};

export default Home;
