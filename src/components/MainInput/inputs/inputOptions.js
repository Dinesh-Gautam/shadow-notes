import { v4 as uuidv4 } from "uuid";

export const inputOptions = [
  {
    value: "Title",
    name: "title_input_value",
    inputValue: "",
    attr: { required: true, type: "text" },
    tag: "input",
    isRequired: true,
  },
  {
    value: "Description",
    name: "description_input_value",
    inputValue: "",
    attr: { type: "text" },
    tag: "input",
  },
  {
    value: "Paragraph",
    name: "Pragraph_input_value",
    inputValue: "",
    attr: { type: "text" },
    tag: "textarea",
  },
  {
    value: "Link",
    name: "link_input_value",
    inputValue: "",
    attr: { type: "url" },
    tag: "input",
  },
  {
    value: "Image",
    name: "image_input_value",
    inputValue: "",
    attr: { type: "url" },
    tag: "input",
  },
  {
    value: "List",
    name: "list_input_value",
    attr: { className: "list_input_box" },
    tag: "div",
    inner: [
      {
        id: uuidv4(),
        attr: { type: "text" },
        inputValue: "",
        tag: "input",
      },
    ],
  },
  {
    value: "Color",
    name: "color_input_value",
    isOption: true,
    inputValue: "#000000",
    attr: { className: "color_input", type: "color" },
    tag: "input",
  },
  // {
  //   value: "Remider",
  //   name: "dateTime_input_value",
  //   inputValue: "",
  //   attr: { type: "datetime-local" },
  //   tag: "input",
  // },
];
