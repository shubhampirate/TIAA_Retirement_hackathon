# Retire.AI

## Introduction

Retirement planning is a critical aspect of ensuring financial security and a comfortable lifestyle in one's later years. Our website is designed to empower individuals to make informed decisions about their retirement by providing comprehensive tools for financial planning, health monitoring, and intelligent AI assistance.

[Presentation](https://www.canva.com/design/DAF0ii7NG1w/B36GNaAVrpVPbxJdTnv9zQ/edit?utm_content=DAF0ii7NG1w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Features

### 1. Dashboard

![Dashboard Image](/images/dashboard.png)

The dashboard serves as a central hub for users to access crucial information about their financial status. Key features include:

- **Current Investment Statistics:** Real-time updates on investment performance.
- **Credit Risk Assessment:** A comprehensive analysis of the user's credit risk.
- **Income, Expenses, and Savings Overview:** Visual representation of basic financial metrics.

### 2. Finance Planning

![Finance Planning Image](/images/finance_planning.png)

In the Finance Planning section, we leverage cutting-edge technology to enhance financial decision-making:

- **Integrated Power BI Graphs:** Powerful visualizations for better data interpretation.
- **ML Models for Portfolio Optimization:** Utilizing machine learning to optimize investment portfolios.
- **Asset Allocation Strategies:** Providing intelligent recommendations for diversifying assets.

### 3. Health Monitoring

![Health Monitoring Image](/images/health_monitoring.png)

Ensuring a healthy retirement involves more than just financial planning. Our Health Monitoring section includes:

- **Health Insurance Services:** Information and options for health insurance coverage.
- **Nearby Hospitals:** Locating and accessing healthcare facilities in the user's vicinity.
- **Mediclaim Coverage Details:** Keeping track of medical insurance coverage.
- **Google Fit Integration:** Syncing and tracking health and fitness data from Google Fit.
- **Insurance History:** A comprehensive overview of previous insurance records.

### 4. Alan AI Integration

![Alan AI Image](/images/alan_ai.png)

Our website integrates Alan AI to provide intelligent routing throughout the platform. Users can interact with Alan AI for personalized assistance and guidance.

### 5. FAQ and Settings

We understand the importance of clear communication and user customization. Therefore, we offer:

- **Frequently Asked Questions (FAQ):** A dedicated section to address common queries.
- **Settings Page:** Allowing users to customize their experience and preferences.

## Backend File Structure
The project has the following file structure:
```
TIAA_Retirement_hackathon/
├── retire_ai/
│   ├── api/
│   ├── ml/
│   ├── retire_ai/
│   └── staticfiles/
├── .gitignore
├── README.md
└── requirements.txt
```

The retire_ai directory is the django home directory having manage.py which is used to manage the entire django project. The api subdirectory contains files related to the application programming interface (API) of the project. It includes files such as urls.py, views.py, models.py and serializers.py. The API is used to communicate with the machine learning (ML) models and the database. The ml subdirectory contains files related to the machine learning (ML) models of the project along with the datasets used. The ML models are used to provide retirement planning and investment advice to the users. Some ML models are implemented directly into django views thus the code for same is present over there. The retire_ai subdirectory contains files related to the settings and configuration of the project. The staticfiles subdirectory contains files related to the static assets of the project. These include files such as images, stylesheets and scripts. The .gitignore file lists the files to be ignored by Git. The README.md file gives a brief introduction to the project. The requirements.txt file lists the dependencies for the project.


## How to Get Started
### For Frontend
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/shubhampirate/TIAA_Retirement_hackathon.git
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm start
   ```

4. **Access the Website:**
   Open your web browser and go to `http://localhost:3000` to explore the features.
### For Backend
1. **Clone the repository** 
```bash
git clone https://github.com/Jenil-Savla/TIAA_Retirement_hackathon.git
```

2. **Switch to backend branch**
```
git checkout backend
```

3. **Navigate to the project directory:**
```bash
cd TIAA_Retirement_hackathon
```

4. **Install the dependencies** 
```bash
pip install -r requirements.txt
```
5. **Run the server** 
```bash
cd retire_ai
python manage.py runserver
```
Open your web browser and go to http://localhost:8000/ to view the project.

## Contributing

We welcome contributions! If you have ideas for improvement or want to report issues, please [create an issue](https://github.com/your-username/your-repository/issues) or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE.md).
