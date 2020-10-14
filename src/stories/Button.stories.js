import Button from '../components/Button/Button.vue';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    nature: { control: { type: 'select', options: ['default', 'primary', 'secondary', 'link'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button @onClick="onClick" v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
  label: 'Button'
};

export const Primary = Template.bind({});
Primary.args = {
  nature: "primary",
  label: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  nature: "secondary",
  label: 'Secondary Button',
};

export const Link = Template.bind({});
Link.args = {
  nature: "link",
  label: 'Button Link',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
