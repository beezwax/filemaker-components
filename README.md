# FileMaker Web Components Repository
A repository of web components able to two-way bind with FileMaker fields
through some dark magic.

# Commands
To run the development server:

    $ npm run dev

To generate a single HTML file in `./dist`:

    $ npm run build

To run a test server and run the tests:

    $ npm run test

# What's included

* Webpack
* SASS
* ESLint
* Mocha

# Example usage (HTML way) -- heavy WIP

```html
<my-component field="someFileMakerField"></my-component>
<other-component field="otherField"></other-component>
```

Now at load, the web viewer will pull data from FileMaker to populate the
required components (`get fields state`).

When a component changes, it will push the changes to FileMaker (`set field
state`) with the new state for that field/component.

When a field changes in the FileMaker side, FileMaker will call a JavaScript
function `requestComponentStateUpdate` so the WebViewers will request data
from FileMaker (`get fields state`) and update themselves accordingly.

# Expectations for FileMaker (heavy WIP)

## 1
 FileMaker will call a JavaScript function called
`requestComponentStateUpdate` whenever it wants the components to get the
latest state

## 2
FileMaker will implement a script (`set field state` -- name can
change, of course) which will receive the an array, with the state of all
components that changed, and update FileMaker state to match whatever it
received.

## 3
FileMaker will implement a script (`get fields state` -- name can change, of
course) which will return an array of objects with the current FileMaker
state. The format so far looks like this:

```javascript
[
  {
    component: 'demo-text-field',
    state: {
      value: 'hello'
    }
  },
  {
    component: 'demo-text-field2',
    state: {
      value: 'world'
    }
  }
]
```

The important part is that it must specify a component id, used to uniquely
identify a component, and it's state.
