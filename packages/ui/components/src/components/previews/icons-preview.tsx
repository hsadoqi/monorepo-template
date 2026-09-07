"use client"

import { Card, CardContent } from "@repo/ui-components/base/ui"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CircleAlertIcon,
  CopyIcon,
  Loader2Icon,
  MinusIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "lucide-react"

export const IconsPreview = () => {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-8 place-items-center gap-4">
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <CopyIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <CircleAlertIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <TrashIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <ShareIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <ShoppingBagIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <MoreHorizontalIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <Loader2Icon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <PlusIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <MinusIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <ArrowLeftIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <ArrowRightIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <CheckIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <ChevronDownIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <ChevronRightIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <SearchIcon />
          </Card>
          <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
            <SettingsIcon />
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
