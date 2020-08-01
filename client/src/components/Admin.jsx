import React from 'react';
import MessageSend from '../api/messageSend.jsx';
import Loading from './loading/loading.jsx';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import GetAllAnimalCases from '../api/animalCase/getAllAnimalCases.jsx';
import UpdateAnimalCase from '../api/animalCase/updateAnimalCase.jsx';
import UpdateHumanCase from '../api/humanCases/updatehumanCase.jsx';
import GetAllHumanCases from '../api/humanCases/getAllhumanCase.jsx';
var sectionStyle = {
  backgroundColor: '#f2e6cb',
  width: '100%',
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'auto',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};
function Admin() {
  React.useEffect(() => {
    let today = new Date().toLocaleDateString();
    try {
      setLoading(true);
      GetAllAnimalCases()
        .then((responses) => {
          setAnimalCases(
            responses.data.filter((response) => today === response.date)
          );
          setOverAllError('');
        })
        .catch((error) => {
          setOverAllError('Unable to fetch Data');
          setLoading(false);
        });
    } catch (err) {
      setOverAllError('Server Error');
      setLoading(false);
    }
    try {
      GetAllHumanCases()
        .then((responses) => {
          setHumanCases(
            responses.data.filter((response) => today === response.date)
          );
          setOverAllError('');
          setLoading(false);
        })
        .catch((error) => {
          setOverAllError('Unable to fetch Data');
        });
    } catch (err) {
      setOverAllError('Server Error');
      setLoading(false);
    }
  }, []);

  const [submitting, setSubmitting] = React.useState(false);
  const [humanCases, setHumanCases] = React.useState([]);
  const [animalCases, setAnimalCases] = React.useState([]);
  const [overAllError, setOverAllError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function handelHumanCaseDetails(Case) {
    let messageBody = `Hello,
    The vaccination ${Case.disease.vaccine[0].name} for the patient ${Case.patientName} is scheduled today. Kindly report to the nearest healthCenter for the same.Regards DiseaseX team`;

    let tempHumanCases = humanCases;
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let day = parseInt(dd) + Case.disease.vaccine[0].duration;
    let month = parseInt(mm);
    let year = parseInt(yyyy);

    if (day > 30) {
      month = month + parseInt(day / 30);
      day = day % 30;

      if (month > 12) {
        year = year + parseInt(month / 12);
        month = month % 12;
      }
    }
    let date = month.toString() + '/' + day.toString() + '/' + year.toString();
    let newHumanCase = { ...Case, date: date };
    setSubmitting(true);

    try {
      MessageSend({ to: Case.patientContact, body: messageBody })
        .then((response) => {
          if (response.data.success) {
            UpdateHumanCase(newHumanCase)
              .then((response) => {
                setHumanCases(
                  tempHumanCases.filter(
                    (humanCase) => humanCase._id !== Case._id
                  )
                );
                setOverAllError('');
                setSubmitting(false);
              })
              .catch((error) => {
                setOverAllError("Can't able to send sms!");

                setSubmitting(false);
              });
          } else {
            setSubmitting(false);
          }
        })
        .catch((error) => {
          setOverAllError("Can't able to send sms!");
          setSubmitting(false);
        });
    } catch (err) {
      setOverAllError(err);
      setSubmitting(false);
    }
  }
  function handelAnimalCaseDetails(Case) {
    let messageBody = `Hello,
    The vaccination ${Case.animal.vaccine.name} for your ${Case.animal.livestock.breed} is scheduled today. Kindly report to the nearest healthCenter for the same.Regards DiseaseX team`;
    let tempAnimalCases = animalCases;
    setSubmitting(true);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let day = parseInt(dd) + Case.animal.vaccine.duration;
    let month = parseInt(mm);
    let year = parseInt(yyyy);

    if (day > 30) {
      month = month + parseInt(day / 30);
      day = day % 30;

      if (month > 12) {
        year = year + parseInt(month / 12);
        month = month % 12;
      }
    }
    let date = month.toString() + '/' + day.toString() + '/' + year.toString();
    let newAnimalCase = { ...Case, date: date };
    try {
      MessageSend({ to: Case.animal.owner.contact, body: messageBody })
        .then((response) => {
          if (response.data.success) {
            UpdateAnimalCase(newAnimalCase)
              .then((response) => {
                setAnimalCases(
                  tempAnimalCases.filter(
                    (animalCase) => animalCase._id !== Case._id
                  )
                );

                setSubmitting(false);
              })
              .catch((error) => {
                setOverAllError("Can't able to send sms!");

                setSubmitting(false);
              });
          } else {
            setSubmitting(false);
          }
        })
        .catch((error) => setOverAllError("Can't able to send sms!"));
    } catch (err) {
      setOverAllError(err);
    }
  }
  console.log(localStorage);
  return (
    <div className='container-fluid p-0' style={sectionStyle}>
      {localStorage.user ? (
        <div className='p-3'>
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
            <div className='container-fluid p-0'>
              <div className='row no-gutters '>
                <div className='col-xl-6 pr-3'>
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
                      fontSize: '20px',
                      fontWeight: '500',
                    }}
                  >
                    Animal Patients
                  </div>
                  <div
                    className='bg-white'
                    style={{ border: '0', borderRadius: '10px' }}
                  >
                    {animalCases.length !== 0 ? (
                      <table
                        style={{ width: '100%', borderRadius: '10px' }}
                        className='table table-hover table-condensed table-striped table-responsive table-bordered'
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>vaccine</th>
                            <th />
                          </tr>
                        </thead>

                        <tbody>
                          {animalCases.map((animalCase) => {
                            return (
                              <tr key={`${animalCase._id}`}>
                                <td>{animalCase.animal.owner.name}</td>
                                <td>{animalCase.animal.owner.email}</td>
                                <td>{animalCase.animal.owner.contact}</td>
                                <td>{animalCase.animal.status}</td>
                                <td>{animalCase.animal.vaccine.name}</td>

                                <td>
                                  <div>
                                    <div
                                      style={{ width: '100px' }}
                                      className='btn btn-primary btn-block'
                                      onClick={() =>
                                        handelAnimalCaseDetails(animalCase)
                                      }
                                    >
                                      NOT SENT
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <div className='d-flex align-items-center justify-content-center '>
                        <div className='p-3'>
                          No more Active Animal patients to notify!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='col-xl-6'>
                  <div
                    className='text-center pb-2'
                    style={{
                      fontSize: '20px',
                      fontWeight: '500',
                    }}
                  >
                    Human Patients
                  </div>
                  <div
                    className='bg-white'
                    style={{ border: '0', borderRadius: '10px' }}
                  >
                    {' '}
                    {humanCases.length !== 0 ? (
                      <table
                        style={{ width: '100%', borderRadius: '10px' }}
                        className='table table-hover table-condensed table-striped table-responsive table-bordered'
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>vaccine</th>
                            <th />
                          </tr>
                        </thead>

                        <tbody>
                          {humanCases.map((humanCase) => {
                            return (
                              <tr key={`${humanCase._id}`}>
                                <td>{humanCase.patientName}</td>
                                <td>{humanCase.patientEmail}</td>
                                <td>{humanCase.patientContact}</td>
                                <td>{humanCase.status}</td>
                                <td>{humanCase.disease.vaccine[0].name}</td>

                                <td>
                                  <div>
                                    <div
                                      style={{ width: '100px' }}
                                      className='btn btn-primary btn-block'
                                      onClick={() =>
                                        handelHumanCaseDetails(humanCase)
                                      }
                                    >
                                      NOT SENT
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <div className='d-flex align-items-center justify-content-center'>
                        <div className='p-3'>
                          Oops! No more Active Human patients to notify!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
      {
        <Modal
          isOpen={submitting}
          style={{ marginTop: '25%', borderRadius: '10px' }}
        >
          <ModalHeader>
            <p>Loading...</p>
          </ModalHeader>
          <ModalBody className='p-3'>
            <div className='d-flex align-items-center justify-content-center p-3'>
              <Loading loadingColor='#ff790e' />
            </div>
          </ModalBody>
        </Modal>
      }
    </div>
  );
}

export default Admin;
