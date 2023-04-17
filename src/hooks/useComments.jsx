import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
const CommentsContext = React.createContext();
export const useComments = () => {
    return useContext(CommentsContext);
};
export const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getComments();
    }, [userId]);
    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id
        };
        try {
            const { content } = await commentService.createComment(comment);
            setComments((prevState) => [...prevState, content]);
        } catch {
            errorCatcher(error);
        }
        console.log(comment);
    }
    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId);
            console.log(content);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    async function removeComment(id) {
        try {
            console.log("removeCommentIDDDD", id);
            const { content } = await commentService.removeComment(id);
            console.log(content);
            if (content === null) {
                setComments((prevState) =>
                    prevState.filter((c) => c._id !== id)
                );
            }
        } catch (error) {
            errorCatcher(error);
        }
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(error);
        }
    }, [error]);
    return (
        <CommentsContext.Provider
            value={{ comments, createComment, isLoading, removeComment }}
        >
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
