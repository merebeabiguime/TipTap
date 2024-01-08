import React, { useEffect, useRef, useState } from "react";
import CustomFormField from "../CustomFormField";
import { Button, Form, Spinner } from "react-bootstrap";
import CustomPhoneField from "../CustomPhoneField";
import CustomSelectField from "../CustomSelectField";
import CustomCountryField from "../CustomCountryField";

export default function useHookForm(props) {
  const { btnText, inputs } = props;
  const [loading, setLoading] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const formRef = useRef();
  const [formIsSuccess, setFormIsSuccess] = useState(false);
  const [inputList, setInputList] = useState(
    []
    /*
  {
    name:"Name of the input",
    customError:"Custom Function to return a custom Error message"
    required:"If exists then it returns the error message written"
    type:"Type of the input"
    placeholder
    value
    errorMessage:"If exists then"
    img:"Image source"
  }  
*/
  );

  useEffect(() => {
    console.log("dans lue s", inputs);
    const tempInputs = inputs;
    var defauLtValueString = null;
    if (tempInputs) {
      for (let i = 0; i < tempInputs.length; i++) {
        if (tempInputs[i].defaultValue) {
          if (
            typeof tempInputs[i].defaultValue === "object" &&
            tempInputs[i].defaultValue !== null
          ) {
            defauLtValueString = Object.values(tempInputs[i].defaultValue)[0];
          } else {
            defauLtValueString = tempInputs[i].defaultValue;
          }
          console.log("oi mon gar");
          tempInputs[i].value = defauLtValueString;
        }
      }
    }
    inputList.length === 0 && setInputList(tempInputs);
    if (inputList) {
    }
  }, []);

  const setValue = (name, value) => {
    console.log("valhala", value);
    var tempInputs = [...inputList];
    for (let i = 0; i < tempInputs.length; i++) {
      if (tempInputs[i].name === name) {
        tempInputs[i].value = value;
      }
    }

    setInputList(tempInputs);
  };
  const getValue = (name) => {
    for (let i = 0; i < inputList.length; i++) {
      if (inputList[i].name === name) {
        return inputList[i].value;
      }
    }
  };
  const setErrorMessage = (name, message) => {
    var tempInputs = [...inputList];
    for (let i = 0; i < tempInputs.length; i++) {
      if (tempInputs[i].name === name) {
        tempInputs[i].errorMessage = message;
      }
    }
    console.log(tempInputs);
    setInputList(tempInputs);
  };

  const onChange = (val, name, type) => {
    setFormChanged(true);
    var value = null;
    console.log("type", type);
    if (type === "phone" || type === "country") {
      value = val;
    } else {
      value = val.target.value;
    }

    setValue(name, value);

    var isError = true;
    for (var i = 0; i < inputList.length; i++) {
      isError = !testForErrors(inputList[i].name);
    }
    !isError && setDisabled(true);
    isError && setDisabled(false);
  };

  const testForErrors = (name) => {
    var isError = false;
    for (var i = 0; i < inputList.length; i++) {
      if (inputList[i].name === name) {
        if (inputList[i].required) {
          if (
            inputList[i].value === "" ||
            inputList[i].value === null ||
            inputList[i].value === undefined
          ) {
            setErrorMessage(inputList[i].name, inputList[i].required);
            isError = true;
            continue;
          } else {
            setErrorMessage(inputList[i].name, "");
            isError = false;
          }
        }
        if (inputList[i].customError) {
          setErrorMessage(inputList[i].name, inputList[i].customError);
          isError = true;
        }
      }
    }
    if (isError === false) {
      return false;
    } else {
      return true;
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    var isError = true;
    for (var i = 0; i < inputList.length; i++) {
      isError = !testForErrors(inputList[i].name);
    }
    console.log("dans le hook", isError);
    console.log("fomIS", formIsSuccess);
    console.log("isError", isError);
    if (formIsSuccess === true && isError === true) {
      setFormIsSuccess(1);
      console.log("1");
      return;
    } else if (isError === true && formIsSuccess === 1) {
      setFormIsSuccess(true);
      console.log("true");
      return;
    } else {
      setFormIsSuccess(isError);
      console.log("error");
      return;
    }
  };

  const getFormIsSucces = () => {
    const value = formIsSuccess;
    return value;
  };

  const getFormChanged = () => {
    const value = formChanged;
    return value;
  };

  const showInputs = () => {
    return (
      <Form onSubmit={handleForm} ref={formRef}>
        {inputList &&
          inputList.map((input) => (
            <div>
              {input.type === "phone" ? (
                <CustomPhoneField
                  onChange={(value) => onChange(value, input.name, input.type)}
                  placeholder="Téléphone"
                  country={"fr"}
                  value={input.value}
                />
              ) : input.type === "select" ? (
                <CustomSelectField
                  onChange={(data) => onChange(data, input.name, input.type)}
                  value={input.value}
                  childrens={input.childrens}
                />
              ) : input.type === "country" ? (
                <CustomCountryField
                  onChange={(data) => onChange(data, input.name, input.type)}
                  value={input.value}
                />
              ) : (
                <CustomFormField
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={(data) => onChange(data, input.name, input.type)}
                  imgSrc={input.img}
                  defaultValue={input.value}
                />
              )}
              <p className="text-danger mt-1">{input.errorMessage}</p>
            </div>
          ))}
        <Button disabled={disabled} type="submit" className="customButton1">
          {console.log("loadin", loading)}
          {console.log("disa", disabled)}
          {!loading ? btnText : <Spinner animation="border" />}
        </Button>
      </Form>
    );
  };
  return {
    setValue,
    getValue,
    showInputs,
    setInputList,
    setLoading,
    setDisabled,
    getFormIsSucces,
    getFormChanged,
    setFormIsSuccess,
  };
}
