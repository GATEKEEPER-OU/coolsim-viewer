import Agent from "./agent.js";
import React from "react";
import '../styles/tailwind.css';

// async function getLogs(a) {
//     try {
//         let logs = await a.logs();
//         console.log("awaiting logs ",logs);
//     }catch (err){
//         console.error(err);
//     }
// }

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
    let [age,setAge] = React.useState(()=>{return null});

    React.useEffect(()=>{
        let a = new Agent();
        a.description().then( response => {
            if(description){return}
            if(!response){return}
            console.log("------",response);
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

            let age = description.dob.age;
            setAge(age);

            let gender = description.gender;
            setGender(gender);

            let address = Object.values(description.location.street).join(", ");
            address = address.concat(", ",description.location.city);
            address = address.concat(", ",description.location.postcode);
            address = address.concat(", ",description.location.country);
            setAddress(address);
        }
    },[description]);

    function getDescription() {
        console.log("here?");
        let a = new Agent();
        a.description().then( response => {
            if(description){return}
            // console.log("aaaaaaaaa",response);
            if(!response){return}
            // console.log("------",response);
            setDescription(response);
            // console.log("description",description);
        }).catch(
            err=>console.error(err)
        )
    }

    console.log(description);
    return (


        <div className="max-w-sm w-full lg:max-w-full lg:flex shadow-lg rounded">
            { picture ?
                (<div
                    className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                    style={{backgroundImage: "url("+picture.large+")" }}
                    title={{name}} >
                </div>) : ""
            }
            <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    {username ? (
                    <p className="text-sm text-gray-600 flex items-center">
                        @{username}
                    </p>
                    ) : "" }
                    <div className="text-gray-900 font-bold text-xl mb-2">
                         {name || "Loading..."}
                    </div>
                    <div className="text-sm">
                        { (age || gender) ? (
                            <p className="text-gray-600">
                                Gender: {capitalize(gender)}, Age: {age}
                            </p>
                        ): ""}
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
            </div>
        </div>
        )
}


{/*<div className="card" onLoad={getDescription}>*/}
    {/*{picture ? (<img  src={picture.thumbnail}/>) : ""}*/}
    {/*{name || "Loading..."}*/}
    {/*{(phone||cell||email)? (*/}
        {/*<ul>*/}
            {/*<li>Email: {email}</li>*/}
            {/*<li>Phone: {phone}</li>*/}
            {/*<li>Cell: {cell}</li>*/}
        {/*</ul>) : ""}*/}
    {/*{address ? (<p>{address}</p>) : ""}*/}
{/*</div>*/}

export default Description;