import React, { useState } from "react";
import api from "./api";
import MakeUsers from "./components/users";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookmark = (userId) => {
        const newUsers = users.map((user) =>
            user._id === userId ? { ...user, bookmark: !user.bookmark } : user
        );
        setUsers(newUsers);
    };

    return (
        <>
            <MakeUsers
                users={users}
                onHandleDelete={handleDelete}
                onHandleToggleBookmark={handleToggleBookmark}
            />
        </>
    );
}

export default App;
