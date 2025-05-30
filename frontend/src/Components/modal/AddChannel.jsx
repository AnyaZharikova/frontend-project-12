import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'
import { getChannelsQuery, addChannelMutation } from '../../services/chatApi.js'
import { newChannelSchema } from '../../validation/validationSchema.js'
import { closeModal } from '../../slices/modalsSlice'
import ModalInput from './ModalInput.jsx'
import { setActiveChannel } from '../../slices/channelsSlice.js'

const AddChannel = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isShown = useSelector(state => state.modalsReducer.modals.isShown)
  const { data: channels = [] } = getChannelsQuery()
  const [addChannel] = addChannelMutation()

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: newChannelSchema(channels, t('errors.unique'), t('registrationRules.name')),
    onSubmit: async (values) => {
      const censoredChannelName = leoProfanity.clean(values.channelName)
      const newChannel = { name: censoredChannelName }

      try {
        const response = await addChannel(newChannel).unwrap()
        dispatch(setActiveChannel(response.id))
        dispatch(closeModal())
        toast.success(t('success.newChannel'))
      }
      catch {
        toast.error(t('errors.network'))
      }
    },
  })

  useEffect(() => {
    if (isShown) {
      formik.resetForm()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShown])

  const handleClose = () => dispatch(closeModal())

  const values = {
    isShown,
    formik,
    title: t('modals.addChannel'),
    handleClose,
    cancelButton: t('cancel'),
    submitButton: t('modals.submitButton'),
  }

  return (
    <ModalInput values={values} />
  )
}

export default AddChannel
