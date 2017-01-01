import React from 'react';

class Approval extends React.Component {
    unapprove() {
        this.props.onUnapprove(this.props.approval);
    }

    render(){
        return <li>{this.props.approval} <button onClick={this.unapprove.bind(this)}>delete</button></li>
    }
}

class Approvals extends React.Component {
    render() {
        if(this.props.approvals.length) {
            return (
                <ul>
                    {this.props.approvals.map((approval, index) => {
                        return <Approval approval={approval} key={index} onUnapprove={this.props.onUnapprove}/>;
                    })}
                </ul>
            );
        } else {
            return <div>no approvals yet</div>;
        }
    }
}

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {approvals: props.user.approvals};
      this.unapprove = this.unapprove.bind(this); // this line needed?
    }

    unapprove(target) {
        this.props.user.unapprove(target).then(() => {
            this.setState({approvals: this.props.user.approvals});
        });
    }

    render() {
        return (
            <div>
                <p>Your ethereum address is: {this.props.user.address}</p>
                <h3>Your Approvals:</h3>
                <Approvals approvals={this.state.approvals}
                    onUnapprove={this.unapprove}/>
            </div>
        );
    }
}

export {App, Approvals, Approval};
