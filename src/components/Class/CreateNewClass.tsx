import { useState } from "react";
import { useCreate } from "../../hooks/pb/useCreate";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useToast } from "../../hooks/use-toast";

export default function CreateNewClass({ refetch }: { refetch: () => Promise<void> }) {

  const { create } = useCreate("classes")
  const { toast } = useToast()

  const [newClass, setNewClass] = useState("")

  async function handleSubmit() {

    await create({
      name: newClass
    })
    toast({
      title: "Success"
    })
    await refetch()

  }


  return <Sheet>
    <SheetTrigger asChild className="self-start" >
      <Button variant='neutral' className="w-1/5" >Create a new class</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create a new class</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
      <div className="grid w-full max-w-sm items-center gap-5 p-5">
        <Label htmlFor="email">Class name</Label>
        <Input
          value={newClass}
          onChange={(e) => setNewClass(e.target.value)}
          type="email"
          id="email"
          placeholder="Math" />
        <SheetClose asChild>
          <Button onClick={handleSubmit}>Create</Button>
        </SheetClose>
      </div>
    </SheetContent>
  </Sheet>
}
