import React from "react";
import axios from "axios";

axios.defaults.baseURL = "http://" + window.location.hostname + ":3001";

export default class MessageSend extends React.Component {
  state = {
    name: "",
    content: "",
    messages: [],
    error: ""
  };

  constructor() {
    super();
    this.init();
  }

  async init() {
    let recieved = await axios({
      method: "get",
      url: "/messages"
    });
    const messages = recieved.data;
    this.setState({ messages });
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };
  handleContentChange = event => {
    this.setState({ content: event.target.value });
  };

  handleSubmit = async event => {
    this.setState({ error: null });

    event.preventDefault();

    let user = this.state.name;

    let content = this.state.content;
    try {
      await axios({
        method: "post",
        url: "/messages",
        data: {
          user: user,
          content: content
        }
      });
    } catch (error) {
      this.setState({ error: error.response.data });
      console.log(error);
    }

    let recieved = await axios({
      method: "get",
      url: "/messages"
    });
    const messages = recieved.data;
    this.setState({ messages });

    this.setState({ name: "" });
    this.setState({ content: "" });
  };

  render() {
    return (
      <div className="card">
        <h3 className="card-header info-color white-text text-center py-4">
          <strong>Welcome to the board of messages ! </strong>
        </h3>
        <h5 className="card-header info-color white-text text-center py-4">
          <strong>Fowl Language will be punished by a ban !</strong>
        </h5>
        <div>{this.state.error}</div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={this.handleNameChange}
                value={this.state.name}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Content"
                onChange={this.handleContentChange}
                value={this.state.content}
              />
              <button
                className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                type="submit"
              >
                Submit
              </button>
            </div>

            <div>
              <ul>
                {this.state.messages.map(message => (
                  <li key={message.id.toString()}>
                    {message.user} says {message.content}
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
