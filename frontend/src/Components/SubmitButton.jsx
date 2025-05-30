import { Button } from 'react-bootstrap'

const SubmitButton = (props) => {
  const { values } = props
  const { formik, title } = values

  return (
    <div className="d-grid">
      <Button
        variant="primary"
        type="submit"
        disabled={formik.isSubmitting}
      >
        {title}
      </Button>
    </div>
  )
}

export default SubmitButton
