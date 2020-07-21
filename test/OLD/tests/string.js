namespace('String', function () {

  // Skipping strict mode here as testing
  // malformed utf-8 is part of these tests.

  var whiteSpace = '\u0009\u000B\u000C\u0020\u00A0\uFEFF\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000';
  var lineTerminators = '\u000A\u000D\u2028\u2029';

  method('escapeURL', function() {

    test('what a day...', 'what%20a%20day...', '...');
    test('/?:@&=+$#', '/?:@&=+$#', 'url chars');
    test('!%^*()[]{}\\:', '!%25%5E*()%5B%5D%7B%7D%5C:', 'non url special chars');

    test('http://www.amazon.com/Kindle-Special-Offers-Wireless-Reader/dp/B004HFS6Z0/ref=amb_link_356652042_2?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=center-1&pf_rd_r=1RKN5V41WJ23AXKFSQ56&pf_rd_t=101&pf_rd_p=1306249942&pf_rd_i=507846', 'http://www.amazon.com/Kindle-Special-Offers-Wireless-Reader/dp/B004HFS6Z0/ref=amb_link_356652042_2?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=center-1&pf_rd_r=1RKN5V41WJ23AXKFSQ56&pf_rd_t=101&pf_rd_p=1306249942&pf_rd_i=507846', 'amazon link');
    test('http://twitter.com/#!/nov/status/85613699410296833', 'http://twitter.com/#!/nov/status/85613699410296833', 'twitter link');
    test('http://cgi.ebay.com/T-Shirt-Tee-NEW-Naruto-Shippuuden-Kakashi-Adult-Men-XL-/350233503515?_trksid=p5197.m263&_trkparms=algo=SIC&itu=UCI%2BIA%2BUA%2BFICS%2 fBUFI%2BDDSIC&otn=10&pmod=260625794431%2B370476659389&po=LVI&ps=63&clkid=962675460977455716#ht_3216wt_1141', 'http://cgi.ebay.com/T-Shirt-Tee-NEW-Naruto-Shippuuden-Kakashi-Adult-Men-XL-/350233503515?_trksid=p5197.m263&_trkparms=algo=SIC&itu=UCI%252BIA%252BUA%252BFICS%252%20fBUFI%252BDDSIC&otn=10&pmod=260625794431%252B370476659389&po=LVI&ps=63&clkid=962675460977455716#ht_3216wt_1141', 'ebay link');

  });

  method('escapeURL', function() {
    test('what a day...', [true], 'what%20a%20day...', '...');
    test('/?:@&=+$#', [true], '%2F%3F%3A%40%26%3D%2B%24%23', 'url chars');
    test('!%^*()[]{}\\:', [true], '!%25%5E*()%5B%5D%7B%7D%5C%3A', 'non url special chars');
    test('http://www.amazon.com/Kindle-Special-Offers-Wireless-Reader/dp/B004HFS6Z0/ref=amb_link_356652042_2?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=center-1&pf_rd_r=1RKN5V41WJ23AXKFSQ56&pf_rd_t=101&pf_rd_p=1306249942&pf_rd_i=507846', [true], 'http%3A%2F%2Fwww.amazon.com%2FKindle-Special-Offers-Wireless-Reader%2Fdp%2FB004HFS6Z0%2Fref%3Damb_link_356652042_2%3Fpf_rd_m%3DATVPDKIKX0DER%26pf_rd_s%3Dcenter-1%26pf_rd_r%3D1RKN5V41WJ23AXKFSQ56%26pf_rd_t%3D101%26pf_rd_p%3D1306249942%26pf_rd_i%3D507846', 'amazon link');
    test('http://cgi.ebay.com/T-Shirt-Tee-NEW-Naruto-Shippuuden-Kakashi-Adult-Men-XL-/350233503515?_trksid=p5197.m263&_trkparms=algo=SIC&itu=UCI%2BIA%2BUA%2BFICS%2 fBUFI%2BDDSIC&otn=10&pmod=260625794431%2B370476659389&po=LVI&ps=63&clkid=962675460977455716#ht_3216wt_1141', [true], 'http%3A%2F%2Fcgi.ebay.com%2FT-Shirt-Tee-NEW-Naruto-Shippuuden-Kakashi-Adult-Men-XL-%2F350233503515%3F_trksid%3Dp5197.m263%26_trkparms%3Dalgo%3DSIC%26itu%3DUCI%252BIA%252BUA%252BFICS%252%20fBUFI%252BDDSIC%26otn%3D10%26pmod%3D260625794431%252B370476659389%26po%3DLVI%26ps%3D63%26clkid%3D962675460977455716%23ht_3216wt_1141', 'ebay link');

  });

  method('unescapeURL', function() {

    test('what%20a%20day...', 'what a day...', '...');
    test('%2F%3F%3A%40%26%3D%2B%24%23', '/?:@&=+$#', 'url chars');
    test('!%25%5E*()%5B%5D%7B%7D%5C%3A', '!%^*()[]{}\\:', 'non url special chars');
    test('http%3A%2F%2Fsomedomain.com%3Fparam%3D%22this%3A%20isn\'t%20an%20easy%20URL%20to%20escape%22', 'http://somedomain.com?param="this: isn\'t an easy URL to escape"', 'fake url')
    test('http%3A%2F%2Fwww.amazon.com%2FKindle-Special-Offers-Wireless-Reader%2Fdp%2FB004HFS6Z0%2Fref%3Damb_link_356652042_2%3Fpf_rd_m%3DATVPDKIKX0DER%26pf_rd_s%3Dcenter-1%26pf_rd_r%3D1RKN5V41WJ23AXKFSQ56%26pf_rd_t%3D101%26pf_rd_p%3D1306249942%26pf_rd_i%3D507846', 'http://www.amazon.com/Kindle-Special-Offers-Wireless-Reader/dp/B004HFS6Z0/ref=amb_link_356652042_2?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=center-1&pf_rd_r=1RKN5V41WJ23AXKFSQ56&pf_rd_t=101&pf_rd_p=1306249942&pf_rd_i=507846', 'amazon link');
    test('http://cgi.ebay.com/T-Shirt-Tee-NEW-Naruto-Shippuuden-Kakashi-Adult-Men-XL-/350233503515?_trksid=p5197.m263&_trkparms=algo%3DSIC%26itu%3DUCI%252BIA%252BUA%252BFICS%252BUFI%252BDDSIC%26otn%3D10%26pmod%3D260625794431%252B370476659389%26po%3DLVI%26ps%3D63%26clkid%3D962675460977455716', 'http://cgi.ebay.com/T-Shirt-Tee-NEW-Naruto-Shippuuden-Kakashi-Adult-Men-XL-/350233503515?_trksid=p5197.m263&_trkparms=algo=SIC&itu=UCI%2BIA%2BUA%2BFICS%2BUFI%2BDDSIC&otn=10&pmod=260625794431%2B370476659389&po=LVI&ps=63&clkid=962675460977455716', 'ebay link');

    raisesError(function() { run('% 23'); }, 'should raise an error for malformed urls');
  });

  method('unescapeURL', function() {
    test('what%20a%20day...', [true], 'what a day...', '...');
    test('%2F%3F%3A%40%26%3D%2B%24%23', [true], '%2F%3F%3A%40%26%3D%2B%24%23', 'url chars');
    test('!%25%5E*()%5B%5D%7B%7D%5C:', [true], '!%^*()[]{}\\:', 'non url special chars');
    test('http%3A%2F%2Fsomedomain.com%3Fparam%3D%22this%3A%20isn\'t%20an%20easy%20URL%20to%20escape%22', [true], 'http%3A%2F%2Fsomedomain.com%3Fparam%3D"this%3A isn\'t an easy URL to escape"', 'fake url')
    test('http%3A%2F%2Fwww.amazon.com%2FKindle-Special-Offers-Wireless-Reader%2Fdp%2FB004HFS6Z0%2Fref%3Damb_link_356652042_2%3Fpf_rd_m%3DATVPDKIKX0DER%26pf_rd_s%3Dcenter-1%26pf_rd_r%3D1RKN5V41WJ23AXKFSQ56%26pf_rd_t%3D101%26pf_rd_p%3D1306249942%26pf_rd_i%3D507846', [true], 'http%3A%2F%2Fwww.amazon.com%2FKindle-Special-Offers-Wireless-Reader%2Fdp%2FB004HFS6Z0%2Fref%3Damb_link_356652042_2%3Fpf_rd_m%3DATVPDKIKX0DER%26pf_rd_s%3Dcenter-1%26pf_rd_r%3D1RKN5V41WJ23AXKFSQ56%26pf_rd_t%3D101%26pf_rd_p%3D1306249942%26pf_rd_i%3D507846', 'amazon link');
    test('http://twitter.com/#!/nov/status/85613699410296833', [true], 'http://twitter.com/#!/nov/status/85613699410296833', 'twitter link');
    test('http://cgi.ebay.com/T-Shirt-Tee-NEW-Naruto-Shippuuden-Kakashi-Adult-Men-XL-/350233503515?_trksid=p5197.m263&_trkparms=algo=SIC&itu=UCI%2BIA%2BUA%2BFICS%2fBUFI%2BDDSIC&otn=10&pmod=260625794431%2B370476659389&po=LVI&ps=63&clkid=962675460977455716#ht_3216wt_1141', [true], 'http://cgi.ebay.com/T-Shirt-Tee-NEW-Naruto-Shippuuden-Kakashi-Adult-Men-XL-/350233503515?_trksid=p5197.m263&_trkparms=algo=SIC&itu=UCI%2BIA%2BUA%2BFICS%2fBUFI%2BDDSIC&otn=10&pmod=260625794431%2B370476659389&po=LVI&ps=63&clkid=962675460977455716#ht_3216wt_1141', 'ebay link');

    raisesError(function() { run('% 23'); }, 'should raise an error for malformed urls');
  });

  method('escapeHTML', function() {
    test('<p>some text</p>', '&lt;p&gt;some text&lt;/p&gt;', '<p>some text</p>');
    test('war & peace & food', 'war &amp; peace &amp; food', 'war & peace');
    test('&amp;', '&amp;amp;', 'double escapes &amp;');
    test('&lt;span&gt;already escaped, yo&lt;/span&gt;', '&amp;lt;span&amp;gt;already escaped, yo&amp;lt;/span&amp;gt;', 'already escaped will be double-escaped');
  });

  method('unescapeHTML', function() {
    test('&lt;p&gt;some text&lt;/p&gt;', '<p>some text</p>', '<p>some text</p>');
    test('war &amp; peace &amp; food', 'war & peace & food', 'war & peace');
    test('<span>already unescaped, yo</span>', '<span>already unescaped, yo</span>', 'already unescaped will stay unescaped');
    test('hell&apos;s', "hell's", "works on '");
    test('I know that &quot;feel&quot; bro', 'I know that "feel" bro', 'works on "');
    test('feel the &#x2f;', 'feel the /', 'works on /');
    test('&amp;lt;', '&lt;', 'unescapes a single level of HTML escaping');
    test(run('&gt;', 'escapeHTML'), '&gt;', 'is the inverse of escapeHTML');
    test('&#32;', ' ', 'html code | space');
    test('&#33;', '!', 'html code | !');
    test('&#192;', 'À', 'html code | À');
    test('&#64257;', 'ﬁ', 'html code | upper latin');
    test('&#12354;', 'あ', 'html code | hiragana a');
    test('&#xC0;', 'À', 'hex code | À');
    test('&#x2b;', '+', 'hex code | +');
    test('&#x2B;', '+', 'hex code | uppercase | +');
    test('&#x3042;', 'あ', 'hex code | hiragana a');
    test('&nbsp;', ' ', 'non-breaking space');
  });


  method('encodeBase64', function() {

    test('This webpage is not available', 'VGhpcyB3ZWJwYWdlIGlzIG5vdCBhdmFpbGFibGU=', 'webpage');
    test('I grow, I prosper; Now, gods, stand up for bastards!', 'SSBncm93LCBJIHByb3NwZXI7IE5vdywgZ29kcywgc3RhbmQgdXAgZm9yIGJhc3RhcmRzIQ==', 'gods');
    test('räksmörgås', 'csOka3Ntw7ZyZ8Olcw==', 'shrimp sandwich');
    test('rÃ¤ksmÃ¶rgÃ¥s', 'csODwqRrc23Dg8K2cmfDg8Klcw==', 'shrimp sandwich encoded');

    test('АБВ', '0JDQkdCS', 'Russian');
    test('日本語', '5pel5pys6Kqe', 'Japanese');
    test('にほんご', '44Gr44G744KT44GU', 'Hiragana');
    test('한국어', '7ZWc6rWt7Ja0', 'Korean');

    // Ensure that btoa and atob don't leak in node
    if(environment == 'node') {
      equal(typeof btoa, 'undefined', 'btoa global does not exist in node');
      equal(typeof atob, 'undefined', 'atob global does not exist in node');
    }

  });

  method('decodeBase64', function() {

    test(run('АБВ', 'encodeBase64'), 'АБВ', 'inverse | Russian');
    test(run('日本語', 'encodeBase64'), '日本語', 'inverse | Japanese');
    test(run('にほんご', 'encodeBase64'), 'にほんご', 'inverse | Hiragana');
    test(run('한국어', 'encodeBase64'), '한국어', 'inverse | Korean');

    test('L2hvd2FyZHNmaXJld29ya3MvYXBpL29yZGVyLzc1TU0lMjBNSVg=', '/howardsfireworks/api/order/75MM%20MIX', '%20')

    test('VGhpcyB3ZWJwYWdlIGlzIG5vdCBhdmFpbGFibGU=', 'This webpage is not available', 'webpage');
    test('SSBncm93LCBJIHByb3NwZXI7IE5vdywgZ29kcywgc3RhbmQgdXAgZm9yIGJhc3RhcmRzIQ==', 'I grow, I prosper; Now, gods, stand up for bastards!', 'gods');

    test('@#$^#$^#@$^', '', 'non-base64 characters should produce a blank string');

  });

  method('trimLeft', function() {
    test('   wasabi   ', 'wasabi   ', 'should trim left whitespace only');
    test('', '', 'blank');
    test(' wasabi ', 'wasabi ', 'wasabi with whitespace');
    test(whiteSpace, '', 'should trim all WhiteSpace characters defined in 7.2 and Unicode "space, separator"');
    test(lineTerminators, '', 'should trim all LineTerminator characters defined in 7.3');
  });

  method('trimRight', function() {
    test('   wasabi   ', '   wasabi', 'should trim right whitespace only');
    test('', '', 'blank');
    test(' wasabi ', ' wasabi', 'wasabi with whitespace');
    test(whiteSpace, '', 'should trim all WhiteSpace characters defined in 7.2 and Unicode "space, separator"');
    test(lineTerminators, '', 'should trim all LineTerminator characters defined in 7.3');
  });

  method('shift', function() {

    test('ク', [1], 'グ', 'should shift 1 code up');
    test('グ', [-1], 'ク', 'should shift 1 code down');
    test('ヘ', [2], 'ペ', 'should shift 2 codes');
    test('ペ', [-2], 'ヘ', 'should shift -2 codes');
    test('ク', [0], 'ク', 'should shift 0 codes');
    test('ク', 'ク', 'no params simply returns the string');
    test('カキクケコ', [1], 'ガギグゲゴ', 'multiple characters up one');
    test('ガギグゲゴ', [-1], 'カキクケコ', 'multiple characters down one');

  });

  method('forEach', function() {

    var callbackTest, result;

    // "each" will return an array of everything that was matched, defaulting to individual characters
    test('g', ['g'], 'each should return an array of each char');


    callbackTest = function(str, i) {
      equal(str, 'g', 'char should be passed as the first argument');
    }

    // Each without a first parameter assumes "each character"
    result = run('g', 'forEach', [callbackTest]);
    equal(result, ['g'], "['g'] should be the resulting value");


    var counter = 0, result, callback;
    callback = function(str, i) {
      equal(str, 'ginger'.charAt(counter), 'char should be passed as the first argument');
      equal(i, counter, 'index should be passed as the second argument');
      counter++;
    }
    result = run('ginger', 'forEach', [callback]);
    equal(counter, 6, 'should have ran 6 times');
    equal(result, ['g','i','n','g','e','r'], 'resulting array should contain all the characters');


    var counter = 0, result, callback;

    callback = function(str, i) {
      equal(str, 'g', 'string argument | match should be passed as the first argument to the block');
      counter++;
    }

    result = run('ginger', 'forEach', ['g', callback]);
    equal(counter, 2, 'string argument | should have ran 2 times');
    equal(result, ['g','g'], "string argument | resulting array should be ['g','g']");


    var counter = 0, result, callback, arr;
    arr = ['g','i','g','e'];

    callback = function(str, i) {
      equal(str, arr[i], 'regexp argument | match should be passed as the first argument to the block');
      counter++;
    }

    result = run('ginger', 'forEach', [/[a-i]/g, callback]);
    equal(counter, 4, 'regexp argument | should have ran 4 times');
    equal(result, ['g','i','g','e'], "regexp argument | resulting array should have been ['g','i','g','e']");


    // .each should do the same thing as String#scan in ruby except that .each doesn't respect capturing groups
    var testString = 'cruel world';

    test(testString, [/\w+/g], ['cruel', 'world'], 'complex regexp | /\\w+/g');
    test(testString, [/.../g], ['cru', 'el ', 'wor'], 'complex regexp | /.../g');
    test(testString, [/(..)(..)/g], ['crue', 'l wo'], 'complex regexp | /(..)(..)/g');
    test(testString, [/\w+/], ['cruel', 'world'], 'non-global regexes should still be global');

    test('', ['f'], [], 'empty string | each f');
    test('', [/foo/], [], 'empty string | each /foo/');
    test('', [function() {}], [], 'empty string | passing a block');


    var letters = [], result, fn;
    fn = function(l) {
      letters.push(l);
      return false;
    }
    result = run('foo', 'forEach', [fn])

    equal(result, ['f'], 'returning false should break the loop - result');
    equal(letters, ['f'], 'returning false should break the loop - pushed');

  });

  method('chars', function() {

    test('wasabi', ['w','a','s','a','b','i'], 'splits string into constituent chars');
    test(' wasabi \n', [' ','w','a','s','a','b','i',' ','\n'], 'should not trim whitespace');

    var counter = 0;
    var chars = ['g','i','n','g','e','r'];
    var indexes = [0,1,2,3,4,5];
    var callback = function(chr, i, a) {
      equal(chr, chars[i], 'First argument should be the code.');
      equal(i, indexes[i], 'Second argument should be the index.');
      equal(a, chars, 'Third argument the array of characters.');
      counter++;
    };

    var result = run('ginger', 'chars', [callback]);
    equal(counter, 6, 'should have run 6 times');
    equal(result, ['g','i','n','g','e','r'], 'result should be an array');

    // test each char collects when properly returned
    counter = 0;
    callback = function(str, i) {
      counter++;
      return str.toUpperCase();
    }
    var result = run('ginger', 'chars', [callback]);
    equal(result, ['G','I','N','G','E','R'], 'can be mapped');

    test('', [], 'empty string');
  });

  method('words', function() {

    var counter = 0, result, callback;
    var sentence = 'these pretzels are \n\n making me         thirsty!\n\n';
    var words = ['these', 'pretzels', 'are', 'making', 'me', 'thirsty!'];
    var indexes = [0,1,2,3,4,5];
    var callback = function(word, i, a) {
      equal(word, words[i], 'First argument should be the word.');
      equal(i, indexes[i], 'Second argument should be the index.');
      equal(a, words, 'Third argument the array of words.');
      counter++;
    };

    result = run(sentence, 'words', [callback]);
    equal(counter, 6, 'should have run 6 times');
    equal(result, words, 'result should be an array of matches');

    test('', [], 'empty string');

  });

  method('lines', function() {

    var counter = 0, result, callback;
    var paragraph = 'these\npretzels\nare\n\nmaking\nme\n         thirsty!\n\n\n\n';
    var lines = ['these', 'pretzels', 'are', '', 'making', 'me', '         thirsty!'];
    var indexes = [0,1,2,3,4,5,6];
    var callback = function(line, i, a) {
      equal(line, lines[i], 'First argument should be the line.');
      equal(i, indexes[i], 'Second argument should be the index.');
      equal(a, lines, 'Third argument the array of lines.');
      counter++;
    };

    result = run(paragraph, 'lines', [callback]);
    equal(counter, 7, 'should have run 7 times');
    equal(result, lines, 'result should be an array of matches');

    callback = function(str, i) {
      return run(str, 'capitalize');
    }
    result = run('one\ntwo', 'lines', [callback]);
    equal(['One','Two'], result, 'lines can be modified');

    test('', [''], 'empty string');

  });

  method('codes', function() {

    test('jumpy', [106,117,109,112,121], 'jumpy');

    var counter = 0, result;
    var arr = [103,105,110,103,101,114];
    var indexes = [0,1,2,3,4,5];
    var callback = function(code, i, s) {
      equal(code, arr[i], 'First argument should be the code.');
      equal(i, indexes[i], 'Second argument should be the index.');
      equal(s, 'ginger', 'Third argument should be the string.');
      counter++;
    }

    result = run('ginger', 'codes', [callback]);
    equal(counter, 6, 'should have ran 6 times');
    equal(result, arr, 'result should be an array');

    test('', [], 'empty string');
  });

  method('insert', function() {
    test('schfifty', [' five'], 'schfifty five', 'schfifty five');
    test('dopamine', ['e', 3], 'dopeamine', 'dopeamine');
    test('spelling eror', ['r', -3], 'spelling error', 'inserts from the end');
    test('flack', ['a', 0], 'aflack', 'inserts at 0');
    test('five', ['schfifty', 20], 'fiveschfifty', 'adds out of positive range');
    test('five', ['schfifty', -20], 'schfiftyfive', 'adds out of negative range');
    test('five', ['schfifty', 4], 'fiveschfifty', 'inserts at position 4');
    test('five', ['schfifty', 5], 'fiveschfifty', 'inserts at position 5');
    test('abcd', ['X', 2], 'abXcd', 'X | 2');
    test('abcd', ['X', 1], 'aXbcd', 'X | 1');
    test('abcd', ['X', 0], 'Xabcd', 'X | 0');
    test('abcd', ['X', -1], 'abcXd', 'X | -1');
    test('abcd', ['X', -2], 'abXcd', 'X | -2');

    test('', ['-', 0], '-', '- inserted at 0');
    test('b', ['-', 0], '-b', 'b inserted at 0');
    test('b', ['-', 1], 'b-', 'b inserted at 1');
  });

  method('remove', function() {
    test('schfifty five', ['fi'], 'schfty five', 'should remove first fi only');
    test('schfifty five', ['five'], 'schfifty ', 'should remove five');
    test('schfifty five', [/five/], 'schfifty ', 'basic regex');
    test('schfifty five', [/f/], 'schifty five', 'single char regex');
    test('schfifty five', [/f/g], 'schity ive', 'respects global flag');
    test('schfifty five', [/[a-f]/g], 'shity iv', 'character class');
    test('?', ['?'], '', 'strings have tokens escaped');
    test('?(', ['?('], '', 'strings have all tokens escaped');
    test('schfifty five', ['F'], 'schfifty five', 'should be case sensitive');
    test('schfifty five', [], 'schfifty five', 'no args');
  });

  method('removeAll', function() {
    test('schfifty five', ['fi'], 'schfty ve', 'should remove all fi');
    test('schfifty five', ['five'], 'schfifty ', 'should remove five');
    test('schfifty five', [/five/], 'schfifty ', 'basic regex');
    test('schfifty five', [/f/], 'schity ive', 'single char regex replaces all');
    test('schfifty five', [/f/g], 'schity ive', 'global regex replaces all');
    test('schfifty five', [/[a-f]/g], 'shity iv', 'character class');
    test('?', ['?'], '', 'strings have tokens escaped');
    test('?(', ['?('], '', 'strings have all tokens escaped');
    test('schfifty five', ['F'], 'schfifty five', 'should be case sensitive');
    test('schfifty five', [], 'schfifty five', 'no args');
  });

  method('replaceAll', function() {
    test('-x -y -z', ['-', 1, 2, 3], '1x 2y 3z', 'basic');
    test('-x -y -z', ['-'], 'x y z', 'no args');
    test('-x -y -z', ['-', 1, 2], '1x 2y z', 'not enough args');
    test('-x -y -z', ['-', 1, 2, 3, 4], '1x 2y 3z', 'too many args');
    test('-x -y -z', ['-', 1, 0, 3], '1x 0y 3z', 'arg can be 0');
    test('-x -y -z', ['-', 1, null, 3], '1x y 3z', 'null arg will be blank');
    test('-x -y -z', ['-', 1, undefined, 3], '1x y 3z', 'undefined will be blank');
    test('-x -y -z', ['-', 1, NaN, 3], '1x NaNy 3z', 'NaN is stringifiable');

    test('a', [/a/, 'hi'], 'hi', 'basic regex');
    test('aaa', [/a/g,'b','c','d'], 'bcd', 'global regex');
    test('aaa', [/a/,'b','c','d'], 'bcd', 'non-global regex still matches all');
    test('a1 b2', [/a|b/, 'x', 'y'], 'x1 y2', 'alternator');

    test('a', ['A', 'b'], 'a', 'should be case sensitive');
    test('?', ['?', 'a'], 'a', 'strings have tokens escaped');
    test('?(', ['?(', 'b'], 'b', 'strings have all tokens escaped');

    test('abc', [], 'abc', 'no args');
  });


  method('stripTags', function() {
    var stripped, html, allStripped, malformed;

    html =
    '<div class="outer">' +
    '<p>text with <a href="http://foobar.com/">links</a>, &quot;entities&quot; and <b>bold</b> tags</p>' +
    '</div>';
    allStripped = 'text with links, &quot;entities&quot; and bold tags';
    malformed = '<div class="outer"><p>paragraph';
    stripped =
    '<div class="outer">' +
    '<p>text with links, &quot;entities&quot; and <b>bold</b> tags</p>' +
    '</div>';

    test(html, ['a'], stripped, 'stripped a tags');
    equal(run(html, 'stripTags', ['a']) == html, false, 'stripped <a> tags was changed');


    stripped =
    '<div class="outer">' +
    '<p>text with links, &quot;entities&quot; and bold tags</p>' +
    '</div>';
    test(html, [['a', 'b']], stripped, 'array | stripped <a> and <b> tags');


    stripped =
    '<div class="outer">' +
    'text with links, &quot;entities&quot; and <b>bold</b> tags' +
    '</div>';
    test(html, [['p', 'a']], stripped, 'array | stripped <p> and <a> tags');


    stripped = '<p>text with <a href="http://foobar.com/">links</a>, &quot;entities&quot; and <b>bold</b> tags</p>';
    test(html, ['div'], stripped, 'stripped <div> tags');


    stripped = 'text with links, &quot;entities&quot; and bold tags';
    test(html, stripped, 'all tags stripped');


    stripped = '<p>paragraph';
    test(malformed, ['div'], stripped, 'malformed | div tag stripped');

    stripped = '<div class="outer">paragraph';
    test(malformed, ['p'], stripped, 'malformed | p tags stripped');

    stripped = 'paragraph';
    test(malformed, stripped, 'malformed | all tags stripped');

    test('<b NOT BOLD</b>', '<b NOT BOLD', "does not strip tags that aren't properly closed");
    test('a < b', 'a < b', 'does not strip less than');
    test('a > b', 'a > b', 'does not strip greater than');
    test('</foo  >>', '>', 'strips closing tags with white space');


    // Stipping self-closing tags
    test('<input type="text" class="blech" />', '', 'full input stripped');
    test('<b>bold<b> and <i>italic</i> and <a>link</a>', [['b','i']], 'bold and italic and <a>link</a>', 'handles multi args');

    html =
    '<form action="poo.php" method="post">' +
    '<p>' +
    '<label>label for text:</label>' +
    '<input type="text" value="brabra" />' +
    '<input type="submit" value="submit">' +
    '</p>' +
    '</form>';

    test(html, 'label for text:', 'form | all tags removed');
    test(html, ['input'], '<form action="poo.php" method="post"><p><label>label for text:</label></p></form>', 'form | input tags stripped');
    test(html, [['input', 'p', 'form']], '<label>label for text:</label>', 'form | input, p, and form tags stripped');

    // Stripping namespaced tags
    test('<xsl:template>foobar</xsl:template>', [], 'foobar', 'strips tags with xml namespaces');
    test('<xsl:template>foobar</xsl:template>', ['xsl:template'], 'foobar', 'strips xsl:template');
    test('<xsl/template>foobar</xsl/template>', ['xsl/template'], 'foobar', 'strips xsl/template');

    // No errors on RegExp

    test('<xsl(template>foobar</xsl(template>', ['xsl(template'], 'foobar', 'no regexp errors on tokens');
    test('<?>ella</?>', ['?'], 'ella', '? token');

    test('', '', 'String#stripTags | blank');
    test('chilled <b>monkey</b> brains', 'chilled monkey brains', 'chilled <b>monkey</b> brains');


    // Self-closing

    test('<img src="cool.jpg" data-face="nice face!" />', '', 'can strip image tags');
    test('<img src="cool.jpg" data-face="nice face!"/>', '', 'can strip image tags with no space');
    test('<img src="cool.jpg" data-face="nice face!" / >', '', 'can strip image tags with trailing space');
    test('<img src="cool.jpg" data-face="nice face!">', '', 'can strip void tag');

    test('<IMG src="cool.jpg" data-face="nice face!" />', '', 'caps | can strip image tags');
    test('<IMG src="cool.jpg" data-face="nice face!"/>', '', 'caps | can strip image tags with no space');
    test('<IMG src="cool.jpg" data-face="nice face!" / >', '', 'caps | can strip image tags with trailing space');
    test('<IMG src="cool.jpg" data-face="nice face!">', '', 'caps | can strip void tag');

    test('<img src="cool.jpg">', ['IMG'], '', 'can strip when tag name capitalized');


    // Other
    test('<span>some text</span> then closing</p>', 'some text then closing', 'can handle final malformed closer');
    test('foo </p> bar </p>', 'foo  bar ', 'two unmatched closing tags');


    // Issue #410 - replacing stripped tags

    test('<span>foo</span>', ['all', '|'], '|foo|', 'can strip with just a string');

    var fn = function() { return 'bar'; };
    test('<span>foo</span>', ['all', fn], 'barfoobar', 'replaces content with result of callback');

    var fn = function() { return ''; };
    test('<span>foo</span>', ['all', fn], 'foo', 'replaces content with empty string');

    var fn = function() {};
    test('<span>foo</span>', ['all', fn], 'foo', 'returning undefined removes as normal');

    var fn = function() { return 'wow'; };
    test('<img src="cool.jpg" data-face="nice face!" />', ['all', fn], 'wow', 'can replace self-closing tags');

    var fn = function() { return 'wow'; };
    test('<img src="cool.jpg" data-face="nice face!"> noway', ['all', fn], 'wow noway', 'can replace void tag');

    var fn = function() { return 'wow'; };
    test('<IMG SRC="cool.jpg" DATA-FACE="nice face!"> noway', ['all', fn], 'wow noway', 'can replace void tag with caps');

    var fn = function(a,b,c) { return c; };
    test('<span></span>', ['all', fn], '', 'attributes should be blank');

    var fn = function(a,b,c) { return c; };
    test('<span class="orange">foo</span>', ['all', fn], 'class="orange"fooclass="orange"', 'attributes should not be blank');


    var str = 'which <b>way</b> to go';
    var fn = function(tag, content, attributes, s) {
      equal(tag, 'b', 'first argument should be the tag name');
      equal(content, 'way', 'second argument should be the tag content');
      equal(attributes, '', 'third argument should be the attributes');
      equal(s, str, 'fourth argument should be the string');
      return '|';
    }
    test(str, ['all', fn], 'which |way| to go', 'stripped tag should be replaced');

    var str = '<span>very<span>nested<span>spans<span>are<span>we</span></span></span></span></span>';
    var expectedContent = [
      'very<span>nested<span>spans<span>are<span>we</span></span></span></span>',
      'nested<span>spans<span>are<span>we</span></span></span>',
      'spans<span>are<span>we</span></span>',
      'are<span>we</span>',
      'we'
    ];
    var count = 0;
    var fn = function(tag, content, attributes, s) {
      equal(tag, 'span', 'first argument should be the tag');
      equal(content, expectedContent[count++], 'second argument should be the content');
      equal(attributes, '', 'third argument should be the attributes');
      equal(s, str, 'fourth argument should be the string');
      return '|';
    }
    test(str, ['all', fn], '|very|nested|spans|are|we|||||', 'stripped tag should be replaced');
    equal(count, 5, 'should have run 5 times');

    var str = '<span>very</span>';
    var fn = function(tag, content, attributes, s) {
      return content;
    }
    test(str, ['all', fn], 'veryveryvery', 'replacing with content will not endlessly recurse');

    var str = '<span>very<span>';
    var fn = function(tag, content, attributes, s) {
      return content;
    }
    test(str, ['all', fn], 'very<span>veryvery<span>', 'malformed content will not infinitely recurse with replacements');

    var str = '<p>paragraph with <b>some bold text</b> and an image <img src="http://foobar.com/a/b/c/d.gif" alt="cool gif, bro" /> and thats all</p>';
    var expected = [
      {
        tag: 'p',
        content: 'paragraph with <b>some bold text</b> and an image <img src="http://foobar.com/a/b/c/d.gif" alt="cool gif, bro" /> and thats all',
        attributes: ''
      },
      {
        tag: 'b',
        content: 'some bold text',
        attributes: ''
      },
      {
        tag: 'img',
        content: '',
        attributes: 'src="http://foobar.com/a/b/c/d.gif" alt="cool gif, bro"'
      }
    ];
    var count = 0;
    var fn = function(tag, content, attributes, s) {
      var obj = expected[count++];
      equal(tag, obj.tag, 'first argument should be the tag name');
      equal(content, obj.content, 'second argument should be the tag content');
      equal(attributes, obj.attributes, 'third argument should be the attributes');
      equal(s, str, 'fourth argument should be the string');
    }
    test(str, ['all', fn], 'paragraph with some bold text and an image  and thats all', 'complex: all tags should be stripped');
    equal(count, 3, 'complex: should have run 3 times');

    var str = '<p>paragraph with <b>some bold text</b> and an image <img src="http://foobar.com/a/b/c/d.gif" alt="cool gif, bro"> and thats all</p>';
    var fn = function(tag, content, attributes, s) {
      equal(tag, 'img', 'first argument is img');
      equal(content, '', 'second argument is empty');
      equal(attributes, 'src="http://foobar.com/a/b/c/d.gif" alt="cool gif, bro"', 'third argument should be the attributes');
      equal(s, str, 'fourth argument should be the string');
      return 'not!';
    }
    test(str, ['img', fn], '<p>paragraph with <b>some bold text</b> and an image not! and thats all</p>', 'img tag should have been replaced');

    var str = 'one <div                  class          =       "             bar              "  ></div          > two';
    test(str, ['div'], 'one  two', 'very spaced out div tag');


    // Issue #467
    test('<img src="cool.jpg">', ['i'], '<img src="cool.jpg">', 'will not replace <img> for <i>');

  });


  method('removeTags', function() {
    var html, malformed, removed;
    malformed = '<div class="outer"><p>paragraph';

    html =
    '<div class="outer">' +
    '<p>text with <a href="http://foobar.com/">links</a>, &quot;entities&quot; and <b>bold</b> tags</p>' +
    '</div>';

    removed =
    '<div class="outer">' +
    '<p>text with , &quot;entities&quot; and <b>bold</b> tags</p>' +
    '</div>';
    test(html, ['a'], removed, '<a> tag removed');
    equal(run(html, 'removeTags', ['a']) == html, false, 'html was changed');

    removed =
    '<div class="outer">' +
    '<p>text with , &quot;entities&quot; and  tags</p>' +
    '</div>';
    test(html, [['a', 'b']], removed, 'array | <a> and <b> tags removed');


    removed =
    '<div class="outer"></div>';
    test(html, [['p', 'a']], removed, 'array | <p> and <a> tags removed');


    test(html, ['div'], '', '<div> tags removed');
    test(html, '', 'removing all tags');

    test(malformed, ['div'], '', 'malformed | <div> tags removed');
    test(malformed, ['p'], '<div class="outer">', 'malformed | <p> tags removed');
    test(malformed, '', 'malformed | all tags removed');

    test('<b NOT BOLD</b>', '<b NOT BOLD', 'should strip unmatched closing tags');
    test('a < b', 'a < b', 'less than unaffected');
    test('a > b', 'a > b', 'greater than unaffected');
    test('</foo  >>', '>', 'malformed closing tag removed');

    // Stipping self-closing tags
    test('<input type="text" class="blech" />', '', 'self-closing');

    html =
    '<form action="poo.php" method="post">' +
    '<p>' +
    '<label>label for text:</label>' +
    '<input type="text" value="brabra" />' +
    '<input type="submit" value="submit" />' +
    '</p>' +
    '</form>';

    test(html, '', 'form | removing all tags');
    test(html, ['input'], '<form action="poo.php" method="post"><p><label>label for text:</label></p></form>', 'form | removing input tags');
    test(html, [['input', 'p', 'form']], '', 'form | removing input, p, and form tags');

    // Stripping namespaced tags
    test('<xsl:template>foobar</xsl:template>', '', 'form | xml namespaced tags removed');
    test('<xsl:template>foobar</xsl:template>', ['xsl:template'], '', 'form | xsl:template removed');
    test('<xsl/template>foobar</xsl/template>', ['xsl/template'], '', 'form | xsl/template removed');
    test('<xsl(template>foobar</xsl(template>', ['xsl(template'], '', 'form | xsl(template removed');

    test('<b>bold</b> and <i>italic</i> and <a>link</a>', [['b','i']], ' and  and <a>link</a>', 'handles multi args');
    test('', '', 'blank');
    test('chilled <b>monkey</b> brains', 'chilled  brains', 'chilled <b>monkey</b> brains');

    // No errors on regex.
    test('howdy<?>ella</?>', 'howdy', 'handles regex tokens');

    // Self-closing

    test('<img src="cool.jpg" data-face="nice face!" />', '', 'can strip image tags');
    test('<img src="cool.jpg" data-face="nice face!"/>', '', 'can strip image tags with no space');
    test('<img src="cool.jpg" data-face="nice face!" / >', '', 'can strip image tags with trailing space');
    test('<img src="cool.jpg" data-face="nice face!">', '', 'can strip void tag');

    test('<IMG src="cool.jpg" data-face="nice face!" />', '', 'caps | can strip image tags');
    test('<IMG src="cool.jpg" data-face="nice face!"/>', '', 'caps | can strip image tags with no space');
    test('<IMG src="cool.jpg" data-face="nice face!" / >', '', 'caps | can strip image tags with trailing space');
    test('<IMG src="cool.jpg" data-face="nice face!">', '', 'caps | can strip void tag');

    test('<img src="cool.jpg">', ['IMG'], '', 'can strip when tag name capitalized');


    // Other
    test('<span>some text</span> then closing</p>', ' then closing', 'can handle final malformed closer');
    test('foo </p> bar </p>', 'foo  bar ', 'two unmatched closing tags');


    // Issue #410 - replacing stripped tags

    test('<span>foo</span>', ['all', 'bar'], 'bar', 'can replace with just a string');

    var fn = function() { return 'bar'; };
    test('<span>foo</span>', ['all', fn], 'bar', 'replaces content with result of callback');

    var fn = function() { return ''; };
    test('<span>foo</span>', ['all', fn], '', 'replaces content with empty string');

    var fn = function() {};
    test('<span>foo</span>', ['all', fn], '', 'returning undefined strips as normal');

    var fn = function() { return 'wow'; };
    test('<img src="cool.jpg" data-face="nice face!" />', ['all', fn], 'wow', 'can replace self-closing tags');

    var fn = function() { return 'wow'; };
    test('<img src="cool.jpg" data-face="nice face!"> noway', ['all', fn], 'wow noway', 'can replace void tag');

    var fn = function() { return 'wow'; };
    test('<IMG SRC="cool.jpg" DATA-FACE="nice face!"> noway', ['all', fn], 'wow noway', 'can replace void tag with caps');

    var fn = function(a,b,c) { return c; };
    test('<span></span>', ['all', fn], '', 'attributes should be blank');

    var str = 'which <b>way</b> to go';
    var fn = function(tag, content, attributes, s) {
      equal(tag, 'b', 'first argument should be the tag name');
      equal(content, 'way', 'second argument should be the tag content');
      equal(attributes, '', 'third argument should be the attributes');
      equal(s, str, 'fourth argument should be the string');
    }
    test(str, ['all', fn], 'which  to go', 'stripped tag should be replaced');

    var str = '<div>fun and</div><p>run</p><p>together</p>';
    var fn = function(tag, content, s) {
      if(tag === 'p') {
        return ' ' + content;
      }
    }
    test(str, ['p', fn], '<div>fun and</div> run together', 'can space out run-together tags');

    var str = '<span>very<span>nested<span>spans<span>are<span>we</span></span></span></span></span>';
    var expectedContent = [
      'very<span>nested<span>spans<span>are<span>we</span></span></span></span>',
      'nested<span>spans<span>are<span>we</span></span></span>',
      'spans<span>are<span>we</span></span>',
      'are<span>we</span>',
      'we'
    ];
    var count = 0;
    var fn = function(tag, content, attributes, s) {
      equal(tag, 'span', 'first argument should be the tag');
      equal(content, expectedContent[count++], 'second argument should be the content');
      equal(attributes, '', 'third argument should be the attributes');
      equal(s, str, 'fourth argument should be the string');
      return content;
    }
    test(str, ['all', fn], 'verynestedspansarewe', 'stripped tag should be replaced');
    equal(count, 5, 'should have run 5 times');

    var str = 'this is a <p>paragraph with <b>some bold text</b> and an image <img src="http://foobar.com/a/b/c/d.gif" alt="cool gif, bro" /> and thats all</p>';
    var expected = [
      {
        tag: 'p',
        content: 'paragraph with <b>some bold text</b> and an image <img src="http://foobar.com/a/b/c/d.gif" alt="cool gif, bro" /> and thats all',
        attributes: ''
      },
      {
        tag: 'b',
        content: 'some bold text',
        attributes: ''
      },
      {
        tag: 'img',
        content: '',
        attributes: 'src="http://foobar.com/a/b/c/d.gif" alt="cool gif, bro"'
      }
    ];
    var count = 0;
    var fn = function(tag, content, attributes, s) {
      var obj = expected[count++];
      equal(tag, obj.tag, 'first argument should be the tag name');
      equal(content, obj.content, 'second argument should be the tag content');
      equal(attributes, obj.attributes, 'third argument should be the attributes');
      equal(s, str, 'fourth argument should be the string');
    }
    test(str, ['all', fn], 'this is a ', 'complex: outermost tag should be removed');
    equal(count, 1, 'complex: should have run 1 time');

    var str = '<p>paragraph with <b>some bold text</b> and an image <img src="http://foobar.com/a/b/c/d.gif" alt="cool gif, bro"> and thats all</p>';
    var fn = function(tag, content, attributes, s) {
      equal(tag, 'img', 'first argument is img');
      equal(content, '', 'second argument is empty');
      equal(attributes, 'src="http://foobar.com/a/b/c/d.gif" alt="cool gif, bro"', 'third argument should be the attributes');
      equal(s, str, 'fourth argument should be the string');
      return 'not!';
    }
    test(str, ['img', fn], '<p>paragraph with <b>some bold text</b> and an image not! and thats all</p>', 'img tag should have been replaced');


    // Issue #467
    test('<img src="cool.jpg">', ['i'], '<img src="cool.jpg">', 'will not replace <img> for <i>');

  });


});
