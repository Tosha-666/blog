import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const authorise = useSelector((state) => state.user.isAuthorized)
  if (!authorise) {
    return <Navigate to="registration" state={{ from: location }} />
  }
  return children
}
export default RequireAuth
