import { Preset5 } from "./Typography";
import { Button } from "./ui/button";

const notes = []

export function SidebarAllNotes() {
  return <div className="h-full w-[272px] p-250 border-r border-neutral-200 dark:border-neutral-800">
    <header>
      <Button intent="primary" text="+ Create New Note"/>
    </header>
    <div className="mt-4 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-8 p-2">
    {!notes.length && (
        <Preset5>You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</Preset5>
    )}
    </div>
  </div>
}