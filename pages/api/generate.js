import Document from "next/document";
import { Configuration, OpenAIApi } from "openai";
import { createElement } from 'react';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
var image_url = new String;

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.food, req.body.numPeople, req.body.whitelist, req.body.blacklist, req.body.nutrition),
    temperature: 0.6,
    max_tokens: 365,
  });

  const response = await openai.createImage({
    prompt: req.body.food,
    n: 1,
    size: "1024x1024",
  });
  image_url = response.data.data[0].url;
  console.log(image_url) // logs generated image url
  
  res.status(200).json({ result: completion.data.choices[0].text.replace(/\\n/g, '<br/>') });
}

function generatePrompt(food, numPeople, whitelist, blacklist, nutrition) {

  if(food == ""){
    return " Repeat this sentence once: There is no food to generate.";
  }

  var prompt = 'Give me a recipe for ' + food + ".";

  //Check is a serving size was requested.
  if (whitelist != ''){
    prompt += '\nThe dish must serve ' + numPeople + '.';
  }

  //Checks if there is any whitelisted food
  if (whitelist != ''){
    prompt += '\nMust include ' + whitelist + ' as ingredients.';
  }

  // Checks if there is any blacklisted food
  if (blacklist != ''){
    prompt += '\nMust not have ' + blacklist + ' as ingredients.';
  }
  
    console.log("generated a prompt");

  if (nutrition == null){
    console.log("nutrition is null");
    return prompt;
  }
  else{
    console.log("nutrition is found");
    return prompt + "\n also include serving size and nutrition information per serving.";
  }

}
