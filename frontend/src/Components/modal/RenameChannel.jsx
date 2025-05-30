import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'
import { getChannelsQuery, editChannelMutation } from '../../services/chatApi.js'
import { newChannelSchema } from '../../validation/validationSchema.js'
import ModalInput from './ModalInput.jsx'
import { closeModal } from '../../slices/modalsSlice'
import { useEffect } from 'react'

const RenameChannel = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isShown = useSelector(state => state.modalsReducer.modals.isShown)
  const targetId = useSelector(state => state.modalsReducer.modals.targetId)
  const { data: channels = [] } = getChannelsQuery()
  const [editChannel] = editChannelMutation()
  const currentChannel = channels.find(channel => channel.id === targetId)

  const formik = useFormik({
    initialValues: { channelName: currentChannel.name },
    validationSchema: newChannelSchema(channels, t('errors.unique'), t('modals.length')),
    onSubmit: async (values) => {
      const censoredChannelName = leoProfanity.clean(values.channelName)
      try {
        await editChannel({ id: currentChannel.id, name: censoredChannelName }).unwrap()
        dispatch(closeModal())
        toast.success(t('success.renameChannel'))
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
  }, [isShown])

  const handleClose = () => dispatch(closeModal())

  const values = {
    isShown,
    formik,
    title: t('modals.rename'),
    handleClose,
    cancelButton: t('cancel'),
    submitButton: t('modals.rename'),
  }

  return (
    <ModalInput values={values} />
  )
}

export default RenameChannel
