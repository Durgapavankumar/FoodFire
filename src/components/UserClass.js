import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {
        name: "Dummy",
        location: "Default",
      },
    };
    console.log(this.props.name + "   Child Constructor");
  }
  async componentDidMount() {
    console.log(this.props.name + "   Child ComponentDidMount");
    //Api call
    const data = await fetch("https://api.github.com/users/Durgapavankumar");
    const json = await data.json();
    console.log(json);
    this.setState({
      userinfo: json,
    });
  }
  render() {
    const { name, login } = this.state.userinfo;
    return (
      <div className="user-component">
        <h1>Name:{name}</h1>
        <h2>Login:{login}</h2>
      </div>
    );
  }
}
export default UserClass;

/** 
 * import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    console.log(this.props.name + "   Child Constructor");
  }
  componentDidMount() {
    console.log(this.props.name + "   Child ComponentDidMount");
  }
  render() {
    const { name, contact } = this.props;
    //const { count } = this.state;
    console.log(this.props.name + "   child render");
    return (
      <div className="user-component">
        <h1>Name : {name}</h1>
        <h2>Contact : {contact}</h2>
        <h2>Count :{this.state.count}</h2>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Count Increase
        </button>
      </div>
    );
  }
}
export default UserClass;

*/
