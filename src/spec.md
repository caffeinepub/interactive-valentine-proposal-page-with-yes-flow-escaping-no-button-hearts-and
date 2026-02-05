# Specification

## Summary
**Goal:** Update the Valentine proposal flow to use the name “Suzanne The Nazareth” and show the provided photo after the user clicks YES.

**Planned changes:**
- Change the initial proposal headline text to exactly: “Will you be my Valentine, Suzanne The Nazareth?” and remove any remaining “Miss Nazareth” text from the UI.
- Add `aman_suz_pic.jpeg` to publicly served frontend static assets and reference it via a stable URL.
- Update the YES flow so it proceeds through the existing celebration/meme stage and then shows `aman_suz_pic.jpeg` as the final image, with responsive styling that works on mobile and avoids overflow/scroll issues.

**User-visible outcome:** The opening screen asks “Will you be my Valentine, Suzanne The Nazareth?”, and after clicking YES the app celebrates and then reliably displays the provided photo as the final screen (including after refresh).
