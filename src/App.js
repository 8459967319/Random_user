import React,{useEffect, useState} from "react";
import {
  FaCalendarTimes,
  FaEnvelopeOpen,
  FaLock,
  FaMap,
  FaPhone,
  FaUser,
} from "react-icons/fa";

function App() {

const [user, setUser]=useState(null);
const [title, setTitle]=useState("random");
const [value, setvalue]=useState("name");
const getUser = async ()=>
{
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  const person = data.results[0];
  console.log(person)
  const {phone,email}=person;
  const {large:image}=person.picture;
  const {password}=person.login;
  const {first, last}=person.name;
  const
   {
    dob:{age},
  }=person;
  const 
  {
    street:{number, name},
  }=person.location;

  const newPerson={
    image,
    phone,
    email,
    password,
    age,
    street:`${number} ${name}`,
    name:`${first} ${last}`,

  }

  setUser(newPerson);
  setTitle("name")
  setvalue(newPerson.name);
  
}

useEffect(()=>{
  getUser()
},[])

const handleValue = (e)=>{
  if(e.target.classList.contains("icon"));
  const newValue = e.target.dataset.label;
  setTitle(newValue);
  setvalue(user[newValue]);
}

  return (
    <div className="App">
      <h2 className="center">Random User Generator</h2>
      <div className="block bcg-black">
        <div className="block">
          <div className="container">
            <img
              src={user && user.image}
              alt=""
              className="user-img"
            />
            <p className="user-title">My {title}</p>
            <p className="user-value"> Value : {value}</p>
            <div className="values-list">
              <button className="icon" data-label="name" onMouseOver={handleValue}>
                <FaUser />
              </button>
              <button className="icon" data-label="street" onMouseOver={handleValue}>
                <FaMap />
              </button>
              <button className="icon" data-label="phone" onMouseOver={handleValue}>
                <FaPhone />
              </button>
              <button className="icon" data-label="age" onMouseOver={handleValue}>
                <FaCalendarTimes />
              </button>
              <button className="icon" data-label="email" onMouseOver={handleValue}>
                <FaEnvelopeOpen />
              </button>
              <button className="icon" data-label="password" onMouseOver={handleValue}>
                <FaLock />
              </button>
            </div>
            <button className="btn" type="submit" onClick={getUser}>
              New User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
