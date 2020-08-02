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
        height: 400,
      },
      popupInfo: null,
    };
  }

  renderPopup(index) {
    return (
      this.state.popupInfo && (
        <Popup
          tipSize={5}
          style={{ backgroundColor: '#e0cda6' }}
          anchor='bottom-right'
          longitude={parseFloat(this.props.list[index].lng)}
          latitude={parseFloat(this.props.list[index].lat)}
          onMouseLeave={() => this.setState({ popupInfo: null })}
          closeOnClick={true}
        >
          <div className='container-fluid p-0'>
            <div className='d-flex align-items-center justify-content-center flex-column p-1'>
              {this.props.type !== 'Outbreak Regions' ? (
                <div>
                  <div>
                    <strong>Name:</strong>
                    {console.log(this.props.list)}
                    {this.props.type === 'Health Centers'
                      ? this.props.list[index].name
                      : this.props.list[index].animal.owner.name}
                  </div>
                  <div>
                    <strong>Address:</strong>
                    {this.props.type === 'Health Centers'
                      ? this.props.list[index].address
                      : this.props.list[index].animal.owner.address}
                  </div>
                  <div>
                    <strong>Pin:</strong>
                    {this.props.type === 'Health Centers'
                      ? this.props.list[index].pincode
                      : this.props.list[index].animal.owner.pincode}
                  </div>
                </div>
              ) : (
                <div>
                  <strong>Disease:</strong>
                  {this.props.list[index].disease.name}
                </div>
              )}
            </div>
          </div>
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
          <div className='container-fluid p-0'>
            <div className='d-flex align-items-center justify-content-center flex-column p-1'>
              <div>
                <strong>Name:</strong>

                {this.props.list1[index].patientName}
              </div>
              <div>
                <strong>Address:</strong>

                {this.props.list1[index].patientAddress}
              </div>
              <div>
                <strong>Pin:</strong>
                {this.props.list1[index].pincode}
              </div>
            </div>
          </div>
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
            {this.props.list !== undefined && this.props.list.length !== 0
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
                          name={
                            this.props.type === 'Health Centers'
                              ? 'hospital'
                              : 'marker'
                          }
                          style={{
                            color:
                              this.props.type === 'Health Centers'
                                ? 'green'
                                : 'red',
                          }}
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
