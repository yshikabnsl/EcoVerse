# A REPORT OF PROJECT-I

## on

# ECOVERSE: INTELLIGENT WASTE MANAGEMENT SYSTEM

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

## Candidate's Declaration

I, `<YOUR NAME>`, hereby declare that I have undertaken the Software Project on **"EcoVerse: Intelligent Waste Management System"** during the period `<START DATE>` to `<END DATE>` in partial fulfillment of the requirements for the award of degree of B.Tech in Computer Science and Engineering at Dronacharya College of Engineering, Gurugram.

The work presented in this project report is an authentic record of project work carried out by me.

Signature of the Student: ____________________

The Project Viva-Voce Examination of ____________________ has been held on ____________________ and accepted.

Dr. Ashima Mehta  
Signature of HOD: ____________________

---

## Abstract

Urban waste management faces challenges such as poor segregation at source, delayed pickup scheduling, low public participation, and inefficient collection routes. The EcoVerse project addresses these challenges through a full-stack web-based platform that combines citizen participation, backend automation, and route optimization.

The frontend is developed using React and Vite to provide a responsive user interface for waste classification, pickup scheduling, rewards tracking, and route visualization. The backend is built using Node.js and Express with Oracle Database as persistent storage. The system includes user authentication, image-based waste classification support, reward point management, and a Dijkstra algorithm implementation for shortest-path route planning.

The project demonstrates how digital tools can improve environmental behavior by connecting segregation activities with measurable incentives and municipal process support. EcoVerse creates a practical model for smart city waste workflows by integrating classification, logistics, and citizen rewards within one system.

---

## Acknowledgement

I express my sincere gratitude to **Dr. Ashima Mehta**, Head of the Department of Computer Science and Engineering, for guidance, encouragement, and valuable suggestions throughout this project.

I also thank the faculty members of the department for their support and technical inputs. Finally, I acknowledge my family and peers for continuous motivation during the development and documentation of this work.

---

## List of Figures

Figure 1.1 EcoVerse System Overview  
Figure 4.1 User Authentication Flow  
Figure 4.2 Waste Classification Module Workflow  
Figure 4.3 Pickup Scheduling and Status Update Flow  
Figure 4.4 Rewards and Redemption Flow  
Figure 4.5 Route Optimization (Dijkstra) Flow  
Figure 5.1 Dashboard Metrics Snapshot  
Figure 5.2 Pickup and Rewards Output Snapshot

---

## List of Tables

Table 2.1 Comparison of Existing Waste Management Approaches  
Table 3.1 Literature Survey Summary  
Table 4.1 Technology Stack  
Table 4.2 Major Backend APIs  
Table 5.1 Functional Test Scenarios and Results

---

## Definitions, Acronyms and Abbreviations

- AI: Artificial Intelligence  
- API: Application Programming Interface  
- CO2: Carbon Dioxide  
- DBMS: Database Management System  
- JWT: JSON Web Token  
- UI: User Interface  
- UX: User Experience  
- CRUD: Create, Read, Update, Delete

---

## Contents

1. Introduction to Project  
2. Background and Motivation  
3. Literature Survey  
4. Project Work  
5. Results and Discussion  
6. Conclusion and Future Scope  
References  
Appendix

---

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

The current scope covers:

- Citizen-side digital workflow for segregation, scheduling, and rewards.
- Backend APIs for authentication, data persistence, and activity tracking.
- Route optimization logic for selected graph nodes.
- Deployment-ready local development setup.

The scope does not include IoT sensor integration, real-time GPS feeds, or production ML model hosting in the current phase.

---

# CHAPTER 2: BACKGROUND AND MOTIVATION

## 2.1 Background

With growing urban populations, municipal solid waste generation has significantly increased. Manual segregation and static routing create inefficiencies and higher operational costs. Technology-driven intervention can improve segregation accuracy, participation, and route efficiency.

## 2.2 Limitations of Earlier Approaches

- Manual segregation depends entirely on user awareness.
- Pickup scheduling is often offline and non-transparent.
- Citizen engagement is low due to lack of rewards.
- Collection routes are commonly fixed and not optimized for dynamic demand.

## 2.3 Motivation for the Project

The project is motivated by the need for:

- Better environmental compliance at household level.
- A single digital platform combining awareness and action.
- Reduction in fuel usage and turnaround time through route optimization.
- Transparent, measurable, and rewarding citizen participation.

## 2.4 Why This Technology Stack

- **React + Vite** for fast and modular frontend development.
- **Node.js + Express** for lightweight REST API services.
- **Oracle Database** for reliable relational data storage.
- **JWT** for stateless authentication.
- **Dijkstra algorithm** for deterministic shortest-route generation.

## 2.5 Expected Impact

EcoVerse can improve source segregation behavior, simplify pickup handling, and provide municipal teams with route-level decision support. In long-term usage, this can reduce mixed waste and operational emissions.

---

# CHAPTER 3: LITERATURE SURVEY

## 3.1 Existing Smart Waste Segregation Systems

Existing systems generally focus on one area: either waste classification, or pickup booking, or route optimization. Few systems integrate all citizen and municipal workflows in one platform.

## 3.2 Rewards-Driven Civic Applications

Studies and civic app implementations indicate that reward points and gamified engagement improve user retention and behavior adoption in sustainability initiatives.

## 3.3 Route Optimization in Public Services

Shortest path algorithms such as Dijkstra are widely used in transport and logistics for reducing travel distance and resource utilization.

## 3.4 Gap Identified

There is a gap in student-level practical implementations that combine:

- user authentication and profile metrics,
- classification and history tracking,
- pickup lifecycle management,
- reward redemption, and
- route optimization in one system.

## 3.5 Contribution of This Project

EcoVerse provides an integrated proof-of-concept architecture demonstrating how full-stack software can connect eco-awareness, incentive systems, and municipal planning.

---

# CHAPTER 4: PROJECT WORK

## 4.1 System Architecture

EcoVerse uses a client-server architecture:

1. React frontend for user interaction.
2. Express backend for API orchestration and business logic.
3. Oracle DB for persistence of users, classifications, pickups, and rewards.
4. Utility modules for waste classification and Dijkstra shortest path.

## 4.2 Module Description

### 4.2.1 Authentication Module

- User registration and login endpoints (`/auth/register`, `/auth/login`).
- Password hashing using bcrypt.
- JWT token generation and protected APIs with `Bearer` authorization.

### 4.2.2 Waste Classification Module

- Image upload handled using `multer`.
- Classification logic determines `organic`, `recyclable`, or `hazardous`.
- System stores classification history and updates user points and CO2 metrics.

### 4.2.3 Pickup Scheduling Module

- Users create pickup requests with date/time/type/address.
- Pickup list is user-specific and sorted by latest entries.
- Completion status updates award additional points and impact credits.

### 4.2.4 Rewards Module

- Reward catalog fetched from database.
- Redeem flow validates sufficient points before deduction.
- Reward history records positive and negative point events.

### 4.2.5 Route Optimization Module

- Static graph nodes represent depot and collection points.
- Dijkstra algorithm computes shortest path between source and target.
- Output includes path, total distance, and estimated fuel-saving percentage.

## 4.3 Database Design (High-Level)

Main entities:

- `users`
- `classifications`
- `pickups`
- `reward_catalog`
- `reward_history`

Entity relations are user-centric: each classification, pickup, and reward event references a user identifier.

## 4.4 Methodology

Development methodology followed an iterative approach:

1. Define requirements and user flows.
2. Build backend API contracts.
3. Integrate frontend screens with API layer.
4. Validate end-to-end user actions.
5. Refine points, pickup, and route logic.

## 4.5 Tools and Technologies

| Component | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Backend | Node.js, Express |
| Database | Oracle DB |
| Auth | JWT + bcrypt |
| File Upload | Multer |
| Algorithm | Dijkstra shortest path |
| Version Control | Git (local workflow) |

---

# CHAPTER 5: RESULTS AND DISCUSSION

## 5.1 Functional Results

The implemented system successfully provides:

- New user registration and secure login.
- Waste image upload and category prediction with confidence/tip output.
- Classification history retrieval for logged-in users.
- Pickup scheduling and completion updates.
- Reward point display, catalog listing, and redemption.
- Route generation from `DEPOT` to target nodes with shortest path output.

## 5.2 Observed Outcomes

- User points and impact metrics update correctly after classification and completed pickups.
- Reward redemption deducts points and records history.
- Route optimization consistently returns feasible shortest paths for available graph nodes.
- Modular API design allows easy integration with enhanced ML models in future.

## 5.3 Discussion

The project demonstrates that combining engagement (rewards), operations (pickup), and analytics (route optimization) produces a more complete smart-waste workflow than isolated modules.

Current classification logic is heuristic and can be replaced with a trained deep learning model without major frontend changes because the API contract is already established.

---

# CHAPTER 6: CONCLUSION AND FUTURE SCOPE

## 6.1 Conclusion

EcoVerse presents a practical full-stack implementation for intelligent waste management. It addresses major pain points in segregation, scheduling, and engagement while offering municipal route optimization support. The project validates that citizen-facing UX and backend automation can be combined effectively in a single platform.

## 6.2 Future Scope

Future enhancements may include:

1. Integration of an actual TensorFlow/Keras image classification model.
2. Real-time geolocation and map visualization for pickup vehicles.
3. Dynamic route recalculation based on live traffic or pickup load.
4. Push notifications and reminder system for users.
5. Admin analytics dashboard for ward-level planning.
6. Mobile app deployment with multilingual support.

---

# References

[1] React Team, "React Documentation," [Online]. Available: https://react.dev  
[2] Vite Team, "Vite Documentation," [Online]. Available: https://vite.dev  
[3] Express.js, "Express Web Framework Documentation," [Online]. Available: https://expressjs.com  
[4] Oracle, "Node.js Driver for Oracle Database," [Online]. Available: https://node-oracledb.readthedocs.io  
[5] T. H. Cormen, C. E. Leiserson, R. L. Rivest, and C. Stein, *Introduction to Algorithms*, 3rd ed., MIT Press, 2009.  
[6] R. Sedgewick and K. Wayne, *Algorithms*, 4th ed., Addison-Wesley, 2011.

---

# Appendix

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

## Appendix B: Sample Test Checklist

1. Register a new user and verify token generation.
2. Login with valid credentials and check profile fetch.
3. Upload image and verify classification + points update.
4. Add pickup and verify scheduled status.
5. Mark pickup complete and verify points increment.
6. Redeem catalog item and verify points deduction.
7. Run route optimization and verify path output.

## Appendix C: Screenshots to Attach in Final Report

- Login/Register page
- Dashboard page with metrics
- Waste classification page with output
- Pickup scheduling page
- Rewards page with redemption action
- Route optimization output
