import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'
import {store} from 'react-notifications-component'
import image from '../assets/images/food.jpg'

export class Recipe extends Component {
    render() {
        
        return (
            <div>
                <div style={{backgroundImage: `url(${image})`}} className="welcome-area" id="welcome">
                    <div className="header-text">
                        <div className="container">
                            <div className="row home-features" >
                                <div className="offset-xl-1 col-xl-12 offset-lg-2 col-lg-12 col-md-12 col-sm-12">
                                    <h1 style={{ fontWeight: 600, textAlign: 'left' }}>{this.props.location.state.title}</h1>
                                    <h4 className="compress">{this.props.location.state.desc}</h4>
                                    <div style={{ paddingBottom: '20px' }}>
                                    <Button  style={{backgroundColor:'#6cd34c',color:'white'}} className="main-button-slider" onClick={() => this.props.sidebar(true)}>SIGN IN</Button>
                                    </div>
                                    {//<a href="./sponsor.js" className="main-button-donate">Sponsor Us</a>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div style={{backgroundImage: 'none'}} className="welcome-area" id="welcome">
                    <div className="header-text">
                        <div className="container">
                            <div className="row " >
                                <div className="offset-xl-1 col-xl-12 offset-lg-2 col-lg-12 col-md-12 col-sm-12">
                                    <h1 style={{ fontWeight: 600, textAlign: 'left' }}>Test</h1>
                                    <h4 className="compress">Browse your favourite recipes by cusine, meal type, various diets. Find some you like, add to cart and we will order the groceries you need.</h4>
                                    <div style={{ paddingBottom: '20px' }}>
                                    <Button  style={{backgroundColor:'#6cd34c',color:'white'}} className="main-button-slider" onClick={() => this.props.sidebar(true)}>SIGN IN</Button>
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

export default Recipe
