  for (let i = 0; i < fieldNames.length; i++) {
      // Check if the field is empty
      if (!formData.has(fieldNames[i]) || formData.get(fieldNames[i]) === "") {
        console.log("Please fill out all fields");
        this.messageDiv.textContent = "Please fill out all fields";
        return false;
      }

    }
    // make sure partName and description are strings 
    if (typeof formData.get("partName") !== "string" || typeof formData.get("description") !== "string") {
      console.log("Part name and description must be strings");
      this.messageDiv.textContent = "Part name and description must be strings";
      return false;
    }
    // and less than 20 characters
    if (formData.get("partName").length > 20 || formData.get("description").length > 40) {
      console.log("Part name and description must be less than 20 characters");
      this.messageDiv.textContent = "Part name and description must be less than 20 characters";
      return false;
    }
    // check if width input is a number less than 999
    if (isNaN(formData.get("width")) || formData.get("width") < 0 || formData.get("width") > 999) {
      console.log("Width must be a number less than 999");
      this.messageDiv.textContent = "Width must be a number less than 999";
      return false;
    }
    // check if diameter input is a number less than 2
    if (isNaN(formData.get("diameter")) || formData.get("diameter") < 0 || formData.get("diameter") > 2) {
      console.log("Diameter must be a number less than 2");
      this.messageDiv.textContent = "Diameter must be a number less than 2";
      return false;
    }
    
  
  

  tabCycleMenu(currentMenu) {
    const menuArray = Array.from(document.getElementsByClassName("mainMenuTabs"));
    if (menuArray.every(menu => !menu.classList.contains("selected"))) {
      menuArray[0].classList.add("selected");
      const currentMenu = menuArray[0];
      this.handleMenuSelect(currentMenu, menuArray);
    } else {
      // Cycles through the menu items with modulus, scalable!
      const indexOfSelected = menuArray.findIndex(menu => menu.classList.contains("selected"));
      const nextIndex = (indexOfSelected + 1) % menuArray.length;
      menuArray[nextIndex].classList.add("selected");
      menuArray[indexOfSelected].classList.remove("selected");
      const currentMenu = menuArray[nextIndex];
      this.handleMenuSelect(currentMenu, menuArray);
    }
  } 
 
  handleMenuSelect(currentMenu, menuArray) {
    if (currentMenu === menuArray[0]) {
      console.log("Parts");
      this.showParts();
     
    } else if (currentMenu === menuArray[1]) {
      console.log("BOM");
      this.body.innerHTML = "BOM";
    } else if (currentMenu === menuArray[2]) {
      console.log("Locations");
      this.body.innerHTML = "Locations";
    } 
  }



    /*
  parseForm(formDataRaw) {
    const parsedFormData = parseFormData(formDataRaw);
    if (parseFormData) {
      
     // this.submitForm(parsedFormData);
    } else {
      console.log("Field Error");
      this.messageDiv.textContent = "Form Error";
      return false;
    }
  }
  */