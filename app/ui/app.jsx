import React from 'react';
import renderGraph from './renderGraph.js'

class InputAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {address: ''};

        this.submit = this.submit.bind(this)
        this.onChangeAddress = this.onChangeAddress.bind(this)
    }

    onChangeAddress(event) {
        this.setState({address: event.target.value});
    }

    submit() {
        this.props.onSubmit(this.state.address);
        this.setState({address: ''});
    }

    render(){
        return (
            <div>
                <input type="text" placeholder={this.props.placeholder} value={this.state.address}
                    onChange={this.onChangeAddress}/>
                <button onClick={this.submit}>{this.props.buttonText}</button>
            </div>
        )
    }
}

class DisplayCred extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        if(this.props.target) {
            return (
                <div>
                    Cred: {this.props.amount}<br/>
                    {this.props.target}
                </div>
            );
        } else {
            return null;
        }
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
        this.state = {
            credAmount: 0,
            credTarget: null,
            approvals: this.props.user.approvals,
            disapprovals: this.props.user.disapprovals
        };

        this.getCredFor = this.getCredFor.bind(this);
        this.approve = this.approve.bind(this);
        this.unapprove = this.unapprove.bind(this);
        this.disapprove = this.disapprove.bind(this);
        this.undisapprove = this.undisapprove.bind(this);
        this.renderGraph = this.renderGraph.bind(this);

        this.renderGraph();
    }

    renderGraph() {
        renderGraph(this.props.user.graph);
    }

    getCredFor(target) {
        var cred = this.props.user.getCredFor(target);
        this.setState({credAmount: cred, credTarget: target});
    }

    approve(target) {
        this.props.user.approve(target).then(() => {
            this.setState({approvals: this.props.user.approvals});
            this.renderGraph();
        });
    }

    unapprove(target) {
        this.props.user.unapprove(target).then(() => {
            this.setState({approvals: this.props.user.approvals});
            this.renderGraph();
        });
    }

    disapprove(target) {
        this.props.user.disapprove(target).then(() => {
            this.setState({disapprovals: this.props.user.disapprovals});
            this.renderGraph();
        });
    }

    undisapprove(target) {
        this.props.user.undisapprove(target).then(() => {
            this.setState({disapprovals: this.props.user.disapprovals});
            this.renderGraph();
        });
    }

    render() {
        return (
            <div>
                <p>Your ethereum address is: {this.props.user.address}</p>
                <h3>Calculate Cred</h3>
                <InputAddress onSubmit={this.getCredFor} placeholder="Get someone's cred..." buttonText="calculate"/>
                <DisplayCred amount={this.state.credAmount} target={this.state.credTarget}/>
                <h3>Your Approvals:</h3>
                <InputAddress onSubmit={this.approve} placeholder="New approval..." buttonText="add"/>
                <Approvals approvals={this.state.approvals}
                    onUnapprove={this.unapprove}/>
                <h3>Your Disapprovals:</h3>
                <InputAddress onSubmit={this.disapprove} placeholder="New disapproval..." buttonText="add"/>
                <Approvals approvals={this.state.disapprovals}
                    onUnapprove={this.undisapprove}/>
            </div>
        );
    }
}

export {App, Approvals, Approval};
