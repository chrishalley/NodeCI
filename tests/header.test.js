const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');
const Page =  require('./helpers/page');

let page

beforeEach(async () => {
  
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('The header has the correct text', async () => {
  // const text = await page.$eval('a.brand-logo', el => el.innerHTML)
  const text = await page.getContentsOf('a.brand-logo')
  expect(text).toEqual('Blogster');
})

test('clicking on login starts oauth flow', async () => {
  await page.click('.right a');
  expect(page.url()).toMatch("accounts.google");
})

test('when signed in, shows logout button', async () => {
  await page.login()

  const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML)
  
  expect(text).toMatch('Logout')
})