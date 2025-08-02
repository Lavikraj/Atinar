# ATINAR Frontend Web Portal – Deployment & Contribution Guide
<img width="157" height="40" alt="image" src="https://github.com/user-attachments/assets/b38f137b-cd03-418c-8511-0c979541bc2d" />

Welcome to the official frontend repository of ATINAR’s public web platform.

This document is intended for internal use by employees and contributors. It outlines the structure, conventions, and deployment process followed by the frontend engineering team at ATINAR. If you are onboarding, contributing, or managing deployment, please read this carefully before proceeding.

---

## 📌 Overview

The ATINAR frontend is a static site designed to reflect the company’s brand, services, and vision. It is written in standard HTML/CSS/JavaScript (or React, if specified) and is deployed via our internal CI/CD pipeline.

This site is tightly integrated with backend APIs and analytics tools. Please ensure stability and visual consistency when pushing updates.

---

## 🧱 Tech Stack

- **Core Stack**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Design Assets**: Managed in Figma (refer to `/designs`)
- **Icons & Images**: Stored under `/assets`
- **Custom Animations**: Framer Motion or CSS keyframes
- **Environment**: Optimized for modern browsers (Chrome, Firefox, Edge)

> Framework variants (React, Vue) are scoped separately. This repo assumes a vanilla/static setup unless noted.

---

## 📁 Folder Structure

