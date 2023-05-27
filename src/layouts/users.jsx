import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";

import UserListPageEdit from "../components/page/userListPageEdit/userListPageEdit";

import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    const currentUserId = useSelector(getCurrentUserId());
    return (
        <>
            {" "}
            <UsersLoader>
                {userId ? (
                    edit ? (
                        userId === currentUserId ? (
                            <UserListPageEdit />
                        ) : (
                            <Redirect to={`/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UsersLoader>
        </>
    );
};

export default Users;
