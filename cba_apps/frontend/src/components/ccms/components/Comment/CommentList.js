import React, { useState, Fragment } from "react";

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
        marginRight: "12px"
    };

    const dateCommentStyle = {
        fontSize: "12px",
        marginTop: "6px",
        marginLeft: "5px"
    };

    const displayComment = comment_list =>
        comment_list.map(comment => (
            <div key={comment.id}>
                <p style={commentBoxStyle}>
                    <a href="" style={{ color: "blue", fontWeight: "bold" }}>
                        {comment.contributor.username}
                    </a>
                </p>
                <p style={commentBoxStyle}>
                    <i>{comment.ccms_status_during_comment}</i> :{" "}
                    <strong
                        value="comment_detail"
                        onMouseEnter={e => setToolView(console.log(e.target))}
                    >
                        {comment.entry}{" "}
                        {showEdit ? <i className="fas fa-edit"></i> : null}
                    </strong>
                </p>
                <p style={dateCommentStyle}>
                    date posted: {comment.comment_entry_date}
                </p>
            </div>
        ));

    if (props.comments.length > 5 && !showAll) {
        return (
            <Fragment>
                <p
                    style={{
                        fontSize: "12px",
                        color: "blue",
                        cursor: "pointer"
                    }}
                    onClick={() => setView(!showAll)}
                >
                    show all...
                </p>
                {displayComment(comment_list)}
            </Fragment>
        );
    }

    return (
        <Fragment>
            <p
                style={{
                    fontSize: "12px",
                    color: "blue",
                    cursor: "pointer"
                }}
                onClick={() => setView(!showAll)}
            >
                Hide...
            </p>
            {displayComment(props.comments)}
        </Fragment>
    );
};

export default CommentList;
