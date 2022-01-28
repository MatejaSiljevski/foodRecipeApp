import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Recipetile from "./recipeTile/RecipeTile";

function App() {
  const YOUR_APP_ID = "7184cf21";
  const YOUR_APP_KEY = "a9337d6a73353c7c9921eb69850b411c";
  const [query, setQuery] = useState("");
  const [healthLabel, setHealthLabel] = useState("vegetarian");
  const [recipes, setRecipes] = useState([]);

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`;

  const getRecipeInfo = async () => {
    var result = await Axios.get(url);
    setRecipes(result.data.hits);
    console.log(result.data.hits);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  };

  return (
    <div className="app">
      <h1 onClick={getRecipeInfo}>
        <u>Food Recipe Hub</u>🥗
      </h1>
      <form className="app__searchForm" onSubmit={onSubmit} >
        <input
          type="text"
          placeholder="Type the Ingredient"
          autoComplete="Off"
          className="app__input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <select className="app__healthLabels"  onChange={(e) => setHealthLabel(e.target.value)} name="select">
          <option
            value="vegetarian"
           
          >
            vegetarian
          </option>
          <option
            value="vegan"
            
          >
            vegan
          </option>
          <option
            value="low-sugar"
            
          >
            low-sugar
          </option>
          <option
            value="dairy-free"
            
          >
            dairy-free
          </option>
          <option
            value=" immuno-supportive "
            
          >
            immuno-supportive
          </option>
          <option
            value="wheat-free"
            
          >
            wheat-free
          </option>
        </select>
        <input type="submit" value="Get Recipe" className="app__submit" />
      </form>
      <div className="app__recipes">
        {recipes.map((recipe) => {
          return <Recipetile recipe={recipe} />;
        })}
      </div>
    </div>
  );
}

export default App;
