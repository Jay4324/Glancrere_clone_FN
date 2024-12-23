import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import bgImg from "../static/GlancereImage.png";
import { Eye, EyeOff } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userRegister } from "@/apis/generalApis";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register = () => {
  const [selectedValue, setSelectValue] = useState("Australia");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [password, setPassword] = useState({ password: true, confirm: true });
const navigate=useNavigate()
  useEffect(() => {
    setValue("country", selectedValue);
  }, []);

  // handle password Visibility
  const handlePassword = (e) => {
    console.log(e, "check ");
    setPassword({ ...password, [e]: !password[e] });
  };
  // handle select change
  const handleSelectChange = (e) => {
    setSelectValue(e);
    setValue("country", e);
  };
  const onSubmit = async (formdata) => {
    try {
        const res=await userRegister(formdata);
        if(res.status==201){
            Swal.fire({
                title: "Register Success !",
                icon: "success",
                draggable: true
              });
            navigate("/login")
        }else{
            console.log(res)
            Swal.fire({
                icon: "error",
                // title: "Failed .",
                text: "error while registering",
                // footer: '<a href="#">Why do I have this issue?</a>'
              });
              

        }
        // console.log("response ",res)
    } catch (err) {
        console.log("Error in Registration \n",err)
        if(err.status==400){

            Swal.fire({
                icon: "error",
                // title: "Failed .",
                text: err.response.data.msg,
                // footer: '<a href="#">Why do I have this issue?</a>'
              });
        }
    }
  };
  console.log(errors);
  return (
    <div className=" flex  justify-center  mx-1     ">
      <div className="w-full  lg:w-1/2 h-auto border-r-4 border-grey  flex justify-center items-center   ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" border-2 lg:border-0 border-black py-4 "
        >
          <div className="  ">
            <div className="mx-4 pt-4 ">
              <div className="text-3xl font-bold">Register</div>
            </div>
            <div className="mx-4 py-1 ">
              <div>Enter your details below to create a new account</div>
            </div>
            <div className="mx-4 py-1">
              <div className="font-medium">First Name</div>
              <div className="py-1">
                <Input
                  placeholder="Enter Your First Name"
                  {...register("firstName", {
                    required: "* First Name is required",
                  })}
                />
              </div>
              {errors.firstName && (
                <div className="text-[red]">{errors.firstName.message}</div>
              )}
            </div>
            <div className="mx-4 py-1">
              <div className="font-medium">Last Name</div>
              <div className="py-1">
                <Input
                  placeholder="Enter Your Last Name"
                  {...register("lastName", {
                    required: "* Last Name is required",
                  })}
                />
              </div>
              {errors.lastName && (
                <div className="text-[red]">{errors.lastName.message}</div>
              )}
            </div>
            <div className="mx-4 py-1">
              <div className="font-medium">Email</div>
              <div className="py-1">
                <Input
                  placeholder="Enter Your Email"
                  {...register("email", {
                    required: "* Email is required",
                    pattern: {
                      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                      message: "* Invalid email format",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <div className="text-[red]">{errors.email.message}</div>
              )}
            </div>
            <div className="mx-4 py-1">
              <div className="font-medium">Firm</div>
              <div className="py-1">
                <Input
                  placeholder="Enter Your  Firm"
                  {...register("firm", { required: "* Firm is required" })}
                />
              </div>
              {errors.firm && (
                <div className="text-[red]">{errors.firm.message}</div>
              )}
            </div>
            <div className="mx-4 py-1">
              <div className="font-medium">Country</div>
              <div className="py-1">
                <Select
                  defaultValue="australia"
                  onValueChange={handleSelectChange}
                  {...register("country", {
                    required: "* Country is required",
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={selectedValue} />
                  </SelectTrigger>
                  <SelectContent
                    align="center"
                    sideOffset={4}
                    avoidCollisions={false}
                  >
                    <SelectGroup>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="unitedstate">United state</SelectItem>
                      <SelectItem value="canada">canada</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {errors.country && (
                <div className="text-[red]">{errors.country.message}</div>
              )}
            </div>
            <div className="mx-4 py-1">
              <div className="font-medium">Password</div>
              <div className="py-1 relative flex justify-center items-center">
                <Input
                  placeholder="Enter Your Password"
                  name="password"
                  type={password.password ? "password" : "text"}
                  {...register("password", {
                    required: "* Password is required",
                    minLength: {
                      value: 8,
                      message: "* Password Must Be at Least 8 Character ",
                    },
                  })}
                />
                <span
                  className="absolute right-2 cursor-pointer  flex items-center "
                  onClick={() => handlePassword("password")}
                >
                  {password.password ? <EyeOff /> : <Eye />}
                </span>
              </div>
              {errors.password && (
                <div className="text-[red]">{errors.password.message}</div>
              )}
            </div>
            <div className="mx-4 py-1 ">
              <div className="font-medium">Confirm Password</div>
              <div className="py-1 relative flex justify-center items-center">
                <Input
                  placeholder="Confirm  Your  Password"
                  type={password.confirm ? "password" : "text"}
                  {...register("confirm", {
                    required: "* Confirm is required",
                    validate: function (currpass, formdata) {
                      console.log(
                        "checking pass  \n\n",
                        "curr pass",
                        currpass,
                        "\n\n form data",
                        formdata.password
                      );
                      return (
                        currpass == formdata.password ||
                        "* Password Not Matching "
                      );
                    },
                  })}
                />
                <span
                  className="absolute right-2 cursor-pointer flex items-center"
                  onClick={() => {
                    handlePassword("confirm");
                  }}
                >
                  {password.confirm ? <EyeOff /> : <Eye />}
                </span>
              </div>
              {errors.confirm && (
                <div className="text-[red]">{errors.confirm.message}</div>
              )}
            </div>
            <div className="mx-4 py-1">
              <div className="py-1 text-center">
                <Button className="w-full bg-blue-700" type="submit">
                  Submit{" "}
                </Button>
              </div>
            </div>
            <div className="mx-4 py-1">
              <div className="py-1 text-center">
                Already Have an Account ?{" "}
                <span className="underline">
                  <Link to="/Login">Login</Link>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="hidden lg:w-1/2 lg:block   h-screen sticky top-0">
        <img src={bgImg} className="  w-full h-full " />
      </div>
    </div>
  );
};

export default Register;
