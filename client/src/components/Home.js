import React, { Component } from 'react'
//import ReactTypingEffect from 'react-typing-effect';
import logo from './logo.svg';

import _ from 'lodash'
import { Header, Icon, Button, Menu, Segment, Sidebar, Sticky, Label, Modal, Image, Search} from 'semantic-ui-react'
import Lottie from 'react-lottie'
import '../assets/css/qweb.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/font-awesome.css';
import '../assets/css/signin.css'
import Slider from "react-slick";
//import "./slick-carousel/slick/slick.css"; 
//import "./slick-carousel/slick/slick-theme.css";
import food from "../assets/images/food.jpg";
import SliderRecipe from "./SliderRecipe.js"
import { HeartSpinner } from 'react-spinners-kit'
import ProteinRecipe from "./SliderRecipe.js"
import NavBar from "./NavBar.js"
import axios from 'axios';
import Footer from './Footer'
import Welcome from './Welcome'
import Steps from './Steps'
import Sliders from './Sliders'
import Cart from './Cart'
import { store } from 'react-notifications-component'
import SignIn from './SignIn.js'
import Pantry from './Pantry.js'
import PropTypes from 'prop-types'
import RecipeSearch from './Search.js'

const initialState = { cart: [], results: [], value: '' }

var signIn = <></>;

const resultRenderer = ({ title }) => <Label content={title} />

resultRenderer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}
const source = [{
    "id": "1",
    "title": "Butter Chicken",
    "description": "Lorem Ipsum Dos Color Dit Simit",
    "image": { food },
    "calories": "500"
}];

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}



class Home extends React.Component {

    constructor(props) {
        super(props);
        this.childLook = React.createRef();
        let longRecipes = []
        this.state = {
            open:false,
            isLoading: true,
            modal_trigger: false,
            title:'',
            desc:'',
            image:'',
            isLoading: false,
            pantryItem:'',
            loggedIn: false,
            isStopped: false,
            isPaused: false,
            visibleL: false,
            visibleR: false,
            signIn: <></>,
            cartScreen: <></>,
            search: { longRecipes },
            cart: [],
            pantry: [],
            spices:[{id:"1",title:"Oregano"},{id:"2",title:"Saffron"},{id:"3",title:"Basil"},{id:"4",title:"Rosemary"},{id:"5",title:"Thyme"},{id:"6",title:"Salt"},{id:"7",title:"Pepper"},{id:"8",title:"Chili"},{id:"9",title:"Chili Flakes"},{id:"10",title:"Nutmeg"},{id:"11",title:"Cinnamon"},{id:"12",title:"Butter"},{id:"13",title:"Flour"},{id:"14",title:"Cumin"},{id:"15",title:"Olive Oil"},{id:"16",title:"Curry"},{id:"17",title:"Taragon"},{id:"18",title:"Mint"},{id:"19",title:"Cilantro"},{id:"20",title:"Parsley"},{id:"21",title:"Corriander"},{id:"22",title:"Red Curry Paste"}],
            
            baseUri: "https://spoonacular.com/recipeImages/",
            offset: 0,
            number: 10,
            totalResults: 270817,
            processingTimeMs: 699,
            expires: 1580791459643,
            isStale: false,
            list: [
                {
                    title: "Butter Chicken",
                    desc: "Lorem Ipsum",
                    calories: "500",
                    servings: "4",
                    timeCook: "30"
                },
                {
                    title: "Butter Chicken",
                    desc: "Lorem Ipsum",
                    calories: "500",
                    servings: "4",
                    timeCook: "30"
                },
                {
                    title: "Veggie Pizza",
                    desc: "Lorem Ipsum",
                    calories: "500",
                    servings: "4",
                    timeCook: "30"
                },
                {
                    title: "Butter Chicken",
                    desc: "Lorem Ipsum",
                    calories: "500",
                    servings: "4",
                    timeCook: "30"
                },
                {
                    title: "Thai Red Curry",
                    desc: "Lorem Ipsum",
                    calories: "500",
                    servings: "4",
                    timeCook: "30"
                },
                {
                    title: "Greek Chicken",
                    desc: "Lorem Ipsum",
                    calories: "500",
                    servings: "4",
                    timeCook: "30"
                }
            ],

            filtered: [],
            category1: [],
            category2: [],
            category3: [],
            category4: [],
            history: [],
            searchResult: [
                {extendedIngredients:[]},
            ],
            query: ""

        }


        this.handleChange = this.handleChange.bind(this);
        this.handlePageLoad = this.handlePageLoad.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.removeFromPantry = this.removeFromPantry.bind(this);
        this.setVisibleR = this.setVisibleR.bind(this);
        this.setVisibleL = this.setVisibleL.bind(this);
        this.setLogin = this.setLogin.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLoginFail = this.onLoginFail.bind(this);
        this.handleGetRecipe = this.handleGetRecipe.bind(this);
        this.renderRecipe = this.renderRecipe.bind(this);
        this.addPantry = this.addPantry.bind(this);



        this.handlePageLoad();
    }

    setVisibleR = (toWhat) => {
        this.setState({ visibleR: toWhat })
    }

    setVisibleL = (toWhat) => {
        this.setState({ visibleL: toWhat })
    }



    removeFromCart = (recipe) => {
        let newarr = this.state.cart.filter(a => a !== recipe)
        //this.state.cart = this.state.cart.concat(recipe);
        //this.state.cartLength = this.state.cartLength + 1;
        this.setState({ cart: newarr })
    }

    removeFromPantry = (pantryItem) => {
        let newarr = this.state.pantry.filter(a => a !== pantryItem)
        
        this.setState({ pantry: newarr, spices:this.state.spices.concat(pantryItem) })

        store.addNotification({
            title: 'Ingredient Removed',
            message: 'Removed ' + pantryItem,
            type: 'danger',                         // 'default', 'success', 'info', 'warning'
            container: 'bottom-center',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
                duration: 3000
            }
        })
    }





    componentDidMount() {
        this.setState({
            isLoading: false,

            filtered: this.state.spices,
            cart: []
        });
    }

    renderRecipe(recipe){
        
        this.setState({title:recipe.title, desc:recipe.desc, image: this.state.baseUri+''+recipe.imageUrls})
        this.setState({modal_trigger:true})
    }


    handleAddToCart(item) {
        // user must have already signed in
        // would be good to prompt if they haven't

        // add the recipe to cart
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(item);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var requestOptions2 = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("/add-to-cart", requestOptions)
            .then(response => response.text())
            .then(result => {
                fetch("/recipe_history", requestOptions2)
                    .then(response => response.text())
                    .then(result => {
                        var json = JSON.parse(result);

                        this.setState({
                            history: json
                        })
                    })
            })
            .catch(error => { console.log('error', error) }); //if there are errors, its probably because the user hasn't signed in


    }



    addToCart = (recipe) => {

        store.addNotification({
            title: 'Recipe Added',
            message: 'Added ' + recipe.title,
            type: 'success',                         // 'default', 'success', 'info', 'warning'
            container: 'bottom-center',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
                duration: 3000
            }
        })
        //this.state.cart = this.state.cart.concat(recipe);
        //this.state.cartLength = this.state.cartLength + 1;

        this.setState({ cart: this.state.cart.concat(recipe) })
        this.handleAddToCart(recipe);
    }



    handleChange(e) {

        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.category1;



            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.state.list;
        }
        // Set the filtered state based on what our rules added to newList
        
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.title)

            this.setState({
                isLoading: false,
                
                filtered: _.filter(this.state.spices, isMatch),
            })
        }, 300)


    }

    handleGetRecipe(item) {
        // HEY BRIGGS!!! This method gets the recipe instructions when someone clicks on the recipe image if you want to display it somehow

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "id": item['id'] });


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("/get-recipe-details", requestOptions)
            .then(response => response.text())
            .then(result => {

                var json = JSON.parse(result);
                this.renderRecipe(item)
                this.setState({
                    searchResult: json
                })
            })
            .catch(error => console.log('error', error));
    }

    handleSearchSubmit() {
        //Define Query - call this method on submit of search function.
        //Probably have to refresh page to reload results unless we can avoid that somehow

        var raw = JSON.stringify({ "query": this.state.query });
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/get-recipe-details", requestOptions)
            .then(response => response.text())
            .then(result => {

                var json = JSON.parse(result);

                this.setState({
                    filtered: json
                })
            })
            .catch(error => console.log('error', error));

    }


    handleRewriteHistory(childHistory) {
        const fieldEditor = this.childLook.current;

        this.setState({ history: childHistory })
    }

    


    handlePageLoad(event) {

        store.addNotification({
            title: 'Dropbox',
            message: 'Files were synced',
            type: 'default',                         // 'default', 'success', 'info', 'warning'
            container: 'bottom-left',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
                duration: 3000
            }
        })




        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "query": "", "cuisine": "", "intolerences": "", "diet": "Vegetarian" });
        var raw2 = JSON.stringify({ "query": "", "cuisine": "", "intolerences": "", "diet": "ketogenic" });
        var raw3 = JSON.stringify({ "query": "", "cuisine": "", "intolerences": "", "diet": "Vegan", "number": 20 });
        var raw4 = JSON.stringify({ "maxCalories": "600", "minProtein": "10" });



        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var requestOptions2 = {
            method: 'POST',
            headers: myHeaders,
            body: raw2,
            redirect: 'follow'
        };

        var requestOptions3 = {
            method: 'POST',
            headers: myHeaders,
            body: raw3,
            redirect: 'follow'
        };

        var requestOptions4 = {
            method: 'POST',
            headers: myHeaders,
            body: raw4,
            redirect: 'follow'
        };

        var requestOptions5 = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("/search-recipes", requestOptions)
            .then(response => response.text())
            .then(result => {

                var json = JSON.parse(result);
                var newjson = []
                for (var i = 0; i < json.length; i++) {
                    var entry = json[i]["recipe"];

                    // entry["id"] = entry["url"];
                    // entry["title"] = entry["label"];
                    // entry["timeCook"] = entry["totalTime"];
                    // entry["servings"] = entry["yield"];
                    // const cals = Math.round(entry["calories"]);

                    // entry["calories"] = cals;
                    // entry["image"] = entry["image"];
                    // const imgArr = []
                    // imgArr.push( entry["image"]);
                    // entry["imageUrls"] = imgArr;

                    newjson.push(entry);
                }

                this.setState({
                    category1: json
                })
            })
            .catch(error => console.log('error', error));

        fetch("/search-recipes", requestOptions2)
            .then(response => response.text())
            .then(result => {

                var json = JSON.parse(result);

                this.setState({
                    category2: json
                })
            })
            .catch(error => console.log('error', error));

        fetch("/search-recipes", requestOptions3)
            .then(response => response.text())
            .then(result => {

                var json = JSON.parse(result);

                this.setState({
                    category3: json
                })
            })
            .catch(error => console.log('error', error));

        /*fetch("/search-recipes-nutrition", requestOptions4)
            .then(response => response.text())
            .then(result => {

                var json = JSON.parse(result);

                this.setState({
                    category4: json
                })
            })
            .catch(error => console.log('error', error));*/

        fetch("/recipe_history", requestOptions5)
            .then(response => response.text())
            .then(result => {
                // var json = JSON.parse(result);    
                //this.setState({
                // history: json
                //})
            })
        this.setState({
            filtered: this.state.category1
        });

        this.setState({ categories: [this.state.category1, this.state.category2, this.state.category3] })

    }

    setLogin() {
        this.setState({ loggedIn: true });
    }

    onLogin() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "email": document.getElementById('#email').value, "password": document.getElementById('#password').value });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/login", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    this.onLoginFail()
                }
                else {
                    this.setLogin()
                    this.onLoginSuccess()
                }
            })
            .then(result => console.log(result))
            .catch(error => { console.log('error', error) });

    }

    onLoginSuccess(method, response) {
        console.log("in method")
        store.addNotification({
            title: 'Login Success',
            message: 'Successfully Logged Into Instacart',
            type: 'success',                         // 'default', 'success', 'info', 'warning'
            container: 'top-center',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
                duration: 3000
            }
        })
        this.setVisibleL(false);
        this.setVisibleR(false);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("/recipe_history", requestOptions)
            .then(response => response.text())
            .then(result => {
                var json = JSON.parse(result);

                this.setState({
                    history: json
                });
                
            })

        this.setState({
            loggedIn: true,
            loading: false
        })
    }

    onLoginFail(method, response) {
        store.addNotification({
            title: 'Login Failure',
            message: 'Please make sure you have created an Instacart account.',
            type: 'danger',                         // 'default', 'success', 'info', 'warning'
            container: 'top-right',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
                duration: 3000
            }
        })
        this.setState({
            loading: false,
            error: response
        })
    }
    handleResultSelect = (e, { result }) => {

        this.setState({ value: result.title })
        this.addPantry(result.title)
    }

    addPantry = (e,{result})=>{
        if(this.state.pantry.indexOf(result.title) === -1){

        this.setState({ pantry: this.state.pantry.concat(result.title) })
        let newarr = this.state.spices.filter(a => a !== result.title)
        this.setState({ spices: newarr})

        store.addNotification({
            title: 'Ingredient Added',
            message: 'Added ' + result.title,
            type: 'success',                         // 'default', 'success', 'info', 'warning'
            container: 'bottom-center',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
                duration: 3000
            }
        })

        }else{
            store.addNotification({
                title: 'Ingredient Already In Pantry',
                message:'Please add something else',
                type: 'warning',                         // 'default', 'success', 'info', 'warning'
                container: 'bottom-center',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            })
        }
        

        this.setState({ value: '' })

            
            //this.state.cart = this.state.cart.concat(recipe);
            //this.state.cartLength = this.state.cartLength + 1;
    
            
            

    }
    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ modal_trigger: false, })

    render() {
        

        const settings = {
            dots: true,
            infinite: true,
            arrows: true,
            speed: 500,

            autoplaySpeed: 100,
            slidesToShow: 3,
            slidesToScroll: 1
        };

        if (!this.state.loggedIn) {
            this.state.signIn = <SignIn login={this.onLogin} />;

        } else if (this.state.loggedIn && this.state.cart.length > 0) {
            this.state.signIn = <Menu.Item as='a' href="https://instacart.ca" style={{ color: 'black' }}>
                <h1 style={{ fontWeight: 600, textAlign: '' }}>Proceed to Instacart       <i className="fa fa-long-arrow-right"></i></h1>
            </Menu.Item>;
        } else if(this.state.loggedIn){
            this.state.signIn = <></>;
        }

        if (this.state.loggedIn) {
            this.state.cartScreen = <Cart callback={this.removeFromCart} cart={this.state.cart} />;

        } else {
            this.state.cartScreen = <></>;
        }



        return (

            <div >



                <NavBar style={{ position: 'fixed' }} loggedIn={this.state.loggedIn} callback={this.handleSearchChange} sidebar={this.setVisibleR} sidebar2={this.setVisibleL} cart={this.state.cart} />

                <Sidebar.Pushable as={Segment} >

                    <Sidebar className="overlay"
                        as={Menu}
                        style={{ backgroundColor: 'white' }}
                        animation='overlay'
                        icon='labeled'
                        direction='right'
                        inverted
                        onHide={() => this.setVisibleR(false)}
                        vertical
                        visible={this.state.visibleR}
                        width='wide'
                    >   <Menu.Item style={{ paddingTop: '600px' }} as='a' style={{ color: 'black' }} onClick={() => this.setVisibleR(false)}>
                        
                            <i style={{ fontSize: '24px', padding: '20px', marginRight: '300px' }} className="fa fa-long-arrow-left move"></i>
                            
                        </Menu.Item>
                        {this.state.cartScreen}
                        {this.state.signIn}
                    </Sidebar>
                    <Sidebar className="overlay"
                        as={Menu}
                        style={{ backgroundColor: 'white' }}
                        animation='overlay'
                        icon='labeled'
                        direction='left'
                        inverted
                        onHide={() => this.setVisibleL(false)}
                        vertical
                        visible={this.state.visibleL}
                        width='wide'
                    >   <Menu.Item style={{ paddingTop: '600px' }} as='a' style={{ color: 'black' }} onClick={() => this.setVisibleL(false)}>
                    <i style={{ fontSize: '24px', padding: '20px', marginLeft: '250px' }} className="fa fa-long-arrow-left move"></i>
                    </Menu.Item>
                    <h2 style={{ paddingLeft:'20px',paddingBottom:'10px',fontWeight: 600, textAlign: 'left',fontFamily:'Raleway',fontSize:'24px' }}>Search Ingredients</h2>
                    <h4 style={{ paddingTop:'0px',paddingBottom:'60px',paddingLeft:'20px',paddingRight:'60px',fontWeight: 400, textAlign: 'left',fontFamily:'Raleway',fontSize:'16px' }}>We won't add these ingredients when you checkout</h4>
                    <Search style={{paddingBottom:'50px'}} className="col-md-3"
                                loading={this.state.isLoading}
                                onResultSelect={this.addPantry}
                                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                    leading: true,
                                })}
                                resultRenderer={resultRenderer}
                                results={this.state.filtered}
                                value={this.state.value}
                                {...this.props}
                            />
                    <h2 style={{ padding:'20px',fontWeight: 600, textAlign: 'left',fontFamily:'Raleway',fontSize:'24px' }}>Ingredients In Pantry</h2>
                    <h4 style={{ paddingTop:'0px',paddingBottom:'10px',paddingLeft:'20px',paddingRight:'100px',fontWeight: 400, textAlign: 'left',fontFamily:'Raleway',fontSize:'12px' }}>Remove when you're out and we'll add what you need to your next order.</h4>

                    <hr style={{  backgroundColor: 'lightGrey' }}></hr>
                    <Pantry ingredients={this.state.pantry} callback={this.removeFromPantry}/>

                    </Sidebar>
                    <Sidebar.Pusher style={{ padding: '0' }}>
                        <Segment basic>
                            <div className="">

                                <Welcome loggedIn={this.state.loggedIn} sidebar={this.setVisibleL} />


                                <Steps />
                                {/*<Lottie options={defaultOptions}
                                        height={400}
                                        width={400}
                                        sStopped={this.state.isStopped}
                                        isPaused={this.state.isPaused}
                                    />*/}
                                


                                <Sliders showRecipe={this.handleGetRecipe} callback={this.addToCart} log={this.state.loggedIn} setVisible={this.setVisibleR} 
                                    recipe1={this.state.category1} recipe2={this.state.category2} recipe3={this.state.category3} previouslyOrdered ={this.state.history} isSignedIn={this.state.loggedIn}/>
                                {/*<RecipeSearch callback={this.addToCart} recipes={recipes.results1.concat(recipes.results2.concat(recipes.results3))} />*/}
                                <h2 id="search" style={{ marginTop: '175px', marginLeft: '50px', marginBottom: '90px', fontSize: '48px', fontWeight: '600' }}> Search for your favourites!</h2>

                                <RecipeSearch id="" setVisible={this.setVisibleR} log={this.state.loggedIn} callback={this.addToCart}/>
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
