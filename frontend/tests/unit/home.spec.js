import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  // test test, not important

  it('testing home', () => {
    const wrapper = shallowMount(Home);
    const message = wrapper.find('h1').text();

    expect(message).to.include('Welcome!');
  });
});
