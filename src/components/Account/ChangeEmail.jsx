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

  // Function to handle email change
  // This function will be called when the form is submitted
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
              color="fff"
              fullWidth
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                      backgroundColor: "#222",
                      color: "#fff",
                      borderRadius: 2,
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                      borderRadius: 2,
                      borderWidth: 1,
                      outline: "none",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#aaa",
              },}}
            />

            <Field
              name="confirmEmail"
              as={TextField}
              label="Confirm Email"
              type="email"
              color="fff"
              fullWidth
              error={touched.confirmEmail && Boolean(errors.confirmEmail)}
              helperText={touched.confirmEmail && errors.confirmEmail}
              sx={{
                "& .MuiOutlinedInput-root": {
                      backgroundColor: "#222",
                      color: "#fff",
                      borderRadius: 2,
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff",
                      borderRadius: 2,
                      borderWidth: 1,
                      outline: "none",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#aaa",
              },}}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              sx={{ backgroundColor: "#99050d", color: "#fff", "&:hover": { backgroundColor: "#b20710" } }}
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
