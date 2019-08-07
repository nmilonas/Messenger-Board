import React from 'react';
import axios from 'axios';


let headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
let Msg = [];
let x;
export default class MessageSend extends React.Component {
    state = {
        name: '',
      }
    current = {
      messages: []
    }
    
  
  handleChange = event => {
    this.setState({ name: event.target.value});
  }
  handleChange2 = event => {
    this.setState({ content: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();


    //const user = {
    let user = this.state.name;        
    //}
    //const content = {
    let content = this.state.content
    //}

    // let params = {
    //     user: 'Fred',
    //     content: 'BAD',
    //   }
      let recieved = axios({
        method: 'get', 
        url: 'http://localhost:3001/messages/'
      }).then(res => {
             //const messages = res.data;
             //this.setState({ messages }) 
              x = res.data;
          })
   //console.log( JSON.stringify(params))
    
    // axios.post(`https//localhost:3001/messages`,  { user })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })
    axios({
      method: 'post', 
      url: 'http://localhost:3001/messages/',
      data:{
          user:   user ,
          content:   content 
        },
        
    })
    // Msg.push({
    //   user: user,
    //   content: content
    // })
    document.getElementById("Print").innerHTML = JSON.stringify(x);
  }
  
  render() {
    return (
      // <div>
      //   <form onSubmit={this.handleSubmit}>
      //     <label>
      //       Person Name:
      //       <input type="text" name="name" onChange={this.handleChange} />
      //       Conten ype="text" content="content" onChange={this.handleChange2} />
      //     </label>
      //     <script>makePostRequest(user,content)</script>
      //     <button type="submit">Add</button>
      //   </form>
      // </div>
      //<div><ul>{ this.current.messages.map(message => <li>{message.name}</li>)}</ul></div>
      <div>
      <form onSubmit = {this.handleSubmit}>
        <div className="row">
            <input type="text" className="form-control" placeholder="First name" onChange={this.handleChange}/>
        </div>
        <div className="row">
            <input type="text" className="form-control" placeholder="Last name" onChange={this.handleChange2}/>
            <button type="submit">Add</button>
        </div>
      <div>
      <pre id="Print"></pre>
      </div>
      </form>
      </div>

      
    )
  }
}


async function makePostRequest() {
    axios({
        method: 'post', 
        url: 'http://localhost:3001/messages/',
        data:{
            user: 'Fred',
            content: 'BAD',
          },
          
      })
}

//makePostRequest();
async function makeGetRequest() {
    axios({
        method: 'get', 
        url: 'http://localhost:3001/messages/'
        // key:{
        //     id: '1'
        //   },
          
      })
    
    // let res = await axios.get('http://localhost:3001/',{
    //     key: {
    //       id: 2}}
    //     );

    // let data = res.data;
    // console.log(data);
}

//makeGetRequest();