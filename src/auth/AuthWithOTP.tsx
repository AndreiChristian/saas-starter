import { useState } from "react";
import { pb } from "../hooks/pb/main";
import { OTPResponse } from "pocketbase";
import { useNavigate } from "react-router-dom";

export default function AuthWithOTP() {

  const [otp, setOtp] = useState("")
  const [otpResponse, SetOtpResponse] = useState<OTPResponse | null>(null)
  const [isRequested, setIsRequested] = useState(false)
  const navigate = useNavigate()

  async function requestOTP() {
    try {
      const req = await pb.collection('users').requestOTP('andreichristiannetoiu@gmail.com');
      SetOtpResponse(req)
      setIsRequested(true)
    } catch (err) {
      console.log(err)
    }
  }

  async function authWithOTP() {
    try {
      await pb.collection('users').authWithOTP(
        otpResponse?.otpId || "",
        otp
      );
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  return <>
    <h1>Auth with OTP</h1>
    <button onClick={requestOTP} >Request OTP</button>
    {isRequested && <>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={authWithOTP} >Authenticate</button>
    </>}
  </>
}
