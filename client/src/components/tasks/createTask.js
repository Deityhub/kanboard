import React, { Component } from "react";
import { connect } from "react-redux";
import { createUserTask } from "../../actions/task.action";

class CreateTask extends Component {
  state = {
    createTaskOpen: false,
    task: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleCreateTask = () => {
    this.setState(state => ({
      createTaskOpen: !state.createTaskOpen,
      task: ""
    }));
  };

  createTask = (e, processId) => {
    e.preventDefault();

    this.props.createUserTask({ task: this.state.task }, processId);
    this.toggleCreateTask();
  };

  render() {
    let { task, createTaskOpen } = this.state;
    let { process } = this.props;

    return (
      <aside className="card__add">
        {createTaskOpen ? (
          <form onSubmit={e => this.createTask(e, process._id)}>
            <textarea value={task} onChange={this.handleChange} name="task" required autoFocus />
            <button type="submit">Create</button>
            <button onClick={this.toggleCreateTask}>Cancel</button>
          </form>
        ) : (
          <span onClick={this.toggleCreateTask}>Add a Task</span>
        )}
      </aside>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createUserTask: (task, processId) => dispatch(createUserTask(task, processId))
});

export default connect(
  null,
  mapDispatchToProps
)(CreateTask);
