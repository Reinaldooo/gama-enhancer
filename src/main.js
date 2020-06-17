function init() {
  const toggleBtn = document.createElement("button");
  toggleBtn.innerHTML = "Ocultar Sidebar";
  toggleBtn.classList.add("toggleBtn");
  const pathname = window.location.pathname;

  if (pathname.includes("aulas")) {
    const breadcrumb = document.querySelector(".breadcrumb");
    const sidebar = document.querySelector("#left");
    const videoWrapper = document.querySelector("#right");
    let userSidebarPref = JSON.parse(localStorage.getItem("userSidebarPref"));

    const checkSidebar = () => {
      if (userSidebarPref === null) {
        // This means is the first time the user access the site
        localStorage.setItem("userSidebarPref", JSON.stringify(true));
        userSidebarPref = true;
        return;
      }
      if (userSidebarPref === false) {
        localStorage.setItem("userSidebarPref", JSON.stringify(false));
        toggleBtn.innerHTML = "Mostrar Sidebar";
        sidebar.classList.add("hidden");
      }
    };
    checkSidebar();

    const handleSidebarToggle = () => {
      if (!userSidebarPref) {
        localStorage.setItem("userSidebarPref", JSON.stringify(true));
        toggleBtn.innerHTML = "Ocultar Sidebar";
        sidebar.classList.remove("hidden");
        userSidebarPref = true;
      } else {
        localStorage.setItem("userSidebarPref", JSON.stringify(false));
        toggleBtn.innerHTML = "Mostrar Sidebar";
        sidebar.classList.add("hidden");
        userSidebarPref = false;
      }
    };

    if (breadcrumb) {
      toggleBtn.addEventListener("click", handleSidebarToggle);
      breadcrumb.appendChild(toggleBtn);
    }

    if (sidebar) {
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

      if (!firstLink) {
        function clickPrevious() {
          document
            .querySelector(".toggled")
            .querySelector(".active")
            .previousElementSibling.querySelector("a")
            .click();
        }
        let prevButton = document.querySelector(".btn-previous");
        prevButton.addEventListener("click", clickPrevious);
      }

      if (!lastLink) {
        function clickNext() {
          document
            .querySelector(".toggled")
            .querySelector(".active")
            .nextElementSibling.querySelector("a")
            .click();
        }
        let nextButton = document.querySelector(".btn-next");
        nextButton.addEventListener("click", clickNext);
      }
    }

  } else if (pathname === "/aluno") {

    const weeksBar = document.querySelector(".week_bar__row")
    const weeksLIs = weeksBar.children;
    const weeksLength = weeksLIs.length;

    const handleWeeksToggle = () => {
      for (let i = 0; i < weeksLength; i++) {
        if (i < weeksLength - 2) {
          weeksLIs[i].style.display = "block";
        }
      }
      weeksBar.removeChild(weeksBar.lastChild)
    };

    for (let i = 0; i < weeksLength; i++) {
      if (i < weeksLength - 2) {
        weeksLIs[i].style.display = "none";
      }
    }

    toggleBtn.innerHTML = "Mostrar";
    toggleBtn.addEventListener("click", handleWeeksToggle);
    weeksBar.appendChild(toggleBtn);
  }
}

window.addEventListener("load", init);
