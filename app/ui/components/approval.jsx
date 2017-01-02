import React from 'react';

export default class Approval extends React.Component {
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
