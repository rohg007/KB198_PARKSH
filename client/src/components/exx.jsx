import React, { Component } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import Loading from './loading/loading.jsx';
import GetAllDiseases from '../api/diseases/getAllDiseases';
import './signup.css';
import GetAllAnimalCases from '../api/animalCase/getAllAnimalCases';
import GetAllHumanCases from '../api/humanCases/getAllhumanCase';
// import GetAllHealthCenters from '../api/healthCenters/getAllhealthCenter';
import GetAllOutbreaks from '../api/outBreaks/getAlloutbreaks';
import ReportMap from './map.jsx';

import im from '../images/functionality.jpeg';
var sectionStyle = {
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
          this.setState({ diseases: response.data, overAllError: '' });
          this.setState({ loading: false });
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
            <Loading />
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
                <div className='row'>
                  
                  <div
                    style={{
                      height: '50%',
                      justifyContent: 'center',
                      paddingLeft: '5%',
                    }}
                    style={{ backgroundColor: 'white', margin: '2%' }}
                    className='shadow-lg col-sm-6'
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
              )}
            </div>
            <div className='row'>
              <div
                style={{
                  height: '50%',
                  justifyContent: 'center',
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
                }}
                className='col-sm-6 pl-4'
              >
                <ReportMap
                  type='Outbreak Regions'
                  list={this.state.outbreaks}
                />
              </div>
            </div>

          </div>
        )}
      </div>
    );
  }
}

export default Health_center;
