import React, { Component } from "react";
import { connect } from "react-redux";
import { modifyUserProcess, deleteUserProcess } from "../../actions/process.action";

class ProcessNav extends Component {
  state = {
    updateProcessOpen: false,
    title: this.props.process.title
  };

  toggleUpdateProcess = () => {
    this.setState(state => ({
      updateProcessOpen: !state.updateProcessOpen,
      title: ""
    }));
  };

  updateProcess = (e, processId) => {
    e.preventDefault();

    this.props.modifyUserProcess({ title: this.state.title }, processId);

    this.toggleUpdateProcess();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let { updateProcessOpen, title } = this.state;
    let { process, board } = this.props;

    return (
      <aside className="card__nav">
        {updateProcessOpen ? (
          <form onSubmit={e => this.updateProcess(e, process._id)}>
            <input type="text" value={title} onChange={this.handleChange} name="title" required autoFocus />
            <button type="submit">update</button>
            <button onClick={this.toggleUpdateProcess}>cancel</button>
          </form>
        ) : (
          <>
            <span>{process.title}</span>
            <aside>
              <span onClick={this.toggleUpdateProcess}>edit</span>
              <span onClick={() => this.props.deleteUserProcess(process._id, board)}>delete</span>
            </aside>
          </>
        )}
      </aside>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  modifyUserProcess: (details, processId) => dispatch(modifyUserProcess(details, processId)),
  deleteUserProcess: (processId, boardId) => dispatch(deleteUserProcess(processId, boardId))
});

export default connect(
  null,
  mapDispatchToProps
)(ProcessNav);
