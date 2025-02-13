"use client"
import axios from "axios"
import React, { useEffect, useState } from "react"

export default function UserDetailsPage() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phoneNumber: "", 
        faculty: "", 
        indexNumber: "", 
    });
    
    const [userCount, setUserCount] = useState(0);

    const onSave = async () => {
        try {
            const response = await axios.post("/api/userDetails/setUserDetails", user);
            //console.log("Data saved successfully:", response.data);
        } catch (error) {
            console.error("Error saving user details:", error);
            alert("An error occurred while saving user details.");
        }
    };

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const response = await axios.get("/api/userDetails/getUserCount");
                //console.log("User count:", response.data.count);
                setUserCount(response.data.count); // assuming response contains { count: number }
            } catch (error) {
                console.error("Error fetching user count:", error);
                alert("An error occurred while fetching user count.");
            }
        };
        fetchUserCount();
    }, []);

    return (
        <div>
            <h1>User Count: {userCount}</h1>
            <h1>User Details</h1>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    id="phone"
                    value={user.phoneNumber}
                    onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="faculty">Faculty</label>
                <input
                    type="text"
                    id="faculty"
                    value={user.faculty}
                    onChange={(e) => setUser({ ...user, faculty: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="indexNumber">Index Number</label>
                <input
                    type="text"
                    id="indexNumber"
                    value={user.indexNumber}
                    onChange={(e) => setUser({ ...user, indexNumber: e.target.value })}
                />
            </div>
            <button onClick={onSave}>Save</button>
        </div>
    );
}
