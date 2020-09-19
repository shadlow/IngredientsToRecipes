import React, { Component } from 'react'
import SliderRecipe from './SliderRecipe'
import RecipeSearch from "./Search.js"


function RecenltyOrdered(props){
    if(!props.show){
        return null;
    }

    return (
        <div>
            <h3 style={{ marginTop: '10px', marginLeft: '50px', marginBottom: '10px', fontWeight: '600' }}> Recently Ordered</h3>
            <div className="margin-bottom-60">
                <SliderRecipe showRecipe={props.showRecipe} log={props.log} callback={props.callback} setVisible={props.setVisible} list={props.list} />
            </div>
        </div>

    );
}

export class Sliders extends Component {
constructor(props){
    super(props);
    this.setState({recipes:[]})
    this.state={
        recipes:[],
        
        baseUri: "https://spoonacular.com/recipeImages/",
    }

    this.setState({recipes:this.props.recipes})
        
}

onComponentMount(){
    this.setState({recipes:this.props.recipes})
}


    render() {
        return (
            <section className="section home-feature ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div>
                                <h2 style={{ marginTop: '175px', marginLeft: '50px', marginBottom: '90px', fontSize: '48px', fontWeight: '600' }}> Explore Different Healthy Diets!</h2>
                                <div className="hr"></div>
                                {/*Slider*/}                        <h3 style={{ marginTop: '10px', marginLeft: '50px', marginBottom: '10px', fontWeight: '600' }}> Vegetarian</h3>
                                <div className="margin-bottom-60">
                                    <SliderRecipe showRecipe={this.props.showRecipe} log={this.props.log} callback={this.props.callback} setVisible={this.props.setVisible} list={this.props.recipe1} />
                                </div>
                                <div className="hr"></div>
                                <h3 style={{ marginTop: '10px', marginLeft: '50px', marginBottom: '10px', fontWeight: '600' }}> Keto</h3>
                                <div className="margin-bottom-60">
                                    <SliderRecipe showRecipe={this.props.showRecipe} log={this.props.log} callback={this.props.callback} setVisible={this.props.setVisible} list={this.props.recipe2} />
                                </div>
                                <div className="hr"></div>
                                <h3 style={{ marginTop: '10px', marginLeft: '50px', marginBottom: '10px', fontWeight: '600' }}> Plant-Based</h3>
                                <div className="margin-bottom-60">
                                    <SliderRecipe showRecipe={this.props.showRecipe} log={this.props.log} callback={this.props.callback} setVisible={this.props.setVisible} list={this.props.recipe3} />
                                </div>
                                <RecenltyOrdered showRecipe ={this.props.showRecipe} log={this.props.log} callback={this.props.callback} setVisible={this.props.setVisible} 
                                    list={this.props.previouslyOrdered} show={this.props.isSignedIn}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Sliders
