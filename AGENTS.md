<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code[...] 
<!-- END:nextjs-agent-rules -->

# CAPS Brand Frontend Redesign PRD

## Project

Complete redesign of the CAPS Brand ecommerce frontend.

This is **NOT** a landing page redesign.

This is **NOT** an NFT website.

This is **NOT** a crypto/Web3 interface.

This is a premium fashion ecommerce platform selling caps and apparel.

The final experience should resemble brands like:

- Nike
- ASOS
- Zara
- COS
- H&M
- Uniqlo
- New Era
- Aime Leon Dore
- Fear of God Essentials

The website should immediately communicate premium quality, fashion, and shopping.

---

# Primary Goal

Rewrite the complete frontend while keeping all existing backend APIs, authentication, business logic, database models, and endpoints unchanged.

Only redesign the UI, UX, components, layouts, and interactions.

---

# Design Direction

The website should feel like a luxury direct-to-consumer fashion brand.

Design keywords:

- Minimal
- Editorial
- Premium
- Luxury
- Modern
- Clean
- Spacious
- Elegant
- Product-focused

Avoid:

- NFT style
- Crypto style
- Gaming UI
- Glassmorphism
- Huge fullscreen background images
- Web3 navigation
- Hero-only landing pages
- Random floating elements
- Excessive gradients
- Neon colors

Everything should feel like Apple designed a fashion ecommerce platform.

---

# Color System

Primary

Black
#111111

Background

#FFFFFF

Secondary Background

#F8F8F8

Card

#FFFFFF

Border

#ECECEC

Muted Text

#6B7280

Success

#16A34A

Sale

#DC2626

Never use colorful gradients.

---

# Typography

Use

Inter

or

SF Pro Display

Weights

300

400

500

600

700

Heading spacing should be generous.

Body text should remain readable.

Maintain strong visual hierarchy.

---

# Layout System

Desktop Container

1440px

Content Width

1320px

Desktop Padding

64px

Tablet

32px

Mobile

20px

Every section should stay inside the container.

Never stretch content edge-to-edge.

---

# Header

Height

80px

Sticky

Yes

Transparent initially.

After scrolling

White background

Soft shadow

Navigation

----------------------------------------------------

Logo

Shop

Collections

New Arrivals

Best Sellers

About

Contact

Search

Wishlist

Cart

Profile

----------------------------------------------------

No floating pill navigation.

No Web3 wallet buttons.

Navigation should resemble Nike or Zara.

---

# Homepage Structure

The homepage should follow this exact order.

Hero Banner

↓

Categories

↓

Featured Collection

↓

Trending Products

↓

New Arrivals

↓

Limited Edition Banner

↓

Best Sellers

↓

Featured Brands

↓

Customer Reviews

↓

Instagram Gallery

↓

Newsletter

↓

Footer

Never create a fullscreen hero that occupies the entire page.

Users should see products after one scroll.

---

# Hero Section

Maximum Height

40% viewport height

Split Layout

Left

40%

Right

60%

Left

Headline

Premium Caps
Built For Everyday Style

Short description

Primary CTA

Shop Collection

Secondary CTA

View New Arrivals

Right

Large premium lifestyle image

Rounded corners

Subtle motion

No fullscreen background image.

---

# Categories Section

Desktop

6 category cards

Caps

Snapback

Baseball

Dad Cap

Beanies

Limited Edition

Each card

Large image

Rounded corners

Title

Product count

Hover zoom

Soft shadow

Mobile

Horizontal scroll

---

# Featured Collection

Two-column editorial layout.

Large campaign image.

Collection description.

CTA

Explore Collection

Alternating layouts for different collections.

---

# Product Grid

Desktop

4 columns

Tablet

3 columns

Mobile

2 columns

Every product card contains

Product image

Wishlist

Brand

Title

Price

Sale price

Rating

Available colors

Quick Add button

Hover interaction

Second product image

Lift animation

Image zoom

Quick add appears

---

# Product Detail Page

Desktop Layout

--------------------------------------------------

Gallery (55%)

Information (45%)

--------------------------------------------------

Gallery

Vertical thumbnails

Large image

Zoom

Fullscreen viewer

Information

Brand

Product title

Rating

Price

Discount

Description

Color selector

Size selector

Quantity selector

Add to Cart

Buy Now

Delivery information

Returns

Share

Below

Related Products

Recently Viewed

Reviews

FAQ

Sticky Add to Cart

Yes

---

# Shop Page

Layout

Sidebar Filters

25%

Products

75%

Sidebar

Price

Brand

Material

Color

Availability

Size

Rating

Sort Options

Newest

Best Selling

Lowest Price

Highest Price

Alphabetical

---

# Search

Fullscreen overlay

Recent searches

Trending products

Categories

Live suggestions

Keyboard navigation

Instant filtering

ESC closes search

---

# Wishlist

Grid layout

Move to cart

Remove

Recommendations

Empty state illustration

---

# Cart

Desktop

Slide-in drawer

Right side

450px width

Sections

Products

Coupon

Shipping

Tax

Order Summary

Checkout

Recommended Products

---

# Checkout

Progress

Shipping

↓

Payment

↓

Review

↓

Confirmation

Minimal layout

Large spacing

Clear hierarchy

---

# Account Dashboard

Sidebar

Orders

Wishlist

Addresses

Returns

Settings

Notifications

Main Content

Profile

Recent Orders

Recommendations

Statistics

---

# Footer

Large premium footer

Four columns

Shop

Company

Support

Legal

Newsletter

Social icons

Bottom bar

Copyright

Privacy

Terms

---

# Components

Create reusable components.

Navbar

Hero

Section

Category Card

Collection Banner

Product Card

Product Grid

Filter Sidebar

Search Overlay

Wishlist Button

Cart Drawer

Image Gallery

Review Card

Newsletter

Footer

Button

Input

Badge

Modal

Drawer

Accordion

Tabs

Skeleton Loader

Toast

Breadcrumb

Pagination

Every component should be reusable.

---

# Motion

Use Framer Motion.

Animations

Fade

Slide

Scale

Lift

Image zoom

Button hover

Drawer slide

Modal fade

Transitions should be subtle.

Duration

200ms

300ms

400ms

Never use excessive animations.

---

# Responsive Design

Desktop

1440+

Laptop

1024

Tablet

768

Mobile

390

Everything must be mobile-first.

Bottom navigation only on mobile.

---

# Performance

Lazy loading

Image optimization

Code splitting

React Suspense

Lighthouse Score above 95

No layout shifts

Fast initial load

---

# Accessibility

Semantic HTML

ARIA labels

Keyboard navigation

Visible focus states

AA color contrast

Screen reader support

---

# Folder Structure

src/

app/

components/

layout/

home/

shop/

product/

checkout/

account/

common/

hooks/

services/

lib/

styles/

animations/

assets/

types/

---

# Critical Rules

DO NOT build a landing page.

DO NOT create an NFT website.

DO NOT create a crypto interface.

DO NOT use Web3 components.

DO NOT use wallet buttons.

DO NOT use fullscreen background images.

DO NOT place text on busy backgrounds.

DO NOT create oversized hero sections.

DO NOT hide products below multiple sections.

DO NOT invent new backend APIs.

DO NOT modify backend logic.

Maintain compatibility with all existing backend endpoints.

---

# Expected Result

The final product should feel like a premium ecommerce website similar to Nike, Zara, ASOS, or COS.

The homepage should encourage shopping immediately.

Products should always remain the primary focus.

The interface should feel clean, luxurious, responsive, fast, and production-ready.

Every page should share the same design language, spacing, typography, component system, and interaction patterns.

The result should be indistinguishable from a professionally designed ecommerce storefront.
