var assert = require('assert');
var sinon = require('sinon');
var Faker = require('../index');

describe("company.js", function () {
    describe("companyName()", function () {
        it("lets you specify the type of name to return", function () {
            sinon.spy(Faker.Helpers, 'randomNumber');
            var name = Faker.Company.companyName(1);

            assert.ok(name.match(/-/));

            assert.ok(!Faker.Helpers.randomNumber.called);
            Faker.Helpers.randomNumber.restore();
        });

        it("sometimes returns three last names", function () {
            sinon.spy(Faker.definitions, 'last_name');
            sinon.stub(Faker.Helpers, 'randomNumber').returns(2);
            var name = Faker.Company.companyName();
            var parts = name.split(' ');

            assert.strictEqual(parts.length, 3);
            assert.ok(Faker.definitions.last_name.calledThrice);

            Faker.Helpers.randomNumber.restore();
            Faker.definitions.last_name.restore();
        });

        it("sometimes returns two last names separated by a hyphen", function () {
            sinon.spy(Faker.definitions, 'last_name');
            sinon.stub(Faker.Helpers, 'randomNumber').returns(1);
            var name = Faker.Company.companyName();
            var parts = name.split('-');

            assert.strictEqual(parts.length, 2);
            assert.ok(Faker.definitions.last_name.calledTwice);

            Faker.Helpers.randomNumber.restore();
            Faker.definitions.last_name.restore();
        });

        it("sometimes returns a last name with a company suffix", function () {
            sinon.spy(Faker.Company, 'companySuffix');
            sinon.spy(Faker.definitions, 'last_name');
            sinon.stub(Faker.Helpers, 'randomNumber').returns(0);
            var name = Faker.Company.companyName();
            var parts = name.split(' ');

            assert.ok(parts.length >= 2);
            assert.ok(Faker.definitions.last_name.calledOnce);
            assert.ok(Faker.Company.companySuffix.calledOnce);

            Faker.Helpers.randomNumber.restore();
            Faker.definitions.last_name.restore();
            Faker.Company.companySuffix.restore();
        });
    });

    describe("companySuffix()", function () {
        it("returns random value from company.suffixes array", function () {
            var suffix = Faker.Company.companySuffix();
            assert.ok(Faker.Company.suffixes.indexOf(suffix) !== -1);
        });
    });

    describe("catchPhrase()", function () {
        it("returns phrase comprising of a catch phrase adjective, descriptor, and noun", function () {
            sinon.spy(Faker.Helpers, 'randomize');
            sinon.spy(Faker.definitions, 'catch_phrase_adjective');
            sinon.spy(Faker.definitions, 'catch_phrase_descriptor');
            sinon.spy(Faker.definitions, 'catch_phrase_noun');
            var phrase = Faker.Company.catchPhrase();

            assert.ok(phrase.split(' ').length >= 3);
            assert.ok(Faker.Helpers.randomize.calledThrice);
            assert.ok(Faker.definitions.catch_phrase_adjective.calledOnce);
            assert.ok(Faker.definitions.catch_phrase_descriptor.calledOnce);
            assert.ok(Faker.definitions.catch_phrase_noun.calledOnce);

            Faker.Helpers.randomize.restore();
            Faker.definitions.catch_phrase_adjective.restore();
            Faker.definitions.catch_phrase_descriptor.restore();
            Faker.definitions.catch_phrase_noun.restore();
        });
    });

    describe("bs()", function () {
        it("returns phrase comprising of a BS adjective, buzz, and noun", function () {
            sinon.spy(Faker.Helpers, 'randomize');
            sinon.spy(Faker.definitions, 'bs_adjective');
            sinon.spy(Faker.definitions, 'bs_buzz');
            sinon.spy(Faker.definitions, 'bs_noun');
            var bs = Faker.Company.bs();

            assert.ok(typeof bs === 'string');
            assert.ok(Faker.Helpers.randomize.calledThrice);
            assert.ok(Faker.definitions.bs_adjective.calledOnce);
            assert.ok(Faker.definitions.bs_buzz.calledOnce);
            assert.ok(Faker.definitions.bs_noun.calledOnce);

            Faker.Helpers.randomize.restore();
            Faker.definitions.bs_adjective.restore();
            Faker.definitions.bs_buzz.restore();
            Faker.definitions.bs_noun.restore();
        });
    });
});
