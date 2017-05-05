import { FestivalersPage } from './app.po';

describe('festivalers App', () => {
  let page: FestivalersPage;

  beforeEach(() => {
    page = new FestivalersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
