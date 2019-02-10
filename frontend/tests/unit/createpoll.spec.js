import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import Create from '@/views/Create.vue';

describe('create.vue', () => {
  it('Adds additional option', () => {
    const wrapper = shallowMount(Create);

    wrapper.find('#plus').trigger('click');

    const newOption = wrapper.find('#nextOptions input').exists();

    expect(newOption).equal(true);
  });

  it('Prevents submitting empty data', () => {
    const wrapper = shallowMount(Create);

    wrapper.find('form').trigger('submit.prevent');

    const pollDisplay = wrapper.find('.form').exists();

    expect(pollDisplay).equal(false);
  });
});
