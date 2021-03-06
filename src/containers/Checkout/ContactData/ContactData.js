import React ,{Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject,checkValidity} from '../../../shared/utility';
class ContactData extends Component{
    state={
        orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipCode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZIP Code'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                   
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your E-Mail'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest',displayValue:'Cheapest'},
                    ]
                    },
                    value:'fastest',
                    valid:true
                }, 
        },
        formIsValid:false
    }

    orderHandler=(event)=>{
        
            event.preventDefault();
           this.setState({loading:true})
           const formData={};
           for(let formElementIdentifier in this.state.orderForm){
               formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
           }
              const order={
                  ingredients:this.props.ings,
                  price:this.props.price,
                  orderData:formData,
                  userId:this.props.userId
              }
             this.props.onOrderBurger(order,this.props.token);
    }

   

    inputChangedHandler=(event,inputIdentfier)=>{
        
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentfier],{
            value:event.target.value,
            touched:true,
            valid:checkValidity(event.target.value,this.state.orderForm[inputIdentfier].validation)
        })
        const updatedOrderForm=updateObject(this.state.orderForm,{
            [inputIdentfier]:updatedFormElement
        });

        let formIsValid=true    ;
        for(let inputIdentfier in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIdentfier].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid}); 
        
    }
    render(){
        let formElementsArray=[];
        for(let key in this.state.orderForm){
            const obj={
                id:key,
                config:this.state.orderForm[key]
            }
            formElementsArray.push(obj);
        }
        let form =(
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement =>(
                <Input key={formElement.id}
                       elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       invalid={!formElement.config.valid}
                       shouldValidate={formElement.config.validation}
                       touched={formElement.config.touched}
                       change={(event)=>this.inputChangedHandler(event,formElement.id)}/>
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>Order</Button>
        </form>);
        if(this.props.loading){
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h2>Enter your contact data</h2>
                {form}
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    } 
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));