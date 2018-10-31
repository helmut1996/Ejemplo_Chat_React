import React, { Component } from 'react';

class ChatRoom extends Component{
    constructor(){
        super();
        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);

        this.state = {
            message: '',
            messages: []
        }
    }

    componentDidMount(){
        firebase.database().ref('messages/').on('value',snapshot=>{
            const currenMessages = snapshot.val();
            if(currenMessages!= null){
                this.setState({
                    message: currenMessages 
                })
            }
        })
    }

    updateMessage(e){
            this.setState({
                message: e.target.value
            });

        console.log(this.state.message)
    }

    submitMessage(){
        const message={
            id: this.state.message.length,
            text: this.state.message
        };

        //let listMessages = this.state.messages;
        //listMessages.push(message);
        //this.setState({
          //  messages: listMessages
        //});

        firebase.database().ref('messages/' + message.id).set(message);

        this.setState({message: ''});
    }

    render(){
        const Mensajeria= this.state.messages.map((message, i)=>{
            return(
                <li key={message.id} className="list-group-item list-group-item-action"> {message.text}</li>
            )
        })

        return(
             <div className="card">
                <div className="card-body">
                <ul className="list-group">
                { Mensajeria }
                </ul>
                </div>       

                <div className="card-footer">
                <input type="text" placeholder="Escribir mensaje" className="form-control" onChange={this.updateMessage} value={this.state.message}/ >
                </div>
                <button className="btn btn-primary btn-block" onClick={this.submitMessage}>Enviar mensaje</button>
             </div>
        )
    }
}

export default ChatRoom;