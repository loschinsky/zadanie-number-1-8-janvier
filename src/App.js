import React, { useState, useEffect } from "react";
import api from "./api";
import MakeUsers from "./components/users";

function App() {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookmark = (userId) => {
        const newUsers = users.map((user) =>
            user._id === userId ? { ...user, bookmark: !user.bookmark } : user
        );
        setUsers(newUsers);
    };
    if (users) {
        return (<>
            <MakeUsers
                users={users}
                onHandleDelete={handleDelete}
                onHandleToggleBookmark={handleToggleBookmark}
            />
        </>); };
    return "Загрузка...";
}

export default App;
