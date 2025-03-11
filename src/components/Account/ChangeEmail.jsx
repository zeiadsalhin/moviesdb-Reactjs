import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer} from "react-toastify";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

const ChangeEmail = ({ supabase, BASE_URL }) => {
  const emailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref("email")], "Emails do not match")
      .required("Confirm Email is required"),
  });

  const handleChangeEmail = async (values, { setSubmitting, resetForm }) => {
    const { email } = values;

    const { error } = await supabase.auth.updateUser({ 
      email,
      options: {
        emailRedirectTo: `${BASE_URL}/account`,
      },
     });

    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 2000, theme: "dark" });
    } else {
      toast.success("Email updated successfully! Check your inbox to verify.", { position: "top-center", autoClose: 2000, theme: "dark" });
      // Reset the form inputs
      resetForm();
    }

    setSubmitting(false);
  };

  return (
    <>
    <ToastContainer />
    <Formik
      initialValues={{ email: "", confirmEmail: "" }}
      validationSchema={emailSchema}
      onSubmit={handleChangeEmail}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Field
              name="email"
              as={TextField}
              label="New Email"
              type="email"
              fullWidth
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <Field
              name="confirmEmail"
              as={TextField}
              label="Confirm Email"
              type="email"
              fullWidth
              error={touched.confirmEmail && Boolean(errors.confirmEmail)}
              helperText={touched.confirmEmail && errors.confirmEmail}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              sx={{ backgroundColor: "#e50914", color: "#fff", "&:hover": { backgroundColor: "#b20710" } }}
            >
              {isSubmitting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Change Email"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
    </>
  );
};

ChangeEmail.propTypes = {
  supabase: PropTypes.object.isRequired,
  BASE_URL: PropTypes.string.isRequired,
};

export default ChangeEmail;
