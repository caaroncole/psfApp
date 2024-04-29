const domStructure = {
  body: {
    mainMenuDiv: {
      menuDiv: {
        parts: {},
        bom: {},
        locations: {}
      },
      adminDiv: {
        newPartButton: {}
      }
      },
      searchAndMessageDiv: {
        searchDiv: {},
        messageDiv: {}
      },
      body: {}
    }
}
function createDOMStructure(structure, parentElement) {
  for (const key in structure) {
      if (structure.hasOwnProperty(key)) {
          const element = document.createElement(key);
          parentElement.appendChild(element);

          const childStructure = structure[key];
          if (Object.keys(childStructure).length > 0) {
              createDOMStructure(childStructure, element);
          }
      }
  }
}
const parentElement = document.getElementById("container");
createDOMStructure(domStructure, parentElement);