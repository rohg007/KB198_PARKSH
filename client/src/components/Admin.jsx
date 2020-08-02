import React from 'react';
import { useHistory } from 'react-router-dom';
import MessageSend from '../api/messageSend.jsx';
import Loading from './loading/loading.jsx';
import Button from './button.jsx';
import emailSentIllustration from '../images/email-sent.png';
import { Modal, ModalBody } from 'reactstrap';
import GetAllAnimalCases from '../api/animalCase/getAllAnimalCases.jsx';
import UpdateAnimalCase from '../api/animalCase/updateAnimalCase.jsx';
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
  let history = useHistory();
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
          setLoading(false);
        })
        .catch((error) => {
          setOverAllError('Unable to fetch Data');
          setLoading(false);
        });
    } catch (err) {
      setOverAllError('Server Error');
      setLoading(false);
    }
  }, []);

  const [submitting, setSubmitting] = React.useState(false);
  const [animalCases, setAnimalCases] = React.useState([]);
  const [overAllError, setOverAllError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function handelCaseDetails() {
    let messageBody = `Hello,
    The vaccination ${animalCases[0].animal.vaccine.name} for your ${animalCases[0].animal.livestock.breed} is scheduled today. Kindly report to the nearest healthCenter for the same.Regards DiseaseX team`;
    let tempAnimalCases = animalCases;
    setSubmitting(true);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let day = parseInt(dd) + animalCases[0].animal.vaccine.duration;
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
    let newAnimalCase = { ...animalCases[0], date: date };
    try {
      MessageSend({
        to: animalCases[0].animal.owner.contact,
        body: messageBody,
      })
        .then((response) => {
          if (response.data.success) {
            UpdateAnimalCase(newAnimalCase)
              .then((response) => {
                setAnimalCases(
                  tempAnimalCases.filter(
                    (animalCase) => animalCase._id !== animalCases[0]._id
                  )
                );
                setOverAllError('');
                setSubmitting(false);
                history.push('/health_center');
              })
              .catch((error) => {
                setOverAllError("Can't able to send sms!");

                setSubmitting(false);
              });
          } else {
            setOverAllError("Can't able to send sms!");
            setSubmitting(false);
          }
        })
        .catch((error) => setOverAllError("Can't able to send sms!"));
    } catch (err) {
      setOverAllError(err);
      setSubmitting(false);
    }
  }
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
              <div className='px-3 py-2 d-flex align-items-center'>
                <div className='ml-auto' style={{ width: '150px' }}>
                  <Button type='submit' onClick={() => handelCaseDetails()}>
                    Notify All
                  </Button>
                </div>
              </div>
              <div className='row no-gutters '>
                <div className='col-xl-12 pr-3'>
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
                    Patients Details
                  </div>

                  {animalCases.length !== 0 ? (
                    <table className='table table-striped table-active'>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Contact</th>
                          <th>Vaccine</th>
                          <th>Status</th>
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
                              <td>{animalCase.animal.vaccine.name}</td>
                              <td>{animalCase.animal.status}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className='d-flex align-items-center justify-content-center '>
                      <div className='p-3'>
                        No more Active Patients to notify!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
      {
        <Modal
          isOpen={submitting}
          style={{ marginTop: '20%', borderRadius: '10px' }}
        >
          <ModalBody className='p-3'>
            <div className='py-2 text-center'>
              <img src={emailSentIllustration} alt='email-sent' />
            </div>
            <div className='py-2'>
              <p
                className={`mb-0`}
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  textAlign: 'center',
                  color: '#364e65',
                }}
              >
                Notifications Sent!
              </p>
            </div>
          </ModalBody>
        </Modal>
      }
    </div>
  );
}

export default Admin;
