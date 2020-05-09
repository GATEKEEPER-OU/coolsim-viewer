import React from "react";
import '../styles/tailwind.css';
import Agent from "./agent.js";
import Conditions from "./conditions.js";
import "./style.css"




function capitalize(str){
    return str.toString().charAt(0).toUpperCase() + str.slice(1);
}

function State({className}){

    let [current,setCurrent] = React.useState(false);
    let [error,setError] = React.useState(false);

    React.useEffect(()=> {
        let a = new Agent();
        if(!current) {
            a.state().then(response => {
                if (!response) {
                    return
                }
                console.log("State", response);
                setCurrent(response);
                // console.log("description",description);
            }).catch(
                err => {
                    console.error(err);
                    setError(err);
                }
            );
        }
    });


    return (
      <div className={`max-w-sm w-full lg:max-w-full lg:flex ${className}`}>
          {
              error ? (
                  "ERROR: sorry nothing to see :("
              ) : "" }
          {
              current ? (
                  <div className="mb-8 text-sm">
                      <p className="text-sm text-gray-600">
                          Age of {current.state.age}
                      </p>
                      <div className="text-gray-900 font-bold text-xl mb-2">Recap at Day {current.day}</div>
                      <p className="text-sm text-gray-600">
                          Status: <span className={`${current.state.status.label} status comma`}>{capitalize(current.state.status.label)}</span>
                      </p>
                      <Conditions value={current.state.conditions}/>
                  </div>) : ""
          }
      </div>
    );
}

export default State;