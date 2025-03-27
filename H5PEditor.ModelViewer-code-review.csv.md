# Code Review Results

## `/library.json`
### Position: `33:0-37:6`
* Priority: `2`
* Title: `May be obsolete`
* Category: `Architecture`
* Description: `See review of ModelViewerScript`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `41:23-41:23`
* Priority: `1`
* Title: `Outdated dependency`
* Category: `Best Practices`
* Description: `Was updated to version 4.5.6 two years ago`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/LICENSE.md`
### Position: `3:0-3:28`
* Priority: `1`
* Title: `License needs updating`
* Category: `Best Practices`
* Description: `The license should not name Joubel`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/package.json`
### Position: `12:2-38:4`
* Priority: `2`
* Title: `Dependencies should be updated once in a while`
* Category: `Best Practices`
* Description: `There are 3 vulnerabilities, currently (only in dev though)`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `22:0-23:69`
* Priority: `2`
* Title: `Migrate to eslint 9?`
* Category: `Best Practices`
* Description: `Eslint 8 is outdated. Could be migrated to version 9 (beware, breaking changes), but then eslint-config-ndla-h5p cannot be used anymore (as it requires version 8). Alternatively eslint-config-snordian-h5p (github:otacke/eslint-config-snordian-h5p) could be used which already uses and ships eslint 9.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `35:0-36:25`
* Priority: `1`
* Title: `Would migration to React 19 make sense?`
* Category: `Maintainability`
* Description: `Just a thought. React has very good legacy support of outdated versions. Since version 19 is out, it might be worth thinking if migrating would make sense.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `40:0-41:0`
* Priority: `0`
* Title: `needs updating`
* Category: `Other`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `42:2-45:4`
* Priority: `1`
* Title: `What have they contributed? ;-)`
* Category: `Best Practices`
* Description: `What did Frode and Thomas contribute?`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/README.md`
### Position: `1:0-1:29`
* Priority: `1`
* Title: `Needs to be updated`
* Category: `Best Practices`
* Description: `This is not a readme for the ModelViewer editor widget`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/language/de.json`
### Position: `2:2-2:18`
* Priority: `3`
* Title: `German translation is incomplete`
* Category: `Best Practices`
* Description: `This needs fixing. The translation is incomplete.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/scripts/customlib.js`
### Position: `1:0-15:1`
* Priority: `3`
* Title: `Unused file`
* Category: `Best Practices`
* Description: `This code seems to be unused (and relying on remote resources is something that should not be done anyway unless absolutely required).`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/eslintrc.json`
### Position: `1:0-25:1`
* Priority: `3`
* Title: `Should this really be located in the source directory?`
* Category: `Best Practices`
* Description: `I recommend to put this into the top directory as commonly done in other H5P content type repositories.

Also, the file name should start with a .`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/scripts/app.js`
### Position: `32:0-43:7`
* Priority: `3`
* Title: `Deprecated functions`
* Category: `Maintainability`
* Description: `ReactDOM.unmountComponentAtNode and ReactDOM.render have been deprecated in React 18. These should be replaced with using the root API.`
* Additional Info: `https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `58:0-60:27`
* Priority: `2`
* Title: `Unnecessary variable`
* Category: `Complexity`
* Description: `Instead of creating &#x60;wrapper&#x60; and then assigning it to &#x60;this.wrapper&#x60;, the latter could be used right away.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `65:0-66:0`
* Priority: `0`
* Title: `Claiming an error when there&#x27;s none`
* Category: `Other`
* Description: `The error is always displayed when creating a new model. I assume this was rather some debugging code that is now obsolete?`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `65:0-66:0`
* Priority: `0`
* Title: `Discouraged use of if clause without code block`
* Category: `Code-Style`
* Description: `H5P code should not use one-line if clauses. It should use a block in curly braces.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `82:0-88:5`
* Priority: `0`
* Title: `Use container query instead of JavaScript`
* Category: `Best Practices`
* Description: `Isn&#x27;t this something you can do without JavaScript by using a container query in CSS? That feels to be the better approach nowadays.

Even if using JavaScript, just using

&#x60;&#x60;&#x60;this.wrapper.classList.toggle(&#x27;mobile&#x27;, wrapperSize.width &lt; mobileThreshold)&#x60;&#x60;&#x60;

would be more concise.
`
* Additional Info: `https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `82:0-82:32`
* Priority: `2`
* Title: `No magic numbers`
* Category: `Code-Style`
* Description: `Add constant with self-explanatory name about what 815 is.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `99:2-101:4`
* Priority: `0`
* Title: `This should be in class notation, not ES5 function`
* Category: `Other`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `100:4-100:16`
* Priority: `0`
* Title: `Careful with always returning true in validate`
* Category: `Best Practices`
* Description: `If there&#x27;s no mandatory value, &#x60;true&#x60; looks okay, but it can prevent H5P core from storing all values that have been entered in a form. A widget&#x27;s validate function should ensure that the validate function of all (form) children are called, too.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/scripts/h5phelpers/editorForms.js`
### Position: `6:0-7:20`
* Priority: `0`
* Title: `Complete JSDoc info`
* Category: `Best Practices`
* Description: `If JSDoc comments are used, they should be complete. Here there&#x27;s no type information for the parameter and no description for both the parameter and the return value`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `58:10-58:45`
* Priority: `0`
* Title: `Use optional chaining`
* Category: `Best Practices`
* Description: `Using &#x60;!child.params?.path&#x60; feels more concise.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/scripts/h5phelpers/forms/interactionForm.js`
### Position: `1:0-1:69`
* Priority: `0`
* Title: `Use single quotes only`
* Category: `Code-Style`
* Description: `Don&#x27;t mix single and double quotes. H5P coding style guidelines call for single quotes.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/scripts/h5phelpers/forms/modelForm.js`
### Position: `20:2-20:11`
* Priority: `0`
* Category: `Other`
* Description: `This is a general comment: Ensure that H5P and H5PEditor are defined as global constants for eslint - should be enough to properly extend eslint-config-ndla-h5p`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/scripts/components/Main.scss`
### Position: `7:2-7:16`
* Priority: `0`
* Title: `Should this be a fixed height?`
* Category: `Best Practices`
* Description: `A fixed height (in px) is often not a good choice when trying to create responsive interfaces.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `15:0-15:14`
* Priority: `0`
* Title: `Is setting width required here?`
* Category: `Best Practices`
* Description: `The default value of &#x60;width&#x60; is &#x60;100%&#x60; and I am not sure that explicitly setting here is required.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `26:2-26:16`
* Priority: `0`
* Title: `Yet again, 400px as magic number`
* Category: `Other`
* Description: `Should this really be a fixed height? If yes, it probably makes sense to introduce a custom CSS property holding the value, since it is used in different places.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `29:0-40:1`
* Priority: `0`
* Title: `Remove`
* Category: `Best Practices`
* Description: `Does not seem to be used anywhere, is it?`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `44:0-45:15`
* Priority: `0`
* Title: `Should this really be an absolute size?`
* Category: `Other`
* Description: `Should this really be an absolute size? This is often not good practice and will interfere with increasing the zoom level of the browser.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `58:0-74:1`
* Priority: `0`
* Title: `Should these really be absolute values?`
* Category: `Best Practices`
* Description: `Should &#x60;font-size&#x60;, &#x60;left&#x60; and &#x60;max-width&#x60; really use absolute values (in px) for sizing? This is often not good practice and will interfere with increasing the zoom level of the browser.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `76:0-77:0`
* Priority: `0`
* Title: `Couldn&#x27;t this be removed?`
* Category: `Maintainability`
* Description: `Only used in HotspotList which does not seem to be used anymore at all`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `80:0-80:16`
* Priority: `0`
* Title: `Again: magic number 400px`
* Category: `Other`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `81:1-81:14`
* Priority: `0`
* Title: `Again: width: 100%`
* Category: `Best Practices`
* Description: `This seems to have been slapped onto every flexbox (without always beeing needed). Also, lots of containers are using flexbox and I wonder why. Does not seem to be needed at all.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `112:0-113:15`
* Priority: `0`
* Title: `Again: absolute values`
* Category: `Other`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `148:0-150:5`
* Priority: `0`
* Title: `Does this impact accessibility?`
* Category: `Best Practices`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `156:0-165:1`
* Priority: `0`
* Title: `Once more: absolute (px) values`
* Category: `Best Practices`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `164:0-165:0`
* Priority: `0`
* Title: `Formatting`
* Category: `Code-Style`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `179:0-181:24`
* Priority: `0`
* Title: `Lots of shades of blue`
* Category: `Best Practices`
* Description: `There are lost of similar shades of blue used. Could be unified and probably put into custom CSS properties or SCSS variables if need be.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `206:0-227:1`
* Priority: `0`
* Title: `Where is this used?`
* Category: `Best Practices`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `233:2-233:18`
* Priority: `0`
* Title: `Again: Absolute (px) sizing`
* Category: `Other`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `246:2-246:33`
* Priority: `0`
* Title: `Couldn&#x27;t this be defined on the hotspot class`
* Category: `Other`
* Description: `Close to all the hotspots&#x27; pseudo-elements use this font-family, so it could as well be set on the &#x60;hotspot&#x60; class once instead and override it only if required.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/scripts/components/Main.js`
### Position: `54:4-54:63`
* Priority: `0`
* Title: `Wrong use of removeEventListener`
* Category: `Other`
* Description: `This is not how &#x60;removeEventListener&#x60; works! This will not remove all listeners of type &#x60;load&#x60;. It requires the specific listener function that should be removed.

Since &#x60;load&#x60; is only expected to run once, you can add the &#x60;once&#x60; option to the respective &#x60;addEventListener&#x60; call instead, and the listener will be removed automatically.`
* Additional Info: `https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#once`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `72:0-76:7`
* Priority: `0`
* Title: `Else should be on next line`
* Category: `Code-Style`
* Description: `Just adding this to hint to the H5P coding style guideline ...`
* Additional Info: `https://h5p.org/code-style`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `97:8-97:24`
* Priority: `0`
* Title: `Simplify code`
* Category: `Best Practices`
* Description: `This would feel way mor concise as

&#x60;&#x60;&#x60;
this.setState({
  listeningForClicks: library !&#x3D;&#x3D; null,
});
&#x60;&#x60;&#x60;`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/scripts/components/HotspotList/HotspotList.js`
### Position: `1:0-50:0`
* Priority: `0`
* Title: `Unused file`
* Category: `Maintainability`
* Description: `This file/class does not seem to be used at all.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/scripts/components/Toolbar/Toolbar.js`
### Position: `14:0-21:5`
* Priority: `0`
* Title: `Use &quot;fail early&quot;`
* Category: `Best Practices`
* Description: `Consider to fail early like:

&#x60;&#x60;&#x60;
if (!modelViewerInstance) {
  return;
}

...
&#x60;&#x60;&#x60;`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `28:0-30:19`
* Priority: `0`
* Title: `Button ignores common a11y rules`
* Category: `Best Practices`
* Description: `In particular, there&#x27;s no aria-label`
* Additional Info: `https://www.w3.org/WAI/ARIA/apg/patterns/button/`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/scripts/components/ModelViewer/ModelViewer.js`
### Position: `15:6-15:47`
* Priority: `0`
* Title: `Do these need to be set directly or could they simply be part of the style sheets?`
* Category: `Other`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `17:6-17:38`
* Priority: `0`
* Title: `Hardcoded alt text`
* Category: `Other`
* Description: `This should be a translatable text - and have a proper default text :-)`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `34:54-34:59`
* Priority: `0`
* Title: `What is {&#x27; &#x27;} supposed to do here?`
* Category: `Other`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `34:18-34:30`
* Priority: `0`
* Title: `Is adding the label number really required here?`
* Category: `Other`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/scripts/components/InteractionsBar/InteractionsBar.scss`
### Position: `6:0-7:35`
* Priority: `0`
* Title: `Colors could be put in custom CSS properties/SCSS variables`
* Category: `Other`
* Description: `General comment for whole file`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `49:0-50:19`
* Priority: `0`
* Title: `change color names to values`
* Category: `Best Practices`
* Description: `Its not good practice to use color names in production code`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/scripts/components/InteractionsBar/InteractionsBar.js`
### Position: `30:0-38:12`
* Priority: `0`
* Title: `Unused code`
* Category: `Best Practices`
* Description: `Remove`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `48:19-48:48`
* Priority: `0`
* Title: `Support RTL languages`
* Category: `Best Practices`
* Description: `The ellipses should be part of the translatable text to ensure support for right-to-left languages`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `56:14-56:83`
* Priority: `0`
* Title: `Simplify`
* Category: `Other`
* Description: `&#x60;library.name&#x60; will never be undefined, so 
&#x60;&#x60;&#x60;
if (this.props.activeElement &#x3D;&#x3D;&#x3D; library.name) {
&#x60;&#x60;&#x60;
suffices.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/scripts/components/EditingDialog/InteractionEditor.js`
### Position: `38:4-40:48`
* Priority: `0`
* Title: `Scenes?`
* Category: `Other`
* Description: `What&#x27;s this?`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `56:25-56:41`
* Priority: `0`
* Title: `Prevent crash`
* Category: `Reliability`
* Description: `You should not find children by index. If the semantics structure ever changes, this will crash. Find the correct child instead.`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `64:8-64:73`
* Priority: `0`
* Title: `Suggestion: Use optional chaining to simplify code`
* Category: `Other`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
### Position: `70:0-75:5`
* Priority: `0`
* Title: `Simplify`
* Category: `Other`
* Description: `This could be simplified to
&#x60;&#x60;&#x60;
const uberName &#x3D; this.props.hotspot?.action.library ?? this.params.action.library;
&#x60;&#x60;&#x60;
without really losing intelligibility
`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
## `/src/scripts/components/EditingDialog/EditingDialog.scss`
### Position: `17:0-26:31`
* Priority: `0`
* Title: `What&#x27;s magic numner 3em/6em?`
* Category: `Other`
* Description: `Can a custom CSS property help here?`
* SHA: `727b8c3a2561737f73362893961f920c320af30b`
