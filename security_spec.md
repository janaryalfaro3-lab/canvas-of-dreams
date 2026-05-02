# Security Specification for Canvas of Dreams

## Data Invariants
- A `GalleryItem` must have a valid title, category (from allowed list), artist name, and a valid image URL.
- `likesCount` on a `GalleryItem` can only be incremented.
- A `Booking` must have a valid email, full name, and creation timestamp.
- User email in `Booking` must match the format.

## The Dirty Dozen (Attack Vectors)
1.  **Anonymous Delete**: Unauthorized user trying to delete a gallery item.
2.  **Shadow Update**: Adding a `visibility: hidden` field to a public document.
3.  **PII Leak**: Listing everyone's booking inquiries.
4.  **Identity Spoofing**: Submitting a booking as another person's email. (Requires Auth eventually, for now we restrict `get` by ID if ID is sensitive).
5.  **Timestamp Poisoning**: Setting a booking's `createdAt` to 2077.
6.  **Negative Likes**: Setting `likesCount` to -999.
7.  **Junk ID**: Creating a document with a 2MB string as ID.
8.  **Empty Injection**: Creating a Booking with empty name/email.
9.  **Type Collision**: Setting `likesCount` to a string "NaN".
10. **State Shortcut**: Setting booking status directly to "completed" on submission.
11. **Email Spoofing (if auth present)**: Using a known admin email without verification.
12. **Mass Scrape**: Listing all bookings to harvest emails.

## Test Strategy
- Verified via `firestore.rules.test.ts` (conceptual).
- Deny all by default.
- Allow public read/list for `gallery_items` but validate `resource.data.artist`.
- Allow public create for `bookings` with strict schema.
- Deny read for `bookings` except for the submitted inquiry if we had a way to track, otherwise restrict to `isAdmin()`.
