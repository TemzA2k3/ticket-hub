import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks/useTypedReduxUtils";
import { useAlert } from "../../app/hooks/useAlert";
import { loginUser } from "../../app/store/api/auth/loginUserThunks";

import { AlertWrapper } from "../../shared/components/AlertWrapper";
import { Button } from "../../shared/components/Buttons";



export const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const { showAlert, alertMessage, alertType, showTemporaryAlert } = useAlert();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      showTemporaryAlert(error, "error");
    }
  }, [error]);

  const formik = useFormik({
    initialValues: { email: "", password: "", remember: false },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (location.state?.registeredSuccess) {
      showTemporaryAlert("You have successfully registered. Please log in.", "success");
    }
  }, [location.state]);

  return (
    <section id="signin" className="py-8">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <AlertWrapper
          showAlert={showAlert}
          alertMessage={alertMessage}
          alertType={alertType}
        />
        <div className="flex items-center justify-center min-h-[75vh] py-8">
          <div className="w-full max-w-md border border-border rounded bg-background shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <a href="#home" className="flex items-center gap-2 text-xl font-semibold">
                  <i className="fa-solid fa-ticket" />
                  <span>TicketHub</span>
                </a>
              </div>
              <h2 className="text-xl font-bold mb-2">Sign in to your account</h2>
              <p className="text-sm text-muted-foreground">Enter your email and password to access your account</p>
            </div>

            <form className="grid gap-4" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  {...formik.getFieldProps("email")}
                  className="w-full h-10 px-3 border border-input rounded-[var(--radius)] bg-background text-sm"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...formik.getFieldProps("password")}
                  className="w-full h-10 px-3 border border-input rounded-[var(--radius)] bg-background text-sm"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm">{formik.errors.password}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  {...formik.getFieldProps("remember")}
                  checked={formik.values.remember}
                  className="w-4 h-4"
                />
                <label htmlFor="remember" className="text-sm">Remember me</label>
              </div>

              <Button type="submit" fullWidth disabled={loading}>
                {loading ? (
                  <>
                    <i className="fa fa-spinner fa-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
