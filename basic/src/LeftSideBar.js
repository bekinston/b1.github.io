import React from 'react'
import ReactDOM from 'react-dom'

import Checkbox from "./Checkbox";

class LeftCheckBox extends React.Component{

  constructor(props){
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onLabelClick = this.onLabelClick.bind(this);
    this.state = {flag: 1};
    this.props.map.addLayer({
      'id': this.props.category,
      'type': 'symbol',
      'source': 'places',
      'filter': ['==', 'category', this.props.category],
    });
  }

  onClick(e) {

    this.props.layers_id.forEach((e) => {
      this.props.onLayerDisable(e[0], !this.state.flag);
    });

    this.setState({flag: !this.state.flag});
  }

  onLabelClick(e){
    //e.preventDefault();
    this.props.update_layers(this.props.category);
  }

  render() {

    return (
        <div>
          <input type="checkbox" id={this.props.category} checked={this.state.flag} onChange={this.onClick}/>
          <label htmlFor={this.props.category} onClick={this.onLabelClick}>{this.props.symbol}</label>
        </div>
    )
  }

}

class LeftSideBar extends React.Component{

  constructor(props){
    super(props);

  }

  render() {
    let boxes = [];
    if(this.props.is_map_ready){
      boxes = [
        <LeftCheckBox layers_id={this.props.layers_id} update_layers={this.props.update_layers} symbol="Инфраструктуры"  map={this.props.map} onLayerDisable={this.props.onLayerDisable} category="info" displayRightBox={this.props.displayRightBox}/>,
        <LeftCheckBox layers_id={this.props.layers_id} update_layers={this.props.update_layers} symbol="Месторождения" map={this.props.map} onLayerDisable={this.props.onLayerDisable} category="minning" displayRightBox={this.props.displayRightBox}/>,
        <LeftCheckBox layers_id={this.props.layers_id} update_layers={this.props.update_layers} symbol="Производства"  map={this.props.map} onLayerDisable={this.props.onLayerDisable} category="production" displayRightBox={this.props.displayRightBox}/>,
        <LeftCheckBox layers_id={this.props.layers_id} update_layers={this.props.update_layers} symbol="Энергетика"  map={this.props.map} onLayerDisable={this.props.onLayerDisable} category="energy" displayRightBox={this.props.displayRightBox}/>,
        <LeftCheckBox layers_id={this.props.layers_id} update_layers={this.props.update_layers} symbol="Переработка"  map={this.props.map} onLayerDisable={this.props.onLayerDisable} category="processing" displayRightBox={this.props.displayRightBox}/>]
    }

    return (
        <div className="sidebar filter-group">

          {boxes}
        </div>
    )

  }
}

export default LeftSideBar;

