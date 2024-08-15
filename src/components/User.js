import { useState } from "react";

const User = (props) => {
  const [count] = useState(0);
  return (
    <div className="user-component">
      <h1>Name : {props.name}</h1>
      <h2>Location :{props.location}</h2>
      <h2>Count :{count}</h2>
    </div>
  );
};
export default User;
