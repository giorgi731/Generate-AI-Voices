import {
  LayoutGrid,
  Library,
  ListMusic,
  Mic2,
  Music,
  Music2,
  PlayCircle,
  Radio,
  User,
} from "lucide-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { ScrollArea } from "~/components/ui/scroll-area"

import { Playlist } from "../data/playlists"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[]
}

export function Sidebar({ className, playlists }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="py-4 space-y-4">
        <div className="px-4 py-2">
          <h2 className="px-2 mb-2 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Button
              variant="secondary"
              size="sm"
              className="justify-start w-full"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Listen Now
            </Button>
            <Button variant="ghost" size="sm" className="justify-start w-full">
              <LayoutGrid className="w-4 h-4 mr-2" />
              Browse
            </Button>
            <Button variant="ghost" size="sm" className="justify-start w-full">
              <Radio className="w-4 h-4 mr-2" />
              Radio
            </Button>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="px-2 mb-2 text-lg font-semibold tracking-tight">
            Library
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="justify-start w-full">
              <ListMusic className="w-4 h-4 mr-2" />
              Playlists
            </Button>
            <Button variant="ghost" size="sm" className="justify-start w-full">
              <Music2 className="w-4 h-4 mr-2" />
              Songs
            </Button>
            <Button variant="ghost" size="sm" className="justify-start w-full">
              <User className="w-4 h-4 mr-2" />
              Made for You
            </Button>
            <Button variant="ghost" size="sm" className="justify-start w-full">
              <Mic2 className="w-4 h-4 mr-2" />
              Artists
            </Button>
            <Button variant="ghost" size="sm" className="justify-start w-full">
              <Library className="w-4 h-4 mr-2" />
              Albums
            </Button>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-6 text-lg font-semibold tracking-tight">
            Playlists
          </h2>
          <ScrollArea className="h-[300px] px-2">
            <div className="p-2 space-y-1">
              {playlists?.map((playlist) => (
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start w-full font-normal"
                >
                  <ListMusic className="w-4 h-4 mr-2" />
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
