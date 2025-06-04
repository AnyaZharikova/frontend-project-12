import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { setActiveChannel } from '../slices/channelsSlice.js'
import { openModal } from '../slices/modalsSlice.js'

const Channel = ({ channel }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const activeChannelId = useSelector(state => state.channelsReducer.activeChannelId)
  const isActive = Number(channel.id) === Number(activeChannelId)

  const handleClick = () => {
    dispatch(setActiveChannel(channel.id))
  }

  const handleRename = () => {
    dispatch(openModal({ type: 'rename', targetId: channel.id }))
  }

  const handleRemove = () => {
    dispatch(openModal({ type: 'remove', targetId: channel.id }))
  }

  return (
    <li key={channel.id} className="nav-item w-100">
      <ButtonGroup className="d-flex show dropdown">
        <Button
          id={channel.id}
          variant={isActive ? 'secondary' : 'light'}
          className="w-100 rounded-0 text-start text-truncate btn"
          onClick={() => handleClick(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>

        {channel.removable && (
          <Dropdown>
            <Dropdown.Toggle split variant={isActive ? 'secondary' : 'light'} className="flex-grow-0 rounded-0">
              <span className="visually-hidden">{t('modals.toggle')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleRename}>{t('modals.rename')}</Dropdown.Item>
              <Dropdown.Item onClick={handleRemove}>{t('modals.remove')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </ButtonGroup>
    </li>
  )
}

export default Channel
