import React from 'react'
import ReactDOM from 'react-dom'

import Checkbox from './Checkbox'

import mapboxgl from "mapbox-gl";
import {MapboxInfoBoxControl} from "mapbox-gl-infobox";

class FilterBox extends React.Component{

  constructor(props){

    super(props);

    console.log(this.props.data);

  }



  render(){


    const layers_id = [];
    if(this.props.map_ready){
      this.props.data.features.forEach((feature)=>{

        const symbol = feature.properties['icon'];
        const name = feature.name;
        const layerID = 'poi_' + name;

        if(!this.props.map.getLayer(layerID)){
          this.props.map.addLayer({
            'id': layerID,
            'type': 'symbol',
            'source': 'places',
            'layout': {
              "text-size": 15,
              "icon-allow-overlap": false,
              "icon-ignore-placement": false,
              'text-field': ['get', 'name'],
              'text-variable-anchor': ['top'],
              'text-font': ["DIN Pro Medium"],
              'text-padding':15,
              'icon-size': 0.5,
              'icon-image': symbol
            },
            paint: {
              "text-halo-width": 1,
              "text-halo-blur":1,
              "text-halo-color":"#000000",
              "text-color": "#ffffff"
            },
            'filter': ['==', 'title', name],
          });
          this.props.map.addLayer({
            'id': layerID,
            'type': 'line',
            'source': 'lines',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-opacity': 0.7,
              'line-color': ['get', 'color'],
              'line-width': ['get', 'stroke-width']
            },
            'filter': ['==', 'title', name],
          });

          layers_id.push([layerID, name]);
          this.props.map.on('mouseenter', layerID, () => {
            this.props.map.getCanvas().style.cursor = 'pointer';
          });

          this.props.map.on('mouseleave', layerID, () => {
            this.props.map.getCanvas().style.cursor = '';
          });
          this.props.map.on('click', layerID, (a) => {
            console.log(a);

            const overlay = document.getElementById('map-overlay');
            const coordinates = a.features[0].geometry.coordinates.slice();
            const description = a.features[0].properties.description;
            overlay.innerHTML = description;
          });
        }
      });
    }



    const checkboxes = this.props.layers_id.map((layer) =>
        <Checkbox key={Math.ceil(Math.random()*1000000)} layerID={layer[0]} symbol={layer[1]} onLayerDisable={this.props.onLayerDisable}/>
    );
    return (
        <div>
          <div id="map-legend" className="map-legend">
            <p1>
            <img src="https://sun9-70.userapi.com/c855424/v855424454/243197/eKI4ilfgbcU.jpg" alt="Girl in a jacket" width="390" height="40"></img>
            </p1>
          </div>
          <div id="map-overlay" className="map-overlay">
            <h1>краткая инструкция использования</h1>
            <h2>для поиска воспользуйтесь полем снизу</h2>
            <h2>для фильтрации нажмите на слой 1 раз</h2>
            <h2>для смены стиля воспользуйтесь свитчером</h2>
          </div>
          <nav id="filter-group" className="filter-group">{checkboxes}</nav>
        </div>


    );


  }

}

export default FilterBox;
