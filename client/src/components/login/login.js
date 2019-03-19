import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/login.action";

class Login extends Component {
  constructor() {
    super();
  }

  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    let loggedIn = localStorage.getItem("kanboarding");
    if (loggedIn) {
      this.props.history.push("/boards");
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let { email, password } = this.state;
    let payload = { email, password };
    this.props.loginUser(payload);
  };

  render() {
    let { email, password } = this.state;
    let { error, loading } = this.props;

    return (
      <div className="form-wrapper">
        <form className="form-wrapper__form" onSubmit={this.handleSubmit}>
          {error && (
            <aside className="form-wrapper__error">
              <p>{error}</p>
            </aside>
          )}
          <h2>Login To Your Account</h2>
          <fieldset disabled={loading} className="form-wrapper__fieldset">
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={this.handleChange} required />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={this.handleChange} required />
            </div>

            <button className="btn btn--primary" type="submit">
              Log{loading ? "ging in..." : "in"}
            </button>
            <span>
              No account? <Link to="/signup">register a new account</Link>
            </span>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(loginUser(payload))
});

const mapStateToProps = state => ({
  loading: state.login.loading,
  error: state.login.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
