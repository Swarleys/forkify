import axios from "axios";

async function getResults(query) {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const key = "a461d9fd6fe14baa30b394fa968e60c7";

  try {
    const res = await axios(
      `${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`
    );
    const recipes = res.data.recipes;
    console.log(recipes);
  } catch (error) {
    console.log(error);
  }
}
getResults("tomato pasta");
