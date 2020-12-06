import React from 'react';
import './ToDoList.css';
import { Component } from "react";
import ToDoItems from '../ToDoItems/ToDoItems';


export default class ToDoList extends Component {
    constructor() {
        super();
       /* Declaring State Variables */
        this.state ={
           val: '',
           list: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

  /* The handlesubmit is being called on form submit
     To Add todolist items */  
  
   
    handleSubmit = (event) => {
        
        if(this._inputElement.value !== ""){  
            var toDoListArr = {
               text: this._inputElement.value,
               key:Date.now()
            };

            this.setState((prevState) => {
                return { list : prevState.list.concat(toDoListArr)
                 };
            });
        }
        else { console.log("Please Enter The task");}
   
        this._inputElement.value = "";
        console.log("list items", this.state.list);
        event.preventDefault();
    }
 
     /* To Delete the todolist item.*/
     
    deleteItem(key){
        //console.log("key in deleteItem", +key);
        var filteredItems = this.state.list.filter(function (list) {
            return (list.key !== key);
          });

          this.setState({
            list: filteredItems
          });

    }
    render() {
        
        return (
            <div className='toDoListCard'>
            <div>
            <form onSubmit={this.handleSubmit}>
            <input type="text" ref={(a) => this._inputElement = a}  placeholder="Enter Your To Do List"/>
            <button> Add List</button>
           
            </form>
         
            </div>
            <ToDoItems listItems={this.state.list} delete={this.deleteItem}/>
            </div>
        )
    }

}