import { Check, X } from "lucide-react";
import { approveItem, rejectItem } from "@/app/(protected)/admin/actions";

interface ReviewActionsProps {
  target: "dealer" | "claim" | "change";
  id: string;
}

export default function ReviewActions({ target, id }: ReviewActionsProps) {
  return (
    <form className="flex w-full flex-col gap-2 sm:w-64">
      <input type="hidden" name="target" value={target} />
      <input type="hidden" name="id" value={id} />
      <input
        type="text"
        name="note"
        maxLength={500}
        placeholder="Note to dealer (optional)"
        className="w-full rounded-md border border-border bg-dark-800 px-3 py-1.5 text-xs text-foreground placeholder:text-dark-400 focus:border-gold-500 focus:outline-none"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          formAction={approveItem}
          className="flex flex-1 items-center justify-center gap-1 rounded-md bg-green-700 px-3 py-1.5 text-sm text-white hover:bg-green-600"
        >
          <Check className="h-4 w-4" />
          Approve
        </button>
        <button
          type="submit"
          formAction={rejectItem}
          className="flex flex-1 items-center justify-center gap-1 rounded-md bg-red-700 px-3 py-1.5 text-sm text-white hover:bg-red-600"
        >
          <X className="h-4 w-4" />
          Reject
        </button>
      </div>
    </form>
  );
}
