import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pb } from "@/hooks/pb/main";
import { useToast } from "@/hooks/use-toast";
import { useUpdate } from "@/hooks/pb/useUpdate";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LessonsTableRow({ data, refetch }: { data: any, refetch: () => Promise<void> }) {

  const [isDone, setIsDone] = useState(data.done)

  const [lessonName, setLessonName] = useState(data.name)
  const [lessonDescription, setLessonDescription] = useState(data.description)

  const { toast } = useToast()
  const { update, isLoading, error } = useUpdate("lessons")

  async function deleteClass() {
    await pb.collection("lessons").delete(data.id)
    await refetch()
    toast({
      title: "Success",
      description: `"${data.name}" was deleted. `
    })
  }

  async function updateLesson() {
    setIsDone(value => !value)
    update(data.id, {
      ...data,
      done: !data.done,
    })
    await refetch()
  }


  async function handleSubmit() {

    await update(data.id, {
      ...data,
      name: lessonName,
      description: lessonDescription,
    })
    toast({
      title: "Success"
    })
    await refetch()

  }

  return <TableRow>
    <TableCell className="font-base">{data.id}</TableCell>
    <TableCell className="font-base">{data.name}</TableCell>
    <TableCell>{data.description}</TableCell>
    <TableCell>
      <Checkbox checked={isDone} onCheckedChange={updateLesson} />
    </TableCell>
    <TableCell>
      <Sheet>
        <SheetTrigger><Pen /></SheetTrigger>
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
    </TableCell>
    <TableCell>
      <Dialog>
        <DialogTrigger asChild ><Trash /></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this lesson
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className=" w-full flex justify-between" >
              <DialogClose>
                <Button variant='neutral' >Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button onClick={deleteClass} >Delete</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TableCell>
  </TableRow>
}
