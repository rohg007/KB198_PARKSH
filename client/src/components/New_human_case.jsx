import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from './loading/loading.jsx';
import getAllDiseases from '../api/diseases/getAllDiseases.jsx';
import Dropdown from './dropdown/Dropdown.jsx';
import UpdateHealthCenter from '../api/healthCenters/updatehealthCenter.jsx';
import addDisease from '../api/diseases/postDisease.jsx';
import addHumanCase from '../api/humanCases/posthumanCase.jsx';
var sectionStyle = {
  backgroundColor: '#e0cda6',
  width: '100%',
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'auto',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};

function NewHumanCase() {
  let history = useHistory();
  const [loading, setLoading] = React.useState('');
  const [ownerName, setOwnerName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [pinCode, setPinCode] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [diseases, setDiseases] = React.useState([]);
  const [disease, setDisease] = React.useState('');
  const [diseaseName, setDiseaseName] = React.useState('');
  const [symptoms, setSymptoms] = React.useState('');
  const [vaccines, setVaccines] = React.useState('');
  const [duration, setDuration] = React.useState(0);
  const [error, setError] = React.useState({
    nameError: '',
    emailError: '',
    addressError: '',
    pinCodeError: '',
    contactError: '',
    statusError: '',
    diseaseError: '',
    diseaseNameError: '',
    sumptomsError: '',
    vaccinesError: '',
    durationError: '',
    overAllError: '',
  });
  const statuses = ['infected', 'recovered', 'deceased'];
  useEffect(() => {
    try {
      setLoading(true);
      getAllDiseases()
        .then((response) => {
          setDiseases(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError((error) => ({
            ...error,
            overAllError: 'Unable to fetch data!',
          }));
          setLoading(false);
        });
    } catch (err) {
      setError((error) => ({
        ...error,
        overAllError: err,
      }));
    }
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    if (
      !ownerName ||
      !email ||
      !contact ||
      !address ||
      !pinCode ||
      !status ||
      !disease
    ) {
      setError((error) => ({
        ...error,
        overAllError: 'Please enter the required Values!',
      }));
      return;
    }
    if (disease === 'Other') {
      if (!diseaseName || !symptoms || !vaccines || !duration) {
        setError((error) => ({
          ...error,
          overAllError: 'Please enter the New Disease details!',
        }));
        return;
      }
    }
    let healthcenter = JSON.parse(localStorage.getItem('user'));
    if (status === 'infected') {
      healthcenter.total_affected = healthcenter.total_affected + 1;
    } else if (status === 'recovered') {
      healthcenter.total_recovered = healthcenter.total_recovered + 1;
    } else {
      healthcenter.total_deaths = healthcenter.total_deaths + 1;
    }

    localStorage.setItem('user', JSON.stringify(healthcenter));
    if (disease !== 'Other') {
      let tempDisease = diseases.filter(
        (diseaseVal) => diseaseVal.name === disease
      );
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();
      let day = parseInt(dd) + tempDisease[0].vaccine[0].duration;
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
      let date =
        month.toString() + '/' + day.toString() + '/' + year.toString();
      let humancase = {
        status: status,
        patientName: ownerName,
        patientEmail: email,
        patientContact: '+91' + contact,
        patientAddress: address,
        pincode: pinCode,
        healthCenter: healthcenter,
        disease: tempDisease[0],
        date: date,
        lat: '26.' + Math.floor(100000 + Math.random() * 900000).toString(),
        lng: '75.' + Math.floor(100000 + Math.random() * 900000).toString(),
      };

      try {
        setLoading(true);
        UpdateHealthCenter(healthcenter)
          .then((response) => {
            addHumanCase(humancase)
              .then((response) => {
                history.push(`/human_case`);
                setLoading(false);
              })
              .catch((err) => {
                setError((error) => ({
                  ...error,
                  overAllError:
                    'Unable to Register the Case! Please try Again!',
                }));
                setLoading(false);
              });
          })
          .catch((err) => {
            setError((error) => ({
              ...error,
              overAllError: 'Unable to Register the Case! Please try Again!',
            }));
            setLoading(false);
          });
      } catch (err) {
        setError((error) => ({
          ...error,
          overAllError: err,
        }));
      }
    } else {
      let newDisease = {
        name: diseaseName,
        scientificName: "Sorry can't find one",
        symptoms: symptoms,
        precautions: 'No Suggested precautions',
        morbidity: Math.floor(10 + Math.random() * 90),
        mortality: Math.floor(10 + Math.random() * 90),
        total_affected: Math.floor(1000 + Math.random() * 9000),
        total_deaths: Math.floor(100 + Math.random() * 900),
        total_recovered: Math.floor(1000 + Math.random() * 9000),
        livestock: [{ breed: 'Mammalia', population: 1370000000 }],
        vaccine: [
          {
            name: vaccines,
            scientificName: "Sorry can't find one",
            duration: parseInt(duration),
            forHuman: 'true',
          },
        ],
      };
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();
      let day = parseInt(dd) + parseInt(duration);
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
      let date =
        month.toString() + '/' + day.toString() + '/' + year.toString();
      let humancase = {
        status: status,
        patientName: ownerName,
        patientEmail: email,
        patientContact: '+91' + contact,
        patientAddress: address,
        pincode: pinCode,
        healthCenter: healthcenter,
        disease: newDisease,
        date: date,
        lat: '26.' + Math.floor(100000 + Math.random() * 900000).toString(),
        lng: '75.' + Math.floor(100000 + Math.random() * 900000).toString(),
      };

      try {
        setLoading(true);
        UpdateHealthCenter(healthcenter)
          .then((response) => {
            addHumanCase(humancase)
              .then((response) => {
                addDisease(newDisease)
                  .then((response) => {
                    history.push(`/human_case`);
                    setLoading(false);
                  })
                  .catch((err) => {
                    setError((error) => ({
                      ...error,
                      overAllError:
                        'Unable to Register the Case! Please try Again!',
                    }));
                    setLoading(false);
                  });
              })
              .catch((err) => {
                setError((error) => ({
                  ...error,
                  overAllError:
                    'Unable to Register the Case! Please try Again!',
                }));
                setLoading(false);
              });
          })
          .catch((err) => {
            setError((error) => ({
              ...error,
              overAllError: 'Unable to Register the Case! Please try Again!',
            }));
            setLoading(false);
          });
      } catch (err) {
        setError((error) => ({
          ...error,
          overAllError: err,
        }));
      }
    }
  }
  return (
    <div className='container-fluid p-2' style={sectionStyle}>
      {localStorage.user ? (
        <div>
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
            <div
              className='card'
              body='true'
              inverse='true'
              style={{
                marginLeft: '20%',
                marginRight: '20%',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.30)',
                borderColor: '#333',
              }}
            >
              <div className='card-header'>
                <h3> New Human Case</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='card-body'>
                  <div className='d-flex align-items-center'>
                    <div className='flex-fill pr-3'>
                      <div className='form-group '>
                        <label htmlFor='name'>Patient Name</label>
                        <input
                          type='text'
                          id='name'
                          autoComplete='off'
                          required
                          className='form-control'
                          onChange={(event) => {
                            setOwnerName(event.target.value);
                            setError((error) => ({ ...error, nameError: '' }));
                          }}
                          onBlur={() =>
                            ownerName.length === 0
                              ? setError((error) => ({
                                  ...error,
                                  nameError: 'Field cannot be empty',
                                }))
                              : null
                          }
                          placeholder='Enter Name of Patient'
                        />
                        {error.nameError ? (
                          <div className='errorLabel'>
                            <p className='p-0'>{error.nameError}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className='flex-fill pr-3'>
                      <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                          type='email'
                          required
                          id='email'
                          autoComplete='off'
                          className='form-control'
                          placeholder='Enter Patient email'
                          onChange={(event) => {
                            setEmail(event.target.value);
                            setError((error) => ({ ...error, emailError: '' }));
                          }}
                          onBlur={() =>
                            email.length === 0
                              ? setError((error) => ({
                                  ...error,
                                  emailError: 'Enter a valid Email',
                                }))
                              : null
                          }
                        />
                        {error.emailError ? (
                          <div className='errorLabel'>
                            <p className='p-0'>{error.emailError}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className='flex-fill'>
                      <div className='form-group'>
                        <label htmlFor='contact'>Contact Number</label>
                        <input
                          type='text'
                          required
                          id='contact'
                          autoComplete='off'
                          className='form-control'
                          placeholder='Enter Patient Contact Number'
                          onChange={(event) => {
                            setContact(event.target.value);
                            setError((error) => ({
                              ...error,
                              contactError: '',
                            }));
                          }}
                          onBlur={() =>
                            contact[0] === '0'
                              ? setError((error) => ({
                                  ...error,
                                  contactError:
                                    'please exclude zero from starting',
                                }))
                              : contact.length > 10 || contact.length === 0
                              ? setError((error) => ({
                                  ...error,
                                  contactError:
                                    'Please enter a valid phone number',
                                }))
                              : null
                          }
                        />
                        {error.contactError ? (
                          <div className='errorLabel'>
                            <p className='p-0'>{error.contactError}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className='d-flex align-items-center justify-content-center'>
                    <div className='form-group pr-3' style={{ width: '75%' }}>
                      <label htmlFor='address'>Address</label>
                      <input
                        type='text'
                        id='address'
                        autoComplete='off'
                        className='form-control'
                        placeholder='Enter Residential Address'
                        onChange={(event) => {
                          setAddress(event.target.value);
                          setError((error) => ({
                            ...error,
                            addressError: '',
                          }));
                        }}
                        onBlur={() =>
                          address.length === 0
                            ? setError((error) => ({
                                ...error,
                                addressError: 'Please enter residential Info',
                              }))
                            : null
                        }
                      />
                      {error.addressError ? (
                        <div className='errorLabel'>
                          <p className='p-0'>{error.addressError}</p>
                        </div>
                      ) : null}
                    </div>

                    <div className='form-group'>
                      <label htmlFor='pinCode'>Pin Code</label>
                      <input
                        type='text'
                        id='pinCode'
                        autoComplete='off'
                        className='form-control'
                        placeholder='PinCode'
                        onChange={(event) => {
                          setPinCode(event.target.value);
                          setError((error) => ({
                            ...error,
                            pinCodeError: '',
                          }));
                        }}
                        onBlur={() =>
                          pinCode.length === 0
                            ? setError((error) => ({
                                ...error,
                                pinCodeError: 'Please enter a valid PinCode',
                              }))
                            : null
                        }
                      />
                      {error.pinCodeError ? (
                        <div className='errorLabel'>
                          <p className='p-0'>{error.pinCodeError}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <div className='pr-3 pb-3' style={{ width: '50%' }}>
                      <Dropdown
                        label='Disease'
                        hasError={error.diseaseError}
                        categories={diseases.map((val) => val.name)}
                        selectedItem={(item) => {
                          setDisease(item);
                          setError((error) => ({
                            ...error,
                            diseaseError: '',
                          }));
                        }}
                      />
                      {error.diseaseError ? (
                        <div className='errorLabel'>
                          <p className='p-0'>{error.diseaseError}</p>
                        </div>
                      ) : null}
                    </div>
                    <div className='pb-3' style={{ width: '50%' }}>
                      <Dropdown
                        label='Status'
                        hasError={error.statusError}
                        categories={statuses}
                        selectedItem={(item) => {
                          setStatus(item);
                          setError((error) => ({
                            ...error,
                            statusError: '',
                          }));
                        }}
                      />
                      {error.statusError ? (
                        <div className='errorLabel'>
                          <p className='p-0'>{error.statusError}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {disease === 'Other' ? (
                    <div>
                      <div className='d-flex align-items-center'>
                        <div
                          className='form-group pr-3'
                          style={{ width: '50%' }}
                        >
                          <label htmlFor='DiseaseName'>Disease Name</label>
                          <input
                            type='text'
                            id='DiseaseName'
                            autoComplete='off'
                            required
                            className='form-control'
                            placeholder='Enter the disease of Patient'
                            onChange={(event) => {
                              setDiseaseName(event.target.value);
                              setError((error) => ({
                                ...error,
                                diseaseNameError: '',
                              }));
                            }}
                            onBlur={() =>
                              diseaseName.length === 0
                                ? setError((error) => ({
                                    ...error,
                                    diseaseNameError:
                                      'Please enter the disease of the Registering Case!',
                                  }))
                                : null
                            }
                          />
                          {error.diseaseNameError ? (
                            <div className='errorLabel'>
                              <p className='p-0'>{error.diseaseNameError}</p>
                            </div>
                          ) : null}
                        </div>
                        <div className='form-group' style={{ width: '50%' }}>
                          <label htmlFor='symptoms'>Symptoms</label>
                          <input
                            type='text'
                            id='symptoms'
                            autoComplete='off'
                            required
                            className='form-control'
                            placeholder='Add coma seperated list of symptoms'
                            onChange={(event) => {
                              setSymptoms(event.target.value);
                              setError((error) => ({
                                ...error,
                                symptomsError: '',
                              }));
                            }}
                            onBlur={() =>
                              symptoms.length === 0
                                ? setError((error) => ({
                                    ...error,
                                    symptomsError:
                                      'Atleast one symptom should be added!',
                                  }))
                                : null
                            }
                          />
                          {error.symptomsError ? (
                            <div className='errorLabel'>
                              <p className='p-0'>{error.symptomsError}</p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className='d-flex align-items-center justify-content-center'>
                        <div
                          className='form-group pr-3'
                          style={{ width: '75%' }}
                        >
                          <label htmlFor='vaccines'>Vaccines</label>
                          <input
                            type='text'
                            id='vaccines'
                            autoComplete='off'
                            className='form-control'
                            placeholder='Enter any Vaccine for the disease!'
                            onChange={(event) => {
                              setVaccines(event.target.value);
                              setError((error) => ({
                                ...error,
                                vaccinesError: '',
                              }));
                            }}
                            onBlur={() =>
                              vaccines.length === 0
                                ? setError((error) => ({
                                    ...error,
                                    vaccinesError: 'Cannot be empty',
                                  }))
                                : null
                            }
                          />
                          {error.vaccinesError ? (
                            <div className='errorLabel'>
                              <p className='p-0'>{error.vaccinesError}</p>
                            </div>
                          ) : null}
                        </div>
                        <div className='form-group'>
                          <label htmlFor='duration'>Duration</label>
                          <input
                            type='number'
                            id='duration'
                            min={0}
                            autoComplete='off'
                            className='form-control'
                            placeholder='Enter Duration in Days'
                            onChange={(event) => {
                              setDuration(event.target.value);
                              setError((error) => ({
                                ...error,
                                durationError: '',
                              }));
                            }}
                            onBlur={() =>
                              duration.length === 0 || duration === 0
                                ? setError((error) => ({
                                    ...error,
                                    durationError:
                                      'Please enter a non-zero value!',
                                  }))
                                : null
                            }
                          />
                          {error.durationError ? (
                            <div className='errorLabel'>
                              <p className='p-0'>{error.durationError}</p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className='card-footer d-flex align-items-center flex-column'>
                  {error.overAllError ? (
                    <div className=' float-left errorLabel'>
                      <p className='p-0 '>{error.overAllError}</p>
                    </div>
                  ) : null}
                  <div className='ml-auto'>
                    <button
                      type='submit'
                      width='150px'
                      className='btn btn-primary btn-block'
                    >
                      Register
                    </button>
                  </div>

                  <div className='ml-auto'>
                    <p className='forgot-password text-right'>
                      <a style={{ color: 'black' }} href='/human_case'>
                        All Cases?{' '}
                      </a>

                      <a style={{ color: 'black' }} href='/new_animalcase'>
                        Add Animal Case?
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default NewHumanCase;
