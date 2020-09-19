import React from "react";
import ReactModalLogin from "react-modal-login";
import {Button} from 'semantic-ui-react'
export default class Sample extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      showModal: false,
      loading: false,
      error: null,
      history:[]
    };
  }
 
  openModal() {
    this.setState({
      showModal: true
    });
  }
 
  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });
  }

  onLogin() {
    console.log('email: ' + document.querySelector('#email').value);
    console.log('password: ' + document.querySelector('#password').value);
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"email":document.querySelector('#email').value,"password":document.querySelector('#password').value});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/login", requestOptions)
    .then((response) => {
        console.log(response)
        if (!response.ok) {
            this.onLoginFail()
        }
        else {
            this.onLoginSuccess()
        }
    })
    .then(result => console.log(result))
    .catch(error => {console.log('error', error)});

  }
 
  onLoginSuccess(method, response) {
    console.log("logged successfully with " + method);
    this.closeModal();

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
      fetch("/recipe_history", requestOptions)
          .then(response => response.text())
          .then(result =>{
              var json = JSON.parse(result);    

              this.setState({
                  history: json
          });
          this.props.onChange(json)
        })
    
    this.setState({
      loggedIn: method,
      loading: false
    })
  } 

  onLoginFail(method, response) {
    console.log("logging failed with " + method);
    this.setState({
        loading: false,
        error: response
      })
  }
 
  startLoading() {
    this.setState({
      loading: true
    });
  }
 
  finishLoading() {
    this.setState({
      loading: false
    });
  }
 
  afterTabsChange() {
    this.setState({
      error: null
    });
  }
 
  render() {
    return (
      <div>
        <Button  style={{backgroundColor:'#6cd34c',color:'white'}} className="main-button-slider" onClick={() => this.openModal()}>SIGN IN</Button>
        
        <ReactModalLogin
          visible={this.state.showModal}
          onCloseModal={this.closeModal.bind(this)}
          loading={this.state.loading}
          error={this.state.error}
          
          tabs={{
            afterChange: this.afterTabsChange.bind(this)
          }}
          loginError={{
            label: "Couldn't sign in, please try again."
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}

          form={{
            onLogin: this.onLogin.bind(this),
            loginBtn: {
              label: "Sign in"
            },
            loginInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Password',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Password',
              }
            ],
            registerInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Password',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Password',
              }
            ],
          }}
        />
      </div>
    );
  }
}