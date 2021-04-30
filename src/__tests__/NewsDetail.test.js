import { mount } from '@vue/test-utils';
import NewsDetail from '../components/NewsDetail.vue';
import AxiosService from '../AxiosService';

const newsMockData = {
    "data": {
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
    "status": 200
}

describe('NewsDetail', () => {

    let newsResponse = new Promise(resolve => resolve(newsMockData))

    jest.spyOn(AxiosService, "getNewsDetail").mockImplementation(() => {
        return newsResponse;
    });

    const wrapper = mount(NewsDetail, {
        global: {
            mocks: {
                $route: {
                    params: {
                        id: 1
                    }
                }
            }
        }
    });

    it('Title is visible', () => {
        const title = wrapper.find('[data-testid="news-detail-title"]');
        expect(title.isVisible()).toBe(true);
    });

    it('Title has the correct text', () => {
        const title = wrapper.find('[data-testid="news-detail-title"]');
        expect(title.text()).toEqual(newsMockData.data.title);
    });

    it('pubDate and creator are visible', () => {
        const pubDateCreator = wrapper.find('[data-testid="news-detail-pub-date-creator"]');
        expect(pubDateCreator.isVisible()).toBe(true);
    });

    it('pubDate and creator have the correct text', () => {
        const pubDateCreator = wrapper.find('[data-testid="news-detail-pub-date-creator"]');
        expect(pubDateCreator.text()).toEqual("Fecha de publicación: " + newsMockData.data.pubDate + " | Creado por: " + newsMockData.data.creator);
    });

    it('Source is visible', () => {
        const source = wrapper.find('[data-testid="news-detail-source"]');
        expect(source.isVisible()).toBe(true);
    });

    it('Source has the correct text', () => {
        const source = wrapper.find('[data-testid="news-detail-source"]');
        expect(source.text()).toEqual(newsMockData.data.source);
    });

    it('Source has the correct link', () => {
        const source = wrapper.find('[data-testid="news-detail-source"]');
        expect(source.attributes('href')).toEqual(newsMockData.data.link);
    });

    it('Image is visible', () => {
        const image = wrapper.find('[data-testid="news-detail-image"]');
        expect(image.isVisible()).toBe(true);
    });

    it('Image has the correct link', () => {
        const image = wrapper.find('[data-testid="news-detail-image"]');
        expect(image.attributes('src')).toEqual(newsMockData.data.urlImage);
    });

    it('Description is visible', () => {
        const description = wrapper.find('[data-testid="news-detail-description"]');
        expect(description.isVisible()).toBe(true);
    });

    it('Description has the correct text', () => {
        const description = wrapper.find('[data-testid="news-detail-description"]');
        expect(description.text()).toEqual(newsMockData.data.description);
    });

    it('Rating is visible', () => {
        const rating = wrapper.find('[data-testid="news-detail-rating"]');
        expect(rating.isVisible()).toBe(true);
    });

})