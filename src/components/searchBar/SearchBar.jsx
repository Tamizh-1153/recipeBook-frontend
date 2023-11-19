import { Input } from "@mantine/core"
import "./searchBar.css"

const SearchBar = ({ filter, setFilter }) => {
  return (
    <div className="container sb_container">
      <Input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        variant="filled"
        radius="lg"
        placeholder="Search by name, cuisine, chef "
      ></Input>
    </div>
  )
}

export default SearchBar
