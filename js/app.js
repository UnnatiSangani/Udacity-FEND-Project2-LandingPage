// build the nav bar menu
buildNavBarMenu();

// Add class 'active' to navigation item when target near top of viewport
subscribeToViewport();

// Scroll to section on link click
scrollToSection();  

/* Get navigation menu */
function getNavBar() {
    return document.querySelector('#navbar__list');
  }
  
/* Get section list */
function getSectionList() {
  return document.querySelectorAll('section[id^="section"]');
}

/* Build navigation menu */
function buildNavBarMenu() {
  const navBar = getNavBar();
  const sectionList = getSectionList();
  const fragment = document.createDocumentFragment();
  let count = 1;

  sectionList.forEach((section) => {
    const sectionName = section.getAttribute('data-nav');
    const sectionId = section.getAttribute('id');
    const navBarLink = document.createElement('li');
    const link = document.createElement('a');

    link.setAttribute('href', '#');
    link.setAttribute('data-section', sectionId);
    link.setAttribute('data-order', count);
    link.className = 'navbar__menu menu__link';
    link.textContent = sectionName;
    navBarLink.appendChild(link);
    fragment.appendChild(navBarLink);
    count += 1;
  });
  navBar.appendChild(fragment);
}

/* Get navigation menu items */
function getNavBarItems() {
  return document.querySelectorAll('.navbar__menu.menu__link');
}

/* Scroll to the Section on user click */
function scrollToSection() {
  const navBarList = getNavBarItems();
  
  navBarList.forEach((element) => {
    element.addEventListener('click', (event) => {
        event.preventDefault();
        const el = event.target;
        const navItem = el.getAttribute('data-section');
        const sectionSelector = `#${navItem}`;
        const target = document.querySelector(sectionSelector);
        target.scrollIntoView({behavior: "smooth", block: "start"});
      }
    );
  });
}

/* Update menu state  */
function updateMenuState(sectionId) {
  const navBarLink = document.querySelector(`[data-section="${sectionId}"]`);
  const currentLinkOrder = parseInt(navBarLink.getAttribute('data-order'), 8);
  const navBarList = getNavBarItems();

  for (const link of navBarList) {
    const tmpLinkOrder = parseInt(link.getAttribute('data-order'), 8);
    if (tmpLinkOrder == currentLinkOrder) {
      if (link.className.indexOf('active') === -1) {
        link.classList.add('active');
      }
    } else {
      link.classList.remove('active');
    }
  }
}

/* Update section state */
function updateSectionState(selectedSectionId) {
  const sectionList = getSectionList();

  for (const section of sectionList) {

    if (section.getAttribute(`id`) === selectedSectionId) {
      if (section.className.indexOf('active') === -1) {
        section.classList.add('active');
      }
    } else {
      section.classList.remove('active');
    }
  }
} 


/* User navigation handler */
function handler(sections) {
  sections.forEach(section => {
      if (section.isIntersecting) {
        const targetSection = section.target;
        const targetSectionId = targetSection.getAttribute(`id`);
        updateMenuState(targetSectionId);
        updateSectionState(targetSectionId);
      }
    }
  );
}

/* Subscribe to user navigation */
function subscribeToViewport() {
  const sectionList = getSectionList();
  const observer = new IntersectionObserver(handler, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  });
  sectionList.forEach((element) => {
    observer.observe(element);
  });
}