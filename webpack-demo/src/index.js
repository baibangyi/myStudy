  // import _ from 'lodash';
  // import printMe from './print.js';
  // import './styles.css';

  // function component() {
  //   var element = document.createElement('div');
  //   var btn = document.createElement('button');

  //   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  //   btn.innerHTML = 'Click me and check the console!';
  //   btn.onclick = printMe;  // onclick event is bind to the original printMe function

  //   element.appendChild(btn);

  //   return element;
  // }

  // let element = component();
  // document.body.appendChild(element);

  // if (module.hot) {
  //   module.hot.accept('./print.js', function() {
  //     console.log('Accepting the updated printMe module!');
  //     document.body.removeChild(element);
  //     element = component(); // Re-render the "component" to update the click handler
  //     document.body.appendChild(element);
  //   })
  // }

 import { cube } from './math.js';

  function component() {
   var element = document.createElement('pre');

   element.innerHTML = [
     'Hello webpack!',
     '5 cubed is equal to ' + cube(5)
   ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());