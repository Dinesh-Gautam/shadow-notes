// import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  deleteDoc,
  where,
  query,
  orderBy,
  getDocs,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";
import { uuidv4 } from "@firebase/util";
import { listTypes } from "../components/MainInput/inputs/inputOptions";

const data_context = React.createContext();

const users = collection(db, "users");

export function useData() {
  return useContext(data_context);
}

let undoInterval = null;

export function DatabaseContext({ children }) {
  const { currentUser } = useAuth();
  const [data, setData] = useState();
  const [userData, setUserData] = useState(null);
  const [trashData, setTrashData] = useState(null);
  const [filterData, setFilterData] = useState({});
  const [undoTrigger, setUndoTrigger] = useState({ trigger: false, id: [] });

  const [loading, setLoading] = useState(true);

  const userID = currentUser?.uid || null;

  const userDoc = doc(users, userID);
  const userDocCollection = collection(userDoc, "userData");

  useEffect(() => {
    clearInterval(undoInterval);
    if (undoTrigger.trigger) {
      undoInterval = setTimeout(() => {
        undoTrigger.id.forEach((eachId) => {
          deleteData_fireStore(eachId);
        });
        setUndoTrigger({ trigger: false, id: [] });
      }, 10000);
    } else {
      undoInterval && clearInterval(undoInterval);
    }
    // eslint-disable-next-line
  }, [undoTrigger]);

  useEffect(() => {
    const jsonData = [
      {
        data: [
          {
            inputValue: "About This project (Important)",
            name: "heading_input_value",
            additionalValue: { labelValue: null },
            id: "b444b00a-08bb-4a20-8651-9ce469797456",
            value: "Heading",
          },
          {
            name: "title_input_value",
            inputValue:
              "The following includes the feature list that should be implemented in this project",
            additionalValue: { labelValue: null },
            id: "4d663b40-fa2f-4ba5-b336-c943feff02f6",
            value: "Title",
          },
          {
            inputValue:
              "Re- design of the whole app, animations redevelopment (important)",
            name: "description_input_value",
            additionalValue: { labelValue: null },
            id: "bfc879f5-1400-41b9-9717-b721bdd26e8a",
            value: "Description",
          },
          {
            inputValue:
              "wrap inputs inside form tag, Tags system, important note system, add more inputs and fully custom inputs, Theme system, layout system , tick mark system in lists ,re arranging lists system, loading animation when the notes load, image link system, link name input and href input, emoji system in tags and list in output, … pending more additions will be added ____________________________________________________________ Below is the list of what should be changed in the output temple, share notes , select notes(delete them, share them, etc.), Group notes(give name, add tags), create temporary note(set disappear, permanent delete after deadline, only heading compulsory), reminder note. A secured/secret note feature with a password to unlock notes/note.",
            name: "Pragraph_input_value",
            additionalValue: { labelValue: null },
            id: "899e4197-e2b3-40c1-9683-1e0d69e084a7",
            value: "Paragraph",
          },
          {
            name: "list_input_value",
            additionalValue: { labelValue: null },
            id: "5edfe7e5-d3e4-4078-83df-0a4d3a948ec8",
            value: "List",
            inner: [
              "Add animations ",
              "... more will bed added",
              "add coppy a note feature",
              "more option button in inputs (e.g time option with label for setting 'last Date: 14/9/21')",
              "Generate more random color (favorite colors)",
              { value: "Duplicate Notes", done: false },
            ],
          },
          {
            name: "color_input_value",
            inputValue: "#ff5454",
            additionalValue: { labelValue: null },
            id: "f5983cc6-2607-41af-bcb8-bed43f231a8e",
            value: "Color",
          },
        ],
        deletedOn: "",
        delete: false,
        publishDate: { seconds: 1601800734, nanoseconds: 145000000 },
      },
      {
        data: [
          {
            name: "heading_input_value",
            inputValue: "Fivver Users that I can work with",
            additionalValue: { labelValue: null },
            id: "8ca86fcf-2b9b-4afc-a91d-60efa97cdf21",
            value: "Heading",
          },
          {
            name: "link_input_value",
            inputValue: "https://www.fiverr.com/prashantmardiya",
            additionalValue: { labelValue: null },
            id: "22dfd838-ff4b-4adf-81a2-1f820c311a29",
            value: "Link",
          },
          {
            name: "link_input_value",
            inputValue: "https://www.fiverr.com/ananthakrish626",
            additionalValue: { labelValue: null },
            id: "42719c2d-e269-4bf1-ad80-ce8c9674f293",
            value: "Link",
          },
        ],
        publishDate: { seconds: 1687695390, nanoseconds: 546000000 },
        options: false,
        delete: false,
      },
      {
        options: false,
        delete: false,
        publishDate: { seconds: 1686038865, nanoseconds: 226000000 },
        data: [
          {
            name: "heading_input_value",
            inputValue: "PULEET",
            additionalValue: { labelValue: null },
            id: "761a0407-08fb-476a-b8e0-e85cabd9793e",
            value: "Heading",
          },
          {
            name: "Pragraph_input_value",
            inputValue:
              "Application No:\t2317000449\nLogin ID:\t2317000449\nPassword:\tB#75UQzS\n",
            additionalValue: { labelValue: null },
            id: "3bc6c780-2198-4f1f-acc6-0dd69945e270",
            value: "Paragraph",
          },
        ],
      },
      {
        delete: false,
        publishDate: { seconds: 1604315287, nanoseconds: 469000000 },
        deletedOn: "",
        data: [
          {
            name: "heading_input_value",
            inputValue: "Tasks",
            additionalValue: { labelValue: null },
            id: "966465c6-9c8b-4c02-8b9f-bd032983bcc4",
            value: "Heading",
          },
          {
            name: "title_input_value",
            inputValue: "Upcoming projects",
            additionalValue: { labelValue: null },
            id: "505567ff-dbb5-4312-a3d1-b04cfdf9a231",
            value: "Title",
          },
          {
            name: "description_input_value",
            inputValue: "#makeGitHubgreenagain",
            additionalValue: { labelValue: null },
            id: "ddbdcc59-56d0-456a-9e8a-04886f339931",
            value: "Description",
          },
          {
            inner: [
              "Create Soda app",
              "Calculator",
              "upload my websites to google and search engines (eyeworkout, list-app-react)",
            ],
            name: "list_input_value",
            additionalValue: { labelValue: null },
            id: "dd30e086-8229-4189-afa9-efb22b8bc54b",
            value: "List",
          },
          {
            name: "color_input_value",
            inputValue: "#5666e1",
            additionalValue: { labelValue: null },
            id: "f75ee800-d3e6-4089-a9f6-073838829c23",
            value: "Color",
          },
        ],
      },
      {
        data: [
          {
            name: "heading_input_value",
            inputValue: "Movie Search App related",
            additionalValue: { labelValue: null },
            id: "b8cf258a-9d97-4303-8427-a9a5b568875e",
            value: "Heading",
          },
          {
            name: "Pragraph_input_value",
            inputValue:
              "Add torrent to queue\n\nSubtitiles not working vlc .srt file",
            additionalValue: { labelValue: "Bugs or Features" },
            id: "07a93b4a-b51d-4e44-8ebd-f56c40a9c464",
            value: "Paragraph",
          },
          {
            name: "list_input_value",
            additionalValue: { labelValue: null },
            id: "2dc553bf-161f-46dd-972d-0d121c47e11c",
            inner: [
              {
                value:
                  "speech to text to create subtitles which are not included",
                done: false,
              },
              {
                done: false,
                value:
                  "to search from opensubitties for the subtitles if the subtitles file is not included",
              },
              {
                value: "convert a different language subtitle to English",
                done: false,
              },
              {
                value:
                  "read a subtitle file (text - speech) incase the video is of another language and the subtitles are in English ",
                done: false,
              },
            ],
            value: "List",
          },
          {
            name: "link_input_value",
            inputValue:
              "https://github.com/googleapis/nodejs-text-to-speech#samples",
            additionalValue: { labelValue: "Google text to speech" },
            id: "c83a6287-d7dc-4578-9cf6-5ae6e3f02e58",
            value: "Link",
          },
          {
            name: "link_input_value",
            inputValue: "https://www.npmjs.com/package/subtitle",
            additionalValue: {
              labelValue: "EXTRACT SUBTITILES FILE FROM MKV VIDEO AND MORE",
            },
            id: "ce6d309c-a5a6-4ba5-94f5-cc1a5b9abe6f",
            value: "Link",
          },
        ],
        delete: false,
        publishDate: { seconds: 1653567854, nanoseconds: 707000000 },
        options: false,
      },
      {
        delete: true,
        publishDate: { seconds: 1679473824, nanoseconds: 519000000 },
        data: [
          {
            name: "heading_input_value",
            inputValue: "About major project",
            additionalValue: { labelValue: null },
            id: "942741e8-83fd-4f1a-be21-3aa2a5575e72",
            value: "Heading",
          },
          {
            name: "list_input_value",
            additionalValue: { labelValue: null },
            id: "f1d088f2-883c-4787-9f41-b6cb0e2f6b0d",
            inner: [
              { done: true, value: "Add top mives, popular tv shows etc" },
              { done: true, value: "Add user management " },
              { value: "Add subscription", done: false },
              { value: "Make it responsive", done: true },
              { done: true, value: "Add season and episode in title viewer" },
              { done: true, value: "Add more info about move or tv shows " },
              { value: "Add user review", done: true },
            ],
            value: "List",
          },
        ],
        options: false,
        deletedOn: { seconds: 1687130783, nanoseconds: 110000000 },
      },
      {
        deletedOn: "",
        data: [
          {
            name: "heading_input_value",
            inputValue: "movies And web series",
            additionalValue: { labelValue: null },
            id: "80c560d3-808c-4e0e-bf88-7436ab406b29",
            value: "Heading",
          },
          {
            name: "title_input_value",
            inputValue: "season 2 that i want to watch",
            additionalValue: { labelValue: null },
            id: "b6cecb45-b331-4d97-98ec-7d64a4bb573a",
            value: "Title",
          },
          {
            name: "Pragraph_input_value",
            inputValue: "movies =",
            additionalValue: { labelValue: null },
            id: "e85e244b-dad6-440b-b55b-6d235407b0f7",
            value: "Paragraph",
          },
          {
            name: "list_input_value",
            additionalValue: { labelValue: null },
            id: "fa5af822-7be3-4b8b-ba0e-7cdfaf5b4851",
            value: "List",
            inner: [
              { value: "jl 50 season 2", done: false },
              { value: "kota factory season 3" },
              { value: "family man season 3", done: false },
              { done: false, value: "bard of blood season 2" },
              { done: false, value: "special ops season 2" },
              { value: "Aashram season 4", done: false },
              { value: "Mumbai Diaries season 2", done: false },
              { done: false, value: "True detective season 4" },
              { value: "Squid Game season 2", done: false },
              { value: "Westworld season 5" },
              { value: "Succession season 4" },
              { done: false, value: "Asur season 3" },
              { value: "severance season 2", done: false },
              { value: "Black Mirror season 6" },
              { done: false, value: "panchayat season 3" },
              { done: false, value: "Stranger things season 5" },
              { done: false, value: "House of the dragon season 2 " },
              { done: false, value: "the Mandalorian season 3" },
              { value: "Last of us season 2" },
              { value: "Farzi season 2" },
              { value: "sass bahu aur flamingo season 2" },
              { value: "The punisher (Netflix) " },
              { value: "Fargo" },
              { value: "Ozark" },
            ],
          },
          {
            name: "list_input_value",
            additionalValue: { labelValue: "Pending tv Series" },
            id: "31c0186c-7e1b-4fbb-955a-10ff5b1c6a67",
            value: "List",
            inner: [
              { value: "The wire" },
              { value: "Ozark" },
              { value: "The expase", done: true },
              { value: "Succession" },
              { value: "the mandolrian" },
              { value: "barry", done: true },
              { value: "daredevil season 3" },
            ],
          },
          {
            name: "list_input_value",
            additionalValue: { labelValue: "pending Movies" },
            id: "86f71132-b2e1-464b-af45-7d0ca31eabc6",
            value: "List",
            inner: [
              { value: "Hobbit" },
              { value: "sherlock homles part 2" },
              { value: "spider man no way home" },
              { value: "IB71" },
            ],
          },
          {
            name: "color_input_value",
            inputValue: "#a0fb8e",
            additionalValue: { labelValue: null },
            id: "cb08572b-91c6-483b-ae8d-82ad6eac398c",
            value: "Color",
          },
        ],
        delete: false,
        publishDate: { seconds: 1602344621, nanoseconds: 412000000 },
      },
      {
        options: false,
        data: [
          {
            name: "heading_input_value",
            inputValue: "PLAN",
            additionalValue: { labelValue: null },
            id: "299c813f-3d3a-4ff9-a58a-acb6945a804b",
            value: "Heading",
          },
          {
            inputValue:
              "stage 1:\n1) Freelancing\n2) Teaching (like a tutor or teaching on youtube)\n3) Youtube(post website design and its implementation on youtube as well as on other social media platforms such as Instagram).\n4) Make websites for local businesses.\n\nFor Now:\npractice making and designing a website \nmake a protofolio(not compulsry)\ncontribute to open source(not compulsory)\n",
            name: "Pragraph_input_value",
            additionalValue: { labelValue: null },
            id: "4b3731fd-6f5f-4895-8ffe-a8062a9eda39",
            value: "Paragraph",
          },
          {
            inputValue: "#66ffe6",
            name: "color_input_value",
            additionalValue: { labelValue: null },
            id: "4318210d-cc9a-49ab-943e-4820ef39e78b",
            value: "Color",
          },
        ],
        delete: false,
        publishDate: { seconds: 1637513135, nanoseconds: 329000000 },
      },
      {
        data: [
          {
            name: "heading_input_value",
            inputValue: "This month plans",
            additionalValue: { labelValue: null },
            id: "5ddbb56f-1e4a-4e16-9118-41249613b567",
            value: "Heading",
          },
          {
            name: "Pragraph_input_value",
            inputValue:
              "web series\nstudy(java)\nmaking Netflix clone\ntyping practice\nlearning new stuff such as react native, nextJs, etc,",
            additionalValue: { labelValue: null },
            id: "e0881a68-bb07-4a59-8353-0bc67945fa47",
            value: "Paragraph",
          },
          {
            inner: [
              "Learn three js",
              "Practice UI designing",
              "make eyeworkout with svg animations and make it with react and learn next js and try to implement in next js (after that make shadow-notes and eyeworkout public)",
            ],
            name: "list_input_value",
            additionalValue: { labelValue: null },
            id: "db929c17-f24c-4e30-80b8-6ebfecbc95dc",
            value: "List",
          },
          {
            inputValue: "#66ffe6",
            name: "color_input_value",
            additionalValue: { labelValue: null },
            id: "a8cf4d31-e061-4613-b336-e181b2822099",
            value: "Color",
          },
        ],
        options: false,
        publishDate: { seconds: 1634464835, nanoseconds: 226000000 },
        delete: false,
      },
      {
        publishDate: { seconds: 1685200971, nanoseconds: 959000000 },
        delete: true,
        deletedOn: { seconds: 1687130775, nanoseconds: 204000000 },
        data: [
          {
            name: "heading_input_value",
            inputValue: "call of war test account",
            additionalValue: { labelValue: null },
            id: "50f5aa56-9b64-46c5-a579-d031817aa6ab",
            value: "Heading",
          },
          {
            name: "Pragraph_input_value",
            inputValue: "username = test_gamer\npassword = 1234567890",
            additionalValue: { labelValue: null },
            id: "0b1717fa-c82c-4cad-b3b7-931f7c1a6122",
            value: "Paragraph",
          },
        ],
        options: false,
      },
      {
        delete: true,
        data: [
          {
            name: "heading_input_value",
            inputValue: "Sopa2day Links",
            additionalValue: { labelValue: null },
            id: "ca0b0503-c829-4ff1-b4b6-0ad2f3a93e80",
            value: "Heading",
          },
          {
            name: "link_input_value",
            inputValue: "https://soap2day.to",
            additionalValue: { labelValue: "CHECKE (WORKING)" },
            id: "33d690d3-1ffd-47e0-8f1b-71e92c22bdfc",
            value: "Link",
          },
          {
            name: "link_input_value",
            inputValue: "https://soap2day.ac",
            additionalValue: { labelValue: null },
            id: "52e297cd-4477-4f40-a26c-a1375eb4ac5b",
            value: "Link",
          },
          {
            inputValue: "https://soap2day.sh",
            name: "link_input_value",
            additionalValue: { labelValue: null },
            id: "4c292c64-e19a-4f09-89a1-20781385bc25",
            value: "Link",
          },
          {
            inputValue: "https://soap2day.cx",
            name: "link_input_value",
            additionalValue: { labelValue: null },
            id: "bd99e24d-0b43-489a-bb48-5e6b55970699",
            value: "Link",
          },
          {
            name: "link_input_value",
            inputValue: "https://s2dfree.to ",
            additionalValue: { labelValue: "link" },
            id: "741a6fa7-1a50-420a-8e79-2a60d86cb391",
            value: "Link",
          },
          {
            inputValue: "https://s2dfree.cc",
            name: "link_input_value",
            additionalValue: { labelValue: null },
            id: "733ab3f9-1ab9-4a51-9d26-c656e54f1f78",
            value: "Link",
          },
          {
            name: "link_input_value",
            inputValue: "https://s2dfree.de",
            additionalValue: { labelValue: null },
            id: "73c4500d-e813-44c5-9f93-6f83e52713c4",
            value: "Link",
          },
          {
            name: "link_input_value",
            inputValue: "https://s2dfree.is ",
            additionalValue: { labelValue: null },
            id: "7c04c870-6f23-439e-b136-7e759511af31",
            value: "Link",
          },
          {
            name: "link_input_value",
            inputValue: "https://s2dfree.nl",
            additionalValue: { labelValue: null },
            id: "8fae3687-a42a-4f2e-b819-fe04ce78c7f6",
            value: "Link",
          },
          {
            inputValue: "#a0fb8e",
            name: "color_input_value",
            additionalValue: { labelValue: null },
            id: "4beedfe9-eb1b-4c23-8711-c24a46854fb3",
            value: "Color",
          },
        ],
        deletedOn: { seconds: 1636107648, nanoseconds: 599000000 },
        publishDate: { seconds: 1634572093, nanoseconds: 973000000 },
        options: false,
      },
      {
        publishDate: { seconds: 1613036059, nanoseconds: 977000000 },
        delete: false,
        data: [
          {
            name: "heading_input_value",
            inputValue: "Learning (not collage)",
            additionalValue: { labelValue: null },
            id: "5cfb98c4-31b8-433b-aa16-756e72f8d952",
            value: "Heading",
          },
          {
            inputValue: "Thing I want to learn",
            name: "title_input_value",
            additionalValue: { labelValue: null },
            id: "ccd62de2-5aee-4fea-8563-cadab7173338",
            value: "Title",
          },
          {
            name: "list_input_value",
            additionalValue: { labelValue: null },
            id: "b788d4c9-9838-4171-a289-166fe0eae6d5",
            value: "List",
            inner: [
              "material UI",
              "Redux",
              "Three.Js",
              { value: "electron", done: true },
              { value: "node JS", done: true },
              { done: true, value: "sass" },
              "React native",
              { value: "Blender", done: true },
              { value: "Java", done: true },
              { done: true, value: "next js" },
            ],
          },
          {
            inputValue: "#a0fb8e",
            name: "color_input_value",
            additionalValue: { labelValue: null },
            id: "113ea9b7-9d14-4016-b66f-af560afbd73b",
            value: "Color",
          },
        ],
        deletedOn: "",
      },
      {
        delete: false,
        publishDate: { seconds: 1601304446, nanoseconds: 776000000 },
        deletedOn: "",
        data: [
          {
            name: "heading_input_value",
            inputValue: "React js",
            additionalValue: { labelValue: null },
            id: "dd2e36dc-4a10-4d47-ae31-c4f122050147",
            value: "Heading",
          },
          {
            name: "title_input_value",
            inputValue: "What i have to learn for now",
            additionalValue: { labelValue: null },
            id: "528be4ba-8ab7-44d9-b6bb-0ab34160831e",
            value: "Title",
          },
          {
            name: "description_input_value",
            inputValue: "Advanced topics",
            additionalValue: { labelValue: null },
            id: "57af6a85-15c6-44f2-91b1-45a16c70cf38",
            value: "Description",
          },
          {
            name: "list_input_value",
            additionalValue: { labelValue: null },
            id: "69e359d6-46c5-4176-b4a9-3479201560b1",
            inner: [
              { value: "render props" },
              { value: "code splitting " },
              { value: "higher order components " },
              { value: "portals" },
              { value: "error boundaries" },
              { value: "fiber architecture (do any time)", done: false },
            ],
            value: "List",
          },
          {
            inputValue: "#ff5454",
            name: "color_input_value",
            additionalValue: { labelValue: null },
            id: "b76ca6d3-658d-412c-89f6-1b678cdc93da",
            value: "Color",
          },
        ],
      },
      {
        delete: false,
        data: [
          {
            name: "heading_input_value",
            inputValue: "Ideas",
            additionalValue: { labelValue: null },
            id: "c2ff639c-4f6b-43a3-9cfe-647ef5053fb1",
            value: "Heading",
          },
          {
            name: "Pragraph_input_value",
            inputValue:
              "freelancing\nsocila media - earch users\nlocal shop\nblogging\nteaching",
            additionalValue: { labelValue: null },
            id: "67c88356-e345-42df-968b-93e39c0daa3e",
            value: "Paragraph",
          },
          {
            name: "Pragraph_input_value",
            inputValue:
              "act as a middle man\n\n1) by using coding auto find clients and charge them , now find freelancer to do your work with less charge.\n\n2) I can contact local bussiness and charge them and contact freelancers.\n\n3) I can create a team in which i pay them some amount to do some work but I will take more ammount from the clients\n\n\n4) maybe hire a youtuber to make youtbue video .. ",
            additionalValue: { labelValue: null },
            id: "990970b6-f204-499a-bb71-b0910fda4864",
            value: "Paragraph",
          },
          {
            name: "list_input_value",
            additionalValue: { labelValue: null },
            id: "76f3dcba-62bc-4826-b961-69074a8f0477",
            value: "List",
            inner: [
              {
                value:
                  "product delivery in your local region to the people through a portal.",
              },
              {
                value:
                  "build a platform in which a user request a product and a volunteer/delivery boy deliver the product to the user(it can be a local region).",
              },
              {
                value:
                  "unprotected/unlocked/not encrypted/available to all chat app (can be used to public chat which may contain question/answer, etc.)",
              },
              {
                value:
                  "create a handwriting generator (for make assignments) (this will generate random handwriting patterns using A.I)",
              },
              {
                value:
                  "A device (like VR) in which we can buy stuff and place in a real virtual world.(buying a monitor in VR and then placing it on my table in VR but after removing the VR I don't have a monitor) (maybe it's called metaverse",
              },
              {
                value:
                  "Create a phone lock app which will only unlock if a person achieves a preferred typing speed on his computer (to wake me up from sleep)",
              },
              {
                value:
                  "Website for suggestions regarding changes in education system",
              },
              {
                value:
                  "Create a website which contains a secret video of a password of a lock to get the video must complete some tasks e.g typing speed and running using phone sensor",
              },
              { value: "Talk to yourself on call with their voice cloned" },
              {
                value:
                  "A website in which the a programmer can be annomyous and who will get some points after completing tasks ",
              },
              {
                value:
                  "A graveyard website where the info of dead people will be stored. and info of better dead to list the people who deserve to die. people can promote their dead people",
              },
              { value: "Automatic question paper checker" },
            ],
          },
          {
            name: "color_input_value",
            inputValue: "#66ffe6",
            additionalValue: { labelValue: null },
            id: "5100bd60-8e7c-4370-a775-acad1066c201",
            value: "Color",
          },
        ],
        options: false,
        publishDate: { seconds: 1632662586, nanoseconds: 923000000 },
      },
      {
        options: false,
        delete: false,
        data: [
          {
            inputValue: "Wake up App Regarding",
            name: "heading_input_value",
            additionalValue: { labelValue: null },
            id: "aca81d23-31d7-4181-b722-9ab8f28d951d",
            value: "Heading",
          },
          {
            inputValue:
              "https://stackoverflow.com/questions/34573109/how-to-make-an-android-app-to-always-run-in-background",
            name: "link_input_value",
            additionalValue: {
              labelValue: "For running the app in the backdround",
            },
            id: "80b0a887-99f6-4884-8095-913487d01e0e",
            value: "Link",
          },
          {
            name: "link_input_value",
            inputValue:
              "https://www.geeksforgeeks.org/how-to-draw-over-other-apps-in-android/",
            additionalValue: {
              labelValue: "for running the app over other apps",
            },
            id: "7b34c7c6-ae58-414e-bf89-a019198e283f",
            value: "Link",
          },
          {
            inputValue:
              "https://github.com/Rapsssito/react-native-background-actions",
            name: "link_input_value",
            additionalValue: {
              labelValue: "running task in background in react native",
            },
            id: "c533af6b-473c-4f84-8ae3-38446a71e97b",
            value: "Link",
          },
          {
            inputValue:
              "https://stackoverflow.com/questions/52542175/how-to-draw-over-other-apps-in-react-native",
            name: "link_input_value",
            additionalValue: { labelValue: "over the app using react native" },
            id: "02b187f0-2f44-4e21-a58a-7655508d4730",
            value: "Link",
          },
          {
            name: "Pragraph_input_value",
            inputValue:
              "Dinesh Gautam\nI want to make an app which locks the phone and shows a message, the phone is not unlocked until the admin unlocks it. How To create this app\n\nTo create an app that locks the phone and displays a message, you will need to use a programming language like Java or Kotlin to write the app for the Android operating system. The app will need to use the Android Device Administration API to lock the device, and you will need to create a user interface for the app so that the admin can unlock the device.\n\n\n\n\nDinesh Gautam\nI will use java to create the app\nTo create an app in Java that locks the phone and displays a message, you will need to use the Android SDK and the Android Device Administration API. The Android Device Administration API allows your app to perform actions like locking the device or setting a password policy, and it requires that the device owner grant your app permission to perform these actions.\n\nHere are the basic steps to create an app that locks the phone and displays a message:\n\nInstall the Android SDK and set up your development environment.\nCreate a new Android project in the Android SDK.\nAdd the necessary permissions to your app's manifest file.\nUse the Android Device Administration API to lock the device and display a message.\nCreate a user interface for the app so that the admin can unlock the device.\nHere is some sample code to get you started:\n\nCopy code\nimport android.app.admin.DeviceAdminReceiver;\nimport android.app.admin.DevicePolicyManager;\nimport android.content.Context;\nimport android.content.Intent;\n\npublic class MyAdminReceiver extends DeviceAdminReceiver {\n  // Called when the device owner enables or disables the admin receiver.\n  @Override\n  public void onEnabled(Context context, Intent intent) {\n    // TODO: Handle the enabling of the admin receiver.\n  }\n\n  // Called when the device owner disables the admin receiver.\n  @Override\n  public void onDisabled(Context context, Intent intent) {\n    // TODO: Handle the disabling of the admin receiver.\n  }\n\n  // Called when the device owner sets a new password for the device.\n  @Override\n  public void onPasswordChanged(Context context, Intent intent) {\n    // TODO: Handle the changing of the device password.\n  }\n\n  // Called when the device owner attempts to reset the password.\n  @Override\n  public void onPasswordFailed(Context context, Intent intent) {\n    // TODO: Handle the failed password reset attempt.\n  }\n\n  // Called when the device owner succeeds in resetting the password.\n  @Override\n  public void onPasswordSucceeded(Context context, Intent intent) {\n    // TODO: Handle the successful password reset.\n  }\n}\nYou will need to replace the TODO comments with code to lock the device and display a message. You can use the DevicePolicyManager class to perform actions like locking the device or setting a password policy. For example, you can use the lockNow() method to lock the device immediately, and you can use the setMaximumFailedPasswordsForWipe() method to specify the number of failed password attempts that will trigger a factory reset of the device.\n\nYou will also need to create a user interface for the app so that the admin can unlock the device. This can be as simple as a button that the admin can tap to unlock the device, or you can create a more complex UI to allow the admin to enter a password or other credentials to unlock the device.\n\nI hope this helps! Let me know if you have any other questions.\n\n\n\n\nDinesh Gautam\ninstead of locking the phone I want to show an overlay which convers the whole screen \nTo show an overlay that covers the entire screen, you can create a View in your app and set its dimensions to match the dimensions of the device screen. You can use the WindowManager class to add the View to the window so that it covers the entire screen.\n\nHere is an example of how you can create an overlay View and add it to the window:\n\nCopy code\nimport android.app.Activity;\nimport android.content.Context;\nimport android.graphics.PixelFormat;\nimport android.view.Gravity;\nimport android.view.View;\nimport android.view.WindowManager;\n\npublic class OverlayHelper {\n  private static View mOverlayView;\n  private static WindowManager mWindowManager;\n\n  public static void showOverlay(Activity activity) {\n    if (mOverlayView == null) {\n      // Create the overlay View\n      mOverlayView = new View(activity);\n      mOverlayView.setBackgroundColor(0x7f000000); // Set a semi-transparent black color\n\n      // Get the WindowManager\n      mWindowManager = (WindowManager) activity.getSystemService(Context.WINDOW_SERVICE);\n\n      // Set the layout parameters for the overlay View\n      WindowManager.LayoutParams params = new WindowManager.LayoutParams(\n          WindowManager.LayoutParams.MATCH_PARENT,\n          WindowManager.LayoutParams.MATCH_PARENT,\n          WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,\n          WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,\n          PixelFormat.TRANSLUCENT);\n      params.gravity = Gravity.TOP | Gravity.START; // The overlay View should be at the top of the window\n\n      // Add the overlay View to the window\n      mWindowManager.addView(mOverlayView, params);\n    }\n  }\n\n  public static void hideOverlay() {\n    if (mOverlayView != null) {\n      // Remove the overlay View from the window\n      mWindowManager.removeView(mOverlayView);\n      mOverlayView = null;\n    }\n  }\n}\nTo show the overlay, you can call the showOverlay() method and pass in a reference to the current Activity. This will create the View and add it to the window, covering the entire screen. To hide the overlay, you can call the hideOverlay() method.\n\nNote that you will need to add the SYSTEM_ALERT_WINDOW permission to your app's manifest file in order to use the WindowManager class and add views to the window.\n\nI hope this helps! Let me know if you have any other questions.\n\n\n\n\nDinesh Gautam\nwill it work when the user is using an another app\nYes, the overlay View will cover the screen even if the user is using another app. The View will be added to the window using the TYPE_APPLICATION_OVERLAY window type, which allows the View to be displayed on top of other app windows. This means that the overlay will be visible even if the user is using another app, and it will remain visible until you remove it by calling the hideOverlay() method.\n\nKeep in mind, however, that displaying an overlay on top of other app windows may be considered disruptive by the user. You should use this feature carefully and only when necessary. It is generally best to avoid interrupting the user's experience with other apps unless it is absolutely necessary.\n\nI hope this helps! Let me know if you have any other questions.",
            additionalValue: { labelValue: "Chat gpt regarding overlay" },
            id: "49ab7019-2d6b-45fe-aa7e-be2f5e640afe",
            value: "Paragraph",
          },
        ],
        publishDate: { seconds: 1653070307, nanoseconds: 363000000 },
      },
      {
        delete: false,
        deletedOn: "",
        data: [
          {
            inputValue: "React js roadmap",
            name: "heading_input_value",
            id: "713aa53a-c743-41c6-b538-aa652412fe88",
            value: "Heading",
          },
          {
            name: "title_input_value",
            inputValue: "This is the link of a image of the roadmap",
            id: "6fd5cfa7-9526-425b-b73f-deb7b534ed10",
            value: "Title",
          },
          {
            inputValue: "#ff5454",
            name: "color_input_value",
            id: "97505872-e028-4133-a367-049366d4f743",
            value: "Color",
          },
          {
            inputValue: "https://roadmap.sh/roadmaps/react.png",
            name: "link_input_value",
            id: "6d28fb7a-8d5d-4150-b0c3-23c750a7f265",
            value: "Link",
          },
        ],
        publishDate: { seconds: 1601304212, nanoseconds: 185000000 },
      },
      {
        options: false,
        delete: false,
        data: [
          {
            inputValue: "Every day plan",
            name: "heading_input_value",
            additionalValue: { labelValue: null },
            id: "5ddbb56f-1e4a-4e16-9118-41249613b567",
            value: "Heading",
          },
          {
            name: "list_input_value",
            additionalValue: { labelValue: "afternoon" },
            id: "a5140677-d9eb-466a-9a69-fafd83444930",
            inner: ["Exercise"],
            value: "List",
          },
          {
            name: "list_input_value",
            additionalValue: { labelValue: "before Sleeping" },
            id: "a24308a0-3485-4051-a9bc-14b6efac4f30",
            value: "List",
            inner: [
              {
                done: false,
                value:
                  "See website designs on awwwards and dribbble, behanche.",
              },
              { done: false, value: "Eye-Workout" },
            ],
          },
          {
            name: "color_input_value",
            inputValue: "#66ffe6",
            additionalValue: { labelValue: null },
            id: "a2a9b3b4-dded-4bbe-b093-f54ab527d5b9",
            value: "Color",
          },
        ],
        publishDate: { seconds: 1646147383, nanoseconds: 187000000 },
      },
      {
        data: [
          {
            name: "heading_input_value",
            inputValue: "Projects",
            additionalValue: { labelValue: null },
            id: "952c82d5-b4dc-4f63-a852-7281e5d6b34c",
            value: "Heading",
          },
          {
            inputValue: "These are the projects that I will work on",
            name: "title_input_value",
            additionalValue: { labelValue: null },
            id: "cc6623b1-8421-4955-807c-8810b37f0024",
            value: "Title",
          },
          {
            name: "list_input_value",
            additionalValue: { labelValue: null },
            id: "770e6fd6-180b-4f0f-8570-b0a0f1188c91",
            value: "List",
            inner: [
              "BVC construction website",
              "chess game in JS",
              "FavMem (app about favourite memories by taking pictures).",
              "automatic video downloader(by using webscraper and api) form youtube",
              "game  ",
              "class timeTable website scripts v3  ",
              "time table maker ",
              {
                value:
                  "make a audio dubbing for youTube extension (use google video audio dubbing with ai and two minutes paper video on ai storing human sound by that I can create audio dubbing with the person real voice using AI)",
                done: false,
              },
            ],
          },
          {
            inputValue: "#ff5454",
            name: "color_input_value",
            additionalValue: { labelValue: null },
            id: "4bccc72b-7082-4647-a191-817c6256089a",
            value: "Color",
          },
        ],
        delete: false,
        publishDate: { seconds: 1613476082, nanoseconds: 418000000 },
        deletedOn: "",
      },
    ];
    // jsonData.forEach((eachData) => {
    //   if (eachData.deletedOn) {
    //     eachData.deletedOn = new Timestamp(
    //       eachData.deletedOn.seconds,
    //       eachData.deletedOn.nanoseconds
    //     );
    //   }
    //   eachData.publishDate = new Timestamp(
    //     eachData.publishDate.seconds,
    //     eachData.publishDate.nanoseconds
    //   );
    //   console.log(eachData);
    //   setData_fireStore(eachData);
    // });

    // return;
    const q = query(
      userDocCollection,
      where("delete", "==", false),
      orderBy("publishDate", "desc")
    );
    let unsubscribe = onSnapshot(q, (snapshot) => {
      setUserData(
        snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
    });

    const isMigrated = JSON.parse(localStorage.getItem("isMigratedToV3"));

    if (!isMigrated) {
      window.alert("New version available!\nDo you want to migrate your data?");

      migrateV2DataToV3();
    } else {
      setLoading(false);
    }

    async function migrateV2DataToV3() {
      console.log(userDocCollection);
      // get all the documents from the v2 collection
      const docSnap = await getDoc(userDoc);
      //check if the data is migrated
      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.version === 3) {
          console.warn("Data already migrated!");
          localStorage.setItem("isMigratedToV3", true);
          setLoading(false);
          return;
        }
      }

      const v2Docs = query(userDocCollection);
      // get all docs

      getDocs(v2Docs).then((snapshot) => {
        const allDocs = snapshot.docs;
        // const json = allDocs.map((e) => e.data());
        // console.log(JSON.stringify(json));
        // return;
        let newData = allDocs.map((doc) => {
          const newDocData = doc.data().data.map((data) => {
            let { additionalValue, id, inner, name, value, inputValue } = data;
            if (name === "Pragraph_input_value") {
              name = "Paragraph_input_value";
            }
            if (inner) {
              // it is a list
              const innerList = inner.map((innerItem) => {
                let inputValue = innerItem;
                let checked = innerItem?.done || false;
                if (innerItem.value) {
                  inputValue = innerItem.value;
                }
                return {
                  name,
                  value,
                  state: { value: inputValue, checked },
                  id: uuidv4(),
                  parentId: id,
                };
              });
              return [
                {
                  name,
                  value,
                  id,
                  isFocusable: false,
                  type: listTypes.checked,
                },
                ...innerList,
              ];
            }
            return {
              name,
              value,
              id,
              state: {
                value: inputValue,
                labelValue: additionalValue?.labelValue || null,
              },
            };
          });

          const data = doc.data();
          return { ...data, data: newDocData.flat() };
        });

        console.log("newData");
        console.log(newData);

        // delete all docs from userDocCollection
        const deleteDocs = allDocs.map((doc) => {
          return deleteDoc(doc.ref);
        });

        // add newData to userDocCollection
        Promise.all(deleteDocs).then(() => {
          newData.forEach((eachData) => {
            setData_fireStore(eachData);
          });

          window.alert("migrated");
          localStorage.setItem("isMigratedToV3", true);
          updateDoc(userDoc, {
            version: 3,
          });
          setLoading(false);
        });

        console.log(newData);
      });
    }

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  function setData_fireStore(data) {
    console.log(data);
    setDoc(
      userDoc,
      {
        users: [],
        groups: false,
        favourits: false,
        tags: false,
        version: 3,
      },
      { merge: true }
    ).then(() => {
      addDoc(userDocCollection, data);
    });
  }

  function updateData_fireStore(docId, data) {
    console.log("updated");
    const toBeUpdatedDoc = doc(userDocCollection, docId);
    setDoc(toBeUpdatedDoc, data, { merge: true });
  }

  function deleteData_fireStore(docId) {
    const toBeDeletedDoc = doc(userDocCollection, docId);
    deleteDoc(toBeDeletedDoc);
  }

  const value = {
    data,
    setdata: setData,
    setData_fireStore,
    updateData_fireStore,
    userData,
    setuserData: setUserData,
    trashData,
    settrashData: setTrashData,
    userID,
    filterData: filterData,
    setfilterData: setFilterData,
    deleteData_fireStore,
    undoTrigger,
    setundoTrigger: setUndoTrigger,
  };
  return (
    <data_context.Provider value={value}>
      {!loading && children}
    </data_context.Provider>
  );
}
