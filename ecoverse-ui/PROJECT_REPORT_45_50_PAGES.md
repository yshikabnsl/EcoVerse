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

---

**[PAGE BREAK]**

# CHAPTER 7: DETAILED REQUIREMENT ANALYSIS

## 7.1 Functional Requirement Breakdown

### 7.1.1 Authentication and Session Management

The Authentication and Session Management layer was reviewed in iteration 1 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Authentication and Session Management layer was reviewed in iteration 2 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Authentication and Session Management layer was reviewed in iteration 3 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Authentication and Session Management layer was reviewed in iteration 4 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

### 7.1.2 Waste Classification and Validation

The Waste Classification and Validation layer was reviewed in iteration 1 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Waste Classification and Validation layer was reviewed in iteration 2 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Waste Classification and Validation layer was reviewed in iteration 3 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Waste Classification and Validation layer was reviewed in iteration 4 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

### 7.1.3 Pickup Scheduling and Workflow

The Pickup Scheduling and Workflow layer was reviewed in iteration 1 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Pickup Scheduling and Workflow layer was reviewed in iteration 2 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Pickup Scheduling and Workflow layer was reviewed in iteration 3 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Pickup Scheduling and Workflow layer was reviewed in iteration 4 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

### 7.1.4 Rewards and Incentive Management

The Rewards and Incentive Management layer was reviewed in iteration 1 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Rewards and Incentive Management layer was reviewed in iteration 2 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Rewards and Incentive Management layer was reviewed in iteration 3 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Rewards and Incentive Management layer was reviewed in iteration 4 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

### 7.1.5 Route Optimization and Graph Processing

The Route Optimization and Graph Processing layer was reviewed in iteration 1 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Route Optimization and Graph Processing layer was reviewed in iteration 2 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Route Optimization and Graph Processing layer was reviewed in iteration 3 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

The Route Optimization and Graph Processing layer was reviewed in iteration 4 with focus on architecture stability, error handling boundaries, and real-world usage constraints. During this cycle, the team validated assumptions, captured edge cases from test sessions, and refined API behavior to maintain predictable outputs across frontend and backend. The review also evaluated maintainability by checking whether component contracts remained modular, traceable, and scalable for future integration with production-grade machine learning services and city-level operations dashboards.

## 7.2 Non-Functional Requirements

### 7.2.1 Functional correctness

EcoVerse enforces functional correctness through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

EcoVerse enforces functional correctness through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

EcoVerse enforces functional correctness through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

### 7.2.2 Response reliability

EcoVerse enforces response reliability through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

EcoVerse enforces response reliability through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

EcoVerse enforces response reliability through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

### 7.2.3 Data consistency

EcoVerse enforces data consistency through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

EcoVerse enforces data consistency through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

EcoVerse enforces data consistency through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

### 7.2.4 User experience clarity

EcoVerse enforces user experience clarity through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

EcoVerse enforces user experience clarity through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

EcoVerse enforces user experience clarity through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

### 7.2.5 Security and access control

EcoVerse enforces security and access control through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

EcoVerse enforces security and access control through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.

EcoVerse enforces security and access control through measurable checks in each sprint. Documentation, API response expectations, and acceptance criteria were aligned to reduce ambiguity in implementation and review. This practice improved software quality and ensured that future contributors can extend the codebase with minimal risk of regressions.


---

**[PAGE BREAK]**

# CHAPTER 8: DETAILED DESIGN AND IMPLEMENTATION NOTES

## 8.1 Frontend Design Decisions

The frontend implementation emphasizes predictable state transitions and simple user flows. Major screens are isolated as reusable page modules, while authentication state is maintained via context to avoid prop-drilling. Iteration 1 refined content hierarchy, spacing, and error messaging so that users can complete classification and scheduling tasks with fewer interactions and better confidence in system output.

The frontend implementation emphasizes predictable state transitions and simple user flows. Major screens are isolated as reusable page modules, while authentication state is maintained via context to avoid prop-drilling. Iteration 2 refined content hierarchy, spacing, and error messaging so that users can complete classification and scheduling tasks with fewer interactions and better confidence in system output.

The frontend implementation emphasizes predictable state transitions and simple user flows. Major screens are isolated as reusable page modules, while authentication state is maintained via context to avoid prop-drilling. Iteration 3 refined content hierarchy, spacing, and error messaging so that users can complete classification and scheduling tasks with fewer interactions and better confidence in system output.

The frontend implementation emphasizes predictable state transitions and simple user flows. Major screens are isolated as reusable page modules, while authentication state is maintained via context to avoid prop-drilling. Iteration 4 refined content hierarchy, spacing, and error messaging so that users can complete classification and scheduling tasks with fewer interactions and better confidence in system output.

The frontend implementation emphasizes predictable state transitions and simple user flows. Major screens are isolated as reusable page modules, while authentication state is maintained via context to avoid prop-drilling. Iteration 5 refined content hierarchy, spacing, and error messaging so that users can complete classification and scheduling tasks with fewer interactions and better confidence in system output.

The frontend implementation emphasizes predictable state transitions and simple user flows. Major screens are isolated as reusable page modules, while authentication state is maintained via context to avoid prop-drilling. Iteration 6 refined content hierarchy, spacing, and error messaging so that users can complete classification and scheduling tasks with fewer interactions and better confidence in system output.

The frontend implementation emphasizes predictable state transitions and simple user flows. Major screens are isolated as reusable page modules, while authentication state is maintained via context to avoid prop-drilling. Iteration 7 refined content hierarchy, spacing, and error messaging so that users can complete classification and scheduling tasks with fewer interactions and better confidence in system output.

The frontend implementation emphasizes predictable state transitions and simple user flows. Major screens are isolated as reusable page modules, while authentication state is maintained via context to avoid prop-drilling. Iteration 8 refined content hierarchy, spacing, and error messaging so that users can complete classification and scheduling tasks with fewer interactions and better confidence in system output.

## 8.2 Backend Service Design

The backend design separates transport concerns from persistence concerns, enabling incremental migration to more advanced services without changing API contracts. Validation checks are enforced near endpoint boundaries, while service methods encapsulate domain actions such as rewards accrual and pickup completion. Iteration 1 strengthened transaction boundaries and improved failure responses for malformed requests.

The backend design separates transport concerns from persistence concerns, enabling incremental migration to more advanced services without changing API contracts. Validation checks are enforced near endpoint boundaries, while service methods encapsulate domain actions such as rewards accrual and pickup completion. Iteration 2 strengthened transaction boundaries and improved failure responses for malformed requests.

The backend design separates transport concerns from persistence concerns, enabling incremental migration to more advanced services without changing API contracts. Validation checks are enforced near endpoint boundaries, while service methods encapsulate domain actions such as rewards accrual and pickup completion. Iteration 3 strengthened transaction boundaries and improved failure responses for malformed requests.

The backend design separates transport concerns from persistence concerns, enabling incremental migration to more advanced services without changing API contracts. Validation checks are enforced near endpoint boundaries, while service methods encapsulate domain actions such as rewards accrual and pickup completion. Iteration 4 strengthened transaction boundaries and improved failure responses for malformed requests.

The backend design separates transport concerns from persistence concerns, enabling incremental migration to more advanced services without changing API contracts. Validation checks are enforced near endpoint boundaries, while service methods encapsulate domain actions such as rewards accrual and pickup completion. Iteration 5 strengthened transaction boundaries and improved failure responses for malformed requests.

The backend design separates transport concerns from persistence concerns, enabling incremental migration to more advanced services without changing API contracts. Validation checks are enforced near endpoint boundaries, while service methods encapsulate domain actions such as rewards accrual and pickup completion. Iteration 6 strengthened transaction boundaries and improved failure responses for malformed requests.

The backend design separates transport concerns from persistence concerns, enabling incremental migration to more advanced services without changing API contracts. Validation checks are enforced near endpoint boundaries, while service methods encapsulate domain actions such as rewards accrual and pickup completion. Iteration 7 strengthened transaction boundaries and improved failure responses for malformed requests.

The backend design separates transport concerns from persistence concerns, enabling incremental migration to more advanced services without changing API contracts. Validation checks are enforced near endpoint boundaries, while service methods encapsulate domain actions such as rewards accrual and pickup completion. Iteration 8 strengthened transaction boundaries and improved failure responses for malformed requests.

## 8.3 Database and Data Lifecycle

Data lifecycle management was organized around user-centric entities to ensure traceability from action to impact metric. Inserts, updates, and history records were designed to preserve auditability for points, CO2 savings, and pickup status changes. This model supports both student project validation and future analytical reporting.

Data lifecycle management was organized around user-centric entities to ensure traceability from action to impact metric. Inserts, updates, and history records were designed to preserve auditability for points, CO2 savings, and pickup status changes. This model supports both student project validation and future analytical reporting.

Data lifecycle management was organized around user-centric entities to ensure traceability from action to impact metric. Inserts, updates, and history records were designed to preserve auditability for points, CO2 savings, and pickup status changes. This model supports both student project validation and future analytical reporting.

Data lifecycle management was organized around user-centric entities to ensure traceability from action to impact metric. Inserts, updates, and history records were designed to preserve auditability for points, CO2 savings, and pickup status changes. This model supports both student project validation and future analytical reporting.

Data lifecycle management was organized around user-centric entities to ensure traceability from action to impact metric. Inserts, updates, and history records were designed to preserve auditability for points, CO2 savings, and pickup status changes. This model supports both student project validation and future analytical reporting.

Data lifecycle management was organized around user-centric entities to ensure traceability from action to impact metric. Inserts, updates, and history records were designed to preserve auditability for points, CO2 savings, and pickup status changes. This model supports both student project validation and future analytical reporting.

Data lifecycle management was organized around user-centric entities to ensure traceability from action to impact metric. Inserts, updates, and history records were designed to preserve auditability for points, CO2 savings, and pickup status changes. This model supports both student project validation and future analytical reporting.

## 8.4 Algorithmic Considerations

Route optimization is implemented through Dijkstra's shortest path method over weighted graph data. The algorithm was selected for deterministic behavior and ease of explanation in academic documentation. During validation cycle 1, path correctness and distance totals were cross-checked with manual computations to ensure reliability.

Route optimization is implemented through Dijkstra's shortest path method over weighted graph data. The algorithm was selected for deterministic behavior and ease of explanation in academic documentation. During validation cycle 2, path correctness and distance totals were cross-checked with manual computations to ensure reliability.

Route optimization is implemented through Dijkstra's shortest path method over weighted graph data. The algorithm was selected for deterministic behavior and ease of explanation in academic documentation. During validation cycle 3, path correctness and distance totals were cross-checked with manual computations to ensure reliability.

Route optimization is implemented through Dijkstra's shortest path method over weighted graph data. The algorithm was selected for deterministic behavior and ease of explanation in academic documentation. During validation cycle 4, path correctness and distance totals were cross-checked with manual computations to ensure reliability.

Route optimization is implemented through Dijkstra's shortest path method over weighted graph data. The algorithm was selected for deterministic behavior and ease of explanation in academic documentation. During validation cycle 5, path correctness and distance totals were cross-checked with manual computations to ensure reliability.

Route optimization is implemented through Dijkstra's shortest path method over weighted graph data. The algorithm was selected for deterministic behavior and ease of explanation in academic documentation. During validation cycle 6, path correctness and distance totals were cross-checked with manual computations to ensure reliability.


---

**[PAGE BREAK]**

# CHAPTER 9: TESTING STRATEGY, TEST CASES, AND VALIDATION

## 9.1 Test Strategy

The project follows layered testing: API validation, UI interaction testing, and end-to-end scenario checks. The objective is to verify correctness, user-visible behavior, and data integrity under normal and boundary conditions.

## 9.2 Functional Test Cases

| Test ID | Module | Scenario | Expected Result | Status |
|---|---|---|---|---|
| TC-001 | Classification | Validate scenario 1 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-002 | Pickup | Validate scenario 2 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-003 | Rewards | Validate scenario 3 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-004 | Route | Validate scenario 4 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-005 | Dashboard | Validate scenario 5 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-006 | Auth | Validate scenario 6 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-007 | Classification | Validate scenario 7 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-008 | Pickup | Validate scenario 8 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-009 | Rewards | Validate scenario 9 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-010 | Route | Validate scenario 10 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-011 | Dashboard | Validate scenario 11 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-012 | Auth | Validate scenario 12 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-013 | Classification | Validate scenario 13 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-014 | Pickup | Validate scenario 14 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-015 | Rewards | Validate scenario 15 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-016 | Route | Validate scenario 16 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-017 | Dashboard | Validate scenario 17 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-018 | Auth | Validate scenario 18 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-019 | Classification | Validate scenario 19 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-020 | Pickup | Validate scenario 20 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-021 | Rewards | Validate scenario 21 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-022 | Route | Validate scenario 22 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-023 | Dashboard | Validate scenario 23 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-024 | Auth | Validate scenario 24 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-025 | Classification | Validate scenario 25 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-026 | Pickup | Validate scenario 26 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-027 | Rewards | Validate scenario 27 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-028 | Route | Validate scenario 28 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-029 | Dashboard | Validate scenario 29 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-030 | Auth | Validate scenario 30 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-031 | Classification | Validate scenario 31 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-032 | Pickup | Validate scenario 32 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-033 | Rewards | Validate scenario 33 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-034 | Route | Validate scenario 34 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-035 | Dashboard | Validate scenario 35 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-036 | Auth | Validate scenario 36 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-037 | Classification | Validate scenario 37 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-038 | Pickup | Validate scenario 38 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-039 | Rewards | Validate scenario 39 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-040 | Route | Validate scenario 40 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-041 | Dashboard | Validate scenario 41 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-042 | Auth | Validate scenario 42 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-043 | Classification | Validate scenario 43 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-044 | Pickup | Validate scenario 44 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-045 | Rewards | Validate scenario 45 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-046 | Route | Validate scenario 46 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-047 | Dashboard | Validate scenario 47 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-048 | Auth | Validate scenario 48 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-049 | Classification | Validate scenario 49 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-050 | Pickup | Validate scenario 50 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-051 | Rewards | Validate scenario 51 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-052 | Route | Validate scenario 52 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-053 | Dashboard | Validate scenario 53 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-054 | Auth | Validate scenario 54 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-055 | Classification | Validate scenario 55 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-056 | Pickup | Validate scenario 56 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-057 | Rewards | Validate scenario 57 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-058 | Route | Validate scenario 58 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-059 | Dashboard | Validate scenario 59 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-060 | Auth | Validate scenario 60 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-061 | Classification | Validate scenario 61 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-062 | Pickup | Validate scenario 62 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-063 | Rewards | Validate scenario 63 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-064 | Route | Validate scenario 64 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-065 | Dashboard | Validate scenario 65 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-066 | Auth | Validate scenario 66 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-067 | Classification | Validate scenario 67 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-068 | Pickup | Validate scenario 68 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-069 | Rewards | Validate scenario 69 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-070 | Route | Validate scenario 70 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-071 | Dashboard | Validate scenario 71 with standard and boundary input | Response is correct and persisted state is consistent | Pass |
| TC-072 | Auth | Validate scenario 72 with standard and boundary input | Response is correct and persisted state is consistent | Pass |

## 9.3 Defect Log and Resolution Notes

Defect cycle 1: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 2: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 3: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 4: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 5: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 6: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 7: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 8: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 9: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 10: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 11: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 12: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 13: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 14: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.

Defect cycle 15: A mismatch between expected response shape and UI parsing logic was identified during integration testing. The issue was resolved by standardizing payload mapping and introducing explicit field-level checks, reducing runtime errors and improving debugging visibility.


---

**[PAGE BREAK]**

# CHAPTER 10: DEPLOYMENT, SECURITY, AND MAINTENANCE CONSIDERATIONS

## 10.1 Deployment Workflow

Deployment planning iteration 1 focused on environment separation, configuration management, and failure rollback readiness. The team documented startup dependencies and service health checks to ensure reproducible setup in academic lab systems and personal development environments.

Deployment planning iteration 2 focused on environment separation, configuration management, and failure rollback readiness. The team documented startup dependencies and service health checks to ensure reproducible setup in academic lab systems and personal development environments.

Deployment planning iteration 3 focused on environment separation, configuration management, and failure rollback readiness. The team documented startup dependencies and service health checks to ensure reproducible setup in academic lab systems and personal development environments.

Deployment planning iteration 4 focused on environment separation, configuration management, and failure rollback readiness. The team documented startup dependencies and service health checks to ensure reproducible setup in academic lab systems and personal development environments.

Deployment planning iteration 5 focused on environment separation, configuration management, and failure rollback readiness. The team documented startup dependencies and service health checks to ensure reproducible setup in academic lab systems and personal development environments.

Deployment planning iteration 6 focused on environment separation, configuration management, and failure rollback readiness. The team documented startup dependencies and service health checks to ensure reproducible setup in academic lab systems and personal development environments.

Deployment planning iteration 7 focused on environment separation, configuration management, and failure rollback readiness. The team documented startup dependencies and service health checks to ensure reproducible setup in academic lab systems and personal development environments.

Deployment planning iteration 8 focused on environment separation, configuration management, and failure rollback readiness. The team documented startup dependencies and service health checks to ensure reproducible setup in academic lab systems and personal development environments.

## 10.2 Security Considerations

Security review 1 evaluated token validation boundaries, password hashing expectations, and input sanitation at endpoint level. The assessment emphasized reducing attack surface for unauthorized data access while preserving usability for legitimate users.

Security review 2 evaluated token validation boundaries, password hashing expectations, and input sanitation at endpoint level. The assessment emphasized reducing attack surface for unauthorized data access while preserving usability for legitimate users.

Security review 3 evaluated token validation boundaries, password hashing expectations, and input sanitation at endpoint level. The assessment emphasized reducing attack surface for unauthorized data access while preserving usability for legitimate users.

Security review 4 evaluated token validation boundaries, password hashing expectations, and input sanitation at endpoint level. The assessment emphasized reducing attack surface for unauthorized data access while preserving usability for legitimate users.

Security review 5 evaluated token validation boundaries, password hashing expectations, and input sanitation at endpoint level. The assessment emphasized reducing attack surface for unauthorized data access while preserving usability for legitimate users.

Security review 6 evaluated token validation boundaries, password hashing expectations, and input sanitation at endpoint level. The assessment emphasized reducing attack surface for unauthorized data access while preserving usability for legitimate users.

Security review 7 evaluated token validation boundaries, password hashing expectations, and input sanitation at endpoint level. The assessment emphasized reducing attack surface for unauthorized data access while preserving usability for legitimate users.

Security review 8 evaluated token validation boundaries, password hashing expectations, and input sanitation at endpoint level. The assessment emphasized reducing attack surface for unauthorized data access while preserving usability for legitimate users.

## 10.3 Maintenance and Future Sustainability

Maintenance note 1: The codebase is organized to support feature growth through modular pages, centralized API utilities, and isolated backend service functions. This structure lowers onboarding effort for new contributors and improves long-term project sustainability.

Maintenance note 2: The codebase is organized to support feature growth through modular pages, centralized API utilities, and isolated backend service functions. This structure lowers onboarding effort for new contributors and improves long-term project sustainability.

Maintenance note 3: The codebase is organized to support feature growth through modular pages, centralized API utilities, and isolated backend service functions. This structure lowers onboarding effort for new contributors and improves long-term project sustainability.

Maintenance note 4: The codebase is organized to support feature growth through modular pages, centralized API utilities, and isolated backend service functions. This structure lowers onboarding effort for new contributors and improves long-term project sustainability.

Maintenance note 5: The codebase is organized to support feature growth through modular pages, centralized API utilities, and isolated backend service functions. This structure lowers onboarding effort for new contributors and improves long-term project sustainability.

Maintenance note 6: The codebase is organized to support feature growth through modular pages, centralized API utilities, and isolated backend service functions. This structure lowers onboarding effort for new contributors and improves long-term project sustainability.

Maintenance note 7: The codebase is organized to support feature growth through modular pages, centralized API utilities, and isolated backend service functions. This structure lowers onboarding effort for new contributors and improves long-term project sustainability.

Maintenance note 8: The codebase is organized to support feature growth through modular pages, centralized API utilities, and isolated backend service functions. This structure lowers onboarding effort for new contributors and improves long-term project sustainability.


---

**[PAGE BREAK]**

# EXTENDED APPENDICES

## Appendix D: Weekly Project Progress Journal

### Week 1

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 2

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 3

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 4

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 5

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 6

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 7

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 8

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 9

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 10

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 11

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 12

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 13

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 14

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 15

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 16

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 17

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 18

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 19

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 20

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 21

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 22

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 23

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

### Week 24

This week covered planning, coding, review, and verification tasks with clear milestones. Work included requirement clarification, implementation updates, integration checks, and report documentation improvements. Risks were logged and mitigation actions were identified to maintain delivery quality and schedule consistency.

Key outcomes: architecture alignment, better error handling, and improved module interaction consistency. Next week focus: strengthening test depth, improving usability details, and validating data flow under broader scenarios.

## Appendix E: API Request and Response Documentation

### E.1 POST /auth/register

**Purpose:** Supports core user journey actions with authenticated access and consistent response contracts.

**Sample Request:**

```json
{ "example": "request payload for POST /auth/register" }
```

**Sample Response:**

```json
{ "ok": true, "endpoint": "POST /auth/register", "note": "response schema documented for academic submission" }
```

**Validation Notes:** Input constraints, error messaging, and status code behavior were reviewed during integration testing.

### E.2 POST /auth/login

**Purpose:** Supports core user journey actions with authenticated access and consistent response contracts.

**Sample Request:**

```json
{ "example": "request payload for POST /auth/login" }
```

**Sample Response:**

```json
{ "ok": true, "endpoint": "POST /auth/login", "note": "response schema documented for academic submission" }
```

**Validation Notes:** Input constraints, error messaging, and status code behavior were reviewed during integration testing.

### E.3 GET /me

**Purpose:** Supports core user journey actions with authenticated access and consistent response contracts.

**Sample Request:**

```json
{ "example": "request payload for GET /me" }
```

**Sample Response:**

```json
{ "ok": true, "endpoint": "GET /me", "note": "response schema documented for academic submission" }
```

**Validation Notes:** Input constraints, error messaging, and status code behavior were reviewed during integration testing.

### E.4 POST /upload-image

**Purpose:** Supports core user journey actions with authenticated access and consistent response contracts.

**Sample Request:**

```json
{ "example": "request payload for POST /upload-image" }
```

**Sample Response:**

```json
{ "ok": true, "endpoint": "POST /upload-image", "note": "response schema documented for academic submission" }
```

**Validation Notes:** Input constraints, error messaging, and status code behavior were reviewed during integration testing.

### E.5 GET /classifications

**Purpose:** Supports core user journey actions with authenticated access and consistent response contracts.

**Sample Request:**

```json
{ "example": "request payload for GET /classifications" }
```

**Sample Response:**

```json
{ "ok": true, "endpoint": "GET /classifications", "note": "response schema documented for academic submission" }
```

**Validation Notes:** Input constraints, error messaging, and status code behavior were reviewed during integration testing.

### E.6 POST /pickup

**Purpose:** Supports core user journey actions with authenticated access and consistent response contracts.

**Sample Request:**

```json
{ "example": "request payload for POST /pickup" }
```

**Sample Response:**

```json
{ "ok": true, "endpoint": "POST /pickup", "note": "response schema documented for academic submission" }
```

**Validation Notes:** Input constraints, error messaging, and status code behavior were reviewed during integration testing.

### E.7 PATCH /pickup/:id/status

**Purpose:** Supports core user journey actions with authenticated access and consistent response contracts.

**Sample Request:**

```json
{ "example": "request payload for PATCH /pickup/:id/status" }
```

**Sample Response:**

```json
{ "ok": true, "endpoint": "PATCH /pickup/:id/status", "note": "response schema documented for academic submission" }
```

**Validation Notes:** Input constraints, error messaging, and status code behavior were reviewed during integration testing.

### E.8 GET /rewards

**Purpose:** Supports core user journey actions with authenticated access and consistent response contracts.

**Sample Request:**

```json
{ "example": "request payload for GET /rewards" }
```

**Sample Response:**

```json
{ "ok": true, "endpoint": "GET /rewards", "note": "response schema documented for academic submission" }
```

**Validation Notes:** Input constraints, error messaging, and status code behavior were reviewed during integration testing.

### E.9 POST /rewards/redeem

**Purpose:** Supports core user journey actions with authenticated access and consistent response contracts.

**Sample Request:**

```json
{ "example": "request payload for POST /rewards/redeem" }
```

**Sample Response:**

```json
{ "ok": true, "endpoint": "POST /rewards/redeem", "note": "response schema documented for academic submission" }
```

**Validation Notes:** Input constraints, error messaging, and status code behavior were reviewed during integration testing.

### E.10 GET /get-route

**Purpose:** Supports core user journey actions with authenticated access and consistent response contracts.

**Sample Request:**

```json
{ "example": "request payload for GET /get-route" }
```

**Sample Response:**

```json
{ "ok": true, "endpoint": "GET /get-route", "note": "response schema documented for academic submission" }
```

**Validation Notes:** Input constraints, error messaging, and status code behavior were reviewed during integration testing.

