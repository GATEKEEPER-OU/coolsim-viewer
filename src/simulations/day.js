import React from "react";
import * as Utils from "../utils.js";
import { ResponsiveWaffle } from '@nivo/waffle';

const statusColor = (label) => {
    switch(label){
        case "active":
            return "green";
        case "independent":
            return "yellow";
        case "dependent":
            return "red";
        case "final":
            return "gray";
    }
};

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
};


function Day({value, ...params}){

    let {day, events, results} = value;
    let {age,active,dependent,final,independent,stats} = results;
    let total = parseInt(active) + parseInt(dependent) + parseInt(final) + parseInt(independent);
    let {mental,physical,behavioural,social} = stats;

    let [waffleData,setWaffle] = React.useState([]);

    return (
      <div className="w-1/2 px-2 mb-4">
          <div className="rounded shadow-sm overflow-hidden px-6 py-4 bg-white" {...params}>
              <div className="mb-2 font-bold">
                  Diary of Day <span className="font-bold text-teal-700">{day}</span>
              </div>
              <div className="flex flex-wrap">
                  <div className="w-1/3 pr-4 text-sm">
                      <div className="text-sm">Average age <span className="font-bold">{Math.floor(age)}</span></div>
                      Events of the day <span className="font-bold">{events.length < 1 ? "none" : (
                      <ul className="pl-6 list-disc text-sm">
                          {events.map(e=>(<li key={e.name} className="font-bold text-teal-700">{Utils.capitalize(e.label)}</li>))}
                      </ul>)}</span>
                  </div>
                  <div className="w-1/3 pr-4 text-sm">
                      <div>Agents' status:</div>
                      <ul className="pl-6 list-disc">
                          <li>Active: <span className="font-bold text-teal-700">{active}</span></li>
                          <li>Independent: <span className="font-bold text-green-700">{independent}</span></li>
                          <li>Dependent: <span className="font-bold text-red-700">{dependent}</span></li>
                          <li>Final: <span className="font-bold text-gray-700">{final}</span></li>
                      </ul>
                  </div>
                  <div className="w-1/3 text-sm">
                      <div>Average Stats</div>
                      <ul className="pl-6 list-disc">
                          {Object.keys(stats).map(k=>(<li key={k}>{Utils.capitalize(k)}: <span className={`font-bold ${statsClass(stats[k])}`}>{stats[k].toPrecision(1)}</span></li>) )}
                      </ul>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default Day;


function Waffle({data}){
    return (
        <ResponsiveWaffle
            data={data}
            total={100}
            rows={18}
            columns={14}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', gamma: [ [ 'darker', 0.3 ] ] }}
            animate={true}
            motionStiffness={90}
            motionDamping={11}
        />
    )
}