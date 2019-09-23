const { generateText, checkAndGenerate } = require('./util.js');
const puppeteer = require('puppeteer');

test('should output name and age', () => {
    // to test false positives 
    const text = generateText('Liz',29);
    expect(text).toBe('Liz (29 years old)');    
    const text2 = generateText('Diana',25);
    expect(text2).toBe('Diana (25 years old)');
});

test('should output data-less', () => {
    const text = generateText('',null);
    expect(text).toBe(' (null years old)');
});

test('should validate and output name & age', () => {
    const text = checkAndGenerate('Liz',29);
    expect(text).toBe('Liz (29 years old)');
});

test('should create object with text and correct class on e2e', async () => {
    const browser =  await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args:['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto('file:///Users/lizzepeda/demos/js-testing/index.html');

    await page.click('input#name');
    await page.type('input#name','Liz');
    await page.click('input#age');
    await page.type('input#age','20');
    await page.click('button#btnAddUser');

    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Liz (20 years old)')
}, 10000);
