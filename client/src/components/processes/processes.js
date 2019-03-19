import React, { Component } from "react";
import { connect } from "react-redux";
import { getBoard, modifyUserBoard } from "../../actions/board.action";
import { createUserProcess, modifyUserProcess } from "../../actions/process.action";
import { createUserTask, deleteUserTask, editUserTask } from "../../actions/task.action";
import CreateTask from "../tasks/createTask";
import ProcessNav from "./process-nav";
import Nav from "../navigation/nav";
import Loader from "../loader";
import "./processes.scss";

class Processes extends Component {
  state = {
    title: "",
    name: this.props.board.name,
    task: "",
    updateBoardOpen: false,
    createProcessOpen: false,
    errorOpen: false
  };

  boardId = this.props.match.params.boardId;

  componentDidMount = () => {
    let loggedIn = localStorage.getItem("kanboarding");
    if (!loggedIn) {
      return this.props.history.push("/login");
    }

    this.props.getBoard(this.boardId);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createProcess = e => {
    e.preventDefault();

    this.props.createUserProcess({ title: this.state.title }, this.boardId);
    this.toggleCreateProcess();
  };

  updateBoard = e => {
    e.preventDefault();

    this.props.modifyUserBoard({ name: this.state.name }, this.boardId);
    this.toggleUpdateBoard();
  };

  createTask = (e, processId) => {
    e.preventDefault();

    this.props.createUserTask({ task: this.state.task }, processId);
    this.toggleCreateTask();
  };

  toggleUpdateBoard = () => {
    this.setState(state => ({
      updateBoardOpen: !state.updateBoardOpen,
      name: ""
    }));
  };

  toggleCreateProcess = () => {
    this.setState(state => ({
      createProcessOpen: !state.createProcessOpen,
      title: ""
    }));
  };

  onDragStart = (event, taskId) => {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text", taskId);
  };

  onDragOver = event => {
    event.preventDefault();
  };

  onDrop = (event, processId) => {
    event.preventDefault();

    let taskId = event.dataTransfer.getData("text");
    this.props.editUserTask(processId, taskId);
  };

  toggleError = () => {
    this.timeout = setTimeout(() => {
      this.setState({
        errorOpen: false
      });
    }, 3000);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== this.props.error) {
      this.setState(
        {
          errorOpen: true
        },
        () => this.toggleError()
      );
    }
  }

  render() {
    let { board, loading, error, gettingBoard } = this.props;
    let { title, name, updateBoardOpen, createProcessOpen, errorOpen } = this.state;

    return (
      <div className="process">
        <Nav />

        {errorOpen && (
          <aside className="board__error">
            <p>{error}</p>
          </aside>
        )}

        <section className="process__content">
          {!gettingBoard && (
            <header>
              {board.name}
              {updateBoardOpen ? (
                <form>
                  <input type="text" value={name} onChange={this.handleChange} name="name" required autoFocus />
                  <button type="submit" onClick={this.updateBoard}>
                    Update name
                  </button>
                  <button onClick={this.toggleUpdateBoard}>Cancel</button>
                </form>
              ) : (
                <span onClick={this.toggleUpdateBoard}>edit</span>
              )}
            </header>
          )}

          <div>
            {!gettingBoard && (
              <>
                {board.processes &&
                  board.processes.map(process => (
                    <div className="process__card" key={process._id} onDrop={e => this.onDrop(e, process._id)} onDragOver={this.onDragOver}>
                      <aside>
                        <ProcessNav process={process} board={this.boardId} />

                        {process.tasks.map(eachTask => (
                          <aside className="card__list" key={eachTask._id} draggable onDragStart={e => this.onDragStart(e, eachTask._id)}>
                            <span>{eachTask.task}</span>
                            <span onClick={() => this.props.deleteUserTask(process._id, eachTask._id)}>Delete</span>
                          </aside>
                        ))}
                      </aside>

                      <CreateTask process={process} />
                    </div>
                  ))}

                <div className="process__card">
                  {createProcessOpen ? (
                    <form onSubmit={this.createProcess}>
                      <input type="text" value={title} onChange={this.handleChange} name="title" required autoFocus />
                      <button type="submit">Create Process</button>
                      <button onClick={this.toggleCreateProcess}>Cancel</button>
                    </form>
                  ) : (
                    <p onClick={this.toggleCreateProcess}>create process</p>
                  )}
                </div>
              </>
            )}
            <div className="process__card process__card--transparent">{loading && <Loader />}</div>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getBoard: boardId => dispatch(getBoard(boardId)),
  modifyUserBoard: (details, boardId) => dispatch(modifyUserBoard(details, boardId)),
  createUserProcess: (details, boardId) => dispatch(createUserProcess(details, boardId)),
  modifyUserProcess: (details, processId) => dispatch(modifyUserProcess(details, processId)),
  createUserTask: (task, processId) => dispatch(createUserTask(task, processId)),
  deleteUserTask: (processId, taskId) => dispatch(deleteUserTask(processId, taskId)),
  editUserTask: (processId, taskId) => dispatch(editUserTask(processId, taskId))
});

const mapStateToProps = state => ({
  board: state.dashboard.particularBoard,
  loading: state.dashboard.loading,
  error: state.dashboard.error,
  gettingBoard: state.dashboard.getBoard
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Processes);
