import React, { Component } from 'react'

export class Steps extends Component {
    render() {
        return (
            <section className="section home-feature white-bg" id="steps">
                                    
                                    <div className="container white-bg">
                                        <div className="row" >
                                            <div className="col-lg-12">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div className="features-small-item">
                                                            <div className="icon">
                                                                <i style={{ fontFamily: 'Poppins Bold', fontSize: '50px' }}>1</i>
                                                            </div>
                                                            <h5 className="features-title">Tasty, Healthy Recipes</h5>
                                                            <p className="">Browse our curated recipes add your favourites to the cart. Healthy meals that are quick and easy to cook.</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div className="features-small-item">
                                                            <div className="icon">
                                                                <i style={{ fontFamily: 'Poppins Bold', fontSize: '50px' }}>2</i>
                                                            </div>
                                                            <h5 className="features-title">Compiled Ingredients</h5>
                                                            <p className="">We will process and find the ingredients you need and auto add them for you. Saving you time and money.</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div className="features-small-item">
                                                            <div className="icon">
                                                                <i style={{ fontFamily: 'Poppins Bold', fontSize: '50px' }}>3</i>
                                                            </div>
                                                            <h5 className="features-title">Grocery Checkout</h5>
                                                            <p className="">Continue to checkout at the grocery store and get them delivered to you. Then come back here and follow the instructions.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
        )
    }
}

export default Steps
