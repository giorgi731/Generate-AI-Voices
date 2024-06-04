import { Copy } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"

export function PresetShare() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Share</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[520px]">
        <div className="flex flex-col text-center space-y-2 sm:text-left">
          <h3 className="text-lg font-semibold">Share preset</h3>
          <p className="text-sm text-muted-foreground">
            Anyone who has this link and an OpenAI account will be able to view
            this.
          </p>
        </div>
        <div className="flex items-center pt-4 space-x-2">
          <div className="flex-1 grid gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://platform.openai.com/playground/p/7bbKYQvsVkNmVb8NGcdUOLae?model=text-davinci-003"
              readOnly
              className="h-9"
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
