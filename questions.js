/* 25 Frontend (HTML, CSS, JS) questions.
   t = question text, code = optional code block, o = 4 options, a = index of correct option (0-3) */
const QUESTIONS = [
  { t: 'A <div> has the following CSS. What is the width of the content area inside the div?',
    code: 'div {\n  width: 300px;\n  padding: 15px;\n  border: 10px solid black;\n  box-sizing: border-box;\n}',
    o: ['270px', '300px', '250px', '260px'], a: 2 },

  { t: 'Given the HTML below, which JavaScript statement selects ALL <p> elements that are immediate children of the <section>?',
    code: '<section id="main">\n  <p>First</p>\n  <div><p>Nested</p></div>\n  <p>Third</p>\n</section>',
    o: ["document.querySelectorAll('#main p')", "document.querySelectorAll('#main ~ p')", "document.querySelectorAll('#main + p')", "document.querySelectorAll('#main > p')"], a: 3 },

  { t: 'Which of the following CSS selectors has the HIGHEST specificity?',
    o: ['.container #item', 'div p', '#main p', '.container p'], a: 0 },

  { t: 'What is logged by the following code?',
    code: 'function makeCounter(start) {\n  let count = start;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    value: () => count\n  };\n}\nconst counter = makeCounter(5);\ncounter.increment();\ncounter.increment();\ncounter.decrement();\nconsole.log(counter.value());',
    o: ['5', '6', '7', '4'], a: 1 },

  { t: 'What will console.log(result) output?',
    code: 'const nums = [3, 1, 4, 1, 5, 9, 2, 6];\nconst result = nums\n  .filter(n => n > 2)\n  .map(n => n ** 2)\n  .reduce((acc, n) => acc - n, 100);\nconsole.log(result);',
    o: ['-21', '100', '-121', '-67'], a: 3 },

  { t: 'What will be logged by the following code?',
    code: 'const arr = [1, 2, 3];\nconst result = arr\n  .map(x => x * 2)\n  .filter(x => x > 3)\n  .reduce((acc, x) => acc + x, 10);\nconsole.log(result);',
    o: ['20', '22', '12', '16'], a: 0 },

  { t: 'Given the following HTML and JavaScript, which list item will have red text?',
    code: '<ul id="list">\n  <li class="item">A</li>\n  <li class="item">B</li>\n  <li class="item">C</li>\n</ul>\n\nconst items = document.querySelectorAll(\'#list .item\');\nitems[1].style.color = \'red\';',
    o: ['Item A', 'Item C', 'All items', 'Item B'], a: 3 },

  { t: 'A button with id "btn" exists in the DOM. When it is clicked, what does `this` refer to inside the callback?',
    code: "document.getElementById('btn').addEventListener('click', function () {\n  console.log(this);\n});",
    o: ['The button element itself', 'The document object', 'undefined', 'The global window object'], a: 0 },

  { t: 'Which statement correctly describes the behaviour of this code?',
    code: "const obj = {};\nObject.defineProperty(obj, 'x', {\n  value: 42,\n  writable: false\n});\nobj.x = 100;\nconsole.log(obj.x);",
    o: ['Logs undefined because the property is frozen', 'Logs 100 because object properties can always be reassigned', 'Logs 42 in non-strict mode; throws a TypeError in strict mode', 'Throws a TypeError in all environments'], a: 2 },

  { t: 'Trace through the following code and identify the correct output:',
    code: "function greet(name = 'World') {\n  return `Hello, ${name}!`;\n}\nconsole.log(greet());\nconsole.log(greet(undefined));\nconsole.log(greet(null));",
    o: ['Hello, World! / Hello, World! / Hello, World!', 'Hello, ! / Hello, World! / Hello, null!', 'Hello, World! / Hello, undefined! / Hello, null!', 'Hello, World! / Hello, World! / Hello, null!'], a: 3 },

  { t: 'What is the output of the following code?',
    code: 'console.log(typeof undefined);\nconsole.log(typeof NaN);\nconsole.log(typeof function () {});',
    o: ["'undefined', 'NaN', 'function'", "'undefined', 'number', 'object'", "'undefined', 'number', 'function'", "'object', 'number', 'function'"], a: 2 },

  { t: 'What is logged to the console?',
    code: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}',
    o: ['0, 1, 2', '3, 3, 3', '0, 0, 0', 'undefined, undefined, undefined'], a: 1 },

  { t: "How many times is 'clicked' logged when the button is clicked once?",
    code: "const btn = document.getElementById('myBtn');\nbtn.addEventListener('click', handler);\nbtn.addEventListener('click', handler);\nbtn.addEventListener('click', handler);\n\nfunction handler() {\n  console.log('clicked');\n}",
    o: ['1', '2', '3', '0'], a: 0 },

  { t: 'What does the following code output?',
    code: 'const arr = [1, 2, 3, 4, 5];\nconst result = arr\n  .filter(n => n % 2 !== 0)\n  .map(n => n * 3)\n  .reduce((acc, n) => acc + n, 0);\nconsole.log(result);',
    o: ['15', '27', '45', '30'], a: 1 },

  { t: 'What is the output of the following code?',
    code: 'let x = 10;\nfunction foo() {\n  console.log(x);\n  let x = 20;\n}\nfoo();',
    o: ['10', '20', 'undefined', 'ReferenceError'], a: 3 },

  { t: 'What is the output of the following code?',
    code: 'console.log(typeof null);\nconsole.log(null instanceof Object);',
    o: ["'null', false", "'object', true", "'object', false", "'undefined', false"], a: 2 },

  { t: 'Trace the output of the following code:',
    code: 'function test() {\n  console.log(a);\n  console.log(b);\n  var a = 1;\n  let b = 2;\n}\ntest();',
    o: ['undefined, undefined', '1, 2', 'ReferenceError, ReferenceError', 'undefined, ReferenceError'], a: 3 },

  { t: 'What is the output of the following code?',
    code: "let a = 0;\nswitch (a) {\n  case false:\n    console.log('false');\n    break;\n  case 0:\n    console.log('zero');\n    break;\n  case '':\n    console.log('empty string');\n    break;\n  default:\n    console.log('default');\n}",
    o: ['zero', 'false', 'empty string', 'default'], a: 0 },

  { t: 'What does the following code output?',
    code: 'const obj = { a: 1, b: 2, c: 3 };\nconst { a, ...rest } = obj;\nconsole.log(rest);',
    o: ['{ a: 1, b: 2, c: 3 }', '{ b: 2, c: 3 }', '[2, 3]', '{ a: 1 }'], a: 1 },

  { t: 'Which HTML element is most appropriate for containing the main navigation links of a webpage?',
    o: ['<section>', '<aside>', '<footer>', '<nav>'], a: 3 },

  { t: 'A developer writes the following HTML form. Which statement accurately describes what happens when the user clicks the Register button?',
    code: '<form action="/register" method="post">\n  <input type="text" name="username">\n  <input type="email" name="email">\n  <input type="number" name="age" min="18" max="99">\n  <button type="button">Register</button>\n</form>',
    o: ['The form submits via GET because method="post" is not a valid value', 'The number field is validated on the server automatically', 'The form is never submitted because the button has type="button" instead of type="submit"', 'The email field fails validation because it lacks a required attribute'], a: 2 },

  { t: 'Given the following HTML, which statement correctly describes the rendered output?',
    code: '<dl>\n  <dt>HTML</dt>\n  <dd>HyperText Markup Language</dd>\n  <dt>CSS</dt>\n  <dd>Cascading Style Sheets</dd>\n</dl>',
    o: ['A numbered list with HTML and CSS as items and their definitions as sub-items', 'A description list where each term is followed by its indented definition', 'A table with two columns: one for terms and one for definitions', 'A bulleted list where each term and definition appear on the same line'], a: 1 },

  { t: 'Which of the following correctly sets the character encoding AND makes the page responsive on mobile devices?',
    o: ['<meta charset="UTF-8"> and <meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta charset="UTF-8" viewport="width=device-width">', '<meta name="charset" content="UTF-8"> and <meta name="viewport" content="width=device-width">', '<meta charset="UTF-8"> and <meta http-equiv="viewport" content="width=device-width">'], a: 0 },

  { t: 'Given the following HTML and CSS, which <span> elements will have red text?',
    code: '<section>\n  <h2>Title</h2>\n  <span>Alpha</span>\n  <p>Para</p>\n  <span>Beta</span>\n  <span>Gamma</span>\n</section>\n\nh2 + span { color: red; }',
    o: ['Alpha, Beta and Gamma', 'Only Beta and Gamma', 'Only Alpha', 'Only Beta'], a: 2 },

  { t: 'Given the following HTML and CSS, which elements will have a green border?',
    code: '<div class="wrap">\n  <p id="first">One</p>\n  <p>Two</p>\n  <span>Three</span>\n  <p>Four</p>\n</div>\n\n.wrap p ~ p { border: 2px solid green; }',
    o: ['Only the paragraph containing "Four"', 'All three paragraphs inside .wrap', 'Only the paragraph containing "Two"', 'The paragraphs containing "Two" and "Four"'], a: 3 }
];
