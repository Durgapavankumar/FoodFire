/**
 *   How to create the below nexted elements
 *   <div id="parent">
 *      <div id="child">
 *          <h1>I am a h1 tag </h1>
 *      </div>
 *   </div>
 *
 *  above is the ReactElement (Object)==> (that becomes )HTML that browser understands
 * Create Element is creating Object
 */

const heading = React.createElement(
  "div",
  { id: "parent" },
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I am H1 tag"),
    React.createElement("h2", {}, "I am H2 tag"),
  ])
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
