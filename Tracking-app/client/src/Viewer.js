import React, { Component , createRef} from 'react'
import io from 'socket.io-client';
import './App.css';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import Basemap from './Basemaps';
var myIcon= L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
    iconSize: [25, 41],
    iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -41],
    
  
  });

 
let socket;
const ENDPOINT = 'localhost:5000';
export default class Viewer extends Component {
    state={
        location : [

        ],
        lat: 31.830153700000004,
        lng: -7.3157547,
        zoom: 5,
        isMapInit: false,
        basemap: 'osm',
    }
    onBMChange = (bm) => {
      // console.log(this);
      this.setState({
        basemap: bm
      });
    }
  
  
    componentDidMount(){
        socket = io(ENDPOINT);
        socket.on('locationsUpdate', locations => {
          
            this.setState({
                location: locations,
            })
            console.log(this.state.location)
            
          })


        setInterval(() => {
            socket.emit('requestLocations',this.props.match.params.username)
          }, 2000)
    }
    render() {
      const basemapsDict = {
        osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        hot: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        dark:"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        cycle: "https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
      }
        const position = [this.state.lat, this.state.lng]
        return (
          <div>
            <Map className="map" center={position} zoom={this.state.zoom} > 
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       <TileLayer
          // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={basemapsDict[this.state.basemap]}
        />
        <Basemap basemap={this.state.basemap} onChange={this.onBMChange}/>


       
      
         {this.state.location.map((cor,index)=>{
             return(
        <Marker key={`marker-${index}`} position={cor[1]} icon={myIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
             )
         })}
      </Map>
      </div>
        )
    }
}
/*
import React, { Component } from 'react';
import Control from 'react-leaflet-control';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
 
export default class Viewer extends Component {
 
   state = {
      center: [51.3, 0.7]
    }
  render(){
    return(
      <div>
<Map
    className="map"
      center={this.state.center}
      zoom={10}
    >
      <ZoomControl position="topright" />
      <TileLayer
        url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={18}
      />
      
      <Control position="topleft" >
        <button 
          onClick={ () => this.setState({bounds: [51.3, 0.7]}) }
        >
          Reset View
        </button>
      </Control>
    </Map>
      </div>
  
    )
    
  }
}*/
 
/*
import React, { Component } from "react";
import LeafletReactTrackPlayer from "leaflet-react-track-player";
import demo from "./demo";
import { Map, TileLayer } from "react-leaflet";
import './App.css';



export default class Viewer extends Component {
  state = {
    lat: 47.445745,
    lng: 40.272891666666666,
    zoom: 15,
    type: "distance",
    demo: demo
  };

  render() {
    const position = [demo[0].lat, demo[0].lng];
    return (
      <div className="map">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <LeafletReactTrackPlayer
            track={this.state.demo}
            optionMultyIdxFn={function(p) {
              return p.status;
            }}
            optionsMulty={[
              { color: "#b1b1b1" },
              { color: "#06a9f5" },
              { color: "#202020" },
              { color: "#D10B41" },
              { color: "#78c800" }
            ]}
            progressFormat={this.state.type}
            customMarker={true}
            changeCourseCustomMarker={true}
            iconCustomMarker={"/img/mech.svg"}
          />
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    );
  }
}

*/