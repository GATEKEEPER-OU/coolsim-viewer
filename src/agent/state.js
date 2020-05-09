import React from "react";
import '../styles/tailwind.css';
import Agent from "./agent.js";
import Conditions from "./conditions.js";
import "./style.css"




function capitalize(str){
    return str.toString().charAt(0).toUpperCase() + str.slice(1);
}

function State({className = "", day = null,state = null}){

    let [currentState,setCurrent] = React.useState(state);
    let [currentDay,setDay] = React.useState(day);
    let [error,setError] = React.useState(false);


    React.useEffect(()=> {
        if(!currentState) {
            let a = new Agent();
            if (!currentState) {
                a.state().then(response => {
                    if (!response) {
                        return
                    }
                    console.log("State", response);
                    setCurrent(response.state);
                    setDay(response.day);
                }).catch(
                    err => {
                        console.error(err);
                        setError(err);
                    }
                );
            }
        }
    });



    return (
      <div className={`max-w-sm w-full lg:max-w-full lg:flex ${className}`}>
          {
              !currentState ? (
                  "ERROR: sorry nothing to see :("
              ) : "" }
          {
              currentState ? (
                  <div className="mb-8 text-sm">
                      <p className="text-sm text-gray-600">
                          {currentState.age ? "Age of "+currentState.age : "" }
                      </p>
                      <div className="text-gray-900 font-bold text-xl mb-2">Recap at Day {currentDay}</div>
                      <p className="text-sm">
                          Status: <span className={`${currentState ? currentState.status.label : ""} status comma`}>
                          {currentState ? capitalize(currentState.status.label) : ""}
                          </span>
                      </p>
                      <Conditions value={currentState.conditions}/>
                  </div>) : ""
          }
      </div>
    );
}

export default State;