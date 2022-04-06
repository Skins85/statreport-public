import * as React from "react";
import * as ReactDOM from "react-dom";

interface FullName {
    firstName: string;
    lastName: string;
}

function Person({firstName, lastName}:FullName){
    return <h1>Hello there, {firstName} {lastName}</h1>;
}

ReactDOM.render(
    <>
        <h1>Hello, this is React and Typescript</h1>
        <Person firstName="Sarah" lastName="Jones" />
    </>,
    document.getElementById("root")
);