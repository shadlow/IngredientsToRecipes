import React, { Component } from 'react'
import { Menu,Button } from 'semantic-ui-react'

export class Pantry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            in: this.props.ingredients
        }
    }
    render() {

        if(this.props.ingredients.length>0){
        return (
            <div>
                {this.props.ingredients.map(item => ( 
                    <div>
                    <Menu.Item >
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-6">
                            <h2 style={{fontSize:'18px',fontWeight:'600',textAlign:'left',color:'black'}}>{item}</h2>
                            </div>
                            <div className="col-md-6 col-sm-6 col-6">
                            <Button onClick={()=>this.props.callback(item)} style={{color:'#ef1c31', backgroundColor:'white',padding:'5px'}}><i className="fa fa-minus"></i></Button>
                            </div>
                    <hr style={{  backgroundColor: 'lightGrey' }}></hr>
                        </div>
                    
                </Menu.Item>
                </div>
                
                

                    
                    
                ))}
            </div>
        )
        }else{
            return(
                <div>
                    <h4 style={{ padding:'50px',fontWeight: 500, textAlign: 'center',fontFamily:'Raleway',fontSize:'16px' }}>No ingredients in pantry, add some above.</h4>
            </div>
            )
            
        }
    }
}

export default Pantry
