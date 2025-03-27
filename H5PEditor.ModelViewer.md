# Review of H5PEditor.ModelViewer-1.7

## Function
- You can choose from five different options for the "Label position" in the "Label Settings" group, but changes do not cause any effect, neither in the editor nor in the view. Also, there are no behavioral settings that the first option item refers to. If the label was supposed to be positionable, this should be fixed. Otherwise, the group could be removed.
- When removing a model, the hotspots that were assigned to it are not removed. They will be reattached to any new model that is uploaded. This is probably not intended and should be fixed. Optionally, a confirmation dialog (H5P core has a class for that) could be displayed before deleting everything.
- Labels are not properly encoded. Try setting the labed to `Foo's Bar` and you will get it HTML encoded as `Foo&#039;s Bar`. H5P's editor core encodes it to prevent scripting attacks. If you need the text of an (HTML) text input field in a non HTML context, you will need to purify it yourself.
- I have not found the pattern yet, but after editing an existing model and after adding/removing a couple of labels, they get put on top of the previous position regardless of where I have clicked to place them.

## Accessibility
- When you activate a button in the toolbar, it's a little hard to know that is active, because you don't notice a visual difference on clicking - you will only notice one you move the mouse pointer away from the button. A colored border might help here.
- The buttons in the toolbar do not have an aria-label, which will make screen readers only announce "button" without any notion of what the button does. The aria labels could, e.g. read "Add $tooltop" where $tooltip is the tooltip text.
- The toolbar should probably follow the toolbar pattern (https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) even though it still feels okay to tab through this number of buttons - especially because of the next issue.
- Adding labels to the model is not possible with the keyboard, but that cannot sensibly be changed.
- Modifying labels is not possible as there's nothing to tab to.
- The form overlay is not a proper modal dialog (https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/): No focus trap, Escape does not close the dialog, losing focus when opening/closing the dialog, etc.

# Responsiveness
- The toolbar does not wrap if the horizontal space gets smaller than ~360px. That's probably okay for now, but if more subcontents should get added, this will cause trouble. There's no reason to not make this responsible in the first place.

# Cross browser functionality
Seems to work across the latest three versions of all browsers

# Cross platform functionality
Not checked. Would not know what role the platform might play here.

# Translations
- The English template should be proof-read.
- Most of the strings seem not be uses at all (!?) and should be removed
- The German translations are broken. They must match the English template

# Security
- Checked for XSS, nothing detected.
- Some npm dependencies have known vulnerabilities, only for dev though. Should be updated.

# Code

## JavaScript
- Looks fine in general, see separate file for code remarks linked to the specific files/lines of code
- H5P coding style guide should be studied and followed, eslint can help here but needs to be configured properly
- When JSDoc comments are used, they should be complete - and they should be used for all exposed functions at least.
- There's some unused code (calling non-existing functions) that can be removed

## CSS
- Readability might be improved by nesting classing appropriately.
- Abundant use of flexboxes that does not feel required
- Lots of `width: 100%` declarations which are only required in some cases, as 100% is the default for width.
- Using absolute (px) values for element sizes, font sizes and more. Not best practice.
- Colors could be defined in CSS custom properties (or SCSS variables) and be reused

## H5P specific files
- library.json: FontAwesome 4.6 should be referenced, the ModelViewerScript reference can probably be removed, see detail comments

# Repository
- .h5pignore is is missing `scripts`, but that folder is obsolete anyway
LICENSE.md should not name Joubel
- In package.json, author and contributor information needs to be corrected. Also the script `"test": "echo \"Error: no test specified\" && exit 1"` should be removed, as it does break continuous integration and does not yield a benefit
- eslint should be set up properly (the config file must be named .eslintrc.json and is commonly put on the top directory level, and properly extend eslint-config-ndla-h5p to get proper config for H5P style guide)
