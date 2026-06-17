# A REPORT OF PROJECT-I

on

## ECOVERSE: INTELLIGENT WASTE MANAGEMENT SYSTEM

SUBMITTED IN PARTIAL FULFILLMENT OF THE REQUIREMENT FOR THE AWARD OF THE DEGREE OF  
**BACHELOR OF TECHNOLOGY**  
(Computer Science and Engineering)

JAN - MAY, 2026

SUBMITTED BY:  
`<YOUR NAME>`  
College/Roll No.: `<YOUR ROLL NUMBER>`

SUBMITTED TO:  
Dr. Ashima Mehta  
HOD

DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING  
DRONACHARYA COLLEGE OF ENGINEERING  
GURUGRAM, HARYANA

---

**[PAGE BREAK]**

# CANDIDATE'S DECLARATION

I, `<YOUR NAME>`, hereby declare that I have undertaken the Software Project on **"EcoVerse: Intelligent Waste Management System"** during the period `<START DATE>` to `<END DATE>` in partial fulfillment of the requirements for the award of degree of B.Tech in Computer Science and Engineering at Dronacharya College of Engineering, Gurugram.

The work presented in this project report is an authentic record of project work carried out by me.

Signature of the Student: ____________________

The Project Viva-Voce Examination of ____________________ has been held on ____________________ and accepted.

Dr. Ashima Mehta  
Signature of HOD: ____________________

---

**[PAGE BREAK]**

# ABSTRACT

Urban waste management faces challenges such as poor segregation at source, delayed pickup scheduling, low public participation, and inefficient collection routes. The EcoVerse project addresses these challenges through a full-stack web-based platform that combines citizen participation, backend automation, and route optimization.

The frontend is developed using React and Vite to provide a responsive user interface for waste classification, pickup scheduling, rewards tracking, and route visualization. The backend is built using Node.js and Express with Oracle Database as persistent storage. The system includes user authentication, image-based waste classification support, reward point management, and a Dijkstra algorithm implementation for shortest-path route planning.

The project demonstrates how digital tools can improve environmental behavior by connecting segregation activities with measurable incentives and municipal process support. EcoVerse creates a practical model for smart city waste workflows by integrating classification, logistics, and citizen rewards within one system.

---

**[PAGE BREAK]**

# ACKNOWLEDGEMENT

I express my sincere gratitude to **Dr. Ashima Mehta**, Head of the Department of Computer Science and Engineering, for guidance, encouragement, and valuable suggestions throughout this project.

I also thank the faculty members of the department for their support and technical inputs. Finally, I acknowledge my family and peers for continuous motivation during the development and documentation of this work.

---

**[PAGE BREAK]**

# LIST OF FIGURES

Figure 1.1 EcoVerse System Overview  
Figure 4.1 User Authentication Flow  
Figure 4.2 Waste Classification Module Workflow  
Figure 4.3 Pickup Scheduling and Status Update Flow  
Figure 4.4 Rewards and Redemption Flow  
Figure 4.5 Route Optimization (Dijkstra) Flow  
Figure 5.1 Dashboard Metrics Snapshot  
Figure 5.2 Pickup and Rewards Output Snapshot

---

**[PAGE BREAK]**

# LIST OF TABLES

Table 2.1 Comparison of Existing Waste Management Approaches  
Table 3.1 Literature Survey Summary  
Table 4.1 Technology Stack  
Table 4.2 Major Backend APIs  
Table 5.1 Functional Test Scenarios and Results

---

**[PAGE BREAK]**

# DEFINITIONS, ACRONYMS AND ABBREVIATIONS

- AI: Artificial Intelligence
- API: Application Programming Interface
- CO2: Carbon Dioxide
- DBMS: Database Management System
- JWT: JSON Web Token
- UI: User Interface
- UX: User Experience
- CRUD: Create, Read, Update, Delete

---

**[PAGE BREAK]**

# CONTENTS

Candidate's Declaration  
Abstract  
Acknowledgement  
List of Figures  
List of Tables  
Definitions, Acronyms and Abbreviations  
CHAPTER 1: INTRODUCTION TO PROJECT  
CHAPTER 2: BACKGROUND AND MOTIVATION  
CHAPTER 3: LITERATURE SURVEY  
CHAPTER 4: PROJECT WORK  
CHAPTER 5: RESULTS AND DISCUSSION  
CHAPTER 6: CONCLUSION AND FUTURE SCOPE  
REFERENCES  
APPENDIX

---

**[PAGE BREAK]**

# CHAPTER 1: INTRODUCTION TO PROJECT

## 1.1 Introduction

EcoVerse is a smart waste management platform designed to support responsible waste segregation and efficient municipal collection. The system provides an integrated interface where users can classify waste images, schedule pickups, monitor progress, earn reward points, and view optimized route data.

## 1.2 Problem Statement

Traditional waste management workflows face multiple issues:

- Lack of awareness about proper waste segregation.
- Limited incentive mechanisms for citizens.
- Inefficient route planning for garbage collection vehicles.
- Poor traceability of pickup status and environmental impact metrics.

## 1.3 Objectives

The key objectives of EcoVerse are:

1. Build a user-friendly web interface for waste management tasks.
2. Provide waste type identification support through an image upload pipeline.
3. Enable scheduling and tracking of waste pickups.
4. Implement a points-based reward and redemption mechanism.
5. Optimize collection routes using shortest path algorithms.
6. Present measurable user-level impact indicators like CO2 saved.

## 1.4 Scope

The current scope covers citizen-side digital workflow for segregation, scheduling, rewards, backend APIs, route optimization logic, and local deployment setup. The scope does not include IoT sensor integration, live GPS, or production ML hosting in this phase.

---

**[PAGE BREAK]**

# CHAPTER 2: BACKGROUND AND MOTIVATION

## 2.1 Background

With growing urban populations, municipal solid waste generation has significantly increased. Manual segregation and static routing create inefficiencies and higher operational costs. Technology-driven intervention can improve segregation accuracy, participation, and route efficiency.

## 2.2 Limitations of Earlier Approaches

- Manual segregation depends entirely on user awareness.
- Pickup scheduling is often offline and non-transparent.
- Citizen engagement is low due to lack of rewards.
- Collection routes are commonly fixed and not optimized for dynamic demand.

## 2.3 Motivation for the Project

The project is motivated by the need for better environmental compliance, a unified digital platform, reduced fuel usage, and transparent performance tracking.

## 2.4 Why This Technology Stack

- React + Vite for fast and modular frontend development.
- Node.js + Express for lightweight REST API services.
- Oracle Database for reliable relational storage.
- JWT for stateless authentication.
- Dijkstra algorithm for shortest-route generation.

## 2.5 Expected Impact

EcoVerse can improve segregation behavior, simplify pickup handling, and provide route-level decision support for municipalities.

---

**[PAGE BREAK]**

# CHAPTER 3: LITERATURE SURVEY

## 3.1 Existing Smart Waste Segregation Systems

Most existing systems focus on one area: classification, pickup booking, or route optimization. Integrated systems are less common.

## 3.2 Rewards-Driven Civic Applications

Gamified and reward-based civic platforms typically improve user retention and participation in sustainability programs.

## 3.3 Route Optimization in Public Services

Shortest path algorithms such as Dijkstra are widely used in logistics to reduce travel distance and operational cost.

## 3.4 Gap Identified

There is a practical implementation gap in combining authentication, classification, pickups, rewards, and route optimization in one student project.

## 3.5 Contribution of This Project

EcoVerse contributes an integrated proof-of-concept architecture connecting awareness, incentive systems, and municipal planning support.

---

**[PAGE BREAK]**

# CHAPTER 4: PROJECT WORK

## 4.1 System Architecture

EcoVerse uses a client-server architecture:

1. React frontend for user interaction.
2. Express backend for business logic and APIs.
3. Oracle DB for persistence.
4. Utility modules for waste classification and shortest path.

## 4.2 Module Description

### 4.2.1 Authentication Module

- Endpoints: `/auth/register`, `/auth/login`, `/me`
- Password hashing with bcrypt.
- JWT-based authorization.

### 4.2.2 Waste Classification Module

- Image upload via `multer`.
- Classification output: organic/recyclable/hazardous.
- History storage plus point updates.

### 4.2.3 Pickup Scheduling Module

- Create pickup entries with date, time, type, and address.
- Track status updates.
- Award points on completion.

### 4.2.4 Rewards Module

- Reward catalog retrieval.
- Point-based redemption.
- Reward history tracking.

### 4.2.5 Route Optimization Module

- Uses graph-based shortest path computation.
- Inputs: source and target node.
- Outputs: path, distance, and estimated fuel-saving percentage.

## 4.3 Database Design (High-Level)

Main tables:

- `users`
- `classifications`
- `pickups`
- `reward_catalog`
- `reward_history`

## 4.4 Methodology

1. Requirement analysis and use-case definition.
2. API and schema design.
3. Frontend-backend integration.
4. Functional testing.
5. Iterative refinements.

## 4.5 Tools and Technologies

| Component | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Backend | Node.js, Express |
| Database | Oracle DB |
| Auth | JWT + bcrypt |
| File Upload | Multer |
| Algorithm | Dijkstra |

---

**[PAGE BREAK]**

# CHAPTER 5: RESULTS AND DISCUSSION

## 5.1 Functional Results

The system successfully supports registration/login, waste classification, pickup scheduling, rewards redemption, and shortest-path route generation.

## 5.2 Observed Outcomes

- Profile metrics update after classification and pickup completion.
- Rewards are deducted correctly on redemption.
- Route optimization gives consistent shortest paths for configured nodes.
- API contract supports future model upgrades.

## 5.3 Discussion

By combining engagement and logistics modules, the project provides a more practical waste workflow than single-purpose tools. The classifier module can be upgraded from heuristic to trained model without changing core UI flow.

---

**[PAGE BREAK]**

# CHAPTER 6: CONCLUSION AND FUTURE SCOPE

## 6.1 Conclusion

EcoVerse demonstrates a practical and scalable full-stack implementation for smart waste management. It combines citizen participation, rewards, and route optimization in one platform and validates the value of technology in sustainable municipal operations.

## 6.2 Future Scope

1. Integrate TensorFlow/Keras production model for classification.
2. Add map-based live vehicle tracking.
3. Implement dynamic route recomputation with traffic data.
4. Add notifications and reminders.
5. Build admin analytics dashboards.
6. Extend to mobile app with multilingual support.

---

**[PAGE BREAK]**

# REFERENCES

[1] React Team. (2026). React Documentation [Online]. Available: https://react.dev  
[2] Vite Team. (2026). Vite Documentation [Online]. Available: https://vite.dev  
[3] Express.js. (2026). Express Web Framework Documentation [Online]. Available: https://expressjs.com  
[4] Oracle. (2026). Node.js Driver for Oracle Database [Online]. Available: https://node-oracledb.readthedocs.io  
[5] T. H. Cormen, C. E. Leiserson, R. L. Rivest, and C. Stein, *Introduction to Algorithms*, 3rd ed., MIT Press, 2009.  
[6] R. Sedgewick and K. Wayne, *Algorithms*, 4th ed., Addison-Wesley, 2011.

---

**[PAGE BREAK]**

# APPENDIX

## Appendix A: API Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /me`
- `POST /upload-image`
- `GET /classifications`
- `GET /pickup`
- `POST /pickup`
- `PATCH /pickup/:id/status`
- `GET /rewards`
- `POST /rewards/redeem`
- `GET /get-route`

## Appendix B: Functional Test Checklist

1. Register new user and verify token.
2. Login and verify profile retrieval.
3. Upload image and verify classification output.
4. Add pickup and verify scheduled status.
5. Mark pickup complete and verify points increment.
6. Redeem reward and verify points deduction.
7. Run route optimization and verify shortest path output.

## Appendix C: Screenshot Checklist

- Login/Register Screen
- Dashboard Screen
- Waste Classification Screen
- Pickup Scheduling Screen
- Rewards Screen
- Route Optimization Screen
