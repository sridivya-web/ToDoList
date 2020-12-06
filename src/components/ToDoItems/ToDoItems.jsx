import React from 'react';
import './ToDoItems.css';
import { Component } from "react";


export default class ToDoItems extends Component {
    constructor(props) {
        super(props);
       
        this.state ={
           
        }
        this.createTasks = this.createTasks.bind(this);
    }
    /* Create Tasks will help in rendering of list items. */
    createTasks(item){   
    return(
    <div className="listItems"> 
    <li key={item.key}>{item.text}</li> 
  
    <button onClick={() => this.delete(item.key)}>X</button>
    </div>
    );
    }
    
    /* we are calling delete, to remove an list item */
    
    delete(key){
       this.props.delete(key);
    }
   
    render() {
        var entries = this.props.listItems;
        var listentries = entries.map(this.createTasks);
        return (
            <div className='main'>
            <ul className="listDetails">{listentries}</ul>
            </div>
        )
    }

}