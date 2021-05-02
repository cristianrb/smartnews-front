import { mount } from '@vue/test-utils';
import HeaderComponent from '../components/HeaderComponent.vue';

describe('HeaderComponent authorized', () => {

    const wrapper = mount(HeaderComponent, {
        global: {
            mocks: {
                $route: {
                    params: {
                        id: 1
                    }
                },
                Vue3GoogleOauth: {
                    isAuthorized: true
                }
            }
        }
    });

    it('New button is visible', () => {
        const newButton = wrapper.find('[data-testid="newButton"]');
        expect(newButton.isVisible()).toBe(true);
    });

    it('Recommendation button is visible', () => {
        const recommendationButton = wrapper.find('[data-testid="recommendationButton"]');
        expect(recommendationButton.isVisible()).toBe(true);
    });

    it('Rated button is visible', () => {
        const ratedButton = wrapper.find('[data-testid="ratedButton"]');
        expect(ratedButton.isVisible()).toBe(true);
    });

    it('Login button is visible', () => {
        const loginButton = wrapper.find('[data-testid="header-component-login-button"]');
        expect(loginButton.exists()).toBe(false);
    });

    it('Logout button is not rendered', () => {
        const logoutButton = wrapper.find('[data-testid="header-component-logout-button"]');
        expect(logoutButton.isVisible()).toBe(true);
    });


});

describe('HeaderComponent not authorized', () => {

    const wrapper = mount(HeaderComponent, {
        global: {
            mocks: {
                $route: {
                    params: {
                        id: 1
                    }
                },
                Vue3GoogleOauth: {
                    isAuthorized: false
                }
            }
        }
    });

    it('New button is visible', () => {
        const newButton = wrapper.find('[data-testid="newButton"]');
        expect(newButton.isVisible()).toBe(true);
    });

    it('Recommendation button is not rendered', () => {
        const recommendationButton = wrapper.find('[data-testid="recommendationButton"]');
        expect(recommendationButton.exists()).toBe(false);
    });

    it('Rated button is not rendered', () => {
        const ratedButton = wrapper.find('[data-testid="ratedButton"]');
        expect(ratedButton.exists()).toBe(false);
    });

    it('Login button is not rendered', () => {
        const loginButton = wrapper.find('[data-testid="header-component-login-button"]');
        expect(loginButton.isVisible()).toBe(true);
    });

    it('Logout button is visible', () => {
        const logoutButton = wrapper.find('[data-testid="header-component-logout-button"]');
        expect(logoutButton.exists()).toBe(false);
        
    });

})