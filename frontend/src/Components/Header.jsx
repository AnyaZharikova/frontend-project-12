import { Link } from 'react-router-dom'
import { Navbar, Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { logOut } from '../slices/authSlice.js'
import routes from '../routes.js'

const ExitButton = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const token = useSelector(state => state.authReducer.token)

  const handleClick = () => {
    dispatch(logOut())
  }

  return token ? <Button type="button" onClick={handleClick}>{t('exit')}</Button> : ''
}

const Header = () => {
  const { t } = useTranslation()

  return (
    <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={routes.chatPath()}>{t('name')}</Navbar.Brand>
        <ExitButton />
      </Container>
    </Navbar>
  )
}

export default Header
