import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../../actions/login.action";

class Nav extends Component {
  componentDidMount() {
    let loggedIn = localStorage.getItem("kanboarding");
    if (!loggedIn) {
      return this.props.history.push("/login");
    }

    this.props.getUser();
  }

  render() {
    let { user, loading, logoutUser } = this.props;

    return (
      <>
        <nav className="nav nav--top">
          <div className="nav__logo">
            <Link to="/boards">#Kanboard</Link>
          </div>
          {(user.name || user.username) && (
            <div className="nav__user">
              <span>Welcome {user.name || user.username}!</span>
              <span onClick={() => logoutUser()}>log{loading ? "ging out..." : "out"}</span>
            </div>
          )}
        </nav>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  getUser: () => dispatch(getUser())
});

const mapStateToProps = state => ({
  user: state.login.user,
  loading: state.login.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Nav));
