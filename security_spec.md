# Security Specification - Canvas of Dreams

## Data Invariants
- A booking request must have valid contact info and a vision.
- Only the creator (artist) or admins can edit blog posts.
- Booking requests are only readable by the studio (admins/artists), but anyone can create one.

## The Dirty Dozen Payloads (Rejection Tests)
1. **Identity Spoofing**: Attempt to create a booking request but setting `status` to 'completed' immediately.
2. **Identity Spoofing**: Attempt to update someone else's booking request.
3. **Identity Spoofing**: Attempt to create a blog post as a non-authenticated user.
4. **State Shortcutting**: Attempt to update booking status from 'pending' to 'completed' without the intermediate steps (if flow was enforced, but here we just need to ensure only staff can do it).
5. **Resource Poisoning**: Document ID with 2KB of junk characters.
6. **Resource Poisoning**: Vision field in booking request with 2MB of text.
7. **Shadow Update**: Adding `isVerified: true` to a booking request.
8. **PII Leak**: Authenticated user (non-admin) trying to list all `bookingRequests`.
9. **Timestamp Spoof**: Client-provided `createdAt` date from 2010.
10. **Type Poisoning**: Sending an integer for the `vision` string field.
11. **Orphaned Write**: Creating a blog post with a non-existent `authorId`.
12. **Immortal Field Breach**: Attempting to change `createdAt` on an existing booking request.

## Test Runner logic
- `collection('bookingRequests').add(payload)` -> `PERMISSION_DENIED` if payload is malicious.
- `doc('bookingRequests/123').update({status: 'completed'})` -> `PERMISSION_DENIED` if not admin.
