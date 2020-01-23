import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

class Example extends React.Component {

    constructor(props){
        super(props);
        this.state={
            id:0,
            title:'',
            body:'',
            posts:[]
        }
    }
    componentDidMount(){
        this.getAll();
    }
    getAll(){
        Axios.get(`http://127.0.0.1:8000/api`)
        .then((res)=>{
            this.setState({
                posts:res.data,
                id:0,
                title:'',
                body:'',
            })
        })
    }
    getOne(post){
        this.setState({
            id:post.id,
            title:post.title,
            body:post.body
        })
    }
    delete(id){
        Axios.delete(`http://127.0.0.1:8000/api/${id}`)
        .then((res)=>{
           this.getAll();
        })
    }
    submit(event,id){
        event.preventDefault();
        if(this.state.id == 0){
            Axios.post(`http://127.0.0.1:8000/api`,{title:this.state.title,body:this.state.body})
            .then((res)=>{
               this.getAll();
            })
        }else{
        Axios.put(`http://127.0.0.1:8000/api/${id}`,{title:this.state.title,body:this.state.body})
        .then((res)=>{
           this.getAll();
        })
    }

    }
    titlechange(event)
    {
        this.setState({
            title:event.target.value
        })
    }
    bodychange(event)
    {
        this.setState({
            body:event.target.value
        })
    }
    render(){
    return (
        <div className="container">
            <br />
            <div className="row">
                <form onSubmit={(e)=>this.submit(e,this.state.id)}>
                    <div className="input-field col s4">
                        <i className="material-icons prefix">input</i>
                        <input onChange={(e)=>this.titlechange(e)} value={this.state.title}/>
                    </div>
                    <div className="input-field col s4">
                        <i className="material-icons prefix">content_paste</i>
                        <input onChange={(e)=>this.bodychange(e)} value={this.state.body}/>
                    </div>
                    <div className="col s4">
                        <button type="submit" className="waves-effect waves-light btn">Save</button>
                    </div>
                </form>
                <br />
                <table>
                    <tbody>
                    <tr>
                        <td>Title</td>
                        <td>Body</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                    {this.state.posts.map(post=>
                        <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td>
                            <button onClick={(e)=>this.getOne(post)} className="waves-effect waves-light btn">
                            <i className="material-icons prefix">create</i>
                            </button>
                        </td>
                        <td>
                        <button onClick={(e)=>this.delete(post.id)} className="waves-effect waves-light btn">
                        <i className="material-icons prefix">delete</i>
                        </button>
                        </td>
                    </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
}
}
export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
