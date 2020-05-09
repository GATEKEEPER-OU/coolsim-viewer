import Agent from "./agent.js";
import React from "react";
import State from "./state.js";


function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Description(){
    let [error,setError] = React.useState(false);
    let [description,setDescription] = React.useState(()=>{return null});
    let [name,setName] = React.useState(()=>{return null});
    let [username,setUsername] = React.useState(()=>{return null});
    let [picture,setPicture] = React.useState(()=>{return null});
    let [email,setEmail] = React.useState(()=>{return null});
    let [phone,setPhone] = React.useState(()=>{return null});
    let [cell,setCell] = React.useState(()=>{return null});
    let [address,setAddress] = React.useState(()=>{return null});
    let [gender,setGender] = React.useState(()=>{return null});

    React.useEffect(()=>{
        let a = new Agent();
        a.description().then( response => {
            if(description){return}
            if(!response){return}
            console.log("Description",response);
            setDescription(response);
            // console.log("description",description);
        }).catch(
            err=>{
                console.error(err);
                setError(err);
            }
        );
        if(description) {
            //set name
            let name = description.name.title
                .concat(" ", description.name.first)
                .concat(" ", description.name.last);
            setName(name);

            let username = description.login.username;
            setUsername(username);

            let picture = description.picture;
            setPicture(picture);

            let email = description.email;
            setEmail(email);

            let phone = description.phone;
            setPhone(phone);
            let cell = description.cell;
            setCell(cell);

            let gender = description.gender;
            setGender(gender);

            let address = Object.values(description.location.street).join(", ");
            address = address.concat(", ",description.location.city);
            address = address.concat(", ",description.location.postcode);
            address = address.concat(", ",description.location.country);
            setAddress(address);
        }
    },[description]);

    return (


        <div className="sticky top-0 grid grid-cols-12 gap-4 bg-white shadow p-6"
             style={{borderBottom:"1px solid lightGray"}}>
            {error ? "ERROR: couldn't load anything :(" : (
            <div className="col-span-5"
                style={{textAlign:"right"}}>
                <div className="mb-8">
                    {username ? (
                    <p className="text-sm text-gray-600">
                        @{username}
                    </p>
                    ) : "" }
                    <div className="text-gray-900 font-bold text-xl mb-2">
                         {name || "Loading..."}
                    </div>
                    <div className="text-sm">
                        { (gender) ? (
                            <p>
                                Gender: <span className={`${gender} gender`}>{capitalize(gender)}</span>
                            </p>
                        ): ""}
                        {address ? (
                            <p className="">
                                {capitalize(address)}
                            </p>
                        ) : ""}
                        { (email || phone || cell) ? (
                            <ul style={{marginTop:10}}>
                                { email ? (
                                    <li className="text-gray-900 leading-none">
                                        Email: {email}
                                    </li>
                                    ) : ""}
                                { phone ? (
                                    <li className="text-gray-900 leading-none">
                                        Phone: {phone}
                                    </li>
                                    ) : ""}
                                { cell ? (
                                    <li className="text-gray-900 leading-none">
                                        Cell: {cell}
                                    </li>
                                    ) : ""}
                            </ul>

                        ) : "" }

                    </div>
                </div>
            </div>)}
            { picture ?
                (<div className="col-span-2 flex flex-wrap content-center justify-center h-auto">
                    <div className="container h-32 w-32 rounded-full"
                    style={{
                        backgroundImage: "url("+picture.large+")",
                        backgroundPosition:"center center"
                        }}
                    title={{name}} >
                    </div>
                </div>) : ""
            }
            <State className="col-span-5" />
        </div>
        )
}

export default Description;