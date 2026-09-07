"use client"

import { Button, Card, CardContent } from "@repo/ui-components/base/ui"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui-components/base/ui/alert-dialog"
import { ButtonGroup } from "@repo/ui-components/base/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui-components/base/ui/dropdown-menu"
import { FieldGroup, Field } from "@repo/ui-components/base/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@repo/ui-components/base/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@repo/ui-components/base/ui/item"
import {
  RadioGroupItem,
  RadioGroup,
} from "@repo/ui-components/base/ui/radio-group"
import { Switch } from "@repo/ui-components/base/ui/switch"
import { Textarea } from "@repo/ui-components/base/ui/textarea"
import { ChevronUpIcon, SearchIcon } from "lucide-react"
import { Badge } from "@repo/ui-components/base/ui/badge"
import { Checkbox } from "@repo/ui-components/base/ui/checkbox"
import { Slider } from "@repo/ui-components/base/ui/slider"
import React from "react"

export const UiPreview = ({
  sliderValue: initialSlider,
  onChange,
}: {
  sliderValue: number
  onChange: (value: number) => void
}) => {
  const [sliderValue, setSliderValue] = React.useState<number>(initialSlider)

  const handleSliderValue = (value: number | readonly number[]) => {
    setSliderValue(Array.isArray(value) ? value[0] : value)
    onChange(Array.isArray(value) ? value[0] : value)
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full">
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Button>Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Two-factor authentication</ItemTitle>
                <ItemDescription className="text-pretty xl:hidden 2xl:block">
                  Verify via email or phone number.
                </ItemDescription>
              </ItemContent>
              <ItemActions className="hidden md:flex">
                <Button size="sm" variant="secondary">
                  Enable
                </Button>
              </ItemActions>
            </Item>
          </div>
          <Slider
            value={sliderValue}
            onValueChange={handleSliderValue}
            max={1000}
            min={0}
            step={10}
            className="flex-1"
            aria-label="Slider"
          />
          <FieldGroup>
            <Field>
              <InputGroup>
                <InputGroupInput placeholder="Name" />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>
                    <SearchIcon />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field className="flex-1">
              <Textarea placeholder="Message" className="resize-none" />
            </Field>
          </FieldGroup>
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <Badge>Badge</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
            <RadioGroup
              defaultValue="apple"
              className="ml-auto flex w-fit gap-3"
            >
              <RadioGroupItem value="apple" />
              <RadioGroupItem value="banana" />
            </RadioGroup>
            <div className="flex gap-3">
              <Checkbox defaultChecked />
              <Checkbox />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button variant="outline">
                    <span className="hidden md:block">Alert Dialog</span>
                    <span className="block md:hidden">Dialog</span>
                  </Button>
                }
              />
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Allow accessory to connect?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Do you want to allow the USB accessory to connect to this
                    device and your data?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                  <AlertDialogAction>Allow</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <ButtonGroup>
              <Button variant="outline">Button Group</Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="outline" size="icon">
                      <ChevronUpIcon />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" side="top" className="w-fit">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                    <DropdownMenuItem>Block User</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Conversation</DropdownMenuLabel>
                    <DropdownMenuItem>Share Conversation</DropdownMenuItem>
                    <DropdownMenuItem>Copy Conversation</DropdownMenuItem>
                    <DropdownMenuItem>Report Conversation</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                      Delete Conversation
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
            <Switch defaultChecked className="ml-auto" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
