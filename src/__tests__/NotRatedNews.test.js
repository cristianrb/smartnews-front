import { mount } from '@vue/test-utils';
import NotRatedNews from '../components/NotRatedNews.vue';

describe('NotRatedNews', () => {

    const wrapper = mount(NotRatedNews);

    it('Title is visible', () => {
        const title = wrapper.find('[data-testid="not-rated-news-title"]');
        expect(title.isVisible()).toBe(true);
    });

    it('Title has the correct text', () => {
        const title = wrapper.find('[data-testid="not-rated-news-title"]');
        expect(title.text()).toMatch("Sad news :(");
    });

    it('Subtitle is visible', () => {
        const subtitle = wrapper.find('[data-testid="not-rated-news-subtitle"]');
        expect(subtitle.isVisible()).toBe(true);
    });

    it('Subtitle has the correct text', () => {
        const subtitle = wrapper.find('[data-testid="not-rated-news-subtitle"]');
        expect(subtitle.text()).toMatch("Parece que no has valorado suficientes noticias. Prueba a dar una valoración a algunas! :)");
    });

})