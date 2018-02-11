# add-deploy

Generate the deploy / ci boilerplate for node apps
<!--
## Install

Run

```npm install -g add-deploy```

## Usage

```
# Generate CircleCi deploy and shallow render test
$ add-deploy

# Generate PureComponent and shallow render test with stylesheet
$ add-deploy -c

# Generate Functional Component and shallow render test with stylesheet
$ add-deploy -c -f
```

## Example

```sh
add-deploy example -c
```
Generates `example` folder with the following:

`index.js`
```js
import Example from './example.js'

export default Example
```

`style.css`
```css
.container {}
```

`example.js`
```js
import React, { PureComponent } from 'react'

import style from './style.css'

class Example extends PureComponent {
  render () {
    return (
      <div className={style.container}>test</div>
    )
  }
}

export default Example
```

`example.test.js`
```
import React from 'react'
import { shallow } from 'enzyme'

import Example from './example.js'

it('renders without props', () => {
  shallow(<Example />)
})
```

## License

MIT © [Jack Hanford](http://jackhanford.com) -->
