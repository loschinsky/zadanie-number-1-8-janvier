import React from "react";
import MakeUsers from "./users";
import UserPage from "./userPage";
import { useParams } from "react-router-dom";
const CompWhoChooseWhatToShow = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage userId={userId} /> : <MakeUsers />}</>;
};

export default CompWhoChooseWhatToShow;
