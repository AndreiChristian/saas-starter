import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/use-toast";
import { useCreate } from "../../hooks/pb/useCreate";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";

const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function SurveyRoute() {

  const { user } = useAuth()
  const { toast } = useToast()

  const [netPromoterScore, setNetPromoterScore] = useState<number | null>(null)
  const [features, setFeatures] = useState("")
  const [pains, setPains] = useState("")

  const { create, isLoading, error } = useCreate("feedback")

  async function handleSubmit() {
    console.log(user?.id)
    const data = {
      netPromoterScore,
      features,
      pains,
      user: user!.id
    }
    try {
      await create({
        ...data
      })
      toast({
        title: "Success"
      })
    } catch (err) {
      console.error(error)
      toast({
        title: error?.name,
        description: error?.message,

      })
    }
  }

  return (
    <div className="flex flex-col items-center p-5 " >
      <h1 className="text-3xl" >Survey</h1>
      <div className="w-full  flex flex-col   items-start gap-1.5  p-5 " >
        <Label htmlFor="features">How likely it is for you to recommend us to a friend?</Label>
        <div className=" self-center flex justify-center gap-5  " >
          {scores.map((score) => {
            return <Button
              key={score}
              className="text-xl"
              variant={netPromoterScore == score ? "default" : "neutral"}
              onClick={() => setNetPromoterScore(score)} >{score}</Button>
          })}
        </div>
      </div>
      <div className="w-full  flex flex-col   items-start gap-5  p-5 ">
        <Label htmlFor="features">What are the things you would like to see in here in feature?</Label>
        <Textarea
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="w-full" id="features" placeholder="Email" ></Textarea>
      </div>
      <div className="w-full flex flex-col   items-start gap-5 p-5 ">
        <Label htmlFor="pains">What are the most annoying things in here right now?</Label>
        <Textarea
          value={pains}
          onChange={(e) => setPains(e.target.value)}
          className="w-full" id="features" placeholder="Email" ></Textarea>
      </div>
      <Button className=" m-5 w-1/2 text-lg " disabled={isLoading} onClick={handleSubmit} >Submit</Button>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  )
}
