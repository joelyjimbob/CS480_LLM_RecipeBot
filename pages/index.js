import Head from "next/head";
import React, { useState } from "react";
import styles from "./index.module.css";


export default function Home() {

  const [blacklistInput, setBlacklist] = useState("");
  const [foodInput, setFoodInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [numPeopleInput, setNumInput] = useState("");
  const [whitelistInput, setWhitelist] = useState("");
  const [allergyInput, setAllergyInput] = useState("");
  const [tasteInput, setTasteInput] = useState("");
  const [themeInput, setThemeInput] = useState("");
  const [nutritionInput, setNutrition] = useState();
  const [img_url, setImage] = useState();
  const [result, setResult] = useState();


  var url = img_url;
  const alt = "/Covered_Dish.jpg";
  var src = url!=null ? url : alt;
  var cookbot = url!=null ? "/Robot_Serve.jpg" :"/robot_cooking.jpg";

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ food: foodInput, numPeople: numPeopleInput, whitelist: whitelistInput, blacklist: blacklistInput, nutrition: nutritionInput, price: priceInput, allergies: allergyInput, taste: tasteInput, theme: themeInput }),
    });
    const data = await response.json();
    cookbot = "/Robot_Serve.jpg";
    setImage(data.image_url);
    setResult(data.result);
  }

  return (
    <div style={{ 
      backgroundImage: 'url("Background.jpg")',
      backgroundSize: 'contain'
    }}>
      
      <Head>
        <title>Recipe-Bot</title>
        <link rel="icon" href="/chef.jpg" />
      </Head>

      <main className={styles.main} >
        <img src={cookbot} className={styles.icon} />
        <h3>Cook a dish.</h3>
        <form>
          <input
            type="text"
            name="food"
            placeholder="Enter the dish to make."
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
          />
          <input type="hidden" value = {foodInput} onChange={(e) => setFoodInput(e.target.value)}/>
        </form>
        <form>
          <input
            type="text"
            name="numPeople"
            placeholder="Enter the number of people to serve"
            value={numPeopleInput}
            onChange={(e) => setNumInput(e.target.value)}
          />
          <input type="hidden" value = {numPeopleInput} onChange={(e) => setNumInput(e.target.value)}/>
        </form>
        <form>
          <input
            type="text"
            name="whitelist"
            placeholder="Enter ingredients to include"
            value={whitelistInput}
            onChange={(e) => setWhitelist(e.target.value)}
          />
          <input type="hidden" value = {whitelistInput} onChange={(e) => setWhitelist(e.target.value)}/>
        </form>
        <form>
          <input
            type="text"
            name="blacklist"
            placeholder="Enter ingredients to avoid"
            value={blacklistInput}
            onChange={(e) => setBlacklist(e.target.value)}
          />
          <input type="hidden" value = {blacklistInput} onChange={(e) => setBlacklist(e.target.value)}/>
        </form>
        <form>
          <input
            type="text"
            name="price"
            placeholder="What is your max budget?"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
          />
          <input type="hidden" value = {priceInput} onChange={(e) => setPriceInput(e.target.value)}/>
        </form>
        <form>
          <input
            type="text"
            name="allergies"
            placeholder="Any allergies?"
            value={allergyInput}
            onChange={(e) => setAllergyInput(e.target.value)}
          />
          <input type="hidden" value = {allergyInput} onChange={(e) => setAllergyInput(e.target.value)}/>
        </form>
        <form>
          <input
            type="text"
            name="taste"
            placeholder="A particular taste?(Sweet, Savory, etc)"
            value={tasteInput}
            onChange={(e) => setTasteInput(e.target.value)}
          />
          <input type="hidden" value = {tasteInput} onChange={(e) => setTasteInput(e.target.value)}/>
        </form>
        <form>
          <input
            type="text"
            name="theme"
            placeholder="Any special theme or occasion?"
            value={themeInput}
            onChange={(e) => setThemeInput(e.target.value)}
          />
          <input type="hidden" value = {themeInput} onChange={(e) => setThemeInput(e.target.value)}/>
        </form>
        <form>
          <fieldset>

           <div>
             <input type="checkbox" id="nutrition" name="nutrition" unchecked onChange={(e) => setNutrition(e.target.checked)}/>
             <label for="nutrition" style={{ color: 'white'}}>Show Nutrition Information</label>
            </div>
          </fieldset>

        </form>
        <form onSubmit={onSubmit}>
          <input type="submit" value="Generate Recipe" />
        </form>
        <img src={src} id = 'foodPic'/>
        <label for="foodPic" style={{ color: 'white'}}>(Picture may not match recipie)</label>
        <p className={styles.result} style={{ color: 'white'}}>{result}</p>
      </main>
    </div>
  );
}
