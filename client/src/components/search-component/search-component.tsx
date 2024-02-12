import './search-component.css'


function Search () : React.ReactNode {
  return (
    <div id='search'>
      <input type='text' id='search-field'placeholder='Search'></input>
      <button >Suche</button>
    </div>
  )
}

export default Search