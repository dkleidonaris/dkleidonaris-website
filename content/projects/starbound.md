---
title: StarBound
description: Official bilingual platform for the StarBound aerospace research team, built with a decoupled Nuxt frontend and Laravel REST API.

date: 2026-01-01
category: Web Development

tags:
  - Aerospace
  - REST API
  - Headless
  - Multilingual
  - University

stack:
  - Nuxt
  - Vue.js
  - Tailwind CSS
  - Laravel
  - REST API

cover: /images/projects/starbound/cover.webp

gallery:
  - src: /images/projects/starbound/home.webp
    alt: StarBound homepage

  - src: /images/projects/starbound/team.webp
    alt: StarBound team and members

  - src: /images/projects/starbound/projects.webp
    alt: StarBound projects and activities

featured: true
order: 2

client: StarBound
year: 2026

website: https://starbound.e-ce.uth.gr/
github: https://github.com/dkleidonaris/starbound
status: completed
---

## Overview

StarBound is the official digital platform of **StarBound**, a student aerospace research team based at the University of Thessaly in Volos, Greece.

The website presents the team's identity, activities, members, projects, news and supporters through a modern bilingual interface available in Greek and English.

## The challenge

The platform needed to bring together different types of content — from team members and research activities to projects, news and supporters — while remaining easy to extend as the team grows.

Rather than building the website as a single monolithic application, the goal was to create a clear separation between the public-facing experience and the underlying data layer.

## The solution

I developed StarBound using a **decoupled frontend/backend architecture**.

The public-facing application is built with **Nuxt and Vue.js**, while a separate **Laravel backend** provides application data through a REST API.

This separation allows the frontend and backend to evolve independently and creates a reusable API layer that can support additional applications or integrations in the future.

## Frontend

The frontend is built with **Nuxt, Vue.js and Tailwind CSS**, providing a responsive interface for presenting the team and its work.

The platform supports both **Greek and English**, allowing the team to communicate with both its local academic community and a broader international audience.

## Backend & REST API

A dedicated Laravel application acts as the backend of the platform.

Instead of rendering the public website directly, Laravel exposes the required data through a **REST API**, which is consumed by the Nuxt frontend.

The project is therefore organised into two distinct applications:

- `frontend/` — Nuxt web application
- `backend/` — Laravel REST API

This architecture keeps presentation concerns separate from data and backend functionality.

## Extensible architecture

The REST API is not tied exclusively to the current website.

Because the data layer is exposed independently from the Nuxt frontend, the backend can also support future external applications and integrations without requiring the core content architecture to be rebuilt.

## Technology

The user-facing application is developed with **Nuxt and Vue.js**, with **Tailwind CSS** providing the responsive visual system.

**Laravel** powers the backend and exposes application data through a **REST API** consumed by the Nuxt application.

## Result

The result is a bilingual digital platform that gives StarBound a central place to present its team, aerospace activities, projects, news and supporters.

Beyond the website itself, the decoupled Nuxt and Laravel architecture provides a flexible technical foundation that can support the team's future digital needs.
