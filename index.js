const { default: axios } = require("axios");

let API = "https://api.openbrewerydb.org/breweries?per_page=20";
async function uniqueCities() {
  try {
    let { data } = await axios.get(API);
    let cities = data.map((brewery) => brewery.city);
    let uniqueCities = [...new Set(cities)];
    console.log(uniqueCities);
  } catch (error) {
    console.log(error);
  }
}

async function breweriesList() {
  try {
    let { data } = await axios.get(API);
    let states = data.map((brewery) => brewery.state);
    let stateCount = {};
    states.forEach((state) => {
      if (stateCount[state]) {
        stateCount[state]++;
      } else {
        stateCount[state] = 1;
      }
    });
    let sortedStates = Object.entries(stateCount)
      .sort((a, b) => b[1] - a[1])
      .map((state) => `${state[0]}: ${state[1]}`);
    console.log(sortedStates);
  } catch (error) {
    console.error(error);
  }
}

uniqueCities();
breweriesList();
