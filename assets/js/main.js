document.addEventListener("DOMContentLoaded", () => {
    // UI Navigation Interface Elements
    const hamburger = document.getElementById("hamburger");
    const mobileOverlay = document.querySelector(".mobile-nav-overlay");
    const closeMenu = document.querySelector(".close-mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-nav-overlay a");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    // Contrast Theme Selection Channels
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector("i");

    // Ambient Particle Container Mapping
    const particleContainer = document.getElementById("ambient-particles");

    /* ==========================================
       1. INTERACTIVE LIGHT / DARK THEME ENGINE
       ========================================== */
    const currentSavedTheme = localStorage.getItem("system-theme") || "dark";
    htmlElement.setAttribute("data-theme", currentSavedTheme);
    updateThemeInterfaceIcon(currentSavedTheme);

    themeToggle.addEventListener("click", () => {
        const targetTheme = htmlElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        htmlElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("system-theme", targetTheme);
        updateThemeInterfaceIcon(targetTheme);
    });

    function updateThemeInterfaceIcon(theme) {
        if (theme === "light") {
            themeIcon.className = "bx bx-sun";
        } else {
            themeIcon.className = "bx bx-moon";
        }
    }

    /* ==========================================
       2. AMBIENT BACKGROUND PARTICLE EMITTER
       ========================================== */
    function generateBackgroundNetworkNodes() {
        const maxNodesCount = window.innerWidth < 768 ? 15 : 35;
        for (let idx = 0; idx < maxNodesCount; idx++) {
            const particleNode = document.createElement("div");
            particleNode.className = "bg-node-particle";

            const nodeSize = Math.random() * 4 + 2;
            particleNode.style.width = `${nodeSize}px`;
            particleNode.style.height = `${nodeSize}px`;
            particleNode.style.left = `${Math.random() * 100}vw`;

            particleNode.style.animationDelay = `${Math.random() * 12}s`;
            particleNode.style.animationDuration = `${Math.random() * 8 + 8}s`;

            particleContainer.appendChild(particleNode);
        }
    }
    generateBackgroundNetworkNodes();

    /* ==========================================
       3. TACTICAL MOBILE MENU PANEL HOOKS
       ========================================== */
    if (hamburger && mobileOverlay) {
        hamburger.addEventListener("click", () => {
            mobileOverlay.classList.add("active");
            document.body.style.overflow = "hidden"; // Locks viewport scroll while browsing menu
        });
    }

    const dismissMenu = () => {
        mobileOverlay.classList.remove("active");
        document.body.style.overflow = ""; // Restores base document scrolling
    };

    if (closeMenu) {
        closeMenu.addEventListener("click", dismissMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener("click", dismissMenu);
    });

    // ScrollSpy active indicators tracking
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 240)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    /* ==========================================
       4. BLOG SIDEBAR MODAL LOGIC
       ========================================== */
    const blogNodes = document.querySelectorAll(".blog-node");
    const blogSidebarModal = document.getElementById("blog-sidebar-modal");
    const closeBlogSidebarBtn = document.getElementById("close-blog-sidebar");
    const blogModalDate = document.getElementById("blog-modal-date");
    const blogModalTitle = document.getElementById("blog-modal-title");
    const blogModalBody = document.getElementById("blog-modal-body");

    if (blogSidebarModal) {
        blogNodes.forEach(node => {
            // Make the whole card act like a button
            node.style.cursor = "pointer";
            
            node.addEventListener("click", (e) => {
                // Prevent link default if clicking on the "Read Log _" link
                if(e.target.tagName.toLowerCase() === 'a') {
                    e.preventDefault();
                }

                const dateText = node.querySelector(".blog-date")?.textContent || "";
                const titleText = node.querySelector("h3")?.textContent || "";
                const summaryText = node.querySelector("p")?.textContent || "";

                blogModalDate.textContent = dateText;
                blogModalTitle.textContent = titleText;
                
                // Mocking full content based on summary
                blogModalBody.innerHTML = `
                    <p><strong>Abstract:</strong> ${summaryText}</p>
                    <p>In this architectural log, we explore the intricate details and design decisions behind ${titleText.toLowerCase()}. Engineering high-performance mobile systems requires strict adherence to clean architecture principles and a deep understanding of the underlying frameworks.</p>
                    <p>We encountered several bottlenecks during the initial prototyping phase, primarily related to state synchronization and frame rendering times. By profiling the application using native dev tools, we isolated the heavy computational tasks.</p>
                    <p><strong>Key Takeaways:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-bottom: 1.2rem; color: var(--text-dim);">
                        <li>Always decouple business logic from the UI layer.</li>
                        <li>Utilize background isolates for heavy data parsing.</li>
                        <li>Implement robust error boundaries and fallback UI states.</li>
                    </ul>
                    <p>For more detailed code snippets and repository access, please refer to the internal documentation server.</p>
                `;

                blogSidebarModal.classList.add("active");
                document.body.style.overflow = "hidden"; // Lock background scroll
            });
        });

        const closeBlogModal = () => {
            blogSidebarModal.classList.remove("active");
            document.body.style.overflow = ""; // Restore scroll
        };

        if (closeBlogSidebarBtn) {
            closeBlogSidebarBtn.addEventListener("click", closeBlogModal);
        }

        // Close when clicking outside the sidebar content
        blogSidebarModal.addEventListener("click", (e) => {
            if (e.target === blogSidebarModal) {
                closeBlogModal();
            }
        });
    }
});