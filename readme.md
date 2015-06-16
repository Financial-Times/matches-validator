#Matches Validator
A module to validate whether two HTML form elements have the same value.

##Usage
First, add the [configuration attributes](#config-options) to the DOM element you want to validate:

```
<input type="password" id="password">
<input type="password" id="password-confirmation" matches-validator-matches="#password" matches-validator-message="Passwords do not match">
```

Then initialise the validator in your Javascript:

```
MatchesValidator.init(document.getElementById('password-confirmation'));
```

The validator will validate the element on `keyup`. If the value does not match the value of the element selected in the `matches-validator-matches` attribute, it will trigger an `invalid` event and set a custom error on the element's `validityState` object.

##<a name="config-options"></a>Configuration options
The validator is configured by adding the following attributes to the DOM element you want to validate:

* **matches-validator-matches:** a selector that should select the element you want to compare against
* **matches-validator-message:** the value of the the element's validationMessage property

##Javascript API
Initialise validators by passing a DOM element to `MatchesValidator.init`. The given element can either be the element you want to validate, or a parent element you wish to scan for any elements with the configuration attributes. It returns either an instance of a MatchesValidator or an array of instances.

You can also use the MatchesValidator constructor directly, passing the element to validate and a configuration option object.