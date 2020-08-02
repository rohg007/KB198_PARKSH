import React, { Component } from 'react';
import MapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import { Icon } from 'semantic-ui-react';
const TOKEN =
  'pk.eyJ1Ijoia2h5YXRpZ295YWwiLCJhIjoiY2tkYzEzNmRzMGdyaDJ6bmJjdjNyaTl0YSJ9.aisE6mPwz0csjL-u1f6xyA';
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px',
};

const markerList = [
  { lat: 17.441013, long: 78.391796, info: 10 },
  { lat: 17.442889, long: 78.396073, info: 20 },
  { lat: 17.441681, long: 78.394357, info: 10 },
];
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 26.92207,
        longitude: 75.778885,
        zoom: 7,
        bearing: 0,
        pitch: 0,
        width: '100%',
        height: 500,
      },
      popupInfo: null,
    };
  }

  // showDetails=() => {
  // this.setState({popupInfo: true});
  // }

  // hideDetails= ()=> {
  // this.setState({popupInfo: null});
  // }

  renderPopup(index) {
    return (
      this.state.popupInfo && (
        <Popup
          tipSize={5}
          anchor='bottom-right'
          longitude={parseFloat(this.props.list[index].lng)}
          latitude={parseFloat(this.props.list[index].lat)}
          onMouseLeave={() => this.setState({ popupInfo: null })}
          closeOnClick={true}
        >
          {/* <p>Total Affected:{this.props.list[index].total_affected}</p>
          <p>Total Recovered:{this.props.list[index].total_recovered}</p>
          <p>Total Deaths:{this.props.list[index].total_deaths}</p> */}
        </Popup>
      )
    );
  }
  renderPopup1(index) {
    return (
      this.state.popupInfo && (
        <Popup
          tipSize={5}
          anchor='bottom-right'
          longitude={parseFloat(this.props.list1[index].lng)}
          latitude={parseFloat(this.props.list1[index].lat)}
          onMouseLeave={() => this.setState({ popupInfo: null })}
          closeOnClick={true}
        >
          {/* <p>Total Affected:{this.props.list[index].total_affected}</p>
          <p>Total Recovered:{this.props.list[index].total_recovered}</p>
          <p>Total Deaths:{this.props.list[index].total_deaths}</p> */}
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    return (
      <div
        className='container-fluid p-0'
        style={{ borderRadius: '5px', borderColor: 'black' }}
      >
        <div className='text-center pb-2'>
          <p style={{ fontSize: '18px', fontWeight: '600' }}>
            {this.props.type}
          </p>
        </div>
        <MapGL
          {...viewport}
          onViewportChange={(viewport) => this.setState({ viewport: viewport })}
          mapStyle='mapbox://styles/mapbox/streets-v10'
          mapboxApiAccessToken={TOKEN}
        >
          <div className='nav' style={navStyle}>
            <NavigationControl
              onViewportChange={(viewport) =>
                this.setState({ viewport: viewport })
              }
            />
            {this.props.list.length !== 0
              ? this.props.list.map((marker, index) => {
                  return (
                    <div key={index}>
                      {' '}
                      <Marker
                        longitude={parseFloat(marker.lng)}
                        latitude={parseFloat(marker.lat)}
                        name={index}
                      >
                        <Icon
                          name='marker'
                          style={{ color: 'red' }}
                          onMouseEnter={() =>
                            this.setState({ popupInfo: true })
                          }
                          onMouseLeave={() =>
                            this.setState({ popupInfo: null })
                          }
                        />
                      </Marker>{' '}
                      {this.renderPopup(index)}
                    </div>
                  );
                })
              : null}
            {this.props.list1 !== undefined && this.props.list1.length !== 0
              ? this.props.list1.map((marker, index1) => {
                  return (
                    <div key={index1}>
                      {' '}
                      <Marker
                        longitude={parseFloat(marker.lng)}
                        latitude={parseFloat(marker.lat)}
                        name={index1}
                      >
                        <Icon
                          name='marker'
                          style={{ color: 'blue' }}
                          onMouseEnter={() =>
                            this.setState({ popupInfo: true })
                          }
                          onMouseLeave={() =>
                            this.setState({ popupInfo: null })
                          }
                        />
                      </Marker>{' '}
                      {this.renderPopup1(index1)}
                    </div>
                  );
                })
              : null}
          </div>
        </MapGL>
      </div>
    );
  }
}
