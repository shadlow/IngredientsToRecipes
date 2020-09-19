import React, { Component } from 'react'
import '../assets/css/signin.css'




export class SignIn extends Component {
	render() {
		return (
			<div style={{ padding: '30px' }}>
				<img style={{padding: '20px',width:'100%'}} src="https://d2guulkeunn7d8.cloudfront.net/assets/beetstrap/brand/logo@3x-c01b12eeb889d8665611740b281d76fa1cf88d06bcbd8a50dbcae6baecdbe9da.png"></img>
				<h1 style={{ fontWeight: 600, paddingBottom:'30px' }}>Log into Instacart Below</h1>
				<div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
					<input className="input100" type="email" id="#email" name="email" placeholder="Email"></input>
					<span className="focus-input100"></span>
					<span className="symbol-input100">
						<i className="fa fa-envelope" aria-hidden="true"></i>
					</span>
				</div>

				<div className="wrap-input100 validate-input" data-validate="Password is required">
					<input className="input100" type="password" id="#password" name="password" placeholder="Password"></input>
					<span className="focus-input100"></span>
					<span className="symbol-input100">
						<i className="fa fa-lock" aria-hidden="true"></i>
					</span>
				</div>

				<div className="container-login100-form-btn">
					<button onClick={() => this.props.login()} className="login100-form-btn">
						Login
						</button>
				</div>


				<div style={{paddingTop:'20px'}} className="text-center">
					<a className="txt2" href="https://instacart.ca/">
						Create your Account
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
					</a>
				</div>


			</div>
		)
	}
}

export default SignIn
