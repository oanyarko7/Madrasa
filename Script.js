// Functionality for all pages
(function(){
  const toggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navList = document.getElementById('navList');
  
  // --- Mobile Menu Toggle Logic (Updated for Smooth Animation) ---
  
  // Function to toggle the menu using the CSS .open class
  function toggleMenu() {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      
      // CRITICAL CHANGE: Toggles the 'open' class to trigger the CSS transition (animation)
      mobileMenu.classList.toggle('open'); 
  }
  
  // Function to explicitly close the menu after a link is clicked
  function closeMenu() {
      // Only run if the menu is currently open
      if (toggle.getAttribute("aria-expanded") === "true") {
          toggle.setAttribute("aria-expanded", "false");
          mobileMenu.classList.remove('open'); 
      }
  }

  // Builds the mobile menu by cloning the desktop list and adding link listeners
  function buildMobileMenu(){
    if(!mobileMenu || !navList) return;
    mobileMenu.innerHTML = "";
    const mobileList = navList.cloneNode(true);
    mobileMenu.appendChild(mobileList);
    
    // Add event listeners to close menu when a link is clicked
    mobileList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
  }
  buildMobileMenu();
  
  if (toggle) {
    // Attaches the class-toggling function to the button
    toggle.addEventListener('click', toggleMenu);
  }


  // --- Scroll Animation (Intersection Observer) ---
  // This efficiently checks if an element is in view to add the 'is-visible' class
  if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Stop observing once the element is visible
            observer.unobserve(entry.target); 
          }
        });
      }, {
        // Check if element is 10% visible
        threshold: 0.1 
      });

      // Target all elements with the 'animate-card' class on the current page
      document.querySelectorAll('.animate-card').forEach(card => {
        observer.observe(card);
      });
  } else {
      // Fallback for older browsers: show all elements immediately
      document.querySelectorAll('.animate-card').forEach(card => {
          card.classList.add('is-visible');
      });
  }
})();