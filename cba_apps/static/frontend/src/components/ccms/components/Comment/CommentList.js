import React, { useState, Fragment } from "react";
import { Fade } from "reactstrap";
import InputForm from "./InputForm";

const CommentList = props => {
    const [showAll, setView] = useState(false);
    const [showEdit, setToolView] = useState(false);

    let comment_list =
        props.comments.length > 5
            ? props.comments.slice(Math.max(props.comments.length - 5, 1))
            : props.comments;

    const commentBoxStyle = {
        backgroundColor: "white",
        color: "black",
        display: "inline",
        paddingLeft: "10px",
        paddingRight: "10px",
        borderRadius: "25px",
        paddingTop: "3px",
        paddingBottom: "3px",
        fontSize: "15px",
        marginRight: "8px"
    };

    const dateCommentStyle = {
        fontSize: "12px",
        marginTop: "6px",
        marginLeft: "5px"
    };

    const toggleStyle = {
        fontSize: "14px",
        color: "blue",
        cursor: "pointer"
    };

    const handleCommentView = () => setView(!showAll);

    const displayComment = comment_list =>
        comment_list.map(comment => (
            <div key={comment.id}>
                <p style={commentBoxStyle}>
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                        {comment.contributor.fullname}
                    </span>
                </p>
                <p style={commentBoxStyle}>
                    <span>
                        <strong>{comment.ccms_status_during_comment}</strong>:{" "}
                    </span>
                    {/* <InputForm comment={comment} /> */}
                    {comment.entry}
                </p>
                <p style={dateCommentStyle}>
                    date posted: {comment.comment_entry_date}
                </p>
            </div>
        ));

    if (props.comments.length > 5 && !showAll) {
        return (
            <Fragment>
                <p style={toggleStyle} onClick={handleCommentView}>
                    Show all...
                </p>
                {displayComment(comment_list)}
            </Fragment>
        );
    }

    return (
        <Fragment>
            {props.comments.length > 5 ? (
                <p style={toggleStyle} onClick={handleCommentView}>
                    Hide...
                </p>
            ) : null}
            {displayComment(props.comments)}
        </Fragment>
    );
};

const CommentEntry = props => {
    const [showEdit, setToolView] = useState(false);

    return (
        <strong
            value="comment_detail"
            onMouseEnter={() => setToolView(!showEdit)}
            onMouseLeave={() => setToolView(!showEdit)}
        >
            {props.comment.entry}{" "}
            {showEdit ? (
                <i
                    className="fas fa-edit"
                    onClick={() => console.log("clicking")}
                ></i>
            ) : null}
        </strong>
    );
};

export default CommentList;
