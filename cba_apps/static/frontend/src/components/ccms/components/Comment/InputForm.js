import React, { Component } from "react";
import { Input } from "reactstrap";

class InputForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            showInput: false,
            entry: props.comment.entry
        };
    }

    handleMouseEnter = () => this.setState({ showEdit: !this.state.showEdit });
    handleMouseLeave = () => this.setState({ showEdit: !this.state.showEdit });

    handleKeyDown = e => {
        if (e.keyCode === 27) {
            this.setState({ showInput: false });
        }
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        if (this.state.showInput) {
            return (
                <input
                    onKeyDown={e => this.handleKeyDown(e)}
                    style={{ border: "none" }}
                    name="entry"
                    value={this.state.entry}
                    onChange={this.handleChange}
                />
            );
        }
        return (
            <strong
                value="comment_detail"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {this.props.comment.entry}{" "}
                {this.state.showEdit ? (
                    <i
                        style={{ cursor: "pointer" }}
                        className="fas fa-edit"
                        onClick={() =>
                            this.setState({ showInput: !this.state.showInput })
                        }
                    ></i>
                ) : null}
            </strong>
        );
    }
}

export default InputForm;
