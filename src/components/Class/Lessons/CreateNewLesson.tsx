import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCreate } from "@/hooks/pb/useCreate";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function CreateNewLesson({ refetch }: { refetch: () => Promise<void> }) {

  const { create } = useCreate("lessons")
  const { toast } = useToast()

  const [lessonName, setLessonName] = useState("")
  const [lessonDescription, setLessonDescription] = useState("")

  async function handleSubmit() {

    await create({
      name: lessonName,
      description: lessonDescription,
      done: false
    })
    toast({
      title: "Success"
    })
    await refetch()

  }


  return <Sheet>
    <SheetTrigger asChild className="self-start" >
      <Button variant='neutral' className="w-1/5" >Add a new lesson</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create a new lesson</SheetTitle>
        <SheetDescription>
          Go on and add details such name and description
        </SheetDescription>
      </SheetHeader>
      <div className="grid w-full max-w-sm items-center gap-5 p-5">
        <Label htmlFor="name">Lesson name</Label>
        <Input
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
          type="text"
          id="name"
          placeholder="Math" />
        <Label htmlFor="description">Lesson description</Label>
        <Input
          value={lessonDescription}
          onChange={(e) => setLessonDescription(e.target.value)}
          type="text"
          id="description"
          placeholder="Trigonometry" />
        <SheetClose asChild>
          <Button onClick={handleSubmit}>Create</Button>
        </SheetClose>
      </div>
    </SheetContent>
  </Sheet>
}
