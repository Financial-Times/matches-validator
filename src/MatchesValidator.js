(function(root) {
    function validate() {
        var match = this.matchEl.value;
        var value = this.el.value;

        if (!value) {
            return;
        }

        if (value != match) {
            var evt = new CustomEvent('invalid', {
                bubbles: false,
                cancelable: true
            });

            this.el.setCustomValidity(this.message);
            this.el.dispatchEvent(evt);
        } else {
            this.el.setCustomValidity('');
        }
    }

    function compile(el) {
        var attrs = el.attributes;
        var prefix = 'matches-validator-';
        var i = attrs.length;
        var name;
        var config = {};

        while (i--) {
            name = attrs[i].name;

            if (name.indexOf(prefix) === 0) {
                name = name.replace(prefix, '');
                config[name] = attrs[i].value;
            }
        }

        return new MatchesValidator(el, config);
    }

    function MatchesValidator(el, config) {
        if (!(this instanceof MatchesValidator)) {
            return new MatchesValidator(el, config);
        }

        this.el = el;
        this.matchEl = document.querySelector(config.matches);
        this.message = config.message;

        this.el.addEventListener('keyup', validate.bind(this));
        this.matchEl.addEventListener('keyup', validate.bind(this));
    }

    MatchesValidator.init = function(rootEl) {
        var selector = '[matches-validator-matches]';

        if (rootEl.matches(selector)) {
            return compile(rootEl);
        }

        var nodes = rootEl.querySelectorAll(selector);
        var validators = [];
        var i = nodes.length;

        while (i--) {
            validators.push(compile(nodes[i]));
        }

        return validators;
    };

    if (typeof exports === 'object') {
        module.exports = MatchesValidator;
    } else if (typeof define === 'function' && define.amd) {
        define(function() {
            return MatchesValidator;
        });
    } else {
        root.MatchesValidator = MatchesValidator;
    }
})(this);