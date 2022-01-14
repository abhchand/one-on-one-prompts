let data, isLoaded = false;

const keyCodes = Object.freeze({
  SPACEBAR: 32
});

document.addEventListener('DOMContentLoaded', () => {
  // Fetch data
  fetch("./data.json")
    .then(response => response.json())
    .then(json => data = json)
    .then(() => isLoaded = true)
    .then(() => shuffle());

  // Listen for key presses
  document.body.addEventListener("keypress", (e) => {
    if(isLoaded && parseKeyCode(e) == keyCodes.SPACEBAR) {
      shuffle();
    }
  })
});

/*
 * Core Methods
 */

const randomPrompt = () => {
  let category, json;

  do {
    category = randFrom(Object.keys(data.categories));

    const prompts = (data.categories[category] || {}).prompts || [];
    json = randFrom(prompts);
  } while(!json)

  return new Prompt(json, category);
}

const renderCard = (prompt) => {
  /*
   * Creates HTML for the prompt card, with the following structure:
   *
   *   <div class='prompt'>
   *     <div class='prompt__category' style='background-color: ...'>
   *       <span>...</span>
   *     </div>
   *     <div class='prompt__body'>
   *       <p class='prompt__text'></p>
   *       <ul class='prompt_subtexts'>
   *         <li>...</li>
   *       </ul>
   *       <div class='prompt__author'>
   *     </div>
   *   </div>
   */

  const wrapper = document.createElement('div');
  wrapper.classList.add('prompt');

  const category = document.createElement('div');
  category.classList.add('prompt__category');
  category.style.backgroundColor = `${prompt.hexColor()}`;

  const categoryText = document.createElement('span');
  categoryText.innerText = prompt.category();

  const body = document.createElement('div');
  body.classList.add('prompt__body');

  const text = document.createElement('p');
  text.classList.add('prompt__text');
  text.innerText = prompt.text();

  const subtexts = document.createElement('ul');
  subtexts.classList.add('prompt__subtexts');

  if(prompt.subtexts().length > 0) {
    prompt.subtexts().forEach(s => {
      const subtext = document.createElement('li');
      subtext.innerText = s;

      subtexts.appendChild(subtext);
    })
  }

  const author = document.createElement('div');
  author.classList.add('prompt__author');
  if(prompt.author()) {
    author.innerText = `submitted by: ${prompt.author()}`;
  }

  // Build tree
  body.appendChild(text);
  body.appendChild(subtexts);
  body.appendChild(author);

  category.appendChild(categoryText);

  wrapper.appendChild(category);
  wrapper.appendChild(body);

  // Render into DOM
  const mount = document.getElementById('prompt-wrapper');
  mount.innerHTML = '';
  mount.appendChild(wrapper);
}


/*
 * Helpers
 */

const parseKeyCode = (event) => typeof event.which == 'number' ? event.which : event.keyCode;
const randFrom = (array) => array[array.length * Math.random() << 0];
const shuffle = () => renderCard(randomPrompt());

/*
 * Models
 */

class Prompt {
  constructor(json, category) {
    this._parseJSON = this._parseJSON.bind(this);

    this._json = this._parseJSON(json);
    this._category = category;
  }

  author() {
    return this._json['a'] || null;
  }

  category() {
    return this._category;
  }

  hexColor() {
    return data.categories[this._category].hex;
  }

  subtexts() {
    const items = this._json['i'];
    return items.slice(1, items.length);
  }

  text() {
    return this._json['i'][0];
  }

  _parseJSON(json) {
    if (typeof json === 'string') {
      json = { "i": [json] }
    }

    if (typeof json['i'] === 'string') {
      json['i'] = [json['i']]
    }

    return json;
  }
}
