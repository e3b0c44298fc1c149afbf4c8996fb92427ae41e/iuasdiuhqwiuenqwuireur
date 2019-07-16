/*jshint esversion: 9 */
var assert = require('assert');
var Conversation = require('../src/conversation.js');
describe('Conversation', function() {
  describe('#init() with proper file', function() {
    it('should initialize properly with proper json', function() {
      assert.doesNotThrow(
        () => {
          new Conversation('../src/troubleshooting.json');
        }
      );
    });
    it('should throw exception with bad file', function() {
      assert.throws(
        () => {
          new Conversation('./trubleshooting.json');
        }
      );
    });
  });
  describe('#reply()', function() {
    var conv;
    beforeEach(function() {
      conv = new Conversation('../src/troubleshooting.json');
    });

    it('should have start state on init', function() {
      assert.equal(conv.state, 'start');
    });
    it('should return initial state when inputing nothing', function() {
      assert.equal(conv.reply('').id, 'start');
    });
    it('should move to phoneModel state', function() {
      assert.equal(conv.reply('My phone doesn\'t work').id, 'phoneModel');
    });
    it('should return samsungServiceEnd state', function() {
      assert.equal(conv.reply('My phone doesn\'t work').id, 'phoneModel');
      assert.equal(conv.reply('Samsung Galaxy S10').id, 'samsungServiceEnd');
    });
    it('should return default state on other', function() {
      assert.equal(conv.reply('My hone doesn\'t work').id, 'otherState');
    });
  });
});
