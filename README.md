# 🚆 TRAINCAST

### AI-Based Dynamic Train ETA & Delay Forecasting System

> **Dynamic Forecast of Expected Time of Arrival (ETA) for Coaching Trains**  
> Smart India Hackathon 2026 — **SIH26028**

---

## 📌 Overview

**TRAINCAST** is an AI-powered railway ETA and delay forecasting platform designed to provide dynamic, data-driven predictions of train arrival times.

Traditional railway information systems primarily communicate the **current or reported state** of a train. TRAINCAST focuses on the next step:

> **Forecasting what is likely to happen next.**

The system combines historical railway data, train movement information, section-level characteristics, operational conditions, and machine learning to estimate train arrival times and forecast the propagation of delays across downstream stations and sections.

TRAINCAST is designed as a decision-support and passenger-information platform with two major interfaces:

- 🚉 **Passenger Portal** — Dynamic train ETA and journey information
- 🖥️ **Railway Operations Control Room** — Operational monitoring, predictions, delay propagation, alerts, analytics, and station-yard visualization

---

## 🎯 Problem Statement

### SIH26028 — Dynamic Forecast of Expected Time of Arrival (ETA) for Coaching Trains

Railway train arrival times can vary because of:

- Current train delay
- Sectional running time
- Station dwell time
- Historical train behavior
- Traffic and congestion
- Weather conditions
- Operational constraints
- Downstream delays
- Signal and route-related events

A static timetable cannot accurately represent these changing conditions.

TRAINCAST aims to develop a scalable forecasting system capable of dynamically estimating train arrival times and identifying potential downstream delay propagation.

---

## 💡 Our Solution

TRAINCAST follows a data-driven forecasting pipeline:

```text
Railway Data
     │
     ▼
Data Cleaning & Normalization
     │
     ▼
TRAINCAST Dataset
     │
     ▼
Feature Engineering
     │
     ▼
Baseline Models
     │
     ▼
Machine Learning
     │
     ▼
ETA Prediction
     │
     ▼
Delay Propagation
     │
     ▼
Spring Boot Backend
     │
     ▼
React Frontend
```

The system is designed to evolve from historical-data-based forecasting toward dynamic operational prediction.

---

## 🚀 Key Features

### 1. 🕐 Dynamic ETA Forecasting

TRAINCAST predicts expected arrival times using:

- Current delay
- Historical train behavior
- Section travel time
- Station dwell time
- Train type
- Time of day
- Day of week
- Route characteristics
- Weather conditions where available
- Other operational features where legitimate data is available

---

### 2. 📈 Delay Propagation Forecasting

A delay at one location can affect multiple downstream stations.

For example:

```text
Train delayed at Station A
        ↓
Section A → B
        ↓
Additional delay
        ↓
Station B
        ↓
Section B → C
        ↓
Predicted downstream delay
        ↓
Updated ETA at Station C
```

TRAINCAST attempts to model this cascading behavior instead of treating every station's ETA independently.

---

### 3. 🤖 Machine Learning ETA Engine

The planned forecasting pipeline evaluates multiple models against baseline approaches.

#### Baseline Models

**Scheduled ETA**

Uses the timetable without dynamic correction.

**Persistence Baseline**

```text
Predicted ETA = Scheduled ETA + Current Delay
```

**Historical Baseline**

Uses historical behavior for comparable train/section/time conditions.

#### Machine Learning Models

The primary candidate model is:

- **XGBoost / Gradient Boosted Decision Trees**

Additional models may be evaluated where appropriate.

Model selection will be based on measured validation performance rather than assumed accuracy.

---

## 🧠 Explainable AI

TRAINCAST is designed to provide insight into why an ETA prediction changes.

Potential contributing factors include:

```text
Current Delay          +++
Historical Delay       ++
Section Travel Time    ++
Station Dwell Time     +
Weather                +
Time of Day            +
Day of Week            +
```

The final feature contributions shown by the application will be generated from the actual trained model and evaluation pipeline.

---

## 🚦 Station Yard EI/RRI Visualization

TRAINCAST includes a simulated **Station Yard — EI/RRI Visualization** within the Operations Control Room.

The interface is inspired by railway Electronic Interlocking / Route Relay Interlocking visual displays.

It provides a visual representation of:

- Track circuits
- Train occupancy
- Signals
- Points / turnouts
- Platforms
- Routes
- Siding lines
- Station-yard movements
- Route locking
- Simulated operational events

Example:

```text
Controller Action
       ↓
Route Request
       ↓
Interlocking Validation
       ↓
Points Locked
       ↓
Route Set
       ↓
Signal Cleared
       ↓
Train Movement
       ↓
Track Circuit Occupancy
       ↓
TRAINCAST Event
       ↓
ETA / Delay Prediction Update
```

> ⚠️ **Important:** This is a **prototype visualization and simulation layer**. It does not claim direct connectivity to Indian Railways' internal EI/RRI, signalling, RTIS, COA, or other operational systems.

---

## 🖥️ Operations Control Room

TRAINCAST contains a dedicated railway-style Operations Control Room interface.

### Main Modules

| Module | Description |
|--------|-------------|
| 🚆 **Train Monitor** | Operational fleet view — location, speed, delay, risk level |
| 🗺️ **Network Map** | Geographical visualization of railway routes |
| 🚦 **Section & Signal Status** | Station-yard VDU, track circuits, signal aspects, points |
| 🤖 **ETA Predictions** | Scheduled vs. Persistence vs. TRAINCAST prediction |
| 🔄 **Delay Propagation** | Cascading delay visualization and scenarios |
| ⚠️ **At-Risk Trains** | Elevated predicted delay or operational risk |
| 📊 **Performance Analytics** | Model evaluation and forecasting metrics |
| 🔔 **Alerts & Notifications** | Operational alerts and severity classification |
| 📑 **Reports** | Analytical and operational reporting |
| 🧹 **Data Quality** | Missing data, timestamps, station mapping, anomalies |
| ⚙️ **System Status** | Service and model health information |
| 🛠️ **Settings** | Inference cycle and visualization preferences |

---

## 🏗️ System Architecture

```text
┌──────────────────────────────────────────────┐
│                 DATA SOURCES                 │
│                                              │
│ Railway datasets | Timetables | OSM | Weather│
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│            DATA INGESTION / ETL              │
│                                              │
│ Python • Pandas • NumPy                      │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                PostgreSQL                    │
│                                              │
│ Trains • Stations • Sections • Events        │
│ Historical movement and delay data           │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│             SPRING BOOT BACKEND              │
│                                              │
│ REST APIs • Business Logic • Integration     │
└──────────────────────┬───────────────────────┘
                       │
              REST / API Integration
                       │
                       ▼
┌──────────────────────────────────────────────┐
│              PYTHON ML SERVICE               │
│                                              │
│ Feature Engineering • XGBoost • Prediction   │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                  FRONTEND                    │
│                                              │
│ React • JavaScript • Leaflet • SVG           │
└──────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | Java, Spring Boot, Spring Data JPA, REST APIs, Maven |
| **Machine Learning** | Python, Pandas, NumPy, Scikit-learn, XGBoost, Jupyter Notebook |
| **Database** | PostgreSQL, SQL |
| **Frontend** | React, JavaScript, HTML, CSS |
| **Mapping & Visualization** | Leaflet, OpenStreetMap, SVG, GeoJSON |
| **Development & Deployment** | Git, GitHub, Docker |

---

## 📂 Project Structure

```text
TRAINCAST/
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Public & Control Room pages
│   │   ├── data/             # Mock data & team data
│   │   ├── services/         # API & mock services
│   │   ├── context/          # React context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── assets/           # Images & static assets
│   │   └── styles/           # Global CSS & variables
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # Spring Boot application
│   └── ...
│
├── ml/                        # Machine Learning pipeline
│   ├── notebooks/
│   ├── data/
│   ├── models/
│   ├── features/
│   ├── evaluation/
│   └── ...
│
├── database/                  # Database schemas & seeds
│   ├── schema/
│   └── seed/
│
├── docs/                      # Documentation & research
│   ├── architecture/
│   ├── dataset/
│   └── research/
│
├── docker/
│
└── README.md
```

> The repository structure may evolve as the backend, ML pipeline, and database implementation progress.

---

## 📊 Dataset Strategy

TRAINCAST is intended to use legitimate railway/publicly available datasets wherever possible.

| Category | Example Fields |
|----------|---------------|
| **Train Data** | Train ID, type, origin, destination, route, scheduled timings |
| **Station Data** | Station ID, code, name, location, sequence |
| **Movement Data** | Timestamp, current station, next station, arrival/departure time |
| **Delay Data** | Current delay, historical delay, section delay, dwell delay |
| **Infrastructure** | Railway section, distance, geometry (OSM-derived) |
| **Weather** | Temperature, rainfall, wind, visibility *(where appropriate)* |

---

## 🔬 Machine Learning Pipeline

```text
Raw Dataset
     ↓
Data Cleaning
     ↓
Missing Value Handling
     ↓
Timestamp Normalization
     ↓
Train / Station Mapping
     ↓
Feature Engineering
     ↓
Chronological Train / Validation Split
     ↓
Baseline Evaluation
     ↓
XGBoost Training
     ↓
Prediction
     ↓
Evaluation
     ↓
Model Selection
```

### Example Features

```text
current_delay            historical_delay         section_travel_time
distance                 station_dwell_time       train_type
hour_of_day              day_of_week              section_id
previous_delay_delta     weather_features
```

Special attention will be given to preventing **data leakage** during training and validation.

---

## 📏 Model Evaluation

TRAINCAST will use real evaluation results from the implemented dataset and model pipeline.

| Metric | Description |
|--------|-------------|
| **MAE** | Mean Absolute Error — average absolute ETA prediction error |
| **RMSE** | Root Mean Squared Error — penalizes larger prediction errors |
| **Accuracy Windows** | Predictions within ±5 min, ±10 min, ±15 min |

> The final values displayed by the application will be based on actual model evaluation results — not pre-assumed numbers.

---

## 🔄 Dynamic Prediction Flow

```text
New Train Event
       ↓
Update Train State
       ↓
Generate Features
       ↓
ML Prediction
       ↓
Calculate ETA
       ↓
Update Downstream Stations
       ↓
Evaluate Delay Propagation
       ↓
Store Prediction
       ↓
Spring Boot API
       ↓
React Dashboard
```

The frontend updates dynamically through REST APIs, WebSocket, or Server-Sent Events (SSE) depending on the final implementation.

---

## 🧪 Replay & Simulation

Because access to Indian Railways' internal real-time operational systems is not assumed, TRAINCAST includes a replay/simulation mechanism for demonstrations.

```text
Historical Event → Replay Engine → Train Movement → Track Occupancy
       ↓
Operational Event → Prediction Engine → Updated ETA
```

> ⚠️ Replay/simulation data is clearly labeled. TRAINCAST does **not** present simulated operational information as live Indian Railways telemetry.

---

## 🗺️ Railway Mapping

TRAINCAST uses OpenStreetMap-based geographical visualization where appropriate. Railway geometry is processed into local GeoJSON assets for reliable demonstration and visualization.

OpenStreetMap attribution is displayed where required.

---

## 👥 Team

### UNPAID INTERNS

> *No salary. No excuses. Just solutions.*

| Member | Role | Tech Stack |
|--------|------|-----------|
| 👑 **Nishanth P** | Team Lead & Lead Java Backend Developer | `Java` `Spring Boot` `REST APIs` `Architecture` `Python` |
| **Santhiya R** | Java Backend Engineer | `Java` `Spring Boot` `PostgreSQL` `Python` |
| **Varsha A** | Machine Learning Engineer | `Python` `XGBoost` `Scikit-learn` `Pandas` |
| **Ranganayaki P** | Data Engineering & Database Engineer | `Python` `PostgreSQL` `Pandas` `SQL` |
| **Gobi Kannan D** | Frontend & Visualization Engineer | `React` `JavaScript` `Python` `Leaflet` |
| **Aswaththama R** | Data Analytics & Model Evaluation Engineer | `Python` `Pandas` `NumPy` `Scikit-learn` |

---

## 🛣️ Development Roadmap

### Phase 1 — Research & Domain Understanding

- [x] SIH problem analysis
- [x] Railway ETA problem definition
- [x] System architecture planning
- [x] Control room UI planning

### Phase 2 — Frontend Foundation

- [x] Public landing page
- [x] Passenger interface
- [x] Operations Control Room
- [x] Train Monitor
- [x] Network Map
- [x] Section & Signal Status
- [x] ETA Predictions UI
- [x] Delay Propagation UI
- [x] At-Risk Trains
- [x] Analytics
- [x] Alerts
- [x] Reports
- [x] Data Quality
- [x] System Status
- [x] Station Yard EI/RRI visualization

### Phase 3 — Railway Dataset

- [ ] Identify legitimate datasets
- [ ] Verify licenses and provenance
- [ ] Collect timetable data
- [ ] Collect historical delay data
- [ ] Normalize station and train identifiers
- [ ] Build unified dataset
- [ ] Data quality pipeline

### Phase 4 — ETA Model

- [ ] Implement scheduled ETA baseline
- [ ] Implement persistence baseline
- [ ] Implement historical baseline
- [ ] Build feature engineering pipeline
- [ ] Train XGBoost model
- [ ] Chronological validation
- [ ] Compare models
- [ ] Generate real evaluation metrics

### Phase 5 — Backend

- [ ] Spring Boot project
- [ ] PostgreSQL integration
- [ ] Entity/model layer
- [ ] Repository layer
- [ ] Service layer
- [ ] REST APIs
- [ ] ML service integration

### Phase 6 — Dynamic Prediction Engine

- [ ] Prediction API
- [ ] Train state management
- [ ] Delay propagation
- [ ] Prediction persistence
- [ ] Event processing
- [ ] WebSocket/SSE updates

### Phase 7 — Integration

- [ ] Connect React to Spring Boot
- [ ] Replace frontend mock services
- [ ] Connect ML prediction service
- [ ] Connect PostgreSQL
- [ ] Dynamic ETA updates
- [ ] Dynamic operational events

### Phase 8 — SIH Demonstration

- [ ] End-to-end demo
- [ ] Historical data demonstration
- [ ] ETA prediction
- [ ] Delay injection
- [ ] Delay propagation
- [ ] Control room response
- [ ] Passenger ETA update
- [ ] Model evaluation
- [ ] Final documentation

---

## 🔐 Data & System Integrity

TRAINCAST follows a credibility-first approach.

This project does **not** claim:

- Direct access to Indian Railways internal systems
- Direct RTIS telemetry access
- Direct COA access
- Direct signalling/interlocking system access
- Live railway control or operational authority

The prototype clearly separates:

```text
REAL / LEGITIMATE DATA  +  REPLAY DATA  +  SIMULATION
                        ↓
              TRAINCAST DEMONSTRATION
```

This distinction is maintained throughout the application.

---

## 🧩 Future Architecture

The long-term system is designed to support legitimate real-time data sources if authorized access becomes available.

```text
              ┌───────────────────────┐
              │ Legitimate Data Sources│
              └───────────┬───────────┘
                          │
                          ▼
                 Data Ingestion Layer
                          │
                          ▼
                    PostgreSQL
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
       Spring Boot API            ML Service
             │                         │
             └────────────┬────────────┘
                          │
                          ▼
                   TRAINCAST Engine
                          │
             ┌────────────┴────────────┐
             ▼                         ▼
       Passenger Portal          Control Room
```

---

## 🏆 Smart India Hackathon

| Field | Value |
|-------|-------|
| **Problem Statement** | SIH26028 |
| **Title** | Dynamic Forecast of Expected Time of Arrival (ETA) for Coaching Trains |
| **Category** | Software |
| **Theme** | Smart Automation |
| **Organization** | Ministry of Railways |
| **Project** | TRAINCAST |
| **Team** | UNPAID INTERNS |

---

## ⚠️ Prototype Disclaimer

> **TRAINCAST is a prototype demonstration developed for Smart India Hackathon 2026. Displayed operational information may be replay-derived or simulated and does not represent a live connection to Indian Railways internal operational systems.**

The project does not claim to control railway signalling, interlocking, train operations, or other railway infrastructure.

---

## 📜 License

This project is developed as an academic and hackathon project.

License information will be added according to the team's chosen open-source strategy and the licensing requirements of any third-party datasets, libraries, map data, or other resources used by the project.

---

<div align="center">

## ⭐ TRAINCAST

### Predict the arrival. Understand the delay. See what's next.

**Built by UNPAID INTERNS for Smart India Hackathon 2026.**

</div>
