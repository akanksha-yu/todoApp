import React from "react"
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {addTodo,editTodo} from "../../actions/todo"
class CreateTodo extends React.Component{
    constructor(props){
        super(props);
       
        this.state={
            Category: "",
            Description:"",
            Title: "",
            Bucket:"",
            data:this.props.data
        }
    }
    componentDidUpdate(prevProps,prevState){
  
        if(prevProps.todo!==this.props.todo && this.props.todo !==null){
            this.setState({
                Category:this.props.todo.Category,
                Description:this.props.todo.Description,
                Title:this.props.todo.Title,
              
            })
        }
        if(prevProps.data!==this.props.data){
            this.setState({
                data:this.props.data
            })
        }
    }
    handleChange=(value,name)=>{
        this.setState((prevstate)=>{
            return{
            [name]:value
            }
        })
    }
    handleDatalistChange=(e)=>{
        this.setState({
            Bucket:e.target.value
        })
    }
    onSubmit=(e)=>{
        e.preventDefault();
    let {Title,Category,Description,Bucket}=this.state;
     const Creator=this.props.user.Username;
     if(Bucket===""){
        Bucket="Customised"
     }
     if(this.props.todo===null){
        this.props.addTodo({Title,Category,Description,Creator,Bucket},this.props.closeCreateTodo)
     }
     else{
      
         this.props.editTodo({id:this.props.todo._id,Title,Category,Description,Creator,Bucket},this.props.closeCreateTodo, this.props.activeTodoDone)
        
     }
    
    }
  
    renderTodoForm=()=>{
        const fields=[ {tag:"input",label:"Title",type:"text",className:"input-field",
        value:this.state.Title,onChange:this.handleChange},
        {tag:"input",label:"Category",type:"text",className:"input-field",
        value:this.state.Category,onChange:this.handleChange},
        {tag:"input",label:"Description",type:"text",className:"input-field",
        value:this.state.Description,onChange:this.handleChange}]
       return fields.map((field,i)=>{
           if(field.tag==="input"){
            return(
                <div className="field-container" key={i}>
                <label>{field.label}:</label>
                <input className="input-field" type={field.type} value={field.value} onChange={(e)=>field.onChange(e.target.value,field.label)} />
                </div>
            )
           }
         
        })
       
    }
    render(){
      
        const styleobj={
            color:"white",
           textAlign:"right",
            margin:"15px",
            cursor:"pointer",
            padding:"4px"
        }
        return(
            <React.Fragment>
                <form onSubmit={e=>this.onSubmit(e)}>
                    <div style={styleobj} onClick={e=>{this.props.closeCreateTodo()}}>X</div>
                    <div>
                {this.renderTodoForm()}
                <div className="field-container">
                    <label>Bucket:</label>
                <input type="text" className="input-field" list="data" onChange={this.handleDatalistChange} />

               <datalist id="data">
       {this.state.data.map((item, key) =>
         <option key={key} value={item} />
  )}
</datalist>
</div>
                </div>
                {this.props.todo===null?<button type="submit" className="btn-login">Create Todo</button>
                :<button type="submit" className="btn-login">Edit Todo</button>}
                </form>
                
            </React.Fragment>
        )
    }
}

export default withRouter(connect(null,{addTodo,editTodo})(CreateTodo));