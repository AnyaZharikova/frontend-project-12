import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'
import { getChannelsQuery, addChannelMutation } from '../../services/chatApi.js'
import { newChannelSchema } from '../../validation/validationSchema.js'
import { closeModal } from '../../slices/modalsSlice'
import ModalInput from './ModalInput.jsx'

const AddChannel = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isShown = useSelector(state => state.modalsReducer.modals.isShown)
  const { data: channels = [] } = getChannelsQuery()
  const [addChannel] = addChannelMutation()

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: newChannelSchema(channels, t('errors.channelExist'), t('registrationRules.name')),
    onSubmit: async (values) => {
      const censoredChannelName = leoProfanity.clean(values.channelName)
      const newChannel = { name: censoredChannelName }

      try {
        await addChannel(newChannel).unwrap()
        dispatch(closeModal())
        toast.success(t('success.newChannel'))
      }
      catch {
        toast.error(t('errors.network'))
      }
    },
  })

  const handleClose = () => dispatch(closeModal())

  const values = {
    isShown,
    formik,
    title: t('modals.addChannel'),
    field: 'channelName',
    handleClose,
    cancelButton: t('cancel'),
    submitButton: t('modals.submitButton'),
  }

  return (
    <ModalInput values={values} />
  )
}

export default AddChannel
