# Calculator Readme

## JavaScript Calculator by Jackpock123

A calculator web application built from vanilla JavaScript as part of Founder's and Coders pre-course requirements.

To be submitted for review for Wednesday 26th February 2020.

### Design Requirements

The design criteria can be found [here](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-javascript-calculator).

### Definitions

* **currentOperand:** The number in the main display which can be manipulated by user or is the result of a calculation
* **operation:** [JavaScript Arithmetic Operators](https://www.w3schools.com/js/js_operators.asp)
* **previousOperand:** The previously defined number in the secondary display which will be used with the currentOperand and operation when evaluating the expression. 

### Methodology
This calculator utilizes _immediate execution logic_ and an Object Oriented Programming (OOP) approach.

I choose this appoach as I was interested in learning more about the class syntax and constructor functions. More specifically how they could be used as a blueprint for creating objects. 

Note there are two JS files. They are identical except for a small difference in syntax:

1. __app.constructor.js (default):__ Refactored code without the class syntax using constructors and prototypes. Created to illustrate differences in syntax with classes. Default due to small issue with following JS file (see Point 6 in Improvements).
1. __app-class.js:__ This file uses a class function. The comments remain in the code to walk the reviewer though my thought process as I was building the application. 

### Resources
1. [Build A Calculator With JavaScript Tutorial](https://www.youtube.com/watch?v=j59qQ7YWLxw)
2. [JavaScript Classes Tutorial:](https://www.youtube.com/watch?v=2ZphE5HcQPQ) to manipulate DOM to show calculation history.
3. [Object Oriented Programming Challenges](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/object-oriented-programming/) from FreeCodeCamp
4. [Buttons must have discernible text](https://dequeuniversity.com/rules/axe/3.2/button-name): for guidance on describing button functionality for screen readers.
5. [How Button Input Type Creates A Form Button In JavaScript:](https://html.com/input-type-button/) For decision on using *<button>* or *<input type='button'>*.

### Design Considerations
1. **The application should take a mobile first approach and be responsive for smaller screens.** However, most smaller devices have calculator mobile applications so the typical user would be using a computer.
2. After reading [this](https://html.com/input-type-button/) article I **decided to use input elements instead of buttons.** As some of the input values were not intuitive I used both *value* and *aria-label* attributes.
2. **Data types are used to interact with JS and IDs for CSS to seperate out styling and script based behaviour.** Although if the data type or ID changes at a later date the author would have to update both the style and JS sheets. Q: Is this unnecesary or good practice? 
2. **Semantics:** Input elements with type='button' chosen over button elements. Used a <form> element because the calculator contained [interactive controls for submitting information.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) Used a Aria role='application' to indicate to assisstive technologies that it is a desktop application.

### Accessibility Considerations
1. **Using a value attribute or innerText to describe button function:** I wanted the equivalent of alt text for images to describe unintuitive button functions such as DEL, AC and MR. I was going to delete the buttons' value attribute as it seemed like surplus code. However, as [this guidance](https://dequeuniversity.com/rules/axe/3.2/button-name) suggested using either an *aria-label* or *value* attribute I decided to proceed using aria labels.
3. **A discernible difference is needed between active and focused buttons** to show they have been selected by user. 
4. **The user experience for keyboard users.** Tabbing through the input elements is rather monotonous. Use of number and arrow keys would improve usability.

### Improvements
1. Calulation history could be saved locally using *localStorage.setItem* and *getItem*.
2. The operation sign cannot be changed after it is selected.
3. Declare eventListeners for number key presses so user can use keyboard to input numbers.
1. Facilitate use of arrow keys.
4. After a calculation is executed, if equals is pressed again the execute same equation but replace currentOperand with new value.
5. _app-class.js_ script sheet: If pressing an operation button to evaluate the expression, it must be pressed again to be applied to the newly calculated value.
6. If user clicks on an equation in the calculation history list, the currentOperand displays the calculated value.
7. Styling is functional but not eye catching.
8. Use of MR button not intuitive. Could add a key to describe function of each button.


### Key Learning Points
1. **ID limitations:** An ID will override a class in CSS. So if a class is added to an element using JS and it clashes with ID styles the ID will always win.
2. **Relationship between IDs, classes and data atttributes with JS:** Following Point 1, there needs to be a clear strategy for how the programmer is going to interact with HTML elements using CSS and JS. Q: What is best practice?
3. **Input limitations:** Pseudo classes cannot be used with input elements and they cannot contain text. A button element was used for MR (Memory Recall) so I could use pseudo class to add an icon.

### Issue Log
##### 1. Version Control
At SHA 07051e0 I encountered a problem with version control. I created a new branch gh-pages to publish my site. As the new branch did not show in the remote version I tried to push it to the remote and received this error fatal:
>*The current branch gh-pages has no upstream branch. To push the current branch and set the remote as upstream, use git push --set-upstream origin gh-pages*. 

After using this command I tried to revert to a previous commit so I could get back to the starting point. However, I could not push this because the remote was ahead.

In the end I just pulled from the remote and started again from 07051e0 and merged with the local in SHA a9eaaef and lost some small updates.

#### 2. Version Control
My project page was not publishing. I read on Stack that a Jekyll theme was required for pages to show. In selecting one on GitHub it (unknowingly to me) created a new commit just on the remote. This commit was different to what I had in my local so when I went to push my local changes I received this hint: 
>hint: Updates were rejected because the tip of your current branch is behind its remote counterpart. Integrate the remote changes (e.g. 'git pull ...') before pushing again. See the 'Note about fast-forwards' in 'git push --help' for details.

The problem was that the local was ahead of the remote but because of the theme related commit Git thinks the remote is ahead of the local. I wanted the remote on GitHub to mirror the local but I didn't want to *git pull* in case I erase all the additional work.