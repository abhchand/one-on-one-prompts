# 1:1 Prompts

Prompts for managers to use in 1:1's.

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
