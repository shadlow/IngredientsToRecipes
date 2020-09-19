import React, { Component, createRef } from 'react'
import { Button, Search, Grid, Ref, Segment, Label, Sticky } from 'semantic-ui-react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { store } from 'react-notifications-component';


const initialState = { isLoading: false, cart: [], results: [], value: '' }


const resultRenderer = ({ title }) => <Label content={title} />

resultRenderer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}
export class RecipeSearch extends Component {

    constructor(props) {
        super(props);
        this.state = { initialState, baseUri: "https://spoonacular.com/recipeImages/", value: '', filtered: [] };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchLoad = this.handleSearchLoad.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.handleSearchLoad()
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

    handleSearchLoad() {
        console.log("hello");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "query": this.state.value, "cuisine": "", "intolerences": "", "diet": "" });


        var requestOptions2 = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("/search-recipes", requestOptions2)
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

    contextRef = createRef()

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
        const { isLoading, value, results } = this.state

        return (
            <Ref ref={this.contextRef}>
<div className="container">

                <Sticky  context={this.contextRef}>
                    <div className="row" style={{ paddingBottom: '40px' }}>

                        <div className="col-lg-3 col-md-3 col-sm-9 col-9">
                            <Search className="col-md-3"
                                loading={isLoading}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                    leading: true,
                                })}
                                resultRenderer={resultRenderer}
                                results={this.state.filtered}
                                open={false}
                                value={this.state.value}
                                {...this.props}
                            />
                        </div>
                        <div style={{ paddingRight: '0px' }} className="col-lg-3 col-md-3 col-sm-3 col-1">
                            <Button className="btn btn-sm" onClick={() => this.handleSearchLoad()} style={{ padding: '14px', fontSize: '20px', backgroundColor: "#6cd34c", color: "#fff" }}>Go</Button>
                        </div>
                    </div>
                </Sticky>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">

                        <div className="row">

                            {this.state.filtered.sort().slice(0, 20).map(item => (
                                <div className="container mb-5 padding-10 col-md-4">
                                    <div className="card drop-shadow noBorder" >
                                        <div style={{ objectFit: 'cover', width: 'auto', height: '170px', overflow: 'hidden' }}>
                                            <img src={this.state.baseUri + "/" + item.imageUrls} style={{ width: '100%' }}></img>
                                        </div>
                                        <div className="row">
                                            <div className="card-body col-xl-8 col-lg-8 col-md-8">


                                                <h2 style={{ paddingBottom: '0', fontSize: '16px', fontWeight: '600' }} className="">{item.title}</h2>
                                                <p className="card-text">{item.desc}</p>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 product" style={{ marginTop: '30px' }}>

                                                <ul className="social">

                                                    <li><p style={{ paddingBottom: '10px', fontWeight: '500', fontSize: '12px' }}><i className="recipeIcons fa fa-clock-o" ></i>{item.readyInMinutes}   mins</p></li>
                                                    <li><p style={{ paddingBottom: '10px', fontWeight: '500', fontSize: '12px' }}><i className="recipeIcons fa fa-user" ></i>{item.servings}   servings</p></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="card-footer noBorder" style={{ textAlign: 'right' }}>
                                            <Button href="" className="btn btn-sm" onClick={() => this.onAdd(item)} style={{ backgroundColor: "#6cd34c", color: "#fff" }}><i className="fa fa-shopping-cart" ></i> Add to Cart</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
            </Ref>
            




        )
    }
}

export default RecipeSearch
