import { useState } from "react";
import { pb } from "../hooks/pb/main";
import { OTPResponse } from "pocketbase";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


export default function AuthWithOTP() {

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [otpResponse, SetOtpResponse] = useState<OTPResponse | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  async function requestOTP() {

    try {
      const req = await pb.collection('users').requestOTP(email);
      SetOtpResponse(req)
      setIsOpen(true)
    } catch (err) {
      console.log(err)
    }
  }

  async function authWithOTP() {
    console.log("function from dialog is opened")
    try {
      await pb.collection('users').authWithOTP(
        otpResponse?.otpId || "",
        otp
      );
      setIsOpen(false)
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">OTP</CardTitle>
          <CardDescription>
            Use One Time Passwords for a more secure way to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full" onClick={requestOTP} disabled={!email} >
              Request OTP
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isOpen} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Please check your inbox</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={otp}
              onChange={e => setOtp(e.target.value)}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button type="submit" className="w-full" onClick={authWithOTP} disabled={!otp} >
            Login
          </Button>
        </DialogContent>
      </Dialog>

    </div>)
}
