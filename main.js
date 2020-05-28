const breadBrumb = document.querySelector(".breadcrumb");
const sidebar = document.querySelector("#left");
const videoWrapper = document.querySelector("#right");
let userSidebarPref = JSON.parse(localStorage.getItem("userSidebarPref"));
const toggleBtn = document.createElement("button");
toggleBtn.innerHTML = "Ocultar Sidebar";
toggleBtn.classList.add("toggleBtn");

const checkSidebar = () => {
  if(userSidebarPref === null) {
    // This means is the first time the user access the site
    localStorage.setItem("userSidebarPref", JSON.stringify(true))
    userSidebarPref = true
    return
  }
  if(userSidebarPref === false) {
    localStorage.setItem("userSidebarPref", JSON.stringify(false))
    toggleBtn.innerHTML = "Mostrar Sidebar";
    sidebar.classList.add("hidden");
  }
}
checkSidebar()

const handleSidebarToggle = () => {
  if (!userSidebarPref) {
    localStorage.setItem("userSidebarPref", JSON.stringify(true))
    toggleBtn.innerHTML = "Ocultar Sidebar";
    sidebar.classList.remove("hidden");
    userSidebarPref = true;
  } else {    
    localStorage.setItem("userSidebarPref", JSON.stringify(false))
    toggleBtn.innerHTML = "Mostrar Sidebar";
    sidebar.classList.add("hidden");
    userSidebarPref = false;
  }
};

toggleBtn.addEventListener("click", handleSidebarToggle);
breadBrumb.appendChild(toggleBtn);

const navButtons = document.createElement("div");
const firstLink =
  document.querySelector(".toggled").querySelector(".active")
    .previousElementSibling.tagName === "H3";
const lastLink =
  document.querySelector(".toggled").querySelector(".active")
    .nextElementSibling === null;

navButtons.className = "navButtons";
navButtons.innerHTML = `
  <button ${firstLink ? `disabled` : ""} class="btn-previous">
  <i class="fas fa-arrow-circle-left"></i> Anterior
  </button>
  <button ${lastLink ? `disabled` : ""} class="btn-next">
  Próximo <i class="fas fa-arrow-circle-right"></i>
  </button>
`;
videoWrapper.appendChild(navButtons);

if(!firstLink) {
  function clickPrevious() {
    document.querySelector(".toggled")
    .querySelector(".active")
    .previousElementSibling
    .querySelector("a").click()
  }
  let prevButton = document.querySelector(".btn-previous")
  prevButton.addEventListener("click", clickPrevious)
}

if(!lastLink) {
  function clickNext() {
    document.querySelector(".toggled")
    .querySelector(".active")
    .nextElementSibling
    .querySelector("a").click()
  }
  let nextButton = document.querySelector(".btn-next")
  nextButton.addEventListener("click", clickNext)
}
