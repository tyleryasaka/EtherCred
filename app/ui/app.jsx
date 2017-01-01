import React from 'react';

class NewApproval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {address: ''};

        this.approve = this.approve.bind(this)
        this.onChangeAddress = this.onChangeAddress.bind(this)
    }

    onChangeAddress(event) {
        this.setState({address: event.target.value});
    }

    approve() {
        this.props.onApprove(this.state.address);
        this.setState({address: ''});
    }

    render(){
        return (
            <div>
                <input type="text" placeholder="New approval..." value={this.state.address}
                    onChange={this.onChangeAddress}/>
                <button onClick={this.approve}>Add</button>
            </div>
        )
    }
}

class Approval extends React.Component {
    constructor(props) {
        super(props);
        this.unapprove = this.unapprove.bind(this)
    }

    unapprove() {
        this.props.onUnapprove(this.props.approval);
    }

    render(){
        return <li>{this.props.approval} <button onClick={this.unapprove}>delete</button></li>
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
        this.state = {approvals: this.props.user.approvals};

        this.unapprove = this.unapprove.bind(this);
        this.approve = this.approve.bind(this);
    }

    approve(target) {
        this.props.user.approve(target).then(() => {
            this.setState({approvals: this.props.user.approvals});
        });
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
                <NewApproval onApprove={this.approve}/>
                <Approvals approvals={this.state.approvals}
                    onUnapprove={this.unapprove}/>
            </div>
        );
    }
}

export {App, Approvals, Approval};
