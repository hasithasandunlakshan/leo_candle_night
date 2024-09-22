
  import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group"
  
  export function SeatSelect() {
    return (

        <div className="flex ">
   <ToggleGroup type="multiple" size="lg">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <h1 className="">Hi</h1>
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
     A2
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
       A2
        </ToggleGroupItem>
      </ToggleGroup>
        </div>
   
    )
  }
  