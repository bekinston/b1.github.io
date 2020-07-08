import React from "react";
import FilterBox from './FilterBox'
import LeftSideBar from "./LeftSideBar";
import RulerControl from 'mapbox-gl-controls/lib/ruler';
import mapboxgl from "mapbox-gl";
import ZoomControl from 'mapbox-gl-controls/lib/zoom';
import CompassControl from 'mapbox-gl-controls/lib/compass';
import { MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher/dist/index';
import "mapbox-gl-style-switcher/styles.css";
import "@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl-infobox/styles.css";
import {MapboxStyleDefinition} from "mapbox-gl-style-switcher";
import { MapboxGradientBoxControl, MapboxInfoBoxControl } from "mapbox-gl-infobox";


class MapboxInfoBoxOptions {
}

class Map extends React.Component {
    bounds = [[ 46.519, 38.800],
        [ 87.575, 55.785]];

    mapRef = React.createRef();


    constructor(props) {
        super(props);
        this.map = undefined;
        this.state = {is_map_ready: false, curr_category: 'minning', layers_id: []};
        this.onLayerDisable = this.onLayerDisable.bind(this);
        this.displayRightBox = this.displayRightBox.bind(this);
        this.updateLayersList = this.updateLayersList.bind(this);

    }


    onLayerDisable(layerID, flag) {
        this.map.setLayoutProperty(layerID, 'visibility', flag ? 'visible' : 'none');
    }


    componentDidMount() {
        const customData = {
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Балхашская обогатительная фабрика',
                    },
                    'geometry': {
                        'coordinates': [74.962047,46.835505],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Карагайлинская обогатительная фабрика',
                    },
                    'geometry': {
                        'coordinates': [75.727, 49.3734],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Нурказаганская обогатительная фабрика',
                    },
                    'geometry': {
                        'coordinates': [72.9990005493164,
                            50.1525962472704],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Белоусовский ГО',
                    },
                    'geometry': {
                        'coordinates': [82.508333,
                            50.130556],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Балхашский медеплавильный завод',
                    },
                    'geometry': {
                        'coordinates': [74.92074966430664,
                            46.79953064842845],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Жезказганский медеплавильный завод',
                    },
                    'geometry': {
                        'coordinates': [67.71404027938843,
                            47.77387266516034],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'ГРЭС Топар',
                    },
                    'geometry': {
                        'coordinates': [72.79201984405518,
                            49.51281043819422],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'ГРЭС 1 (Экибастуз)',
                    },
                    'geometry': {
                        'coordinates': [75.3767,
                            51.8856],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'ГРЭС 2 (Экибастуз)',
                    },
                    'geometry': {
                        'coordinates': [75.4744,
                            52.0223],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'р. Молодежный',
                    },
                    'geometry': {
                        'coordinates': [73.6578369140625,
                            50.850174109831975],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'р. Абыз',
                    },
                    'geometry': {
                        'coordinates': [76.49316787719727,
                            49.42392727883298],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'р. Саяк 4',
                    },
                    'geometry': {
                        'coordinates': [ 77.40314483642578,
                            46.995943601556846],
                        'type': 'Point'
                    }},
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'р. Акунгур (Байканурская пл.',
                    },
                    'geometry': {
                        'coordinates': [63.953811,
                            47.056847],
                        'type': 'Point'
                    }},
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Мизерное (Сымтасская пл.)',
                    },
                    'geometry': {
                        'coordinates': [63.622092,
                            48.414658],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'месторождение Самарское',
                    },
                    'geometry': {
                        'coordinates': [70.82696914672852,
                            50.21901224176093],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Каражыра',
                    },
                    'geometry': {
                        'coordinates': [78.7304,
                            50.0182],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'месторождение Саран',
                    },
                    'geometry': {
                        'coordinates': [77.063944,
                            49.499483],
                        'type': 'Point'
                    }},
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'месторождение Анисимов ключ',
                    },
                    'geometry': {
                        'coordinates': [ 82.024722,
                            50.654633],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Акбакай',
                    },
                    'geometry': {
                        'coordinates': [72.69533157348633,
                            45.119114089314834],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'р.Аксу',
                    },
                    'geometry': {
                        'coordinates': [71.9807481765747,
                            52.478546077429655],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'р. Бестобе',
                    },
                    'geometry': {
                        'coordinates': [73.0965,52.4956],
                        'type': 'Point'
                    }},
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'р. Жолымбет',
                    },
                    'geometry': {
                        'coordinates': [71.7278802394867,
                            51.75079298636631],
                        'type': 'Point'
                    }},
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'р. Кусмурун',
                    },
                    'geometry': {
                        'coordinates': [76.49316787719727,
                            49.42392727883298],
                        'type': 'Point'
                    }},
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Иртышская шахта',
                    },
                    'geometry': {
                        'coordinates': [84.008961,
                            50.533744],
                        'type': 'Point'
                    }},
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Артемьевская шахта',
                    },
                    'geometry': {
                        'coordinates': [85.542986,
                            48.165886],
                        'type': 'Point'
                    }},
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Юбилейно-Снигирихинская шахта',
                    },
                    'geometry': {
                        'coordinates': [82.45307922363281,
                            48.4096051101276],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Бенкала',
                    },
                    'geometry': {
                        'coordinates': [61.753589,
                            51.284472],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'месторождение Хаджиконган',
                    },
                    'geometry': {
                        'coordinates': [77.70904541015625,
                            48.643968526999636],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'з. Жаур',
                    },
                    'geometry': {
                        'coordinates': [72.88124084472656,
                            49.991325511501145],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'р. Акбастау',
                    },
                    'geometry': {
                        'coordinates': [77.748758, 48.614189],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'з. Шешенкара',
                    },
                    'geometry': {
                        'coordinates': [74.01909828186035,
                            49.96626687700201],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Западный Хаджиконган',
                    },
                    'geometry': {
                        'coordinates': [ 73.954419,
                            49.866553],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Жосалы',
                    },
                    'geometry': {
                        'coordinates': [74.81157302856445,
                            49.92300452855755],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Жетимшокы',
                    },
                    'geometry': {
                        'coordinates': [74.80595111846924,
                            49.91851450867772],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Коктас-Шарыкты',
                    },
                    'geometry': {
                        'coordinates': [75.05374431610107,
                            49.60751189256275],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'з.Коктас-Жартас',
                    },
                    'geometry': {
                        'coordinates': [72.68395900726318,
                            49.52325831824471],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'р. Мизек',
                    },
                    'geometry': {
                        'coordinates': [77.42125511169434,
                            48.874594774822924],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Балхашская ТЭЦ',
                    },
                    'geometry': {
                        'coordinates': [ 74.91439819335938,
                            46.860777906337255],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Куу-Чек',
                    },
                    'geometry': {
                        'coordinates': [ 73.4015,50.2356],
                        'type': 'Point'
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'title': 'Жезказганская ТЭЦ',
                    },
                    'geometry': {
                        'coordinates': [67.74794340133667,
                            47.784961083532664],
                        'type': 'Point'
                    }
                }
            ],
            'type': 'FeatureCollection'
        };
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmVrdGFsZ2F0MSIsImEiOiJjazhwcmUyZDgwMXA4M2VxZW10Zmx1eXZ6In0.p6-S6e_jogCGmYxO2qo3OA';
        const styles: MapboxStyleDefinition[] = [
            {
                title: "Спутник",
                uri: "mapbox://styles/bektalgat1/ckbj6e8ld25ju1iqhlyxpnzqp"
            },
            {
                title: "Темная",
                uri: "mapbox://styles/bektalgat1/ckcd7v1tm0gi71iupnrtjt4jf"
            },
            {
                title: "Географическая",
                uri: "mapbox://styles/bektalgat1/ckbiwct4e1t2i1iljnnpnpkf3"
            }
        ];
        this.map = new mapboxgl.Map({
            container: this.mapRef.current,
            style: 'mapbox://styles/bektalgat1/ckbiwct4e1t2i1iljnnpnpkf3',
            center: [46.957, 69.155],
            zoom: 1.5,
        });
        //ruler
        this.map.setMaxBounds(this.bounds);
        this.map.addControl(new RulerControl(), 'bottom-right');
        this.map.on('ruler.on', () => console.log('ruler: on'));
        this.map.on('ruler.off', () => console.log('ruler: off'));
        //zoom
        this.map.addControl(new ZoomControl(), 'bottom-right');
        this.map.addControl(new CompassControl(), 'bottom-right');
        this.map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                zoom: 14,
                reverseGeocode: true,

                localGeocoder: function forwardGeocoder(query) {
                    const matchingFeatures = [];
                    for (let i = 0; i < customData.features.length; i++) {
                        let feature = customData.features[i];
// handle queries with different capitalization than the source data by calling toLowerCase()
            if (
                feature.properties.title
                    .toLowerCase()
                    .search(query.toLowerCase()) !== -1
            ) {
// add a tree emoji as a prefix for custom data results
// using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
                feature['place_name'] = '🗻' + feature.properties.title;
                feature['center'] = feature.geometry.coordinates;
                feature['place_type'] = ['park'];
                matchingFeatures.push(feature);
            }
        }
        return matchingFeatures;
    },
                localGeocoderOnly: true,
                placeholder: 'Поиск',
            }), 'bottom-left');

        this.map.addControl(new MapboxStyleSwitcherControl(styles), "bottom-right");
        this.map.on('style.load', () => {
            this.map.addSource('places', {'type': 'geojson', 'data': this.props.data});
            this.map.addSource('lines', {'type': 'geojson', 'data': this.props.data});
            this.setState({is_map_ready: true});
        });
    }


    displayRightBox(ind){
    this.setState({curr_category: ind});
  }

  updateLayersList(category){
    const layers_id = [];
    this.props.data.features.forEach((feature)=>{
      const symbol = feature.properties['icon'];
      const name = feature.name;
      const layerID = 'poi_' + name;
      if(!layers_id.find((e, i, p) => e[0]===layerID && e[1]===name)  && feature.properties['category'] === category){
        layers_id.push([layerID, name]);
      }

    });
    this.setState({layers_id: layers_id});
  }



  render() {
    // const rightBox = [
    //   <FilterBox map_ready={this.state.is_map_ready} map={this.map} data={this.props.data} onLayerDisable={this.onLayerDisable}/>,
    //   <Production map_ready={this.state.is_map_ready} map={this.map} data={this.props.data.production} onLayerDisable={this.onLayerDisable}/>
    // ];
    return (
      <div>
        <LeftSideBar is_map_ready={this.state.is_map_ready} map={this.map} onLayerDisable={this.onLayerDisable} displayRightBox={this.displayRightBox} update_layers={this.updateLayersList} layers_id={this.state.layers_id}/>
        <div ref={this.mapRef} className="absolute top right left bottom" />
        <FilterBox map_ready={this.state.is_map_ready} map={this.map} data={this.props.data} onLayerDisable={this.onLayerDisable} category={this.state.curr_category} layers_id={this.state.layers_id} />
      </div>
    );
  }
}



export default Map;
