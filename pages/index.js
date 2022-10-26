import Head from "next/head";
import React, { useState } from "react";
import styles from "./index.module.css";


export default function Home() {

  const [blacklistInput, setBlacklist] = useState("");
  const [foodInput, setFoodInput] = useState("");
  const [numPeopleInput, setNumInput] = useState("");
  const [whitelistInput, setWhitelist] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ food: foodInput, numPeople: numPeopleInput, whitelist: whitelistInput, blacklist: blacklistInput }),
    });
    const data = await response.json();
    setResult(data.result);
  }

  return (
    <div>
      <Head>
        <title>Recipe-Bot</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/Poetry-bot.png" className={styles.icon} />
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
            name="prompt"
            placeholder="Enter a word or two"
            value={blacklistInput}
            onChange={(e) => setBlacklist(e.target.value)}
          />
          <input type="hidden" value = {blacklistInput} onChange={(e) => setBlacklist(e.target.value)}/>
        </form>
        <form onSubmit={onSubmit}>
          <input type="submit" value="Generate Recipe" />
        </form>
        <p className={styles.result}>{result}</p>
      </main>
    </div>
  );
}