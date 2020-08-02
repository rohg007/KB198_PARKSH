import React, { useEffect } from 'react';
import Loading from './loading/loading.jsx';
import GetAllAnimalCases from '../api/animalCase/getAllAnimalCases.jsx';
import UpdateAnimalCase from '../api/animalCase/updateAnimalCase.jsx';
import Maps from './map.jsx';
import CustomButton from './button.jsx';
import 'semantic-ui-css/semantic.min.css';
import UpdateHealthCenter from '../api/healthCenters/updatehealthCenter';
import UpdateDisease from '../api/diseases/updateDisease';

import 'bootstrap/dist/css/bootstrap.css';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
function Animal_Case() {
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [mapOpen, setMapOpen] = React.useState(false);
  const [animalCases, setAnimalCases] = React.useState([]);
  const [overAllError, setOverAllError] = React.useState('');
  const [statusValue, setStatusValue] = React.useState('');
  const [Id, setId] = React.useState(0);
  useEffect(() => {
    try {
      setLoading(true);
      let user = JSON.parse(localStorage.getItem('user'));
      GetAllAnimalCases()
        .then((responses) => {
          if (user.email === 'admin@gmail.com') {
            setAnimalCases(responses.data);
          } else {
            setAnimalCases(
              responses.data.filter(
                (animalCase) => user.email === animalCase.healthCenter.email
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
    let animalCase = animalCases[Id];
    let prevStatusValue = animalCase.animal.status;
    let animal = animalCase.animal;
    let disease = animalCase.disease;
    let updateAnimalCase = {};
    let updatehealthCenter = {};
    let updateDisease = {};
    if (statusValue === 'infected') {
      if (prevStatusValue === statusValue) {
        updateAnimalCase = animalCase;
        updatehealthCenter = animalCase.healthCenter;
        updateDisease = animalCase.disease;
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
        updateAnimalCase = {
          ...animalCase,
          animal: {
            ...animal,
            status: 'infected',
          },
          healthCenter: updatehealthCenter,
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
        updateAnimalCase = {
          ...animalCase,
          animal: {
            ...animal,
            status: 'infected',
          },
          healthCenter: updatehealthCenter,
          disease: updateDisease,
        };
      }
    } else if (statusValue === 'recovered') {
      if (prevStatusValue === statusValue) {
        updateAnimalCase = animalCase;
        updatehealthCenter = animalCase.healthCenter;
        updateDisease = animalCase.disease;
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
        updateAnimalCase = {
          ...animalCase,
          animal: {
            ...animal,
            status: 'recovered',
          },
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
        updateAnimalCase = {
          ...animalCase,
          animal: {
            ...animal,
            status: 'recovered',
          },
          healthCenter: updatehealthCenter,
          disease: updateDisease,
        };
      }
    } else {
      if (prevStatusValue === statusValue) {
        updateAnimalCase = animalCase;
        updatehealthCenter = animalCase.healthCenter;
        updateDisease = animalCase.disease;
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
        updateAnimalCase = {
          ...animalCase,
          animal: {
            ...animal,
            status: 'deceased',
          },
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
        updateAnimalCase = {
          ...animalCase,
          animal: {
            ...animal,
            status: 'deceased',
          },
          healthCenter: updatehealthCenter,
          disease: updateDisease,
        };
      }
    }
    let tempAnimalCase = [];
    animalCases.forEach((Case) => {
      if (Case._id === animalCase._id) {
        tempAnimalCase.push(updateAnimalCase);
      } else {
        tempAnimalCase.push(Case);
      }
    });
    try {
      setLoading(true);
      UpdateAnimalCase(updateAnimalCase)
        .then((response) => {
          UpdateHealthCenter(updatehealthCenter)
            .then((response) => {
              UpdateDisease(updateDisease)
                .then((response) => {
                  setAnimalCases(tempAnimalCase);
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
          <div className='container-fluid p-3'>
            <div className='d-flex align-items-center'>
              <div className='ml-auto' style={{ width: '150px' }}>
                <CustomButton type='submit' onClick={() => setMapOpen(true)}>
                  Locate On Maps
                </CustomButton>
              </div>
            </div>
            <div
              className='text-center pb-2'
              style={{
                fontSize: '24px',
                fontWeight: '500',
              }}
            >
              Animal Cases
            </div>
            {/* <Maps list={animalCases} /> */}
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
                  {animalCases.map((animalCase, i) => {
                    return (
                      <tr key={animalCase._id}>
                        <th scope='row'>{i + 1}</th>
                        <td>{animalCase.animal.owner.name}</td>
                        <td>{animalCase.animal.owner.email}</td>
                        <td>{animalCase.animal.owner.contact}</td>
                        <td>{animalCase.disease.name}</td>
                        <td>{animalCase.animal.status}</td>
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
                                Update the status of the animal
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
        </div>
      )}
      {
        <Modal
          isOpen={mapOpen}
          style={{
            borderRadius: '50px',
          }}
        >
          <ModalBody className='p-3'>
            <div className='p-3 d-flex align-items-center justify-content-center'>
              <Maps type='Animal Cases' list={animalCases} />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className='px-3 py-2 d-flex align-items-center'>
              <div className='ml-auto' style={{ width: '150px' }}>
                <CustomButton type='submit' onClick={() => setMapOpen(false)}>
                  Cancel
                </CustomButton>
              </div>
            </div>
          </ModalFooter>
        </Modal>
      }
    </div>
  );
}
export default Animal_Case;
