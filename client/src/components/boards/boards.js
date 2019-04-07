import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserBoard, createUserBoard, deleteUserBoard } from "../../actions/board.action";
import { logoutUser } from "../../actions/login.action";
import Nav from "../navigation/nav";
import Loader from "../loader";
import "./boards.scss";

class Boards extends Component {
  state = {
    name: "",
    formOpen: false,
    errorOpen: false
  };
  componentDidMount() {
    let loggedIn = localStorage.getItem("kanboarding");
    if (!loggedIn) {
      return this.props.history.push("/login");
    }

    this.props.getUserBoards();
  }

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  createBoard = e => {
    e.preventDefault();

    this.props.createUserBoard({ name: this.state.name });
    this.setState({ name: "", formOpen: false });
  };

  handleClick = boardId => {
    this.props.history.push(`/boards/${boardId}`);
  };

  toggleOpen = () => {
    this.setState(state => ({
      formOpen: !state.formOpen
    }));
  };

  toggleError = () => {
    this.timeout = setTimeout(() => {
      this.setState({
        errorOpen: false
      });
    }, 5000);
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
    let { userBoards, loading, error, getBoards } = this.props;
    let { name, formOpen, errorOpen } = this.state;

    if (error == "You need to login") {
      this.props.logoutUser();
    }

    return (
      <div className="board">
        <Nav />

        {errorOpen && error && (
          <aside className="board__error">
            <p>{error}</p>
          </aside>
        )}

        <section className="board__content">
          <header>Personal Boards</header>

          <aside>
            {!getBoards && (
              <>
                {userBoards.map(board => (
                  <span className="board__card" key={board._id}>
                    <span onClick={() => this.handleClick(board._id)}>{board.name}</span>
                    <span className="board__card--delete" onClick={() => this.props.deleteUserBoard(board._id)}>
                      Delete
                    </span>
                  </span>
                ))}

                {formOpen ? (
                  <span className="board__card board__card--form">
                    <form onSubmit={this.createBoard}>
                      <textarea value={name} onChange={this.handleChange} autoFocus />
                      <button type="submit">Create Board</button>
                      <button onClick={this.toggleOpen}>Cancel</button>
                    </form>
                  </span>
                ) : (
                  <span className="board__card" onClick={this.toggleOpen}>
                    Create a board
                  </span>
                )}
              </>
            )}

            {loading && (
              <div className="loading">
                <span className="loading__content">
                  <Loader />
                </span>
              </div>
            )}
          </aside>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  getUserBoards: () => dispatch(getUserBoard()),
  createUserBoard: details => dispatch(createUserBoard(details)),
  deleteUserBoard: boardId => dispatch(deleteUserBoard(boardId))
});

const mapStateToProps = state => ({
  userBoards: state.dashboard.boards,
  loading: state.dashboard.loading,
  error: state.dashboard.error,
  getBoards: state.dashboard.getBoards
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Boards);
