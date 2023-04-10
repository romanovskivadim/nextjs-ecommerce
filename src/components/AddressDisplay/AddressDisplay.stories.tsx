import React from "react";
import { Story, Meta } from "@storybook/react";
import AddressDisplay from "./AddressDisplay";

export default {
  title: "Components/AddressDisplay",
  component: AddressDisplay,
} as Meta;

const Template: Story = () => <AddressDisplay />;

export const Default = Template.bind({});
