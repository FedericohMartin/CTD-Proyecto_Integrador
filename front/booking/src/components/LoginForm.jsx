import { useState, useEffect, useContext } from "react";
import userContext from "../../../context/userContext";
import userLoginContext from "../../../context/userLoginContext";

const LoginForm = (callback, loginValidations) => {
  const URL_API = "http://localhost:8080/authenticate";
  //const URL_API = "http://ec2-3-20-74-75.us-east-2.compute.amazonaws.com:8080/authenticate";

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { setUserLogin } = useContext(userLoginContext);
  const { setUserName, setUserLastname } = useContext(userContext);

  const [errors, setErrors] = useState({});
  const [statusErrors, setStatusErrors] = useState();
  const [classSpinner, setClassSpinner] = useState("Spinner SpinnerHidden");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(loginValidations(values));
    setIsSubmitting(true);
    setStatusErrors();

    localStorage.removeItem("infoRegister");
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setClassSpinner("Spinner");

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };

      setTimeout(() => {
        fetch(URL_API, requestOptions)
          .then((response) => {
            if (response.status !== 200) {
              setStatusErrors(
                "Lamentablemente no ha podido iniciar sesión. Por favor intente más tarde"
              );

              setValues({ ...values, email: "", password: "" });

              setClassSpinner("Spinner SpinnerHidden");
            } else {
              return response.json();
            }
          })
          .then((data) => {
            if (data) {
              const user = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                userType: data.userType,
                jwt: data.jwt
              };
              localStorage.setItem("userLogin", JSON.stringify(user));

              setUserLogin("true");
              setUserName(data.firstName);
              setUserLastname(data.lastName);

              callback();
            }
          });
      }, 1000);
    }
  },);

  return {
    handleChange,
    values,
    handleSubmit,
    errors,
    statusErrors,
    classSpinner,
  };
};

export default LoginForm;
