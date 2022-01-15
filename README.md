<div align="center">
  <h1>1:1 Prompts</h1>

  <a href="https://github.com/abhchand/one-on-one-prompts">
    <img
      width="100"
      alt="logo"
      src="https://raw.githubusercontent.com/abhchand/one-on-one-prompts/main/logo.jpeg"
    />
  </a>

  <p>Prompts for managers to use in 1:1's.</p>
</div>

---

https://abhchand.me/one-on-one-prompts/

### data

Data is read from `data.json` and can be defined in multiple ways

Prompts to display
Supports multiple formats:

1. Single prompt:

```json
"This is question text"
```

2. Object with an item and author (optional)

```json
{ "i": "This is question text", "a": "abhchand" }
```

3. Object with multiple items and author (optional)

```json
{ "i": ["This is question text", "subtext1", "subtext2"], "a": "abhchand" }
```
