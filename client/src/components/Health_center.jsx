import React, { Component } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import Loading from './loading/loading.jsx';
import GetAllDiseases from '../api/diseases/getAllDiseases';
import GetAllAnimalCases from '../api/animalCase/getAllAnimalCases';
import GetAllHumanCases from '../api/humanCases/getAllhumanCase';
// import GetAllHealthCenters from '../api/healthCenters/getAllhealthCenter';
import GetAllOutbreaks from '../api/outBreaks/getAlloutbreaks';
import ReportMap from './map.jsx';
import im from '../images/functionality.jpeg';
import './signup.css';
import imm from '../images/hc2.jpg';
var sectionStyle = {
  backgroundImage: `url(${imm})`,
  width: '100%',
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'auto',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};

class Health_center extends Component {
  state = {
    diseases: [],
    animalCases: [],
    humanCases: [],
    outbreaks: [],
    // healthCenters: [],
    user: {},
    barChart: [],
    overAllError: '',
    loading: false,
  };

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ user: user });

    try {
      this.setState({ loading: true });
      GetAllDiseases()
        .then((response) => {
          GetAllAnimalCases()
            .then((responses) => {
              GetAllHumanCases()
                .then((responses) => {
                  GetAllOutbreaks()
                    .then((responses) => {
                      this.setState({ outbreaks: responses.data });
                    })
                    .catch((err) => {
                      this.setState({ overAllError: "Can't able to fetch!" });
                      this.setState({ loading: false });
                    });
                  if (user.email === 'admin@gmail.com') {
                    // GetAllHealthCenters()
                    //   .then((responses) => {
                    //     this.setState({
                    //       healthCenters: responses.data,
                    //       overAllError: '',
                    //     });
                    //   })
                    //   .catch((err) => {
                    //     this.setState({ overAllError: "Can't able to fetch!" });
                    //     this.setState({ loading: false });
                    //   });

                    this.setState({
                      humanCases: responses.data,
                      overAllError: '',
                    });
                  } else {
                    this.setState({
                      humanCases: responses.data.filter(
                        (humanCase) =>
                          user.email === humanCase.healthCenter.email
                      ),
                      overAllError: '',
                    });
                  }
                })
                .catch((err) => {
                  this.setState({ overAllError: "Can't able to fetch!" });
                  this.setState({ loading: false });
                });
              if (user.email === 'admin@gmail.com') {
                this.setState({
                  animalCases: responses.data,
                  overAllError: '',
                });
              } else {
                this.setState({
                  animalCases: responses.data.filter(
                    (animalCase) => user.email === animalCase.healthCenter.email
                  ),
                  overAllError: '',
                });
              }
            })
            .catch((err) => {
              this.setState({ overAllError: "Can't able to fetch!" });
              this.setState({ loading: false });
            });
          this.setState({
            diseases: response.data,
            overAllError: '',
            loading: false,
          });
        })
        .catch((err) => {
          this.setState({ overAllError: "Can't able to fetch!" });
          this.setState({ loading: false });
        });
    } catch (err) {
      this.setState({ overAllError: 'Server Error!' });
    }
  }

  render() {
    let user = JSON.parse(localStorage.getItem('user'));
    return (
      <div className='container-fluid p-0' style={sectionStyle}>
        {this.state.loading ? (
          <div
            style={{
              height: '80vh',
            }}
            className='d-flex align-items-center justify-content-center'
          >
            <Loading loadingColor='#ff790e' />
          </div>
        ) : (
          <div className='p-3'>
            {this.state.overAllError !== '' ? (
              <div
                className='p-3 text-center'
                style={{
                  color: '#ec547a',
                  fontWeight: '500',
                }}
              >
                {this.state.overAllError}
              </div>
            ) : null}
            <div className='container-fluid p-0'>
              {user.email === 'admin@gmail.com' ? (
                ''
              ) : (
                <div className='container-fluid p-0'>
                  <div className='row' style={{ justifyContent: 'center' }}>
                    <div
                      style={{
                        height: '50%',
                        justifyContent: 'center',
                      }}
                      className='col-sm-6 pl-4'
                      style={{ backgroundColor: 'white', margin: '2%' }}
                    >
                      <Bar
                        data={{
                          labels: ['Infected', 'Recovered', 'Deaths'],
                          datasets: [
                            {
                              label: 'People',
                              borderWidth: 2,
                              backgroundColor: [
                                'rgba(0, 0, 255, 0.5)',
                                'rgba(0, 255, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                              ],
                              hoverBackgroundColor: ['blue', 'green', 'red'],
                              position: 'center',
                              data: [
                                this.state.user.total_affected,
                                this.state.user.total_recovered,
                                this.state.user.total_deaths,
                              ],
                            },
                          ],
                        }}
                        options={{
                          title: {
                            display: true,
                            position: 'top',
                            text: `HEALTH CENTER : ${this.state.user.name} Status`,
                            fontSize: '20',
                            fontColor: 'black',
                          },
                          legend: {
                            display: false,
                            position: 'right',
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className='container-fluid p-0'>
              <div className='row p-4'>
                <div
                  className='zoomm'
                  style={{
                    backgroundImage: `url(${im})`,
                    backgroundSize: '35%',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <h3
                    style={{
                      color: 'black',
                      positionX: '50%',
                      fontWeight: '5px',
                    }}
                  >
                    {' '}
                    FUNCTIONALITIES{' '}
                  </h3>
                  <div
                    className='btn-group'
                    role='group'
                    aria-label='First group'
                    style={{ height: '2%', marginLeft: '35%', Right: '0' }}
                  >
                    {user.email === 'admin@gmail.com' ? (
                      <a
                        className='btn btn-block btn-dark zoom'
                        href='/allhealthcenters'
                        style={{ marginRight: '0.5rem', width: '20px' }}
                      >
                        <h6>HEATH CENTERS</h6>
                        <br></br>
                        <p>All the registered health center details</p>
                        <p style={{ textAlign: 'right' }}>➜</p>
                      </a>
                    ) : (
                      <a
                        className='btn btn-large btn-dark zoom shadow'
                        href='/new_humancase'
                        style={{ marginRight: '0.5rem' }}
                      >
                        <h6>NEW HUMAN CASE</h6>
                        <br></br>
                        <p>
                          Add details of new case for human registered in your
                          health center
                        </p>
                        <p style={{ textAlign: 'right' }}>➜</p>
                      </a>
                    )}
                    {this.state.user.email === 'admin@gmail.com' ? (
                      ''
                    ) : (
                      <a
                        className='btn btn-large btn-dark zoom shadow'
                        href='/new_animalcase'
                        style={{ marginRight: '0.5rem' }}
                      >
                        <h6>NEW ANIMAL CASE</h6>
                        <br></br>
                        <p>
                          Add details of new case for animal registered in your
                          health center
                        </p>
                        <p style={{ textAlign: 'right' }}>➜</p>
                      </a>
                    )}
                    <a
                      style={{ marginRight: '0.5rem' }}
                      className='btn btn-large btn-dark zoom'
                      href='/human_case'
                    >
                      <h6>ALL HUMAN CASES</h6>
                      <br></br>
                      <p>
                        Find list of all the human cases added and can update
                        the status
                      </p>
                      <p style={{ textAlign: 'right' }}>➜</p>
                    </a>
                    <a
                      className='btn btn-large btn-dark zoom'
                      href='/animal_case'
                      style={{ marginRight: '0.5rem' }}
                    >
                      <h6>ALL ANIMAL CASES</h6>
                      <br></br>
                      <p>
                        Find list of all the animal cases added and can update
                        the status
                      </p>
                      <p style={{ textAlign: 'right' }}>➜</p>
                    </a>
                    {user.email === 'admin@gmail.com' ? (
                      <a className='btn btn-large btn-dark zoom' href='/admin'>
                        <h6>NOTIFY ALL</h6>
                        <br></br>
                        <p>
                          Notifies all the patients for at once for their
                          respective vaccines
                        </p>
                        <p style={{ textAlign: 'right' }}>➜</p>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div
                style={{
                  height: '50%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                }}
                className='col-sm-6 pl-4'
              >
                <ReportMap
                  type='Animal-Human Cases'
                  list={this.state.animalCases}
                  list1={this.state.humanCases}
                />

                {/* {this.state.user.email === 'admin@gmail.com' ? (
                  <div className='row'>
                    <div
                      className='col-sm-12 pt-1'
                      style={{
                        height: '50%',
                        justifyContent: 'center',
                      }}
                    >
                      <ReportMap
                        type='healthcenters'
                        list={this.state.healthcenters}
                      />
                    </div>
                  </div>
                ) : null} */}
              </div>
              <div
                style={{
                  height: '50%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                }}
                className='col-sm-6 pl-4'
              >
                <ReportMap
                  type='Outbreak Regions'
                  list={this.state.outbreaks}
                />
              </div>
            </div>
            <div
              className='row'
              style={{
                height: '3rem',
                color: 'white',
                textAlign: 'center !important',
                marginTop: '2rem',
                marginBottom: '1rem',
              }}
            >
              <a
                className='btn btn-large btn-dark'
                style={{
                  textAlign: 'center',
                }}
              >
                <h2>DISEASES</h2>
              </a>
            </div>

            <div className='container-fluid p-0'>
              <div className='row' style={{ backgroundColor: '#DEE4E7' }}>
                {' '}
                {this.state.diseases.map((dise) => {
                  return (
                    <div className='col-md-3 col-sm-6' key={dise._id}>
                      <div
                        className='shadow-lg card mb-5'
                        style={{ marginTop: '5%' }}
                      >
                        <div className='card-header'>
                          <h6>{dise.name}</h6>
                        </div>
                        <div className='card-body'>
                          <Doughnut
                            data={{
                              labels: ['Infected', 'Recoverd', 'Deaths'],
                              datasets: [
                                {
                                  label: 'Rainfall',
                                  backgroundColor: [
                                    'rgba(0, 0, 255, 0.7)',
                                    'rgba(0, 255, 0, 0.7)',
                                    'rgba(255, 0, 0, 0.7)',
                                  ],
                                  hoverBackgroundColor: [
                                    'blue',
                                    'green',
                                    'red',
                                  ],
                                  data: [
                                    dise.total_affected,
                                    dise.total_recovered,
                                    dise.total_deaths,
                                  ],
                                },
                              ],
                            }}
                            options={{
                              title: {
                                display: false,
                                fontColor: 'black',
                                fontSize: 15,
                                position: 'top',
                              },
                              legend: {
                                display: true,
                                fontColor: 'black',
                                fontSize: '2',
                                position: 'right',
                              },
                              labels: {
                                fontColor: 'black',
                              },
                            }}
                          />{' '}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Health_center;
