import React, { useEffect } from 'react';
import Loading from './loading/loading.jsx';
import GetAllHumanCases from '../api/humanCases/getAllhumanCase.jsx';
import UpdateHumanCase from '../api/humanCases/updatehumanCase.jsx';
import UpdateHealthCenter from '../api/healthCenters/updatehealthCenter';
import UpdateDisease from '../api/diseases/updateDisease';

import 'bootstrap/dist/css/bootstrap.css';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
} from 'reactstrap';

import editImage from '../images/edit.png';

var sectionStyle = {
  backgroundColor: '#e0cda6',
  width: '100%',
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'auto',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};
function Human_Case() {
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [humanCases, setHumanCases] = React.useState([]);
  const [overAllError, setOverAllError] = React.useState('');
  const [statusValue, setStatusValue] = React.useState('');
  const [Id, setId] = React.useState(0);
  useEffect(() => {
    try {
      setLoading(true);
      let user = JSON.parse(localStorage.getItem('user'));
      GetAllHumanCases()
        .then((responses) => {
          if (user.email === 'admin@gmail.com') {
            setHumanCases(responses.data);
          } else {
            setHumanCases(
              responses.data.filter(
                (humanCase) => user.email === humanCase.healthCenter.email
              )
            );
          }

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
  function handleSubmit(event) {
    event.preventDefault();
    let humanCase = humanCases[Id];
    let prevStatusValue = humanCase.status;
    let disease = humanCase.disease;
    let updateHumanCase = {};
    let updatehealthCenter = {};
    let updateDisease = {};
    if (statusValue === 'infected') {
      if (prevStatusValue === statusValue) {
        updateHumanCase = humanCase;
        updatehealthCenter = humanCase.healthCenter;
        updateDisease = humanCase.disease;
      } else if (prevStatusValue === 'deceased') {
        updatehealthCenter = {
          ...JSON.parse(localStorage.getItem('user')),
          total_deaths:
            JSON.parse(localStorage.getItem('user')).total_deaths - 1,
          total_affected:
            JSON.parse(localStorage.getItem('user')).total_affected + 1,
        };
        updateDisease = {
          ...disease,
          total_deaths: disease.total_deaths - 1,
          total_affected: disease.total_affected + 1,
        };
        updateHumanCase = {
          ...humanCase,
          status: 'infected',
          healthCenter: updateDisease,
          disease: updateDisease,
        };
      } else {
        updatehealthCenter = {
          ...JSON.parse(localStorage.getItem('user')),
          total_recovered:
            JSON.parse(localStorage.getItem('user')).total_recovered - 1,
          total_affected:
            JSON.parse(localStorage.getItem('user')).total_affected + 1,
        };
        updateDisease = {
          ...disease,
          total_recovered: disease.total_recovered - 1,
          total_affected: disease.total_affected + 1,
        };
        updateHumanCase = {
          ...humanCase,
          status: 'infected',
          healthCenter: updatehealthCenter,
          disease: updateDisease,
        };
      }
    } else if (statusValue === 'recovered') {
      if (prevStatusValue === statusValue) {
        updateHumanCase = humanCase;
        updatehealthCenter = humanCase.healthCenter;
        updateDisease = humanCase.disease;
      } else if (prevStatusValue === 'deceased') {
        updatehealthCenter = {
          ...JSON.parse(localStorage.getItem('user')),
          total_deaths:
            JSON.parse(localStorage.getItem('user')).total_deaths - 1,
          total_recovered:
            JSON.parse(localStorage.getItem('user')).total_recovered + 1,
        };
        updateDisease = {
          ...disease,
          total_deaths: disease.total_deaths - 1,
          total_recovered: disease.total_recovered + 1,
        };
        updateHumanCase = {
          ...humanCase,
          status: 'recovered',
          healthCenter: updatehealthCenter,
          disease: updateDisease,
        };
      } else {
        updatehealthCenter = {
          ...JSON.parse(localStorage.getItem('user')),
          total_recovered:
            JSON.parse(localStorage.getItem('user')).total_recovered + 1,
          total_affected:
            JSON.parse(localStorage.getItem('user')).total_affected - 1,
        };
        updateDisease = {
          ...disease,
          total_recovered: disease.total_recovered + 1,
          total_affected: disease.total_affected - 1,
        };
        updateHumanCase = {
          ...humanCase,
          status: 'recovered',
          healthCenter: updatehealthCenter,
          disease: updateDisease,
        };
      }
    } else {
      if (prevStatusValue === statusValue) {
        updateHumanCase = humanCase;
        updatehealthCenter = humanCase.healthCenter;
        updateDisease = humanCase.disease;
      } else if (prevStatusValue === 'recovered') {
        updatehealthCenter = {
          ...JSON.parse(localStorage.getItem('user')),
          total_deaths:
            JSON.parse(localStorage.getItem('user')).total_deaths + 1,
          total_recovered:
            JSON.parse(localStorage.getItem('user')).total_recovered - 1,
        };
        updateDisease = {
          ...disease,
          total_deaths: disease.total_deaths + 1,
          total_recovered: disease.total_recovered - 1,
        };
        updateHumanCase = {
          ...humanCase,
          status: 'deceased',
          healthCenter: updatehealthCenter,
          disease: updateDisease,
        };
      } else {
        updatehealthCenter = {
          ...JSON.parse(localStorage.getItem('user')),
          total_deaths:
            JSON.parse(localStorage.getItem('user')).total_deaths + 1,
          total_affected:
            JSON.parse(localStorage.getItem('user')).total_affected - 1,
        };
        updateDisease = {
          ...disease,
          total_deaths: disease.total_deaths + 1,
          total_affected: disease.total_affected - 1,
        };
        updateHumanCase = {
          ...humanCase,
          status: 'deceased',
          healthCenter: updatehealthCenter,
          disease: updateDisease,
        };
      }
    }
    let tempHumanCases = [];
    humanCases.forEach((Case) => {
      if (Case._id === humanCase._id) {
        tempHumanCases.push(updateHumanCase);
      } else {
        tempHumanCases.push(Case);
      }
    });
    try {
      setLoading(true);
      UpdateHumanCase(updateHumanCase)
        .then((response) => {
          UpdateHealthCenter(updatehealthCenter)
            .then((response) => {
              UpdateDisease(updateDisease)
                .then((response) => {
                  setHumanCases(tempHumanCases);
                  setOverAllError('');
                  setLoading(false);
                })
                .catch((error) => {
                  setOverAllError("Can't able to update!");
                  setLoading(false);
                });
            })
            .catch((error) => {
              setOverAllError("Can't able to update!");
              setLoading(false);
            });
        })
        .catch((error) => {
          setOverAllError("Can't able to update!");
          setLoading(false);
        });
    } catch (err) {
      setOverAllError('Server Error!');
    }
    localStorage.setItem('user', JSON.stringify(updatehealthCenter));

    setModal(!modal);
  }
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
            Human Cases
          </div>
          {localStorage.user ? (
            <table className='table table-striped table-active'>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Owner Name</th>
                  <th>Owner's Email</th>
                  <th>Contact No.</th>
                  <th>Disease Name</th>
                  <th>Status</th>
                  {JSON.parse(localStorage.getItem('user')).email ===
                  'admin@gmail.com' ? (
                    ''
                  ) : (
                    <th>Update</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {humanCases.map((humanCase, i) => {
                  return (
                    <tr key={humanCase._id}>
                      <th scope='row'>{i + 1}</th>
                      <td>{humanCase.patientName}</td>
                      <td>{humanCase.patientEmail}</td>
                      <td>{humanCase.patientContact}</td>
                      <td>{humanCase.disease.name}</td>
                      <td>{humanCase.status}</td>
                      {JSON.parse(localStorage.getItem('user')).email ===
                      'admin@gmail.com' ? (
                        ''
                      ) : (
                        <td>
                          <img
                            alt='Loading...'
                            width='10%'
                            height='50%'
                            src={editImage}
                            role='button'
                            color='dark'
                            name={i}
                            style={{ marginBottom: '2rem' }}
                            onClick={() => {
                              setId(i);
                              setModal(true);
                            }}
                          />
                          <Modal isOpen={modal} data-id={i + 10}>
                            <ModalHeader toggle={() => setModal(!modal)}>
                              Update the status of the Human Patient
                            </ModalHeader>
                            <ModalBody>
                              <Form>
                                <FormGroup>
                                  <div>
                                    <div>
                                      <input
                                        type='radio'
                                        value='infected'
                                        name='optradio'
                                        onChange={() =>
                                          setStatusValue('infected')
                                        }
                                      />{' '}
                                      Infected
                                    </div>
                                    <div>
                                      <input
                                        type='radio'
                                        value='recovered'
                                        name='optradio'
                                        onChange={() =>
                                          setStatusValue('recovered')
                                        }
                                      />{' '}
                                      Recovered
                                    </div>
                                    <div>
                                      <input
                                        type='radio'
                                        value='deceased'
                                        name='optradio'
                                        onChange={() =>
                                          setStatusValue('deceased')
                                        }
                                      />{' '}
                                      Deceased
                                    </div>
                                  </div>

                                  <Button
                                    key={i}
                                    color='dark'
                                    style={{ marginTop: '2rem' }}
                                    onClick={handleSubmit}
                                    name={i}
                                    block
                                  >
                                    Update
                                  </Button>
                                </FormGroup>
                              </Form>
                            </ModalBody>
                          </Modal>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : null}
        </div>
      )}
    </div>
  );
}
export default Human_Case;
