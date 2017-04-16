var expect = require('expect');

var generateMessage = require('./message');

describe('generateMessage', function(){
    it('should generate correct message object', function(from,text){
        var from = 'jen';
        var  test = 'some';
        var message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from:from,text:text});

    });
});