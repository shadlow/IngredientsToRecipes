import React, { Component } from 'react'

import { Search, Label, Button } from 'semantic-ui-react'
import { Link,  } from "react-router-dom";
import logo from './leaf.svg'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Sample from "./Login"
import pantryIcon from '../assets/images/garlic.png'
import pantryIcon2 from '../assets/images/shopcart.png'
import searchIcon from '../assets/images/search.png'
import pantryIconHover2 from '../assets/images/shopcart-hover.png'
import Recipe from './Recipe';

const resultRenderer = ({ title }) => <Label content={title} />
const initialState = { isLoading: false, cart: [], results: [], value: '' }

resultRenderer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}


export class NavBar extends Component {
    state = {
        animation: 'overlay',
        direction: 'right',
        dimmed: true,
        visible: false,
    }

    constructor(props) {
        super(props);
        this.childLook = React.createRef();
        this.handleRewriteHistory = this.handleRewriteHistory.bind(this);
        this.state = {
            initialState,
            isLoading: false,
            signButton: <></>,
            value: ''
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
    }

    handleResultSelect = (e, { result }) => {

        this.setState({ value: result.title })

    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = (result) => re.test(result.title)
        this.setState({
            isLoading: false,
            filtered: this.state.filtered,
            value: value
        })


    }

    handleRewriteHistory(childHistory) {
        const fieldEditor = this.childLook.current;

        this.setState({ history: childHistory })
    }

    handleAnimationChange = (animation) => () =>
        this.setState((prevState) => ({ animation, visible: !prevState.visible }))

    render() {
        if (!this.props.loggedIn) {
            this.state.signButton = <li><a onClick={() => this.props.sidebar2(true)}><img className="navIcon" style={{paddingTop:'5px',width:'24px', height:'auto'}} src={pantryIcon}></img></a></li>;

        } else {
            this.state.signButton = <li><a onClick={() => this.props.sidebar2(true)}><img className="navIcon" style={{paddingTop:'5px',width:'24px', height:'auto'}} src={pantryIcon}></img></a></li>;

           // this.state.signButton = <li><a onClick={() => this.props.sidebar2(true)}><i className="fa fa-user" style={{ marginTop:'4px',fontSize: '30px', marginTop: '2px', color: 'rgb(91, 206, 56)' }}></i></a></li>;
        }

        return (

            <div>
                <header className="header-area header-sticky">


                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                <div className="container">


                                    <a href="#" className="logo" style={{ color: 'black' }}>

                                        <h2 style={{ color:'rgb(10, 10, 10)',fontSize: '18px', fontWeight: '600', marginTop: '0px', letterSpacing: '0' }}> Fiscal Fresh<h4 style={{ color:'rgb(10, 10, 10)',fontSize: '14px', fontWeight: '400', marginTop: '0px', letterSpacing: '0' }}> ALPHA v0.2</h4></h2>
                                        

                                    </a>
                                    
                                            
                                    
                                    <ul className="nav">
                                    <li><a href="#search"><img className="navIcon" style={{paddingTop:'5px',width:'24px', height:'auto'}} src={searchIcon}></img></a></li>
                                    <li><a><hr style={{ width: '1px', marginTop: '1px', height: '100%', backgroundColor: 'lightGrey' }}></hr></a></li>

                                        {/*<li><Sample ref={this.childLook} onChange={this.handleRewriteHistory.bind(this)}></Sample></li>*/}
                                        {this.state.signButton}
                                        <li><a><hr style={{ width: '1px', marginTop: '1px', height: '100%', backgroundColor: 'lightGrey' }}></hr></a></li>
                                        <li><a onClick={() => this.props.sidebar(true)}><img className="navIcon" style={{paddingTop:'5px',width:'24px', height:'auto'}} src={pantryIcon2}></img></a></li>
                                        {/*<li><a onClick={() => this.props.sidebar(true)}><i className="fa fa-shopping-cart" style={{ fontSize: '30px', marginTop: '2px', color: 'rgb(91, 206, 56)' }}></i></a></li>*/}

                                        {/*<li><a className="main-button-slider">{this.props.cart.length != 0 ? this.props.cart.length : 0}</a></li>*/}

                                    </ul>
                                    

                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default NavBar



