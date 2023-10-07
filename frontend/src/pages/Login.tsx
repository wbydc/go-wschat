"use client";

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

import { Credentials } from "../types";
import { AuthContext } from "../providers/AuthProvider";

const Login: React.FC = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  const [loading, setLoading] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>(null);
    
  const fieldValidationSchema = yup.object({
    username: yup.string().required("Username required!"),
    password: yup.string().required("Password requied!"),
  });

  const submit = async (credentials: Credentials) => {
    try {
      setLoading(true);
      await login(credentials);
  
      navigate("/chat");
    } catch (error) {
      setError((error as any).message);
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={submit}
          validationSchema={fieldValidationSchema}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="username"
                    value="Username"
                  />
                </div>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="username"
                  name="username"
                  type="text"
                  placeholder=""
                  required
                  disabled={isSubmitting}
                />
                <ErrorMessage component="div" name="username" />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="password"
                    value="Password"
                  />
                </div>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="password"
                  name="password"
                  type="password"
                  placeholder=""
                  required
                  disabled={isSubmitting}
                />
                <ErrorMessage component="div" name="username" />
              </div>
              <div className="text-right">
                <Button
                  color="blue"
                  pill
                  outline
                  type="submit"
                  isProcessing={loading}
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </div>
              <div className="pt-4">
                <Link to="/register">
                  Not Registered? Create Account.
                </Link>
              </div>
              {error ? (
                <Alert color="error">
                  {error}
                </Alert>
              ) : null}
          </Form>
        )}
      </Formik>
    </div>
  )
};

export default Login;
