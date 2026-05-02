# Release Notes-Version 4.3.2
_Date: 2025-10-07_

## Highlights
Version 5.0 strengthens platform usability, performance, and administrative control.
It introduces a configurable login experience, enhanced access control handling, new options for UI visibility management, and background threading for faster system readiness.
This release also simplifies group management workflows and ensures continued compatibility with the latest Semoss core through targeted bug fixes and infrastructure updates.

## New Features & Enhancements
- **Custom Login Page [PR #126]**  
  Added a configurable login page supporting redirects to external authentication endpoints. Updated Maven WAR packaging to include the new login directory.

- **Access Denied Page [PR #132]**  
  Introduced a dedicated 403 “Access Denied” page with styled layout and clear administrator contact guidance.

- **Admin Menu Configuration [PR #129]**  
  Added new configuration flags (`adminOnlyViewMenuBar`, `adminOnlyNonApprovedFlag`) that let administrators hide or show the side-menu bar and non-approved catalog items in the SEMOSS app.

- **Group Management Refactor [PR #130]**  
  Simplified group authorization by removing legacy `isCustomGroup` handling. Added an authenticated `editGroupDetails` endpoint and streamlined validation messages.

- **Background Image Folder Sync [PR #134]**  
  Optimized container startup by launching background threads to pre-fetch engine and project image folders asynchronously.

## Bug Fixes
- **Method Renames for Semoss Integration [PR #136]**  
  Updated `FileUploader` references to align with recent `AssetUtility` method name changes, ensuring compatibility with the latest Semoss core.
