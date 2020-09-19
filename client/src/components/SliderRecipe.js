import React, { Component } from 'react'
import Slider from "react-slick";
import {Button} from 'semantic-ui-react';
import {addToCart} from "./Home";
import { store } from 'react-notifications-component';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "white" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "white" }}
            onClick={onClick}
        />
    );
}

export class SliderRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            items:[],
            baseUri: "https://spoonacular.com/recipeImages/"
        }

        this.onAdd = this.onAdd.bind(this);

        
    }

    handleAddToCart(recipe){
        this.props.addToCart(recipe);
    }

    onComponentMount(){
        this.setState({items:this.props.list})
    }

    onAdd(item){
        if(this.props.log){
            this.props.callback(item)
        }else{

            store.addNotification({
                title: 'Sign In Required',
                message: 'Please sign in to Instacart',
                type: 'warning',                         // 'default', 'success', 'info', 'warning'
                container: 'top-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            })
            this.props.setVisible(true)
        }

        
            
    }

    render() {

        const settings = {
            dots: true,
            infinite: true,
            arrows: true,
            speed: 500,
            autoplaySpeed: 100,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  initialSlide: 2
                }
              }]
        };

        return (
            <div>
                <Slider {...settings}>
                    {console.log(this.props.list)}
                    
                    {this.props.list.map(item => (
                        <div className="container mb-5 padding-10">
                            
                            <div  className="card drop-shadow noBorder" >
                                <div style={{ objectFit: 'cover', width: 'auto', height: '170px', overflow: 'hidden' }}>
                                    <img src={this.state.baseUri + "/" + item.imageUrls} style={{ width: '100%' }}>

                                    </img>
                                </div>
                                <div className="row">
                                    <div className=" col-xl-8 col-lg-8 col-md-8">
                                        <h2 style={{ paddingTop:'10px',paddingLeft:'10px',marginBottom:'0',fontSize: '14px', fontWeight: '600' }} className="card-title">{item.title}</h2>
                                        <p className="card-text">{item.desc}</p>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-4 product" style={{ marginTop: '10px' }}>
                                        <ul className="social">
                                            <li><p style={{ paddingLeft:'5px',paddingBottom: '10px', fontWeight: '500', fontSize: '12px' }}><i className="recipeIcons fa fa-clock-o" ></i>{item.readyInMinutes}   mins</p></li>
                                            <li><p style={{ paddingLeft:'5px',paddingBottom: '10px', fontWeight: '500', fontSize: '12px' }}><i className="recipeIcons fa fa-user" ></i>{item.servings}   servings</p></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-footer noBorder" style={{ textAlign: 'right' }}>
                                    <Button href="" className="btn btn-sm" onClick={() => this.onAdd(item)} style={{ padding:'8px', fontSize:'20px',backgroundColor: "#6cd34c", color: "#fff" }}><i className="fa fa-cart-plus" ></i></Button>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>


        )
    }
}

export default SliderRecipe
