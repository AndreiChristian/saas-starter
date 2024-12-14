import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function FeedBackRoute() {

  return <>
    <section className=" h-full flex flex-col justify-center items-center gap-5 " >
      <h1 className="text-2xl font-heading ">Feedback</h1>
      <p className="text-lg mx-20 " >it is very important for us to get constant feedback it is very important for us to get constant feedbackit is very important for us to get constant feedbackit is very important for us to get constant feedbackit is very important for us to get constant feedbackit is very important for us to get constant feedbackit is very important for us to get constant feedbackit is very important for us to get constant feedback</p>
      <Link to={'/dashboard/feedback/survey'} >
        <Button className="text-2xl" >Start the survey</Button>
      </Link>
      <span className="flex-1" ></span>
      <p className="self-start" >Want to check your previous feedbacks? <Link to={'/dashboard/feedback/feedback-table'} className="underline" >Feedback Report</Link></p>
      <p className="self-start" >Have you found something wrong? <Link to={'/dashboard/feedback/bug-report'} className="underline" >Report a bug.</Link></p>
    </section>
  </>
}
