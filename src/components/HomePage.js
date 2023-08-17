import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "./refreshToken";
// import _ from "lodash";

const pledges = [
  {
    name: "Tanvi",
    value: "Tanvi"
  },
  {
    name: "Tanvi2",
    value: "Tanvi2"
  },
];

const HomePage = () => {
  const [isCheck, setIsCheck] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const navigate = useNavigate();
  // const [data,setData] = useState();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  // const [checked, setChecked] = useState(false) /*For single check box*/
  // const handleDataClick = () => {
  //     getData();
  //     getData();
  //     getData();
  // };

  const handleDataClick = async () => {
    await getData();
    await getData();
    await getData();
  };

  // const handleOnChange = (i) => {
  //   const updatedChecked = checked.map((item, index) =>
  //     index === i ? !item : item
  //   );
  //   setChecked(updatedChecked);
  //   // setChecked(!checked);
  // };
  // const debounceGetData = _.debounce(async () => {
  //   await getData();
  // }, 1);

  const getData = async () => {
    // debugger
    const res = await customAxios.get(
      "https://",
      {
        headers: {
          py: "x",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(res);
    return res;
  };

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(pledges.map(i => i.name));
    if(isCheckAll){
      setIsCheck([]);
    }
  }

  const handleClick = e => {
    const { name, checked } = e.target;
    setIsCheck([...isCheck, name]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== name));
    }
  };

  return (
    <div>
      Test Page
      <div>
                <input
                  type="checkbox"
                  name="selectAll"
                  checked={isCheckAll}
                  onChange={()=>handleSelectAll()}
                />{" "}
                Select All
              </div>
      {/* <div>
        <input type="checkbox" name="pledge" value="firstPledge" checked={checked} onChange={handleOnChange}/> Pledge 1
      </div> */}
      <ul>
        {pledges.map(({ name }, index) => {
          return (
            <li key={index} style={{listStyle:'none'}}>
              <div>
                <input
                  type="checkbox"
                  name={name}
                  // value={name}
                  checked={isCheck.includes(name)}
                  onChange={(e)=>handleClick(e)}
                />{" "}
                {name}
              </div>
            </li>
          );
        })}
      </ul>
      {/* <button onClick={handleDataClick}>Get Data</button>
      <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default HomePage;
