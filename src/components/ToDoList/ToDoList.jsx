import React from 'react';
import './ToDoList.css';
import { Component } from "react";
import ToDoItems from '../ToDoItems/ToDoItems';


var builder = require('xmlbuilder');

export default class ToDoList extends Component {
    constructor() {
        super();
       /* Declaring State Variables */
        this.state ={
           val: '',
           list: [],
          
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
 }

  /* The handlesubmit is being called on form submit
     To Add todolist items */     
     handleChange = (event) => {
            this.setState({
                val:event.target.value
            });      
      }  

    handleSubmit = (event) => {   
        event.preventDefault();   
        if(this.state.val !== ""){  
            //console.log(this.state.val);
            const toDoListArr = {
               text: this.state.val,
               color: 'lightblue',
               key:Date.now(),
               status:'New',
               CreatedTime:Date(),
               updatedTime:Date()
               };
            
               const newItems =  [...this.state.list,toDoListArr]
               this.setState({
                   list:newItems,
                   val:'',
                   key:''
               })
            // this.setState((prevState) => {
            //     return { list : prevState.list.concat(toDoListArr)
            //      };
                
            // });
        }
        else { console.log("Please Enter The task");}
    
        console.log("list items", this.state.list);    
 
    }
       /**
         * To write data to a xml file
         */

    Download = (data) =>{
        var root = builder.create('Todolist');
        root.com('ToDo -List');
        this.state.list.map((todo) => { 
            var item = root.ele('Todo');
            item.att('List', todo.text);
            item.att('Id', todo.key);
            item.att('status',todo.status);
            item.att('createdtime',todo.CreatedTime);
            item.att('updatedtie',todo.updatedTime);
         });          
        var xml = root.end({ pretty: true});
        console.log(xml);

      
         let filename = "todolist.xml";
         let text = {xml};
         let blob = new Blob([text], {type:'xml'});
         let link = document.createElement("a");
         link.download = filename;
         //link.innerHTML = "Download File";
         link.href = window.URL.createObjectURL(blob);
         document.body.appendChild(link);
         link.click();
         setTimeout(() => {
             document.body.removeChild(link);
             window.URL.revokeObjectURL(link.href);
         }, 100);
     }

     /* To Delete the todolist item.*/

    deleteItem(key){
     
        var filteredItems = this.state.list.filter(function (list) {
            return (list.key !== key);
          });

          this.setState({ 
            list: filteredItems
          });
     //console.log("In delete", this.state.list);
    }
  
    render() {
        
        return (
            <div className='toDoListCard'>
            <div className='toDoForm'>
            <form onSubmit={this.handleSubmit}>
            <input type="text"  value={this.state.val} onChange={this.handleChange}  placeholder="Enter Your To Do List"/>
            <button> Add List</button>  
            </form>
            <button onClick={(event) => this.Download(this.state.list)}>Download</button>
            </div>
            <ToDoItems listItems={this.state.list} flag={this.state.dropdownStatus} delete={this.deleteItem}/>
            
            </div>
        )
    }

}