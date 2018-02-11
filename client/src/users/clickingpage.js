import React from "react";

class Clicker extends React.Component {
    state = { clicked: "", passwordInput: "", message: "" };
  
    handleUsernameChange = e => {
      this.setState({
        clicked: e.target.value
      });
    };
  
    handlePasswordChange = e => {
      this.setState({
        passwordInput: e.target.value
      });
    };
  
    submitForm = e => {
      e.preventDefault();
      const { clicked, passwordInput } = this.state;
  
      if (clicked.length < 3) {
        this.setState({
          message: "Username length must be at least 3 "
        });
        return;
      }
      axios
        .post("/users/login", {
          username: this.state.clicked,
          password: this.state.passwordInput
        } )
        .then(res => {
          this.props.history.push(`/users/${this.state.clicked}/edit`);
          //    /users/test1/edit
          //this.props.history.push(`/users/${this.state.newName}/edit`);
  
  
          this.setState({ clicked: "", passwordInput: "", message: `Logged In: " ${this.state.clicked} "` });
          
        })
      //return axios.get("/users/new") // WRONG
       
  
        .catch(err => {
          alert('nope!!!!' + err);
          this.setState({ clicked: "", passwordInput: "", message: `Error Logging in user: "${this.state.clicked}"` });
        });
  
       
        
    };
  
    render() {
      const { clicked, passwordInput, message } = this.state;
      return (
        <div>
          <h1> Log-IN! </h1>
  
          <form onSubmit={this.submitForm}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={clicked}
                onChange={this.handleUsernameChange}
              />
            </label>
  
            <label>
              Password:
              <input
                type="password"
                name="username"
                value={passwordInput}
                onChange={this.handlePasswordChange}
              />
            </label>
  
            <input type="submit" value="Submit" />
          </form>
          <p>{message}</p>
        </div>
      );
    }
  }

  export default Clicker;