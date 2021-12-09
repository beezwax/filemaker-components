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

# Example usage (HTML way) -- WIP

```html
<my-component id="someFileMakerField"></my-component>
<other-component id="otherField"></other-component>
```

Each component must specify an id attribute, which maps the field name in
FileMaker, and can be used to uniquely identify a component. Thus, there
cannot be two components with the same id.

At load, the Web Viewer will pull data from FileMaker to populate the
components in the page. The script it will call is: `get fields state`.

The `get fields state` script should return something like this:

```javascript
[
  {
    id: 'demo-text-field',
    state: {
      value: 'hello'
    }
  },
  {
    id: 'demo-text-field2',
    state: {
      value: 'world'
    }
  },
]
```

Note that `state` can change from component to component, as not all
components will need to handle the same data, for example, a slider might have
a `minValue` and `maxValue` fields, while a text field only has a `value`
field.

When a component in the Web Viewer changes, it will push the changes to
FileMaker calling a script (`set field state`) with the new state for that
component. The parameters look like this:

```
{
  id: 'the field name',
  state: { ... } // depends on the component
}
```

When a field changes in the FileMaker side, FileMaker will call a JavaScript
function `requestComponentStateUpdate` so the WebViewers will request data
from FileMaker (`get fields state`) and update themselves accordingly.
