import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {
    apiStaus: apiStatusConstants.initial,
    courseDetails: {},
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({
      apiStaus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/:${id}`)
    const jsonData = await response.json()
    console.log(response)
    console.log(jsonData)
    // const updatedData = jsonData.courses.map(eachData => ({
    //   id: eachData.id,
    //   logoUrl: eachData.logo_url,
    //   name: eachData.name,
    // }))

    if (response.ok) {
      this.setState({
        apiStatus: apiStatusConstants.success,
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
    <div className="course-details-failure-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <Link to="/">
        <button type="button" className="retry-button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderSuccessView = () => {
    const {courseDetails} = this.state
    return (
      <div className="course-details-container">
        <img src="" alt="" className="course-details-image" />
        <div className="course-details-container">
          <h1 className="course-details-heading">CourseName</h1>
          <p className="course-details-description">
            course-details-description
          </p>
        </div>
      </div>
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
    const {apiStaus} = this.state

    return (
      <>
        <Header />
        {this.renderResult()}
      </>
    )
  }
}

export default CourseDetails
