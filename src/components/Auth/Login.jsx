import React from "react";
import { Logo, Button, Input } from "../index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, userLogin } from "../../store/Slices/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../../skeleton/loginSkeleton.jsx";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { fadeIn } from "../Utils/motion";
function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    try{
      const isEmail = data.username.includes("@");
    const loginData = isEmail
      ? { email: data.username, password: data.password }
      : data;

    const response = await dispatch(userLogin(loginData));
    if (response.type === "login/fulfilled") {
      const user = await dispatch(getCurrentUser());
      console.log(user);
      if (user.type === "getCurrentUser/fulfilled" && response?.payload) {
        toast.success("Logged in successfully");
        console.log(user.payload.isVerified);
        if (user.payload.isVerified) {
          navigate("/");
        } else {
          navigate("/verify");
        }
      }
    }
    }
    catch(error){
      toast.error(error.response.data.error);
      throw error;
    }
  };

  if (loading) {
    return <LoginSkeleton />;
  }
  const fadeInVariants = {
    hidden: { opacity: 0, x: "-100vw" }, // Start position: fully transparent and positioned outside the left side of the viewport
    visible: { opacity: 1, x: 0, transition: { duration: 0.75 } }, // End position: fully opaque and positioned at the original horizontal position
  };
  return (
    <>
      <motion.div
        variants={fadeIn("left", "spring", "0.25", "0.75")}
        initial="hidden"
        animate="show"
        className="w-full h-screen text-white p-3 flex justify-center items-start"
      >
        <div className="flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3 mt-20">
          <div className="flex items-center gap-2 mt-5">
            <Logo />
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-5 p-2">
            <Input
              label="Username / email : "
              type="text"
              placeholder="example@gmail.com"
              {...register("username", {
                required: "username is required",
              })}
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
            <Input
              label="Password: "
              type="password"
              placeholder="1kd074fjw0"
              {...register("password", {
                required: "password is required",
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <Button
              type="submit"
              bgColor="bg-purple-500"
              className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
            >
              Login
            </Button>

            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to={"/signup"}
                className="text-purple-600 cursor-pointer hover:opacity-70"
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default Login;
