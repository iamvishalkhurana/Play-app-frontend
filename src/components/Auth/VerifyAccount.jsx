import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Header/Navbar";
import { getCurrentUser, verifyAccount } from "../../store/Slices/authSlice";
import { toast } from "react-hot-toast";
import { Spinner } from "../index";

const VerifyAccount = () => {
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheck = async () => {
    const user = await dispatch(getCurrentUser());
    if (user.payload.isVerified) {
      toast.success("Verified successfully");
      navigate("/");
    } else {
      toast.error("Please ensure you verified");
    }
  };
  const handleSend = async () => {
    const user = await dispatch(getCurrentUser());
    const verified = await dispatch(verifyAccount(user.payload));
    console.log(verified.type);
  };
  return (
    <div>
      <Navbar />
      <div className=" bg-[#121212] text-white h-[100vh] flex flex-col justify-center items-center p-4">
        <p className="flex justify-center">
          Please verify your account by clicking the link sent to your email id.
        </p>
        <p className="flex justify-center  text-fuchsia-500 text-sm">
          If verified please click on the button below
        </p>
        <button
          onClick={handleCheck}
          className="bg-[#ae7aff] px-3 py-2 text-black rounded-sm mt-2 hover:bg-[#ae7aff]/80 duration-300"
        >
          {loading ? <Spinner /> : "Check Verification"}
        </button>
        <p
          className="hover:underline cursor-pointer hover:text-fuchsia-400"
          onClick={handleSend}
        >
          Send again
        </p>
      </div>
    </div>
  );
};

export default VerifyAccount;
