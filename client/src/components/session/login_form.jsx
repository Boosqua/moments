import React, {useState, useEffect, useCallback}  from 'react';
import { 
   withRouter,
   Link,
   useRouteMatch,
   useHistory
} from "react-router-dom";


class LOL extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the Tweets page
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.currentUser === true) {
//       this.props.history.push('/tweets');
//     }

//     // Set or clear errors
//     this.setState({errors: nextProps.errors})
//   }

  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(user); 
  }

  // Render the session errors if there are any
  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="Username"
              />
            <br/>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
            <br/>
            <input type="submit" value="Submit" />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}
function LoginForm(props){
   let { path, url }  = useRouteMatch()
   const history = useHistory();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const handleInput = (cb) => {
      return (e) => {
         cb(e.currentTarget.value)
      }
   }
   const submit = () => {
      let user = {
         username: username,
         password: password
      }
      props.login(user)
   }
     // Render the session errors if there are any
   // const renderErrors = () => {
   //    return(
   //          <ul>
   //          {Object.keys(this.state.errors).map((error, i) => (
   //             <li key={`error-${i}`}>
   //                {this.state.errors[error]}
   //             </li>
   //          ))}
   //          </ul>
   //       );
   // }

   return (
   <div>
      <p>
         {path === "/login" ? 
            "Welcome Back" : 
            "Register"
         }
      </p>
      <form onSubmit={submit}>
         <div>
            <input type="text"
               value={username}
               onChange={handleInput(setUsername)}
               placeholder="Username"
            />
         <br/>
            <input type="password"
               value={password}
               onChange={handleInput(setPassword)}
               placeholder="Password"
            />
         <br/>
         <input type="submit" value="Submit" />
         {/* {renderErrors()} */}
         </div>
      </form>
   </div>
   );
  
}
export const SessionForm = withRouter(LoginForm)