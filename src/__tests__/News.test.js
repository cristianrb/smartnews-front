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

    it('Title is visible', () => {
        const title = wrapper.find('[data-testid="news-title"]');
        expect(title.isVisible()).toBe(true);
    });

    it('Title has the correct text', () => {
        const title = wrapper.findAll('[data-testid="news-title"]');
        contributionsMockData.map( (item, index) => {
            expect(title[index].text()).toEqual(item.title);
        });
    });


    /*it('Image has the correct link', () => {
        const image = wrapper.find('[data-testid="news-detail-image"]');
        expect(image.attributes('src')).toEqual(newsMockData.data.urlImage);
    });*/

})