import React from "react";

const CommentList = props => {
    const commentBoxStyle = {
        backgroundColor: "white",
        color: "black",
        display: "inline",
        paddingLeft: "10px",
        paddingRight: "10px",
        borderRadius: "25px",
        paddingTop: "3px",
        paddingBottom: "3px",
        fontSize: "15px"
    };

    const dateCommentStyle = {
        fontSize: "12px",
        marginTop: "6px",
        marginLeft: "5px"
    };

    return (props.comments || []).map(comment => (
        <div key={comment.id}>
            <p style={commentBoxStyle}>
                <a href="" style={{ color: "blue", fontWeight: "bold" }}>
                    {comment.contributor.username}
                </a>
                : {comment.entry}
            </p>
            <p style={dateCommentStyle}>
                date posted: {comment.comment_entry_date}
            </p>
        </div>
    ));
};

export default CommentList;
