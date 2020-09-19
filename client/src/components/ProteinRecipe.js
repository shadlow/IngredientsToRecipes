import React, { Component } from 'react'
import Slider from "react-slick";

export class ProteinRecipe extends Component {
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

        return (
            <div>
                <Slider {...settings}>
                
                {this.props.list.map(item => (
                                                <div className="mb-5 padding-10">
                                                {console.log(item.image)}
                                                    <div className="card" >
                                                        <div style={{ objectFit: 'cover', width: 'auto', height: '170px', overflow: 'hidden' }}>
                                                            <img src={item.image} style={{ width: '100%' }}></img>
                                                        </div>
                                                        <div className="row">
                                                            <div className="card-body col-xl-8 col-lg-8 col-md-8">


                                                                <h5 className="card-title">{item.title}</h5>
                                                                <p className="card-text">{item.desc}</p>
                                                            </div>
                                                            <div className="col-xl-4 col-lg-4 col-md-4 product" style={{ marginTop: '30px' }}>

                                                                <ul className="social">
                                                                    <li><a href=""><i className="recipeIcons fa fa-bolt" ></i></a>{item.calories}kcal</li>
                                                                    <li><a href=""><i className="recipeIcons fa fa-user" ></i></a>{item.protein}   g of protein</li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <div className="card-footer " style={{ textAlign: 'right' }}>
                                                            <a href="#" className="btn btn-sm" style={{ backgroundColor: "#6cd34c", color: "#fff" }}><i className="fa fa-shopping-cart" ></i> Add to Cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                </Slider>
            </div>
                
            
        )
    }
}

export default ProteinRecipe
