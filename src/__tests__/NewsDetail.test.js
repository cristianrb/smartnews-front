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
        "vote": null
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

})