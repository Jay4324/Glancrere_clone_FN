import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Img from "../static/GlancereImage.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userLogin, userProfile } from "@/apis/generalApis";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Navigation hook
  const navigate = useNavigate();
  // handlesubmit function
  const onSubmit = async (formdata) => {
    try {
      const res = await userLogin(formdata);
      if (res.status == 200) {
        Swal.fire({
          title: "Login Success !",
          icon: "success",
          draggable: true,
        });
        dispatch({type:"Login"})
        let userData=await userProfile()
        console.log("user data response in login ",userData.data.userData)
        dispatch({type:"userProfile",payload:{userData:userData.data.userData}})
        navigate("/dashboard");
      }
      console.log("login response", res);
    } catch (err) {
      console.log("error while login ", err);
      if (err.status == 400 || err.status == 404 || err.status == 401) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: err.response.data.msg,
        });
      }
    }
  };
  return (
    <>
      <div className="flex justify-center h-screen">
        <div className=" w-full lg:w-1/2 flex justify-center items-center ">
          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border-2 lg:border-0 border-black py-4 rounded-sm"
            >
              <div className="  text-3xl font-bold py-1 mx-4">Login</div>
              <div className="py-1 mx-4">
                Enter your email below to login to your account
              </div>
              <div className="py-1 mx-4">
                <div className="font-medium py-1">Email</div>
                <div>
                  <Input
                    type="text"
                    placeholder="Enter Your Email"
                    {...register("email", {
                      required: "* Email is required",
                      pattern: {
                        value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                        message: "* Invalid Email",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <div className="text-[red]">{errors.email.message}</div>
                )}
              </div>
              <div className="py-1 mx-4">
                <div className="font-medium py-1">Password</div>
                <div>
                  <Input
                    type="password"
                    placeholder="Enter Your Password"
                    {...register("password", {
                      required: "* Password is required",
                    })}
                  />
                </div>
                {errors.password && (
                  <div className="text-[red]">{errors.password.message}</div>
                )}
              </div>

              <div className="text-right underline cursor-pointer py-1 mx-4">
                Forget Password?
              </div>
              <div className="py-1 mx-4">
                <Button className="bg-blue-700 w-full" type="submit">
                  Login{" "}
                </Button>
              </div>
              <div className="text-center py-1 mx-4 ">
                Dont have An Account?&nbsp;
                <Link className="underline cursor-pointer " to="/">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2 h-screen border-l-4 border-grey">
          <img src={Img} className="h-full" />
        </div>
      </div>
    </>
  );
};

export default Login;
