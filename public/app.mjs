document.addEventListener('DOMContentLoaded', () => {
  console.log("Current time: " + new Date().toLocaleTimeString());
  const menuController = new MenuController();
});

class Menu {
  constructor() {
    this.container = document.getElementById("container");
    this.createMainMenu();
    this.createSearchAndMessageDiv();
    this.createBody();
  }
 
  createMainMenu() {
    const navbarDiv = document.createElement("div");
    navbarDiv.id = "navbarDiv";
    
    const mainNavDiv = document.createElement("div");
    mainNavDiv.id = "mainNavDiv";

    const adminDiv = document.createElement("div");
    adminDiv.id = "adminDiv";

    const newPart = document.createElement("h4");
    newPart.textContent = "New Part";
    newPart.id = "newPartDiv";
    newPart.className = "mainMenuTabs";
    const menuItems = ["parts", "bom", "locations"];
    menuItems.forEach((item) => {
      const menuItem = document.createElement("h4");
      menuItem.textContent = item;
      menuItem.id = `${item}MenuTab`;
      menuItem.className = "mainMenuTabs";
      mainNavDiv.appendChild(menuItem);
    });
    navbarDiv.appendChild(mainNavDiv);
    navbarDiv.appendChild(adminDiv);
    adminDiv.appendChild(newPart);
    this.container.appendChild(navbarDiv);
  }
  createSearchAndMessageDiv() {
    // Create and append search bar
    const searchAndMessageDiv = document.createElement("div");
    searchAndMessageDiv.id = "searchAndMessageDiv";
    const searchBar = document.createElement("input");
    this.messageDiv = document.createElement("div");
    this.messageDiv.id = "messageDiv";
    this.messageDiv.textContent = "Welcome to the aafApp Server";

    searchBar.id = "searchBar";
    searchBar.autofocus = true;
    console.log(searchBar.value);
    searchBar.placeholder = "Search...";
    searchAndMessageDiv.appendChild(searchBar);
    searchAndMessageDiv.appendChild(this.messageDiv);
    this.container.appendChild(searchAndMessageDiv);
    return
  }
  createBody() {
    this.bodyDiv = document.createElement("div");
    this.bodyDiv.id = "bodyDiv";
    this.container.appendChild(this.bodyDiv);
  }
  showPartForm(htmlForm) {
    this.bodyDiv.innerHTML = "";
    
    }
  }
  showPart(jsonResponse) {
    this.bodyDiv.innerHTML = "";
    const description = {
      partName: "Part Name",
      description: "Description",
      width: "Width(in)",
      length: "Length(ft)",
      height: "Height(ft)",
      diameter: "Diameter(in)",
      squareFt: "Square Ft",
      weight: "Weight(lbs)",
      partType: "Part Type",
      material: "Material",    
      partPrice: "Part Price",
      partCost: "Part Cost",
      partQuantity: "Part Quantity",
    };
    const partDefinitionList = document.createElement("dl");
        this.messageDiv.textContent = jsonResponse.partName;
        partDefinitionList.id = "partDefinitionList";
        for (const key in jsonResponse) {
          if (Object.hasOwnProperty.call(description, key)) {
            const partDt = document.createElement("dt");
            partDt.textContent = description[key];
            const partDd = document.createElement("dd");
            partDd.textContent = jsonResponse[key];
            partDefinitionList.appendChild(partDt);
            partDefinitionList.appendChild(partDd);
          }
        }
        const buttonDiv = document.createElement("div");
        buttonDiv.id = "buttonDiv";
        const editButton = document.createElement("button");
        editButton.id = "editPartButton";
        editButton.textContent = "Edit";
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);
        const partImage = document.createElement("img");
        partImage.id = "partImage";
        partImage.src = "./images/2EKK7_GC01.jpeg";
        partDefinitionList.appendChild(partImage);
        partDefinitionList.appendChild(buttonDiv);
        this.bodyDiv.appendChild(partDefinitionList);
    }

  
  showLocations(jsonResponse) {
    //clear body, display message and create two divs, one to modify and one to show
    this.bodyDiv.innerHTML = "";
    this.messageDiv.textContent = "Warehouses";
    const modifyLocationDiv = document.createElement("div");
    modifyLocationDiv.id = "modifyLocationDiv";
    const showLocationDiv = document.createElement("div");
    showLocationDiv.id = "showLocationDiv";
    // iterate through the response and create a div for each locationDiv and show each location by name
    for (const location of jsonResponse) {
      const locationDiv = document.createElement("div");
      locationDiv.id = location._id;  
      locationDiv.className = "location";
      locationDiv.textContent = location.name;  
      showLocationDiv.appendChild(locationDiv);
    }
    const createLocationButton = document.createElement("button");
    createLocationButton.id = "createLocationButton";
    createLocationButton.textContent = "Create Location";
    modifyLocationDiv.appendChild(createLocationButton);
  // append the two divs to the bodyDiv
  this.bodyDiv.appendChild(modifyLocationDiv);
  this.bodyDiv.appendChild(showLocationDiv);
  }
  showLocationForm(locationHtmlForm) {
      this.messageDiv.textContent = "New Location";
      this.bodyDiv.innerHTML = locationHtmlForm;
      const locationForm = document.getElementById("locationForm");
      locationForm.addEventListener("change", (event) => {
        if (event.target.id === "locationType") {
           showRackOptions(event.target.value)
          }
      });
      function showRackOptions(locationType) {
        const locationName = document.getElementById("locationNameDiv");
        const desc = document.getElementById("descDiv");
        const aisleNumber = document.getElementById("aisleNumberDiv");
        const bayNumber = document.getElementById("bayNumberDiv");
        console.log(locationType);
        if (locationType === "rack" || locationType === "floor") {
          locationName.style.display = "block";
          desc.style.display = "block";
          aisleNumber.style.display = "block";
          bayNumber.style.display = "block";
        } else {
          locationName.style.display = "none";
          desc.style.display = "none";
          aisleNumber.style.display = "none";
          bayNumber.style.display = "none";
        }
      }
  }
 

  showLocationDetails(location) {
    this.messageDiv.textContent = location.name;
    this.bodyDiv.innerHTML = "";
    const attributes = {
      name: "Name",
      type: "Type",
      location: "Location",
      desc: "Description",
      aisles: "Aisles",
      bays: "Bays",
      capacity: { used: "Used", available: "Available" },
    }
    const locationDetailsDiv = document.createElement("div");
    locationDetailsDiv.id = "locationDetailsDiv";
    for (const key in attributes) {
      const locationDetailsDt = document.createElement("dt");
      locationDetailsDt.textContent = attributes[key];
      const locationDetailsDd = document.createElement("dd");
      locationDetailsDd.textContent = location[key];
      locationDetailsDiv.appendChild(locationDetailsDt);
      locationDetailsDiv.appendChild(locationDetailsDd);
      
    }

    this.bodyDiv.appendChild(locationDetailsDiv);
  }

}
/*/////////////////////////////////////////////////////////////////////////////*/
 
class MenuController {
  constructor() {
    this.menuClass = new Menu();
    this.handleMenuSelect();
    this.messageDiv = document.getElementById("messageDiv");
    this.bodyDiv = document.getElementById("bodyDiv");
    this.menuObject = document.getElementsByClassName("mainMenuTabs");
  }
  
  handleMenuSelect() {
    const navbarDiv = document.getElementById("navbarDiv");
    navbarDiv.addEventListener("click", (event) => {
      //if some document with class of selected will be removed
      this.bodyDiv.innerHTML = "";
      for (const menu of this.menuObject) {
        if (menu.classList.contains("selected")) {
          menu.classList.remove("selected");
        }
      }
      console.log(`handle menu select`,event.target.id)
      if (event.target.id === "newPartDiv") {
        event.target.classList.add("selected");
        this.handlePartForm();
      } else if (event.target.id === "partsMenuTab") {
        event.target.classList.add("selected");
        this.showParts();
      } else if (event.target.id === "bomMenuTab") {
        event.target.classList.add("selected");
      } else if (event.target.id === "locationsMenuTab") {
        event.target.classList.add("selected");
        this.showLocations();
      }
    });
  }
  currentMenu() {
   for (const key in this.menuObject) {
    if (this.menuObject[key].classList.contains("selected")) {
      return this.menuObject[key].id;
    }
   }
  }
   async handlePartForm() {
    try {
    const htmlForm = await this.getPartForm(); 
    this.menuClass.showPartForm(htmlForm);
    
    
    
    } catch (error) {
      console.log("smthng went wrong getting form")
      console.error(error);
    }

  } 
  async submitPartForm() {
    const form = document.getElementById("partForm");
    const submitButton = document.getElementById("submitButton");
    if (submitButton) {
      submitButton.addEventListener("click", async (event) => {
        event.preventDefault();
        if (!form.partName.value) {
          this.messageDiv.textContent = "Please enter a part name";
          return;
        }
        const formData = new FormData(form);
        const jsonData = JSON.stringify(Object.fromEntries(formData)); // Convert form data to JSON string
        const response = await fetch("/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: jsonData
        });
      if (response.ok) {
        this.messageDiv.textContent = "Part Added";
        console.log(response);
        form.reset();
      }
    }, { once: true });
    }
  }
  async getPartForm() {
    try {
      const response = await fetch("/form");
      if (response.ok) {
        const htmlForm = await response.text();
        this.messageDiv.textContent = "New Part";
        return htmlForm;
      } else {
        console.log("Failed to fetch form");
      }
    } catch (error) {
      console.error(error);
      console.log("Something went wrong getting the form");
    }
  }
  async showParts() {
    try {
    const response = await fetch("/parts");
    const jsonResponse = await response.json();
    if (response.ok) {
      this.messageDiv.textContent = "Parts";
      const showAllPartsDiv = document.createElement("div");
      showAllPartsDiv.id = "showAllPartsDiv";
      for (const invPart of jsonResponse) {
        const partDiv = document.createElement("div");
        partDiv.id = invPart._id;
        partDiv.className = "invPart";
        partDiv.textContent = invPart.partName;
        showAllPartsDiv.appendChild(partDiv);
      }
      this.bodyDiv.appendChild(showAllPartsDiv);
      showAllPartsDiv.addEventListener("click", (event) => this.showPartById(event), { once: true }); 
        } else if (!response.ok) {
      this.messageDiv.textContent = jsonResponse.message
    }
      } catch (error) {
        console.log("smthng went wrong getting parts")
        console.error(error);
      }
  } 
  
  async showPartById(event) {
  try {
    const response = await fetch(`/part/${event.target.id}`);
    const jsonResponse = await response.json();
    if (!response.ok) {
      console.log("response not ok");
      this.messageDiv.textContent = jsonResponse.message
      console.log(jsonResponse.message);
      return;
    } else if (response.ok) {
      this.menuClass.showPart(jsonResponse);
    }
    } catch (error) {
      console.log("smthng went wrong getting part")
      console.error(error);
    }
  }
  async showLocations() {
   try {
    if (this.currentMenu() === "locationsMenuTab") {
      const response = await fetch("/locations");
      const jsonResponse = await response.json();
      if (response.ok) {
        this.menuClass.showLocations(jsonResponse);
      } else if (!response.ok) {
        this.messageDiv.textContent = jsonResponse.message
        console.log(jsonResponse.message);
      }
      const showLocationDiv = document.getElementById("showLocationDiv");
      if (showLocationDiv) {
        showLocationDiv.addEventListener("click",async (event) => {
          const location = await fetch(`/location/${event.target.id}`);
          const jsonResponse = await location.json();
          this.menuClass.showLocationDetails(jsonResponse);
        }, { once: true });
      }
    }  

    const createLocationButton = document.getElementById("createLocationButton");
    if (createLocationButton) {
      createLocationButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const locationForm = await fetch("/locationForm");
        if (!locationForm.ok) {
          console.log("response not ok");
          this.messageDiv.textContent = locationForm.message
          console.log(locationForm.message);
          return;
        } else if (locationForm.ok) {
          const locationHtmlForm = await locationForm.text();
        this.menuClass.showLocationForm(locationHtmlForm);
        }
      }, { once: true });
    }


   } catch (error) {
    console.log("smthng went wrong getting locations")
    console.error(error);
   }
  }
 
  
}