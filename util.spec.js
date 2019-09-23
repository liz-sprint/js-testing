const { generateText, checkAndGenerate } = require('./util.js');

test ('should output name and age', () => {
    // to test false positives 
    const text = generateText('Liz',29);
    expect(text).toBe('Liz (29 years old)');    
    const text2 = generateText('Diana',25);
    expect(text2).toBe('Diana (25 years old)');
});

test ('should output data-less', () => {
    const text = generateText('',null);
    expect(text).toBe(' (null years old)');
});

test ('should validate and output name & age', () => {
    const text = checkAndGenerate('Liz',29);
    expect(text).toBe('Liz (29 years old)');
})