import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "../../app/hooks/useTypedReduxUtils";
import { resetRegistered } from "../../app/store/api/auth/authSlice";
import { registerUser } from "../../app/store/api/auth/registerUserThunks"

import { AlertMessage } from "../../shared/components/AlertMessage"
import { Button } from "../../shared/components/Buttons";

export const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error, registered } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (registered) {
      navigate("/signin", {
        state: { registeredSuccess: true },
      });
      dispatch(resetRegistered());
    }
  }, [registered, navigate, dispatch]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
      terms: Yup.boolean().oneOf([true], "You must accept the terms"),
    }),
    onSubmit: async (values) => {
      const { confirmPassword, terms, ...userData } = values;      
      dispatch(registerUser({ ...userData, verified: false }));
    },
  });

  return (
    <section id="signup" className="py-8">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-center min-h-[75vh] py-8">
          <div className="w-full max-w-md border border-border rounded bg-background shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <a href="#home" className="flex items-center gap-2 text-xl font-semibold">
                  <i className="fa-solid fa-ticket" />
                  <span>TicketHub</span>
                </a>
              </div>
              <h2 className="text-xl font-bold mb-2">Create an account</h2>
              <p className="text-sm text-muted-foreground">Enter your information to create an account</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    {...formik.getFieldProps("firstName")}
                    className="w-full h-10 px-3 border border-input rounded-[var(--radius)] bg-background text-sm"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    {...formik.getFieldProps("lastName")}
                    className="w-full h-10 px-3 border border-input rounded-[var(--radius)] bg-background text-sm"
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email"
                  type="email"
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
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...formik.getFieldProps("password")}
                  className="w-full h-10 px-3 border border-input rounded-[var(--radius)] bg-background text-sm"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm">{formik.errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  {...formik.getFieldProps("confirmPassword")}
                  className="w-full h-10 px-3 border border-input rounded-[var(--radius)] bg-background text-sm"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  {...formik.getFieldProps("terms")}
                  checked={formik.values.terms}
                  className="mt-[0.10rem] w-4 h-4"
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="#terms" className="text-primary hover:underline">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#privacy" className="text-primary hover:underline">Privacy Policy</a>
                </label>
              </div>
              {formik.touched.terms && formik.errors.terms && (
                <p className="text-red-500 text-sm">{formik.errors.terms}</p>
              )}

              {loading ? (
                <Button variant="primary" fullWidth disabled>
                  <i className="fa fa-spinner fa-spin mr-2" />
                  Creating Account...
                </Button>
              ) : (
                <Button type="submit" variant="primary" fullWidth>
                  Create Account
                </Button>
              )}

              {error && (
                <AlertMessage
                  type="error"
                  message={error}
                />
              )}
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/signin" className="text-primary hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
