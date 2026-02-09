

# Admin Authentication System and Dashboard Integration

## Overview
This plan covers three major areas: (1) database setup for admin roles and expanded RLS policies, (2) admin login/auth UI, and (3) connecting the admin dashboard pages to live database data.

## Phase 1: Database Migration

Create the admin role-based access control schema and update RLS policies on all tables:

- Create `app_role` enum with values: `admin`, `moderator`, `user`
- Create `user_roles` table linking `auth.users(id)` to roles
- Create `has_role()` security definer function for safe RLS checks
- Add RLS policies on `user_roles` (users see own roles, admins manage all)
- Add admin CRUD policies on: `tours`, `categories`, `locations`, `bookings`, `reviews`, `tour_pricing_options`
- Update the `tours` SELECT policy so admins can see all tours (not just active ones)

After migration, manually insert an admin role for a designated user account.

## Phase 2: Admin Authentication UI

### New files:
- **`src/pages/AdminLogin.tsx`** -- Login form with email/password, styled to match the admin theme. Uses `supabase.auth.signInWithPassword()`. Redirects to `/admin` on success.
- **`src/hooks/useAuth.ts`** -- Auth hook providing `user`, `session`, `isAdmin`, `signIn`, `signOut`, and `loading` state. Checks `user_roles` table for admin role after login.
- **`src/components/admin/ProtectedRoute.tsx`** -- Wrapper component that checks authentication and admin role. Redirects to `/admin/login` if not authenticated or not an admin.

### Changes:
- **`src/App.tsx`** -- Add `/admin/login` route. Wrap all `/admin/*` routes with `ProtectedRoute`.
- **`src/components/admin/AdminHeader.tsx`** -- Add user info display and logout button.

## Phase 3: Connect Admin Pages to Database

### `src/hooks/useAdminTours.ts` (new)
- `useAdminTours()` -- Fetch all tours (including drafts) with category/location joins
- `useCreateTour()` -- Insert mutation
- `useUpdateTour()` -- Update mutation
- `useDeleteTour()` -- Delete mutation

### `src/hooks/useAdminBookings.ts` (new)
- `useAdminBookings()` -- Fetch all bookings with tour name joins
- `useUpdateBookingStatus()` -- Update booking status/payment mutations

### `src/hooks/useAdminReviews.ts` (new)
- `useAdminReviews()` -- Fetch all reviews (including pending/rejected)
- `useUpdateReviewStatus()` -- Approve/reject mutations
- `useDeleteReview()` -- Delete mutation

### Page updates:
- **`src/pages/Tours.tsx`** -- Replace mock `tours` array with `useAdminTours()`. Wire search/filter/delete actions to real data. Stats cards show live counts.
- **`src/pages/Bookings.tsx`** -- Replace `mockBookings` with `useAdminBookings()`. Wire status update and payment actions. Stats cards show live aggregates.
- **`src/pages/Reviews.tsx`** -- Replace mock `reviews` with `useAdminReviews()`. Wire approve/reject/delete actions. Tabs filter by status. Stats show live counts.
- **`src/pages/Dashboard.tsx`** -- Replace static stats with aggregated data from bookings/tours/reviews tables.
- **`src/pages/tours/EditTour.tsx`** -- Load existing tour data when editing (via URL param), save to database on submit.

## Technical Details

### Auth flow
```text
User visits /admin
  -> ProtectedRoute checks session
  -> No session? Redirect to /admin/login
  -> Has session? Check user_roles for 'admin' role
  -> Not admin? Show "Access Denied" message
  -> Is admin? Render admin page
```

### RLS policy pattern for admin access
```sql
CREATE POLICY "Admins can manage tours"
ON public.tours
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
```

### Admin tours query (bypasses active-only filter via admin RLS)
```typescript
const { data } = await supabase
  .from("tours")
  .select("*, category:categories(*), location:locations(*)")
  .order("created_at", { ascending: false });
```

### File changes summary
| Action | File |
|--------|------|
| Create | `src/pages/AdminLogin.tsx` |
| Create | `src/hooks/useAuth.ts` |
| Create | `src/components/admin/ProtectedRoute.tsx` |
| Create | `src/hooks/useAdminTours.ts` |
| Create | `src/hooks/useAdminBookings.ts` |
| Create | `src/hooks/useAdminReviews.ts` |
| Edit | `src/App.tsx` |
| Edit | `src/components/admin/AdminHeader.tsx` |
| Edit | `src/pages/Tours.tsx` |
| Edit | `src/pages/Bookings.tsx` |
| Edit | `src/pages/Reviews.tsx` |
| Edit | `src/pages/Dashboard.tsx` |
| Edit | `src/pages/tours/EditTour.tsx` |
| Migration | Database schema for roles + RLS policies |

