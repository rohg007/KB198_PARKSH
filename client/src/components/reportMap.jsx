import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
} from 'react-google-maps';

const Map = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={12}>
      {props.marks.map((mark, index) => (
        <Circle
          key={index}
          center={mark}
          radius={1000}
          options={{
            strokeColor: '#66009a',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: `#66009a`,
            fillOpacity: 0.35,
            zIndex: 1,
          }}
        />
      ))}
    </GoogleMap>
  ))
);
export default Map;
// class ReportsPage extends Component {
//   state = {
//     marks: [],
//   };

//   setMark = (e) => {
//     this.setState({ marks: [...this.state.marks, e.latLng] });
//   };

//   deleteMarkS = () => {
//     this.setState({
//       marks: [],
//     });
//   };

//   render() {
//     const { marks } = this.state;
//     return (
//       <div>
//         <button onClick={this.deleteMark}>DELETE MARKS</button>
//         <Map
//           googleMapURL="http://maps.googleapis.com/maps/api/js?key=['AIzaSyAlmuRLyMRm69-3f4TprA3MWAX5IJm1CT8']"
//           loadingElement={<div style={{ height: `100%` }} />}
//           containerElement={<div style={{ height: `400px` }} />}
//           mapElement={<div style={{ height: `100%` }} />}
//           onMapClick={this.setMark}
//           marks={marks}
//         />
//         ;
//       </div>
//     );
//   }
// }

// export default ReportsPage;
