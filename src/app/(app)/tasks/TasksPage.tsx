'use client';
import { Separator } from '~/components/ui/separator';
import { Tabs, TabsContent } from '~/components/ui/tabs';
import { AlbumArtwork } from './components/album-artwork';
import { PodcastEmptyPlaceholder } from './components/podcast-empty-placeholder';
import Link from 'next/link'
import useGetAudioConversions from '~/lib/audio_conversions/hooks/use-get-audio-conversions';
import { useState } from 'react';

export default function TasksPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const audioConversions = useGetAudioConversions(10, currentPage);

  return (
    <>
      <div className="block">
        {/* <Menu /> */}
        <div className="grid lg:grid-cols-5">
          {/* <Sidebar playlists={playlists} className="hidden lg:block" /> */}
          {/* <div className="col-span-3 lg:col-span-4 lg:border-l"> */}
          <div className="col-span-3 lg:col-span-5">
            <div className="relative w-full h-screen mx-auto overflow-y-auto">
              <Tabs defaultValue="music" className="h-full">

                <TabsContent value="music" className="p-0 border-none outline-none">
                  <div className="rounded-[12px] px-[29px] pt-[33px] pb-[45px] mb-[13px]" style={{ background: 'linear-gradient(-238.72deg, #0044A9 0%, #F700A3 100%), radial-gradient(100% 188.01% at 76.14% 0%, #43DDFF 0%, #FF0000 100%), linear-gradient(0deg, #DB00FF 0%, #14FF00 100%), radial-gradient(59.2% 100% at 50% 100%, #6A00D5 0%, #00E0FF 100%), radial-gradient(100% 148.07% at 0% 0%, #FF9900 0%, #001AFF 100%)' }}>
                    <div className="flex flex-row justify-between w-full">
                      <h1 className="mb-[5px] text-[32px] font-[700] text-white">
                        Your Audio History
                      </h1>
                    </div>
                    <p className="font-[400] text-white">
                      Here you can find your audio conversion history.
                    </p>
                  </div>

                  <div className="flex flex-wrap -mx-[7px]">
                    {audioConversions?.data?.map((album: any, key: number) => (
                      <AlbumArtwork
                        key={key}
                        album={album}
                        className="w-[400px]"
                        aspectRatio="video"
                        width={300}
                        height={100}
                        shared={false}
                        beforeAudioUri={album.input_url}
                        afterAudioUrl={album.result}
                      />
                    ))}
                    {!audioConversions.data?.length && (
                      <div className="flex flex-col items-center justify-center w-full mt-5">
                        <p className="mb-3 text-xl">
                          You don't have any conversions yet
                        </p>
                        <Link href="/ai-voice-generator">
                          <button className="text-sm relative flex flex-row items-center rounded-lg bg-white px-5 py-2.5 text-black-700 transition-all duration-200 hover:bg-[#FFFFFFB2] disabled:bg-[#FFFFFF0D] disabled:text-[#FFFFFF4D]">
                            Start audio conversion
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                  {/* <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Listen Now
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex pb-4 space-x-4"> */}
                  {/* {listenNowAlbums.map((album) => (
                              <AlbumArtwork
                                key={album.name}
                                album={album}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                              />
                            ))} */}
                  {/* </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div> */}
                </TabsContent>
                <TabsContent
                  value="podcasts"
                  className="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        New Episodes
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Your favorite podcasts. Updated daily.
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <PodcastEmptyPlaceholder />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
