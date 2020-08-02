import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Maps from './map.jsx';
import GetAllHealthCenters from '../api/healthCenters/getAllhealthCenter.jsx';
import Loading from './loading/loading.jsx';

var sectionStyle = {
  backgroundColor: '#e0cda6',
  width: '100%',
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'auto',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};
function AllHealthCenters() {
  let history = useHistory();
  const [healthCenters, setHealthCenters] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [overAllError, setOverAllError] = React.useState('');
  useEffect(() => {
    try {
      setLoading(true);
      GetAllHealthCenters()
        .then((responses) => {
          setHealthCenters(responses.data);
          setOverAllError('');
          setLoading(false);
        })
        .catch((error) => {
          setOverAllError("Can't able to fetch data!");
          setLoading(false);
        });
    } catch (err) {
      setOverAllError('Server Error!');
    }
  }, []);
  return (
    <div className='container-fluid p-0' style={sectionStyle}>
      {loading ? (
        <div
          style={{
            height: '80vh',
          }}
          className='d-flex align-items-center justify-content-center'
        >
          <Loading />
        </div>
      ) : (
        <div className='p-3'>
          {overAllError !== '' ? (
            <div
              className='p-3 text-center'
              style={{
                color: '#ec547a',
                fontWeight: '500',
              }}
            >
              {overAllError}
            </div>
          ) : null}
          <div
            className='text-center pb-2'
            style={{
              fontSize: '24px',
              fontWeight: '500',
            }}
          >
            Health Centers
          </div>
          <Maps list={healthCenters} />
          {localStorage.user &&
          JSON.parse(localStorage.getItem('user')).email ===
            'admin@gmail.com' ? (
            <table className='table table-striped table-active'>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>In-charge</th>
                  <th>Official Email</th>
                  <th>Contact Info</th>
                  <th>Address</th>
                  <th>Total Affected</th>
                  <th>Total Deaths</th>
                  <th>Total Recovered</th>
                </tr>
              </thead>
              <tbody>
                {healthCenters.map((healthCenter, i) => {
                  return (
                    <tr key={healthCenter._id}>
                      <th scope='row'>{i + 1}</th>
                      <td>{healthCenter.name}</td>
                      <td>{healthCenter.incharge}</td>
                      <td>{healthCenter.email}</td>
                      <td>{healthCenter.contact}</td>
                      <td>{healthCenter.address}</td>
                      <td>{healthCenter.total_affected}</td>
                      <td>{healthCenter.total_deaths}</td>
                      <td>{healthCenter.total_recovered}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            history.push('/loginPage')
          )}
        </div>
      )}
    </div>
  );
}

export default AllHealthCenters;
