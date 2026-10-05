---
title: Model European Union Berlin
description: A complete digital ecosystem for Model European Union Berlin, combining a Laravel Livewire web platform, REST API and native mobile applications for managing the simulation and its legislative workflow.

date: 2026-01-01
category: Web & Mobile Applications

tags:
  - Event Platform
  - Mobile Apps
  - REST API
  - Legislative Workflow
  - Role-Based Access
  - Push Notifications
  - Real-Time Event Tools

stack:
  - Laravel
  - Livewire
  - REST API
  - Native Mobile
  - MySQL

cover: /images/projects/meu/cover.webp

gallery:
  - src: /images/projects/meu-berlin/web.webp
    alt: Model European Union Berlin web platform

  - src: /images/projects/meu-berlin/mobile.webp
    alt: MEU Mobile application

  - src: /images/projects/meu-berlin/amendments.webp
    alt: Legislative amendments management interface

  - src: /images/projects/meu-berlin/schedule.webp
    alt: MEU Berlin event schedule

  - src: /images/projects/meu-berlin/voting.webp
    alt: Voting and simulation management tools

featured: true
order: 1

client: Model European Union Berlin
year: "2025–2026"

status: completed
---

## Overview

**Model European Union Berlin** is a large-scale simulation of the European Union's decision-making process.

I developed a digital ecosystem designed to support both the organisation of the event and the participants taking part in the simulation.

The system combines a **Laravel and Livewire web platform**, an API supporting external clients, and **MEU Mobile**, a native mobile companion that puts the simulation's resources, schedule and interactive tools directly into participants' hands.

Together, these applications support participants before and during the event — from preparation and political research to amendments, negotiations, voting and event management.

## The challenge

MEU Berlin involves participants with very different responsibilities, including Members of the European Parliament, Ministers, Presidents, Chairs, Legal and Political Advisors, organisers and journalists.

Each role needs access to different information and actions throughout the simulation.

The platform therefore had to go beyond conventional event management and reproduce parts of an actual legislative workflow while remaining accessible to participants who need to make decisions quickly during live sessions.

At the same time, the system needed to connect the public website, internal management tools and mobile applications through a common backend architecture.

## The platform

The core platform is built with **Laravel and Livewire**.

It provides the web-based tools required to manage the simulation, its participants and the legislative process.

A dedicated API extends the platform beyond the web interface and provides the backend services required by the native mobile applications.

This creates a common application and data layer across the MEU digital ecosystem.

## MEU Mobile

**Prepare. Debate. Negotiate. And stay one step ahead.**

MEU Mobile is the participant's all-in-one companion for Model European Union Berlin.

The application brings together preparation resources, event information and interactive simulation tools so participants can access what they need throughout the event directly from their mobile devices.

## Preparation resources

Participants can access a collection of resources designed to help them understand both the simulation and the political positions they represent.

The **Positions Cheat Sheet** provides quick access to the positions of EU Member States and political groups on key issues, including EU governance, spending, geopolitics and the future of the European Union.

**Topic Briefs** provide concise introductions to the subjects being debated, while **Guides** explain the simulation and the responsibilities associated with individual roles.

Essential event contacts are also available directly within the application.

## Schedule

The complete MEU programme is available through an integrated schedule.

Participants can browse individual event days, session times, locations and descriptions without having to rely on separate documents or external schedules.

Locations are connected to **Google Maps**, making it easy for participants to navigate between venues throughout Berlin.

## Legislative workflow

One of the core parts of the platform is the **Amendments Panel**, which brings the legislative process directly into the digital environment.

Participants can submit amendments, review their proposals, make changes and remove submissions when necessary.

Legal and Political Advisors have additional tools that allow them to review, modify, reject and reorder amendments as the legislative process develops.

The result is a structured amendment workflow that supports the progression of proposals from submission through review and ultimately to debate and voting.

## Voting

Presidents and Chairs have access to a dedicated **Voting Panel**.

During the simulation, they can record whether amendments have passed or failed, allowing legislative decisions made during sessions to be reflected directly within the platform.

This connects participant submissions, advisor review and voting into a single digital workflow.

## Role-based tools

The platform provides functionality according to each participant's responsibilities.

Authorised organisers can manage participants, roles and political positions through the **Manage Users** interface.

Presidents and Chairs gain access to voting functionality, while Legal and Political Advisors receive additional amendment-management capabilities.

Organisers and journalists can also follow the latest anonymous submissions through dedicated tools.

This role-based architecture ensures that users only see and control the functionality relevant to their position within the simulation.

## Gossip Box

MEU also has a less formal side.

The **Gossip Box** allows participants to anonymously submit political drama, rumours, unexpected alliances and other developments taking place behind the scenes.

Organisers and journalists can monitor incoming submissions, turning the informal political dynamics of the simulation into another interactive part of the event experience.

## Notes

Participants have access to their own personal notes space inside MEU Mobile.

This can be used to keep track of arguments, negotiation points, ideas, reminders and other information needed throughout the simulation.

## Push notifications

Targeted push notifications allow organisers to communicate directly with specific groups of participants.

Messages can be directed according to roles when important information needs to reach the relevant participants quickly during the event.

## Architecture

The project uses **Laravel** as the central backend and application layer.

**Livewire** powers the interactive web interface, while an API exposes the functionality required by the native mobile applications.

This allows the web platform and MEU Mobile to operate on top of the same underlying system while providing interfaces designed specifically for their respective use cases.

## Result

The result is more than an event website.

MEU Berlin has a unified digital platform supporting the complete participant journey — from preparing for the simulation and understanding political positions to drafting amendments, negotiating, voting and following what happens behind the scenes.

By connecting the web platform, API and native mobile experience, the system turns a complex multi-day political simulation into a coordinated digital workflow.
