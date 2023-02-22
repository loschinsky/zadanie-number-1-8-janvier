import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";
import UserListPageEdit from "../components/page/userListPageEdit/userListPageEdit";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    console.log(edit);
    return (
        <>
            {userId ? (
                edit ? (
                    <UserListPageEdit />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
