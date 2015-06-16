describe('Matches validator', function() {
    before(function() {
        fixture.setBase('test/fixtures');
    });

    beforeEach(function() {
        fixture.load('fixture.html');
        window.MatchesValidator.init(fixture.el);
    });

    afterEach(function() {
        fixture.cleanup();
    });

    it('should invalidate the element if the values do not match', function(done) {
        var input1 = document.getElementById('input-1');
        var input2 = document.getElementById('input-2');

        input1.value = 'foo';
        input2.value = 'bar';

        input2.addEventListener('invalid', function(e) {
            expect(input2.validity.valid).to.equal(false);
            expect(input2.validationMessage).to.equal('Values must match');

            done();
        });

        input2.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));
    });

    it('should clear the validation if the values do match', function(done) {
        var input1 = document.getElementById('input-1');
        var input2 = document.getElementById('input-2');

        // first set the values to non-matching strings
        // and trigger the validation to put the element in an invalid state
        input1.value = 'foo';
        input2.value = 'bar';

        input2.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));

        input2.value = 'foo';

        input2.addEventListener('keyup', function() {
            expect(input2.validity.valid).to.equal(true);
            expect(input2.validationMessage).to.equal('');

            done();
        });

        input2.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));
    });
});