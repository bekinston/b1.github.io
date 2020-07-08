import React from 'react'
import RulerControl from 'mapbox-gl-controls/lib/ruler';

import ReactDOM from 'react-dom'



class Checkbox extends React.Component{

  constructor(props){
    super(props);
    this.state = {flag: true};
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
     this.props.onLayerDisable(this.props.layerID, !this.state.flag);
    this.setState({flag: !this.state.flag});
  }


  render() {

    return (
      <div>
        <input type="checkbox" id={this.props.layerID} checked={this.state.flag} onChange={this.onClick}/>
        <label htmlFor={this.props.layerID} onClick={this.onLabelClick}>{this.props.symbol}</label>
      </div>
  )

  }


}

export default Checkbox;