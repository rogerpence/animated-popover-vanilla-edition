// Editorial popover logic: open, close, light dismiss, accessibility (JS-only)
document.addEventListener("DOMContentLoaded", () => {
    const popover = document.getElementById("pop");
    const showBtn = document.querySelector(".show-popover-btn");
    const closeBtn = document.querySelector(".close-popover-btn");

    function showPopover() {
        popover.classList.remove("popover-hidden", "popover-animating-out");
        popover.classList.add("popover-visible", "popover-animating-in");
        showBtn.setAttribute("aria-expanded", "true");
        // Remove animating-in after animation
        popover.addEventListener("animationend", function handler(e) {
            if (e.animationName === "popover-fade-in") {
                popover.classList.remove("popover-animating-in");
                popover.removeEventListener("animationend", handler);
            }
        });
        closeBtn.focus();
    }

    function closePopover() {
        popover.classList.remove("popover-animating-in");
        popover.classList.add("popover-animating-out");
        showBtn.setAttribute("aria-expanded", "false");
        // Wait for animation to finish before hiding
        popover.addEventListener("animationend", function handler(e) {
            if (e.animationName === "popover-fade-out") {
                popover.classList.remove(
                    "popover-visible",
                    "popover-animating-out",
                );
                popover.classList.add("popover-hidden");
                popover.removeEventListener("animationend", handler);
                showBtn.focus();
            }
        });
    }

    showBtn.addEventListener("click", showPopover);
    closeBtn.addEventListener("click", closePopover);

    // Light dismiss: click outside or press Escape
    document.addEventListener("pointerdown", (e) => {
        if (popover.classList.contains("popover-visible")) {
            if (!popover.contains(e.target) && e.target !== showBtn) {
                closePopover();
            }
        }
    });
    document.addEventListener("keydown", (e) => {
        if (
            popover.classList.contains("popover-visible") &&
            e.key === "Escape"
        ) {
            closePopover();
        }
    });
});
