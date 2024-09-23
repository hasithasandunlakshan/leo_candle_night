"use client"
import axios from "axios"
import React from "react"

export default function UserDetailsPage() {
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        phoneNumber: "", 
        faculty: "", 
        indexNumber: "", 
    });


    const onSave = async () => {
        try {
           
            const response = await axios.post("/api/userDetails/setUserDetails",user);
            console.log("data are",response.data);
        } catch (error) {
            alert("ERROR")
            console.log(error);
        }
    }

    return(
        <div>
            <h1>User Details</h1>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
            </div>
            <div>
                <label htmlFor="faculty">Faculty</label>
                <input type="text" id="faculty" value={user.faculty} onChange={(e) => setUser({ ...user, faculty: e.target.value })} />
            </div>
            <div>
                <label htmlFor="indexNumber">Index Number</label>
                <input type="text" id="indexNumber" value={user.indexNumber} onChange={(e) => setUser({ ...user, indexNumber: e.target.value })} />
            </div>
            <button
                onClick={onSave}
            >
                Save
                
            </button>
        </div>
    )
}    