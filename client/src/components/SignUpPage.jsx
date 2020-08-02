import React from 'react';
import { useHistory } from 'react-router-dom';
import SignUp from '../api/auth/signUpApi.jsx';
// import Map from "./maps.jsx";
import Loading from './loading/loading.jsx';
import './signup.css';

import im from '../images/hc1.jpg';
var sectionStyle = {
  backgroundImage: `url(${im})`,
  width: '100%',
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'auto',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};

function SignUpPage() {
  let history = useHistory();
  const [healthcenterName, setHealthcenterName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [pinCode, setPinCode] = React.useState('');
  const [total_affected, setTotal_affected] = React.useState(0);
  const [total_recovered, setTotal_recovered] = React.useState(0);
  const [total_deaths, setTotal_deaths] = React.useState(0);
  const [inCharge, setIncharge] = React.useState('');
  const [web, setWeb] = React.useState('');
  const [error, setError] = React.useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    addressError: '',
    pincodeError: '',
    confirmPasswordError: '',
    total_recoveredError: '',
    total_deathsError: '',
    total_affectedError: '',
    contactError: '',
    inChargeError: '',
    overAllError: '',
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    if (
      !email ||
      !password ||
      !healthcenterName ||
      !contact ||
      !inCharge ||
      !address ||
      !pinCode ||
      !total_affected ||
      !total_recovered ||
      !total_deaths
    ) {
      setError((error) => ({
        ...error,
        overAllError: 'Please enter the required Values!',
      }));
      return;
    }
    try {
      setLoading(true);
      SignUp({
        name: healthcenterName,
        email: email,
        password: password,
        contact: contact,
        incharge: inCharge,
        address: address,
        pincode: pinCode,
        web: web !== '' ? web : 'www.google.com',
        lat: '26.' + Math.floor(100000 + Math.random() * 900000).toString(),
        lng: '75.' + Math.floor(100000 + Math.random() * 900000).toString(),
        total_affected: total_affected,
        total_recovered: total_recovered,
        total_deaths: total_deaths,
      })
        .then((response) => {
          setError((error) => ({
            ...error,
            nameError: '',
            emailError: '',
            contactError: '',
            passwordError: '',
            total_recoveredError: '',
            total_deathsError: '',
            addressError: '',
            pincodeError: '',
            total_affectedError: '',
            inChargeError: '',
            overAllError: '',
            confirmPasswordError: '',
          }));
          setLoading(false);
          localStorage.setItem('user', JSON.stringify(response.data));
          history.replace('/health_center');
        })
        .catch((err) => {
          setLoading(false);
          setError((error) => ({
            ...error,
            overAllError: err.response.data.errors[0].msg,
          }));
        });
    } catch (err) {
      setError((error) => ({
        ...error,
        overAllError: err,
      }));
    }
  }
  return (
    <div className='container-fluid p-2' style={sectionStyle}>
      {!localStorage.user ? (
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
                backgroundColor: 'rgba(0,0,0,0.60)',
                borderColor: '#333',
              }}
            >
              <div className='card-header'>
                <h3 style={{ color: 'white' }}>Sign Up</h3>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className='card-body'>
                  <div className='d-flex align-items-center'>
                    <div className='form-group pr-3' style={{ width: '50%' }}>
                      <label htmlFor='name' style={{ color: 'white' }}>
                        Health Center name
                      </label>
                      <input
                        type='text'
                        id='name'
                        autoComplete='off'
                        required
                        className='form-control'
                        onChange={(event) => {
                          setHealthcenterName(event.target.value);
                          setError((error) => ({ ...error, nameError: '' }));
                        }}
                        onBlur={() =>
                          healthcenterName.length === 0
                            ? setError((error) => ({
                                ...error,
                                nameError: 'Field cannot be empty',
                              }))
                            : null
                        }
                        placeholder='Enter Name'
                      />
                      <div className='errorLabel'>
                        <p className='p-0'>{error.nameError}</p>
                      </div>
                    </div>

                    <div className='form-group' style={{ width: '50%' }}>
                      <label htmlFor='email' style={{ color: 'white' }}>
                        Email address
                      </label>
                      <input
                        type='email'
                        required
                        id='email'
                        autoComplete='on'
                        className='form-control'
                        placeholder='Enter email'
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
                      <div className='errorLabel'>
                        <p className='p-0'>{error.emailError}</p>
                      </div>
                    </div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <div className='form-group pr-3' style={{ width: '50%' }}>
                      <label style={{ color: 'white' }} htmlFor='password'>
                        Password
                      </label>
                      <input
                        type='password'
                        id='password'
                        autoComplete='off'
                        required
                        className='form-control'
                        placeholder='Enter password'
                        onChange={(event) => {
                          setPassword(event.target.value);
                          setError((error) => ({
                            ...error,
                            passwordError: '',
                          }));
                        }}
                        onBlur={() =>
                          password.length < 6
                            ? setError((error) => ({
                                ...error,
                                passwordError:
                                  'Password should be atleast 6 characters long!',
                              }))
                            : null
                        }
                      />
                      <div className='errorLabel'>
                        <p className='p-0'>{error.passwordError}</p>
                      </div>
                    </div>
                    <div className='form-group' style={{ width: '50%' }}>
                      <label
                        style={{ color: 'white' }}
                        htmlFor='confirmpassword'
                      >
                        Confirm Password
                      </label>
                      <input
                        type='password'
                        id='confirmpassword'
                        autoComplete='off'
                        required
                        className='form-control'
                        placeholder='Confirm password'
                        onChange={(event) => {
                          setConfirmPassword(event.target.value);
                          setError((error) => ({
                            ...error,
                            confirmPasswordError: '',
                          }));
                        }}
                        onBlur={() =>
                          confirmPassword !== password
                            ? setError((error) => ({
                                ...error,
                                confirmPasswordError:
                                  "Doesn't match the password!",
                              }))
                            : null
                        }
                      />
                      <div className='errorLabel'>
                        <p className='p-0'>{error.confirmPasswordError}</p>
                      </div>
                    </div>
                  </div>
                  <div className='d-flex align-items-center justify-content-center'>
                    <div className='form-group pr-3' style={{ width: '75%' }}>
                      <label style={{ color: 'white' }} htmlFor='address'>
                        Address
                      </label>
                      <input
                        type='text'
                        id='address'
                        autoComplete='off'
                        className='form-control'
                        placeholder='Enter Address'
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
                                addressError: 'Cannot be empty',
                              }))
                            : null
                        }
                      />
                      <div className='errorLabel'>
                        <p className='p-0'>{error.addressError}</p>
                      </div>
                    </div>
                    <div className='form-group'>
                      <label style={{ color: 'white' }} htmlFor='pinCode'>
                        Pin Code
                      </label>
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
                      <div className='errorLabel'>
                        <p className='p-0'>{error.pinCodeError}</p>
                      </div>
                    </div>
                  </div>
                  {/* <div className='d-flex align-items-center justify-content-center'>
                    <div style={{ margin: '100px' }}>
                      <Map
                        google={this.props.google}
                        center={{ lat: 26.92207, lng: 75.778885 }}
                        height='300px'
                        zoom={15}
                      />
                    </div>
                  </div> */}
                  <div className='d-flex align-items-center justify-content-center'>
                    <div className='flex-fill pr-3'>
                      <div className='form-group'>
                        <label
                          style={{ color: 'white' }}
                          htmlFor='contactNumber'
                        >
                          Contact
                        </label>
                        <input
                          type='number'
                          id='contactNumber'
                          autoComplete='off'
                          required
                          className='form-control'
                          placeholder='Contact Info.'
                          onChange={(event) => {
                            setContact(event.target.value);
                            setError((error) => ({
                              ...error,
                              contactError: '',
                            }));
                          }}
                          onBlur={() =>
                            contact[0] === 0
                              ? setError((error) => ({
                                  ...error,
                                  contactError:
                                    'please exclude zero from starting',
                                }))
                              : contact.length > 10
                              ? setError((error) => ({
                                  ...error,
                                  contactError:
                                    'Please enter a valid phone number',
                                }))
                              : null
                          }
                        />
                        <div className='errorLabel'>
                          <p className='p-0'>{error.contactError}</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex-fill pr-3'>
                      <div className='form-group'>
                        <label style={{ color: 'white' }} htmlFor='incharge'>
                          In Charge
                        </label>
                        <input
                          type='text'
                          id='incharge'
                          autoComplete='off'
                          required
                          className='form-control'
                          placeholder='InCharge Of:'
                          onChange={(event) => {
                            setIncharge(event.target.value);
                            setError((error) => ({
                              ...error,
                              inChargeError: '',
                            }));
                          }}
                          onBlur={() =>
                            inCharge.length === 0
                              ? setError((error) => ({
                                  ...error,
                                  inChargeError: 'Field cannot be empty',
                                }))
                              : null
                          }
                        />
                        <div className='errorLabel'>
                          <p className='p-0'>{error.inChargeError}</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex-fill '>
                      <div className='form-group'>
                        <label style={{ color: 'white' }} htmlFor='web'>
                          Web Link
                        </label>
                        <input
                          type='text'
                          id='web'
                          autoComplete='off'
                          className='form-control'
                          placeholder='web Link if Any!'
                          onChange={(event) => {
                            setWeb(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-flex align-items-center justify-content-center'>
                    <div className='flex-fill pr-3'>
                      <div className='form-group'>
                        <label
                          style={{ color: 'white' }}
                          htmlFor='totalAffected'
                        >
                          Affected
                        </label>
                        <input
                          type='number'
                          id='totalAffected'
                          autoComplete='off'
                          required
                          className='form-control'
                          placeholder='Total Affected'
                          onChange={(event) => {
                            setTotal_affected(event.target.value);
                            setError((error) => ({
                              ...error,
                              total_affectedError: '',
                            }));
                          }}
                          onBlur={() =>
                            total_affected.length === 0
                              ? setError((error) => ({
                                  ...error,
                                  total_affectedError: 'Cannot be empty!',
                                }))
                              : null
                          }
                        />
                        <div className='errorLabel'>
                          <p className='p-0'>{error.total_affectedError}</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex-fill pr-3'>
                      <div className='form-group'>
                        <label
                          style={{ color: 'white' }}
                          htmlFor='totalRecovered'
                        >
                          Recovered
                        </label>
                        <input
                          type='number'
                          id='totalRecovered'
                          autoComplete='off'
                          required
                          className='form-control'
                          placeholder='Total Recovered'
                          onChange={(event) => {
                            setTotal_recovered(event.target.value);
                            setError((error) => ({
                              ...error,
                              total_recoveredError: '',
                            }));
                          }}
                          onBlur={() =>
                            total_recovered.length === 0
                              ? setError((error) => ({
                                  ...error,
                                  total_recoveredError: 'Cannot be empty!',
                                }))
                              : null
                          }
                        />
                        <div className='errorLabel'>
                          <p className='p-0'>{error.total_recoveredError}</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex-fill'>
                      <div className='form-group'>
                        <label style={{ color: 'white' }} htmlFor='totalDeaths'>
                          Deaths
                        </label>
                        <input
                          type='number'
                          id='totalDeaths'
                          autoComplete='off'
                          required
                          className='form-control'
                          placeholder='Total Deaths'
                          onChange={(event) => {
                            setTotal_deaths(event.target.value);
                            setError((error) => ({
                              ...error,
                              total_deathsError: '',
                            }));
                          }}
                          onBlur={() =>
                            total_deaths.length === 0
                              ? setError((error) => ({
                                  ...error,
                                  total_deathsError: 'Cannot be empty!',
                                }))
                              : null
                          }
                        />
                        <div className='errorLabel'>
                          <p className='p-0'>{error.total_deathsError}</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      style={{ width: '150px' }}
                      className='btn btn-primary btn-block'
                    >
                      Sign Up
                    </button>
                  </div>

                  <div className='ml-auto'>
                    <p className='forgot-password pt-1'>
                      <span style={{ color: 'black' }}>
                        Already registered{' '}
                        <a
                          style={{ color: 'white', fontSize: '14px' }}
                          href='/loginPage'
                        >
                          Sign in?
                        </a>
                      </span>
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

export default SignUpPage;
