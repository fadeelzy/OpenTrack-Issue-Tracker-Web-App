🐛 OpenTrack – Issue Tracker Web App

A full-stack issue tracking system built with Django, designed for teams to log bugs, request features, and manage issue lifecycles with reliability in mind.

# OpenTrack - Issue Tracker 🚀

![CI](https://github.com/fadeelzy/OpenTrack-Issue-Tracker-Web-App/actions/workflows/django-ci.yml/

🔥 Features

✅ Issue Management – Create, view, update, and track bugs or feature requests

🔎 Filtering & Search – Filter by status, priority, or keywords

📊 Status Tracking – Update issues as they progress through the workflow

👤 Assignees & Labels – Assign tasks and tag issues with custom labels

⚡ SRE & Reliability Focus – Monitoring hooks, error handling, and scalability patterns

🏗️ Tech Stack

Backend:

Django (5.x)

SQLite (default) / PostgreSQL (production ready)

Django ORM

Frontend:

HTML5, CSS3, Tailwind-like styling (customized)

Vanilla JavaScript

DevOps / SRE Practices:

Containerization with Docker

Deployment ready for Heroku / Render / AWS

Logging + Error Monitoring setup

Configurable via environment variables

🚀 Getting Started
Prerequisites

Python 3.11+

pip / pipenv / poetry

(Optional) Docker & Docker Compose

Installation:
git clone https://github.com/yourusername/opentrack.git
cd opentrack
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Access the app at 👉 http://127.0.0.1:8000/dashboard/

⚙️ Usage

Create a new issue from Add Issue page

Filter/search issues on the Dashboard

Update issue status from the Issue Detail page
Example workflow:
New Issue → In Progress → Resolved → Closed

📂 Project Structure
open-track/
│── myapp/               
│   ├── models.py        
│   ├── views.py          
│   ├── templates/       
│   └── static/           
│── openproject/          
│── requirements.txt
│── manage.py

📈 Reliability & Scaling

This project is built with site reliability engineering practices in mind:

🔒 Environment-based configs (12-factor methodology)

🛡 Graceful error handling with Django messages + logging

📡 Monitoring hooks (ready for Prometheus / Grafana integration or Cloudwatch)

🔀 Database migrations for smooth schema evolution

🐳 Containerized deployment (via Docker)

📌 Roadmap

- User authentication & role-based access

- Commenting system on issues

- Email/Slack notifications on updates

- REST API for integration with other tools

- CI/CD pipeline with GitHub Actions

## 🚦 CI/CD Workflow

This project uses **GitHub Actions** for continuous integration (CI):

- ✅ Runs tests automatically on every push & pull request  
- ✅ Ensures the project builds correctly with Python & Django  
- ✅ Prevents broken code from being merged  
The workflow file lives here:  
`.github/workflows/django-ci.yml`

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork and submit pull requests.

👨‍💻 Author

Your Name – Backend Engineer | Site Reliability Enthusiast

🌐 Portfolio: SRE-fadilah.com

💼 LinkedIn: linkedin.com/in/fadilah-abdulkadir-378a47269

🐙 GitHub: github.com/fadeelzy

⭐ If you like this project, consider giving it a star!
