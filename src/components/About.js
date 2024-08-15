import React from "react";
import User from "./User";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("Parent Constructor");
  }
  componentDidMount() {
    console.log("Parent componentDidMount");
  }
  render() {
    console.log("Parent render");
    return (
      <div className=" align-bottom items-center">
        <h1 className="font-bold bg-slate-200">About Class Component</h1>
        <h1 className="font-serif">Developed by Durga Pavan Kumar</h1>
        <UserClass name={"1st"} contact={"Kalluru"} />
      </div>
    );
  }
}
export default About;

/*
const About = () => {
  return (
    <div>
      <h1>This is the Food delivering App</h1>
      <h2>Developed by Durga Pavan Kumar</h2>

      <User name={"Kumar"} location={"Kalluru"} />
      <UserClass name={"Kalyan"} contact={"+109808769087"} />
    </div>
  );
};

export default About;
*/
