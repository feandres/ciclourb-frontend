import MapHeader from "@/components/mapHeader"
import { FilterProvider } from "@/contexts/FilterContext"


export default function MapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <FilterProvider>
      <MapHeader/>
      {children}
    </FilterProvider>
  )
}