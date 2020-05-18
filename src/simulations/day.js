import React from "react";
import * as Utils from "../utils.js";



function Day({value, ...params}){

    let {day, events, results} = value;
    let {age,active,dependent,final,independent,stats} = results;
    let total = parseInt(active) + parseInt(dependent) + parseInt(final) + parseInt(independent);
    let {mental,physical,behavioural,social} = stats;

    const statsClass = (value)=>{
        let label = Utils.levelToLabel(parseFloat(value));

        switch (label){
            case "critical":
                return "text-red-700";
            case "mild":
                return "text-yellow-700";
            case "light":
                return "text-green-700";
            default:
                return "text-teal-700";
        }
    }

    return (
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 max-w-sm rounded overflow-hidden shadow-lg px-6 py-4 bg-white ml-6 mb-6" {...params}>
          <div className="mb-2 font-bold">Diary of Day <span className="font-bold text-teal-700">{day}</span></div>
          <div className="mb-2 text-sm">
              Events of the day <span className="font-bold">{events.length < 1 ? "none" : (
                  <ul className="pl-6 list-disc text-sm">
                      {events.map(e=>(<li key={e.name} className="font-bold text-teal-700">{Utils.capitalize(e.label)}</li>))}
                  </ul>)}</span>
          </div>
          <div className="mb-2 text-sm">
              <div>Average age <span className="font-bold">{Math.floor(age)}</span></div>
              <div>Agents' status:</div>
              <ul className="pl-6 list-disc">
                  <li>Active: <span className="font-bold text-teal-700">{active}</span></li>
                  <li>Independent: <span className="font-bold text-green-700">{independent}</span></li>
                  <li>Dependent: <span className="font-bold text-red-700">{dependent}</span></li>
                  <li>Final: <span className="font-bold text-gray-700">{final}</span></li>
              </ul>
          </div>
          <div className="mb-2 text-sm">
              <div>Average Stats</div>
              <ul className="pl-6 list-disc">
                  {Object.keys(stats).map(k=>(<li key={k}>{Utils.capitalize(k)}: <span className={`font-bold ${statsClass(stats[k])}`}>{stats[k].toPrecision(1)}</span></li>) )}
              </ul>
          </div>
      </div>
    );
}

export default Day;