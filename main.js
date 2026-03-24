// Editorial popover logic: open, close, light dismiss, accessibility (JS-only)
document.addEventListener("DOMContentLoaded", () => {
    const AUTO_CLOSE_SECONDS = 4; // Change this value for different auto-close durations
    const PROGRESS_REFRESH_MS = 30; // Milliseconds between progress bar updates
    const popover = document.getElementById("pop");
    const showBtn = document.querySelector(".show-popover-btn");
    const closeBtn = document.querySelector(".close-popover-btn");
    const progressContainer = document.getElementById("popover-progress");
    const progressBar = document.querySelector(".popover-progress-bar");
    let autoCloseTimer = null;
    let progressTimer = null;
    let progressStart = null;

    function clearAutoCloseTimer() {
        if (autoCloseTimer) {
            clearTimeout(autoCloseTimer);
            autoCloseTimer = null;
        }
        if (progressTimer) {
            clearInterval(progressTimer);
            progressTimer = null;
        }
        if (progressBar) {
            progressBar.style.width = "100%";
        }
        if (progressContainer) {
            progressContainer.hidden = true;
        }
    }

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
        clearAutoCloseTimer();
        if (AUTO_CLOSE_SECONDS > 0) {
            if (progressContainer) progressContainer.hidden = false;
            progressStart = Date.now();
            progressBar.style.width = "100%";
            progressTimer = setInterval(() => {
                const elapsed = (Date.now() - progressStart) / 1000;
                const percent = Math.max(0, 1 - elapsed / AUTO_CLOSE_SECONDS);
                progressBar.style.width = percent * 100 + "%";
            }, PROGRESS_REFRESH_MS);
            autoCloseTimer = setTimeout(() => {
                closePopover();
            }, AUTO_CLOSE_SECONDS * 1000);
        } else {
            if (progressContainer) progressContainer.hidden = true;
        }
    }

    function closePopover() {
        clearAutoCloseTimer();
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
                if (progressContainer) progressContainer.hidden = true;
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
