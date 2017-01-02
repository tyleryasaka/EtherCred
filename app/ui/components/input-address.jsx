import React from 'react';

export default class InputAddress extends React.Component {
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
