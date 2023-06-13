import { v4 as uuidv4 } from "uuid";

export const input = {
  heading: "heading_input_value",
  title: "title_input_value",
  description: "description_input_value",
  paragraph: "paragraph_input_value",
  link: "link_input_value",
  image: "image_input_value",
  list: "list_input_value",
  color: "color_input_value",
};

export const headingState = {
  value: "Heading",
  name: "heading_input_value",
  isRequired: true,
};

export const listTypes = {
  default: "default",
  checked: "checked",
};

export const inputOptions = [
  {
    value: "Title",
    name: "title_input_value",
    isRequired: true,
  },
  {
    value: "Description",
    name: "description_input_value",
  },
  {
    value: "Paragraph",
    name: "Paragraph_input_value",
  },
  {
    value: "Link",
    name: "link_input_value",
  },
  {
    value: "Image",
    name: "image_input_value",
  },
  {
    value: "List",
    name: "list_input_value",
  },
  {
    value: "Color",
    name: "color_input_value",
    isOption: true,
    defaultValue: "#000000",
  },
  // {
  //   value: "Remider",
  //   name: "dateTime_input_value",
  //   inputValue: "",
  //   attr: { type: "datetime-local" },
  //   tag: "input",
  // },
];
