import React from 'react';
import './ToDoItems.css';
import { Component } from "react";
import ToDoChart from '../BarChart/ToDoChart';

export default class ToDoItems extends Component {
    constructor(props) {
        super(props);

        this.state ={
           entries:[],
           chartData :[]
        }
   
    }
    componentWillReceiveProps(props){
         if(props.listItems){
             this.setState({
                 entries:props.listItems
             })
         }
         this.state.entries.map((todo) => {

            var countOfFinish = this.state.entries.filter(x => {
                return x.status === "finish"
                }).length
                
                var countOfGiveup = this.state.entries.filter(x => {
                return x.status === "giveup"
                }).length
    
                var countOfNew = this.state.entries.filter(x => {
                    return x.status === "New"
                    }).length
                    
                
                var chart =[{Name: 'Finished', count : countOfFinish}, 
                            {Name: 'Giveup', count : countOfGiveup},
                            {Name: 'New', count : countOfNew}]
    
                    this.setState({
                        chartData:chart         
                    })      
                })
                //console.log("chart details", this.state.chartData); 
        

        }
    /* we are calling delete, to remove an list item */
    
    delete(key){
       this.props.delete(key);
    }
    handleChange  = (value,id ) =>   {
        var tempArray = this.state.entries;
        tempArray.map((todo) => {
            //console.log("value of todoid",todo.key);
            //console.log("value of id",id);
            if( id === todo.key)
            { 
                todo.status = value;
                todo.updatedTime=Date();
            }
            if(id === todo.key && value === 'finish')
            {
                todo.color='green';
            }
            else if(id === todo.key && value === 'giveup')
            { todo.color = 'red'; }
       
        })
        this.setState({
            entries:tempArray,
           
        })
      
        //console.log("HANDLE CHANGE DATA",tempArray);

        this.state.entries.map((todo) => {

            var countOfFinish = this.state.entries.filter(x => {
                return x.status === "finish"
                }).length
                
                var countOfGiveup = this.state.entries.filter(x => {
                return x.status === "giveup"
                }).length
    
                var countOfNew = this.state.entries.filter(x => {
                    return x.status === "New"
                    }).length
                    
                
                var chart =[{Name: 'Finished', count : countOfFinish}, 
                            {Name: 'Giveup', count : countOfGiveup},
                            {Name: 'New', count : countOfNew}]
    
                    this.setState({
                        chartData:chart         
                    })      
                })
        
    }  
    

    render() {
        //console.log("color is",this.state.displayColor);
        var newEntries = this.state.entries;     
                return (
                   
                    <div className="lists">            
                {newEntries.map((item) => <div className="listItems"> 
             <li className={item.color === 'green' ? "listItemsgreen" : [  item.color  === 'red' ? "listItemsred" : "listItems"]  } key={item.key}>{item.text}</li>   
              <select  name="status"  disabled={item.status !== 'New' ? true : false} onChange={(event) => this.handleChange(event.target.value,item.key)} >  
              <option disabled selected>Select Status</option>
              <option value="finish">Finished</option>
              <option value="giveup">Giveup</option>
              </select>
              <button onClick={() => this.delete(item.key)}>X</button>
              </div> 
              
             )}
             <div className="charts">
            {<ToDoChart data={this.state.chartData}/>}
            </div>
            </div>
               
            
        )
    }

}