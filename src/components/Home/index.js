import {Component} from 'react'

import Loader from 'react-loader-spinner'

import CourseListItem from '../CourseListItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    coursesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch('https://apis.ccbp.in/te/courses')

    if (response.ok) {
      const jsonData = await response.json()
      const updatedData = jsonData.courses.map(eachData => ({
        id: eachData.id,
        logoUrl: eachData.logo_url,
        name: eachData.name,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        coursesList: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <>
      <div className="course-details-failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-view-image"
        />
        <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
        <p className="failure-view-description">
          We cannot seem to find the page you are looking for
        </p>

        <button type="button" className="retry-button" onClick={this.getData}>
          Retry
        </button>
      </div>
    </>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <>
        <h1 className="main-heading">Courses</h1>
        {coursesList.length > 0 && (
          <ul className="home-courses-container-list">
            {coursesList.map(eachObj => (
              <CourseListItem courseDetails={eachObj} key={eachObj.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderResult = apiStatus => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state

    return (
      <>
        <div className="home-container">{this.renderResult(apiStatus)}</div>
      </>
    )
  }
}

export default Home
