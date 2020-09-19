import React, { Component } from 'react'
//import ReactTypingEffect from 'react-typing-effect';
import logo from './logo.svg';
import SignIn from "./SignIn.js/index.js"
import _ from 'lodash'
import animationData from './food.json'
import { Header, Icon, Image, Menu, Segment, Sidebar, Sticky, Grid } from 'semantic-ui-react'
import Lottie from 'react-lottie'
import './assets/css/qweb.css';
import './assets/css/bootstrap.min.css';
import './assets/css/font-awesome.css';
import Slider from "react-slick";
//import "./slick-carousel/slick/slick.css"; 
//import "./slick-carousel/slick/slick-theme.css";
import food from "./assets/images/food.jpg";
import SliderRecipe from "./SliderRecipe.js"
import { HeartSpinner } from 'react-spinners-kit'
import ProteinRecipe from "./SliderRecipe.js"
import NavBar from "./NavBar.js"
import axios from 'axios';
import recipes from '../test_recipes.js'
import Footer from './Footer'
import Welcome from './Welcome'
import Steps from './Steps'
import Sliders from './Sliders'
import Cart from './Cart'
import RecipeSearch from './Search'


class Home extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            value: '',

        }

        this.handlePageLoad();
    }





    componentDidMount() {
        this.setState({
            isLoading: false,

            filtered: this.state.category1,
            cart: []
        });
    }



    handleSearchSubmit() {
        //Define Query - call this method on submit of search function.
        //Probably have to refresh page to reload results unless we can avoid that somehow

        var raw = JSON.stringify({ "query": this.state.query });
        console.log(this.state.query)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://meal-planner-qhacks-2020.appspot.com/get-recipe-details", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);

                var json = JSON.parse(result);

                this.setState({
                    filtered: json
                })
                console.log(this.state.filtered)
            })
            .catch(error => console.log('error', error));

    }


    handlePageLoad(event) {

        
    }


    render() {
        const { value, results, filtered } = this.state

        const settings = {
            dots: true,
            infinite: true,
            arrows: true,
            speed: 500,

            autoplaySpeed: 100,
            slidesToShow: 3,
            slidesToScroll: 1
        };

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        const { isLoading } = this.state;
        return (
            isLoading ? <Lottie options={defaultOptions}
                height={400}
                width={400}
            /> :
                <div >

                    <NavBar style={{ position: 'fixed' }}  sidebar={this.setVisible} cart={this.props.cart} />
                    <Sidebar.Pushable as={Segment} >
                        <Sidebar className="overlay"
                            as={Menu}
                            style={{ backgroundColor: 'white' }}
                            animation='overlay'
                            icon='labeled'
                            direction='right'
                            inverted
                            onHide={() => this.setVisible(false)}
                            vertical
                            visible={this.state.visible}
                            width='wide'
                        >
                            <Menu.Item style={{ color: 'black' }}>
                                <h1 style={{ fontWeight: 600, textAlign: '' }}>Recipes       <i className="fa fa-long-arrow-right"></i>   Groceries</h1>
                            </Menu.Item>
                            <Cart callback={this.removeFromCart} cart={this.state.cart} />
                            <Menu.Item as='a' style={{ color: 'black' }} onClick={() => this.setVisible(false)}>
                                <i className="fa fa-times" style={{ fontSize: '30px', color: 'rgb(255, 255, 255)' }}></i>

                                close
                        </Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher style={{ padding: '0' }}>
                            <Segment basic>
                                <div className="">
                                    

                                    
                                    <Lottie options={defaultOptions}
                                        height={550}
                                        width={700}
                                        sStopped={this.state.isStopped}
                                        isPaused={this.state.isPaused}
                                    />

                                    <RecipeSearch/>

                                   
                                    <Footer />
                                </div>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div>
        );

    }
}

export default Home;
