import React from 'react';
import {render} from 'react-dom';
import renderGraph from './renderGraph.js'

class InputAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {address: '', isValid: false, isDirty: false, isLoading: false};

        this.submit = this.submit.bind(this)
        this.onChangeAddress = this.onChangeAddress.bind(this)
    }

    onChangeAddress(event) {
        var validAddress = /^0[xX][0-9a-fA-F]{40}$/;
        var isValid = validAddress.test(event.target.value);
        var isDirty = Boolean(event.target.value.length);
        this.setState({address: event.target.value, isDirty, isValid});
    }

    submit() {
        if(this.state.isValid) {
            this.props.onSubmit(this.state.address, () => {
                this.setState({isLoading: false});
            });
            if(this.props.async) {
                this.setState({address: '', isValid: false, isDirty: false, isLoading: true});
            }
        } else {
            this.setState({isValid: true});
        }
    }

    inputClass() {
        var names = ['input'];
        if(this.state.isDirty) {
            if(this.state.isValid) {
                names.push('is-success');
            } else {
                names.push('is-danger');
            }
        }
        return names.join(' ');
    }

    submitClass() {
        var names = ['button'];
        if(!this.state.isValid && !this.state.isLoading) {
            names.push('is-disabled');
        }
        if(this.state.isLoading) {
            names.push('is-loading');
        }
        return names.join(' ');
    }

    render(){
        return (
            <div className="control has-addons">
                <input type="text" placeholder={this.props.placeholder} value={this.state.address}
                    onChange={this.onChangeAddress} className={this.inputClass()}/>
                <a className={this.submitClass()} onClick={this.submit}>{this.props.buttonText}</a>
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
                    <span className="tag is-dark">
                        Cred: {this.props.amount}
                    </span>
                    &nbsp;
                    for {this.props.target}
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
        this.state = {isLoading: false};

        this.unapprove = this.unapprove.bind(this);
    }

    unapprove() {
        this.props.onUnapprove(this.props.approval, () => {
            this.setState({isLoading: false});
        });
        this.setState({isLoading: true});
    }

    removeButtonClass() {
        var names = ['button'];
        if(this.state.isLoading) {
            names.push('is-loading');
        }
        return names.join(' ');
    }

    render(){
        return (
            <tr>
                <td>{this.props.approval}</td>
                <td><a className={this.removeButtonClass()} onClick={this.unapprove}>delete</a></td>
            </tr>
        );
    }
}

class Approvals extends React.Component {
    render() {
        if(this.props.approvals.length) {
            return (
                <table className="table">
                    <tbody>
                        {this.props.approvals.map((approval, index) => {
                            return <Approval approval={approval} key={index} onUnapprove={this.props.onUnapprove}/>;
                        })}
                    </tbody>
                </table>
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

        this.refreshData = this.refreshData.bind(this);
        this.renderGraph = this.renderGraph.bind(this);
        this.getCredFor = this.getCredFor.bind(this);
        this.approve = this.approve.bind(this);
        this.unapprove = this.unapprove.bind(this);
        this.disapprove = this.disapprove.bind(this);
        this.undisapprove = this.undisapprove.bind(this);
    }

    componentDidMount() {
        this.renderGraph();
    }

    refreshData() {
        this.renderGraph();
        this.updateCred();
    }

    renderGraph() {
        renderGraph(this.props.user.graph);
    }

    updateCred() {
        if(this.state.credTarget) {
            this.getCredFor(this.state.credTarget);
        }
    }

    getCredFor(target) {
        var cred = this.props.user.getCredFor(target);
        this.setState({credAmount: cred, credTarget: target});
    }

    approve(target, onFinish) {
        this.props.user.approve(target).then(() => {
            onFinish();
            this.setState({approvals: this.props.user.approvals});
            this.refreshData();
        });
    }

    unapprove(target, onFinish) {
        this.props.user.unapprove(target).then(() => {
            onFinish();
            this.setState({approvals: this.props.user.approvals});
            this.refreshData();
        });
    }

    disapprove(target, onFinish) {
        this.props.user.disapprove(target).then(() => {
            onFinish();
            this.setState({disapprovals: this.props.user.disapprovals});
            this.refreshData();
        });
    }

    undisapprove(target, onFinish) {
        this.props.user.undisapprove(target).then(() => {
            onFinish();
            this.setState({disapprovals: this.props.user.disapprovals});
            this.refreshData();
        });
    }

    render() {
        return (
            <div>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                EtherCred
                            </h1>
                            <h2 className="subtitle">
                                An online credibility network built on ethereum
                            </h2>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container app">
                        <div className="box">
                            Your ethereum address is: {this.props.user.address}
                        </div>
                        <div className="box">
                            <h3>Calculate Cred</h3>
                            <InputAddress onSubmit={this.getCredFor} placeholder="Get someone's cred..." buttonText="calculate"/>
                            <DisplayCred amount={this.state.credAmount} target={this.state.credTarget}/>
                        </div>
                        <div className="box">
                            <h3>Your Approvals</h3>
                            <InputAddress onSubmit={this.approve} placeholder="New approval..."
                                async={true} buttonText="add"/>
                            <Approvals approvals={this.state.approvals}
                                onUnapprove={this.unapprove}/>
                        </div>
                        <div className="box">
                            <h3>Your Disapprovals</h3>
                            <InputAddress onSubmit={this.disapprove} placeholder="New disapproval..."
                                async={true} buttonText="add"/>
                            <Approvals approvals={this.state.disapprovals}
                                onUnapprove={this.undisapprove}/>
                        </div>
                        <div className="box">
                            <div id="user-graph"></div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

function renderApp(user) {
    render(<App user={user}/>, document.getElementById('app'));
}

export default renderApp;
