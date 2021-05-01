import { mount } from '@vue/test-utils';
import News from '../components/News.vue';

const contributionsMockData = 
    [
        {
            "creator": "fakeCreator",
            "description": "fakeDescription",
            "id": 1234,
            "link": "fakeLink",
            "pubDate": "fakePubDate",
            "source": "fakeSource",
            "sourceUrl": "fakeSourceUrl",
            "title": "fakeTitle",
            "urlImage": "fakeUrlImage",
            "vote": 5
        },
        {
            "creator": "fakeCreator2",
            "description": "fakeDescription2",
            "id": 1235,
            "link": "fakeLink2",
            "pubDate": "fakePubDate2",
            "source": "fakeSource2",
            "sourceUrl": "fakeSourceUrl2",
            "title": "fakeTitle2",
            "urlImage": "fakeUrlImage2",
            "vote": 5
        }
    ]

describe('News', () => {

    const wrapper = mount(News, {
        propsData: {
            contributions: contributionsMockData
        },
        global: {
            mocks: {
                $route: {
                    path: "latest"
                }
            }
        }
    });

    it('Titles are visible', () => {
        const title = wrapper.findAll('[data-testid="news-title"]');
        title.map( (item) => {
            expect(item.isVisible()).toBe(true);    
        });
        
    });

    it('Titles have the correct text', () => {
        const title = wrapper.findAll('[data-testid="news-title"]');
        contributionsMockData.map( (item, index) => {
            expect(title[index].text()).toEqual(item.title);
        });
    });

    it('Descriptions are visible', () => {
        const description = wrapper.findAll('[data-testid="news-description"]');
        description.map( (item) => {
            expect(item.isVisible()).toBe(true);    
        });
        
    });

    it('Descriptions have the correct text', () => {
        const description = wrapper.findAll('[data-testid="news-description"]');
        contributionsMockData.map( (item, index) => {
            expect(description[index].text()).toEqual(item.description);
        });
    });

    it('Read more buttons are visible', () => {
        const button = wrapper.findAll('[data-testid="news-read-more"]');
        button.map( (item) => {
            expect(item.isVisible()).toBe(true);    
        });
        
    });

    it('Read more buttons have the correct text', () => {
        const button = wrapper.findAll('[data-testid="news-read-more"]');
        contributionsMockData.map( (item, index) => {
            expect(button[index].text()).toEqual("Leer más");
        });
    });

    it('Dates are visible', () => {
        const dateText = wrapper.findAll('[data-testid="news-pubdate"]');
        dateText.map( (item) => {
            expect(item.isVisible()).toBe(true);    
        });
        
    });

    it('Dates with sources have the correct text', () => {
        const dateText = wrapper.findAll('[data-testid="news-pubdate"]');
        contributionsMockData.map( (item, index) => {
            expect(dateText[index].text()).toEqual("Fecha de publicación: " + item.pubDate + " | Fuente: " + item.source);
        });
    });

    it('Sources are visible', () => {
        const sources = wrapper.findAll('[data-testid="news-source"]');
        sources.map( (item) => {
            expect(item.isVisible()).toBe(true);    
        });
        
    });

    it('Sources have the correct link', () => {
        const sources = wrapper.findAll('[data-testid="news-source"]');
        contributionsMockData.map( (item, index) => {
            expect(sources[index].attributes('href')).toEqual(item.link);
        });
    });

    it('Images are visible', () => {
        const images = wrapper.findAll('[data-testid="news-image"]');
        images.map( (item) => {
            expect(item.isVisible()).toBe(true);    
        });
        
    });

    it('Sources have the correct link', () => {
        const images = wrapper.findAll('[data-testid="news-image"]');
        contributionsMockData.map( (item, index) => {
            expect(images[index].attributes('src')).toEqual(item.urlImage);
        });
    });

})