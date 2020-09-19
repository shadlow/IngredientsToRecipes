import React, { Component } from 'react'
import '../assets/css/qweb.css'
import PropTypes from 'prop-types'
import Sample from "./Login"
import {Label, Button} from 'semantic-ui-react'

const resultRenderer = ({ title }) => <Label content={title} />

resultRenderer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}


export class Welcome extends Component {
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
            isLoading: false,
            signButton: <></>,
            value: ''
        }
    }

    handleRewriteHistory(childHistory) {
        const fieldEditor = this.childLook.current;

        this.setState({ history: childHistory })
    }

    handleAnimationChange = (animation) => () =>
        this.setState((prevState) => ({ animation, visible: !prevState.visible }))
    render() {
        if (!this.props.loggedIn) {
            this.state.signButton = "PANTRY";
            
        } else {
            this.state.signButton = "FILL PANTRY";
            this.state.extra ="Add spices and common items already in pantry. ";
        }
        return (
            <div>
                <div className="welcome-area" id="welcome">
                    <div className="header-text">
                        <div className="container">
                            <div className="row home-features" >
                                <div className="offset-xl-1 col-xl-12 offset-lg-2 col-lg-12 col-md-12 col-sm-12">
                                    <h1 style={{ fontWeight: 600, textAlign: 'left' }}>Recipes       <i className="fa fa-long-arrow-right"></i>   Groceries</h1>
                                <h4 className="compress">First sign into your Instarcart account. {this.state.extra}Browse your favourite recipes, Find some you like, add to cart and we will order the groceries you need.</h4>
                                    <div style={{ paddingBottom: '20px' }}>
                                    <Button style={{ fontFamily:'Raleway',fontWeight:600,backgroundColor: '#6cd34c', color: 'white' }} className="main-button-slider" onClick={() => this.props.sidebar(true)}>{this.state.signButton}</Button>
                                    
                                    </div>
                                    {//<a href="./sponsor.js" className="main-button-donate">Sponsor Us</a>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome
