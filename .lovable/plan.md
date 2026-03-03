

## Plan: Multi-Section Updates

### 1. Certifications — Add org logos and new certificate
- Copy uploaded `images.png` (Udacity logo) and `unnamed.jpg` (DataCamp logo) to `src/assets/`
- Add new certificate: "Data Analysis Professional" from Udacity with the provided URL
- Update `CertificationsSection.tsx` to use the Udacity logo for Udacity certs and DataCamp logo for DataCamp certs (replacing the generic Award icon)

### 2. Metrics — Update values and add scheduling
- Change "Forecast Models Built" from `10+` to `5+`
- Add a new metric related to scheduling models (e.g., "Scheduling Models Designed")

### 3. SQL / About Section — Add report extraction
- In the "SQL Database Architecture" card, add items like "Report extraction & automated reporting" and "Analytical report design & structuring"

### 4. WFM System Implementation — New card in About
- Add a new experience card with a `Monitor` or `RefreshCw` icon: "WFM System Implementation — NiCE IEX"
- Items: system migration from Injixo/Pepoleware to NiCE IEX, integration architecture, data migration & validation, cross-platform workflow alignment
- Place it after the Centrecom Malta card (workforce-related context)

### 5. Tech Stack — Reorder and update
- Remove "Tableau", add "Power BI" and "NiCE IEX"
- Move "Python" to end of list

### Files Modified
- `src/components/CertificationsSection.tsx`
- `src/components/MetricsSection.tsx`
- `src/components/AboutSection.tsx`
- `src/components/TechStackSection.tsx`
- Copy 2 image assets to `src/assets/`

