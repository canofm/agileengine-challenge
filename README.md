### Component finder in HTML Challenge

- Software engineer: Federico Cano <canofedericomartin@gmail.com>

#### Challenge

The idea is for the given component taken from the original HTML, lookup for the most similar component in other HTML.

#### Approach

The approach I took was to make many _comparator_, which compares with the original: text, tag, attributes, CSS styles.
Every comparator returns a score for that element and then it's classified. Finally, we just took the element with the highest score.

#### How to use it

1. Install dependencies

```bash
yarn install
```

2. In your shell:

```bash
yarn find <original sample> <diff sample> <element id?>
```

NOTE: _element id_ is optional, by default it takes: "make-everything-ok-button"

Example:

```bash
yarn find samples/sample-0-origin.html samples/sample-1-evil-gemini.html
```

The output is the XPath to the element and its HTML.

#### Test

```bash
yarn test
```
