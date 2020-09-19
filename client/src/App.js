import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Button} from 'semantic-ui-react'
import Home from './components/Home.js'
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Welcome from './components/Search.js'
import NavBar from './components/NavBar.js'

export class App extends Component {

    constructor(props){
        super(props);

        this.recipeToRender = this.recipeToRender.bind(this);
    }
    recipeToRender(recipe){
        this.setState({title:recipe.title, desc:recipe.desc})
    }
    render() {
        return (

            <div>
                

                <Router>
                    <Switch>
                        <Route exact path="/">
                            <ReactNotification style={{ zIndex: '9000' }} />
                            
                            <Home renderRecipe={this.recipeToRender}/>
                            
                        </Route>
                        {/*<Route render={(props) => <Recipe {...props} title={this.state.title} desc={this.state.desc}/>}/>*/}
                        
                    


                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App
