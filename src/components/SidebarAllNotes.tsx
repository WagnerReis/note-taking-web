import { Preset5 } from "./Typography";
import { Button } from "./ui/button";

const notes = [];

export function SidebarAllNotes() {
  return (
    <div className="h-full w-[272px] border-r border-neutral-200 p-250 dark:border-neutral-800">
      <header>
        <Button intent="primary" text="+ Create New Note" />
      </header>
      <div className="rounded-8 mt-4 border border-neutral-200 bg-neutral-100 p-2 dark:border-neutral-700 dark:bg-neutral-800">
        {!notes.length && (
          <Preset5>
            You don’t have any notes yet. Start a new note to capture your
            thoughts and ideas.
          </Preset5>
        )}
      </div>
    </div>
  );
}
