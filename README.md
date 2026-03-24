# Animated Toast Popover Component

A distinctive, animated toast popover for web apps, designed with bold editorial style and smooth entry/exit transitions. Features include:

- **Manual or auto-close** (configurable)
- **Animated open/close** with CSS transitions
- **Light dismiss** (click outside or press Escape)
- **Accessible** (focus management, ARIA)
- **Optional progress bar** for auto-close, flowing right-to-left

---

## Usage

### 1. Add the Files

Copy these files into your project:

- `index.html` (see markup below)
- `main.css` (styling and animation)
- `main.js` (logic)

### 2. HTML Structure

```
<main>
  <button class="show-popover-btn" popovertarget="pop" aria-controls="pop" aria-haspopup="dialog" aria-expanded="false">Show Popover</button>
  <div id="pop" role="dialog" aria-modal="true" aria-labelledby="pop-title" class="popover-hidden">
    <div class="popover-content">
      <h2 id="pop-title">Special Toast Message</h2>
      <p>This is a bold, editorial popover. Click outside or the button below to close.</p>
      <button class="close-popover-btn" aria-label="Close popover">×</button>
      <div id="popover-progress" class="popover-progress" hidden>
        <div class="popover-progress-bar"></div>
      </div>
    </div>
  </div>
</main>
<script src="./main.js"></script>
```

### 3. CSS Styling

- Import `main.css` in your HTML `<head>`:
  ```html
  <link rel="stylesheet" href="main.css">
  ```
- The CSS uses custom fonts and gradients for a bold look.
- The popover is centered and animated with fade/slide transitions.
- The progress bar is styled and animates right-to-left when auto-close is enabled.

### 4. JavaScript Logic

- Import `main.js` after your HTML content.
- The script manages:
  - Showing/hiding the popover
  - Focus and accessibility
  - Light dismiss (click outside or Escape)
  - Auto-close timer and progress bar

#### Configuration

In `main.js`:
```js
const AUTO_CLOSE_SECONDS = 4; // Set to 0 or less to disable auto-close
const PROGRESS_REFRESH_MS = 50; // Progress bar update interval (ms)
```
- **AUTO_CLOSE_SECONDS**: Number of seconds before the popover auto-closes. Set to 0 or less to disable auto-close and hide the progress bar.
- **PROGRESS_REFRESH_MS**: How often the progress bar updates (smaller = smoother).

### 5. Accessibility

- The popover uses `role="dialog"`, `aria-modal`, and `aria-labelledby`.
- Focus is trapped to the close button when open, and returned to the trigger button when closed.
- Keyboard and pointer dismiss supported.

### 6. Customization

- **Message**: Change the heading and paragraph inside `.popover-content`.
- **Auto-close**: Adjust `AUTO_CLOSE_SECONDS` in `main.js`.
- **Animation**: Edit keyframes and transitions in `main.css` for different effects.
- **Progress Bar**: Style `.popover-progress` and `.popover-progress-bar` in CSS.

### 7. Example

![Demo Screenshot](screenshot.png)

---

## Credits
- Design and animation inspired by modern editorial UI trends.
- Animation techniques based on [LogRocket's CSS popover animation guide](https://blog.logrocket.com/animating-dialog-popover-css-starting-style/).

---

## License
See LICENSE.txt for details.
