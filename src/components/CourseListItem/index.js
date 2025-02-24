import {Link} from 'react-router-dom'

import './index.css'

const CourseListItem = props => {
  const {courseDetails} = props
  const {logoUrl, name, id} = courseDetails

  return (
    <>
      <Link to={`/courses/${id}`} className="link-item">
        <li className="course-list-item">
          <img src={logoUrl} className="course-list-item-image" alt={name} />
          <p className="course-name">courseName</p>
        </li>
      </Link>
    </>
  )
}

export default CourseListItem
