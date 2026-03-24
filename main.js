// Editorial popover logic: open, close, light dismiss, accessibility (JS-only)
document.addEventListener("DOMContentLoaded", () => {
    const popover = document.getElementById("pop");
    const showBtn = document.querySelector(".show-popover-btn");
    const closeBtn = document.querySelector(".close-popover-btn");

    function showPopover() {
        popover.classList.remove("popover-hidden");
        popover.classList.add("popover-visible");
        showBtn.setAttribute("aria-expanded", "true");
        closeBtn.focus();
    }

    function closePopover() {
        popover.classList.remove("popover-visible");
        popover.classList.add("popover-hidden");
        showBtn.setAttribute("aria-expanded", "false");
        showBtn.focus();
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
