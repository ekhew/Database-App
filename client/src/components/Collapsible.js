import './Collapsible.css';
import React from 'react';

class Collapsible extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e){
        this.setState({open: !this.state.open})
    }

    render() {
        return (
            <div className="whole">
                <div onClick={(e)=>this.togglePanel(e)} className='header'>
                    <h4>{this.props.title}</h4>
                    <p>{this.props.category}</p>
                </div>
                {this.state.open ? (<div className='content'>{this.props.children}</div>) : null}
            </div>
        );
    }
}

export default Collapsible;